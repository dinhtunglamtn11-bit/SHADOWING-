import { add, SC, setCC } from './pass-kit.js';
setCC('nl');
// Hà Lan · Nhóm 1: Nơi chốn và thiên nhiên
const G = 1, A = 'Địa danh', B = 'Mùa và thiên nhiên', C = 'Vùng miền', E = 'Hiện tượng đặc biệt';

// ----- Địa danh -----
add(G, A, 'nl-amsterdam', 'Amsterdam và các kênh đào', 'Amsterdam and its canals', 'Thủ đô theo hiến pháp và thành phố đông dân nhất, nổi tiếng với hệ thống kênh đào thế kỷ XVII. Vòng kênh này được UNESCO (Tổ chức Giáo dục, Khoa học và Văn hóa của Liên Hợp Quốc) công nhận là di sản thế giới.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(0, 11, 16, 1, 'c'); d.r(0, 4, 3, 7, 'r'); d.r(3, 3, 3, 8, 'n'); d.r(6, 5, 3, 6, 'R'); d.r(9, 3, 3, 8, 'o'); d.r(12, 4, 4, 7, 'r'); for (const [x, y] of [[0, 4], [3, 3], [6, 5], [9, 3], [12, 4]]) { d.r(x, y, 3, 1, 'w'); } for (const [x, y] of [[1, 6], [4, 6], [7, 7], [10, 6], [13, 6]]) d.r(x, y, 1, 2, 'y'); d.p('w', 2, 13, 8, 14, 13, 13); d.p('k', 5, 12, 11, 12); }, SC);
add(G, A, 'nl-rotterdam', 'Rotterdam (thành phố cảng)', 'Rotterdam (the port city)', 'Thành phố cảng lớn nhất châu Âu, được xây dựng lại sau khi bị phá hủy trong Chiến tranh thế giới thứ hai. Kiến trúc hiện đại như nhà hình khối lập phương Kubuswoningen nổi bật ở đây.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(1, 4, 3, 8, 'a'); d.r(5, 2, 3, 10, 'A'); d.r(9, 5, 3, 7, 'a'); d.r(13, 3, 2, 9, 'A'); d.l(7, 1, 7, 5, 'w'); for (let y = 5; y < 11; y += 2) { d.put(2, y, 'c'); d.put(6, y - 2, 'c'); d.put(10, y, 'c'); d.put(14, y - 1, 'c'); } d.r(0, 12, 16, 1, 'k'); d.p('r', 2, 14); d.p('y', 8, 14); d.p('w', 5, 15, 12, 15); }, SC);
add(G, A, 'nl-hague', 'The Hague (Den Haag)', 'The Hague (Den Haag)', 'Trung tâm chính phủ và nơi đặt Tòa án Quốc tế. Thành phố có Binnenhof, quần thể kiến trúc của nghị viện từ thời Trung cổ.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(2, 7, 12, 7, 'n'); d.r(2, 6, 12, 1, 'N'); d.tri(1, 2, 5, 4, 'a'); d.tri(10, 2, 5, 4, 'a'); d.r(2, 4, 4, 3, 'n'); d.r(10, 4, 4, 3, 'n'); d.r(6, 5, 4, 9, 'N'); d.tri(6, 1, 4, 4, 'A'); d.r(7, 10, 2, 4, 'k'); d.p('y', 4, 9, 11, 9, 4, 11, 11, 11); d.p('w', 8, 7); }, SC);
add(G, A, 'nl-keukenhof', 'Keukenhof', 'Keukenhof', 'Vườn hoa tulip lớn nhất thế giới, mở cửa khoảng hai tháng vào mùa xuân. Hàng triệu bông hoa được trồng mỗi năm để du khách ngắm.',
  d => { d.bg('c'); d.r(0, 6, 16, 10, 'g'); for (let y = 7; y < 16; y += 2) { for (let x = (y % 4 ? 0 : 1); x < 16; x += 2) d.put(x, y, ['r', 'y', 'p', 'o', 'v', 'w'][(x + y) % 6]); } d.r(0, 6, 16, 1, 'G'); d.p('G', 2, 9, 9, 11, 13, 14); d.tri(11, 1, 4, 4, 'w'); d.p('c', 3, 2, 7, 3); }, SC);
add(G, A, 'nl-kinderdijk', 'Kinderdijk (cối xay gió)', 'Kinderdijk (the windmills)', 'Nhóm khoảng hai mươi cối xay gió thế kỷ XVIII bên các kênh thoát nước. Nơi đây là di sản thế giới UNESCO.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(0, 11, 16, 1, 'g'); d.tri(3, 5, 5, 7, 'e'); d.l(5, 6, 1, 2, 'N'); d.l(5, 6, 9, 2, 'N'); d.l(5, 6, 1, 10, 'N'); d.l(5, 6, 9, 10, 'N'); d.tri(11, 8, 4, 4, 'e'); d.l(13, 9, 15, 7, 'n'); d.l(13, 9, 11, 7, 'n'); d.r(4, 10, 2, 2, 'N'); d.p('w', 2, 14, 8, 15, 12, 14); }, SC);
add(G, A, 'nl-delta', 'Hệ thống chống lũ Delta Works', 'The Delta Works', 'Hệ thống đập, đê và cửa chắn bão ở vùng Tây Nam. Đây được nhiều người coi là một trong những kỳ công kỹ thuật của thế kỷ XX.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'C'); d.r(0, 8, 16, 1, 'c'); d.r(1, 5, 14, 3, 'W'); for (const x of [2, 4, 6, 8, 10, 12, 14]) d.r(x, 3, 1, 5, 'a'); d.r(1, 5, 14, 1, 'w'); d.r(0, 8, 16, 1, 'A'); d.p('w', 3, 11, 9, 12, 13, 11, 6, 14); d.p('b', 4, 10, 11, 10); }, SC);

// ----- Mùa và thiên nhiên -----
add(G, B, 'nl-spring', 'Mùa xuân (tháng 3 đến tháng 5)', 'Spring (March to May)', 'Hoa tulip, thủy tiên và hoa lan dạ hương nở rộ trên các cánh đồng quanh Lisse. Đây là mùa du lịch đông người nhất.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'g'); for (let x = 1; x < 16; x += 3) { d.r(x, 10, 1, 4, 'G'); d.r(x - 1, 8, 3, 2, ['r', 'y', 'p', 'o', 'v'][(x / 3 | 0) % 5]); } d.e(13, 3, 1.6, 1.6, 'y'); d.p('w', 3, 3, 8, 2); }, SC);
add(G, B, 'nl-summer', 'Mùa hè (tháng 6 đến tháng 8)', 'Summer (June to August)', 'Mát dịu, ngày dài, người ta đạp xe và ngồi ngoài trời trên bờ kênh. Ngày dài có thể sáng đến tận gần mười giờ tối.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(0, 11, 16, 1, 'g'); d.e(8, 5, 4, 4, 'y'); for (const [x, y] of [[8, 0], [8, 10], [2, 5], [14, 5], [4, 1], [12, 1]]) d.put(x, y, 'o'); d.e(3, 13, 1.6, 1.6, 'k'); d.e(7, 13, 1.6, 1.6, 'k'); d.l(3, 13, 5, 10, 'r'); d.l(5, 10, 7, 13, 'r'); d.p('w', 11, 13, 13, 14); }, SC);
add(G, B, 'nl-autumn', 'Mùa thu (tháng 9 đến tháng 11)', 'Autumn (September to November)', 'Mưa nhiều, lá vàng phủ công viên và đường phố. Bầu trời thường xám và gió mạnh hơn.',
  d => { d.bg('a'); d.e(4, 3, 4, 2, 'l'); d.e(12, 4, 4, 2, 'W'); d.r(0, 12, 16, 4, 'O'); d.r(7, 6, 2, 7, 'N'); d.e(8, 5, 4, 3, 'o'); d.e(5, 6, 2.4, 2, 'y'); d.e(11, 6, 2.4, 2, 'r'); d.p('y', 3, 13, 12, 14, 6, 15); d.p('b', 2, 8, 13, 9, 5, 10); d.p('r', 9, 14); }, SC);
add(G, B, 'nl-winter', 'Mùa đông (tháng 12 đến tháng 2)', 'Winter (December to February)', 'Lạnh ẩm, ngày ngắn và ít nắng. Khi kênh đóng băng dày, nhiều người trượt băng ngay trên mặt nước.',
  d => { d.bg('A'); d.r(0, 10, 16, 6, 'l'); d.r(0, 10, 16, 1, 'w'); d.r(2, 11, 12, 4, 'c'); d.l(3, 13, 6, 13, 'w'); d.l(8, 12, 12, 14, 'w'); d.e(11, 7, 1, 1, 's'); d.r(10, 8, 2, 3, 'r'); d.p('w', 1, 2, 6, 4, 11, 1, 14, 4, 3, 7, 13, 6); d.tri(0, 6, 4, 5, 'G'); d.p('w', 1, 7); }, SC);
add(G, B, 'nl-weather', 'Thời tiết thay đổi liên tục', 'Ever-changing weather', 'Khí hậu hải dương khiến mưa nắng đan xen nhau trong cùng một ngày. Người dân thường mang áo mưa khi đạp xe.',
  d => { d.bg('c'); d.e(4, 3, 3, 2, 'y'); d.e(11, 4, 4, 2.4, 'a'); d.e(8, 3, 3, 2, 'A'); d.p('b', 9, 7, 12, 8, 14, 7, 8, 10, 11, 11); d.p('c', 10, 8, 13, 9, 9, 11); d.fan(4, 12, 4, 'r'); d.fan(4, 12, 3, 'y'); d.fan(4, 12, 2, 'c'); d.r(0, 13, 16, 3, 'g'); }, SC);

// ----- Vùng miền -----
add(G, C, 'nl-randstad', 'Randstad', 'The Randstad', 'Vùng đô thị đông dân ở phía tây gồm Amsterdam, Rotterdam, The Hague và Utrecht. Đây là trái tim kinh tế và chính trị của quốc gia.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(1, 6, 3, 8, 'a'); d.r(5, 3, 3, 11, 'A'); d.r(9, 5, 3, 9, 'a'); d.r(13, 7, 2, 7, 'A'); for (const [x, y] of [[2, 8], [2, 10], [6, 5], [6, 7], [6, 9], [10, 7], [10, 9], [14, 9]]) d.put(x, y, 'y'); d.l(0, 3, 15, 5, 'W'); d.p('w', 12, 1); }, SC);
add(G, C, 'nl-friesland', 'Bắc Hà Lan và Friesland', 'The north and Friesland', 'Vùng nông thôn yên bình, có ngôn ngữ Frisian riêng. Giải trượt băng tự nhiên dài Elfstedentocht nổi tiếng ở đây.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'g'); d.r(0, 12, 16, 2, 'C'); d.e(8, 11, 4, 1, 'w'); d.r(6, 5, 4, 4, 'R'); d.tri(5, 3, 6, 2, 'r'); d.r(2, 7, 1, 3, 'N'); d.e(2, 6, 1.6, 1.6, 'G'); d.p('w', 13, 4); d.l(11, 7, 14, 7, 'a'); d.p('y', 7, 7); d.p('w', 12, 13, 3, 14); }, SC);
add(G, C, 'nl-zeeland', 'Zeeland', 'Zeeland', 'Vùng đất ven biển ở tây nam, nơi các đảo nối với nhau bằng đập và cầu. Zeeland đã bị lũ nặng năm 1953 và hầu như mọi thứ được xây lại.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'C'); d.r(0, 8, 16, 1, 'c'); d.e(3, 8, 3, 1.4, 'g'); d.e(13, 8, 3, 1.4, 'g'); d.r(5, 7, 6, 1, 'W'); for (const x of [6, 8, 10]) d.r(x, 8, 1, 3, 'a'); d.r(1, 4, 2, 4, 'w'); d.tri(1, 2, 2, 2, 'r'); d.p('w', 4, 12, 9, 13, 13, 12); }, SC);
add(G, C, 'nl-limburg', 'Limburg', 'Limburg', 'Vùng đồi ở phía nam, gần biên giới Bỉ và Đức. Kiến trúc, ẩm thực và lễ hội ở đây mang nhiều dấu ấn Công giáo.',
  d => { d.bg('c'); d.tri(0, 6, 10, 6, 'g'); d.tri(6, 5, 10, 7, 'G'); d.r(0, 12, 16, 4, 'h'); d.r(6, 5, 4, 7, 'W'); d.tri(5, 2, 6, 3, 'r'); d.r(7, 0, 2, 3, 'W'); d.r(6, 1, 4, 1, 'W'); d.r(7, 9, 2, 3, 'N'); d.p('y', 12, 3, 2, 3); }, SC);
add(G, C, 'nl-wadden', 'Quần đảo Wadden', 'The Wadden Islands', 'Những đảo cát phía bắc và vùng bãi bùn triều, được UNESCO công nhận. Một số người đi bộ qua bãi bùn khi nước rút.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 't'); d.r(0, 8, 16, 1, 'u'); d.e(8, 12, 7, 2, 'C'); d.e(3, 14, 3, 1.2, 'c'); d.p('N', 2, 10, 6, 11, 11, 10, 14, 11); d.e(11, 7, 1, 1, 's'); d.r(11, 8, 1, 2, 'k'); d.p('w', 4, 3, 9, 2, 13, 4); d.p('k', 6, 5, 7, 4, 3, 4); }, SC);

// ----- Hiện tượng đặc biệt -----
add(G, E, 'nl-polder', 'Polder (đất lấn biển)', 'The polder', 'Vùng đất thấp được đắp đê và bơm hết nước, biến thành ruộng và đồng cỏ. Nhiều polder nằm thấp hơn mực biển vài mét.',
  d => { d.bg('c'); d.r(0, 3, 16, 3, 'C'); d.r(0, 3, 16, 1, 'c'); d.r(0, 5, 16, 2, 'N'); d.r(0, 6, 16, 1, 'n'); d.r(0, 7, 16, 9, 'g'); for (const y of [9, 12, 15]) d.r(0, y, 16, 1, 'G'); d.p('w', 3, 8, 9, 11, 13, 10); d.p('y', 5, 13, 11, 14); d.r(7, 8, 1, 2, 'N'); d.p('k', 12, 8); }, SC);
add(G, E, 'nl-pumps', 'Hệ thống bơm và cối xay gió', 'Pumps and windmills', 'Xưa kia cối xay gió bơm nước ra khỏi đất, về sau được thay bằng bơm chạy điện. Ngày nay cối xay gió chủ yếu là di sản.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.r(0, 13, 16, 2, 'C'); d.tri(2, 5, 5, 7, 'e'); d.l(4, 6, 0, 3, 'N'); d.l(4, 6, 8, 3, 'N'); d.r(9, 8, 5, 4, 'a'); d.r(10, 6, 3, 2, 'A'); d.r(12, 4, 1, 2, 'A'); d.p('y', 11, 9); d.p('b', 9, 13, 13, 14); d.p('w', 10, 3); }, SC);
add(G, E, 'nl-elfsteden', 'Giải trượt băng Elfstedentocht', 'The Elfstedentocht skating race', 'Cuộc đua trượt băng khoảng 200 km qua mười một thị trấn ở Friesland, chỉ tổ chức khi băng đủ dày. Lần gần nhất diễn ra năm 1997, và nhiều người vẫn mong đợi một mùa đông lạnh như vậy.',
  d => { d.bg('l'); d.r(0, 10, 16, 6, 'c'); d.l(1, 13, 15, 13, 'w'); for (const [x, c] of [[3, 'r'], [7, 'b'], [11, 'o']]) { d.e(x, 6, 1.2, 1.2, 's'); d.r(x - 1, 7, 3, 3, c); d.l(x - 1, 11, x + 1, 11, 'a'); } d.p('w', 2, 2, 8, 3, 13, 1); d.p('r', 14, 8); }, SC);
add(G, E, 'nl-tulipfield', 'Đồng hoa tulip nở rộ', 'Blooming tulip fields', 'Những dải màu đỏ, vàng, tím trải dài quanh Lisse vào đầu mùa xuân. Đồng hoa được trồng để thu củ giống nhiều hơn là để ngắm.',
  d => { d.bg('c'); d.r(0, 5, 16, 11, 'g'); d.r(0, 5, 16, 2, 'r'); d.r(0, 7, 16, 2, 'y'); d.r(0, 9, 16, 2, 'v'); d.r(0, 11, 16, 2, 'p'); d.r(0, 13, 16, 3, 'o'); for (let x = 1; x < 16; x += 3) d.put(x, 6, 'R'); d.e(13, 2, 1.6, 1.6, 'y'); d.p('w', 3, 2, 8, 3); }, SC);
add(G, E, 'nl-flevoland', 'Đảo nhân tạo Flevoland', 'The reclaimed land of Flevoland', 'Tỉnh trẻ nhất, hoàn toàn là đất lấn từ đáy biển trong thế kỷ XX. Tỉnh này nằm dưới mực biển, và nhiều người sống ở những nơi từng là đáy biển.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(0, 6, 16, 5, 'g'); d.r(0, 6, 16, 1, 'N'); for (const y of [8, 10]) d.r(0, y, 16, 1, 'G'); d.r(3, 3, 1, 4, 'w'); d.l(3, 3, 1, 1, 'W'); d.l(3, 3, 5, 5, 'W'); d.p('w', 8, 13, 12, 14, 4, 15); d.p('y', 6, 8, 12, 9); d.r(10, 4, 3, 2, 'r'); }, SC);
