// Nhạc nền: tải file mp3 (hoặc âm thanh khác) lên, app trộn ngẫu nhiên và phát liên tục.
// File lưu trong máy (IndexedDB, như video), không đồng bộ, không tốn dung lượng đám mây. Danh sách + cài đặt lưu riêng từng máy.
import { $, esc, toast, bus, uid, pickFile, fmtMB } from './util.js';
import * as store from './store.js';
import { M } from './media.js';

const TKEY = 'musicList', CKEY = 'musicCfg', PRE = 'mus_';
const load = (k, d) => { try { return { ...d, ...JSON.parse(localStorage.getItem(k) || 'null') }; } catch { return d; } };
let tracks = (() => { try { const a = JSON.parse(localStorage.getItem(TKEY) || '[]'); return Array.isArray(a) ? a : []; } catch { return []; } })();
let cfg = load(CKEY, { mode: 'read', vol: 0.4 }); // mode: off | read (chỉ khi ở mục Thế giới: Article, Social) | always
const saveT = () => { try { localStorage.setItem(TKEY, JSON.stringify(tracks)); } catch {} };
const saveC = () => { try { localStorage.setItem(CKEY, JSON.stringify(cfg)); } catch {} };

let aud = null, cur = null, bag = [], forced = false, userPause = false, videoOn = false, hinted = false;

const view = () => document.body.dataset.view;
const want = () => !videoOn && tracks.length && (forced || (!userPause && (cfg.mode === 'always' || (cfg.mode === 'read' && view() === 'world'))));

function pick() { // túi trộn: mỗi bài phát một lượt rồi mới xáo lại
  if (!bag.length) {
    bag = tracks.map(t => t.id).sort(() => Math.random() - 0.5);
    if (bag.length > 1 && bag[0] === cur) bag.push(bag.shift());
  }
  return bag.shift();
}
async function play(id = cur || pick()) {
  if (!tracks.some(t => t.id === id)) id = pick();
  if (!id) return;
  const a = aud ||= Object.assign(new Audio(), { preload: 'auto' });
  a.volume = cfg.vol;
  if (cur !== id || !a.src) {
    const url = await store.assetURL(id);
    if (!url) { drop(id); return play(pick()); }
    cur = id; a.src = url; a.loop = tracks.length === 1;
  }
  try { await a.play(); } catch (e) {
    if (!hinted) { hinted = true; toast('Bấm 🎵 rồi “Phát” một lần để trình duyệt cho phép phát nhạc', 4000); }
  }
  draw();
}
function stop() { aud?.pause(); draw(); }
function next() { bag = bag.filter(x => tracks.some(t => t.id === x)); if (want()) play(pick()); else { aud?.pause(); draw(); } }
function sync() { if (want()) { if (!aud || aud.paused) play(); } else if (aud && !aud.paused) stop(); else draw(); }
function drop(id) { tracks = tracks.filter(t => t.id !== id); bag = bag.filter(x => x !== id); if (cur === id) { cur = null; aud?.pause(); } saveT(); store.delAsset(id); }

async function add() {
  const files = (await pickFile('audio/*,.mp3,.m4a,.ogg,.wav,.aac,.flac', true)).filter(f => f.type.startsWith('audio/') || /\.(mp3|m4a|ogg|wav|aac|flac|opus)$/i.test(f.name));
  if (!files.length) return;
  let n = 0;
  for (const f of files) {
    const id = PRE + uid();
    try { await store.putAsset(id, f, f.name); tracks.push({ id, name: f.name.replace(/\.[^.]+$/, ''), size: f.size }); n++; }
    catch (e) { toast('Không lưu được ' + f.name + ': ' + (e.message || e), 4000); }
  }
  saveT();
  if (n) { bag = []; if (cfg.mode === 'off') { cfg.mode = 'read'; saveC(); } toast(`Đã thêm ${n} bài nhạc`, 1800); }
  draw();
}

function draw() {
  const dlg = $('#musicDlg'); if (!dlg) return;
  $('#muMode').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === cfg.mode));
  $('#muVol').value = Math.round(cfg.vol * 100);
  const playing = !!aud && !aud.paused;
  $('#muPlay').textContent = playing ? '⏸ Dừng' : '▶ Phát';
  const t = tracks.find(x => x.id === cur);
  $('#muNow').innerHTML = playing && t ? `🎵 Đang phát: <b class="gt mu-name">${esc(t.name)}</b>` : tracks.length ? 'Đang dừng.' : 'Chưa có bài nào. Bấm “＋ Thêm nhạc” để tải file mp3 lên.';
  $('#muList').innerHTML = tracks.map(x => `<div class="mu-row ${x.id === cur ? 'on' : ''}"><span class="mu-name grow">${esc(x.name)}</span><small class="dim">${fmtMB(x.size || 0)}</small><button class="btn" data-del="${x.id}" title="Xóa bài này">✕</button></div>`).join('');
  $('#btnMusic').classList.toggle('on', playing);
}

export function init() {
  const dlg = $('#musicDlg'); if (!dlg) return;
  $('#btnMusic').onclick = () => { draw(); dlg.showModal(); };
  $('#muClose').onclick = () => dlg.close();
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  $('#muMode').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    cfg.mode = b.dataset.v; saveC(); userPause = false; forced = false; sync(); draw();
  });
  $('#muPlay').onclick = () => {
    if (!tracks.length) { add(); return; }
    if (aud && !aud.paused) { forced = false; userPause = true; stop(); } else { forced = true; userPause = false; videoOn = false; play(); }
  };
  $('#muNext').onclick = () => { if (!tracks.length) return; forced = forced || !userPause; userPause = false; play(pick()); };
  $('#muPrev').onclick = () => { if (aud) aud.currentTime = 0; };
  $('#muVol').oninput = e => { cfg.vol = (+e.target.value || 0) / 100; if (aud) aud.volume = cfg.vol; };
  $('#muVol').onchange = saveC;
  $('#muAdd').onclick = add;
  $('#muClear').onclick = () => { if (tracks.length && confirm('Xóa hết nhạc đã tải lên máy này?')) { [...tracks].forEach(t => drop(t.id)); forced = false; stop(); } };
  $('#muList').addEventListener('click', e => { const b = e.target.closest('[data-del]'); if (!b) return; const was = cur === b.dataset.del; drop(b.dataset.del); if (was) next(); draw(); });
  // nhạc tự chuyển bài khi hết bài
  aud = Object.assign(new Audio(), { preload: 'auto' });
  aud.addEventListener('ended', next);
  aud.addEventListener('error', () => { if (cur) { const id = cur; toast('Không phát được một bài nhạc, đã bỏ qua', 2500); drop(id); next(); } });
  aud.addEventListener('pause', draw); aud.addEventListener('play', draw);
  bus.on('show', () => { userPause = false; if (cfg.mode !== 'always' && view() !== 'world') forced = false; sync(); });
  // video / âm thanh bài học đang phát thì nhạc nền tạm nghỉ để không lẫn tiếng
  M.addEventListener('play', () => { videoOn = true; if (aud && !aud.paused) aud.pause(); });
  M.addEventListener('pause', () => { videoOn = false; sync(); });
  M.addEventListener('ended', () => { videoOn = false; sync(); });
  draw();
}
