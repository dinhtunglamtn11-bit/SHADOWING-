import { add, SC, setCC } from './pass-kit.js';
setCC('nz');
// New Zealand · Nhóm 1: Nơi chốn và thiên nhiên
const G = 1, A = 'Địa danh', B = 'Mùa và thiên nhiên', C = 'Vùng miền', E = 'Hiện tượng đặc biệt';
const TEAL = '#2fd0b0';

// ----- Địa danh -----
add(G, A, 'nz-milford', 'Milford Sound (Piopiotahi)', 'Milford Sound (Piopiotahi)', 'Vịnh hẹp fjord ở vùng Fiordland với vách đá dựng đứng và thác nước đổ thẳng xuống biển, thường mưa nhiều nên thác càng đẹp.',
  d => { d.bg('c'); d.tri(0, 2, 7, 12, 'A'); d.tri(9, 1, 7, 13, 'a'); d.r(0, 13, 16, 3, 'C'); d.r(7, 5, 2, 8, 'l'); d.p('w', 7, 12, 8, 12); d.tri(1, 2, 3, 3, 'w'); d.p('w', 12, 1, 13, 2); d.p('k', 5, 14); }, SC);
add(G, A, 'nz-aoraki', 'Aoraki / Núi Cook', 'Aoraki / Mount Cook', 'Đỉnh núi cao nhất New Zealand, tên Māori là Aoraki, nằm trong dãy Alps phương Nam.',
  d => { d.bg('c'); d.tri(0, 7, 7, 7, 'a'); d.tri(3, 1, 11, 13, 'A'); d.tri(6, 1, 5, 5, 'w'); d.p('w', 5, 6, 10, 6, 8, 8, 6, 8); d.r(0, 13, 16, 3, 'G'); d.p('h', 2, 14, 11, 15); }, SC);
add(G, A, 'nz-tongariro', 'Tongariro Alpine Crossing', 'Tongariro Alpine Crossing', 'Tuyến đi bộ một ngày qua vùng núi lửa với hồ miệng núi lửa màu ngọc lam và đá đen.',
  d => { d.bg('c'); d.tri(2, 3, 12, 10, 'K'); d.r(6, 3, 4, 1, 'k'); d.r(0, 13, 16, 3, 'N'); d.e(6, 12, 3, 1.4, TEAL); d.e(12, 11, 2, 1, TEAL); d.l(1, 15, 5, 13, 'W'); d.p('w', 7, 2, 9, 1); }, SC);
add(G, A, 'nz-hobbiton', 'Hobbiton (Matamata)', 'Hobbiton (Matamata)', 'Khu trường quay đồng quê dựng cho các bộ phim lấy bối cảnh Trung Địa, nay mở cửa cho khách tham quan.',
  d => { d.bg('c'); d.e(8, 14, 9, 8, 'g'); d.e(8, 11, 3.2, 3.2, 'N'); d.e(8, 11, 2.4, 2.4, 'g'); d.p('y', 9, 11); d.r(0, 14, 16, 2, 'h'); d.p('G', 3, 9, 13, 9, 4, 6); d.p('r', 14, 13, 2, 14); d.p('w', 12, 3, 13, 2); }, SC);
