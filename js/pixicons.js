// Bộ biểu tượng pixel: mỗi ký tự trong lưới là một điểm ảnh, hiển thị bằng SVG nét sắc cạnh.
//   pix('heart')                       -> chuỗi SVG
//   <span data-ic="heart"></span>      -> mountIcons() thay bằng biểu tượng
//   emojify() tự đổi các emoji quen thuộc trong giao diện thành biểu tượng pixel (chữ gốc vẫn giữ để ẩn).
const PAL = {
  k: '#2d1f47', w: '#ffffff', c: '#fff1cf', d: '#5b5478',
  r: '#ff5a5f', R: '#c2354a', o: '#ff9a3c', O: '#c86a1f', y: '#ffd84d', Y: '#d9a41c',
  g: '#5fd068', G: '#2f9a4a', t: '#3cc8b4', T: '#1f8f86', b: '#5ab4ff', B: '#2f7ad1',
  v: '#a98bff', V: '#6f55d6', p: '#ff7fb5', P: '#c8478a', n: '#c9905a', N: '#8a5a36',
  s: '#e4dff7', S: '#9a93c4',
};

// tam giác "phát" dựng bằng chương trình để đều nét
const tri = (c = 'g', hi = 'w') => Array.from({ length: 11 }, (_, i) => {
  const n = Math.min(i, 10 - i);
  return ('k' + Array.from({ length: n }, (_, j) => (j === 0 && i < 5 ? hi : c)).join('') + 'k').padEnd(7, '.');
});
const NEXT = tri('y').map((r, i) => r + '.' + (i === 0 || i === 10 ? 'kkk' : 'kyk'));
const arrowR = ['......k....', 'kkkkkkbk...', 'kbbbbbbbk..', 'kkkkkkbk...', '......k....'];
const arrowL = arrowR.map(r => [...r].reverse().join(''));

