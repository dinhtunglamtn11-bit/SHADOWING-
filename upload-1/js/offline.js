// "Dùng offline": tải sẵn các thành phần của app (từ điển, thư viện, phông, dữ liệu nét chữ, mô hình AI) để máy này dùng được khi mất mạng.
// Không gồm file video/PDF/âm thanh của bạn: những file đó chưa từng được lưu trên mạng.
// Các thành phần được trình duyệt giữ lại nhờ service worker (hoặc bộ nhớ đệm riêng của thư viện AI), mỗi máy tải một lần.
import { $, $$, esc, toast, loadSimplifier } from './util.js';
import * as dict from './dict.js';
import * as store from './store.js';
import { preloadWhisper } from './align.js';

const KEY = 'offline';
const PINYIN = 'https://cdn.jsdelivr.net/npm/pinyin-pro@3.29.5/+esm';
const HW_JS = 'https://cdn.jsdelivr.net/npm/hanzi-writer@3.7.2/dist/hanzi-writer.min.js';
const PDF = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
const FONT_CSS = 'https://fonts.googleapis.com/css2?family=VT323&display=swap';
const ZH_DATA = c => `https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${encodeURIComponent(c)}.json`;
const HAN = /\p{Script=Han}/u;

const done = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
const markDone = (id, info = {}) => { try { localStorage.setItem(KEY, JSON.stringify({ ...done(), [id]: { t: Date.now(), ...info } })); } catch { /* bỏ qua */ } };

async function get(url) { // tải qua service worker để được giữ lại; báo lỗi nếu không tải được
  const r = await fetch(url, { mode: 'cors' });
  if (!r.ok) throw new Error(url.split('/').slice(-1)[0] + ' (' + r.status + ')');
  await r.arrayBuffer();
}

// Các chữ Hán đang có trong thẻ và danh sách luyện viết
export function hanChars() {
  const s = new Set();
  const add = t => { for (const ch of t || '') if (HAN.test(ch)) s.add(ch); };
  store.list('cards').filter(c => (c.lang || 'zh') === 'zh').forEach(c => add(c.front));
  try { add(localStorage.getItem('hw:list:zh')); } catch { /* bỏ qua */ }
  return [...s].slice(0, 1500);
}

const whisper = (id, model, name, size) => ({
  id, name, size, on: false,
  run: p => { let best = 0, seen = new Map(); return preloadWhisper(model, (pct, f) => { seen.set(f, pct); const avg = [...seen.values()].reduce((a, b) => a + b, 0) / Math.max(4, seen.size) / 100; best = Math.max(best, avg); p(best, f.split('/').pop()); }); },
});

const ITEMS = [
  { id: 'dict', name: 'Từ điển tra từ (CC-CEDICT)', size: '9 MB', on: true, run: p => dict.loadDict(p) },
  { id: 'libs', name: 'Thư viện đọc PDF, tạo pinyin, đổi giản/phồn, viết chữ', size: '~3 MB', on: true,
    run: async p => {
      await loadSimplifier(); p(0.25);
      await import(PINYIN); p(0.5);
      await get(HW_JS); p(0.65);
      await get(PDF + 'pdf.min.js'); p(0.85);
      await get(PDF + 'pdf.worker.min.js'); p(1);
    } },
  { id: 'font', name: 'Phông chữ pixel', size: '~0,1 MB', on: true,
    run: async p => {
      const css = await (await fetch(FONT_CSS, { mode: 'cors' })).text();
      const urls = [...css.matchAll(/url\((https:[^)]+)\)/g)].map(m => m[1]);
      for (let i = 0; i < urls.length; i++) { await get(urls[i]); p((i + 1) / urls.length); }
    } },
  { id: 'strokes', name: 'Nét chữ của các chữ Hán đang có trong thẻ và danh sách viết', size: () => { const n = hanChars().length; return `${n} chữ, ~${Math.max(0.1, n * 2 / 1024).toFixed(1)} MB`; }, on: true,
    run: async p => {
      const list = hanChars(); let i = 0, ok = 0;
      const worker = async () => { while (i < list.length) { const c = list[i++]; try { await get(ZH_DATA(c)); ok++; } catch { /* chữ không có dữ liệu: bỏ qua */ } p(i / list.length); } };
      await Promise.all(Array.from({ length: 6 }, worker));
      return { n: ok };
    } },
  whisper('wbase', 'Xenova/whisper-base', 'Mô hình AI chấm phát âm và canh từ (cân bằng)', '~80 MB'),
  whisper('wsmall', 'Xenova/whisper-small', 'Mô hình AI chính xác hơn (chậm hơn)', '~250 MB'),
];

const status = id => { const d = done()[id]; return d ? '✓ đã tải ' + new Date(d.t).toLocaleDateString('vi-VN') : 'chưa tải'; };

function render() {
  $('#offList').innerHTML = ITEMS.map(it => `<label class="offrow"><input type="checkbox" data-id="${it.id}" ${it.on ? 'checked' : ''}>
    <span class="offn">${esc(it.name)}<small class="dim"> · ${esc(typeof it.size === 'function' ? it.size() : it.size)}</small></span>
    <span class="offst ${done()[it.id] ? 'ok' : 'dim'}">${status(it.id)}</span></label>`).join('');
}

let busy = false;
async function go() {
  if (busy) return;
  const sel = $$('#offList input:checked').map(x => ITEMS.find(i => i.id === x.dataset.id));
  if (!sel.length) { toast('Hãy tích chọn ít nhất một mục'); return; }
  if (!navigator.onLine) { toast('Đang mất mạng: hãy kết nối Internet rồi tải', 4000); return; }
  busy = true; $('#offGo').disabled = true; $('#offProg').hidden = false;
  const errs = [];
  for (let k = 0; k < sel.length; k++) {
    const it = sel[k];
    const say = (f, extra = '') => { $('#offProg').value = (k + f) / sel.length; $('#offStat').textContent = `Đang tải (${k + 1}/${sel.length}): ${it.name} ${Math.round(f * 100)}%${extra ? ' · ' + extra : ''}`; };
    say(0);
    try { const info = await it.run((f, extra) => say(Math.min(1, f), extra)); markDone(it.id, info || {}); }
    catch (e) { errs.push(`${it.name}: ${e.message || e}`); }
    render();
    $$('#offList input').forEach(x => { x.checked = sel.some(s => s.id === x.dataset.id) && !done()[x.dataset.id]; });
  }
  $('#offProg').hidden = true; busy = false; $('#offGo').disabled = false;
  $('#offStat').textContent = errs.length ? 'Có mục chưa tải được: ' + errs.join(' · ') : 'Xong. Máy này đã sẵn sàng dùng khi mất mạng.';
  toast(errs.length ? 'Một số mục chưa tải được' : 'Đã tải xong', 3500);
}

export function init() {
  render();
  $('#offGo').onclick = go;
  $('#btnSettings').addEventListener('click', () => { if (!busy) render(); });
}
