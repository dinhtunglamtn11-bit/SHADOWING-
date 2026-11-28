import { theme, frame, title, fx } from './pass-sh4.js';
// Cửa hàng trang trí · đợt 3: thêm 14 nền, 11 khung, 9 hiệu ứng, 24 danh hiệu (CSS nền / khung ở exnews.css, điều kiện danh hiệu ở titles.js)

// ----- Nền Passport (14) -----
const T = (v, vi, en, note, a, b, c1, c2, price) => theme('sh-n-th-' + v, v, vi, en, note, a, b, [[2, 2, c1], [11, 3, c2], [6, 6, c1], [13, 9, c1], [3, 11, c2], [9, 13, c1]], price);
T('aurora', 'Cực quang', 'Aurora', 'Dải sáng xanh tím trên trời đêm.', 0x0a2a4a, 0x2a0a4a, '#7affc0', '#c9a8ff', 360);
T('deepsea', 'Đáy biển sâu', 'Deep sea', 'Bong bóng nổi giữa làn nước tối.', 0x064a6a, 0x01101f, '#8fd3ff', '#4de0d0', 320);
T('lantern', 'Hội đèn lồng', 'Lantern festival', 'Đèn đỏ vàng thắp sáng đêm.', 0x3a0a2a, 0x12041a, '#ff6a3a', '#ffd84d', 340);
T('bamboo', 'Rừng trúc', 'Bamboo grove', 'Những thân trúc xanh thẳng tắp.', 0x2f6a3a, 0x0c2a18, '#b8e08a', '#5fb85a', 280);
T('maple', 'Lá phong đỏ', 'Maple autumn', 'Lá cam đỏ bay khắp nền.', 0x8a3a1a, 0x2a0e08, '#ff9f43', '#e8452c', 300);
T('rain', 'Đêm mưa', 'Rainy night', 'Mưa xiên qua ánh đèn.', 0x2a3a5a, 0x0a1020, '#8fd3ff', '#dfe6ff', 280);
T('circus', 'Rạp xiếc', 'Circus tent', 'Sọc đỏ vui nhộn.', 0x9a1a2a, 0x4a0a18, '#ffd84d', '#ffffff', 300);
T('chalk', 'Bảng phấn', 'Chalkboard', 'Bảng xanh rêu như lớp học.', 0x2a4a3a, 0x182e24, '#ffffff', '#ffe9a8', 260);
T('brick', 'Tường gạch', 'Brick wall', 'Gạch đỏ ấm của phố cổ.', 0x7a3a2a, 0x3a1a14, '#c9704a', '#e6c892', 260);
T('planets', 'Hệ hành tinh', 'Planets', 'Hành tinh nhiều màu trôi trong vũ trụ.', 0x140a34, 0x040212, '#ff9f43', '#8fd3ff', 380);
T('lavender', 'Cánh đồng oải hương', 'Lavender field', 'Tím dịu trải đến chân trời.', 0x6a4aa8, 0x2a1a4a, '#d9c2ff', '#ff8fc8', 300);
T('dawn', 'Bình minh trên núi', 'Mountain dawn', 'Mặt trời lên sau dãy núi.', 0xc9607a, 0x2a2a5a, '#ffd84d', '#ffb08a', 340);
T('royal', 'Nhung hoàng gia', 'Royal velvet', 'Đỏ thẫm điểm vàng.', 0x5a0a24, 0x24020e, '#ffd84d', '#c9a227', 360);
T('matrix', 'Mưa mã số', 'Code rain', 'Dòng ký tự xanh chạy dọc.', 0x041a0a, 0x000000, '#4dff7a', '#1a8a3a', 340);

