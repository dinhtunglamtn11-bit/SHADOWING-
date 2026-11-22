import { add, SC, setCC } from './pass-kit.js';
setCC('us');
// Hoa Kỳ · Nhóm 4: Văn hóa và nghệ thuật
const G = 4, A = 'Lễ hội', B = 'Nhạc cụ', C = 'Nghệ thuật biểu diễn', E = 'Hội họa và kiến trúc', F = 'Văn hóa hiện đại';
const H = { use: 'hold' };
const person = (d, bg, hair, body) => { d.bg(bg); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 2, hair); d.r(4, 9, 8, 7, body); d.p('k', 7, 6, 9, 6); d.p('r', 8, 8); };
const burst = (d, x, y, c) => d.p(c, x, y, x - 1, y, x + 1, y, x, y - 1, x, y + 1);

// ----- Lễ hội -----
add(G, A, 'us-july4fest', 'Quốc khánh 4 tháng 7 (Independence Day)', 'Independence Day (4 July)', 'Kỷ niệm Tuyên ngôn Độc lập năm 1776, với diễu hành, BBQ và pháo hoa.',
  d => { d.bg('B'); burst(d, 4, 4, 'r'); burst(d, 11, 3, 'w'); burst(d, 8, 8, 'b'); d.p('y', 2, 9, 14, 8, 13, 11, 3, 12); d.r(0, 13, 16, 3, 'k'); d.r(6, 11, 4, 2, 'r'); d.r(6, 11, 4, 1, 'w'); d.p('c', 7, 12); }, SC);
add(G, A, 'us-thanksgiving', 'Lễ Tạ ơn (Thanksgiving)', 'Thanksgiving', 'Ngày gia đình sum họp và bữa tiệc lớn, kèm cuộc diễu hành Macy\'s ở New York.',
  d => { d.bg('o'); d.e(8, 9, 5, 4, 'N'); d.e(8, 5.5, 2.4, 2.4, 'r'); d.e(8, 5, 1.2, 1.2, 'y'); d.p('y', 8, 2, 6, 2, 10, 2); d.l(4, 7, 2, 4, 'o'); d.l(12, 7, 14, 4, 'y'); d.l(8, 14, 8, 15, 'N'); d.p('k', 7, 5, 9, 5); d.p('R', 8, 6); }, SC);
add(G, A, 'us-halloweenfest', 'Halloween', 'Halloween', 'Ngày 31 tháng mười, trẻ em hóa trang đi xin kẹo, nhà cửa trang trí bí ngô và bộ xương.',
  d => { d.bg('k'); d.e(8, 4, 3, 3, 'w'); d.p('k', 7, 3, 9, 3, 8, 5); d.r(5, 7, 6, 7, 'w'); d.l(5, 8, 2, 11, 'w'); d.l(11, 8, 14, 11, 'w'); d.p('k', 7, 9, 9, 9, 7, 11, 9, 11); d.e(13, 13, 2.2, 2, 'o'); d.p('k', 12, 13, 14, 13); d.p('y', 1, 2, 14, 3); }, SC);
add(G, A, 'us-christmas', 'Giáng sinh (Christmas)', 'Christmas', 'Ngày lễ lớn nhất năm, nhà nhà trang trí cây thông và đèn màu.',
  d => { d.bg('R'); d.tri(3, 2, 10, 5, 'G'); d.tri(2, 6, 12, 5, 'g'); d.tri(1, 9, 14, 4, 'G'); d.r(7, 13, 2, 2, 'N'); d.p('y', 8, 1); for (const [x, y, c] of [[6, 4, 'r'], [9, 6, 'y'], [5, 9, 'b'], [10, 10, 'r'], [8, 8, 'p'], [3, 11, 'y'], [12, 12, 'c']]) d.p(c, x, y); d.p('w', 1, 2, 14, 3); }, SC);
add(G, A, 'us-mardigras', 'Mardi Gras (New Orleans)', 'Mardi Gras (New Orleans)', 'Lễ hội hóa trang và diễu hành xe hoa trước mùa Chay, dấu ấn của người Pháp miền Nam.',
  d => { d.bg('v'); d.e(8, 8, 6, 4, 'y'); d.r(2, 4, 12, 4, '_'); d.e(8, 8, 6, 4, 'y'); d.e(5, 8, 2, 1.6, 'v'); d.e(11, 8, 2, 1.6, 'v'); d.r(3, 5, 10, 2, 'g'); d.p('p', 4, 4, 8, 3, 12, 4); d.p('g', 2, 3, 14, 3); d.l(1, 8, 0, 14, 'p'); d.l(15, 8, 15, 14, 'y'); d.p('k', 5, 8, 11, 8); }, SC);
