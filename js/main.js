import { $, $$, bus, LANGS, getLang, setLang, toast, loadSimplifier } from './util.js';
import * as store from './store.js';
import { loadPrefs, prefs, savePrefs } from './prefs.js';
import * as player from './player.js';
import * as library from './library.js';
import * as notes from './notes.js';
import * as quests from './quests.js';
import * as side from './side.js';
import * as alignui from './alignui.js';
import * as dictation from './dictation.js';
import * as speak from './speak.js';
import * as shadowrec from './shadowrec.js';
import * as review from './review.js';
import * as backup from './backup.js';
import * as subedit from './subedit.js';
import * as subpaste from './subpaste.js';
import * as segments from './segments.js';
import { mountIcons, emojify } from './pixicons.js';
import { initI18n } from './i18n.js';
import * as settings from './settings.js';
import * as sfx from './sfx.js';
import * as fx from './fx.js';
import * as trash from './trash.js';
import * as lookup from './lookup.js';
import * as vocab from './vocab.js';
import * as find from './find.js';
import * as shortcuts from './shortcuts.js';
import * as offline from './offline.js';
import * as readaloud from './readaloud.js';
import * as world from './world.js';
import * as cueedit from './cueedit.js';

const firebaseConfig = {
  apiKey: "AIzaSyDP5ijko_nBpuqxVKxxviBA91kHYNhvrdo",
  authDomain: "shadowing-f1924.firebaseapp.com",
  projectId: "shadowing-f1924",
  storageBucket: "shadowing-f1924.firebasestorage.app",
  messagingSenderId: "762378914402",
  appId: "1:762378914402:web:77f6506ca4f5f5c5635f3b"
};

// ---------- điều hướng ----------
const cap = s => s[0].toUpperCase() + s.slice(1);
const trail = [];      // các trang đã xem, trang gần nhất ở cuối: nút Back chung quay lại theo thứ tự này
let backing = false;
function show(view) {
  const prev = document.body.dataset.view;
  if (!backing && prev && prev !== view) { trail.push(prev); if (trail.length > 40) trail.shift(); }
  document.body.dataset.view = view;
  $$('.view').forEach(s => s.classList.toggle('active', s.id === 'v' + cap(view)));
  $$('#nav button').forEach(b => b.classList.toggle('on', b.dataset.view === (view === 'doc' ? 'library' : view)));
  bus.emit('show', view);
  scrollTo(0, 0);
  refreshBack();
}
bus.on('nav', show);
$('#nav').addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(b.dataset.view); });

// ---------- nút Back chung (cả nút Back của Android / trình duyệt) ----------
// Mỗi lần bấm Back lùi MỘT bước, theo thứ tự: hộp thoại đang mở → khung tra từ → khung video bên cạnh →
// nút “←” của trang con đang hiện (ví dụ bài đọc về danh sách) → trang đã xem trước đó.
const btnBack = $('#btnBack');
const topDialog = () => [...document.querySelectorAll('dialog[open]')].pop();
const lookupOpen = () => { const p = $('#lkPop'); return !!p && !p.hidden; };
const sideOpen = () => document.body.classList.contains('side-open');
const pageBack = () => [...document.querySelectorAll('.view.active button')].find(b => /^\s*←/.test(b.textContent) && b.getClientRects().length); // getClientRects: đúng cả với nút nằm trong khung cố định (toàn màn hình)
const canBack = () => !!(topDialog() || lookupOpen() || sideOpen() || pageBack() || trail.length);
function goBack() {
  const d = topDialog();
  if (d) { d.close(); return true; }
  if (lookupOpen()) { $('#lkClose').click(); return true; }
  if (sideOpen()) { $('#sClose').click(); return true; }
  const b = pageBack();
  if (b) { b.click(); return true; }
  if (trail.length) { backing = true; try { show(trail.pop()); } finally { backing = false; } return true; }
  return false;
}
// Android / trình duyệt: khi có gì để lùi thì giữ sẵn một mục trong lịch sử; bấm Back của máy sẽ rơi vào đó và ta lùi một bước trong app.
// Hết chỗ để lùi thì bỏ mục đó, nên Back của máy lại thoát app như bình thường.
let armed = false, silent = false;
function refreshBack() {
  const can = canBack();
  btnBack.disabled = !can;
  if (can && !armed) { history.pushState({ shadow: 1 }, ''); armed = true; }
  else if (!can && armed) { armed = false; silent = true; history.back(); }
}
addEventListener('popstate', () => {
  if (silent) { silent = false; return; }
  if (!armed) return;
  armed = false;
  goBack();
  refreshBack();
});
let backT = 0;
const soon = () => { clearTimeout(backT); backT = setTimeout(() => { refreshBack(); backT = setTimeout(refreshBack, 450); }, 80); }; // sau khi trang tự vẽ xong (kể cả phần tải chậm)
for (const ev of ['click', 'keyup', 'close']) document.addEventListener(ev, soon, true);
btnBack.onclick = () => goBack();

