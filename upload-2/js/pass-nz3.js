import { add, SC, setCC } from './pass-kit.js';
setCC('nz');
// New Zealand · Nhóm 3: Ẩm thực
const G = 3, A = 'Món ăn', B = 'Đồ uống, trà và rượu', C = 'Món theo mùa và dịp lễ';
const H = { use: 'hold' };
const plate = d => { d.bg('e'); d.e(8, 9, 7, 5.4, 'w'); d.e(8, 9, 5.6, 4, 'l'); };

// ----- Món ăn -----
add(G, A, 'nz-hangifood', 'Hāngī', 'Hāngī', 'Món nấu bằng đá nóng trong hố đất, gồm thịt, khoai và rau được phủ vải ẩm rồi lấp đất. Hương khói đặc trưng, thường có trong các dịp cộng đồng của người Māori.',
  d => { plate(d); d.e(5, 8, 2.4, 2, 'n'); d.e(10, 9, 2.4, 2, 'o'); d.e(7, 11, 2, 1.6, 'y'); d.p('g', 11, 6, 12, 7, 4, 11); d.p('w', 6, 2, 9, 1, 8, 3); d.p('N', 5, 8, 10, 9); }, SC);
add(G, A, 'nz-roastlamb', 'Thịt cừu nướng (roast lamb)', 'Roast lamb', 'Món chính của bữa tiệc Chủ nhật, thường ăn kèm khoai và rau củ nướng, xốt bạc hà.',
  d => { plate(d); d.e(6, 8, 3.4, 2.6, 'n'); d.r(8, 7, 1, 0, 'n'); d.p('w', 3, 7, 9, 7); d.e(11, 10, 2, 1.6, 'o'); d.e(10, 6, 1.4, 1.2, 'y'); d.p('g', 11, 12, 12, 11, 4, 12); d.p('N', 4, 8, 7, 9); d.r(6, 3, 1, 2, 'W'); d.r(8, 3, 1, 2, 'W'); }, SC);
