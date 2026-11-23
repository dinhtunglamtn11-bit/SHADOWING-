import { add, SC, setCC } from './pass-kit.js';
setCC('my');
// Malaysia · Nhóm 4: Văn hóa và nghệ thuật
const G = 4, A = 'Lễ hội', B = 'Nhạc cụ', C = 'Nghệ thuật biểu diễn', E = 'Hội họa và kiến trúc', F = 'Văn hóa hiện đại';
const H = { use: 'hold' };
const dancer = (d, bg, top, bot) => { d.bg(bg); d.e(8, 3, 1.8, 1.8, 's'); d.p('k', 7, 3, 9, 3); d.r(6, 5, 4, 4, top); d.l(6, 6, 3, 4, 's'); d.l(10, 6, 13, 3, 's'); d.tri(4, 9, 8, 6, bot); d.r(6, 15, 1, 1, 's'); d.r(9, 15, 1, 1, 's'); };

// ----- Lễ hội -----
add(G, A, 'my-hariraya', 'Hari Raya Aidilfitri', 'Hari Raya Aidilfitri', 'Lễ kết thúc tháng Ramadan của người Hồi giáo, được gọi là lễ lớn nhất của cộng đồng Mã Lai. Mọi người về quê, xin lỗi nhau, mặc đồ đồng bộ và mở cửa nhà đón khách trong "rumah terbuka" (nhà mở cửa).',
  d => { d.bg('B'); d.e(5, 4, 2.6, 2.6, 'y'); d.e(6, 4, 2.2, 2.2, 'B'); d.p('y', 11, 3, 13, 5, 9, 2); d.r(3, 9, 10, 7, 'w'); d.e(8, 8, 3, 2.6, 'w'); d.r(7, 12, 2, 4, 'g'); d.p('r', 2, 7, 14, 7); d.p('y', 4, 10, 11, 10); }, SC);
add(G, A, 'my-cny', 'Tết Nguyên đán (Chinese New Year)', 'Chinese New Year', 'Đón năm mới âm lịch với màu đỏ, pháo hoa, múa lân và lì xì. Nhiều người khác cộng đồng cũng được mời đến nhà dùng bữa.',
  d => { d.bg('R'); d.e(5, 6, 3, 3.6, 'r'); d.r(4, 2, 2, 1, 'y'); d.r(4, 9, 2, 1, 'y'); d.l(5, 10, 5, 12, 'y'); d.e(11, 6, 3, 3.6, 'r'); d.r(10, 2, 2, 1, 'y'); d.r(10, 9, 2, 1, 'y'); d.l(11, 10, 11, 12, 'y'); d.p('y', 8, 13, 3, 14, 13, 14); d.p('o', 5, 6, 11, 6); }, SC);
add(G, A, 'my-deepavali', 'Deepavali', 'Deepavali', 'Lễ ánh sáng của người Ấn, thắp đèn dầu, vẽ rangoli và tặng nhau bánh ngọt. Nhiều khu phố Ấn như Brickfields ở Kuala Lumpur được trang trí rực rỡ trong dịp này.',
  d => { d.bg('i'); for (const x of [2, 6, 10, 14]) { d.e(x, 13, 1.8, 1, 'o'); d.p('y', x, 12); d.p('r', x, 11); } d.p('y', 3, 3, 8, 2, 12, 4, 6, 6, 11, 8); d.p('p', 5, 8, 13, 6); d.p('w', 2, 6, 9, 4); }, SC);
add(G, A, 'my-thaipusam', 'Thaipusam', 'Thaipusam', 'Lễ hội của người Hindu tại hang Batu, hàng chục nghìn người hành hương mang kavadi (khung lễ vật) lên ngôi đền. Đây là một trong những nghi lễ lớn và đông nhất của cộng đồng Ấn Độ.',
  d => { d.bg('o'); d.r(0, 13, 16, 3, 'N'); d.e(8, 5, 1.8, 1.8, 's'); d.r(6, 7, 4, 6, 'y'); d.p('k', 7, 5, 9, 5); for (let a = 0; a < 7; a++) { d.l(8, 7, 1 + a * 2, 2, 'r'); d.p('p', 1 + a * 2, 2); } d.p('y', 8, 1, 8, 3); }, SC);
