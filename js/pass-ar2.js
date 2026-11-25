import { add, SC, setCC, OUTM, M_DRESS, M_TOP } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('ar');
// Argentina · Nhóm 2: Con người và đời sống
const G = 2, A = 'Trang phục', B = 'Phụ kiện', C = 'Nhà ở', E = 'Đồ dùng';
const H = { use: 'hold' };
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#2b2b3a' };
const col = (c, r0, r1, ch) => { const a = []; for (let r = r0; r <= r1; r++) a.push([r, c, ch]); return a; };

// ----- Trang phục: mặc được lên Lame -----
OUTM.ar_gaucho = { map: M_TOP, pal: { ...base, t: '#e8dcc0', T: '#c9b88a', u: '#e8dcc0', b: '#7a6a4a', p: '#6b5a3a', l: '#4a3a22', x: '#2b1d3a' }, patch: [[11, 5, 'r'], [11, 10, 'r'], [11, 6, 'R'], [11, 9, 'R'], [14, 4, 'T'], [14, 11, 'T'], [15, 7, 'Y'], [15, 8, 'Y']] };
OUTM.ar_poncho = { map: M_TOP, pal: { ...base, t: '#c4153a', T: '#8a0f28', u: '#c4153a', b: '#2b2b3a', p: '#2b2b3a', l: '#2b2b3a', x: '#2b2b3a' }, patch: [...col(4, 11, 15, 'k'), ...col(7, 11, 15, 'k'), ...col(10, 11, 15, 'k'), [11, 5, 'w'], [11, 6, 'w'], [11, 8, 'w'], [11, 9, 'w'], [16, 4, 'k'], [16, 7, 'k'], [16, 10, 'k']] };
OUTM.ar_albiceleste = { map: M_TOP, pal: { ...base, t: '#ffffff', T: '#dfe6f8', u: '#ffffff', b: '#1b2f6b', p: '#1b2f6b', l: '#ffffff', x: '#ffffff' }, patch: [...col(4, 11, 16, 'c'), ...col(6, 11, 16, 'c'), ...col(8, 11, 16, 'c'), ...col(10, 11, 16, 'c'), ...col(12, 11, 16, 'c'), [12, 10, 'y'], [13, 10, 'y']] };
OUTM.ar_porteno = { map: M_TOP, pal: { ...base, t: '#3a2c2c', T: '#241a1a', u: '#3a2c2c', b: '#2b2b3a', p: '#2b2b3a', l: '#2b2b3a', x: '#2b2b3a' }, patch: [...col(8, 11, 16, 'a'), [11, 5, 'r'], [11, 6, 'r'], [11, 9, 'r'], [11, 10, 'r'], [12, 5, 'r'], [12, 10, 'r']] };
OUTM.ar_tango = { map: M_DRESS, pal: { ...base, t: '#c4153a', T: '#8a0f28', u: '#c4153a', b: '#c4153a', x: '#2b2b3a' }, patch: [[11, 6, 'k'], [11, 7, 'k'], [11, 8, 'k'], [11, 9, 'k'], [12, 7, 'k'], [12, 8, 'k'], [13, 7, 'k'], [13, 8, 'k'], [17, 7, 'k'], [18, 7, 'k'], [18, 8, 'k'], [16, 11, 'k'], [17, 12, 'k']] };
OUTM.ar_andino = { map: M_TOP, pal: { ...base, t: '#b8232b', T: '#7a1a2a', u: '#b8232b', b: '#2f9a4a', p: '#2b3a8f', l: '#b8232b', x: '#eab08f' }, patch: [[11, 4, 'y'], [11, 6, 'g'], [11, 8, 'b'], [11, 10, 'y'], [12, 5, 'w'], [12, 7, 'y'], [12, 9, 'g'], [12, 11, 'w'], [13, 4, 'g'], [13, 6, 'b'], [13, 8, 'y'], [13, 10, 'g'], [14, 5, 'y'], [14, 7, 'w'], [14, 9, 'b'], [14, 11, 'y'], [15, 4, 'w'], [15, 8, 'y']] };
Object.assign(OUT_KEY, { 'ar-gaucho': 'ar_gaucho', 'ar-poncho': 'ar_poncho', 'ar-albiceleste': 'ar_albiceleste', 'ar-porteno': 'ar_porteno', 'ar-tango': 'ar_tango', 'ar-andino': 'ar_andino' });
Object.assign(SLOT_OF, { 'ar-gaucho': 'outfit', 'ar-poncho': 'outfit', 'ar-albiceleste': 'outfit', 'ar-porteno': 'outfit', 'ar-tango': 'outfit', 'ar-andino': 'outfit', 'ar-belt': 'waist', 'ar-alpargatas': 'feet', 'ar-panuelo': 'head' });
O['ar-belt'] = { y0: 15, pal: { N: '#5a3a1a', y: '#ffd84d', o: '#2b1d3a', Y: '#c9a227' }, rows: ['..oNNNNyyNNNNNo.', '..oNYNYNYNYNYNo.'.slice(0, 16)] };
O['ar-alpargatas'] = { y0: 18, pal: { b: '#1f3a8a', B: '#12245a', t: '#d9b87a', w: '#ffffff' }, rows: ['...bbbb..bbbb...', '..bbwbbb.bbwbbb.', '..tttttt.tttttt.'] };
O['ar-panuelo'] = { y0: 0, pal: { w: '#ffffff', W: '#dfe6f8' }, rows: ['...wwwwwwwwww...', '..wwWWWWWWWWww..', '..wwwwwwwwwwwww.', '..ww........wWW.'] };

