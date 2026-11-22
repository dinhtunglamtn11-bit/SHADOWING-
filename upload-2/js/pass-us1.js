import { add, SC, setCC } from './pass-kit.js';
setCC('us');
// Hoa Kỳ · Nhóm 1: Nơi chốn và thiên nhiên
const G = 1, A = 'Địa danh', B = 'Mùa và thiên nhiên', C = 'Vùng miền', E = 'Hiện tượng đặc biệt';

// ----- Địa danh -----
add(G, A, 'us-liberty', 'Tượng Nữ thần Tự do', 'Statue of Liberty', 'Món quà của nước Pháp, khánh thành năm 1886 trên đảo ở cảng New York, từng là hình ảnh đầu tiên mà nhiều người nhập cư nhìn thấy.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'C'); d.r(5, 12, 6, 2, 'a'); d.r(6, 8, 4, 4, 'g'); d.r(6, 5, 4, 3, 'G'); d.e(8, 4, 2, 2, 'g'); d.l(7, 3, 6, 1, 'G'); d.l(8, 3, 8, 1, 'G'); d.l(9, 3, 10, 1, 'G'); d.l(10, 6, 12, 2, 'g'); d.r(11, 0, 2, 2, 'y'); d.p('y', 12, 0); d.l(6, 8, 4, 10, 'g'); }, SC);
add(G, A, 'us-ellis', 'Đảo Ellis', 'Ellis Island', 'Trạm kiểm tra nhập cư gần tượng Nữ thần Tự do, nơi hàng triệu người châu Âu đặt chân đến từ cuối thế kỷ mười chín.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(2, 7, 12, 4, 'R'); d.r(2, 6, 12, 1, 'W'); d.r(6, 4, 4, 3, 'R'); d.tri(5, 2, 6, 2, 'g'); d.p('w', 4, 8, 7, 8, 10, 8, 12, 8); d.r(7, 8, 2, 3, 'k'); d.p('w', 1, 13, 14, 14); d.e(8, 11, 7, 1, 'g'); }, SC);
add(G, A, 'us-timessquare', 'Times Square', 'Times Square', 'Giao lộ đầy biển quảng cáo ở Manhattan, nơi hàng triệu người xem quả cầu pha lê rơi đón giao thừa.',
  d => { d.bg('k'); d.r(0, 14, 16, 2, 'd'); d.r(0, 4, 6, 10, 'K'); d.r(10, 3, 6, 11, 'K'); d.r(1, 5, 4, 2, 'r'); d.r(1, 8, 4, 2, 'y'); d.r(11, 4, 4, 2, 'c'); d.r(11, 7, 4, 2, 'p'); d.r(11, 10, 4, 2, 'g'); d.p('w', 8, 1, 7, 2, 9, 2); d.e(8, 2, 1.4, 1.4, 'w'); d.l(8, 3, 8, 12, 'a'); d.p('y', 2, 12, 12, 13); }, SC);
add(G, A, 'us-whitehouse', 'Nhà Trắng và Điện Capitol', 'The White House and the Capitol', 'Nơi ở của Tổng thống và trụ sở Quốc hội ở Washington, D.C., trung tâm chính trị của cả nước.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(1, 8, 6, 5, 'w'); d.r(1, 7, 6, 1, 'l'); for (const x of [2, 4]) d.r(x, 9, 1, 4, 'W'); d.e(12, 6, 3, 2.4, 'w'); d.r(9, 8, 6, 5, 'w'); d.r(11, 2, 2, 2, 'l'); d.p('l', 12, 1); d.r(9, 8, 6, 1, 'W'); for (const x of [10, 12, 14]) d.r(x, 9, 1, 4, 'W'); d.p('r', 3, 5); d.l(3, 7, 3, 5, 'a'); }, SC);
add(G, A, 'us-mall', 'National Mall', 'National Mall', 'Dải công viên dài ở Washington với đài tưởng niệm Lincoln, Washington và Bảo tàng Smithsonian.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'g'); d.r(6, 12, 4, 4, 'C'); d.r(6, 11, 4, 1, 'w'); d.tri(7, 1, 2, 10, 'w'); d.r(7, 9, 2, 2, 'W'); d.r(1, 8, 4, 3, 'e'); d.tri(0, 6, 6, 2, 'W'); d.r(11, 8, 4, 3, 'e'); d.tri(10, 6, 6, 2, 'W'); d.p('r', 8, 1); }, SC);
add(G, A, 'us-goldengate', 'Cầu Cổng Vàng', 'Golden Gate Bridge', 'Cây cầu treo sơn màu cam đỏ ở San Francisco, mở năm 1937, thường chìm trong sương mù.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(0, 4, 16, 3, 'w'); d.r(3, 3, 2, 10, 'R'); d.r(11, 3, 2, 10, 'R'); d.r(3, 5, 2, 1, 'r'); d.r(11, 5, 2, 1, 'r'); d.l(0, 8, 4, 4, 'r'); d.l(4, 4, 8, 9, 'r'); d.l(8, 9, 12, 4, 'r'); d.l(12, 4, 15, 8, 'r'); d.r(0, 10, 16, 1, 'R'); d.p('w', 2, 14, 12, 14); }, SC);
add(G, A, 'us-grandcanyon', 'Grand Canyon', 'Grand Canyon', 'Hẻm núi khổng lồ ở bang Arizona do sông Colorado bào mòn, sâu hơn một nghìn tám trăm mét ở chỗ sâu nhất.',
  d => { d.bg('c'); d.r(0, 5, 16, 11, 'o'); d.r(0, 8, 16, 2, 'r'); d.r(0, 11, 16, 2, 'O'); d.r(0, 13, 16, 3, 'R'); d.tri(5, 6, 6, 10, 'k'); d.r(6, 13, 4, 3, 'C'); d.p('y', 1, 6, 14, 7, 2, 9, 13, 10); d.e(13, 2, 1.6, 1.6, 'y'); }, SC);
add(G, A, 'us-yosemite', 'Yosemite', 'Yosemite', 'Công viên ở California với vách đá granite El Capitan và Half Dome, thác nước và rừng thông cổ.',
  d => { d.bg('c'); d.r(0, 3, 6, 13, 'a'); d.r(0, 3, 6, 1, 'l'); d.e(11, 8, 5, 6, 'a'); d.r(6, 12, 10, 4, 'G'); d.l(6, 3, 6, 12, 'w'); d.l(7, 4, 7, 12, 'l'); d.tri(7, 10, 3, 6, 'g'); d.tri(11, 11, 4, 5, 'g'); d.p('w', 3, 1, 12, 2); }, SC);
add(G, A, 'us-yellowstone', 'Yellowstone', 'Yellowstone', 'Công viên quốc gia đầu tiên của nước Mỹ, nổi tiếng với mạch nước phun và suối nước nóng.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'u'); d.e(5, 13, 4, 2, 'c'); d.e(5, 13, 3, 1.4, 'C'); d.e(12, 13, 3, 1.4, 'o'); d.l(8, 11, 8, 4, 'w'); d.l(7, 10, 5, 6, 'w'); d.l(9, 10, 11, 6, 'w'); d.p('l', 8, 3, 6, 5, 10, 5); d.p('G', 1, 10, 15, 10); }, SC);
add(G, A, 'us-rushmore', 'Núi Rushmore', 'Mount Rushmore', 'Bốn bức tượng tổng thống khắc vào núi đá ở Nam Dakota, hoàn thành năm 1941, gây tranh cãi vì nằm trên vùng đất thiêng của người Lakota.',
  d => { d.bg('c'); d.r(0, 4, 16, 12, 'a'); d.r(0, 12, 16, 4, 'A'); for (const x of [1, 5, 9, 13]) { d.e(x + 1, 7, 1.6, 2, 'l'); d.p('k', x, 7, x + 1, 7); d.p('a', x + 1, 9); } d.tri(0, 11, 5, 5, 'G'); d.tri(11, 12, 5, 4, 'G'); d.p('w', 3, 1, 12, 2); }, SC);
add(G, A, 'us-niagara', 'Thác Niagara', 'Niagara Falls', 'Cụm thác nước chia sẻ với Canada, đứng ở biên giới giữa bang New York và tỉnh Ontario.',
  d => { d.bg('c'); d.r(0, 5, 16, 3, 'g'); d.r(0, 8, 16, 1, 'a'); d.r(2, 8, 12, 5, 'w'); d.r(4, 8, 8, 5, 'l'); d.r(0, 13, 16, 3, 'C'); d.p('w', 3, 14, 9, 15, 13, 14, 6, 12, 10, 12); d.p('C', 5, 10, 9, 11); d.p('l', 2, 4, 12, 3); d.p('r', 14, 2); }, SC);
add(G, A, 'us-monument', 'Monument Valley', 'Monument Valley', 'Thung lũng với những khối đá sa thạch đỏ khổng lồ trên đất của người Navajo, quen thuộc qua các bộ phim cao bồi.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'o'); d.r(2, 5, 4, 8, 'R'); d.r(1, 4, 6, 2, 'r'); d.r(9, 7, 5, 6, 'r'); d.r(9, 6, 5, 1, 'R'); d.r(0, 13, 16, 3, 'O'); d.p('N', 3, 8, 10, 10); d.e(13, 3, 1.6, 1.6, 'y'); d.p('G', 7, 14, 14, 15); }, SC);
add(G, A, 'us-hoover', 'Đập Hoover', 'Hoover Dam', 'Công trình bê tông lớn xây trên sông Colorado trong thời Đại suy thoái, hoàn thành năm 1936.',
  d => { d.bg('c'); d.tri(0, 3, 4, 10, 'o'); d.tri(12, 3, 4, 10, 'o'); d.r(3, 5, 10, 8, 'W'); d.r(3, 5, 10, 1, 'a'); for (let y = 7; y < 13; y += 2) d.r(3, y, 10, 1, 'e'); d.r(4, 13, 8, 3, 'C'); d.r(5, 4, 2, 1, 'A'); d.r(10, 4, 2, 1, 'A'); d.p('w', 6, 15, 9, 14); }, SC);
add(G, A, 'us-alcatraz', 'Đảo Alcatraz', 'Alcatraz Island', 'Nhà tù trên đảo ở vịnh San Francisco, nay là điểm tham quan.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.e(8, 11, 7, 3, 'a'); d.r(3, 6, 10, 5, 'e'); d.r(3, 5, 10, 1, 'a'); d.r(11, 2, 2, 4, 'W'); d.tri(10, 0, 4, 2, 'a'); d.p('k', 4, 7, 6, 7, 8, 7, 10, 7, 5, 9, 9, 9); d.p('w', 1, 14, 12, 14); d.p('a', 0, 10, 15, 10); }, SC);
add(G, A, 'us-hollywood', 'Bảng Hollywood', 'Hollywood Sign', 'Dòng chữ trắng trên đồi ở Los Angeles, biểu tượng của ngành điện ảnh.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'h'); d.tri(0, 5, 16, 8, 'g'); d.tri(3, 7, 10, 6, 'G'); d.r(1, 6, 1, 3, 'w'); d.r(3, 6, 1, 3, 'w'); d.r(2, 7, 1, 1, 'w'); d.r(5, 6, 2, 3, 'w'); d.r(8, 6, 1, 3, 'w'); d.r(10, 6, 2, 1, 'w'); d.r(10, 8, 2, 1, 'w'); d.r(13, 6, 1, 3, 'w'); d.r(0, 14, 16, 2, 'n'); d.p('y', 13, 1); }, SC);
add(G, A, 'us-spaceneedle', 'Tháp Space Needle', 'Space Needle', 'Tháp quan sát ở Seattle xây cho hội chợ thế giới năm 1962.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.l(8, 13, 8, 6, 'a'); d.l(6, 14, 8, 7, 'a'); d.l(10, 14, 8, 7, 'a'); d.e(8, 5, 5, 1.6, 'l'); d.e(8, 5, 5, 1, 'A'); d.r(7, 2, 2, 3, 'a'); d.l(8, 2, 8, 0, 'a'); d.p('r', 8, 0); d.p('w', 2, 3, 13, 4); }, SC);

// ----- Mùa và thiên nhiên -----
add(G, B, 'us-newengland', 'Lá đỏ mùa thu ở New England', 'New England fall foliage', 'Vào tháng chín, mười, rừng phong ở các bang Vermont, New Hampshire và Maine chuyển sang đỏ cam, thu hút đông du khách.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'n'); d.e(4, 7, 4, 4, 'r'); d.e(10, 6, 4, 4, 'o'); d.e(13, 9, 3, 3, 'y'); d.r(3, 10, 2, 4, 'N'); d.r(9, 9, 2, 5, 'N'); d.p('R', 3, 6, 10, 5); d.p('y', 5, 8, 11, 7); d.p('r', 1, 14, 12, 14); }, SC);
add(G, B, 'us-cherry', 'Hoa anh đào ở Washington, D.C.', 'Cherry blossoms in Washington, D.C.', 'Nhật Bản tặng cây anh đào cho thành phố từ năm 1912, nở rộ quanh hồ Tidal Basin vào cuối tháng ba.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(0, 10, 16, 1, 'g'); d.r(7, 3, 2, 7, 'N'); d.e(4, 4, 4, 3, 'p'); d.e(11, 4, 4, 3, 'x'); d.e(8, 2, 3, 2, 'p'); d.tri(13, 6, 3, 4, 'w'); d.p('w', 3, 7, 9, 8, 13, 6); d.p('p', 3, 13, 10, 14); }, SC);
add(G, B, 'us-hurricane', 'Mùa bão Đại Tây Dương', 'Atlantic hurricane season', 'Từ tháng sáu đến tháng mười một, bão nhiệt đới thường đổ vào Florida và vùng vịnh Mexico.',
  d => { d.bg('A'); d.e(8, 8, 6.4, 6.4, 'a'); d.e(8, 8, 5, 5, 'l'); d.e(8, 8, 3.4, 3.4, 'a'); d.e(8, 8, 1.8, 1.8, 'A'); d.e(8, 8, 0.9, 0.9, 'k'); d.l(8, 1, 12, 4, 'w'); d.l(15, 8, 12, 12, 'w'); d.l(8, 15, 4, 12, 'w'); d.l(1, 8, 4, 4, 'w'); }, SC);
add(G, B, 'us-tornadoseason', 'Mùa lốc xoáy ở Đồng bằng lớn', 'Tornado season on the Great Plains', 'Mùa xuân là mùa của những cơn dông và lốc xoáy mạnh ở vùng Trung Tây và miền Nam.',
  d => { d.bg('A'); d.r(0, 0, 16, 5, 'K'); d.r(0, 12, 16, 4, 'g'); d.tri(2, 4, 12, 3, 'a'); d.tri(4, 6, 9, 2, 'A'); d.tri(5, 8, 6, 1, 'a'); d.tri(6, 9, 4, 2, 'a'); d.r(7, 11, 2, 1, 'a'); d.p('y', 1, 3, 14, 2); d.p('w', 12, 11, 3, 14); }, SC);
add(G, B, 'us-cornfields', 'Cánh đồng ngô và lúa mì vùng Trung Tây', 'Midwest corn and wheat fields', 'Dải đất nông nghiệp trải rộng, được gọi là vựa lương thực của đất nước.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'y'); for (let y = 9; y < 16; y += 2) d.r(0, y, 16, 1, 'Y'); for (const x of [2, 6, 10, 14]) { d.l(x, 15, x, 8, 'G'); d.e(x, 7, 1, 1.6, 'y'); d.p('g', x - 1, 11, x + 1, 12); } d.e(13, 2, 1.6, 1.6, 'o'); d.r(0, 8, 16, 1, 'g'); }, SC);
add(G, B, 'us-redwood', 'Rừng gỗ đỏ (redwood)', 'Redwood forest', 'Những cây cao nhất thế giới mọc dọc bờ biển California, có cây sống hơn hai nghìn năm.',
  d => { d.bg('G'); for (const x of [2, 7, 12]) { d.r(x, 0, 2, 16, 'R'); d.r(x, 0, 1, 16, 'r'); d.r(x - 1, 0, 4, 2, 'g'); } d.r(0, 14, 16, 2, 'N'); d.p('h', 4, 3, 9, 5, 14, 2); d.p('y', 5, 7, 10, 8); }, SC);
add(G, B, 'us-saguaro', 'Xương rồng saguaro', 'Saguaro cactus', 'Loài xương rồng cao hình cánh tay đặc trưng của sa mạc Sonoran ở Arizona.',
  d => { d.bg('o'); d.r(0, 13, 16, 3, 'u'); d.r(7, 3, 3, 11, 'G'); d.r(7, 3, 1, 11, 'g'); d.r(3, 7, 4, 2, 'G'); d.r(3, 4, 2, 4, 'G'); d.r(10, 8, 4, 2, 'G'); d.r(12, 5, 2, 4, 'G'); d.e(8, 3, 1.6, 1, 'G'); d.p('p', 8, 2); d.e(13, 2, 1.6, 1.6, 'y'); }, SC);
add(G, B, 'us-greatlakes', 'Ngũ Đại Hồ', 'The Great Lakes', 'Năm hồ nước ngọt lớn ở phía bắc, chia sẻ với Canada, lớn đến mức giống như biển.',
  d => { d.bg('g'); d.e(5, 6, 4, 2.4, 'C'); d.e(11, 5, 4, 2.4, 'b'); d.e(9, 9, 3.4, 2, 'C'); d.e(6, 11, 3, 2, 'b'); d.e(12, 11, 2.4, 2, 'C'); d.p('c', 4, 6, 10, 5, 8, 9); d.p('w', 3, 14, 13, 3); }, SC);
add(G, B, 'us-mississippi', 'Sông Mississippi', 'Mississippi River', 'Dòng sông dài chảy từ phía bắc xuống vịnh Mexico, gắn với lịch sử buôn bán và âm nhạc miền Nam.',
  d => { d.bg('g'); d.l(8, 0, 6, 5, 'C'); d.l(6, 5, 10, 9, 'C'); d.l(10, 9, 8, 15, 'C'); d.l(9, 0, 7, 5, 'b'); d.l(7, 5, 11, 9, 'b'); d.l(11, 9, 9, 15, 'b'); d.r(2, 6, 3, 2, 'r'); d.r(2, 5, 3, 1, 'w'); d.p('N', 12, 3, 13, 12); d.p('h', 2, 11, 14, 7); }, SC);
add(G, B, 'us-rockies', 'Dãy Rocky', 'Rocky Mountains', 'Dãy núi chạy dọc phía tây, nơi trượt tuyết và đi bộ đường dài nổi tiếng.',
  d => { d.bg('c'); d.tri(0, 6, 8, 8, 'A'); d.tri(4, 2, 10, 12, 'K'); d.tri(6, 2, 6, 5, 'w'); d.tri(11, 6, 5, 8, 'a'); d.r(0, 13, 16, 3, 'G'); d.tri(1, 11, 3, 3, 'g'); d.p('w', 2, 7, 13, 8); }, SC);
add(G, B, 'us-snowne', 'Mùa đông có tuyết ở vùng Đông Bắc', 'Snowy winters in the Northeast', 'Bão tuyết lớn thỉnh thoảng làm tê liệt các thành phố.',
  d => { d.bg('l'); d.r(0, 12, 16, 4, 'w'); d.r(2, 7, 4, 5, 'e'); d.tri(1, 4, 6, 3, 'A'); d.r(10, 6, 5, 6, 'e'); d.tri(9, 3, 7, 3, 'A'); d.p('y', 3, 9, 12, 8); for (const [x, y] of [[1, 1], [5, 3], [9, 1], [13, 3], [7, 5], [3, 5], [11, 5]]) d.p('w', x, y); d.p('r', 4, 11); d.r(7, 10, 2, 3, 'N'); }, SC);

// ----- Vùng miền -----
add(G, C, 'us-newengland-reg', 'New England', 'New England', 'Sáu bang vùng đông bắc với các thị trấn nhỏ, đại học lâu đời như Harvard và truyền thống từ thời lập quốc.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(6, 6, 4, 7, 'w'); d.tri(5, 2, 6, 4, 'r'); d.r(7, 1, 2, 2, 'w'); d.r(1, 9, 4, 4, 'R'); d.tri(0, 7, 6, 2, 'N'); d.r(11, 9, 4, 4, 'R'); d.tri(10, 7, 6, 2, 'N'); d.p('y', 7, 8, 8, 10); d.r(7, 11, 2, 2, 'N'); }, SC);
add(G, C, 'us-midatlantic', 'Vùng Trung Đại Tây Dương', 'Mid-Atlantic', 'New York, Pennsylvania, New Jersey và Washington, D.C., khu đô thị dày đặc nhất.',
  d => { d.bg('B'); d.r(0, 14, 16, 2, 'a'); d.r(1, 8, 3, 6, 'K'); d.r(4, 4, 3, 10, 'A'); d.r(7, 6, 3, 8, 'K'); d.r(10, 2, 3, 12, 'A'); d.r(13, 7, 2, 7, 'K'); d.l(11, 2, 11, 0, 'a'); d.p('y', 2, 9, 5, 6, 5, 9, 8, 8, 11, 5, 11, 9, 14, 9, 5, 12, 11, 12); }, SC);
add(G, C, 'us-south', 'Miền Nam (the South)', 'The South', 'Vùng của bông, của nhạc blues và jazz, của ẩm thực riêng và một lịch sử nô lệ sâu đậm.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.r(3, 6, 10, 6, 'w'); d.tri(2, 3, 12, 3, 'N'); for (const x of [4, 7, 10]) d.r(x, 7, 1, 5, 'W'); d.r(7, 9, 2, 3, 'n'); d.p('w', 1, 12, 14, 13); d.e(14, 3, 1.6, 1.6, 'y'); for (const x of [1, 14]) d.p('w', x, 10, x, 11); }, SC);
add(G, C, 'us-midwest', 'Trung Tây (Midwest)', 'The Midwest', 'Vùng nông nghiệp với các thành phố như Chicago, Detroit, nổi tiếng với công nghiệp ô tô và thép.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'y'); d.r(1, 4, 3, 6, 'R'); d.tri(0, 2, 5, 2, 'N'); d.r(10, 5, 5, 5, 'a'); d.r(12, 2, 3, 3, 'A'); d.p('k', 11, 6, 13, 6); d.p('Y', 1, 12, 13, 13); d.r(5, 7, 4, 3, 'r'); d.p('w', 6, 8); }, SC);
add(G, C, 'us-plains', 'Đồng bằng lớn (Great Plains)', 'The Great Plains', 'Vùng đất bằng phẳng rộng lớn, nơi chăn nuôi bò và trồng lúa mì.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'u'); d.r(0, 9, 16, 1, 'y'); d.e(4, 11, 3, 1.6, 'n'); d.r(3, 12, 1, 2, 'N'); d.r(5, 12, 1, 2, 'N'); d.e(11, 12, 3, 1.6, 'N'); d.r(10, 13, 1, 2, 'k'); d.r(12, 13, 1, 2, 'k'); d.p('w', 3, 2, 10, 3, 13, 1); d.l(14, 9, 14, 6, 'N'); }, SC);
add(G, C, 'us-southwest', 'Tây Nam (Southwest)', 'The Southwest', 'Sa mạc, văn hóa Mexico và người Mỹ bản địa, gồm Arizona, New Mexico và một phần Texas.',
  d => { d.bg('o'); d.r(0, 12, 16, 4, 'u'); d.r(2, 5, 5, 7, 'R'); d.r(1, 4, 7, 2, 'r'); d.r(10, 7, 5, 5, 'o'); d.r(9, 6, 7, 2, 'O'); d.r(7, 8, 2, 6, 'G'); d.p('g', 5, 10, 11, 11); d.e(13, 2, 1.6, 1.6, 'y'); }, SC);
add(G, C, 'us-westcoast', 'Bờ Tây (West Coast)', 'The West Coast', 'California, Oregon, Washington, vùng của công nghệ, Hollywood và lối sống thoải mái.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'C'); d.r(0, 9, 16, 1, 'c'); d.l(4, 15, 4, 6, 'N'); d.l(4, 7, 1, 5, 'G'); d.l(4, 7, 7, 5, 'G'); d.l(4, 6, 4, 3, 'g'); d.e(12, 4, 2, 2, 'y'); d.r(10, 13, 5, 1, 'n'); d.p('w', 8, 12, 12, 15); d.p('o', 11, 11); }, SC);
add(G, C, 'us-pnw', 'Tây Bắc Thái Bình Dương', 'The Pacific Northwest', 'Rừng mưa, núi lửa và các thành phố như Seattle và Portland.',
  d => { d.bg('A'); d.tri(3, 2, 10, 11, 'w'); d.tri(3, 7, 10, 6, 'a'); d.tri(1, 8, 6, 6, 'G'); d.tri(10, 8, 6, 6, 'G'); d.r(0, 13, 16, 3, 'G'); for (const [x, y] of [[2, 2], [5, 1], [12, 2], [9, 1], [14, 5]]) d.p('c', x, y, x, y + 1); d.p('w', 6, 3, 9, 3); }, SC);
add(G, C, 'us-alaska', 'Alaska', 'Alaska', 'Bang lớn nhất, mua lại từ Nga năm 1867, thưa dân và nhiều băng tuyết.',
  d => { d.bg('B'); d.tri(0, 5, 10, 9, 'w'); d.tri(6, 3, 10, 11, 'l'); d.r(0, 13, 16, 3, 'w'); d.p('G', 2, 3, 9, 2, 13, 4); d.p('g', 4, 4, 11, 3, 7, 1); d.p('w', 1, 6, 14, 8); d.p('c', 3, 12, 10, 13); }, SC);
add(G, C, 'us-hawaii', 'Hawaii', 'Hawaii', 'Quần đảo núi lửa giữa Thái Bình Dương, trở thành bang thứ năm mươi năm 1959.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.r(0, 10, 16, 1, 'c'); d.tri(3, 4, 10, 7, 'N'); d.tri(7, 4, 2, 2, 'r'); d.r(6, 3, 4, 2, 'a'); d.p('o', 8, 2, 7, 3, 9, 3); d.e(12, 2, 1.6, 1.6, 'y'); d.p('w', 1, 13, 12, 14); d.l(2, 11, 2, 8, 'N'); d.p('G', 1, 7, 3, 7, 2, 6); }, SC);

// ----- Hiện tượng đặc biệt -----
add(G, E, 'us-oldfaithful', 'Old Faithful', 'Old Faithful', 'Mạch nước phun ở Yellowstone phun lên đều đặn, khoảng mỗi một tiếng rưỡi.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'u'); d.e(8, 13, 4, 1.4, 'e'); d.l(8, 12, 8, 3, 'w'); d.l(7, 12, 6, 6, 'w'); d.l(9, 12, 10, 6, 'w'); d.e(8, 2, 3, 2, 'l'); d.p('w', 5, 3, 11, 3, 6, 1, 10, 1); d.p('G', 1, 11, 14, 11); }, SC);
add(G, E, 'us-supervolcano', 'Siêu núi lửa Yellowstone', 'The Yellowstone supervolcano', 'Vùng bên dưới công viên là một miệng núi lửa khổng lồ, hiện được theo dõi chặt chẽ.',
  d => { d.bg('A'); d.r(0, 11, 16, 5, 'n'); d.e(8, 11, 7, 3, 'N'); d.e(8, 11, 5, 2, 'r'); d.e(8, 11, 3, 1.2, 'o'); d.l(8, 10, 8, 3, 'o'); d.l(7, 9, 5, 5, 'r'); d.l(9, 9, 11, 5, 'r'); d.p('a', 3, 3, 12, 2, 8, 1); d.p('y', 8, 2); }, SC);
add(G, E, 'us-deathvalley', 'Thung lũng Chết', 'Death Valley', 'Nơi ghi nhận một trong những nhiệt độ không khí cao nhất thế giới, hơn năm mươi sáu độ C vào năm 1913.',
  d => { d.bg('Y'); d.r(0, 0, 16, 6, 'u'); d.e(8, 3, 3, 3, 'r'); d.e(8, 3, 2, 2, 'o'); d.r(0, 11, 16, 5, 'o'); d.tri(0, 7, 6, 5, 'O'); d.tri(10, 6, 6, 6, 'O'); d.l(0, 13, 15, 12, 'u'); d.p('e', 3, 14, 11, 15); d.p('w', 7, 9, 8, 9); }, SC);
add(G, E, 'us-aurora', 'Cực quang ở Alaska', 'Aurora over Alaska', 'Ánh sáng xanh lục nhảy múa trên bầu trời đêm mùa đông ở phía bắc.',
  d => { d.bg('k'); d.r(0, 13, 16, 3, 'w'); d.tri(1, 9, 6, 4, 'G'); d.tri(9, 10, 6, 3, 'G'); for (let x = 0; x < 16; x++) d.r(x, 2 + Math.round(Math.sin(x / 2.2) * 2), 1, 6, x % 3 ? 'g' : 'h'); d.r(0, 8, 16, 1, 'k'); d.p('w', 2, 1, 7, 0, 12, 1, 14, 3); }, SC);
add(G, E, 'us-tornado', 'Lốc xoáy (tornado)', 'Tornado', 'Mỹ có nhiều lốc xoáy nhất thế giới, tập trung ở khu vực gọi là Tornado Alley.',
  d => { d.bg('A'); d.r(0, 0, 16, 4, 'K'); d.r(0, 13, 16, 3, 'g'); d.tri(1, 3, 14, 2, 'a'); d.tri(3, 5, 10, 2, 'A'); d.tri(5, 7, 6, 2, 'a'); d.tri(6, 9, 4, 2, 'A'); d.r(7, 11, 2, 2, 'a'); d.p('w', 13, 12, 2, 12, 12, 14); }, SC);
add(G, E, 'us-wildfire', 'Cháy rừng ở miền Tây', 'Western wildfires', 'Mùa khô kéo dài khiến lửa lan nhanh ở California và các bang lân cận.',
  d => { d.bg('R'); d.r(0, 12, 16, 4, 'k'); d.tri(1, 5, 5, 8, 'k'); d.tri(10, 4, 5, 9, 'k'); d.tri(5, 3, 6, 9, 'r'); d.tri(6, 5, 4, 7, 'o'); d.tri(7, 7, 2, 5, 'y'); d.p('o', 2, 9, 13, 8, 3, 11); d.p('a', 4, 1, 11, 1, 8, 0); }, SC);
add(G, E, 'us-flood', 'Lũ lụt sông Mississippi', 'Mississippi floods', 'Những trận lũ lịch sử đã đổi dòng chảy và buộc người dân xây đê.',
  d => { d.bg('A'); d.r(0, 8, 16, 8, 'n'); d.r(0, 11, 16, 5, 'C'); d.r(0, 11, 16, 1, 'c'); d.r(2, 6, 4, 4, 'e'); d.tri(1, 4, 6, 2, 'r'); d.r(10, 7, 4, 3, 'W'); d.p('w', 3, 14, 10, 15, 13, 13); d.l(0, 8, 15, 8, 'N'); d.p('l', 2, 2, 12, 3); }, SC);
add(G, E, 'us-carlsbad', 'Hang động Carlsbad', 'Carlsbad Caverns', 'Hệ thống hang đá vôi lớn ở New Mexico với nhũ đá khổng lồ.',
  d => { d.bg('k'); d.e(8, 9, 7, 6, 'K'); for (const x of [2, 4, 6, 9, 11, 13]) d.tri(x, 0, 2, 5 + (x % 3), 'a'); for (const x of [3, 7, 10]) d.tri(x, 11, 2, 5, 'A'); d.r(7, 11, 2, 5, 'a'); d.p('y', 8, 9, 5, 8); d.p('w', 6, 6, 11, 7); }, SC);
