import { add, SC, setCC, OUTM, M_DRESS, M_TOP } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('fr');
// Pháp · Nhóm 2: Con người và đời sống
const G = 2, A = 'Trang phục và thời trang', B = 'Phụ kiện', C = 'Nhà ở', E = 'Đồ dùng';
const H = { use: 'hold' };
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#2b2b3a' };

// ----- Trang phục: mặc được lên Lame -----
OUTM.lbd = { map: M_DRESS, pal: { ...base, t: '#2b2b3a', T: '#4a3f6a', u: '#2b2b3a', b: '#2b2b3a', x: '#2b2b3a' }, patch: [[11, 6, 'w'], [11, 7, 'w'], [11, 8, 'w'], [11, 9, 'w'], [12, 5, 'w'], [12, 10, 'w']] };
OUTM.tailleur = { map: M_TOP, pal: { ...base, t: '#f4a8b8', T: '#e8758f', u: '#f4a8b8', b: '#e8758f', p: '#f4a8b8', l: '#e8758f', x: '#2b2b3a' }, patch: [[11, 7, 'y'], [11, 8, 'y'], [12, 7, 'y'], [12, 8, 'y'], [13, 7, 'T'], [13, 8, 'T'], [14, 4, 'y'], [14, 11, 'y']] };
OUTM.newlook = { map: M_DRESS, pal: { ...base, t: '#e4dccb', T: '#2b2b3a', u: '#e4dccb', b: '#2b2b3a', x: '#2b2b3a' }, patch: [[11, 7, 'T'], [11, 8, 'T'], [16, 3, 'T'], [16, 12, 'T'], [18, 2, 'T'], [18, 13, 'T']] };
OUTM.smoking = { map: M_TOP, pal: { ...base, t: '#2b2b3a', T: '#4a3f6a', u: '#2b2b3a', b: '#4a3f6a', p: '#2b2b3a', l: '#2b2b3a', x: '#2b2b3a' }, patch: [[11, 7, 'w'], [11, 8, 'w'], [12, 7, 'w'], [12, 8, 'w'], [11, 6, 'r'], [11, 9, 'r'], [13, 7, 'T'], [13, 8, 'T']] };
OUTM.mariniere = { map: M_TOP, pal: { ...base, t: '#ffffff', T: '#23306b', u: '#ffffff', b: '#23306b', p: '#c9a36a', l: '#c9a36a', x: '#2b2b3a' }, patch: [[11, 4, 'T'], [11, 5, 'T'], [11, 6, 'T'], [11, 7, 'T'], [11, 8, 'T'], [11, 9, 'T'], [11, 10, 'T'], [11, 11, 'T'], [13, 4, 'T'], [13, 5, 'T'], [13, 6, 'T'], [13, 7, 'T'], [13, 8, 'T'], [13, 9, 'T'], [13, 10, 'T'], [13, 11, 'T'], [15, 4, 'T'], [15, 5, 'T'], [15, 6, 'T'], [15, 7, 'T'], [15, 8, 'T'], [15, 9, 'T'], [15, 10, 'T'], [15, 11, 'T']] };
Object.assign(OUT_KEY, { 'fr-lbd': 'lbd', 'fr-tailleur': 'tailleur', 'fr-newlook': 'newlook', 'fr-smoking': 'smoking', 'fr-mariniere': 'mariniere' });
Object.assign(SLOT_OF, { 'fr-lbd': 'outfit', 'fr-tailleur': 'outfit', 'fr-newlook': 'outfit', 'fr-smoking': 'outfit', 'fr-mariniere': 'outfit', 'fr-beret': 'head', 'fr-coiffe': 'head', 'fr-carre': 'waist', 'fr-louboutin': 'feet', 'fr-sunglasses': 'face' });
O['fr-beret'] = { y0: -2, pal: { r: '#c4153a', R: '#8a0f28', k: '#2b1d3a' }, rows: ['.......rr.......', '....rrrrrrrrr...', '..rrrrrrrrrrrr..', '.rrRrrrrrrrrrr..', '..RRRRRRRRRRR...'] };
O['fr-coiffe'] = { y0: -4, pal: { w: '#ffffff', W: '#dfe6f8' }, rows: ['.....wwwwww.....', '....wwWwwWww....', '....wwwwwwww....', '...wwWwwwwWww...', '...wwwwwwwwww...', '..wwW......Wwww.', '..ww........www.'] };
O['fr-carre'] = { y0: 15, pal: { r: '#e8452c', y: '#ffd84d', b: '#23306b', w: '#ffffff' }, rows: ['........ywr.....', '.......ywbwr....', '........rbw.....', '.......rb.wb....', '......rb...wb...'] };
O['fr-louboutin'] = { y0: 18, pal: { k: '#2b1d3a', r: '#c4153a', b: '#2b2b3a' }, rows: ['...bb......bb...', '..bbbb....bbbb..', '..rrrr....rrrr..'] };
O['fr-sunglasses'] = { y0: 5, pal: { k: '#2b1d3a', K: '#4a3f6a' }, rows: ['....kkkkkkkk....', '....kKkkkkKk....', '....kkk..kkk....'] };