add(G, A, 'nz-rotorua', 'Rotorua', 'Rotorua', 'Thị trấn nằm trên vùng địa nhiệt, có suối nước nóng, bùn sôi và làng văn hóa Māori.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'n'); d.e(8, 12, 6, 2.6, 'a'); d.e(8, 12, 4.6, 1.8, 'W'); d.p('n', 6, 12, 9, 13, 10, 11); d.p('w', 7, 8, 9, 6, 8, 4, 10, 2, 6, 5, 11, 4); d.p('l', 8, 7, 7, 3); }, SC);
add(G, A, 'nz-bayofislands', 'Vịnh Các Đảo (Bay of Islands)', 'Bay of Islands', 'Vùng vịnh gần một trăm đảo nhỏ ở Northland, nơi người châu Âu thiết lập những khu định cư sớm nhất.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'C'); d.e(3, 8, 3, 1.6, 'g'); d.e(12, 8, 4, 2, 'G'); d.e(8, 9, 2, 1, 'g'); d.r(7, 11, 3, 1, 'N'); d.l(8, 11, 8, 6, 'N'); d.tri(8, 6, 4, 5, 'w'); d.p('c', 1, 14, 12, 14); d.e(13, 2, 1.6, 1.6, 'y'); }, SC);
add(G, A, 'nz-waitomo', 'Hang Waitomo (Waitomo Caves)', 'Waitomo Caves', 'Hệ thống hang đá vôi với đàn giun phát sáng thắp sáng trần hang như bầu trời sao.',
  d => { d.bg('k'); d.r(0, 13, 16, 3, 'B'); for (const [x, y] of [[2, 2], [5, 1], [7, 4], [10, 2], [13, 3], [4, 5], [12, 6], [9, 7], [1, 6], [14, 1]]) d.p('c', x, y); d.dtri(0, 0, 3, 3, 'K'); d.dtri(11, 0, 4, 4, 'K'); d.p('w', 5, 14, 11, 15); d.r(7, 11, 3, 1, 'n'); }, SC);
add(G, A, 'nz-queenstown', 'Queenstown', 'Queenstown', 'Thành phố bên hồ Wakatipu ở Đảo Nam, được gọi là thủ đô của các môn thể thao mạo hiểm.',
  d => { d.bg('c'); d.tri(0, 2, 9, 9, 'A'); d.tri(8, 4, 8, 7, 'a'); d.tri(2, 2, 4, 3, 'w'); d.r(0, 11, 16, 5, 'C'); d.r(3, 10, 8, 1, 'N'); d.p('r', 4, 9, 6, 9, 9, 9); d.l(13, 1, 13, 5, 'r'); d.p('o', 13, 6); d.p('w', 3, 14, 10, 13); }, SC);
add(G, A, 'nz-tekapo', 'Hồ Tekapo', 'Lake Tekapo', 'Hồ xanh ngọc lam do bột đá sông băng, cạnh nhà thờ nhỏ Good Shepherd và là khu bảo tồn bầu trời đêm.',
  d => { d.bg('c'); d.tri(0, 4, 8, 6, 'A'); d.tri(8, 5, 8, 5, 'a'); d.r(0, 10, 16, 6, TEAL); d.r(0, 10, 16, 1, 'h'); d.r(10, 7, 3, 3, 'W'); d.tri(9, 5, 5, 2, 'N'); d.p('v', 1, 12, 3, 13, 5, 12); d.p('p', 2, 14, 6, 14); }, SC);
add(G, A, 'nz-franz', 'Sông băng Franz Josef', 'Franz Josef Glacier', 'Sông băng chảy xuống gần rừng mưa ở bờ Tây, một trong số ít nơi sông băng tiến sát rừng ôn đới.',
  d => { d.bg('c'); d.tri(3, 1, 10, 14, 'l'); d.p('c', 7, 5, 8, 8, 6, 10, 9, 11, 7, 13); d.tri(0, 6, 5, 9, 'A'); d.tri(11, 6, 5, 9, 'A'); d.r(0, 13, 16, 3, 'G'); d.tri(1, 11, 3, 3, 'g'); d.tri(12, 11, 3, 3, 'g'); }, SC);
add(G, A, 'nz-abel', 'Vườn quốc gia Abel Tasman', 'Abel Tasman National Park', 'Bờ biển cát vàng, vịnh nhỏ và rừng ven biển, nổi tiếng với tuyến đi bộ và chèo thuyền kayak.',
  d => { d.bg('c'); d.r(0, 5, 16, 3, 'G'); d.r(0, 8, 16, 3, TEAL); d.r(0, 11, 16, 5, 'y'); d.p('Y', 2, 13, 8, 14, 12, 12); d.r(5, 9, 5, 1, 'r'); d.p('k', 7, 8); d.p('g', 1, 4, 5, 4, 9, 4, 13, 4); }, SC);
add(G, A, 'nz-reinga', 'Mũi Reinga (Cape Reinga)', 'Cape Reinga', 'Mũi đất gần cực bắc của đất nước, theo quan niệm Māori là nơi linh hồn người chết ra đi về quê hương tổ tiên.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(3, 10, 10, 6, 'G'); d.r(3, 10, 10, 1, 'g'); d.r(7, 4, 2, 6, 'w'); d.r(7, 6, 2, 1, 'r'); d.r(6, 3, 4, 1, 'r'); d.p('y', 8, 2); d.p('w', 1, 14, 14, 13); }, SC);
add(G, A, 'nz-skytower', 'Tháp Sky Tower (Auckland)', 'Sky Tower (Auckland)', 'Tháp cao nhất Nam Bán Cầu, nhìn ra thành phố và hải cảng.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'C'); d.r(0, 11, 16, 2, 'a'); d.r(7, 5, 2, 7, 'a'); d.e(8, 6, 3.4, 1.4, 'A'); d.r(7, 6, 2, 1, 'l'); d.l(8, 1, 8, 4, 'a'); d.p('r', 8, 0); d.r(1, 9, 3, 4, 'K'); d.r(12, 8, 3, 5, 'K'); }, SC);
add(G, A, 'nz-waitangi', 'Waitangi Treaty Grounds', 'Waitangi Treaty Grounds', 'Nơi ký Hiệp ước Waitangi năm 1840, một địa điểm lịch sử quan trọng bậc nhất của đất nước.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.l(3, 1, 3, 12, 'N'); d.r(4, 2, 6, 4, 'B'); d.r(4, 2, 6, 1, 'r'); d.p('w', 6, 4, 8, 3); d.r(9, 10, 6, 2, 'N'); d.r(10, 9, 4, 1, 'n'); d.p('y', 11, 10, 13, 10); }, SC);
add(G, A, 'nz-taranakimt', 'Núi Taranaki', 'Mount Taranaki', 'Ngọn núi lửa hình nón gần như hoàn hảo ở bờ Tây Đảo Bắc, từng được dùng làm bối cảnh thay cho nhiều ngọn núi khác trong phim.',
  d => { d.bg('c'); d.tri(1, 2, 14, 12, 'a'); d.tri(5, 2, 6, 4, 'w'); d.r(0, 13, 16, 3, 'G'); d.tri(1, 11, 3, 3, 'g'); d.tri(12, 11, 3, 3, 'g'); d.p('l', 6, 8, 9, 9, 8, 6); d.p('w', 12, 2, 2, 3); }, SC);

// ----- Mùa và thiên nhiên -----
add(G, B, 'nz-summer', 'Mùa hè đảo ngược', 'Summer at Christmas', 'Vì ở Nam Bán Cầu nên mùa hè rơi vào tháng mười hai đến tháng hai, đón Giáng sinh giữa nắng nóng.',
  d => { d.bg('c'); d.e(12, 3, 2.4, 2.4, 'y'); d.r(0, 10, 16, 3, 'C'); d.r(0, 13, 16, 3, 'y'); d.tri(3, 2, 6, 7, 'G'); d.r(5, 9, 2, 2, 'N'); d.p('r', 5, 4, 7, 6, 4, 7); d.p('y', 6, 3); d.p('w', 9, 11, 13, 12); }, SC);
add(G, B, 'nz-pohutukawa', 'Cây pōhutukawa nở hoa', 'Pōhutukawa in bloom', 'Cây có hoa đỏ rực nở vào tháng mười hai, được gọi là cây Giáng sinh của New Zealand, mọc nhiều trên các vách đá ven biển.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(2, 11, 12, 5, 'N'); d.r(7, 7, 2, 4, 'n'); d.e(8, 5, 5.6, 3.4, 'G'); d.p('r', 4, 3, 6, 2, 9, 3, 11, 2, 12, 5, 3, 6, 6, 5, 10, 6, 8, 4, 7, 7, 11, 7); d.p('R', 5, 4, 10, 4); }, SC);
add(G, B, 'nz-lupin', 'Cánh đồng hoa lupin', 'Lupin fields', 'Tháng mười một và tháng mười hai, hoa lupin nhiều màu phủ quanh hồ Tekapo và hồ Pukaki.',
  d => { d.bg('c'); d.tri(0, 4, 16, 5, 'a'); d.r(0, 9, 16, 7, 'g'); for (const [x, c] of [[1, 'v'], [4, 'p'], [7, 'v'], [10, 'P'], [13, 'b']]) { d.r(x, 8, 1, 5, c); d.p('G', x - 1, 14, x + 1, 14); d.p(c, x, 7); } d.p('w', 3, 2, 11, 3); }, SC);
add(G, B, 'nz-lambs', 'Mùa cừu non', 'Lambing season', 'Mùa xuân (tháng chín, mười) là lúc cừu đẻ, đồng cỏ đầy những chú cừu con.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'h'); d.e(5, 11, 3, 2.4, 'w'); d.r(3, 13, 1, 2, 'k'); d.r(6, 13, 1, 2, 'k'); d.e(2, 10, 1.4, 1.4, 'k'); d.e(12, 13, 2, 1.6, 'w'); d.p('k', 10, 13, 14, 12); d.r(11, 14, 1, 1, 'k'); d.r(13, 14, 1, 1, 'k'); d.p('y', 2, 14, 9, 15); }, SC);
add(G, B, 'nz-kauri', 'Rừng kauri', 'Kauri forest', 'Loài cây cổ thụ khổng lồ ở Northland, một số cây sống hơn một nghìn năm.',
  d => { d.bg('G'); d.r(5, 0, 6, 16, 'n'); d.r(5, 0, 2, 16, 'N'); d.r(4, 13, 8, 3, 'N'); d.r(0, 14, 16, 2, 'G'); d.e(2, 3, 3, 2, 'g'); d.e(14, 4, 3, 2, 'g'); d.p('h', 1, 3, 13, 4, 3, 8, 12, 9); d.p('n', 9, 4, 8, 8); }, SC);
add(G, B, 'nz-fern', 'Dương xỉ bạc (silver fern)', 'Silver fern', 'Cây dương xỉ có mặt dưới lá màu bạc, biểu tượng của New Zealand, xuất hiện trên đồng phục của đội tuyển thể thao.',
  d => { d.bg('k'); d.l(8, 15, 8, 3, 'l'); for (let i = 0; i < 6; i++) { const y = 13 - i * 2; d.l(8, y, 2 + i, y - 3, 'l'); d.l(8, y, 14 - i, y - 3, 'l'); } d.p('w', 8, 2, 3, 9, 13, 9, 4, 6, 12, 6); }, SC);
add(G, B, 'nz-arrowtown', 'Lá vàng mùa thu ở Arrowtown', 'Autumn colours at Arrowtown', 'Tháng tư, tháng năm, những hàng cây du nhập đổi sang màu vàng, đỏ quanh thị trấn mỏ vàng cũ.',
  d => { d.bg('c'); d.tri(0, 3, 16, 6, 'a'); d.r(0, 12, 16, 4, 'u'); d.e(4, 9, 3.4, 3.4, 'y'); d.e(11, 8, 3.6, 3.6, 'o'); d.e(8, 11, 2.4, 2.4, 'r'); d.r(3, 11, 2, 3, 'N'); d.r(10, 11, 2, 4, 'N'); d.p('Y', 2, 8, 12, 7); d.p('R', 8, 10); }, SC);
add(G, B, 'nz-ski', 'Mùa trượt tuyết', 'Ski season', 'Từ tháng sáu đến tháng mười, nhiều khu trượt tuyết quanh Queenstown, Wānaka và núi Ruapehu hoạt động.',
  d => { d.bg('c'); d.tri(0, 3, 16, 13, 'w'); d.tri(5, 1, 6, 4, 'l'); d.l(10, 6, 5, 13, 'r'); d.p('k', 10, 5, 11, 5); d.l(12, 7, 6, 14, 'N'); d.l(8, 9, 12, 10, 'N'); d.p('G', 1, 12, 14, 13); }, SC);
add(G, B, 'nz-rainforest', 'Rừng mưa ôn đới và rừng sồi nam', 'Temperate rainforest and southern beech', 'Rừng bao phủ nhiều vùng núi, có tầng dương xỉ cây và rêu dày.',
  d => { d.bg('G'); d.r(2, 0, 2, 16, 'N'); d.r(11, 0, 2, 16, 'N'); d.e(8, 3, 7, 3, 'g'); d.l(8, 15, 8, 9, 'n'); d.l(8, 9, 3, 7, 'h'); d.l(8, 9, 13, 7, 'h'); d.l(8, 9, 5, 12, 'h'); d.l(8, 9, 11, 12, 'h'); d.r(0, 14, 16, 2, 'h'); d.p('c', 5, 5, 10, 6); }, SC);
add(G, B, 'nz-kaikoura', 'Cá voi và cá heo ngoài khơi Kaikōura', 'Whales and dolphins off Kaikōura', 'Thị trấn ven biển nơi có thể ngắm cá nhà táng quanh năm.',
  d => { d.bg('c'); d.tri(0, 3, 16, 6, 'a'); d.r(0, 9, 16, 7, 'C'); d.e(7, 11, 4, 2, 'A'); d.e(11, 9, 1.4, 1, 'A'); d.p('A', 12, 7, 13, 6, 14, 7); d.p('w', 3, 13, 11, 14, 6, 15); d.p('l', 8, 4, 2, 2); }, SC);
add(G, B, 'nz-vineyard', 'Vùng nho và vườn trái cây', 'Vineyards and orchards', 'Marlborough, Central Otago và Hawke\'s Bay trồng nho, kiwifruit và táo.',
  d => { d.bg('c'); d.tri(0, 3, 16, 5, 'A'); d.r(0, 8, 16, 8, 'g'); for (const y of [9, 12]) { d.r(0, y, 16, 1, 'G'); for (let x = 1; x < 16; x += 3) d.p('v', x, y + 1); } d.p('P', 3, 10, 9, 10, 13, 13); d.e(13, 2, 1.6, 1.6, 'y'); }, SC);

// ----- Vùng miền -----
add(G, C, 'nz-northland', 'Northland', 'Northland', 'Vùng cực bắc nhiều bãi biển, rừng kauri và lịch sử gặp gỡ đầu tiên giữa người Māori và người châu Âu.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.tri(3, 4, 10, 8, 'g'); d.r(7, 7, 2, 5, 'n'); d.e(8, 5, 4, 3, 'G'); d.r(2, 12, 12, 2, 'y'); d.p('w', 2, 15, 12, 14); d.e(13, 2, 1.6, 1.6, 'y'); }, SC);
add(G, C, 'nz-auckland', 'Auckland', 'Auckland', 'Thành phố lớn nhất, nằm giữa hai cảng biển và trên một cánh đồng núi lửa nhỏ, có đông người gốc Thái Bình Dương.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.tri(1, 8, 6, 4, 'g'); d.r(8, 5, 5, 7, 'K'); d.r(9, 3, 1, 2, 'a'); d.r(10, 7, 1, 1, 'y'); d.r(12, 8, 1, 1, 'y'); d.l(5, 14, 5, 12, 'N'); d.tri(4, 9, 3, 3, 'w'); d.p('w', 8, 14, 13, 15); }, SC);
add(G, C, 'nz-waikato', 'Waikato và Bay of Plenty', 'Waikato and Bay of Plenty', 'Vùng chăn nuôi bò sữa và trồng kiwifruit nổi tiếng.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'h'); d.e(4, 11, 3, 2, 'w'); d.p('k', 3, 11, 5, 10, 4, 12); d.r(3, 13, 1, 2, 'k'); d.r(5, 13, 1, 2, 'k'); d.e(12, 12, 2.4, 2.4, 'n'); d.e(12, 12, 1.6, 1.6, 'g'); d.p('k', 12, 12); d.p('w', 2, 2, 8, 3); }, SC);
add(G, C, 'nz-taranakireg', 'Taranaki', 'Taranaki', 'Vùng có ngọn núi lửa cùng tên, nhiều vườn hoa và công viên.',
  d => { d.bg('c'); d.tri(3, 1, 10, 9, 'a'); d.tri(6, 1, 4, 3, 'w'); d.r(0, 10, 16, 6, 'g'); d.p('p', 2, 12, 5, 14, 9, 13, 13, 12); d.p('y', 3, 13, 11, 14, 14, 14); d.p('r', 7, 12, 1, 14); }, SC);
add(G, C, 'nz-hawkesbay', 'Hawke\'s Bay', 'Hawke\'s Bay', 'Vùng khí hậu khô ấm, nổi tiếng với rượu vang và kiến trúc Art Deco ở Napier.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(3, 5, 10, 7, 'u'); d.r(3, 4, 10, 1, 'p'); d.r(5, 7, 2, 2, 'B'); d.r(9, 7, 2, 2, 'B'); d.r(7, 9, 2, 3, 'g'); d.p('y', 4, 5, 8, 4, 12, 5); d.p('w', 1, 14, 12, 15); }, SC);
add(G, C, 'nz-wellington', 'Wellington', 'Wellington', 'Thủ đô, thành phố nhỏ gọn bên eo biển Cook, nhiều gió và nhiều quán cà phê, bảo tàng.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.tri(0, 6, 16, 6, 'G'); d.r(3, 8, 3, 3, 'r'); d.r(7, 7, 3, 4, 'y'); d.r(11, 8, 3, 3, 'w'); d.p('N', 4, 9, 8, 8, 12, 9); d.l(1, 3, 6, 2, 'w'); d.l(9, 3, 14, 4, 'w'); d.p('w', 2, 14, 11, 14); }, SC);
add(G, C, 'nz-canterbury', 'Canterbury', 'Canterbury', 'Vùng đồng bằng lớn của Đảo Nam, trung tâm là Christchurch với vẻ đẹp kiểu Anh.',
  d => { d.bg('c'); d.tri(0, 3, 16, 5, 'a'); d.tri(4, 3, 8, 3, 'w'); d.r(0, 8, 16, 8, 'y'); d.r(0, 8, 16, 1, 'g'); d.r(6, 5, 3, 3, 'W'); d.tri(5, 3, 5, 2, 'N'); d.p('Y', 2, 11, 12, 12, 7, 14); d.l(10, 15, 10, 11, 'N'); d.e(10, 10, 2, 1.6, 'G'); }, SC);
add(G, C, 'nz-otago', 'Otago và Central Otago', 'Otago and Central Otago', 'Vùng núi đá khô, vườn nho Pinot Noir và những thị trấn mỏ vàng cũ.',
  d => { d.bg('c'); d.tri(0, 3, 10, 9, 'u'); d.tri(7, 5, 9, 7, 'n'); d.r(0, 12, 16, 4, 'u'); d.p('v', 2, 13, 5, 14, 8, 13, 11, 14, 14, 13); d.r(10, 9, 3, 2, 'N'); d.p('y', 11, 10); d.p('w', 3, 2, 10, 1); }, SC);
add(G, C, 'nz-southland', 'Southland và Fiordland', 'Southland and Fiordland', 'Vùng cực nam nhiều mưa, hoang sơ, nơi có Milford Sound.',
  d => { d.bg('a'); d.tri(0, 2, 9, 11, 'A'); d.tri(7, 3, 9, 10, 'G'); d.r(0, 12, 16, 4, 'C'); for (const x of [2, 6, 11, 14]) d.l(x, 0, x - 1, 5, 'c'); d.p('w', 8, 12, 9, 6); d.p('K', 4, 5, 12, 6); }, SC);
add(G, C, 'nz-westcoast', 'Bờ Tây (West Coast)', 'West Coast', 'Dải đất hẹp giữa biển và núi, mưa nhiều, nhiều sông băng.',
  d => { d.bg('a'); d.tri(7, 1, 9, 10, 'A'); d.tri(10, 1, 4, 3, 'w'); d.r(0, 10, 16, 3, 'G'); d.r(0, 13, 16, 3, 'C'); d.p('w', 2, 14, 9, 15); d.p('c', 3, 1, 5, 3, 1, 5); d.tri(0, 7, 5, 4, 'g'); }, SC);
add(G, C, 'nz-marlborough', 'Marlborough và Nelson', 'Marlborough and Nelson', 'Vùng nắng nhiều, trồng nho trắng và là cửa ngõ tới Abel Tasman.',
  d => { d.bg('c'); d.e(8, 2, 2.4, 2.4, 'y'); d.r(0, 6, 16, 3, 'a'); d.r(0, 9, 16, 7, 'g'); d.r(0, 11, 16, 1, 'G'); d.r(0, 14, 16, 1, 'G'); d.p('h', 2, 10, 7, 10, 12, 10, 4, 13, 10, 13, 14, 13); d.p('y', 5, 12); }, SC);
add(G, C, 'nz-stewart', 'Đảo Stewart (Rakiura)', 'Stewart Island (Rakiura)', 'Đảo cực nam, nơi dễ gặp chim kiwi ngoài tự nhiên và là điểm quan sát bầu trời đêm.',
  d => { d.bg('B'); d.r(0, 12, 16, 4, 'C'); d.e(8, 12, 6, 3, 'G'); d.e(8, 11, 4, 1.4, 'g'); d.p('y', 2, 2, 5, 4, 9, 1, 12, 3, 14, 6, 7, 6); d.e(8, 10, 1.4, 1.2, 'n'); d.p('t', 10, 10); d.p('w', 1, 14, 12, 14); }, SC);

// ----- Hiện tượng đặc biệt -----
add(G, E, 'nz-glowworm', 'Giun phát sáng (glowworm)', 'Glowworm', 'Ấu trùng muỗi nhỏ phát ra ánh sáng xanh trong hang tối, nổi tiếng ở Waitomo.',
  d => { d.bg('i'); for (const [x, y] of [[2, 3], [5, 6], [8, 2], [11, 5], [13, 3], [4, 10], [9, 9], [12, 11], [7, 13], [1, 7]]) { d.p('c', x, y); d.l(x, y + 1, x, y + 2, 'C'); } d.p('h', 8, 5, 5, 4); }, SC);
add(G, E, 'nz-aurora', 'Cực quang phương Nam (Aurora Australis)', 'Aurora Australis', 'Ánh sáng xanh và đỏ xuất hiện ở trời đêm phía nam vào những đêm hiếm hoi.',
  d => { d.bg('i'); d.r(0, 13, 16, 3, 'K'); d.l(2, 12, 4, 2, 'g'); d.l(5, 12, 7, 1, 'h'); d.l(8, 12, 10, 3, 'g'); d.l(11, 12, 13, 2, 'p'); d.l(14, 12, 14, 4, 'h'); d.p('w', 1, 1, 9, 1, 15, 6, 6, 5); d.tri(1, 11, 3, 3, 'G'); d.tri(11, 11, 4, 3, 'G'); }, SC);
add(G, E, 'nz-pohutu', 'Giếng phun Pōhutu', 'Pōhutu Geyser', 'Suối nước nóng ở Rotorua phun cao hàng chục mét vài lần mỗi ngày.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'n'); d.e(8, 13, 4, 1.4, 'W'); d.l(8, 12, 8, 3, 'w'); d.l(7, 12, 5, 5, 'w'); d.l(9, 12, 11, 5, 'w'); d.e(8, 2, 3, 1.6, 'l'); d.p('w', 5, 4, 11, 4, 6, 1); }, SC);
add(G, E, 'nz-ringoffire', 'Vành đai Lửa Thái Bình Dương', 'Pacific Ring of Fire', 'Đất nước thường xuyên có động đất nhỏ và núi lửa, nên người dân quen với việc chuẩn bị ứng phó.',
  d => { d.bg('A'); d.r(0, 12, 16, 4, 'N'); d.tri(3, 4, 10, 8, 'K'); d.l(8, 4, 8, 1, 'o'); d.l(7, 4, 5, 2, 'r'); d.l(9, 4, 11, 2, 'r'); d.p('y', 8, 0, 8, 2); d.l(2, 13, 6, 15, 'k'); d.l(6, 15, 10, 13, 'k'); }, SC);
add(G, E, 'nz-moeraki', 'Tảng đá tròn Moeraki', 'Moeraki Boulders', 'Những khối đá hình cầu khổng lồ nằm rải rác trên bãi biển Otago.',
  d => { d.bg('c'); d.r(0, 8, 16, 3, 'C'); d.r(0, 11, 16, 5, 'u'); d.e(5, 12, 3.2, 3, 'a'); d.e(5, 12, 2.4, 2.2, 'l'); d.e(12, 13, 2.4, 2.2, 'a'); d.p('A', 4, 11, 12, 13); d.p('w', 0, 9, 9, 10, 14, 9); d.p('Y', 8, 15, 2, 15); }, SC);
add(G, E, 'nz-pancake', 'Đá Pancake (Pancake Rocks)', 'Pancake Rocks', 'Những vách đá vôi xếp lớp như chồng bánh kếp, bị sóng biển bào mòn.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); for (let i = 0; i < 6; i++) { d.r(3 + (i % 2), 11 - i * 2, 9 - (i % 2) * 2, 1, 'a'); d.r(3 + (i % 2), 12 - i * 2, 9 - (i % 2) * 2, 1, 'A'); } d.p('w', 1, 13, 14, 14); }, SC);
add(G, E, 'nz-pukaki', 'Hồ xanh ngọc từ bột đá sông băng', 'Glacier-fed turquoise lakes', 'Hồ Pukaki có màu xanh lam đặc biệt do bột đá sông băng lơ lửng.',
  d => { d.bg('c'); d.tri(0, 3, 9, 7, 'A'); d.tri(8, 2, 8, 8, 'a'); d.tri(11, 2, 3, 3, 'w'); d.r(0, 10, 16, 6, TEAL); d.r(0, 10, 16, 1, 'W'); d.p('h', 3, 12, 9, 14, 12, 12); d.p('w', 5, 11, 13, 15); }, SC);
add(G, E, 'nz-longday', 'Ngày dài mùa hè', 'Long summer days', 'Ánh sáng kéo dài đến gần mười giờ tối ở miền Nam trong mùa hè.',
  d => { d.bg('o'); d.r(0, 10, 16, 6, 'N'); d.e(8, 10, 4, 4, 'y'); d.r(0, 10, 16, 6, 'N'); d.p('y', 1, 9, 14, 9, 3, 8, 12, 8); d.tri(0, 6, 5, 5, 'K'); d.tri(11, 6, 5, 5, 'K'); d.r(6, 12, 4, 1, 'r'); }, SC);
add(G, E, 'nz-nosnakes', 'Đất nước không có rắn bản địa', 'A land without native snakes', 'New Zealand gần như không có động vật có vú trên cạn bản địa ngoài dơi, nên chim phát triển mạnh.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'g'); d.e(8, 9, 3, 2.6, 'n'); d.p('y', 10, 8); d.p('k', 9, 7); d.l(11, 9, 14, 11, 'y'); d.r(6, 11, 1, 3, 'y'); d.r(9, 11, 1, 3, 'y'); d.l(1, 4, 5, 6, 'k'); d.l(5, 6, 3, 8, 'k'); d.p('r', 14, 3, 15, 4); }, SC);