add(G, A, 'us-juneteenth', 'Juneteenth (19 tháng 6)', 'Juneteenth (19 June)', 'Ngày kỷ niệm việc chấm dứt chế độ nô lệ, trở thành ngày lễ liên bang năm 2021.',
  d => { d.bg('R'); d.r(0, 0, 16, 5, 'b'); d.r(0, 6, 16, 5, 'r'); d.r(0, 11, 16, 5, 'g'); d.r(0, 5, 16, 1, 'w'); d.r(0, 10, 16, 1, 'w'); d.e(8, 8, 3, 3, 'w'); d.e(8, 8, 2, 2, 'y'); d.p('k', 8, 8); }, SC);
add(G, A, 'us-mlkday', 'Ngày Martin Luther King Jr.', 'Martin Luther King Jr. Day', 'Ngày lễ liên bang đầu tháng một để tri ân nhà lãnh đạo phong trào dân quyền.',
  d => { person(d, 'u', 'k', 'd'); d.r(7, 9, 2, 5, 'w'); d.p('r', 8, 9); d.l(13, 15, 13, 4, 'N'); d.r(11, 2, 5, 3, 'w'); d.p('k', 12, 3, 14, 3); }, SC);
add(G, A, 'us-superbowlfest', 'Super Bowl', 'Super Bowl', 'Trận chung kết bóng bầu dục Mỹ, gần như là một ngày lễ của toàn quốc.',
  d => { d.bg('G'); d.e(8, 8, 6, 3.4, 'n'); d.e(8, 8, 6, 3.4, 'n'); d.l(2, 8, 14, 8, 'w'); d.l(6, 6, 6, 10, 'w'); d.l(8, 6, 8, 10, 'w'); d.l(10, 6, 10, 10, 'w'); d.r(0, 12, 16, 4, 'g'); d.p('y', 2, 3, 13, 2); d.p('w', 1, 13, 14, 14); }, SC);
add(G, A, 'us-nye', 'Thả quả cầu chào năm mới ở Times Square', 'The Times Square New Year\'s ball', 'Quả cầu pha lê rơi xuống lúc nửa đêm giao thừa.',
  d => { d.bg('k'); d.l(8, 15, 8, 6, 'a'); d.e(8, 5, 3.4, 3.4, 'l'); d.e(8, 5, 2.4, 2.4, 'c'); d.p('w', 7, 4, 9, 6, 8, 5); d.r(0, 12, 16, 4, 'K'); for (const [x, y, c] of [[2, 3, 'y'], [13, 2, 'r'], [3, 8, 'p'], [13, 8, 'g']]) d.p(c, x, y, x + 1, y); d.p('y', 1, 13, 5, 14, 11, 13, 14, 14); }, SC);
add(G, A, 'us-festivals', 'Burning Man và Coachella', 'Burning Man and Coachella', 'Hai lễ hội nghệ thuật và âm nhạc giữa sa mạc, hút khách trẻ từ nhiều nơi.',
  d => { d.bg('o'); d.r(0, 12, 16, 4, 'u'); d.r(7, 4, 2, 9, 'N'); d.r(5, 3, 6, 1, 'N'); d.tri(6, 0, 4, 3, 'r'); d.p('y', 8, 1); d.l(1, 13, 5, 10, 'p'); d.l(15, 13, 11, 10, 'c'); d.p('w', 2, 2, 13, 3); d.e(4, 6, 1.6, 1.6, 'y'); }, SC);
add(G, A, 'us-powwow', 'Powwow', 'Powwow', 'Lễ hội của các bộ lạc bản địa với điệu múa, trống và trang phục truyền thống.',
  d => { d.bg('G'); d.e(8, 8, 6, 6, 'n'); d.e(8, 8, 5, 5, 'e'); d.e(8, 8, 4, 4, 'r'); d.e(8, 8, 2.4, 2.4, 'y'); d.e(8, 8, 1, 1, 'k'); for (let i = 0; i < 8; i++) { const a = i * 0.785; d.l(8 + Math.round(Math.cos(a) * 6), 8 + Math.round(Math.sin(a) * 6), 8 + Math.round(Math.cos(a) * 7.4), 8 + Math.round(Math.sin(a) * 7.4), i % 2 ? 'r' : 'w'); } }, SC);

// ----- Nhạc cụ -----
add(G, B, 'us-eguitar', 'Guitar điện', 'Electric guitar', 'Nhạc cụ trung tâm của rock and roll, được phát triển mạnh ở Mỹ từ thập niên 1930 đến 1950.',
  d => { d.e(5, 11, 3.6, 3.6, 'r'); d.e(8, 8, 2.6, 2.6, 'r'); d.e(5, 11, 1.4, 1.4, 'R'); d.l(8, 8, 14, 2, 'N'); d.l(9, 8, 15, 2, 'n'); d.r(13, 0, 3, 3, 'k'); d.p('a', 4, 10, 6, 12, 7, 9); d.p('w', 5, 11); d.p('y', 14, 1); }, H);
