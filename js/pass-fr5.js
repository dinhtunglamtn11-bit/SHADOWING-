import { add, SC, setCC } from './pass-kit.js';
setCC('fr');
// Pháp · Nhóm 5: Con vật, linh vật, tín ngưỡng, lịch sử và người nổi tiếng
const G = 5, A = 'Con vật và linh vật', B = 'Tín ngưỡng', C = 'Lịch sử', E = 'Người nổi tiếng';
const PET = { use: 'pet' }, H = { use: 'hold' };
const person = (d, bg, hair, body, hat) => { d.bg(bg); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 2, hair); d.r(4, 9, 8, 7, body); d.p('k', 7, 6, 9, 6); d.p('r', 8, 8); if (hat) d.r(4, 1, 8, 1, hat); };

// ----- Con vật và linh vật -----
add(G, A, 'fr-coq', 'Gà trống Gaulois (coq gaulois)', 'Gallic rooster (coq gaulois)', 'Biểu tượng không chính thức của nước Pháp, bắt nguồn từ chơi chữ La-tinh giữa "gallus" nghĩa là gà trống và "Gallus" nghĩa là người Gaul; đội tuyển thể thao Pháp hay dùng hình này.',
  d => { d.bg('b'); d.e(7, 10, 4.4, 3.6, 'r'); d.e(11, 6, 2.4, 2.4, 'r'); d.p('R', 10, 2, 11, 2, 12, 2, 11, 3); d.p('y', 14, 6, 15, 6); d.p('k', 11, 6); d.l(2, 6, 4, 10, 'b'); d.l(1, 8, 4, 11, 'w'); d.l(2, 4, 5, 9, 'r'); d.r(6, 13, 1, 2, 'y'); d.r(9, 13, 1, 2, 'y'); d.p('w', 6, 9, 8, 9); }, PET);
add(G, A, 'fr-marianne', 'Marianne', 'Marianne', 'Hình tượng một phụ nữ đội mũ Phrygie đỏ, nhân cách hóa Cộng hòa Pháp, có mặt trên tem và công sở.',
  d => { d.bg('b'); d.e(8, 8, 3.4, 3.8, 's'); d.r(5, 3, 6, 3, 'r'); d.r(10, 2, 3, 3, 'r'); d.r(5, 5, 6, 1, 'R'); d.p('n', 4, 7, 4, 9, 12, 7, 12, 9); d.p('k', 7, 8, 9, 8); d.p('r', 8, 10); d.r(4, 12, 8, 4, 'w'); d.p('r', 4, 14, 11, 14); }, SC);
add(G, A, 'fr-fleurdelis', 'Hoa bách hợp (fleur-de-lis)', 'Fleur-de-lis', 'Biểu tượng hoa của hoàng gia Pháp thời quân chủ, vẫn xuất hiện trên nhiều công trình cổ.',
  d => { d.bg('B'); d.e(8, 6, 1.6, 4, 'y'); d.e(4, 8, 1.8, 3, 'y'); d.e(12, 8, 1.8, 3, 'y'); d.r(5, 11, 6, 1, 'Y'); d.r(7, 12, 2, 3, 'y'); d.l(4, 11, 3, 14, 'y'); d.l(12, 11, 13, 14, 'y'); d.p('u', 8, 4, 8, 7); }, SC);
add(G, A, 'fr-tricolore', 'Cờ tam tài (tricolore)', 'The tricolore flag', 'Ba dải xanh, trắng, đỏ, được dùng chính thức từ thời Cách mạng.',
  d => { d.bg('e'); d.r(0, 2, 16, 12, 'w'); d.r(0, 2, 5, 12, 'b'); d.r(11, 2, 5, 12, 'r'); d.r(0, 14, 16, 1, 'a'); d.r(0, 1, 16, 1, 'N'); }, SC);
