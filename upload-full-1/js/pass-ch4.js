import { add, SC, setCC } from './pass-kit.js';
setCC('ch');
// Thụy Sĩ · Nhóm 4: Văn hóa và nghệ thuật
const G = 4, A = 'Lễ hội', B = 'Nhạc cụ và nghệ thuật biểu diễn', C = 'Hội họa và kiến trúc', E = 'Văn hóa hiện đại';
const H = { use: 'hold' };
const mask = (d, bg, f, ey) => { d.bg(bg); d.e(8, 8, 6, 7, f); d.r(4, 6, 3, 2, 'k'); d.r(9, 6, 3, 2, 'k'); d.p(ey, 5, 6, 10, 6); d.tri(7, 8, 2, 4, 'R'); d.r(5, 12, 6, 1, 'k'); };

// ----- Lễ hội -----
add(G, A, 'ch-basel', 'Fasnacht ở Basel (Basler Fasnacht)', 'Basel Fasnacht', 'Lễ hội hóa trang lớn nhất Thụy Sĩ, bắt đầu lúc 4 giờ sáng với đoàn diễu hành thắp đèn lồng lớn trong bóng tối. Ba ngày lễ hội có trống piccolo, mặt nạ và những bài châm biếm, và được UNESCO công nhận là di sản phi vật thể.',
  d => { d.bg('B'); d.r(1, 2, 14, 9, 'y'); d.r(2, 3, 12, 7, 'u'); d.e(8, 6, 2.4, 2.4, 'r'); d.r(7, 6, 2, 1, 'k'); d.p('k', 4, 5, 11, 5, 5, 8, 10, 8); d.l(8, 11, 8, 15, 'n'); d.p('y', 3, 1, 13, 1); d.p('w', 1, 14, 14, 13); }, SC);