// ---------- nút bật / tắt âm thanh nhanh ----------
const btnSfx = $('#btnSfx');
const syncSfx = () => { btnSfx.classList.toggle('off', !prefs.sfx); btnSfx.title = prefs.sfx ? 'Tắt âm thanh nút bấm' : 'Bật âm thanh nút bấm'; };
btnSfx.onclick = () => {
  prefs.sfx = prefs.sfx ? 0 : 1; savePrefs(); bus.emit('prefs'); syncSfx();
  if (prefs.sfx) sfx.play('ok');
  toast(prefs.sfx ? 'Đã bật âm thanh nút bấm' : 'Đã tắt âm thanh nút bấm', 1400);
};
bus.on('prefs', syncSfx);

// ---------- chọn ngôn ngữ ----------
function renderLangs() {
  $('#langs').innerHTML = LANGS.map(l =>
    `<button class="chip ${l.id === getLang() ? 'on' : ''}" data-l="${l.id}" title="${l.name}">${l.short}<small class="lname"> ${l.name.replace('Tiếng ', '')}</small></button>`).join('');
}
$('#langs').addEventListener('click', e => { const b = e.target.closest('button'); if (b) setLang(b.dataset.l); });
bus.on('lang', renderLangs);

// ---------- đăng nhập + đồng bộ ----------
let fb = null;
store.onStatus(t => { $('#sync').textContent = t; });
$('#btnUser').onclick = async () => {
  if (!fb) { toast('Chưa kết nối được Firebase (đang offline?)'); return; }
  if (fb.auth.currentUser) { if (confirm('Đăng xuất? Dữ liệu vẫn còn trong máy này.')) fb.A.signOut(fb.auth); return; }
  try { await fb.A.signInWithPopup(fb.auth, new fb.A.GoogleAuthProvider()); }
  catch (err) { toast('Đăng nhập lỗi: ' + (err.code || err.message), 5000); }
};
function onUser(u) {
  $('#btnUser').textContent = u ? '👤 ' + (u.displayName || u.email || 'OK').split(' ').pop() : 'Đăng nhập';
  $('#btnUser').classList.toggle('in', !!u);
  store.setUser(u, fb);
}
async function initFirebase() {
  try {
    const B = 'https://www.gstatic.com/firebasejs/10.14.1/';
    const [{ initializeApp }, A, F] = await Promise.all([import(B + 'firebase-app.js'), import(B + 'firebase-auth.js'), import(B + 'firebase-firestore.js')]);
    const app = initializeApp(firebaseConfig);
    let db;
    try { db = F.initializeFirestore(app, { localCache: F.persistentLocalCache({ tabManager: F.persistentMultipleTabManager() }) }); }
    catch { db = F.getFirestore(app); }
    const auth = A.getAuth(app);
    fb = { A, F, db, auth };
    A.onAuthStateChanged(auth, onUser);
  } catch (e) {
    console.warn('Firebase không tải được:', e);
    $('#sync').textContent = 'offline: chưa đồng bộ';
  }
}

// ---------- khởi động ----------
mountIcons();
initI18n(); // dịch chữ giao diện nếu chọn tiếng Anh (phải chạy trước emojify)
emojify(); // emoji trong giao diện -> biểu tượng pixel (nội dung của người dùng giữ nguyên)
settings.init();
sfx.init();
fx.init();
await store.initStore();
loadPrefs();
syncSfx();
bus.on('store', c => { if (c === 'prefs' || c === '*') { loadPrefs(); bus.emit('prefs'); } });
renderLangs();
player.init(); side.init(); library.init(); notes.init(); quests.init(); alignui.init(); dictation.init(); speak.init(); shadowrec.init(); review.init(); backup.init(); subedit.init(); subpaste.init(); segments.init(); trash.init(); lookup.init(); vocab.init(); find.init(); shortcuts.init(); offline.init(); readaloud.init(); world.init(); cueedit.init();
show('library');
initFirebase();
loadSimplifier(); // sẵn sàng đổi phồn thể → giản thể (chỉ ~100 KB)
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