add(G, B, 'us-banjo', 'Banjo', 'Banjo', 'Đàn dây có nguồn gốc châu Phi, trở thành nhạc cụ đặc trưng của nhạc dân gian vùng núi Appalachia và bluegrass.',
  d => { d.e(5, 11, 4.4, 4.4, 'n'); d.e(5, 11, 3.6, 3.6, 'w'); d.e(5, 11, 1.2, 1.2, 'a'); d.l(8, 8, 14, 2, 'N'); d.l(9, 8, 15, 2, 'n'); d.r(13, 0, 3, 3, 'k'); d.l(5, 9, 13, 2, 'a'); d.p('y', 14, 1); d.p('a', 3, 10, 7, 10, 5, 13); }, H);
add(G, B, 'us-harmonica', 'Kèn harmonica', 'Harmonica', 'Nhạc cụ nhỏ gọn, thường nghe trong blues và nhạc dân gian.',
  d => { d.r(1, 6, 14, 5, 'a'); d.r(1, 6, 14, 1, 'l'); d.r(1, 10, 14, 1, 'A'); for (let x = 2; x < 14; x += 2) d.p('k', x, 8); d.r(0, 6, 1, 5, 'r'); d.r(15, 6, 1, 5, 'r'); d.p('y', 8, 7); }, H);
add(G, B, 'us-sax', 'Saxophone và trumpet', 'Saxophone and trumpet', 'Hai nhạc cụ hơi của jazz, âm thanh gắn với những câu lập lời ngẫu hứng.',
  d => { d.l(3, 1, 5, 3, 'y'); d.l(5, 3, 5, 10, 'y'); d.l(6, 3, 6, 10, 'Y'); d.e(7, 12, 2.6, 2, 'y'); d.l(9, 12, 12, 9, 'y'); d.r(9, 4, 6, 2, 'o'); d.r(9, 6, 4, 2, 'y'); d.p('k', 5, 5, 5, 7); d.p('Y', 13, 5, 14, 6); }, H);
add(G, B, 'us-piano', 'Piano và organ', 'Piano and organ', 'Gắn với nhạc gospel, nhạc nhà thờ và blues.',
  d => { d.bg('e'); d.r(1, 5, 14, 6, 'k'); d.r(1, 5, 14, 1, 'K'); for (let x = 2; x < 15; x += 2) d.r(x, 8, 1, 3, 'w'); for (const x of [3, 6, 9, 12]) d.r(x, 8, 1, 2, 'k'); d.r(1, 11, 14, 4, 'N'); d.p('y', 8, 6); }, SC);
add(G, B, 'us-drums', 'Bộ trống (drum kit)', 'Drum kit', 'Ra đời ở New Orleans cuối thế kỷ mười chín khi những nhạc công gom nhiều trống lại.',
  d => { d.e(8, 10, 4, 3.4, 'r'); d.e(8, 9, 4, 1.4, 'w'); d.e(3, 7, 2.4, 1.4, 'w'); d.r(1, 8, 4, 2, 'R'); d.e(13, 6, 2.4, 1.4, 'y'); d.l(13, 7, 13, 12, 'a'); d.e(3, 4, 2, 0.8, 'y'); d.l(3, 5, 3, 8, 'a'); d.l(4, 2, 9, 6, 'N'); d.l(12, 2, 9, 7, 'n'); d.p('w', 7, 10, 9, 10); }, H);
add(G, B, 'us-fiddle', 'Đàn fiddle', 'Fiddle', 'Cách gọi dân gian cho đàn violin trong nhạc country và bluegrass.',
  d => { d.e(7, 10, 3.6, 4.4, 'o'); d.e(7, 10, 2.6, 3.4, 'O'); d.l(7, 6, 7, 0, 'N'); d.e(7, 0, 1.4, 1, 'N'); d.l(7, 6, 7, 13, 'w'); d.p('k', 6, 9, 8, 9); d.l(1, 13, 13, 4, 'n'); d.p('w', 8, 13); }, H);
add(G, B, 'us-steelguitar', 'Đàn steel guitar', 'Steel guitar', 'Tiếng đàn trượt dài, đặc trưng của nhạc country ở Nashville.',
  d => { d.r(1, 5, 14, 4, 'a'); d.r(1, 5, 14, 1, 'l'); d.r(1, 8, 14, 1, 'A'); for (let y = 6; y < 8; y++) d.l(2, y, 13, y, 'w'); d.l(3, 9, 2, 14, 'N'); d.l(13, 9, 14, 14, 'N'); d.p('r', 14, 6); d.l(11, 3, 9, 2, 'k'); d.p('y', 6, 6, 9, 7); }, H);
