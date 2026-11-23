import { add, SC, setCC } from './pass-kit.js';
import { SLOT_OF, O } from './pass-lame.js';
setCC('eg');
// Ai Cập · Nhóm 4: Văn hóa và nghệ thuật
const G = 4, A = 'Lễ hội', B = 'Nhạc cụ', C = 'Nghệ thuật biểu diễn', E = 'Hội họa và kiến trúc', F = 'Văn hóa hiện đại';
const H = { use: 'hold' };
SLOT_OF['eg-tutmask'] = 'head';
O['eg-tutmask'] = { y0: -2, pal: { y: '#ffd84d', b: '#2a4a8a', Y: '#c9a227' }, rows: ['....yyyyyyyy....', '...ybyybbyyby...', '..ybybyyyybyby..', '..ybybyyyybyby..', '..ybyb......byb.', '..yby........yb.', '..yb..........b.'] };
const person = (d, bg, hair, body) => { d.bg(bg); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 2, hair); d.r(4, 9, 8, 7, body); d.p('k', 7, 6, 9, 6); d.p('r', 8, 8); };

// ----- Lễ hội -----
add(G, A, 'eg-ramadan', 'Ramadan', 'Ramadan', 'Tháng nhịn ăn ban ngày của người Hồi giáo, ban đêm phố xá đông vui, đèn lồng treo khắp nơi và các bàn ăn tập thể mở ngoài đường.',
  d => { d.bg('B'); d.e(8, 5, 4, 4, 'y'); d.e(10, 5, 3.4, 3.4, 'B'); d.p('y', 13, 8, 3, 3, 14, 2); d.l(3, 9, 3, 10, 'a'); d.r(2, 10, 3, 4, 'r'); d.l(8, 9, 8, 10, 'a'); d.r(7, 10, 3, 4, 'g'); d.l(13, 9, 13, 10, 'a'); d.r(12, 10, 3, 4, 'y'); d.p('u', 3, 12, 8, 12, 13, 12); d.p('w', 6, 1); }, SC);
add(G, A, 'eg-eid', 'Eid al-Fitr và Eid al-Adha', 'Eid al-Fitr and Eid al-Adha', 'Hai ngày lễ lớn của Hồi giáo, cả gia đình mặc đồ mới, thăm hỏi, tặng tiền cho trẻ nhỏ.',
  d => { d.bg('G'); d.e(8, 5, 3, 3, 'y'); d.e(9, 5, 2.4, 2.4, 'G'); d.p('y', 11, 7, 4, 3, 13, 3, 2, 8); d.r(3, 9, 4, 6, 'w'); d.r(9, 9, 4, 6, 'o'); d.e(5, 8, 1.4, 1.4, 's'); d.e(11, 8, 1.4, 1.4, 's'); d.p('r', 5, 11, 11, 11); d.p('y', 8, 12); }, SC);