const ICONS = {
  headphones: [
    '...kkkkk...', '..kssssSk..', '.ksk...kSk.', '.ksk...kSk.', 'ksk.....kSk',
    'kkkk...kkkk', 'kwbk...kwbk', 'kbbk...kbbk', 'kbBk...kbBk', 'kkkk...kkkk',
  ],
  book: [
    '.kkkk.kkkk.', 'kbbbbkbbbbk', 'kbwwbkbwwbk', 'kbbbbkbbbbk', 'kbwwbkbwwbk',
    'kbbbbkbbbbk', 'kcccckcccck', 'kcccckcccck', '.kkkk.kkkk.',
  ],
  news: [
    'kkkkkkkkkkk', 'kcrrrccccck', 'kcrrrcBBBck', 'kcrrrccccck', 'kccccccccck',
    'kcBBBcBBBck', 'kccccccccck', 'kcBBBcBBBck', 'kccccccccck', 'kkkkkkkkkkk',
  ],
  dice: [
    '.kkkkkkkkkk.', 'kwwwwwwwwwwk', 'kwrrwwwwrrwk', 'kwrrwwwwrrwk', 'kwwwwwwwwwwk', 'kwwwwrrwwwwk',
    'kwwwwrrwwwsk', 'kwwwwwwwwwsk', 'kwrrwwwwrrsk', 'kwrrwwwwrrsk', 'kwwwwwwwwssk', '.kkkkkkkkkk.',
  ],
  star: [
    '.....k.....', '....kyk....', '....kyk....', 'kkkkkykkkkk', 'kywyyyyyyYk',
    '.kyyyyyyYk.', '..kyyyyYk..', '..kyyyyYk..', '.kyyykyyYk.', '.kkk...kkk.',
  ],
  sparkle: [
    '.....k.....', '....kyk....', '....kyk....', '...kyyyk...', 'kkkyywyykkk', 'kyyywwwyyyk',
    'kkkyywyykkk', '...kyyyk...', '....kyk....', '....kyk....', '.....k.....',
  ],
  pencil: [
    '........kk.', '.......kppk', '......kppkk', '.....kSSk..', '....kyyYk..', '...kyyYk...',
    '..kyyYk....', '.kccYk.....', 'kcckk......', 'kckk.......', 'kk.........',
  ],
  trophy: [
    '.kkkkkkkkk.', 'kyywyyyyyYk', 'kyywyyyyyYk', 'kyyyyyyyyYk', '.kyyyyyyYk.',
    '..kyyyyYk..', '...kkYkk...', '....kYk....', '..kYYYYYk..', '..kkkkkkk..',
  ],
  heart: [
    '.kkk...kkk.', 'krrrkkkrrrk', 'krwrrrrrrrk', 'krwrrrrrrRk', 'krrrrrrrrRk',
    '.krrrrrrRk.', '..krrrrRk..', '...krrRk...', '....kRk....', '.....k.....',
  ],
  flame: [
    '.....k.....', '....kok....', '...kooyk...', '..kooyyok..', '.kooyyyyok.', '.kooyywyyok',
    'kroyywwyyok', 'kroyyywyyok', 'krroyyyyork', '.krrooyyrk.', '..kkrrrkk..',
  ],
  gem: [
    '..kkkkkkk..', '.kpwpppPPk.', 'kpwpppppPPk', 'kkkkkkkkkkk', '.kpppppPPk.',
    '..kppppPk..', '...kppPk...', '....kPk....', '.....k.....',
  ],
  check: [
    '.........k.', '........kgk', '.......kggk', 'k.....kggk.', 'kk...kggk..',
    'kgk.kggk...', '.kgkggk....', '..kggk.....', '...kk......',
  ],
  cross: [
    'kk.....kk', 'krk...krk', '.krk.krk.', '..krkrk..', '...krk...', '..krkrk..', '.krk.krk.', 'krk...krk', 'kk.....kk',
  ],
  plus: [
    '...kkk...', '...kgk...', '...kgk...', 'kkkkgkkkk', 'kgggggggk', 'kkkkgkkkk', '...kgk...', '...kgk...', '...kkk...',
  ],
  clock: [
    '...kkkkk...', '..kwwwwwk..', '.kwwwkwwwk.', 'kwwwwkwwwwk', 'kwwwwkwwwwk', 'kwwwwkkkwwk',
    'kwwwwwwwwwk', '.kwwwwwwwk.', '..kwwwwwk..', '...kkkkk...',
  ],
  bubble: [
    '.kkkkkkkkk.', 'kwwwwwwwwwk', 'kwbwwbwwbwk', 'kwwwwwwwwwk', '.kkkwwkkkk.', '....kwk....', '.....k.....',
  ],
  mic: [
    '....kkk....', '...kwvvk...', '...kwvvk...', '...kvvVk...', '.k.kvvVk.k.', '.k.kvvVk.k.',
    '.kk.kkk.kk.', '..kk...kk..', '...kkkkk...', '....kSk....', '..kSSSSSk..',
  ],
  cards: [
    '.kkkkkkkkk.', 'kpppppppppk', 'kpwwwwwwwPk', 'kpwbbbbbwPk', 'kpwwwwwwwPk', 'kpwbbbbwwPk',
    'kpwwwwwwwPk', 'kpwbbbbbwPk', 'kpwwwwwwwPk', 'kPPPPPPPPPk', '.kkkkkkkkk.',
  ],
  quiz: [
    '.kkkkkkkkk.', 'kvvvvvvvvVk', 'kvvvwwwvvVk', 'kvvwvvvwvVk', 'kvvvvvvwvVk', 'kvvvvwwvvVk',
    'kvvvvwvvvVk', 'kvvvvvvvvVk', 'kvvvvwvvvVk', 'kVVVVVVVVVk', '.kkkkkkkkk.',
  ],
  target: [
    '...kkkkk...', '..krrrrrk..', '.krwwwwwrk.', 'krwwwwwwwrk', 'krwwrrrwwrk', 'krwwrkrwwrk',
    'krwwrrrwwrk', 'krwwwwwwwrk', '.krwwwwwrk.', '..krrrrrk..', '...kkkkk...',
  ],
  trash: [
    '....kkk....', 'kkkkkkkkkkk', 'kSSSSSSSSSk', '.kkkkkkkkk.', '.kssksksSk.', '.kssksksSk.',
    '.kssksksSk.', '.kssksksSk.', '.kssksksSk.', '..kssssSk..', '..kkkkkkk..',
  ],
  link: [
    '.kkkk.kkkk.', 'kbbbbkbbbbk', 'kbkkbbbkkbk', 'kbbbbkbbbbk', '.kkkk.kkkk.',
  ],
  cloud: [
    '...kkk.....', '..kwwwkkk..', '.kwwwwwwwk.', 'kwwwwwwwwwk', 'kssssssssSk', '.kkkkkkkkk.',
  ],
  phone: [
    '.kkkkk.', 'kSSSSSk', 'kbbbbbk', 'kbwwwbk', 'kbbbbbk', 'kbbbbbk', 'kbbbbbk', 'kbbbbbk', 'kSSSSSk', 'kSSkSSk', '.kkkkk.',
  ],
  monitor: [
    'kkkkkkkkkkk', 'kSSSSSSSSSk', 'kSbbbbbbbSk', 'kSbwwbbbbSk', 'kSbwbbbbbSk', 'kSbbbbbbbSk',
    'kSSSSSSSSSk', 'kkkkkSkkkkk', '...kSSSk...', '..kkkkkkk..',
  ],
  clapper: [
    'kkkkkkkkkkk', 'kwwkkwwkkwk', 'kkkwwkkwwkk', 'kkkkkkkkkkk', 'koooooooook', 'koowwwwwook',
    'koooooooook', 'koowwwwoook', 'kOOOOOOOOOk', 'kkkkkkkkkkk',
  ],
  note: [
    '.kkkkkkk.', 'kwwwwwwwk', 'kwbbbbbwk', 'kwwwwwwwk', 'kwbbbbbwk', 'kwwwwwwwk',
    'kwbbbbwwk', 'kwwwwwwwk', 'kwbbbwwwk', 'kwwwwwwwk', '.kkkkkkk.',
  ],
  folder: [
    'kkkk.......', 'koookkkkkkk', 'kooooooooOk', 'kyyyyyyyyYk', 'kyyyyyyyyYk', 'kyyyyyyyyYk', 'kYYYYYYYYYk', 'kkkkkkkkkkk',
  ],
  speaker: [
    '.....k.....', '....kwk..k.', 'kkkkwwk...k', 'kwwswwk.k.k', 'kwwswwk.k.k', 'kkkkwwk...k', '....kwk..k.', '.....k.....',
  ],
  scissors: [
    '.kk.....kk.', '.kSk...kSk.', '..kSk.kSk..', '...kSkSk...', '....kSk....', '...kSkSk...',
    '..kSk.kSk..', '.kkk...kkk.', 'kp.pk.kp.pk', '.kkk...kkk.',
  ],
  robot: [
    '.....r.....', '.....k.....', '.kkkkkkkkk.', 'kssssssssSk', 'ksbbsssbbSk', 'ksbbsssbbSk',
    'kssssssssSk', 'ksskkkkksSk', 'kssssssssSk', '.kkkkkkkkk.',
  ],
  eye: [
    '...kkkkk...', '.kkwwwwwkk.', 'kwwwbbbwwwk', 'kwwbbkbbwwk', 'kwwwbbbwwwk', '.kkwwwwwkk.', '...kkkkk...',
  ],
  eyeoff: [
    'kk.......kk', '.kkk...kkk.', '...kkkkk...', '..k..k..k..', '.k...k...k.',
  ],
  play: tri('y'),
  pause: [
    'kkkk.kkkk', ...Array(9).fill('kwbk.kwbk'), 'kkkk.kkkk',
  ],
  next: NEXT,
  prev: NEXT.map(r => [...r].reverse().join('')),
  loop: [...arrowR, '...........', ...arrowL],
  undo: arrowL,
  chart: [
    '........kkk', '........kgk', '........kgk', '........kgk', '....kkk.kgk', '....kyk.kgk', '....kyk.kgk', 'kkk.kyk.kgk', 'kbk.kyk.kgk', 'kkkkkkkkkkk',
  ],
  search: [
    '..kkkk.....', '.kwwwwk....', 'kwbbbbwk...', 'kwbwwbwk...', 'kwbwwbwk...', 'kwbbbbwk...', '.kwwwwkk...', '..kkkkNk...', '......NNk..', '.......NNk.', '........kk.',
  ],
  bell: [
    '.....k.....', '...kkkkk...', '..kyyyyyk..', '..kywyyyk..', '..kyyyyyk..', '.kyyyyyyyk.', '.kyyyyyyYk.', 'kyyyyyyyyYk', 'kkkkkkkkkkk', '....kYk....', '.....k.....',
  ],
  keyboard: [
    'kkkkkkkkkkk', 'kwkwkwkwkwk', 'kkkkkkkkkkk', 'kwkwkwkwkwk', 'kkkkkkkkkkk', 'kwwwwwwwwwk', 'kkkkkkkkkkk',
  ],  dot: [
    '..kkk..', '.krrrk.', 'krwrrRk', 'krrrrRk', 'krrrrRk', '.kRRRk.', '..kkk..',
  ],
  bulb: [
    '..kkkkk..', '.kyyyyyk.', 'kywwyyyyk', 'kywyyyyYk', 'kyyyyyyYk', '.kyyyyYk.',
    '..kyyYk..', '..kkkkk..', '..kSSSk..', '..kkkkk..', '...kkk...',
  ],
  eraser: [
    '.kkkkkkkkk.', 'kppwkbbbbbk', 'kppwkbbbbbk', 'kppPkbbbbBk', '.kkkkkkkkk.',
  ],
  floppy: [
    'kkkkkkkkkkk', 'kbssssssbbk', 'kbsskkssbBk', 'kbssssssbBk', 'kbbbbbbbbBk', 'kbwwwwwwwBk',
    'kbwwwwwwwBk', 'kbwbbbbbwBk', 'kbwwwwwwwBk', 'kbwwwwwwwBk', 'kkkkkkkkkkk',
  ],
  gear: [
    '....kkk....', '.kk.kSk.kk.', 'kSSkkSkkSSk', '.kSSSSSSSk.', '.kSSkkkSSk.', 'kSSSk.kSSSk',
    '.kSSkkkSSk.', '.kSSSSSSSk.', 'kSSkkSkkSSk', '.kk.kSk.kk.', '....kkk....',
  ],
  menu: [
    'kkkkkkkkk', 'kwwwwwwwk', 'kkkkkkkkk', '.........', 'kkkkkkkkk', 'kwwwwwwwk', 'kkkkkkkkk', '.........', 'kkkkkkkkk', 'kwwwwwwwk', 'kkkkkkkkk',
  ],
  user: [
    '...kkkkk...', '..kccccck..', '..kckckck..', '..kccccck..', '...kkkkk...', '..kkbbbkk..',
    '.kbbbbbbbk.', 'kbbbbbbbbbk', 'kbbbbbbbbbk', 'kkkkkkkkkkk',
  ],
  sun: [
    '....o....', '.o..o..o.', '..kkkkk..', '.kyyyyyk.', 'okyywyyko', '.kyyyyyk.', '..kkkkk..', '.o..o..o.', '....o....',
  ],
  moon: [
    '...kkkk..', '..kyyyyk.', '.kyyykkk.', 'kywyk....', 'kyyyk....', 'kyyyk....', '.kyyykkk.', '..kYyyyk.', '...kkkk..',
  ],
  coin: [
    '..kkkkk..', '.kyyyyyk.', 'kyywyyyYk', 'kyywkyyYk', 'kyywkyyYk', 'kyyyyyyYk', '.kYyyyYk.', '..kkkkk..',
  ],
};

