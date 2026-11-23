import { add, SC, setCC } from './pass-kit.js';
setCC('in');
// Ấn Độ · Nhóm 1: Nơi chốn và thiên nhiên
const G = 1, A = 'Địa danh', B = 'Mùa và thiên nhiên', C = 'Vùng miền', E = 'Hiện tượng đặc biệt';
const SAFF = '#ff9933', GRN = '#138808';

// ----- Địa danh -----
add(G, A, 'in-taj', 'Taj Mahal (Agra)', 'Taj Mahal (Agra)', 'Lăng mộ bằng đá cẩm thạch trắng do hoàng đế Shah Jahan xây thế kỷ 17 để tưởng nhớ vợ, đổi sắc theo ánh sáng từ lúc bình minh đến hoàng hôn.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'C'); d.r(3, 9, 10, 4, 'w'); d.e(8, 8, 3, 3, 'w'); d.r(7, 3, 2, 3, 'w'); d.p('y', 8, 2); for (const x of [1, 14]) { d.r(x, 6, 1, 7, 'w'); d.p('y', x, 5); } d.r(7, 10, 2, 3, 'a'); d.p('l', 5, 10, 11, 10); d.p('C', 6, 15, 9, 14); }, SC);
add(G, A, 'in-redfort', 'Pháo đài Đỏ (Red Fort) ở Delhi', 'Red Fort, Delhi', 'Tổ hợp cung điện bằng sa thạch đỏ của các hoàng đế Mughal, nơi Thủ tướng đọc diễn văn mỗi dịp Quốc khánh 15 tháng 8.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'R'); d.r(0, 7, 16, 1, 'r'); for (const x of [1, 5, 9, 13]) d.r(x, 6, 2, 1, 'r'); d.e(3, 5, 1.6, 1.6, 'r'); d.e(13, 5, 1.6, 1.6, 'r'); d.r(6, 10, 4, 6, 'k'); d.e(8, 10, 2, 2, 'k'); d.l(8, 0, 8, 6, 'w'); d.r(9, 0, 3, 1, SAFF); d.r(9, 1, 3, 1, 'w'); d.r(9, 2, 3, 1, GRN); }, SC);
add(G, A, 'in-hawamahal', 'Hawa Mahal (Jaipur)', 'Hawa Mahal (Jaipur)', '"Cung điện của gió" với hàng trăm ô cửa sổ nhỏ chạm lưới, cho phép phụ nữ hoàng gia ngắm phố mà không bị nhìn thấy.',
  d => { d.bg('c'); d.r(2, 2, 12, 14, 'x'); d.r(4, 1, 8, 1, 'p'); d.r(6, 0, 4, 1, 'p'); for (let y = 3; y < 15; y += 3) for (let x = 3; x < 13; x += 2) d.p('R', x, y); for (let y = 4; y < 15; y += 3) d.r(2, y, 12, 1, 'P'); d.r(7, 13, 2, 3, 'k'); }, SC);
add(G, A, 'in-varanasi', 'Varanasi và các bậc thang ven sông (ghat)', 'Varanasi and its riverside ghats', 'Thành phố cổ bên sông Hằng, nơi người hành hương tắm lúc bình minh và lễ cầu nguyện ánh đèn diễn ra mỗi chiều.',
  d => { d.bg('o'); d.e(8, 6, 3, 3, 'y'); d.r(0, 9, 16, 7, 'C'); for (let i = 0; i < 4; i++) d.r(i * 2, 7 + i, 16 - i * 2, 1, 'n'); d.r(0, 6, 4, 2, 'R'); d.r(12, 5, 4, 3, 'x'); d.p('y', 4, 12, 8, 13, 12, 12); d.p('r', 6, 14, 10, 15); d.r(11, 11, 3, 1, 'N'); }, SC);
add(G, A, 'in-goldentemple', 'Đền Vàng (Golden Temple) ở Amritsar', 'Golden Temple, Amritsar', 'Thánh địa trung tâm của đạo Sikh, mái dát vàng soi bóng xuống hồ thiêng, bếp ăn cộng đồng phục vụ hàng chục nghìn người mỗi ngày.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.r(4, 7, 8, 4, 'y'); d.e(8, 5, 3, 2.4, 'y'); d.p('Y', 8, 2, 8, 3); d.p('w', 4, 8, 11, 8); d.r(7, 9, 2, 2, 'Y'); d.r(4, 11, 8, 1, 'w'); d.p('y', 5, 13, 8, 14, 11, 13); d.p('Y', 6, 14, 10, 15); }, SC);
add(G, A, 'in-hampi', 'Hampi', 'Hampi', 'Tàn tích kinh đô Vijayanagara giữa những tảng đá tròn khổng lồ ở bang Karnataka, được UNESCO công nhận là di sản thế giới.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'u'); d.e(3, 9, 3.4, 3.4, 'n'); d.e(7, 10, 3, 3, 'N'); d.e(12, 8, 3.6, 3.6, 'n'); d.r(5, 4, 5, 6, 't'); d.r(4, 3, 7, 1, 'n'); d.p('N', 6, 5, 8, 5, 6, 7, 8, 7); d.p('y', 8, 1); d.p('Y', 1, 14, 14, 15); }, SC);
add(G, A, 'in-khajuraho', 'Khajuraho', 'Khajuraho', 'Nhóm đền thế kỷ 10 và 11 nổi tiếng với những bức chạm khắc tinh xảo bao phủ tường đá.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(3, 8, 10, 5, 't'); d.tri(4, 4, 8, 4, 'n'); d.tri(6, 1, 4, 4, 'N'); d.r(5, 9, 6, 1, 'n'); d.p('N', 4, 11, 6, 11, 8, 11, 10, 11, 12, 11); d.p('n', 5, 10, 7, 10, 9, 10, 11, 10); d.r(7, 12, 2, 1, 'k'); }, SC);
add(G, A, 'in-ajanta', 'Hang Ajanta và Ellora', 'Ajanta and Ellora Caves', 'Các hang đá chạm khắc và vẽ tranh tường của Phật giáo, Ấn Độ giáo và Kỳ Na giáo, có tuổi hàng nghìn năm.',
  d => { d.bg('c'); d.r(0, 3, 16, 13, 'n'); d.r(0, 3, 16, 1, 'N'); for (const x of [2, 7, 12]) { d.r(x, 6, 3, 4, 'k'); d.r(x, 5, 3, 1, 'N'); } d.p('o', 3, 8, 8, 8, 13, 8); d.p('t', 2, 11, 6, 12, 9, 11, 13, 12); d.r(0, 14, 16, 2, 'G'); }, SC);
add(G, A, 'in-gateway', 'Cổng Ấn Độ (Gateway of India) ở Mumbai', 'Gateway of India, Mumbai', 'Cổng đá bên bờ biển, dựng đầu thế kỷ 20, biểu tượng của thành phố cảng lớn nhất nước.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(3, 5, 10, 8, 'u'); d.e(8, 9, 3, 4, 'c'); d.r(5, 9, 6, 4, 'c'); d.e(8, 9, 3, 4, 'k'); d.r(3, 4, 10, 1, 't'); for (const x of [3, 6, 9, 12]) d.r(x, 2, 1, 2, 't'); d.p('w', 1, 14, 12, 15); d.p('l', 2, 3, 12, 2); }, SC);
add(G, A, 'in-mysore', 'Cung điện Mysore', 'Mysore Palace', 'Cung điện lớn của vương triều Wodeyar, thắp sáng hàng nghìn bóng đèn trong dịp lễ hội Dussehra.',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'k'); d.r(2, 7, 12, 6, 'y'); d.e(8, 5, 3, 3, 'y'); d.e(3, 6, 2, 2, 'y'); d.e(13, 6, 2, 2, 'y'); for (let x = 2; x < 14; x += 2) d.p('w', x, 7, x, 9, x, 11); d.p('o', 8, 1); d.p('w', 2, 1, 13, 2, 8, 0); }, SC);

// ----- Mùa và thiên nhiên -----
add(G, B, 'in-monsoon', 'Gió mùa (monsoon)', 'Monsoon', 'Mùa mưa từ tháng 6 đến tháng 9 quyết định mùa màng và nhịp sống của cả đất nước.',
  d => { d.bg('A'); d.r(0, 0, 16, 5, 'K'); d.e(4, 3, 3, 2, 'a'); d.e(11, 2, 4, 2, 'a'); for (const [x, y] of [[2, 6], [5, 8], [8, 6], [11, 9], [14, 7], [3, 11], [9, 12], [13, 13], [6, 14]]) d.l(x, y, x - 1, y + 2, 'c'); d.r(0, 14, 16, 2, 'G'); }, SC);
add(G, B, 'in-summer', 'Mùa hè nóng cháy', 'Scorching summer', 'Từ tháng 4 đến tháng 6, nhiều vùng ở miền bắc và miền trung vượt 40 độ C.',
  d => { d.bg('y'); d.e(8, 5, 4, 4, 'o'); d.e(8, 5, 2.6, 2.6, 'r'); d.p('o', 8, 0, 8, 10, 1, 5, 15, 5, 2, 1, 14, 9); d.r(0, 11, 16, 5, 'u'); d.p('Y', 2, 12, 9, 14, 13, 12); d.r(0, 15, 16, 1, 'n'); }, SC);
add(G, B, 'in-winter', 'Mùa đông khô mát', 'Cool dry winter', 'Từ tháng 11 đến tháng 2, thời gian dễ chịu nhất để đi du lịch phần lớn đất nước.',
  d => { d.bg('c'); d.e(12, 3, 2, 2, 'y'); d.r(0, 11, 16, 5, 'h'); d.tri(1, 5, 5, 6, 'g'); d.tri(9, 4, 6, 7, 'G'); d.r(3, 10, 1, 2, 'N'); d.r(11, 10, 1, 2, 'N'); d.p('w', 4, 2, 7, 3); d.p('p', 6, 13, 12, 14); }, SC);
add(G, B, 'in-himalaya', 'Himalaya', 'The Himalaya', 'Dãy núi cao nhất thế giới ở biên giới phía bắc, đầu nguồn của nhiều con sông lớn.',
  d => { d.bg('c'); d.tri(0, 6, 8, 8, 'a'); d.tri(4, 1, 10, 13, 'A'); d.tri(7, 1, 4, 4, 'w'); d.tri(11, 6, 5, 8, 'a'); d.p('w', 3, 8, 6, 7, 12, 8); d.r(0, 13, 16, 3, 'G'); d.p('l', 9, 6, 8, 7); }, SC);
add(G, B, 'in-ganga', 'Sông Hằng (Ganga) và sông Yamuna', 'The Ganga and Yamuna rivers', 'Những dòng sông thiêng nuôi sống đồng bằng Ấn - Hằng, được người theo Ấn Độ giáo xem là thánh thiêng.',
  d => { d.bg('h'); d.l(7, 0, 5, 5, 'C'); d.l(5, 5, 9, 9, 'C'); d.l(9, 9, 7, 15, 'C'); d.l(8, 0, 6, 5, 'c'); d.l(6, 5, 10, 9, 'c'); d.l(10, 9, 8, 15, 'c'); d.l(12, 0, 11, 7, 'b'); d.l(11, 7, 9, 10, 'b'); d.p('y', 2, 3, 13, 12, 14, 4); d.p('G', 1, 8, 3, 12); }, SC);
add(G, B, 'in-thar', 'Sa mạc Thar (Rajasthan)', 'Thar Desert (Rajasthan)', 'Vùng đồi cát và lạc đà, nơi những pháo đài vàng như Jaisalmer nổi lên giữa nền cát.',
  d => { d.bg('c'); d.e(12, 2, 2, 2, 'y'); d.r(0, 9, 16, 7, 'u'); d.e(4, 12, 6, 3, 'y'); d.e(13, 11, 5, 2.4, 'u'); d.r(6, 6, 5, 4, 't'); d.r(5, 5, 7, 1, 'n'); d.p('n', 6, 4, 8, 4, 10, 4); d.e(3, 9, 1.4, 1.2, 'n'); d.r(2, 10, 1, 2, 'n'); }, SC);
add(G, B, 'in-tea', 'Đồi trà Darjeeling và Assam', 'Darjeeling and Assam tea hills', 'Những vùng chè nổi tiếng thế giới, mỗi nơi có hương vị riêng.',
  d => { d.bg('c'); d.tri(0, 3, 16, 5, 'a'); d.tri(5, 3, 6, 3, 'w'); d.r(0, 8, 16, 8, 'g'); for (let y = 9; y < 16; y += 2) { d.r(0, y, 16, 1, 'G'); for (let x = (y % 4) / 2; x < 16; x += 3) d.p('h', x, y); } d.p('r', 4, 11, 11, 13); }, SC);
add(G, B, 'in-sundarbans', 'Rừng đước Sundarbans', 'The Sundarbans mangrove forest', 'Khu rừng ngập mặn lớn nhất thế giới ở vùng châu thổ sông Hằng, nơi sinh sống của hổ Bengal.',
  d => { d.bg('C'); d.r(0, 12, 16, 4, 'B'); for (const x of [2, 6, 10, 14]) { d.e(x, 6, 2.4, 2.4, 'G'); d.l(x, 8, x - 1, 13, 'N'); d.l(x, 8, x + 1, 13, 'N'); d.l(x, 8, x, 12, 'n'); } d.p('c', 4, 14, 12, 14); d.p('o', 7, 10); d.p('k', 8, 10); }, SC);
add(G, B, 'in-coast', 'Bờ biển Kerala và Goa', 'Kerala and Goa coast', 'Bãi biển cọ dừa, đầm phá và những bãi cát dài ven Ấn Độ Dương và biển Ả Rập.',
  d => { d.bg('c'); d.e(12, 3, 2, 2, 'y'); d.r(0, 8, 16, 4, 'C'); d.r(0, 12, 16, 4, 'u'); for (const x of [3, 11]) { d.l(x, 14, x + 1, 5, 'n'); d.p('G', x - 2, 4, x - 1, 4, x + 2, 4, x + 3, 4, x, 3, x + 1, 3); d.p('g', x - 1, 5, x + 3, 5); } d.p('w', 5, 9, 9, 10); }, SC);

// ----- Vùng miền -----
add(G, C, 'in-north', 'Bắc Ấn (Delhi, Punjab, Uttar Pradesh)', 'North India (Delhi, Punjab, Uttar Pradesh)', 'Trung tâm lịch sử của các vương triều, nơi có Taj Mahal, lúa mì và nền ẩm thực nhiều bơ sữa.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'y'); d.r(4, 6, 8, 5, 'w'); d.e(8, 5, 3, 2.6, 'w'); d.p('y', 8, 2); d.r(1, 6, 1, 5, 'w'); d.r(14, 6, 1, 5, 'w'); d.p('Y', 3, 13, 7, 14, 12, 13); d.r(7, 8, 2, 3, 'a'); }, SC);
add(G, C, 'in-west', 'Tây Ấn (Rajasthan, Gujarat, Maharashtra, Goa)', 'West India (Rajasthan, Gujarat, Maharashtra, Goa)', 'Từ sa mạc và các pháo đài đến thủ phủ thương mại Mumbai và bờ biển Goa.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(0, 10, 16, 1, 'u'); d.r(1, 5, 5, 5, 't'); d.r(1, 4, 5, 1, 'n'); d.r(8, 3, 3, 7, 'a'); d.r(11, 6, 3, 4, 'A'); d.r(14, 8, 2, 2, 'a'); d.p('y', 9, 5, 12, 7, 9, 7); d.p('w', 2, 14, 11, 13); }, SC);
add(G, C, 'in-south', 'Nam Ấn (Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana)', 'South India (Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana)', 'Vùng ngôn ngữ Dravidian với đền tháp cao, lúa gạo và dừa.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.tri(4, 1, 8, 4, 'P'); d.r(5, 5, 6, 3, 'p'); d.r(4, 8, 8, 3, 'x'); d.r(3, 11, 10, 2, 'o'); d.p('y', 6, 6, 9, 6, 7, 9, 5, 12, 10, 12); d.l(1, 14, 2, 7, 'n'); d.p('G', 0, 6, 1, 6, 3, 6); d.p('G', 14, 8, 15, 8); }, SC);
add(G, C, 'in-east', 'Đông Ấn (Tây Bengal, Odisha, Bihar)', 'East India (West Bengal, Odisha, Bihar)', 'Vùng của Kolkata, văn học, cá và nơi đức Phật đạt giác ngộ ở Bodh Gaya.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(3, 8, 10, 4, 't'); d.tri(5, 2, 6, 6, 'n'); d.tri(7, 0, 2, 3, 'N'); d.e(8, 11, 3, 1, 'g'); d.p('y', 8, 0); d.p('k', 7, 9, 9, 9); d.p('w', 1, 14, 13, 14); }, SC);
add(G, C, 'in-northeast', 'Đông Bắc Ấn (Assam, Meghalaya, Nagaland và các bang lân cận)', 'Northeast India (Assam, Meghalaya, Nagaland and neighbouring states)', 'Nhiều dân tộc, rừng mưa và những đồi chè.',
  d => { d.bg('c'); d.tri(0, 3, 16, 5, 'A'); d.r(0, 8, 16, 8, 'G'); d.e(4, 10, 3.4, 3, 'g'); d.e(11, 9, 4, 3.4, 'g'); d.r(10, 11, 2, 4, 'N'); d.r(3, 12, 2, 3, 'N'); d.p('r', 4, 9, 12, 8); d.p('w', 5, 3, 11, 4); }, SC);
add(G, C, 'in-himalayareg', 'Himalaya và Kashmir, Ladakh', 'Himalaya, Kashmir and Ladakh', 'Núi cao, hồ băng và tu viện Phật giáo Tây Tạng.',
  d => { d.bg('c'); d.tri(1, 2, 14, 9, 'a'); d.tri(5, 2, 6, 4, 'w'); d.r(0, 11, 16, 5, 'u'); d.r(6, 7, 4, 4, 'w'); d.r(6, 6, 4, 1, 'r'); d.r(7, 9, 2, 2, 'R'); d.p('y', 8, 5); d.p('r', 2, 14, 13, 13); }, SC);
add(G, C, 'in-central', 'Trung Ấn (Madhya Pradesh, Chhattisgarh)', 'Central India (Madhya Pradesh, Chhattisgarh)', 'Cao nguyên, rừng và nhiều công viên hổ nổi tiếng.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'G'); d.e(4, 8, 3.2, 3.2, 'g'); d.e(12, 8, 3.2, 3.2, 'g'); d.r(3, 10, 2, 4, 'N'); d.r(11, 10, 2, 4, 'N'); d.e(8, 12, 3, 1.6, 'o'); d.p('k', 7, 11, 9, 11, 6, 12, 8, 12, 10, 12); d.p('w', 12, 2, 13, 3); }, SC);

// ----- Hiện tượng đặc biệt -----
add(G, E, 'in-monsoononset', 'Gió mùa đổ bộ Kerala', 'Monsoon onset over Kerala', 'Thường vào đầu tháng 6, báo hiệu mùa mưa tiến dần lên phía bắc.',
  d => { d.bg('K'); d.r(0, 12, 16, 4, 'C'); d.e(5, 4, 4, 2.4, 'a'); d.e(11, 5, 4, 2, 'A'); d.e(8, 3, 3, 1.6, 'l'); for (const x of [3, 6, 9, 12]) d.l(x, 7, x - 1, 11, 'c'); d.p('w', 2, 14, 10, 13); d.r(13, 10, 3, 2, 'G'); }, SC);
add(G, E, 'in-cherrapunji', 'Mawsynram và Cherrapunji', 'Mawsynram and Cherrapunji', 'Những nơi thuộc hàng mưa nhiều nhất hành tinh, nằm ở bang Meghalaya.',
  d => { d.bg('a'); d.r(0, 0, 16, 4, 'A'); d.tri(2, 5, 12, 8, 'G'); d.tri(0, 7, 6, 6, 'g'); for (const x of [1, 4, 7, 10, 13]) d.l(x, 3, x - 1, 8, 'c'); d.r(0, 14, 16, 2, 'C'); d.p('w', 6, 11, 10, 12); }, SC);
add(G, E, 'in-rootbridge', 'Cầu rễ cây sống (living root bridges)', 'Living root bridges', 'Người Khasi ở Meghalaya uốn rễ cây cao su thành cây cầu bắc qua suối, nhiều cầu có tuổi hàng trăm năm.',
  d => { d.bg('G'); d.r(0, 12, 16, 4, 'C'); d.r(0, 6, 3, 6, 'N'); d.r(13, 6, 3, 6, 'N'); d.l(2, 7, 7, 9, 'n'); d.l(7, 9, 13, 7, 'n'); d.l(2, 8, 7, 10, 'N'); d.l(7, 10, 13, 8, 'N'); d.l(4, 8, 4, 6, 'h'); d.l(10, 8, 10, 6, 'h'); d.p('g', 4, 3, 8, 2, 12, 3); d.p('w', 5, 14, 9, 15); }, SC);
add(G, E, 'in-rann', 'Sa mạc muối trắng Rann of Kutch', 'Rann of Kutch salt desert', 'Vùng đồng muối rộng ở Gujarat, mùa khô trắng xóa như tuyết, mùa mưa ngập nước.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'w'); d.r(0, 8, 16, 1, 'l'); for (const [x, y] of [[2, 10], [6, 12], [10, 10], [13, 13], [4, 14]]) d.p('l', x, y, x + 1, y); d.e(12, 3, 2, 2, 'y'); d.p('W', 1, 11, 8, 14, 14, 11); d.p('o', 7, 7); }, SC);
add(G, E, 'in-loktak', 'Đảo nổi trên hồ Loktak', 'Floating islands of Loktak Lake', 'Những mảng thực vật nổi (phumdi) ở bang Manipur, có cả công viên quốc gia nổi.',
  d => { d.bg('c'); d.r(0, 7, 16, 9, 'C'); d.r(0, 6, 16, 1, 'a'); d.e(4, 10, 3.4, 1.6, 'g'); d.e(11, 12, 4, 1.8, 'G'); d.e(8, 9, 2, 1, 'h'); d.p('t', 3, 9, 12, 11); d.l(11, 11, 11, 8, 'N'); d.p('y', 14, 2); d.p('w', 2, 14, 8, 15); }, SC);
add(G, E, 'in-lonar', 'Hố thiên thạch Lonar', 'Lonar meteor crater', 'Hồ nước mặn hình thành trong miệng hố va chạm ở bang Maharashtra.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'u'); d.e(8, 11, 7, 3.6, 'n'); d.e(8, 11, 5.4, 2.6, 'g'); d.e(8, 11, 4.4, 2, 'C'); d.p('w', 5, 11, 9, 12); d.p('G', 1, 9, 15, 9); d.p('y', 12, 2); d.p('w', 3, 3); }, SC);
add(G, E, 'in-kumbh', 'Lễ hội Kumbh Mela', 'Kumbh Mela', 'Hàng chục triệu người cùng tụ về bên sông thiêng, là một trong những cuộc tụ họp lớn nhất của nhân loại.',
  d => { d.bg('o'); d.r(0, 10, 16, 6, 'C'); for (let x = 0; x < 16; x += 2) { d.p('s', x, 8); d.p(x % 4 ? 'r' : 'y', x, 9); d.p('S', x + 1, 9); } for (let x = 1; x < 16; x += 2) d.p('k', x, 8); d.p('w', 3, 12, 8, 13, 12, 12); d.e(8, 3, 3, 3, 'y'); }, SC);
add(G, E, 'in-dolphin', 'Cá heo sông Hằng', 'Ganges river dolphin', 'Loài cá heo nước ngọt gần như mù, sống ở các con sông lớn.',
  d => { d.bg('C'); d.r(0, 0, 16, 4, 'c'); d.e(8, 9, 6, 2.6, 'a'); d.e(8, 10, 5, 1.4, 'l'); d.l(13, 9, 15, 7, 'a'); d.l(2, 9, 0, 6, 'A'); d.p('k', 12, 8); d.p('A', 7, 6, 8, 5); d.p('c', 3, 13, 11, 14); }, SC);