add(G, A, 'nz-fishchips', 'Fish and chips (cá chiên và khoai tây chiên)', 'Fish and chips', 'Món ăn nhanh kinh điển, bán ở hầu hết thị trấn ven biển, thường gói trong giấy và ăn ngoài bãi biển.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'y'); d.tri(2, 5, 12, 9, 'W'); d.r(3, 12, 10, 3, 'W'); for (const x of [4, 6, 8, 10]) d.r(x, 3, 1, 5, 'y'); d.e(11, 8, 3, 1.6, 'o'); d.p('Y', 4, 4, 8, 5, 10, 3); d.p('N', 11, 8, 13, 8); d.p('k', 6, 11, 9, 11); }, SC);
add(G, A, 'nz-meatpie', 'Meat pie (bánh nhân thịt)', 'Meat pie', 'Bánh nướng nhỏ nhân thịt bò, phô mai hoặc nấm, mua ở trạm xăng hay tiệm bánh quanh năm.',
  d => { d.bg('u'); d.e(8, 9, 6, 4, 'n'); d.r(2, 9, 12, 3, 'n'); d.e(8, 8, 5, 2.6, 'o'); d.r(2, 11, 12, 2, 'N'); d.p('Y', 5, 7, 9, 6, 11, 8); d.p('N', 7, 9, 3, 10); d.p('r', 13, 4, 14, 3); d.p('y', 14, 4); }, SC);
add(G, A, 'nz-whitebait', 'Whitebait fritters (bánh chiên cá whitebait)', 'Whitebait fritters', 'Cá con trong suốt trộn trứng rồi chiên giòn, món theo mùa mà nhiều người xem là đặc sản.',
  d => { plate(d); d.e(8, 9, 4.4, 2.4, 'o'); d.e(8, 9, 3.4, 1.6, 'y'); d.p('W', 6, 9, 8, 8, 10, 9, 7, 10, 9, 10); d.p('k', 6, 8, 9, 9); d.p('y', 12, 5, 13, 6); d.p('g', 4, 6, 5, 7); }, SC);
add(G, A, 'nz-mussels', 'Green-lipped mussels (vẹm môi xanh)', 'Green-lipped mussels', 'Loài vẹm lớn nuôi ở vùng Marlborough, hấp hoặc nướng phô mai.',
  d => { d.bg('C'); d.e(6, 9, 5, 3.4, 'k'); d.e(6, 9, 4, 2.6, 'W'); d.e(6, 10, 3, 1.6, 'o'); d.r(2, 12, 9, 1, 'g'); d.e(11, 6, 3.4, 2.4, 'N'); d.r(9, 7, 5, 1, 'g'); d.p('l', 4, 8, 9, 5); d.p('g', 3, 11, 10, 8); }, SC);
add(G, A, 'nz-paua', 'Pāua (bào ngư New Zealand)', 'Pāua (abalone)', 'Loài bào ngư bản địa, thường thái lát chiên hoặc làm chả, được xem là món quý.',
  d => { d.bg('C'); d.e(8, 9, 6, 5, 'v'); d.e(8, 9, 5, 4, 'c'); d.e(8, 9, 3.6, 3, 'g'); d.e(8, 9, 2, 1.6, 'p'); d.p('h', 6, 7, 10, 10); d.p('w', 5, 6, 10, 6); d.p('K', 5, 13, 11, 13); }, SC);
add(G, A, 'nz-crayfish', 'Crayfish (tôm hùm đá) ở Kaikōura', 'Crayfish at Kaikōura', 'Tên Māori Kaikōura nghĩa là "ăn tôm hùm", và tôm hùm vùng này nổi tiếng từ lâu.',
  d => { d.bg('C'); d.e(8, 9, 3, 4.4, 'r'); d.r(6, 12, 4, 3, 'R'); d.l(4, 6, 2, 2, 'r'); d.l(12, 6, 14, 2, 'r'); d.l(6, 3, 3, 0, 'R'); d.l(9, 3, 12, 0, 'R'); d.p('k', 7, 5, 9, 5); d.p('o', 7, 8, 9, 10); d.l(5, 9, 3, 12, 'R'); d.l(11, 9, 13, 12, 'R'); }, SC);
add(G, A, 'nz-kumara', 'Kūmara (khoai lang bản địa)', 'Kūmara (sweet potato)', 'Củ ngọt ăn nướng, nghiền hoặc làm khoai chiên, là thực phẩm chính của người Māori.',
  d => { d.bg('u'); d.e(8, 9, 6, 3, 'P'); d.e(8, 9, 5, 2.2, 'v'); d.e(4, 8, 2, 1.6, 'v'); d.e(12, 10, 2, 1.6, 'v'); d.p('o', 6, 9, 10, 9); d.p('V', 5, 8, 11, 10); d.p('g', 3, 7, 13, 11); }, SC);
add(G, A, 'nz-friedbread', 'Bánh chiên kiểu fry bread', 'Fry bread', 'Bột chiên phồng của người Māori, ăn kèm bơ và mứt hoặc nhân mặn.',
  d => { plate(d); d.e(8, 9, 5.4, 3.6, 'o'); d.e(8, 8, 4.4, 2.6, 'y'); d.e(8, 8, 2.4, 1.4, 'e'); d.p('r', 6, 7, 10, 9, 8, 6); d.p('Y', 5, 9, 11, 8); }, SC);

// ----- Đồ uống, trà và rượu -----
add(G, B, 'nz-sauvblanc', 'Sauvignon Blanc vùng Marlborough', 'Marlborough Sauvignon Blanc', 'Loại rượu vang trắng thơm mùi chanh và trái cây nhiệt đới, làm nên tên tuổi cho ngành rượu vang của đất nước.',
  d => { d.bg('e'); d.r(6, 1, 4, 5, 'g'); d.r(7, 6, 2, 3, 'G'); d.r(6, 9, 4, 5, 'g'); d.r(5, 14, 6, 1, 'G'); d.r(7, 3, 2, 2, 'w'); d.p('y', 7, 4, 8, 4); d.p('h', 6, 2, 6, 10); }, H);
add(G, B, 'nz-pinotnoir', 'Pinot Noir ở Central Otago', 'Central Otago Pinot Noir', 'Vang đỏ nhẹ trồng ở một trong những vùng nho cực nam và mát nhất thế giới.',
  d => { d.bg('e'); d.e(8, 5, 4, 4, 'w'); d.r(4, 1, 8, 4, '_'); d.e(8, 5, 3.6, 3.6, 'm'); d.r(4, 1, 8, 3, 'w'); d.r(5, 4, 6, 3, 'm'); d.r(7, 8, 2, 5, 'w'); d.r(5, 13, 6, 1, 'w'); d.p('R', 6, 5, 9, 6); d.p('l', 5, 2, 5, 3); }, H);
add(G, B, 'nz-craftbeer', 'Craft beer (bia thủ công)', 'Craft beer', 'Các nhà máy bia nhỏ mọc khắp nơi, dùng hoa bia New Zealand có hương trái cây nhiệt đới.',
  d => { d.bg('e'); d.r(3, 3, 7, 11, 'y'); d.r(3, 2, 7, 2, 'w'); d.r(3, 13, 7, 1, 'Y'); d.l(10, 5, 13, 6, 'a'); d.l(13, 6, 13, 10, 'a'); d.l(13, 10, 10, 11, 'a'); d.p('Y', 5, 6, 5, 9, 8, 7, 7, 11); d.p('l', 4, 3, 8, 3); d.p('g', 12, 1, 13, 2); }, H);
add(G, B, 'nz-flatwhite', 'Flat white', 'Flat white', 'Loại cà phê sữa mịn phổ biến, nhiều quán New Zealand và Úc nhận là nơi tạo ra món này.',
  d => { d.bg('e'); d.e(8, 9, 6, 4, 'w'); d.r(5, 9, 6, 4, 'w'); d.e(8, 8, 4.4, 2.4, 'n'); d.e(8, 8, 3.2, 1.6, 'e'); d.p('n', 8, 7, 7, 8, 9, 8, 8, 9); d.e(8, 13, 4, 1.4, 'l'); d.l(13, 9, 14, 11, 'w'); d.p('w', 6, 3, 9, 2); }, H);
add(G, B, 'nz-lp', 'L&P (Lemon & Paeroa, nước chanh có ga)', 'L&P (Lemon & Paeroa)', 'Thương hiệu nước ngọt có ga vị chanh, quảng cáo là "nổi tiếng ở New Zealand".',
  d => { d.bg('y'); d.r(6, 1, 4, 3, 'g'); d.r(5, 4, 6, 10, 'Y'); d.r(5, 7, 6, 3, 'e'); d.p('G', 7, 8, 8, 8); d.p('y', 6, 5, 6, 12); d.r(5, 14, 6, 1, 'g'); d.p('w', 6, 3); }, H);
add(G, B, 'nz-tea', 'Trà (tea) và trà Kiwi', 'Tea', 'Thói quen uống trà kế thừa từ người Anh, ăn kèm bánh quy trong giờ nghỉ.',
  d => { d.bg('e'); d.r(3, 6, 8, 7, 'w'); d.e(7, 13, 4, 1, 'l'); d.r(4, 7, 6, 2, 'n'); d.l(11, 7, 13, 8, 'w'); d.l(13, 8, 11, 11, 'w'); d.p('w', 5, 3, 7, 1, 9, 4, 8, 2); d.e(12, 14, 2, 1, 'u'); d.p('Y', 11, 14, 13, 14); }, H);
add(G, B, 'nz-milk', 'Sữa tươi và sữa chua', 'Fresh milk and yoghurt', 'Sản phẩm từ ngành sữa lớn của đất nước, người dân dùng hằng ngày.',
  d => { d.bg('c'); d.r(4, 4, 5, 10, 'w'); d.tri(4, 1, 5, 3, 'b'); d.r(4, 7, 5, 3, 'b'); d.r(10, 8, 4, 6, 'W'); d.r(10, 7, 4, 1, 'b'); d.p('c', 6, 8, 7, 9); d.p('l', 5, 5, 11, 10); }, H);
add(G, B, 'nz-manuka', 'Manuka honey (mật ong hoa manuka)', 'Mānuka honey', 'Mật ong sẫm màu từ hoa cây manuka, vừa là món ăn vừa là sản phẩm xuất khẩu nổi tiếng.',
  d => { d.bg('e'); d.r(4, 5, 8, 9, 'o'); d.r(4, 3, 8, 2, 'k'); d.r(5, 7, 6, 4, 'e'); d.e(8, 9, 1.8, 1.4, 'o'); d.p('w', 6, 4, 9, 4); d.p('y', 12, 2, 13, 1); d.p('Y', 5, 12); }, H);

// ----- Món theo mùa và dịp lễ -----
add(G, C, 'nz-pavlova', 'Pavlova', 'Pavlova', 'Bánh meringue giòn ngoài, mềm trong, phủ kem tươi và trái cây, món tráng miệng không thể thiếu dịp Giáng sinh.',
  d => { d.bg('e'); d.e(8, 11, 7, 3, 'w'); d.e(8, 8, 5, 3.6, 'w'); d.e(8, 6, 4, 2.4, 'e'); d.p('r', 6, 4, 9, 5); d.p('g', 8, 3, 11, 5); d.p('o', 7, 6, 4, 8); d.p('P', 10, 7); d.r(2, 13, 12, 1, 'l'); }, SC);
add(G, C, 'nz-xmasbbq', 'Giáng sinh giữa mùa hè', 'Christmas in midsummer', 'Bữa tiệc thường là thịt nướng ngoài trời, hải sản, salad và trái cây mùa hè vì Giáng sinh rơi vào mùa nóng.',
  d => { d.bg('c'); d.e(13, 2, 2, 2, 'y'); d.r(0, 12, 16, 4, 'h'); d.r(2, 8, 12, 2, 'N'); d.r(3, 10, 1, 4, 'N'); d.r(12, 10, 1, 4, 'N'); d.e(6, 7, 2, 1, 'r'); d.e(10, 7, 2, 1, 'g'); d.p('w', 8, 6); d.tri(6, 1, 4, 4, 'G'); d.p('r', 8, 3, 7, 4); }, SC);
add(G, C, 'nz-hokeypokey', 'Hokey pokey (kẹo mật đường giòn)', 'Hokey pokey', 'Kẹo vàng giòn tan, trộn trong kem vani thành hương vị kem phổ biến.',
  d => { d.bg('e'); d.e(8, 5, 4, 3.4, 'u'); d.p('y', 6, 4, 9, 5, 10, 3, 7, 7); d.p('Y', 5, 5, 8, 4); d.tri(5, 8, 6, 7, 't'); d.p('n', 7, 10, 9, 10, 8, 12); }, SC);
add(G, C, 'nz-lollycake', 'Lolly cake', 'Lolly cake', 'Bánh không nướng làm từ bánh quy vụn và kẹo màu, gặp nhiều trong tiệc sinh nhật trẻ em.',
  d => { d.bg('e'); d.r(2, 6, 12, 7, 'n'); d.r(2, 5, 12, 1, 'w'); d.p('r', 4, 8, 11, 7); d.p('y', 6, 10, 12, 11); d.p('p', 8, 8, 3, 11); d.p('c', 5, 7, 9, 11); d.p('g', 7, 9, 13, 9); d.r(2, 13, 12, 1, 'N'); }, SC);
add(G, C, 'nz-anzac', 'Anzac biscuit (bánh quy Anzac)', 'Anzac biscuit', 'Bánh yến mạch và dừa gắn với ngày tưởng niệm Anzac (Quân đoàn Lục quân Úc và New Zealand) ngày 25 tháng 4.',
  d => { d.bg('e'); d.e(5, 8, 4, 3.6, 'o'); d.e(11, 10, 4, 3.6, 'o'); d.p('Y', 4, 7, 6, 9, 10, 9, 12, 11); d.p('n', 5, 8, 11, 10); d.p('r', 13, 3, 14, 4); d.p('R', 13, 4, 14, 3); }, SC);
add(G, C, 'nz-afghan', 'Bánh Afghan', 'Afghan biscuit', 'Bánh quy sô-cô-la phủ kem sô-cô-la và hạt óc chó, rất phổ biến trong tiệm bánh.',
  d => { d.bg('e'); d.e(8, 9, 6, 5, 'N'); d.e(8, 8, 5, 3.6, 'n'); d.e(8, 8, 3.4, 2.2, 'N'); d.p('w', 7, 7); d.p('t', 6, 8, 9, 9); d.p('k', 4, 10, 12, 9); }, SC);
add(G, C, 'nz-matariki', 'Hāngī dịp Matariki (Tết Māori)', 'Hāngī at Matariki (Māori New Year)', 'Dịp mừng năm mới Māori vào giữa mùa đông, nhiều gia đình làm bữa tiệc chung.',
  d => { d.bg('i'); for (const [x, y] of [[3, 2], [5, 1], [7, 3], [9, 2], [11, 1], [13, 3], [8, 5]]) d.p('y', x, y); d.r(0, 11, 16, 5, 'N'); d.e(8, 12, 5, 2, 'k'); d.p('r', 6, 12, 10, 12); d.p('o', 8, 11); d.p('w', 6, 8, 9, 7, 8, 9); }, SC);
add(G, C, 'nz-bbqweekend', 'Tiệc BBQ cuối tuần', 'Weekend barbecue', 'Nướng xúc xích và thịt ngoài sân vườn, hoạt động xã hội quen thuộc của mùa hè.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'h'); d.r(3, 8, 10, 3, 'k'); d.r(3, 8, 10, 1, 'a'); d.l(4, 11, 3, 15, 'k'); d.l(12, 11, 13, 15, 'k'); d.r(4, 6, 3, 1, 'r'); d.r(8, 6, 4, 1, 'N'); d.p('w', 5, 3, 9, 4, 11, 2); d.e(13, 2, 1.6, 1.6, 'y'); }, SC);