add(G, A, 'fr-camargue', 'Ngựa Camargue', 'Camargue horse', 'Giống ngựa trắng nhỏ sống bán hoang dã ở vùng đầm lầy Camargue phía nam.',
  d => { d.bg('c'); d.e(7, 9, 5, 3, 'w'); d.e(12, 6, 2.2, 2.6, 'w'); d.p('a', 13, 4, 14, 5, 12, 3); d.p('k', 12, 6); d.l(2, 8, 0, 12, 'l'); d.r(4, 11, 1, 4, 'l'); d.r(10, 11, 1, 4, 'l'); d.r(11, 9, 1, 2, 'a'); d.l(12, 3, 9, 6, 'l'); d.p('e', 6, 8, 8, 9); d.r(0, 14, 16, 2, 'C'); }, PET);
add(G, A, 'fr-cattle', 'Bò Charolais và gà Bresse', 'Charolais cattle and Bresse chicken', 'Hai giống vật nuôi nổi tiếng, gà Bresse có nhãn xuất xứ riêng cho thịt.',
  d => { d.bg('g'); d.e(5, 9, 4, 3, 'w'); d.e(9, 7, 2, 2, 'w'); d.p('w', 8, 5, 10, 5); d.p('k', 9, 7); d.r(3, 11, 1, 3, 'a'); d.r(6, 11, 1, 3, 'a'); d.e(13, 11, 2, 2, 'w'); d.p('r', 13, 8, 14, 9); d.p('y', 15, 10); d.r(12, 13, 1, 2, 'b'); d.r(14, 13, 1, 2, 'r'); d.r(0, 14, 16, 2, 'G'); }, PET);
add(G, A, 'fr-poodle', 'Chó poodle và chó săn Pháp', 'Poodle and French hunting dogs', 'Poodle là giống chó mang tên gắn với nước Pháp dù có nguồn gốc nhiều ý kiến, còn các giống chó săn dùng cho săn bắn truyền thống.',
  d => { d.bg('p'); d.e(8, 8, 4, 4, 'w'); d.e(8, 3.6, 2.4, 2.4, 'w'); d.e(4, 6, 2.4, 3, 'e'); d.e(12, 6, 2.4, 3, 'e'); d.e(8, 6, 2.4, 2.4, 'l'); d.p('k', 7, 6, 9, 6, 8, 8); d.e(8, 3, 1.6, 1.6, 'w'); d.r(5, 12, 2, 3, 'l'); d.r(9, 12, 2, 3, 'l'); d.e(5, 15, 1.6, 1, 'w'); d.e(11, 15, 1.6, 1, 'w'); }, PET);
add(G, A, 'fr-goose', 'Ngỗng và vịt vùng Tây Nam', 'Geese and ducks of the southwest', 'Gắn với nghề làm gan béo foie gras của vùng Gascogne và Périgord.',
  d => { d.bg('c'); d.e(7, 11, 5, 3, 'w'); d.l(10, 8, 11, 3, 'w'); d.l(11, 8, 12, 3, 'w'); d.e(12, 2.5, 1.6, 1.4, 'w'); d.p('o', 14, 3, 15, 3); d.p('k', 12, 2); d.l(3, 10, 1, 8, 'l'); d.p('o', 6, 14, 8, 14); d.r(0, 14, 16, 2, 'C'); }, PET);
add(G, A, 'fr-wildlife', 'Sói và gấu vùng núi', 'Wolves and bears of the mountains', 'Những loài thú đã từng gần như biến mất nhưng được bảo vệ trở lại ở dãy Alps và Pyrénées.',
  d => { d.bg('A'); d.tri(2, 7, 12, 8, 'N'); d.e(8, 8, 4.6, 4.2, 'N'); d.e(4, 4, 1.8, 1.8, 'N'); d.e(12, 4, 1.8, 1.8, 'N'); d.e(8, 10, 2.4, 2, 'n'); d.p('k', 6, 7, 10, 7, 8, 9); d.p('w', 4, 4, 12, 4); d.p('l', 2, 2, 13, 1); }, PET);
