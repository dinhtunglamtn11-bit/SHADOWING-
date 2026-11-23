import { M_TOP, M_DRESS, M_KIM, M_HAK } from './pass-kit.js';
import { addOv, addOutfit, c } from './pass-sh1.js';
// Cửa hàng trang trí · Eo và đuôi, Giày dép, Trang phục vui
const W = 'Eo và đuôi', S = 'Giày dép';

// ----- Eo và đuôi -----
addOv(W, 'sh-swimring', 'Phao bơi', 'Swim ring', 'Đeo vào là nổi ngay cả khi bài khó.', 'waist', 15, { r: '#e8452c', w: '#ffffff' }, ['.rrwwrrwwrrwwrr.', '.rrwwrrwwrrwwrr.'], 70);
addOv(W, 'sh-tutu', 'Váy ba lê tutu', 'Tutu skirt', 'Xòe như cánh hoa.', 'waist', 15, { p: '#ff8fc8' }, ['..pppppppppppp..', '.pppppppppppppp.', '..pppppppppppp..'], 90);
addOv(W, 'sh-starbelt', 'Thắt lưng ngôi sao', 'Star belt', 'Một ngôi sao vàng ngay giữa.', 'waist', 15, { b: '#4a7be0', y: '#ffd84d' }, ['..bbbbbbbbbbbb..', '..bbbbbyybbbbb..'], 60);
addOv(W, 'sh-fanny', 'Túi đeo hông', 'Fanny pack', 'Đựng đủ thứ linh tinh trên đường đi.', 'waist', 15, { n: '#5a3a1a', g: '#5fb85a', y: '#ffd84d' }, ['..nnnnnnnnnnnn..', '....gggggggg....', '....gyggggyg....'], 70);
addOv(W, 'sh-cattail', 'Đuôi mèo', 'Cat tail', 'Ngoắc ngoắc khi vui.', 'waist', 15, { k: '#2b2b3a' }, ['.............kkk', '............kk..', '............k...'], 60);
addOv(W, 'sh-devil', 'Đuôi tiểu quỷ', 'Devil tail', 'Nghịch một chút thôi.', 'waist', 15, { r: '#e8452c', R: '#a8281a' }, ['.............rr.', '............rr..', '..............RR', '..............R.'], 70);
addOv(W, 'sh-bowbelt', 'Nơ thắt eo', 'Bow belt', 'Chiếc nơ xinh xắn.', 'waist', 15, { p: '#ff8fc8', P: '#c94a8a' }, ['..pppppPPppppp..', '......pPPp......'], 60);
addOv(W, 'sh-toolbelt', 'Đai dụng cụ', 'Tool belt', 'Sẵn sàng sửa mọi thứ.', 'waist', 15, { n: '#8a5a2a', a: '#c0c8d8' }, ['..nnnnnnnnnnnn..', '..nanananananan.'], 80);

