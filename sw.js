// Service worker: vÃ¡Â»Â app (Ã„â€˜ÃƒÂºng danh sÃƒÂ¡ch SHELL) lÃ¡ÂºÂ¥y tÃ¡Â»Â« bÃ¡Â»â„¢ nhÃ¡Â»â€º Ã„â€˜Ã¡Â»â€¡m ngay (mÃ¡Â»Å¸ app tÃ¡Â»Â©c thÃƒÂ¬, khÃƒÂ´ng chÃ¡Â»Â mÃ¡ÂºÂ¡ng) vÃƒÂ  luÃƒÂ´n cÃƒÂ¹ng MÃ¡Â»ËœT phiÃƒÂªn bÃ¡ÂºÂ£n (bÃ¡Â»â„¢ nhÃ¡Â»â€º Ã„â€˜Ã¡Â»â€¡m Ã„â€˜Ã†Â°Ã¡Â»Â£c tÃ¡ÂºÂ¡o nguyÃƒÂªn khÃ¡Â»â€˜i khi cÃƒÂ i;
// thiÃ¡ÂºÂ¿u mÃ¡Â»â„¢t file trÃƒÂªn mÃƒÂ¡y chÃ¡Â»Â§ thÃƒÂ¬ bÃ¡ÂºÂ£n mÃ¡Â»â€ºi khÃƒÂ´ng cÃƒÂ i, app giÃ¡Â»Â¯ nguyÃƒÂªn bÃ¡ÂºÂ£n cÃ…Â© nhÃ¡ÂºÂ¥t quÃƒÂ¡n). CÃƒÂ¡c yÃƒÂªu cÃ¡ÂºÂ§u cÃƒÂ²n lÃ¡ÂºÂ¡i Ã†Â°u tiÃƒÂªn mÃ¡ÂºÂ¡ng, mÃ¡ÂºÂ¥t mÃ¡ÂºÂ¡ng thÃƒÂ¬ dÃƒÂ¹ng bÃ¡ÂºÂ£n Ã„â€˜ÃƒÂ£ lÃ†Â°u.
const CACHE = 'shadowing-v164';
const DICT_CACHE = 'shadowing-dict'; // tÃ¡Â»Â« Ã„â€˜iÃ¡Â»Æ’n ~9 MB: giÃ¡Â»Â¯ riÃƒÂªng Ã„â€˜Ã¡Â»Æ’ khÃƒÂ´ng bÃ¡Â»â€¹ xÃƒÂ³a mÃ¡Â»â€”i lÃ¡ÂºÂ§n cÃ¡ÂºÂ­p nhÃ¡ÂºÂ­t app
const SHELL = [
  './', 'index.html', 'styles.css', 'pixel.css', 'exnews.css', 'tealab.css', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png',
  'js/main.js', 'js/pixicons.js', 'js/i18n.js', 'js/en-a.js', 'js/en-b.js', 'js/en-c.js', 'js/settings.js', 'js/en-d.js', 'js/zh-en.js', 'js/zh-a.js', 'js/zh-b.js', 'js/zh-c.js', 'js/zh-d.js', 'js/trash.js', 'js/dict.js', 'js/wikt.js', 'js/lookup.js', 'js/vocab.js', 'js/find.js', 'js/fsrs.js', 'js/shadowviz.js', 'js/shortcuts.js', 'js/offline.js', 'js/readaloud.js', 'js/util.js', 'js/store.js', 'js/prefs.js', 'js/tracker.js',
  'js/media.js', 'js/align.js', 'js/alignui.js', 'js/dictation.js', 'js/speak.js', 'js/cards.js', 'js/clip.js', 'js/quiz.js', 'js/review.js', 'js/tts.js', 'js/sets.js', 'js/exparse.js', 'js/videx.js', 'js/passport.js', 'js/pass-world.js', 'js/pass-kit.js', 'js/pass-jp1.js', 'js/pass-jp2.js', 'js/pass-jp3.js', 'js/pass-jp4.js', 'js/pass-jp5.js', 'js/pass-story.js', 'js/pass-kr1.js', 'js/pass-kr2.js', 'js/pass-kr3.js', 'js/pass-cn1.js', 'js/pass-cn2.js', 'js/pass-cn3.js', 'js/pass-cn4.js', 'js/pass-cn5.js', 'js/pass-cn6.js', 'js/pass-vn1.js', 'js/pass-vn2.js', 'js/pass-vn3.js', 'js/pass-vn4.js', 'js/pass-vn5.js', 'js/pass-vn6.js', 'js/pass-fr1.js', 'js/pass-fr2.js', 'js/pass-fr3.js', 'js/pass-fr4.js', 'js/pass-fr5.js', 'js/pass-fr6.js', 'js/pass-eg1.js', 'js/pass-eg2.js', 'js/pass-eg3.js', 'js/pass-eg4.js', 'js/pass-eg5.js', 'js/pass-eg6.js', 'js/pass-us1.js', 'js/pass-us2.js', 'js/pass-us3.js', 'js/pass-us4.js', 'js/pass-us5.js', 'js/pass-us6.js', 'js/pass-story-us.js', 'js/pass-skins.js', 'js/skin.js', 'js/pass-sh8.js', 'js/pass-sh1.js', 'js/pass-sh2.js', 'js/pass-sh3.js', 'js/pass-sh4.js', 'js/pass-sh5.js', 'js/pass-sh6.js', 'js/pass-sh7.js', 'js/pass-my1.js', 'js/pass-my2.js', 'js/pass-my3.js', 'js/pass-my4.js', 'js/pass-my5.js', 'js/pass-my6.js', 'js/pass-story-my.js', 'js/pass-ch1.js', 'js/pass-ch2.js', 'js/pass-ch3.js', 'js/pass-ch4.js', 'js/pass-ch5.js', 'js/pass-ch6.js', 'js/pass-story-ch.js', 'js/pass-ly1.js', 'js/pass-ly2.js', 'js/pass-ly3.js', 'js/pass-ly4.js', 'js/pass-ly5.js', 'js/pass-ly6.js', 'js/pass-story-ly.js', 'js/pass-map.js', 'js/prompts.js', 'js/scm.js', 'js/scm-keys.js', 'js/scm-engines.js', 'js/scm-engines2.js', 'js/scm-events.js', 'js/vocabbank.js', 'js/contentstats.js', 'js/scm-keys2.js', 'js/scm-cases2.json', 'js/scm-img/b2-image1.png', 'js/scm-img/b2-image2.png', 'js/scm-img/b2-image3.png', 'js/scm-img/b2-image4.png', 'js/scm-img/b2-image5.png', 'js/scm-img/b2-image6.png', 'js/scm-img/b2-image7.png', 'js/scm-img/b2-image8.png', 'js/scm-img/b2-image9.png', 'js/scm-img/b2-image10.png', 'js/scm-img/b2-image11.png', 'js/scm-img/b2-image12.png', 'js/scm-art.js', 'js/scm-cases.json', 'js/scm-img/image1.png', 'js/scm-img/image10.png', 'js/scm-img/image11.png', 'js/scm-img/image12.png', 'js/scm-img/image13.png', 'js/scm-img/image14.png', 'js/scm-img/image15.png', 'js/scm-img/image16.png', 'js/scm-img/image17.png', 'js/scm-img/image18.png', 'js/scm-img/image19.png', 'js/scm-img/image2.png', 'js/scm-img/image20.png', 'js/scm-img/image21.png', 'js/scm-img/image3.png', 'js/scm-img/image4.png', 'js/scm-img/image5.png', 'js/scm-img/image6.png', 'js/scm-img/image7.png', 'js/scm-img/image8.png', 'js/scm-img/image9.png', 'js/pass-iso.js', 'js/world-110m.json', 'js/lamefx.js', 'js/pass-au1.js', 'js/pass-au2.js', 'js/pass-au3.js', 'js/pass-au4.js', 'js/pass-au5.js', 'js/pass-au6.js', 'js/pass-story-au.js', 'js/pass-br1.js', 'js/pass-br2.js', 'js/pass-br3.js', 'js/pass-br4.js', 'js/pass-br5.js', 'js/pass-br6.js', 'js/pass-story-br.js', 'js/pass-ar1.js', 'js/pass-ar2.js', 'js/pass-ar3.js', 'js/pass-ar4.js', 'js/pass-ar5.js', 'js/pass-ar6.js', 'js/pass-story-ar.js', 'js/pass-gh1.js', 'js/pass-gh2.js', 'js/pass-gh3.js', 'js/pass-gh4.js', 'js/pass-gh5.js', 'js/pass-gh6.js', 'js/pass-story-gh.js', 'js/pass-nl1.js', 'js/pass-nl2.js', 'js/pass-nl3.js', 'js/pass-nl4.js', 'js/pass-nl5.js', 'js/pass-nl6.js', 'js/pass-story-nl.js', 'js/pass-in1.js', 'js/pass-in2.js', 'js/pass-in3.js', 'js/pass-in4.js', 'js/pass-in5.js', 'js/pass-in6.js', 'js/pass-story-in.js', 'js/pass-count.js', 'js/pass-nz1.js', 'js/pass-nz2.js', 'js/pass-nz3.js', 'js/pass-nz4.js', 'js/pass-nz5.js', 'js/pass-nz6.js', 'js/pass-story-nz.js', 'js/pass-story-eg.js', 'js/pass-story-fr.js', 'js/pass-story-vn.js', 'js/pass-story-cn.js', 'js/pass-kr4.js', 'js/pass-kr5.js', 'js/pass-story-kr.js', 'js/pass-lame.js', 'js/lame.js', 'js/exrun.js', 'js/exprompts.js', 'js/world.js', 'js/social.js', 'js/story.js', 'js/richtext.js', 'js/sfx.js', 'js/music.js', 'js/lbl.js', 'js/focusmode.js', 'js/pylab.js', 'js/pylab-rad.js', 'js/pylab-data.js', 'js/pylab-data2.js', 'js/pylab-data3.js', 'js/pylab-pron.js', 'js/pylab-pron-data.js', 'js/tl-data.js', 'js/tl-engine.js', 'js/tl-art.js', 'js/tl-art2.js', 'js/tl-scene.js', 'js/tl-guide.js', 'js/tl-hist.js', 'js/tl-win.js', 'js/tl-calc.js', 'js/tealab.js', 'js/fx.js', 'js/shadowrec.js', 'js/asrworker.js', 'js/cuehtml.js', 'js/cueedit.js', 'js/tree.js', 'js/mistakes.js', 'js/wvocab.js', 'js/mistakeui.js', 'js/achieve.js', 'js/lessons.js', 'js/exsheet.js', 'js/dnd.js', 'js/writing.js', 'js/backup.js', 'js/subedit.js', 'js/subpaste.js', 'js/strokes.js', 'js/writeset.js', 'js/segments.js', 'js/player.js', 'js/library.js', 'js/notes.js', 'js/side.js', 'js/quests.js',
];

