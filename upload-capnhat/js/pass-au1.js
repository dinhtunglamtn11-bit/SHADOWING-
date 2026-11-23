import { add, SC, setCC } from './pass-kit.js';
setCC('au');
// Úc · Nhóm 1: Nơi chốn và thiên nhiên
const G = 1, A = 'Địa danh', B = 'Mùa và thiên nhiên', C = 'Vùng miền', E = 'Hiện tượng đặc biệt';
const red = d => { d.bg('c'); d.r(0, 11, 16, 5, 'O'); d.e(13, 3, 2, 2, 'y'); };

// ----- Địa danh -----
add(G, A, 'au-uluru', 'Uluru (Ayers Rock)', 'Uluru (Ayers Rock)', 'Khối đá cát kết khổng lồ đứng giữa sa mạc ở Northern Territory, đổi màu từ đỏ sẫm sang cam theo ánh mặt trời. Đây là nơi thiêng liêng với người Anangu, và việc leo lên đỉnh đã bị cấm từ năm 2019.',
  d => { red(d); d.e(8, 11, 7, 5, 'R'); d.e(8, 11, 6, 4, 'r'); d.r(2, 11, 12, 2, 'r'); d.p('R', 4, 9, 7, 8, 10, 8, 12, 10); d.p('o', 5, 10, 9, 9); d.r(0, 13, 16, 3, 'O'); d.p('G', 1, 14, 14, 14); }, SC);
