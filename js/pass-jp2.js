import { add, SC, setCC } from './pass-kit.js';
setCC('jp');
// Nhật Bản · Nhóm 2: Con người và đời sống
const G2 = 2, T1 = 'Trang phục', T2 = 'Phụ kiện', T3 = 'Nhà ở và đồ dùng', T4 = 'Thói quen và phép tắc';

// ----- Trang phục (nhân vật Lame mặc) -----
add(G2, T1, 'kimono', 'Kimono', 'Kimono', 'Tên gọi gồm "ki" (mặc) và "mono" (đồ vật), tức là "đồ để mặc". Người sống luôn gài vạt trái đè lên vạt phải; đảo ngược lại chỉ dành cho người đã mất.', null, { char: ['kimono'], use: 'wear' });
add(G2, T1, 'yukata', 'Yukata', 'Yukata', 'Kimono bằng vải bông mỏng, mặc vào mùa hè để đi xem pháo hoa, dự lễ hội, hoặc mặc sau khi tắm onsen.', null, { char: ['yukata'], use: 'wear' });
add(G2, T1, 'furisode', 'Furisode', 'Furisode', 'Kimono tay rất dài, màu rực rỡ, dành cho nữ chưa lập gia đình. Các cô gái thường mặc khi dự Lễ Thành nhân vào thứ Hai thứ hai của tháng 1.', null, { char: ['furisode'], use: 'wear' });
add(G2, T1, 'shiromuku', 'Shiromuku', 'Shiromuku', 'Lễ phục cưới màu trắng tinh của cô dâu, biểu tượng cho sự tinh khiết và khởi đầu mới.', null, { char: ['shiromuku', 'hood'], use: 'wear' });
add(G2, T1, 'hakama', 'Hakama', 'Hakama', 'Quần ống rộng xếp nếp, xưa là trang phục của samurai. Ngày nay người ta mặc khi tập kiếm đạo (kendo), aikido và trong lễ tốt nghiệp đại học.', null, { char: ['hakama'], use: 'wear' });
add(G2, T1, 'happi', 'Haori và happi', 'Haori and happi', 'Haori là áo khoác ngoài kimono; happi là áo ngắn mặc trong lễ hội, thường in tên khu phố hoặc nhóm.', null, { char: ['happi', 'hachimaki'], use: 'wear' });
add(G2, T1, 'uniform', 'Đồng phục học sinh', 'School uniform', 'Nữ mặc kiểu thủy thủ (sailor fuku) có từ đầu thế kỷ 20, nam mặc gakuran cổ đứng màu đen. Cả hai đều mô phỏng quân phục châu Âu và đã trở thành hình ảnh quen thuộc trong anime.', null, { char: ['sailor'], use: 'wear' });

// ----- Phụ kiện -----
add(G2, T2, 'obi', 'Obi', 'Obi', 'Dây đai bản rộng quấn quanh thắt lưng kimono. Đây là phụ kiện đắt nhất, và cách thắt nút obi cho từng dịp cũng là một nghệ thuật riêng.',
  d => { d.r(1, 2, 14, 12, 'r'); d.r(1, 2, 2, 12, 'R'); d.r(1, 6, 14, 4, 'y'); d.r(1, 6, 14, 1, 'Y'); d.r(1, 9, 14, 1, 'Y'); for (const x of [3, 6, 11, 13]) d.p('o', x, 7, x, 8); d.r(6, 5, 4, 6, 'Y'); d.r(7, 6, 2, 4, 'o'); d.p('R', 4, 3, 10, 12, 12, 4); d.p('x', 5, 12, 12, 11); }, { use: 'wear' });
