// TeaLab: tranh pixel vẽ bằng chương trình (không cần file ảnh). Mọi hình dựng từ lưới ký tự hoặc ô vuông; hiển thị sắc cạnh (image-rendering: pixelated).
import { EXTRA_IC, sceneFx, interiorFx, ILL_EXTRA, drawIllus2 } from './tl-art2.js';
export const C = {
  k: '#2d1f47', w: '#ffffff', c: '#fff1cf', d: '#5b5478', s: '#e4dff7', S: '#9a93c4',
  r: '#ff5a5f', R: '#c2354a', o: '#ff9a3c', O: '#c86a1f', y: '#ffd84d', Y: '#d9a41c', g: '#5fd068', G: '#2f9a4a', t: '#3cc8b4', T: '#1f8f86',
  b: '#5ab4ff', B: '#2f7ad1', v: '#a98bff', V: '#6f55d6', p: '#ff7fb5', P: '#c8478a', n: '#c9905a', N: '#8a5a36', m: '#6b4226', e: '#f3d9b1', l: '#bfe9a0', L: '#8fbf4a',
};
const cache = new Map();
function cv(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
// lưới ký tự -> canvas
export function fromRows(rows, pal = C) {
  const h = rows.length, w = Math.max(...rows.map(r => r.length)), c = cv(w, h), g = c.getContext('2d');
  rows.forEach((r, y) => [...r].forEach((ch, x) => { const col = pal[ch]; if (col && ch !== '.') { g.fillStyle = col; g.fillRect(x, y, 1, 1); } }));
  return c;
}
const swap = (rows, map) => rows.map(r => [...r].map(ch => map[ch] || ch).join(''));

// ---------- biểu tượng giao diện (10×10) ----------
const IC = {
  coin: ['..kkkkkk..', '.kyyyyyyk.', 'kyyYYYYyyk', 'kyYyyyyYyk', 'kyYyYYyYyk', 'kyYyYYyYyk', 'kyYyyyyYyk', 'kyyYYYYyyk', '.kyyyyyyk.', '..kkkkkk..'],
  bolt: ['....kkk...', '...kyyk...', '..kyyk....', '.kyyyyyk..', '.kkkyyk...', '...kyyk...', '..kyyk....', '..kyk.....', '..kk......', '..........'],
  rep: ['..........', '..kk..kk..', '.krrkkrrk.', 'krrrrrrrrk', 'krrwrrrrrk', 'krrrrrrrrk', '.krrrrrrk.', '..krrrrk..', '...krrk...', '....kk....'],
  star: ['....kk....', '....kyk...', '...kyyk...', 'kkkkyyykkk', 'kyyyyyyyyk', '.kyyyyyyk.', '..kyyyyk..', '.kyyk.kyyk', '.kyk...kyk', '.kk.....kk'],
  starE: ['....kk....', '....kSk...', '...kSSk...', 'kkkkSSSkkk', 'kSSSSSSSSk', '.kSSSSSSk.', '..kSSSSk..', '.kSSk.kSSk', '.kSk...kSk', '.kk.....kk'],
  clock: ['..kkkkkk..', '.kwwwwwwk.', 'kwwwkwwwwk', 'kwwwkwwwwk', 'kwwwkkkwwk', 'kwwwwwwwwk', 'kwwwwwwwwk', '.kwwwwwwk.', '..kkkkkk..', '..........'],
  day: ['..........', '.kkkkkkkk.', 'krrrrrrrrk', 'kwwwwwwwwk', 'kwkwkwkwwk', 'kwwwwwwwwk', 'kwkwkwkwwk', 'kwwwwwwwwk', '.kkkkkkkk.', '..........'],
  cal: ['.k......k.', 'kkkkkkkkkk', 'krrrrrrrrk', 'kwwwwwwwwk', 'kwrwwbwwwk', 'kwwwwwwwwk', 'kwbwwrwwwk', 'kwwwwwwwwk', 'kkkkkkkkkk', '..........'],
  mail: ['..........', 'kkkkkkkkkk', 'kwwwwwwwwk', 'kkwwwwwwkk', 'kwkwwwwkwk', 'kwwkkkkwwk', 'kwwwwwwwwk', 'kwwwwwwwwk', 'kkkkkkkkkk', '..........'],
  trophy: ['kkkkkkkkkk', 'kyyyyyyyyk', 'kkyyyyyykk', '.kyyyyyyk.', '..kyyyyk..', '...kyyk...', '....kk....', '...kYYk...', '..kYYYYk..', '..kkkkkk..'],
  calc: ['.kkkkkkkk.', 'kbbbbbbbbk', 'kbwwwwwwbk', 'kbbbbbbbbk', 'kbsbsbsbbk', 'kbbbbbbbbk', 'kbsbsbsbbk', 'kbbbbbbbbk', 'kbsbsbrbbk', '.kkkkkkkk.'],
  report: ['.kkkkkkk..', 'kwwwwwwwk.', 'kwbbbbbwk.', 'kwwwwwwwk.', 'kwbbbwwwk.', 'kwwwwwwwk.', 'kwbbbbbwk.', 'kwwwwwwwk.', '.kkkkkkk..', '..........'],
  menu: ['..........', 'kkkkkkkkkk', 'kddddddddk', 'kkkkkkkkkk', '..........', 'kkkkkkkkkk', 'kddddddddk', 'kkkkkkkkkk', '..........', '..........'],
  play: ['..k.......', '..kk......', '..kgk.....', '..kggk....', '..kgggk...', '..kggk....', '..kgk.....', '..kk......', '..k.......', '..........'],
  pause: ['..........', '.kkk..kkk.', '.kyk..kyk.', '.kyk..kyk.', '.kyk..kyk.', '.kyk..kyk.', '.kyk..kyk.', '.kkk..kkk.', '..........', '..........'],
  moon: ['...kkkk...', '..kyyyk...', '.kyyk.....', '.kyk......', '.kyk......', '.kyyk.....', '..kyyykk..', '...kyyyyk.', '....kkkk..', '..........'],
  temp: ['...kkk....', '..kwwk....', '..kwrk....', '..kwrk....', '..kwrk....', '.kkwrkk...', 'krrrrrrk..', 'krrrrrrk..', '.kkkkkk...', '..........'],
  tired: ['..........', '.kkkkkkkk.', 'kyyyyyyyyk', 'kykyyykyyk', 'kyyyyyyyyk', 'kyyyyyyyyk', 'kykkkkkyyk', 'kyyyyyyyyk', '.kkkkkkkk.', '..........'],
  sun: ['...k..k...', '.k..kk..k.', '..kkyykk..', 'k.kyyyyk.k', 'kkyyyyyykk', 'k.kyyyyk.k', '..kkyykk..', '.k..kk..k.', '...k..k...', '..........'],
  cloud: ['..........', '...kkk....', '..kwwwkk..', '.kwwwwwwk.', 'kwwwwwwwwk', 'kwsssssswk', '.kkkkkkkk.', '..........', '..........', '..........'],
  rain: ['...kkk....', '..kssskk..', '.ksssssk..', 'kssssssssk', '.kkkkkkkk.', '..b..b..b.', '.b..b..b..', '..b..b..b.', '.b..b..b..', '..........'],
  drizzle: ['...kkk....', '..kssskk..', '.ksssssk..', 'kssssssssk', '.kkkkkkkk.', '...b...b..', '.b...b....', '...b...b..', '.b........', '..........'],
  cold: ['....kk....', '.k..kk..k.', '..k.kk.k..', '...kkkk...', 'kkkkkkkkkk', '...kkkk...', '..k.kk.k..', '.k..kk..k.', '....kk....', '..........'],
  hot: ['.....k....', '....kyk...', '...kyyk...', '..kyyyk...', '.kyyyykk..', 'kyyyyyyyk.', '.kkyyyk...', '...kyk....', '....k.....', '..........'],
  shop: ['.kkkkkkkk.', 'krrwrrwrrk', 'krwrrwrrwk', 'kkkkkkkkkk', 'kwwkkkkwwk', 'kwwkbbkwwk', 'kwwkbbkwwk', 'kNNkbbkNNk', 'kNNkbbkNNk', 'kkkkkkkkkk'],
  cup: ['.kkkkkkkk.', 'kwwwwwwwwk', '.kkkkkkkk.', '.kbbbbbbk.', '.kbwbbbbk.', '.kbbbbbbk.', '..kbbbbk..', '..kbbbbk..', '...kkkk...', '..........'],
  box: ['..........', '.kkkkkkkk.', 'kNNNkkNNNk', 'kNNNkkNNNk', 'kkkkkkkkkk', 'kNNNNNNNNk', 'kNNNNNNNNk', 'kNNNNNNNNk', '.kkkkkkkk.', '..........'],
  chart: ['..........', 'k.........', 'k........g', 'k.....g..g', 'k..g..g..g', 'k..g..g..g', 'k.gg.gg.gg', 'kkkkkkkkkk', '..........', '..........'],
  tree: ['....kk....', '...kggk...', '..kgrggk..', '.kgggyggk.', '..kggggk..', '.kgyggrgk.', 'kgggggggkk', '....kNk...', '....kNk...', '...kkkk...'],
  lantern: ['....kk....', '..kkkkkk..', '.krrrrrrk.', 'krrryyrrrk', 'krrryyrrrk', 'krrrrrrrrk', '.krrrrrrk.', '..kkkkkk..', '...y..y...', '...y..y...'],
  heart: ['..........', '.kk....kk.', 'krrk..krrk', 'krrrkkrrrk', 'krrrrrrrrk', '.krrrrrrk.', '..krrrrk..', '...krrk...', '....kk....', '..........'],
  staff: ['...kkkk...', '..keeeek..', '..kekkek..', '..keeeek..', '...kkkk...', '..kbbbbk..', '.kbbbbbbk.', '.kbkbbkbk.', '..kk..kk..', '..........'],
  warn: ['....kk....', '...kyyk...', '...kyyk...', '..kyykyk..', '..kyykyk..', '.kyyyyyyk.', '.kyyykyyk.', 'kyyyyyyyyk', 'kkkkkkkkkk', '..........'],
  check: ['..........', '........kk', '.......kgk', '......kgk.', 'k....kgk..', 'kk..kgk...', 'kgkkgk....', '.kggk.....', '..kk......', '..........'],
  lock: ['...kkkk...', '..kd..dk..', '..kd..dk..', '.kkkkkkkk.', 'kyyyyyyyyk', 'kyyykkyyyk', 'kyyykkyyyk', 'kyyyyyyyyk', '.kkkkkkkk.', '..........'],
  up: ['....kk....', '...kggk...', '..kggggk..', '.kggggggk.', 'kkkkggkkkk', '...kggk...', '...kggk...', '...kggk...', '...kkkk...', '..........'],
  down: ['..........', '...kkkk...', '...krrk...', '...krrk...', '...krrk...', 'kkkkrrkkkk', '.krrrrrrk.', '..krrrrk..', '...krrk...', '....kk....'],
  speed1: ['..........', '.k........', '.kg.......', '.kggk.....', '.kgggk....', '.kggk.....', '.kg.......', '.k........', '..........', '..........'],
  bed: ['..........', 'kk........', 'kNk.......', 'kNkkkkkkkk', 'kNwwwwwwwk', 'kNbbbbbbbk', 'kNbbbbbbbk', 'kkkkkkkkkk', 'k........k', 'k........k'],
  flask: ['...kkkk...', '...kssk...', '...kssk...', '..kssssk..', '.ksbbbbsk.', 'kssbbbbssk', 'kbbbbbbbbk', 'kbbbwbbbbk', '.kbbbbbbk.', '..kkkkkk..'],
  tag: ['..kkkkkk..', '.kyyyyyyk.', 'kyyYYYYyyk', 'kyYkkkkYyk', 'kyYkyyYYyk', 'kyyYYkYyyk', '.kyYYkYyk.', '..kyyyyk..', '...kkkk...', '..........'],
  shop2: ['kkkkkkkkkk', 'krrwrrwrrk', 'kkkkkkkkkk', 'kbbkbbkbbk', 'kbbkbbkbbk', 'kkkkkkkkkk', 'kwwkbbkwwk', 'kwwkbbkwwk', 'kNNkbbkNNk', 'kkkkkkkkkk'],
  truck: ['..........', '.kkkkkkk..', 'kwwwwwwkkk', 'kwrrrrwkbk', 'kwwwwwwkbk', 'kkkkkkkkkk', 'kkdkkkkdkk', '.kdkk.kdk.', '..kk...kk.', '..........'],
  parcel: ['..........', '.kkkkkkkk.', 'kNNNkkNNNk', 'kNNNkkNNNk', 'kkkkkkkkkk', 'kNNNNNNNNk', 'kNNkkkkNNk', 'kNNNNNNNNk', '.kkkkkkkk.', '..........'],
  // thiết bị
  fridge: ['.kkkkkkkk.', 'ksssssssk.', 'ksbbbbbsk.', 'ksssssssk.', 'kkkkkkkkk.', 'ksssssssk.', 'kswsssssk.', 'kswsssssk.', 'ksssssssk.', '.kkkkkkkk.'],
  press: ['...kkkk...', '..kddddk..', '..kddddk..', '...kddk...', '..kkddkk..', '.kssddssk.', '.kssssssk.', 'kkkkkkkkkk', 'kddddddddk', 'kkkkkkkkkk'],
  pearl: ['..s..s....', '...s..s...', '.kkkkkkkk.', 'kddddddddk', 'kdmmmmmmdk', 'kdmmmmmmdk', 'kddddddddk', '.kddddddk.', '..k.kk.k..', '..........'],
  pos: ['.kkkkkkkk.', 'kbbbbbbbbk', 'kbwwwwwwbk', 'kbwgggwwbk', 'kbwwwwwwbk', 'kbbbbbbbbk', '.kkkddkkk.', '..kddddk..', '.kddddddk.', '.kkkkkkkk.'],
  // logo nhà cung cấp
  supA: ['.kkkkkkkk.', 'kggggggggk', 'kgggwwgggk', 'kggwggwggk', 'kggwwwwggk', 'kggwggwggk', 'kggwggwggk', 'kggggggggk', 'kggggggggk', '.kkkkkkkk.'],
  supB: ['.kkkkkkkk.', 'kbbbbbbbbk', 'kbbwwwbbbk', 'kbbwbbwbbk', 'kbbwwwbbbk', 'kbbwbbwbbk', 'kbbwbbwbbk', 'kbbwwwbbbk', 'kbbbbbbbbk', '.kkkkkkkk.'],
  supC: ['.kkkkkkkk.', 'kyyyyyyyyk', 'kyywwwwyyk', 'kyywyyyyyk', 'kyywyyyyyk', 'kyywyyyyyk', 'kyywyyyyyk', 'kyywwwwyyk', 'kyyyyyyyyk', '.kkkkkkkk.'],
  supD: ['.kkkkkkkk.', 'kvvvvvvvvk', 'kvvwwwvvvk', 'kvvwvvwvvk', 'kvvwvvwvvk', 'kvvwvvwvvk', 'kvvwvvwvvk', 'kvvwwwvvvk', 'kvvvvvvvvk', '.kkkkkkkk.'],
  // trạng thái kho
  stOk: ['..........', '......kk..', '.....kgk..', '....kgk...', 'k..kgk....', 'kk.kgk....', '.kkgk.....', '..kgk.....', '...k......', '..........'],
  stLow: ['..........', '....kk....', '...kyyk...', '...kyyk...', '...kyyk...', '...kyyk...', '....kk....', '....kk....', '...kyyk...', '....kk....'],
  stOut: ['..........', '.kk....kk.', 'krrk..krrk', '.krrkkrrk.', '..krrrrk..', '..krrrrk..', '.krrkkrrk.', 'krrk..krrk', '.kk....kk.', '..........'],
  stBad: ['..kkkkkk..', '.kNNNNNNk.', 'kNNkNNkNNk', 'kNNNNNNNNk', 'kNkkkkkkNk', 'kNNNNNNNNk', '.kNNkNNNk.', '..kNNNNk..', '...kkkk...', '..........'],
  stSoon: ['..kkkkkk..', '.kwwwwwwk.', 'kwwkwwwwwk', 'kwwkwwwwwk', 'kwwkkkwwwk', 'kwwwwwwwwk', 'kwrrrrrrwk', 'kwwwwwwwwk', '.kwwwwwwk.', '..kkkkkk..'],
  // nguồn tin
  srcOff: ['..........', '.kkkkkkkk.', 'kbbbbbbbbk', 'kbbwwwwbbk', 'kbbwbbwbbk', 'kbbbwwbbbk', '.kbbwwbbk.', '..kbbbbk..', '...kbbk...', '....kk....'],
  srcTrust: ['..........', '.kk....kk.', 'kyykkkkyyk', 'kyyyyyyyyk', 'kyyyyyyyyk', '.kyyyyyyk.', '..kyyyyk..', '...kyyk...', '....kk....', '..........'],
  srcRumor: ['.kkkkkkkk.', 'kvvvvvvvvk', 'kvvvwwvvvk', 'kvvvvwvvvk', 'kvvvwvvvvk', 'kvvvvvvvvk', '.kkkvvkkk.', '....kvk...', '.....kk...', '..........'],
  // sự kiện / lịch
  sale: ['..kkkkkk..', '.krrrrrrk.', 'krrwrrwrrk', 'krrwwwwrrk', 'krrrwwrrrk', 'kwwwrrwwwk', 'krrwwwwrrk', '.krrrrrrk.', '..kkkkkk..', '..........'],
  exam: ['.kkkkkkkk.', 'kwwwwwwwwk', 'kwbbbbbbwk', 'kwwwwwwwwk', 'kwbbbbwwwk', 'kwwwwwwwwk', 'kwbbbbbbwk', 'kwwwwwwwwk', 'kwrrwwwwwk', '.kkkkkkkk.'],
  gift: ['..kk..kk..', '.krrkkrrk.', '..krrrrk..', 'kkkkrrkkkk', 'kpppkrkppk', 'kpppkrkppk', 'kkkkrrkkkk', 'kpppkrkppk', 'kpppkrkppk', 'kkkkkkkkkk'],
  ribbon: ['kkkkkkkkkk', 'kyyyyyyyyk', 'kyYYYYYYyk', 'kyYyyyyYyk', 'kyYyyyyYyk', 'kyYYYYYYyk', 'kyyyyyyyyk', '.kyyyyyyk.', '..kyyyyk..', '...kkkk...'],
  signOpen: ['.kkkkkkkk.', 'kgggggggk.', 'kgwwggwwgk', 'kgwgwgwggk', 'kgwwgwwggk', 'kgggggggkk', '.kkkkkkkk.', '..k....k..', '..k....k..', '..........'],
  signClosed: ['.kkkkkkkk.', 'krrrrrrrk.', 'krwwwwwwrk', 'krwrrrrwrk', 'krwwwwwwrk', 'krrrrrrrkk', '.kkkkkkkk.', '..k....k..', '..k....k..', '..........'],
  sleepz: ['.kkkkkk...', '....kk....', '...kk.....', '..kk......', '.kkkkkk.kk', '.......kk.', '......kk..', '.....kkkk.', '..........', '..........'],
};
Object.assign(IC, EXTRA_IC);
// Mỗi hình chỉ nạp data-URL một lần vào bảng style (lớp .tlic.uNAME); HTML chỉ cần tên lớp nên nhẹ hơn nhiều khi vẽ cửa sổ có hàng trăm icon.
let _sheet = null; const _reg = new Set();
function uClass(key, url) {
  const cls = 'u_' + key.replace(/[^a-zA-Z0-9]/g, '_');
  if (!_reg.has(cls)) { try { if (!_sheet) { const s = document.createElement('style'); s.id = 'tlIcCss'; document.head.appendChild(s); _sheet = s.sheet; } _sheet.insertRule(`.tlic.${cls}{--u:url(${url})}`, _sheet.cssRules.length); _reg.add(cls); } catch (e) { return ''; } }
  return cls;
}
const uAttr = (key, url) => { const c = uClass(key, url); return c ? { c, s: '' } : { c: '', s: `--u:url(${url});` }; };export function ic(name, px = 20, extra = '') {
  const k = 'ic:' + name; let u = cache.get(k);
  if (!u) { const rows = IC[name]; if (!rows) return ''; u = fromRows(rows).toDataURL(); cache.set(k, u); }
  const a = uAttr('i:' + name, u); return `<i class="tlic ${a.c} ${extra}" style="${a.s}--s:${px}px" aria-hidden="true"></i>`;
}
export const hasIc = n => !!IC[n];
// Làm nóng sẵn trong lúc rảnh: tạo trước các icon, hình minh họa để lần mở cửa sổ đầu tiên không bị khựng (~60 ms → vài ms).
let _warmed = false;
export function warm() {
  if (_warmed) return; _warmed = true;
  const jobs = [...Object.keys(IC).map(n => () => ic(n)), ...['dayend', 'sleep', 'weekend', 'soon', 'summer', 'final', 'daystart', 'season', 'noel', 'tet'].map(k => () => illusUrl(k))];
  const idle = window.requestIdleCallback || (f => setTimeout(() => f({ timeRemaining: () => 8 }), 40));
  const step = d => { let n = 0; while (jobs.length && n < 40 && (d.timeRemaining ? d.timeRemaining() > 2 : true)) { try { jobs.shift()(); } catch (e) { /* bỏ qua */ } n++; } if (jobs.length) idle(step); };
  idle(step);
}
export const icUrl = name => { const k = 'ic:' + name; let u = cache.get(k); if (!u && IC[name]) { u = fromRows(IC[name]).toDataURL(); cache.set(k, u); } return u || ''; };

// ---------- ly đồ uống (12×14) ----------
const CUP_COL = { tra_da: ['#f6e27a', '#fff6b0'], tra_sua: ['#c99763', '#f1d3a8'], tra_dao: ['#ffb08a', '#ffd9c2'], tra_gung: ['#e0922b', '#ffc86b'], tra_vai: ['#ffc9d6', '#fff0f4'], tra_matcha: ['#8fbf4a', '#cfe8a0'], tra_cd: ['#ffd23f', '#fff0a0'], tra_cuc: ['#f2d36a', '#fff2b8'], tra_oi: ['#ff8fa3', '#ffc2cf'], tra_sen: ['#e8e08a', '#fffbd0'], tra_nuong: ['#b9763f', '#e8b98a'], tra_dua: ['#f4f0e0', '#ffffff'], qua_tet: ['#ff5a5f', '#ffd84d'] };
const CUP_ICE = ['.......k....', '......kr....', '.kkkkkkkkkk.', 'kwwwwwwwwwwk', '.kBBBBBBBBk.', '.kBBBBBBBBk.', '.kBBDDDDBBk.', '..kBBDDBBk..', '..kBBBBBBk..', '..kBBBBBBk..', '...kkkkkk...'];
Object.assign(CUP_COL, { cup_noel: ['#c2354a', '#2f9a4a'], cup_tet: ['#ff5a5f', '#ffd84d'], cup_val: ['#ff7fb5', '#ffd6e8'], cup_cp1: ['#ff7fb5', '#ffd6e8'], cup_cp2: ['#5fd068', '#cfe8a0'] });
// v: 'hot' (ly nóng, có khói) hoặc 'ice' (ly đá, có ống hút) để ghi đè dạng mặc định của món
export function cupUrl(item, v) {
  const k = 'cup:' + item + (v || ''); let u = cache.get(k);
  if (!u && item === 'cup_couple') { const c = cv(24, 14), g = c.getContext('2d'); g.drawImage(fromRows(CUP_ICE, { ...C, A: '#ff7fb5', B: '#ff7fb5', D: '#ffd6e8', r: '#ff7fb5' }), 0, 0); g.drawImage(fromRows(CUP_ICE, { ...C, A: '#5fd068', B: '#5fd068', D: '#cfe8a0', r: '#5fd068' }), 12, 0); g.fillStyle = '#ff5a5f'; g.fillRect(11, 1, 2, 2); u = c.toDataURL(); cache.set(k, u); }
  if (!u) {
    const [a, b] = CUP_COL[item] || ['#ccc', '#eee'], hot = v ? v === 'hot' : (item === 'tra_gung' || item === 'tra_cuc' || item === 'tra_nuong');
    if (item === 'qua_tet') { const g = ['....kkkk....', '...krrrrk...', '..krrrrrrk..', '.kkkkrrkkkk.', '.kyyykrkyyyk', '.kyyykrkyyyk', '.kkkkkrkkkk.', '.kyyyyrrryyk', '.kyyyyrrryyk', '.kkkkkkkkkk.', '............'], u2 = fromRows(g, C).toDataURL(); cache.set(k, u2); return u2; }
    const rows = hot
      ? ['....s..s....', '...s..s.....', '.kkkkkkkkkk.', 'kwwwwwwwwwwk', 'kwAAAAAAAAwk', 'kwAAAAAAAAwkk', 'kwAAAAAAAAwk.k', '.kwAAAAAAwk.k', '.kwAAAAAAwkk.', '..kwwwwwwk..', '...kkkkkk...']
      : CUP_ICE;
    const pal = { ...C, A: a, B: a, D: item === 'tra_sua' ? '#3b2418' : b, r: '#ff7fb5' };
    const cc = fromRows(rows, pal), cg = cc.getContext('2d'), P = (x, y, col, w = 1, h = 1) => { cg.fillStyle = col; cg.fillRect(x, y, w, h); };
    if (item === 'cup_noel') { P(1, 2, '#ffffff', 10, 1); P(3, 1, '#ffffff', 2, 1); P(7, 1, '#2f9a4a', 2, 1); P(8, 0, '#c2354a'); P(5, 7, '#ffffff', 2, 1); }
    if (item === 'cup_tet') { P(4, 5, '#ffd84d', 4, 2); P(5, 7, '#ffd84d', 2, 1); }
    if (item === 'cup_val') { P(4, 5, '#ff5a5f', 2, 1); P(7, 5, '#ff5a5f', 2, 1); P(4, 6, '#ff5a5f', 5, 1); P(5, 7, '#ff5a5f', 3, 1); P(6, 8, '#ff5a5f'); }
    u = cc.toDataURL(); cache.set(k, u);
  }
  return u;
}
export const cup = (item, px = 24, v) => { const a = uAttr('c:' + item + (v || ''), cupUrl(item, v)); return `<i class="tlic ${a.c}" style="${a.s}--s:${px}px;--w:${Math.round(px * (item === 'cup_couple' ? 24 : 12) / 14)}px" aria-hidden="true"></i>`; };

// ---------- nguyên liệu: 6 khuôn, đổi màu ----------
const SHAPES = {
  leaf: ['..........', '...kkk....', '..kaaak...', '.kaabaak..', '.kabaaak..', '.kaaabak..', '..kaaak...', '...kak....', '....k.....', '..........'],
  drop: ['....k.....', '...kak....', '..kaaak...', '.kaabaak..', '.kaaaaak..', '.kaaaaak..', '..kaaak...', '...kkk....', '..........', '..........'],
  cube: ['..........', '..kkkkkk..', '.kbbbbbak.', 'kbbbbbbaak', 'kkkkkkkaak', 'kaaaaakaak', 'kaaaaakak.', 'kaaaaakk..', 'kkkkkkk...', '..........'],
  fruit: ['....kg....', '...kggk...', '..kkkkkk..', '.kaaaaaak.', 'kaabaaaaak', 'kaabaaaaak', 'kaaaaaaaak', '.kaaaaaak.', '..kkkkkk..', '..........'],
  jar: ['..kkkkkk..', '..kdddk...', '.kkkkkkkk.', 'kaaaaaaaak', 'kabbbbbbak', 'kabbbbbbak', 'kaaaaaaaak', 'kaaaaaaaak', '.kkkkkkkk.', '..........'],
  bag: ['..k....k..', '..kk..kk..', '.kkkkkkkk.', 'kaaaaaaaak', 'kabbbbbbak', 'kabwwwwbak', 'kabbbbbbak', 'kaaaaaaaak', '.kkkkkkkk.', '..........'],
  cupI: ['.kkkkkkkk.', 'kwwwwwwwwk', '.kkkkkkkk.', '.kwwwwwwk.', '.kwwswwwk.', '.kwwwwwwk.', '..kwwwwk..', '..kwwwwk..', '...kkkk...', '..........'],
  beans: ['..........', '..kkk.kkk.', '.kaaakaaak', '.kabakabak', '.kaaakaaak', '..kkk.kkk.', '..kkkkkk..', '.kaaakaaak', '.kabakabak', '..kkk.kkk.'],
};
const ING_LOOK = { ly: ['cupI'], tra: ['leaf', '#5fa84a', '#9be37a'], duong: ['cube', '#f4efe2', '#ffffff'], da: ['cube', '#a8dcff', '#e6f6ff'], chanh: ['fruit', '#ffe066', '#fff6b0'], sua: ['drop', '#ffffff', '#cfe8ff'], tranchau: ['beans', '#4a2c20', '#7a4a34'],
  dao: ['fruit', '#ffb08a', '#ffd9c2'], gung: ['leaf', '#d9a86a', '#f2d3a0'], matong: ['jar', '#e0922b', '#ffd36a'], oi: ['fruit', '#ff9bb0', '#ffd0da'], sen: ['leaf', '#e8d86a', '#fff6b0'], dua: ['drop', '#f4f0e0', '#ffffff'], hopqua: ['bag', '#ff5a5f', '#ffd84d'], vai: ['fruit', '#ff8fa3', '#ffc2cf'], matcha: ['bag', '#7fb83a', '#cfe8a0'], chanhday: ['fruit', '#b05cc8', '#e3b5f0'], hoacuc: ['leaf', '#f0d34a', '#fff3a8'] };
export function ingUrl(id) {
  const k = 'ing:' + id; let u = cache.get(k);
  if (!u) { const [s, a, b] = ING_LOOK[id] || ['bag', '#999', '#ccc']; const rows = SHAPES[s]; u = fromRows(rows, { ...C, a, b }).toDataURL(); cache.set(k, u); }
  return u;
}
export const ingIc = (id, px = 20) => { const a = uAttr('g:' + id, ingUrl(id)); return `<i class="tlic ${a.c}" style="${a.s}--s:${px}px" aria-hidden="true"></i>`; };

// ---------- người: khách theo nhóm, nhân viên, Lame (lưới 8×14) ----------
const SKINS = ['#f3d2b0', '#e8b98a', '#d9a066', '#c68b5a'];
const HAIR = ['#2d1f47', '#4a2c20', '#8a5a36', '#e0b050', '#9aa0a8', '#d94f6a'];
function person(seg, v, o = {}) { // trả về canvas 10×16
  const c = cv(10, 16), g = c.getContext('2d'), R = (x, y, w, h, col) => { g.fillStyle = col; g.fillRect(x, y, w, h); };
  const skin = SKINS[v % 4], hair = HAIR[(v * 3 + (seg === 'KQ' ? 4 : 0)) % (seg === 'KQ' ? 6 : 4)];
  const shirt = { HS: ['#ffffff', '#5ab4ff', '#ff9a3c'][v % 3], VP: ['#9aa0a8', '#2f7ad1', '#e4dff7'][v % 3], DK: ['#ff5a5f', '#3cc8b4', '#ffd84d'][v % 3], KQ: ['#a98bff', '#5fd068', '#ff7fb5'][v % 3], ST: ['#5fd068', '#ff9a3c', '#3cc8b4'][v % 3], LA: '#ffffff', IN: '#9aa0a8', CO: '#5fd068', RV: '#a98bff' }[seg];
  const pants = seg === 'HS' ? '#2f7ad1' : seg === 'VP' ? '#2d1f47' : seg === 'DK' ? '#c9905a' : '#5b5478';
  R(3, 1, 4, 4, skin); R(3, 0, 4, 2, hair); if (seg === 'KQ' && v % 2) R(2, 0, 6, 1, hair); R(3, 3, 1, 1, '#2d1f47'); R(6, 3, 1, 1, '#2d1f47');
  if (o.mood === 'angry') { R(3, 2, 2, 1, '#c2354a'); R(5, 2, 2, 1, '#c2354a'); }
  R(2, 5, 6, 5, shirt); R(1, 6, 1, 3, shirt); R(8, 6, 1, 3, shirt); R(1, 9, 1, 1, skin); R(8, 9, 1, 1, skin);
  R(3, 10, 2, 5, pants); R(5, 10, 2, 5, pants); R(3, 15, 2, 1, '#2d1f47'); R(5, 15, 2, 1, '#2d1f47');
  if (seg === 'HS') { R(8, 6, 2, 4, '#ff5a5f'); R(8, 6, 2, 1, '#2d1f47'); }       // cặp
  if (seg === 'VP') { R(4, 5, 2, 4, '#c2354a'); R(2, 10, 6, 1, '#5b5478'); }       // cà vạt
  if (seg === 'DK') { R(2, 0, 6, 1, '#ffd84d'); R(1, 1, 8, 1, '#ffd84d'); R(7, 7, 3, 3, '#2d1f47'); } // mũ + ba lô
  if (seg === 'KQ') { R(3, 2, 4, 1, '#2d1f47'); R(0, 8, 2, 3, '#c9905a'); }          // kính + túi
  if (seg === 'LA') { R(2, 6, 6, 4, '#ff9a3c'); R(3, 0, 4, 1, '#2d1f47'); R(2, 0, 1, 3, '#2d1f47'); R(7, 0, 1, 3, '#2d1f47'); } // tạp dề cam, tóc đen
  if (seg === 'HS' && v % 3 === 1) { R(1, 2, 1, 3, '#ff5a5f'); R(8, 2, 1, 3, '#ff5a5f'); R(2, 1, 6, 1, '#ff5a5f'); }   // tai nghe
  if (seg === 'HS' && v % 3 === 2) { R(2, 0, 6, 1, '#5ab4ff'); R(2, 1, 1, 2, '#5ab4ff'); R(7, 1, 1, 2, '#5ab4ff'); }  // mũ trùm
  if (seg === 'VP' && v % 3 === 1) { R(5, 6, 1, 4, '#ffffff'); R(5, 10, 2, 2, '#ffd84d'); }                           // thẻ nhân viên
  if (seg === 'VP' && v % 3 === 2) { R(8, 8, 2, 4, '#2d1f47'); R(8, 8, 2, 1, '#9aa0a8'); }                            // cặp tài liệu
  if (seg === 'DK' && v % 3 === 2) { R(3, 3, 4, 1, '#2d1f47'); }                                                       // kính râm
  if (seg === 'DK' && v % 3 === 1) { R(1, 7, 2, 2, '#2d1f47'); R(2, 6, 1, 1, '#9aa0a8'); }                            // máy ảnh
  if (seg === 'KQ' && v % 3 === 2) { R(2, 0, 6, 2, '#ffffff'); R(3, 3, 4, 1, '#9aa0a8'); }                              // tóc bạc, kính
  if (seg === 'IN') { R(2, 0, 6, 1, '#2d1f47'); R(1, 1, 8, 1, '#2d1f47'); R(3, 7, 3, 2, '#ffffff'); R(1, 9, 8, 1, '#5b5478'); }       // thanh tra: mũ, thẻ, cặp hồ sơ
  if (seg === 'CO') { R(2, 0, 6, 2, '#ff9a3c'); R(1, 1, 8, 1, '#c86a1f'); R(6, 6, 4, 4, '#c9905a'); R(6, 6, 4, 1, '#8a5a36'); }       // người giao hàng: mũ bảo hiểm, thùng hàng
  if (seg === 'RV') { R(2, 6, 6, 4, '#6f55d6'); R(3, 0, 4, 1, '#d94f6a'); R(3, 3, 1, 1, '#c2354a'); R(6, 3, 1, 1, '#c2354a'); }          // đối thủ: tạp dề tím, lông mày nhọn
  if (o.tired || o.mood === 'tired') { R(3, 4, 4, 1, '#9a93c4'); R(3, 3, 1, 1, '#9a93c4'); R(6, 3, 1, 1, '#9a93c4'); }
  if (seg === 'LA' && o.mood) { // 5 biểu cảm của Lame: bình thường, vui, lo, mệt, phấn khích
    if (o.mood === 'happy') { R(4, 4, 2, 1, '#c2354a'); R(3, 3, 1, 1, '#ffffff'); R(6, 3, 1, 1, '#ffffff'); }
    else if (o.mood === 'worry') { R(3, 2, 2, 1, '#2d1f47'); R(5, 2, 2, 1, '#2d1f47'); R(4, 4, 2, 1, '#8a5a36'); R(2, 1, 1, 2, '#9ad0ff'); }
    else if (o.mood === 'excited') { R(3, 3, 1, 1, '#ffffff'); R(6, 3, 1, 1, '#ffffff'); R(3, 4, 4, 2, '#c2354a'); R(0, 5, 1, 3, '#ffd84d'); R(9, 5, 1, 3, '#ffd84d'); }
  }
  return c;
}
const pcache = new Map();
export function personCanvas(seg, v = 0, o = {}) { const k = seg + v + (o.mood || '') + (o.tired ? 't' : ''); let c = pcache.get(k); if (!c) { c = person(seg, v, o); pcache.set(k, c); } return c; }
export function personUrl(seg, v = 0, o = {}) { const k = 'p:' + seg + v; let u = cache.get(k); if (!u) { u = personCanvas(seg, v, o).toDataURL(); cache.set(k, u); } return u; }
export const faceMood = (kind, mood, px = 32) => { const k = 'pm:' + kind + mood; let u2 = cache.get(k); if (!u2) { u2 = personCanvas(kind, 0, { mood }).toDataURL(); cache.set(k, u2); } const a = uAttr(k, u2); return `<i class="tlic ${a.c}" style="${a.s}--s:${px}px;--w:${Math.round(px * 10 / 16)}px" aria-hidden="true"></i>`; };
export const LAME_MOODS = ['', 'happy', 'worry', 'tired', 'excited']; // bình thường, vui, lo, mệt, phấn khích
export const face = (kind, px = 28) => { const a = uAttr('f:' + kind, personUrl(kind, 0)); return `<i class="tlic ${a.c}" style="${a.s}--s:${px}px;--w:${Math.round(px * 10 / 16)}px" aria-hidden="true"></i>`; };

// bong bóng cảm xúc (7×7)
const BUB = { ok: ['.kkkkk.', 'kgggggk', 'kgkgkgk', 'kggggkk', 'kgkkkgk', '.kkkkk.', '...k...'], wait: ['.kkkkk.', 'kyyyyyk', 'kykkkyk', 'kyykyyk', 'kyyyyyk', '.kkkkk.', '...k...'], angry: ['.kkkkk.', 'krrrrrk', 'krkrkrk', 'krrkrrk', 'krkkkrk', '.kkkkk.', '...k...'], bye: ['.kkkkk.', 'kbbbbbk', 'kbwbwbk', 'kbbbbbk', 'kbkkkbk', '.kkkkk.', '...k...'] };
const bubCache = {}; export const bubble = n => (bubCache[n] ||= fromRows(BUB[n]));

// ---------- cảnh cửa hàng ----------
const SKY = [['#ffd9a0', '#9ad0ff'], ['#c6ecff', '#69b8ff'], ['#ffe2ac', '#82b8ff'], ['#ff9a6a', '#4b3b8f'], ['#0b1030', '#26346a']];
const hexRgb = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mix = (a, b, t) => { const x = hexRgb(a), y = hexRgb(b); return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(',')})`; };
export const SCENE_W = 160, SCENE_H = 100;
// phông chữ pixel 3×5 cho biển hiệu
const GL = { T: '111010010010010', R: '110101110101101', A: '010101111101101', L: '100100100100111', M: '101111111101101', B: '110101110101110', E: '111100110100111', ' ': '000000000000000' };
function glyphs(R, x, y, s, col) { for (const ch of s) { const m = GL[ch]; if (m) for (let i = 0; i < 15; i++) if (m[i] === '1') R(x + (i % 3), y + Math.floor(i / 3), 1, 1, col); x += 4; } }
export function drawScene(g, o) {
  const R = (x, y, w, h, col) => { g.fillStyle = col; g.fillRect(Math.round(x), Math.round(y), w, h); };
  const { stage = 1, k = 0, sky = 'cloud', rain = false, open = true, t = 0, decor = [], staffN = 0, day = 1, promo = false, hour = 0 } = o;
  const night = k === 4 || (k === 3 && o.dusk), [top, bot] = SKY[k];
  for (let y = 0; y < 58; y += 2) R(0, y, SCENE_W, 2, mix(top, bot, y / 58));
  const cloudy = ['gloom', 'humid', 'drizzle', 'monsoon', 'showers', 'cloud'].includes(sky) || rain;
  if (!cloudy) { if (k === 4) { const mx = 140 - hour * 34, my = 10 - hour * 3; R(mx, my, 8, 8, '#fff3b0'); R(mx + 3, my, 7, 8, '#0b1030'); R(mx + 2, my - 1, 3, 3, '#fff3b0'); } else R(18 + k * 36, 8 + (k === 3 ? 20 : k === 1 ? -2 : 4), 10, 10, k === 3 ? '#ff7a4a' : '#fff3b0'); }
  if (k === 4) for (let i = 0; i < 22; i++) R((i * 37 + 11) % 158, (i * 53) % 40, 1, 1, i % 3 ? '#ffffff' : '#ffd84d');
  if (cloudy) for (let i = 0; i < 5; i++) { const x = ((i * 47 + t * 3) % 200) - 20, y = 6 + (i * 11) % 24, c = k === 4 ? '#2b3560' : '#cfd6e8'; R(x, y, 26, 5, c); R(x + 4, y - 3, 16, 4, c); R(x + 8, y + 5, 14, 2, k === 4 ? '#1b2448' : '#b6bfd6'); }
  // đường chân trời: nhà xa
  const bc = mix('#7a7fa8', bot, 0.35); for (let i = 0; i < 12; i++) { const x = i * 14, h = 18 + ((i * 7) % 5) * 5; R(x, 58 - h, 12, h, k === 4 ? '#161c40' : bc); for (let w = 0; w < 3; w++) R(x + 2 + w * 3, 58 - h + 3 + (w % 2) * 4, 1, 2, k === 4 || k === 3 ? '#ffd84d' : '#ffffff55'); }
  // vỉa hè + đường
  R(0, 58, SCENE_W, 14, k === 4 ? '#3a3f66' : '#b9b3cf'); R(0, 72, SCENE_W, 28, k === 4 ? '#262a4a' : '#7d7799'); for (let x = 0; x < SCENE_W; x += 16) R(x + ((t * 2) % 16 - 16), 87, 8, 2, k === 4 ? '#6a6f99' : '#e4dff7');
  R(0, 71, SCENE_W, 1, '#5b5478');
  if (k >= 3) for (let lx = 14; lx < 160; lx += 52) { R(lx, 36, 2, 30, '#2d1f47'); R(lx - 3, 34, 8, 3, '#2d1f47'); R(lx - 2, 37, 6, 3, '#fff3b0'); g.fillStyle = '#fff3b033'; g.fillRect(lx - 6, 40, 14, 30); } // đèn đường buổi tối / đêm
  // cửa hàng
  const sx = 92;
  if (stage === 1) { // xe đẩy
    R(sx - 6, 40, 52, 6, '#ff5a5f'); for (let i = 0; i < 6; i++) R(sx - 6 + i * 9, 40, 4, 6, '#ffffff'); R(sx - 6, 46, 52, 2, '#c2354a');
    R(sx - 2, 48, 2, 22, '#8a5a36'); R(sx + 42, 48, 2, 22, '#8a5a36');
    R(sx - 4, 56, 48, 4, '#c9905a'); R(sx - 4, 60, 48, 14, '#8a5a36'); R(sx - 2, 62, 44, 10, '#a06a3c'); R(sx + 8, 64, 24, 6, open ? '#ffd84d' : '#9a93c4'); R(sx + 10, 65, 20, 1, '#2d1f47'); R(sx + 12, 67, 16, 1, '#2d1f47');
    for (let i = 0; i < 3; i++) { R(sx + 0 + i * 4, 52, 3, 4, '#ffffff'); R(sx + 0 + i * 4, 52, 3, 1, '#9a93c4'); }
    R(sx + 2, 72, 8, 8, '#2d1f47'); R(sx + 3, 73, 6, 6, '#9a93c4'); R(sx + 32, 72, 8, 8, '#2d1f47'); R(sx + 33, 73, 6, 6, '#9a93c4');
    R(sx + 14, 31, 24, 11, '#ffd84d'); R(sx + 15, 32, 22, 9, '#2d1f47'); glyphs(R, sx + 21, 35, 'TEA', '#ffd84d'); R(sx + 28, 33, 1, 1, '#ffd84d');
  } else { // tiệm nhỏ
    R(sx - 14, 22, 66, 50, '#e8d5b0'); R(sx - 14, 22, 66, 3, '#8a5a36'); R(sx - 16, 16, 70, 8, '#ff5a5f'); for (let i = 0; i < 7; i++) R(sx - 16 + i * 10, 16, 5, 8, '#ffffff');
    R(sx - 8, 26, 36, 10, '#2d1f47'); R(sx - 6, 27, 32, 8, '#ffd84d'); glyphs(R, sx, 29, 'TEALAB', '#2d1f47');
    R(sx - 8, 40, 30, 24, '#9ad0ff'); R(sx - 8, 40, 30, 1, '#5b5478'); R(sx + 7, 40, 1, 24, '#5b5478'); R(sx - 6, 58, 26, 6, '#c9905a'); R(sx - 6, 64, 26, 8, '#8a5a36');
    R(sx + 26, 42, 18, 30, open ? '#8a5a36' : '#5b3c22'); R(sx + 28, 44, 14, 12, open ? '#9ad0ff' : '#5b6a9a'); R(sx + 40, 58, 2, 2, '#ffd84d'); R(sx + 29, 38, 12, 4, open ? '#5fd068' : '#ff5a5f'); R(sx + 31, 39, 8, 2, '#ffffff');
    if (stage >= 2) { R(sx - 12, 72, 8, 8, '#a06a3c'); R(sx - 12, 80, 8, 4, '#2d1f47'); R(sx + 44, 72, 8, 8, '#a06a3c'); R(sx + 44, 80, 8, 4, '#2d1f47'); }
  }
  if (!open) R(sx - 2, 52, 12, 8, '#ff5a5f');
  // Lame và nhân viên sau quầy
  const lx = stage === 1 ? sx + 18 : sx + 2; g.drawImage(personCanvas('LA', 0), lx, 54 - 2 + (Math.sin(t * 3) > 0.7 ? 1 : 0));
  const tr = o.tired || []; for (let i = 0; i < staffN; i++) g.drawImage(personCanvas('ST', i, { tired: tr[i] }), lx + 12 + i * 10, 54 + (tr[i] ? 1 : 0) + (!tr[i] && Math.sin(t * 3 + i) > 0.8 ? -1 : 0)); // nhân viên: đứng, làm (nhún), mệt (gục)
  if (stage >= 3) { // cửa hàng: xe giao hàng đậu trước tiệm, biển "mở rộng"
    const ty = 76 + Math.round(Math.sin(t * 2) * 0.5); R(sx - 40, ty, 26, 10, '#ffffff'); R(sx - 40, ty, 18, 10, '#ffffff'); R(sx - 22, ty + 2, 8, 8, '#5ab4ff'); R(sx - 40, ty + 4, 18, 3, '#ff5a5f'); R(sx - 36, ty + 10, 5, 4, '#2d1f47'); R(sx - 22, ty + 10, 5, 4, '#2d1f47'); R(sx - 40, ty, 18, 1, '#e4dff7');
    R(sx - 14, 18, 66, 2, '#ffd84d'); for (let i = 0; i < 7; i++) R(sx - 12 + i * 10, 20, 2, 2, '#ffd84d');
  }
  if (stage >= 4) { R(2, 30, 42, 42, '#d9c7e8'); R(2, 26, 44, 6, '#3cc8b4'); for (let i = 0; i < 4; i++) R(2 + i * 11, 26, 5, 6, '#ffffff'); R(6, 38, 14, 14, '#9ad0ff'); R(24, 40, 12, 32, '#8a5a36'); R(10, 34, 22, 4, '#2d1f47'); glyphs(R, 12, 35, 'TEA', '#ffd84d'); }
  // trang trí theo ngày lễ
  for (const d of decor) drawDecor(g, d, sx, t, R);
  // thời tiết
  if (rain) { g.fillStyle = k === 4 ? '#8fb6ff' : '#5a8fe0'; for (let i = 0; i < 46; i++) { const x = (i * 29 + t * 18) % 170 - 5, y = ((i * 17 + t * 60) % 110) - 5; g.fillRect(Math.round(x), Math.round(y), 1, 3); } R(0, 88, SCENE_W, 12, '#5a8fe033'); }
  else if (sky === 'drizzle') { g.fillStyle = '#9ec0f0'; for (let i = 0; i < 34; i++) { const x = (i * 31 + t * 6) % 165, y = ((i * 19 + t * 22) % 105); g.fillRect(Math.round(x), Math.round(y), 1, 1); } }
  if (sky === 'cold' || sky === 'monsoon') { g.fillStyle = '#e6f6ff33'; g.fillRect(0, 56, SCENE_W, 44); }
  if (sky === 'hot' || sky === 'sunny') { g.fillStyle = '#fff3b022'; g.fillRect(0, 0, SCENE_W, 40); }
  sceneFx(g, o, R);
  if (promo) { R(sx + 4, 30, 40, 7, '#ff5a5f'); R(sx + 6, 32, 36, 3, '#ffffff'); }
  if (k === 4 || k === 3) { g.fillStyle = '#ffd84d33'; g.beginPath(); g.arc(sx + 20, 52, 26, 0, 6.3); g.fill(); }
}
function drawDecor(g, d, sx, t, R) {
  if (d === 'noel') { R(10, 40, 3, 4, '#8a5a36'); for (let i = 0; i < 4; i++) R(4 + i, 26 + i * 4, 15 - i * 2, 5, '#2f9a4a'); R(10, 20, 3, 5, '#ffd84d'); for (let i = 0; i < 6; i++) R(6 + (i * 5) % 12, 28 + (i * 3) % 12, 2, 2, (t | 0) % 2 === i % 2 ? '#ff5a5f' : '#ffd84d'); }
  if (d === 'newyear') for (let i = 0; i < 9; i++) R(sx - 14 + i * 8, 12, 2, 2, (t | 0) % 2 === i % 2 ? '#ffd84d' : '#ffffff');
  if (d === 'tet') { for (let i = 0; i < 3; i++) { R(sx - 6 + i * 22, 24, 2, 4, '#8a5a36'); R(sx - 10 + i * 22, 28, 10, 12, '#ff5a5f'); R(sx - 9 + i * 22, 30, 8, 8, '#ffd84d'); R(sx - 7 + i * 22, 40, 2, 5, '#ffd84d'); } R(4, 42, 3, 28, '#8a5a36'); for (let i = 0; i < 9; i++) R(0 + (i * 5) % 16, 38 + (i * 4) % 22, 3, 3, i % 2 ? '#ff7fb5' : '#ffb0cc'); }
  if (d === 'valentine') for (let i = 0; i < 6; i++) { const x = sx - 12 + i * 12, y = 10 + (i % 2) * 3; R(x, y, 3, 2, '#ff5a5f'); R(x + 4, y, 3, 2, '#ff5a5f'); R(x, y + 2, 7, 2, '#ff5a5f'); R(x + 2, y + 4, 3, 2, '#ff5a5f'); }
  if (d === 'cho') { // Chợ Tết: cờ đuôi nheo và hai gian hàng trên vỉa hè
    for (let i = 0; i < 16; i++) { const y = 10 + Math.round(Math.sin(i * 0.8) * 2); R(i * 10 + 1, y, 6, 4, i % 2 ? '#ff5a5f' : '#ffd84d'); }
    for (const x of [50, 62]) { R(x, 50, 11, 3, x === 50 ? '#ff5a5f' : '#ffd84d'); for (let i = 0; i < 3; i++) R(x + i * 4, 50, 2, 3, '#ffffff'); R(x, 53, 1, 14, '#8a5a36'); R(x + 10, 53, 1, 14, '#8a5a36'); R(x, 62, 11, 3, '#c9905a'); for (let i = 0; i < 3; i++) R(x + 1 + i * 3, 59, 2, 3, ['#ff7fb5', '#ffd84d', '#ff5a5f'][(i + x) % 3]); }
  }
  if (d === 'spring') { for (const x of [2, 146]) { R(x + 4, 52, 8, 6, '#c2354a'); R(x + 5, 46, 2, 7, '#2f9a4a'); R(x + 8, 44, 2, 9, '#2f9a4a'); for (const [a, b, c] of [[2, 40, '#ff7fb5'], [6, 38, '#ffd84d'], [9, 41, '#ff9a3c'], [7, 43, '#ffffff']]) R(x + a, b, 3, 3, c); } }
  if (d === 'ram') for (let i = 0; i < 4; i++) { const x = 6 + i * 36, y = 14 + (i % 2) * 4 + Math.sin(t + i) * 1.2; R(x, y - 3, 1, 3, '#2d1f47'); R(x - 3, y, 7, 7, '#ffd84d'); R(x - 2, y + 1, 5, 5, '#ff9a3c'); }
}
export const decorOf = day => { const d = []; if (day >= 17 && day <= 25) d.push('noel'); if (day === 24 || day === 25) d.push('snow'); if (day >= 28 && day <= 34) d.push('newyear'); if (day >= 56 && day <= 67) d.push('cho'); if (day >= 68 && day <= 75) d.push('tet'); if (day >= 70 && day <= 77) d.push('valentine'); if (day >= 80 && day <= 83) d.push('ram'); return d; };
// ---------- nội thất (quầy thu ngân, khu pha chế, chỗ ngồi) theo giai đoạn ----------
export function drawInterior(g, o) {
  const R = (x, y, w, h, col) => { g.fillStyle = col; g.fillRect(Math.round(x), Math.round(y), w, h); };
  const { stage = 1, k = 0, staffN = 0, guests = 0, t = 0, open = true, decor = [], tired = [], hour = 0 } = o, night = k >= 3;
  const wall = ['#f3e2c0', '#ffe9b8', '#f6d9a8', '#c9a77a', '#6b5a8a'][k], floor1 = night ? '#4a3f66' : '#b08a5a', floor2 = night ? '#3d3358' : '#9c7748';
  R(0, 0, 160, 62, wall); for (let x = 0; x < 160; x += 20) R(x, 0, 1, 62, night ? '#5a4a7a' : '#e6d0a0');
  for (let y = 62; y < 100; y += 8) for (let x = 0; x < 160; x += 8) R(x, y, 8, 8, ((x / 8 + y / 8) % 2) ? floor1 : floor2);
  R(0, 60, 160, 3, night ? '#2d1f47' : '#8a5a36');
  // cửa sổ nhìn ra phố: màu trời theo buổi
  const sk = SKY[k]; for (let y = 6; y < 36; y += 2) R(8, y, 40, 2, mix(sk[0], sk[1], (y - 6) / 30)); R(8, 6, 40, 1, '#5b5478'); R(8, 35, 40, 1, '#5b5478'); R(8, 6, 1, 30, '#5b5478'); R(47, 6, 1, 30, '#5b5478'); R(27, 6, 1, 30, '#5b5478');
  if (stage >= 3) { R(54, 6, 30, 30, '#9ad0ff'); R(54, 6, 30, 1, '#5b5478'); R(54, 35, 30, 1, '#5b5478'); R(54, 6, 1, 30, '#5b5478'); R(83, 6, 1, 30, '#5b5478'); R(68, 6, 1, 30, '#5b5478'); }
  // bảng thực đơn
  R(92, 8, 52, 24, '#2d1f47'); R(92, 8, 52, 1, '#8a5a36'); R(92, 31, 52, 1, '#8a5a36'); const cols = ['#ffd84d', '#5fd068', '#ff7fb5', '#5ab4ff', '#ffb08a', '#cfe8a0'];
  for (let i = 0; i < Math.min(6, 3 + stage * 1); i++) { R(96, 12 + i * 3, 3, 2, cols[i]); R(101, 12 + i * 3, 22 + (i * 5) % 12, 1, '#e4dff7'); R(136, 12 + i * 3, 5, 1, '#ffd84d'); }
  // khu pha chế (tường sau) + quầy thu ngân
  R(100, 38, 56, 3, '#8a5a36'); if (stage >= 2) { R(140, 38 - 16, 14, 16, '#cfd6e8'); R(141, 24, 12, 14, '#9aa0a8'); R(143, 27, 2, 8, '#2d1f47'); R(124, 38 - 10, 10, 10, '#5b5478'); R(126, 30, 6, 4, '#c2354a'); R(110, 38 - 9, 11, 9, '#8a5a36'); R(111, 30, 9, 3, '#3b2418'); } else { for (let i = 0; i < 5; i++) { R(104 + i * 9, 29, 7, 9, '#ffffff'); R(104 + i * 9, 29, 7, 1, '#9a93c4'); } }
  R(86, 58, 72, 8, '#c9905a'); R(86, 66, 72, 14, '#8a5a36'); R(88, 68, 68, 10, '#a06a3c'); R(120, 52, 14, 8, '#2d1f47'); R(121, 53, 12, 5, open ? '#5fd068' : '#ff5a5f'); R(135, 54, 8, 5, '#e4dff7');  // máy tính tiền
  for (let i = 0; i < 3; i++) { R(92 + i * 6, 54, 4, 5, '#ffffff'); R(92 + i * 6, 54, 4, 1, '#9a93c4'); }
  g.drawImage(personCanvas('LA', 0), 108, 44 + (Math.sin(t * 3) > 0.7 ? 1 : 0)); for (let i = 0; i < staffN; i++) g.drawImage(personCanvas('ST', i, { tired: tired[i] }), 122 + i * 11, 44 + (tired[i] ? 1 : 0));
  // chỗ ngồi: số bàn tăng theo giai đoạn
  const tables = stage === 1 ? 0 : stage === 2 ? 2 : stage === 3 ? 4 : 6;
  for (let i = 0; i < tables; i++) { const x = 8 + (i % 3) * 26, y = 70 + Math.floor(i / 3) * 14; R(x + 3, y, 12, 5, '#c9905a'); R(x + 3, y + 5, 12, 1, '#8a5a36'); R(x + 8, y + 6, 2, 5, '#8a5a36'); R(x, y + 1, 3, 6, '#ff9a3c'); R(x + 15, y + 1, 3, 6, '#ff9a3c'); if (i < guests) { g.drawImage(personCanvas(['HS', 'VP', 'DK', 'KQ'][i % 4], i % 3), x + 4, y - 9); R(x + 7, y - 1, 2, 2, '#ffffff'); } }
  if (stage === 1) { R(10, 66, 60, 10, '#7a7fa8'); glyphs(function (a, b, c, d, e) { R(a, b, c, d, e); }, 14, 69, 'TEA', '#ffd84d'); }
  if (night) { g.fillStyle = '#ffd84d44'; g.beginPath(); g.arc(120, 26, 40, 0, 6.3); g.fill(); }
  // đêm S5: trăng ngoài cửa sổ, dây đèn nhấp nháy, ánh sáng dịu
  if (k === 4) { const mx = 12 + hour * 11, my = 16 - hour * 3; R(mx, my, 7, 7, '#fff3b0'); R(mx + 3, my, 6, 7, '#0b1030'); for (let i = 0; i < 16; i++) { R(4 + i * 10, 2 + (i % 2) * 2, 2, 2, (Math.floor(t * 2) + i) % 3 ? '#ffd84d' : '#ff9a3c'); } R(0, 3, 160, 1, '#2d1f47'); }
  interiorFx(g, o, R);
  // trang trí ngày lễ trong nhà
  for (const d of decor || []) {
    if (d === 'noel') { for (let j = 0; j < 4; j++) R(20 - j * 2 + 2, 44 + j * 4 - 8, 10 + j * 4 - 2, 5, '#2f9a4a'); R(24, 58, 3, 4, '#8a5a36'); R(25, 34, 2, 3, '#ffd84d'); for (let j = 0; j < 5; j++) R(18 + (j * 5) % 12, 42 + (j * 3) % 14, 2, 2, (Math.floor(t) + j) % 2 ? '#ff5a5f' : '#ffd84d'); }
    if (d === 'newyear') for (let i = 0; i < 8; i++) { R(52 + i * 4, 56, 2, 2, i % 2 ? '#ffd84d' : '#ffffff'); }
    if (d === 'tet') { R(4, 40, 3, 22, '#8a5a36'); for (let i = 0; i < 12; i++) R(0 + (i * 5) % 18, 36 + (i * 4) % 20, 3, 3, i % 2 ? '#ff7fb5' : '#ffb0cc'); for (let i = 0; i < 2; i++) { R(56 + i * 22, 2, 1, 4, '#2d1f47'); R(52 + i * 22, 6, 9, 11, '#ff5a5f'); R(53 + i * 22, 8, 7, 7, '#ffd84d'); } R(84, 40, 6, 8, '#c2354a'); R(85, 41, 4, 6, '#ffd84d'); }
    if (d === 'valentine') for (let i = 0; i < 6; i++) { const x = 6 + i * 14, y = 40 + (i % 2) * 3; R(x, y, 2, 2, '#ff5a5f'); R(x + 3, y, 2, 2, '#ff5a5f'); R(x, y + 2, 5, 2, '#ff5a5f'); R(x + 1, y + 4, 3, 1, '#ff5a5f'); }
    if (d === 'spring') { R(76, 50, 8, 8, '#c2354a'); R(78, 42, 2, 9, '#2f9a4a'); for (const [a, b, c] of [[74, 38, '#ff7fb5'], [79, 36, '#ffd84d'], [82, 40, '#ff9a3c'], [77, 41, '#ffffff']]) R(a, b, 3, 3, c); }
    if (d === 'ram') for (let i = 0; i < 3; i++) { const x = 6 + i * 16, y = 40 + (i % 2) * 3 + Math.sin(t + i) * 1; R(x + 3, y - 4, 1, 4, '#2d1f47'); R(x, y, 7, 8, '#ffd84d'); R(x + 1, y + 1, 5, 6, '#ff9a3c'); }
  }
}

// ---------- minh họa sự kiện lớn (160×64) ----------
const illCache = new Map();
export function illusUrl(kind) {
  if (illCache.has(kind)) return illCache.get(kind);
  const c = cv(160, 64), g = c.getContext('2d'), R = (x, y, w, h, col) => { g.fillStyle = col; g.fillRect(Math.round(x), Math.round(y), w, h); };
  const sky = (a, b) => { for (let y = 0; y < 64; y += 2) R(0, y, 160, 2, mix(a, b, y / 64)); };
  const ground = col => { R(0, 50, 160, 14, col); R(0, 50, 160, 1, '#2d1f47'); };
  const person = (x, y, seg, v) => g.drawImage(personCanvas(seg, v), x, y);
  if (kind === 'noel') { sky('#0b1030', '#26346a'); for (let i = 0; i < 26; i++) R((i * 41) % 158, (i * 17) % 44, 1, 1, i % 3 ? '#ffffff' : '#ffd84d'); ground('#e6f0ff'); for (let i = 0; i < 4; i++) { const x = 20 + i * 36; for (let j = 0; j < 4; j++) R(x - j * 3, 14 + j * 8, 6 + j * 6, 8, '#2f9a4a'); R(x - 1, 46, 3, 5, '#8a5a36'); for (let j = 0; j < 7; j++) R(x - 8 + (j * 5) % 18, 18 + (j * 7) % 26, 2, 2, j % 2 ? '#ff5a5f' : '#ffd84d'); R(x - 1, 8, 3, 5, '#ffd84d'); } person(60, 36, 'DK', 0); person(100, 36, 'DK', 1); }
  else if (kind === 'nye') { sky('#0b1030', '#3b2a6a'); const cols = ['#ff5a5f', '#ffd84d', '#5fd068', '#5ab4ff', '#ff7fb5']; for (let i = 0; i < 5; i++) { const x = 20 + i * 30, y = 14 + (i % 2) * 12; for (let a = 0; a < 12; a++) { const r = 5 + (a % 2) * 5; R(x + Math.round(Math.cos(a * 0.52) * r), y + Math.round(Math.sin(a * 0.52) * r), 2, 2, cols[i]); } R(x, y, 2, 2, '#ffffff'); } ground('#3a3f66'); for (let i = 0; i < 6; i++) person(14 + i * 24, 36, ['DK', 'HS', 'KQ'][i % 3], i % 3); }
  else if (kind === 'tet') { sky('#ffe3cc', '#ffb08a'); ground('#c2553d'); for (let i = 0; i < 4; i++) { const x = 14 + i * 40; R(x + 4, 0, 1, 6, '#2d1f47'); R(x, 6, 10, 14, '#ff5a5f'); R(x + 1, 8, 8, 10, '#ffd84d'); R(x + 4, 20, 2, 8, '#ffd84d'); } R(120, 24, 3, 28, '#8a5a36'); for (let i = 0; i < 18; i++) R(106 + (i * 7) % 34, 14 + (i * 5) % 28, 3, 3, i % 2 ? '#ff7fb5' : '#ffb0cc'); R(70, 40, 14, 10, '#c2354a'); R(72, 42, 10, 6, '#ffd84d'); person(44, 34, 'LA', 0); person(90, 34, 'KQ', 1); R(52, 40, 4, 6, '#ff5a5f'); }
  else if (kind === 'valentine') { sky('#ffd6e8', '#ff9fcb'); ground('#e6a8c0'); for (let i = 0; i < 9; i++) { const x = 8 + i * 17, y = 6 + (i * 9) % 22; R(x, y, 3, 2, '#ff5a5f'); R(x + 4, y, 3, 2, '#ff5a5f'); R(x, y + 2, 7, 2, '#ff5a5f'); R(x + 2, y + 4, 3, 2, '#ff5a5f'); } person(56, 36, 'DK', 2); person(70, 36, 'HS', 0); R(66, 44, 2, 2, '#ff5a5f'); person(104, 36, 'HS', 1); }
  else if (kind === 'ram') { sky('#0b1030', '#2d3a7a'); R(120, 8, 14, 14, '#fff3b0'); R(124, 8, 12, 14, '#0b1030'); for (let i = 0; i < 6; i++) { const x = 10 + i * 26, y = 10 + (i % 2) * 8; R(x + 3, y - 4, 1, 4, '#2d1f47'); R(x, y, 7, 8, '#ffd84d'); R(x + 1, y + 1, 5, 6, '#ff9a3c'); } ground('#3a3f66'); person(40, 36, 'DK', 0); person(110, 36, 'KQ', 2); }
  else if (kind === 'closed') { sky('#c6e6f8', '#e4dff7'); ground('#7d7799'); R(40, 24, 80, 26, '#e8d5b0'); R(36, 18, 88, 8, '#ff5a5f'); for (let i = 0; i < 8; i++) R(36 + i * 11, 18, 5, 8, '#ffffff'); R(70, 32, 18, 18, '#5b3c22'); R(48, 30, 16, 12, '#5b6a9a'); R(94, 30, 16, 12, '#5b6a9a'); R(66, 22, 26, 7, '#ff5a5f'); R(68, 23, 22, 5, '#ffffff'); glyphs(R, 69, 24, 'TEA', '#c2354a'); R(10, 40, 24, 10, '#cfd6e8'); R(30, 42, 8, 8, '#5ab4ff'); R(14, 50, 5, 4, '#2d1f47'); R(30, 50, 5, 4, '#2d1f47'); R(130, 28, 22, 14, '#fff'); R(134, 31, 14, 2, '#c2354a'); R(134, 36, 14, 1, '#9a93c4'); }
  else if (kind === 'inspect') { sky('#e4f0ff', '#c6e6f8'); ground('#9a93c4'); R(20, 14, 50, 36, '#e8d5b0'); R(20, 10, 50, 6, '#3cc8b4'); R(30, 24, 14, 12, '#9ad0ff'); R(50, 26, 12, 24, '#8a5a36'); person(90, 32, 'IN', 0); person(106, 32, 'LA', 0); R(122, 20, 22, 28, '#ffffff'); R(122, 20, 22, 2, '#2d1f47'); for (let i = 0; i < 4; i++) { R(125, 26 + i * 6, 3, 3, i < 3 ? '#5fd068' : '#ffd84d'); R(130, 27 + i * 6, 11, 1, '#9a93c4'); } }
  else if (kind === 'soon') { sky('#2d2a5c', '#4b4694'); for (let i = 0; i < 18; i++) R((i * 47) % 158, (i * 13) % 56, 1, 1, '#ffd84d'); R(48, 22, 64, 22, '#fff6dc'); R(50, 24, 60, 18, '#ffd84d'); glyphs(function (a, b, c, d, e) { R(a, b, c, d, e); }, 60, 29, 'TEALAB', '#2d1f47'); R(60, 48, 40, 4, '#ff9a3c'); for (let i = 0; i < 8; i++) R(60 + i * 5, 48, 2, 4, '#ffffff'); }
  else if (ILL_EXTRA.includes(kind)) drawIllus2(kind, { g, R, sky, ground, person, ic: n => (IC[n] ? fromRows(IC[n]) : null) });
  else { sky('#c6e6f8', '#e4dff7'); ground('#7d7799'); }
  const u2 = c.toDataURL(); illCache.set(kind, u2); return u2;
}
export const illus = (kind, cls = '') => `<img class="tl-ill ${cls}" alt="" src="${illusUrl(kind)}">`;
export function drawPerson(g, x, y, seg, v, mood) { g.drawImage(personCanvas(seg, v, { mood }), Math.round(x), Math.round(y)); }
