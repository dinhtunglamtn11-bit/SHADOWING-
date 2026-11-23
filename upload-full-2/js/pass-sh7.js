import { theme, frame, title, fx } from './pass-sh4.js';
// Cửa hàng trang trí · đợt 2: thêm nền, khung, danh hiệu, hiệu ứng (CSS của nền / khung nằm trong exnews.css)

// ----- Nền Passport (6) -----
theme('sh-th-sakura', 'sakura', 'Hoa anh đào', 'Cherry blossom', 'Hồng nhạt với cánh hoa rơi.', 0xd96a9a, 0x5a2a5a, [[3, 3, '#ffd5e8'], [9, 5, '#ffd5e8'], [12, 10, '#ffd5e8'], [5, 12, '#ffd5e8'], [7, 8, '#ffffff']], 280);
theme('sh-th-city', 'city', 'Thành phố đêm', 'Night city', 'Tòa nhà sáng đèn trên nền tím sẫm.', 0x3a1a6a, 0x0a0a2a, [[3, 11, '#ffd84d'], [4, 13, '#ffd84d'], [8, 10, '#ffd84d'], [9, 12, '#8fd3ff'], [12, 11, '#ffd84d'], [13, 13, '#ffd84d']], 320);
theme('sh-th-snow', 'snow', 'Tuyết trắng', 'Snowfall', 'Xanh băng với tuyết rơi nhẹ.', 0x6a9ad6, 0x1a2a5a, [[2, 2, '#ffffff'], [8, 5, '#ffffff'], [12, 3, '#ffffff'], [5, 9, '#ffffff'], [11, 12, '#ffffff']], 280);
theme('sh-th-lava', 'lava', 'Dung nham', 'Lava', 'Đỏ cam bùng cháy trên nền đen.', 0x8a1a0a, 0x1a0a0a, [[3, 12, '#ff9f43'], [8, 13, '#ffd84d'], [12, 11, '#ff9f43'], [6, 9, '#e8452c']], 300);
theme('sh-th-sky', 'sky', 'Bầu trời mây', 'Cloudy sky', 'Xanh da trời với đám mây trắng.', 0x4a9be8, 0x1f4a9a, [[3, 4, '#ffffff'], [4, 4, '#ffffff'], [10, 7, '#ffffff'], [11, 7, '#ffffff'], [12, 7, '#ffffff']], 260);
theme('sh-th-grass', 'grass', 'Đồng cỏ pixel', 'Pixel meadow', 'Xanh lá với những ô vuông cỏ.', 0x5fb85a, 0x1f5a2a, [[2, 3, '#b8e08a'], [7, 7, '#b8e08a'], [12, 4, '#b8e08a'], [4, 11, '#b8e08a'], [10, 12, '#b8e08a']], 240);

// ----- Khung thẻ (5) -----
frame('sh-fr-pixel', 'pixel', 'Khung ô vuông', 'Checkered frame', 'Viền ô đen trắng như bàn cờ.', d => { for (let i = 0; i < 16; i++) { const c = i % 2 ? '#ffffff' : '#2b2b3a'; d.put(i, 0, c); d.put(i, 15, i % 2 ? '#2b2b3a' : '#ffffff'); d.put(0, i, c); d.put(15, i, i % 2 ? '#2b2b3a' : '#ffffff'); d.put(i, 1, i % 2 ? '#2b2b3a' : '#ffffff'); d.put(i, 14, c); d.put(1, i, i % 2 ? '#2b2b3a' : '#ffffff'); d.put(14, i, c); } }, 160);
frame('sh-fr-star', 'star', 'Khung ngôi sao', 'Star frame', 'Viền vàng điểm sao nhỏ.', d => { d.r(0, 0, 16, 2, '#4a2a9a'); d.r(0, 14, 16, 2, '#4a2a9a'); d.r(0, 0, 2, 16, '#4a2a9a'); d.r(14, 0, 2, 16, '#4a2a9a'); d.p('#ffd84d', 3, 0, 8, 1, 13, 0, 0, 5, 15, 9, 3, 15, 10, 14, 1, 12); }, 200);
frame('sh-fr-leaf', 'leaf', 'Khung lá xanh', 'Leaf frame', 'Viền xanh như dây leo.', d => { d.r(0, 0, 16, 2, '#2f7d3a'); d.r(0, 14, 16, 2, '#2f7d3a'); d.r(0, 0, 2, 16, '#2f7d3a'); d.r(14, 0, 2, 16, '#2f7d3a'); d.p('#b8e08a', 3, 0, 7, 1, 11, 0, 0, 6, 15, 10, 4, 15, 9, 14); }, 150);
frame('sh-fr-chain', 'chain', 'Khung xích sắt', 'Chain frame', 'Chắc chắn như hầm bảo vật.', d => { d.r(0, 0, 16, 2, '#9aa4c4'); d.r(0, 14, 16, 2, '#9aa4c4'); d.r(0, 0, 2, 16, '#9aa4c4'); d.r(14, 0, 2, 16, '#9aa4c4'); for (let i = 1; i < 16; i += 3) { d.put(i, 0, '#4a5278'); d.put(i, 15, '#4a5278'); d.put(0, i, '#4a5278'); d.put(15, i, '#4a5278'); } }, 170);
frame('sh-fr-candy', 'candy', 'Khung kẹo sọc', 'Candy frame', 'Sọc đỏ trắng như kẹo mút.', d => { for (let i = 0; i < 16; i++) { const c = i % 4 < 2 ? '#e8452c' : '#ffffff'; d.put(i, 0, c); d.put(i, 1, c); d.put(i, 14, c); d.put(i, 15, c); d.put(0, i, c); d.put(1, i, c); d.put(14, i, c); d.put(15, i, c); } }, 180);

