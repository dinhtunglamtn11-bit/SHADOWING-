import { add, setCC } from './pass-kit.js';
setCC('sh');
// Cửa hàng trang trí · đợt 2: thêm đồ cầm tay và thú cưng
const G = 1, HD = 'Cầm tay', PT = 'Thú cưng';
const hold = (id, vi, en, note, fn, price) => add(G, HD, id, vi, en, note, fn, { use: 'hold', price, shop: true });
const pet = (id, vi, en, note, fn, price) => add(G, PT, id, vi, en, note, fn, { use: 'pet', price, shop: true });

// ----- Cầm tay (14) -----
hold('sh-pizza', 'Lát pizza', 'Pizza slice', 'Phô mai kéo sợi và xúc xích đỏ.', d => { d.tri(2, 2, 12, 12, 'o'); d.r(2, 2, 12, 2, 't'); d.e(7, 7, 1.4, 1.4, 'r'); d.e(9, 10, 1.4, 1.4, 'r'); d.e(6, 11, 1.2, 1.2, 'r'); d.p('y', 8, 6, 5, 9); }, 40);
hold('sh-donut', 'Bánh donut', 'Donut', 'Phủ đường hồng và cốm màu.', d => { d.e(8, 8, 6, 6, 'o'); d.e(8, 8, 5, 5, 'p'); d.e(8, 8, 1.8, 1.8, '_'); d.p('y', 5, 5, 11, 6, 6, 11, 10, 10); d.p('c', 4, 8, 12, 8, 8, 4); d.p('w', 9, 12); }, 40);
hold('sh-burger', 'Bánh hamburger', 'Burger', 'Nhiều tầng, ăn no nê.', d => { d.e(8, 5, 6, 3, 'o'); d.r(2, 8, 12, 1, 'G'); d.r(2, 9, 12, 2, 'n'); d.r(2, 11, 12, 1, 'y'); d.e(8, 13, 6, 2, 'o'); d.p('w', 5, 4, 9, 3, 11, 5); }, 50);
hold('sh-popcorn', 'Hộp bỏng ngô', 'Popcorn tub', 'Xem phim thì phải có.', d => { d.r(3, 7, 10, 8, 'r'); d.r(5, 7, 2, 8, 'w'); d.r(9, 7, 2, 8, 'w'); d.e(5, 5, 2, 2, 'e'); d.e(8, 4, 2.4, 2.2, 'e'); d.e(11, 5, 2, 2, 'e'); d.p('y', 5, 4, 9, 3, 11, 5); }, 50);
hold('sh-cupcake', 'Bánh cupcake', 'Cupcake', 'Kem hồng và quả anh đào.', d => { d.r(4, 9, 8, 5, 'y'); for (const x of [5, 7, 9, 11]) d.l(x, 9, x, 13, 'Y'); d.e(8, 7, 4, 2.6, 'p'); d.e(8, 5, 2.6, 1.8, 'x'); d.e(8, 3, 1.2, 1.2, 'r'); }, 50);
hold('sh-globe', 'Quả địa cầu', 'Globe', 'Xoay một vòng là đi hết thế giới.', d => { d.e(8, 7, 5, 5, 'C'); d.e(6, 6, 2, 2, 'g'); d.e(10, 9, 2, 1.6, 'g'); d.r(7, 12, 2, 1, 'a'); d.r(5, 13, 6, 1, 'a'); d.p('l', 6, 4, 7, 3); }, 100);
hold('sh-compass', 'La bàn', 'Compass', 'Kim luôn chỉ về phía phiêu lưu.', d => { d.e(8, 8, 6, 6, 'Y'); d.e(8, 8, 5, 5, 'e'); d.tri(7, 4, 2, 4, 'r'); d.dtri(7, 8, 2, 4, 'a'); d.p('k', 8, 8); d.r(7, 1, 2, 2, 'Y'); }, 90);
hold('sh-telescope', 'Ống nhòm thiên văn', 'Telescope', 'Ngắm sao và ngắm các nước xa.', d => { d.l(2, 11, 12, 4, 'n'); d.l(2, 12, 12, 5, 'N'); d.e(13, 4, 2, 2, 'a'); d.e(13, 4, 1, 1, 'c'); d.l(7, 10, 5, 15, 'a'); d.l(8, 10, 10, 15, 'a'); }, 110);
hold('sh-lantern', 'Đèn lồng giấy', 'Paper lantern', 'Ánh sáng đỏ ấm áp.', d => { d.e(8, 8, 4, 5, 'r'); d.r(6, 2, 4, 2, 'y'); d.r(6, 13, 4, 2, 'y'); d.p('R', 5, 6, 11, 6, 5, 10, 11, 10); d.l(8, 3, 8, 13, 'R'); d.p('o', 8, 8); }, 60);
hold('sh-shield', 'Khiên hiệp sĩ', 'Knight shield', 'Có huy hiệu ngôi sao.', d => { d.r(3, 2, 10, 7, 'b'); d.dtri(3, 9, 10, 6, 'b'); d.r(3, 2, 10, 1, 'a'); d.p('y', 8, 5, 7, 6, 9, 6, 8, 7, 8, 4); }, 90);
hold('sh-megaphone', 'Loa phóng thanh', 'Megaphone', 'Nói thật to cho mọi người nghe.', d => { d.tri(7, 3, 8, 10, 'r'); d.r(3, 7, 5, 4, 'y'); d.r(3, 11, 2, 3, 'a'); d.p('w', 12, 5, 13, 8, 12, 11); }, 70);
hold('sh-duckie', 'Vịt cao su', 'Rubber duck', 'Nổi lềnh bềnh trong bồn tắm.', d => { d.e(8, 10, 5, 3.4, 'y'); d.e(11, 5, 3, 2.8, 'y'); d.p('o', 14, 5, 14, 6); d.p('k', 11, 4); d.p('Y', 6, 10, 9, 9); }, 40);
hold('sh-kite', 'Diều giấy', 'Paper kite', 'Gió thổi là bay.', d => { d.dtri(3, 1, 10, 6, 'r'); d.tri(3, 7, 10, 6, 'y'); d.l(8, 1, 8, 13, 'w'); d.l(3, 7, 13, 7, 'w'); d.l(8, 13, 6, 15, 'p'); d.p('b', 5, 4, 11, 4); }, 50);
hold('sh-yoyo', 'Yo-yo', 'Yo-yo', 'Lên xuống rồi lại lên.', d => { d.e(8, 11, 4, 4, 'r'); d.e(8, 11, 2.4, 2.4, 'y'); d.e(8, 11, 1, 1, 'k'); d.l(8, 0, 8, 7, 'w'); d.p('w', 6, 9); }, 40);

