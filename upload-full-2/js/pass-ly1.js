import { add, SC, setCC } from './pass-kit.js';
setCC('ly');
// Libya · Nhóm 1: Nơi chốn và thiên nhiên
const G = 1, A = 'Địa danh', B = 'Mùa và thiên nhiên', C = 'Vùng miền', E = 'Hiện tượng đặc biệt';
const sand = d => { d.bg('c'); d.r(0, 11, 16, 5, 'u'); d.e(13, 3, 2, 2, 'y'); };

// ----- Địa danh -----
add(G, A, 'ly-leptis', 'Leptis Magna', 'Leptis Magna', 'Thành phố La Mã bên bờ biển, được xem là một trong những di tích La Mã còn nguyên vẹn nhất vùng Địa Trung Hải. Hoàng đế Septimius Severus sinh ra ở đây, và thành phố có nhà tắm, nhà hát, chợ và vòm khải hoàn cực lớn.',
  d => { sand(d); d.r(0, 14, 16, 2, 'C'); d.r(3, 5, 10, 8, 't'); d.r(6, 8, 4, 5, 'c'); d.e(8, 8, 2, 2, 'c'); d.r(2, 4, 12, 1, 'W'); d.r(3, 5, 2, 8, 'e'); d.r(11, 5, 2, 8, 'e'); d.p('W', 3, 6, 4, 8, 11, 6, 12, 8); }, SC);
