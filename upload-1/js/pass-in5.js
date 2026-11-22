import { add, SC, setCC } from './pass-kit.js';
setCC('in');
// Ấn Độ · Nhóm 5: Con vật, linh vật, tín ngưỡng, lịch sử và người nổi tiếng
const G = 5, A = 'Con vật và linh vật', B = 'Tín ngưỡng', C = 'Lịch sử', E = 'Người nổi tiếng';
const PET = { use: 'pet' }, H = { use: 'hold' };
const person = (d, bg, hair, body, skin = 's') => { d.bg(bg); d.e(8, 6, 3, 3.4, skin); d.r(5, 2, 6, 2, hair); d.r(4, 9, 8, 7, body); d.p('k', 7, 6, 9, 6); d.p('r', 8, 8); };

// ----- Con vật và linh vật -----
add(G, A, 'in-tiger', 'Hổ Bengal', 'Bengal tiger', 'Quốc thú của Ấn Độ, biểu tượng của sức mạnh, được bảo vệ trong nhiều khu bảo tồn.',
  d => { d.bg('G'); d.e(8, 9, 5.4, 5.2, 'o'); d.e(3.5, 4.5, 1.8, 1.8, 'o'); d.e(12.5, 4.5, 1.8, 1.8, 'o'); d.e(8, 11, 3, 2.2, 'e'); d.p('k', 5, 7, 11, 7, 8, 10, 4, 10, 12, 10, 6, 5, 10, 5); d.p('k', 7, 11, 9, 11); d.p('r', 8, 12); }, PET);
add(G, A, 'in-elephant', 'Voi Á', 'Asian elephant', 'Thấy trong lễ hội và đền chùa, gắn liền với thần Ganesha đầu voi.',
  d => { d.bg('c'); d.e(7, 8, 5, 5, 'a'); d.e(3, 7, 2.4, 3, 'A'); d.l(10, 8, 12, 14, 'a'); d.l(11, 8, 13, 14, 'a'); d.p('w', 10, 10, 11, 11); d.p('k', 7, 6); d.r(4, 12, 2, 3, 'A'); d.r(7, 12, 2, 3, 'A'); d.p('r', 5, 3, 9, 3); d.p('y', 6, 3, 8, 3); }, PET);
add(G, A, 'in-peacock', 'Chim công', 'Indian peafowl', 'Chim công là quốc điểu, xuất hiện trong nghệ thuật, văn học và hoa văn vải.',
  d => { d.bg('c'); d.e(8, 6, 7, 5.4, 'G'); d.e(8, 6, 5, 4, 'g'); d.e(8, 6, 3, 2.6, 'b'); d.p('y', 4, 4, 12, 4, 8, 2, 3, 7, 13, 7); d.p('B', 8, 6); d.e(8, 11, 2.4, 3, 'b'); d.e(8, 8, 1.4, 1.4, 'B'); d.p('k', 8, 8); d.r(7, 14, 1, 2, 'n'); d.r(9, 14, 1, 2, 'n'); d.p('y', 8, 7); }, PET);
add(G, A, 'in-cow', 'Bò', 'Cow', 'Được nhiều người Ấn Độ giáo tôn kính, nhiều bang có luật bảo vệ bò.',
  d => { d.bg('h'); d.e(7, 9, 5, 4, 'w'); d.e(12, 8, 2.4, 2.4, 'w'); d.e(10, 5, 1, 1, 'n'); d.p('t', 11, 4, 13, 4); d.p('k', 12, 7, 5, 8, 8, 10); d.p('p', 13, 9, 12, 10); d.r(4, 12, 1, 3, 'w'); d.r(9, 12, 1, 3, 'w'); d.l(2, 8, 1, 12, 'w'); d.p('y', 13, 3); }, PET);
add(G, A, 'in-lion', 'Sư tử Á châu (Gir)', 'Asiatic lion (Gir)', 'Loài sư tử còn lại ở rừng Gir, bang Gujarat.',
  d => { d.bg('u'); d.e(8, 8, 6, 6, 'n'); d.e(8, 9, 3.4, 3.6, 'o'); d.e(5, 4, 1.4, 1.4, 'o'); d.e(11, 4, 1.4, 1.4, 'o'); d.p('k', 7, 8, 9, 8, 8, 10, 7, 11, 9, 11); d.p('N', 3, 8, 13, 8, 4, 12, 12, 12); d.p('e', 8, 12); }, PET);