add(G, A, 'ar-gaucho', 'Trang phục gaucho', 'Gaucho outfit', 'Quần rộng bombacha, khăn cổ, mũ rộng vành và áo poncho của cao bồi vùng Pampa. Ngày nay người ta mặc bộ này trong lễ hội và các cuộc thi tài cưỡi ngựa.', null, { char: ['ar_gaucho'], use: 'wear' });
add(G, A, 'ar-poncho', 'Áo poncho', 'Poncho', 'Tấm vải len dày có lỗ chồng đầu, giữ ấm trong gió lạnh. Poncho của Salta thường có màu đỏ và đen nổi bật.', null, { char: ['ar_poncho'], use: 'wear' });
add(G, A, 'ar-albiceleste', 'Áo bóng đá trắng xanh dương', 'The sky-blue and white football shirt', 'Sọc dọc trắng và xanh trời của đội tuyển quốc gia (Albiceleste), mang ba ngôi sao danh hiệu World Cup. Nhiều người mặc áo này mỗi khi đội thi đấu.', null, { char: ['ar_albiceleste'], use: 'wear' });
add(G, A, 'ar-porteno', 'Thời trang Buenos Aires', 'Buenos Aires fashion', 'Phối đồ tinh tế, ảnh hưởng từ Ý và Tây Ban Nha, với túi da và giày da nổi tiếng. Khu Palermo có nhiều cửa hàng nhà thiết kế trẻ.', null, { char: ['ar_porteno'], use: 'wear' });
add(G, A, 'ar-tango', 'Trang phục vũ tango', 'Tango dance attire', 'Váy xẻ tà và giày gót cao cho nữ, áo gi-lê và mũ fedora cho nam. Những bộ đồ này thể hiện phong cách của các vũ trường milonga.', null, { char: ['ar_tango'], use: 'wear' });
add(G, A, 'ar-andino', 'Trang phục bản địa miền tây bắc', 'Indigenous attire of the northwest', 'Áo và khăn dệt màu rực của cộng đồng Quechua và Aymara quanh Jujuy. Mỗi họa tiết thể hiện dòng họ và quê hương.', null, { char: ['ar_andino'], use: 'wear' });

// ----- Phụ kiện -----
add(G, B, 'ar-matekit', 'Thiết bị mate (bình mate và bombilla)', 'Mate gear (gourd and bombilla)', 'Bình nhỏ làm từ quả bí, đồng hoặc gỗ cùng ống hút kim loại có lọc. Nhiều người mang theo bình nước nóng và mate bỏ trong túi xách đi làm.',
  d => { d.bg('e'); d.e(7, 10, 5, 5, 'n'); d.r(2, 5, 10, 2, '_'); d.e(7, 7, 4, 1.2, 'g'); d.l(9, 7, 13, 1, 'a'); d.p('A', 13, 0, 12, 1); d.p('N', 4, 12, 10, 13, 7, 14); d.p('y', 12, 11, 12, 12); d.r(3, 6, 8, 1, 'N'); }, H);
add(G, B, 'ar-belt', 'Thắt lưng và dây nịt da của gaucho', 'Gaucho leather belt', 'Thắt lưng rộng bằng da, gắn những đồng xu bạc trên phần khóa đồng. Đây là phụ kiện vừa thực dụng vừa là một món trang trí.',
  d => { d.bg('e'); d.r(0, 5, 16, 6, 'n'); d.r(0, 5, 16, 1, 'N'); d.r(0, 10, 16, 1, 'N'); d.r(5, 4, 6, 8, 'y'); d.r(6, 5, 4, 6, 'Y'); d.r(7, 7, 2, 2, 'y'); d.p('a', 2, 7, 3, 8, 13, 7, 12, 8); d.p('N', 1, 6, 14, 9); }, { use: 'wear' });
