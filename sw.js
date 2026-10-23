// Service worker: ưu tiên mạng (luôn lấy bản mới), mất mạng thì dùng bản đã lưu.
const CACHE = 'shadowing-v28';
const DICT_CACHE = 'shadowing-dict'; // từ điển ~9 MB: giữ riêng để không bị xóa mỗi lần cập nhật app
const SHELL = [
  './', 'index.html', 'styles.css', 'pixel.css', 'exnews.css', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png',
  'js/main.js', 'js/pixicons.js', 'js/i18n.js', 'js/en-a.js', 'js/en-b.js', 'js/en-c.js', 'js/settings.js', 'js/en-d.js', 'js/zh-en.js', 'js/zh-a.js', 'js/zh-b.js', 'js/zh-c.js', 'js/zh-d.js', 'js/trash.js', 'js/dict.js', 'js/wikt.js', 'js/lookup.js', 'js/vocab.js', 'js/find.js', 'js/fsrs.js', 'js/shadowviz.js', 'js/shortcuts.js', 'js/offline.js', 'js/readaloud.js', 'js/util.js', 'js/store.js', 'js/prefs.js', 'js/tracker.js',
  'js/media.js', 'js/align.js', 'js/alignui.js', 'js/dictation.js', 'js/speak.js', 'js/cards.js', 'js/clip.js', 'js/quiz.js', 'js/review.js', 'js/tts.js', 'js/sets.js', 'js/exparse.js', 'js/exrun.js', 'js/exprompts.js', 'js/world.js', 'js/social.js', 'js/cuehtml.js', 'js/cueedit.js', 'js/tree.js', 'js/mistakes.js', 'js/wvocab.js', 'js/mistakeui.js', 'js/achieve.js', 'js/lessons.js', 'js/exsheet.js', 'js/dnd.js', 'js/writing.js', 'js/backup.js', 'js/subedit.js', 'js/subpaste.js', 'js/strokes.js', 'js/writeset.js', 'js/segments.js', 'js/player.js', 'js/library.js', 'js/notes.js', 'js/side.js', 'js/quests.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== DICT_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const ok = url.origin === location.origin
    || (url.origin === 'https://www.gstatic.com' && url.pathname.startsWith('/firebasejs/'))
    || url.origin === 'https://fonts.googleapis.com'
    || (url.origin === 'https://fonts.gstatic.com' && url.pathname.startsWith('/s/vt323/'))
    || (url.origin === 'https://cdnjs.cloudflare.com' && url.pathname.includes('/pdf.js/'))
    || (url.origin === 'https://cdn.jsdelivr.net' && /\/(npm\/(hanzi-writer|pinyin-pro|opencc-js|@huggingface\/transformers|onnxruntime-web)|gh\/(chanind\/hanzi-writer-data-jp|KanjiVG\/kanjivg))/.test(url.pathname));
  if (!ok) return;
  if (url.origin === location.origin && url.pathname.endsWith('/dict/cedict.txt')) { // ưu tiên bản đã lưu
    e.respondWith(caches.open(DICT_CACHE).then(c => c.match(req).then(r => r || fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }))));
    return;
  }
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('index.html')))
  );
});