add(G, A, 'in-rhino', 'Tê giác một sừng', 'Indian rhinoceros', 'Sống ở vùng Đông Bắc, đặc biệt ở Kaziranga.',
  d => { d.bg('h'); d.e(8, 9, 6, 4.4, 'A'); d.e(13, 9, 2.6, 3, 'a'); d.tri(13, 3, 2, 4, 'l'); d.p('k', 12, 8, 4, 8, 7, 11); d.p('a', 4, 6, 9, 6, 8, 12); d.r(4, 12, 2, 3, 'A'); d.r(10, 12, 2, 3, 'A'); d.p('w', 14, 4); }, PET);
add(G, A, 'in-cobra', 'Rắn hổ mang', 'Cobra', 'Xuất hiện trong thần thoại, được thần Shiva đeo quanh cổ.',
  d => { d.bg('u'); d.e(8, 12, 6, 2.4, 'g'); d.r(7, 6, 2, 6, 'g'); d.e(8, 5, 4, 3.6, 'G'); d.e(8, 4, 2.4, 2, 'g'); d.p('y', 7, 4, 9, 4); d.p('r', 8, 6, 8, 7); d.p('k', 7, 3, 9, 3); d.p('h', 8, 9, 8, 11); d.p('Y', 4, 12, 12, 13); }, PET);
add(G, A, 'in-hanuman', 'Hanuman (khỉ)', 'Hanuman (monkey god)', 'Thần khỉ trung thành trong sử thi Ramayana, được nhiều người cầu nguyện về sức mạnh.',
  d => { d.bg('o'); d.e(8, 5, 3, 3, 't'); d.e(8, 6, 2.2, 2.2, 'e'); d.p('k', 7, 5, 9, 5, 8, 7); d.r(6, 9, 4, 4, 'n'); d.l(10, 10, 14, 5, 'n'); d.e(14, 4, 1.6, 1.6, 'y'); d.l(6, 10, 4, 12, 'n'); d.r(6, 13, 1, 2, 'n'); d.r(9, 13, 1, 2, 'n'); d.p('y', 5, 2, 11, 2, 8, 1); d.p('r', 8, 10); }, PET);
add(G, A, 'in-nandi', 'Nandi (bò thần)', 'Nandi (sacred bull)', 'Thú cưỡi của thần Shiva, thường đặt tượng trước đền.',
  d => { d.bg('e'); d.e(7, 10, 5, 3.4, 'w'); d.e(12, 8, 2.4, 2.6, 'w'); d.e(9, 6, 2, 2, 'W'); d.p('y', 12, 3, 13, 4, 11, 4); d.p('k', 13, 8, 12, 7); d.r(4, 12, 2, 3, 'W'); d.r(9, 12, 2, 3, 'W'); d.r(3, 14, 10, 1, 'a'); d.p('y', 5, 8, 7, 8, 9, 8); d.p('r', 8, 6); }, PET);
add(G, A, 'in-garuda', 'Garuda', 'Garuda', 'Thần chim, thú cưỡi của thần Vishnu.',
  d => { d.bg('B'); d.e(8, 9, 3, 4, 'y'); d.e(8, 5, 2.4, 2.4, 'w'); d.p('o', 10, 5, 11, 6, 10, 6); d.p('k', 8, 4); d.l(5, 8, 1, 3, 'r'); d.l(5, 10, 1, 7, 'o'); d.l(11, 8, 15, 3, 'r'); d.l(11, 10, 15, 7, 'o'); d.r(6, 13, 1, 2, 'n'); d.r(9, 13, 1, 2, 'n'); d.p('y', 8, 1, 7, 2, 9, 2); }, PET);