add(G, A, 'eg-shamelnessim', 'Sham el-Nessim', 'Sham el-Nessim', 'Ngày lễ mùa xuân có từ thời Ai Cập cổ, cả người Hồi giáo lẫn Kitô giáo cùng đi picnic bên sông và công viên.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'g'); d.r(0, 12, 16, 4, 'C'); d.r(3, 9, 8, 3, 'r'); d.r(3, 9, 8, 1, 'w'); d.p('w', 5, 10, 8, 10); for (const [x, c] of [[12, 'r'], [14, 'y'], [13, 'b']]) d.e(x, 9, 1, 1.4, c); d.e(13, 3, 1.6, 1.6, 'y'); d.p('p', 2, 7, 5, 6); }, SC);
add(G, A, 'eg-copticfeast', 'Giáng sinh và Phục sinh của người Copt', 'Coptic Christmas and Easter', 'Người Copt đón Giáng sinh vào ngày 7 tháng 1 theo lịch Chính thống giáo, sau một thời gian ăn chay dài.',
  d => { d.bg('A'); d.r(7, 2, 2, 12, 'y'); d.r(4, 5, 8, 2, 'y'); d.p('u', 8, 4); d.e(3, 12, 1.6, 1.6, 'w'); d.e(13, 12, 1.6, 1.6, 'w'); d.p('r', 2, 3, 13, 4); d.p('w', 1, 8, 14, 9); d.r(5, 14, 6, 1, 'Y'); }, SC);
add(G, A, 'eg-mawlid', 'Mawlid al-Nabi và các moulid', 'Mawlid al-Nabi and moulids', 'Ngày kỷ niệm sinh nhật nhà tiên tri Muhammad, cùng các hội làng ở đền thờ các vị thánh, có bánh kẹo, diễn xiếc và nhạc.',
  d => { d.bg('v'); d.tri(1, 5, 14, 3, 'g'); d.p('y', 2, 6, 5, 6, 8, 6, 11, 6, 14, 6); d.r(2, 8, 12, 6, 'r'); d.r(2, 8, 12, 1, 'y'); d.e(5, 11, 1.6, 1.8, 'p'); d.e(8, 11, 1.6, 1.8, 'y'); d.e(11, 11, 1.6, 1.8, 'g'); d.l(8, 5, 8, 2, 'a'); d.p('y', 8, 1); }, SC);
add(G, A, 'eg-opet', 'Lễ hội Opet ở Luxor', 'Opet Festival (Luxor)', 'Lễ rước ngày xưa của các thần từ Karnak đến Luxor, được dựng lại bằng nghi lễ hiện đại với nhiều đoàn diễu hành.',
  d => { d.bg('u'); d.r(0, 12, 16, 4, 'C'); d.r(1, 10, 14, 2, 'y'); d.r(1, 10, 14, 1, 'Y'); d.r(6, 5, 4, 5, 'e'); d.r(5, 4, 6, 1, 'y'); d.p('r', 7, 6, 8, 7); d.p('b', 2, 8, 13, 8); for (const x of [3, 5, 10, 12]) { d.e(x, 7, 0.9, 0.9, 's'); d.r(x, 8, 1, 2, 'w'); } d.p('w', 4, 14, 11, 14); }, SC);
add(G, A, 'eg-sunfestival', 'Hội Mặt Trời ở Abu Simbel', 'Sun Festival at Abu Simbel', 'Hai ngày mỗi năm, người ta kéo đến đền để chờ ánh bình minh chiếu vào tượng bên trong.',
  d => { d.bg('p'); d.r(0, 0, 16, 5, 'x'); d.e(8, 6, 3.4, 3.4, 'y'); d.e(8, 6, 2.4, 2.4, 'o'); for (let i = 0; i < 8; i++) { const a = i * 0.785; d.l(8, 6, Math.round(8 + Math.cos(a) * 7), Math.round(6 + Math.sin(a) * 6), 'u'); } d.e(8, 6, 2.4, 2.4, 'o'); d.r(0, 11, 16, 5, 'o'); d.r(4, 9, 8, 7, 't'); d.r(7, 11, 2, 5, 'k'); }, SC);
add(G, A, 'eg-ciff', 'Liên hoan phim quốc tế Cairo', 'Cairo International Film Festival', 'Sự kiện điện ảnh lớn của khu vực, tổ chức lần đầu từ thập niên 1970.',
  d => { d.bg('k'); d.r(2, 4, 12, 9, 'd'); d.r(2, 4, 12, 1, 'w'); d.r(2, 12, 12, 1, 'w'); for (let x = 3; x < 13; x += 3) { d.p('w', x, 2); d.p('w', x, 14); } d.r(5, 6, 6, 4, 'y'); d.e(8, 8, 1.6, 1.6, 'Y'); d.p('k', 8, 8); }, SC);
add(G, A, 'eg-wafaa', 'Lễ hội Nile (Wafaa El-Nil)', 'Nile Festival (Wafaa El-Nil)', 'Ngày hội truyền thống mừng sông Nile dâng nước, nay còn được tái hiện bằng các hoạt động văn hóa.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'C'); d.r(0, 9, 16, 1, 'b'); d.e(8, 12, 6, 2, 'n'); d.r(2, 11, 12, 1, 'N'); d.l(6, 11, 6, 5, 'N'); d.tri(6, 5, 5, 6, 'w'); d.p('y', 6, 4); d.p('c', 3, 14, 11, 15); d.p('g', 1, 8, 14, 8); }, SC);
add(G, A, 'eg-sufi', 'Lễ hội Sufi và nhạc thánh ca', 'Sufi festivals and chanting', 'Các đêm hát ngợi ca tổ chức quanh các đền thờ ở Cairo.',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'K'); d.e(8, 5, 2, 2, 's'); d.r(6, 3, 4, 2, 'r'); d.tri(3, 7, 10, 7, 'w'); d.l(2, 6, 4, 8, 's'); d.l(14, 6, 12, 8, 's'); d.p('y', 1, 2, 14, 3, 8, 1); d.p('l', 5, 9, 11, 10); }, SC);