add(G, B, 'us-turntable', 'Máy tổng hợp âm thanh và máy quay đĩa', 'Synthesizer and turntable', 'Hai thiết bị đặc trưng của nhạc điện tử và hip hop.',
  d => { d.bg('k'); d.r(1, 3, 14, 11, 'd'); d.e(5, 9, 3.8, 3.8, 'k'); d.e(5, 9, 3, 3, 'K'); d.e(5, 9, 0.9, 0.9, 'r'); d.l(11, 4, 9, 9, 'a'); d.r(9, 10, 6, 3, 'K'); d.p('c', 10, 11, 12, 11, 14, 11); d.p('p', 9, 5, 13, 5); }, SC);

// ----- Nghệ thuật biểu diễn -----
add(G, C, 'us-jazz', 'Jazz', 'Jazz', 'Ra đời ở New Orleans đầu thế kỷ hai mươi, với những tên tuổi như Louis Armstrong, Duke Ellington và Miles Davis.',
  d => { d.bg('B'); d.e(8, 5, 2.4, 2.6, 'N'); d.r(5, 2, 6, 2, 'k'); d.r(5, 8, 6, 8, 'k'); d.r(7, 8, 2, 4, 'w'); d.p('r', 8, 8); d.l(10, 5, 13, 3, 'y'); d.e(13, 3, 1.6, 1.4, 'y'); d.p('w', 2, 2, 14, 7, 1, 11); d.p('y', 4, 12, 12, 12); }, SC);
add(G, C, 'us-blues', 'Blues', 'Blues', 'Nhạc buồn của người Mỹ gốc Phi ở miền Nam, nền tảng của nhiều thể loại nhạc sau này.',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'K'); d.e(6, 7, 2, 2, 'N'); d.r(4, 9, 4, 5, 'A'); d.r(3, 3, 6, 2, 'k'); d.e(10, 11, 3, 2.4, 'n'); d.l(11, 9, 14, 4, 'N'); d.p('w', 2, 2, 13, 2, 9, 6); d.p('b', 12, 7, 4, 4); }, SC);
add(G, C, 'us-rocknroll', 'Rock and roll', 'Rock and roll', 'Biểu tượng của thanh niên thập niên 1950, với Elvis Presley, Chuck Berry.',
  d => { d.bg('R'); d.e(8, 5, 3, 3.4, 's'); d.r(4, 1, 8, 3, 'k'); d.p('k', 3, 3, 4, 2, 11, 2, 12, 3); d.r(5, 9, 6, 7, 'w'); d.r(4, 9, 8, 1, 'b'); d.l(3, 14, 12, 8, 'a'); d.p('y', 7, 13, 2, 3, 13, 12); d.p('k', 7, 5, 9, 5); }, SC);
add(G, C, 'us-country', 'Nhạc country', 'Country music', 'Nhạc kể chuyện đời thường của nhà quê, trung tâm là Nashville, Tennessee.',
  d => { d.bg('u'); d.e(8, 11, 6, 2, 'n'); d.r(5, 5, 6, 6, 'n'); d.e(8, 5, 3, 1.6, 'N'); d.r(5, 9, 6, 1, 'N'); d.p('y', 8, 9); d.l(1, 13, 4, 9, 'N'); d.e(3, 12, 2, 1.6, 'n'); d.p('r', 13, 3, 14, 3); }, SC);
add(G, C, 'us-gospel', 'Gospel', 'Gospel', 'Nhạc thánh ca của nhà thờ người Mỹ gốc Phi, giọng hát mạnh và dàn hợp xướng.',
  d => { d.bg('v'); for (const [x, c] of [[3, 'w'], [8, 'y'], [13, 'w']]) { d.e(x, 6, 1.6, 1.8, 'N'); d.r(x - 2, 8, 5, 7, c); d.p('k', x - 1, 5, x + 1, 5); d.p('r', x, 7); } d.p('y', 1, 1, 14, 1, 8, 0); }, SC);
add(G, C, 'us-hiphop', 'Hip hop và rap', 'Hip hop and rap', 'Ra đời ở khu Bronx, New York, hiện là một trong những dòng nhạc thịnh hành nhất thế giới.',
  d => { d.bg('k'); d.e(8, 6, 3, 3.4, 'N'); d.r(4, 2, 8, 2, 'r'); d.r(4, 9, 8, 7, 'y'); d.r(5, 10, 6, 1, 'k'); d.p('k', 6, 6, 9, 6); d.r(11, 11, 3, 3, 'a'); d.e(12.5, 10, 1.4, 1.4, 'l'); d.p('w', 2, 2, 14, 4); d.p('y', 7, 12, 9, 12); }, SC);
