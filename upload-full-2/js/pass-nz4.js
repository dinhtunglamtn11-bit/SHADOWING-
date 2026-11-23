import { add, SC, setCC } from './pass-kit.js';
setCC('nz');
// New Zealand · Nhóm 4: Văn hóa và nghệ thuật
const G = 4, A = 'Lễ hội và ngày lễ', B = 'Nhạc cụ', C = 'Nghệ thuật biểu diễn', E = 'Hội họa, điêu khắc và kiến trúc', F = 'Văn hóa hiện đại';
const H = { use: 'hold' };
const stars = (d, list) => { for (const [x, y] of list) d.p('y', x, y); };

// ----- Lễ hội và ngày lễ -----
add(G, A, 'nz-matarikifest', 'Matariki (Tết Māori)', 'Matariki (Māori New Year)', 'Dịp mừng năm mới khi cụm sao Matariki (chòm Tua Rua) xuất hiện trên bầu trời mùa đông. Từ năm 2022 đây là ngày nghỉ lễ quốc gia.',
  d => { d.bg('i'); stars(d, [[3, 3], [5, 2], [7, 4], [9, 3], [11, 2], [12, 5], [8, 7]]); d.p('w', 5, 2, 9, 3, 7, 4); d.r(0, 12, 16, 4, 'K'); d.tri(0, 9, 6, 4, 'k'); d.tri(10, 9, 6, 4, 'k'); }, SC);
