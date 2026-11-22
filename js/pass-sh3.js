import { add, setCC } from './pass-kit.js';
setCC('sh');
// Cửa hàng trang trí · Cầm tay, Thú cưng (hình trong suốt, không có nền để ghép vào Lame)
const G = 1, HD = 'Cầm tay', PT = 'Thú cưng';
const hold = (id, vi, en, note, fn, price) => add(G, HD, id, vi, en, note, fn, { use: 'hold', price, shop: true });
const pet = (id, vi, en, note, fn, price) => add(G, PT, id, vi, en, note, fn, { use: 'pet', price, shop: true });

// ----- Cầm tay -----
hold('sh-balloon', 'Bóng bay đỏ', 'Red balloon', 'Buộc dây, cầm trên tay và bay bổng.', d => { d.e(8, 6, 4, 5, 'r'); d.p('R', 6, 4, 7, 5); d.p('w', 6, 3); d.tri(7, 10, 2, 2, 'r'); d.l(8, 12, 8, 15, 'a'); }, 50);
hold('sh-icecream', 'Kem ốc quế', 'Ice cream cone', 'Ba viên kem ngọt mát.', d => { d.e(8, 4, 3, 2.4, 'p'); d.e(8, 7, 3, 2.2, 'w'); d.tri(5, 8, 6, 8, 't'); d.p('n', 7, 10, 9, 10, 8, 12); d.p('r', 8, 1); }, 60);
hold('sh-wand', 'Đũa phép', 'Magic wand', 'Vẫy một cái là hiểu ngay bài.', d => { d.l(4, 14, 11, 5, 'n'); d.l(5, 14, 12, 5, 'N'); d.e(12, 4, 2.4, 2.4, 'y'); d.p('w', 12, 3, 12, 1, 14, 4, 10, 2, 14, 2); }, 80);
hold('sh-saber', 'Kiếm ánh sáng', 'Light saber', 'Tỏa sáng xanh lam.', d => { d.l(8, 3, 8, 11, 'c'); d.l(9, 3, 9, 11, 'b'); d.l(7, 3, 7, 11, 'w'); d.r(6, 11, 4, 4, 'a'); d.p('k', 7, 12, 8, 13); }, 100);
hold('sh-guitar', 'Đàn guitar', 'Guitar', 'Gảy một bài nhạc quê hương.', d => { d.e(5, 11, 4, 3.6, 'o'); d.e(5, 11, 1.4, 1.4, 'k'); d.l(7, 9, 13, 3, 'N'); d.r(12, 1, 3, 3, 'N'); d.p('w', 4, 12, 6, 12); }, 110);
hold('sh-bubbletea', 'Trà sữa trân châu', 'Bubble tea', 'Hút thật to để vớt trân châu.', d => { d.r(4, 4, 8, 10, 'u'); d.r(4, 4, 8, 1, 'w'); d.r(5, 11, 6, 2, 'N'); d.p('k', 5, 12, 7, 12, 9, 12, 6, 11, 10, 11); d.l(10, 4, 12, 0, 'g'); d.p('W', 5, 6, 10, 7); }, 70);
hold('sh-umbrella', 'Ô đi mưa', 'Umbrella', 'Che nắng che mưa đều tốt.', d => { d.fan(8, 8, 7, 'b'); d.l(8, 8, 8, 14, 'k'); d.p('k', 7, 14); d.p('B', 3, 5, 8, 2, 12, 5, 8, 6); }, 70);
hold('sh-trophy', 'Cúp vàng', 'Gold trophy', 'Phần thưởng cho ngày học xuất sắc.', d => { d.r(5, 3, 6, 5, 'y'); d.r(6, 8, 4, 3, 'y'); d.r(5, 12, 6, 2, 'Y'); d.l(5, 4, 3, 6, 'y'); d.l(10, 4, 12, 6, 'y'); d.p('w', 6, 4); }, 120);
hold('sh-camera', 'Máy ảnh', 'Camera', 'Chụp lại mọi nơi đã đến.', d => { d.r(2, 5, 12, 8, 'K'); d.r(5, 3, 4, 2, 'K'); d.e(8, 9, 2.6, 2.6, 'a'); d.e(8, 9, 1.4, 1.4, 'c'); d.p('r', 12, 6); d.p('w', 3, 6); }, 90);
hold('sh-plane', 'Máy bay giấy', 'Paper plane', 'Gấp bằng một trang vở cũ.', d => { d.tri(1, 4, 14, 8, 'w'); d.l(2, 11, 14, 5, 'a'); d.l(7, 9, 13, 6, 'l'); d.p('a', 2, 11, 8, 12); }, 40);
hold('sh-bouquet', 'Bó hoa', 'Flower bouquet', 'Tặng ai đó một nụ cười.', d => { for (const [x, y, c] of [[5, 4, 'r'], [8, 3, 'y'], [11, 4, 'p']]) { d.e(x, y, 2, 2, c); d.p('w', x, y); } d.tri(4, 7, 8, 6, 'g'); d.r(6, 13, 4, 1, 'p'); d.l(8, 7, 8, 12, 'G'); }, 60);
hold('sh-lollipop', 'Kẹo mút xoắn', 'Swirl lollipop', 'Ngọt đến từng vòng xoắn.', d => { d.e(8, 6, 5, 5, 'p'); d.spiral(8, 6, 1.4, 'P'); d.spiral(8, 6, 0.8, 'w'); d.l(8, 11, 8, 15, 'w'); }, 40);
hold('sh-flag', 'Cờ nhỏ', 'Tiny flag', 'Vẫy cờ chào mừng mỗi nước mới.', d => { d.l(4, 2, 4, 15, 'N'); d.r(5, 3, 8, 3, 'r'); d.r(5, 6, 8, 3, 'w'); d.r(5, 9, 8, 1, 'b'); d.p('y', 6, 4); }, 50);
hold('sh-book', 'Sách phép thuật', 'Spellbook', 'Mỗi trang là một câu thần chú.', d => { d.r(3, 3, 10, 11, 'v'); d.r(3, 3, 2, 11, 'V'); d.e(9, 8, 2.4, 2.4, 'y'); d.p('w', 9, 8); d.r(3, 14, 10, 1, 'e'); }, 80);