add(G, A, 'fr-flamingo', 'Chim hồng hạc Camargue', 'Camargue flamingos', 'Đàn hồng hạc làm tổ ở đầm lầy phía nam là cảnh quen thuộc của vùng này.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'C'); d.e(7, 8, 3.4, 2.6, 'p'); d.l(10, 7, 12, 3, 'p'); d.e(12.5, 2.6, 1.4, 1.2, 'p'); d.p('k', 14, 3, 15, 4); d.p('k', 13, 2); d.l(6, 10, 6, 14, 'P'); d.l(8, 10, 8, 14, 'P'); d.p('P', 5, 8, 7, 7); d.p('w', 3, 15, 11, 15); }, PET);

// ----- Tín ngưỡng -----
add(G, B, 'fr-catholic', 'Công giáo', 'Catholicism', 'Tôn giáo truyền thống lâu đời nhất, với hệ thống nhà thờ và tu viện dày đặc trên khắp nước.',
  d => { d.bg('B'); d.r(7, 2, 2, 12, 'y'); d.r(4, 5, 8, 2, 'y'); d.p('u', 8, 4, 8, 8); d.p('w', 2, 2, 13, 3, 3, 12, 13, 12); d.r(5, 14, 6, 1, 'Y'); }, SC);
add(G, B, 'fr-laicite', 'Nguyên tắc laïcité', 'The principle of laïcité', 'Nguyên tắc tách nhà thờ khỏi nhà nước, xác lập bằng luật năm 1905, nhà nước không ưu tiên tôn giáo nào.',
  d => { d.bg('e'); d.r(7, 2, 2, 12, 'a'); d.r(3, 3, 10, 1, 'a'); d.l(4, 4, 3, 8, 'a'); d.l(12, 4, 13, 8, 'a'); d.r(2, 8, 4, 1, 'y'); d.r(10, 8, 4, 1, 'y'); d.r(5, 14, 6, 1, 'a'); d.p('b', 8, 1); d.p('r', 8, 15); }, SC);
add(G, B, 'fr-protestant', 'Tin Lành', 'Protestantism', 'Cộng đồng nhỏ hơn, tập trung ở Alsace và vùng Cévennes.',
  d => { d.bg('e'); d.r(3, 3, 10, 11, 'k'); d.r(4, 4, 8, 9, 'N'); d.r(4, 4, 8, 1, 'n'); d.r(5, 6, 6, 1, 'w'); d.r(5, 8, 6, 1, 'w'); d.r(5, 10, 5, 1, 'w'); d.p('y', 8, 2); d.r(7, 0, 2, 2, 'y'); }, H);
add(G, B, 'fr-islam', 'Hồi giáo', 'Islam', 'Cộng đồng lớn thứ hai, phần lớn là người có gốc từ Bắc Phi, gồm nhiều thế hệ đã sinh ra ở Pháp.',
  d => { d.bg('G'); d.e(8, 6, 4.6, 4.6, 'y'); d.e(10, 6, 3.6, 3.6, 'G'); d.p('y', 12, 6); d.p('y', 7, 2); d.r(4, 11, 8, 4, 'w'); d.r(4, 11, 8, 1, 'l'); d.p('G', 7, 13); d.p('w', 2, 2, 14, 3); }, SC);
add(G, B, 'fr-judaism', 'Do Thái giáo', 'Judaism', 'Cộng đồng Do Thái ở Pháp thuộc loại đông nhất châu Âu, tập trung ở Paris.',
  d => { d.bg('b'); d.tri(3, 2, 10, 7, 'w'); d.dtri(3, 6, 10, 7, 'w'); d.tri(4, 4, 8, 5, 'b'); d.dtri(4, 6, 8, 5, 'b'); d.tri(5, 5, 6, 4, 'w'); d.dtri(5, 7, 6, 4, 'w'); }, SC);
add(G, B, 'fr-buddhism', 'Phật giáo', 'Buddhism', 'Cộng đồng nhỏ nhưng ngày càng nhiều, có thêm các chùa của người gốc Á, trong đó có người Việt.',
  d => { d.bg('o'); d.e(8, 4, 2.8, 3, 's'); d.p('k', 8, 1, 7, 2, 9, 2); d.r(5, 7, 6, 4, 'r'); d.e(8, 12, 6, 2.6, 'y'); d.e(8, 12, 4.4, 1.8, 'Y'); d.p('k', 7, 4, 9, 4); d.p('y', 8, 0); }, SC);
add(G, B, 'fr-lourdes', 'Hành hương Lourdes', 'Pilgrimage to Lourdes', 'Nơi hàng triệu tín đồ đến mỗi năm, theo truyền thống bắt đầu từ lần hiện ra của Đức Mẹ với một cô bé năm 1858.',
  d => { d.bg('A'); d.r(0, 10, 16, 6, 'a'); d.e(8, 8, 4, 5, 'w'); d.e(8, 8, 3, 4, 'k'); d.e(8, 6, 1.4, 1.6, 's'); d.r(7, 7, 2, 5, 'w'); d.r(7, 9, 2, 1, 'b'); d.p('y', 8, 3, 5, 5, 11, 5); d.p('w', 3, 14, 12, 14); d.p('c', 1, 8, 14, 9); }, SC);
add(G, B, 'fr-compostela', 'Hành hương Compostela', 'Camino de Santiago', 'Tuyến đường hành hương Santiago de Compostela có nhiều chặng đi qua nước Pháp.',
  d => { d.bg('u'); d.r(0, 12, 16, 4, 'g'); d.fan(8, 10, 6, 'e'); for (let a = 0; a < 6; a++) { const t = 3.14 * (0.1 + a * 0.16); d.l(8, 10, 8 - Math.round(Math.cos(t) * 6), 10 - Math.round(Math.sin(t) * 6), 'W'); } d.r(7, 10, 2, 3, 'N'); d.p('y', 8, 12); d.p('b', 2, 14, 13, 14); }, SC);
add(G, B, 'fr-chartres', 'Chartres và Vézelay', 'Chartres and Vézelay', 'Hai thánh địa trung cổ nổi tiếng, nơi đón khách hành hương nhiều thế kỷ.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(3, 6, 4, 8, 'W'); d.tri(2, 2, 6, 4, 'a'); d.r(10, 8, 4, 6, 'e'); d.tri(9, 5, 6, 3, 'A'); d.e(5, 9, 1.2, 1.6, 'b'); d.r(4, 11, 2, 3, 'k'); d.r(11, 11, 2, 3, 'k'); d.p('y', 5, 1); }, SC);
add(G, B, 'fr-reformation', 'Cải cách tôn giáo và Chiến tranh Tôn giáo', 'Reformation and the Wars of Religion', 'Thế kỷ mười sáu, xung đột giữa Công giáo và Tin Lành tạo ra đêm Thánh Bartholomew năm 1572.',
  d => { d.bg('k'); d.r(2, 11, 12, 4, 'N'); d.r(7, 3, 2, 9, 'y'); d.r(4, 5, 8, 2, 'y'); d.l(3, 14, 13, 14, 'r'); d.p('r', 2, 3, 13, 2, 3, 9, 13, 8); d.p('o', 2, 4, 14, 3); d.p('w', 8, 1); }, SC);

// ----- Lịch sử -----
add(G, C, 'fr-gaul', 'Thời Gaul và La Mã', 'Gaul and Rome', 'Vùng đất xưa của người Gaul bị Julius Caesar chinh phục, tướng Vercingetorix là biểu tượng của sự kháng cự.',
  d => { d.bg('A'); d.r(0, 13, 16, 3, 'n'); d.e(8, 7, 3, 3, 's'); d.r(5, 4, 6, 2, 'a'); d.p('l', 8, 3, 8, 2); d.r(4, 9, 8, 5, 'r'); d.l(13, 2, 13, 13, 'N'); d.p('a', 13, 1, 12, 2, 14, 2); d.p('k', 7, 7, 9, 7); d.p('y', 8, 4); }, SC);
add(G, C, 'fr-clovis', 'Clovis và vương quốc Frank', 'Clovis and the Frankish kingdom', 'Vua Clovis theo đạo Công giáo khoảng năm 500, đặt nền cho vương quốc Frank, tiền thân của nước Pháp.',
  d => { d.bg('v'); d.e(8, 8, 3, 3.4, 's'); d.r(5, 2, 6, 3, 'y'); d.p('y', 5, 1, 8, 0, 10, 1); d.r(4, 10, 8, 6, 'r'); d.r(4, 10, 8, 1, 'w'); d.p('k', 7, 8, 9, 8); d.p('n', 4, 9, 11, 9); }, SC);
add(G, C, 'fr-charlemagne', 'Charlemagne', 'Charlemagne', 'Được đăng quang làm hoàng đế năm 800, thống nhất phần lớn Tây Âu.',
  d => person(d, 'B', 'u', 'r', 'y'), SC);
add(G, C, 'fr-hundredyears', 'Chiến tranh Trăm năm', 'The Hundred Years\' War', 'Cuộc xung đột kéo dài giữa Pháp và Anh từ năm 1337 đến 1453, nổi bật với nữ anh hùng Jeanne d\'Arc.',
  d => { d.bg('A'); d.l(3, 14, 3, 3, 'N'); d.r(3, 3, 4, 3, 'b'); d.p('y', 4, 4, 5, 4); d.l(12, 14, 12, 3, 'N'); d.r(12, 3, 3, 3, 'r'); d.p('y', 13, 4); d.l(5, 13, 11, 7, 'l'); d.l(11, 13, 5, 7, 'l'); d.r(0, 14, 16, 2, 'n'); }, SC);
add(G, C, 'fr-crusades', 'Thập tự chinh và nhà thờ lớn', 'The Crusades and great cathedrals', 'Thời trung cổ là lúc xây hàng loạt nhà thờ Gothic và các lâu đài.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(3, 6, 4, 7, 'a'); d.tri(2, 3, 6, 3, 'A'); d.r(9, 5, 4, 8, 'a'); d.tri(8, 2, 6, 3, 'A'); d.r(6, 9, 4, 4, 'k'); d.p('r', 5, 8, 11, 7); d.p('w', 4, 9, 11, 9); d.p('y', 5, 2, 11, 1); }, SC);
add(G, C, 'fr-louis14', 'Louis XIV, vua Mặt Trời', 'Louis XIV, the Sun King', 'Trị vì hơn bảy mươi năm, xây Versailles và biến Pháp thành cường quốc.',
  d => { d.bg('u'); d.e(8, 8, 3.6, 3.6, 's'); d.r(4, 2, 8, 4, 'n'); d.p('n', 3, 6, 4, 8, 12, 6, 11, 8); d.r(5, 1, 6, 1, 'y'); d.r(4, 11, 8, 5, 'b'); d.r(4, 11, 8, 1, 'w'); d.p('k', 7, 8, 9, 8); d.p('y', 8, 0, 2, 2, 14, 2); }, SC);
add(G, C, 'fr-enlightenment', 'Thời Khai sáng', 'The Enlightenment', 'Voltaire, Rousseau, Diderot và Montesquieu truyền bá tư tưởng về tự do và lý trí.',
  d => { d.bg('B'); d.e(8, 6, 4, 4, 'y'); d.e(8, 6, 3, 3, 'u'); for (let i = 0; i < 8; i++) { const a = i * 0.785; d.l(8, 6, Math.round(8 + Math.cos(a) * 7), Math.round(6 + Math.sin(a) * 6), 'y'); } d.e(8, 6, 3, 3, 'u'); d.r(5, 12, 6, 3, 'N'); d.p('w', 6, 13, 9, 13); }, SC);
add(G, C, 'fr-revolution', 'Cách mạng Pháp 1789', 'The French Revolution (1789)', 'Chiếm ngục Bastille mở màn, rồi Tuyên ngôn Nhân quyền và Dân quyền được ban hành, chấm dứt chế độ quân chủ chuyên chế.',
  d => { d.bg('A'); d.r(2, 5, 12, 9, 'a'); for (let x = 2; x < 14; x += 3) d.r(x, 3, 2, 2, 'a'); d.r(2, 5, 12, 1, 'l'); d.r(6, 9, 4, 5, 'k'); d.p('k', 4, 7, 11, 7); d.l(1, 14, 1, 1, 'N'); d.r(1, 1, 2, 2, 'b'); d.r(3, 1, 1, 2, 'w'); d.r(4, 1, 1, 2, 'r'); d.p('o', 13, 2, 14, 4); }, SC);
add(G, C, 'fr-napoleonhist', 'Napoléon Bonaparte (hoàng đế 1804)', 'Napoléon Bonaparte (emperor, 1804)', 'Lên ngôi hoàng đế năm 1804, ban hành Bộ luật Dân sự Napoléon và mở rộng đế quốc khắp châu Âu.',
  d => { d.bg('b'); d.e(8, 8, 3, 3.4, 's'); d.r(3, 3, 10, 3, 'k'); d.p('k', 2, 5, 13, 5); d.p('y', 8, 4); d.r(4, 11, 8, 5, 'B'); d.r(4, 11, 8, 1, 'y'); d.p('k', 7, 8, 9, 8); d.p('w', 6, 12, 10, 12); d.p('r', 3, 12, 12, 12); }, SC);
add(G, C, 'fr-republic3', 'Công xã Paris và Cộng hòa thứ ba', 'Paris Commune and the Third Republic', 'Các cuộc biến động sau năm 1870 hình thành nền cộng hòa kéo dài đến Thế chiến thứ hai.',
  d => { d.bg('R'); d.l(2, 14, 2, 3, 'N'); d.r(2, 3, 8, 4, 'r'); d.r(2, 3, 8, 1, 'w'); d.r(3, 9, 10, 5, 'a'); d.r(3, 9, 10, 1, 'l'); d.p('k', 5, 11, 8, 11, 11, 11); d.p('y', 13, 3, 14, 2); }, SC);
add(G, C, 'fr-worldwars', 'Hai cuộc thế chiến', 'The two World Wars', 'Pháp là chiến trường lớn của Thế chiến thứ nhất, và bị Đức chiếm đóng trong Thế chiến thứ hai; tướng de Gaulle lãnh đạo phong trào Nước Pháp Tự do.',
  d => { d.bg('d'); d.r(0, 12, 16, 4, 'N'); d.l(4, 12, 4, 6, 'a'); d.l(4, 6, 8, 3, 'a'); d.e(8, 5, 2.4, 1.6, 'A'); d.p('r', 1, 4, 14, 3); d.p('y', 12, 2); d.r(10, 9, 4, 3, 'G'); d.p('k', 11, 10, 13, 10); d.p('w', 2, 9, 14, 7); }, SC);
add(G, C, 'fr-fifthrepublic', 'Cộng hòa thứ năm và Liên minh châu Âu', 'The Fifth Republic and the EU', 'Hiến pháp hiện hành ban hành năm 1958, và Pháp là thành viên sáng lập của Liên minh châu Âu (EU, European Union).',
  d => { d.bg('b'); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.28; d.p('y', 8 + Math.cos(a) * 5.4, 8 + Math.sin(a) * 5.4); d.p('y', 8 + Math.cos(a) * 5.4 + 1, 8 + Math.sin(a) * 5.4); } d.r(6, 6, 4, 4, 'w'); d.p('r', 8, 8); }, SC);
add(G, C, 'fr-indochina', 'Quan hệ lịch sử với Việt Nam', 'Historical ties with Vietnam', 'Pháp đô hộ Đông Dương từ nửa sau thế kỷ mười chín đến năm 1954, để lại dấu ấn trong kiến trúc, bánh mì và chữ viết.',
  d => { d.bg('e'); d.r(0, 0, 8, 16, 'b'); d.r(8, 0, 8, 16, 'r'); d.r(5, 0, 6, 16, 'w'); d.e(8, 8, 3, 3, 'y'); d.p('r', 8, 6, 7, 8, 9, 8, 8, 10); }, SC);

// ----- Người nổi tiếng -----
add(G, E, 'fr-jeanne', 'Jeanne d\'Arc', 'Joan of Arc', 'Cô gái nông dân dẫn quân Pháp chống Anh, bị thiêu năm 1431 và về sau được phong thánh.',
  d => { d.bg('A'); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 3, 'N'); d.p('n', 4, 5, 4, 8, 12, 5, 12, 8); d.r(4, 9, 8, 7, 'l'); d.r(4, 9, 8, 1, 'a'); d.p('k', 7, 6, 9, 6); d.l(14, 15, 14, 2, 'N'); d.r(12, 2, 3, 3, 'w'); d.p('b', 12, 2, 12, 4); d.p('r', 14, 2, 14, 4); }, SC);
add(G, E, 'fr-louis14p', 'Louis XIV', 'Louis XIV', 'Vị vua trị vì lâu nhất lịch sử châu Âu, tượng trưng cho quyền lực tuyệt đối.',
  d => person(d, 'u', 'n', 'b', 'y'), SC);
add(G, E, 'fr-napoleon', 'Napoléon Bonaparte', 'Napoléon Bonaparte', 'Vị tướng trở thành hoàng đế, để lại hệ thống luật pháp còn ảnh hưởng đến nhiều nước.',
  d => { person(d, 'B', 'k', 'B', 'k'); d.r(3, 1, 10, 2, 'k'); d.p('y', 8, 2); d.p('w', 6, 12, 10, 12); }, SC);
add(G, E, 'fr-degaulle', 'Charles de Gaulle', 'Charles de Gaulle', 'Lãnh đạo kháng chiến và là tổng thống đầu tiên của nền Cộng hòa thứ năm.',
  d => person(d, 'b', 'k', 'G', 'G'), SC);
add(G, E, 'fr-hugo', 'Victor Hugo', 'Victor Hugo', 'Nhà văn của "Những người khốn khổ" và "Nhà thờ Đức Bà Paris".',
  d => { person(d, 'v', 'w', 'k'); d.r(5, 10, 6, 3, 'w'); d.r(11, 11, 3, 4, 'r'); d.r(11, 11, 3, 1, 'y'); }, SC);
add(G, E, 'fr-voltaire', 'Voltaire và Jean-Jacques Rousseau', 'Voltaire and Jean-Jacques Rousseau', 'Hai nhà tư tưởng Khai sáng ảnh hưởng lớn đến tư duy chính trị hiện đại.',
  d => { d.bg('e'); d.e(5, 6, 2.4, 2.8, 's'); d.r(3, 3, 5, 2, 'w'); d.r(2, 9, 6, 6, 'r'); d.e(11, 6, 2.4, 2.8, 's'); d.r(9, 3, 5, 2, 'n'); d.r(9, 9, 6, 6, 'b'); d.p('k', 4, 6, 6, 6, 10, 6, 12, 6); d.p('w', 3, 9, 10, 9); }, SC);
add(G, E, 'fr-curie', 'Marie Curie', 'Marie Curie', 'Nhà khoa học gốc Ba Lan sống ở Pháp, hai lần đoạt giải Nobel ở hai ngành khác nhau.',
  d => { d.bg('G'); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 3, 'n'); d.r(4, 9, 8, 7, 'w'); d.p('k', 7, 6, 9, 6); d.r(11, 10, 3, 4, 'l'); d.r(12, 9, 1, 1, 'l'); d.p('g', 12, 12, 13, 11); d.p('y', 14, 8, 2, 3); }, SC);