add(G, A, 'in-lotus', 'Hoa sen', 'Lotus', 'Quốc hoa, biểu tượng của sự thanh khiết và sự sáng suốt.',
  d => { d.bg('C'); d.r(0, 12, 16, 4, 'B'); d.e(5, 12, 4, 1.4, 'G'); d.e(11, 12, 4, 1.4, 'G'); d.tri(6, 3, 4, 8, 'p'); d.tri(2, 6, 5, 6, 'x'); d.tri(9, 6, 5, 6, 'x'); d.e(8, 11, 4, 2, 'P'); d.p('y', 7, 8, 9, 8, 8, 9); d.p('w', 8, 5); }, H);

// ----- Tín ngưỡng -----
add(G, B, 'in-hinduism', 'Ấn Độ giáo (Hinduism)', 'Hinduism', 'Tôn giáo của đa số dân, không có một đấng sáng lập duy nhất, với nhiều vị thần và nhiều con đường tu tập.',
  d => { d.bg('o'); d.e(8, 8, 6, 6, 'y'); d.e(8, 8, 4.6, 4.6, 'o'); d.r(5, 4, 1, 4, 'r'); d.r(5, 4, 3, 1, 'r'); d.r(8, 4, 1, 8, 'r'); d.p('r', 9, 9, 10, 10, 11, 11, 6, 9, 7, 11, 9, 6); d.p('r', 11, 5, 10, 5); d.p('w', 8, 2); }, SC);
add(G, B, 'in-trimurti', 'Trimurti', 'Trimurti', 'Ba vị thần Brahma (sáng tạo), Vishnu (bảo tồn) và Shiva (hủy diệt và tái sinh).',
  d => { d.bg('B'); for (const [x, c] of [[2, 'y'], [7, 'b'], [12, 'w']]) { d.e(x + 1, 5, 1.8, 1.8, c === 'w' ? 'l' : c); d.r(x, 7, 3, 6, c); d.p('k', x, 5, x + 2, 5); d.p('y', x + 1, 2); } d.p('r', 3, 4, 8, 4, 13, 4); d.r(1, 14, 14, 1, 'o'); }, SC);
add(G, B, 'in-karma', 'Karma, dharma và luân hồi', 'Karma, dharma and reincarnation', 'Quan niệm rằng hành động tạo kết quả, bổn phận đúng đắn và vòng sinh tử.',
  d => { d.bg('v'); d.e(8, 8, 6, 6, 'y'); d.e(8, 8, 4.6, 4.6, 'v'); d.e(8, 8, 3, 3, 'y'); d.e(8, 8, 1.6, 1.6, 'v'); for (const [x, y] of [[8, 2], [8, 14], [2, 8], [14, 8], [4, 4], [12, 12], [12, 4], [4, 12]]) d.p('w', x, y); }, SC);
add(G, B, 'in-buddhism', 'Phật giáo', 'Buddhism', 'Ra đời ở miền bắc Ấn Độ với đức Phật Thích Ca, sau đó lan sang nhiều nước châu Á.',
  d => { d.bg('o'); d.e(8, 11, 6, 3, 'y'); d.e(8, 7, 3, 3, 'y'); d.e(8, 3, 1.6, 1.6, 'Y'); d.r(5, 8, 6, 4, 'y'); d.p('k', 7, 6, 9, 6, 8, 8); d.p('Y', 8, 5, 8, 1); d.p('r', 8, 2); d.p('Y', 4, 12, 12, 12); }, SC);
add(G, B, 'in-jainism', 'Kỳ Na giáo (Jainism)', 'Jainism', 'Tôn giáo đề cao không sát sinh (ahimsa) đến mức cực kỳ nghiêm ngặt.',
  d => { d.bg('e'); d.e(8, 8, 6, 6, 'o'); d.e(8, 8, 4.6, 4.6, 'e'); d.p('r', 8, 3, 8, 13, 3, 8, 13, 8); d.r(6, 6, 4, 4, 'w'); d.p('o', 7, 7, 9, 9, 7, 9, 9, 7); d.p('y', 8, 4, 8, 12); }, SC);