// ---------- tranh minh họa lớn (16 điểm) cho thư mục, bài học, bài kiểm tra… ----------
Object.assign(ICONS, {
  globe: [
    '...kkkkk...', '.kkbbgbbkk.', 'kbbggbbbbbk', 'kbgggbbgbbk', 'kbbggbggbbk', 'kbbbbbgggbk', 'kbbbggggbbk', 'kbbbbgggbBk', '.kkbbbbBBk.', '...kkkkk...',
  ],
  a_world: [
    '.....kkkkkk.....', '...kkbbbbbbkk...', '..kbbbgggbbbbk..', '.kbbbgggggbbbbk.', '.kbbgggbbbbgbbk.', 'kbbbbggbbbbggbbk', 'kbwbbbbbbbbggbbk', 'kbwbbbbgggbbbbbk',
    'kbbbbbggggggbbbk', 'kbbbbbbgggggbbbk', 'kbbbbbbbggggbbBk', '.kbbbbbbbgbbbBk.', '.kbbbbbbbbbbBBk.', '..kbbbbbbbBBBk..', '...kkBBBBBBkk...', '.....kkkkkk.....',
  ],
  a_folder: [
    '................', '.kkkkkkk........', 'kyyyyyyyk.......', 'kyyyyyyykkkkkkkk', 'kywyyyyyyyyyyyyk', 'kywyyyyyyyyyyyyk', 'kyyyyyyyyyyyyyyk', 'kyyyyyyyyyyyyyyk',
    'kyyyyyyyyyyyyyyk', 'kyyyyyyyyyyyyyyk', 'kyyyyyyyyyyyyyYk', 'kyyyyyyyyyyyyYYk', 'kYYYYYYYYYYYYYYk', 'kkkkkkkkkkkkkkkk',
  ],
  a_plus: [
    '....kkk....', '....kgk....', '....kgk....', 'kkkkkgkkkkk', 'kgggggggggk', 'kkkkkgkkkkk', '....kgk....', '....kgk....', '....kkk....',
  ],
  a_books: [
    '................', '...kkkkkkkkkkk..', '...krrwwwwrrRk..', '...kRRRRRRRRRk..', '...kkkkkkkkkkk..', '.kkkkkkkkkkkkk..', '.kbbwwwwwbbbBk..',
    '.kBBBBBBBBBBBk..', '.kkkkkkkkkkkkk..', '..kkkkkkkkkkkkk.', '..kggwwwwwgggGk.', '..kGGGGGGGGGGGk.', '..kkkkkkkkkkkkk.',
  ],
  a_book: [
    '................', '..kkkkk..kkkkk..', '.kccccckkccccck.', '.kcSSSckkcSSSck.', '.kccccckkccccck.', '.kcSSSckkcSSSck.', '.kccccckkccccck.',
    '.kcSSSckkcSSSck.', '.kBBBBBBBBBBBBk.', '..kkkkkkkkkkkk..',
  ],
  a_test: [
    '.....kkkkkk.....', '....kSSSSSSk....', '..kkkSkkkkSkkk..', '.kccccccccccck..', '.kcggccSSSSSck..', '.kccccccccccck..', '.kcggccSSSSSck..',
    '.kccccccccccck..', '.kcrrccSSSSSck..', '.kccccccccccck..', '.kcggccSSSSSck..', '.kccccccccccck..', '.kkkkkkkkkkkkk..',
  ],
  a_exercise: [
    '.kkkkkkkkkk.....', '.kccccccccck..kk', '.kcrccSSSSck.kpk', '.kccccccccck.kpk', '.kcrccSSSSck.kyk', '.kccccccccck.kyk', '.kcrccSSSSck.kyk',
    '.kccccccccck.kyk', '.kcrccSSSSck.kYk', '.kccccccccck.kYk', '.kcccccccccckkkk', '.kkkkkkkkkkk.kk.',
  ],
});

