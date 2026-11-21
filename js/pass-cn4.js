import { add, SC, setCC } from './pass-kit.js';
import { SLOT_OF, O } from './pass-lame.js';
setCC('cn');
// Trung Quốc · Nhóm 4: Văn hóa và nghệ thuật
const G = 4, A = 'Lễ hội', B = 'Nhạc cụ', C = 'Nghệ thuật biểu diễn', E = 'Nghệ thuật truyền thống', F = 'Văn hóa hiện đại';
const H = { use: 'hold' };
SLOT_OF['cn-jingju'] = 'face'; SLOT_OF['cn-bianlian'] = 'face'; SLOT_OF['cn-lion'] = 'head';
O['cn-jingju'] = { y0: 5, pal: { w: '#ffffff', r: '#e8452c', k: '#2b1d3a', y: '#ffd84d' }, rows: ['....rrrrrrrr....', '....rkrrrrkr....', '....rrrrrrrr....', '....rrwyywrr....', '....rrrrrrrr....'] };
O['cn-bianlian'] = { y0: 5, pal: { b: '#4a7be0', k: '#2b1d3a', y: '#ffd84d', w: '#ffffff' }, rows: ['....bbbbbbbb....', '....bkbbbbkb....', '....bbbbbbbb....', '....bbbyybbb....', '....bwwwwwwb....'] };
O['cn-lion'] = { y0: -2, pal: { r: '#e8452c', y: '#ffd84d', w: '#ffffff', k: '#2b1d3a' }, rows: ['....rrrrrrrr....', '...rrrrrrrrrr...', '..rrwwrrrrwwrr..', '..rrwkrrrrkwrr..', '..ryyrrrrrryyr..', '..rr........rr..'] };

// ----- Lễ hội -----
add(G, A, 'cn-newyear', 'Tết Nguyên Đán (Chunjie)', 'Spring Festival (Chinese New Year)', 'Lễ hội lớn nhất năm, kéo dài từ đêm giao thừa đến rằm tháng Giêng. Gia đình sum họp, ăn bữa tất niên, dán câu đối đỏ và lì xì bằng phong bao đỏ (hongbao).',
  d => { d.bg('r'); d.r(1, 0, 3, 16, 'R'); d.r(12, 0, 3, 16, 'R'); d.r(5, 3, 6, 9, 'y'); d.r(5, 3, 6, 1, 'Y'); d.l(6, 5, 9, 5, 'r'); d.l(6, 7, 9, 7, 'r'); d.l(7, 5, 7, 10, 'r'); d.l(9, 5, 9, 10, 'r'); d.p('y', 2, 3, 2, 6, 13, 4, 13, 8); d.p('o', 7, 14, 9, 14); }, SC);
add(G, A, 'cn-lanternfest', 'Tết Nguyên Tiêu (lễ hội đèn lồng)', 'Lantern Festival', 'Rằm tháng Giêng, người ta thả đèn lồng, đoán câu đố trên đèn và ăn bánh trôi tangyuan.',
  d => { d.bg('B'); for (const [x, y, c] of [[4, 5, 'r'], [11, 4, 'o'], [8, 10, 'p']]) { d.e(x, y, 3, 2.6, c); d.r(x - 1, y - 3, 2, 1, 'y'); d.l(x, y + 3, x, y + 5, 'y'); } d.p('y', 1, 1, 14, 1, 8, 2, 2, 13, 14, 12); d.p('w', 10, 14); }, SC);
add(G, A, 'cn-qingming', 'Thanh Minh (Qingming)', 'Qingming Festival', 'Ngày tảo mộ, dọn dẹp phần mộ tổ tiên và dâng cúng, đồng thời là dịp đi chơi xuân.',
  d => { d.bg('h'); d.r(0, 12, 16, 4, 'g'); d.r(4, 6, 8, 6, 'a'); d.r(4, 6, 8, 1, 'l'); d.r(7, 8, 2, 3, 'A'); d.l(2, 13, 6, 10, 'G'); d.p('y', 3, 12, 12, 13); d.p('p', 13, 11, 14, 12, 1, 11); d.l(12, 2, 12, 6, 'a'); d.p('w', 12, 1); }, SC);
