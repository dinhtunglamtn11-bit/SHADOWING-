import { add, SC, setCC } from './pass-kit.js';
setCC('vn');
// Việt Nam · Nhóm 1: Nơi chốn và thiên nhiên
const G = 1, A = 'Địa danh', B = 'Mùa và thiên nhiên', C = 'Vùng miền', E = 'Hiện tượng đặc biệt';

// ----- Địa danh -----
add(G, A, 'vn-halong', 'Vịnh Hạ Long (Quảng Ninh)', 'Ha Long Bay (Quang Ninh)', 'Gần 2.000 đảo đá vôi nhô lên từ mặt biển xanh ngọc, được UNESCO (Tổ chức Giáo dục, Khoa học và Văn hóa của Liên Hợp Quốc) công nhận là di sản thế giới năm 1994 và công nhận lần nữa năm 2000 vì giá trị địa chất.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'C'); d.r(0, 9, 16, 1, 'b'); d.tri(0, 3, 6, 7, 'G'); d.tri(5, 1, 6, 9, 'g'); d.tri(10, 4, 6, 6, 'G'); d.p('h', 7, 3, 8, 5); d.p('w', 2, 12, 8, 13, 13, 12); d.r(4, 12, 4, 1, 'N'); d.l(6, 11, 6, 9, 'n'); d.r(6, 9, 3, 2, 'r'); }, SC);
add(G, A, 'vn-phongnha', 'Phong Nha – Kẻ Bàng (Quảng Bình)', 'Phong Nha – Ke Bang (Quang Binh)', 'Vùng núi đá vôi với hàng trăm hang động, trong đó có Sơn Đoòng, được xem là một trong những hang động lớn nhất thế giới.',
  d => { d.bg('k'); d.e(8, 9, 7, 6, 'A'); d.e(8, 10, 5.4, 5, 'K'); d.e(8, 11, 3.6, 3.8, 'k'); d.tri(3, 0, 2, 4, 'a'); d.tri(7, 0, 3, 5, 'a'); d.tri(11, 0, 2, 3, 'a'); d.p('w', 8, 5, 4, 7, 12, 7); d.r(0, 13, 16, 3, 'C'); d.p('c', 3, 14, 10, 15); d.p('y', 8, 9); d.l(8, 10, 8, 12, 'y'); }, SC);
add(G, A, 'vn-trangan', 'Tràng An (Ninh Bình)', 'Trang An (Ninh Binh)', 'Quần thể núi đá, sông nước và hang động, nơi du khách ngồi thuyền nan lướt giữa những vách đá, từng là kinh đô Hoa Lư của nhà Đinh và nhà Tiền Lê.',
  d => { d.bg('c'); d.tri(0, 2, 7, 9, 'G'); d.tri(9, 3, 7, 8, 'G'); d.tri(3, 5, 5, 6, 'g'); d.r(0, 11, 16, 5, 'C'); d.e(8, 13, 3, 1, 'N'); d.r(7, 11, 2, 1, 'r'); d.l(8, 11, 8, 9, 'n'); d.p('s', 8, 8); d.p('w', 3, 14, 12, 14); d.r(5, 8, 6, 1, 'u'); }, SC);
add(G, A, 'vn-hoian', 'Phố cổ Hội An (Quảng Nam)', 'Hoi An Ancient Town (Quang Nam)', 'Thương cảng cổ với những ngôi nhà gỗ, đèn lồng và hội quán, được giữ gần như nguyên vẹn từ thế kỷ 17–18.',
  d => { d.bg('B'); d.r(0, 12, 16, 4, 'n'); d.r(1, 6, 6, 6, 'y'); d.tri(0, 3, 8, 3, 'N'); d.r(9, 7, 6, 5, 'u'); d.tri(8, 4, 8, 3, 'N'); d.r(3, 8, 2, 4, 'N'); d.r(11, 9, 2, 3, 'N'); for (const [x, y, c] of [[2, 2, 'r'], [7, 1, 'o'], [13, 2, 'p']]) { d.e(x, y, 1.4, 1.2, c); } d.p('y', 7, 5, 8, 6); }, SC);
add(G, A, 'vn-hue', 'Cố đô Huế', 'Hue Imperial City', 'Kinh đô của triều Nguyễn với Đại Nội, lăng tẩm và sông Hương, là kinh đô cuối cùng của chế độ quân chủ Việt Nam.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'C'); d.r(2, 8, 12, 5, 'r'); d.tri(0, 3, 16, 5, 'y'); d.r(0, 7, 16, 1, 'Y'); d.r(6, 9, 4, 4, 'R'); d.r(3, 9, 2, 2, 'u'); d.r(11, 9, 2, 2, 'u'); d.p('w', 2, 14, 9, 15, 13, 14); d.p('y', 8, 2); }, SC);
add(G, A, 'vn-myson', 'Thánh địa Mỹ Sơn (Quảng Nam)', 'My Son Sanctuary (Quang Nam)', 'Cụm đền tháp gạch của vương quốc Chăm Pa, nơi các vua Chăm tổ chức tế lễ trong nhiều thế kỷ.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.tri(3, 1, 10, 4, 'R'); d.r(4, 5, 8, 3, 'r'); d.r(3, 8, 10, 5, 'R'); d.r(6, 9, 4, 4, 'k'); d.p('o', 4, 6, 11, 6, 4, 10, 11, 10); d.tri(0, 6, 3, 7, 'r'); d.tri(13, 6, 3, 7, 'r'); }, SC);
add(G, A, 'vn-thanglong', 'Hoàng thành Thăng Long (Hà Nội)', 'Imperial Citadel of Thang Long (Hanoi)', 'Di tích của kinh đô qua nhiều triều đại, bắt đầu từ khi Lý Thái Tổ dời đô về Thăng Long năm 1010.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.r(2, 9, 12, 3, 'W'); d.r(2, 9, 12, 1, 'e'); d.r(6, 9, 4, 3, 'r'); d.r(7, 10, 2, 2, 'k'); d.l(8, 9, 8, 3, 'N'); d.r(8, 3, 4, 3, 'r'); d.p('y', 10, 4); d.r(0, 12, 16, 1, 'G'); d.r(3, 14, 10, 1, 'e'); }, SC);
add(G, A, 'vn-phocohn', 'Phố cổ Hà Nội', 'Hanoi Old Quarter', 'Khu phố 36 phố phường, mỗi phố từng chuyên một nghề như Hàng Bạc, Hàng Mã, Hàng Gai.',
  d => { d.bg('u'); d.r(0, 13, 16, 3, 'a'); d.r(0, 4, 5, 9, 'y'); d.r(5, 6, 5, 7, 'o'); d.r(10, 3, 6, 10, 'e'); d.p('k', 1, 6, 3, 6, 1, 9, 3, 9, 6, 8, 8, 8, 11, 6, 13, 6, 11, 9, 13, 9); d.r(10, 3, 6, 1, 'r'); d.p('g', 4, 3, 9, 5); d.l(0, 3, 15, 2, 'd'); }, SC);
add(G, A, 'vn-fansipan', 'Fansipan (Lào Cai)', 'Fansipan (Lao Cai)', 'Đỉnh núi cao 3.143 m, được gọi là "nóc nhà Đông Dương".',
  d => { d.bg('c'); d.tri(0, 7, 8, 8, 'A'); d.tri(4, 1, 9, 13, 'K'); d.tri(6, 1, 5, 5, 'w'); d.tri(10, 6, 6, 8, 'a'); d.r(0, 13, 16, 3, 'G'); d.p('l', 8, 6, 9, 8); d.p('w', 1, 4, 14, 3); }, SC);
add(G, A, 'vn-cuchi', 'Địa đạo Củ Chi', 'Cu Chi Tunnels', 'Mạng lưới đường hầm dưới lòng đất dài hàng trăm km, dùng trong thời kỳ chiến tranh.',
  d => { d.bg('c'); d.r(0, 5, 16, 11, 'n'); d.r(0, 5, 16, 1, 'g'); d.r(0, 0, 16, 5, 'c'); d.r(2, 9, 12, 2, 'k'); d.r(2, 9, 2, 6, 'k'); d.r(12, 9, 2, 6, 'k'); d.p('y', 7, 10); d.l(3, 3, 5, 5, 'g'); d.r(3, 5, 2, 1, 'k'); d.p('N', 1, 7, 9, 8, 13, 7); }, SC);
add(G, A, 'vn-phuquoc', 'Đảo Phú Quốc (Kiên Giang)', 'Phu Quoc Island (Kien Giang)', 'Đảo lớn nhất Việt Nam với bãi biển, rừng nguyên sinh và nghề làm nước mắm.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.r(0, 10, 16, 1, 'c'); d.e(8, 11, 6, 2, 'u'); d.l(8, 11, 8, 4, 'N'); d.l(8, 5, 4, 4, 'G'); d.l(8, 5, 12, 4, 'G'); d.l(8, 4, 5, 6, 'g'); d.l(8, 4, 11, 6, 'g'); d.e(13, 2, 1.4, 1.4, 'y'); d.p('w', 2, 14, 10, 14); }, SC);

// ----- Mùa và thiên nhiên -----
add(G, B, 'vn-daomai', 'Hoa đào và hoa mai', 'Peach and apricot blossoms', 'Miền Bắc đón Tết bằng cành đào hồng, miền Nam bằng mai vàng, mỗi bên một sắc màu nhưng cùng một ý chúc năm mới.',
  d => { d.bg('r'); d.l(0, 14, 6, 8, 'N'); d.l(6, 8, 7, 2, 'N'); d.l(6, 8, 12, 5, 'N'); for (const [x, y] of [[2, 11], [6, 6], [7, 3], [10, 6], [12, 4], [4, 9]]) { d.e(x, y, 1.5, 1.5, 'p'); } for (const [x, y] of [[9, 9], [13, 8], [11, 11], [14, 12]]) { d.e(x, y, 1.5, 1.5, 'y'); d.p('o', x, y); } d.p('y', 6, 6, 7, 3, 12, 4); }, SC);
add(G, B, 'vn-sen', 'Hoa sen', 'Lotus', 'Nở rộ vào mùa hè, được xem là biểu tượng của sự thanh cao, thường xuất hiện trong thơ ca, kiến trúc chùa và ẩm thực.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.e(3, 13, 3, 1.2, 'G'); d.e(13, 14, 3, 1.2, 'g'); d.l(8, 15, 8, 8, 'G'); d.e(8, 6, 3, 3, 'p'); d.e(8, 6, 1.6, 2.6, 'x'); d.p('P', 5, 6, 11, 6); d.p('y', 8, 7); d.e(8, 11, 2, 0.8, 'g'); }, SC);
add(G, B, 'vn-hoasua', 'Hoa sữa Hà Nội', 'Hanoi milk flowers (hoa sua)', 'Tháng mười, tháng mười một, hương hoa sữa nồng nàn phủ khắp những con phố, gắn với mùa thu của thủ đô.',
  d => { d.bg('u'); d.r(0, 13, 16, 3, 'a'); d.r(7, 6, 2, 8, 'N'); d.e(8, 4, 6, 3.6, 'G'); d.e(4, 6, 3, 2, 'g'); d.e(12, 6, 3, 2, 'g'); for (const [x, y] of [[4, 3], [8, 2], [11, 4], [6, 5], [10, 6], [3, 7], [13, 7]]) d.p('w', x, y); d.p('w', 2, 11, 6, 13, 12, 12, 14, 14); }, SC);
add(G, B, 'vn-phuong', 'Hoa phượng', 'Flame tree', 'Mùa hoa phượng đỏ rực đầu hè trùng với mùa thi và chia tay cuối cấp, nên rất nhiều học trò nhớ về nó.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'g'); d.r(7, 7, 2, 7, 'N'); d.e(8, 5, 6.4, 3.8, 'r'); d.e(4, 6, 3, 2, 'R'); d.e(12, 6, 3, 2, 'R'); d.p('G', 5, 4, 9, 3, 11, 5, 7, 6); d.p('o', 6, 3, 10, 4, 3, 5, 13, 5); d.p('r', 2, 13, 13, 13, 6, 15); }, SC);
add(G, B, 'vn-tamgiacmach', 'Hoa tam giác mạch (Hà Giang)', 'Buckwheat flowers (Ha Giang)', 'Khoảng tháng mười, tháng mười một, những triền đá cao nguyên phủ sắc hồng tím của hoa tam giác mạch.',
  d => { d.bg('c'); d.tri(0, 3, 9, 6, 'A'); d.tri(7, 4, 9, 5, 'a'); d.r(0, 9, 16, 7, 'p'); for (let y = 10; y < 16; y++) for (let x = y % 2; x < 16; x += 2) d.put(x, y, (x + y) % 3 ? 'P' : 'w'); d.r(0, 9, 16, 1, 'x'); d.p('w', 12, 2, 3, 1); }, SC);
add(G, B, 'vn-dalat', 'Dã quỳ và mai anh đào (Đà Lạt)', 'Wild sunflowers and cherry blossoms (Da Lat)', 'Dã quỳ vàng nở vào cuối năm, hoa mai anh đào nở vào đầu năm, làm Đà Lạt đổi màu theo mùa.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'G'); d.r(2, 6, 1, 6, 'N'); d.e(3, 5, 3.4, 3, 'p'); d.p('x', 2, 4, 4, 6); for (const x of [8, 11, 14]) { d.l(x, 15, x, 10, 'G'); d.e(x, 9, 1.8, 1.8, 'y'); d.p('O', x, 9); } d.p('P', 1, 3, 5, 4); }, SC);
add(G, B, 'vn-mucangchai', 'Mùa lúa chín Mù Cang Chải', 'Ripe rice at Mu Cang Chai', 'Ruộng bậc thang ở Yên Bái vàng rực vào khoảng tháng chín, tháng mười, một trong những cảnh đẹp nhất của Tây Bắc.',
  d => { d.bg('c'); d.tri(0, 2, 16, 14, 'Y'); for (let i = 0; i < 6; i++) { d.r(2 + i, 5 + i * 2, 12 - i, 1, i % 2 ? 'o' : 'y'); d.r(2 + i, 6 + i * 2, 12 - i, 1, 'O'); } d.p('w', 3, 2, 12, 1); d.e(13, 2, 1.2, 1.2, 'y'); }, SC);
add(G, B, 'vn-nuocnoi', 'Mùa nước nổi (miền Tây)', 'Flood season (Mekong Delta)', 'Khoảng tháng chín đến tháng mười một, nước từ sông Mê Kông dâng lên, mang theo cá, tôm và phù sa cho đồng bằng.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'C'); d.r(0, 8, 16, 1, 'b'); d.r(1, 5, 5, 3, 'e'); d.tri(0, 3, 7, 2, 'n'); d.r(10, 3, 1, 6, 'N'); d.e(10, 3, 2.2, 1.4, 'G'); d.e(8, 13, 3, 1, 'N'); d.r(7, 12, 2, 1, 'r'); d.p('w', 3, 11, 13, 12, 5, 15); d.p('o', 13, 14); }, SC);
add(G, B, 'vn-hoacaphe', 'Hoa cà phê Tây Nguyên', 'Coffee blossoms (Central Highlands)', 'Đầu năm, hoa cà phê nở trắng cả vùng, có hương thơm dịu, chỉ nở vài ngày.',
  d => { d.bg('n'); d.r(0, 13, 16, 3, 'N'); d.l(8, 15, 8, 5, 'G'); d.l(8, 10, 3, 6, 'G'); d.l(8, 8, 13, 4, 'G'); for (const [x, y] of [[3, 5], [8, 3], [13, 3], [5, 9], [11, 8], [8, 6]]) { d.e(x, y, 1.6, 1.6, 'w'); d.p('y', x, y); } d.p('g', 5, 11, 11, 12); }, SC);

// ----- Vùng miền -----
add(G, C, 'vn-taybac', 'Tây Bắc', 'The Northwest', 'Núi cao, ruộng bậc thang và nhiều dân tộc thiểu số như Thái, Mông, Dao.',
  d => { d.bg('c'); d.tri(0, 3, 9, 9, 'A'); d.tri(7, 1, 9, 11, 'K'); d.r(0, 11, 16, 5, 'g'); for (let i = 0; i < 3; i++) d.r(1 + i * 2, 11 + i, 14 - i * 4, 1, i % 2 ? 'h' : 'G'); d.p('w', 12, 2, 3, 2); d.p('r', 5, 9); }, SC);
add(G, C, 'vn-dongbac', 'Đông Bắc', 'The Northeast', 'Núi đá vôi, vịnh Hạ Long và các cao nguyên đá Hà Giang.',
  d => { d.bg('l'); d.tri(1, 3, 6, 10, 'a'); d.tri(7, 1, 6, 12, 'A'); d.tri(11, 5, 5, 8, 'a'); d.r(0, 12, 16, 4, 'C'); d.p('h', 4, 5, 9, 3); d.p('w', 2, 14, 12, 14); d.r(0, 12, 16, 1, 'c'); }, SC);
add(G, C, 'vn-dbsh', 'Đồng bằng sông Hồng', 'Red River Delta', 'Cái nôi của văn minh lúa nước và nghề thủ công, với Hà Nội là trung tâm.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'g'); for (let y = 10; y < 16; y += 2) d.r(0, y, 16, 1, 'h'); d.l(0, 15, 15, 11, 'C'); d.l(0, 14, 15, 10, 'b'); d.r(2, 5, 5, 4, 'e'); d.tri(1, 3, 7, 2, 'N'); d.e(12, 4, 1.4, 1.4, 'y'); d.p('G', 10, 8, 13, 9); }, SC);
add(G, C, 'vn-bactrungbo', 'Bắc Trung Bộ', 'The North Central Coast', 'Dải đất hẹp, nắng gió khắc nghiệt, quê hương của nhiều danh nhân, từ Nghệ An đến Quảng Bình.',
  d => { d.bg('Y'); d.r(0, 10, 16, 6, 'u'); d.tri(0, 7, 16, 4, 'O'); d.e(12, 3, 2.2, 2.2, 'o'); d.e(12, 3, 1, 1, 'y'); d.r(3, 10, 3, 3, 'N'); d.tri(2, 8, 5, 2, 'n'); d.p('o', 2, 14, 9, 13, 14, 15); }, SC);
add(G, C, 'vn-nambo-trung', 'Duyên hải Nam Trung Bộ', 'South Central Coast', 'Bờ biển dài, đồi cát và tháp Chăm, từ Đà Nẵng đến Bình Thuận.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(0, 11, 16, 1, 'c'); d.e(4, 13, 6, 3, 'u'); d.r(9, 4, 4, 7, 'R'); d.tri(9, 1, 4, 3, 'r'); d.r(10, 6, 2, 2, 'k'); d.p('o', 9, 9, 12, 9); d.p('w', 3, 3, 14, 13); }, SC);
add(G, C, 'vn-taynguyen', 'Tây Nguyên', 'Central Highlands', 'Cao nguyên đất đỏ bazan, rừng và cà phê, với văn hóa cồng chiêng của các dân tộc bản địa.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'R'); d.tri(0, 4, 16, 5, 'G'); for (let x = 0; x < 16; x += 2) d.p('g', x, 8); d.r(2, 11, 12, 1, 'o'); d.e(8, 12, 3, 3, 'y'); d.e(8, 12, 1.4, 1.4, 'Y'); d.p('w', 12, 2); d.e(13, 2, 1.2, 1.2, 'y'); }, SC);
add(G, C, 'vn-dongnambo', 'Đông Nam Bộ', 'The Southeast', 'Vùng kinh tế năng động, với Thành phố Hồ Chí Minh là đô thị lớn nhất cả nước.',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'A'); d.r(1, 8, 3, 5, 'a'); d.r(4, 4, 3, 9, 'A'); d.r(8, 2, 3, 11, 'a'); d.r(12, 6, 3, 7, 'A'); d.p('y', 2, 9, 5, 6, 5, 9, 9, 4, 9, 8, 13, 8, 13, 10); d.p('w', 1, 2, 14, 1); }, SC);
add(G, C, 'vn-dbscl', 'Đồng bằng sông Cửu Long', 'Mekong Delta', 'Vùng sông nước, vườn trái cây và chợ nổi, được gọi là vựa lúa của cả nước.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'C'); d.r(0, 8, 16, 1, 'b'); d.e(8, 11, 5, 1.6, 'n'); d.r(5, 7, 6, 4, 'o'); d.r(6, 6, 4, 1, 'y'); d.p('g', 7, 7, 9, 8); d.l(4, 12, 3, 6, 'G'); d.l(12, 12, 13, 5, 'G'); d.p('g', 3, 5, 13, 4, 2, 6, 14, 6); d.p('w', 2, 14, 11, 15); }, SC);

// ----- Hiện tượng đặc biệt -----
add(G, E, 'vn-bienmay', 'Biển mây (Tà Xùa, Y Tý, Sa Pa)', 'Sea of clouds (Ta Xua, Y Ty, Sa Pa)', 'Vào mùa lạnh, mây trắng tràn đầy thung lũng, bao quanh các đỉnh núi, thu hút nhiều người đi săn mây.',
  d => { d.bg('p'); d.r(0, 0, 16, 5, 'x'); d.r(0, 8, 16, 8, 'w'); d.tri(1, 4, 5, 6, 'A'); d.tri(9, 3, 6, 7, 'K'); d.e(4, 10, 5, 2, 'l'); d.e(12, 11, 5, 2, 'l'); d.e(8, 13, 8, 2, 'e'); d.e(13, 2, 1.6, 1.6, 'y'); }, SC);
add(G, E, 'vn-giolao', 'Gió Lào', 'Lao wind (gio Lao)', 'Gió nóng và khô thổi từ phía Tây vào các tỉnh miền Trung vào mùa hè, làm nhiệt độ tăng cao.',
  d => { d.bg('Y'); d.r(0, 12, 16, 4, 'O'); d.e(12, 3, 3, 3, 'r'); d.e(12, 3, 2, 2, 'o'); for (const y of [4, 7, 10]) { d.l(0, y, 8, y, 'w'); d.p('w', 9, y - 1, 10, y - 2); } d.p('N', 3, 11, 9, 13); }, SC);
add(G, E, 'vn-nom', 'Mưa phùn và nồm ẩm (miền Bắc)', 'Drizzle and humid "nom" (north)', 'Cuối đông đầu xuân, mưa phùn kéo dài và nồm làm tường, nền nhà ướt đẫm.',
  d => { d.bg('a'); d.r(0, 0, 16, 5, 'A'); d.e(4, 3, 4.4, 2, 'l'); d.e(11, 2, 4.6, 2, 'w'); for (let x = 1; x < 16; x += 3) for (let y = 6; y < 14; y += 4) d.p('c', x + (y % 8 ? 1 : 0), y, x + (y % 8 ? 1 : 0), y + 1); d.r(2, 11, 12, 5, 'W'); d.p('C', 4, 13, 7, 14, 11, 13); d.p('c', 5, 12, 10, 15); }, SC);
add(G, E, 'vn-tuyetsapa', 'Tuyết ở Sa Pa', 'Snow in Sa Pa', 'Tuyết hiếm khi rơi, nhưng khi rơi ở những đợt rét đậm, rất nhiều người kéo nhau lên xem.',
  d => { d.bg('A'); d.tri(0, 6, 8, 8, 'w'); d.tri(7, 4, 9, 10, 'l'); d.r(0, 13, 16, 3, 'w'); d.r(10, 9, 4, 4, 'e'); d.tri(9, 7, 6, 2, 'W'); d.p('w', 2, 1, 7, 3, 12, 2, 4, 5, 14, 5, 9, 1); d.p('c', 1, 3, 11, 1); }, SC);
add(G, E, 'vn-chonoi', 'Chợ nổi miền Tây', 'Floating market (Mekong)', 'Nhà cửa, ghe thuyền và chợ búa ở miền Tây gắn chặt với nhịp lên xuống của nước sông. Hàng hóa được treo trên cây bẹo để khách nhìn từ xa.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'C'); d.e(4, 11, 4, 1.6, 'n'); d.e(12, 12, 4, 1.6, 'N'); d.r(2, 8, 5, 3, 'o'); d.r(10, 9, 5, 3, 'g'); d.l(4, 8, 4, 1, 'N'); d.l(12, 9, 12, 2, 'N'); d.p('r', 4, 2, 4, 4, 12, 3, 12, 5); d.p('y', 3, 3, 13, 4); d.p('w', 1, 14, 8, 15); }, SC);
add(G, E, 'vn-muine', 'Đồi cát Mũi Né', 'Mui Ne sand dunes', 'Những đồi cát đỏ và trắng đổi hình theo gió, như một sa mạc nhỏ ngay cạnh biển.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.e(4, 13, 7, 4, 'u'); d.e(12, 14, 7, 4, 'o'); d.l(0, 12, 6, 9, 'o'); d.p('e', 3, 12, 9, 11, 14, 12); d.e(13, 3, 1.6, 1.6, 'y'); d.p('O', 6, 13, 11, 14); d.p('w', 2, 4, 8, 6); }, SC);
add(G, E, 'vn-bangioc', 'Thác Bản Giốc (Cao Bằng)', 'Ban Gioc Waterfall (Cao Bang)', 'Thác nước nằm trên biên giới Việt Nam – Trung Quốc, một trong những thác lớn nhất khu vực.',
  d => { d.bg('c'); d.r(0, 0, 16, 5, 'G'); d.r(0, 3, 16, 2, 'g'); d.r(2, 5, 12, 2, 'a'); d.r(3, 7, 10, 3, 'w'); d.r(5, 10, 6, 3, 'l'); d.r(1, 13, 14, 3, 'C'); d.p('w', 4, 8, 8, 9, 11, 8, 7, 12, 9, 14, 12, 13); d.r(0, 5, 2, 8, 'G'); d.r(14, 5, 2, 8, 'G'); }, SC);
add(G, E, 'vn-mui-doi', 'Mũi Đôi (Khánh Hòa)', 'Doi Cape (Khanh Hoa)', 'Điểm được cho là đón bình minh sớm nhất trên đất liền Việt Nam.',
  d => { d.bg('o'); d.r(0, 0, 16, 5, 'p'); d.r(0, 11, 16, 5, 'C'); d.e(8, 11, 4, 4, 'y'); d.r(0, 11, 16, 5, 'C'); d.r(0, 11, 16, 1, 'c'); d.tri(0, 8, 7, 5, 'G'); d.p('y', 3, 13, 8, 12, 12, 14); d.p('w', 12, 2, 3, 4); }, SC);