// ----- Giày dép -----
addOv(S, 'sh-rocket', 'Giày tên lửa', 'Rocket boots', 'Phóng! Đến lớp trong một giây.', 'feet', 18, { r: '#e8452c', w: '#ffffff', y: '#ffd84d' }, ['...rr......rr...', '..wwww....wwww..', '..yyyy....yyyy..'], 150);
addOv(S, 'sh-bunnyslip', 'Dép thỏ bông', 'Bunny slippers', 'Mềm êm như mây.', 'feet', 18, { w: '#ffffff', p: '#ff8fc8' }, ['..ww......ww....', '..wwwww..wwwww..', '..ppppp..ppppp..'], 90);
addOv(S, 'sh-skates', 'Giày trượt patin', 'Roller skates', 'Lướt đi vèo vèo.', 'feet', 18, { p: '#ff8fc8', o: '#2b1d3a' }, ['...pppp..pppp...', '.pppppp..pppppp.', '..o..o....o..o..'], 110);
addOv(S, 'sh-flippers', 'Chân vịt lặn biển', 'Flippers', 'Bơi giữa san hô cho vui.', 'feet', 18, { g: '#4a7be0' }, ['..ggg......ggg..', '.ggggg....ggggg.', 'ggggggg..ggggggg'], 80);
addOv(S, 'sh-rainbowshoes', 'Giày cầu vồng', 'Rainbow sneakers', 'Mỗi bước một sắc màu.', 'feet', 18, { o: '#ff9f43', y: '#ffd84d', g: '#5fb85a', b: '#4a7be0', w: '#ffffff', k: '#2b1d3a' }, ['...wwk....kww...', '..ooyyg..gyyoo..', '..bbbbb..bbbbb..'], 120);
addOv(S, 'sh-rainboots', 'Ủng đi mưa', 'Rain boots', 'Nhảy vào vũng nước thoải mái.', 'feet', 18, { y: '#ffd84d', k: '#2b2b3a' }, ['...yy......yy...', '..yyyy....yyyy..', '..kkkk....kkkk..'], 90);
addOv(S, 'sh-ballet', 'Giày ba lê', 'Ballet shoes', 'Nhón chân thật nhẹ.', 'feet', 18, { p: '#ff8fc8', P: '#c94a8a' }, ['...pp......pp...', '..pppp....pppp..', '..PPPP....PPPP..'], 80);
addOv(S, 'sh-socks', 'Tất sọc đỏ trắng', 'Striped socks', 'Ấm chân, vui mắt.', 'feet', 18, { r: '#e8452c', w: '#ffffff' }, ['..rwrw....rwrw..', '..wrwr....wrwr..', '..rwrw....rwrw..'], 50);

