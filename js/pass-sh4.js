import { add, setCC } from './pass-kit.js';
setCC('sh');
// Cửa hàng trang trí · Nền Passport, Khung thẻ, Danh hiệu, Hiệu ứng mua (đồ trang trí cho giao diện, không ghép lên Lame)
// Hiệu quả hiển thị do passport.js đọc P.deco; CSS của nền / khung nằm trong exnews.css.
const G = 1, TH = 'Nền Passport', FR = 'Khung thẻ', TT = 'Danh hiệu', FX = 'Hiệu ứng mua';
const hex = n => '#' + [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const mix = (a, b, t) => hex((((a >> 16) * (1 - t) + (b >> 16) * t) << 16) | ((((a >> 8) & 255) * (1 - t) + ((b >> 8) & 255) * t) << 8) | ((a & 255) * (1 - t) + (b & 255) * t));
export const grad = (d, a, b) => { for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) d.put(x, y, mix(a, b, y / 15)); };
export const theme = (id, val, vi, en, note, a, b, dots, price) => add(G, TH, id, vi, en, note, d => { grad(d, a, b); for (const [x, y, c] of dots) d.put(x, y, c);  }, { deco: 'theme', val, price, shop: true, scene: true });
export const frame = (id, val, vi, en, note, draw, price) => add(G, FR, id, vi, en, note, d => { d.bg('#2b2250'); draw(d); d.r(5, 5, 6, 6, '#1b1440'); d.p('#6b6f96', 7, 7, 8, 8); }, { deco: 'frame', val, price, shop: true, scene: true });
const RIB = ['#ffd84d', '#ff8fc8', '#8fd3ff', '#b8e08a', '#ff9f43', '#c9a8ff']; let ribN = 0;
export const title = (id, val, vi, en, note, price) => { const col = RIB[ribN++ % RIB.length]; return add(G, TT, id, vi, en, note, d => { d.bg('#2b2250'); d.r(2, 5, 12, 6, col); d.r(2, 5, 12, 1, '#ffffff88'.slice(0, 7)); d.r(2, 10, 12, 1, '#00000055'.slice(0, 7)); d.tri(0, 6, 3, 4, col); d.tri(13, 6, 3, 4, col); d.p('#2b1d3a', 4, 7, 6, 7, 8, 7, 10, 7, 5, 8, 9, 8, 11, 8); d.p('#e8452c', 8, 3, 7, 4, 9, 4); }, { deco: 'title', val: [vi, en], price, shop: true, scene: true }); };
export const fx = (id, val, vi, en, note, draw, price) => add(G, FX, id, vi, en, note, d => { d.bg('#2b2250'); draw(d); }, { deco: 'fx', val, price, shop: true, scene: true });

// ----- Nền Passport (8) -----
theme('sh-th-star', 'star', 'Bầu trời sao', 'Starry night', 'Nền xanh đêm lấp lánh sao.', 0x0b1040, 0x2a1a6a, [[2, 2, '#ffffff'], [7, 4, '#ffd84d'], [12, 2, '#ffffff'], [4, 9, '#ffffff'], [10, 8, '#8fd3ff'], [13, 12, '#ffffff']], 280);
theme('sh-th-sunset', 'sunset', 'Hoàng hôn', 'Sunset', 'Cam hồng chuyển sang tím.', 0xff7a59, 0x6a2a8a, [[8, 10, '#ffd84d'], [7, 10, '#ffd84d'], [9, 10, '#ffd84d'], [8, 9, '#ffd84d']], 280);
theme('sh-th-ocean', 'ocean', 'Đại dương', 'Ocean', 'Xanh biển sâu với bọt sóng.', 0x0e5a8a, 0x052a4a, [[3, 4, '#8fd3ff'], [4, 4, '#8fd3ff'], [10, 8, '#8fd3ff'], [11, 8, '#8fd3ff'], [6, 12, '#8fd3ff']], 300);
theme('sh-th-forest', 'forest', 'Rừng xanh', 'Forest', 'Xanh lục mát mắt như rừng mưa.', 0x1f6a3a, 0x0a2a1a, [[3, 3, '#b8e08a'], [10, 5, '#b8e08a'], [6, 10, '#b8e08a'], [13, 12, '#b8e08a']], 300);
theme('sh-th-candy', 'candy', 'Kẹo ngọt', 'Candy', 'Hồng tím như kẹo bông.', 0xff7ab8, 0x7a4ac8, [[3, 3, '#ffffff'], [9, 6, '#ffd84d'], [12, 11, '#ffffff'], [5, 12, '#8fd3ff']], 320);
theme('sh-th-galaxy', 'galaxy', 'Thiên hà', 'Galaxy', 'Tím đen với bụi sao nhiều màu.', 0x2a0a4a, 0x000010, [[3, 3, '#ff8fc8'], [11, 4, '#8fd3ff'], [6, 8, '#ffd84d'], [12, 11, '#ffffff'], [2, 13, '#b8e08a']], 340);
theme('sh-th-mint', 'mint', 'Bạc hà', 'Mint', 'Xanh ngọc dịu mắt.', 0x2fa58f, 0x0e3a4a, [[4, 4, '#dff8ee'], [10, 9, '#dff8ee'], [7, 13, '#dff8ee']], 260);
theme('sh-th-desert', 'desert', 'Sa mạc', 'Desert', 'Vàng cam của đồi cát.', 0xc9873a, 0x5a2a1a, [[8, 3, '#ffe9a8'], [3, 11, '#a85a2a'], [12, 9, '#a85a2a']], 260);

