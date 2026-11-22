import { add, setCC, OUTM } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('sh');
// Cửa hàng trang trí · Mũ và tóc, Mặt. (Các hàm dùng chung nằm ở đây; pass-sh2..4 nhập lại.)
export const G = 1;
export const c = s => { const n = 16 - s.length, l = n >> 1; return '.'.repeat(l) + s + '.'.repeat(n - l); }; // căn giữa một hàng 16 ô
export const two = (a, gap) => c(a + '.'.repeat(gap) + a); // hai nửa đối xứng
// đăng ký một món đeo ghép lên Lame: lớp phủ + ô trang bị + thẻ cửa hàng (hình thẻ vẽ từ chính lớp phủ)
export function addOv(sub, id, vi, en, note, slot, y0, pal, rows, price) {
  const rr = rows.map(r => (r + '................').slice(0, 16));
  O[id] = { y0, pal, rows: rr }; SLOT_OF[id] = slot;
  add(G, sub, id, vi, en, note, d => { const top = slot === 'head' ? 6 : slot === 'feet' ? 6 : 5; rr.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.' && pal[ch]) d.put(i, top + j, pal[ch]); })); }, { use: 'wear', price, shop: true });
}
export function addOutfit(id, key, vi, en, note, map, pal, patch, price) {
  OUTM[key] = { map, pal: { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#f5f5f5', y: '#ffd84d', w: '#ffffff', ...pal }, patch: patch || [] }; OUT_KEY[id] = key; SLOT_OF[id] = 'outfit';
  add(G, 'Trang phục vui', id, vi, en, note, null, { char: [key], use: 'wear', price, shop: true });
}
const H = 'Mũ và tóc', F = 'Mặt';

// ----- Mũ và tóc -----
addOv(H, 'sh-crown', 'Vương miện vàng', 'Golden crown', 'Cho Lame cảm giác làm vua làm hoàng hậu ngay trong buổi học.', 'head', -2, { y: '#ffd84d', Y: '#c9a227', r: '#e8452c', b: '#4a7be0' }, [c('y..y..y..y'), c('yyyyyyyyyy'), c('yrYyybyYry')], 160);
addOv(H, 'sh-wizard', 'Mũ phù thủy', 'Wizard hat', 'Chiếc nón nhọn đầy sao của người thông thái.', 'head', -4, { v: '#7a3fc0', V: '#4a2680', y: '#ffd84d' }, [c('v'), c('vv'), c('vyvv'), c('vvvvvv'), c('vvvvvvvv'), c('VVVVVVVVVVVV')], 140);
addOv(H, 'sh-chef', 'Mũ đầu bếp', 'Chef hat', 'Phồng như bánh bao, hợp với những thẻ ẩm thực.', 'head', -4, { w: '#ffffff', W: '#dfe6f8' }, [c('wwwwww'), c('wwwwwwww'), c('wwwwwwww'), c('WWWWWWWW'), c('wwwwwwwwww')], 110);
addOv(H, 'sh-catears', 'Tai mèo', 'Cat ears', 'Hai tai nhọn dễ thương, đội lên là thành mèo con.', 'head', -2, { k: '#2b2b3a', p: '#ff8fc8' }, [two('k', 8), two('kk', 6), two('kpk', 4)], 100);
addOv(H, 'sh-headphones', 'Tai nghe', 'Headphones', 'Vừa học vừa nghe nhạc, ngầu hơn hẳn.', 'head', -1, { d: '#2b2b3a', D: '#e8452c' }, [c('dddddddd'), two('d', 10), two('d', 10), two('d', 10), two('DD', 8), two('DD', 8)], 120);
addOv(H, 'sh-party', 'Mũ sinh nhật', 'Party hat', 'Hôm nào học giỏi cũng là một bữa tiệc.', 'head', -4, { y: '#ffd84d', o: '#ff9f43', b: '#4a7be0', p: '#ff8fc8' }, [c('y'), c('oo'), c('bboo'), c('bbpobb'), c('bbpoppbb')], 80);
addOv(H, 'sh-pirate', 'Mũ cướp biển', 'Pirate hat', 'Có cả đầu lâu, nhưng rất thân thiện.', 'head', -3, { k: '#2b2b3a', w: '#ffffff' }, [c('kk..kk'), c('kkkkkkkk'), c('kkkwwkkk'), c('kkkkkkkkkkkk')], 130);
addOv(H, 'sh-helmet', 'Mũ phi hành gia', 'Space helmet', 'Bay lên vũ trụ để học tiếng nói của các vì sao.', 'head', -1, { a: '#c0c8d8', w: '#ffffff' }, [c('aaaaaaaa'), c('awwaaaaaaa'), two('a', 10), two('a', 10), two('a', 10), two('a', 10), two('a', 10), two('a', 10), two('a', 10), c('aaaaaaaaaaaa')], 220);
addOv(H, 'sh-halo', 'Vòng hào quang', 'Halo', 'Dành cho bạn học thiên thần.', 'head', -4, { y: '#ffd84d' }, [c('yyyyyyyy'), c('y......y')], 90);
addOv(H, 'sh-viking', 'Mũ chiến binh Viking', 'Viking helmet', 'Hai chiếc sừng trắng uy phong.', 'head', -3, { w: '#ffffff', a: '#9aa4c4', A: '#5a6490' }, [two('w', 10), two('w', 10), c('aaaaaaaa'), c('aaaaaaaaaa'), c('AAAAAAAAAA')], 150);
addOv(H, 'sh-santa', 'Mũ ông già Noel', 'Santa hat', 'Mặc dù đang là mùa nào cũng được.', 'head', -4, { r: '#e8452c', w: '#ffffff' }, [c('w'), c('rr'), c('rrrr'), c('rrrrrr'), c('wwwwwwwwww')], 90);
addOv(H, 'sh-straw', 'Nón rơm', 'Straw hat', 'Đi dạo đồng quê và đi biển đều hợp.', 'head', -2, { y: '#ffd84d', Y: '#c9a227', r: '#e8452c' }, [c('yyyyyy'), c('yyyyyyyy'), c('rrrrrrrr'), c('YYYYYYYYYYYYYY')], 100);
addOv(H, 'sh-grad', 'Mũ cử nhân', 'Graduation cap', 'Đội thử trước ngày thành công.', 'head', -3, { k: '#2b2b3a', y: '#ffd84d' }, [c('kk'), c('kkkkkkkkkk'), c('kkkkkkkkkkkkkk'), c('kkkkkkkkkk'), '..............y.'], 120);
addOv(H, 'sh-bunny', 'Tai thỏ', 'Bunny ears', 'Hai tai dài mềm mại.', 'head', -4, { w: '#ffffff', p: '#ff8fc8' }, [two('wp', 8), two('wp', 8), two('wp', 8), two('ww', 8)], 100);
addOv(H, 'sh-alien', 'Râu ăng-ten người ngoài hành tinh', 'Alien antennae', 'Gửi tín hiệu về hành tinh mẹ.', 'head', -4, { g: '#5fb85a', G: '#2f7d3a' }, [c('gg....gg'), c('.g....g.'), c('.g....g.'), c('GGGGGGGG')], 110);
addOv(H, 'sh-rainbow', 'Tóc cầu vồng', 'Rainbow wig', 'Bảy sắc màu trên đầu.', 'head', -2, { r: '#e8452c', o: '#ff9f43', y: '#ffd84d', g: '#5fb85a', b: '#4a7be0' }, [c('rrrrrrrrrr'), c('oooooooooooo'), c('yyyyyyyyyyyy'), c('gg........gg'), c('bb........bb')], 130);
addOv(H, 'sh-tiara', 'Vương miện công chúa', 'Princess tiara', 'Nhỏ xinh, lấp lánh.', 'head', -2, { y: '#ffd84d', p: '#ff8fc8', c: '#8fd3ff' }, [c('y..y..y'), c('yyyyyyy'), c('ypycyp')], 110);
addOv(H, 'sh-hardhat', 'Mũ bảo hộ', 'Hard hat', 'Học chăm chỉ như công nhân xây dựng.', 'head', -2, { y: '#ffd84d', Y: '#c9a227' }, [c('yyyyyy'), c('yyyyyyyy'), c('yyyyyyyyyy'), c('YYYYYYYYYYYY')], 80);

// ----- Mặt -----
addOv(F, 'sh-heartglasses', 'Kính trái tim', 'Heart glasses', 'Nhìn đời bằng màu hồng.', 'face', 5, { r: '#e8452c' }, ['....r.r..r.r....', '....rrr..rrr....', '.....r....r.....'], 70);
addOv(F, 'sh-starglasses', 'Kính ngôi sao', 'Star glasses', 'Ngôi sao của buổi học.', 'face', 5, { y: '#ffd84d' }, ['.....y....y.....', '....yyy..yyy....', '.....y....y.....'], 70);
addOv(F, 'sh-clownnose', 'Mũi chú hề', 'Clown nose', 'Bấm vào là kêu bíp.', 'face', 6, { r: '#e8452c' }, ['.......rr.......', '.......rr.......'], 50);
addOv(F, 'sh-mustache', 'Ria mép', 'Moustache', 'Cực kỳ nghiêm túc.', 'face', 8, { k: '#4a2c1a' }, ['.....kkkkkk.....'], 50);
addOv(F, 'sh-ninjamask', 'Khăn che mặt ninja', 'Ninja mask', 'Đi lặng lẽ như bóng.', 'face', 8, { d: '#2b2b3a' }, [c('dddddddd'), c('dddddddd')], 80);
addOv(F, 'sh-3dglasses', 'Kính 3D', '3D glasses', 'Xem phim nổi trong tưởng tượng.', 'face', 5, { r: '#e8452c', b: '#4a7be0', c: '#cfe8ff' }, ['....rrr..bbb....', '....rcr..bcb....', '....rrr..bbb....'], 60);
addOv(F, 'sh-monocle', 'Kính một mắt', 'Monocle', 'Quý ông thích đọc báo.', 'face', 5, { y: '#ffd84d' }, ['.........yyy....', '.........y.y....', '.........yyy....'], 70);
addOv(F, 'sh-eyepatch', 'Bịt mắt cướp biển', 'Eye patch', 'Một mắt học, một mắt ngắm cảnh.', 'face', 5, { k: '#2b2b3a' }, ['..kkkkkkkkkkkk..', '....kkk.........'], 60);
addOv(F, 'sh-blush', 'Má hồng dán', 'Blush stickers', 'Ửng hồng như vừa chạy xong.', 'face', 7, { p: '#ff7fb0' }, ['....pp....pp....'], 40);
addOv(F, 'sh-vr', 'Kính thực tế ảo', 'VR headset', 'Đi du lịch các nước mà không cần vé.', 'face', 5, { k: '#2b2b3a', K: '#6b6f86' }, ['..kkkkkkkkkkkk..', '..kKKKKKKKKKKk..', '..kkkkkkkkkkkk..'], 140);