// ----- Nhạc cụ -----
add(G, B, 'eg-oud', 'Oud', 'Oud', 'Đàn dây gảy có thân tròn bụng như quả lê, nhạc cụ trung tâm của âm nhạc Ả Rập.',
  d => { d.e(6, 11, 5, 4.6, 'n'); d.e(6, 11, 3.4, 3.2, 'N'); d.e(6, 11, 1.4, 1.4, 'k'); d.l(9, 8, 14, 3, 'N'); d.l(10, 8, 15, 3, 'n'); d.r(13, 0, 3, 3, 'k'); d.p('y', 14, 1); d.l(4, 9, 9, 6, 'w'); d.p('y', 4, 14, 8, 14); d.p('w', 6, 11); }, H);
add(G, B, 'eg-qanun', 'Qanun', 'Qanun', 'Đàn dây trên hộp phẳng, gảy bằng hai móc nhỏ gắn vào ngón tay, tiếng đàn lấp lánh.',
  d => { d.tri(1, 4, 14, 9, 'n'); d.r(1, 9, 14, 4, 'n'); d.r(2, 12, 12, 1, 'N'); for (let i = 0; i < 6; i++) d.l(3 + i * 2, 12, 3 + i, 5 + i % 2, 'w'); d.e(8, 9, 1.4, 1.4, 'y'); d.p('y', 12, 11); }, H);
add(G, B, 'eg-nay', 'Nay', 'Nay (reed flute)', 'Sáo trúc thổi dọc, âm thanh trầm ấm, thường dùng trong nhạc cổ điển và nhạc Sufi.',
  d => { d.l(6, 0, 10, 15, 'Y'); d.l(7, 0, 11, 15, 'y'); for (const [x, y] of [[7, 4], [8, 6], [9, 8], [9, 10], [10, 12]]) d.p('N', x, y); d.p('O', 6, 3, 8, 5, 9, 7, 10, 9, 10, 11); }, H);
add(G, B, 'eg-darbuka', 'Darbuka (tabla)', 'Darbuka', 'Trống cầm tay hình chén, nhịp trống làm nền cho gần như mọi bài nhạc dân gian và múa.',
  d => { d.r(3, 2, 10, 3, 'a'); d.r(3, 2, 10, 1, 'l'); d.tri(4, 5, 8, 6, 'y'); d.r(6, 10, 4, 4, 'Y'); d.r(5, 13, 6, 1, 'y'); d.p('O', 6, 6, 9, 8, 7, 11); d.p('w', 5, 3, 10, 3); }, H);
add(G, B, 'eg-riq', 'Riq', 'Riq', 'Trống lắc nhỏ như tambourine có chuông, tạo âm thanh leng keng.',
  d => { d.e(8, 8, 6.4, 6.4, 'n'); d.e(8, 8, 4.8, 4.8, 'e'); d.e(8, 8, 4, 4, 'u'); for (let i = 0; i < 8; i++) { const a = i * 0.785; d.p('y', 8 + Math.cos(a) * 5.4, 8 + Math.sin(a) * 5.4); } d.p('o', 6, 6, 10, 10); }, H);
add(G, B, 'eg-mizmar', 'Mizmar', 'Mizmar', 'Kèn đôi âm thanh to và chói, đi cùng trống lớn trong các lễ cưới và hội làng ở nông thôn.',
  d => { d.l(3, 14, 12, 3, 'Y'); d.l(4, 14, 13, 3, 'y'); d.l(5, 14, 14, 4, 'Y'); d.l(6, 14, 15, 4, 'y'); d.r(11, 1, 4, 3, 'o'); d.p('N', 5, 12, 7, 10, 9, 8, 11, 6); d.p('r', 3, 14); }, H);
add(G, B, 'eg-rababa', 'Rababa', 'Rababa', 'Đàn một hoặc hai dây kéo bằng vĩ, dùng để kể sử thi ở vùng Thượng Ai Cập.',
  d => { d.r(5, 9, 6, 6, 'N'); d.r(6, 10, 4, 4, 'e'); d.l(8, 9, 8, 1, 'n'); d.l(9, 9, 9, 1, 'N'); d.e(8, 1, 1.6, 1.4, 'n'); d.l(8, 3, 8, 10, 'w'); d.l(2, 6, 14, 12, 'o'); d.p('y', 8, 12); }, H);
