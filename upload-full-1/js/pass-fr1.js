import { add, SC, setCC } from './pass-kit.js';
setCC('fr');
// Pháp · Nhóm 1: Nơi chốn và thiên nhiên
const G = 1, A = 'Địa danh', B = 'Mùa và thiên nhiên', C = 'Vùng miền', E = 'Hiện tượng đặc biệt';

// ----- Địa danh -----
add(G, A, 'fr-eiffel', 'Tháp Eiffel (Paris)', 'Eiffel Tower (Paris)', 'Tháp sắt cao khoảng 330 m, xây xong năm 1889 cho Hội chợ Thế giới, nay là biểu tượng của nước Pháp.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'g'); d.l(8, 0, 4, 14, 'N'); d.l(8, 0, 12, 14, 'N'); d.l(8, 0, 5, 14, 'n'); d.l(8, 0, 11, 14, 'n'); d.r(6, 5, 4, 1, 'N'); d.r(5, 9, 6, 1, 'N'); d.r(4, 13, 8, 1, 'N'); d.p('y', 8, 0, 7, 7, 9, 7); d.p('N', 8, 6, 8, 10); }, SC);
add(G, A, 'fr-louvre', 'Bảo tàng Louvre (Paris)', 'The Louvre (Paris)', 'Từng là cung điện của các vua Pháp, mở cửa như bảo tàng năm 1793 và hiện là một trong những bảo tàng được ghé thăm nhiều nhất thế giới.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.tri(5, 3, 6, 10, 'l'); d.tri(5, 3, 6, 10, 'c'); d.tri(4, 4, 8, 9, 'l'); d.r(5, 12, 6, 1, 'w'); d.r(0, 8, 4, 5, 'e'); d.r(12, 8, 4, 5, 'e'); d.tri(0, 6, 4, 2, 'A'); d.tri(12, 6, 4, 2, 'A'); d.p('k', 1, 10, 2, 10, 13, 10, 14, 10); d.p('w', 8, 8, 8, 10); }, SC);
add(G, A, 'fr-notredame', 'Nhà thờ Đức Bà Paris (Notre-Dame)', 'Notre-Dame de Paris', 'Nhà thờ Gothic xây từ năm 1163, bị cháy lớn năm 2019 và mở cửa trở lại sau nhiều năm tu bổ.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(2, 3, 4, 11, 'W'); d.r(10, 3, 4, 11, 'W'); d.r(6, 7, 4, 7, 'e'); d.r(2, 3, 4, 1, 'a'); d.r(10, 3, 4, 1, 'a'); d.e(8, 9, 1.8, 1.8, 'v'); d.r(7, 11, 2, 3, 'k'); d.p('k', 3, 6, 4, 6, 11, 6, 12, 6, 3, 9, 12, 9); d.tri(7, 4, 2, 3, 'A'); }, SC);
add(G, A, 'fr-arcdetriomphe', 'Khải Hoàn Môn (Arc de Triomphe)', 'Arc de Triomphe', 'Công trình do Napoléon ra lệnh xây năm 1806 để tưởng nhớ các chiến thắng, đứng ở đầu đại lộ Champs-Élysées.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(2, 3, 12, 11, 'W'); d.r(2, 3, 12, 2, 'e'); d.r(5, 8, 6, 6, 'c'); d.e(8, 8, 3, 2, 'c'); d.p('A', 3, 6, 4, 6, 11, 6, 12, 6, 3, 10, 12, 10); d.r(2, 5, 12, 1, 'a'); d.p('r', 8, 1, 8, 2); }, SC);
add(G, A, 'fr-versailles', 'Cung điện Versailles', 'Palace of Versailles', 'Nơi ở của vua Louis XIV, nổi tiếng với Hành lang Gương và khu vườn rộng lớn.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'g'); d.r(1, 6, 14, 5, 'e'); d.r(6, 4, 4, 2, 'e'); d.r(1, 5, 14, 1, 'A'); for (let x = 2; x < 14; x += 2) d.p('c', x, 8, x, 9); d.p('y', 8, 3, 7, 4, 9, 4); d.r(6, 9, 4, 2, 'W'); d.p('G', 1, 13, 14, 13, 3, 15, 12, 15); d.r(3, 12, 10, 1, 'h'); }, SC);
add(G, A, 'fr-montsaintmichel', 'Mont-Saint-Michel (Normandy)', 'Mont-Saint-Michel (Normandy)', 'Tu viện trên một đảo đá nhỏ ngoài khơi, khi triều lên thì nước biển bao quanh gần như biến nó thành đảo thật sự.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'u'); d.r(0, 13, 16, 3, 'C'); d.tri(2, 5, 12, 8, 'a'); d.tri(5, 3, 6, 5, 'A'); d.r(7, 2, 2, 3, 'a'); d.l(8, 0, 8, 2, 'a'); d.p('y', 8, 0); d.p('k', 6, 8, 9, 8, 7, 10); d.p('w', 3, 14, 11, 15); }, SC);
add(G, A, 'fr-chambord', 'Lâu đài Chambord (sông Loire)', 'Château de Chambord (Loire)', 'Lâu đài do vua François I cho xây, nổi tiếng với cầu thang xoắn ốc kép và hàng trăm ngọn tháp nhỏ trên mái.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(2, 7, 12, 6, 'e'); d.r(0, 6, 3, 7, 'e'); d.r(13, 6, 3, 7, 'e'); d.tri(0, 3, 3, 3, 'A'); d.tri(13, 3, 3, 3, 'A'); for (const x of [4, 6, 9, 11]) { d.r(x, 4, 1, 3, 'W'); d.tri(x - 1, 2, 3, 2, 'A'); } d.p('k', 4, 9, 7, 9, 10, 9, 12, 9); d.r(7, 10, 2, 3, 'N'); }, SC);
add(G, A, 'fr-carcassonne', 'Thành cổ Carcassonne', 'Carcassonne medieval citadel', 'Thành lũy thời trung cổ với nhiều lớp tường và tháp tròn mái nhọn, được giữ gần nguyên vẹn ở miền nam.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(0, 9, 16, 4, 'a'); for (let x = 0; x < 16; x += 2) d.p('a', x, 8); d.r(1, 4, 3, 5, 'A'); d.r(7, 3, 3, 6, 'A'); d.r(12, 4, 3, 5, 'A'); for (const x of [1, 7, 12]) d.tri(x - 1, 1, 5, 3, 'r'); d.r(6, 10, 4, 3, 'k'); d.p('k', 2, 6, 8, 5, 13, 6); }, SC);
add(G, A, 'fr-pontdugard', 'Cầu dẫn nước Pont du Gard', 'Pont du Gard aqueduct', 'Công trình La Mã cao khoảng 49 m, xây hơn hai nghìn năm trước để dẫn nước đến thành phố Nîmes.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'C'); d.r(0, 11, 16, 3, 'u'); d.r(0, 5, 16, 2, 'u'); for (const x of [1, 5, 9, 13]) { d.r(x, 11, 3, 3, '_'); d.e(x + 1, 12, 1.6, 1.6, 'c'); } d.r(0, 12, 16, 2, 'u'); for (const x of [1, 5, 9, 13]) d.e(x + 1.5, 13, 1.8, 2, 'C'); for (const x of [2, 6, 10]) d.e(x + 1.5, 8, 1.6, 1.8, 'c'); d.r(0, 5, 16, 1, 'o'); d.p('G', 0, 4, 15, 4); }, SC);
add(G, A, 'fr-sacrecoeur', 'Montmartre và Thánh đường Sacré-Cœur', 'Montmartre and Sacré-Cœur', 'Ngôi nhà thờ trắng trên đỉnh đồi cao nhất Paris, quanh đó là khu phố của các họa sĩ thế kỷ 19.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.e(8, 14, 9, 3, 'h'); d.r(5, 7, 6, 6, 'w'); d.e(8, 6, 3, 2.4, 'w'); d.e(4, 9, 1.6, 2.4, 'w'); d.e(12, 9, 1.6, 2.4, 'w'); d.l(8, 3, 8, 5, 'a'); d.p('a', 8, 2); d.p('l', 6, 8, 10, 8); d.p('W', 4, 8, 12, 8); }, SC);

// ----- Mùa và thiên nhiên -----
add(G, B, 'fr-lavender', 'Cánh đồng oải hương (Provence)', 'Lavender fields (Provence)', 'Vào khoảng tháng sáu, tháng bảy, những dải hoa tím trải dài và thơm ngào ngạt khắp vùng nam nước Pháp.',
  d => { d.bg('c'); d.tri(0, 3, 16, 3, 'a'); d.r(0, 6, 16, 10, 'v'); for (let y = 7; y < 16; y += 2) for (let x = (y % 4 === 1 ? 0 : 1); x < 16; x += 2) d.put(x, y, 'p'); for (let x = 0; x < 16; x += 3) d.l(x + 1, 6, 8, 3, 'V'); d.r(0, 6, 16, 1, 'g'); d.e(13, 2, 1.4, 1.4, 'y'); }, SC);
add(G, B, 'fr-sunflower', 'Cánh đồng hướng dương', 'Sunflower fields', 'Giữa mùa hè, những cánh đồng vàng quay về mặt trời ở miền tây nam.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'G'); for (const [x, y, r] of [[4, 8, 3], [11, 7, 3.4], [8, 11, 2.4]]) { d.e(x, y, r, r, 'y'); d.e(x, y, r - 1.4, r - 1.4, 'N'); d.l(x, y + 2, x, 15, 'G'); } d.e(14, 2, 1.4, 1.4, 'u'); }, SC);
add(G, B, 'fr-giverny', 'Hoa súng ở vườn Monet (Giverny)', 'Water lilies at Monet\'s garden (Giverny)', 'Ngôi nhà và khu vườn của họa sĩ Claude Monet, nơi có ao hoa súng nổi tiếng trong tranh ông.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'C'); d.r(0, 4, 16, 4, 'G'); d.p('p', 2, 3, 6, 4, 12, 3, 9, 5); d.p('y', 4, 4, 11, 4); d.r(5, 7, 7, 1, 'N'); d.r(4, 6, 1, 2, 'N'); d.r(12, 6, 1, 2, 'N'); d.e(4, 11, 2.2, 1, 'g'); d.e(11, 13, 2.6, 1.2, 'g'); d.e(8, 10, 2, 1, 'g'); d.p('p', 4, 11, 11, 13, 8, 10); d.p('w', 5, 14, 12, 11); }, SC);
add(G, B, 'fr-vendanges', 'Mùa thu hoạch nho (vendanges)', 'Grape harvest (vendanges)', 'Từ cuối hè đến đầu thu, các vùng rượu vang như Bordeaux, Bourgogne, Champagne rộn ràng người hái nho.',
  d => { d.bg('u'); d.r(0, 13, 16, 3, 'G'); d.l(3, 13, 3, 2, 'N'); d.l(12, 13, 12, 2, 'N'); d.l(3, 3, 12, 3, 'N'); for (const x of [5, 7, 9]) for (let i = 0; i < 4; i++) d.p('v', x + (i % 2), 4 + i); d.e(4, 3, 1.6, 1.4, 'g'); d.e(11, 3, 1.6, 1.4, 'g'); d.e(8, 11, 3, 2.2, 'n'); d.r(5, 11, 6, 1, 'N'); d.p('v', 7, 10, 9, 10, 8, 9); }, SC);
add(G, B, 'fr-mimosa', 'Hoa mimosa (Côte d\'Azur)', 'Mimosa blossoms (Côte d\'Azur)', 'Cuối đông, những chùm hoa vàng nở rộ ven bờ biển Địa Trung Hải khi phần lớn châu Âu còn lạnh.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.l(8, 15, 8, 6, 'N'); d.l(8, 10, 3, 5, 'N'); d.l(8, 9, 13, 4, 'N'); for (const [x, y] of [[3, 4], [5, 3], [7, 5], [10, 4], [13, 3], [12, 6], [5, 6], [9, 7]]) { d.e(x, y, 1.4, 1.4, 'y'); } d.p('g', 4, 6, 10, 8, 2, 7); d.p('w', 1, 14, 13, 13); }, SC);
add(G, B, 'fr-fontainebleau', 'Lá vàng rừng Fontainebleau', 'Autumn in the Fontainebleau forest', 'Mùa thu, rừng sồi và dẻ gần Paris đổi màu, là nơi đi dạo quen thuộc cuối tuần.',
  d => { d.bg('u'); d.r(0, 13, 16, 3, 'O'); d.r(3, 6, 2, 8, 'N'); d.r(11, 5, 2, 9, 'N'); d.e(4, 4, 4, 3.4, 'o'); d.e(12, 3, 4, 3.4, 'y'); d.e(8, 5, 3, 2.4, 'r'); d.p('o', 2, 14, 7, 15, 13, 14, 9, 13); d.p('y', 5, 14, 11, 15); }, SC);
add(G, B, 'fr-alpsski', 'Mùa trượt tuyết ở dãy Alps', 'Skiing in the Alps', 'Mùa đông, các khu trượt tuyết như Chamonix, Courchevel đón khách từ nhiều nước.',
  d => { d.bg('c'); d.tri(0, 3, 10, 11, 'A'); d.tri(6, 1, 10, 13, 'w'); d.tri(7, 1, 3, 3, 'l'); d.r(0, 13, 16, 3, 'w'); d.l(3, 6, 13, 12, 'r'); d.e(10, 9, 0.9, 0.9, 'p'); d.p('b', 10, 10); d.l(8, 11, 12, 8, 'N'); d.p('w', 14, 3); }, SC);
add(G, B, 'fr-rapeseed', 'Cánh đồng cải dầu', 'Rapeseed fields', 'Mùa xuân, những tấm thảm vàng phủ đồng bằng phía bắc.',
  d => { d.bg('c'); d.r(0, 6, 16, 3, 'G'); d.r(0, 8, 16, 8, 'y'); for (let y = 9; y < 16; y++) for (let x = y % 2; x < 16; x += 2) d.put(x, y, 'Y'); d.r(0, 8, 16, 1, 'g'); d.tri(1, 3, 5, 3, 'w'); d.e(13, 2.5, 1.6, 1.6, 'o'); d.p('g', 7, 5, 9, 6); }, SC);

// ----- Vùng miền -----
add(G, C, 'fr-iledefrance', 'Île-de-France (Paris)', 'Île-de-France (Paris)', 'Vùng thủ đô, trung tâm chính trị, văn hóa và kinh tế của cả nước.',
  d => { d.bg('B'); d.r(0, 14, 16, 2, 'C'); d.l(8, 1, 6, 12, 'a'); d.l(8, 1, 10, 12, 'a'); d.r(6, 6, 4, 1, 'a'); d.r(0, 11, 5, 3, 'K'); d.r(11, 10, 5, 4, 'K'); d.p('y', 1, 12, 3, 12, 12, 11, 14, 12, 8, 1); d.p('w', 3, 3, 13, 2); }, SC);
add(G, C, 'fr-normandy', 'Normandy', 'Normandy', 'Vùng có bãi biển đổ bộ năm 1944, đồng cỏ để nuôi bò sữa, táo và rượu táo cider.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'g'); d.r(0, 12, 16, 4, 'C'); d.r(0, 12, 16, 1, 'u'); d.e(4, 8, 3, 2.6, 'g'); d.p('r', 3, 7, 5, 8); d.e(11, 9, 2.4, 2, 'w'); d.p('k', 10, 8, 12, 9, 11, 10); d.r(10, 10, 1, 2, 'd'); d.r(12, 10, 1, 2, 'd'); d.p('w', 2, 14, 9, 15, 13, 14); }, SC);
add(G, C, 'fr-brittany', 'Brittany (Bretagne)', 'Brittany (Bretagne)', 'Vùng biển ở tây bắc với văn hóa Celt, tiếng Breton và bánh crepe.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.r(5, 4, 4, 7, 'w'); d.tri(4, 2, 6, 2, 'r'); d.r(5, 6, 4, 1, 'r'); d.r(2, 11, 12, 1, 'A'); d.r(0, 12, 6, 4, 'a'); d.p('w', 2, 14, 9, 14, 12, 13); d.p('y', 6, 7); d.e(3, 3, 1.4, 1.4, 'w'); }, SC);
add(G, C, 'fr-loire', 'Thung lũng sông Loire', 'Loire Valley', 'Vùng của hàng trăm lâu đài thời Phục Hưng, vườn nho và rượu vang trắng.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.l(0, 14, 15, 12, 'C'); d.l(0, 15, 15, 13, 'b'); d.r(2, 6, 4, 6, 'e'); d.tri(1, 3, 6, 3, 'A'); d.r(3, 8, 1, 2, 'k'); d.r(8, 8, 6, 4, 'e'); d.tri(7, 5, 8, 3, 'A'); d.p('G', 7, 12, 14, 11, 6, 13); d.p('v', 9, 12, 12, 12); }, SC);
add(G, C, 'fr-alsace', 'Alsace', 'Alsace', 'Vùng biên giới đông bắc, nhà gỗ phơi màu, ẩm thực và tiếng địa phương pha chút ảnh hưởng của Đức.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(1, 6, 6, 7, 'w'); d.tri(0, 3, 8, 3, 'R'); d.r(9, 7, 6, 6, 'y'); d.tri(8, 4, 8, 3, 'r'); for (const [x, y] of [[1, 6], [4, 6], [6, 6], [1, 12], [6, 12]]) d.r(x, y, 1, 1, 'N'); d.l(1, 12, 6, 7, 'N'); d.l(6, 12, 1, 7, 'N'); d.p('r', 3, 9, 11, 9, 13, 9); d.p('N', 10, 8, 14, 8, 12, 11); }, SC);
add(G, C, 'fr-provence', 'Provence và Côte d\'Azur', 'Provence and Côte d\'Azur', 'Vùng nắng ấm ở đông nam, có đồng oải hương, dầu ô liễu và bãi biển nổi tiếng như Nice, Cannes.',
  d => { d.bg('c'); d.e(13, 3, 2.2, 2.2, 'y'); d.r(0, 9, 16, 3, 'C'); d.r(0, 12, 16, 4, 'v'); d.r(0, 12, 16, 1, 'V'); d.l(4, 9, 4, 4, 'N'); d.e(4, 4, 2.6, 2, 'G'); d.p('g', 3, 3, 5, 5); d.p('p', 2, 13, 6, 14, 10, 13, 13, 15); d.p('w', 8, 10, 11, 11); }, SC);
add(G, C, 'fr-bordeaux', 'Bordeaux (Aquitaine)', 'Bordeaux (Aquitaine)', 'Thủ phủ của rượu vang đỏ Pháp, nhiều châu (château) đứng giữa vườn nho.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'g'); for (let y = 12; y < 16; y += 2) d.r(0, y, 16, 1, 'G'); d.r(4, 5, 8, 6, 'W'); d.tri(3, 3, 10, 3, 'A'); d.r(2, 6, 2, 5, 'e'); d.r(12, 6, 2, 5, 'e'); d.tri(1, 4, 4, 2, 'A'); d.tri(11, 4, 4, 2, 'A'); d.p('k', 6, 8, 9, 8); d.r(7, 8, 2, 3, 'N'); for (const x of [2, 6, 10, 13]) d.p('v', x, 13); }, SC);
add(G, C, 'fr-burgundy', 'Bourgogne (Burgundy)', 'Burgundy (Bourgogne)', 'Vùng rượu vang và thịt bò hầm, nổi tiếng với giống nho Pinot Noir và Chardonnay.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'g'); d.l(0, 15, 15, 9, 'G'); d.l(0, 12, 15, 8, 'G'); d.l(0, 9, 8, 8, 'G'); for (const [x, y] of [[3, 13], [8, 11], [12, 9], [6, 15], [13, 13]]) d.e(x, y, 1.4, 1.4, 'v'); d.r(11, 3, 3, 5, 'W'); d.tri(10, 1, 5, 2, 'R'); d.p('w', 3, 3, 7, 2); }, SC);
add(G, C, 'fr-champagne', 'Champagne', 'Champagne', 'Vùng sản xuất rượu vang sủi tăm cùng tên, chỉ rượu ở đúng vùng đó mới được gọi là champagne.',
  d => { d.bg('u'); d.r(6, 0, 4, 2, 'y'); d.r(6, 2, 4, 3, 'G'); d.tri(4, 5, 8, 9, 'G'); d.r(5, 9, 6, 4, 'e'); d.r(5, 9, 6, 1, 'y'); d.r(5, 12, 6, 1, 'y'); d.p('w', 2, 2, 13, 3, 3, 7, 12, 6, 14, 10, 1, 11); d.p('y', 8, 11, 12, 1); }, SC);
add(G, C, 'fr-savoie', 'Savoie và Alps', 'Savoie and the Alps', 'Vùng núi cao với phô mai, trượt tuyết và đỉnh Mont Blanc.',
  d => { d.bg('c'); d.tri(0, 6, 8, 8, 'A'); d.tri(4, 1, 10, 13, 'K'); d.tri(7, 1, 4, 4, 'w'); d.tri(10, 7, 6, 7, 'a'); d.r(0, 13, 16, 3, 'g'); d.r(1, 10, 3, 3, 'N'); d.tri(0, 8, 5, 2, 'n'); d.p('w', 12, 2, 2, 3); }, SC);
add(G, C, 'fr-corsica', 'Corse (Corsica)', 'Corsica', 'Hòn đảo núi non ở Địa Trung Hải, quê hương của Napoléon, có ẩm thực và văn hóa riêng.',
  d => { d.bg('C'); d.e(8, 8, 4, 6.4, 'g'); d.e(8, 6, 3, 3.6, 'G'); d.p('a', 7, 4, 8, 3, 9, 4); d.p('w', 8, 3); d.p('w', 1, 3, 14, 12, 2, 14, 13, 2); d.p('u', 6, 11, 9, 12); }, SC);

// ----- Hiện tượng đặc biệt -----
add(G, E, 'fr-tides', 'Thủy triều ở Mont-Saint-Michel', 'Tides at Mont-Saint-Michel', 'Chênh lệch giữa triều lên và triều xuống thuộc loại lớn nhất châu Âu, nước rút ra xa nhiều cây số rồi đổ về rất nhanh.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'u'); d.r(0, 12, 16, 4, 'C'); d.l(0, 12, 15, 11, 'c'); d.tri(5, 3, 6, 6, 'a'); d.r(7, 1, 2, 3, 'A'); d.p('w', 1, 13, 6, 14, 12, 13, 14, 15); d.p('n', 2, 10, 13, 10, 8, 11); }, SC);
add(G, E, 'fr-mistral', 'Gió Mistral', 'The Mistral wind', 'Gió lạnh, khô và mạnh thổi xuống thung lũng sông Rhône đến Provence, thường làm trời trở nên rất trong.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); for (const y of [3, 6, 9]) { d.l(0, y, 9, y, 'w'); d.p('w', 10, y - 1, 11, y - 2); } d.l(11, 13, 12, 8, 'G'); d.l(12, 8, 14, 7, 'G'); d.l(4, 13, 6, 10, 'G'); d.p('g', 13, 7, 5, 10); }, SC);
add(G, E, 'fr-pilat', 'Đồi cát Pilat (Dune du Pilat)', 'Dune du Pilat', 'Đồi cát lớn nhất châu Âu ở vùng bờ biển Atlantic phía tây nam, cao hơn 100 m.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.tri(0, 4, 16, 9, 'u'); d.tri(2, 6, 12, 7, 'e'); d.l(3, 11, 9, 4, 'o'); d.p('G', 13, 3, 14, 4, 12, 4); d.p('w', 5, 14, 11, 15); d.e(13, 1.5, 1.2, 1.2, 'y'); }, SC);
add(G, E, 'fr-montblanc', 'Mont Blanc', 'Mont Blanc', 'Đỉnh núi cao khoảng 4.800 m trên biên giới Pháp – Ý, thường được xem là nóc nhà của dãy Alps.',
  d => { d.bg('c'); d.tri(0, 8, 8, 7, 'a'); d.tri(4, 1, 10, 14, 'K'); d.tri(6, 1, 6, 6, 'w'); d.tri(11, 6, 5, 9, 'A'); d.r(0, 13, 16, 3, 'w'); d.p('l', 8, 3, 7, 6, 9, 5); d.p('r', 8, 0); d.p('w', 2, 3, 13, 4); }, SC);
add(G, E, 'fr-verdon', 'Hẻm núi Gorges du Verdon', 'Verdon Gorge', 'Khúc sông xanh ngọc chảy giữa vách đá cao, người ta gọi là "Grand Canyon của châu Âu".',
  d => { d.bg('c'); d.r(0, 0, 5, 16, 'n'); d.r(11, 0, 5, 16, 'n'); d.r(0, 0, 3, 16, 'N'); d.r(13, 0, 3, 16, 'N'); d.r(5, 9, 6, 7, 'C'); d.l(8, 9, 8, 15, 'c'); d.r(5, 4, 2, 5, 'n'); d.r(9, 5, 2, 4, 'n'); d.p('G', 1, 1, 14, 2, 4, 0); d.p('w', 7, 12, 9, 14); }, SC);
add(G, E, 'fr-lascaux', 'Hang Lascaux', 'Lascaux cave', 'Hang động ở miền tây nam có những bức vẽ trên vách đá của người tiền sử, được cho là có tuổi khoảng 17.000 năm.',
  d => { d.bg('N'); d.e(8, 8, 7, 7, 'n'); d.e(8, 9, 6, 6, 'O'); d.e(6, 9, 2.8, 1.8, 'R'); d.e(11, 8, 1.8, 1.6, 'R'); d.p('R', 8, 7, 4, 8, 4, 11, 9, 11, 13, 9); d.p('k', 5, 8, 12, 7); d.p('o', 2, 4, 13, 12); d.r(0, 14, 16, 2, 'N'); }, SC);
add(G, E, 'fr-annecy', 'Hồ Annecy', 'Lake Annecy', 'Hồ nước trong vắt dưới chân núi Alps, thường được xem là một trong những hồ sạch nhất châu Âu.',
  d => { d.bg('c'); d.tri(0, 2, 8, 7, 'A'); d.tri(7, 3, 9, 6, 'K'); d.tri(10, 3, 3, 2, 'w'); d.r(0, 9, 16, 7, 'C'); d.r(0, 9, 16, 1, 'G'); d.r(2, 10, 12, 2, 'c'); d.r(0, 8, 16, 1, 'g'); d.p('w', 4, 13, 11, 14, 8, 15); d.p('r', 13, 10); }, SC);
