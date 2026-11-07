// Story (trong Thế giới): đọc truyện chữ, tiểu thuyết dài, chia thành nhiều chương.
// Dữ liệu: bộ “stories” (mỗi truyện: tên, tác giả, vị trí đang đọc) và bộ “chapters” (mỗi chương một tài liệu, nên truyện dài
// vẫn nhẹ khi lưu / đồng bộ). Dán chữ hoặc chọn file .txt: app tự nhận chương (第一章, Chương 1, Chapter 1, # Tiêu đề…) hoặc chia theo độ dài.
import { $, $$, esc, toast, uid, pickFile, getLang, langInfo, bus, vnDate } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import { zhText } from './prefs.js';

const COLORS = ['#ff8f3a', '#5fd068', '#ff8fc0', '#7ec3ff', '#a98bff', '#ffd84d', '#ff7b88', '#4fd1c5'];
const hash = s => [...String(s || '')].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const storiesOf = lang => store.list('stories').filter(s => (s.lang || 'zh') === lang).sort((a, b) => (b.last || b.created || 0) - (a.last || a.created || 0));
const chaptersOf = id => store.list('chapters').filter(c => c.story === id).sort((a, b) => a.n - b.n);
const ls = (k, d) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } };
const lset = (k, v) => { try { localStorage.setItem(k, v); } catch { /* bỏ qua */ } };

let root = null, ctx = null;
let view = 'shelf', sid = null, page = 0, addFor = null, draft = { title: '', author: '', emoji: '', text: '', mode: 'auto' };
const PER = 60; // số chương mỗi trang mục lục
const readOnce = new Set(); // chương đã tính “đã đọc” trong phiên này
let onScroll = null, saveT = 0, active = false;