add(G, B, 'eg-simsimiyya', 'Simsimiyya', 'Simsimiyya', 'Đàn dây nhiều dây của vùng ven kênh Suez, đi kèm điệu hát dân gian ở Port Said và Suez.',
  d => { d.e(8, 11, 5, 3.6, 'o'); d.r(3, 8, 10, 3, 'o'); d.r(3, 8, 10, 1, 'O'); d.p('k', 8, 11); d.r(7, 1, 2, 7, 'N'); for (let i = 0; i < 4; i++) d.l(5 + i * 2, 3 + i % 2, 5 + i * 2, 9, 'w'); d.p('y', 4, 12, 12, 12); }, H);
add(G, B, 'eg-sistrum', 'Sistrum', 'Sistrum', 'Nhạc cụ lắc cổ xưa gắn với nữ thần Hathor, thường thấy trên tranh khắc ở đền.',
  d => { d.r(7, 8, 2, 7, 'Y'); d.e(8, 5.5, 4.6, 5, 'y'); d.e(8, 5.5, 3.2, 3.8, '_'); d.e(8, 5.5, 4.6, 5, 'y'); d.e(8, 6, 3.2, 3.8, '_'); d.l(5, 4, 11, 4, 'Y'); d.l(5, 7, 11, 7, 'Y'); d.p('y', 6, 4, 10, 7); d.e(8, 14, 2, 1, 'Y'); }, H);
add(G, B, 'eg-arghul', 'Arghul', 'Arghul', 'Sáo đôi với một ống bè dài, âm thanh giống kèn túi, dùng trong dân ca.',
  d => { d.l(2, 1, 13, 4, 'Y'); d.l(2, 2, 13, 5, 'y'); d.l(2, 1, 6, 14, 'N'); d.l(3, 1, 7, 14, 'n'); d.p('k', 4, 4, 6, 7, 5, 10); d.p('r', 8, 5, 10, 5); d.r(1, 0, 4, 2, 'o'); }, H);

// ----- Nghệ thuật biểu diễn -----
add(G, C, 'eg-bellydance', 'Múa bụng (raqs sharqi)', 'Belly dance (raqs sharqi)', 'Điệu múa cổ điển Ả Rập phát triển mạnh ở Cairo, có nhiều biến thể trong phim và sân khấu.',
  d => { d.bg('v'); d.e(8, 3.5, 1.8, 1.8, 's'); d.r(5, 1, 6, 2, 'k'); d.r(6, 5, 4, 3, 'p'); d.r(4, 8, 8, 1, 'y'); d.tri(3, 9, 10, 6, 'p'); d.l(6, 6, 2, 3, 's'); d.l(10, 6, 14, 3, 's'); d.p('y', 3, 11, 12, 11, 5, 13, 10, 13, 2, 2, 13, 1); }, SC);
add(G, C, 'eg-tanoura', 'Múa Tanoura', 'Tanoura dance', 'Điệu múa xoay tròn của tín đồ Sufi, váy nhiều lớp quay thành một vòng tròn rực rỡ.',
  d => { d.bg('B'); d.e(8, 3, 1.8, 1.8, 's'); d.r(6, 1, 4, 1, 'r'); d.r(7, 4, 2, 3, 'w'); d.e(8, 11, 7, 3, 'y'); d.e(8, 10, 6.4, 2.4, 'r'); d.e(8, 9, 5, 1.8, 'g'); d.e(8, 8.6, 3.6, 1.2, 'w'); d.l(7, 5, 3, 4, 's'); d.l(9, 5, 13, 4, 's'); }, SC);
add(G, C, 'eg-tahtib', 'Tahtib', 'Tahtib stick fighting', 'Nghệ thuật đấu gậy truyền thống, vừa là võ vừa là điệu múa trong hội làng.',
  d => { d.bg('u'); d.r(0, 13, 16, 3, 'o'); d.e(4, 4, 1.6, 1.6, 's'); d.r(3, 6, 3, 6, 'w'); d.e(12, 4, 1.6, 1.6, 's'); d.r(10, 6, 3, 6, 'b'); d.l(6, 7, 11, 2, 'N'); d.l(10, 7, 5, 2, 'n'); d.p('k', 3, 4, 11, 4); d.p('r', 4, 12, 11, 12); }, SC);