// ----- Khung thẻ (11) -----
const edge = (d, top, bot, left = top, right = bot) => { d.r(0, 0, 16, 2, top); d.r(0, 14, 16, 2, bot); d.r(0, 0, 2, 16, left); d.r(14, 0, 2, 16, right); };
const F = (v, vi, en, note, draw, price) => frame('sh-n-fr-' + v, v, vi, en, note, draw, price);
F('silver', 'Khung bạc', 'Silver frame', 'Ánh bạc thanh lịch.', d => { edge(d, '#e8ecf8', '#9aa4c4'); d.p('#ffffff', 2, 0, 3, 0, 12, 15); }, 160);
F('bronze', 'Khung đồng', 'Bronze frame', 'Màu đồng cổ ấm áp.', d => { edge(d, '#c9873a', '#7a4a1a'); d.p('#e6b070', 3, 0, 9, 0); }, 140);
F('ruby', 'Khung hồng ngọc', 'Ruby frame', 'Viền đỏ gắn ngọc bốn góc.', d => { edge(d, '#a8182a', '#6a0a18'); d.p('#ff7a8a', 0, 0, 15, 0, 0, 15, 15, 15, 7, 0, 8, 15); }, 240);
F('emerald', 'Khung ngọc lục bảo', 'Emerald frame', 'Xanh ngọc viền kép.', d => { edge(d, '#1fae7a', '#0e6a4a'); d.r(3, 3, 10, 1, '#7affc0'); d.r(3, 12, 10, 1, '#7affc0'); }, 240);
F('bamboo', 'Khung trúc', 'Bamboo frame', 'Ghép từ đốt trúc.', d => { edge(d, '#8ac85a', '#5a8a2a'); for (let i = 3; i < 16; i += 5) { d.r(i, 0, 1, 2, '#2f5a1a'); d.r(i, 14, 1, 2, '#2f5a1a'); d.r(0, i, 2, 1, '#2f5a1a'); d.r(14, i, 2, 1, '#2f5a1a'); } }, 180);
F('lava', 'Khung dung nham', 'Lava frame', 'Viền nóng rực.', d => { edge(d, '#ff9f43', '#e8452c'); d.p('#ffd84d', 2, 0, 7, 1, 12, 0, 0, 5, 15, 10, 5, 15); }, 220);
F('galaxy', 'Khung thiên hà', 'Galaxy frame', 'Dải ngân hà quanh thẻ.', d => { edge(d, '#4a2a9a', '#170c3a'); d.p('#ffffff', 2, 0, 9, 1, 14, 4, 1, 11, 11, 15); d.p('#ff8fc8', 6, 0, 0, 7, 15, 13); }, 260);
F('ocean', 'Khung sóng biển', 'Wave frame', 'Sóng xanh dập dìu.', d => { edge(d, '#2f80b8', '#16456a'); for (let i = 0; i < 16; i += 4) { d.p('#cfe8ff', i, 1, i + 1, 0, i + 2, 14, i + 3, 15); } }, 190);
F('ticket', 'Khung vé tàu', 'Ticket frame', 'Mép răng cưa như tấm vé.', d => { edge(d, '#ffe9a8', '#c9a227'); for (let i = 1; i < 16; i += 3) { d.p('_', i, 0, i, 15, 0, i, 15, i); } }, 170);
F('shadow', 'Khung bóng đổ', 'Drop shadow frame', 'Nổi khối như hộp quà.', d => { edge(d, '#ffffff', '#1b1030'); }, 150);
F('aurora', 'Khung cực quang', 'Aurora frame', 'Chuyển xanh sang tím.', d => { edge(d, '#7affc0', '#a06aff', '#2ee6ff', '#c94ad8'); }, 280);

// ----- Hiệu ứng khi mua (9) -----
const X = (v, vi, en, note, draw, price) => fx('sh-n-fx-' + v, v, vi, en, note, draw, price);
X('leaves', 'Lá thu rơi', 'Falling leaves', 'Lá vàng đỏ xoay xoay.', d => { for (const [x, y, c] of [[4, 4, '#e8452c'], [11, 3, '#ff9f43'], [7, 9, '#ffd84d'], [12, 12, '#e8452c'], [3, 12, '#5fb85a']]) d.p(c, x, y, x + 1, y, x, y + 1, x - 1, y + 1, x, y - 1); }, 160);
X('music', 'Mưa nốt nhạc', 'Music notes', 'Nốt nhạc bay lên.', d => { for (const [x, y] of [[3, 5], [10, 3], [6, 11], [12, 10]]) { d.p('#8fd3ff', x, y, x, y - 1, x, y - 2, x + 1, y - 2, x - 1, y, x - 1, y + 1, x, y + 1); } }, 180);
X('food', 'Mưa món ngon', 'Food shower', 'Phở, sushi, bánh kem rơi.', d => { d.e(5, 5, 2.4, 2.4, '#ff9f43'); d.r(9, 3, 4, 3, '#ffffff'); d.r(9, 3, 4, 1, '#e8452c'); d.e(11, 11, 2.2, 2.2, '#ff8fc8'); d.r(3, 10, 4, 3, '#ffd84d'); }, 200);
X('balloons', 'Thả bóng bay', 'Balloon release', 'Bóng bay rực trời.', d => { for (const [x, y, c] of [[4, 4, '#e8452c'], [11, 5, '#4a7be0'], [7, 9, '#ffd84d']]) { d.e(x, y, 2.2, 2.6, c); d.l(x, y + 3, x - 1, y + 5, '#ffffff'); } }, 170);
X('lightning', 'Tia chớp', 'Lightning', 'Đoàng một cái là có thẻ.', d => { d.p('#ffd84d', 9, 1, 8, 2, 8, 3, 7, 4, 7, 5, 6, 6, 5, 7, 6, 7, 7, 7, 8, 7, 9, 7, 8, 8, 8, 9, 7, 10, 7, 11, 6, 12, 6, 13, 5, 14); }, 210);
X('flowers', 'Mưa hoa vườn', 'Garden blooms', 'Hoa nở khắp màn hình.', d => { for (const [x, y, c] of [[4, 4, '#ffd84d'], [11, 5, '#ff8fc8'], [6, 11, '#ffffff'], [12, 12, '#c9a8ff']]) { d.p(c, x - 1, y, x + 1, y, x, y - 1, x, y + 1); d.p('#ff9f43', x, y); } }, 180);
X('ocean', 'Đàn cá bơi', 'Fish swarm', 'Cá nhỏ bơi lên.', d => { for (const [x, y, c] of [[5, 4, '#ff9f43'], [11, 8, '#8fd3ff'], [5, 12, '#ffd84d']]) { d.e(x, y, 2.4, 1.6, c); d.p(c, x - 3, y - 1, x - 3, y, x - 3, y + 1); d.p('#1b1030', x + 1, y); } }, 190);
X('lanterns', 'Thả đèn trời', 'Sky lanterns', 'Đèn đỏ bay lên cao.', d => { for (const [x, y] of [[4, 4], [11, 3], [8, 11]]) { d.r(x - 2, y - 2, 4, 5, '#e8452c'); d.r(x - 1, y - 1, 2, 3, '#ffd84d'); d.r(x - 1, y + 3, 2, 1, '#c9a227'); } }, 240);
X('rainbow', 'Cầu vồng mừng', 'Rainbow party', 'Bảy sắc sau cơn mưa.', d => { d.e(8, 14, 8, 9, '#e8452c'); d.e(8, 14, 6.8, 7.6, '#ffd84d'); d.e(8, 14, 5.6, 6.2, '#5fb85a'); d.e(8, 14, 4.4, 4.8, '#4a7be0'); d.e(8, 14, 3.2, 3.4, '#2b2250'); }, 230);