// ----- Thú cưng -----
pet('sh-cat', 'Mèo cam', 'Orange cat', 'Kêu meo meo, thích nằm trên sách.', d => { d.e(8, 10, 5, 4, 'o'); d.e(8, 6, 3.4, 3, 'o'); d.tri(4, 2, 3, 3, 'o'); d.tri(9, 2, 3, 3, 'o'); d.p('k', 6, 6, 10, 6); d.p('p', 8, 7); d.p('O', 5, 9, 8, 9, 11, 9); d.l(13, 11, 15, 7, 'o'); }, 220);
pet('sh-dog', 'Cún nâu', 'Brown puppy', 'Vẫy đuôi mỗi khi bạn học xong.', d => { d.e(8, 10, 5, 4, 'n'); d.e(8, 6, 3.4, 3, 'n'); d.e(4, 6, 1.6, 2.6, 'N'); d.e(12, 6, 1.6, 2.6, 'N'); d.p('k', 7, 6, 9, 6, 8, 8); d.e(8, 8, 1.6, 1.2, 't'); d.l(13, 11, 15, 8, 'n'); }, 220);
pet('sh-bunnypet', 'Thỏ trắng', 'White bunny', 'Nhảy tung tăng bên cạnh Lame.', d => { d.e(8, 11, 4, 3.4, 'w'); d.e(8, 7, 3, 2.8, 'w'); d.r(5, 1, 2, 5, 'w'); d.r(9, 1, 2, 5, 'w'); d.p('p', 6, 2, 10, 2, 6, 4, 10, 4); d.p('k', 7, 7, 9, 7); d.p('p', 8, 8); }, 220);
pet('sh-panda', 'Gấu trúc', 'Panda', 'Nhai tre và nhai bài học.', d => { d.e(8, 10, 5, 4, 'w'); d.e(8, 6, 3.6, 3.2, 'w'); d.e(5, 4, 1.4, 1.4, 'k'); d.e(11, 4, 1.4, 1.4, 'k'); d.e(6, 6, 1.2, 1.4, 'k'); d.e(10, 6, 1.2, 1.4, 'k'); d.p('w', 6, 6, 10, 6); d.p('k', 8, 8); d.r(4, 12, 2, 3, 'k'); d.r(10, 12, 2, 3, 'k'); }, 260);
pet('sh-penguin', 'Chim cánh cụt', 'Penguin', 'Lạch bạch từ Nam Cực tới.', d => { d.e(8, 9, 4, 5.4, 'k'); d.e(8, 10, 2.6, 3.6, 'w'); d.e(8, 4, 2.8, 2.6, 'k'); d.p('o', 8, 5, 7, 5, 9, 5); d.p('w', 7, 3, 9, 3); d.r(5, 14, 2, 1, 'o'); d.r(9, 14, 2, 1, 'o'); d.l(4, 8, 3, 11, 'k'); d.l(12, 8, 13, 11, 'k'); }, 240);
pet('sh-duck', 'Vịt vàng', 'Yellow duck', 'Quạc quạc, nổi trên mọi bài kiểm tra.', d => { d.e(8, 10, 5, 3.6, 'y'); d.e(11, 5, 2.8, 2.6, 'y'); d.p('o', 13, 5, 14, 6, 13, 6); d.p('k', 11, 4); d.l(3, 9, 5, 11, 'Y'); d.p('o', 6, 14, 10, 14); }, 160);
pet('sh-dragon', 'Rồng con', 'Baby dragon', 'Phun lửa nhỏ xíu để sưởi ấm.', d => { d.e(7, 10, 4, 3.6, 'g'); d.e(11, 6, 3, 2.6, 'g'); d.tri(4, 3, 4, 5, 'G'); d.tri(1, 5, 4, 4, 'G'); d.p('r', 12, 5, 13, 6, 14, 6); d.p('k', 11, 5); d.p('o', 14, 7, 15, 8); d.l(3, 11, 1, 14, 'g'); d.p('y', 6, 10, 8, 11); }, 320);
pet('sh-ghost', 'Ma trắng dễ thương', 'Friendly ghost', 'Chỉ dọa vui, không làm đau ai.', d => { d.e(8, 7, 4, 5, 'w'); d.r(4, 7, 8, 6, 'w'); d.p('w', 4, 13, 6, 13, 8, 13, 10, 13); d.p('k', 6, 6, 10, 6, 8, 9); d.p('p', 5, 8, 11, 8); }, 200);
pet('sh-robot', 'Rô-bốt nhỏ', 'Little robot', 'Bíp bíp, giúp Lame nhớ từ mới.', d => { d.r(4, 5, 8, 6, 'a'); d.r(5, 11, 6, 3, 'A'); d.p('y', 6, 7, 10, 7); d.p('k', 6, 7, 10, 7); d.l(8, 5, 8, 2, 'a'); d.e(8, 2, 1.2, 1.2, 'r'); d.r(3, 7, 1, 3, 'A'); d.r(12, 7, 1, 3, 'A'); d.r(5, 14, 2, 1, 'A'); d.r(9, 14, 2, 1, 'A'); d.p('c', 7, 9, 8, 9, 9, 9); }, 240);
pet('sh-slime', 'Thạch xanh', 'Green slime', 'Nhún nhảy, lúc nào cũng cười.', d => { d.e(8, 10, 6, 4.6, 'g'); d.e(8, 7, 4, 3.4, 'g'); d.p('h', 5, 6, 6, 5); d.p('k', 6, 8, 10, 8); d.p('r', 8, 10); d.p('G', 3, 13, 12, 13); }, 160);
pet('sh-unicorn', 'Kỳ lân', 'Unicorn', 'Bờm cầu vồng và chiếc sừng lấp lánh.', d => { d.e(8, 10, 5, 3.6, 'w'); d.e(11, 6, 3, 3, 'w'); d.tri(10, 0, 2, 4, 'y'); d.p('k', 12, 6); d.p('p', 13, 8); d.p('p', 9, 3, 8, 5); d.p('c', 8, 4, 7, 6); d.p('y', 8, 7); d.r(4, 13, 1, 2, 'w'); d.r(10, 13, 1, 2, 'w'); d.l(3, 9, 1, 12, 'p'); }, 340);
pet('sh-chick', 'Gà con', 'Chick', 'Tròn như quả trứng nhỏ.', d => { d.e(8, 9, 4.4, 4.4, 'y'); d.p('o', 8, 8, 9, 9, 7, 9); d.p('k', 6, 7, 10, 7); d.p('o', 6, 14, 10, 14); d.p('Y', 4, 10, 12, 10); d.p('y', 8, 4, 7, 5, 9, 5); }, 140);
pet('sh-fox', 'Cáo đỏ', 'Red fox', 'Thông minh như kancil nhưng màu cam.', d => { d.e(8, 10, 4.6, 3.6, 'o'); d.e(8, 6, 3.2, 2.8, 'o'); d.tri(4, 2, 3, 4, 'o'); d.tri(9, 2, 3, 4, 'o'); d.p('w', 6, 8, 10, 8, 8, 9); d.p('k', 6, 6, 10, 6, 8, 8); d.e(14, 11, 2, 1.6, 'o'); d.p('w', 15, 12); }, 240);
pet('sh-frog', 'Ếch xanh', 'Green frog', 'Ộp ộp, thích mưa mùa gió mùa.', d => { d.e(8, 10, 5, 3.4, 'g'); d.e(5, 5, 2, 2, 'g'); d.e(11, 5, 2, 2, 'g'); d.p('w', 5, 5, 11, 5); d.p('k', 5, 5, 11, 5); d.p('G', 5, 10, 11, 10); d.l(5, 11, 11, 11, 'k'); d.r(3, 13, 3, 1, 'G'); d.r(10, 13, 3, 1, 'G'); }, 180);