add(G, C, 'eg-aragoz', 'Aragoz', 'Aragoz puppets', 'Múa rối găng tay kiểu Ai Cập, nhân vật hay châm biếm đời sống thường ngày; được UNESCO (Tổ chức Giáo dục, Khoa học và Văn hóa của Liên Hợp Quốc) ghi nhận là di sản văn hóa phi vật thể.',
  d => { d.bg('R'); d.r(1, 9, 14, 7, 'N'); d.r(1, 9, 14, 1, 'n'); d.e(5, 6, 2.2, 2.4, 's'); d.r(3, 3, 5, 2, 'r'); d.p('k', 4, 6, 6, 6); d.r(3, 8, 4, 2, 'r'); d.e(11, 6, 2.2, 2.4, 'o'); d.r(9, 3, 5, 2, 'g'); d.p('k', 10, 6, 12, 6); d.p('y', 4, 3, 11, 3, 8, 12); }, SC);
add(G, C, 'eg-opera', 'Nhà hát Opera Cairo', 'Cairo Opera House', 'Trung tâm biểu diễn lớn, kế thừa nhà hát Opera Khedivial nơi vở Aida của Verdi ra mắt năm 1871.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(1, 7, 14, 6, 'W'); d.r(1, 7, 14, 1, 'a'); d.e(8, 6, 5, 3, 'a'); d.e(8, 6, 4, 2.4, 'l'); d.p('y', 8, 2); d.l(8, 3, 8, 2, 'y'); d.p('k', 3, 9, 6, 9, 10, 9, 13, 9, 7, 11, 8, 11); d.r(6, 10, 4, 3, 'k'); }, SC);
add(G, C, 'eg-umm', 'Umm Kulthum', 'Umm Kulthum', 'Nữ danh ca lớn nhất thế giới Ả Rập, giọng hát trầm và dài hơi, được mệnh danh là "Ngôi sao phương Đông".',
  d => { d.bg('k'); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 3, 'N'); d.r(4, 5, 8, 1, 'k'); d.r(4, 9, 8, 7, 'p'); d.r(5, 7, 6, 1, 'k'); d.p('k', 6, 6, 9, 6); d.r(11, 10, 3, 4, 'w'); d.p('y', 8, 1, 4, 11); d.p('r', 8, 8); }, SC);
add(G, C, 'eg-shaabi', 'Shaabi', 'Shaabi music', 'Nhạc dân gian đô thị, lời ca gần đời sống bình dân.',
  d => { d.bg('o'); d.r(2, 8, 12, 6, 'r'); d.r(2, 8, 12, 1, 'y'); d.r(4, 3, 8, 5, 'k'); d.e(8, 6, 1.8, 1.8, 's'); d.p('y', 3, 10, 12, 10, 5, 12, 11, 12); d.p('w', 3, 2, 13, 3); d.p('n', 8, 5); }, SC);
add(G, C, 'eg-mahraganat', 'Mahraganat', 'Mahraganat', 'Dòng nhạc điện tử đường phố ra đời ở các khu nhà lao động Cairo vào cuối thập niên 2000, rất phổ biến giới trẻ.',
  d => { d.bg('V'); d.r(2, 6, 12, 8, 'k'); d.r(2, 6, 12, 1, 'a'); for (const [x, c] of [[4, 'p'], [7, 'c'], [10, 'y'], [12, 'g']]) d.r(x, 8, 2, 4, c); d.e(8, 3, 2, 2, 'p'); d.p('c', 1, 2, 14, 1, 3, 4); d.p('w', 5, 7, 11, 7); }, SC);
add(G, C, 'eg-zaffa', 'Nhạc cưới zaffa', 'Wedding zaffa', 'Đoàn nhạc và trống đi trước cô dâu chú rể trên phố, một nét quen thuộc của đám cưới.',
  d => { d.bg('y'); d.r(0, 13, 16, 3, 'u'); d.e(8, 4, 1.8, 1.8, 's'); d.tri(5, 6, 6, 8, 'w'); d.e(3, 5, 1.4, 1.4, 's'); d.r(2, 7, 3, 6, 'b'); d.e(13, 5, 1.4, 1.4, 's'); d.r(11, 7, 3, 6, 'r'); d.p('y', 1, 14, 14, 14, 8, 12); d.p('r', 8, 2); d.p('p', 6, 1, 10, 1); }, SC);