// Huy hiệu thành tựu: dải ruy-băng + huy chương tròn theo hạng (đồng/bạc/vàng/kim cương) + hình nhỏ ở giữa. Chưa mở khóa thì xám.
const TIER = {
  bronze: ['#e3a066', '#b5713a', '#f6c79a'], silver: ['#d8deec', '#9aa3bd', '#ffffff'], gold: ['#ffd84d', '#d9a41c', '#fff3a3'], diamond: ['#8fe8ff', '#3aa6d8', '#eefcff'], locked: ['#dcd8ee', '#a9a3c6', '#f2f0fb'],
};
const GLYPH = {
  star: ['...g...', '...g...', 'ggggggg', '.ggggg.', '..ggg..', '.gg.gg.', '.g...g.'],
  time: ['.ggggg.', 'g.....g', 'g..g..g', 'g..gg.g', 'g.....g', '.ggggg.', '.......'],
  cal: ['g.....g', 'ggggggg', 'g.....g', 'g.g.g.g', 'g.....g', 'g.g.g.g', 'ggggggg'],
  flame: ['...g...', '..gg...', '..ggg..', '.ggggg.', 'gggggg.', 'gggggg.', '.gggg..'],
  mic: ['..ggg..', '..ggg..', '..ggg..', 'g.ggg.g', 'g.ggg.g', '.ggggg.', '...g...'],
  card: ['.ggggg.', 'g.....g', 'g.ggg.g', 'g.....g', 'g.ggg.g', 'g.....g', '.ggggg.'],
  check: ['......g', '.....gg', 'g...gg.', 'gg.gg..', '.ggg...', '..g....', '.......'],
  target: ['.ggggg.', 'g.....g', 'g.ggg.g', 'g.g.g.g', 'g.ggg.g', 'g.....g', '.ggggg.'],
  globe: ['.ggggg.', 'g.g.g.g', 'ggggggg', 'g.g.g.g', 'ggggggg', 'g.g.g.g', '.ggggg.'],
  pencil: ['.....gg', '....ggg', '...ggg.', '..ggg..', '.ggg...', 'ggg....', 'gg.....'],
  book: ['ggg.ggg', 'g.g.g.g', 'g.g.g.g', 'g.g.g.g', 'g.g.g.g', 'ggg.ggg', '.......'],
  phones: ['.ggggg.', 'g.....g', 'g.....g', 'g.....g', 'ggg.ggg', 'ggg.ggg', '.......'],
  trophy: ['ggggggg', 'g.ggg.g', 'g.ggg.g', '.ggggg.', '..ggg..', '..ggg..', '.ggggg.'],
  up: ['...g...', '..ggg..', '.ggggg.', '...g...', '...g...', '...g...', '...g...'],
  news: ['ggggggg', 'g.g.ggg', 'ggg.g.g', 'g.g.ggg', 'ggggggg', '.......', '.......'],
};
export const glyphNames = () => Object.keys(GLYPH);
const bcache = new Map();
export function badge(tier = 'bronze', glyph = 'star') {
  const key = tier + '|' + glyph;
  if (bcache.has(key)) return bcache.get(key);
  const [main, dark, light] = TIER[tier] || TIER.locked, ink = tier === 'locked' ? '#9a93c4' : '#2d1f47';
  let rects = '';
  const px = (x, y, c) => { rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${c}"/>`; };
  for (let y = 0; y < 6; y++) { // ruy-băng
    for (const [x0, c] of [[4, '#ff5a5f'], [9, '#5ab4ff']]) { px(x0 - 1, y, '#2d1f47'); px(x0 + 3, y, '#2d1f47'); for (let x = x0; x < x0 + 3; x++) px(x, y, tier === 'locked' ? '#cfcae6' : c); }
  }
  for (let y = 4; y < 18; y++) {
    for (let x = 0; x < 16; x++) {
      const d = Math.hypot(x - 7.5, y - 10.5);
      if (d > 6.7) continue;
      if (d > 5.6) px(x, y, '#2d1f47');
      else if (d > 4.3) px(x, y, x + y < 17 ? light : dark);
      else px(x, y, main);
    }
  }
  (GLYPH[glyph] || GLYPH.star).forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'g') px(4 + i, 7 + j, ink); }));
  const svg = `<svg class="pix badge" viewBox="0 0 16 18" style="--w:16;--h:18" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
  bcache.set(key, svg);
  return svg;
}

// Kiểm tra lưới (dùng khi thiết kế biểu tượng mới): trả về danh sách lỗi
export function checkIcons() {
  const bad = [];
  for (const [n, rows] of Object.entries(ICONS)) {
    const w = rows[0].length;
    rows.forEach((r, i) => {
      if (r.length !== w) bad.push(`${n} dòng ${i}: dài ${r.length}, cần ${w}`);
      [...r].forEach(ch => { if (ch !== '.' && !PAL[ch]) bad.push(`${n} dòng ${i}: ký tự lạ “${ch}”`); });
    });
  }
  return bad;
}
export const iconNames = () => Object.keys(ICONS);

const cache = new Map();
export function pix(name) {
  const rows = ICONS[name];
  if (!rows) return '';
  if (cache.has(name)) return cache.get(name);
  const w = rows[0].length, h = rows.length;
  let rects = '';
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) { // gộp các điểm cùng màu liền nhau thành một khối
      const ch = row[x];
      if (ch === '.') { x++; continue; }
      let e = x; while (e < row.length && row[e] === ch) e++;
      rects += `<rect x="${x}" y="${y}" width="${e - x}" height="1" fill="${PAL[ch]}"/>`;
      x = e;
    }
  });
  // kích thước = số điểm × --z (CSS), nên mỗi ngữ cảnh chọn cỡ điểm ảnh nguyên (2px, 3px…) cho nét sắc
  const svg = `<svg class="pix" viewBox="0 0 ${w} ${h}" style="--w:${w};--h:${h}" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
  cache.set(name, svg);
  return svg;
}