add(G, A, 'fr-haute', 'Haute couture (thời trang cao cấp may đo)', 'Haute couture', 'Những bộ trang phục may thủ công theo số đo từng khách, do một số nhà mốt ở Paris thực hiện. Tên gọi này được bảo hộ theo quy định riêng, không phải nhà thiết kế nào cũng dùng được.',
  d => { d.bg('v'); d.r(6, 1, 4, 3, 'p'); d.tri(3, 4, 10, 10, 'p'); d.r(6, 4, 4, 2, 'P'); d.r(1, 14, 14, 2, 'V'); d.p('y', 8, 3, 6, 8, 10, 8, 5, 11, 11, 11, 8, 10); d.p('w', 2, 2, 13, 3, 14, 8); d.l(7, 6, 6, 14, 'P'); d.l(9, 6, 10, 14, 'P'); }, SC);
add(G, A, 'fr-lbd', 'Little black dress (váy đen nhỏ)', 'Little black dress', 'Chiếc váy đen đơn giản, gắn với nhà thiết kế Coco Chanel từ những năm 1920, biến màu đen từ màu tang thành màu thanh lịch.', null, { char: ['lbd'], use: 'wear' });
add(G, A, 'fr-tailleur', 'Tailleur Chanel', 'Chanel tailleur', 'Bộ áo khoác và chân váy bằng vải tweed (vải len dệt thô), cắt gọn, thoải mái, nhắm đến người phụ nữ cần cử động tự do.', null, { char: ['tailleur'], use: 'wear' });
add(G, A, 'fr-newlook', 'New Look của Dior', 'Dior\'s New Look', 'Kiểu váy xòe dài, eo thắt nhỏ ra mắt năm 1947, định hình thời trang Âu Mỹ nhiều năm sau chiến tranh.', null, { char: ['newlook'], use: 'wear' });
add(G, A, 'fr-smoking', 'Le Smoking của Yves Saint Laurent', 'Yves Saint Laurent\'s Le Smoking', 'Bộ vest dạ tiệc dành cho phụ nữ ra mắt năm 1966, ban đầu gây tranh cãi rồi trở thành biểu tượng.', null, { char: ['smoking'], use: 'wear' });
add(G, A, 'fr-mariniere', 'Áo sọc Breton (marinière)', 'Breton striped shirt (mariniere)', 'Áo thun sọc xanh trắng, nguồn gốc từ đồng phục thủy thủ vùng Brittany, sau này được nhiều nghệ sĩ và người nổi tiếng chuộng.', null, { char: ['mariniere'], use: 'wear' });
add(G, A, 'fr-beret', 'Mũ nồi (béret)', 'Beret', 'Chiếc mũ len tròn, phẳng, gắn với hình ảnh người Pháp, thật ra bắt nguồn từ vùng Basque ở phía nam.',
  d => { d.bg('c'); d.e(8, 9, 7, 3.6, 'r'); d.e(8, 8, 6, 3, 'r'); d.r(2, 11, 12, 2, 'R'); d.p('R', 4, 8, 8, 7, 11, 9); d.p('k', 8, 4, 8, 5); d.r(7, 4, 2, 2, 'k'); d.p('w', 3, 3, 13, 2); }, { use: 'wear' });