add(G2, T2, 'kanzashi', 'Kanzashi', 'Kanzashi', 'Trâm cài tóc. Nghệ nhân Kyoto (maiko) đổi hoa cài tóc theo từng tháng, vì vậy nhìn cái trâm là biết đang vào mùa nào.',
  d => { d.l(2, 14, 11, 5, 'Y'); d.l(3, 14, 12, 5, 'y'); d.e(11.5, 4, 2.6, 2.6, 'p'); d.e(9.5, 3.5, 1.6, 1.6, 'x'); d.e(13.5, 3.5, 1.6, 1.6, 'x'); d.e(11.5, 6, 1.6, 1.4, 'x'); d.p('y', 11, 4, 12, 4); d.l(8, 7, 7, 11, 'c'); d.p('c', 7, 12); d.l(10, 8, 10, 12, 'c'); d.p('y', 10, 13); }, { use: 'wear' });
add(G2, T2, 'sensu', 'Quạt (sensu, uchiwa)', 'Folding fan (sensu, uchiwa)', 'Sensu là quạt gấp, còn uchiwa là quạt tròn cầm tay. Quạt gấp vừa để làm mát vừa là đạo cụ trong múa và trà đạo.',
  d => { d.fan(8, 14, 7.5, 'w'); for (let a = 0; a <= 6; a++) { const t = Math.PI * (0.08 + a * 0.14); d.l(8, 14, 8 - Math.round(Math.cos(t) * 7), 14 - Math.round(Math.sin(t) * 7), 'n'); } d.fan(8, 14, 3, 'r'); d.r(7, 13, 2, 3, 'N'); d.p('r', 3, 8, 12, 8, 8, 6); }, { use: 'hold' });
add(G2, T2, 'geta', 'Guốc geta và dép zori', 'Geta and zori sandals', 'Geta là guốc gỗ hai răng, còn zori là dép phẳng. Hai loại này được mặc cùng với tất tách ngón tabi.',
  d => { d.r(1, 8, 14, 2, 'n'); d.r(3, 10, 3, 4, 'n'); d.r(10, 10, 3, 4, 'n'); d.r(1, 8, 14, 1, 't'); d.l(8, 3, 4, 8, 'r'); d.l(8, 3, 12, 8, 'r'); d.l(8, 3, 8, 8, 'R'); d.p('w', 7, 2, 8, 2, 9, 2); }, { use: 'wear' });
add(G2, T2, 'omamori', 'Omamori', 'Omamori charm', 'Bùa hộ mệnh nhỏ bằng vải, mua ở đền chùa, mỗi lá cầu một điều như bình an, thi đỗ hay tình duyên. Người ta không mở bên trong và thường trả lại đền sau khoảng một năm.',
  d => { d.r(4, 4, 8, 10, 'r'); d.r(4, 4, 1, 10, 'R'); d.r(5, 4, 6, 2, 'y'); d.r(5, 6, 6, 1, 'Y'); d.r(6, 8, 4, 1, 'y'); d.r(7, 7, 2, 5, 'y'); d.p('k', 8, 9); d.r(7, 2, 2, 2, 'y'); d.r(6, 0, 4, 1, 'Y'); d.r(7, 14, 2, 1, 'y'); d.p('y', 6, 14, 9, 14); }, { use: 'hold' });
add(G2, T2, 'furoshiki', 'Furoshiki', 'Furoshiki', 'Khăn vải vuông dùng để gói quà hay đồ đạc, dùng đi dùng lại nhiều lần. Đây là "túi môi trường" từ rất lâu trước khi túi nhựa xuất hiện.',
  d => { d.e(8, 10, 6, 4.6, 'g'); d.e(8, 11, 6, 3.5, 'G'); d.e(8, 10, 5.4, 4, 'g'); for (const [x, y] of [[5, 8], [8, 7], [11, 8], [4, 11], [7, 10], [10, 11], [13, 11], [6, 13], [9, 13]]) d.p('w', x, y); d.e(5, 4, 2.2, 1.6, 'g'); d.e(11, 4, 2.2, 1.6, 'g'); d.r(7, 4, 2, 3, 'G'); d.p('G', 3, 3, 12, 3); }, { use: 'hold' });
