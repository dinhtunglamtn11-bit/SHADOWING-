// Service worker: ưu tiên mạng (luôn lấy bản mới), mất mạng thì dùng bản đã lưu.
const CACHE = 'shadowing-v125';
const DICT_CACHE = 'shadowing-dict'; // từ điển ~9 MB: giữ riêng để không bị xóa mỗi lần cập nhật app
const SHELL = [
  './', 'index.html', 'styles.css', 'pixel.css', 'exnews.css', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png',
  'js/main.js', 'js/pixicons.js', 'js/i18n.js', 'js/en-a.js', 'js/en-b.js', 'js/en-c.js', 'js/settings.js', 'js/en-d.js', 'js/zh-en.js', 'js/zh-a.js', 'js/zh-b.js', 'js/zh-c.js', 'js/zh-d.js', 'js/trash.js', 'js/dict.js', 'js/wikt.js', 'js/lookup.js', 'js/vocab.js', 'js/find.js', 'js/fsrs.js', 'js/shadowviz.js', 'js/shortcuts.js', 'js/offline.js', 'js/readaloud.js', 'js/util.js', 'js/store.js', 'js/prefs.js', 'js/tracker.js',
  'js/media.js', 'js/align.js', 'js/alignui.js', 'js/dictation.js', 'js/speak.js', 'js/cards.js', 'js/clip.js', 'js/quiz.js', 'js/review.js', 'js/tts.js', 'js/sets.js', 'js/exparse.js', 'js/videx.js', 'js/passport.js', 'js/pass-world.js', 'js/pass-kit.js', 'js/pass-jp1.js', 'js/pass-jp2.js', 'js/pass-jp3.js', 'js/pass-jp4.js', 'js/pass-jp5.js', 'js/pass-story.js', 'js/pass-kr1.js', 'js/pass-kr2.js', 'js/pass-kr3.js', 'js/pass-cn1.js', 'js/pass-cn2.js', 'js/pass-cn3.js', 'js/pass-cn4.js', 'js/pass-cn5.js', 'js/pass-cn6.js', 'js/pass-vn1.js', 'js/pass-vn2.js', 'js/pass-vn3.js', 'js/pass-vn4.js', 'js/pass-vn5.js', 'js/pass-vn6.js', 'js/pass-fr1.js', 'js/pass-fr2.js', 'js/pass-fr3.js', 'js/pass-fr4.js', 'js/pass-fr5.js', 'js/pass-fr6.js', 'js/pass-eg1.js', 'js/pass-eg2.js', 'js/pass-eg3.js', 'js/pass-eg4.js', 'js/pass-eg5.js', 'js/pass-eg6.js', 'js/pass-us1.js', 'js/pass-us2.js', 'js/pass-us3.js', 'js/pass-us4.js', 'js/pass-us5.js', 'js/pass-us6.js', 'js/pass-story-us.js', 'js/pass-skins.js', 'js/skin.js', 'js/pass-sh8.js', 'js/pass-sh1.js', 'js/pass-sh2.js', 'js/pass-sh3.js', 'js/pass-sh4.js', 'js/pass-sh5.js', 'js/pass-sh6.js', 'js/pass-sh7.js', 'js/pass-my1.js', 'js/pass-my2.js', 'js/pass-my3.js', 'js/pass-my4.js', 'js/pass-my5.js', 'js/pass-my6.js', 'js/pass-story-my.js', 'js/pass-ch1.js', 'js/pass-ch2.js', 'js/pass-ch3.js', 'js/pass-ch4.js', 'js/pass-ch5.js', 'js/pass-ch6.js', 'js/pass-story-ch.js', 'js/pass-ly1.js', 'js/pass-ly2.js', 'js/pass-ly3.js', 'js/pass-ly4.js', 'js/pass-ly5.js', 'js/pass-ly6.js', 'js/pass-story-ly.js', 'js/pass-map.js', 'js/prompts.js', 'js/scm.js', 'js/scm-keys.js', 'js/scm-engines.js', 'js/scm-engines2.js', 'js/scm-keys2.js', 'js/scm-cases2.json', 'js/scm-img/b2-image1.png', 'js/scm-img/b2-image2.png', 'js/scm-img/b2-image3.png', 'js/scm-img/b2-image4.png', 'js/scm-img/b2-image5.png', 'js/scm-img/b2-image6.png', 'js/scm-img/b2-image7.png', 'js/scm-img/b2-image8.png', 'js/scm-img/b2-image9.png', 'js/scm-img/b2-image10.png', 'js/scm-img/b2-image11.png', 'js/scm-img/b2-image12.png', 'js/scm-art.js', 'js/scm-cases.json', 'js/scm-img/image1.png', 'js/scm-img/image10.png', 'js/scm-img/image11.png', 'js/scm-img/image12.png', 'js/scm-img/image13.png', 'js/scm-img/image14.png', 'js/scm-img/image15.png', 'js/scm-img/image16.png', 'js/scm-img/image17.png', 'js/scm-img/image18.png', 'js/scm-img/image19.png', 'js/scm-img/image2.png', 'js/scm-img/image20.png', 'js/scm-img/image21.png', 'js/scm-img/image3.png', 'js/scm-img/image4.png', 'js/scm-img/image5.png', 'js/scm-img/image6.png', 'js/scm-img/image7.png', 'js/scm-img/image8.png', 'js/scm-img/image9.png', 'js/pass-iso.js', 'js/world-110m.json', 'js/lamefx.js', 'js/pass-au1.js', 'js/pass-au2.js', 'js/pass-au3.js', 'js/pass-au4.js', 'js/pass-au5.js', 'js/pass-au6.js', 'js/pass-story-au.js', 'js/pass-br1.js', 'js/pass-br2.js', 'js/pass-br3.js', 'js/pass-br4.js', 'js/pass-br5.js', 'js/pass-br6.js', 'js/pass-story-br.js', 'js/pass-in1.js', 'js/pass-in2.js', 'js/pass-in3.js', 'js/pass-in4.js', 'js/pass-in5.js', 'js/pass-in6.js', 'js/pass-story-in.js', 'js/pass-count.js', 'js/pass-nz1.js', 'js/pass-nz2.js', 'js/pass-nz3.js', 'js/pass-nz4.js', 'js/pass-nz5.js', 'js/pass-nz6.js', 'js/pass-story-nz.js', 'js/pass-story-eg.js', 'js/pass-story-fr.js', 'js/pass-story-vn.js', 'js/pass-story-cn.js', 'js/pass-kr4.js', 'js/pass-kr5.js', 'js/pass-story-kr.js', 'js/pass-lame.js', 'js/lame.js', 'js/exrun.js', 'js/exprompts.js', 'js/world.js', 'js/social.js', 'js/story.js', 'js/richtext.js', 'js/sfx.js', 'js/music.js', 'js/lbl.js', 'js/focusmode.js', 'js/pylab.js', 'js/pylab-rad.js', 'js/pylab-data.js', 'js/pylab-data2.js', 'js/pylab-data3.js', 'js/fx.js', 'js/shadowrec.js', 'js/asrworker.js', 'js/cuehtml.js', 'js/cueedit.js', 'js/tree.js', 'js/mistakes.js', 'js/wvocab.js', 'js/mistakeui.js', 'js/achieve.js', 'js/lessons.js', 'js/exsheet.js', 'js/dnd.js', 'js/writing.js', 'js/backup.js', 'js/subedit.js', 'js/subpaste.js', 'js/strokes.js', 'js/writeset.js', 'js/segments.js', 'js/player.js', 'js/library.js', 'js/notes.js', 'js/side.js', 'js/quests.js',
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