add(G, A, 'fr-coiffe', 'Trang phục vùng miền (coiffe, mũ nơ)', 'Regional costumes (coiffe)', 'Mũ ren cao của phụ nữ Brittany (coiffe), mũ nơ lớn ở Alsace, váy hoa của cô gái Arles ở Provence, nay chủ yếu xuất hiện trong lễ hội.',
  d => { d.bg('e'); d.r(5, 1, 6, 8, 'w'); d.r(4, 3, 8, 6, 'w'); d.p('W', 6, 2, 9, 4, 5, 6, 10, 7, 7, 8); d.r(3, 8, 10, 2, 'w'); d.e(8, 12, 3, 2.6, 's'); d.p('k', 7, 12, 9, 12); d.r(5, 14, 6, 2, 'b'); d.p('W', 5, 4, 11, 4); }, { use: 'wear' });
add(G, A, 'fr-fashionweek', 'Tuần lễ thời trang Paris', 'Paris Fashion Week', 'Sự kiện thời trang quan trọng bậc nhất thế giới, thường diễn ra hai lần mỗi năm.',
  d => { d.bg('k'); d.r(0, 12, 16, 4, 'a'); d.r(6, 11, 4, 1, 'w'); d.e(8, 5, 2, 2, 's'); d.r(6, 7, 4, 5, 'p'); d.tri(5, 11, 6, 3, 'p'); d.p('w', 1, 2, 3, 4, 13, 3, 14, 6, 12, 1); d.p('y', 2, 9, 13, 9); d.p('k', 7, 5, 9, 5); }, SC);

// ----- Phụ kiện -----
add(G, B, 'fr-carre', 'Khăn lụa vuông Hermès (carré)', 'Hermès silk scarf (carré)', 'Khăn lụa vuông in họa tiết, có thể quàng cổ, buộc tóc hoặc buộc lên túi xách.',
  d => { d.r(2, 2, 12, 12, 'r'); d.r(3, 3, 10, 10, 'e'); d.e(8, 8, 3.6, 3.6, 'b'); d.e(8, 8, 2, 2, 'y'); d.p('r', 4, 4, 11, 4, 4, 11, 11, 11, 8, 8); d.p('y', 5, 8, 11, 8, 8, 5, 8, 11); }, { use: 'wear' });
add(G, B, 'fr-birkin', 'Túi Birkin và Kelly của Hermès', 'Hermès Birkin and Kelly bags', 'Những chiếc túi da làm thủ công, nổi tiếng vì giá cao và danh sách chờ dài.',
  d => { d.r(2, 6, 12, 8, 'o'); d.r(2, 6, 12, 1, 'O'); d.r(2, 13, 12, 1, 'O'); d.l(5, 6, 6, 2, 'N'); d.l(10, 6, 9, 2, 'N'); d.l(6, 2, 9, 2, 'N'); d.r(7, 8, 2, 2, 'y'); d.p('O', 3, 10, 12, 10); d.p('y', 8, 12); }, H);
add(G, B, 'fr-perfume', 'Nước hoa (Grasse, Chanel N°5)', 'Perfume (Grasse, Chanel N°5)', 'Vùng Grasse ở miền nam là trung tâm trồng hoa và chế tác nước hoa, còn Chanel N°5 ra đời năm 1921 là một trong những lọ nước hoa nổi tiếng nhất.',
  d => { d.r(6, 1, 4, 3, 'k'); d.r(7, 4, 2, 1, 'a'); d.r(3, 5, 10, 9, 'l'); d.r(3, 5, 10, 1, 'w'); d.r(5, 8, 6, 4, 'w'); d.r(5, 8, 6, 1, 'k'); d.p('k', 7, 10, 9, 10, 6, 11, 10, 11); d.r(3, 13, 10, 1, 'c'); d.p('p', 12, 2); }, H);
