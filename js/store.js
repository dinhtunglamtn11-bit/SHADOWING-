// Kho dữ liệu: lưu trong máy (IndexedDB) trước, đồng bộ lên Firestore khi đã đăng nhập.
// - Tài liệu (items, folders, days, prefs): đồng bộ, bản nào mới hơn (trường u) thì thắng.
// - File (video, PDF, âm thanh): chỉ lưu trong máy này, không đồng bộ.
import { bus, vnDate, addDays } from './util.js';

const COLS = ['items', 'folders', 'days', 'prefs', 'cards', 'sets', 'hw', 'wsets', 'articles', 'wfolders', 'tests', 'mistakes', 'wwords', 'posts'];
const mem = Object.fromEntries(COLS.map(c => [c, new Map()]));
let idb = null;
let sync = null;
let statusCb = () => {};
const urls = new Map();

const req = r => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
const os = (name, mode = 'readonly') => idb.transaction(name, mode).objectStore(name);

export async function initStore() {
  try {
    idb = await new Promise((res, rej) => {
      const r = indexedDB.open('shadowing', 1);
      r.onupgradeneeded = () => {
        r.result.createObjectStore('docs', { keyPath: 'k' });
        r.result.createObjectStore('assets', { keyPath: 'id' });
      };
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    const all = await req(os('docs').getAll());
    for (const r of all) mem[r.c]?.set(r.id, r.data);
  } catch (e) { console.warn('IndexedDB lỗi:', e); idb = null; }
  try { navigator.storage?.persist?.(); } catch {}
}

const saveLocal = (c, id, data) => { if (idb) os('docs', 'readwrite').put({ k: c + '/' + id, c, id, data }); };

// Gom thông báo “dữ liệu đổi”: nhập / xóa / khôi phục hàng trăm mục trong một vòng lặp chỉ vẽ lại màn hình MỘT lần
// (trước đây mỗi lần ghi là một lần vẽ lại: 360 video mất gần 2 giây).
const dirty = new Set();
let flushing = false;
function notify(c) {
  dirty.add(c);
  if (flushing) return;
  flushing = true;
  queueMicrotask(() => { flushing = false; const cs = [...dirty]; dirty.clear(); for (const x of cs) bus.emit('store', x); });
}

export const get = (c, id) => mem[c].get(id);
export const list = c => [...mem[c]].filter(([, d]) => !d.deleted).map(([id, d]) => ({ id, ...d }));

export function put(c, id, patch) {
  const next = { ...(mem[c].get(id) || {}), ...patch, u: Date.now() };
  mem[c].set(id, next);
  saveLocal(c, id, next);
  push(c, id, { ...patch, u: next.u }, true); // chỉ gửi phần thay đổi để nhẹ (vị trí phát lưu thường xuyên)
  notify(c);
  return next;
}
// Xóa mềm: giữ lại 30 ngày trong "Thùng rác" rồi mới dọn (purge) phần nội dung
export const del = (c, id) => put(c, id, { deleted: true, deletedAt: Date.now(), purged: false });
export const undelete = (c, id) => put(c, id, { deleted: false, deletedAt: 0, purged: false });
export const TRASHABLE = ['items', 'folders', 'cards', 'sets', 'wsets', 'articles', 'wfolders', 'tests', 'mistakes', 'wwords', 'posts'];
export const listDeleted = c => [...mem[c]].filter(([, d]) => d.deleted && !d.purged).map(([id, d]) => ({ id, ...d }));
const BLANK = { cues: '', body: '', text: '', front: '', back: [], title: '', name: '', src: '', fileName: '', assetId: '', qtext: '', source: '', qj: '', label: '', word: '', pron: '', meaning: '', sentence: '', comments: [] };
export function purge(c, id) { if (mem[c].has(id)) put(c, id, { ...BLANK, deleted: true, purged: true }); }
export function purgeOld(days = 30, max = 300) {
  const lim = Date.now() - days * 864e5; let n = 0;
  for (const c of TRASHABLE) for (const [id, d] of [...mem[c]]) {
    if (d.deleted && !d.purged && (d.deletedAt || d.u || 0) < lim) { purge(c, id); if (++n >= max) return n; }
  }
  return n;
}

// Khôi phục một tài liệu giữ nguyên dấu thời gian; chỉ ghi nếu mới hơn bản đang có
export function restore(c, id, data) {
  if (!mem[c]) return false;
  const l = mem[c].get(id);
  if (l && (l.u || 0) >= (data.u || 0)) return false;
  const d = { ...data }; delete d.id;
  mem[c].set(id, d); saveLocal(c, id, d); push(c, id, d);
  notify(c);
  return true;
}
export const dump = () => Object.fromEntries(COLS.map(c => [c, [...mem[c]].map(([id, d]) => ({ id, ...d }))]));

// ---------- đồng bộ Firestore ----------
export const onStatus = cb => { statusCb = cb; };

// merge = true: chỉ cập nhật các trường đã đổi. Trước khi bộ sưu tập đồng bộ xong lần đầu thì luôn gửi cả tài liệu.
function push(c, id, data, merge = false) {
  if (!sync) return;
  const { F, db, user } = sync;
  const ref = F.doc(db, 'users', user.uid, c, id), body = JSON.parse(JSON.stringify(data));
  (merge && sync.ready.has(c) ? F.setDoc(ref, body, { merge: true }) : F.setDoc(ref, merge ? { ...(mem[c].get(id) || {}), ...body } : body))
    .catch(e => { console.warn('sync', c, e); statusCb('lỗi đồng bộ'); });
}

export function setUser(user, fb) {
  if (sync) { sync.unsubs.forEach(f => f()); sync = null; }
  if (!user || !fb) { statusCb(''); return; }
  const { F, db } = fb;
  sync = { F, db, user, unsubs: [], ready: new Set() };
  statusCb('đang đồng bộ…');
  const cutoff = addDays(vnDate(), -120);
  for (const c of COLS) {
    let q = F.collection(db, 'users', user.uid, c);
    if (c === 'days') q = F.query(q, F.where('date', '>=', cutoff));
    let first = true;
    const remote = new Map();
    sync.unsubs.push(F.onSnapshot(q, snap => {
      let changed = false;
      snap.docChanges().forEach(ch => {
        if (ch.type === 'removed') return;
        const id = ch.doc.id, r = ch.doc.data();
        remote.set(id, r.u || 0);
        const l = mem[c].get(id);
        if (!l || (r.u || 0) > (l.u || 0)) { mem[c].set(id, r); saveLocal(c, id, r); changed = true; }
      });
      if (first) {
        first = false; sync.ready.add(c);
        for (const [id, l] of mem[c]) {
          if (c === 'days' && l.date < cutoff) continue;
          if ((l.u || 0) > (remote.get(id) || 0)) push(c, id, l);
        }
      }
      if (changed) bus.emit('store', c);
      statusCb('✓ đã đồng bộ');
    }, err => { console.warn(err); statusCb('lỗi quyền truy cập: kiểm tra Rules'); }));
  }
}

// ---------- file lưu trong máy ----------
export async function putAsset(id, blob, name = '') {
  if (!idb) throw new Error('trình duyệt không cho lưu file');
  await req(os('assets', 'readwrite').put({ id, blob, name, type: blob.type, size: blob.size }));
  if (urls.has(id)) { URL.revokeObjectURL(urls.get(id)); urls.delete(id); }
}
export async function getAsset(id) { return idb && id ? req(os('assets').get(id)) : undefined; }
export async function hasAsset(id) { return !!(idb && id && (await req(os('assets').getKey(id)))); }
export async function delAsset(id) {
  if (!idb || !id) return;
  if (urls.has(id)) { URL.revokeObjectURL(urls.get(id)); urls.delete(id); }
  await req(os('assets', 'readwrite').delete(id));
}
export async function assetURL(id) {
  if (urls.has(id)) return urls.get(id);
  const a = await getAsset(id);
  if (!a) return null;
  const u = URL.createObjectURL(a.blob);
  urls.set(id, u);
  return u;
}
export async function usage() {
  try { const e = await navigator.storage.estimate(); return { used: e.usage || 0, quota: e.quota || 0 }; } catch { return null; }
}
