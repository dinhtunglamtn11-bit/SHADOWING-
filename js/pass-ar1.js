import { add, SC, setCC } from './pass-kit.js';
setCC('ar');
// Argentina · Nhóm 1: Nơi chốn và thiên nhiên
const G = 1, A = 'Địa danh', B = 'Mùa và thiên nhiên', C = 'Vùng miền', E = 'Hiện tượng đặc biệt';

// ----- Địa danh -----
add(G, A, 'ar-buenosaires', 'Buenos Aires (thủ đô)', 'Buenos Aires (the capital)', 'Thủ đô và thành phố lớn nhất, nằm bên bờ sông Río de la Plata. Thành phố được gọi là "Paris của Nam Mỹ" nhờ các đại lộ rộng, quán cà phê và kiến trúc châu Âu.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'C'); d.r(0, 12, 16, 1, 'u'); d.r(1, 7, 3, 5, 'a'); d.r(12, 6, 3, 6, 'A'); d.r(4, 9, 3, 3, 'W'); d.r(10, 8, 2, 4, 'a'); d.r(7, 3, 2, 9, 'w'); d.tri(6, 1, 4, 3, 'w'); d.p('k', 7, 5, 8, 5, 7, 8); d.p('c', 2, 8, 2, 10, 13, 7, 13, 9, 5, 10); d.p('w', 1, 14, 6, 14, 11, 15); }, SC);
add(G, A, 'ar-iguazu', 'Thác Iguazú (Họng Quỷ)', 'Iguazú Falls (Devil\'s Throat)', 'Hệ thống hàng trăm thác nước nằm ở biên giới với Brasil, nổi tiếng nhất là Họng Quỷ (Garganta del Diablo). UNESCO (Tổ chức Giáo dục, Khoa học và Văn hóa của Liên Hợp Quốc) công nhận đây là di sản thế giới.',
  d => { d.bg('c'); d.r(0, 0, 16, 5, 'G'); d.p('g', 2, 3, 6, 4, 10, 3, 13, 4); d.r(0, 12, 16, 4, 'C'); for (const x of [2, 5, 8, 11, 13]) { d.r(x, 5, 2, 7, 'w'); d.p('l', x, 7, x + 1, 9); } d.r(0, 5, 16, 1, 'N'); d.p('w', 1, 12, 5, 13, 9, 12, 13, 13); d.p('g', 0, 4, 15, 4); }, SC);
add(G, A, 'ar-perito', 'Sông băng Perito Moreno', 'Perito Moreno Glacier', 'Sông băng khổng lồ ở Patagonia thuộc Vườn quốc gia Los Glaciares, nổi tiếng vì những khối băng lớn sụp xuống hồ. Nó là một trong số ít sông băng trên thế giới vẫn giữ được kích thước tương đối ổn định trong nhiều năm.',
  d => { d.bg('c'); d.tri(0, 4, 8, 8, 'l'); d.tri(5, 2, 9, 10, 'w'); d.tri(9, 5, 7, 7, 'l'); d.p('c', 3, 8, 7, 7, 10, 9, 12, 8); d.r(0, 12, 16, 4, 'C'); d.r(0, 12, 16, 1, 'c'); d.p('w', 4, 13, 9, 14, 13, 13); d.r(6, 11, 2, 1, 'l'); }, SC);
add(G, A, 'ar-aconcagua', 'Núi Aconcagua', 'Mount Aconcagua', 'Đỉnh núi cao nhất Nam Mỹ và cả bán cầu Tây, cao khoảng 6.960 mét, nằm ở tỉnh Mendoza. Nhiều người leo núi chinh phục đỉnh này mà không cần dụng cụ kỹ thuật phức tạp.',
  d => { d.bg('c'); d.e(13, 3, 1.4, 1.4, 'y'); d.tri(0, 7, 8, 9, 'A'); d.tri(3, 1, 11, 15, 'a'); d.tri(6, 1, 5, 5, 'w'); d.p('w', 5, 7, 11, 7, 8, 6); d.p('K', 8, 8, 9, 10, 7, 12, 10, 13); d.r(0, 14, 16, 2, 'n'); d.p('N', 2, 15, 8, 15, 13, 15); }, SC);
add(G, A, 'ar-ushuaia', 'Ushuaia (tận cùng thế giới)', 'Ushuaia (the end of the world)', 'Thành phố cực nam của Argentina, ở Tierra del Fuego, thường được gọi là "thành phố ở tận cùng thế giới". Từ đây tàu đi Nam Cực rời cảng.',
  d => { d.bg('c'); d.tri(0, 3, 9, 8, 'a'); d.tri(7, 4, 9, 7, 'A'); d.tri(2, 3, 4, 3, 'w'); d.tri(10, 4, 4, 3, 'w'); d.r(0, 11, 16, 5, 'C'); d.r(1, 9, 2, 2, 'r'); d.r(3, 9, 2, 2, 'y'); d.r(5, 9, 2, 2, 'b'); d.tri(1, 8, 2, 1, 'R'); d.r(10, 11, 5, 2, 'w'); d.r(11, 9, 3, 2, 'w'); d.r(12, 7, 1, 2, 'r'); d.p('k', 11, 10, 13, 10); d.p('w', 2, 14, 8, 15, 12, 14); }, SC);
add(G, A, 'ar-humahuaca', 'Quebrada de Humahuaca', 'Quebrada de Humahuaca', 'Thung lũng đầy màu sắc ở tỉnh Jujuy với những ngọn đồi nhiều tầng đỏ, vàng và tím. UNESCO công nhận nơi này là di sản thế giới.',
  d => { d.bg('c'); d.tri(0, 6, 16, 5, 'v'); d.tri(0, 8, 12, 4, 'r'); d.tri(5, 7, 11, 5, 'o'); d.tri(2, 10, 14, 3, 'y'); d.r(0, 12, 16, 4, 'n'); d.r(0, 13, 16, 1, 't'); d.p('N', 3, 14, 9, 15, 13, 14); d.p('G', 6, 12, 11, 12); d.e(13, 2, 1.4, 1.4, 'y'); }, SC);
add(G, A, 'ar-valdes', 'Bán đảo Valdés', 'Valdés Peninsula', 'Khu bảo tồn thiên nhiên ven biển Patagonia, nơi cá voi trơn phương nam đến sinh sản. Đây cũng là nơi có hải cẩu, sư tử biển và cá voi sát thủ.',
  d => { d.bg('c'); d.r(0, 6, 16, 6, 'C'); d.r(0, 6, 16, 1, 'c'); d.r(0, 12, 16, 4, 'u'); d.e(8, 8, 5, 2, 'B'); d.tri(11, 3, 4, 4, 'B'); d.p('c', 5, 7, 7, 7); d.p('w', 2, 8, 13, 9, 3, 10); d.e(4, 13, 2.2, 1.2, 'N'); d.p('k', 3, 13); d.p('t', 11, 14, 13, 15); }, SC);

// ----- Mùa và thiên nhiên -----
add(G, B, 'ar-summer', 'Mùa hè (tháng 12 đến tháng 2)', 'Summer (December to February)', 'Nóng và ẩm ở Buenos Aires, trong khi Patagonia mát và nhiều gió. Đây là mùa du lịch cao điểm ở phía nam.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(0, 11, 16, 1, 'u'); d.e(8, 5, 4, 4, 'y'); for (const [x, y] of [[8, 0], [8, 10], [2, 5], [14, 5], [4, 1], [12, 1]]) d.put(x, y, 'o'); d.fan(3, 15, 3, 'r'); d.p('N', 3, 15); d.p('w', 12, 14); }, SC);
add(G, B, 'ar-autumn', 'Mùa thu (tháng 3 đến tháng 5)', 'Autumn (March to May)', 'Lá cây ở Mendoza chuyển vàng và đỏ, và là mùa thu hoạch nho. Thời tiết dễ chịu cho cả thành phố và vùng rượu vang.',
  d => { d.bg('c'); d.tri(0, 6, 9, 9, 'A'); d.tri(6, 4, 10, 11, 'a'); d.tri(7, 4, 4, 3, 'w'); d.r(0, 13, 16, 3, 'O'); d.p('o', 2, 14, 6, 15, 10, 14, 13, 15); d.p('y', 4, 15, 12, 14); d.p('r', 3, 12, 11, 12); d.p('v', 8, 12, 9, 12); }, SC);
add(G, B, 'ar-winter', 'Mùa đông (tháng 6 đến tháng 8)', 'Winter (June to August)', 'Lạnh ở phía nam và trên núi, thích hợp cho trượt tuyết ở Bariloche và Las Leñas. Buenos Aires lạnh nhẹ nhưng ít khi có tuyết.',
  d => { d.bg('A'); d.r(0, 12, 16, 4, 'w'); d.tri(3, 6, 6, 6, 'G'); d.tri(10, 4, 5, 8, 'G'); d.tri(4, 7, 4, 2, 'w'); d.tri(11, 5, 3, 2, 'w'); d.p('w', 1, 2, 5, 4, 9, 1, 13, 3, 2, 8, 14, 9); d.r(6, 12, 1, 1, 'N'); }, SC);
add(G, B, 'ar-spring', 'Mùa xuân (tháng 9 đến tháng 11)', 'Spring (September to November)', 'Hoa jacaranda nở tím khắp Buenos Aires vào tháng 10 và tháng 11. Đây là thời điểm nhiều người chọn để đi dạo công viên.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(7, 7, 2, 7, 'N'); d.e(8, 5, 6, 3.6, 'v'); d.e(5, 6, 3, 2.4, 'p'); d.e(11, 6, 3, 2.4, 'v'); d.p('V', 4, 4, 9, 3, 12, 5, 7, 7); d.p('w', 2, 2, 13, 2); d.p('p', 3, 14, 7, 14, 12, 15, 10, 13); }, SC);
add(G, B, 'ar-landscapes', 'Cảnh quan đa dạng', 'A land of many landscapes', 'Sa mạc ở tây bắc, rừng rậm ở đông bắc, thảo nguyên ở trung tâm và băng ở phía nam. Chỉ trong một đất nước, khí hậu thay đổi rất lớn.',
  d => { d.bg('e'); d.r(0, 0, 8, 8, 'o'); d.tri(1, 3, 6, 4, 'O'); d.r(8, 0, 8, 8, 'G'); d.e(12, 3, 3, 3, 'g'); d.r(0, 8, 8, 8, 'h'); d.r(0, 12, 8, 1, 'g'); d.r(8, 8, 8, 8, 'l'); d.tri(9, 9, 6, 5, 'w'); d.r(7, 0, 2, 16, 'k'); d.r(0, 7, 16, 2, 'k'); }, SC);

// ----- Vùng miền -----
add(G, C, 'ar-pampa', 'Pampa (đồng cỏ)', 'The Pampas', 'Đồng cỏ phẳng rộng quanh Buenos Aires, trung tâm chăn nuôi bò và trồng ngô, đậu nành. Đây là quê hương của người gaucho (cao bồi Argentina).',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'g'); d.r(0, 10, 16, 1, 'G'); d.e(12, 3, 1.4, 1.4, 'y'); d.e(5, 11, 2.4, 1.6, 'n'); d.r(3, 12, 1, 2, 'N'); d.r(6, 12, 1, 2, 'N'); d.p('N', 7, 10, 8, 10); d.p('w', 5, 11); d.p('G', 1, 14, 9, 15, 13, 13, 11, 12); d.p('w', 2, 3, 3, 3, 9, 2, 10, 2); }, SC);
add(G, C, 'ar-patagonia', 'Patagonia', 'Patagonia', 'Vùng đất phía nam thưa dân với núi, hồ, băng và gió mạnh. Nơi này có El Calafate, El Chaltén và Bariloche.',
  d => { d.bg('c'); d.tri(0, 4, 10, 8, 'a'); d.tri(6, 2, 10, 10, 'A'); d.tri(7, 2, 4, 4, 'w'); d.tri(1, 4, 4, 3, 'w'); d.r(0, 12, 16, 4, 'C'); d.r(0, 12, 16, 1, 'c'); d.p('l', 2, 14, 7, 13, 12, 14); d.l(0, 9, 3, 9, 'w'); d.l(12, 2, 15, 2, 'w'); }, SC);
add(G, C, 'ar-cuyo', 'Cuyo (Mendoza, San Juan)', 'Cuyo (Mendoza, San Juan)', 'Vùng chân dãy Andes khô ráo, trung tâm sản xuất rượu vang, nhất là Malbec. Nhiều hầm rượu mở cửa cho khách tham quan.',
  d => { d.bg('c'); d.tri(0, 2, 8, 6, 'a'); d.tri(6, 1, 10, 7, 'A'); d.tri(8, 1, 3, 2, 'w'); d.r(0, 8, 16, 8, 'n'); for (const y of [9, 11, 13]) { d.r(0, y, 16, 1, 'g'); for (let x = 1; x < 16; x += 3) d.put(x, y + 1, 'V'); } d.p('v', 2, 10, 5, 12, 8, 14, 11, 10, 14, 12); }, SC);
add(G, C, 'ar-noroeste', 'Tây bắc (Salta, Jujuy)', 'The Northwest (Salta, Jujuy)', 'Vùng cao nguyên có di sản người bản địa và kiến trúc thời thuộc địa. Salta được gọi là "La Linda" (người đẹp).',
  d => { d.bg('c'); d.tri(0, 5, 16, 6, 'O'); d.tri(4, 3, 10, 8, 'o'); d.r(0, 11, 16, 5, 't'); d.r(5, 8, 6, 5, 'w'); d.tri(4, 6, 8, 2, 'R'); d.r(7, 10, 2, 3, 'N'); d.r(6, 9, 1, 1, 'b'); d.r(1, 9, 1, 5, 'G'); d.r(0, 11, 3, 1, 'G'); d.r(13, 8, 1, 6, 'G'); d.r(14, 10, 2, 1, 'G'); }, SC);
add(G, C, 'ar-noreste', 'Đông bắc (Misiones, Corrientes)', 'The Northeast (Misiones, Corrientes)', 'Vùng cận nhiệt đới đỏ đất, rừng rậm và mưa nhiều. Đây là nơi trồng trà mate và có thác Iguazú.',
  d => { d.bg('G'); d.r(0, 12, 16, 4, 'r'); d.r(0, 12, 16, 1, 'R'); for (const [x, y, r] of [[3, 5, 3.2], [10, 4, 3.6], [14, 7, 2.6], [7, 8, 2.8]]) d.e(x, y, r, r - 0.6, 'g'); d.p('h', 3, 3, 10, 2, 7, 7); d.p('G', 5, 10, 9, 10, 12, 10); d.l(3, 11, 3, 15, 'N'); d.p('y', 12, 14); }, SC);
add(G, C, 'ar-cordoba', 'Vùng Córdoba và núi Sierras', 'Córdoba and the Sierras', 'Vùng đồi ở miền trung, nơi nhiều người đến nghỉ mát và có trường đại học cổ nhất. Córdoba có kiến trúc dòng Tên đã được UNESCO công nhận.',
  d => { d.bg('c'); d.tri(0, 6, 10, 7, 'g'); d.tri(7, 5, 9, 8, 'G'); d.r(0, 12, 16, 4, 'h'); d.r(5, 8, 6, 5, 't'); d.e(8, 7, 3, 2.6, 'W'); d.r(7, 3, 2, 3, 'W'); d.p('r', 8, 2); d.r(7, 10, 2, 3, 'N'); d.p('N', 6, 9, 9, 9); d.p('y', 2, 3, 12, 2); }, SC);

// ----- Hiện tượng đặc biệt -----
add(G, E, 'ar-zonda', 'Gió Zonda', 'The Zonda wind', 'Gió nóng khô thổi xuống từ dãy Andes sang tỉnh Mendoza và San Juan, thường mang bụi và làm mọi người mệt mỏi. Nó thường xuất hiện vào mùa đông và mùa xuân.',
  d => { d.bg('o'); d.tri(0, 5, 10, 8, 'A'); d.tri(3, 4, 4, 3, 'w'); d.r(0, 13, 16, 3, 'O'); d.l(0, 7, 7, 7, 'y'); d.l(4, 10, 13, 10, 'u'); d.l(1, 12, 9, 12, 'y'); d.p('y', 9, 6, 10, 5, 12, 7, 13, 11, 14, 9); d.e(13, 3, 1.6, 1.6, 'r'); }, SC);
add(G, E, 'ar-wind', 'Gió Patagonia', 'The Patagonian wind', 'Gió tây mạnh thổi gần như quanh năm ở phía nam, đôi khi đủ mạnh để thổi bay người đi bộ. Cây cối ở đây thường mọc nghiêng theo hướng gió.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 't'); d.l(6, 14, 8, 6, 'N'); d.l(8, 6, 12, 4, 'N'); d.e(12, 4, 2.4, 1.6, 'G'); d.e(10, 6, 2.4, 1.6, 'g'); d.l(0, 3, 5, 3, 'w'); d.l(1, 7, 6, 7, 'w'); d.l(0, 10, 4, 10, 'w'); d.p('N', 3, 14, 12, 15); }, SC);
add(G, E, 'ar-calving', 'Sông băng sụp đổ', 'Glacier calving', 'Tại Perito Moreno, các tảng băng khổng lồ thỉnh thoảng đổ xuống hồ Argentino, tạo ra tiếng nổ lớn. Du khách đứng trên các lối đi để xem.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(0, 3, 6, 9, 'l'); d.r(0, 3, 6, 1, 'w'); d.r(6, 6, 3, 4, 'w'); d.tri(5, 6, 4, 3, 'c'); d.r(9, 9, 4, 3, 'w'); d.p('w', 7, 12, 10, 13, 6, 14, 12, 14, 14, 12, 13, 10); d.p('l', 6, 3, 7, 4, 7, 9); d.r(14, 4, 2, 7, 'A'); d.p('r', 14, 3); }, SC);
add(G, E, 'ar-rainbow', 'Cầu vồng Họng Quỷ', 'The Devil\'s Throat rainbow', 'Ở thác Iguazú, hơi nước bốc lên cao, tạo ra cầu vồng gần như thường xuyên khi có nắng. Những con chim nhạn bay xuyên qua màn nước.',
  d => { d.bg('c'); d.fan(8, 13, 7, 'r'); d.fan(8, 13, 6, 'o'); d.fan(8, 13, 5, 'y'); d.fan(8, 13, 4, 'g'); d.fan(8, 13, 3, 'b'); d.fan(8, 13, 2, 'c'); d.r(0, 13, 16, 3, 'w'); d.p('l', 1, 12, 5, 12, 10, 12, 14, 12, 3, 11, 12, 11); d.p('k', 6, 8, 7, 7, 10, 6, 11, 5); }, SC);
add(G, E, 'ar-salinas', 'Hồ muối Salinas Grandes', 'Salinas Grandes salt flat', 'Cánh đồng muối trắng ở độ cao hơn 3.000 mét ở Jujuy, phản chiếu bầu trời sau mưa. Người dân địa phương thu hoạch muối thủ công.',
  d => { d.bg('c'); d.tri(0, 7, 6, 3, 'A'); d.tri(10, 6, 6, 4, 'a'); d.r(0, 10, 16, 6, 'w'); d.r(0, 10, 16, 1, 'W'); d.r(2, 12, 12, 3, 'c'); d.p('w', 4, 13, 9, 14, 11, 13); d.p('W', 1, 11, 6, 11, 12, 11, 14, 15, 3, 15); d.l(0, 15, 15, 15, 'W'); d.e(13, 3, 1.4, 1.4, 'y'); }, SC);
