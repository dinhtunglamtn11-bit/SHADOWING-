import { add, SC, setCC, OUTM, M_DRESS, M_TOP } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('nl');
// Hà Lan · Nhóm 2: Con người và đời sống
const G = 2, A = 'Trang phục', B = 'Phụ kiện', C = 'Nhà ở', E = 'Đồ dùng';
const H = { use: 'hold' };
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#2b2b3a' };
const col = (c, r0, r1, ch) => { const a = []; for (let r = r0; r <= r1; r++) a.push([r, c, ch]); return a; };

// ----- Trang phục: mặc được lên Lame -----
OUTM.nl_volendam = { map: M_DRESS, pal: { ...base, t: '#2b3a8f', T: '#1c2563', u: '#2b3a8f', b: '#2b3a8f', x: '#2b2b3a' }, patch: [[11, 6, 'r'], [11, 7, 'w'], [11, 8, 'w'], [11, 9, 'r'], [12, 5, 'w'], [12, 10, 'w'], [13, 7, 'w'], [13, 8, 'w'], [16, 4, 'r'], [16, 6, 'w'], [16, 8, 'r'], [16, 10, 'w'], [17, 5, 'w'], [17, 7, 'r'], [17, 9, 'w'], [17, 11, 'r'], [18, 4, 'w'], [18, 6, 'r'], [18, 8, 'w'], [18, 10, 'r']] };
OUTM.nl_raincoat = { map: M_TOP, pal: { ...base, t: '#ffd84d', T: '#c9a227', u: '#ffd84d', b: '#2b3a8f', p: '#2b3a8f', l: '#ffd84d', x: '#ffd84d' }, patch: [...col(8, 12, 16, 'T'), [11, 5, 'T'], [11, 10, 'T'], [13, 4, 'k'], [13, 11, 'k'], [15, 6, 'T'], [15, 9, 'T']] };
OUTM.nl_oranje = { map: M_TOP, pal: { ...base, t: '#ff7a1a', T: '#c8560a', u: '#ff7a1a', b: '#1b2f6b', p: '#1b2f6b', l: '#ff7a1a', x: '#ffffff' }, patch: [[11, 6, 'w'], [11, 7, 'w'], [11, 8, 'w'], [11, 9, 'w'], [14, 7, 'w'], [14, 8, 'w'], [15, 6, 'w'], [15, 9, 'w']] };
OUTM.nl_office = { map: M_TOP, pal: { ...base, t: '#2f4a7a', T: '#1f3256', u: '#2f4a7a', b: '#3a3a4a', p: '#3a3a4a', l: '#2f4a7a', x: '#ffffff' }, patch: [[11, 7, 'w'], [11, 8, 'w'], [12, 7, 'w'], [12, 8, 'w'], [13, 7, 'w'], [13, 8, 'w'], [14, 7, 'w'], [14, 8, 'w'], [12, 6, 'T'], [12, 9, 'T']] };
Object.assign(OUT_KEY, { 'nl-volendam': 'nl_volendam', 'nl-raincoat': 'nl_raincoat', 'nl-oranje': 'nl_oranje', 'nl-office': 'nl_office' });
Object.assign(SLOT_OF, { 'nl-volendam': 'outfit', 'nl-raincoat': 'outfit', 'nl-oranje': 'outfit', 'nl-office': 'outfit', 'nl-sneakers': 'feet', 'nl-klompen': 'feet', 'nl-lacecap': 'head', 'nl-oranjescarf': 'face', 'nl-headscarf': 'head' });
O['nl-sneakers'] = { y0: 18, pal: { w: '#ffffff', g: '#9aa4c4', r: '#e8452c' }, rows: ['..wwwww..wwwww..', '.wwwwwww.wwwwwww', '.rrrrrrr.rrrrrrr'].map(r => r.slice(0, 16)) };
O['nl-klompen'] = { y0: 18, pal: { y: '#e0b050', Y: '#a8783a', n: '#6a4a2a' }, rows: ['..yyyy....yyyy..', '.yyyyyy..yyyyyy.', '.YYYYYY..YYYYYY.'] };
O['nl-lacecap'] = { y0: -1, pal: { w: '#ffffff', W: '#dfe6f8' }, rows: ['..w..........w..', '.www.wwwwww.www.', '..wwwwwwwwwwww..', '..wwWWWWWWWWww..'] };
O['nl-oranjescarf'] = { y0: 9, pal: { o: '#ff7a1a', O: '#c8560a' }, rows: ['..oooooooooooo..', '...oOoooooOoo...', '....oo....oo....'].map(r => r.slice(0, 16)) };
O['nl-headscarf'] = { y0: 0, pal: { b: '#2b3a8f', B: '#1c2563', y: '#ffd84d' }, rows: ['...bbbbbbbbbb...', '..bbyBbbbByybb..', '..bbbbbbbbbbbb..', '..bb........bb..'] };