add(G, A, 'my-gawai', 'Gawai Dayak (1 tháng 6)', 'Gawai Dayak (1 June)', 'Lễ hội mùa gặt của người Iban và Bidayuh ở Sarawak, với rượu tuak, điệu múa ngajat và tiệc lớn trong nhà dài. Người đi xa thường về quê để dự.',
  d => { d.bg('G'); d.r(0, 12, 16, 4, 'n'); d.r(1, 7, 14, 3, 'N'); d.tri(0, 4, 16, 3, 'Y'); for (const x of [3, 7, 11]) { d.e(x + 1, 11, 1.2, 1.2, 's'); d.p('r', x + 1, 13); } d.p('y', 2, 8, 8, 8, 13, 8); }, SC);
add(G, A, 'my-kaamatan', 'Kaamatan (tháng 5)', 'Kaamatan (May)', 'Lễ tạ ơn mùa gặt của người Kadazan-Dusun ở Sabah, gồm nghi lễ do các bobohizan (thầy cúng nữ) chủ trì. Cuộc thi hoa hậu và múa sumazau làm không khí thêm náo nhiệt.',
  d => { d.bg('y'); d.r(0, 11, 16, 5, 'g'); for (const x of [2, 5, 8, 11, 14]) { d.l(x, 15, x, 8, 'Y'); d.e(x, 7, 1, 1.8, 'y'); } d.e(8, 3, 1.8, 1.8, 's'); d.r(6, 4, 4, 3, 'k'); d.p('r', 7, 2, 9, 2); d.p('w', 6, 5, 9, 5); }, SC);
add(G, A, 'my-merdeka', 'Hari Merdeka (31 tháng 8)', 'Hari Merdeka (31 August)', 'Ngày độc lập của Malaya năm 1957, được kỷ niệm với diễu hành và pháo hoa. Nhiều người treo cờ Jalur Gemilang trên xe và nhà.',
  d => { d.bg('B'); d.l(2, 1, 2, 15, 'w'); for (let i = 0; i < 7; i++) d.r(3, 2 + i, 11, 1, i % 2 ? 'w' : 'r'); d.r(3, 2, 5, 4, 'B'); d.e(5, 4, 1.2, 1.2, 'y'); d.p('y', 8, 10, 12, 12, 10, 13); }, SC);
add(G, A, 'my-wesak', 'Wesak và Giáng sinh', 'Wesak and Christmas', 'Lễ Phật đản và lễ của cộng đồng Cơ Đốc giáo cũng là ngày nghỉ ở nhiều bang. Các trung tâm thương mại trang trí rực rỡ dù khí hậu quanh năm nóng.',
  d => { d.bg('v'); d.e(4, 6, 2.6, 3, 'p'); d.p('y', 4, 3, 4, 9); d.p('g', 4, 10); d.tri(8, 3, 7, 11, 'G'); d.p('r', 10, 7, 12, 10, 9, 11); d.p('y', 11, 4, 11, 13); d.r(11, 14, 1, 2, 'N'); }, SC);
add(G, A, 'my-rwmf', 'Rainforest World Music Festival (Kuching)', 'Rainforest World Music Festival (Kuching)', 'Liên hoan nhạc dân tộc thế giới tổ chức giữa rừng mưa, kết hợp nghệ sĩ bản địa với khách quốc tế. Lễ hội có cả các buổi hướng dẫn về nhạc cụ truyền thống.',
  d => { d.bg('G'); d.e(3, 3, 3, 3, 'g'); d.e(13, 3, 3, 3, 'g'); d.r(2, 9, 12, 5, 'k'); d.r(2, 8, 12, 1, 'r'); d.p('y', 4, 11, 8, 10, 11, 12); d.e(8, 6, 1.4, 1.4, 's'); d.p('w', 2, 2, 13, 2); }, SC);