const DEV = ['localhost', '127.0.0.1'].includes(self.location.hostname); // khi phÃƒÂ¡t triÃ¡Â»Æ’n trÃƒÂªn mÃƒÂ¡y: luÃƒÂ´n lÃ¡ÂºÂ¥y file mÃ¡Â»â€ºi nhÃ¡ÂºÂ¥t, khÃƒÂ´ng dÃƒÂ¹ng bÃ¡Â»â„¢ nhÃ¡Â»â€º Ã„â€˜Ã¡Â»â€¡m Ã†Â°u tiÃƒÂªn
const SHELL_PATHS = new Set(SHELL.map(u => new URL(u, self.location.href).pathname));
const netFirst = (req, url) => fetch(req, url.origin === location.origin ? { cache: 'no-cache' } : undefined)
  .then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; })
  .catch(() => caches.match(req).then(r => r || caches.match('index.html')));
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(new Request(u, { cache: 'no-cache' })))).then(() => c.put('__installed', new Response('1'))))); // dÃ¡ÂºÂ¥u hiÃ¡Â»â€¡u cÃƒÂ i Ã„â€˜Ã¡Â»Â§: trang dÃƒÂ¹ng nÃƒÂ³ Ã„â€˜Ã¡Â»Æ’ biÃ¡ÂºÂ¿t bÃ¡ÂºÂ£n mÃ¡Â»â€ºi Ã„â€˜ÃƒÂ£ cÃƒÂ i xong; // hÃ¡Â»Âi lÃ¡ÂºÂ¡i mÃƒÂ¡y chÃ¡Â»Â§ tÃ¡Â»Â«ng file (ETag: file khÃƒÂ´ng Ã„â€˜Ã¡Â»â€¢i chÃ¡Â»â€° tÃ¡Â»â€˜n mÃ¡Â»â„¢t phÃ¡ÂºÂ£n hÃ¡Â»â€œi 304); thiÃ¡ÂºÂ¿u mÃ¡Â»â„¢t file thÃƒÂ¬ cÃ¡ÂºÂ£ lÃ¡ÂºÂ§n cÃƒÂ i thÃ¡ÂºÂ¥t bÃ¡ÂºÂ¡i vÃƒÂ  bÃ¡ÂºÂ£n cÃ…Â© vÃ¡ÂºÂ«n chÃ¡ÂºÂ¡y
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
  if (url.origin === location.origin && url.pathname.endsWith('/dict/cedict.txt')) { // Ã†Â°u tiÃƒÂªn bÃ¡ÂºÂ£n Ã„â€˜ÃƒÂ£ lÃ†Â°u
    e.respondWith(caches.open(DICT_CACHE).then(c => c.match(req).then(r => r || fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }))));
    return;
  }
  // vÃ¡Â»Â app: lÃ¡ÂºÂ¥y tÃ¡Â»Â« bÃ¡Â»â„¢ nhÃ¡Â»â€º Ã„â€˜Ã¡Â»â€¡m trÃ†Â°Ã¡Â»â€ºc (cÃƒÂ¹ng mÃ¡Â»â„¢t phiÃƒÂªn bÃ¡ÂºÂ£n, mÃ¡Â»Å¸ tÃ¡Â»Â©c thÃƒÂ¬); trang chÃƒÂ­nh (Ã„â€˜iÃ¡Â»Âu hÃ†Â°Ã¡Â»â€ºng) luÃƒÂ´n trÃ¡ÂºÂ£ index.html Ã„â€˜ÃƒÂ£ lÃ†Â°u
  if (!DEV && url.origin === location.origin && (req.mode === 'navigate' || SHELL_PATHS.has(url.pathname))) {
    e.respondWith(caches.match(req.mode === 'navigate' ? 'index.html' : req, { ignoreSearch: true }).then(hit => hit || netFirst(req, url)));
    return;
  }
  e.respondWith(netFirst(req, url));
});










