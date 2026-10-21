// Ghi lại thời gian và hoạt động học, tính theo giờ Việt Nam.
// Mỗi máy ghi vào tài liệu riêng (ngày_máy) nên hai máy học cùng lúc không đè dữ liệu nhau.
import * as store from './store.js';
import { vnDate, vnHour, deviceId } from './util.js';

const sources = [];
let pend = {};
let ticks = 0;

// fn trả về mã ngôn ngữ nếu đang có media phát, ngược lại trả về null
export const addSource = fn => sources.push(fn);

function ensure() {
  const d = vnDate();
  if (pend.date && pend.date !== d) flush();
  if (!pend.date) pend = { date: d, h: {}, l: {}, sec: 0, s: 0, r: 0, w: 0, d: 0, k: 0, c: 0, q: 0, qc: 0, x: 0 };
  return pend;
}

setInterval(() => {
  let l = null;
  for (const f of sources) { l = f(); if (l) break; }
  if (!l) return;
  const p = ensure(), h = vnHour();
  p.h[h] = (p.h[h] || 0) + 1;
  p.l[l] = (p.l[l] || 0) + 1;
  p.sec++;
  if (++ticks % 15 === 0) flush();
}, 1000);

export const sentence = () => { ensure().s++; };
export const read = () => { ensure().r++; flush(); };
export const write = () => { ensure().w++; flush(); };
export const dictation = () => { ensure().d++; flush(); };
export const speak = () => { ensure().k++; flush(); };
export const hw = () => { ensure().x++; flush(); };                  // viết xong 1 chữ
export const card = () => { ensure().c++; flush(); };               // ôn 1 thẻ
export const quiz = ok => { const p = ensure(); p.q++; if (ok) p.qc++; flush(); }; // làm 1 câu bài tập

export function flush() {
  const p = pend;
  if (!p.date || !(p.sec || p.s || p.r || p.w || p.d || p.k || p.c || p.q || p.x)) return;
  pend = {};
  const id = p.date + '_' + deviceId();
  const c = store.get('days', id) || {};
  const sum = (a = {}, b) => { const o = { ...a }; for (const k in b) o[k] = (o[k] || 0) + b[k]; return o; };
  store.put('days', id, {
    date: p.date, dev: deviceId(),
    sec: (c.sec || 0) + p.sec, s: (c.s || 0) + p.s, r: (c.r || 0) + p.r, w: (c.w || 0) + p.w, d: (c.d || 0) + (p.d || 0), k: (c.k || 0) + (p.k || 0),
    c: (c.c || 0) + (p.c || 0), q: (c.q || 0) + (p.q || 0), qc: (c.qc || 0) + (p.qc || 0), x: (c.x || 0) + (p.x || 0),
    h: sum(c.h, p.h), l: sum(c.l, p.l),
  });
}
document.addEventListener('visibilitychange', () => { if (document.hidden) flush(); });
addEventListener('pagehide', flush);

// Gộp số liệu của mọi máy theo ngày
export function byDate() {
  flush();
  const m = new Map();
  for (const d of store.list('days')) {
    const a = m.get(d.date) || { date: d.date, sec: 0, s: 0, r: 0, w: 0, d: 0, k: 0, c: 0, q: 0, qc: 0, x: 0, h: {}, l: {} };
    a.sec += d.sec || 0; a.s += d.s || 0; a.r += d.r || 0; a.w += d.w || 0; a.d += d.d || 0; a.k += d.k || 0; a.c += d.c || 0; a.q += d.q || 0; a.qc += d.qc || 0; a.x += d.x || 0;
    for (const k in d.h) a.h[k] = (a.h[k] || 0) + d.h[k];
    for (const k in d.l) a.l[k] = (a.l[k] || 0) + d.l[k];
    m.set(d.date, a);
  }
  return m;
}