// Thay mọi <span data-ic="tên"> bằng biểu tượng
export function mountIcons(root = document) {
  root.querySelectorAll('[data-ic]').forEach(el => { if (!el.dataset.done) { el.innerHTML = pix(el.dataset.ic); el.dataset.done = '1'; } });
}

// ---------- emoji -> pixel ----------
const MAP = {
  '🎧': 'headphones', '📚': 'book', '📖': 'book', '📒': 'cards', '🗂': 'cards',
  '✍': 'pencil', '✏': 'pencil', '✎': 'pencil', '🖊': 'pencil', '🎯': 'target', '🗑': 'trash',
  '🔗': 'link', '☁': 'cloud', '📱': 'phone', '🖥': 'monitor', '🎬': 'clapper',
  '📝': 'note', '📄': 'note', '📃': 'note', '📋': 'note', '📑': 'note', '📂': 'folder',
  '🔊': 'speaker', '✨': 'sparkle', '⚡': 'sparkle', '✂': 'scissors', '🎙': 'mic', '🤖': 'robot',
  '🙈': 'eyeoff', '👁': 'eye', '⏸': 'pause', '▶': 'play', '⏭': 'next', '⏮': 'prev',
  '🔁': 'loop', '🔄': 'loop', '↻': 'loop', '↺': 'undo', '⇄': 'loop', '↶': 'undo', '↩': 'undo',
  '⏱': 'clock', '🐢': 'clock', '🗣': 'bubble', '🔥': 'flame', '🎉': 'trophy',
  '✅': 'check', '✔': 'check', '✓': 'check', '❌': 'cross', '✗': 'cross', '✕': 'cross',
  '＋': 'plus', '➕': 'plus', '👤': 'user', '🔴': 'dot', '🧩': 'quiz', '💡': 'bulb',
  '🧹': 'eraser', '💾': 'floppy', '⚙': 'gear', '☰': 'menu',
  '📈': 'chart', '🔎': 'search', '🔍': 'search', '🔔': 'bell', '⌨': 'keyboard', '🏆': 'trophy', '❤': 'heart', '♥': 'heart', '⭐': 'star', '💎': 'gem', '📰': 'news', '🎲': 'dice', '📕': 'book', '📗': 'book', '📘': 'book', '🌍': 'globe', '🌎': 'globe', '🌏': 'globe',
};
const RE = new RegExp('(' + Object.keys(MAP).join('|') + ')\\uFE0F?', 'gu');
// vùng chứa nội dung của người dùng hoặc ô nhập: không đổi emoji ở đó
const DENY = 'script,style,textarea,input,select,option,.pxe,#now,.cue:not(.ed),.qtext,.qexp,.preview,.txt,.wans,.wmeaning,.pvrow,.srow,.wvw,.wvm,.wvs,.mbq,.nw-emoji,.nw-h,.nw-lead,.nw-ttl,.nw-text,.wchip,.slot,[contenteditable]';