// ----- Nhạc cụ -----
add(G, B, 'my-gamelan', 'Gamelan Malaysia', 'Malaysian gamelan', 'Dàn nhạc gõ gồm cồng, chiêng, trống và nhạc cụ gõ bằng kim loại, dùng trong cung đình và điệu múa. Âm thanh ngân vang, mềm và dịu.',
  d => { d.bg('e'); d.r(1, 5, 14, 2, 'N'); d.r(1, 12, 14, 2, 'N'); for (const x of [3, 7, 11]) { d.e(x, 4, 1.8, 1.8, 'Y'); d.e(x, 4, 0.8, 0.8, 'y'); d.e(x, 11, 1.8, 1.8, 'Y'); } for (let x = 2; x < 14; x += 2) d.r(x, 8, 1, 2, 'y'); d.r(1, 10, 14, 1, 'n'); }, SC);
add(G, B, 'my-rebana', 'Gendang và rebana', 'Gendang and rebana', 'Các loại trống đệm nhịp cho múa, hát và nghi lễ. Rebana ubi lớn ở Kelantan thường được dùng trong cuộc thi.',
  d => { d.bg('e'); d.e(8, 9, 6, 5, 'n'); d.e(8, 7, 6, 2, 'w'); d.e(8, 7, 4, 1.2, 'u'); d.r(2, 7, 12, 5, 'n'); d.e(8, 12, 6, 2, 'N'); for (let x = 3; x < 14; x += 2) d.l(x, 8, x, 12, 'N'); d.l(1, 2, 5, 6, 'w'); }, H);
add(G, B, 'my-kompang', 'Kompang', 'Kompang', 'Trống khung tay tròn đập trong đám cưới và lễ đón khách, âm rộn ràng, vui tươi. Một nhóm nhiều người đánh đồng đều tạo không khí rất trang trọng.',
  d => { d.bg('e'); d.e(8, 8, 6, 6, 'n'); d.e(8, 8, 5, 5, 'w'); d.e(8, 8, 3, 3, 'u'); for (let i = 0; i < 8; i++) { const a = i * 0.785; d.p('Y', 8 + Math.cos(a) * 5.4, 8 + Math.sin(a) * 5.4); } d.p('N', 8, 8); }, H);
add(G, B, 'my-gambus', 'Rebab và gambus', 'Rebab and gambus', 'Đàn dây có nguồn gốc Trung Á, rebab dùng cần kéo, gambus giống đàn oud. Hai loại này xuất hiện trong nhạc cung đình và nhạc Zapin.',
  d => { d.bg('e'); d.e(5, 11, 4, 3.6, 'n'); d.e(5, 11, 1.4, 1.4, 'k'); d.l(7, 9, 13, 3, 'N'); d.l(8, 9, 14, 3, 'N'); d.p('w', 5, 8, 9, 7); d.p('y', 13, 2, 14, 2); d.l(1, 3, 10, 13, 'a'); }, H);
add(G, B, 'my-serunai', 'Serunai', 'Serunai', 'Kèn hơi có âm thanh đâm, thường dùng trong lễ cưới, nghi lễ và võ silat. Âm thanh vang xa và có màu sắc đặc trưng.',
  d => { d.bg('e'); d.l(3, 3, 11, 12, 'n'); d.l(4, 3, 12, 12, 'N'); d.tri(9, 11, 6, 5, 'y'); d.p('k', 5, 5, 7, 7, 9, 9); d.p('r', 3, 3, 4, 2); d.p('o', 13, 15); }, H);
add(G, B, 'my-sape', 'Sape (Sarawak)', 'Sape (Sarawak)', 'Đàn dây gảy bằng gỗ của người Orang Ulu, thân dài khắc họa tiết. Ngày xưa dùng để đệm cho nghi lễ, nay đã lên sân khấu thế giới.',
  d => { d.bg('e'); d.r(1, 6, 14, 5, 'n'); d.tri(11, 5, 4, 7, 'N'); d.r(1, 7, 3, 3, 'k'); d.p('w', 4, 8, 12, 8); d.p('y', 6, 7, 9, 9, 7, 10); d.p('r', 14, 7); d.r(2, 12, 12, 1, 'a'); }, H);