// ----- Hội họa và kiến trúc -----
add(G, E, 'eg-hieroglyph', 'Tranh tường và chữ tượng hình (hieroglyph)', 'Wall paintings and hieroglyphs', 'Hệ thống chữ viết bằng hình vẽ, kết hợp với tranh màu trong mộ và đền.',
  d => { d.bg('u'); d.r(1, 1, 14, 14, 'e'); d.r(1, 1, 14, 1, 'o'); d.e(4, 4, 1.6, 1.4, 'b'); d.p('k', 4, 4); d.p('r', 8, 3, 9, 3, 8, 5); d.l(11, 3, 11, 6, 'g'); d.e(4, 8, 1.4, 1.2, 'y'); d.p('b', 7, 8, 8, 8, 9, 8); d.p('k', 11, 8, 4, 12, 5, 12); d.e(10, 12, 1.4, 1, 'r'); d.r(1, 14, 14, 1, 'o'); }, SC);
add(G, E, 'eg-fayum', 'Chân dung xác ướp Fayum', 'Fayum mummy portraits', 'Những bức chân dung vẽ trên gỗ đặt lên xác ướp thời La Mã, khuôn mặt sống động đến lạ.',
  d => { d.bg('N'); d.r(3, 1, 10, 14, 'n'); d.e(8, 7, 3.4, 4.4, 's'); d.r(5, 2, 6, 3, 'k'); d.p('k', 4, 4, 11, 4, 6, 6, 10, 6); d.p('w', 6, 7, 10, 7); d.p('r', 8, 10); d.r(4, 12, 8, 3, 'e'); d.r(4, 12, 8, 1, 'y'); d.p('k', 7, 8); }, SC);
