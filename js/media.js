// Bộ phát chung: phát file trong máy / link mp4 bằng thẻ <video>, hoặc YouTube bằng IFrame API.
// Phần còn lại của app chỉ làm việc với đối tượng M (giống thẻ video).
import { $, toast } from './util.js';

const v = $('#v'), stage = $('#stage');

// ---------- YouTube ----------
let apiP = null;
function loadApi() {
  if (window.YT?.Player) return Promise.resolve();
  return apiP ||= new Promise((res, rej) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev?.(); res(); };
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.onerror = () => { apiP = null; rej(new Error('Không tải được YouTube (cần có mạng)')); };
    document.head.appendChild(s);
  });
}

class YTBackend extends EventTarget {
  p = null; state = -1; ready = false; rate = 1; eff = 1; needMeta = false;
  emit(n) { this.dispatchEvent(new Event(n)); }
  async load(id, start = 0) {
    await loadApi();
    this.state = -1; this.needMeta = true;
    if (this.p) { this.p.cueVideoById({ videoId: id, startSeconds: start }); return; }
    await new Promise(res => {
      this.p = new window.YT.Player('ytHost', {
        videoId: id,
        playerVars: { playsinline: 1, rel: 0, modestbranding: 1, start: Math.floor(start) },
        events: {
          onReady: () => { this.ready = true; this.playbackRate = this.rate; res(); },
          onStateChange: e => this.onState(e.data),
          onError: e => toast([100, 101, 150].includes(e.data) ? 'Video này không cho nhúng hoặc đã bị xóa. Dùng “Mở link”.' : 'YouTube báo lỗi ' + e.data, 5000),
        },
      });
    });
  }
  onState(s) {
    this.state = s;
    if (this.needMeta && (s === 5 || s === 1 || s === 2)) { this.needMeta = false; this.emit('loadedmetadata'); }
    if (s === 1) this.emit('play');
    else if (s === 2) this.emit('pause');
    else if (s === 0) { this.emit('ended'); this.emit('pause'); }
  }
  get currentTime() { try { return this.p?.getCurrentTime?.() || 0; } catch { return 0; } }
  set currentTime(x) { try { this.p?.seekTo(x, true); } catch {} }
  get duration() { try { return this.p?.getDuration?.() || 0; } catch { return 0; } }
  get paused() { return !(this.state === 1 || this.state === 3); }
  get ended() { return this.state === 0; }
  get readyState() { return this.ready ? 4 : 0; }
  get playbackRate() { return this.eff; }
  set playbackRate(r) {
    this.rate = r; this.eff = r;
    try {
      const av = this.p.getAvailablePlaybackRates?.() || [1];
      this.eff = av.reduce((a, b) => (Math.abs(b - r) < Math.abs(a - r) ? b : a));
      this.p.setPlaybackRate(this.eff);
    } catch {}
  }
  get videoWidth() { return 0; }
  get videoHeight() { return 0; }
  play() { try { this.p?.playVideo(); } catch {} return Promise.resolve(); }
  pause() { try { this.p?.pauseVideo(); } catch {} }
}
const yt = new YTBackend();

// ---------- đối tượng chung ----------
let kind = 'file';
const cur = () => (kind === 'yt' ? yt : v);
let rate = 1;

export const M = {
  get kind() { return kind; },
  get currentTime() { return cur().currentTime; },
  set currentTime(x) { cur().currentTime = x; },
  get duration() { return cur().duration; },
  get paused() { return cur().paused; },
  get ended() { return cur().ended; },
  get readyState() { return cur().readyState; },
  get playbackRate() { return cur().playbackRate; },
  set playbackRate(r) { rate = r; v.playbackRate = r; yt.playbackRate = r; },
  get videoWidth() { return cur().videoWidth || 0; },
  get videoHeight() { return cur().videoHeight || 0; },
  play() { return cur().play(); },
  pause() { v.pause(); yt.pause(); },
  addEventListener(n, f) { v.addEventListener(n, f); yt.addEventListener(n, f); },

  clear() {
    v.pause(); v.removeAttribute('src'); v.load(); yt.pause();
    kind = 'file'; stage.dataset.src = 'file';
  },
  useFile(url) {
    yt.pause(); kind = 'file'; stage.dataset.src = 'file';
    v.src = url; v.playbackRate = rate;
  },
  async useYouTube(id, start = 0) {
    v.pause(); v.removeAttribute('src'); v.load();
    kind = 'yt'; stage.dataset.src = 'yt';
    try { await yt.load(id, start); yt.playbackRate = rate; }
    catch (e) { toast(e.message, 4000); }
  },
};