add(G, A, 'cn-duanwu', 'Đoan Ngọ (Duanwu)', 'Dragon Boat Festival', 'Mồng 5 tháng 5 âm lịch, đua thuyền rồng và ăn bánh tông để tưởng nhớ nhà thơ Khuất Nguyên.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.e(8, 11, 7, 2, 'r'); d.r(1, 9, 14, 2, 'r'); d.e(2, 8, 2.4, 2.6, 'G'); d.p('y', 1, 7); d.p('k', 2, 7); d.l(5, 7, 5, 9, 'k'); d.l(8, 7, 8, 9, 'k'); d.l(11, 7, 11, 9, 'k'); d.l(5, 5, 2, 13, 'N'); d.l(8, 5, 5, 14, 'N'); d.p('w', 12, 14, 3, 15); }, SC);
add(G, A, 'cn-qixi', 'Thất Tịch (Qixi)', 'Qixi Festival', 'Đêm gặp nhau của Ngưu Lang và Chức Nữ theo truyền thuyết, thường được gọi là ngày lễ tình nhân của Trung Quốc.',
  d => { d.bg('B'); d.l(0, 10, 15, 6, 'c'); d.l(0, 11, 15, 7, 'C'); d.p('w', 1, 2, 14, 1, 5, 4, 10, 2); d.e(3, 6, 1.4, 1.4, 'y'); d.e(13, 11, 1.4, 1.4, 'y'); d.p('p', 8, 8, 7, 9, 9, 7); d.p('w', 4, 13, 12, 3); d.e(8, 3, 1, 1, 'u'); }, SC);
add(G, A, 'cn-midautumn', 'Tết Trung Thu (Zhongqiu)', 'Mid-Autumn Festival', 'Rằm tháng 8, ngắm trăng, ăn bánh trung thu và đoàn viên.',
  d => { d.bg('B'); d.e(8, 7, 5.6, 5.6, 'u'); d.e(8, 7, 5, 5, 'y'); d.p('Y', 6, 5, 10, 8, 7, 9, 9, 5); d.r(0, 14, 16, 2, 'k'); d.p('w', 1, 2, 14, 3, 2, 10, 14, 11); }, SC);
add(G, A, 'cn-chongyang', 'Trùng Cửu (Chongyang)', 'Double Ninth Festival', 'Mồng 9 tháng 9 âm lịch, người ta leo núi, thưởng hoa cúc và tôn vinh người cao tuổi.',
  d => { d.bg('c'); d.tri(0, 3, 16, 10, 'G'); d.tri(5, 3, 6, 4, 'g'); d.r(0, 13, 16, 3, 'N'); for (const x of [2, 7, 12]) { d.e(x + 1, 11, 1.6, 1.6, 'y'); d.p('o', x + 1, 11); d.l(x + 1, 12, x + 1, 14, 'G'); } d.p('w', 12, 2); }, SC);
add(G, A, 'cn-torch', 'Lễ hội đuốc của người Di', 'Yi Torch Festival', 'Lễ hội của các dân tộc ở Tứ Xuyên và Vân Nam, đốt đuốc, đấu vật, múa hát suốt nhiều ngày.',
  d => { d.bg('B'); d.l(8, 15, 8, 7, 'N'); d.l(7, 15, 7, 8, 'n'); d.e(8, 5, 3, 3.6, 'r'); d.e(8, 5.5, 2, 2.4, 'o'); d.e(8, 6, 1, 1.4, 'y'); d.p('y', 3, 3, 13, 2, 4, 8, 12, 9, 2, 12); d.p('o', 5, 2, 11, 4); }, SC);
add(G, A, 'cn-naadam', 'Lễ hội Naadam (Mông Cổ)', 'Naadam Festival', 'Lễ hội của người Mông Cổ với ba môn truyền thống là đua ngựa, đấu vật và bắn cung.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'g'); d.e(7, 9, 4, 2.4, 'n'); d.r(4, 10, 1, 4, 'N'); d.r(9, 10, 1, 4, 'N'); d.e(11, 6, 1.6, 2, 'n'); d.l(11, 4, 13, 3, 'N'); d.p('r', 7, 5, 7, 6, 6, 6); d.r(6, 6, 3, 3, 'r'); d.l(1, 3, 3, 3, 'a'); d.p('w', 14, 1); }, SC);

// ----- Nhạc cụ -----
add(G, B, 'cn-erhu', 'Nhị hồ (Erhu)', 'Erhu', 'Đàn hai dây kéo bằng cung, tiếng buồn và da diết. Một trong những nhạc cụ tiêu biểu nhất của Trung Quốc.',
  d => { d.l(8, 0, 8, 12, 'N'); d.l(9, 0, 9, 12, 'n'); d.r(5, 11, 6, 5, 'N'); d.r(6, 12, 4, 3, 'e'); d.l(7, 2, 7, 11, 'w'); d.l(10, 2, 10, 11, 'w'); d.l(2, 4, 14, 12, 'n'); d.p('r', 8, 1); }, H);
add(G, B, 'cn-pipa', 'Tỳ bà (Pipa)', 'Pipa', 'Đàn dây gảy hình quả lê, có lịch sử hơn hai nghìn năm. Tiếng đàn có thể dịu dàng hoặc dồn dập như tiếng ngựa phi.',
  d => { d.l(8, 0, 8, 7, 'N'); d.l(9, 0, 9, 7, 'n'); d.e(8.5, 11, 4.4, 4.4, 'n'); d.e(8.5, 11, 3.4, 3.4, 'N'); d.l(8, 3, 8, 13, 'w'); d.l(9, 3, 9, 13, 'w'); d.p('y', 6, 6, 11, 6, 8, 9); d.p('r', 7, 0, 10, 0); }, H);
add(G, B, 'cn-guzheng', 'Cổ tranh (Guzheng)', 'Guzheng', 'Đàn dài với nhiều dây, đặt ngang khi chơi, âm thanh trong và êm như nước chảy.',
  d => { d.r(0, 6, 16, 5, 'N'); d.r(0, 6, 16, 1, 'n'); for (let x = 2; x < 15; x += 2) { d.r(x, 7, 1, 3, 'w'); d.p('y', x, 8); } d.r(0, 11, 2, 3, 'N'); d.r(14, 11, 2, 3, 'N'); d.p('r', 1, 7, 14, 7); }, H);
add(G, B, 'cn-guqin', 'Cổ cầm (Guqin)', 'Guqin', 'Đàn bảy dây của giới sĩ phu, thường gắn với sự tĩnh lặng và tu dưỡng.',
  d => { d.r(0, 7, 16, 4, 'k'); d.r(0, 7, 16, 1, 'K'); d.r(0, 10, 16, 1, 'K'); for (let i = 0; i < 7; i++) d.p('w', 1 + i * 2, 8, 1 + i * 2, 9); d.p('y', 3, 7, 7, 7, 11, 7, 13, 7); d.r(1, 11, 2, 2, 'k'); d.r(13, 11, 2, 2, 'k'); d.p('r', 14, 8); }, H);
add(G, B, 'cn-dizi', 'Sáo trúc (Dizi)', 'Dizi bamboo flute', 'Sáo ngang bằng trúc, có thêm lỗ dán màng mỏng nên tiếng sáng và vang.',
  d => { d.l(0, 12, 15, 4, 'G'); d.l(0, 13, 15, 5, 'g'); for (const x of [6, 8, 10, 12]) d.p('k', x, 12 - Math.round(x * 0.5) + 2); d.p('r', 1, 12, 14, 4); d.p('y', 4, 11); d.p('w', 3, 8, 7, 5, 12, 2); }, H);
add(G, B, 'cn-sheng', 'Sênh (Sheng)', 'Sheng', 'Nhạc cụ hơi gồm nhiều ống trúc gắn trong một bầu, thuộc loại nhạc cụ lâu đời nhất ở châu Á.',
  d => { d.e(8, 13, 4, 2.4, 'N'); d.r(4, 12, 8, 2, 'N'); for (let i = 0; i < 7; i++) d.r(4 + i, 1 + Math.abs(3 - i) * 1, 1, 10 - Math.abs(3 - i), i % 2 ? 'g' : 'G'); d.l(12, 13, 15, 12, 'n'); d.p('y', 6, 12, 10, 12); }, H);
add(G, B, 'cn-bianzhong', 'Chuông đồng cổ (Bianzhong)', 'Bianzhong bells', 'Bộ chuông đồng nhiều chiếc treo thành giàn, nổi tiếng nhất là bộ chuông trong mộ Tăng Hầu Ất, có tuổi khoảng 2.400 năm.',
  d => { d.r(1, 1, 14, 2, 'N'); d.r(1, 1, 14, 1, 'n'); d.r(1, 3, 1, 12, 'N'); d.r(14, 3, 1, 12, 'N'); for (const [x, y, w] of [[3, 4, 2], [6, 4, 3], [10, 4, 3], [4, 9, 3], [9, 9, 3]]) { d.r(x, y, w, 4, 'Y'); d.r(x, y, w, 1, 'y'); d.r(x - 1, y + 4, w + 2, 1, 'O'); d.p('N', x + 1, y - 1); } }, SC);
add(G, B, 'cn-drumgong', 'Trống và chiêng', 'Drum and gong', 'Nhạc cụ không thể thiếu trong múa lân, kinh kịch và lễ hội, dùng để tạo nhịp và không khí.',
  d => { d.e(4, 9, 3.6, 4.6, 'r'); d.e(4, 9, 2.4, 3.6, 'e'); d.e(12, 8, 3.8, 3.8, 'y'); d.e(12, 8, 2.6, 2.6, 'Y'); d.e(12, 8, 1, 1, 'y'); d.p('y', 1, 6, 1, 12, 7, 6, 7, 12); d.l(11, 12, 11, 15, 'N'); d.l(14, 3, 15, 1, 'N'); }, SC);

// ----- Nghệ thuật biểu diễn -----
add(G, C, 'cn-jingju', 'Kinh kịch (Jingju)', 'Peking opera (Jingju)', 'Kết hợp hát, đối thoại, múa và võ thuật, nổi tiếng với trang phục rực rỡ và mặt nạ vẽ. Mỗi màu sắc trên mặt nhân vật mang một ý nghĩa, ví dụ đỏ là trung thành, trắng là xảo quyệt.',
  d => { d.e(8, 9, 6, 6.4, 'w'); d.r(3, 3, 10, 2, 'r'); d.e(5.5, 8, 2, 2.4, 'k'); d.e(10.5, 8, 2, 2.4, 'k'); d.p('w', 5, 8, 11, 8); d.l(8, 4, 8, 11, 'r'); d.r(6, 12, 4, 1, 'r'); d.p('y', 3, 3, 12, 3, 8, 1); d.p('r', 2, 8, 13, 8); }, { use: 'wear' });
add(G, C, 'cn-kunqu', 'Côn khúc (Kunqu)', 'Kunqu opera', 'Loại hí khúc từ vùng Côn Sơn (Giang Tô), nhẹ nhàng và tinh tế, được coi là "mẹ của các loại kịch" ở Trung Quốc.',
  d => { d.bg('v'); d.e(8, 5, 2.8, 2.8, 's'); d.r(5, 3, 6, 2, 'k'); d.p('r', 8, 6); d.fan(8, 13, 6, 'p'); d.r(3, 8, 10, 6, 'p'); d.r(0, 9, 3, 2, 'w'); d.r(13, 9, 3, 2, 'w'); d.p('y', 6, 2, 10, 2, 8, 1); }, SC);
add(G, C, 'cn-bianlian', 'Biến mặt Tứ Xuyên (Bianlian)', 'Sichuan face-changing (bianlian)', 'Nghệ sĩ đổi mặt nạ chỉ trong chớp mắt trên sân khấu, bí quyết được giữ rất kín.',
  d => { d.e(8, 8, 6, 6.6, 'b'); d.e(5, 7, 1.8, 1.4, 'k'); d.e(11, 7, 1.8, 1.4, 'k'); d.p('w', 5, 7, 11, 7); d.r(5, 11, 6, 2, 'y'); d.r(6, 10, 4, 1, 'r'); d.p('y', 8, 3, 7, 4, 9, 4); d.p('r', 2, 3, 13, 3); }, { use: 'wear' });
add(G, C, 'cn-shadow', 'Kịch bóng (Piyingxi)', 'Shadow puppetry', 'Những hình người, thú cắt từ da được điều khiển sau màn sáng, kể chuyện bằng tiếng hát và nhạc đệm.',
  d => { d.bg('y'); d.r(0, 0, 16, 16, 'u'); d.r(0, 0, 16, 1, 'N'); d.r(0, 15, 16, 1, 'N'); d.e(8, 5, 1.8, 1.8, 'R'); d.r(6, 7, 4, 5, 'R'); d.l(6, 8, 3, 6, 'R'); d.l(10, 8, 13, 10, 'R'); d.l(7, 12, 6, 14, 'R'); d.l(9, 12, 10, 14, 'R'); d.l(3, 6, 3, 14, 'N'); d.l(13, 10, 13, 14, 'N'); d.p('u', 8, 5, 8, 9); }, SC);
add(G, C, 'cn-xiangsheng', 'Tướng thanh (Xiangsheng)', 'Xiangsheng comic dialogue', 'Nghệ thuật nói đối đáp hài hước của hai người, nhiều trò chơi chữ nên rất khó dịch.',
  d => { d.bg('u'); d.e(4.5, 5, 2.4, 2.6, 's'); d.e(11.5, 5, 2.4, 2.6, 's'); d.r(2, 8, 5, 6, 'b'); d.r(9, 8, 5, 6, 'r'); d.r(2, 2, 5, 2, 'k'); d.r(9, 2, 5, 2, 'k'); d.p('k', 4, 5, 6, 5, 10, 5, 12, 5); d.p('r', 5, 6, 11, 6); d.p('w', 7, 0, 8, 1, 9, 0); }, SC);
add(G, C, 'cn-acrobat', 'Xiếc Trung Quốc (Zaji)', 'Chinese acrobatics', 'Các tiết mục nhào lộn, giữ thăng bằng, xoay đĩa có lịch sử hàng nghìn năm.',
  d => { d.bg('v'); for (const [x, y, c] of [[3, 2, 'y'], [8, 1, 'p'], [13, 2, 'c']]) { d.e(x, y, 2, 0.9, c); d.l(x, y + 1, x, 9, 'w'); } d.e(8, 11, 1.6, 1.6, 's'); d.r(7, 12, 2, 3, 'r'); d.l(7, 13, 4, 12, 'r'); d.l(9, 13, 12, 12, 'r'); d.p('k', 8, 15); }, SC);
add(G, C, 'cn-lion', 'Múa lân và múa rồng', 'Lion and dragon dance', 'Hai nghệ thuật dân gian bắt buộc phải có trong dịp Tết và khai trương, mang ý nghĩa xua đuổi tà ma và cầu may.',
  d => { d.bg('r'); d.e(8, 8, 6, 5.4, 'y'); d.e(8, 8, 5, 4.4, 'o'); d.e(5.5, 6.5, 1.8, 1.8, 'w'); d.e(10.5, 6.5, 1.8, 1.8, 'w'); d.p('k', 5, 7, 11, 7); d.r(6, 10, 4, 2, 'R'); d.p('w', 6, 11, 9, 11); d.p('y', 2, 3, 13, 3, 8, 2); d.l(8, 2, 8, 5, 'r'); }, { use: 'wear' });
add(G, C, 'cn-wushu', 'Võ thuật (Wushu) và Thái cực quyền', 'Wushu and Tai Chi', 'Từ võ Thiếu Lâm đến Thái cực quyền. Thái cực quyền được UNESCO ghi nhận là di sản văn hóa phi vật thể năm 2020.',
  d => { d.bg('l'); d.e(8, 3, 1.8, 1.8, 's'); d.r(6, 5, 4, 5, 'w'); d.l(6, 6, 2, 8, 'w'); d.l(10, 6, 14, 4, 'w'); d.l(7, 10, 5, 14, 'a'); d.l(9, 10, 12, 13, 'a'); d.r(6, 8, 4, 1, 'k'); d.p('k', 8, 2, 4, 14, 12, 14); d.r(0, 14, 16, 2, 'a'); }, SC);

// ----- Nghệ thuật truyền thống -----
add(G, E, 'cn-calligraphy', 'Thư pháp (Shufa)', 'Calligraphy (shufa)', 'Nghệ thuật viết chữ bằng bút lông, được xem là cao hơn cả hội họa vì "nét chữ thấy được người".',
  d => { d.r(1, 1, 10, 14, 'e'); d.r(1, 1, 10, 1, 'W'); d.l(3, 4, 9, 4, 'k'); d.l(6, 3, 6, 12, 'k'); d.l(3, 8, 9, 9, 'k'); d.l(3, 12, 8, 11, 'k'); d.r(11, 3, 1, 8, 'N'); d.l(14, 2, 12, 8, 'N'); d.p('k', 12, 9, 12, 10, 13, 9); d.p('r', 9, 13, 9, 14); }, H);
add(G, E, 'cn-inkpaint', 'Tranh thủy mặc', 'Ink wash painting', 'Vẽ bằng mực đen pha nước, thường là núi, mây và thông, tạo cảm giác hư hư thực thực.',
  d => { d.bg('e'); d.tri(0, 5, 9, 9, 'A'); d.tri(6, 3, 10, 11, 'a'); d.tri(7, 3, 4, 3, 'k'); d.r(0, 10, 16, 2, 'w'); d.p('k', 2, 4, 3, 3, 13, 3, 12, 2); d.l(14, 8, 14, 14, 'd'); d.p('d', 13, 8, 15, 9); d.r(0, 14, 16, 2, 'W'); d.p('r', 14, 1); }, SC);
add(G, E, 'cn-papercut', 'Cắt giấy (Jianzhi)', 'Paper cutting (jianzhi)', 'Những hình hoa, chữ Hỷ hay con giáp cắt từ giấy đỏ, dán lên cửa sổ trong dịp Tết.',
  d => { d.r(1, 1, 14, 14, 'r'); d.r(2, 2, 12, 12, 'R'); d.e(8, 8, 4.4, 4.4, 'r'); for (const [x, y] of [[8, 5], [11, 8], [8, 11], [5, 8]]) d.e(x, y, 1.6, 1.6, 'R'); d.e(8, 8, 1.4, 1.4, 'R'); d.p('r', 3, 3, 12, 3, 3, 12, 12, 12); }, SC);
add(G, E, 'cn-nianhua', 'Tranh Tết (Nianhua)', 'New Year prints (nianhua)', 'Tranh khắc gỗ in màu như Môn thần hay em bé ôm cá, dán lên cửa để cầu may.',
  d => { d.r(1, 1, 14, 14, 'u'); d.r(1, 1, 14, 1, 'R'); d.r(1, 14, 14, 1, 'R'); d.e(8, 6, 3, 3, 's'); d.r(5, 9, 6, 5, 'r'); d.e(8, 12, 3.4, 2, 'o'); d.p('k', 7, 6, 9, 6); d.p('r', 8, 7); d.p('g', 5, 3, 10, 3); d.p('y', 6, 11, 10, 11); }, SC);
add(G, E, 'cn-suxiu', 'Thêu Tô Châu (Suxiu)', 'Suzhou embroidery', 'Tranh thêu bằng chỉ tơ mảnh đến mức một bức có thể giống như tranh vẽ.',
  d => { d.r(1, 1, 14, 14, 'N'); d.r(2, 2, 12, 12, 'e'); d.e(8, 8, 4, 4, 'p'); d.e(8, 8, 2.4, 2.4, 'x'); d.p('y', 8, 8); d.l(8, 12, 8, 14, 'G'); d.p('g', 5, 11, 11, 11); d.p('c', 4, 4, 12, 4); d.l(12, 11, 15, 15, 'y'); d.p('a', 15, 15); }, SC);
add(G, E, 'cn-jadecarve', 'Khắc ngọc', 'Jade carving', 'Nghề chạm khắc ngọc có lịch sử hơn bảy nghìn năm, từ ngọc bội đến tượng linh vật.',
  d => { d.e(8, 10, 6, 4.6, 'G'); d.e(8, 9.5, 5, 3.8, 'g'); d.e(8, 6, 3, 3.2, 'g'); d.e(8, 6, 2, 2.2, 'h'); d.p('G', 6, 4, 10, 4, 7, 7, 9, 7); d.p('h', 5, 9, 10, 8, 7, 12); d.r(3, 14, 10, 1, 'G'); }, H);

// ----- Văn hóa hiện đại -----
add(G, F, 'cn-wuxia', 'Võ hiệp và phim cổ trang', 'Wuxia and costume dramas', 'Những bộ truyện và phim về giang hồ, kiếm khách, từ Kim Dung đến các phim truyền hình thịnh hành hiện nay, có sức hút lớn trong cộng đồng người Hoa và cả khán giả Việt Nam.',
  d => { d.bg('A'); d.l(2, 14, 13, 3, 'l'); d.l(3, 14, 14, 3, 'w'); d.l(1, 13, 4, 15, 'N'); d.p('y', 3, 13, 4, 12); d.p('k', 14, 2, 15, 3); d.e(4, 4, 1.6, 1.6, 'w'); d.p('w', 12, 11, 1, 8); d.r(0, 0, 16, 1, 'K'); }, SC);
add(G, F, 'cn-hkcinema', 'Điện ảnh Hồng Kông', 'Hong Kong cinema', 'Nổi tiếng với phim hành động và các ngôi sao như Thành Long, Lý Liên Kiệt, Châu Tinh Trì.',
  d => { d.bg('k'); d.r(2, 4, 12, 9, 'd'); d.r(2, 4, 12, 1, 'w'); d.r(2, 12, 12, 1, 'w'); for (let x = 3; x < 13; x += 3) { d.p('w', x, 2); d.p('w', x, 14); } d.p('y', 7, 7, 8, 8, 7, 9, 9, 8); d.r(6, 6, 4, 4, 'u'); d.p('d', 8, 8); }, SC);
add(G, F, 'cn-wukong', 'Black Myth: Wukong (2024)', 'Black Myth: Wukong (2024)', 'Trò chơi điện tử hành động lấy cảm hứng từ Tây Du Ký, một dấu mốc cho game sản xuất tại Trung Quốc.',
  d => { d.bg('B'); d.e(8, 9, 4, 4.4, 'O'); d.e(8, 9, 3.2, 3.4, 's'); d.p('k', 7, 8, 9, 8); d.p('r', 8, 10); d.r(5, 2, 6, 2, 'y'); d.l(4, 0, 3, 3, 'y'); d.l(12, 0, 13, 3, 'y'); d.l(1, 14, 3, 5, 'N'); d.p('r', 3, 5); }, SC);
add(G, F, 'cn-wechat', 'WeChat và thanh toán QR', 'WeChat and QR payments', 'Ứng dụng nhắn tin kiêm ví điện tử, giúp nhiều người gần như không cần tiền mặt trong đời sống hằng ngày.',
  d => { d.bg('g'); d.r(3, 1, 10, 14, 'w'); d.r(4, 3, 8, 8, 'k'); for (const [x, y] of [[4, 3], [4, 3], [9, 3], [4, 8]]) { d.r(x, y, 3, 3, 'w'); d.r(x + 1, y + 1, 1, 1, 'k'); } d.p('w', 8, 7, 10, 8, 7, 9, 9, 10, 11, 9); d.p('g', 8, 13); }, H);
add(G, F, 'cn-douyin', 'Douyin', 'Douyin', 'Phiên bản TikTok dành cho thị trường Trung Quốc đại lục, nơi video ngắn và livestream bán hàng bùng nổ.',
  d => { d.bg('k'); d.r(3, 1, 10, 14, 'd'); d.l(9, 3, 9, 9, 'c'); d.e(7, 10, 2, 1.8, 'c'); d.l(10, 3, 12, 5, 'c'); d.l(8, 3, 8, 9, 'r'); d.e(6, 10, 2, 1.8, 'r'); d.l(9, 3, 11, 5, 'r'); d.l(9, 3, 9, 9, 'w'); d.e(7, 10, 2, 1.8, 'w'); }, H);
add(G, F, 'cn-singles', 'Ngày Độc thân 11/11', 'Singles\' Day (11/11)', 'Ngày hội mua sắm trực tuyến lớn nhất năm, bắt đầu từ các sinh viên đùa với ngày "1111" như bốn người độc thân.',
  d => { d.bg('r'); d.r(1, 3, 2, 10, 'y'); d.r(4, 3, 2, 10, 'y'); d.r(9, 3, 2, 10, 'y'); d.r(12, 3, 2, 10, 'y'); d.p('R', 1, 3, 4, 3, 9, 3, 12, 3); d.p('w', 7, 1, 8, 15, 7, 14); d.r(6, 7, 4, 4, 'o'); d.r(7, 6, 2, 1, 'N'); }, SC);
add(G, F, 'cn-hsr', 'Tàu cao tốc', 'High-speed rail', 'Mạng lưới đường sắt tốc độ cao dài nhất thế giới, trở thành biểu tượng của Trung Quốc hiện đại và là cách đi lại chính trong dịp Tết.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(0, 13, 16, 1, 'l'); d.r(1, 6, 14, 6, 'w'); d.tri(11, 6, 5, 6, 'w'); d.r(1, 9, 14, 1, 'b'); d.r(3, 7, 2, 2, 'C'); d.r(7, 7, 2, 2, 'C'); d.r(11, 7, 2, 2, 'C'); d.r(1, 11, 14, 1, 'a'); d.p('r', 1, 10, 15, 10); d.p('A', 3, 14, 9, 14); }, SC);
add(G, F, 'cn-guochao', 'Quốc triều (guochao)', 'Guochao trend', 'Làn sóng giới trẻ dùng lại họa tiết truyền thống trong thời trang, mỹ phẩm và đồ ăn.',
  d => { d.bg('r'); d.e(8, 8, 6, 6, 'y'); d.e(8, 8, 4.6, 4.6, 'r'); d.e(8, 8, 3, 3, 'y'); d.e(8, 8, 1.4, 1.4, 'r'); for (const [x, y] of [[8, 2], [8, 14], [2, 8], [14, 8]]) d.p('y', x, y); d.p('o', 4, 4, 12, 4, 4, 12, 12, 12); }, SC);