add(G, B, 'my-kulintangan', 'Kulintangan (Sabah)', 'Kulintangan (Sabah)', 'Bộ chiêng đồng nhỏ xếp hàng ngang, chơi trong lễ hội của người Bajau và Kadazan-Dusun. Âm thanh rộn rã và vui.',
  d => { d.bg('e'); d.r(1, 8, 14, 5, 'N'); for (let i = 0; i < 6; i++) { d.e(2 + i * 2.4, 8, 1.2, 1.2, i % 2 ? 'Y' : 'y'); d.p('k', 2 + i * 2.4, 8); } d.l(2, 3, 5, 6, 'w'); d.l(14, 3, 11, 6, 'w'); d.p('r', 2, 3, 14, 3); }, SC);
add(G, B, 'my-sompoton', 'Sompoton', 'Sompoton', 'Nhạc cụ thổi làm từ quả bí và ống tre, phổ biến ở người Kadazan-Dusun. Âm thanh du dương, nhẹ nhàng.',
  d => { d.bg('e'); d.e(5, 11, 3.4, 3.4, 'y'); d.e(5, 11, 2.2, 2.2, 'Y'); for (let i = 0; i < 5; i++) d.r(6 + i, 2 + i % 2, 1, 7 - i % 2, 'n'); d.p('N', 6, 9, 10, 9); d.p('w', 8, 1); }, H);
add(G, B, 'my-angklung', 'Angklung', 'Angklung', 'Nhạc cụ tre lắc, mỗi chiếc chỉ phát một âm nên nhiều người cùng chơi mới thành bản nhạc. Nghệ thuật này còn được gìn giữ ở một số cộng đồng.',
  d => { d.bg('e'); d.r(2, 3, 12, 1, 'N'); for (let i = 0; i < 5; i++) { d.r(3 + i * 2, 4, 1, 4 + (i % 3) * 2, 'y'); d.r(4 + i * 2, 5, 1, 3 + (i % 3) * 2, 'Y'); } d.r(2, 14, 12, 1, 'N'); d.p('r', 3, 3, 13, 3); }, H);

// ----- Nghệ thuật biểu diễn -----
add(G, C, 'my-wayang', 'Wayang kulit Kelantan', 'Wayang kulit Kelantan', 'Rối bóng da, người điều khiển (tok dalang) điều khiển rối sau màn vải trắng và đóng tất cả các giọng nhân vật, kèm dàn nhạc. Các vở thường dựa trên sử thi Ramayana phiên bản Mã Lai.',
  d => { d.bg('o'); d.r(1, 2, 14, 10, 'e'); d.r(0, 12, 16, 4, 'k'); d.p('k', 5, 4, 5, 5, 4, 6, 5, 6, 6, 6, 5, 7, 5, 8, 4, 9, 6, 9); d.p('k', 11, 3, 10, 4, 11, 4, 12, 4, 11, 5, 11, 6, 10, 7, 12, 7); d.l(5, 9, 5, 12, 'N'); d.l(11, 7, 11, 12, 'N'); }, SC);
add(G, C, 'my-makyong', 'Mak yong', 'Mak yong', 'Loại hình kịch múa cổ kết hợp diễn xuất, nhạc, múa và đối thoại, được UNESCO (Tổ chức Giáo dục, Khoa học và Văn hóa Liên Hợp Quốc) ghi nhận là di sản phi vật thể. Trước đây thường biểu diễn trong cung đình và nghi lễ chữa bệnh.',
  d => { dancer(d, 'R', 'y', 'g'); d.p('r', 8, 1, 7, 2, 9, 2); d.p('y', 3, 12, 13, 13); d.r(5, 5, 6, 1, 'Y'); }, SC);