// ----- Khung thẻ (6) -----
frame('sh-fr-gold', 'gold', 'Khung vàng', 'Gold frame', 'Thẻ đã mua có viền vàng sáng.', d => { d.r(0, 0, 16, 2, '#ffd84d'); d.r(0, 14, 16, 2, '#c9a227'); d.r(0, 0, 2, 16, '#ffd84d'); d.r(14, 0, 2, 16, '#c9a227'); }, 180);
frame('sh-fr-rainbow', 'rainbow', 'Khung cầu vồng', 'Rainbow frame', 'Viền chuyển màu bảy sắc.', d => { const cs = ['#e8452c', '#ff9f43', '#ffd84d', '#5fb85a', '#4a7be0', '#7a3fc0']; for (let i = 0; i < 16; i++) { const c = cs[i % 6]; d.put(i, 0, c); d.put(i, 1, c); d.put(i, 14, c); d.put(i, 15, c); d.put(0, i, c); d.put(1, i, c); d.put(14, i, c); d.put(15, i, c); } }, 240);
frame('sh-fr-neon', 'neon', 'Khung đèn neon', 'Neon frame', 'Viền sáng xanh lam kiểu thành phố đêm.', d => { d.r(0, 0, 16, 2, '#2ee6ff'); d.r(0, 14, 16, 2, '#2ee6ff'); d.r(0, 0, 2, 16, '#2ee6ff'); d.r(14, 0, 2, 16, '#2ee6ff'); d.r(2, 2, 12, 1, '#7a3fc0'); }, 200);
frame('sh-fr-wood', 'wood', 'Khung gỗ', 'Wood frame', 'Ấm áp như khung tranh cổ.', d => { d.r(0, 0, 16, 2, '#8a5a2a'); d.r(0, 14, 16, 2, '#5a3a1a'); d.r(0, 0, 2, 16, '#8a5a2a'); d.r(14, 0, 2, 16, '#5a3a1a'); d.p('#a87a4a', 3, 0, 9, 0, 0, 5, 15, 9); }, 140);
frame('sh-fr-ice', 'ice', 'Khung băng', 'Ice frame', 'Viền băng lạnh trong veo.', d => { d.r(0, 0, 16, 2, '#cfe8ff'); d.r(0, 14, 16, 2, '#8fd3ff'); d.r(0, 0, 2, 16, '#cfe8ff'); d.r(14, 0, 2, 16, '#8fd3ff'); d.p('#ffffff', 3, 0, 8, 1, 14, 5, 1, 9); }, 160);
frame('sh-fr-heart', 'heart', 'Khung trái tim', 'Heart frame', 'Viền hồng dễ thương.', d => { d.r(0, 0, 16, 2, '#ff8fc8'); d.r(0, 14, 16, 2, '#ff8fc8'); d.r(0, 0, 2, 16, '#ff8fc8'); d.r(14, 0, 2, 16, '#ff8fc8'); d.p('#e8452c', 1, 1, 14, 1, 1, 14, 14, 14, 7, 0, 8, 0); }, 180);