// ----- Trang phục vui -----
const base = (o = {}) => o;
addOutfit('sh-pajamas', 'shpj', 'Bộ đồ ngủ ngôi sao', 'Starry pajamas', 'Học xong thì đi ngủ, mơ thấy các nước.', M_TOP, { t: '#4a5fc9', T: '#ffd84d', u: '#4a5fc9', b: '#3a4aa8', p: '#4a5fc9', l: '#3a4aa8' }, [[11, 6, 'T'], [12, 9, 'T'], [13, 6, 'T'], [14, 9, 'T'], [15, 6, 'T'], [16, 9, 'T']], 200);
addOutfit('sh-astro', 'shas', 'Bộ phi hành gia', 'Astronaut suit', 'Trắng tinh với huy hiệu cam.', M_TOP, { t: '#f4f4f8', T: '#ff9f43', u: '#f4f4f8', b: '#dfe3f5', p: '#f4f4f8', l: '#c0c8d8' }, [[11, 5, 'T'], [11, 10, 'T'], [12, 7, 'T'], [12, 8, 'T']], 260);
addOutfit('sh-wizardrobe', 'shwz', 'Áo choàng phù thủy', 'Wizard robe', 'Tím huyền bí với ngôi sao vàng.', M_KIM, { t: '#6a3fb8', T: '#ffd84d', u: '#6a3fb8', b: '#4a2680', x: '#4a2680' }, [[11, 5, 'T'], [12, 10, 'T'], [13, 6, 'T'], [14, 9, 'T'], [15, 5, 'T'], [16, 11, 'T']], 240);
addOutfit('sh-chefsuit', 'shch', 'Đồng phục đầu bếp', 'Chef uniform', 'Hai hàng khuy to và tạp dề.', M_TOP, { t: '#ffffff', T: '#dfe6f8', u: '#ffffff', b: '#dfe6f8', p: '#4a4a5a', l: '#4a4a5a' }, [[11, 7, 'T'], [11, 8, 'T'], [13, 7, 'T'], [13, 8, 'T'], [15, 7, 'T'], [15, 8, 'T']], 180);
addOutfit('sh-ninjasuit', 'shnj', 'Bộ ninja bóng đêm', 'Shadow ninja suit', 'Đen tuyền, chỉ lộ đôi mắt.', M_TOP, { t: '#2b2b3a', T: '#e8452c', u: '#2b2b3a', b: '#e8452c', p: '#2b2b3a', l: '#2b2b3a' }, [[11, 6, 'T'], [11, 9, 'T']], 220);
addOutfit('sh-hero', 'shhr', 'Bộ siêu anh hùng', 'Superhero suit', 'Áo xanh, đai đỏ và ngực có chữ cái.', M_TOP, { t: '#2f6bd6', T: '#e8452c', u: '#2f6bd6', b: '#e8452c', p: '#2f6bd6', l: '#e8452c' }, [[11, 7, 'y'], [11, 8, 'y'], [12, 7, 'y'], [12, 8, 'y']], 260);
addOutfit('sh-piratecoat', 'shpr', 'Áo thuyền trưởng cướp biển', 'Pirate captain coat', 'Sọc đỏ trắng, thắt lưng đen.', M_TOP, { t: '#c9302a', T: '#ffffff', u: '#c9302a', b: '#2b2b3a', p: '#2b2b3a', l: '#2b2b3a' }, [[11, 5, 'T'], [11, 8, 'T'], [11, 11, 'T'], [13, 5, 'T'], [13, 8, 'T'], [13, 11, 'T'], [15, 5, 'T'], [15, 8, 'T'], [15, 11, 'T']], 220);
addOutfit('sh-king', 'shkg', 'Áo choàng hoàng gia', 'Royal robe', 'Đỏ thẫm viền lông trắng.', M_KIM, { t: '#9a1a2a', T: '#ffffff', u: '#9a1a2a', b: '#ffd84d', x: '#ffd84d' }, [[11, 5, 'T'], [11, 6, 'T'], [11, 9, 'T'], [11, 10, 'T'], [13, 7, 'y'], [14, 8, 'y'], [16, 6, 'y'], [16, 9, 'y']], 300);
addOutfit('sh-dino', 'shdn', 'Bộ đồ khủng long', 'Dino onesie', 'Xanh lá với gai lưng nhỏ.', M_DRESS, { t: '#5fb85a', T: '#2f7d3a', u: '#5fb85a', b: '#2f7d3a', x: '#2f7d3a' }, [[11, 7, 'T'], [11, 8, 'T'], [13, 5, 'T'], [13, 10, 'T'], [15, 7, 'T'], [15, 8, 'T']], 240);
addOutfit('sh-track', 'shtk', 'Bộ đồ thể thao', 'Tracksuit', 'Hai sọc trắng dọc theo tay.', M_TOP, { t: '#2fa58f', T: '#ffffff', u: '#2fa58f', b: '#1f7a6a', p: '#2fa58f', l: '#1f7a6a' }, [[12, 2, 'T'], [12, 13, 'T'], [13, 2, 'T'], [13, 13, 'T'], [14, 2, 'T'], [14, 13, 'T']], 160);
addOutfit('sh-lab', 'shlb', 'Áo choàng phòng thí nghiệm', 'Lab coat', 'Trắng với túi đựng bút.', M_TOP, { t: '#ffffff', T: '#c0c8d8', u: '#ffffff', b: '#dfe6f8', p: '#4a4a5a', l: '#4a4a5a' }, [[12, 5, 'T'], [13, 5, 'T'], [12, 10, 'b'], [13, 10, 'T']], 180);
addOutfit('sh-bee', 'shbe', 'Bộ ong vàng', 'Bee costume', 'Sọc vàng đen, vo ve.', M_DRESS, { t: '#ffd84d', T: '#2b2b3a', u: '#ffd84d', b: '#2b2b3a', x: '#2b2b3a' }, [[11, 4, 'T'], [11, 5, 'T'], [11, 10, 'T'], [11, 11, 'T'], [13, 4, 'T'], [13, 5, 'T'], [13, 10, 'T'], [13, 11, 'T'], [15, 4, 'T'], [15, 5, 'T'], [15, 10, 'T'], [15, 11, 'T']], 200);