add(G, C, 'my-zapin', 'Zapin và joget', 'Zapin and joget', 'Zapin là điệu múa có ảnh hưởng Ả Rập, còn joget vui tươi và nhẹ nhàng hơn. Cả hai thường xuất hiện trong lễ cưới và biểu diễn văn hóa.',
  d => { dancer(d, 'c', 'p', 'P'); d.p('w', 2, 5, 13, 3); d.p('y', 3, 13, 12, 12); }, SC);
add(G, C, 'my-dikir', 'Dikir barat', 'Dikir barat', 'Hát đối đáp tập thể ở Kelantan, các đội ngồi xuống sàn, vỗ tay và ra các động tác đồng đều. Một số cuộc thi còn có lời hát ứng tác hài hước.',
  d => { d.bg('y'); d.r(0, 12, 16, 4, 'n'); for (const x of [1, 6, 11]) { d.e(x + 2, 6, 1.5, 1.5, 's'); d.r(x, 8, 4, 4, 'g'); d.l(x, 9, x + 1, 7, 's'); d.l(x + 4, 9, x + 3, 7, 's'); d.r(x + 1, 3, 3, 1, 'k'); } d.p('w', 3, 14, 12, 14); }, SC);
add(G, C, 'my-silat', 'Silat', 'Silat', 'Võ thuật Mã Lai với những động tác mềm dẻo như múa, thường biểu diễn trong lễ cưới. Người học coi trọng kỷ luật và đạo đức.',
  d => { d.bg('G'); d.r(0, 13, 16, 3, 'n'); d.e(6, 4, 1.8, 1.8, 's'); d.r(3, 3, 6, 1, 'k'); d.r(4, 6, 5, 4, 'y'); d.l(4, 7, 1, 10, 's'); d.l(9, 7, 13, 5, 's'); d.l(4, 10, 3, 14, 'k'); d.l(8, 10, 11, 14, 'k'); d.p('r', 5, 9, 8, 9); }, SC);
add(G, C, 'my-lion', 'Múa lân và múa sư tử', 'Lion and dragon dance', 'Các đội múa lân biểu diễn trên các cọc cao dịp Tết, kèm trống và chiêng rầm rộ. Trò diễn đòi hỏi sự phối hợp cực kỳ chặt chẽ.',
  d => { d.bg('R'); d.e(7, 6, 5, 4.4, 'y'); d.e(7, 6, 3, 2.6, 'r'); d.p('w', 5, 5, 9, 5); d.p('k', 5, 5, 9, 5); d.e(7, 9, 2, 1.2, 'w'); d.r(3, 10, 8, 3, 'o'); d.l(11, 4, 14, 1, 'y'); d.p('r', 14, 1, 2, 10); d.r(0, 13, 16, 3, 'N'); d.r(4, 13, 1, 3, 'k'); d.r(9, 13, 1, 3, 'k'); }, SC);
add(G, C, 'my-ngajat', 'Ngajat (Iban) và Sumazau (Kadazan-Dusun)', 'Ngajat (Iban) and Sumazau (Kadazan-Dusun)', 'Ngajat là điệu múa chiến binh với mũ lông chim, sumazau là điệu múa nhẹ nhàng mô phỏng chim bay. Cả hai đều là biểu tượng của Borneo.',
  d => { d.bg('G'); d.e(8, 5, 1.8, 1.8, 's'); d.r(6, 7, 4, 5, 'k'); d.p('r', 7, 9, 9, 9); d.l(5, 1, 6, 4, 'y'); d.l(11, 1, 10, 4, 'y'); d.l(6, 8, 1, 4, 's'); d.l(10, 8, 15, 4, 's'); d.l(1, 4, 1, 1, 'r'); d.l(15, 4, 15, 1, 'r'); d.r(6, 12, 1, 3, 's'); d.r(9, 12, 1, 3, 's'); }, SC);
add(G, C, 'my-bharata', 'Bharatanatyam', 'Bharatanatyam', 'Điệu múa cổ điển của người Ấn, được dạy tại nhiều trường múa ở Malaysia. Các buổi diễn thường đi kèm nhạc Carnatic.',
  d => { dancer(d, 'P', 'y', 'r'); d.p('y', 8, 1, 7, 2); d.p('w', 12, 12, 3, 13); d.p('g', 5, 5, 11, 5); }, SC);