add(G, B, 'in-sikhism', 'Đạo Sikh', 'Sikhism', 'Do Guru Nanak sáng lập ở Punjab thế kỷ 15, nhấn mạnh sự bình đẳng và phục vụ cộng đồng.',
  d => { d.bg('B'); d.e(8, 8, 3, 3, 'y'); d.e(8, 8, 1.4, 1.4, 'B'); d.l(3, 4, 13, 12, 'w'); d.l(13, 4, 3, 12, 'w'); d.e(3, 8, 2, 2, 'w'); d.e(13, 8, 2, 2, 'w'); d.e(3, 8, 1, 1, 'B'); d.e(13, 8, 1, 1, 'B'); d.p('o', 8, 2, 8, 14); }, SC);
add(G, B, 'in-islam', 'Hồi giáo', 'Islam', 'Tôn giáo lớn thứ hai theo số tín đồ, có mặt từ nhiều thế kỷ.',
  d => { d.bg('G'); d.e(8, 5, 3, 3, 'y'); d.e(9, 5, 2.4, 2.4, 'G'); d.p('y', 11, 3, 12, 4, 11, 5); d.r(4, 9, 8, 7, 'w'); d.e(8, 8, 3, 2.6, 'w'); d.r(7, 11, 2, 5, 'g'); d.r(2, 7, 2, 9, 'W'); d.r(12, 7, 2, 9, 'W'); d.p('y', 3, 6, 13, 6); }, SC);
