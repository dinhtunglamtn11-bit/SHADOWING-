import { add, SC, setCC } from './pass-kit.js';
setCC('kr');
// Hàn Quốc · Nhóm 1: Nơi chốn và thiên nhiên
const G = 1, A = 'Địa danh', B = 'Mùa và thiên nhiên', C = 'Vùng miền', E = 'Hiện tượng đặc biệt';

// ----- Địa danh -----
add(G, A, 'kr-gyeongbokgung', 'Cung Gyeongbokgung (Seoul)', 'Gyeongbokgung Palace', 'Cung điện chính của triều Joseon, xây năm 1395 ở trung tâm Seoul. Trước cổng cung, lễ đổi gác của lính hoàng cung vẫn được tái hiện mỗi ngày.',
  d => { d.bg('c'); d.tri(0, 1, 16, 4, 'A'); d.r(1, 5, 14, 1, 'N'); d.r(2, 6, 12, 5, 'r'); d.r(2, 9, 12, 1, 'y'); d.r(3, 7, 2, 4, 'N'); d.r(7, 7, 2, 4, 'N'); d.r(11, 7, 2, 4, 'N'); d.r(0, 11, 16, 1, 'A'); d.r(0, 12, 16, 4, 'a'); d.r(6, 12, 4, 4, 'N'); d.p('y', 1, 1, 14, 1); d.p('g', 0, 4, 15, 4); }, SC);
add(G, A, 'kr-namsan', 'Tháp N Seoul (núi Namsan)', 'N Seoul Tower', 'Nằm trên đỉnh núi Namsan giữa Seoul. Các cặp đôi treo "khóa tình yêu" quanh tháp, trở thành biểu tượng lãng mạn của thành phố.',
  d => { d.bg('B'); d.e(8, 17, 12, 5, 'G'); d.r(7, 6, 2, 8, 'a'); d.r(5, 4, 6, 3, 'l'); d.r(5, 4, 6, 1, 'w'); d.r(7, 1, 2, 3, 'a'); d.p('r', 8, 0); d.p('y', 6, 5, 9, 5); d.p('p', 2, 10, 4, 11, 12, 10, 13, 12); d.p('y', 3, 9, 13, 9); d.p('w', 1, 2, 14, 3, 11, 1); }, SC);