function convert(tn) {
  const s = tn.nodeValue;
  RE.lastIndex = 0;
  if (!RE.test(s)) return;
  const p = tn.parentElement;
  if (!p || p.closest('.pxe') || (p.closest(DENY) && !p.closest('.spk'))) return; // .pxe: chữ ẩn đã đổi rồi, không đổi lại (tránh lặp vô hạn)
  RE.lastIndex = 0;
  const frag = document.createDocumentFragment();
  let last = 0, m;
  while ((m = RE.exec(s))) {
    if (m.index > last) frag.append(s.slice(last, m.index));
    const sp = document.createElement('span');
    sp.className = 'pxe';
    // giữ lại ký tự gốc (ẩn) để textContent, sao chép, đọc màn hình vẫn như cũ
    sp.innerHTML = pix(MAP[m[1]]) + `<span class="pxr">${m[0]}</span>`;
    frag.append(sp);
    last = m.index + m[0].length;
  }
  if (last < s.length) frag.append(s.slice(last));
  tn.replaceWith(frag);
}
function scan(node) {
  if (node.nodeType === 3) { convert(node); return; }
  if (node.nodeType !== 1 || node.closest('.pxe') || (node.closest(DENY) && !node.closest('.spk'))) return;
  const w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  const list = []; for (let n = w.nextNode(); n; n = w.nextNode()) list.push(n);
  list.forEach(convert);
}
export function emojify(root = document.body) {
  scan(root);
  new MutationObserver(ms => {
    for (const m of ms) {
      if (m.type === 'characterData') convert(m.target);
      else m.addedNodes.forEach(scan);
    }
  }).observe(root, { childList: true, subtree: true, characterData: true });
}