add(G, E, 'eg-templearch', 'Kim tự tháp và đền đá', 'Pyramids and stone temples', 'Kiến trúc mô phỏng vũ trụ, dùng cột lớn, tường nghiêng và mái phẳng.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.r(1, 6, 14, 7, 'e'); d.r(0, 5, 16, 1, 'W'); for (const x of [2, 5, 9, 12]) d.r(x, 6, 2, 7, 'W'); d.p('o', 3, 7, 6, 7, 10, 7, 13, 7); d.tri(5, 1, 6, 4, 't'); d.p('k', 7, 9, 8, 9); }, SC);
add(G, E, 'eg-tutmask', 'Tượng Tutankhamun và mặt nạ vàng', 'Tutankhamun and the golden mask', 'Tác phẩm kim hoàn nổi tiếng nhất của nghệ thuật cổ đại Ai Cập.',
  d => { d.bg('B'); d.e(8, 8, 4, 5.4, 'y'); d.r(3, 3, 10, 2, 'b'); d.r(3, 3, 2, 12, 'b'); d.r(11, 3, 2, 12, 'b'); d.r(3, 5, 1, 9, 'y'); d.r(12, 5, 1, 9, 'y'); d.e(8, 8, 3, 4, 'Y'); d.e(8, 8, 2.6, 3.6, 'y'); d.p('k', 6, 7, 10, 7); d.p('b', 6, 6, 7, 6, 9, 6, 10, 6); d.p('R', 8, 10); d.r(6, 11, 4, 1, 'b'); d.p('b', 8, 3); d.r(7, 14, 2, 2, 'b'); }, { use: 'wear' });
add(G, E, 'eg-hangingchurch', 'Nhà thờ Treo (Hanging Church)', 'The Hanging Church', 'Nhà thờ Copt ở Cairo Cổ, xây trên một pháo đài La Mã nên nền như treo lơ lửng.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.r(1, 9, 14, 4, 'a'); d.r(2, 10, 3, 3, 'k'); d.r(11, 10, 3, 3, 'k'); d.r(3, 4, 10, 5, 'e'); d.tri(2, 1, 5, 3, 'W'); d.tri(9, 1, 5, 3, 'W'); d.p('y', 4, 0, 11, 0); d.p('k', 6, 6, 9, 6, 7, 8); d.r(7, 6, 2, 2, 'r'); }, SC);
add(G, E, 'eg-alazhar', 'Đền thờ Hồi giáo Al-Azhar', 'Al-Azhar Mosque', 'Xây năm 970, về sau thành một trong những trung tâm học thuật Hồi giáo lâu đời nhất.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.r(3, 8, 10, 5, 'e'); d.e(8, 7, 3, 2.4, 'a'); d.r(1, 3, 2, 10, 'W'); d.r(13, 3, 2, 10, 'W'); d.p('y', 2, 2, 14, 2); d.r(1, 3, 2, 1, 'a'); d.r(13, 3, 2, 1, 'a'); d.p('A', 5, 10, 10, 10); d.r(7, 10, 2, 3, 'k'); }, SC);
add(G, E, 'eg-ibntulun', 'Đền thờ Ibn Tulun', 'Mosque of Ibn Tulun', 'Đền thờ cổ rộng từ thế kỷ chín, nổi tiếng với tháp xoắn ốc.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.r(1, 9, 14, 4, 't'); d.r(1, 9, 14, 1, 'o'); for (let i = 0; i < 4; i++) d.r(7 - i, 8 - i * 2 + 0, 2 + i * 2, 2, i % 2 ? 'o' : 't'); d.r(7, 2, 2, 2, 'y'); d.r(4, 10, 2, 2, 'k'); d.r(10, 10, 2, 2, 'k'); d.p('Y', 5, 12, 11, 12); }, SC);
add(G, E, 'eg-sultanhassan', 'Đền thờ Sultan Hassan', 'Sultan Hassan Mosque', 'Công trình Mamluk khổng lồ ở Cairo thế kỷ mười bốn, cổng cao và mái vòm đồ sộ.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(2, 4, 12, 10, 'e'); d.r(2, 4, 12, 1, 'W'); d.r(6, 6, 4, 8, 'a'); d.e(8, 6, 2, 2, 'A'); d.r(7, 9, 2, 5, 'k'); d.r(12, 1, 2, 5, 'W'); d.r(12, 1, 2, 1, 'a'); d.p('o', 3, 6, 5, 6, 11, 6, 3, 10, 12, 10); }, SC);
add(G, E, 'eg-calligraphy', 'Thư pháp Ả Rập', 'Arabic calligraphy', 'Nghệ thuật viết chữ trang trí trên tường, cửa và kinh sách.',
  d => { d.bg('e'); d.r(1, 1, 14, 14, 'u'); d.r(2, 2, 12, 12, 'e'); d.l(3, 9, 5, 12, 'k'); d.l(5, 12, 9, 12, 'k'); d.l(9, 12, 12, 8, 'k'); d.l(12, 8, 12, 4, 'k'); d.p('k', 4, 5, 6, 5, 8, 6, 10, 4); d.e(7, 9, 1, 1, 'k'); d.p('r', 3, 3, 12, 13); d.p('y', 5, 7); }, SC);
add(G, E, 'eg-mahmoudsaid', 'Mahmoud Said', 'Mahmoud Said', 'Họa sĩ hiện đại hàng đầu của Ai Cập, vẽ phụ nữ và cảnh sống bình dị bên sông Nile.',
  d => { d.bg('e'); d.r(2, 2, 12, 12, 'N'); d.r(3, 3, 10, 10, 'u'); d.e(8, 7, 2.4, 3, 's'); d.r(5, 3, 6, 2, 'k'); d.r(5, 10, 6, 3, 'r'); d.p('k', 7, 7, 9, 7); d.p('o', 4, 12, 12, 11); d.p('b', 3, 3, 12, 4); }, SC);

// ----- Văn hóa hiện đại -----
add(G, F, 'eg-cinema', 'Điện ảnh Ai Cập', 'Egyptian cinema', 'Ngành điện ảnh lớn nhất thế giới Ả Rập, Cairo từng được gọi là "Hollywood trên sông Nile" và phim Ai Cập được xem khắp khu vực.',
  d => { d.bg('k'); d.r(2, 4, 12, 9, 'd'); d.r(2, 4, 12, 1, 'w'); d.r(2, 12, 12, 1, 'w'); for (let x = 3; x < 13; x += 3) { d.p('w', x, 2); d.p('w', x, 14); } d.tri(5, 6, 6, 5, 'y'); d.p('d', 8, 8); d.p('r', 3, 7, 12, 7); }, SC);
add(G, F, 'eg-ramadantv', 'Phim truyền hình Ramadan', 'Ramadan TV dramas', 'Mỗi năm, cả nước theo dõi một loạt phim truyền hình chiếu vào tháng Ramadan.',
  d => { d.bg('B'); d.r(2, 4, 12, 8, 'k'); d.r(3, 5, 10, 6, 'c'); d.e(8, 8, 2, 2, 'y'); d.e(9, 8, 1.6, 1.6, 'c'); d.r(5, 12, 6, 1, 'a'); d.r(4, 13, 8, 1, 'a'); d.p('y', 13, 2, 2, 3); d.p('w', 3, 1); }, SC);
add(G, F, 'eg-mahfouz', 'Naguib Mahfouz', 'Naguib Mahfouz', 'Nhà văn Ai Cập duy nhất đạt giải Nobel Văn học (năm 1988), nổi tiếng với bộ truyện Cairo.',
  d => { person(d, 'u', 'w', 'n'); d.p('k', 6, 5, 7, 5, 9, 5, 10, 5); d.r(5, 5, 2, 1, 'a'); d.r(9, 5, 2, 1, 'a'); d.r(11, 10, 3, 4, 'e'); d.r(11, 10, 3, 1, 'k'); }, SC);
add(G, F, 'eg-dialect', 'Phương ngữ Ai Cập', 'Egyptian Arabic', 'Tiếng Ả Rập Ai Cập được hiểu rộng rãi nhờ phim và nhạc.',
  d => { d.bg('G'); d.e(5, 5, 4, 3, 'w'); d.p('w', 3, 8, 2, 9); d.e(11, 9, 4, 3, 'y'); d.p('y', 13, 12, 14, 13); d.p('k', 4, 5, 6, 5, 9, 9, 11, 9, 13, 9); d.l(3, 3, 7, 3, 'k'); d.p('G', 12, 8); }, SC);
add(G, F, 'eg-football', 'Bóng đá', 'Football', 'Hai đội Al Ahly và Zamalek có sự cạnh tranh nổi tiếng ở Cairo, Mohamed Salah là một ngôi sao quốc tế.',
  d => { d.bg('g'); d.r(0, 12, 16, 4, 'G'); d.e(8, 8, 5.6, 5.6, 'w'); d.e(8, 8, 1.8, 1.8, 'k'); for (const [x, y] of [[8, 3], [3, 7], [13, 7], [5, 13], [11, 13]]) d.p('k', x, y, x + 1, y); d.p('r', 1, 1, 2, 1); d.p('w', 4, 1, 5, 1); d.p('k', 7, 1, 8, 1); }, H);
add(G, F, 'eg-ahwacafe', 'Quán cà phê ahwa', 'Ahwa coffeehouse', 'Nơi đàn ông và ngày nay cả phụ nữ tụ họp chơi cờ, uống trà và bàn chuyện chính trị.',
  d => { d.bg('o'); d.r(0, 12, 16, 4, 'N'); d.e(4, 10, 2.6, 1.2, 'n'); d.l(4, 11, 4, 14, 'N'); d.e(12, 10, 2.6, 1.2, 'n'); d.l(12, 11, 12, 14, 'N'); d.r(5, 5, 6, 4, 'w'); d.p('k', 6, 6, 8, 7, 9, 6, 7, 8); d.p('y', 5, 4, 10, 4); d.r(3, 2, 10, 1, 'R'); }, SC);
add(G, F, 'eg-humor', 'Hài kịch và biếm họa', 'Comedy and cartoons', 'Người Ai Cập nổi tiếng hóm hỉnh, thích kể chuyện cười về đời sống thường ngày.',
  d => { d.bg('y'); d.e(8, 8, 6, 6, 'u'); d.e(8, 8, 5.2, 5.2, 'y'); d.p('k', 6, 6, 10, 6); d.l(4, 10, 6, 12, 'k'); d.l(6, 12, 10, 12, 'k'); d.l(10, 12, 12, 10, 'k'); d.p('r', 8, 13); d.p('w', 3, 3, 13, 3); }, SC);
add(G, F, 'eg-social', 'Truyền thông mạng xã hội', 'Social media', 'Giới trẻ Cairo rất sôi nổi trên mạng, từ video ngắn đến nhạc mahraganat.',
  d => { d.bg('v'); d.r(4, 1, 8, 14, 'k'); d.r(5, 3, 6, 9, 'c'); d.e(8, 6, 1.8, 1.8, 'w'); d.tri(7, 7, 3, 4, 'w'); d.p('p', 6, 12, 10, 12); d.p('y', 1, 3, 14, 4, 2, 12, 13, 11); d.p('r', 8, 13); }, H);
add(G, F, 'eg-gemnew', 'Bảo tàng Ai Cập Lớn', 'Grand Egyptian Museum (new cultural landmark)', 'Dự án văn hóa mới của đất nước, mở rộng cách trưng bày di sản cổ đại.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(1, 6, 14, 7, 'w'); d.tri(0, 3, 16, 3, 'l'); d.tri(4, 3, 8, 3, 'c'); d.r(2, 8, 12, 1, 'a'); for (let x = 3; x < 14; x += 2) d.r(x, 9, 1, 4, 'W'); d.r(6, 10, 4, 3, 'k'); d.p('y', 8, 2); }, SC);