// ----- Danh hiệu (12) -----
title('sh-tt-explorer', ['🗺️', 'Nhà thám hiểm', 'Explorer'], 'Nhà thám hiểm', 'Explorer', 'Luôn tìm nơi mới.', 150);
title('sh-tt-navigator', ['🧭', 'Hoa tiêu', 'Navigator'], 'Hoa tiêu', 'Navigator', 'Không bao giờ lạc đường.', 150);
title('sh-tt-chef', ['👨‍🍳', 'Đầu bếp quốc tế', 'International chef'], 'Đầu bếp quốc tế', 'International chef', 'Nấu món của cả thế giới.', 150);
title('sh-tt-poet', ['🖋️', 'Nhà thơ', 'Poet'], 'Nhà thơ', 'Poet', 'Chữ nghĩa bay bổng.', 130);
title('sh-tt-genius', ['🧠', 'Thần đồng', 'Prodigy'], 'Thần đồng', 'Prodigy', 'Học một biết mười.', 180);
title('sh-tt-brave', ['🛡️', 'Dũng sĩ', 'Brave one'], 'Dũng sĩ', 'Brave one', 'Không sợ bài khó.', 140);
title('sh-tt-timetraveler', ['⌛', 'Lữ khách thời gian', 'Time traveler'], 'Lữ khách thời gian', 'Time traveler', 'Từ Harappa tới hôm nay.', 160);
title('sh-tt-friend', ['🤝', 'Bạn của mọi nước', 'Friend of all nations'], 'Bạn của mọi nước', 'Friend of all nations', 'Ở đâu cũng có bạn.', 170);
title('sh-tt-diplomat', ['🕊️', 'Nhà ngoại giao', 'Diplomat'], 'Nhà ngoại giao', 'Diplomat', 'Điềm tĩnh và khéo léo.', 160);
title('sh-tt-ambassador', ['🏛️', 'Đại sứ văn hóa', 'Cultural ambassador'], 'Đại sứ văn hóa', 'Cultural ambassador', 'Kể chuyện các nước cho mọi người.', 220);
title('sh-tt-sleepy', ['😴', 'Vua ngủ nướng', 'Sleepyhead'], 'Vua ngủ nướng', 'Sleepyhead', 'Dậy muộn nhưng học đủ.', 100);
title('sh-tt-rainbow', ['🌈', 'Cầu vồng sau mưa', 'Rainbow after rain'], 'Cầu vồng sau mưa', 'Rainbow after rain', 'Mọi khó khăn đều qua.', 140);

// ----- Hiệu ứng khi mua thẻ (4) -----
fx('sh-fx-petals', 'petals', 'Mưa cánh hoa', 'Petal shower', 'Cánh hoa hồng bay trong gió.', d => { for (const [x, y] of [[4, 4], [10, 3], [7, 9], [12, 11], [3, 12]]) { d.p('#ffb3d0', x, y, x + 1, y, x, y + 1); d.p('#ff8fb0', x + 1, y + 1); } }, 150);
fx('sh-fx-snow', 'snow', 'Tuyết rơi', 'Snowfall', 'Bông tuyết trắng lả tả.', d => { for (const [x, y] of [[4, 4], [11, 3], [7, 9], [12, 11], [3, 12]]) d.p('#ffffff', x, y, x - 1, y, x + 1, y, x, y - 1, x, y + 1); }, 140);
fx('sh-fx-bubbles', 'bubbles', 'Bong bóng', 'Bubbles', 'Bong bóng xà phòng bay lên.', d => { for (const [x, y, r] of [[4, 5, 2], [11, 4, 1.4], [8, 11, 2.4], [12, 12, 1.2]]) { d.e(x, y, r, r, '#8fd3ff'); d.e(x, y, r - 0.8, r - 0.8, '#2b2250'); d.p('#ffffff', x - 1, y - 1); } }, 140);
fx('sh-fx-rocket', 'rocket', 'Tên lửa', 'Rockets', 'Tên lửa và sao băng vút lên.', d => { d.tri(6, 3, 4, 7, '#e8e8f0'); d.r(6, 10, 4, 2, '#e8452c'); d.p('#ffd84d', 7, 12, 8, 12, 7, 13); d.p('#4a7be0', 7, 6, 8, 6); d.p('#e8452c', 5, 9, 10, 9); }, 220);