add(G, A, 'nz-waitangiday', 'Ngày Waitangi (6/2)', 'Waitangi Day (6 Feb)', 'Kỷ niệm việc ký Hiệp ước Waitangi năm 1840 giữa các tù trưởng Māori và Hoàng gia Anh, thường có lễ chính thức ở Waitangi Treaty Grounds.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.r(3, 6, 10, 6, 'e'); d.r(4, 7, 8, 1, 'k'); d.r(4, 9, 8, 1, 'k'); d.p('r', 13, 5); d.l(3, 1, 3, 6, 'N'); d.r(4, 1, 5, 3, 'B'); d.p('r', 6, 2); d.p('y', 12, 8); }, SC);
add(G, A, 'nz-anzacday', 'Ngày Anzac (25/4)', 'Anzac Day (25 Apr)', 'Ngày tưởng niệm những người lính New Zealand và Úc, mở đầu bằng lễ bình minh.',
  d => { d.bg('A'); d.r(0, 12, 16, 4, 'k'); d.e(8, 11, 4, 4, 'o'); d.r(0, 11, 16, 5, 'k'); d.r(7, 3, 2, 8, 'W'); d.r(5, 5, 6, 1, 'W'); d.p('r', 3, 13, 6, 14, 9, 13, 12, 14); d.p('R', 4, 14, 11, 13); d.p('y', 8, 2); }, SC);
add(G, A, 'nz-pasifika', 'Lễ hội Polynesian Pasifika Festival', 'Pasifika Festival', 'Lễ hội ở Auckland của cộng đồng đảo Thái Bình Dương với nhạc, múa và đồ ăn.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.e(5, 6, 2, 2, 's'); d.r(3, 8, 4, 5, 'r'); d.e(11, 6, 2, 2, 'S'); d.r(9, 8, 4, 5, 'y'); d.p('p', 4, 3, 5, 3, 10, 3, 11, 3); d.p('g', 2, 9, 7, 9, 8, 9, 13, 9); d.p('o', 1, 1, 14, 1); }, SC);
add(G, A, 'nz-cubadupa', 'Wellington Cuba Dupa và Fringe Festival', 'Wellington Cuba Dupa and Fringe Festival', 'Những lễ hội nghệ thuật đường phố và sân khấu sôi động của thủ đô.',
  d => { d.bg('v'); d.r(0, 13, 16, 3, 'k'); d.r(1, 3, 3, 10, 'p'); d.r(12, 4, 3, 9, 'y'); d.r(6, 2, 4, 11, 'c'); d.p('w', 2, 5, 2, 8, 7, 4, 8, 7, 13, 6, 13, 9); d.p('r', 8, 10, 2, 11, 13, 11); d.l(5, 1, 3, 0, 'y'); d.l(10, 1, 12, 0, 'y'); }, SC);
add(G, A, 'nz-xmasoutdoor', 'Lễ hội Ngày Giáng sinh ngoài trời', 'Outdoor Christmas concerts', 'Ca nhạc dưới trời hè, nhiều thành phố tổ chức buổi hòa nhạc trong công viên.',
  d => { d.bg('c'); d.e(13, 2, 2, 2, 'y'); d.r(0, 10, 16, 6, 'h'); d.r(2, 7, 7, 3, 'k'); d.r(2, 6, 7, 1, 'r'); d.p('y', 4, 8, 6, 8); d.tri(10, 4, 5, 6, 'G'); d.p('r', 12, 6, 13, 8); d.p('w', 3, 12, 6, 13, 9, 12, 12, 14); d.p('s', 3, 11, 9, 11, 12, 13); }, SC);
add(G, A, 'nz-wineharvest', 'Hội chợ rượu vang và lễ hội ẩm thực', 'Wine and food festivals', 'Nhiều vùng nho tổ chức mùa thu hoạch với âm nhạc và tiệc ngoài trời.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'g'); d.r(0, 11, 16, 1, 'G'); d.r(2, 5, 12, 1, 'w'); d.l(4, 6, 3, 10, 'W'); d.l(12, 6, 13, 10, 'W'); d.r(5, 8, 6, 2, 'w'); d.e(6, 12, 1.4, 1.4, 'm'); d.e(10, 12, 1.4, 1.4, 'v'); d.p('P', 5, 13, 11, 13); d.p('y', 8, 3); }, SC);
add(G, A, 'nz-rwc', 'Lễ hội Rugby World Cup', 'Rugby World Cup festival', 'Khi tổ chức ở New Zealand, cả nước cùng bước vào không khí lễ hội.',
  d => { d.bg('G'); d.r(0, 12, 16, 4, 'g'); d.e(8, 8, 4.4, 2.8, 'n'); d.p('w', 6, 8, 10, 8, 8, 7, 8, 9); d.l(1, 3, 1, 14, 'w'); d.l(14, 3, 14, 14, 'w'); d.l(1, 3, 14, 3, 'w'); d.p('y', 3, 1, 7, 1, 11, 1); d.p('Y', 4, 14, 11, 15); }, SC);

// ----- Nhạc cụ -----
add(G, B, 'nz-putatara', 'Pūtātara (kèn vỏ ốc)', 'Pūtātara (conch trumpet)', 'Kèn làm từ vỏ ốc biển lớn, dùng để báo hiệu và mở đầu nghi lễ.',
  d => { d.bg('e'); d.e(6, 9, 5, 4, 't'); d.e(5, 9, 3, 2.6, 'u'); d.e(6, 9, 1.4, 1.4, 'n'); d.l(10, 6, 14, 3, 'W'); d.l(10, 9, 15, 5, 'W'); d.p('n', 3, 6, 8, 12); d.p('w', 15, 2, 14, 1); }, H);
add(G, B, 'nz-pukaea', 'Pūkāea (kèn gỗ dài)', 'Pūkāea (long wooden trumpet)', 'Kèn gỗ dài của người Māori, dùng báo hiệu trong chiến trận và lễ nghi.',
  d => { d.bg('e'); d.l(1, 14, 12, 4, 'n'); d.l(2, 14, 13, 5, 'N'); d.e(13, 4, 2.4, 2.4, 'n'); d.e(13, 4, 1.4, 1.4, 'k'); d.p('t', 4, 12, 7, 9, 10, 6); d.p('r', 3, 13); }, H);
add(G, B, 'nz-koauau', 'Kōauau (sáo xương)', 'Kōauau (bone flute)', 'Sáo ngắn làm từ xương hoặc gỗ, âm thanh dịu như tiếng chim.',
  d => { d.bg('e'); d.l(3, 12, 12, 4, 'W'); d.l(4, 12, 13, 4, 'l'); d.p('k', 6, 9, 8, 7, 10, 6); d.p('N', 3, 13); d.p('y', 13, 2, 14, 1, 15, 3); }, H);
add(G, B, 'nz-putorino', 'Pūtōrino', 'Pūtōrino', 'Nhạc cụ hình thoi, vừa là sáo vừa là kèn, nhìn giống con nhện cuộn, được chạm khắc tinh xảo.',
  d => { d.bg('e'); d.e(8, 8, 3.2, 6.4, 'n'); d.e(8, 8, 2, 5.2, 'N'); d.e(8, 8, 3.2, 6.4, 'n'); d.e(8, 8, 1.2, 3.4, 'k'); d.p('t', 8, 3, 8, 6, 7, 9, 9, 11); d.p('u', 6, 5, 10, 8); }, H);
add(G, B, 'nz-poi', 'Poi', 'Poi', 'Quả bóng nhỏ buộc dây, vung theo nhịp trong các điệu múa, từng giúp tăng sức mạnh cho cổ tay của phụ nữ Māori.',
  d => { d.bg('e'); d.e(8, 11, 4, 4, 'w'); d.e(8, 11, 4, 4, 'w'); d.l(8, 7, 8, 1, 'k'); d.p('r', 6, 10, 10, 10, 8, 12); d.p('l', 6, 9, 7, 8); d.p('R', 7, 13, 10, 12); d.p('y', 8, 0); }, H);
add(G, B, 'nz-ukulele', 'Guitar và ukulele', 'Guitar and ukulele', 'Nhạc cụ phổ biến trong các buổi tụ tập gia đình và những bài hát cộng đồng.',
  d => { d.bg('e'); d.e(6, 11, 4, 3.6, 'o'); d.e(6, 11, 1.4, 1.4, 'k'); d.l(8, 9, 13, 3, 'N'); d.r(12, 1, 3, 3, 'N'); d.p('w', 5, 13, 7, 13); d.l(6, 11, 12, 3, 'k'); d.p('y', 13, 1); }, H);
add(G, B, 'nz-bagpipes', 'Kèn túi (bagpipes) của người Scotland', 'Scottish bagpipes', 'Dấu ấn của nhóm di dân Scotland, thường nghe ở Dunedin.',
  d => { d.bg('e'); d.e(7, 9, 4, 3.4, 'G'); d.p('r', 5, 8, 9, 10, 7, 9); d.l(5, 6, 3, 1, 'N'); d.l(7, 6, 7, 1, 'N'); d.l(9, 6, 11, 1, 'N'); d.l(10, 11, 14, 14, 'N'); d.p('y', 3, 0, 7, 0, 11, 0); d.p('n', 11, 12); }, H);
add(G, B, 'nz-orchestra', 'Piano và dàn nhạc giao hưởng', 'Piano and symphony orchestra', 'Nền tảng âm nhạc cổ điển phương Tây, có Dàn nhạc giao hưởng New Zealand (New Zealand Symphony Orchestra).',
  d => { d.bg('k'); d.r(2, 9, 12, 5, 'w'); for (let x = 3; x < 14; x += 2) d.r(x, 9, 1, 3, 'k'); d.r(2, 14, 12, 1, 'a'); d.r(3, 5, 10, 4, 'k'); d.r(3, 5, 10, 1, 'K'); d.p('y', 2, 2, 5, 3, 11, 2, 13, 3); d.p('w', 8, 7); }, SC);

// ----- Nghệ thuật biểu diễn -----
add(G, C, 'nz-haka', 'Haka', 'Haka', 'Điệu múa chiến đấu có hô hét, dậm chân và biểu cảm khuôn mặt mạnh mẽ, nay dùng trong cả lễ nghi lẫn thể thao.',
  d => { d.bg('A'); d.e(8, 5, 2.6, 2.6, 'S'); d.p('w', 7, 5, 9, 5); d.r(7, 7, 2, 1, 'r'); d.r(6, 8, 4, 5, 'k'); d.l(6, 9, 2, 6, 'S'); d.l(9, 9, 14, 6, 'S'); d.r(6, 13, 1, 3, 'S'); d.r(9, 13, 1, 3, 'S'); d.p('k', 7, 4, 9, 4); }, SC);
add(G, C, 'nz-kapahaka', 'Kapa haka', 'Kapa haka', 'Nghệ thuật biểu diễn tập thể của người Māori, gồm hát, múa, haka và poi, với các cuộc thi toàn quốc.',
  d => { d.bg('e'); for (const x of [2, 6, 10]) { d.e(x + 1, 4, 1.6, 1.6, 's'); d.r(x, 6, 3, 4, 'k'); d.r(x, 10, 3, 3, 'e'); d.p('r', x, 10, x + 2, 10); d.p('n', x + 1, 12); } d.p('w', 1, 14, 13, 14); }, SC);
add(G, C, 'nz-waiata', 'Waiata', 'Waiata', 'Bài hát truyền thống của người Māori, kể về tổ tiên, đất đai và những sự kiện quan trọng.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.e(8, 6, 2.4, 2.4, 's'); d.r(6, 8, 4, 5, 'r'); d.p('k', 7, 6, 9, 6); d.p('m', 8, 7); d.p('y', 2, 3, 3, 5, 13, 3, 12, 5); d.l(3, 4, 4, 2, 'y'); d.l(12, 4, 11, 2, 'y'); }, SC);
add(G, C, 'nz-whaikorero', 'Whaikōrero (diễn thuyết nghi lễ)', 'Whaikōrero (ceremonial speech)', 'Bài phát biểu theo nghi thức trên marae, mở đầu bằng chào hỏi tổ tiên.',
  d => { d.bg('R'); d.r(0, 13, 16, 3, 'n'); d.e(8, 5, 2.4, 2.4, 's'); d.p('w', 6, 3, 10, 3, 5, 5, 11, 5); d.r(6, 8, 4, 6, 'k'); d.l(10, 9, 13, 12, 'n'); d.p('y', 13, 13); d.p('k', 7, 5, 9, 5); d.p('t', 2, 6, 14, 6); }, SC);
add(G, C, 'nz-hongi', 'Hongi (chào bằng chạm mũi)', 'Hongi (nose greeting)', 'Cách chào truyền thống, hai người chạm mũi và trán để chia sẻ hơi thở sống.',
  d => { d.bg('e'); d.e(5, 8, 3, 3.4, 's'); d.e(11, 8, 3, 3.4, 'S'); d.p('k', 5, 7, 11, 7); d.p('m', 5, 10, 11, 10); d.p('s', 7, 8, 8, 8); d.p('S', 8, 8); d.p('k', 4, 4, 5, 4, 10, 4, 11, 4); d.p('p', 8, 5); }, SC);
add(G, C, 'nz-ballet', 'Ballet Hoàng gia New Zealand', 'Royal New Zealand Ballet', 'Đoàn ba lê quốc gia, lưu diễn khắp cả nước.',
  d => { d.bg('v'); d.e(8, 3, 1.6, 1.6, 's'); d.r(7, 5, 2, 3, 'p'); d.tri(3, 7, 10, 4, 'w'); d.l(8, 11, 8, 15, 's'); d.l(8, 11, 5, 13, 's'); d.p('p', 5, 14, 11, 14); d.l(6, 6, 2, 3, 's'); d.l(10, 6, 14, 3, 's'); }, SC);
add(G, C, 'nz-music', 'Âm nhạc đương đại', 'Contemporary music', 'Từ ban nhạc Crowded House, Split Enz đến ca sĩ Lorde, âm nhạc New Zealand đã có tiếng nói riêng trên thế giới.',
  d => { d.bg('K'); d.e(8, 6, 3, 3, 'w'); d.r(7, 9, 2, 6, 'w'); d.e(8, 6, 1.4, 1.4, 'k'); d.p('r', 2, 3, 13, 4, 3, 11, 12, 12); d.p('y', 4, 2, 11, 2, 1, 8, 14, 9); d.p('p', 2, 13, 14, 13); }, SC);

// ----- Hội họa, điêu khắc và kiến trúc -----
add(G, E, 'nz-whakairo', 'Whakairo (chạm khắc gỗ)', 'Whakairo (wood carving)', 'Nghệ thuật chạm gỗ, xương và đá với họa tiết xoắn ốc, thường trang trí wharenui và waka.',
  d => { d.bg('N'); d.r(3, 1, 10, 14, 'n'); d.e(8, 5, 3.2, 2.6, 't'); d.p('w', 7, 5, 9, 5); d.p('k', 7, 5, 9, 5); d.r(7, 7, 2, 1, 'r'); d.spiral(5, 11, 1, 'N'); d.spiral(11, 11, 1, 'N'); d.p('t', 8, 10, 8, 13); }, SC);
add(G, E, 'nz-raranga', 'Raranga (đan lát)', 'Raranga (weaving)', 'Kỹ thuật đan sợi lanh (harakeke) thành giỏ, chiếu và áo choàng.',
  d => { d.bg('e'); for (let i = 0; i < 8; i++) { d.r(1, 1 + i * 2, 14, 1, i % 2 ? 'n' : 't'); } for (let j = 0; j < 7; j++) d.r(2 + j * 2, 1, 1, 15, j % 2 ? 'N' : 'u'); d.p('t', 3, 3, 7, 7, 11, 11); }, SC);
add(G, E, 'nz-tukutuku', 'Tukutuku', 'Tukutuku', 'Những tấm đan trang trí trong nhà họp, mỗi họa tiết kể một câu chuyện tổ tiên.',
  d => { d.bg('N'); for (let y = 1; y < 15; y += 4) for (let x = 1; x < 15; x += 4) { d.r(x, y, 3, 3, 'e'); d.p('r', x + 1, y + 1); } for (let y = 3; y < 15; y += 4) d.r(0, y, 16, 1, 'k'); d.p('y', 3, 6, 11, 10); }, SC);
add(G, E, 'nz-kowhaiwhai', 'Kōwhaiwhai', 'Kōwhaiwhai', 'Họa tiết sơn màu đỏ, đen, trắng trên xà nhà và trần của wharenui.',
  d => { d.bg('R'); d.r(0, 6, 16, 4, 'w'); for (const x of [2, 8]) { d.spiral(x + 2, 8, 1, 'k'); d.p('k', x + 4, 8, x + 5, 7); } d.r(0, 0, 16, 2, 'k'); d.r(0, 14, 16, 2, 'k'); d.p('w', 5, 1, 11, 15); }, SC);
add(G, E, 'nz-mccahon', 'Tranh phong cảnh', 'Landscape painting', 'Các họa sĩ như Colin McCahon đã kết hợp hình ảnh phong cảnh với chữ viết và ý niệm tâm linh.',
  d => { d.bg('k'); d.r(1, 1, 14, 14, 'a'); d.r(1, 8, 14, 7, 'A'); d.tri(3, 3, 10, 5, 'K'); d.p('w', 3, 3, 6, 3, 9, 3, 12, 3); d.r(1, 11, 14, 1, 'k'); d.p('l', 4, 13, 8, 13, 11, 13); }, SC);
add(G, E, 'nz-tepapa', 'Bảo tàng Te Papa Tongarewa ở Wellington', 'Te Papa Tongarewa museum, Wellington', 'Bảo tàng quốc gia, tên Māori nghĩa là "nơi chứa báu vật của đất nước".',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(2, 5, 12, 7, 'u'); d.r(2, 4, 12, 1, 'W'); d.r(5, 7, 2, 5, 'k'); d.r(9, 7, 2, 5, 'k'); d.p('r', 3, 6, 12, 6); d.p('w', 1, 14, 12, 15); d.l(0, 3, 15, 3, 'a'); }, SC);
add(G, E, 'nz-cardboard', 'Nhà thờ Christchurch Cardboard Cathedral', 'Cardboard Cathedral, Christchurch', 'Công trình tạm thời của kiến trúc sư Shigeru Ban sau trận động đất năm 2011.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.tri(1, 3, 14, 10, 'W'); d.tri(4, 6, 8, 7, 't'); d.r(6, 9, 4, 4, 'N'); for (let x = 3; x < 14; x += 2) d.p('n', x, 12); d.l(8, 0, 8, 3, 'N'); d.l(7, 1, 9, 1, 'N'); }, SC);
add(G, E, 'nz-artdecoreg', 'Art Deco ở Napier', 'Art Deco in Napier', 'Cả thành phố ven biển còn lưu giữ dãy nhà thập niên 1930.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'W'); d.r(1, 5, 6, 9, 'y'); d.r(8, 3, 7, 11, 'p'); for (const [x, y] of [[2, 6], [5, 6], [2, 9], [5, 9], [9, 5], [12, 5], [9, 8], [12, 8]]) d.r(x, y, 1, 2, 'B'); d.p('P', 1, 5, 14, 3); d.r(10, 11, 3, 3, 'k'); }, SC);

// ----- Văn hóa hiện đại -----
add(G, F, 'nz-lotr', 'Điện ảnh quy mô lớn', 'Large-scale cinema', 'Các bộ phim Chúa tể những chiếc nhẫn (The Lord of the Rings) và Người Hobbit (The Hobbit) quay tại New Zealand đã đưa phong cảnh đất nước ra thế giới.',
  d => { d.bg('A'); d.tri(1, 4, 14, 10, 'K'); d.tri(5, 4, 6, 3, 'w'); d.e(8, 11, 4, 3, 'y'); d.e(8, 11, 2.6, 1.8, 'A'); d.e(8, 11, 4, 3, 'y'); d.e(8, 11, 2.6, 1.8, 'A'); d.p('o', 8, 8); d.p('w', 3, 2, 13, 3); }, SC);
add(G, F, 'nz-weta', 'Weta Workshop', 'Weta Workshop', 'Xưởng làm đạo cụ và hiệu ứng ở Wellington, gắn với nhiều bộ phim lớn.',
  d => { d.bg('e'); d.r(5, 7, 6, 8, 'a'); d.e(8, 5, 3, 3, 'a'); d.p('k', 6, 5, 10, 5); d.r(7, 7, 2, 1, 'k'); d.tri(1, 1, 4, 4, 'A'); d.tri(11, 1, 4, 4, 'A'); d.l(5, 9, 2, 12, 'A'); d.l(10, 9, 14, 12, 'A'); d.p('r', 8, 10); }, SC);
add(G, F, 'nz-indie', 'Phim độc lập', 'Independent film', 'Các đạo diễn như Taika Waititi và Jane Campion mang đến những tác phẩm giàu bản sắc.',
  d => { d.bg('k'); d.r(2, 6, 12, 8, 'd'); d.r(2, 3, 12, 3, 'w'); for (let x = 3; x < 13; x += 3) d.dtri(x, 3, 2, 3, 'k'); d.p('y', 5, 9, 10, 9); d.r(4, 11, 8, 1, 'a'); d.p('w', 8, 8); }, SC);
add(G, F, 'nz-rugby', 'Bóng bầu dục (rugby)', 'Rugby', 'Môn thể thao quốc dân, với đội tuyển quốc gia All Blacks nổi tiếng thế giới.',
  d => { d.bg('g'); d.r(0, 12, 16, 4, 'G'); d.e(8, 8, 5, 3, 'n'); d.p('w', 6, 8, 10, 8, 8, 7, 8, 9); d.l(1, 3, 1, 14, 'w'); d.l(14, 3, 14, 14, 'w'); d.l(1, 3, 14, 3, 'w'); }, H);
add(G, F, 'nz-bungy', 'Thể thao mạo hiểm', 'Adventure sports', 'Queenstown được gọi là thủ đô thể thao mạo hiểm, nơi bungy jumping (nhảy dây) thương mại bắt đầu.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'C'); d.tri(0, 6, 7, 8, 'A'); d.tri(9, 5, 7, 9, 'a'); d.r(6, 1, 4, 1, 'N'); d.l(8, 2, 8, 8, 'r'); d.e(8, 9, 1.4, 1.4, 's'); d.l(8, 10, 8, 11, 'b'); d.p('k', 7, 9); }, SC);
add(G, F, 'nz-literature', 'Văn học', 'Literature', 'Các nhà văn như Katherine Mansfield và Witi Ihimaera phản ánh đời sống và bản sắc xứ này.',
  d => { d.bg('e'); d.r(3, 3, 10, 11, 'n'); d.r(3, 3, 1, 11, 'N'); d.r(5, 4, 7, 9, 'u'); d.p('k', 6, 6, 10, 6, 6, 8, 11, 8, 6, 10, 9, 10); d.p('r', 11, 3); d.l(11, 3, 11, 1, 'r'); }, H);
add(G, F, 'nz-tramping', 'Đời sống ngoài trời', 'Outdoor life', 'Đi bộ đường dài (tramping), câu cá và lướt sóng là thú vui chung của nhiều gia đình.',
  d => { d.bg('c'); d.tri(0, 4, 16, 8, 'A'); d.tri(5, 4, 6, 3, 'w'); d.r(0, 12, 16, 4, 'g'); d.e(6, 8, 1.2, 1.2, 's'); d.r(5, 9, 3, 3, 'r'); d.r(8, 9, 3, 4, 'N'); d.l(6, 12, 6, 14, 'b'); d.l(7, 12, 8, 14, 'b'); d.p('y', 13, 2); }, SC);