add(G, C, 'us-broadway', 'Nhạc kịch Broadway', 'Broadway musicals', 'Sân khấu ở Manhattan, nơi nhiều vở nhạc kịch được dàn dựng.',
  d => { d.bg('R'); d.r(1, 3, 14, 8, 'k'); for (let x = 2; x < 15; x += 2) d.p('y', x, 2, x, 11); d.r(3, 5, 10, 4, 'y'); d.r(4, 6, 8, 2, 'r'); d.p('w', 5, 7, 7, 7, 9, 7, 11, 7); d.r(0, 12, 16, 4, 'd'); d.p('y', 2, 13, 13, 14); }, SC);
add(G, C, 'us-hollywoodfilm', 'Hollywood và điện ảnh', 'Hollywood and film', 'Ngành công nghiệp điện ảnh ở Los Angeles, với lễ trao giải Oscar mỗi năm.',
  d => { d.bg('k'); d.r(6, 1, 4, 3, 'y'); d.e(8, 3, 1.6, 1.4, 'y'); d.r(7, 4, 2, 5, 'Y'); d.r(5, 8, 6, 1, 'y'); d.r(6, 9, 4, 4, 'Y'); d.r(4, 13, 8, 2, 'y'); d.p('u', 7, 2, 7, 6, 9, 11); d.p('w', 2, 3, 13, 5, 1, 11, 14, 12); }, SC);
add(G, C, 'us-standup', 'Hài độc thoại (stand-up comedy)', 'Stand-up comedy', 'Nghệ sĩ đứng một mình kể chuyện cười trên sân khấu, rất phổ biến ở Mỹ.',
  d => { d.bg('R'); d.r(0, 12, 16, 4, 'k'); d.r(2, 1, 12, 10, 'r'); d.e(8, 6, 2, 2.2, 's'); d.r(6, 8, 4, 5, 'b'); d.l(10, 9, 12, 7, 's'); d.r(12, 5, 2, 3, 'a'); d.e(13, 5, 1.4, 1.4, 'l'); d.p('k', 7, 6, 9, 6); d.p('r', 8, 7); d.p('y', 3, 2, 12, 2); }, SC);
add(G, C, 'us-squaredance', 'Múa tap và square dance', 'Tap dancing and square dancing', 'Điệu múa gõ chân và điệu múa vòng của dân gian.',
  d => { d.bg('u'); d.r(0, 13, 16, 3, 'n'); d.e(4, 4, 1.4, 1.6, 's'); d.r(3, 6, 3, 5, 'r'); d.l(3, 11, 2, 13, 'k'); d.l(5, 11, 6, 13, 'k'); d.e(11, 4, 1.4, 1.6, 's'); d.tri(9, 7, 5, 5, 'b'); d.l(10, 12, 10, 13, 'k'); d.l(12, 12, 12, 13, 'k'); d.p('y', 7, 2, 8, 8); }, SC);
add(G, C, 'us-rodeo', 'Rodeo', 'Rodeo', 'Môn biểu diễn cưỡi bò và ngựa, đặc trưng của miền Tây.',
  d => { d.bg('o'); d.r(0, 12, 16, 4, 'u'); d.e(8, 9, 5, 2.6, 'N'); d.p('k', 3, 7, 4, 6); d.l(11, 8, 13, 5, 'N'); d.r(11, 11, 1, 3, 'N'); d.r(5, 11, 1, 3, 'N'); d.e(8, 4, 1.4, 1.6, 's'); d.r(7, 2, 3, 1, 'n'); d.r(6, 5, 4, 3, 'r'); d.l(7, 5, 3, 2, 's'); d.p('w', 12, 4, 13, 4); }, SC);

// ----- Hội họa và kiến trúc -----
add(G, E, 'us-hudsonriver', 'Trường phái sông Hudson (Hudson River School)', 'Hudson River School', 'Các họa sĩ thế kỷ mười chín vẽ phong cảnh rộng lớn và thiên nhiên hùng vĩ.',
  d => { d.bg('o'); d.r(0, 0, 16, 6, 'y'); d.tri(0, 4, 8, 8, 'N'); d.tri(7, 6, 9, 6, 'G'); d.r(0, 12, 16, 4, 'C'); d.e(12, 4, 2, 2, 'u'); d.p('G', 2, 11, 13, 13); d.p('k', 4, 8, 11, 9); d.l(0, 13, 15, 13, 'c'); }, SC);
