// Khung video nằm bên cạnh: bấm một chữ có gắn link là hiện ra, không chuyển trang.
// Thứ tự nguồn: file trong máy → link mp4 → YouTube → TikTok → mở link ở tab mới.
import { $, esc, toast, bus, uid, pickFile, getLang, classifySrc } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import { openItem, temp } from './player.js';
import { M } from './media.js';

const panel = $('#side'), sv = $('#sVideo'), frame = $('#sFrame'), msg = $('#sPick');
let itemId = null, lang = 'zh', seekOnce = null;

// Mặc định dùng youtube.com để khung video mang theo tài khoản YouTube đã đăng nhập trong trình duyệt (xem được video riêng tư / giới hạn độ tuổi).
// Tắt đi thì dùng youtube-nocookie.com: không gửi cookie, riêng tư hơn nhưng không nhận tài khoản.
const ytLogin = () => { try { return localStorage.getItem('ytLogin') !== 'off'; } catch { return true; } };
const setYtLogin = on => { try { localStorage.setItem('ytLogin', on ? 'on' : 'off'); } catch {} };

function show(mode) { // 'video' | 'iframe' | 'none'
  sv.hidden = mode !== 'video';
  frame.hidden = mode !== 'iframe';
  if (mode !== 'iframe') frame.removeAttribute('src');
  if (mode !== 'video') { sv.pause(); sv.removeAttribute('src'); sv.load(); }
}

export function close() {
  show('none'); msg.innerHTML = '';
  panel.hidden = true; itemId = null;
  document.body.classList.remove('side-open');
}

function playFile(url, start) {
  show('video');
  if (seekOnce) sv.removeEventListener('loadedmetadata', seekOnce);
  seekOnce = () => { if (start > 0) sv.currentTime = start; };
  sv.addEventListener('loadedmetadata', seekOnce, { once: true });
  sv.src = url;
  sv.play().catch(() => {});
}

export async function openSide(id, start = 0) {
  const it = store.get('items', id);
  if (!it || it.deleted || it.type !== 'video') { toast('Video này không còn trong thư viện'); return; }
  lang = it.lang || getLang();
  const src = classifySrc(it.src);
  const hasLocal = await store.hasAsset(it.assetId) || temp.has(id);

  // cùng video file đang mở: chỉ cần nhảy tới giây cần xem
  if (!panel.hidden && itemId === id && !sv.hidden && sv.src) { sv.currentTime = start; sv.play().catch(() => {}); return; }

  itemId = id;
  $('#sTitle').textContent = it.title;
  panel.className = it.frame === 'portrait' ? 'portrait' : 'landscape';
  panel.hidden = false;
  document.body.classList.add('side-open');
  msg.innerHTML = '';

  if (hasLocal) {
    let url = await store.assetURL(it.assetId);
    if (!url && temp.has(id)) url = URL.createObjectURL(temp.get(id));
    playFile(url, start); return;
  }
  if (src.kind === 'file') { playFile(it.src.trim(), start); return; }
  if (src.kind === 'youtube' || src.kind === 'tiktok') {
    M.pause(); // không để hai video phát cùng lúc
    show('iframe');
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.src = src.kind === 'youtube'
      ? `https://${ytLogin() ? 'www.youtube.com' : 'www.youtube-nocookie.com'}/embed/${src.id}?autoplay=1&playsinline=1&rel=0&start=${Math.floor(start || src.start || 0)}`
      : `https://www.tiktok.com/embed/v2/${src.id}`;
    return;
  }
  show('none');
  msg.innerHTML = (it.src ? `<a class="btn primary" href="${esc(it.src)}" target="_blank" rel="noopener">↗ Mở link nguồn</a>` : '') +
    '<button class="btn" id="sPickBtn">📂 Chọn file video</button>';
  $('#sPickBtn').onclick = () => pickFile('video/*,audio/*').then(async ([f]) => {
    if (!f) return;
    const aid = it.assetId || uid();
    try { await store.putAsset(aid, f, f.name); store.put('items', id, { assetId: aid, fileName: f.name, size: f.size }); }
    catch { temp.set(id, f); }
    openSide(id, start);
  });
}

function loginDialog(open = true) {
  const dlg = $('#loginDlg'), on = ytLogin(), it = itemId ? store.get('items', itemId) : null, c = it?.src ? classifySrc(it.src) : null;
  $('#lgUse').textContent = on ? '☑ Dùng tài khoản đã đăng nhập khi phát video nhúng' : '☐ Dùng tài khoản đã đăng nhập khi phát video nhúng';
  $('#lgUse').classList.toggle('on', on);
  $('#lgUseNote').textContent = on ? 'Đang bật: khung video YouTube dùng youtube.com nên nhận tài khoản bạn đã đăng nhập.' : 'Đang tắt: khung video YouTube dùng chế độ riêng tư (youtube-nocookie.com), không nhận tài khoản.';
  const a = $('#lgSrc'); a.hidden = !(it?.src && c && c.kind !== 'bad' && c.kind !== 'none'); if (!a.hidden) a.href = it.src.trim();
  $('#lgReload').disabled = !itemId;
  if (open) dlg.showModal();
}

export function init() {
  $('#sLogin').onclick = () => loginDialog();
  $('#loginOpen').onclick = () => { $('#uiDlg').close(); loginDialog(); };
  $('#lgClose').onclick = () => $('#loginDlg').close();
  $('#lgUse').onclick = () => { setYtLogin(!ytLogin()); loginDialog(false); };
  $('#lgReload').onclick = () => { const id = itemId; $('#loginDlg').close(); if (id) { close(); openSide(id, 0); } };
  $('#sClose').onclick = close;
  $('#sOpen').onclick = () => { const id = itemId; close(); if (id) openItem(id); };
  sv.addEventListener('play', () => M.pause()); // không để hai video phát cùng lúc
  tracker.addSource(() => (itemId && !sv.hidden && !sv.paused && !sv.ended && sv.readyState > 2 ? lang : null));
  bus.on('openSide', d => openSide(d.id, d.start || 0));
  show('none');
}