add(G, A, 'ly-sabratha', 'Sabratha', 'Sabratha', 'Thành phố cổ có nhà hát La Mã ba tầng nhìn ra biển, với dãy cột và sân khấu đã được dựng lại một phần. Ban đầu đây là thương điếm của người Phoenicia, sau đó trở thành thành phố La Mã thịnh vượng.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.e(8, 14, 7, 5, 't'); d.e(8, 14, 5, 3.4, 'u'); d.r(1, 6, 14, 1, 'W'); for (const x of [2, 5, 8, 11, 14]) d.r(x, 7, 1, 4, 'e'); d.r(0, 11, 16, 1, 'W'); d.p('w', 3, 13, 10, 14); }, SC);
add(G, A, 'ly-cyrene', 'Cyrene (Shahhat)', 'Cyrene (Shahhat)', 'Thành phố Hy Lạp cổ ở vùng đồi phía đông, thành lập khoảng thế kỷ 7 trước Công nguyên. Nơi này có đền thờ thần Zeus, đền Apollo và một khu y học nổi tiếng thời cổ đại.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.tri(1, 3, 14, 3, 'W'); d.r(2, 6, 12, 1, 'e'); for (const x of [3, 6, 9, 12]) d.r(x, 7, 2, 5, 'w'); d.r(1, 12, 14, 1, 'e'); d.p('G', 1, 14, 6, 15, 12, 14); }, SC);
add(G, A, 'ly-ghadames', 'Ghadames', 'Ghadames', 'Ốc đảo gần biên giới Algeria và Tunisia, thường được gọi là "ngọc trai của sa mạc". Khu phố cổ có những ngôi nhà bùn trắng nối với nhau bằng mái và hành lang, giúp mát mẻ khi nắng nóng.',
  d => { sand(d); d.r(1, 6, 6, 6, 'w'); d.r(8, 4, 7, 8, 'e'); d.r(1, 5, 6, 1, 'W'); d.r(8, 3, 7, 1, 'W'); d.p('k', 3, 8, 3, 10, 10, 6, 12, 8, 10, 10); d.p('G', 14, 12, 14, 13); d.l(15, 11, 15, 8, 'N'); d.p('g', 14, 7, 15, 7); }, SC);
add(G, A, 'ly-tripoli', 'Tripoli', 'Tripoli', 'Thủ đô và thành phố lớn nhất, nằm bên bờ biển phía tây bắc. Khu Medina cổ có các cổng thành, chợ, nhà thờ Hồi giáo và Vòm Marcus Aurelius của La Mã.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(0, 10, 16, 2, 't'); d.r(1, 5, 4, 5, 'w'); d.r(6, 3, 4, 7, 'e'); d.r(11, 6, 4, 4, 'w'); d.e(8, 3, 2, 1.6, 'G'); d.l(8, 1, 8, 2, 'Y'); d.r(3, 3, 1, 3, 'e'); d.p('y', 3, 2); d.p('k', 7, 6, 8, 8, 9, 6, 2, 7, 12, 8); }, SC);
add(G, A, 'ly-apollonia', 'Apollonia và Tolmeita (Ptolemais)', 'Apollonia and Tolmeita (Ptolemais)', 'Hai thành phố cổ ven biển miền đông, một là cảng của Cyrene, một là thành phố Hy Lạp-La Mã. Nhiều phần nằm ngay cạnh biển, thậm chí chìm một phần dưới nước.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'C'); d.r(0, 9, 16, 1, 'h'); for (const x of [2, 5, 8]) { d.r(x, 4, 2, 6, 'e'); d.r(x - 1, 3, 4, 1, 'W'); } d.r(11, 6, 3, 4, 't'); d.p('w', 3, 12, 8, 13, 12, 12, 6, 15); d.p('c', 10, 11, 4, 14); d.p('W', 6, 12, 12, 14); }, SC);
add(G, A, 'ly-acacus', 'Núi Acacus (Tadrart Acacus)', 'Acacus Mountains (Tadrart Acacus)', 'Dãy núi đá ở tây nam, nổi tiếng với hàng nghìn bức tranh và khắc đá có tuổi từ khoảng 12.000 năm trước Công nguyên đến thế kỷ 1 sau Công nguyên. Chúng cho thấy Sahara từng có hươu, voi, hươu cao cổ và con người sống ở đó.',
  d => { d.bg('u'); d.r(0, 13, 16, 3, 'O'); d.tri(1, 2, 7, 11, 'O'); d.tri(8, 3, 8, 10, 'R'); d.r(3, 8, 4, 3, 'n'); d.p('N', 4, 9, 5, 8, 6, 9); d.p('u', 4, 10, 5, 10); d.p('r', 10, 9, 12, 8, 11, 10); }, SC);
add(G, A, 'ly-martyrs', 'Quảng trường Martyrs\' Square và Pháo đài Đỏ', 'Martyrs\' Square and the Red Castle', 'Quảng trường trung tâm Tripoli và pháo đài lớn nhìn ra cảng, từng là nơi ở của nhiều người cai trị. Pháo đài nay là bảo tàng lưu giữ nhiều hiện vật của đất nước.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'u'); d.r(2, 5, 12, 9, 'R'); d.r(2, 4, 12, 1, 'r'); for (let x = 2; x < 14; x += 2) d.r(x, 3, 1, 1, 'r'); d.r(6, 8, 4, 6, 'N'); d.e(8, 8, 2, 2, 'N'); d.p('k', 4, 7, 11, 7); d.r(0, 12, 2, 2, 'w'); d.p('w', 14, 12, 15, 13); }, SC);

// ----- Mùa và thiên nhiên -----
add(G, B, 'ly-sahara', 'Sa mạc Sahara', 'The Sahara Desert', 'Chiếm phần lớn diện tích, gồm cồn cát, đồng bằng đá và bồn địa khô. Ban ngày nóng bỏng nhưng ban đêm có thể lạnh đột ngột.',
  d => { d.bg('c'); d.e(12, 3, 2.4, 2.4, 'y'); d.r(0, 9, 16, 7, 'u'); d.e(4, 11, 6, 3, 'y'); d.e(13, 12, 5, 3, 'u'); d.e(9, 14, 6, 2, 'y'); d.p('Y', 2, 10, 6, 11, 11, 11, 8, 13); }, SC);
add(G, B, 'ly-ubari', 'Biển cát Ubari', 'Ubari Sand Sea', 'Dải cồn cát lớn ở tây nam, xen những hồ nhỏ nằm giữa cồn như Gabraoun và Umm al-Maa. Nước ở đây mặn và có nhiều tảo, tạo màu xanh nổi bật trên nền cát vàng.',
  d => { d.bg('c'); d.r(0, 6, 16, 10, 'y'); d.e(4, 8, 6, 3, 'u'); d.e(14, 7, 5, 3, 'u'); d.e(8, 12, 4.4, 1.8, 'C'); d.e(8, 12, 3.2, 1, 'g'); d.p('G', 5, 13, 11, 13); d.e(11, 4, 1.6, 1.6, 'o'); }, SC);
add(G, B, 'ly-akhdar', 'Núi Akhdar (Jebel Akhdar)', 'Green Mountain (Jebel Akhdar)', 'Vùng núi phía đông bắc, tên nghĩa là "Núi Xanh", có rừng bách xù, cây thông và mưa nhiều hơn các nơi khác. Đây là vùng xanh nhất đất nước.',
  d => { d.bg('c'); d.tri(0, 4, 12, 9, 'G'); d.tri(6, 3, 10, 10, 'g'); for (const [x, y] of [[3, 8], [6, 7], [9, 6], [12, 8], [5, 11], [11, 11]]) d.tri(x - 1, y, 3, 3, 'G'); d.r(0, 13, 16, 3, 'h'); d.p('w', 2, 2, 11, 2); }, SC);
add(G, B, 'ly-coast', 'Bờ biển Địa Trung Hải', 'The Mediterranean coast', 'Đường bờ biển dài gần 2.000 km với bãi cát, vịnh và đầm nước mặn. Khí hậu ở đây ôn hòa hơn nội địa, với mùa đông ẩm và mùa hè nóng.',
  d => { d.bg('c'); d.e(4, 3, 2, 2, 'y'); d.r(0, 7, 16, 5, 'C'); d.r(0, 12, 16, 4, 'u'); d.l(0, 12, 15, 11, 'W'); d.p('w', 3, 8, 8, 9, 12, 8, 6, 10, 11, 10); d.l(13, 15, 13, 11, 'N'); d.p('G', 12, 10, 14, 10, 13, 9); }, SC);
add(G, B, 'ly-ghibli', 'Mùa xuân và gió Ghibli', 'Spring and the Ghibli wind', 'Từ mùa xuân đến đầu hè, gió khô nóng từ sa mạc thổi ra biển làm nhiệt độ tăng vọt và bầu trời đục vì bụi. Người dân gọi gió này là ghibli, và thường đóng cửa sổ trong những ngày này.',
  d => { d.bg('O'); d.r(0, 0, 16, 6, 'o'); d.e(8, 5, 3, 3, 'y'); d.r(0, 11, 16, 5, 'u'); d.l(1, 7, 14, 7, 'u'); d.l(0, 9, 15, 9, 'y'); d.l(2, 12, 12, 12, 'Y'); d.p('y', 3, 8, 8, 10, 12, 8, 5, 13); }, SC);
add(G, B, 'ly-rain', 'Mùa đông và mùa mưa', 'Winter and the rainy season', 'Mưa chủ yếu rơi vào mùa đông ở vùng ven biển và núi. Nhờ vậy ô liu và lúa mạch có thể trồng ở phía bắc.',
  d => { d.bg('a'); d.r(0, 0, 16, 5, 'A'); d.e(4, 3, 3, 2, 'l'); d.e(11, 3, 3, 2, 'l'); for (const x of [3, 6, 9, 12]) d.l(x, 6, x - 1, 9, 'b'); d.r(0, 11, 16, 5, 'g'); for (const x of [2, 6, 10, 14]) { d.e(x, 12, 1.6, 1.6, 'G'); d.p('N', x, 14); } }, SC);
add(G, B, 'ly-oasis', 'Cây chà là và ốc đảo', 'Date palms and oases', 'Các ốc đảo như Ghadames, Awjila và Kufra có cây chà là quanh các mạch nước ngầm. Cây chà là là nguồn thức ăn và vật liệu quan trọng cho người dân sa mạc.',
  d => { sand(d); d.e(8, 13, 4, 1.6, 'C'); for (const x of [4, 11]) { d.l(x, 12, x, 6, 'N'); d.p('G', x - 3, 5, x - 2, 4, x + 2, 4, x + 3, 5, x - 2, 6, x + 2, 6, x - 1, 5, x + 1, 5); d.p('O', x, 7, x + 1, 7); } d.p('g', 7, 13, 9, 13); }, SC);

// ----- Vùng miền -----
add(G, C, 'ly-tripolitania', 'Tripolitania (miền tây bắc)', 'Tripolitania (northwest)', 'Vùng quanh Tripoli, nơi dân cư đông nhất và gần châu Âu nhất. Nơi đây có Leptis Magna và Sabratha, và từng chịu ảnh hưởng của người Phoenicia, La Mã và Ottoman.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(0, 9, 16, 2, 'u'); d.r(3, 4, 4, 5, 'w'); d.e(5, 4, 2, 1.6, 'G'); d.r(9, 5, 5, 4, 'e'); d.r(11, 3, 1, 2, 'e'); d.p('y', 11, 2); d.p('k', 4, 6, 10, 7, 12, 7); d.p('w', 2, 13, 9, 14); }, SC);
add(G, C, 'ly-cyrenaica', 'Cyrenaica (miền đông)', 'Cyrenaica (east)', 'Vùng quanh Benghazi và núi Akhdar, trước kia chịu ảnh hưởng Hy Lạp. Người dân miền đông có truyền thống bộ lạc riêng và từ lâu có sự khác biệt với miền tây.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.tri(1, 5, 10, 8, 'G'); d.tri(7, 6, 9, 7, 'g'); d.r(10, 3, 4, 1, 'W'); d.r(10, 4, 1, 3, 'e'); d.r(13, 4, 1, 3, 'e'); d.r(11, 6, 2, 1, 'e'); d.p('h', 2, 13, 9, 14); }, SC);
add(G, C, 'ly-fezzan', 'Fezzan (miền tây nam)', 'Fezzan (southwest)', 'Vùng sa mạc rộng lớn với các ốc đảo, là nơi sinh sống của người Tuareg và Tebu. Từ xưa đây là điểm dừng của các đoàn buôn xuyên Sahara.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'y'); d.e(8, 8, 7, 2, 'u'); d.e(3, 5, 1, 1, 'y'); d.e(12, 3, 2, 2, 'y'); d.e(5, 12, 2, 1.6, 'n'); d.r(3, 11, 4, 2, 'n'); d.p('N', 3, 13, 6, 13); d.l(10, 12, 10, 9, 'N'); d.p('G', 9, 8, 11, 8); d.p('Y', 12, 13); }, SC);
add(G, C, 'ly-benghazi', 'Benghazi', 'Benghazi', 'Thành phố lớn thứ hai, một cảng quan trọng ở miền đông. Tên gọi được cho là bắt nguồn từ một vị thánh địa phương tên Ghazi.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.r(0, 8, 16, 2, 'u'); d.r(2, 3, 4, 5, 'e'); d.r(8, 5, 3, 3, 'w'); d.r(12, 4, 3, 4, 'W'); d.r(11, 11, 4, 1, 'N'); d.tri(12, 8, 3, 3, 'R'); d.l(13, 8, 13, 6, 'N'); d.p('k', 3, 5, 9, 6, 13, 6); d.p('w', 2, 13, 7, 14); }, SC);
add(G, C, 'ly-misrata', 'Misrata', 'Misrata', 'Thành phố cảng và trung tâm thương mại ở miền tây, nổi tiếng với tinh thần buôn bán. Nơi đây có nhiều doanh nghiệp tư nhân và cảng lớn.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.r(2, 8, 12, 2, 'a'); d.r(3, 5, 3, 3, 'r'); d.r(7, 6, 3, 2, 'b'); d.r(10, 5, 3, 3, 'y'); d.l(13, 8, 13, 2, 'a'); d.l(13, 2, 9, 4, 'a'); d.p('w', 2, 12, 8, 13, 12, 12); }, SC);
add(G, C, 'ly-kufra', 'Kufra và Sebha', 'Kufra and Sebha', 'Kufra là ốc đảo xa xôi ở đông nam, còn Sebha là thành phố chính của Fezzan. Cả hai cách xa bờ biển hàng trăm km nên từ lâu là điểm nối của các tuyến đường sa mạc.',
  d => { sand(d); d.e(8, 13, 3, 1.2, 'C'); d.r(3, 6, 4, 5, 'w'); d.r(9, 7, 4, 4, 'e'); d.p('k', 4, 8, 10, 9); d.l(5, 6, 5, 4, 'e'); d.l(11, 7, 11, 5, 'N'); d.p('G', 10, 4, 12, 4); }, SC);

// ----- Hiện tượng đặc biệt -----
add(G, E, 'ly-aquifer', 'Biển nước ngầm cổ (Nubian Sandstone Aquifer)', 'Ancient aquifer (Nubian Sandstone Aquifer)', 'Một lớp nước ngầm khổng lồ nằm dưới sa mạc, tích tụ từ thời Sahara còn ẩm. Libya dùng hệ thống ống dẫn lớn, gọi là Great Man-Made River, để đưa nước này lên miền bắc.',
  d => { d.bg('u'); d.r(0, 0, 16, 5, 'c'); d.r(0, 5, 16, 3, 'y'); d.r(0, 8, 16, 8, 'a'); d.e(8, 12, 7, 2.6, 'b'); d.e(8, 12, 5, 1.4, 'c'); d.r(7, 5, 2, 8, 'A'); d.r(6, 4, 4, 1, 'k'); d.p('w', 3, 13, 12, 12); d.l(8, 5, 8, 12, 'B'); }, SC);
add(G, E, 'ly-gabraoun', 'Hồ Gabraoun giữa cồn cát', 'Gabraoun lake among the dunes', 'Các hồ nhỏ nằm giữa cồn cát, có lúc cạn lúc đầy. Cảnh hồ xanh giữa cát vàng khiến nhiều du khách bất ngờ.',
  d => { d.bg('c'); d.r(0, 7, 16, 9, 'y'); d.e(3, 8, 5, 3, 'u'); d.e(13, 8, 5, 3, 'u'); d.e(8, 12, 5, 2.4, 'C'); d.e(8, 12, 3.4, 1.4, 'c'); d.p('G', 4, 14, 12, 14); d.e(8, 2, 1.4, 1.4, 'y'); }, SC);
add(G, E, 'ly-stars', 'Tinh không sa mạc', 'Desert night sky', 'Nhờ ít ánh sáng và không khí khô, bầu trời đêm ở Fezzan hiện ra rất rõ với dải Ngân Hà. Du khách và người dẫn đường thường nói về đêm sa mạc như một trải nghiệm riêng.',
  d => { d.bg('B'); d.r(0, 12, 16, 4, 'N'); d.e(8, 12, 8, 2, 'O'); for (let i = 0; i < 8; i++) d.p('l', 2 + i * 2, 1 + (i * 3) % 7); d.l(2, 9, 14, 2, 'K'); d.l(3, 9, 14, 3, 'K'); d.p('y', 13, 3, 5, 5, 9, 8); d.p('w', 10, 4, 3, 7); }, SC);
add(G, E, 'ly-singing', 'Cồn cát hát', 'Singing dunes', 'Một số cồn cát lớn ở Sahara phát ra tiếng ù khi cát trượt. Hiện tượng này được ghi nhận ở nhiều sa mạc và cũng được người dân vùng này kể lại.',
  d => { d.bg('c'); d.e(13, 3, 1.6, 1.6, 'y'); d.r(0, 11, 16, 5, 'y'); d.e(7, 11, 8, 4, 'u'); d.e(7, 11, 8, 4, 'u'); d.l(7, 7, 14, 11, 'Y'); d.p('k', 3, 3, 3, 4, 5, 3, 5, 4); d.p('B', 3, 2, 5, 2, 7, 2, 9, 1); }, SC);
add(G, E, 'ly-glass', 'Kính sa mạc Libya', 'Libyan Desert Glass', 'Ở vùng biên giới Libya và Ai Cập có kính sa mạc (Libyan Desert Glass), một loại thủy tinh tự nhiên màu vàng nhạt. Các nhà khoa học cho rằng nó hình thành do một vụ va chạm hoặc nổ lớn cách đây khoảng 29 triệu năm.',
  d => { d.bg('y'); d.r(0, 12, 16, 4, 'Y'); d.tri(3, 4, 8, 8, 'u'); d.tri(6, 5, 5, 7, 'h'); d.tri(9, 8, 5, 4, 'u'); d.p('w', 5, 7, 6, 6, 10, 10); d.p('l', 7, 8); d.p('Y', 2, 13, 12, 14); }, SC);