add(G2, T2, 'wagasa', 'Ô giấy (wagasa) và chuông gió (furin)', 'Paper umbrella (wagasa) and wind chime (furin)', 'Ô giấy dầu rất đẹp khi cùng kimono, còn chuông gió treo hiên nhà mùa hè để tiếng kêu trong trẻo giúp người ta cảm thấy mát hơn.',
  d => { d.fan(7, 9, 7, 'r'); for (let a = 1; a <= 5; a++) { const t = Math.PI * a / 6; d.l(7, 9, 7 - Math.round(Math.cos(t) * 7), 9 - Math.round(Math.sin(t) * 7), 'R'); } d.fan(7, 9, 2.5, 'w'); d.l(7, 9, 7, 15, 'N'); d.p('N', 6, 15); d.e(13, 11.5, 1.8, 1.6, 'c'); d.p('w', 12, 11); d.l(13, 8, 13, 10, 'a'); d.r(12, 14, 3, 1, 'p'); d.l(13, 13, 13, 14, 'a'); }, { use: 'hold' });

// ----- Nhà ở và đồ dùng -----
add(G2, T3, 'tatami', 'Chiếu tatami', 'Tatami mats', 'Làm từ rơm lúa và cói, một tấm rộng khoảng 1,6 m². Người Nhật đo diện tích phòng bằng số chiếu, ví dụ "phòng sáu chiếu".',
  d => { d.bg('N'); d.r(1, 1, 14, 6, 'h'); d.r(1, 8, 6, 7, 'h'); d.r(8, 8, 7, 7, 'h'); for (let y = 2; y < 7; y += 2) d.r(2, y, 12, 1, 'g'); for (let y = 9; y < 15; y += 2) { d.r(2, y, 4, 1, 'g'); d.r(9, y, 5, 1, 'g'); } d.r(1, 1, 14, 1, 'e'); d.r(1, 8, 6, 1, 'e'); d.r(8, 8, 7, 1, 'e'); }, { scene: true });
add(G2, T3, 'shoji', 'Cửa kéo shoji và fusuma', 'Shoji and fusuma sliding doors', 'Shoji là cửa khung gỗ dán giấy washi mỏng cho ánh sáng dịu vào phòng; fusuma là cửa kéo dày hơn dùng để ngăn phòng.',
  d => { d.bg('N'); d.r(1, 1, 14, 14, 'e'); for (const x of [1, 8, 14]) d.r(x, 1, 1, 14, 'N'); for (const y of [1, 5, 9, 14]) d.r(1, y, 14, 1, 'N'); d.r(1, 1, 7, 14, 'e'); d.r(8, 1, 7, 14, 'u'); d.p('N', 4, 3, 4, 7, 4, 11, 11, 3, 11, 7, 11, 11); }, { scene: true });
add(G2, T3, 'ofuro', 'Bồn tắm ofuro', 'Ofuro bath', 'Bồn gỗ hoặc bồn nóng dành để ngâm, không phải để cọ rửa. Người ta luôn tắm sạch bằng vòi sen trước rồi mới bước vào bồn.',
  d => { d.r(2, 8, 12, 7, 'n'); d.r(2, 8, 12, 1, 't'); d.r(3, 9, 10, 2, 'c'); d.r(3, 9, 10, 1, 'l'); for (const x of [5, 8, 11]) d.r(x, 11, 1, 4, 'N'); d.l(5, 6, 4, 4, 'w'); d.l(4, 4, 5, 2, 'w'); d.l(10, 6, 11, 4, 'w'); d.l(11, 4, 10, 2, 'w'); d.e(8, 9.5, 1.6, 1.2, 'y'); d.p('o', 8, 9); }, { use: 'hold' });
add(G2, T3, 'genkan', 'Genkan', 'Genkan entrance', 'Khu vực cửa ra vào thấp hơn sàn nhà một bậc, nơi cởi giày trước khi bước lên sàn.',
  d => { d.r(0, 0, 16, 8, 't'); d.r(0, 8, 16, 2, 'n'); d.r(0, 10, 16, 6, 'a'); d.r(0, 8, 16, 1, 'N'); d.r(2, 11, 4, 3, 'd'); d.r(3, 10, 2, 1, 'd'); d.r(9, 11, 5, 3, 'B'); d.r(10, 10, 3, 1, 'B'); d.p('w', 3, 13, 11, 13); d.r(11, 2, 3, 4, 'e'); d.p('N', 12, 3, 12, 4); }, { scene: true });