add(G, E, 'fr-pasteur', 'Louis Pasteur', 'Louis Pasteur', 'Nhà khoa học tìm ra vắc-xin và phương pháp khử trùng sữa mang tên ông.',
  d => { d.bg('l'); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 3, 'w'); d.r(5, 7, 6, 3, 'w'); d.r(4, 10, 8, 6, 'd'); d.p('k', 7, 6, 9, 6); d.r(11, 10, 3, 5, 'c'); d.r(11, 10, 3, 1, 'w'); d.p('r', 12, 13); }, SC);
add(G, E, 'fr-eiffelman', 'Gustave Eiffel', 'Gustave Eiffel', 'Kỹ sư xây dựng tháp Eiffel và khung thép của tượng Nữ thần Tự do.',
  d => { person(d, 'c', 'n', 'N'); d.r(5, 7, 6, 2, 'w'); d.l(13, 14, 11, 4, 'a'); d.l(13, 14, 15, 4, 'a'); d.r(11, 9, 4, 1, 'a'); }, SC);
add(G, E, 'fr-artists', 'Claude Monet, Auguste Rodin, Pablo Picasso', 'Claude Monet, Auguste Rodin, Pablo Picasso', 'Các nghệ sĩ lớn làm việc ở Pháp, từ hội họa đến điêu khắc.',
  d => { d.bg('e'); d.r(2, 2, 8, 9, 'W'); d.r(2, 2, 8, 1, 'N'); d.r(2, 10, 8, 1, 'N'); d.e(6, 6, 2.4, 2.4, 'p'); d.e(6, 6, 1.2, 1.2, 'y'); d.p('g', 3, 9, 8, 8); d.e(13, 10, 2, 3, 'a'); d.e(13, 7, 1.6, 1.8, 'l'); d.r(11, 13, 5, 2, 'A'); d.l(12, 3, 14, 6, 'N'); d.p('r', 12, 2); }, H);
