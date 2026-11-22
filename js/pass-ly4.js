import { add, SC, setCC } from './pass-kit.js';
setCC('ly');
// Libya · Nhóm 4: Văn hóa và nghệ thuật
const G = 4, A = 'Lễ hội', B = 'Nhạc cụ và nghệ thuật biểu diễn', C = 'Hội họa và kiến trúc', E = 'Văn hóa hiện đại';
const H = { use: 'hold' };
const moon = (d, x, y) => { d.e(x, y, 2.4, 2.4, 'y'); d.e(x + 1, y, 2, 2, 'B'); };
const mosque = (d, bgc = 'B') => { d.bg(bgc); d.r(0, 13, 16, 3, 'k'); d.e(8, 8, 4.6, 4, 'w'); d.r(3, 8, 10, 5, 'w'); d.l(8, 3, 8, 4, 'y'); d.r(1, 5, 2, 8, 'W'); d.r(13, 5, 2, 8, 'W'); d.p('y', 2, 4, 14, 4); d.r(7, 10, 2, 3, 'B'); };

// ----- Lễ hội -----
add(G, A, 'ly-eidfitr', 'Eid al-Fitr', 'Eid al-Fitr', 'Lễ kết thúc tháng Ramadan, gia đình mặc đồ mới, viếng thăm nhau và chia bánh. Trẻ em thường được tặng tiền mừng và quà.',
  d => { d.bg('B'); moon(d, 4, 4); d.p('y', 11, 2, 13, 4, 9, 5); d.r(3, 10, 4, 5, 'r'); d.r(9, 10, 4, 5, 'g'); d.e(5, 8, 1.4, 1.4, 's'); d.e(11, 8, 1.4, 1.4, 's'); d.p('y', 14, 8, 1, 7); }, SC);