add(G2, T3, 'kotatsu', 'Kotatsu', 'Kotatsu', 'Bàn thấp có bếp sưởi bên dưới, phủ chiếc chăn lớn. Mùa đông cả nhà chui chân vào đó ăn quýt, đọc sách, ngủ gật.',
  d => { d.r(2, 5, 12, 2, 'n'); d.r(2, 5, 12, 1, 't'); d.r(3, 7, 10, 7, 'r'); d.r(1, 11, 14, 4, 'r'); d.r(1, 12, 14, 1, 'R'); d.r(1, 14, 14, 1, 'R'); for (const x of [4, 8, 12]) d.p('y', x, 9); d.e(6, 4, 1.6, 1.4, 'o'); d.e(9.5, 4, 1.6, 1.4, 'o'); d.p('G', 6, 2, 9, 2); d.r(5, 15, 6, 1, 'o'); }, { use: 'hold' });
add(G2, T3, 'futon', 'Futon và oshiire', 'Futon and oshiire', 'Nệm trải ban đêm, sáng gấp gọn cất vào tủ âm tường oshiire, giúp phòng nhỏ biến thành đa năng.',
  d => { d.r(1, 9, 14, 5, 'b'); d.r(1, 9, 14, 1, 'c'); d.r(1, 13, 14, 1, 'B'); d.r(2, 6, 12, 3, 'w'); d.r(2, 6, 12, 1, 'l'); d.r(3, 3, 5, 3, 'l'); d.r(3, 3, 5, 1, 'w'); d.p('c', 5, 4, 6, 4); d.p('B', 12, 10, 4, 11, 8, 12); }, { use: 'hold' });
add(G2, T3, 'noren', 'Noren', 'Noren curtain', 'Tấm rèm vải xẻ giữa treo trước cửa tiệm. Noren thò xuống là quán đang mở cửa, noren cất vào là quán đã đóng.',
  d => { d.bg('t'); d.r(1, 1, 14, 1, 'N'); d.r(1, 2, 6, 9, 'B'); d.r(9, 2, 6, 9, 'B'); d.r(1, 10, 6, 1, 'b'); d.r(9, 10, 6, 1, 'b'); d.r(3, 4, 2, 4, 'w'); d.r(11, 4, 2, 4, 'w'); d.r(3, 6, 2, 1, 'B'); d.r(11, 6, 2, 1, 'B'); d.r(0, 14, 16, 2, 'n'); d.p('N', 1, 0, 14, 0); }, { scene: true });
add(G2, T3, 'toilet', 'Nhà vệ sinh thông minh', 'Smart toilet', 'Bồn cầu có vòi xịt rửa, sưởi ấm và âm thanh che tiếng động, là thứ du khách thường ngạc nhiên nhất.',
  d => { d.r(3, 2, 8, 6, 'w'); d.r(3, 2, 8, 1, 'l'); d.e(7.5, 10.5, 5, 3, 'w'); d.e(7.5, 10.5, 3.2, 1.8, 'c'); d.r(4, 12, 8, 3, 'W'); d.r(12, 3, 3, 4, 'a'); d.p('b', 13, 4); d.p('g', 13, 5); d.p('r', 13, 6); d.p('y', 1, 1, 14, 9, 14, 11, 2, 7); }, { use: 'hold' });