add(G, E, 'us-hopper', 'Edward Hopper', 'Edward Hopper', 'Họa sĩ vẽ đô thị cô đơn, nổi tiếng với bức "Nighthawks".',
  d => { d.bg('k'); d.r(0, 12, 16, 4, 'd'); d.r(2, 4, 12, 6, 'y'); d.r(2, 4, 12, 1, 'u'); d.r(2, 10, 12, 1, 'a'); d.e(5, 7, 1, 1, 'r'); d.r(4, 8, 3, 2, 'b'); d.e(10, 7, 1, 1, 'e'); d.r(9, 8, 3, 2, 'g'); d.p('w', 3, 1, 12, 2); }, SC);
add(G, E, 'us-grantwood', 'Grant Wood', 'Grant Wood', 'Tác giả bức "American Gothic", hình ảnh đôi người nông dân trước ngôi nhà gỗ.',
  d => { d.bg('e'); d.r(3, 1, 10, 14, 'w'); d.tri(4, 1, 8, 3, 'a'); d.r(6, 4, 2, 3, 'k'); d.e(5, 11, 1.8, 1.8, 's'); d.r(3, 12, 5, 4, 'd'); d.e(11, 11, 1.8, 1.8, 's'); d.r(9, 12, 5, 4, 'n'); d.p('k', 5, 11, 11, 11); d.l(8, 7, 8, 15, 'a'); }, SC);