add(G, B, 'ar-facon', 'Facón và dao gaucho', 'Facón, the gaucho knife', 'Dao dài có chuôi bạc dùng cắt thịt và dây thừng. Người gaucho thường cài ngang lưng như vật gia bảo.',
  d => { d.bg('e'); d.l(2, 13, 12, 3, 'a'); d.l(3, 13, 13, 3, 'l'); d.l(1, 14, 3, 12, 'n'); d.r(2, 12, 3, 1, 'N'); d.p('Y', 1, 14, 2, 13, 4, 12); d.l(2, 11, 5, 14, 'y'); d.p('w', 6, 9, 9, 6); }, H);
add(G, B, 'ar-alpargatas', 'Giày alpargatas', 'Alpargatas canvas shoes', 'Giày vải đế dây thừng, được nhiều người mang trong mùa hè. Chiếc giày này có nguồn gốc từ Tây Ban Nha.',
  d => { d.bg('c'); d.e(5, 9, 4, 3, 'b'); d.e(11, 9, 4, 3, 'b'); d.r(1, 11, 8, 2, 't'); d.r(7, 11, 8, 2, 't'); d.p('N', 2, 12, 4, 12, 8, 12, 10, 12, 12, 12); d.p('w', 4, 7, 10, 7, 3, 9, 9, 9); d.p('B', 6, 8, 12, 8); }, { use: 'wear' });
add(G, B, 'ar-silver', 'Trang sức bạc Quechua và Mapuche', 'Quechua and Mapuche silver jewellery', 'Vòng cổ, khóa cài và đồ trang trí bạc làm thủ công. Người Mapuche ở Patagonia nổi tiếng với trang sức bạc dày kiểu cổ.',
  d => { d.bg('e'); d.e(8, 8, 6, 6, 'a'); d.e(8, 8, 4.6, 4.6, 'e'); for (let a = 0; a < 10; a++) { const t = a / 10 * 6.28; d.put(8 + Math.cos(t) * 5.3, 8 + Math.sin(t) * 5.3, a % 2 ? 'w' : 'A'); } d.tri(6, 11, 4, 4, 'a'); d.p('w', 7, 12, 8, 13); d.p('A', 8, 14, 5, 3, 11, 3); }, H);
add(G, B, 'ar-panuelo', 'Khăn trắng của các bà mẹ Plaza de Mayo', 'The white headscarf of the Plaza de Mayo mothers', 'Khăn trùm đầu màu trắng là biểu tượng của cuộc đấu tranh đòi lại những người mất tích thời chế độ quân sự. Hình ảnh này xuất hiện trong các cuộc tuần hành mỗi thứ Năm.',
  d => { d.bg('c'); d.e(8, 8, 6, 5, 'w'); d.r(2, 8, 12, 5, 'w'); d.tri(3, 10, 10, 5, 'w'); d.p('l', 5, 6, 8, 5, 11, 6, 4, 9, 12, 9, 7, 12, 9, 13); d.p('W', 8, 11, 7, 10, 9, 10); d.p('c', 3, 14, 13, 14); }, { use: 'wear' });