add(G, A, 'nl-volendam', 'Trang phục truyền thống Volendam và Marken', 'Traditional dress of Volendam and Marken', 'Mũ ren trắng, áo bó và váy sọc của người dân vùng chài. Ngày nay người ta mặc trong lễ hội và để chụp ảnh cho du khách.', null, { char: ['nl_volendam'], use: 'wear' });
add(G, A, 'nl-raincoat', 'Áo mưa và áo khoác chống gió', 'Raincoats and windproof jackets', 'Vì thời tiết thay đổi, nhiều người luôn mang áo mưa gấp gọn khi đạp xe. Áo màu xanh hải quân và đen phổ biến quanh năm.', null, { char: ['nl_raincoat'], use: 'wear' });
add(G, A, 'nl-oranje', 'Áo cam của đội tuyển', 'The orange national shirt', 'Màu cam là màu của Hoàng gia Oranje, được mặc để cổ vũ đội tuyển bóng đá và trong ngày của Vua. Những đám đông áo cam tạo nên cảnh tượng rực rỡ trên phố.', null, { char: ['nl_oranje'], use: 'wear' });
add(G, A, 'nl-office', 'Trang phục công sở giản dị', 'Relaxed office wear', 'Nhiều công ty cho phép mặc đồ thoải mái, ít cà vạt. Phong cách đề cao sự đơn giản, thực dụng và không phô trương.', null, { char: ['nl_office'], use: 'wear' });
add(G, A, 'nl-sneakers', 'Giày thể thao và đồ đi làm', 'Sneakers and everyday shoes', 'Giày sneaker được nhiều người mang quanh năm. Người Hà Lan đề cao sự thoải mái khi đi lại.',
  d => { d.bg('c'); d.e(5, 9, 4, 3, 'w'); d.e(11, 9, 4, 3, 'w'); d.r(1, 11, 8, 2, 'w'); d.r(7, 11, 8, 2, 'w'); d.r(1, 12, 8, 1, 'r'); d.r(7, 12, 8, 1, 'r'); d.p('a', 4, 7, 10, 7, 3, 9, 9, 9); d.p('r', 6, 8, 12, 8); d.p('k', 5, 10, 11, 10); }, { use: 'wear' });

// ----- Phụ kiện -----
add(G, B, 'nl-klompen', 'Giày gỗ klompen', 'Klompen wooden clogs', 'Đôi giày khắc từ gỗ liễu hoặc gỗ dương, thời xưa dành cho nông dân và thợ đánh cá để làm việc trên đất ướt. Ngày nay chủ yếu dùng làm quà lưu niệm hoặc trong nông nghiệp.',
  d => { d.bg('c'); d.e(5, 9, 3.6, 5.4, 'y'); d.e(11, 9, 3.6, 5.4, 'y'); d.e(5, 8, 2.4, 3.4, 'Y'); d.e(11, 8, 2.4, 3.4, 'Y'); d.p('o', 5, 13, 11, 13); d.p('r', 5, 6, 11, 6); d.p('b', 5, 10, 11, 10); d.p('w', 4, 12, 10, 12); }, { use: 'wear' });
add(G, B, 'nl-lacecap', 'Mũ ren Volendam', 'The Volendam lace cap', 'Chiếc mũ trắng có cánh như cánh máy bay của phụ nữ vùng Volendam. Mỗi vùng có kiểu mũ riêng để nhận ra nơi chốn.',
  d => { d.bg('c'); d.e(8, 9, 4, 4, 'w'); d.tri(1, 3, 5, 5, 'w'); d.tri(10, 3, 5, 5, 'w'); d.r(5, 9, 6, 3, 'W'); d.p('l', 6, 7, 9, 7, 8, 5); d.p('b', 7, 12, 8, 13); d.p('W', 2, 6, 13, 6, 4, 5, 11, 5); }, { use: 'wear' });