add(G, B, 'in-christianity', 'Cơ Đốc giáo', 'Christianity', 'Du nhập rất sớm, có nhiều cộng đồng ở Kerala và đông bắc.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(4, 7, 8, 6, 'w'); d.tri(3, 4, 10, 3, 'R'); d.r(7, 9, 2, 4, 'n'); d.l(8, 0, 8, 4, 'w'); d.l(6, 2, 10, 2, 'w'); d.p('c', 5, 9, 10, 9); d.p('G', 1, 12, 14, 12); }, SC);
add(G, B, 'in-parsi', 'Người Parsi', 'The Parsis', 'Cộng đồng theo đạo Zoroaster, những người đến từ Ba Tư và góp phần lớn vào công nghiệp ở Mumbai.',
  d => { d.bg('e'); d.e(8, 11, 4, 3, 'o'); d.e(8, 11, 2.6, 1.8, 'y'); d.e(8, 8, 1.6, 2.4, 'y'); d.e(8, 6, 1.2, 1.8, 'r'); d.e(8, 4, 1, 1.4, 'y'); d.r(5, 12, 6, 2, 'N'); d.p('w', 6, 2, 10, 2); d.p('o', 4, 10, 12, 10); }, SC);
add(G, B, 'in-caste', 'Đẳng cấp truyền thống (varna và jati)', 'Traditional castes (varna and jati)', 'Hệ thống phân tầng xã hội lâu đời; hiến pháp cấm phân biệt đối xử, nhưng ảnh hưởng còn được thảo luận nhiều.',
  d => { d.bg('e'); d.r(3, 12, 10, 3, 'N'); d.r(4, 9, 8, 3, 'n'); d.r(5, 6, 6, 3, 'o'); d.r(6, 3, 4, 3, 'y'); d.p('k', 7, 4, 9, 4, 6, 7, 10, 7); d.p('w', 8, 2); }, SC);

// ----- Lịch sử -----
add(G, C, 'in-indus', 'Văn minh Thung lũng Ấn (khoảng 2600 - 1900 tr.CN)', 'Indus Valley Civilization (c. 2600–1900 BCE)', 'Các thành phố Harappa và Mohenjo-daro có hệ thống cống rãnh quy hoạch rất tốt.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.r(2, 5, 12, 8, 'R'); for (const y of [6, 8, 10]) d.r(2, y, 12, 1, 'r'); d.r(6, 9, 4, 4, 'k'); d.r(5, 13, 6, 1, 'C'); d.p('n', 3, 14, 12, 14); d.p('t', 4, 7, 11, 7); }, SC);
add(G, C, 'in-veda', 'Thời kỳ Veda', 'The Vedic period', 'Thời kỳ hình thành các kinh Veda và nhiều tư tưởng tôn giáo ban đầu.',
  d => { d.bg('o'); d.e(8, 11, 4, 3, 'r'); d.e(8, 9, 2.6, 3.4, 'y'); d.e(8, 6, 1.6, 2.4, 'o'); d.r(2, 13, 12, 2, 'N'); d.r(3, 3, 5, 3, 'e'); d.p('k', 4, 4, 6, 4); d.p('y', 12, 3, 13, 2); }, SC);
add(G, C, 'in-maurya', 'Đế quốc Maurya (thế kỷ 4 - 2 tr.CN)', 'Maurya Empire (4th–2nd century BCE)', 'Gồm vua Ashoka, đế quốc thống nhất phần lớn đất liền Ấn Độ.',
  d => { d.bg('G'); d.r(5, 6, 6, 8, 'y'); d.e(8, 5, 4, 2, 'Y'); d.r(3, 4, 10, 1, 'o'); d.e(8, 3, 2, 1.4, 'y'); d.p('r', 8, 2); d.r(4, 14, 8, 2, 'N'); d.p('w', 7, 8, 9, 8, 7, 10, 9, 10); }, SC);
add(G, C, 'in-gupta', 'Đế quốc Gupta', 'Gupta Empire', 'Thời kỳ thịnh vượng về toán học, thiên văn và văn chương.',
  d => { d.bg('B'); d.e(5, 5, 3, 3, 'y'); d.e(6, 5, 2.4, 2.4, 'B'); d.p('y', 11, 3, 13, 5, 12, 8, 4, 10, 9, 12); d.r(2, 13, 12, 3, 'N'); d.p('w', 3, 12, 5, 12, 7, 12); d.p('o', 11, 12); d.p('c', 10, 6, 9, 9); }, SC);
add(G, C, 'in-chola', 'Vương triều Chola', 'Chola dynasty', 'Đế chế hàng hải mạnh ở miền nam, nhiều ngôi đền lớn ra đời.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(2, 9, 12, 3, 'N'); d.l(8, 9, 8, 2, 'n'); d.tri(5, 2, 7, 6, 'r'); d.p('y', 8, 1); d.r(14, 8, 2, 4, 'n'); d.p('w', 1, 13, 10, 14); }, SC);
add(G, C, 'in-mughal', 'Đế quốc Mughal (từ 1526)', 'Mughal Empire (from 1526)', 'Thời đại của Babur, Akbar, Shah Jahan và những công trình kiến trúc vang danh.',
  d => { d.bg('G'); d.e(8, 6, 3, 3.4, 's'); d.r(4, 2, 8, 3, 'r'); d.e(8, 2, 3, 1.4, 'r'); d.p('y', 8, 1); d.r(4, 9, 8, 7, 'g'); d.p('y', 5, 10, 8, 11, 11, 10); d.p('k', 7, 6, 9, 6, 8, 8); d.p('w', 5, 8, 11, 8); }, SC);
add(G, C, 'in-company', 'Công ty Đông Ấn và đế quốc Anh', 'East India Company and the British Raj', 'Bắt đầu mở rộng quyền lực sau trận Plassey năm 1757, rồi Anh cai trị trực tiếp sau 1858.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.r(3, 9, 10, 3, 'N'); d.l(6, 9, 6, 2, 'n'); d.l(10, 9, 10, 3, 'n'); d.r(3, 2, 7, 5, 'w'); d.r(10, 3, 4, 4, 'W'); d.p('r', 4, 3, 5, 3, 11, 4); d.p('b', 3, 3); d.p('w', 1, 14, 12, 15); }, SC);
add(G, C, 'in-saltmarch', 'Phong trào độc lập', 'The independence movement', 'Với các cuộc bất bạo động, trong đó có cuộc đi bộ muối năm 1930 của Gandhi.',
  d => { d.bg('u'); d.r(0, 12, 16, 4, 'y'); for (const x of [2, 5, 8, 11, 14]) { d.e(x, 6, 1.2, 1.2, 's'); d.r(x - 1, 8, 3, 4, 'w'); } d.l(8, 6, 8, 2, 'N'); d.r(8, 1, 3, 2, '#ff9933'); d.r(8, 3, 3, 1, 'w'); d.p('g', 10, 4); d.p('w', 1, 14, 6, 15, 12, 14); }, SC);
add(G, C, 'in-1947', 'Độc lập và chia cắt (1947)', 'Independence and Partition (1947)', 'Ấn Độ độc lập ngày 15 tháng 8, đồng thời phân chia thành Ấn Độ và Pakistan, kèm theo làn sóng di cư và bạo lực lớn.',
  d => { d.bg('w'); d.r(0, 0, 16, 5, '#ff9933'); d.r(0, 11, 16, 5, '#138808'); d.e(8, 8, 2.6, 2.6, 'B'); d.e(8, 8, 1.6, 1.6, 'w'); d.p('B', 8, 6, 8, 10, 6, 8, 10, 8); d.l(1, 5, 14, 11, 'k'); }, SC);
add(G, C, 'in-constitution', 'Hiến pháp năm 1950', 'The Constitution of 1950', 'Ấn Độ trở thành nước cộng hòa, B. R. Ambedkar là chủ tịch ủy ban soạn thảo.',
  d => { d.bg('e'); d.r(3, 2, 10, 12, 'u'); d.r(3, 2, 10, 1, 'Y'); d.p('k', 5, 4, 10, 4, 5, 6, 10, 6, 5, 8, 9, 8); d.e(8, 11, 1.8, 1.8, 'B'); d.p('w', 8, 11); d.p('r', 12, 13); d.p('Y', 3, 14, 12, 14); }, SC);

// ----- Người nổi tiếng -----
add(G, E, 'in-ashoka', 'Ashoka', 'Ashoka', 'Vua Maurya, biểu tượng của hòa bình sau chiến tranh.',
  d => { person(d, 'G', 'k', 'y'); d.r(4, 1, 8, 2, 'r'); d.p('y', 8, 0); d.p('o', 4, 12, 11, 12); d.p('w', 6, 10, 9, 10); }, SC);
add(G, E, 'in-buddha', 'Đức Phật Thích Ca (Siddhartha Gautama)', 'The Buddha (Siddhartha Gautama)', 'Người sáng lập Phật giáo, sinh ra ở vùng nay là Nepal và giác ngộ ở Bodh Gaya.',
  d => { d.bg('o'); d.e(8, 6, 3, 3.2, 's'); d.p('k', 8, 2, 6, 3, 8, 3, 10, 3); d.p('r', 8, 7); d.r(4, 9, 8, 5, 'y'); d.e(8, 14, 6, 1.6, 'Y'); d.p('k', 7, 6, 9, 6); d.p('w', 8, 1); }, SC);
add(G, E, 'in-akbar', 'Akbar', 'Akbar', 'Hoàng đế Mughal nổi tiếng với chính sách khoan dung tôn giáo.',
  d => { person(d, 'R', 'k', 'g'); d.r(4, 1, 8, 3, 'w'); d.e(8, 1, 3, 1.4, 'w'); d.p('y', 8, 0); d.p('k', 6, 8, 10, 8); d.p('y', 6, 11, 9, 12); }, SC);
add(G, E, 'in-gandhi', 'Mahatma Gandhi', 'Mahatma Gandhi', 'Lãnh tụ phong trào độc lập theo con đường bất bạo động.',
  d => { person(d, 'u', 'W', 'w'); d.r(4, 1, 8, 1, 'a'); d.p('a', 5, 7, 10, 7); d.p('k', 6, 6, 10, 6); d.p('y', 13, 3, 13, 12); d.e(13, 13, 1.4, 1.4, 'n'); d.p('w', 5, 14, 10, 14); }, SC);
add(G, E, 'in-nehruman', 'Jawaharlal Nehru', 'Jawaharlal Nehru', 'Thủ tướng đầu tiên của Ấn Độ độc lập.',
  d => { person(d, 'c', 'k', 'w'); d.r(4, 1, 8, 2, 'w'); d.p('r', 6, 10); d.r(4, 10, 8, 6, 'W'); d.p('w', 8, 10); d.p('r', 5, 11); }, SC);
add(G, E, 'in-ambedkar', 'B. R. Ambedkar', 'B. R. Ambedkar', 'Luật sư, nhà cải cách xã hội, được xem là kiến trúc sư của Hiến pháp.',
  d => { person(d, 'B', 'k', 'b', 'S'); d.p('a', 6, 6, 10, 6); d.r(7, 10, 2, 6, 'w'); d.p('r', 8, 11); d.r(11, 11, 4, 4, 'e'); d.p('k', 12, 12, 13, 13); }, SC);
add(G, E, 'in-tagore', 'Rabindranath Tagore', 'Rabindranath Tagore', 'Nhà thơ, nhạc sĩ, đoạt giải Nobel Văn học năm 1913.',
  d => { person(d, 'e', 'W', 'W'); d.r(4, 2, 8, 3, 'W'); d.r(5, 8, 6, 5, 'W'); d.p('k', 6, 6, 10, 6); d.p('a', 5, 8, 6, 10, 10, 10, 11, 8); d.r(11, 11, 3, 4, 'R'); d.p('y', 12, 12); }, SC);
add(G, E, 'in-ramanujan', 'Srinivasa Ramanujan', 'Srinivasa Ramanujan', 'Nhà toán học tự học có nhiều công thức nổi tiếng.',
  d => { person(d, 'K', 'k', 'w', 'S'); d.p('w', 12, 2, 13, 4, 11, 6, 3, 3); d.p('l', 2, 12, 5, 14, 13, 12); d.p('y', 3, 4, 13, 9); d.r(10, 11, 5, 4, 'e'); d.p('k', 11, 12, 13, 13); }, SC);
add(G, E, 'in-raman', 'C. V. Raman', 'C. V. Raman', 'Nhà vật lý đoạt giải Nobel Vật lý năm 1930 về hiệu ứng tán xạ ánh sáng.',
  d => { person(d, 'k', 'k', 'w', 'S'); d.r(4, 1, 8, 2, 'r'); d.p('r', 3, 7, 4, 8, 3, 9); d.l(1, 12, 6, 13, 'r'); d.l(1, 12, 6, 12, 'g'); d.l(1, 12, 6, 11, 'b'); d.p('y', 12, 11, 13, 10); }, SC);
add(G, E, 'in-rayshankar', 'Satyajit Ray và Ravi Shankar', 'Satyajit Ray and Ravi Shankar', 'Đạo diễn điện ảnh và nhạc sĩ sitar mang nghệ thuật Ấn Độ ra thế giới.',
  d => { d.bg('e'); d.e(4, 5, 2.2, 2.4, 's'); d.r(2, 8, 5, 6, 'a'); d.p('k', 3, 5, 5, 5); d.e(12, 5, 2.2, 2.4, 'S'); d.r(10, 8, 5, 6, 'y'); d.l(9, 14, 15, 8, 'n'); d.p('k', 11, 5, 13, 5); d.p('N', 2, 3, 6, 3); }, SC);
add(G, E, 'in-tendulkar', 'Sachin Tendulkar', 'Sachin Tendulkar', 'Cầu thủ cricket huyền thoại, được nhiều người gọi là "thần cricket".',
  d => { person(d, 'b', 'k', 'b', 'S'); d.r(4, 1, 8, 3, 'B'); d.r(3, 3, 10, 1, 'B'); d.l(13, 15, 12, 6, 'n'); d.l(14, 15, 13, 6, 'N'); d.e(2, 13, 1.4, 1.4, 'r'); d.p('w', 5, 11, 10, 12); }, SC);
add(G, E, 'in-lata', 'Lata Mangeshkar', 'Lata Mangeshkar', 'Ca sĩ lồng tiếng (playback) nổi tiếng nhất của nhạc phim Bollywood.',
  d => { person(d, 'p', 'k', 'w'); d.r(3, 3, 2, 8, 'k'); d.r(11, 3, 2, 8, 'k'); d.p('r', 8, 8); d.p('y', 4, 12, 11, 12); d.p('p', 2, 2, 13, 2); d.p('k', 12, 13, 14, 15); }, SC);
