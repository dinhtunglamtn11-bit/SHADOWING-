import { add, SC, setCC } from './pass-kit.js';
setCC('gh');
// Ghana · Nhóm 4: Văn hóa và nghệ thuật
const G = 4, A = 'Lễ hội', B = 'Nhạc cụ', C = 'Nghệ thuật biểu diễn', D = 'Hội họa và kiến trúc', E = 'Văn hóa hiện đại';
const H = { use: 'hold' };

// ----- Lễ hội -----
add(G, A, 'gh-akwasidae', 'Akwasidae (lễ của người Ashanti)', 'Akwasidae (the Ashanti festival)', 'Lễ lớn ở Kumasi diễn ra khoảng sáu tuần một lần vào ngày Chủ nhật, khi vua Ashanti ngồi dưới ô lớn nhận lời chúc. Lễ có trống, vũ và đoàn rước của các trưởng làng.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'n'); d.fan(8, 6, 6, 'r'); d.fan(8, 6, 4.6, 'y'); d.fan(8, 6, 3, 'g'); d.r(8, 6, 1, 3, 'N'); d.e(8, 10, 1.6, 1.6, 's'); d.r(6, 11, 4, 4, 'y'); d.p('k', 7, 10, 9, 10); d.p('Y', 7, 12, 8, 13, 9, 12); d.p('r', 1, 14, 14, 14); }, SC);
add(G, A, 'gh-homowo', 'Homowo (lễ của người Ga)', 'Homowo (the Ga festival)', 'Lễ hội tháng Tám hoặc tháng Chín quanh Accra, kỷ niệm thời kỳ vượt qua nạn đói. Nhiều gia đình tụ họp ăn kpokpoi và thăm họ hàng.',
  d => { d.bg('C'); d.r(0, 11, 16, 5, 'u'); d.e(4, 8, 1.4, 1.4, 's'); d.r(3, 9, 3, 4, 'r'); d.e(8, 8, 1.4, 1.4, 's'); d.r(7, 9, 3, 4, 'y'); d.e(12, 8, 1.4, 1.4, 's'); d.r(11, 9, 3, 4, 'g'); d.p('w', 3, 5, 8, 4, 12, 5, 6, 3, 10, 3); d.p('o', 2, 14, 7, 15, 12, 14); d.p('y', 5, 1, 11, 1); }, SC);
add(G, A, 'gh-hogbetsotso', 'Hogbetsotso (lễ của người Ewe)', 'Hogbetsotso (the Ewe festival)', 'Lễ kỷ niệm cuộc ra đi của tổ tiên Ewe khỏi miền Notsie, diễn ra vào tháng Chín hoặc tháng Mười. Nhiều người Ewe mặc vải kente và nhảy múa trong ngày này.',
  d => { d.bg('u'); d.r(0, 12, 16, 4, 'n'); d.r(1, 5, 3, 7, 'k'); d.r(1, 5, 3, 1, 'y'); d.r(5, 4, 3, 8, 'r'); d.r(5, 4, 3, 1, 'y'); d.r(9, 5, 3, 7, 'g'); d.r(9, 5, 3, 1, 'y'); d.r(13, 4, 2, 8, 'b'); d.p('y', 2, 8, 6, 7, 10, 8, 14, 7); d.e(8, 2, 1.4, 1.4, 'o'); d.p('Y', 3, 14, 11, 14); }, SC);
add(G, A, 'gh-aboakyer', 'Aboakyer (lễ bắt linh dương ở Winneba)', 'Aboakyer (the antelope hunt of Winneba)', 'Lễ hội đầu tháng Năm của người Effutu, các đội thi nhau bắt một con linh dương sống để dâng thần. Cách thức tổ chức đã thay đổi theo thời gian.',
  d => { d.bg('g'); d.r(0, 12, 16, 4, 'G'); d.e(11, 9, 3.4, 2.4, 'n'); d.r(9, 11, 1, 3, 'N'); d.r(13, 11, 1, 3, 'N'); d.e(14, 6, 1.6, 1.6, 'n'); d.l(13, 4, 12, 1, 'N'); d.l(15, 4, 15, 1, 'N'); d.p('w', 14, 6); d.e(4, 7, 1.4, 1.4, 's'); d.r(3, 8, 3, 4, 'r'); d.l(6, 9, 9, 10, 'y'); d.p('y', 1, 2, 7, 3); }, SC);
add(G, A, 'gh-panafest', 'Panafest và Năm Trở về (Year of Return)', 'Panafest and the Year of Return', 'Lễ hội văn hóa mừng người gốc Phi ở hải ngoại trở về cội nguồn. Năm 2019 Ghana tổ chức "Năm Trở về" kỷ niệm 400 năm ngày những người châu Phi đầu tiên bị đưa tới Virginia.',
  d => { d.bg('r'); d.r(0, 5, 16, 6, 'y'); d.r(0, 11, 16, 5, 'g'); d.p('k', 8, 6, 7, 7, 9, 7, 6, 8, 10, 8, 8, 9); d.r(7, 7, 3, 2, 'k'); d.r(8, 6, 1, 4, 'k'); d.p('w', 2, 2, 13, 2, 8, 13); d.p('y', 3, 13, 12, 13); }, SC);

// ----- Nhạc cụ -----
add(G, B, 'gh-dondo', 'Trống nói (dondo)', 'The dondo talking drum', 'Trống dáng đồng hồ cát, kẹp dưới nách và đánh bằng que cong. Người chơi thay đổi âm bằng cách siết dây, gần giống lời nói của người.',
  d => { d.bg('e'); d.r(3, 2, 10, 2, 'W'); d.r(3, 12, 10, 2, 'W'); d.r(5, 4, 6, 8, 'n'); d.r(6, 5, 4, 6, 'N'); d.l(3, 3, 6, 12, 'r'); d.l(13, 3, 10, 12, 'r'); d.l(3, 12, 6, 4, 'y'); d.l(13, 12, 10, 4, 'y'); d.l(14, 1, 11, 6, 'n'); d.e(14, 1, 1.2, 1.2, 'N'); }, H);
add(G, B, 'gh-gyil', 'Xylophone gỗ (gyil)', 'The gyil wooden xylophone', 'Nhạc cụ gỗ có quả bí rỗng làm hộp cộng hưởng, của người Dagara ở miền bắc. Tiếng gyil văng vẳng trong lễ tang và lễ hội.',
  d => { d.bg('e'); for (let i = 0; i < 6; i++) { d.r(2 + i * 2, 3 + i, 2, 5, i % 2 ? 'n' : 'o'); } d.r(1, 8, 13, 1, 'N'); for (let i = 0; i < 6; i++) d.e(3 + i * 2, 12, 1.1, 2, 'y'); d.p('Y', 2, 12, 12, 13); d.l(13, 2, 15, 0, 'N'); }, H);
add(G, B, 'gh-kpanlogo', 'Trống kpanlogo', 'The kpanlogo drum', 'Trống của người Ga, gắn với điệu nhảy cùng tên xuất hiện sau độc lập. Nhịp điệu sôi động được nhiều người trẻ ưa thích.',
  d => { d.bg('e'); d.e(8, 4, 5, 2, 'w'); d.r(3, 4, 10, 8, 'n'); d.tri(4, 11, 8, 4, 'N'); d.e(8, 4, 4.4, 1.6, 'e'); d.r(3, 6, 10, 1, 'r'); d.r(3, 9, 10, 1, 'y'); d.p('k', 4, 5, 12, 5, 7, 8); d.p('o', 5, 13, 10, 13); }, H);
add(G, B, 'gh-fontomfrom', 'Trống fontomfrom và atumpan', 'Fontomfrom and atumpan drums', 'Bộ trống cung đình của người Ashanti, dùng trong nghi lễ của vua. Atumpan là cặp trống "nói" dùng để chào và truyền tin.',
  d => { d.bg('e'); d.r(1, 3, 5, 9, 'N'); d.r(2, 2, 3, 1, 'w'); d.r(10, 3, 5, 9, 'N'); d.r(11, 2, 3, 1, 'w'); d.r(1, 6, 5, 1, 'y'); d.r(10, 6, 5, 1, 'y'); d.p('r', 3, 8, 12, 8); d.r(7, 6, 2, 8, 'n'); d.p('y', 7, 5, 8, 5, 7, 12); d.p('k', 2, 13, 13, 13); }, H);
add(G, B, 'gh-gankogui', 'Gankogui và axatse', 'Gankogui and axatse', 'Gankogui là chuông sắt đôi của người Ewe giữ nhịp, còn axatse là quả bí khô bọc lưới hạt. Hai nhạc cụ thường chơi cùng trống để tạo nhịp phức.',
  d => { d.bg('e'); d.e(4, 6, 2.6, 3.4, 'a'); d.e(4, 6, 1.4, 2.4, 'A'); d.e(9, 7, 2.4, 3, 'a'); d.e(9, 7, 1.2, 2, 'A'); d.l(5, 3, 8, 4, 'a'); d.e(12, 11, 3, 3.4, 'y'); d.e(12, 11, 2, 2.4, 'Y'); for (const [x, y] of [[10, 9], [12, 10], [14, 11], [11, 13], [13, 13]]) d.put(x, y, 'w'); d.r(11, 6, 2, 3, 'n'); }, H);
add(G, B, 'gh-kologo', 'Đàn kologo miền bắc', 'The kologo of the north', 'Đàn dây của người Frafra và các nhóm phía bắc, đệm cho giọng hát kể chuyện. Tiếng đàn gắn với văn hóa hát rạo thức.',
  d => { d.bg('e'); d.e(6, 11, 4, 3.4, 'n'); d.e(6, 11, 2, 2, 'W'); d.l(8, 9, 13, 2, 'N'); d.l(9, 9, 14, 2, 'n'); d.r(12, 0, 3, 2, 'N'); d.l(6, 9, 12, 3, 'k'); d.p('y', 4, 12, 8, 13); d.p('r', 3, 10, 9, 14); }, H);

// ----- Nghệ thuật biểu diễn -----
add(G, C, 'gh-highlife', 'Highlife', 'Highlife', 'Thể loại nhạc nhịp nhàng xuất hiện ở Ghana đầu thế kỷ XX, pha giữa nhạc truyền thống và nhạc cụ phương Tây. E.T. Mensah được nhiều người gọi là "vua highlife".',
  d => { d.bg('B'); d.p('y', 2, 2, 13, 3, 8, 1, 5, 5, 11, 4); d.r(6, 4, 3, 5, 'y'); d.e(7, 3, 1.4, 1.4, 's'); d.r(5, 9, 5, 5, 'w'); d.l(9, 5, 13, 3, 'Y'); d.r(12, 2, 3, 2, 'Y'); d.p('k', 7, 3, 7, 10); d.r(0, 14, 16, 2, 'k'); d.p('r', 3, 12, 12, 12); }, SC);
add(G, C, 'gh-hiplife', 'Hiplife', 'Hiplife', 'Nhạc hip-hop pha highlife và tiếng Twi, xuất hiện từ thập niên 1990. Nghệ sĩ rap như Reggie Rockstone thường được nhắc tới như người mở đường.',
  d => { d.bg('v'); d.e(8, 6, 3, 3, 's'); d.r(4, 3, 8, 3, 'r'); d.r(3, 5, 10, 1, 'r'); d.p('k', 7, 6, 9, 6); d.r(5, 9, 6, 6, 'y'); d.p('k', 7, 10, 8, 11); d.r(12, 9, 2, 3, 'k'); d.p('y', 12, 9, 2, 2, 14, 3); d.p('w', 7, 8); }, SC);
add(G, C, 'gh-azonto', 'Azonto và afrobeats Ghana', 'Azonto and Ghanaian afrobeats', 'Điệu nhảy mô phỏng cử chỉ hàng ngày, lan rộng từ Accra vào khoảng năm 2011. Các bài nhạc nhảy có sức lan tỏa cả châu Phi.',
  d => { d.bg('p'); d.e(8, 4, 1.8, 1.8, 's'); d.r(7, 6, 3, 5, 'g'); d.l(7, 7, 3, 4, 'S'); d.l(10, 7, 13, 5, 'S'); d.l(8, 11, 5, 14, 'b'); d.l(9, 11, 11, 14, 'b'); d.p('k', 7, 4, 9, 4); d.p('y', 2, 2, 13, 2, 14, 10, 1, 9); d.p('w', 3, 6, 12, 8); }, SC);
add(G, C, 'gh-adowa', 'Kpanlogo và Adowa', 'Kpanlogo and Adowa', 'Kpanlogo là điệu nhảy vùng Ga, còn Adowa là điệu nhảy uốn lượn của người Ashanti dùng trong lễ tang và lễ hội. Mỗi cử động của tay và chân có ý nghĩa riêng.',
  d => { d.bg('u'); d.r(0, 13, 16, 3, 'n'); d.e(5, 4, 1.6, 1.6, 's'); d.r(4, 6, 3, 5, 'k'); d.l(4, 7, 2, 5, 'S'); d.l(7, 7, 9, 9, 'S'); d.r(4, 11, 1, 3, 'N'); d.r(6, 11, 1, 3, 'N'); d.e(11, 4, 1.6, 1.6, 's'); d.r(10, 6, 3, 5, 'r'); d.l(13, 7, 15, 4, 'S'); d.p('y', 10, 6, 12, 6, 11, 8); d.r(10, 11, 1, 3, 'N'); d.r(12, 11, 1, 3, 'N'); }, SC);
add(G, C, 'gh-ananse', 'Kể chuyện Ananse (Anansesem)', 'Ananse storytelling (Anansesem)', 'Những câu chuyện dân gian về con nhện Ananse thông minh, kể đêm bên ngọn lửa. Người kể thường mời người nghe hát đáp lại.',
  d => { d.bg('B'); d.p('y', 2, 2, 13, 3, 7, 1, 11, 6, 4, 5); d.e(8, 6, 2.4, 2.2, 'k'); d.e(8, 3, 1.6, 1.4, 'k'); d.l(6, 5, 2, 3, 'k'); d.l(6, 6, 1, 6, 'k'); d.l(6, 7, 2, 11, 'k'); d.l(10, 5, 14, 3, 'k'); d.l(10, 6, 15, 6, 'k'); d.l(10, 7, 14, 11, 'k'); d.p('r', 7, 3, 9, 3); d.tri(5, 11, 6, 4, 'o'); d.tri(6, 12, 4, 3, 'y'); }, SC);
add(G, C, 'gh-ghallywood', 'Điện ảnh Ghana (Ghallywood)', 'Ghanaian cinema (Ghallywood)', 'Phim tự sản xuất ngân sách thấp, kể chuyện gia đình, tình yêu và niềm tin. Phim được chiếu trên truyền hình và các nền tảng mạng.',
  d => { d.bg('k'); d.r(1, 3, 14, 9, 'd'); d.r(2, 4, 12, 7, 'a'); d.r(3, 5, 4, 5, 'r'); d.r(9, 5, 4, 5, 'g'); d.r(7, 5, 2, 5, 'y'); d.p('k', 8, 7); d.p('y', 8, 6); d.r(6, 13, 4, 1, 'a'); d.r(4, 14, 8, 1, 'A'); d.p('w', 2, 2, 13, 2); }, SC);

// ----- Hội họa và kiến trúc -----
add(G, D, 'gh-adinkra-sym', 'Biểu tượng Adinkra', 'Adinkra symbols', 'Hệ thống biểu tượng đơn giản của người Akan, mỗi biểu tượng là một châm ngôn. Gye Nyame ("trừ Thượng đế") là biểu tượng phổ biến nhất.',
  d => { d.bg('t'); d.e(8, 8, 6, 6, 'k'); d.e(8, 8, 4.6, 4.6, 't'); d.r(7, 4, 2, 8, 'k'); d.r(4, 7, 8, 2, 'k'); d.p('k', 5, 5, 10, 5, 5, 10, 10, 10, 6, 6, 9, 9, 6, 9, 9, 6); d.p('y', 8, 8); d.p('N', 3, 3, 12, 12); }, SC);
add(G, D, 'gh-goldweights', 'Quả cân vàng Ashanti', 'Ashanti gold weights', 'Những quả cân bằng đồng nhỏ hình con vật, vật dụng và biểu tượng dùng để cân vàng. Mỗi quả cân thường ẩn một tục ngữ.',
  d => { d.bg('e'); d.e(5, 10, 3.4, 3, 'Y'); d.e(5, 6, 1.6, 1.4, 'Y'); d.p('y', 4, 9, 6, 11); d.tri(9, 5, 5, 6, 'y'); d.r(9, 10, 5, 3, 'Y'); d.p('k', 11, 8); d.r(1, 14, 14, 1, 'N'); d.p('o', 3, 11, 12, 11); }, SC);
add(G, D, 'gh-woodcarving', 'Nghệ thuật khắc gỗ', 'Wood carving', 'Gồm ghế stool, mặt nạ và tượng nhỏ, nhất là ở Kumasi. Một số chiếc ghế được khắc phức tạp theo biểu tượng vua.',
  d => { d.bg('e'); d.e(8, 7, 3.4, 5, 'N'); d.e(8, 7, 2.4, 4, 'n'); d.p('k', 6, 5, 10, 5, 8, 8, 8, 9); d.r(7, 10, 2, 1, 'k'); d.p('y', 5, 3, 11, 3); d.r(3, 13, 10, 2, 'N'); d.r(5, 12, 6, 1, 'n'); d.p('Y', 4, 14, 11, 14); }, SC);
add(G, D, 'gh-coffin', 'Quan tài hình (fantasy coffin)', 'Fantasy coffins', 'Quan tài đóng theo hình nghề nghiệp hoặc sở thích của người quá cố, như máy bay, cá, chai bia. Nghệ thuật này nổi tiếng ở vùng Ga quanh Accra, và được Seth Kane Kwei đưa ra từ thập niên 1950.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'n'); d.e(7, 9, 6.4, 2.6, 'r'); d.tri(12, 6, 4, 6, 'r'); d.tri(1, 7, 3, 4, 'o'); d.p('w', 11, 8); d.p('k', 12, 8); d.p('y', 5, 8, 7, 8, 9, 8); d.p('R', 4, 11, 10, 11); d.p('w', 6, 3, 11, 2); }, SC);
add(G, D, 'gh-larabanga', 'Đền thờ Hồi giáo bằng đất ở Larabanga', 'The Larabanga mud mosque', 'Kiến trúc đất sét kiểu Sudan ở Larabanga, được cho là một trong những nhà thờ Hồi giáo cổ nhất ở Ghana. Nhà thờ được trát lại đất sét sau mỗi mùa mưa.',
  d => { d.bg('u'); d.r(0, 12, 16, 4, 't'); d.r(4, 5, 8, 7, 'W'); d.r(3, 4, 2, 8, 'e'); d.r(11, 4, 2, 8, 'e'); d.r(7, 3, 2, 3, 'e'); d.p('N', 3, 3, 12, 3, 8, 2); d.r(7, 8, 2, 4, 'N'); d.p('N', 5, 7, 10, 7, 5, 9, 10, 9); d.p('n', 4, 5, 11, 6); d.e(13, 2, 1.4, 1.4, 'o'); }, SC);
add(G, D, 'gh-blackstarsq', 'Quảng trường Độc lập và kiến trúc hiện đại Accra', 'Black Star Square and modern Accra architecture', 'Black Star Square và đài tưởng niệm Nkrumah là những công trình biểu tượng sau độc lập. Kiến trúc hiện đại ở Accra gắn với thời kỳ lập quốc.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(1, 5, 14, 8, 'w'); d.r(1, 4, 14, 1, 'W'); for (const x of [2, 5, 8, 11]) d.r(x, 6, 2, 7, 'W'); d.r(1, 5, 14, 1, 'r'); d.r(1, 13, 14, 1, 'g'); d.tri(7, 1, 2, 3, 'k'); d.p('k', 7, 3, 8, 2, 9, 3, 8, 4); d.p('y', 3, 11, 12, 11); }, SC);

// ----- Văn hóa hiện đại -----
add(G, E, 'gh-football', 'Bóng đá và Black Stars', 'Football and the Black Stars', 'Đội tuyển quốc gia là niềm tự hào của cả nước, đến World Cup nhiều lần và vào tứ kết năm 2010. Người hâm mộ đổ ra sân và các quán bar mỗi khi có trận.',
  d => { d.bg('e'); d.e(8, 8, 6.4, 6.4, 'w'); d.e(8, 8, 2, 2, 'k'); d.p('k', 8, 3, 8, 13, 3, 6, 13, 6, 4, 11, 12, 11); d.l(8, 6, 8, 3, 'k'); d.l(6, 8, 3, 6, 'k'); d.l(10, 8, 13, 6, 'k'); d.p('r', 2, 8, 14, 8); d.p('y', 5, 13, 11, 13); d.p('g', 4, 3, 12, 3); }, H);
add(G, E, 'gh-boxing', 'Quyền anh (boxing) ở Bukom', 'Boxing in Bukom', 'Khu Bukom ở Accra sinh ra nhiều võ sĩ nổi tiếng như Azumah Nelson. Nơi đây có nhiều phòng tập và sân đấu lộ thiên.',
  d => { d.bg('R'); d.r(2, 5, 6, 6, 'r'); d.r(1, 6, 2, 4, 'r'); d.r(3, 3, 4, 3, 'R'); d.r(2, 11, 6, 2, 'W'); d.r(9, 4, 5, 7, 'r'); d.r(13, 5, 2, 4, 'r'); d.p('k', 4, 7, 11, 6); d.p('w', 3, 6, 12, 5); d.r(8, 8, 1, 2, 'N'); d.p('y', 2, 14, 13, 14); d.r(0, 13, 16, 1, 'N'); }, SC);
add(G, E, 'gh-gospel', 'Nhạc gospel và nhà thờ sôi động', 'Gospel music and lively churches', 'Các buổi lễ nhà thờ có dàn nhạc, trống và hát tập thể. Nhiều ca sĩ gospel được yêu mến như ngôi sao.',
  d => { d.bg('v'); d.r(3, 8, 10, 6, 'W'); d.tri(2, 5, 12, 3, 'a'); d.r(7, 1, 2, 4, 'w'); d.r(5, 2, 6, 1, 'w'); d.r(7, 10, 2, 4, 'N'); d.p('y', 1, 3, 14, 5, 4, 1, 12, 1); d.p('w', 4, 9, 11, 9); d.p('p', 2, 11, 13, 10); }, SC);
add(G, E, 'gh-fashion', 'Thời trang và thiết kế Accra', 'Accra fashion and design', 'Các nhà thiết kế trẻ kết hợp vải kente và Ankara với đường cắt hiện đại. Tuần lễ thời trang Accra thu hút nhiều khách quốc tế.',
  d => { d.bg('p'); d.e(8, 3, 1.6, 1.6, 's'); d.r(7, 5, 2, 1, 's'); d.tri(4, 6, 8, 9, 'y'); d.r(6, 6, 4, 3, 'r'); d.p('g', 5, 11, 8, 10, 10, 12); d.p('k', 6, 8, 9, 8, 7, 13, 8, 14); d.p('b', 4, 13, 11, 14, 7, 11); d.p('w', 2, 2, 13, 4); }, SC);
add(G, E, 'gh-tech', 'Ngành công nghệ và thủ phủ khởi nghiệp Accra', 'Accra\'s tech and startup scene', 'Thành phố là trung tâm khởi nghiệp và dịch vụ tài chính ở Tây Phi. Điện thoại di động và ví điện tử gắn với đời sống hàng ngày.',
  d => { d.bg('B'); d.r(2, 3, 12, 8, 'k'); d.r(3, 4, 10, 6, 'c'); d.p('w', 4, 5, 6, 5, 4, 7, 5, 8); d.l(7, 9, 9, 6, 'g'); d.r(1, 12, 14, 2, 'a'); d.r(3, 14, 10, 1, 'A'); d.r(10, 4, 2, 2, 'y'); d.p('r', 11, 8); d.p('y', 5, 9, 10, 9, 13, 1); }, SC);