add(G, B, 'nl-oranjescarf', 'Khăn quàng cổ cam', 'The orange scarf', 'Người hâm mộ bóng đá đeo khăn và mũ màu cam vào ngày thi đấu. Màu này cũng xuất hiện rộng rãi trong ngày của Vua.',
  d => { d.bg('c'); d.r(2, 6, 12, 4, 'o'); d.r(2, 6, 12, 1, 'y'); d.r(3, 10, 3, 5, 'o'); d.r(10, 10, 3, 5, 'o'); d.p('w', 4, 7, 7, 8, 10, 7, 12, 8); d.p('O', 4, 12, 11, 12, 4, 14, 11, 14); }, { use: 'wear' });
add(G, B, 'nl-silverhead', 'Đồ trang sức bạc trên mũ truyền thống', 'Silver and gold headwear ornaments', 'Trang sức của phụ nữ vùng Zeeland gồm nữ trang đầu bằng vàng và bạc. Những bộ này thể hiện địa vị và quê hương của người đeo.',
  d => { d.bg('e'); d.e(8, 6, 5, 3.4, 'y'); d.l(2, 6, 4, 11, 'a'); d.l(14, 6, 12, 11, 'a'); d.e(4, 12, 1.8, 1.8, 'y'); d.e(12, 12, 1.8, 1.8, 'y'); d.p('Y', 6, 5, 10, 5, 8, 8); d.p('w', 5, 4, 11, 4, 3, 7); d.p('A', 4, 12, 12, 12); }, H);
add(G, B, 'nl-headscarf', 'Khăn trùm đầu của phụ nữ Hindu và Hồi giáo', 'Headscarves of Hindu and Muslim women', 'Cộng đồng nhập cư mang đến nhiều kiểu phụ kiện đa văn hóa. Đây là một phần của đời sống đô thị.',
  d => { d.bg('c'); d.e(8, 8, 6, 5, 'b'); d.r(2, 9, 12, 5, 'b'); d.tri(3, 11, 10, 4, 'b'); d.p('y', 5, 5, 8, 4, 11, 6, 7, 9); d.p('B', 4, 9, 12, 9, 8, 12); d.p('l', 7, 6, 9, 6); d.p('c', 3, 14, 13, 14); }, { use: 'wear' });