// ----- Hội họa và kiến trúc -----
add(G, E, 'my-abdulsamad', 'Tòa nhà Sultan Abdul Samad', 'Sultan Abdul Samad Building', 'Công trình thời thuộc địa ở Kuala Lumpur, mang phong cách Moor với tháp đồng hồ và mái vòm đồng. Quảng trường độc lập ngay trước mặt là nơi cờ Malaya được kéo lên năm 1957.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(2, 7, 12, 6, 'u'); d.r(7, 2, 2, 6, 'u'); d.e(8, 2, 2, 1.6, 'Y'); d.p('y', 8, 0); d.e(3, 6, 1.6, 1.6, 'Y'); d.e(13, 6, 1.6, 1.6, 'Y'); for (const x of [3, 5, 10, 12]) d.r(x, 9, 1, 4, 'R'); d.e(8, 4, 1, 1, 'w'); d.r(7, 9, 2, 4, 'N'); }, SC);
add(G, E, 'my-mosque', 'Masjid Jamek và Masjid Putra', 'Masjid Jamek and Masjid Putra', 'Masjid Jamek nằm ở nơi hai dòng sông hợp lại, Masjid Putra ở Putrajaya có mái vòm màu hồng đặc biệt. Cả hai là những công trình đẹp và dễ nhận ra.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(3, 8, 10, 4, 'w'); d.e(8, 6, 4, 3.4, 'p'); d.p('y', 8, 2); d.r(1, 4, 2, 8, 'W'); d.r(13, 4, 2, 8, 'W'); d.p('y', 2, 3, 14, 3); d.r(7, 9, 2, 3, 'g'); d.p('w', 2, 14, 12, 15); }, SC);
add(G, E, 'my-bluemansion', 'Cheong Fatt Tze Mansion (Blue Mansion)', 'Cheong Fatt Tze Mansion (Blue Mansion)', 'Dinh thự màu xanh lam ở Penang của một thương gia người Hoa, kết hợp phong thủy và kiến trúc Trung Hoa. Ngôi nhà đã được phục chế và mở cửa cho khách tham quan.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(2, 5, 12, 8, 'b'); d.tri(0, 2, 16, 3, 'R'); for (const x of [3, 6, 9, 12]) { d.r(x, 7, 1, 2, 'y'); d.r(x, 10, 1, 2, 'y'); } d.r(7, 11, 2, 2, 'N'); d.p('r', 0, 4, 15, 4); }, SC);
add(G, E, 'my-keklok', 'Đền Kek Lok Si', 'Kek Lok Si Temple', 'Ngôi chùa Phật giáo lớn ở Penang trên sườn đồi, có bảo tháp và tượng Quan Âm cao. Ban đêm, chùa thắp sáng rực rỡ trong dịp Tết.',
  d => { d.bg('B'); d.tri(0, 8, 16, 8, 'G'); for (let i = 0; i < 5; i++) d.r(5 + (i < 3 ? 0 : 1), 3 + i * 2, 6 - (i < 3 ? 0 : 2), 2, i % 2 ? 'y' : 'r'); d.p('y', 8, 1, 8, 2); d.r(3, 12, 10, 3, 'R'); d.p('y', 4, 13, 7, 13, 10, 13); }, SC);
add(G, E, 'my-mariamman', 'Đền Sri Mahamariamman', 'Sri Mahamariamman Temple', 'Ngôi đền Hindu cổ nhất Kuala Lumpur với cổng tháp chạm hàng trăm tượng thần màu sắc. Đây là điểm bắt đầu của nhiều lễ rước.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); for (let i = 0; i < 6; i++) d.r(4 + (i / 2 | 0), 3 + i * 2, 8 - (i / 2 | 0) * 2, 2, ['p', 'y', 'r', 'c', 'o', 'g'][i]); d.p('y', 8, 1); d.r(6, 11, 4, 3, 'k'); d.p('w', 6, 9, 9, 9); }, SC);
add(G, E, 'my-wat', 'Chùa Wat Chayamangkalaram', 'Wat Chayamangkalaram', 'Ngôi chùa Thái ở Penang nổi tiếng với tượng Phật nằm dài. Nét kiến trúc Thái hòa cùng cộng đồng Phật giáo ở đây.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.e(8, 10, 7, 3, 'y'); d.e(3, 8, 2, 2, 's'); d.p('Y', 3, 5, 6, 8); d.p('r', 3, 7); d.r(2, 11, 12, 2, 'o'); d.tri(11, 3, 5, 5, 'r'); d.p('y', 13, 2); }, SC);
add(G, E, 'my-terengganu', 'Tranh batik và chạm gỗ Terengganu', 'Terengganu batik and woodcarving', 'Batik ở đây dùng màu tươi, hoa lá lớn, còn chạm gỗ trang trí nhà cổ với hoa văn dây leo. Người thợ vẫn làm bằng tay.',
  d => { d.bg('e'); d.r(1, 2, 8, 12, 'y'); d.e(5, 6, 2.6, 2.6, 'r'); d.e(5, 6, 1.2, 1.2, 'p'); d.p('g', 3, 10, 7, 11, 5, 9); d.r(10, 2, 5, 12, 'n'); d.spiral(12, 6, 1, 'N'); d.spiral(12, 11, 1, 'N'); }, SC);
add(G, E, 'my-mural', 'Tranh tường đường phố ở George Town', 'George Town street murals', 'Các bức tranh tường nhỏ mang hình ảnh đời thường, thú vị và dễ thương, như hai đứa trẻ đi xe đạp. Chúng trở thành dấu ấn của thành phố.',
  d => { d.bg('x'); d.r(0, 0, 16, 16, 'W'); d.e(5, 9, 2, 2, 'k'); d.e(11, 9, 2, 2, 'k'); d.l(5, 9, 8, 6, 'a'); d.l(8, 6, 11, 9, 'a'); d.e(8, 4, 1.4, 1.4, 's'); d.r(7, 5, 2, 2, 'r'); d.p('B', 1, 14, 14, 14); }, SC);

// ----- Văn hóa hiện đại -----
add(G, F, 'my-cinema', 'Điện ảnh Malaysia', 'Malaysian cinema', 'Từ thời P. Ramlee đến các đạo diễn như Yasmin Ahmad, phim Malaysia thường lồng ghép đa sắc tộc và hài hước nhẹ nhàng. Nhiều phim dùng cả tiếng Mã Lai, Hoa, Tamil và Anh.',
  d => { d.bg('k'); d.r(1, 3, 14, 10, 'd'); d.r(1, 3, 14, 3, 'w'); for (let x = 1; x < 14; x += 3) d.dtri(x, 3, 2, 3, 'k'); d.e(5, 10, 2, 2, 's'); d.e(8, 10, 2, 2, 'S'); d.e(11, 10, 2, 2, 'y'); d.p('k', 5, 10, 8, 10, 11, 10); }, SC);
add(G, F, 'my-rojak', 'Bahasa rojak và tiếng "lah"', 'Bahasa rojak and "lah"', 'Cách nói trộn nhiều ngôn ngữ, thêm "lah" cuối câu để nhấn mạnh hay làm câu nói thân mật hơn. Đây là những thói quen giao tiếp rất riêng.',
  d => { d.bg('u'); d.r(1, 2, 8, 5, 'w'); d.tri(2, 7, 3, 2, 'w'); d.r(7, 8, 8, 5, 'c'); d.tri(11, 13, 3, 2, 'c'); d.p('k', 3, 4, 5, 4, 8, 10, 10, 10, 12, 10); d.p('r', 7, 4); }, SC);
add(G, F, 'my-mamak', 'Văn hóa mamak và ăn đêm', 'Mamak and late-night eating culture', 'Nhiều quán ăn mở 24 giờ, nơi bạn bè ngồi xem bóng đá và trò chuyện. Đây là hoạt động xã hội quen thuộc của giới trẻ.',
  d => { d.bg('B'); d.e(13, 3, 1.6, 1.6, 'y'); d.r(0, 12, 16, 4, 'k'); d.r(1, 5, 14, 3, 'r'); d.r(1, 4, 14, 1, 'w'); for (const x of [3, 7, 11]) { d.r(x, 10, 2, 1, 'W'); d.r(x, 11, 1, 3, 'a'); d.p('y', x, 9); } d.p('w', 3, 6, 8, 6, 12, 6); }, SC);
add(G, F, 'my-badminton', 'Cầu lông', 'Badminton', 'Môn thể thao được yêu thích nhất, với những tên tuổi lớn như Lee Chong Wei được cả nước tự hào. Giải đấu cầu lông thu hút đông đảo khán giả.',
  d => { d.bg('g'); d.r(0, 12, 16, 4, 'G'); d.l(2, 14, 8, 6, 'N'); d.e(8, 5, 3, 2.6, 'a'); d.p('l', 6, 5, 10, 5, 8, 3); d.l(10, 2, 14, 0, 'w'); d.tri(11, 3, 4, 4, 'w'); d.p('r', 12, 7); d.r(11, 6, 3, 1, 'r'); }, H);
add(G, F, 'my-takraw', 'Sepak takraw', 'Sepak takraw', 'Môn "đá cầu mây" qua lưới, cầu thủ dùng chân, đầu và ngực, thường có những cú lộn người ngoạn mục. Đây là môn thể thao truyền thống của khu vực.',
  d => { d.bg('g'); d.r(0, 12, 16, 4, 'u'); d.r(0, 7, 16, 1, 'w'); d.e(5, 4, 1.4, 1.4, 's'); d.r(4, 5, 2, 3, 'r'); d.l(6, 6, 10, 3, 's'); d.e(11, 3, 2, 2, 'y'); d.p('n', 10, 2, 12, 4, 10, 4, 12, 2); d.l(4, 8, 3, 12, 'r'); d.l(5, 8, 7, 12, 'r'); }, SC);
add(G, F, 'my-pop', 'Âm nhạc pop', 'Pop music', 'Các nghệ sĩ như Siti Nurhaliza, Yuna hay nhóm nhạc trẻ được yêu thích trong nước. Một số đã đưa nhạc Mã Lai và tiếng Anh ra thế giới.',
  d => { d.bg('v'); d.e(8, 5, 2.4, 2.6, 's'); d.r(5, 2, 6, 2, 'k'); d.r(6, 8, 4, 6, 'p'); d.r(9, 9, 2, 1, 'a'); d.p('a', 11, 9, 12, 8, 12, 10); d.p('y', 2, 3, 14, 4, 3, 12, 13, 12); d.p('w', 8, 5); }, SC);
add(G, F, 'my-proton', 'Xe hơi quốc gia Proton', 'Proton national car', 'Thương hiệu ô tô do chính phủ khởi động từ thập niên 1980, được nhiều người xem là biểu tượng tự lực. Nhiều gia đình có chiếc xe đầu tiên mang nhãn này.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(1, 8, 14, 5, 'r'); d.r(4, 5, 8, 3, 'r'); d.r(5, 6, 6, 2, 'c'); d.e(4, 13, 2, 2, 'k'); d.e(12, 13, 2, 2, 'k'); d.p('w', 4, 13, 12, 13); d.p('y', 14, 10, 1, 10); }, SC);
add(G, F, 'my-sepang', 'Đường đua Sepang', 'Sepang circuit', 'Trường đua được tổ chức các giải đua lớn quốc tế, thu hút nhiều khán giả từ khắp nơi. Giải MotoGP thường ghi dấu ở đây.',
  d => { d.bg('g'); d.e(8, 9, 7, 4, 'k'); d.e(8, 9, 4, 2, 'g'); for (let x = 1; x < 15; x += 2) d.p(x % 4 === 1 ? 'w' : 'r', x, 5); d.r(6, 2, 4, 2, 'w'); d.p('k', 6, 2, 8, 3, 10, 2); d.p('y', 3, 9, 12, 12); }, SC);
