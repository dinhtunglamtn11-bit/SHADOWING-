import { add, SC, setCC } from './pass-kit.js';
setCC('jp');
// Nhật Bản · Nhóm 1: Nơi chốn và thiên nhiên
const G1 = 1, S1 = 'Địa danh', S2 = 'Mùa và thiên nhiên', S3 = 'Vùng miền', S4 = 'Hiện tượng đặc biệt';

// ----- Địa danh -----
add(G1, S1, 'fuji', 'Núi Phú Sĩ (Fuji)', 'Mount Fuji', 'Cao 3.776 m, là đỉnh cao nhất Nhật Bản và là một núi lửa. Người Nhật gọi là Fuji-san và coi đây là ngọn núi thiêng.',
  d => { d.bg('c'); d.e(12.5, 3.5, 1.8, 1.8, 'r'); d.tri(0, 4, 16, 10, 'b'); d.tri(4, 4, 8, 4, 'w'); d.p('l', 6, 7, 9, 7, 7, 8); d.r(0, 13, 16, 3, 'g'); d.r(0, 14, 16, 1, 'G'); d.p('p', 2, 13, 5, 14, 12, 13); }, SC);
add(G1, S1, 'himeji', 'Lâu đài Himeji', 'Himeji Castle', 'Còn có tên Shirasagi-jo (lâu đài Diệc Trắng) vì vách tường trắng như cánh chim xòe. Tòa lâu đài gốc từ đầu thế kỷ 17 vẫn đứng nguyên đến nay.',
  d => { d.bg('c'); d.r(1, 12, 14, 4, 'a'); d.r(4, 8, 8, 4, 'w'); d.r(3, 7, 10, 1, 'A'); d.r(5, 4, 6, 3, 'w'); d.r(4, 3, 8, 1, 'A'); d.r(6, 1, 4, 2, 'w'); d.r(5, 1, 6, 1, 'A'); d.p('k', 7, 9, 9, 9, 7, 5, 9, 5, 7, 14, 9, 14); d.p('y', 8, 0); }, SC);
