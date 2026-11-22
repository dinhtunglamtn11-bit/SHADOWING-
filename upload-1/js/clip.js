// Phát lại một đoạn (một câu) từ video đã lưu trong máy, và đọc to bằng giọng máy khi không có video.
import * as store from './store.js';
import * as tracker from './tracker.js';
import { getLang } from './util.js';

const audio = new Audio();
let stopAt = null, lang = 'zh', playing = false, loaded = '';
audio.addEventListener('timeupdate', () => { if (stopAt != null && audio.currentTime >= stopAt) { audio.pause(); stopAt = null; } });
audio.addEventListener('play', () => { playing = true; });
['pause', 'ended'].forEach(e => audio.addEventListener(e, () => { playing = false; }));
tracker.addSource(() => (playing ? lang : null));

export async function canPlay(itemId) {
  const it = itemId && store.get('items', itemId);
  return !!(it && await store.hasAsset(it.assetId));
}

export async function playClip(itemId, t0, t1, l) {
  const it = itemId && store.get('items', itemId);
  const url = it && await store.assetURL(it.assetId);
  if (!url) return false;
  lang = l || it.lang || getLang();
  audio.pause();
  if (loaded !== url) {
    loaded = url; audio.src = url;
    await new Promise(r => { audio.onloadedmetadata = r; setTimeout(r, 2500); });
  }
  audio.currentTime = Math.max(0, t0 - 0.05);
  stopAt = t1 + 0.1;
  await audio.play().catch(() => {});
  return true;
}
export const stopClip = () => { audio.pause(); stopAt = null; };

export { say } from './tts.js';