add(G, E, 'us-okeeffe', 'Georgia O\'Keeffe', 'Georgia O\'Keeffe', 'Nữ họa sĩ vẽ hoa và sa mạc Tây Nam.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'o'); d.e(8, 7, 6, 5.4, 'p'); d.e(8, 7, 4.4, 4, 'x'); d.e(8, 7, 2.4, 2.2, 'P'); d.e(8, 7, 1, 1, 'y'); d.p('w', 5, 5, 11, 9); d.l(8, 12, 8, 15, 'G'); }, SC);
add(G, E, 'us-pollock', 'Trường phái biểu hiện trừu tượng', 'Abstract expressionism', 'Jackson Pollock phủ sơn lên tấm vải trải trên sàn, trở thành biểu tượng của hội họa Mỹ sau chiến tranh.',
  d => { d.bg('e'); for (let i = 0; i < 18; i++) { const x = (i * 7) % 15, y = (i * 5) % 14; d.l(x, y, (x + 5) % 15, (y + 4) % 15, ['k', 'r', 'b', 'y', 'w', 'g'][i % 6]); } d.p('k', 2, 12, 13, 3, 7, 7); }, SC);
add(G, E, 'us-warhol', 'Andy Warhol và nghệ thuật pop', 'Andy Warhol and pop art', 'Biến hình ảnh thương mại như lon súp thành tác phẩm nghệ thuật.',
  d => { d.bg('y'); d.r(4, 3, 8, 11, 'r'); d.r(4, 3, 8, 3, 'w'); d.r(4, 11, 8, 1, 'w'); d.r(4, 3, 8, 1, 'a'); d.e(8, 8, 2, 1.6, 'y'); d.p('R', 8, 8); d.p('k', 5, 6, 10, 6); d.r(1, 1, 3, 3, 'p'); d.r(12, 12, 3, 3, 'c'); }, SC);
add(G, E, 'us-rockwell', 'Norman Rockwell', 'Norman Rockwell', 'Họa sĩ minh họa nổi tiếng với những bức tranh về đời sống người Mỹ bình dị.',
  d => { d.bg('e'); d.r(2, 2, 12, 12, 'N'); d.r(3, 3, 10, 10, 'u'); d.e(6, 7, 1.6, 1.8, 's'); d.r(5, 9, 3, 4, 'b'); d.e(10, 8, 1.4, 1.4, 's'); d.r(9, 10, 3, 3, 'r'); d.p('k', 5, 7, 6, 7, 10, 8); d.p('o', 5, 5, 6, 5, 10, 6); }, SC);
add(G, E, 'us-artdeco', 'Cao ốc Empire State và Chrysler', 'Empire State and Chrysler buildings', 'Những tòa nhà phong cách Art Deco ở New York xây trong thập niên 1930.',
  d => { d.bg('B'); d.r(0, 14, 16, 2, 'a'); d.r(1, 8, 5, 6, 'K'); d.r(7, 6, 3, 8, 'A'); d.r(7, 3, 3, 3, 'a'); d.r(8, 1, 1, 2, 'a'); d.tri(10, 7, 6, 3, 'l'); d.r(11, 4, 4, 10, 'a'); d.p('y', 8, 0, 3, 10, 12, 6); for (let y = 8; y < 14; y += 2) d.p('y', 2, y, 4, y); }, SC);
add(G, E, 'us-wright', 'Frank Lloyd Wright', 'Frank Lloyd Wright', 'Kiến trúc sư nổi tiếng với ngôi nhà Fallingwater xây trên một dòng thác.',
  d => { d.bg('G'); d.r(0, 12, 16, 4, 'C'); d.r(2, 11, 12, 1, 'w'); d.r(3, 8, 10, 2, 'e'); d.r(1, 5, 9, 2, 'w'); d.r(4, 3, 10, 2, 'e'); d.r(2, 6, 1, 3, 'a'); d.l(8, 11, 8, 15, 'c'); d.p('w', 6, 13, 10, 14); d.p('y', 5, 9, 9, 6, 11, 4); }, SC);
add(G, E, 'us-guggenheim', 'Bảo tàng Guggenheim', 'Guggenheim Museum', 'Công trình hình xoắn ốc ở New York do Frank Lloyd Wright thiết kế, mở năm 1959.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(3, 9, 10, 4, 'w'); d.r(2, 6, 12, 3, 'e'); d.r(4, 3, 8, 3, 'w'); d.e(8, 3, 4, 1.2, 'l'); d.r(3, 9, 10, 1, 'a'); d.r(2, 8, 12, 1, 'a'); d.r(4, 5, 8, 1, 'a'); d.p('k', 6, 11, 9, 11); }, SC);
add(G, E, 'us-met', 'Bảo tàng Metropolitan và MoMA', 'The Met and MoMA', 'Hai bảo tàng nghệ thuật lớn ở New York.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(2, 6, 12, 7, 'W'); d.tri(1, 3, 14, 3, 'e'); for (const x of [3, 6, 9, 12]) d.r(x, 7, 1, 6, 'w'); d.r(7, 11, 2, 2, 'k'); d.l(1, 14, 14, 14, 'A'); d.p('r', 8, 2); d.r(3, 13, 10, 1, 'e'); }, SC);
add(G, E, 'us-smithsonian', 'Smithsonian', 'The Smithsonian', 'Hệ thống bảo tàng miễn phí ở Washington, D.C.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(1, 7, 14, 6, 'R'); d.r(1, 6, 14, 1, 'r'); d.r(2, 3, 3, 4, 'R'); d.tri(1, 1, 5, 2, 'r'); d.r(11, 4, 3, 3, 'R'); d.tri(10, 2, 5, 2, 'r'); d.p('y', 3, 9, 6, 9, 9, 9, 12, 9); d.r(7, 10, 2, 3, 'k'); }, SC);
add(G, E, 'us-neoclassical', 'Kiến trúc Colonial và Neoclassical', 'Colonial and Neoclassical architecture', 'Phong cách cột lớn của các công trình chính phủ ở Washington.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.tri(1, 2, 14, 3, 'w'); d.r(1, 5, 14, 1, 'l'); for (const x of [2, 5, 8, 11]) d.r(x, 6, 2, 7, 'w'); d.r(0, 13, 16, 1, 'e'); d.r(0, 14, 16, 1, 'W'); d.p('b', 8, 3); }, SC);

// ----- Văn hóa hiện đại -----
add(G, F, 'us-hollywoodmovie', 'Phim Hollywood', 'Hollywood movies', 'Ngành điện ảnh lớn nhất thế giới về doanh thu, với nhiều thể loại từ cao bồi đến khoa học viễn tưởng.',
  d => { d.bg('k'); d.r(2, 4, 12, 9, 'd'); d.r(2, 4, 12, 1, 'w'); d.r(2, 12, 12, 1, 'w'); for (let x = 3; x < 13; x += 3) { d.p('w', x, 2); d.p('w', x, 14); } d.tri(5, 6, 6, 5, 'y'); d.p('d', 8, 8); d.p('r', 3, 7, 12, 7); }, SC);
add(G, F, 'us-streaming', 'Truyền hình và phát trực tuyến', 'Television and streaming', 'Netflix và các kênh truyền hình cáp đã thay đổi cách xem phim.',
  d => { d.bg('R'); d.r(2, 3, 12, 8, 'k'); d.r(3, 4, 10, 6, 'c'); d.tri(6, 5, 4, 4, 'w'); d.r(5, 12, 6, 1, 'a'); d.r(4, 13, 8, 1, 'a'); d.p('r', 3, 4); d.p('y', 13, 1, 2, 1); }, SC);
add(G, F, 'us-superhero', 'Truyện tranh siêu anh hùng', 'Superhero comics', 'Ngành truyện tranh Mỹ sinh ra các nhân vật được nhiều thế hệ yêu thích.',
  d => { d.bg('y'); d.e(8, 5, 2.4, 2.6, 's'); d.r(5, 2, 6, 2, 'k'); d.r(5, 7, 6, 5, 'b'); d.r(7, 8, 2, 2, 'r'); d.r(4, 9, 8, 1, 'r'); d.tri(2, 8, 5, 7, 'r'); d.tri(9, 8, 5, 7, 'r'); d.l(7, 12, 6, 15, 'b'); d.l(9, 12, 10, 15, 'b'); d.p('k', 7, 5, 9, 5); d.p('w', 2, 2, 13, 3); }, SC);
add(G, F, 'us-literature', 'Văn học Mỹ', 'American literature', 'Mark Twain, Ernest Hemingway, F. Scott Fitzgerald và Toni Morrison là những tên tuổi lớn, trong đó Hemingway và Morrison đều đạt giải Nobel Văn học.',
  d => { d.r(1, 3, 5, 11, 'b'); d.r(5, 2, 5, 12, 'r'); d.r(9, 4, 6, 10, 'g'); for (const x of [2, 6, 10]) d.p('y', x, 6, x + 1, 6, x, 9, x + 1, 9); d.r(0, 14, 16, 1, 'N'); d.p('w', 12, 6); }, H);
add(G, F, 'us-sports', 'Bóng bầu dục, bóng rổ và bóng chày', 'Football, basketball and baseball', 'Ba môn thể thao được yêu thích nhất, với hệ thống giải NFL, NBA và MLB.',
  d => { d.bg('G'); d.e(4, 5, 3, 3, 'o'); d.l(2, 5, 6, 5, 'k'); d.l(4, 3, 4, 7, 'k'); d.e(12, 5, 3, 3, 'w'); d.l(10, 3, 10, 7, 'r'); d.l(14, 3, 14, 7, 'r'); d.e(8, 12, 4, 2.4, 'n'); d.l(5, 12, 11, 12, 'w'); d.l(7, 10, 7, 14, 'w'); d.l(9, 10, 9, 14, 'w'); }, H);
add(G, F, 'us-collegesports', 'Thể thao đại học (college sports)', 'College sports', 'Các trận đấu giữa các trường đại học thu hút đám đông khổng lồ.',
  d => { d.bg('b'); d.r(0, 11, 16, 5, 'g'); d.e(8, 10, 7, 3, 'G'); for (let x = 1; x < 15; x += 2) d.p(x % 4 ? 'r' : 'y', x, 6, x, 7); d.r(1, 4, 14, 5, 'k'); d.p('y', 3, 3, 8, 2, 12, 3); d.p('w', 4, 6, 7, 5, 11, 6); d.e(8, 13, 1.4, 1, 'o'); }, SC);
add(G, F, 'us-siliconvalley', 'Silicon Valley và công nghệ', 'Silicon Valley and technology', 'Vùng công nghệ ở California, nơi ra đời nhiều công ty máy tính và mạng xã hội.',
  d => { d.bg('c'); d.r(2, 3, 12, 8, 'a'); d.r(3, 4, 10, 6, 'k'); d.p('g', 4, 5, 6, 5, 4, 7, 8, 7, 5, 9); d.r(1, 11, 14, 2, 'l'); d.r(6, 12, 4, 1, 'A'); d.p('c', 10, 5, 11, 6, 12, 7); d.p('y', 3, 1, 12, 1); }, SC);
add(G, F, 'us-videogame', 'Video game', 'Video games', 'Ngành công nghiệp trò chơi điện tử lớn, nhiều công ty Mỹ dẫn đầu.',
  d => { d.bg('v'); d.r(1, 5, 14, 7, 'k'); d.e(2, 8.5, 2, 3.4, 'k'); d.e(14, 8.5, 2, 3.4, 'k'); d.p('a', 3, 7, 2, 8, 4, 8, 3, 9); d.p('r', 12, 7, 13, 9); d.p('g', 11, 8, 12, 9); d.p('b', 10, 9); d.p('y', 7, 7, 8, 7, 7, 9, 8, 9); }, H);
add(G, F, 'us-drivethru', 'Đồ ăn nhanh và văn hóa lái xe', 'Fast food and car culture', 'Nhà hàng drive-through, rạp chiếu phim ngoài trời, phản ánh thói quen sống bằng xe hơi.',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'a'); d.r(1, 4, 6, 9, 'r'); d.r(1, 3, 6, 1, 'y'); d.p('y', 3, 7, 4, 7); d.r(2, 9, 4, 3, 'k'); d.r(8, 9, 7, 3, 'c'); d.r(9, 7, 4, 2, 'c'); d.e(10, 12, 1.4, 1.4, 'k'); d.e(14, 12, 1.4, 1.4, 'k'); d.p('w', 2, 1, 12, 2); }, SC);