// ----- Danh hiệu (24): không bán, điều kiện ở titles.js -----
const N = (id, vi, en, note) => title('sh-tt-n-' + id, ['🏷️', vi, en], vi, en, note, 0);
N('voice', 'Giọng vàng', 'Golden voice', 'Shadow không biết mệt.');
N('ears', 'Đôi tai thính', 'Sharp ears', 'Nghe một lần là chép được.');
N('speaker', 'Diễn giả', 'Public speaker', 'Mở miệng là trôi chảy.');
N('calligraphy', 'Nét chữ nết người', 'Fine handwriting', 'Viết chữ đẹp từng nét.');
N('teaowner', 'Chủ quán trà', 'Tea shop owner', 'Quán lúc nào cũng đông.');
N('mathmind', 'Thần tính toán', 'Number wizard', 'Bấm máy nhanh như chớp.');
N('narrator', 'Người kể chuyện', 'Storyteller', 'Chương nào cũng đọc hết.');
N('steady', 'Người bền bỉ', 'The steady one', 'Ngày qua ngày không bỏ.');
N('yearlong', 'Một năm trọn vẹn', 'A full year', 'Đi cùng nhau cả năm.');
N('marathon', 'Chân chạy marathon', 'Marathoner', 'Học dài hơi không ngại.');
N('timelord', 'Chúa tể thời gian', 'Time lord', 'Trăm giờ rèn luyện.');
N('sniper', 'Bách phát bách trúng', 'Never miss', 'Trả lời đâu đúng đó.');
N('ace', 'Thủ khoa', 'Top of class', 'Bài kiểm tra nào cũng cao.');
N('earlybird', 'Chim sớm', 'Early bird', 'Học khi trời vừa sáng.');
N('weekend', 'Chiến binh cuối tuần', 'Weekend warrior', 'Thứ bảy chủ nhật vẫn học.');
N('spark', 'Tia lửa đầu tiên', 'First spark', 'Một tuần liền không đứt.');
N('legend', 'Huyền thoại chuỗi ngày', 'Streak legend', 'Chuỗi dài đáng nể.');
N('museum', 'Chủ bảo tàng', 'Museum keeper', 'Bộ sưu tập đồ sộ.');
N('worldcitizen', 'Công dân toàn cầu', 'Global citizen', 'Nước nào cũng đã ghé.');
N('diamond', 'Hộ chiếu kim cương', 'Diamond passport', 'Sưu tầm trọn một nước.');
N('stylist', 'Nhà tạo mẫu', 'Stylist', 'Tủ đồ đầy ắp.');
N('tycoon', 'Tỷ phú chăm học', 'Study billionaire', 'Xu chất thành núi.');
N('historian', 'Sử gia', 'Historian', 'Chuyện xưa thuộc lòng.');
N('allround', 'Đa tài', 'All-rounder', 'Việc gì cũng thử.');
