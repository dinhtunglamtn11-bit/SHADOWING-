// TeaLab: tranh pixel vẽ bằng chương trình (không cần file ảnh). Mọi hình dựng từ lưới ký tự hoặc ô vuông; hiển thị sắc cạnh (image-rendering: pixelated).
import { EXTRA_IC, sceneFx, interiorFx, ILL_EXTRA, drawIllus2 } from './tl-art2.js';
import { drawTown, drawRoom, shopGeo } from './tl-scene.js';
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
export const SCENE_W = 160, SCENE_H = 100; export { shopGeo };
// phông chữ pixel 3×5 cho biển hiệu
const GL = { T: '111010010010010', R: '110101110101101', A: '010101111101101', L: '100100100100111', M: '101111111101101', B: '110101110101110', '2': '111001111100111', E: '111100110100111', ' ': '000000000000000' };
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
  const G = drawTown(g, o, R, { personCanvas, glyphs, mix, bot }); // phố, mặt tiền cửa hàng, người, trang trí ngày lễ
 // thời tiết
  if (rain) { g.fillStyle = k === 4 ? '#8fb6ff' : '#5a8fe0'; for (let i = 0; i < 46; i++) { const x = (i * 29 + t * 18) % 170 - 5, y = ((i * 17 + t * 60) % 110) - 5; g.fillRect(Math.round(x), Math.round(y), 1, 3); } R(0, 88, SCENE_W, 12, '#5a8fe033'); }
  else if (sky === 'drizzle') { g.fillStyle = '#9ec0f0'; for (let i = 0; i < 34; i++) { const x = (i * 31 + t * 6) % 165, y = ((i * 19 + t * 22) % 105); g.fillRect(Math.round(x), Math.round(y), 1, 1); } }
  if (sky === 'cold' || sky === 'monsoon') { g.fillStyle = '#e6f6ff33'; g.fillRect(0, 56, SCENE_W, 44); }
  if (sky === 'hot' || sky === 'sunny') { g.fillStyle = '#fff3b022'; g.fillRect(0, 0, SCENE_W, 40); }
  sceneFx(g, o, R);
}
export const decorOf = day => { const d = []; if (day >= 17 && day <= 25) d.push('noel'); if (day === 24 || day === 25) d.push('snow'); if (day >= 28 && day <= 34) d.push('newyear'); if (day >= 56 && day <= 67) d.push('cho'); if (day >= 68 && day <= 75) d.push('tet'); if (day >= 70 && day <= 77) d.push('valentine'); if (day >= 80 && day <= 83) d.push('ram'); return d; };
// ---------- nội thất (quầy thu ngân, khu pha chế, chỗ ngồi) theo giai đoạn ----------
export function drawInterior(g, o) {
  const R = (x, y, w, h, col) => { g.fillStyle = col; g.fillRect(Math.round(x), Math.round(y), w, h); };
  const { stage = 1, k = 0, staffN = 0, guests = 0, t = 0, open = true, decor = [], tired = [], hour = 0 } = o, night = k >= 3;
  drawRoom(g, R, { ...o, hour }, { personCanvas, mix, SKY }); // căn phòng: tường, sàn, quầy, bàn ghế
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
  const townIll = (gg, opt) => { const sc = cv(160, 100); drawScene(sc.getContext('2d'), { open: true, sky: 'dry', staffN: 2, t: 1.2, day: 1, ...opt }); gg.drawImage(sc, 0, -12); }, OUTI = '#2d1f47';
  if (kind === 'noel') { townIll(g, { stage: 3, k: 3, decor: ['noel', 'snow'], day: 24 }); person(46, 46, 'DK', 0); person(60, 46, 'DK', 1); person(30, 46, 'HS', 2); }
  else if (kind === 'nye') { townIll(g, { stage: 3, k: 4, hour: 0, decor: ['newyear'], day: 31 }); for (let i = 0; i < 5; i++) person(12 + i * 11, 38, ['DK', 'HS', 'KQ'][i % 3], i % 3); }
  else if (kind === 'tet') { townIll(g, { stage: 3, k: 3, decor: ['tet'], day: 68 }); person(40, 46, 'KQ', 2); person(52, 46, 'HS', 1); person(26, 46, 'VP', 0); }
  else if (kind === 'valentine') { townIll(g, { stage: 3, k: 2, decor: ['valentine'], day: 76 }); person(44, 46, 'DK', 2); person(55, 46, 'HS', 0); R(52, 44, 3, 3, '#ff5a5f'); person(24, 46, 'HS', 1); }
  else if (kind === 'ram') { townIll(g, { stage: 3, k: 4, hour: 0, decor: ['ram'], day: 82 }); person(40, 46, 'DK', 0); person(30, 46, 'KQ', 2); }
  else if (kind === 'closed') { townIll(g, { stage: 3, k: 1, open: false, day: 65 }); person(48, 46, 'LA', 0); person(36, 46, 'CO', 0); }
  else if (kind === 'inspect') { townIll(g, { stage: 3, k: 1, day: 53 }); person(52, 46, 'IN', 0); person(40, 46, 'LA', 0); R(30, 48, 8, 10, '#ffffff'); R(30, 48, 8, 1, OUTI); for (let i = 0; i < 3; i++) R(31, 50 + i * 3, 2, 2, i < 2 ? '#5fd068' : '#ffd84d'); }
  else if (kind === 'soon') { sky('#2d2a5c', '#4b4694'); for (let i = 0; i < 18; i++) R((i * 47) % 158, (i * 13) % 56, 1, 1, '#ffd84d'); R(48, 22, 64, 22, '#fff6dc'); R(50, 24, 60, 18, '#ffd84d'); glyphs(function (a, b, c, d, e) { R(a, b, c, d, e); }, 60, 29, 'TEALAB', '#2d1f47'); R(60, 48, 40, 4, '#ff9a3c'); for (let i = 0; i < 8; i++) R(60 + i * 5, 48, 2, 4, '#ffffff'); }
  else if (ILL_EXTRA.includes(kind)) drawIllus2(kind, { g, R, sky, ground, person, town: opt => townIll(g, opt), ic: n => (IC[n] ? fromRows(IC[n]) : null) });
  else { sky('#c6e6f8', '#e4dff7'); ground('#7d7799'); }
  const u2 = c.toDataURL(); illCache.set(kind, u2); return u2;
}
export const illus = (kind, cls = '') => `<img class="tl-ill ${cls}" alt="" src="${illusUrl(kind)}">`;
export function drawPerson(g, x, y, seg, v, mood) { g.drawImage(personCanvas(seg, v, { mood }), Math.round(x), Math.round(y)); }
