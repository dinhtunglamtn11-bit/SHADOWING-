// Việt Nam · bỏ nền vuông của thẻ thú cưng / vật cầm (tô loang từ mép ngoài) để Lame không mang theo ô màu.
import { ITEMS } from './pass-kit.js';

const star = ITEMS.find(i => i.id === 'vn-doclap');
if (star) star.fn = d => {
  d.bg('r');
  d.s(0, 0, ['................', '.......yy.......', '.......yy.......', '......yyyy......', '......yyyy......', '..yyyyyyyyyyyy..', '...yyyyyyyyyy...', '....yyyyyyyy....', '....yyyyyyyy....', '...yyyyyyyyyy...', '...yyyy..yyyy...', '..yyyy....yyyy..', '..yyy......yyy..', '................', '................', '................']);
};

for (const it of ITEMS) {
  if (it.cc !== 'vn' || !it.fn || (it.use !== 'pet' && it.use !== 'hold')) continue;
  const f = it.fn;
  it.fn = d => {
    f(d);
    const g = d.g, c = g[0][0]; if (!c) return;
    const seen = new Set(), st = [[0, 0], [15, 0], [0, 15], [15, 15]];
    while (st.length) {
      const [x, y] = st.pop(), k = y * 16 + x;
      if (x < 0 || y < 0 || x > 15 || y > 15 || seen.has(k) || g[y][x] !== c) continue;
      seen.add(k); g[y][x] = null; st.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
  };
}