add(G, A, 'ly-eidadha2', 'Eid al-Adha', 'Eid al-Adha', 'Lễ hiến tế trong tháng hành hương, nhiều gia đình giết cừu và chia thịt cho hàng xóm và người nghèo. Đây là một trong hai ngày lễ lớn nhất trong năm.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'u'); d.e(8, 9, 4, 3.2, 'w'); d.e(12, 7, 2, 2, 'w'); d.l(13, 5, 15, 3, 'W'); d.p('k', 13, 7); d.r(5, 12, 1, 3, 'a'); d.r(10, 12, 1, 3, 'a'); d.r(1, 2, 3, 3, 'y'); d.p('G', 2, 3); }, SC);
add(G, A, 'ly-ramadan', 'Ramadan', 'Ramadan', 'Tháng nhịn ăn ban ngày, ban đêm phố xá đông đúc, chợ đêm và quán trà mở cửa muộn. Nhiều gia đình dành thời gian đọc Kinh Qur\'an cùng nhau.',
  d => { d.bg('B'); moon(d, 5, 4); d.p('y', 11, 2, 9, 7, 13, 6, 3, 8); d.l(12, 6, 12, 11, 'a'); d.r(11, 11, 3, 4, 'o'); d.r(11, 10, 3, 1, 'y'); d.p('y', 12, 12); d.r(0, 14, 16, 2, 'K'); }, SC);
add(G, A, 'ly-mawlid', 'Mawlid (sinh nhật Tiên tri Muhammad)', 'Mawlid (Prophet\'s birthday)', 'Ngày lễ tổ chức đọc thơ ca ngợi, ăn đồ ngọt và thắp đèn. Người ta thường làm món bánh đặc biệt gọi là asida.',
  d => { d.bg('G'); for (const x of [3, 8, 13]) { d.r(x - 1, 4, 3, 5, 'y'); d.r(x - 1, 3, 3, 1, 'Y'); d.r(x - 1, 9, 3, 1, 'Y'); d.p('o', x, 6); d.l(x, 2, x, 1, 'Y'); } d.p('w', 1, 12, 5, 13, 10, 12, 14, 13); d.r(2, 14, 12, 1, 'g'); }, SC);
add(G, A, 'ly-ghadamesfest', 'Lễ hội Ghadames', 'Ghadames Festival', 'Lễ hội vui tươi ở ốc đảo Ghadames với âm nhạc, nhảy múa và trang phục truyền thống. Lễ thường được tổ chức vào mùa thu khi trời dịu.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'u'); d.r(1, 6, 4, 6, 'w'); d.r(11, 6, 4, 6, 'w'); for (const [x, c] of [[6, 'r'], [8, 'b'], [10, 'o']]) { d.e(x, 8, 1, 1.2, 's'); d.r(x - 1, 9, 2, 4, c); } d.p('y', 3, 3, 13, 3, 8, 2); d.l(2, 5, 14, 5, 'r'); }, SC);
add(G, A, 'ly-independence', 'Ngày Độc lập 24/12', 'Independence Day (December 24)', 'Libya có Ngày Độc lập 24 tháng 12, kỷ niệm ngày giành độc lập năm 1951, sau quá trình do Liên Hợp Quốc thúc đẩy. Nhiều ngày kỷ niệm khác phụ thuộc vào thời kỳ và biến động chính trị.',
  d => { d.bg('k'); d.r(1, 3, 14, 3, 'r'); d.r(1, 6, 14, 4, 'K'); d.r(1, 10, 14, 3, 'g'); d.e(7, 8, 2.2, 2.2, 'w'); d.e(8, 8, 1.8, 1.8, 'K'); d.p('w', 10, 8); d.l(0, 2, 0, 15, 'a'); }, SC);
add(G, A, 'ly-harvest', 'Mùa thu hoạch chà là', 'Date harvest season', 'Các làng ở ốc đảo tổ chức thu hoạch quả cọ vào mùa thu với sự giúp đỡ của cả cộng đồng. Đây là dịp gặp gỡ và chia sẻ mùa màng.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'u'); d.l(5, 12, 5, 4, 'N'); d.p('G', 2, 3, 3, 2, 7, 2, 8, 3, 3, 4, 7, 4); d.r(3, 5, 4, 2, 'O'); d.e(11, 12, 3, 2, 'n'); for (const [x, y] of [[10, 11], [12, 11], [11, 10]]) d.p('N', x, y); d.e(12, 5, 1, 1, 's'); d.r(11, 6, 2, 4, 'r'); }, SC);

// ----- Nhạc cụ và nghệ thuật biểu diễn -----
add(G, B, 'ly-mizwad', 'Mizwad (túi da kèn)', 'Mizwad (bagpipe)', 'Loại kèn túi da có âm thanh khàn, giống kèn bagpipe, chơi trong đám cưới và lễ hội. Tiếng kèn thường đi cùng trống.',
  d => { d.bg('e'); d.e(7, 9, 4, 4, 'n'); d.e(7, 9, 2.6, 2.6, 'O'); d.l(9, 6, 14, 2, 'N'); d.l(5, 6, 3, 2, 'N'); d.l(8, 6, 8, 1, 'N'); d.p('y', 14, 2, 3, 2, 8, 1); d.p('r', 7, 9); d.r(5, 13, 5, 1, 'N'); }, H);
add(G, B, 'ly-ghaita', 'Ghaita (kèn oboe)', 'Ghaita (oboe)', 'Kèn gỗ âm cao và chói, thường chơi ngoài trời. Tiếng kèn vang xa nên phù hợp với các cuộc diễu hành.',
  d => { d.bg('e'); d.l(2, 14, 11, 4, 'n'); d.l(3, 14, 12, 4, 'N'); d.tri(10, 11, 5, 4, 'Y'); d.p('k', 4, 12, 6, 10, 8, 8); d.p('y', 12, 2, 13, 1, 14, 2); d.p('Y', 11, 3); }, H);
add(G, B, 'ly-darbuka', 'Trống darbuka và trống khung (bendir)', 'Darbuka and bendir drums', 'Trống cốc nhỏ và trống khung phủ da, dùng đệm cho mọi loại nhạc dân gian. Người chơi thường vừa đánh vừa hát.',
  d => { d.bg('e'); d.tri(1, 5, 7, 8, 'Y'); d.r(1, 5, 7, 2, 'w'); d.r(2, 12, 5, 2, 'y'); d.p('R', 3, 8, 5, 10); d.e(11, 9, 4.4, 4.4, 'n'); d.e(11, 9, 3.4, 3.4, 'u'); d.p('N', 11, 9, 9, 8, 13, 10); }, H);
add(G, B, 'ly-oud', 'Oud (đàn lute Ả Rập)', 'Oud (Arabic lute)', 'Đàn dây có thân tròn như quả lê, phổ biến ở toàn thế giới Ả Rập. Trong nhạc Libya, nó đệm cho những bài hát tình cảm.',
  d => { d.bg('e'); d.e(6, 11, 4.4, 4, 'n'); d.e(6, 11, 2, 1.8, 'k'); d.l(8, 8, 14, 2, 'N'); d.l(9, 8, 15, 2, 'N'); d.r(13, 1, 3, 2, 'N'); d.p('l', 6, 8, 6, 14); d.p('y', 4, 12, 8, 12); }, H);
add(G, B, 'ly-imzad', 'Imzad của người Tuareg', 'Tuareg imzad', 'Đàn một dây có cần cung, chủ yếu do phụ nữ chơi. Tiếng đàn trầm và buồn thường đi kèm thơ về tình yêu và sa mạc.',
  d => { d.bg('e'); d.e(8, 11, 4.4, 3.4, 'n'); d.e(8, 11, 2.4, 1.8, 'u'); d.l(8, 8, 8, 1, 'N'); d.l(8, 8, 8, 14, 'l'); d.l(3, 3, 13, 10, 'O'); d.p('k', 8, 11); d.p('r', 8, 1); }, H);
add(G, B, 'ly-malouf', 'Malouf và nhạc Andalus', 'Malouf and Andalusian music', 'Lối nhạc cổ điển ở Bắc Phi có nguồn gốc từ Tây Ban Nha thời Hồi giáo. Libya chịu ảnh hưởng từ Tunisia và Algeria về phong cách này.',
  d => { d.bg('P'); d.r(1, 8, 14, 7, 'm'); d.e(8, 8, 5, 5, 'R'); d.r(3, 8, 10, 7, 'R'); d.e(8, 11, 2, 2.6, 'k'); d.r(7, 11, 2, 4, 'k'); d.p('y', 3, 7, 13, 7, 8, 5); d.p('Y', 4, 10, 12, 10); d.p('w', 2, 2, 8, 3, 13, 2); }, SC);
add(G, B, 'ly-nabati', 'Thơ truyền miệng của người Bedouin (shi\'r nabati)', 'Bedouin oral poetry (shi\'r nabati)', 'Những bài thơ dân gian về tình yêu, danh dự và chuyến đi. Nhiều bài được truyền miệng qua nhiều thế hệ.',
  d => { d.bg('B'); d.r(0, 12, 16, 4, 'N'); d.e(4, 6, 1.4, 1.4, 's'); d.r(3, 8, 3, 4, 'e'); d.e(11, 6, 1.4, 1.4, 's'); d.r(10, 8, 3, 4, 'e'); d.p('y', 7, 4, 8, 3, 9, 4, 8, 6); d.p('w', 6, 2, 10, 2); d.tri(6, 9, 4, 3, 'O'); d.p('y', 8, 10); }, SC);
add(G, B, 'ly-dance', 'Nhảy múa dân gian', 'Folk dances', 'Điệu nhảy tập thể theo vòng, người tham gia vỗ tay và hát. Ở miền núi và ốc đảo, các điệu nhảy mang nét riêng.',
  d => { d.bg('u'); for (const [x, c] of [[3, 'r'], [6, 'b'], [10, 'g'], [13, 'o']]) { d.e(x, 5, 1, 1.2, 's'); d.r(x - 1, 6, 2, 5, c); d.l(x - 1, 7, x - 2, 5, c); d.l(x + 1, 7, x + 2, 5, c); } d.r(0, 13, 16, 3, 'O'); d.p('w', 3, 14, 10, 14); }, SC);

// ----- Hội họa và kiến trúc -----
add(G, C, 'ly-rockart', 'Nghệ thuật đá ở Acacus', 'Acacus rock art', 'Tranh và khắc trên đá thời tiền sử, miêu tả động vật và con người. Đây là một trong những bộ sưu tập nghệ thuật đá quan trọng nhất Bắc Phi.',
  d => { d.bg('O'); d.r(1, 1, 14, 14, 'o'); d.e(5, 8, 3, 1.6, 'R'); d.l(3, 9, 3, 12, 'R'); d.l(7, 9, 7, 12, 'R'); d.l(8, 7, 10, 4, 'R'); d.e(11, 3, 1, 1, 'R'); d.l(10, 13, 13, 13, 'w'); d.p('w', 12, 11, 14, 8); d.p('R', 12, 9, 13, 10); }, SC);
add(G, C, 'ly-romanart', 'Di tích La Mã ở Leptis Magna', 'Roman remains at Leptis Magna', 'Những cột đá cẩm thạch, khải hoàn môn và các bức phù điêu có phần của thời Septimius Severus. Nhiều tác phẩm được giữ trong bảo tàng hoặc tại chỗ.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.r(2, 3, 12, 3, 'e'); d.r(1, 2, 14, 1, 'W'); d.r(2, 6, 3, 7, 'e'); d.r(11, 6, 3, 7, 'e'); d.r(5, 6, 6, 1, 'w'); d.e(8, 6, 3, 3, 'c'); d.p('W', 3, 8, 12, 9, 3, 11); d.p('k', 7, 3, 8, 3); }, SC);
add(G, C, 'ly-mosaic', 'Tranh khảm ở Villa Dar Buc Ammera', 'Mosaics at Villa Dar Buc Ammera', 'Biệt thự La Mã ở Zliten có sàn khảm rất đẹp với cảnh đấu trường và cảnh đồng quê. Một số tác phẩm được trưng bày ở Tripoli.',
  d => { d.bg('e'); for (let y = 1; y < 15; y += 2) for (let x = 1; x < 15; x += 2) d.r(x, y, 2, 2, ((x + y) / 2) % 3 === 0 ? 'r' : ((x + y) / 2) % 3 === 1 ? 'y' : 'b'); d.e(8, 8, 3.4, 3.4, 'w'); d.e(8, 8, 2, 2, 'n'); d.p('k', 7, 7, 9, 7); }, SC);
add(G, C, 'ly-mosques', 'Nhà thờ Hồi giáo cổ ở Tripoli', 'Old mosques of Tripoli', 'Các thánh đường Gurgi, Karamanli và Naqah ở Tripoli thể hiện phong cách Ottoman. Mỗi nơi có mái vòm và gạch men trang trí.',
  d => { mosque(d, 'c'); d.r(0, 13, 16, 3, 'u'); d.p('g', 4, 10, 11, 10); d.p('b', 5, 10, 10, 10); }, SC);
add(G, C, 'ly-copper', 'Gốm và đồ đồng chạm khắc', 'Pottery and engraved copperware', 'Gốm sơn tay và đồ đồng chạm khắc là nghề thủ công phổ biến ở Tripoli và Ghadames. Du khách thường mua làm quà lưu niệm.',
  d => { d.bg('e'); d.e(5, 10, 3.6, 4, 'o'); d.r(4, 3, 3, 3, 'O'); d.p('b', 3, 9, 7, 9, 4, 12, 6, 12); d.e(12, 9, 3, 5, 'Y'); d.r(10, 3, 4, 2, 'y'); d.p('O', 11, 8, 13, 8, 12, 11); }, SC);
add(G, C, 'ly-ottoman', 'Pháo đài và công trình Ottoman', 'Ottoman fortresses and buildings', 'Pháo đài và phòng thủ ven biển giữ dấu ấn của thời Ottoman. Pháo đài Đỏ ở Tripoli là ví dụ nổi bật.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(1, 5, 14, 8, 'R'); for (let x = 1; x < 15; x += 3) d.r(x, 3, 2, 2, 'r'); d.r(1, 4, 14, 1, 'r'); d.r(6, 8, 4, 5, 'k'); d.e(8, 8, 2, 2, 'k'); d.p('N', 3, 7, 12, 7); d.p('w', 3, 14, 11, 15); }, SC);
add(G, C, 'ly-italianarch', 'Lối kiến trúc của người Ý', 'Italian colonial architecture', 'Các công trình thời thuộc địa như nhà thờ lớn và các tòa nhà hành chính ở Tripoli. Một số còn dùng đến ngày nay.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(2, 4, 12, 10, 'u'); d.tri(1, 1, 14, 3, 'e'); d.r(6, 9, 4, 5, 'N'); d.e(8, 9, 2, 2, 'N'); for (const x of [3, 11]) { d.r(x, 6, 2, 3, 'b'); d.r(x, 10, 2, 3, 'b'); } d.l(8, 1, 8, 0, 'k'); }, SC);

// ----- Văn hóa hiện đại -----
add(G, E, 'ly-koni', 'Thơ và văn học Ả Rập đương đại', 'Contemporary Arabic literature', 'Các nhà văn như Ibrahim al-Koni viết về sa mạc và Tuareg bằng tiếng Ả Rập. Tác phẩm của ông được dịch sang nhiều thứ tiếng.',
  d => { d.bg('u'); d.r(2, 3, 5, 10, 'N'); d.r(7, 3, 7, 10, 'o'); d.r(3, 4, 3, 1, 'y'); d.r(8, 5, 5, 1, 'w'); d.r(8, 7, 4, 1, 'w'); d.r(8, 9, 5, 1, 'w'); d.r(2, 13, 12, 1, 'k'); d.e(4, 9, 1, 1, 'y'); }, SC);
add(G, E, 'ly-matar', 'Nhà văn Hisham Matar', 'Writer Hisham Matar', 'Nhà văn gốc Libya viết tiếng Anh, tác giả "The Return" và "In the Country of Men". Sách của ông được đọc ở nhiều nơi trên thế giới.',
  d => { d.bg('P'); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 2, 'k'); d.r(4, 9, 8, 7, 'K'); d.r(7, 9, 2, 3, 'w'); d.p('k', 7, 6, 9, 6); d.p('N', 7, 8, 9, 8); d.r(10, 11, 4, 4, 'r'); d.r(10, 11, 4, 1, 'y'); }, SC);
add(G, E, 'ly-football', 'Bóng đá', 'Football', 'Môn thể thao phổ biến nhất, với các câu lạc bộ như Al-Ahli Tripoli và Al-Ittihad. Các trận đấu địa phương thu hút đông đảo cổ vũ.',
  d => { d.bg('g'); d.r(0, 0, 16, 16, 'g'); for (let x = 0; x < 16; x += 4) d.r(x, 0, 2, 16, 'h'); d.r(0, 7, 16, 1, 'w'); d.e(8, 8, 3, 3, 'w'); d.e(8, 8, 2.6, 2.6, 'w'); d.p('k', 8, 6, 6, 8, 10, 8, 8, 10, 8, 8); }, SC);
add(G, E, 'ly-pop', 'Nhạc pop và nhạc trẻ ở thành phố', 'Pop and youth music in cities', 'Ca sĩ trẻ pha nhạc Libya với nhạc hiện đại. Mạng xã hội là nơi chính để chia sẻ.',
  d => { d.bg('V'); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 2, 'p'); d.r(5, 9, 6, 6, 'v'); d.r(11, 3, 2, 4, 'k'); d.e(12, 3, 1.4, 1.4, 'k'); d.p('y', 14, 2, 2, 4, 13, 12, 3, 12); d.p('p', 7, 6, 9, 6); d.p('w', 1, 9, 14, 9); }, SC);
add(G, E, 'ly-tv', 'Phim và truyền hình trong Ramadan', 'Film and TV in Ramadan', 'Các bộ phim truyền hình phát vào ban đêm trong tháng chay được nhiều gia đình theo dõi. Phim Libya đang dần hồi phục.',
  d => { d.bg('B'); d.r(2, 3, 12, 8, 'k'); d.r(3, 4, 10, 6, 'c'); d.e(8, 7, 2, 2, 'y'); d.e(9, 7, 1.6, 1.6, 'c'); d.r(6, 11, 4, 2, 'a'); d.r(4, 13, 8, 1, 'a'); d.p('y', 13, 1, 2, 1); }, SC);
add(G, E, 'ly-message', 'Phim "The Message" (Thông điệp)', 'The Message (1976 film)', 'Phim năm 1976 về đạo Hồi, quay một phần ở Libya, đạo diễn Moustapha Akkad. Đây là một trong những bộ phim nổi tiếng nhất về chủ đề này.',
  d => { d.bg('k'); d.r(1, 2, 14, 12, 'o'); d.r(2, 3, 12, 10, 'u'); d.r(0, 1, 16, 1, 'a'); d.r(0, 14, 16, 1, 'a'); for (let y = 2; y < 15; y += 2) { d.p('k', 0, y, 15, y); } d.e(8, 8, 3, 3, 'O'); d.p('y', 8, 8); d.tri(5, 10, 6, 3, 'N'); }, SC);