add(G, A, 'ch-sechs-fest', 'Sechseläuten ở Zurich', 'Sechseläuten in Zurich', 'Lễ mừng mùa xuân, có diễu hành của các hội thợ thủ công và đốt hình nhân tuyết Böögg. Người ta tin thời gian đầu hình nhân nổ sớm hay muộn sẽ báo trước mùa hè.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'G'); d.e(8, 5, 2.4, 2.4, 'w'); d.e(8, 9, 3.2, 2.6, 'w'); d.p('k', 7, 5, 9, 5); d.tri(4, 7, 8, 7, 'o'); d.tri(6, 9, 4, 5, 'y'); d.p('r', 3, 5, 13, 6, 2, 9); d.p('y', 1, 12, 14, 11); }, SC);
add(G, A, 'ch-vignerons', 'Fête des Vignerons (Lễ hội người trồng nho)', 'Fête des Vignerons (Winegrowers\' Festival)', 'Tổ chức ở Vevey, chỉ khoảng 20 năm một lần và có hàng nghìn người biểu diễn. Đây cũng là di sản phi vật thể được UNESCO công nhận.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(2, 9, 12, 3, 'W'); for (let x = 3; x < 14; x += 3) { d.e(x, 7, 1.4, 1.4, 's'); d.r(x - 1, 8, 3, 3, x % 2 ? 'g' : 'y'); } d.e(8, 3, 2.2, 2, 'v'); d.e(6, 4, 1.2, 1.2, 'v'); d.e(10, 4, 1.2, 1.2, 'v'); d.p('G', 8, 1); }, SC);
add(G, A, 'ch-escalade', 'Escalade ở Geneva', 'Escalade in Geneva', 'Lễ tháng 12 kỷ niệm việc thành phố chống lại cuộc tấn công của công quốc Savoy năm 1602. Người ta mặc trang phục cổ, diễu hành và đập vỡ nồi canh bằng sô cô la.',
  d => { d.bg('k'); d.r(0, 12, 16, 4, 'a'); d.e(4, 8, 2, 2, 's'); d.r(3, 10, 3, 4, 'R'); d.l(7, 5, 12, 5, 'a'); d.r(6, 11, 6, 1, 'N'); d.e(11, 11, 3, 2.4, 'N'); d.e(11, 10, 2.4, 1.4, 'n'); d.p('y', 2, 3, 13, 2, 8, 2); d.p('r', 12, 8, 14, 9); }, SC);
add(G, A, 'ch-alpabzug', 'Alpabzug và Alpaufzug', 'Alpabzug and Alpaufzug (cattle processions)', 'Lễ đưa bò lên hoặc xuống núi, bò đeo chuông và hoa, người chăn mặc trang phục truyền thống. Lễ thường được tổ chức vào đầu mùa hè và cuối mùa thu.',
  d => { d.bg('c'); d.tri(7, 2, 9, 7, 'a'); d.r(0, 9, 16, 7, 'g'); d.e(5, 11, 3, 2, 'w'); d.p('k', 4, 10, 6, 11); d.r(3, 13, 1, 2, 'w'); d.r(6, 13, 1, 2, 'w'); d.p('r', 4, 9, 6, 9); d.p('y', 3, 12); d.e(11, 8, 1.2, 1.2, 's'); d.r(10, 9, 3, 4, 'y'); d.p('r', 14, 12, 1, 14); }, SC);
add(G, A, 'ch-unspunnen', 'Lễ hội Unspunnen', 'Unspunnen Festival', 'Lễ hội thể thao truyền thống ở Interlaken, có ném đá nặng, đấu vật và hát yodel. Những cuộc thi này giữ lại tinh thần dân núi thi đấu với nhau.',
  d => { d.bg('c'); d.tri(7, 1, 9, 8, 'a'); d.r(0, 11, 16, 5, 'g'); d.e(5, 8, 1.4, 1.4, 's'); d.r(4, 9, 3, 4, 'y'); d.r(4, 12, 1, 2, 'n'); d.r(6, 12, 1, 2, 'n'); d.e(11, 12, 2.2, 2, 'a'); d.p('A', 10, 12, 12, 13); d.p('w', 2, 3, 14, 5); d.l(8, 7, 11, 11, 'r'); }, SC);
add(G, A, 'ch-quockhanh', 'Quốc khánh 1/8', 'National Day (August 1)', 'Kỷ niệm việc ba bang đầu tiên lập liên minh theo truyền thống vào năm 1291. Người ta đốt lửa trên đỉnh núi và thắp đèn lồng.',
  d => { d.bg('B'); d.tri(1, 8, 14, 8, 'A'); d.tri(5, 4, 6, 5, 'K'); d.tri(6, 2, 4, 4, 'o'); d.tri(7, 3, 2, 3, 'y'); d.p('r', 2, 1, 13, 2); d.p('y', 6, 1, 10, 1, 3, 4); d.r(6, 12, 4, 4, 'r'); d.r(7, 13, 2, 1, 'w'); d.r(7, 12, 2, 3, 'w'); d.r(6, 13, 4, 1, 'w'); }, SC);
add(G, A, 'ch-montreux', 'Lễ hội nhạc Montreux Jazz', 'Montreux Jazz Festival', 'Sự kiện âm nhạc quốc tế tổ chức bên hồ Geneva mỗi mùa hè từ năm 1967. Nhiều nghệ sĩ lớn đã biểu diễn ở đây.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(0, 10, 16, 1, 'W'); d.tri(1, 3, 6, 7, 'a'); d.e(12, 3, 1.4, 1.4, 'y'); d.r(5, 5, 6, 2, 'Y'); d.l(7, 7, 7, 10, 'Y'); d.e(7, 10, 2, 1.4, 'Y'); d.l(11, 6, 14, 3, 'Y'); d.p('k', 4, 8, 12, 9); d.p('w', 2, 13, 9, 14); }, SC);

// ----- Nhạc cụ và nghệ thuật biểu diễn -----
add(G, B, 'ch-alphorn', 'Kèn alphorn', 'Alphorn', 'Chiếc kèn gỗ dài tới vài mét, đặt chéo xuống đất khi thổi, tạo tiếng vọng ấm và xa vào các thung lũng. Người chăn dùng nó để gọi bò và gửi tín hiệu giữa các đỉnh núi.',
  d => { d.bg('e'); d.l(2, 3, 14, 14, 'n'); d.l(3, 3, 14, 13, 'N'); d.l(1, 2, 3, 2, 'N'); d.r(12, 13, 3, 3, 'n'); d.e(14, 14, 1.8, 1.8, 'N'); d.p('Y', 6, 6, 10, 10, 8, 8); d.p('w', 1, 14, 5, 15); }, H);
add(G, B, 'ch-yodel', 'Yodel', 'Yodeling', 'Lối hát chuyển giọng liên tục giữa giọng ngực và giọng đầu, vốn là cách gọi nhau trên núi. Ngày nay có các nhóm hát yodel biểu diễn trong lễ hội.',
  d => { d.bg('c'); d.tri(0, 6, 8, 8, 'a'); d.tri(8, 4, 8, 10, 'A'); d.e(5, 8, 1.6, 1.6, 's'); d.r(4, 9, 3, 5, 'r'); d.r(4, 7, 3, 1, 'n'); d.e(5, 9, 0.8, 0.6, 'k'); d.p('y', 8, 7, 10, 5, 12, 3, 9, 9, 11, 7); d.p('w', 13, 2); d.r(0, 14, 16, 2, 'g'); }, SC);
add(G, B, 'ch-orgeli', 'Schwyzerörgeli và Schwägelpfeife', 'Schwyzerörgeli and Schwägelpfeife', 'Nhạc cụ dân gian (một loại đàn xếp và một loại sáo) đi cùng các điệu nhảy nông thôn. Chúng thường được chơi trong quán rượu và đám cưới.',
  d => { d.bg('e'); d.r(2, 4, 3, 8, 'R'); d.r(11, 4, 3, 8, 'R'); for (let x = 5; x < 11; x += 1) d.r(x, 5, 1, 6, x % 2 ? 'l' : 'a'); d.p('y', 3, 6, 3, 8, 12, 6, 12, 8); d.r(3, 5, 1, 1, 'k'); d.l(1, 14, 14, 14, 'n'); d.p('Y', 2, 14, 13, 14); }, H);
add(G, B, 'ch-hackbrett', 'Hackbrett', 'Hackbrett (hammered dulcimer)', 'Loại đàn dây gõ bằng dùi nhỏ, giống đàn tam thập lục, phổ biến ở Appenzell. Nhạc của nó vui tươi và thường đệm cho các ban nhạc dân gian.',
  d => { d.bg('e'); d.tri(1, 4, 14, 9, 'n'); d.r(1, 12, 14, 1, 'N'); for (let i = 0; i < 5; i++) d.l(4 + i, 6 + i % 2, 3 + i * 2, 12, 'l'); d.l(12, 1, 8, 7, 'k'); d.p('y', 12, 1, 5, 10, 9, 10); }, H);
add(G, B, 'ch-appenzellmusik', 'Nhạc Appenzell (Appenzeller Streichmusik)', 'Appenzeller Streichmusik', 'Ban nhạc nhỏ với viôlông, đàn contrabass và hackbrett, chơi những điệu nhảy nhẹ nhàng. Họ thường biểu diễn trong các lễ hội địa phương.',
  d => { d.bg('e'); for (const [x, c] of [[3, 'r'], [8, 'b'], [13, 'g']]) { d.e(x, 4, 1.4, 1.4, 's'); d.r(x - 1, 6, 3, 5, c); d.r(x - 1, 11, 1, 3, 'k'); d.r(x + 1, 11, 1, 3, 'k'); } d.l(2, 8, 5, 6, 'n'); d.e(9, 8, 1, 1.4, 'N'); d.r(12, 6, 2, 4, 'n'); d.p('w', 1, 15, 14, 15); }, SC);
add(G, B, 'ch-piccolo', 'Piccolo và trống Basel', 'Basel piccolo and drum', 'Trong Fasnacht, các nhóm "Cliquen" chơi sáo piccolo và trống với nhịp điệu riêng. Nghe từ xa giống như một đoàn quân hành quân.',
  d => { d.bg('e'); d.e(6, 10, 4.6, 3.8, 'r'); d.e(6, 9, 4.6, 2, 'w'); d.r(2, 9, 9, 3, 'r'); d.p('y', 3, 10, 5, 11, 7, 10, 9, 11); d.l(11, 3, 14, 1, 'k'); d.l(10, 2, 13, 5, 'k'); d.r(11, 11, 4, 1, 'N'); d.p('n', 12, 12, 14, 12); }, H);
add(G, B, 'ch-classic', 'Nhạc cổ điển và nhạc kịch', 'Classical music and opera', 'Thụy Sĩ có dàn nhạc Tonhalle ở Zurich và nhà hát Opernhaus lâu đời. Nhiều nhạc công quốc tế từng đến biểu diễn.',
  d => { d.bg('P'); d.r(0, 12, 16, 4, 'V'); d.r(2, 3, 12, 9, 'm'); d.r(3, 4, 10, 7, 'R'); d.e(8, 7, 3, 1.4, 'y'); d.p('Y', 4, 4, 11, 4, 4, 10, 11, 10); d.r(1, 3, 1, 9, 'y'); d.r(14, 3, 1, 9, 'y'); d.p('y', 8, 2, 7, 1, 9, 1); }, SC);
add(G, B, 'ch-knie', 'Cirque Knie', 'Cirque Knie', 'Gánh xiếc lâu đời nhất nước, hoạt động từ năm 1919 và đi khắp các thị trấn mỗi mùa hè. Nó là một phần quen thuộc của tuổi thơ nhiều người.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.tri(2, 3, 12, 6, 'r'); d.r(2, 9, 12, 5, 'w'); for (let x = 3; x < 14; x += 4) d.r(x, 9, 2, 5, 'r'); d.r(7, 10, 2, 4, 'k'); d.l(8, 3, 8, 1, 'k'); d.p('y', 9, 1, 10, 1); d.p('y', 3, 7, 12, 7); }, SC);

// ----- Hội họa và kiến trúc -----
add(G, C, 'ch-klee', 'Paul Klee', 'Paul Klee', 'Họa sĩ sinh ở Bern, nổi tiếng với tranh màu sắc dịu dàng và đường nét giống trẻ vẽ. Zentrum Paul Klee ở Bern lưu giữ nhiều tác phẩm của ông.',
  d => { d.bg('u'); d.r(2, 2, 12, 12, 'w'); d.r(3, 3, 4, 4, 'r'); d.r(8, 3, 5, 3, 'b'); d.r(3, 8, 3, 5, 'y'); d.r(7, 7, 6, 6, 'g'); d.e(10, 10, 1.6, 1.6, 'p'); d.l(3, 7, 12, 7, 'k'); d.l(7, 3, 7, 12, 'k'); d.p('v', 5, 11, 9, 5); }, SC);
add(G, C, 'ch-giacometti', 'Alberto Giacometti', 'Alberto Giacometti', 'Nhà điêu khắc gầy gò với những tượng người kéo dài, sinh ở vùng Graubünden gần biên giới Ý. Tác phẩm của ông được trưng bày ở Zurich và nhiều nơi trên thế giới.',
  d => { d.bg('e'); d.r(3, 14, 10, 2, 'a'); d.e(8, 2, 1, 1.2, 'A'); d.r(8, 3, 1, 10, 'A'); d.l(8, 5, 6, 9, 'A'); d.l(8, 5, 10, 9, 'A'); d.r(7, 12, 1, 2, 'A'); d.r(9, 12, 1, 2, 'A'); d.p('K', 8, 8); }, SC);
add(G, C, 'ch-corbu', 'Le Corbusier', 'Le Corbusier', 'Kiến trúc sư sinh ở La Chaux-de-Fonds, gắn với kiến trúc hiện đại. Một số công trình của ông được UNESCO công nhận.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'g'); d.r(2, 4, 12, 5, 'w'); for (const x of [3, 6, 9, 12]) d.r(x, 9, 1, 5, 'a'); d.r(3, 5, 3, 3, 'b'); d.r(7, 5, 3, 3, 'y'); d.r(11, 5, 2, 3, 'r'); d.r(1, 3, 14, 1, 'k'); }, SC);
add(G, C, 'ch-dada', 'Dada ở Zurich', 'Dada in Zurich', 'Phong trào nghệ thuật phản kháng ra đời tại Cabaret Voltaire năm 1916. Các nghệ sĩ tị nạn chiến tranh từng tụ họp ở đó và đưa ra những tác phẩm phi lý.',
  d => { d.bg('y'); d.e(5, 5, 3, 3, 'r'); d.r(8, 7, 6, 6, 'b'); d.tri(2, 9, 6, 5, 'k'); d.l(1, 15, 14, 1, 'w'); d.p('w', 4, 4, 5, 6); d.e(11, 3, 1.6, 1.6, 'k'); d.p('r', 11, 3); d.p('k', 9, 14, 13, 14); }, SC);
add(G, C, 'ch-oldbern', 'Thành phố cổ Bern', 'Old City of Bern', 'Khu phố cổ có những dãy hành lang vòm đá dài và tháp đồng hồ Zytglogge. Nó được UNESCO công nhận là di sản thế giới.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 't'); d.r(5, 2, 6, 10, 'e'); d.tri(5, 0, 6, 3, 'R'); d.e(8, 5, 2, 2, 'y'); d.e(8, 5, 1.2, 1.2, 'w'); d.l(8, 5, 8, 4, 'k'); d.l(8, 5, 9, 5, 'k'); for (const x of [0, 2, 11, 13]) { d.e(x + 1, 13, 1.2, 2, 'k'); } d.r(0, 11, 5, 1, 'a'); d.r(11, 11, 5, 1, 'a'); }, SC);
add(G, C, 'ch-kapellart', 'Cầu Kapellbrücke ở Lucerne', 'Kapellbrücke in Lucerne', 'Cây cầu gỗ có mái che nối hai bờ sông Reuss và có những tấm tranh treo trên mái. Một đám cháy năm 1993 làm hư hại nặng, sau đó cầu được xây lại.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.tri(0, 3, 16, 4, 'N'); d.r(0, 7, 16, 3, 'n'); for (const x of [2, 5, 8, 11, 14]) { d.r(x, 7, 2, 2, 'y'); d.p('r', x, 7); } d.l(0, 10, 15, 10, 'N'); for (const x of [2, 7, 12]) d.r(x, 10, 1, 4, 'N'); d.p('w', 4, 14, 10, 13); }, SC);
add(G, C, 'ch-belle', 'Khách sạn bên hồ kiểu Belle Époque', 'Belle Époque lakeside hotels', 'Những khách sạn sang trọng bên hồ ở Montreux, Lucerne và Geneva xây cuối thế kỷ 19. Chúng là dấu tích của thời du lịch núi non bùng nổ.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(1, 6, 14, 6, 'u'); d.tri(1, 4, 14, 3, 'a'); d.tri(6, 1, 4, 4, 'a'); d.p('y', 8, 0); for (let x = 2; x < 14; x += 2) { d.p('b', x, 8, x, 10); } d.r(7, 10, 2, 2, 'N'); d.p('r', 2, 7, 13, 7); d.p('w', 4, 14, 11, 13); }, SC);
add(G, C, 'ch-rhb', 'Đường sắt Rhætische Bahn', 'Rhaetian Railway', 'Tuyến Albula và Bernina với nhiều cầu vòm đá và đường hầm xoắn ốc. Tuyến được UNESCO công nhận là di sản thế giới.',
  d => { d.bg('c'); d.tri(7, 1, 9, 8, 'a'); d.tri(10, 1, 3, 3, 'w'); d.r(0, 11, 16, 5, 'G'); d.r(2, 7, 12, 1, 'a'); for (const x of [3, 8, 13]) { d.r(x - 1, 8, 2, 4, 'a'); } d.e(5, 11, 2, 2, 'c'); d.e(11, 11, 2, 2, 'c'); d.r(5, 5, 6, 2, 'r'); d.r(6, 5, 1, 1, 'c'); d.r(9, 5, 1, 1, 'c'); d.p('k', 6, 7, 9, 7); }, SC);

// ----- Văn hóa hiện đại -----
add(G, E, 'ch-swissstyle', 'Phong cách thiết kế Thụy Sĩ (Swiss Style)', 'Swiss Style design', 'Phông chữ không chân và bố cục dạng lưới, phát triển ở Zurich và Basel những năm 1950. Phông Helvetica nổi tiếng toàn cầu có nguồn gốc từ đây.',
  d => { d.bg('r'); d.r(2, 2, 12, 12, 'w'); d.r(3, 3, 4, 1, 'k'); d.r(3, 5, 6, 1, 'k'); d.r(3, 7, 2, 6, 'k'); d.r(6, 9, 7, 4, 'r'); d.r(10, 3, 3, 4, 'a'); d.p('k', 6, 7, 8, 7); }, SC);
add(G, E, 'ch-artbasel', 'Art Basel', 'Art Basel', 'Hội chợ nghệ thuật đương đại lớn nhất thế giới, tổ chức mỗi năm ở Basel từ năm 1970. Nó thu hút các nhà sưu tầm và phòng tranh từ nhiều nước.',
  d => { d.bg('e'); d.r(1, 2, 6, 5, 'k'); d.r(2, 3, 4, 3, 'r'); d.r(9, 2, 6, 6, 'k'); d.r(10, 3, 4, 4, 'b'); d.r(1, 9, 8, 5, 'k'); d.r(2, 10, 6, 3, 'y'); d.r(11, 10, 4, 4, 'k'); d.e(13, 12, 1.4, 1.4, 'g'); }, SC);
add(G, E, 'ch-cern', 'CERN và World Wide Web', 'CERN and the World Wide Web', 'Tổ chức nghiên cứu hạt nhân gần Geneva, nơi Tim Berners-Lee đề xuất web vào năm 1989. Người Thụy Sĩ cùng các nước đã góp phần xây dựng.',
  d => { d.bg('B'); d.e(8, 8, 7, 7, 'K'); d.e(8, 8, 5.6, 5.6, 'B'); d.e(8, 8, 3.8, 3.8, 'K'); d.e(8, 8, 2.4, 2.4, 'B'); d.p('c', 8, 1, 8, 14, 1, 8, 14, 8, 4, 4, 12, 12, 4, 12, 12, 4); d.p('y', 8, 8); d.l(8, 1, 14, 8, 'b'); }, SC);
add(G, E, 'ch-sport', 'Thể thao Thụy Sĩ', 'Swiss sports', 'Trượt tuyết, quần vợt với Roger Federer và bóng đá đều có nhiều người theo dõi. FIFA và Ủy ban Olympic Quốc tế cũng có trụ sở ở đây.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'w'); d.tri(0, 6, 8, 5, 'l'); d.e(11, 5, 2, 2, 'y'); d.e(5, 9, 1.4, 1.4, 's'); d.r(4, 10, 3, 3, 'r'); d.l(3, 14, 9, 13, 'k'); d.l(2, 12, 7, 10, 'a'); d.e(12, 12, 2, 2, 'g'); d.p('w', 12, 11); }, SC);
add(G, E, 'ch-locarno', 'Liên hoan phim Locarno', 'Locarno Film Festival', 'Liên hoan phim quốc tế tổ chức mỗi tháng 8 với màn hình lớn ngoài trời tại Piazza Grande. Giải thưởng cao nhất là Leopardo d\'Oro (Báo vàng).',
  d => { d.bg('k'); d.r(1, 2, 14, 8, 'w'); d.r(2, 3, 12, 6, 'a'); d.e(8, 6, 2.4, 2.4, 'y'); for (const [x, y] of [[7, 5], [9, 7], [8, 6]]) d.p('O', x, y); d.r(0, 11, 16, 5, 'K'); for (let x = 1; x < 15; x += 3) d.e(x, 13, 1, 1.2, 'a'); }, SC);
add(G, E, 'ch-books', 'Truyện tranh và văn học', 'Books and comics', 'Heidi của Johanna Spyri là cuốn sách thiếu nhi nổi tiếng nhất nước, còn Friedrich Dürrenmatt và Max Frisch là hai nhà văn kịch được nhắc đến nhiều.',
  d => { d.bg('e'); d.r(2, 3, 5, 10, 'R'); d.r(7, 3, 7, 10, 'b'); d.r(3, 4, 3, 1, 'y'); d.r(8, 5, 4, 1, 'w'); d.r(8, 7, 5, 1, 'w'); d.r(8, 9, 3, 1, 'w'); d.r(2, 13, 12, 1, 'k'); d.tri(3, 6, 3, 3, 'w'); }, SC);
add(G, E, 'ch-graphic', 'Thiết kế logo và đồ họa của Thụy Sĩ', 'Swiss graphic and logo design', 'Người Thụy Sĩ chú trọng sự sạch sẽ và dễ đọc, nên biển báo và poster thường rất gọn. Phong cách này được giảng dạy ở nhiều trường thiết kế.',
  d => { d.bg('w'); d.r(2, 2, 12, 12, 'r'); d.r(6, 4, 4, 8, 'w'); d.r(4, 6, 8, 4, 'w'); d.p('k', 1, 1, 14, 14); }, SC);
