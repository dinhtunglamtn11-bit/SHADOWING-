// Tìm nhanh trong mọi phụ đề, ghi chú và thẻ: gõ chữ Hán, phiên âm (có thể bỏ dấu và khoảng trắng) hoặc tiếng Việt.
import { $, esc, getLang, fmt } from './util.js';
import * as store from './store.js';
import { zhText } from './prefs.js';
import { openItem } from './player.js';
import { openNote } from './notes.js';

const MAX = 150;
const deburr = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').toLowerCase();
const squash = s => deburr(s).replace(/\s+/g, '');
const variants = q => [...new Set([q.trim().toLowerCase(), zhText(q.trim(), 'zh').toLowerCase()])].filter(Boolean);

// Hàm kiểm tra một chuỗi có khớp từ khóa không: khớp thẳng, khớp giản thể, hoặc không dấu/không cách khi gõ chữ Latin
function matcher(q) {
  const vars = variants(q);
  if (!vars.length) return null;
  const ascii = /^[a-zÀ-ỹ\s'.-]+$/i.test(q.trim()) ? squash(q) : '';
  return s => { const l = s.toLowerCase(); return vars.some(v => l.includes(v)) || (ascii.length >= 2 && squash(s).includes(ascii)); };
}

function mark(text, q) {
  const t = text.length > 100 ? text.slice(0, 100) + '…' : text;
  const vars = variants(q);
  if (!vars.length) return esc(t);
  const re = new RegExp(vars.map(v => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'gi');
  let out = '', last = 0;
  for (const m of t.matchAll(re)) { out += esc(t.slice(last, m.index)) + '<mark>' + esc(m[0]) + '</mark>'; last = m.index + m[0].length; }
  return out + esc(t.slice(last));
}

export function search(q, allLang) {
  const ok = matcher(q), out = { cue: [], note: [], card: [] };
  if (!ok) return out;
  const lang = getLang(), pass = d => allLang || (d.lang || 'zh') === lang;
  for (const it of store.list('items')) {
    if (!pass(it)) continue;
    if (it.type === 'video' && it.cues) {
      let cs = []; try { cs = JSON.parse(it.cues); } catch { continue; }
      for (const c of cs) {
        if (out.cue.length >= MAX) break;
        const k = (c.lines || []).findIndex(l => ok(l));
        if (k >= 0) out.cue.push({ id: it.id, title: it.title, t: c.start, text: c.lines[k], main: k ? c.lines[0] : '' });
      }
    } else if (it.type === 'note' && it.body) {
      const line = it.body.split('\n').find(l => ok(l));
      if (line && out.note.length < MAX) out.note.push({ id: it.id, title: it.title || 'Ghi chú', text: line.trim() });
    }
  }
  for (const c of store.list('cards')) {
    if (!pass(c) || out.card.length >= MAX) continue;
    const all = [c.front, ...(c.back || [])], k = all.findIndex(l => l && ok(l));
    if (k >= 0) out.card.push({ title: c.title || '', text: all[k], front: c.front, back: (c.back || []).slice(-1)[0] || '' });
  }
  return out;
}

function render() {
  const q = $('#findQ').value;
  const r = search(q, $('#findAllLang').checked), box = $('#findList');
  const n = r.cue.length + r.note.length + r.card.length;
  $('#findStat').textContent = !q.trim() ? 'Gõ để tìm. Khớp cả phiên âm không dấu, ví dụ “chifan” ra 吃饭.' : n ? `${r.cue.length} câu phụ đề · ${r.note.length} ghi chú · ${r.card.length} thẻ` : 'Không tìm thấy.';
  const sec = (title, rows) => (rows ? `<h3>${title}</h3>${rows}` : '');
  box.innerHTML =
    sec('Phụ đề', r.cue.map(x => `<div class="lib frow" data-go="cue|${x.id}|${x.t}"><span class="ti">🎬</span><div class="n"><b>${mark(x.text, q)}</b><span>${esc(x.title)} · ${fmt(x.t)}${x.main ? ' · ' + esc(x.main) : ''}</span></div></div>`).join('')) +
    sec('Ghi chú', r.note.map(x => `<div class="lib frow" data-go="note|${x.id}"><span class="ti">📝</span><div class="n"><b>${mark(x.text, q)}</b><span>${esc(x.title)}</span></div></div>`).join('')) +
    sec('Thẻ', r.card.map(x => `<div class="lib"><span class="ti">📒</span><div class="n"><b>${mark(x.front, q)}</b><span>${esc(x.back)}${x.title ? ' · ' + esc(x.title) : ''}</span></div></div>`).join(''));
}

export function init() {
  const dlg = $('#findDlg');
  let timer = 0;
  $('#libFind').onclick = () => { dlg.showModal(); $('#findQ').select(); render(); };
  $('#findClose').onclick = () => dlg.close();
  $('#findQ').oninput = () => { clearTimeout(timer); timer = setTimeout(render, 180); };
  $('#findAllLang').onchange = render;
  $('#findList').onclick = e => {
    const row = e.target.closest('[data-go]');
    if (!row) return;
    const [kind, id, t] = row.dataset.go.split('|');
    dlg.close();
    if (kind === 'cue') { store.put('items', id, { position: Math.max(0, +t - 0.6) }); openItem(id); }
    else openNote(id);
  };
}