// ----- Nhà ở -----
add(G, C, 'nl-canalhouse', 'Nhà kênh (grachtenpand)', 'Canal house (grachtenpand)', 'Những ngôi nhà cao, hẹp, viền cầu thang dốc bên bờ kênh ở Amsterdam. Nhiều nhà nghiêng nhẹ vì nền đất yếu.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'C'); d.r(0, 12, 16, 1, 'a'); d.r(1, 5, 4, 7, 'r'); d.r(6, 3, 4, 9, 'n'); d.r(11, 6, 4, 6, 'R'); d.tri(1, 3, 4, 2, 'w'); d.tri(6, 1, 4, 2, 'w'); d.tri(11, 4, 4, 2, 'w'); for (const [x, y] of [[2, 6], [2, 9], [7, 5], [7, 8], [12, 7], [12, 10]]) d.r(x, y, 2, 2, 'y'); d.p('w', 3, 14, 9, 15, 13, 14); }, SC);
add(G, C, 'nl-hijsbalk', 'Móc cẩu (hijsbalk)', 'Hoisting beam (hijsbalk)', 'Dầm gỗ nhô ra ở đỉnh mái nhà để treo ròng rọc vận chuyển đồ đạc lên tầng cao. Vì cầu thang quá hẹp, đây là giải pháp rất thực tế.',
  d => { d.bg('c'); d.r(3, 6, 8, 10, 'r'); d.tri(2, 3, 10, 3, 'R'); d.r(6, 2, 8, 1, 'N'); d.r(10, 2, 1, 2, 'N'); d.l(13, 2, 13, 8, 'a'); d.r(12, 8, 3, 3, 'n'); d.p('k', 13, 9); for (const [x, y] of [[4, 7], [8, 7], [4, 10], [8, 10]]) d.r(x, y, 2, 2, 'y'); d.r(6, 13, 2, 3, 'N'); }, SC);
add(G, C, 'nl-houseboat', 'Nhà thuyền (woonboot)', 'Houseboat (woonboot)', 'Nhà nổi trên kênh ở Amsterdam, có điện, nước và địa chỉ riêng. Khoảng hai nghìn nhà thuyền nằm trên các kênh của thành phố.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(2, 8, 12, 4, 'W'); d.r(1, 11, 14, 2, 'N'); d.r(3, 5, 10, 3, 'a'); d.r(4, 9, 2, 2, 'y'); d.r(10, 9, 2, 2, 'y'); d.r(7, 9, 2, 3, 'N'); d.p('g', 4, 4, 11, 4, 12, 3); d.p('w', 1, 14, 8, 15, 13, 14); d.p('r', 8, 6); }, SC);
add(G, C, 'nl-rowhouse', 'Nhà gạch liền kề', 'Brick row houses', 'Dãy nhà gạch đỏ liền nhau với cửa sổ lớn, thường không kéo rèm. Người dân thích để ánh sáng và cho phép người ngoài nhìn vào phòng khách.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(0, 5, 16, 9, 'r'); d.r(0, 4, 16, 1, 'R'); for (const x of [0, 5, 10]) { d.r(x, 4, 5, 1, 'W'); d.r(x + 1, 6, 3, 4, 'y'); d.r(x + 1, 6, 3, 1, 'w'); d.r(x + 1, 11, 3, 3, 'N'); } d.p('k', 5, 5, 10, 5); }, SC);
add(G, C, 'nl-cubehouses', 'Nhà hình khối Kubuswoningen ở Rotterdam', 'The Cube Houses of Rotterdam', 'Những ngôi nhà hình khối lập phương nghiêng trên cột, do Piet Blom thiết kế. Đây là công trình nổi bật, những căn hộ bên trong có tường nghiêng.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(3, 10, 1, 5, 'W'); d.r(12, 10, 1, 5, 'W'); d.tri(1, 4, 6, 6, 'y'); d.r(2, 8, 4, 2, 'Y'); d.tri(9, 4, 6, 6, 'y'); d.r(10, 8, 4, 2, 'Y'); d.tri(5, 1, 6, 5, 'o'); d.r(6, 4, 4, 2, 'O'); d.p('c', 3, 8, 11, 8, 7, 4); d.p('k', 8, 2); }, SC);
add(G, C, 'nl-boerderij', 'Nhà trại truyền thống (boerderij)', 'The traditional farmhouse (boerderij)', 'Nhà nông trại lớn có chuồng bò nối liền nhà ở. Kiểu nhà này thấy nhiều ở vùng nông thôn bắc và tây.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.r(2, 7, 12, 5, 'r'); d.tri(1, 2, 14, 5, 'R'); d.r(6, 9, 4, 3, 'W'); d.r(7, 10, 2, 2, 'N'); d.r(3, 8, 2, 2, 'y'); d.r(11, 8, 2, 2, 'y'); d.r(0, 13, 4, 1, 'N'); d.p('w', 13, 14, 8, 15); d.p('k', 2, 14, 3, 14); }, SC);

// ----- Đồ dùng -----
add(G, E, 'nl-bike', 'Xe đạp', 'The bicycle', 'Phương tiện phổ biến nhất, Hà Lan có số xe đạp nhiều hơn số dân. Nhiều xe có ghế cho trẻ em và giỏ để đồ đi chợ.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.e(4, 11, 3, 3, 'k'); d.e(4, 11, 2, 2, 'c'); d.e(12, 11, 3, 3, 'k'); d.e(12, 11, 2, 2, 'c'); d.l(4, 11, 7, 6, 'r'); d.l(7, 6, 12, 11, 'r'); d.l(4, 11, 9, 11, 'r'); d.l(7, 6, 11, 6, 'r'); d.r(11, 4, 3, 1, 'k'); d.r(12, 5, 1, 2, 'k'); d.r(5, 5, 3, 1, 'k'); d.r(1, 6, 3, 2, 'o'); }, SC);
add(G, E, 'nl-bakfiets', 'Xe bakfiets (xe đạp chở hàng)', 'The bakfiets (cargo bike)', 'Xe đạp có thùng rộng ở phía trước để chở trẻ em và đồ đạc. Nhiều gia đình dùng xe này thay cho ô tô.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(1, 7, 6, 4, 'n'); d.r(1, 7, 6, 1, 'N'); d.e(3, 5, 1.2, 1.2, 's'); d.e(5, 5, 1.2, 1.2, 's'); d.r(2, 6, 1, 1, 'r'); d.r(5, 6, 1, 1, 'b'); d.e(3, 13, 2, 2, 'k'); d.e(13, 12, 2.4, 2.4, 'k'); d.e(13, 12, 1.6, 1.6, 'c'); d.l(3, 13, 8, 11, 'r'); d.l(8, 11, 13, 12, 'r'); d.l(8, 8, 8, 11, 'r'); d.r(7, 7, 4, 1, 'k'); }, SC);
add(G, E, 'nl-ovchip', 'Thẻ OV-chipkaart (thẻ giao thông công cộng)', 'The OV-chipkaart (public transport card)', 'Thẻ giao thông công cộng dùng cho tàu, xe buýt, xe điện và tàu điện ngầm. Nhiều người chỉ cần quẹt thẻ để đi xuyên thành phố.',
  d => { d.bg('e'); d.r(1, 4, 14, 9, 'b'); d.r(1, 4, 14, 3, 'B'); d.r(2, 9, 6, 1, 'w'); d.r(2, 11, 4, 1, 'c'); d.e(12, 10, 2, 2, 'y'); d.p('w', 3, 5, 5, 5, 7, 5); d.p('o', 11, 10, 13, 10); d.p('Y', 12, 9, 12, 11); }, H);
add(G, E, 'nl-calendar', 'Lịch gia đình treo trong nhà vệ sinh', 'The family calendar in the bathroom', 'Một thói quen đùa nhưng có thật, nhiều gia đình treo lịch sinh nhật của họ hàng ở đó. Người Hà Lan rất coi trọng việc nhớ sinh nhật.',
  d => { d.bg('e'); d.r(2, 2, 12, 12, 'w'); d.r(2, 2, 12, 3, 'r'); d.p('k', 4, 1, 11, 1); for (let y = 6; y < 13; y += 2) for (let x = 3; x < 13; x += 2) d.put(x, y, 'a'); d.p('o', 5, 8, 9, 10, 11, 12); d.p('y', 7, 6); }, H);
add(G, E, 'nl-kettle', 'Bình nước ấm (waterkoker) và túi trà', 'Electric kettle (waterkoker) and tea bag', 'Nhiều gia đình đun nước pha trà và cà phê nhiều lần trong ngày. Đây là thói quen đi kèm món bánh quy.',
  d => { d.bg('e'); d.r(2, 5, 7, 9, 'A'); d.r(3, 3, 5, 2, 'a'); d.r(2, 5, 7, 1, 'l'); d.r(9, 6, 3, 5, 'a'); d.r(10, 7, 2, 3, 'e'); d.p('w', 4, 1, 6, 0); d.r(4, 9, 3, 2, 'c'); d.r(12, 10, 3, 4, 'y'); d.l(13, 10, 13, 8, 'w'); d.p('g', 13, 12); }, H);
add(G, E, 'nl-umbrella', 'Ô có dây chống gió', 'Windproof umbrella', 'Ô lớn dành cho những ngày mưa gió. Một số người dùng ô gấp để cất trong túi xách.',
  d => { d.bg('c'); d.fan(8, 8, 7, 'b'); d.fan(8, 8, 5, 'B'); d.fan(8, 8, 3, 'b'); d.r(7, 8, 2, 1, 'k'); d.l(8, 8, 8, 14, 'N'); d.l(8, 14, 6, 14, 'N'); d.l(6, 14, 6, 13, 'N'); d.p('c', 2, 9, 5, 11, 12, 10, 14, 12); d.p('w', 3, 2, 13, 3); }, SC);