add(G, B, 'fr-louboutin', 'Giày đế đỏ Louboutin', 'Louboutin red-soled shoes', 'Đôi giày cao gót có đế sơn đỏ làm dấu hiệu nhận biết, do Christian Louboutin thiết kế.',
  d => { d.bg('e'); d.l(3, 4, 4, 11, 'k'); d.r(4, 10, 8, 2, 'k'); d.r(5, 6, 7, 5, 'k'); d.p('k', 4, 4, 5, 5); d.r(4, 12, 9, 2, 'r'); d.l(5, 12, 4, 14, 'r'); d.r(11, 12, 1, 3, 'k'); d.p('K', 7, 7, 9, 8); d.p('w', 12, 4); }, { use: 'wear' });
add(G, B, 'fr-cartier', 'Trang sức Cartier và quảng trường Vendôme', 'Cartier jewellery and Place Vendôme', 'Nhà kim hoàn Cartier, cùng khu quảng trường Vendôme ở Paris tập trung nhiều tiệm trang sức danh tiếng.',
  d => { d.e(8, 9, 5.6, 5.6, 'y'); d.e(8, 9, 4.2, 4.2, '_'); d.e(8, 9, 5.6, 5.6, 'y'); d.e(8, 9, 4, 4, '_'); d.tri(6, 1, 4, 4, 'c'); d.r(6, 3, 4, 2, 'l'); d.p('w', 7, 2, 8, 3); d.p('Y', 4, 12, 12, 12, 3, 8); d.p('r', 8, 14); }, H);
add(G, B, 'fr-scarf', 'Mũ nồi và khăn quàng cổ', 'Beret and neck scarf', 'Hai món phụ kiện đơn giản nhưng nhắc đến là nghĩ ngay tới phong cách Paris.',
  d => { d.bg('e'); d.e(8, 5, 6, 2.6, 'r'); d.r(2, 6, 12, 1, 'R'); d.r(3, 9, 10, 3, 'b'); d.r(3, 9, 10, 1, 'B'); d.r(10, 11, 3, 4, 'b'); d.p('w', 5, 10, 7, 11, 9, 10, 11, 13); d.p('k', 8, 2); d.r(7, 2, 2, 1, 'k'); }, H);
add(G, B, 'fr-sunglasses', 'Ô gập và kính râm', 'Folding umbrella and sunglasses', 'Những món nhỏ trong túi xách người Paris, vì thời tiết đổi thay nhanh.',
  d => { d.e(5, 7, 3.4, 2.6, 'k'); d.e(11, 7, 3.4, 2.6, 'k'); d.r(8, 6, 1, 2, 'k'); d.l(1, 6, 0, 8, 'k'); d.l(15, 6, 16, 8, 'k'); d.p('K', 4, 6, 10, 6); d.fan(8, 14, 5, 'b'); d.l(8, 14, 8, 9, 'N'); d.p('N', 8, 15); }, { use: 'wear' });