// ----- Danh hiệu (12) -----
title('sh-tt-astro', ['🚀', 'Nhà du hành', 'Astronaut'], 'Nhà du hành', 'Astronaut', 'Hiện cạnh số xu của bạn.', 150);
title('sh-tt-hunter', ['🃏', 'Thợ săn thẻ', 'Card hunter'], 'Thợ săn thẻ', 'Card hunter', 'Dành cho người sưu tầm chăm chỉ.', 150);
title('sh-tt-traveler', ['🧭', 'Người đi khắp nơi', 'Globetrotter'], 'Người đi khắp nơi', 'Globetrotter', 'Đã tới rất nhiều quốc gia.', 150);
title('sh-tt-gourmet', ['🍜', 'Sành ăn thế giới', 'World gourmet'], 'Sành ăn thế giới', 'World gourmet', 'Nếm thử mọi nền ẩm thực.', 150);
title('sh-tt-collector', ['🗂️', 'Nhà sưu tầm', 'Collector'], 'Nhà sưu tầm', 'Collector', 'Thẻ nào cũng muốn có.', 150);
title('sh-tt-rich', ['💰', 'Triệu phú xu', 'Coin tycoon'], 'Triệu phú xu', 'Coin tycoon', 'Xu nhiều như nước.', 200);
title('sh-tt-bookworm', ['📚', 'Mọt sách', 'Bookworm'], 'Mọt sách', 'Bookworm', 'Đọc suốt ngày không chán.', 120);
title('sh-tt-warrior', ['⚔️', 'Chiến binh học tập', 'Study warrior'], 'Chiến binh học tập', 'Study warrior', 'Không bỏ cuộc dù bài khó.', 150);
title('sh-tt-wizard', ['🪄', 'Phù thủy từ vựng', 'Vocabulary wizard'], 'Phù thủy từ vựng', 'Vocabulary wizard', 'Nhớ từ nhanh như phép.', 160);
title('sh-tt-star', ['🌟', 'Siêu sao Passport', 'Passport superstar'], 'Siêu sao Passport', 'Passport superstar', 'Tỏa sáng mỗi ngày.', 180);
title('sh-tt-lame', ['😎', 'Lame bản lĩnh', 'Lame the bold'], 'Lame bản lĩnh', 'Lame the bold', 'Tự tin và nghịch ngợm.', 120);
title('sh-tt-night', ['🌙', 'Cú đêm chăm học', 'Night owl'], 'Cú đêm chăm học', 'Night owl', 'Học khuya vẫn tỉnh táo.', 120);

// ----- Hiệu ứng khi mua thẻ (5) -----
fx('sh-fx-confetti', 'confetti', 'Pháo giấy', 'Confetti', 'Mua thẻ xong là giấy màu bay tung.', d => { d.p('#e8452c', 3, 3, 10, 9); d.p('#ffd84d', 6, 5, 12, 4, 2, 11); d.p('#5fb85a', 8, 8, 4, 7, 11, 12); d.p('#4a7be0', 6, 12, 13, 7, 9, 2); d.p('#ff8fc8', 5, 9, 12, 10, 3, 6); }, 140);
fx('sh-fx-stars', 'stars', 'Mưa sao', 'Star shower', 'Những ngôi sao nhỏ rơi xuống.', d => { for (const [x, y] of [[4, 4], [11, 3], [7, 8], [12, 11], [3, 12]]) { d.p('#ffd84d', x, y, x - 1, y, x + 1, y, x, y - 1, x, y + 1); } }, 140);
fx('sh-fx-hearts', 'hearts', 'Mưa trái tim', 'Hearts', 'Tim hồng bay lên khắp nơi.', d => { for (const [x, y] of [[4, 4], [11, 6], [7, 11]]) { d.p('#ff5a8a', x - 1, y - 1, x + 1, y - 1, x - 1, y, x, y, x + 1, y, x, y + 1); } }, 160);
fx('sh-fx-coins', 'coins', 'Mưa xu vàng', 'Coin rain', 'Xu vàng rơi leng keng.', d => { for (const [x, y] of [[4, 3], [10, 5], [6, 9], [12, 12], [3, 12]]) { d.p('#ffd84d', x, y, x + 1, y, x, y + 1, x + 1, y + 1); d.p('#c9a227', x + 1, y + 1); } }, 160);
fx('sh-fx-fireworks', 'fireworks', 'Pháo hoa', 'Fireworks', 'Bùng nổ rực rỡ khi mua.', d => { for (const [x, y, c] of [[5, 5, '#e8452c'], [11, 9, '#4a7be0']]) { d.p(c, x, y, x - 2, y, x + 2, y, x, y - 2, x, y + 2, x - 1, y - 1, x + 1, y - 1, x - 1, y + 1, x + 1, y + 1); } }, 200);