add(G, E, 'fr-designers', 'Coco Chanel và Christian Dior', 'Coco Chanel and Christian Dior', 'Hai nhà thiết kế thay đổi cách phụ nữ ăn mặc trong thế kỷ hai mươi.',
  d => { d.bg('v'); d.e(5, 4, 2, 2, 's'); d.r(3, 6, 4, 9, 'k'); d.r(3, 6, 4, 1, 'w'); d.p('w', 4, 3, 6, 3, 5, 9); d.e(11, 4, 2, 2, 's'); d.tri(8, 7, 7, 8, 'w'); d.r(10, 6, 3, 2, 'w'); d.p('k', 5, 5, 10, 5, 12, 5); d.p('y', 5, 8, 11, 9); }, SC);
add(G, E, 'fr-piaf', 'Édith Piaf', 'Édith Piaf', 'Ca sĩ với những bài hát như "La Vie en rose", biểu tượng của chanson Pháp.',
  d => { d.bg('k'); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 3, 'n'); d.r(4, 9, 8, 7, 'k'); d.p('k', 7, 6, 9, 6); d.p('r', 8, 8); d.r(5, 9, 6, 1, 'r'); d.p('w', 3, 3, 13, 2, 2, 12, 14, 11); d.p('p', 12, 14); }, SC);