// ---------- tách chương ----------
const HEAD = /^\s*(?:第\s*[0-9０-９零〇一二三四五六七八九十百千两兩]{1,8}\s*[章回節节卷集部篇話话].{0,40}|(?:chương|chuong|chapter|hồi|phần|part)\s+(?:\d{1,4}|[ivxlc]{1,7})\b.{0,60}|#{1,2}\s+.{1,60})\s*$/i;
const clean = a => a.join('\n').replace(/[ \t]+$/gm, '').replace(/\n{3,}/g, '\n\n').trim();

function splitBySize(text, target, title) { // chia theo đoạn, mỗi phần chừng `target` ký tự
  const out = []; let cur = [], n = 0;
  for (const p of text.split('\n')) {
    if (!p.trim()) continue;
    cur.push(p); n += p.length;
    if (n >= target) { out.push(cur.join('\n')); cur = []; n = 0; }
  }
  if (cur.length) { if (out.length && n < target * 0.25) out[out.length - 1] += '\n' + cur.join('\n'); else out.push(cur.join('\n')); }
  return out.map((body, i) => ({ title: title(i + 1, out.length), body }));
}

export function parseChapters(raw, mode = 'auto') {
  const lines = String(raw || '').replace(/\r/g, '').split('\n');
  let chs = [];
  if (mode === 'auto') {
    let cur = null; const pre = [];
    for (const l of lines) {
      if (l.length <= 80 && HEAD.test(l)) { if (cur) chs.push(cur); cur = { title: l.replace(/^\s*#{1,2}\s+/, '').trim(), body: [] }; }
      else (cur ? cur.body : pre).push(l);
    }
    if (cur) chs.push(cur);
    chs = chs.map(c => ({ title: c.title, body: clean(c.body) }));
    const lead = clean(pre);
    if (chs.length === 1 && raw.length > 12000) chs = []; // chỉ có một tiêu đề nhưng bài rất dài: chia theo độ dài
    else if (lead) { if (lead.length > 200 || !chs.length) chs.unshift({ title: 'Mở đầu', body: lead }); else chs[0].body = lead + '\n' + chs[0].body; }
  }
  if (!chs.length) chs = splitBySize(clean(lines), 5000, i => 'Phần ' + i);
  // chương quá dài (hàng chục nghìn chữ) chia nhỏ để mỗi tài liệu luôn nhẹ
  const out = [];
  for (const c of chs) {
    if (!c.body.trim()) continue;
    if (c.body.length > 20000) splitBySize(c.body, 12000, (i, n) => `${c.title} (${i}/${n})`).forEach(x => out.push(x));
    else out.push(c);
  }
  return out;
}

async function decodeFile(f) { // file .txt tiếng Trung đời cũ có thể là GBK: thử UTF-8 trước, lỗi dấu thì đọc lại bằng GB18030
  const buf = await f.arrayBuffer();
  let t = new TextDecoder('utf-8').decode(buf);
  if (t.includes('�')) { try { t = new TextDecoder('gb18030').decode(buf); } catch { /* giữ bản UTF-8 */ } }
  return t;
}

async function saveChapters(storyId, list, lang) {
  const have = new Set(chaptersOf(storyId).map(c => c.title + '|' + (c.body || '').slice(0, 80)));
  let n = chaptersOf(storyId).reduce((m, c) => Math.max(m, c.n), 0), added = 0;
  const z = s => (lang === 'zh' ? zhText(s, 'zh') : s);
  for (const c of list) {
    const title = z(c.title), body = z(c.body), key = title + '|' + body.slice(0, 80);
    if (have.has(key)) continue;
    have.add(key);
    store.put('chapters', uid(), { story: storyId, n: ++n, title, body, lang, created: Date.now(), deleted: false });
    if (++added % 25 === 0) await new Promise(r => setTimeout(r, 0)); // nhường giao diện khi nhập truyện rất dài
  }
  const s = store.get('stories', storyId);
  store.put('stories', storyId, { count: n, ...(s?.ch ? {} : { ch: chaptersOf(storyId)[0]?.id || '' }) });
  return added;
}

const SAMPLES = {
  zh: { title: '小猫找朋友', author: '示例', emoji: '🐱', text: `第一章 小猫出门
小猫早上醒来，看见窗外下着小雨。它想：今天我要去找一个新朋友。
妈妈说：外面有点冷，多穿一件衣服吧。小猫点点头，戴上了红色的小帽子。

第二章 遇见小狗
走到公园门口，小猫看见一只小狗正在玩球。小狗说：你好，你想和我一起玩吗？
小猫很开心，它们玩了一整个下午，还一起分享了面包。

第三章 回家
天黑了，小猫对小狗说：明天还来这里玩吧。小狗笑着说：好啊，一言为定！
小猫回到家，妈妈问它今天怎么样。它说：我有了一个新朋友。` },
  en: { title: 'The Little Lighthouse', author: 'Sample', emoji: '🗼', text: `Chapter 1: The Storm
Every evening, old Mara climbed the narrow stairs of the lighthouse and lit the lamp. That night the wind was loud, and the sea was dark and angry.
She kept watch until a small boat appeared far away, rocking between the waves.

Chapter 2: The Boat
The boat carried a boy and his grandfather. They had lost their way, and the light was the only thing they could see.
Mara waved a lantern from the rocks until the boat touched the sand.

Chapter 3: Morning
By morning the storm was gone. The boy gave Mara a shell and said thank you. She put it on the window, where it caught the first light.` },
};

// ---------- khung chung ----------
const progOf = s => (s.count ? Math.min(100, Math.round(100 * (s.maxN || 0) / s.count)) : 0);
const curIdx = (chs, s) => Math.max(0, chs.findIndex(c => c.id === s.ch));

function head(extra = '') { return `${ctx.bar()}${extra}`; }
function bindBase() { ctx.bindBar(); }
function nav(v, patch = {}) {
  cleanup();
  view = v;
  if ('sid' in patch) sid = patch.sid;
  if ('page' in patch) page = patch.page;
  if ('addFor' in patch) addFor = patch.addFor;
  render(root, ctx); scrollTo(0, 0);
}

// ---------- kệ truyện ----------
function drawShelf() {
  const lang = getLang(), list = storiesOf(lang);
  if (!list.length) {
    root.innerHTML = `${head()}<div class="empty"><div class="emptyart">📚</div>Chưa có truyện ${esc(langInfo().name)} nào.<br>Dán chữ hoặc chọn file .txt của truyện, app tự chia thành các chương.
      <div class="row c" style="margin-top:12px"><button class="btn primary" id="stAdd">＋ Thêm truyện</button><button class="btn" id="stSample">✨ Thêm truyện mẫu</button></div></div>`;
    bindShelf(); return;
  }
  const card = s => {
    const c = store.get('chapters', s.ch);
    return `<div class="stc" data-open="${s.id}" role="button" tabindex="0" style="--cc:${COLORS[hash(s.title) % COLORS.length]}">
      <div class="stc-cover">${esc(s.emoji || '📖')}</div>
      <div class="stc-b"><b class="gt">${esc(s.title)}</b>${s.author ? `<small class="dim gt">${esc(s.author)}</small>` : ''}
        <div class="prog"><i style="width:${progOf(s)}%"></i></div>
        <small class="dim">${c ? `Đang ở chương ${c.n}/${s.count || 0}` : `${s.count || 0} chương`}</small></div></div>`;
  };
  root.innerHTML = `${head()}<div class="row"><button class="btn primary" id="stAdd">＋ Thêm truyện</button></div>
    <div class="stgrid">${list.map(card).join('')}</div>`;
  bindShelf();
}
function bindShelf() {
  bindBase();
  $('#stAdd', root)?.addEventListener('click', () => { draft = { title: '', author: '', emoji: '', text: '', mode: 'auto' }; nav('add', { addFor: null }); });
  $('#stSample', root)?.addEventListener('click', async () => {
    const lang = getLang(), s = SAMPLES[lang] || SAMPLES.zh, id = uid();
    store.put('stories', id, { lang, title: s.title, author: s.author, emoji: s.emoji, count: 0, ch: '', maxN: 0, created: Date.now(), deleted: false });
    await saveChapters(id, parseChapters(s.text), lang);
    toast('Đã thêm truyện mẫu'); drawShelf();
  });
  $$('.stc', root).forEach(el => {
    const open = () => nav('detail', { sid: el.dataset.open, page: -1 });
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
}

// ---------- thêm truyện / thêm chương ----------
function drawAdd() {
  const s = addFor ? store.get('stories', addFor) : null, d = draft;
  root.innerHTML = `${head()}<div class="row"><button class="btn" id="stCancel">← ${s ? esc(s.title) : 'Truyện của tôi'}</button></div>
    <div class="qcard st-form">
      <h3>${s ? 'Thêm chương vào truyện' : 'Thêm truyện mới'}</h3>
      ${s ? '' : `<div class="row"><label class="dim grow">Tên truyện<input id="stfTitle" type="text" value="${esc(d.title)}" placeholder="Tên truyện"></label>
        <label class="dim grow">Tác giả<input id="stfAuthor" type="text" value="${esc(d.author)}" placeholder="(không bắt buộc)"></label>
        <label class="dim">Biểu tượng<input id="stfEmoji" type="text" value="${esc(d.emoji)}" maxlength="4" style="width:72px" placeholder="📖"></label></div>`}
      <div class="row"><button class="btn" id="stfFile">📂 Chọn file .txt</button>
        <div class="seg" id="stfMode"><button data-m="auto" class="${d.mode === 'auto' ? 'on' : ''}" title="Nhận các dòng như “第一章”, “Chương 1”, “Chapter 1”, “# Tiêu đề” là đầu chương">Tự nhận chương</button><button data-m="size" class="${d.mode === 'size' ? 'on' : ''}" title="Cắt đều theo độ dài (khoảng 5000 chữ một phần), dùng khi truyện không có dòng tiêu đề chương">Chia theo độ dài</button></div></div>
      <textarea id="stfText" class="edwide" rows="14" spellcheck="false" placeholder="Dán chữ của truyện vào đây (có thể dán cả cuốn tiểu thuyết, hoặc chọn file .txt)…">${esc(d.text)}</textarea>
      <div id="stfInfo" class="dim"></div>
      <div class="row"><button class="btn primary" id="stfSave">💾 Lưu</button><button class="btn" id="stfCancel2">Hủy</button></div>
      <div class="dim">Truyện rất dài: dán từng phần cũng được, bấm “＋ Thêm chương” ở trang truyện để nối tiếp. Chương trùng sẽ được bỏ qua.</div>
    </div>`;
  bindBase();
  const text = $('#stfText', root), info = $('#stfInfo', root);
  let t = 0;
  const analyze = () => {
    d.text = text.value;
    const chs = parseChapters(d.text, d.mode);
    info.innerHTML = chs.length
      ? `<b>Tìm thấy ${chs.length} chương</b> · ${d.text.length.toLocaleString('vi-VN')} ký tự<br><span class="gt">${chs.slice(0, 3).map(c => esc(c.title)).join(' · ')}${chs.length > 3 ? ' …' : ''}</span>`
      : 'Chưa có nội dung.';
    return chs;
  };
  text.addEventListener('input', () => { clearTimeout(t); t = setTimeout(analyze, 350); });
  const sync = () => { if (!s) { d.title = $('#stfTitle', root).value; d.author = $('#stfAuthor', root).value; d.emoji = $('#stfEmoji', root).value; } };
  $$('#stfMode button', root).forEach(b => b.onclick = () => { sync(); d.text = text.value; d.mode = b.dataset.m; drawAdd(); });
  $('#stfFile', root).onclick = async () => {
    const [f] = await pickFile('.txt,.md,text/plain');
    if (!f) return;
    sync();
    d.text = await decodeFile(f);
    if (!s && !d.title) d.title = f.name.replace(/\.[^.]+$/, '');
    drawAdd();
  };
  const back = () => nav(s ? 'detail' : 'shelf', { sid: addFor, page: -1 });
  $('#stCancel', root).onclick = back; $('#stfCancel2', root).onclick = back;
  $('#stfSave', root).onclick = async () => {
    sync();
    const chs = analyze(), lang = getLang();
    if (!chs.length) { toast('Hãy dán chữ hoặc chọn file truyện trước'); return; }
    if (!s && !d.title.trim()) { toast('Hãy đặt tên cho truyện'); return; }
    $('#stfSave', root).disabled = true; info.textContent = 'Đang lưu…';
    let id = addFor;
    if (!s) {
      id = uid();
      store.put('stories', id, { lang, title: d.title.trim(), author: d.author.trim(), emoji: d.emoji.trim(), count: 0, ch: '', maxN: 0, created: Date.now(), deleted: false });
    }
    const n = await saveChapters(id, chs, s?.lang || lang);
    toast(n ? `Đã thêm ${n} chương` : 'Không có chương mới (đã có sẵn)', 2500);
    draft = { title: '', author: '', emoji: '', text: '', mode: 'auto' };
    nav('detail', { sid: id, page: -1 });
  };
  if (d.text) analyze();
}

// ---------- trang truyện: mục lục ----------
function drawDetail() {
  const s = store.get('stories', sid);
  if (!s || s.deleted) { nav('shelf'); return; }
  const chs = chaptersOf(sid), cur = curIdx(chs, s), pages = Math.max(1, Math.ceil(chs.length / PER));
  if (page < 0) page = Math.floor(cur / PER); // lần đầu vào: mở đúng trang có chương đang đọc
  page = Math.min(page, pages - 1);
  const slice = chs.slice(page * PER, page * PER + PER), read = s.maxN || 0;
  const row = c => `<div class="stch ${c.id === s.ch ? 'cur' : ''} ${c.n <= read ? 'done' : ''}" data-ch="${c.id}" role="button" tabindex="0"><span class="stn">${c.n}</span><span class="gt grow">${esc(c.title)}</span><span class="stm">${c.id === s.mark?.ch ? '🔖' : ''}${c.id === s.ch ? '▶' : c.n <= read ? '✓' : ''}</span></div>`;
  const mk = s.mark && store.get('chapters', s.mark.ch) ? s.mark : null, d8 = t => { const d = new Date(t); return `${d.getDate()}/${d.getMonth() + 1}`; };
  root.innerHTML = `${head()}<div class="row"><button class="btn" id="stBack">← Truyện của tôi</button></div>
    <div class="st-hero" style="--cc:${COLORS[hash(s.title) % COLORS.length]}"><div class="stc-cover big">${esc(s.emoji || '📖')}</div>
      <div class="stc-b"><h2 class="gt">${esc(s.title)}</h2>${s.author ? `<div class="dim gt">${esc(s.author)}</div>` : ''}
        <div class="prog"><i style="width:${progOf(s)}%"></i></div><small class="dim">${chs.length} chương · đã đọc ${Math.min(read, chs.length)}</small></div></div>
    ${mk ? `<div class="row st-mark"><span class="grow"><b>🔖 Điểm đã lưu</b> <span class="dim">chương ${mk.n} · ${Math.round((mk.pos || 0) * 100)}% · ${d8(mk.t)}</span></span><button class="btn" id="stMark">↩ Về điểm đã lưu</button></div>` : ''}
    <div class="row">${chs.length ? `<button class="btn primary big" id="stRead">▶ ${s.maxN || s.pos ? 'Đọc tiếp' : 'Bắt đầu đọc'}${chs[cur] ? ` · chương ${chs[cur].n}` : ''}</button>` : ''}
      <button class="btn" id="stMore">＋ Thêm chương</button><button class="btn" id="stEdit">✎ Sửa thông tin</button><button class="btn" id="stDel">🗑 Xóa truyện</button></div>
    ${chs.length > PER ? `<div class="row"><button class="btn" data-pg="-1" ${page === 0 ? 'disabled' : ''}>‹</button><span class="dim">Trang ${page + 1}/${pages}</span><button class="btn" data-pg="1" ${page >= pages - 1 ? 'disabled' : ''}>›</button>
      <label class="dim">Đến chương số <input id="stJump" type="number" min="1" max="${chs.length}" style="width:84px"></label></div>` : ''}
    <div class="stlist">${slice.map(row).join('') || '<div class="empty">Truyện chưa có chương nào.</div>'}</div>`;
  bindBase();
  $('#stBack', root).onclick = () => nav('shelf');
  $('#stRead', root)?.addEventListener('click', () => openChapter(chs[cur].id, true));
  $('#stMark', root)?.addEventListener('click', () => openChapter(mk.ch, false, true));
  $('#stMore', root).onclick = () => { draft = { title: '', author: '', emoji: '', text: '', mode: 'auto' }; nav('add', { addFor: sid }); };
  $('#stEdit', root).onclick = () => {
    const t = (prompt('Tên truyện:', s.title) || '').trim(); if (!t) return;
    const a = prompt('Tác giả:', s.author || '');
    const e = prompt('Biểu tượng (một emoji, ví dụ 🐑):', s.emoji || '');
    store.put('stories', sid, { title: t, author: (a ?? s.author ?? '').trim(), emoji: (e ?? s.emoji ?? '').trim() }); drawDetail();
  };
  $('#stDel', root).onclick = () => {
    if (!confirm(`Xóa truyện “${s.title}” cùng ${chs.length} chương? Không thể hoàn tác.`)) return;
    chs.forEach(c => store.purge('chapters', c.id));
    store.purge('stories', sid); nav('shelf'); toast('Đã xóa truyện');
  };
  $$('[data-pg]', root).forEach(b => b.onclick = () => { page += +b.dataset.pg; drawDetail(); });
  $('#stJump', root)?.addEventListener('change', e => {
    const c = chs[Math.max(1, Math.min(chs.length, +e.target.value || 1)) - 1]; if (c) { page = Math.floor((c.n - 1) / PER); drawDetail(); }
  });
  $$('.stch', root).forEach(el => {
    const open = () => openChapter(el.dataset.ch, false);
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
}

// ---------- đọc chương ----------
const fs = () => Math.max(15, Math.min(40, +ls('stFs', 21) || 21));
let full = false; // đang đọc toàn màn hình (chỉ còn chữ truyện)
const proxy = kind => document.querySelector(`#nwTools [data-${kind}]`)?.click(); // dùng chung nút Đọc / Chạm câu / Tra từ của Thế giới
const metrics = () => {
  const st = $('#stScroll', root);
  if (full && st) return { top: st.scrollTop, max: st.scrollHeight - st.clientHeight };
  const d = document.documentElement; return { top: scrollY, max: d.scrollHeight - innerHeight };
};
const fraction = () => { const m = metrics(); return m.max > 0 ? Math.min(1, m.top / m.max) : 1; };
const jump = f => {
  const st = $('#stScroll', root);
  if (full && st) st.scrollTop = (st.scrollHeight - st.clientHeight) * f; else scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * f);
};

function openChapter(cid, resume, atMark = false) {
  const c = store.get('chapters', cid); if (!c) return;
  const s = store.get('stories', c.story);
  const keepPos = atMark ? s?.mark?.pos || 0 : resume && s?.ch === cid ? s.pos || 0 : 0;
  store.put('stories', c.story, { ch: cid, pos: keepPos, last: Date.now() });
  sid = c.story; cleanup(true); view = 'read'; drawRead(keepPos); if (!full) scrollTo(0, 0);
}

function setFull(on) {
  const st = $('#stStage', root); if (!st || on === full) return;
  const f = fraction();
  full = on; st.classList.toggle('full', on); document.body.classList.toggle('sp-reading', on);
  if (on) { try { document.documentElement.requestFullscreen?.({ navigationUI: 'hide' })?.catch(() => {}); } catch { /* không hỗ trợ: vẫn là toàn khung của app */ } }
  else if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  requestAnimationFrame(() => jump(f));
}
document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && full) setFull(false); });

// Lưu tiến trình: ghi nhớ chương + vị trí hiện tại thành “điểm đã lưu” (khác vị trí tự nhớ, không bị đè khi bạn mở chương khác xem thử)
function saveMark() {
  const s = store.get('stories', sid), chs = chaptersOf(sid), c = chs[curIdx(chs, s)]; if (!c) return;
  const f = +fraction().toFixed(3);
  store.put('stories', sid, { mark: { ch: c.id, n: c.n, pos: f, t: Date.now() }, pos: f, last: Date.now() });
  toast(`Đã lưu tiến trình: chương ${c.n} (${Math.round(f * 100)}%)`, 2200);
  $$('[data-act=save]', root).forEach(b => { b.classList.add('on'); b.textContent = '🔖 Đã lưu'; });
}

function drawRead(startPos = 0) {
  const s = store.get('stories', sid), chs = chaptersOf(sid), i = curIdx(chs, s), c = chs[i];
  if (!c) { nav('detail', { sid, page: -1 }); return; }
  const prev = chs[i - 1], next = chs[i + 1], bcp = langInfo(s.lang || 'zh').bcp, mk = s.mark?.ch === c.id;
  const paras = String(c.body || '').split('\n').filter(l => l.trim()).map(l => `<p>${esc(l.trim())}</p>`).join('');
  const navRow = pos => `<div class="row st-nav"><button class="btn" data-go="${prev?.id || ''}" ${prev ? '' : 'disabled'}>‹ Chương trước</button><span class="grow"></span>
    <button class="btn ${pos === 'bottom' ? 'primary' : ''}" data-go="${next?.id || ''}" ${next ? '' : 'disabled'}>${next ? 'Chương sau ›' : 'Hết (hiện có)'}</button></div>`;
  const ctrl = `<span class="seg st-fs"><button data-act="dn" title="Chữ nhỏ lại">A−</button><button data-act="up" title="Chữ to lên">A+</button></span>
    <button class="btn st-save ${mk ? 'on' : ''}" data-act="save" title="Lưu tiến trình đọc ngay tại đây (chương và vị trí). Mở lại truyện có thể quay về đúng điểm đã lưu">${mk ? '🔖 Đã lưu' : '💾 Lưu'}</button>`;
  root.innerHTML = `<div class="st-bar"><button class="btn st-title" id="stBack">← ${esc(s.title)}</button>${ctrl}<button class="btn" data-act="full" title="Chỉ hiện chữ truyện, không có thanh và thư mục xung quanh (bấm Esc hoặc nút ← Thoát để quay lại)">📺</button></div>
    <div class="nw-stage st-stage ${full ? 'full' : ''}" id="stStage"><div class="nwf-bar"><button class="btn" data-act="exit">← Thoát</button><span class="grow"></span>${ctrl}
        <button class="btn" data-act="readall" title="Đọc to chương bằng giọng máy">🔊</button><button class="btn" data-act="tapread" title="Bật rồi chạm vào một câu để nghe câu đó">👆</button><button class="btn" data-act="lookup" title="Bật rồi chạm vào từ trong truyện để tra nghĩa">📖</button></div>
      <div class="st-scroll" id="stScroll">${navRow('top')}
        <article class="nw-read st-read"><div class="nw-by dim">Chương ${c.n}/${chs.length}</div><h1 class="nw-ttl" lang="${bcp}">${esc(c.title)}</h1>
          <div class="nw-text st-text" id="stBody" lang="${bcp}" style="font-size:${fs()}px">${paras}</div></article>
        ${navRow('bottom')}</div></div>`;
  $('#stBack', root).onclick = () => nav('detail', { sid, page: -1 });
  $$('[data-go]', root).forEach(b => b.onclick = () => { if (b.dataset.go) openChapter(b.dataset.go, false); });
  const size = d => { lset('stFs', Math.max(15, Math.min(40, fs() + d))); $('#stBody', root).style.fontSize = fs() + 'px'; };
  $$('[data-act]', root).forEach(b => b.onclick = () => {
    const a = b.dataset.act;
    if (a === 'dn') size(-2); else if (a === 'up') size(2); else if (a === 'save') saveMark();
    else if (a === 'full') setFull(true); else if (a === 'exit') setFull(false);
    else { proxy(a); setTimeout(() => $$('[data-act=lookup]', root).forEach(x => x.classList.toggle('on', document.body.classList.contains('lookup'))), 0); }
  });
  // nhớ vị trí đọc; kéo gần hết chương thì tính là đã đọc xong chương này
  onScroll = () => {
    const f = fraction();
    clearTimeout(saveT);
    saveT = setTimeout(() => { const cur = store.get('stories', sid); if (cur && Math.abs((cur.pos || 0) - f) > 0.01) store.put('stories', sid, { pos: +f.toFixed(3), last: Date.now() }); }, 1500);
    if (f > 0.96 && (store.get('stories', sid)?.maxN || 0) < c.n) store.put('stories', sid, { maxN: c.n });
    if (f > 0.96 && !readOnce.has(c.id + vnDate())) { readOnce.add(c.id + vnDate()); tracker.read(); }
  };
  addEventListener('scroll', onScroll, { passive: true });
  $('#stScroll', root).addEventListener('scroll', onScroll, { passive: true });
  if (startPos > 0.01) requestAnimationFrame(() => jump(startPos)); else onScroll();
}

// ---------- vào / ra ----------
export function render(rt, c) {
  root = rt; ctx = c; active = true;
  if (view === 'add') return drawAdd();
  if (view === 'detail' && sid) return drawDetail();
  if (view === 'read' && sid && store.get('stories', sid)) return drawRead(0);
  view = 'shelf'; drawShelf();
}
export function reset() { leave(); view = 'shelf'; sid = null; }
function cleanup(keepFull = false) {
  if (onScroll) { removeEventListener('scroll', onScroll); onScroll = null; }
  clearTimeout(saveT);
  if (full && !keepFull) { full = false; document.body.classList.remove('sp-reading'); if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {}); }
}
export function init() {
  bus.on('show', v => { if (v !== 'world') leave(); });
  // truyện được thêm / xóa từ máy khác: vẽ lại kệ khi đang xem kệ
  bus.on('store', c => {
    if ((c !== 'stories' && c !== '*') || !active || document.body.dataset.view !== 'world' || view !== 'shelf') return;
    if (root && document.body.contains(root)) drawShelf();
  });
}
export function leave() { cleanup(); active = false; } // rời mục Story (sang Article / Social / trang khác)