// ----- Nhà ở -----
add(G, C, 'fr-haussmann', 'Căn hộ kiểu Haussmann (Paris)', 'Haussmann apartment building (Paris)', 'Những dãy nhà đá trắng cao sáu bảy tầng, ban công sắt uốn, xây trong cuộc cải tạo thành phố giữa thế kỷ 19 dưới thời Napoléon III do Baron Haussmann chỉ đạo.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(1, 2, 14, 12, 'e'); d.tri(0, 0, 16, 2, 'A'); for (let y = 4; y < 13; y += 3) for (let x = 3; x < 14; x += 4) { d.r(x, y, 2, 2, 'A'); d.r(x - 1, y + 2, 4, 1, 'k'); } d.r(1, 2, 14, 1, 'W'); d.r(7, 11, 2, 3, 'N'); }, SC);
add(G, C, 'fr-colombage', 'Nhà khung gỗ Alsace (colombage)', 'Alsace half-timbered house', 'Nhà tường trắng với khung gỗ lộ ra ngoài, hoa đặt ở cửa sổ, tạo nên những ngôi làng như trong truyện cổ.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(2, 6, 12, 8, 'w'); d.tri(1, 2, 14, 4, 'R'); d.r(2, 6, 12, 1, 'N'); d.r(2, 10, 12, 1, 'N'); d.l(2, 13, 8, 6, 'N'); d.l(14, 13, 8, 6, 'N'); d.r(6, 11, 4, 3, 'n'); d.p('r', 3, 8, 12, 8, 3, 12, 12, 12); d.p('p', 4, 8, 11, 8); }, SC);
add(G, C, 'fr-mas', 'Mas Provence', 'Provençal mas', 'Nhà đá với cửa chớp xanh hoặc xám, nằm giữa cánh đồng oải hương và vườn ô liu.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'v'); d.r(0, 10, 16, 1, 'V'); d.r(3, 5, 10, 6, 't'); d.tri(2, 2, 12, 3, 'O'); d.r(4, 7, 2, 3, 'b'); d.r(10, 7, 2, 3, 'b'); d.r(7, 7, 2, 4, 'n'); d.e(2, 9, 1.6, 2, 'G'); d.e(14, 9, 1.6, 2, 'G'); d.p('P', 4, 13, 12, 14); }, SC);
add(G, C, 'fr-chalet', 'Nhà gỗ chalet (Savoie, Alps)', 'Alpine chalet (Savoie)', 'Nhà gỗ mái dốc để tuyết trượt xuống, ban công gỗ chạm hoa.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'w'); d.tri(1, 2, 14, 5, 'N'); d.tri(1, 2, 14, 2, 'w'); d.r(3, 7, 10, 6, 'n'); d.r(3, 10, 10, 1, 'N'); d.r(7, 8, 2, 5, 'N'); d.r(4, 8, 2, 2, 'u'); d.r(10, 8, 2, 2, 'u'); d.p('r', 4, 10, 6, 10, 10, 10, 12, 10); d.tri(13, 8, 3, 6, 'G'); }, SC);
add(G, C, 'fr-chaumiere', 'Nhà mái tranh Normandy (chaumière)', 'Thatched cottage (chaumière)', 'Nhà tường gỗ đất trát, mái lợp tranh dày, gắn với vùng quê xanh mát.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.r(2, 7, 12, 6, 'e'); d.tri(0, 2, 16, 6, 'Y'); d.r(0, 6, 16, 2, 'y'); d.r(0, 7, 16, 1, 'Y'); d.l(2, 12, 7, 8, 'N'); d.l(14, 12, 9, 8, 'N'); d.r(7, 9, 2, 4, 'n'); d.p('r', 4, 9, 11, 9); d.p('p', 3, 12, 12, 12); d.r(11, 1, 2, 3, 'a'); }, SC);
add(G, C, 'fr-chateau', 'Lâu đài (château)', 'Château', 'Ở nhiều vùng, từ lâu đài hoàng gia ở Loire đến những château trong vườn nho Bordeaux.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(1, 5, 4, 8, 'e'); d.r(11, 5, 4, 8, 'e'); d.r(5, 8, 6, 5, 'W'); d.tri(0, 2, 6, 3, 'A'); d.tri(10, 2, 6, 3, 'A'); d.tri(5, 5, 6, 3, 'A'); d.p('k', 2, 8, 12, 8, 7, 10, 8, 10); d.r(7, 11, 2, 2, 'N'); d.p('r', 3, 1, 13, 1); }, SC);

// ----- Đồ dùng -----
add(G, E, 'fr-lecreuset', 'Nồi gang Le Creuset', 'Le Creuset cast-iron pot', 'Nồi gang tráng men nhiều màu, dùng hầm, om, nấu chậm, được nhiều gia đình truyền từ đời này sang đời khác.',
  d => { d.e(8, 10, 6.4, 4, 'o'); d.r(2, 7, 12, 3, 'o'); d.r(2, 6, 12, 2, 'O'); d.r(1, 8, 2, 2, 'O'); d.r(13, 8, 2, 2, 'O'); d.e(8, 5, 1.2, 1.2, 'k'); d.p('y', 5, 8, 10, 11, 4, 11); d.r(3, 14, 10, 1, 'k'); d.p('w', 6, 3, 9, 2, 11, 3); }, H);
add(G, E, 'fr-laguiole', 'Dao Laguiole', 'Laguiole knife', 'Dao gấp có hình con ong nhỏ trên cán, gắn với vùng Aubrac ở miền trung nam.',
  d => { d.l(2, 13, 13, 2, 'a'); d.l(3, 13, 14, 3, 'l'); d.l(2, 12, 13, 1, 'w'); d.r(1, 12, 3, 3, 'N'); d.p('y', 2, 13, 3, 14); d.p('k', 12, 3); d.l(5, 14, 11, 8, 'N'); d.p('y', 8, 11, 7, 12, 9, 10); }, H);
add(G, E, 'fr-limoges', 'Gốm sứ Limoges', 'Limoges porcelain', 'Đồ sứ trắng mỏng, nổi tiếng từ thế kỷ 18 sau khi tìm thấy mỏ đất sét cao lanh ở vùng này.',
  d => { d.e(8, 10, 6.4, 3.4, 'w'); d.e(8, 9.4, 4.6, 2, 'l'); d.e(8, 9.4, 4.6, 2, 'e'); d.r(5, 13, 6, 1, 'a'); d.p('y', 3, 10, 12, 10); d.p('c', 6, 9, 10, 9, 8, 8); d.e(8, 3, 3.4, 1.6, 'w'); d.r(4, 3, 8, 1, 'l'); }, H);
add(G, E, 'fr-baccarat', 'Pha lê Baccarat', 'Baccarat crystal', 'Đồ pha lê cao cấp, ly, đèn chùm và bình hoa được ưa chuộng ở các cung đình châu Âu.',
  d => { d.tri(3, 1, 10, 7, 'c'); d.tri(4, 2, 8, 5, 'l'); d.r(7, 8, 2, 5, 'c'); d.r(4, 13, 8, 1, 'c'); d.p('w', 6, 3, 9, 4, 7, 6, 10, 6, 8, 2); d.p('l', 5, 5, 11, 5); d.p('y', 8, 14); }, H);
add(G, E, 'fr-pepper', 'Cối xay tiêu (Peugeot)', 'Pepper mill (Peugeot)', 'Nhà sản xuất Peugeot bắt đầu làm cối xay tiêu từ thế kỷ 19, trước khi nổi tiếng với xe hơi.',
  d => { d.r(6, 1, 4, 2, 'N'); d.e(8, 2, 1.2, 1, 'y'); d.r(5, 4, 6, 7, 'n'); d.r(5, 4, 6, 1, 'N'); d.r(4, 11, 8, 3, 'N'); d.p('N', 7, 6, 8, 8, 7, 9); d.p('t', 6, 5, 9, 12); d.p('k', 6, 15, 9, 15); }, H);
add(G, E, 'fr-toile', 'Vải toile de Jouy', 'Toile de Jouy fabric', 'Vải bông in hình cảnh đồng quê và nhân vật bằng một màu, thường dùng làm rèm, ga giường và ghế bọc.',
  d => { d.r(1, 1, 14, 14, 'e'); d.e(5, 5, 2.4, 2.4, 'R'); d.e(5, 5, 1.4, 1.4, 'e'); d.tri(8, 6, 6, 6, 'R'); d.tri(9, 7, 4, 4, 'e'); d.p('R', 3, 11, 5, 11, 4, 12, 11, 3, 12, 2); d.l(2, 13, 14, 13, 'R'); d.p('R', 3, 9, 4, 8); }, SC);
add(G, E, 'fr-basket', 'Giỏ mây và túi lưới đi chợ', 'Wicker basket and market bag', 'Người Pháp hay đi chợ buổi sáng với giỏ đan, mua bánh mì, phô mai, rau củ trong tuần.',
  d => { d.l(4, 7, 8, 2, 'N'); d.l(12, 7, 8, 2, 'N'); d.r(2, 7, 12, 7, 'n'); d.r(2, 7, 12, 1, 'N'); for (let x = 2; x < 14; x += 2) d.l(x, 8, x, 13, 'N'); for (let y = 9; y < 14; y += 2) d.l(2, y, 13, y, 'N'); d.p('g', 5, 5, 8, 5); d.r(9, 4, 3, 4, 'o'); d.p('w', 4, 6, 7, 6); }, H);