add(G1, S1, 'itsukushima', 'Đền Itsukushima (đảo Miyajima)', 'Itsukushima Shrine', 'Nổi tiếng với cổng torii đỏ "nổi" giữa biển mỗi khi thủy triều lên. Cả hòn đảo từng được coi là thần linh nên xưa kia không ai được sinh hay chết trên đảo.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'C'); d.r(0, 11, 16, 1, 'b'); d.r(1, 2, 14, 1, 'd'); d.r(2, 3, 12, 1, 'r'); d.r(3, 5, 10, 1, 'r'); d.r(4, 3, 1, 8, 'r'); d.r(11, 3, 1, 8, 'r'); d.r(2, 7, 12, 1, 'r'); d.r(5, 5, 1, 6, 'r'); d.r(10, 5, 1, 6, 'r'); d.r(4, 12, 1, 3, 'x'); d.r(11, 12, 1, 3, 'x'); d.r(0, 9, 16, 1, 'l'); }, SC);
add(G1, S1, 'kinkaku', 'Chùa Vàng Kinkaku-ji (Kyoto)', 'Kinkaku-ji, the Golden Pavilion', 'Hai tầng trên dát vàng lá, soi bóng xuống hồ. Tòa nhà hiện nay là bản xây lại năm 1955 sau khi một tăng sinh phóng hỏa đốt cháy bản cũ năm 1950.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(2, 9, 12, 2, 'n'); d.r(3, 6, 10, 3, 'y'); d.r(2, 5, 12, 1, 'N'); d.r(4, 3, 8, 2, 'Y'); d.r(3, 2, 10, 1, 'N'); d.tri(6, 0, 4, 2, 'y'); d.r(3, 12, 10, 2, 'Y'); d.r(4, 14, 8, 1, 'y'); d.p('k', 5, 7, 7, 7, 9, 7, 11, 7); d.p('g', 0, 10, 1, 10, 14, 10, 15, 10); }, SC);
add(G1, S1, 'fushimi', 'Đền Fushimi Inari (Kyoto)', 'Fushimi Inari Shrine', 'Hàng nghìn cổng torii đỏ nối nhau thành những đường hầm lên núi, mỗi cổng do một cá nhân hoặc doanh nghiệp dâng cúng.',
  d => { d.bg('R'); d.r(0, 14, 16, 2, 'a'); d.r(0, 0, 16, 3, 'd'); d.r(1, 3, 3, 13, 'r'); d.r(12, 3, 3, 13, 'r'); d.r(1, 5, 14, 2, 'r'); d.r(4, 3, 8, 2, 'R'); d.r(5, 7, 6, 8, 'R'); d.r(4, 7, 8, 1, 'd'); d.r(5, 7, 1, 7, 'r'); d.r(10, 7, 1, 7, 'r'); d.r(6, 9, 4, 1, 'd'); d.r(7, 10, 2, 4, 'a'); }, SC);
add(G1, S1, 'todaiji', 'Đại Phật điện Todai-ji (Nara)', 'Todai-ji Great Buddha Hall', 'Một trong những công trình gỗ lớn nhất thế giới, thờ tượng Phật đồng khổng lồ.',
  d => { d.bg('c'); d.r(2, 9, 12, 5, 't'); d.tri(0, 3, 16, 6, 'A'); d.r(1, 8, 14, 1, 'N'); d.r(2, 2, 12, 1, 'N'); d.p('y', 1, 2, 14, 2); d.r(3, 10, 2, 4, 'N'); d.r(7, 10, 2, 4, 'N'); d.r(11, 10, 2, 4, 'N'); d.r(0, 14, 16, 2, 'a'); d.r(5, 14, 6, 1, 'W'); }, SC);
add(G1, S1, 'genbaku', 'Vòm Genbaku (Hiroshima)', 'Atomic Bomb Dome', 'Tàn tích tòa nhà còn sót lại sau vụ ném bom nguyên tử năm 1945, nay là biểu tượng của hòa bình.',
  d => { d.bg('c'); d.r(4, 8, 8, 6, 'W'); d.p('k', 5, 9, 7, 9, 9, 9, 11, 9, 5, 11, 7, 11, 9, 11, 11, 11); d.e(8, 6.5, 3.5, 3, 'a'); d.e(8, 7.2, 2.4, 2.1, 'c'); d.r(7, 3, 2, 2, 'a'); d.r(3, 13, 10, 1, 'a'); d.r(0, 14, 16, 2, 'g'); d.p('w', 12, 2, 13, 3, 2, 4); }, SC);
add(G1, S1, 'skytree', 'Tháp Tokyo Skytree', 'Tokyo Skytree', 'Cao 634 m. Con số 634 đọc được là "Mu-sa-shi", tên cũ của vùng đất Tokyo xưa.',
  d => { d.bg('c'); d.r(7, 3, 2, 10, 'A'); d.tri(7, 0, 2, 4, 'a'); d.r(5, 6, 6, 2, 'a'); d.r(5, 6, 6, 1, 'w'); d.r(6, 9, 4, 1, 'a'); d.tri(4, 11, 8, 4, 'A'); d.r(0, 14, 16, 2, 'g'); d.p('r', 8, 0); }, SC);
add(G1, S1, 'shibuya', 'Ngã tư Shibuya (Tokyo)', 'Shibuya Crossing', 'Mỗi lần đèn xanh, hàng trăm người cùng băng qua từ mọi hướng, trở thành hình ảnh đặc trưng của Tokyo hiện đại.',
  d => { d.bg('B'); d.r(0, 1, 5, 9, 'K'); d.r(11, 0, 5, 10, 'K'); d.r(1, 2, 3, 2, 'r'); d.r(12, 2, 3, 2, 'c'); d.r(1, 5, 3, 1, 'y'); d.r(12, 5, 3, 1, 'p'); d.p('y', 1, 7, 3, 7, 1, 9, 12, 8, 14, 8); d.r(0, 10, 16, 6, 'd'); for (let i = 0; i < 4; i++) d.r(1 + i * 4, 11, 2, 4, 'w'); d.p('r', 7, 6, 8, 6); }, SC);

// ----- Mùa và thiên nhiên -----
add(G1, S2, 'sakura', 'Hoa anh đào (sakura)', 'Cherry blossoms (sakura)', 'Nở từ nam lên bắc, được báo như bản tin thời tiết ("mặt trận anh đào"). Mỗi cây chỉ rộ khoảng một tuần, nên người ta đi ngắm hoa (hanami) thật vội.',
  d => { d.bg('c'); d.l(0, 15, 9, 7, 'N'); d.l(1, 15, 10, 8, 'N'); d.l(6, 10, 12, 11, 'N'); d.l(8, 8, 8, 3, 'N'); d.e(5, 4.5, 3.2, 2.6, 'p'); d.e(11, 3.5, 3.2, 2.6, 'x'); d.e(13, 9, 2.4, 2, 'p'); d.e(3, 9, 2.2, 1.8, 'x'); d.p('w', 6, 3, 12, 2, 10, 5); d.p('p', 1, 13, 4, 14, 11, 13, 14, 15); }, SC);
add(G1, S2, 'momiji', 'Lá đỏ mùa thu (momiji, koyo)', 'Autumn leaves (momiji)', 'Màu đỏ lan từ miền bắc xuống miền nam vào mùa thu. Việc đi ngắm lá đỏ gọi là momiji-gari, cũng là một truyền thống lâu đời như ngắm hoa.',
  d => { d.bg('o'); d.tri(5, 1, 6, 5, 'r'); d.tri(0, 4, 7, 5, 'r'); d.tri(9, 4, 7, 5, 'r'); d.e(8, 8, 4, 3.5, 'r'); d.tri(4, 9, 8, 5, 'r'); d.l(8, 9, 8, 15, 'N'); d.p('R', 8, 4, 8, 6, 5, 7, 11, 7); }, { scene: true });
add(G1, S2, 'hokkaido-snow', 'Tuyết ở Hokkaido', 'Snow in Hokkaido', 'Tuyết rơi dày và khô, hút khách trượt tuyết. Tháng 2 hằng năm, thành phố Sapporo tổ chức lễ hội tuyết với những tượng băng khổng lồ.',
  d => { d.bg('l'); d.r(0, 12, 16, 4, 'w'); d.tri(1, 3, 6, 10, 'G'); d.tri(1, 3, 6, 3, 'w'); d.tri(8, 2, 7, 11, 'G'); d.tri(8, 2, 7, 3, 'w'); d.r(4, 12, 1, 2, 'N'); d.r(11, 12, 1, 2, 'N'); d.p('w', 1, 1, 6, 0, 13, 1, 15, 5, 4, 8); d.p('c', 14, 14, 2, 14); }, SC);
add(G1, S2, 'tsuyu', 'Mùa mưa (tsuyu)', 'Rainy season (tsuyu)', 'Kéo dài từ đầu tháng 6 đến khoảng giữa tháng 7, ẩm và dai dẳng, nhưng nhờ nó lúa và cẩm tú cầu mới tươi tốt.',
  d => { d.bg('A'); d.e(5, 3.5, 4, 2.5, 'a'); d.e(10, 3, 4.5, 2.8, 'l'); d.e(8, 4.5, 6, 2, 'a'); for (const x of [3, 6, 9, 12]) { d.l(x, 7, x - 1, 10, 'c'); } d.e(8, 12.5, 3, 2.5, 'v'); d.e(6, 12, 1.8, 1.6, 'b'); d.e(10.5, 12, 1.8, 1.6, 'p'); d.p('G', 3, 14, 13, 14, 8, 15); }, SC);
add(G1, S2, 'arashiyama', 'Rừng tre Arashiyama (Kyoto)', 'Arashiyama Bamboo Grove', 'Lối đi giữa những thân tre cao vút, nghe gió lướt qua tạo tiếng xào xạc mà người Nhật xếp vào danh sách "âm thanh cần được giữ gìn".',
  d => { d.bg('h'); for (const [x, w] of [[1, 3], [6, 2], [10, 3], [14, 2]]) { d.r(x, 0, w, 16, 'g'); d.r(x, 0, 1, 16, 'G'); for (const y of [3, 7, 11, 14]) d.r(x, y, w, 1, 'G'); } d.r(0, 14, 16, 2, 't'); d.p('G', 4, 5, 8, 9, 12, 2); }, SC);
add(G1, S2, 'semi', 'Ve sầu (semi)', 'Cicada (semi)', 'Tiếng ve kêu rền vang mỗi mùa hè là âm thanh quen thuộc đến mức xuất hiện cả trong thơ haiku nổi tiếng của Matsuo Basho.',
  d => { d.bg('c'); d.l(0, 14, 15, 11, 'N'); d.e(5, 6.5, 2.2, 4, 'l'); d.e(11, 6.5, 2.2, 4, 'l'); d.e(8, 7, 2.2, 4.5, 'N'); d.e(8, 3, 2.4, 1.8, 'G'); d.p('r', 7, 2, 9, 2); d.r(7, 9, 2, 1, 'n'); d.r(7, 11, 2, 1, 'n'); d.p('A', 5, 4, 5, 7, 11, 4, 11, 7); }, SC);
add(G1, S2, 'hitachi', 'Cánh đồng hoa Hitachi Seaside Park', 'Hitachi Seaside Park', 'Mùa xuân phủ một màu xanh nhạt của hoa nemophila, mùa thu đổi sang đỏ rực của cây kochia.',
  d => { d.bg('c'); d.r(0, 6, 16, 10, 'b'); d.r(0, 5, 16, 1, 'g'); d.e(3, 6, 4, 1.5, 'G'); for (let y = 7; y < 16; y++) for (let x = (y % 2); x < 16; x += 2) d.put(x, y, (x + y) % 4 === 0 ? 'c' : (x * y) % 5 === 0 ? 'w' : 'b'); d.e(13, 2.5, 1.6, 1.6, 'y'); }, SC);

// ----- Vùng miền -----
add(G1, S3, 'hokkaido', 'Hokkaido', 'Hokkaido', 'Đảo cực bắc, lạnh và rộng, nổi tiếng với tuyết, hải sản, sữa, và cánh đồng oải hương ở Furano.',
  d => { d.bg('c'); d.tri(1, 2, 9, 8, 'a'); d.tri(3, 2, 5, 3, 'w'); d.e(13, 3, 1.5, 1.5, 'y'); for (let y = 9; y < 16; y++) d.r(0, y, 16, 1, y % 2 ? 'v' : 'V'); d.p('w', 12, 11, 4, 13); }, SC);
add(G1, S3, 'tohoku', 'Tohoku (đông bắc Honshu)', 'Tohoku', 'Vùng lễ hội lửa, đèn lồng khổng lồ như Nebuta ở Aomori, và là quê hương của táo.',
  d => { d.bg('B'); d.r(3, 2, 10, 11, 'y'); d.r(2, 3, 1, 9, 'o'); d.r(13, 3, 1, 9, 'o'); d.r(4, 3, 8, 2, 'r'); d.r(5, 6, 2, 1, 'k'); d.r(9, 6, 2, 1, 'k'); d.r(5, 5, 2, 1, 'k'); d.r(9, 5, 2, 1, 'k'); d.r(7, 8, 2, 1, 'o'); d.r(6, 10, 4, 1, 'r'); d.p('w', 6, 11, 9, 11); d.r(5, 13, 6, 2, 'N'); d.p('y', 1, 1, 14, 1, 1, 14, 14, 14); }, SC);
add(G1, S3, 'kanto', 'Tokyo và vùng Kanto', 'Tokyo and the Kanto region', 'Thủ đô và trung tâm kinh tế, nơi nhiều cái "nhất" của đất nước tập trung lại.',
  d => { d.bg('c'); d.tri(5, 0, 6, 15, 'r'); d.r(6, 4, 4, 1, 'w'); d.r(6, 8, 4, 1, 'w'); d.r(6, 11, 4, 1, 'w'); d.l(6, 12, 8, 6, 'w'); d.l(10, 12, 8, 6, 'w'); d.r(0, 9, 4, 7, 'A'); d.r(12, 7, 4, 9, 'K'); d.p('y', 1, 11, 2, 13, 13, 9, 14, 11, 13, 13); d.r(0, 15, 16, 1, 'd'); }, SC);
add(G1, S3, 'kyoto', 'Kyoto', 'Kyoto', 'Cố đô, là kinh đô của Nhật Bản từ năm 794 cho đến khi dời về Tokyo năm 1868. Thành phố còn rất nhiều đền chùa, cung điện và khu phố cổ.',
  d => { d.bg('c'); const tiers = [[1, 5, 'A'], [3, 7, 'A'], [5, 9, 'A'], [7, 11, 'A'], [9, 13, 'A']]; d.r(7, 0, 2, 2, 'y'); for (let i = 0; i < 4; i++) { const y = 2 + i * 3, w = 6 + i * 2; d.r(8 - w / 2, y, w, 1, 'A'); d.r(8 - w / 2 + 1, y + 1, w - 2, 2, 'r'); } d.r(1, 14, 14, 2, 'a'); }, SC);
add(G1, S3, 'osaka', 'Osaka', 'Osaka', 'Được mệnh danh là "bếp ăn của Nhật Bản", với câu nói kuidaore (ăn đến khánh kiệt). Người Osaka vui tính, nói giọng riêng và nổi tiếng thẳng tính.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'K'); d.r(0, 10, 16, 1, 'y'); d.e(8, 6.5, 4.5, 3, 'r'); d.r(2, 2, 2, 3, 'r'); d.r(12, 2, 2, 3, 'r'); d.r(3, 5, 1, 2, 'r'); d.r(12, 5, 1, 2, 'r'); d.p('w', 6, 5, 10, 5); d.p('k', 6, 5, 10, 5); d.l(3, 8, 1, 10, 'r'); d.l(13, 8, 15, 10, 'r'); d.l(5, 9, 4, 11, 'R'); d.l(11, 9, 12, 11, 'R'); }, SC);
add(G1, S3, 'hiroshima', 'Hiroshima', 'Hiroshima', 'Thành phố hòa bình, vừa mang vết thương lịch sử vừa nổi tiếng với món okonomiyaki kiểu Hiroshima.',
  d => { d.bg('c'); d.e(8, 8.5, 3.5, 3, 'w'); d.e(5, 6.5, 3, 1.5, 'w'); d.e(11.5, 6, 2.5, 1.5, 'W'); d.tri(11, 2, 4, 2, 'w'); d.p('k', 6, 7); d.p('y', 4, 8, 3, 8); d.l(6, 11, 4, 14, 'G'); d.e(3, 13, 1.5, 1, 'g'); d.e(5.5, 14, 1.5, 1, 'g'); }, SC);
add(G1, S3, 'kyushu', 'Kyushu', 'Kyushu', 'Đảo phía nam nhiều núi lửa, như núi Aso, và nhiều suối nước nóng ở Beppu.',
  d => { d.bg('c'); d.tri(1, 5, 14, 10, 'A'); d.r(6, 5, 4, 1, 'd'); d.r(7, 4, 2, 1, 'r'); d.e(8, 2, 3, 1.6, 'a'); d.e(11, 1.5, 2.2, 1.4, 'l'); d.r(0, 14, 16, 2, 'g'); d.p('w', 3, 14, 12, 15); }, SC);
add(G1, S3, 'okinawa', 'Okinawa', 'Okinawa', 'Các đảo phía nam, vốn là Vương quốc Ryukyu độc lập, có văn hóa, tiếng nói và ẩm thực riêng. Võ karate bắt nguồn từ đây.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'C'); d.r(0, 10, 16, 1, 'c'); d.e(8, 11, 6, 2.2, 't'); d.l(8, 10, 9, 4, 'N'); d.tri(4, 2, 5, 3, 'g'); d.tri(9, 1, 5, 3, 'g'); d.p('G', 8, 3, 10, 2); d.e(13, 2.5, 1.5, 1.5, 'y'); d.r(2, 14, 12, 1, 'b'); }, SC);

// ----- Hiện tượng đặc biệt -----
add(G1, S4, 'onsen', 'Suối nước nóng (onsen)', 'Hot spring (onsen)', 'Nhật nằm trên vành đai lửa nên có hàng nghìn nguồn nước nóng. Quy tắc quen thuộc là tắm rửa sạch trước, rồi mới ngâm.',
  d => { d.bg('A'); d.r(1, 8, 14, 8, 'a'); d.r(2, 9, 12, 6, 'c'); d.r(2, 9, 12, 1, 'l'); d.p('A', 1, 8, 14, 8, 3, 15, 12, 15); for (const x of [4, 8, 12]) { d.l(x, 7, x - 1, 5, 'w'); d.l(x - 1, 5, x, 3, 'w'); d.l(x, 3, x - 1, 1, 'w'); } d.e(5, 11.5, 1.8, 1.4, 'n'); d.p('t', 5, 11); }, SC);
add(G1, S4, 'jishin', 'Động đất', 'Earthquakes', 'Mỗi năm có hơn một nghìn trận động đất đủ lớn để cảm nhận được. Vì vậy từ trường học đến nhà ga đều có diễn tập và hệ thống cảnh báo sớm.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'n'); d.r(0, 10, 16, 1, 'G'); d.l(4, 10, 6, 12, 'k'); d.l(6, 12, 5, 13, 'k'); d.l(5, 13, 8, 15, 'k'); d.l(11, 10, 10, 12, 'k'); d.l(10, 12, 12, 14, 'k'); d.r(5, 5, 6, 5, 'e'); d.tri(4, 2, 8, 3, 'r'); d.r(7, 7, 2, 3, 'N'); d.p('k', 1, 6, 1, 8, 14, 6, 14, 8, 2, 5, 13, 5); }, SC);
add(G1, S4, 'tsunami', 'Sóng thần (tsunami)', 'Tsunami', 'Từ này là tiếng Nhật, ghép "tsu" (bến cảng) và "nami" (sóng), vì ngày xưa ngư dân chỉ thấy sóng lớn khi trở về cảng.',
  d => { d.bg('e'); d.e(5, 11, 8, 7, 'C'); d.e(8, 8, 6, 5, 'b'); d.e(10, 6, 4, 3, 'C'); d.e(12, 5, 2.4, 2, 'l'); d.p('w', 13, 3, 14, 4, 11, 4, 9, 5, 7, 7, 5, 9, 3, 11); d.r(0, 14, 16, 2, 'B'); d.r(0, 13, 4, 1, 'b'); d.p('w', 14, 3, 12, 2); d.e(3, 3, 1.3, 1.3, 'r'); }, SC);
add(G1, S4, 'kazan', 'Núi lửa', 'Volcanoes', 'Phú Sĩ phun trào lần cuối năm 1707, còn núi lửa Sakurajima ở Kyushu vẫn thường xuyên phun tro lên thành phố Kagoshima gần đó.',
  d => { d.bg('A'); d.tri(1, 6, 14, 10, 'N'); d.r(6, 6, 4, 1, 'o'); d.r(7, 5, 2, 1, 'r'); d.l(8, 7, 5, 14, 'r'); d.l(8, 7, 11, 13, 'o'); d.e(7, 3, 3.5, 2.2, 'a'); d.e(11, 2.5, 3, 2, 'K'); d.e(4, 2, 2.4, 1.6, 'K'); d.p('o', 6, 4, 10, 5); }, SC);
add(G1, S4, 'taifu', 'Bão (taifu)', 'Typhoons (taifu)', 'Mỗi mùa hè thu có nhiều cơn bão đổ bộ, nên mái nhà, cửa sổ và hệ thống thoát nước của Nhật được thiết kế để chịu gió mạnh.',
  d => { d.bg('A'); d.e(8, 8, 7, 7, 'a'); d.e(8, 8, 5.2, 5.2, 'l'); d.e(8, 8, 3.2, 3.2, 'a'); d.e(8, 8, 1.3, 1.3, 'A'); d.spiral(8, 8, 1.6, 'K'); d.p('w', 2, 3, 13, 2, 14, 13, 3, 13); }, SC);
