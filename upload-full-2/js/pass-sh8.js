import { add, setCC } from './pass-kit.js';
import { SKINS } from './pass-skins.js';
setCC('sh');
// Cửa hàng trang trí · Giao diện app (đắt): mua xong đổi màu, nền và hiệu ứng của cả app; bật / tắt trong Cài đặt.
for (const s of SKINS) {
  add(1, 'Giao diện app', s.id, s.vi, s.en, s.note, d => {
    d.bg(s.c.bg); d.r(0, 0, 16, 3, s.c.wood); d.r(0, 3, 16, 2, s.c.steel); d.r(2, 6, 12, 8, s.c.panel);
    d.r(2, 6, 12, 1, s.c.text); d.r(2, 13, 12, 1, s.c.text); d.r(2, 6, 1, 8, s.c.text); d.r(13, 6, 1, 8, s.c.text);
    d.r(4, 8, 8, 1, s.c.text); d.r(4, 10, 6, 1, s.c.text); d.r(10, 11, 3, 2, s.c.acc);
    d.p(s.c.acc, 1, 1, 14, 1);
  }, { deco: 'skin', val: s.val, price: s.price, shop: true, scene: true });
}