add(G, A, 'kr-bukchon', 'Làng cổ Bukchon Hanok (Seoul)', 'Bukchon Hanok Village', 'Khu phố giữa Seoul, nơi hàng trăm nhà hanok mái ngói cong nằm san sát giữa những tòa nhà hiện đại. "Bukchon" nghĩa là "làng phía bắc".',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'a'); d.tri(0, 4, 8, 3, 'K'); d.r(1, 7, 6, 5, 'e'); d.r(2, 8, 2, 4, 'N'); d.tri(8, 6, 8, 3, 'K'); d.r(9, 9, 6, 3, 'e'); d.r(11, 10, 2, 2, 'N'); d.r(0, 11, 16, 1, 'n'); d.p('A', 5, 3, 12, 5); d.r(13, 0, 3, 5, 'a'); d.p('w', 14, 1, 14, 3); }, SC);
add(G, A, 'kr-bulguksa', 'Chùa Bulguksa (Gyeongju)', 'Bulguksa Temple', 'Chùa ở Gyeongju, được UNESCO công nhận di sản thế giới năm 1995 cùng hang đá Seokguram, nổi tiếng với các bậc thang đá và hai ngọn tháp đá cổ.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'a'); d.r(1, 9, 14, 3, 'W'); d.r(1, 9, 14, 1, 'w'); d.r(3, 5, 10, 4, 'r'); d.tri(1, 2, 14, 3, 'A'); d.r(5, 6, 2, 3, 'N'); d.r(9, 6, 2, 3, 'N'); d.r(2, 12, 12, 1, 'a'); for (let i = 0; i < 5; i++) d.r(2 + i, 12 + (i % 2), 12 - i * 2, 1, i % 2 ? 'A' : 'W'); d.p('y', 7, 0, 8, 0); }, SC);
add(G, A, 'kr-dmz', 'Khu phi quân sự DMZ', 'Korean Demilitarized Zone (DMZ)', 'Dải đất rộng khoảng 4 km chia đôi bán đảo từ sau hiệp định đình chiến năm 1953. Vì vắng người nhiều thập kỷ, nơi đây trở thành khu sinh thái hoang dã hiếm có.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'h'); d.r(0, 10, 16, 1, 'g'); for (let x = 0; x < 16; x += 3) { d.r(x, 6, 1, 6, 'A'); } d.r(0, 7, 16, 1, 'a'); d.r(0, 9, 16, 1, 'a'); d.p('k', 1, 8, 4, 8, 7, 8, 10, 8, 13, 8); d.e(12, 3, 2, 1.5, 'w'); d.l(3, 14, 5, 12, 'G'); d.l(11, 15, 13, 12, 'G'); d.p('r', 8, 13); }, SC);
add(G, A, 'kr-haeinsa', 'Chùa Haeinsa (Tripitaka Koreana)', 'Haeinsa Temple (Tripitaka Koreana)', 'Ngôi chùa trên núi Gayasan giữ hơn 80.000 mộc bản kinh Phật Tripitaka Koreana, khắc từ thế kỷ 13 và được UNESCO công nhận.',
  d => { d.bg('G'); d.r(1, 4, 14, 9, 'n'); d.r(1, 4, 14, 1, 'N'); for (let y = 6; y < 13; y += 2) { d.r(2, y, 12, 1, 'N'); } for (let x = 3; x < 14; x += 3) { d.r(x, 5, 1, 8, 't'); } d.tri(0, 0, 16, 4, 'A'); d.r(0, 13, 16, 3, 'a'); d.p('y', 8, 0); }, SC);

// ----- Mùa và thiên nhiên -----
add(G, B, 'kr-jinhae', 'Hoa anh đào Jinhae', 'Jinhae cherry blossoms', 'Lễ hội hoa anh đào ở Jinhae mỗi đầu tháng 4, với cả con đường phủ kín hoa. Hoa nở nhanh rồi rụng nên mỗi năm người ta theo dõi dự báo ngày nở.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'a'); d.r(0, 12, 16, 1, 'W'); d.e(4, 5, 5, 4.4, 'p'); d.e(12, 5, 5, 4.4, 'x'); d.e(8, 3, 4, 3, 'p'); d.r(3, 8, 2, 5, 'N'); d.r(11, 8, 2, 5, 'N'); d.p('w', 6, 3, 10, 6, 2, 9, 14, 10, 8, 11); d.p('p', 5, 13, 9, 14, 12, 13, 3, 15); }, SC);
add(G, B, 'kr-danpung', 'Lá đỏ mùa thu (danpung)', 'Autumn foliage (danpung)', 'Mùa thu, lá đổi màu đỏ vàng từ núi Seoraksan ở phía bắc xuống phía nam. Người Hàn gọi là danpung và rủ nhau đi leo núi ngắm lá.',
  d => { d.bg('c'); d.tri(0, 4, 16, 9, 'A'); d.tri(5, 4, 6, 3, 'w'); d.r(0, 11, 16, 5, 'o'); for (let y = 8; y < 16; y++) for (let x = (y * 3) % 4; x < 16; x += 3) d.put(x, y, (x + y) % 3 ? 'r' : (x + y) % 2 ? 'y' : 'O'); d.p('G', 2, 10, 13, 9); }, SC);
add(G, B, 'kr-pyeongchang', 'Tuyết ở Pyeongchang', 'Snow in Pyeongchang', 'Vùng núi Gangwon tuyết dày, từng tổ chức Thế vận hội mùa đông 2018 tại Pyeongchang.',
  d => { d.bg('l'); d.tri(0, 4, 12, 10, 'w'); d.tri(6, 2, 10, 12, 'W'); d.tri(7, 2, 3, 3, 'w'); d.r(0, 13, 16, 3, 'w'); d.tri(10, 6, 4, 5, 'G'); d.tri(1, 9, 4, 4, 'G'); d.p('c', 3, 3, 12, 1, 14, 5, 5, 6, 9, 8, 1, 7); d.l(13, 14, 15, 11, 'b'); d.p('r', 15, 11); }, SC);
add(G, B, 'kr-jangma', 'Mùa mưa (jangma)', 'Rainy season (jangma)', 'Kéo dài từ cuối tháng 6 đến tháng 7, ẩm và dai dẳng. Ngày mưa người Hàn thường nhâm nhi bánh chiên jeon cùng rượu makgeolli.',
  d => { d.bg('A'); d.e(5, 3.5, 4, 2.4, 'a'); d.e(10.5, 3, 4.5, 2.8, 'l'); for (const x of [2, 5, 8, 11, 14]) d.l(x, 7, x - 1, 10, 'c'); d.r(5, 11, 6, 4, 'e'); d.r(4, 10, 8, 1, 'r'); d.l(8, 10, 8, 15, 'N'); d.p('c', 1, 13, 14, 14); }, SC);
add(G, B, 'kr-yuchae', 'Hoa cải dầu ở Jeju', 'Canola flowers of Jeju', 'Mỗi mùa xuân, đảo Jeju phủ vàng những cánh đồng hoa cải dầu (yuchae) bên bờ biển xanh.',
  d => { d.bg('c'); d.r(0, 6, 16, 3, 'C'); d.r(0, 8, 16, 8, 'y'); for (let y = 9; y < 16; y++) for (let x = y % 2; x < 16; x += 2) d.put(x, y, (x * y) % 5 === 0 ? 'g' : 'Y'); d.r(0, 8, 16, 1, 'g'); d.e(13, 2.5, 1.6, 1.6, 'o'); d.tri(1, 4, 5, 3, 'G'); }, SC);

// ----- Vùng miền -----
add(G, C, 'kr-seoul', 'Seoul', 'Seoul', 'Thủ đô từ thời Joseon, sông Hàn chảy qua giữa thành phố. Khoảng một nửa dân cả nước sống trong vùng thủ đô Seoul.',
  d => { d.bg('B'); d.r(0, 9, 5, 7, 'K'); d.r(5, 6, 4, 10, 'A'); d.r(9, 8, 3, 8, 'K'); d.r(12, 5, 4, 11, 'A'); d.p('y', 1, 10, 3, 12, 6, 8, 7, 11, 10, 10, 13, 7, 14, 10, 13, 13, 6, 14); d.r(0, 14, 16, 2, 'C'); d.r(0, 14, 16, 1, 'c'); d.p('w', 2, 2, 12, 1, 9, 3); }, SC);
add(G, C, 'kr-busan', 'Busan', 'Busan', 'Thành phố cảng lớn thứ hai cả nước, nổi tiếng với bãi biển Haeundae, chợ cá Jagalchi và liên hoan phim quốc tế.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'C'); d.r(0, 10, 16, 1, 'c'); d.r(2, 6, 10, 4, 'w'); d.r(1, 9, 12, 2, 'r'); d.r(5, 4, 2, 2, 'a'); d.r(9, 5, 2, 1, 'a'); d.l(14, 3, 14, 9, 'a'); d.l(14, 3, 11, 5, 'a'); d.p('y', 3, 7, 6, 7, 9, 7); d.p('w', 3, 13, 9, 14, 13, 13); }, SC);
add(G, C, 'kr-gyeongju', 'Gyeongju', 'Gyeongju', 'Kinh đô của vương quốc Silla suốt gần nghìn năm, được gọi là "bảo tàng không mái che" với lăng mộ, chùa và đài thiên văn cổ Cheomseongdae.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.e(3, 14, 4, 3, 'G'); d.e(13, 14, 4, 3, 'G'); d.r(5, 6, 6, 7, 'W'); d.e(8, 6, 3, 1.4, 'W'); d.r(6, 5, 4, 1, 'w'); d.r(7, 8, 2, 2, 'k'); d.r(6, 12, 4, 1, 'a'); d.p('y', 12, 2, 2, 3); }, SC);
add(G, C, 'kr-jeju', 'Đảo Jeju', 'Jeju Island', 'Đảo núi lửa ở phía nam, có núi Hallasan, hang dung nham và những nữ thợ lặn haenyeo. UNESCO công nhận cảnh quan núi lửa của đảo năm 2007.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(0, 12, 16, 1, 'c'); d.tri(3, 4, 10, 8, 'A'); d.tri(6, 4, 4, 2, 'w'); d.r(0, 11, 16, 1, 'N'); d.e(13, 3, 1.5, 1.5, 'y'); d.p('d', 1, 10, 3, 9, 14, 10); }, SC);
add(G, C, 'kr-jeonju', 'Jeonju', 'Jeonju', 'Thành phố ẩm thực, quê hương của món bibimbap, có làng hanok nổi tiếng.',
  d => { d.bg('c'); d.tri(1, 3, 14, 4, 'K'); d.r(2, 7, 12, 5, 'e'); d.r(4, 8, 2, 4, 'N'); d.r(7, 8, 2, 4, 'N'); d.r(10, 8, 2, 4, 'N'); d.r(0, 12, 16, 4, 'a'); d.e(8, 14.5, 3, 1.5, 'w'); d.p('r', 7, 14); d.p('g', 9, 14); d.p('y', 8, 15); }, SC);

// ----- Hiện tượng đặc biệt -----
add(G, E, 'kr-hwangsa', 'Bụi vàng (hwangsa)', 'Yellow dust (hwangsa)', 'Mùa xuân, bụi vàng thổi từ sa mạc Mông Cổ và miền bắc Trung Quốc về, đôi khi phủ mờ cả bầu trời Hàn Quốc.',
  d => { d.bg('Y'); d.r(0, 0, 16, 6, 'u'); d.r(0, 12, 16, 4, 'O'); for (let y = 2; y < 12; y += 2) for (let x = (y % 4); x < 16; x += 4) d.r(x, y, 3, 1, 'o'); d.r(2, 8, 4, 4, 'a'); d.r(3, 6, 2, 2, 'a'); d.r(10, 9, 4, 3, 'A'); d.e(8, 4, 2, 2, 'y'); }, SC);
add(G, E, 'kr-jindo', 'Biển rẽ đôi ở Jindo', 'Jindo sea parting', 'Vào những ngày thủy triều rất lớn, con đường giữa đảo Jindo và đảo Modo lộ ra như biển rẽ đôi. Lễ hội "Biển rẽ đôi" được tổ chức mỗi năm.',
  d => { d.bg('c'); d.r(0, 5, 16, 11, 'C'); d.r(0, 5, 16, 1, 'c'); d.tri(0, 2, 5, 4, 'G'); d.tri(11, 2, 5, 4, 'G'); d.r(5, 7, 6, 9, 't'); d.r(5, 7, 1, 9, 'W'); d.r(10, 7, 1, 9, 'W'); d.p('w', 1, 8, 14, 9, 2, 12, 13, 13, 8, 9, 8, 12); d.p('n', 7, 8, 9, 10, 7, 12, 9, 14); }, SC);
add(G, E, 'kr-manjanggul', 'Hang dung nham Manjanggul', 'Manjanggul lava tube', 'Ống dung nham dài hàng km trên đảo Jeju, một trong những hang dung nham đẹp nhất thế giới.',
  d => { d.bg('k'); d.e(8, 9, 8, 7, 'A'); d.e(8, 9, 6, 5.4, 'K'); d.e(8, 10, 4, 4, 'k'); d.r(0, 13, 16, 3, 'A'); d.p('o', 7, 6, 8, 8, 9, 5, 5, 8, 11, 8); d.p('r', 8, 12, 4, 13, 12, 13); d.p('a', 2, 4, 13, 3, 6, 2); }, SC);
add(G, E, 'kr-hallasan', 'Núi Hallasan', 'Mount Hallasan', 'Núi lửa đã ngủ ở trung tâm Jeju, cao 1.947 m, là đỉnh cao nhất Hàn Quốc.',
  d => { d.bg('c'); d.tri(1, 4, 14, 10, 'G'); d.r(5, 4, 6, 1, 'A'); d.e(8, 4.5, 2.4, 1, 'C'); d.r(0, 13, 16, 3, 'g'); d.tri(4, 9, 3, 4, 'g'); d.e(13, 2.5, 1.5, 1.5, 'y'); d.p('w', 1, 3, 10, 2); }, SC);