// ----- Thú cưng (14) -----
pet('sh-honeybee', 'Ong mật', 'Honeybee', 'Vo ve quanh Lame.', d => { d.e(8, 9, 4, 3, 'y'); d.r(6, 7, 1, 5, 'k'); d.r(9, 7, 1, 5, 'k'); d.e(5, 4, 2.4, 2.4, 'l'); d.e(10, 4, 2.4, 2.4, 'l'); d.e(12, 9, 2, 1.8, 'y'); d.p('k', 13, 9); d.p('k', 2, 9); }, 160);
pet('sh-octopus', 'Bạch tuộc tím', 'Purple octopus', 'Tám cánh tay, tám cái ôm.', d => { d.e(8, 6, 4, 4, 'v'); d.p('w', 6, 5, 10, 5); d.p('k', 6, 5, 10, 5); for (const x of [3, 5, 7, 9, 11, 13]) d.l(x, 9, x - 1 + (x % 4), 14, 'V'); d.p('p', 5, 8, 11, 8); }, 220);
pet('sh-whale', 'Cá voi xanh', 'Blue whale', 'Phun nước lên cao.', d => { d.e(7, 10, 6, 3.6, 'b'); d.e(7, 11, 5, 2, 'l'); d.l(13, 8, 15, 5, 'b'); d.l(13, 8, 15, 10, 'b'); d.p('k', 4, 9); d.l(5, 6, 5, 2, 'c'); d.p('c', 4, 2, 6, 2, 3, 3, 7, 3); }, 260);
pet('sh-turtlepet', 'Rùa nhỏ', 'Little turtle', 'Chậm mà chắc, giống người học giỏi.', d => { d.e(8, 9, 5, 3.6, 'g'); d.e(8, 8, 3.4, 2.6, 'G'); d.p('h', 6, 7, 10, 7, 8, 9); d.e(13, 9, 1.8, 1.6, 'g'); d.p('k', 13, 8); d.r(4, 12, 2, 2, 'g'); d.r(10, 12, 2, 2, 'g'); }, 170);
pet('sh-hamster', 'Chuột hamster', 'Hamster', 'Má phồng giữ hạt dẻ.', d => { d.e(8, 10, 5, 4, 'u'); d.e(8, 7, 4, 3.4, 'u'); d.e(4, 4, 1.6, 1.6, 'n'); d.e(12, 4, 1.6, 1.6, 'n'); d.p('k', 6, 7, 10, 7); d.p('p', 8, 8, 5, 9, 11, 9); d.r(5, 13, 2, 1, 'x'); d.r(9, 13, 2, 1, 'x'); }, 170);
pet('sh-owl', 'Cú mèo', 'Owl', 'Thức khuya cùng bạn học bài.', d => { d.e(8, 9, 5, 5, 'n'); d.e(5, 6, 2.4, 2.4, 'e'); d.e(11, 6, 2.4, 2.4, 'e'); d.p('k', 5, 6, 11, 6); d.tri(7, 8, 2, 2, 'o'); d.p('t', 6, 11, 8, 12, 10, 11); d.tri(3, 2, 3, 3, 'N'); d.tri(10, 2, 3, 3, 'N'); }, 240);
pet('sh-snail', 'Ốc sên', 'Snail', 'Mang ngôi nhà đi khắp nơi.', d => { d.e(7, 9, 4, 4, 'o'); d.spiral(7, 9, 1.4, 'O'); d.r(2, 12, 11, 2, 'e'); d.l(12, 11, 13, 6, 'e'); d.l(14, 11, 14, 5, 'e'); d.p('k', 13, 5, 14, 4); }, 130);
pet('sh-crab', 'Cua đỏ', 'Red crab', 'Đi ngang nhưng vẫn tới nơi.', d => { d.e(8, 10, 5, 3, 'r'); d.e(2, 6, 1.8, 1.8, 'r'); d.e(14, 6, 1.8, 1.8, 'r'); d.l(4, 8, 2, 6, 'R'); d.l(12, 8, 14, 6, 'R'); d.p('w', 6, 8, 10, 8); d.p('k', 6, 8, 10, 8); for (const x of [3, 5, 11, 13]) d.l(x, 12, x - 1, 14, 'R'); }, 150);
pet('sh-ladybug', 'Bọ rùa', 'Ladybug', 'Bảy chấm đen nhỏ xinh.', d => { d.e(8, 9, 5, 4.6, 'r'); d.e(8, 4, 2.4, 2, 'k'); d.l(8, 5, 8, 13, 'k'); d.p('k', 5, 8, 11, 8, 6, 11, 10, 11, 4, 10); d.p('w', 7, 3, 9, 3); }, 130);
pet('sh-hedgehog', 'Nhím con', 'Hedgehog', 'Gai mềm, tính cũng mềm.', d => { d.e(8, 10, 6, 4, 'n'); d.e(12, 10, 3, 2.6, 't'); for (const x of [3, 5, 7, 9]) d.l(x, 6, x - 1, 3, 'N'); d.p('k', 13, 9, 14, 11); d.r(5, 13, 2, 2, 'n'); d.r(10, 13, 2, 2, 'n'); }, 180);
pet('sh-sloth', 'Lười ba ngón', 'Sloth', 'Chậm rãi và hay cười.', d => { d.e(8, 9, 4.6, 5, 'n'); d.e(8, 6, 3.2, 2.8, 'u'); d.p('k', 6, 6, 10, 6); d.p('N', 5, 5, 11, 5); d.p('w', 8, 8); d.l(4, 9, 2, 14, 'n'); d.l(12, 9, 14, 14, 'n'); }, 200);
pet('sh-lion', 'Sư tử con', 'Lion cub', 'Bờm vừa mọc, tiếng gầm còn nhỏ.', d => { d.e(8, 8, 6, 6, 'o'); d.e(8, 9, 3.6, 3.6, 'y'); d.p('k', 6, 8, 10, 8, 8, 10); d.p('w', 8, 11); d.p('O', 3, 6, 13, 6, 8, 2); }, 230);
pet('sh-jellyfish', 'Sứa tím', 'Jellyfish', 'Lơ lửng như mơ.', d => { d.fan(8, 8, 5, 'p'); d.r(3, 8, 10, 1, 'P'); for (const x of [4, 6, 8, 10, 12]) d.l(x, 9, x - 1 + (x % 4), 15, 'x'); d.p('k', 6, 6, 10, 6); }, 190);
pet('sh-pig', 'Heo hồng', 'Pink pig', 'Ụt ịt, thích bùn và sách.', d => { d.e(8, 10, 5, 4, 'p'); d.e(8, 7, 3.4, 3, 'p'); d.tri(4, 3, 3, 3, 'P'); d.tri(9, 3, 3, 3, 'P'); d.e(8, 8, 1.6, 1.2, 'x'); d.p('k', 6, 6, 10, 6, 7, 8, 9, 8); d.l(13, 10, 15, 8, 'p'); }, 170);