add(G, E, 'fr-saintex', 'Antoine de Saint-Exupéry', 'Antoine de Saint-Exupéry', 'Tác giả của "Hoàng tử bé", cuốn sách Pháp được dịch ra nhiều thứ tiếng nhất.',
  d => { d.bg('B'); d.e(5, 4, 1.8, 1.8, 'y'); d.r(3, 6, 4, 6, 'g'); d.p('y', 2, 2, 7, 1, 12, 3, 13, 8); d.l(1, 13, 14, 13, 'u'); d.e(11, 11, 2, 2, 'o'); d.e(11, 11, 1, 1, 'y'); d.p('w', 5, 3); d.p('r', 3, 8, 6, 8); d.e(13, 4, 1.4, 1.4, 'y'); }, SC);
add(G, E, 'fr-footballers', 'Zinedine Zidane và Kylian Mbappé', 'Zinedine Zidane and Kylian Mbappé', 'Hai cầu thủ bóng đá nổi tiếng của hai thế hệ, đều dẫn đội tuyển Pháp lên ngôi vô địch.',
  d => { d.bg('g'); d.e(5, 5, 2, 2.2, 's'); d.r(3, 8, 4, 6, 'b'); d.e(11, 5, 2, 2.2, 's'); d.r(9, 8, 4, 6, 'b'); d.p('k', 4, 4, 5, 4, 10, 4, 11, 4); d.p('w', 4, 10, 10, 10); d.p('r', 5, 12, 11, 12); d.e(8, 14, 1.6, 1.6, 'w'); d.p('y', 8, 1, 7, 2); }, SC);