// ----- Thói quen và phép tắc -----
add(G2, T4, 'ojigi', 'Cúi chào (ojigi)', 'Bowing (ojigi)', 'Gật đầu hay cúi gập người tùy mức kính trọng. Càng cúi sâu, người đối diện càng được tôn trọng.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'g'); d.e(10.5, 6.5, 2.2, 2.2, 's'); d.r(8, 4, 5, 2, 'N'); d.r(2, 8, 8, 3, 'B'); d.r(8, 7, 3, 3, 'B'); d.l(3, 11, 3, 14, 'B'); d.l(6, 11, 6, 14, 'B'); d.r(1, 9, 3, 1, 'w'); d.p('s', 8, 10); d.p('d', 2, 14, 3, 14, 5, 14, 6, 14); }, SC);
add(G2, T4, 'omotenashi', 'Omotenashi', 'Omotenashi hospitality', 'Tinh thần tiếp đãi khách chu đáo từ trước khi khách kịp mở lời, và không mong nhận lại gì. Người Nhật không có thói quen boa tiền.',
  d => { d.bg('t'); d.r(1, 11, 14, 2, 'N'); d.r(1, 11, 14, 1, 'n'); d.r(4, 6, 5, 5, 'w'); d.r(4, 6, 5, 1, 'l'); d.r(5, 7, 3, 1, 'g'); d.r(9, 7, 2, 3, 'W'); d.e(12, 9.5, 1.8, 1.3, 'p'); d.p('x', 11, 9); d.l(5, 4, 6, 2, 'w'); d.l(7, 4, 8, 2, 'w'); d.p('N', 3, 13, 12, 13); }, { scene: true });
add(G2, T4, 'meishi', 'Meishi (danh thiếp)', 'Meishi (business cards)', 'Được trao và nhận bằng hai tay, đọc kỹ rồi mới cất cẩn thận, vì đó là "mặt" của người đưa.',
  d => { d.r(2, 3, 10, 7, 'w'); d.r(2, 3, 10, 1, 'l'); d.r(3, 5, 5, 1, 'a'); d.r(3, 7, 7, 1, 'a'); d.e(10, 5, 1.1, 1.1, 'r'); d.r(5, 7, 10, 7, 'e'); d.r(6, 9, 4, 1, 'A'); d.r(6, 11, 7, 1, 'a'); d.r(6, 12, 5, 1, 'a'); d.p('r', 13, 9); }, { use: 'hold' });
add(G2, T4, 'konbini', 'Konbini', 'Konbini convenience store', 'Cửa hàng tiện lợi mở suốt ngày đêm, bán cả bữa ăn nóng, đóng gói bưu kiện và trả hóa đơn, gần như một "nhà phụ" của mọi người.',
  d => { d.bg('B'); d.r(0, 3, 16, 3, 'w'); for (let x = 0; x < 16; x += 4) { d.r(x, 3, 2, 3, 'g'); d.r(x + 2, 3, 2, 3, 'r'); } d.r(0, 6, 16, 1, 'b'); d.r(1, 8, 14, 8, 'c'); d.r(6, 8, 4, 8, 'l'); d.r(7, 8, 1, 8, 'a'); d.r(2, 9, 3, 4, 'y'); d.r(11, 9, 3, 4, 'o'); d.r(1, 1, 14, 2, 'y'); d.p('k', 3, 1, 5, 1, 8, 1, 11, 1); }, { scene: true });
add(G2, T4, 'xephang', 'Xếp hàng và giữ yên lặng', 'Queuing and quiet manners', 'Trên tàu điện, người ta xếp hàng ngay ngắn trước vạch dừng, hạ giọng hoặc để điện thoại ở chế độ im lặng.',
  d => { d.bg('l'); d.r(0, 13, 16, 3, 'a'); d.r(0, 14, 16, 1, 'y'); for (const [x, c] of [[2, 'r'], [7, 'b'], [12, 'g']]) { d.e(x + 1, 5, 1.6, 1.6, 's'); d.r(x - 0.5, 7, 3, 4, c); d.r(x, 11, 1, 2, 'd'); d.r(x + 2, 11, 1, 2, 'd'); } d.p('k', 2, 5, 7, 5, 12, 5); d.r(4, 1, 8, 2, 'w'); d.p('A', 5, 2, 10, 2); }, SC);