// ----- Nhà ở -----
add(G, C, 'ar-casachorizo', 'Casa chorizo', 'Casa chorizo', 'Kiểu nhà dài hẹp thời thế kỷ XIX ở Buenos Aires, phòng nối tiếp nhau dọc theo một sân trong. Tên gọi vui từ hình dáng giống xúc xích.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(1, 6, 14, 8, 't'); d.r(1, 5, 14, 1, 'R'); d.r(1, 6, 14, 1, 'e'); for (const x of [2, 5, 8, 11]) { d.r(x, 8, 2, 3, 'b'); d.r(x, 11, 2, 1, 'N'); } d.r(13, 9, 2, 5, 'N'); d.p('y', 14, 11); d.p('g', 4, 15, 9, 15); }, SC);
add(G, C, 'ar-conventillo', 'Conventillo ở La Boca', 'Conventillo in La Boca', 'Khu nhà tập thể sơn màu rực của người nhập cư Ý. Phố Caminito là điểm du lịch nổi tiếng.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(0, 5, 5, 9, 'y'); d.r(5, 7, 5, 7, 'b'); d.r(10, 4, 6, 10, 'r'); d.r(0, 4, 5, 1, 'O'); d.r(5, 6, 5, 1, 'B'); d.r(10, 3, 6, 1, 'R'); for (const [x, y] of [[1, 7], [3, 10], [6, 9], [8, 11], [11, 6], [13, 9]]) d.r(x, y, 1, 2, 'k'); d.r(6, 12, 2, 2, 'w'); d.p('w', 2, 5, 12, 5); d.p('g', 4, 6, 9, 8, 12, 12); }, SC);
add(G, C, 'ar-estancia', 'Estancia (trang trại lớn)', 'Estancia (large ranch)', 'Trang trại chăn nuôi rộng ở Pampa với nhà chính, chuồng ngựa và bãi cỏ. Nhiều estancia nay đón khách du lịch trải nghiệm cuộc sống gaucho.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'g'); d.r(2, 6, 9, 6, 'e'); d.tri(1, 3, 11, 3, 'R'); d.r(2, 9, 9, 1, 'W'); for (const x of [3, 6, 9]) d.r(x, 9, 1, 3, 'N'); d.r(4, 7, 2, 2, 'b'); d.r(8, 7, 2, 2, 'b'); d.r(12, 8, 4, 4, 'n'); d.tri(12, 6, 4, 2, 'N'); d.p('w', 13, 10); d.l(0, 14, 15, 14, 'N'); d.p('N', 2, 13, 7, 13, 12, 13); }, SC);
add(G, C, 'ar-recoleta', 'Chung cư kiểu Pháp ở Recoleta', 'French-style apartments in Recoleta', 'Những tòa nhà đá sáng với ban công sắt uốn. Khu này là nơi ở của nhiều gia đình khá giả.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(2, 1, 12, 13, 'e'); d.tri(1, 0, 14, 2, 'A'); for (const y of [3, 6, 9]) { for (const x of [3, 7, 11]) { d.r(x, y, 2, 2, 'C'); d.r(x - 1, y + 2, 4, 1, 'k'); } } d.r(7, 11, 2, 3, 'N'); d.p('k', 4, 13, 11, 13); }, SC);
add(G, C, 'ar-patagoniacabin', 'Nhà gỗ Patagonia', 'Patagonian wooden cabin', 'Nhà gỗ và đá ở Bariloche theo kiểu núi Thụy Sĩ. Khí hậu lạnh khiến mái dốc và lò sưởi trở nên quen thuộc.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'w'); d.tri(10, 5, 6, 8, 'G'); d.tri(11, 6, 4, 2, 'w'); d.r(2, 8, 9, 5, 'n'); d.tri(1, 4, 11, 4, 'N'); d.tri(1, 4, 11, 1, 'w'); d.r(8, 2, 2, 4, 'a'); d.p('l', 9, 1, 8, 0); d.r(5, 9, 2, 2, 'y'); d.r(8, 10, 2, 3, 'N'); d.l(2, 10, 10, 10, 'N'); d.p('w', 2, 14, 7, 15, 12, 13); }, SC);
add(G, C, 'ar-villa', 'Villa (khu nhà tạm)', 'Villa (informal neighbourhood)', 'Những khu dân cư đông người, nhà gạch dựng tự phát quanh Buenos Aires. Nhiều nơi thiếu dịch vụ cơ bản nhưng có cộng đồng gắn kết.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); for (const [x, y, w, h, c] of [[0, 8, 4, 6, 'o'], [4, 6, 4, 8, 'b'], [8, 9, 4, 5, 'y'], [12, 7, 4, 7, 'p'], [2, 4, 3, 4, 'g'], [9, 5, 3, 4, 'r']]) { d.r(x, y, w, h, c); d.r(x, y, w, 1, 'K'); d.put(x + 1, y + 2, 'k'); } d.p('k', 5, 9, 13, 10, 10, 11); d.l(0, 3, 15, 5, 'k'); d.p('w', 12, 1); }, SC);

// ----- Đồ dùng -----
add(G, E, 'ar-mate', 'Mate (bình trà mate)', 'Mate (the shared gourd)', 'Trà mate được rót nóng vào bình rồi chuyền tay nhau uống chung. Người rót nước gọi là cebador, và việc chia mate là dấu hiệu của tình bạn.',
  d => { d.bg('e'); d.e(8, 11, 5, 4.4, 'n'); d.r(3, 7, 10, 2, '_'); d.e(8, 8, 4, 1.4, 'G'); d.p('h', 6, 8, 9, 8, 8, 7); d.p('w', 6, 3, 9, 2, 11, 4, 7, 1); d.p('N', 5, 12, 10, 13, 8, 14); d.r(4, 9, 8, 1, 'N'); d.l(10, 8, 14, 3, 'a'); d.p('A', 14, 2); }, H);
add(G, E, 'ar-parrilla', 'Parrilla (bếp nướng)', 'Parrilla (the grill)', 'Vỉ nướng thịt đặt trên than hồng, có trong nhiều gia đình và quán ăn. Người nướng gọi là parrillero và thường là nam giới trong nhà.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(2, 8, 12, 4, 'A'); d.r(2, 8, 12, 1, 'a'); for (let x = 3; x < 14; x += 2) d.r(x, 9, 1, 1, 'k'); d.p('r', 3, 11, 6, 11, 9, 11, 12, 11); d.p('o', 4, 11, 8, 11, 11, 11); d.r(3, 6, 3, 2, 'n'); d.r(7, 6, 3, 2, 'N'); d.r(11, 6, 2, 2, 'n'); d.l(3, 12, 2, 15, 'k'); d.l(13, 12, 14, 15, 'k'); d.p('w', 5, 3, 9, 2, 12, 4); }, SC);
add(G, E, 'ar-bombilla', 'Bombilla và bình đun nước', 'Bombilla and thermos flask', 'Ống hút lọc và bình giữ nhiệt để mang đến công viên, công sở và bãi biển. Nhiều người không đi đâu mà thiếu bộ này.',
  d => { d.bg('e'); d.r(2, 4, 6, 11, 'A'); d.r(3, 4, 4, 2, 'r'); d.r(2, 4, 6, 1, 'R'); d.r(3, 7, 1, 7, 'l'); d.r(8, 8, 2, 4, 'a'); d.l(11, 14, 14, 2, 'a'); d.p('w', 13, 2, 14, 2); d.r(10, 12, 5, 3, 'n'); d.p('G', 11, 12, 13, 12); d.p('N', 11, 14, 13, 14); }, H);
add(G, E, 'ar-bandoneon', 'Bandoneón', 'Bandoneón', 'Nhạc cụ dạng đàn xếp giống accordion, đàn trong tango. Nhiều người từng có trong nhà như một vật kỷ niệm.',
  d => { d.bg('e'); d.r(1, 4, 4, 8, 'k'); d.r(11, 4, 4, 8, 'k'); d.r(5, 5, 6, 6, 'W'); for (const x of [6, 8, 10]) d.r(x, 5, 1, 6, 'w'); d.p('w', 2, 5, 3, 7, 2, 9, 13, 5, 12, 7, 13, 9); d.p('y', 2, 6, 3, 8, 12, 6, 13, 8); d.r(5, 4, 6, 1, 'K'); d.r(5, 11, 6, 1, 'K'); d.p('r', 8, 12); }, H);
add(G, E, 'ar-boleadoras', 'Bóla và dây thừng của gaucho', 'Boleadoras and lazo', 'Boleadoras là dây có hòn đá để quấn chân con vật, còn lazo là dây thừng. Người gaucho thường để chúng bên yên.',
  d => { d.bg('e'); d.e(3, 11, 2.2, 2.2, 'a'); d.e(13, 11, 2.2, 2.2, 'a'); d.e(8, 3, 2.2, 2.2, 'a'); d.p('w', 2, 10, 12, 10, 7, 2); d.l(4, 10, 8, 6, 'N'); d.l(12, 10, 9, 6, 'N'); d.l(8, 5, 8, 6, 'N'); d.e(8, 8, 1, 1, 'n'); d.p('A', 4, 12, 14, 12, 9, 4); }, H);
add(G, E, 'ar-sube', 'Subte và thẻ SUBE', 'The Subte and the SUBE card', 'Buenos Aires có hệ thống tàu điện ngầm cũ nhất Nam Mỹ, mở năm 1913. Thẻ SUBE (Sistema Único de Boleto Electrónico, hệ thống vé điện tử duy nhất) được dùng cho xe buýt và tàu.',
  d => { d.bg('e'); d.r(1, 4, 14, 9, 'C'); d.r(1, 4, 14, 3, 'B'); d.r(2, 9, 12, 1, 'c'); d.p('w', 3, 5, 4, 5, 6, 5, 7, 5, 9, 5, 10, 5); d.e(13, 8, 1.8, 1.8, 'y'); d.p('k', 4, 11, 11, 11); d.p('w', 3, 12, 12, 12); d.r(5, 7, 5, 2, 'w'); d.p('c', 6, 7, 8, 7); }, H);