add(G, A, 'au-opera', 'Nhà hát Con ốc Sydney (Sydney Opera House)', 'Sydney Opera House', 'Công trình mái vỏ sò giống cánh buồm bên cảng Sydney, khai trương năm 1973 và là biểu tượng của đất nước. Kiến trúc sư Jørn Utzon người Đan Mạch thiết kế, và nhà hát đã được UNESCO công nhận là Di sản Thế giới.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(1, 10, 14, 2, 'W'); d.tri(1, 4, 6, 6, 'w'); d.tri(5, 3, 6, 7, 'e'); d.tri(9, 5, 6, 5, 'w'); d.tri(11, 7, 4, 3, 'e'); d.p('l', 4, 7, 8, 6, 12, 8); d.p('w', 2, 13, 8, 14, 13, 13); }, SC);
add(G, A, 'au-bridge', 'Cầu cảng Sydney (Sydney Harbour Bridge)', 'Sydney Harbour Bridge', 'Cây cầu thép vòm khổng lồ khai trương năm 1932, người dân gọi đùa là "cái móc áo". Du khách có thể đi bộ lên đỉnh vòm cầu để ngắm thành phố.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.e(8, 11, 7, 7, 'a'); d.e(8, 12, 5.6, 6, 'c'); d.r(0, 10, 16, 2, 'A'); for (const x of [3, 5, 8, 11, 13]) d.l(x, 10, x, 6 + Math.floor(Math.abs(x - 8) / 2), 'a'); d.r(0, 9, 16, 1, 'k'); d.p('r', 1, 8, 14, 8); d.p('w', 3, 14, 11, 13); }, SC);
add(G, A, 'au-reef', 'Rạn san hô Great Barrier Reef', 'Great Barrier Reef', 'Hệ thống san hô lớn nhất thế giới chạy dọc bờ biển Queensland, nhìn thấy được từ vũ trụ. Nơi đây có hàng nghìn loài cá, rùa biển và san hô, nhưng đang bị đe dọa bởi nước biển ấm lên.',
  d => { d.bg('C'); d.r(0, 0, 16, 4, 'c'); d.r(0, 4, 16, 12, 'b'); d.p('o', 2, 12, 3, 11, 4, 12); d.p('p', 7, 13, 8, 12, 9, 13); d.p('r', 11, 12, 12, 11, 13, 12); d.p('g', 1, 14, 6, 14, 14, 14); d.e(6, 7, 1.6, 1, 'y'); d.p('k', 5, 7); d.e(11, 9, 2, 1.2, 'o'); d.p('w', 12, 9); }, SC);
add(G, A, 'au-gor', 'Great Ocean Road', 'Great Ocean Road', 'Con đường ven biển ở bang Victoria với những vách đá vôi, trong đó có nhóm đá Twelve Apostles. Đường được những cựu binh Thế chiến thứ nhất xây từ năm 1919 đến 1932 như một đài tưởng niệm.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'C'); for (const [x, h] of [[2, 5], [6, 7], [10, 4], [13, 6]]) { d.r(x, 12 - h + 4, 2, h, 'y'); d.r(x, 12 - h + 4, 1, h, 'u'); } d.r(0, 14, 16, 2, 'O'); d.l(0, 15, 15, 14, 'a'); d.p('w', 1, 12, 5, 13, 9, 12, 12, 13); }, SC);
add(G, A, 'au-kakadu', 'Vườn quốc gia Kakadu', 'Kakadu National Park', 'Vườn lớn ở vùng Bắc với đầm lầy, thác nước và nhiều bức tranh đá của thổ dân hàng nghìn năm tuổi. Đây là Di sản Thế giới hỗn hợp cả thiên nhiên và văn hóa.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(1, 3, 6, 9, 'O'); d.r(3, 5, 1, 5, 'w'); d.r(9, 5, 6, 7, 'R'); d.p('l', 3, 5, 3, 9); d.p('u', 11, 7, 13, 9); d.e(12, 8, 1, 1.2, 'u'); d.l(10, 10, 14, 10, 'u'); d.p('G', 7, 11, 8, 10, 8, 11); d.p('w', 3, 13, 12, 14); }, SC);
add(G, A, 'au-bluemtn', 'Blue Mountains', 'Blue Mountains', 'Dãy núi và hẻm đá cát phủ rừng bạch đàn, có sương mù màu xanh nhạt, cách Sydney chừng hai giờ. Nhóm đá Three Sisters ở đây gắn với một truyền thuyết thổ dân.',
  d => { d.bg('c'); d.r(0, 2, 16, 12, 'b'); d.tri(0, 4, 8, 9, 'B'); d.tri(8, 5, 8, 8, 'b'); d.r(0, 10, 16, 6, 'g'); d.r(3, 8, 2, 5, 'O'); d.r(6, 7, 2, 6, 'O'); d.r(9, 8, 2, 5, 'O'); d.p('G', 1, 12, 13, 13); d.p('l', 2, 3, 12, 4, 6, 5); }, SC);
add(G, A, 'au-melbourne', 'Melbourne và Federation Square', 'Melbourne and Federation Square', 'Melbourne nổi tiếng với ngõ hẻm graffiti, nhà ga Flinders Street và quảng trường Federation Square. Thành phố thường được nhắc là thủ đô văn hóa và cà phê.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(1, 6, 8, 7, 'y'); d.e(5, 6, 2.6, 2, 'G'); d.r(2, 8, 1, 3, 'k'); d.r(4, 8, 1, 3, 'k'); d.r(6, 8, 1, 3, 'k'); d.r(10, 3, 5, 10, 'a'); d.p('b', 11, 5, 13, 5, 11, 8, 13, 8, 11, 11, 13, 11); d.p('r', 3, 4, 7, 4); }, SC);

// ----- Mùa và thiên nhiên -----
add(G, B, 'au-summer', 'Mùa hè (tháng 12 đến tháng 2)', 'Summer (December–February)', 'Trời nóng, nhiều người đi biển và ăn Giáng sinh ngoài trời. Đây cũng là mùa cháy rừng ở nhiều vùng.',
  d => { d.bg('c'); d.e(12, 3, 2.6, 2.6, 'y'); d.r(0, 9, 16, 4, 'C'); d.r(0, 12, 16, 4, 'u'); d.tri(3, 5, 6, 4, 'r'); d.l(6, 9, 6, 13, 'N'); d.p('w', 2, 10, 9, 11, 13, 10); }, SC);
add(G, B, 'au-autumn', 'Mùa thu (tháng 3 đến tháng 5)', 'Autumn (March–May)', 'Trời dịu, lá cây đổi màu ở miền nam như Victoria và Tasmania. Nhiều người tranh thủ đi bộ và dã ngoại.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'O'); for (const x of [3, 8, 13]) { d.e(x, 6, 2.6, 2.6, ['o', 'r', 'y'][x % 3]); d.r(x, 8, 1, 5, 'N'); } d.p('o', 5, 14, 10, 15, 12, 13); d.p('w', 1, 2, 12, 2); }, SC);
add(G, B, 'au-winter', 'Mùa đông (tháng 6 đến tháng 8)', 'Winter (June–August)', 'Lạnh ở miền nam và có tuyết trên dãy Alps Úc, trong khi miền Bắc lại khô ráo dễ chịu. Đây là mùa trượt tuyết và đến Outback.',
  d => { d.bg('c'); d.tri(1, 4, 8, 9, 'w'); d.tri(8, 6, 8, 7, 'l'); d.r(0, 12, 16, 4, 'w'); d.p('w', 3, 1, 9, 2, 13, 1, 6, 3); d.l(12, 13, 14, 11, 'r'); d.p('k', 13, 10); }, SC);
add(G, B, 'au-spring', 'Mùa xuân (tháng 9 đến tháng 11)', 'Spring (September–November)', 'Hoa nở, đồng cỏ xanh và nhiều loài chim làm tổ. Ở Tây Úc có mùa hoa dại nở rộ màu sắc.',
  d => { d.bg('c'); d.e(13, 3, 2, 2, 'y'); d.r(0, 10, 16, 6, 'g'); for (const [x, y, c] of [[2, 12, 'p'], [5, 14, 'y'], [8, 12, 'r'], [11, 14, 'v'], [14, 12, 'y'], [3, 10, 'v'], [10, 10, 'p']]) { d.p(c, x, y); d.p('G', x, y + 1); } d.p('k', 6, 5, 7, 4); }, SC);
add(G, B, 'au-gum', 'Rừng bạch đàn (eucalyptus)', 'Eucalyptus forest', 'Loại cây phổ biến nhất, lá có dầu thơm và dễ bắt lửa. Một số loài cần lửa để hạt nảy mầm.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); for (const x of [3, 8, 13]) { d.r(x, 5, 1, 9, 'W'); d.e(x, 4, 2.6, 2.6, 'G'); d.p('g', x - 1, 3, x + 1, 5); d.p('a', x, 9, x, 12); } d.p('O', 1, 14, 15, 14); }, SC);
add(G, B, 'au-wattle', 'Hoa golden wattle', 'Golden wattle', 'Loại keo hoa vàng, là quốc hoa của nước này. Màu xanh và vàng của nó cũng là màu đồ thể thao quốc gia.',
  d => { d.bg('c'); d.l(3, 15, 9, 7, 'G'); d.l(8, 15, 12, 6, 'G'); for (const [x, y] of [[5, 5], [8, 4], [11, 5], [7, 7], [10, 8], [13, 7], [4, 8]]) { d.e(x, y, 1.6, 1.6, 'y'); d.p('Y', x, y); } d.p('g', 2, 12, 5, 11, 12, 11, 14, 12); }, SC);
add(G, B, 'au-daintree', 'Rừng mưa nhiệt đới Daintree', 'Daintree Rainforest', 'Ở Queensland, là một trong những khu rừng mưa lâu đời nhất thế giới. Rừng nằm sát biển nên người ta có thể đi từ rừng ra bãi cát.',
  d => { d.bg('G'); d.r(0, 0, 16, 3, 'g'); d.r(0, 12, 16, 4, 'C'); d.r(0, 11, 16, 1, 'u'); for (const x of [2, 6, 10]) { d.r(x, 4, 2, 8, 'N'); d.e(x + 1, 3, 3, 2.4, 'g'); } d.p('h', 1, 5, 8, 2, 12, 4, 14, 7); d.p('w', 11, 13, 14, 14); d.l(13, 11, 13, 7, 'n'); d.p('G', 12, 6, 14, 6, 13, 5); }, SC);

// ----- Vùng miền -----
add(G, C, 'au-nsw', 'New South Wales (NSW)', 'New South Wales (NSW)', 'Bang đông dân nhất, thủ phủ là Sydney, nơi đến đầu tiên của người châu Âu năm 1788. Bang có bờ biển, núi Blue Mountains và vùng nông nghiệp rộng.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(0, 9, 16, 2, 'y'); d.tri(1, 4, 5, 5, 'w'); d.tri(5, 3, 5, 6, 'e'); d.tri(9, 5, 5, 4, 'w'); d.r(12, 6, 3, 3, 'b'); d.p('k', 13, 7); d.p('w', 3, 13, 10, 14); }, SC);
add(G, C, 'au-vic', 'Victoria', 'Victoria', 'Bang nhỏ nhất trên lục địa, thủ phủ Melbourne, nổi tiếng với văn hóa cà phê và thể thao. Thời tiết thay đổi thất thường, có thể có cả bốn mùa trong một ngày.',
  d => { d.bg('c'); d.e(4, 3, 3, 2, 'l'); d.e(11, 3, 2, 1.6, 'w'); d.l(6, 6, 5, 9, 'b'); d.p('y', 12, 6); d.r(0, 10, 16, 6, 'g'); d.r(5, 10, 6, 3, 'n'); d.r(6, 11, 4, 2, 'w'); d.p('k', 7, 12, 9, 12); d.p('o', 12, 8); }, SC);
add(G, C, 'au-qld', 'Queensland', 'Queensland', 'Bang nắng ấm ở đông bắc với Great Barrier Reef, bãi biển Gold Coast và rừng mưa. Thủ phủ là Brisbane.',
  d => { d.bg('c'); d.e(12, 3, 2.6, 2.6, 'y'); d.r(0, 9, 16, 7, 'C'); d.r(0, 12, 16, 4, 'u'); d.l(4, 12, 4, 6, 'N'); d.p('G', 1, 5, 2, 4, 6, 4, 7, 5, 2, 6, 6, 6); d.r(10, 11, 3, 1, 'r'); d.p('w', 8, 10, 13, 9); }, SC);
add(G, C, 'au-wa', 'Tây Úc (Western Australia)', 'Western Australia', 'Bang lớn nhất về diện tích, thủ phủ Perth, rất xa các thành phố đông. Nơi đây có mỏ khoáng sản lớn và nhiều bãi biển hoang sơ.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'O'); d.r(0, 8, 16, 2, 'o'); d.e(4, 4, 2, 2, 'y'); d.r(9, 11, 5, 3, 'a'); d.r(10, 9, 3, 2, 'A'); d.p('k', 10, 14, 13, 14); d.p('R', 2, 12, 6, 14); d.p('y', 14, 4); }, SC);
add(G, C, 'au-sa', 'Nam Úc (South Australia)', 'South Australia', 'Bang khô hạn nổi tiếng với rượu vang vùng Barossa. Thủ phủ là Adelaide.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'y'); for (let y = 9; y < 16; y += 2) { d.r(0, y, 16, 1, 'G'); for (let x = 1 + y % 3; x < 16; x += 3) d.p('v', x, y); } d.e(13, 3, 2, 2, 'o'); }, SC);
add(G, C, 'au-tas', 'Tasmania', 'Tasmania', 'Hòn đảo phía nam có rừng ôn đới hoang sơ và khí hậu mát. Nhiều người đến đây để đi bộ và thưởng thức ẩm thực.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.tri(2, 5, 12, 7, 'G'); d.tri(5, 4, 6, 5, 'g'); d.tri(7, 4, 2, 2, 'w'); d.p('N', 4, 11, 8, 11, 11, 11); d.p('w', 1, 14, 8, 15, 13, 14); }, SC);
add(G, C, 'au-nt', 'Northern Territory (NT)', 'Northern Territory (NT)', 'Vùng Bắc thưa dân, có Uluru, Kakadu và thành phố Darwin. Tỉ lệ dân bản địa ở đây cao hơn các bang khác.',
  d => { d.bg('c'); d.e(8, 3, 3, 3, 'y'); d.r(0, 10, 16, 6, 'O'); d.e(4, 11, 4, 2.4, 'R'); d.e(12, 12, 3, 2, 'r'); d.l(8, 10, 8, 6, 'N'); d.p('G', 6, 5, 7, 4, 9, 4, 10, 5); d.p('o', 2, 14, 14, 15); }, SC);
add(G, C, 'au-canberra', 'Thủ đô Canberra (ACT)', 'Canberra (ACT)', 'Thủ đô được quy hoạch riêng, nằm giữa Sydney và Melbourne. Đây là nơi đặt Quốc hội và nhiều bảo tàng quốc gia.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.r(2, 8, 12, 4, 'w'); d.tri(2, 5, 12, 3, 'e'); d.l(8, 1, 8, 5, 'a'); d.r(8, 1, 3, 2, 'r'); d.r(6, 9, 4, 3, 'k'); d.p('b', 3, 9, 12, 9); d.p('C', 1, 14, 14, 14); }, SC);

// ----- Hiện tượng đặc biệt -----
add(G, E, 'au-outback', 'Outback', 'The Outback', 'Vùng nội địa khô cằn, đất đỏ, dân cư thưa thớt và khoảng cách giữa các thị trấn rất xa. Một số trại chăn nuôi có diện tích lớn hơn cả nhiều nước nhỏ.',
  d => { red(d); d.r(0, 11, 16, 5, 'r'); d.l(0, 13, 15, 12, 'o'); d.l(8, 15, 8, 12, 'O'); d.p('o', 3, 14, 12, 15); d.l(13, 11, 13, 7, 'N'); d.p('G', 12, 6, 14, 6, 13, 5); d.r(3, 10, 3, 1, 'N'); d.p('N', 3, 9, 5, 9); }, SC);
add(G, E, 'au-bushfire', 'Cháy rừng (bushfire)', 'Bushfires', 'Mùa hè khô nóng thường gây cháy rừng lớn. Mùa cháy 2019–2020 đã đốt cháy hơn 18 triệu hecta.',
  d => { d.bg('R'); d.r(0, 0, 16, 5, 'K'); d.r(0, 12, 16, 4, 'k'); for (const x of [2, 6, 10, 14]) { d.tri(x - 2, 6, 4, 8, 'o'); d.tri(x - 1, 8, 2, 6, 'y'); } d.r(1, 12, 1, 3, 'N'); d.r(7, 12, 1, 3, 'N'); d.p('a', 4, 2, 9, 3, 12, 1); }, SC);
add(G, E, 'au-hillier', 'Hồ muối hồng Lake Hillier', 'Lake Hillier (pink lake)', 'Hồ nước màu hồng ở Tây Úc, nước vẫn giữ màu khi để trong chai. Nguyên nhân được cho là do các vi sinh vật ưa mặn.',
  d => { d.bg('c'); d.r(0, 3, 16, 3, 'G'); d.r(0, 6, 16, 4, 'p'); d.e(8, 8, 6, 2.4, 'x'); d.r(0, 10, 16, 3, 'w'); d.r(0, 13, 16, 3, 'C'); d.p('P', 5, 8, 11, 8); d.p('g', 3, 4, 13, 4); }, SC);
add(G, E, 'au-pinnacles', 'Cánh đồng đá Pinnacles', 'The Pinnacles', 'Các trụ đá vôi mọc giữa cát vàng ở Nambung (Tây Úc). Chúng hình thành qua hàng nghìn năm.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'y'); for (const [x, h] of [[2, 5], [5, 7], [8, 4], [11, 6], [14, 3]]) { d.tri(x - 1, 12 - h, 2, h, 'u'); d.p('Y', x, 12 - h + 2); } d.e(13, 3, 1.6, 1.6, 'o'); d.p('Y', 1, 14, 9, 15, 13, 14); }, SC);
add(G, E, 'au-aurora', 'Ánh sáng phương Nam (Aurora Australis)', 'Southern Lights (Aurora Australis)', 'Ở Tasmania, đôi khi có thể nhìn thấy cực quang xanh và tím trên bầu trời đêm. Đây là phiên bản phương nam của cực quang phương bắc.',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'k'); d.tri(1, 3, 5, 10, 'g'); d.tri(5, 2, 6, 11, 'v'); d.tri(10, 4, 5, 9, 'g'); d.tri(3, 5, 3, 8, 'h'); d.p('w', 1, 1, 8, 1, 14, 2, 12, 1); d.tri(6, 10, 4, 3, 'G'); }, SC);
add(G, E, 'au-nightsky', 'Sao trời và Thiên hà ở Outback', 'Stars and the Milky Way in the Outback', 'Vì ít ánh sáng, bầu trời đêm Outback rất rõ. Người thổ dân có nhiều câu chuyện về dải Ngân Hà, ví dụ "con emu trên bầu trời".',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'R'); d.l(2, 11, 14, 2, 'K'); d.l(3, 11, 15, 3, 'K'); d.l(4, 11, 13, 1, 'K'); for (let i = 0; i < 9; i++) d.p('l', 1 + i * 2, 1 + (i * 5) % 9); d.p('y', 8, 6, 5, 4); d.e(6, 13, 2, 1, 'N'); }, SC);
