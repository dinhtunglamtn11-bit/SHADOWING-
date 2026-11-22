import { add, SC, setCC } from './pass-kit.js';
setCC('fr');
// Pháp · Nhóm 3: Ẩm thực
const G = 3, A = 'Món ăn', B = 'Phô mai và bánh', C = 'Đồ uống và rượu vang', E = 'Món theo mùa và dịp lễ';
const H = { use: 'hold' };
const plate = (d, c = 'w') => { d.e(8, 10, 7, 4.6, 'a'); d.e(8, 9.6, 6.4, 4, c); };
const pot = (d, col = 'o') => { d.e(8, 10, 6.4, 4, col); d.r(2, 6, 12, 4, col); d.r(1, 8, 2, 2, 'k'); d.r(13, 8, 2, 2, 'k'); };

// ----- Món ăn -----
add(G, A, 'fr-coqauvin', 'Coq au vin', 'Coq au vin', 'Gà hầm với rượu vang đỏ, nấm và hành nhỏ, món gia đình lâu đời của vùng Bourgogne.',
  d => { d.bg('e'); pot(d, 'N'); d.e(8, 7, 5, 2.2, 'R'); d.e(6, 7, 2, 1.4, 'o'); d.e(10, 7, 1.6, 1.2, 'n'); d.p('w', 5, 6, 11, 8, 8, 6); d.p('g', 7, 8, 9, 7); d.p('w', 4, 3, 9, 2, 12, 4); }, SC);
add(G, A, 'fr-bourguignon', 'Boeuf bourguignon', 'Boeuf bourguignon', 'Thịt bò hầm nhừ trong rượu vang đỏ với cà rốt, hành và nấm, nấu chậm trong nhiều giờ.',
  d => { d.bg('e'); plate(d); d.e(8, 9, 4.6, 3, 'R'); for (const [x, y] of [[5, 8], [8, 9], [11, 8], [7, 11], [10, 11]]) d.r(x, y, 2, 2, 'N'); d.p('o', 6, 10, 10, 8); d.p('w', 9, 9, 5, 11); d.p('g', 7, 7); }, SC);
add(G, A, 'fr-ratatouille', 'Ratatouille (Provence)', 'Ratatouille (Provence)', 'Rau hầm gồm cà tím, bí ngòi, ớt chuông, cà chua và thảo mộc vùng Địa Trung Hải.',
  d => { d.bg('e'); plate(d); for (let i = 0; i < 8; i++) { const a = i * 0.8; d.e(8 + Math.cos(a) * 3, 9 + Math.sin(a) * 2, 1.4, 1.4, ['v', 'g', 'r', 'y', 'v', 'g', 'r', 'o'][i]); } d.e(8, 9, 1.4, 1.2, 'r'); d.p('G', 8, 9); }, SC);
add(G, A, 'fr-bouillabaisse', 'Bouillabaisse (Marseille)', 'Bouillabaisse (Marseille)', 'Món súp hải sản nấu với nghệ tây và thảo mộc, vốn là món của ngư dân dùng những loại cá nhỏ bán không được.',
  d => { d.bg('e'); pot(d, 'a'); d.e(8, 8, 5.6, 2.2, 'o'); d.e(5, 8, 2, 1.2, 'r'); d.e(11, 8, 1.8, 1, 'y'); d.p('w', 7, 8, 9, 7); d.e(8, 7, 1.2, 1, 'r'); d.p('g', 4, 7, 12, 8); }, SC);
add(G, A, 'fr-cassoulet', 'Cassoulet (Toulouse)', 'Cassoulet (Toulouse)', 'Món hầm đậu trắng với thịt vịt, thịt heo và xúc xích, nấu trong nồi đất rất lâu.',
  d => { d.bg('e'); pot(d, 'N'); d.e(8, 8, 5.6, 2.4, 'u'); for (const [x, y] of [[5, 8], [7, 7], [9, 8], [11, 7], [6, 9], [10, 9]]) d.p('w', x, y); d.r(5, 7, 4, 1, 'n'); d.r(8, 8, 4, 1, 'R'); d.p('o', 7, 9, 11, 9); }, SC);
add(G, A, 'fr-quiche', 'Quiche Lorraine', 'Quiche Lorraine', 'Bánh nướng nhân trứng, kem tươi và thịt xông khói, đến từ vùng Lorraine.',
  d => { d.bg('e'); d.e(8, 9, 7, 5, 'o'); d.e(8, 9, 6.2, 4.2, 'O'); d.e(8, 9, 5.4, 3.6, 'y'); d.p('r', 5, 8, 8, 10, 11, 8, 7, 7); d.p('o', 6, 9, 10, 10, 9, 8); d.p('g', 8, 9, 6, 10); d.r(0, 14, 16, 2, 'n'); }, SC);
add(G, A, 'fr-choucroute', 'Choucroute garnie (Alsace)', 'Choucroute garnie (Alsace)', 'Dưa cải muối ăn với xúc xích và thịt heo, chịu ảnh hưởng của ẩm thực Đức.',
  d => { d.bg('e'); plate(d); d.e(8, 9, 5, 3.2, 'u'); d.l(4, 9, 11, 8, 'n'); d.l(4, 10, 11, 9, 'N'); d.l(5, 11, 10, 11, 'x'); d.p('y', 6, 8, 9, 10, 12, 9); d.p('w', 5, 9, 10, 10); }, SC);
add(G, A, 'fr-onionsoup', 'Soupe à l\'oignon', 'French onion soup', 'Súp hành tây nấu chậm cho đến khi ngọt, phủ bánh mì và phô mai nướng.',
  d => { d.bg('e'); d.e(8, 10, 6.4, 4.4, 'w'); d.r(0, 0, 16, 7, '_'); d.r(1, 6, 14, 1, 'l'); d.e(8, 6.5, 6.4, 1.6, 'l'); d.e(8, 7, 5.6, 1.4, 'y'); d.p('o', 5, 7, 9, 6, 11, 7); d.p('n', 7, 7, 10, 7); d.r(5, 14, 6, 1, 'l'); d.p('w', 6, 3, 9, 2, 11, 4); }, SC);
add(G, A, 'fr-escargot', 'Escargots (ốc sên Bourgogne)', 'Escargots (Burgundy snails)', 'Ốc sên nướng với bơ, tỏi và rau mùi tây, món khai vị quen thuộc.',
  d => { d.bg('e'); d.e(8, 9, 7, 5, 'a'); d.e(8, 9, 6, 4, 'l'); for (const [x, y] of [[5, 8], [8, 7], [11, 8], [6, 11], [10, 11]]) { d.e(x, y, 1.4, 1.4, 'n'); d.p('g', x - 1, y + 1, x, y + 1); d.p('y', x, y); } d.p('G', 7, 9, 9, 10); }, SC);
add(G, A, 'fr-steakfrites', 'Steak frites', 'Steak frites', 'Bít tết ăn với khoai tây chiên, món bình dân có mặt ở hầu hết các quán bistro.',
  d => { d.bg('e'); plate(d); d.r(3, 7, 6, 4, 'N'); d.r(3, 7, 6, 1, 'n'); d.p('k', 4, 8, 6, 9, 8, 8); for (let i = 0; i < 4; i++) d.r(9 + i, 6 + (i % 2), 1, 5, 'y'); d.p('Y', 10, 8, 12, 9); d.p('g', 5, 12); }, SC);
add(G, A, 'fr-galette', 'Galette và crêpe (Brittany)', 'Galette and crêpe (Brittany)', 'Bánh kếp mỏng, galette làm từ bột kiều mạch có nhân mặn, crêpe làm từ bột mì có nhân ngọt.',
  d => { d.bg('e'); d.e(8, 9, 7, 5, 'a'); d.e(8, 9, 6.2, 4.4, 'o'); d.r(5, 6, 6, 6, 'y'); d.r(5, 6, 6, 1, 'u'); d.p('r', 7, 8); d.p('w', 8, 9, 6, 10); d.p('O', 3, 8, 12, 10, 5, 12); d.r(0, 14, 16, 2, 'n'); }, SC);
add(G, A, 'fr-fondue', 'Fondue và raclette (Savoie)', 'Fondue and raclette (Savoie)', 'Phô mai nóng chảy ăn cùng bánh mì, khoai tây và thịt nguội, hợp với mùa lạnh vùng núi.',
  d => { d.bg('e'); d.e(8, 11, 6.4, 3.4, 'r'); d.r(2, 8, 12, 3, 'r'); d.e(8, 8, 6, 1.8, 'u'); d.e(8, 8, 5, 1.2, 'y'); d.l(14, 1, 9, 8, 'a'); d.r(11, 2, 3, 3, 't'); d.r(2, 13, 12, 1, 'k'); d.p('w', 5, 6, 7, 4, 4, 3); }, SC);

// ----- Phô mai và bánh -----
add(G, B, 'fr-camembert', 'Camembert (Normandy)', 'Camembert (Normandy)', 'Phô mai mềm vỏ trắng, nặng mùi, làm từ sữa bò ở vùng Normandy.',
  d => { d.bg('e'); d.e(8, 10, 6.4, 3.6, 'w'); d.e(8, 9, 6.4, 3.6, 'l'); d.e(8, 8.6, 5.4, 2.6, 'w'); d.e(8, 8.6, 4, 1.6, 'y'); d.r(1, 10, 14, 2, 'l'); d.p('r', 4, 8, 11, 8, 8, 8); d.p('W', 3, 10, 12, 10); }, SC);
add(G, B, 'fr-brie', 'Brie', 'Brie', 'Phô mai mềm hình tròn dẹt, vỏ trắng, ruột kem mịn, gắn với vùng quanh Paris.',
  d => { d.bg('e'); d.tri(1, 6, 14, 8, 'w'); d.tri(1, 6, 14, 3, 'l'); d.r(1, 11, 14, 1, 'W'); d.r(1, 12, 14, 2, 'y'); d.r(1, 13, 14, 1, 'Y'); d.p('Y', 5, 12, 9, 12, 12, 13); }, SC);
add(G, B, 'fr-roquefort', 'Roquefort', 'Roquefort', 'Phô mai sữa cừu có vân xanh, ủ trong hang đá ở miền nam, vị mặn đậm.',
  d => { d.bg('e'); d.tri(1, 5, 14, 9, 'w'); d.r(1, 10, 14, 4, 'e'); for (const [x, y] of [[4, 11], [7, 9], [10, 11], [6, 12], [12, 12], [9, 7], [5, 8]]) d.p('b', x, y, x + 1, y); d.p('B', 8, 11, 11, 9); d.r(1, 13, 14, 1, 'W'); }, SC);
add(G, B, 'fr-comte', 'Comté', 'Comté', 'Phô mai cứng vùng núi Jura, ủ lâu, vị béo bùi như hạt dẻ.',
  d => { d.bg('e'); d.r(1, 5, 14, 8, 'y'); d.r(1, 5, 14, 1, 'u'); d.r(1, 12, 14, 1, 'Y'); d.e(5, 8, 1.4, 1.4, 'Y'); d.e(10, 9, 1.6, 1.6, 'Y'); d.e(7, 11, 1, 1, 'Y'); d.tri(1, 3, 6, 2, 'y'); d.p('o', 12, 7); }, SC);
add(G, B, 'fr-reblochon', 'Reblochon', 'Reblochon', 'Phô mai mềm vùng Savoie, nguyên liệu của món tartiflette.',
  d => { d.bg('e'); d.e(8, 10, 6.6, 3, 'o'); d.e(8, 9, 6.6, 3, 'o'); d.e(8, 8.6, 5.6, 2.2, 't'); d.e(8, 8.6, 4, 1.4, 'u'); d.r(1, 10, 14, 1, 'O'); d.r(2, 11, 12, 1, 'N'); d.p('O', 4, 8, 11, 8); }, SC);
add(G, B, 'fr-chevre', 'Chèvre', 'Chèvre', 'Phô mai sữa dê, từ mềm tươi đến khô, nhiều ở thung lũng sông Loire.',
  d => { d.bg('e'); d.r(3, 5, 10, 8, 'w'); d.r(3, 5, 10, 1, 'l'); d.e(8, 5, 5, 1.4, 'w'); d.p('a', 5, 8, 9, 8, 11, 10, 6, 11); d.p('g', 7, 3, 9, 3, 8, 2); d.r(2, 13, 12, 1, 'W'); }, SC);
add(G, B, 'fr-baguette', 'Baguette', 'Baguette', 'Ổ bánh mì dài giòn vỏ, mềm ruột, gần như xuất hiện trong mọi bữa ăn của người Pháp.',
  d => { d.bg('c'); d.l(1, 13, 13, 2, 'O'); d.l(2, 14, 14, 3, 'o'); d.l(1, 14, 14, 4, 'o'); d.l(2, 13, 13, 3, 'o'); d.p('u', 5, 10, 8, 7, 11, 4); d.p('O', 3, 12, 6, 9, 9, 6, 12, 3); d.p('t', 4, 11, 7, 8, 10, 5); }, H);
add(G, B, 'fr-croissant', 'Croissant và pain au chocolat', 'Croissant and pain au chocolat', 'Bánh sừng bò nhiều lớp bơ, và bánh nhân sô cô la, món bữa sáng kinh điển.',
  d => { d.bg('e'); d.e(8, 10, 6.4, 3.4, 'o'); d.e(8, 9, 6, 3, 'o'); d.e(8, 11, 5, 2, '_'); d.e(8, 9.5, 6, 3, 'o'); d.e(8, 11.5, 4, 1.8, 'e'); d.p('O', 4, 8, 7, 7, 10, 7, 12, 8); d.p('u', 5, 9, 8, 8, 11, 9); d.p('O', 3, 11, 13, 11); }, SC);
add(G, B, 'fr-macaron', 'Macaron', 'Macaron', 'Bánh hạnh nhân kẹp kem nhiều màu, nổi tiếng nhờ các tiệm bánh ở Paris.',
  d => { d.bg('e'); for (const [x, y, c] of [[4, 9, 'p'], [11, 9, 'g'], [8, 4, 'v'], [8, 12, 'y']]) { d.e(x, y - 1, 3, 1.4, c); d.r(x - 2, y, 5, 1, 'w'); d.e(x, y + 1, 3, 1.2, c); } d.p('w', 2, 2, 14, 1); }, SC);
add(G, B, 'fr-eclair', 'Éclair và mille-feuille', 'Éclair and mille-feuille', 'Bánh kem dài phủ đường chảy và bánh ngàn lớp, hai món điểm tâm tiêu biểu.',
  d => { d.bg('e'); d.r(1, 5, 7, 3, 'N'); d.r(1, 8, 7, 3, 'y'); d.r(1, 11, 7, 2, 'o'); d.r(1, 5, 7, 1, 'n'); d.r(9, 4, 6, 2, 'p'); d.r(9, 6, 6, 1, 'w'); d.r(9, 7, 6, 2, 'u'); d.r(9, 9, 6, 1, 'w'); d.r(9, 10, 6, 3, 'o'); d.p('w', 3, 6, 10, 5); }, SC);
add(G, B, 'fr-cremebrulee', 'Crème brûlée', 'Crème brûlée', 'Bánh kem trứng, phủ lớp đường cháy giòn bên trên.',
  d => { d.bg('e'); d.e(8, 11, 6.4, 3, 'w'); d.r(2, 7, 12, 4, 'w'); d.e(8, 8, 6, 2, 'o'); d.e(8, 8, 5, 1.4, 'O'); d.p('y', 5, 8, 8, 8, 10, 8); d.p('l', 4, 10, 11, 10); d.r(2, 14, 12, 1, 'a'); }, SC);
add(G, B, 'fr-tatin', 'Tarte Tatin', 'Tarte Tatin', 'Bánh táo ngược, caramel và táo được nướng bên dưới rồi lật lại khi ăn.',
  d => { d.bg('e'); d.e(8, 10, 7, 4.4, 'o'); d.e(8, 9, 6.2, 3.6, 'O'); for (let i = 0; i < 6; i++) { const a = i * 1.05; d.e(8 + Math.cos(a) * 3, 9 + Math.sin(a) * 1.8, 1.5, 1.2, 'y'); } d.e(8, 9, 1.4, 1, 'u'); d.p('n', 3, 12, 12, 12); }, SC);
add(G, B, 'fr-madeleine', 'Madeleine và canelé', 'Madeleine and canelé', 'Madeleine là bánh nhỏ hình vỏ sò, canelé là bánh nhỏ cháy xém ở Bordeaux.',
  d => { d.bg('e'); d.fan(5, 11, 4, 'o'); d.fan(5, 11, 4, 'u'); d.r(1, 11, 8, 1, 'O'); d.p('O', 3, 8, 5, 7, 7, 8); d.r(10, 6, 4, 7, 'N'); d.r(10, 6, 4, 1, 'n'); d.r(10, 12, 4, 1, 'k'); d.p('n', 11, 8, 12, 10); }, SC);

// ----- Đồ uống và rượu vang -----
add(G, C, 'fr-bordeauxwine', 'Rượu vang đỏ Bordeaux', 'Bordeaux red wine', 'Dùng chủ yếu các giống nho Cabernet Sauvignon và Merlot, thường để lâu năm.',
  d => { d.r(7, 0, 2, 5, 'G'); d.r(7, 0, 2, 1, 'r'); d.r(5, 5, 6, 9, 'G'); d.tri(5, 4, 6, 2, 'G'); d.r(5, 8, 6, 4, 'e'); d.r(5, 8, 6, 1, 'r'); d.p('R', 8, 10); d.r(5, 14, 6, 1, 'k'); }, H);
add(G, C, 'fr-burgundywine', 'Rượu vang Bourgogne', 'Burgundy wine', 'Nổi tiếng với giống Pinot Noir cho vang đỏ và Chardonnay cho vang trắng.',
  d => { d.r(7, 0, 2, 4, 'g'); d.r(7, 0, 2, 1, 'y'); d.tri(4, 3, 8, 5, 'g'); d.r(4, 7, 8, 7, 'g'); d.r(4, 9, 8, 3, 'e'); d.p('y', 6, 10, 9, 10); d.p('h', 5, 8, 5, 12); d.r(4, 14, 8, 1, 'G'); }, H);
add(G, C, 'fr-champagnedrink', 'Champagne', 'Champagne', 'Rượu vang sủi tăm sản xuất tại vùng Champagne, thường dùng trong dịp lễ và chúc mừng.',
  d => { d.r(3, 3, 4, 7, 'u'); d.r(3, 3, 4, 1, 'w'); d.r(4, 10, 2, 4, 'l'); d.r(2, 14, 6, 1, 'l'); d.r(9, 3, 4, 7, 'u'); d.r(9, 3, 4, 1, 'w'); d.r(10, 10, 2, 4, 'l'); d.r(8, 14, 6, 1, 'l'); d.p('w', 4, 2, 10, 1, 5, 0, 12, 2, 7, 1); d.p('y', 4, 6, 10, 6); }, H);
add(G, C, 'fr-cognac', 'Cognac và Armagnac', 'Cognac and Armagnac', 'Rượu mạnh chưng cất từ nho, ủ trong thùng gỗ sồi, uống sau bữa ăn.',
  d => { d.e(8, 10, 6, 3.6, 'N'); d.r(2, 7, 12, 3, 'N'); d.e(8, 7, 6, 1.4, 'n'); d.p('y', 4, 10, 12, 10); d.r(3, 13, 10, 1, 'k'); d.p('o', 5, 8, 8, 8, 10, 8); d.e(8, 4, 3, 2, 'o'); d.r(5, 4, 6, 3, '_'); d.e(8, 4, 3, 2, 'O'); }, H);
add(G, C, 'fr-calvados', 'Calvados và rượu táo cider (Normandy)', 'Calvados and cider (Normandy)', 'Calvados là rượu mạnh từ táo, cider là rượu táo nhẹ ăn cùng crêpe.',
  d => { d.e(5, 10, 4, 4, 'r'); d.p('g', 5, 5, 6, 4); d.e(5, 9, 1.4, 1.4, 'x'); d.r(10, 5, 4, 9, 'u'); d.r(10, 5, 4, 1, 'w'); d.r(10, 7, 4, 1, 'y'); d.p('w', 11, 9, 12, 11); d.r(10, 14, 4, 1, 'Y'); d.p('R', 3, 11); }, H);
add(G, C, 'fr-pastis', 'Pastis (Marseille)', 'Pastis (Marseille)', 'Rượu hồi, pha nước lạnh thì đổi từ vàng sang đục, thức uống của mùa hè miền nam.',
  d => { d.r(4, 5, 8, 9, 'l'); d.r(4, 5, 8, 1, 'w'); d.r(5, 6, 6, 7, 'u'); d.r(5, 6, 6, 3, 'e'); d.p('w', 6, 8, 9, 10, 7, 12); d.r(4, 13, 8, 1, 'a'); d.p('l', 5, 6); d.e(8, 2, 2, 1.2, 'c'); }, H);
add(G, C, 'fr-kir', 'Kir', 'Kir', 'Rượu vang trắng pha thêm chút rượu mùi lý chua đen, uống trước bữa ăn.',
  d => { d.r(5, 2, 6, 5, 'l'); d.tri(4, 2, 8, 5, 'l'); d.r(5, 4, 6, 3, 'm'); d.p('R', 6, 4, 9, 5); d.r(7, 7, 2, 6, 'l'); d.r(4, 13, 8, 1, 'l'); d.p('v', 6, 3, 10, 3); d.e(11, 3, 1.2, 1.2, 'V'); }, H);
add(G, C, 'fr-cafe', 'Cà phê và café au lait', 'Coffee and café au lait', 'Cà phê đen uống nhanh ở quầy, và cà phê sữa thường uống vào bữa sáng.',
  d => { d.e(7, 11, 6, 3.4, 'w'); d.r(2, 6, 10, 5, 'w'); d.r(2, 6, 10, 1, 'l'); d.r(3, 7, 8, 1, 'n'); d.e(7, 7, 4.6, 1, 'N'); d.l(12, 8, 14, 9, 'w'); d.l(14, 9, 12, 11, 'w'); d.p('w', 5, 3, 8, 2, 10, 4); d.r(1, 14, 12, 1, 'a'); }, H);
add(G, C, 'fr-beaujolais', 'Beaujolais nouveau', 'Beaujolais nouveau', 'Rượu vang đỏ mới, bán vào thứ năm thứ ba của tháng mười một mỗi năm.',
  d => { d.r(7, 0, 2, 4, 'p'); d.r(5, 4, 6, 10, 'G'); d.tri(5, 3, 6, 2, 'G'); d.r(5, 7, 6, 5, 'r'); d.r(5, 7, 6, 1, 'y'); d.p('y', 7, 9, 9, 9); d.p('p', 3, 2, 13, 3); d.r(5, 14, 6, 1, 'k'); }, H);

// ----- Món theo mùa và dịp lễ -----
add(G, E, 'fr-buche', 'Bûche de Noël', 'Bûche de Noël', 'Bánh khúc cây, một chiếc bánh cuộn hình khúc củi, ăn vào Giáng sinh.',
  d => { d.bg('R'); d.r(1, 7, 14, 6, 'N'); d.r(1, 7, 14, 2, 'n'); d.e(15, 10, 1.4, 3, 'e'); d.e(15, 10, 0.8, 1.6, 'n'); d.p('w', 4, 6, 7, 6, 10, 6, 12, 7); d.p('g', 5, 5, 9, 5); d.p('r', 6, 5, 10, 6); d.p('w', 3, 2, 12, 2); d.r(1, 13, 14, 1, 'a'); }, SC);
add(G, E, 'fr-noelfeast', 'Hàu, foie gras và gà tây hạt dẻ', 'Oysters, foie gras and chestnut turkey', 'Bữa tối Giáng sinh thường có hàu tươi, gan ngỗng béo và gà tây nhồi hạt dẻ.',
  d => { d.bg('R'); d.e(5, 9, 4, 3, 'l'); d.e(5, 9, 3, 2, 'w'); d.p('e', 4, 9, 6, 9); d.e(12, 9, 3.4, 3, 'o'); d.e(12, 8, 2.6, 2, 'O'); d.r(1, 12, 14, 2, 'a'); d.p('g', 10, 12, 13, 12); d.p('y', 8, 4, 2, 4, 14, 4); }, SC);
add(G, E, 'fr-galettedesrois', 'Galette des Rois', 'Galette des Rois', 'Bánh ngàn lớp nhân hạnh nhân ăn vào tháng giêng, bên trong giấu một hạt sứ nhỏ (fève); ai tìm thấy sẽ làm vua hoặc hoàng hậu của buổi ăn.',
  d => { d.bg('R'); d.e(8, 9, 6.6, 5.6, 'o'); d.e(8, 9, 5.6, 4.6, 'u'); for (let i = 0; i < 8; i++) { const a = i * 0.785; d.l(8, 9, Math.round(8 + Math.cos(a) * 4.6), Math.round(9 + Math.sin(a) * 3.8), 'o'); } d.e(8, 9, 1.4, 1.4, 'O'); d.r(6, 1, 4, 2, 'y'); d.p('y', 6, 0, 8, 0, 9, 0); d.p('r', 7, 1); }, SC);
add(G, E, 'fr-chandeleur', 'Crêpe ngày Chandeleur', 'Crêpes on La Chandeleur', 'Ngày 2 tháng 2, người Pháp làm bánh crêpe, vừa lật bánh vừa cầm một đồng xu trên tay để cầu may.',
  d => { d.bg('e'); d.e(8, 11, 7, 3, 'a'); d.e(8, 10, 5.6, 2.4, 'o'); d.e(8, 5, 4, 1.6, 'o'); d.p('O', 6, 5, 10, 5); d.l(4, 12, 1, 8, 'N'); d.l(5, 12, 2, 8, 'n'); d.e(12, 5, 1.2, 1.2, 'y'); d.p('Y', 12, 5); d.p('w', 3, 3, 14, 8); }, SC);
add(G, E, 'fr-easterchoc', 'Sô cô la Phục sinh', 'Easter chocolate', 'Trứng và chuông sô cô la bán nhiều vào mùa xuân, theo truyền thuyết do chuông nhà thờ mang từ Roma về.',
  d => { d.bg('h'); d.e(5, 9, 3.6, 4.6, 'N'); d.e(5, 8, 2.4, 3, 'n'); d.p('y', 3, 8, 7, 8, 5, 12); d.tri(9, 5, 6, 8, 'y'); d.r(9, 12, 6, 1, 'Y'); d.e(12, 14, 1.2, 1.2, 'Y'); d.p('g', 12, 2); d.p('w', 3, 3, 13, 4); }, SC);
add(G, E, 'fr-asparagus', 'Măng tây trắng và dâu tây', 'White asparagus and strawberries', 'Những món của mùa xuân, mùa hè được chờ đợi mỗi năm.',
  d => { d.bg('e'); for (const x of [2, 4, 6]) { d.r(x, 4, 1, 9, 'w'); d.r(x - 0, 2, 1, 3, 'p'); d.p('g', x, 2); } d.l(2, 13, 6, 13, 'W'); d.e(11, 8, 2.8, 3, 'r'); d.e(13, 11, 2, 2.4, 'r'); d.p('g', 10, 4, 11, 4, 12, 4, 13, 8, 12, 9); d.p('y', 10, 7, 12, 9, 11, 10, 13, 11); }, SC);
add(G, E, 'fr-truffle', 'Nấm cục (truffe)', 'Truffle', 'Loại nấm quý đào lên từ rễ cây sồi vào mùa đông, đắt đỏ và rất thơm.',
  d => { d.bg('N'); d.e(8, 9, 5.4, 4.6, 'k'); d.e(8, 8.6, 4.8, 4, 'd'); for (const [x, y] of [[5, 7], [8, 6], [10, 8], [6, 10], [9, 11], [11, 10]]) d.p('K', x, y, x + 1, y); d.p('w', 12, 4, 3, 5); d.r(0, 14, 16, 2, 'n'); d.p('G', 2, 13, 12, 13); }, SC);
add(G, E, 'fr-marrons', 'Marrons glacés', 'Marrons glacés', 'Hạt dẻ tẩm đường, món kẹo của cuối năm.',
  d => { d.bg('R'); d.e(5, 9, 3.4, 3, 'n'); d.e(11, 9, 3.4, 3, 'n'); d.e(8, 5, 3.4, 3, 'n'); d.p('t', 4, 8, 10, 8, 7, 4); d.p('N', 3, 11, 12, 11, 8, 7); d.p('u', 4, 8); d.r(1, 13, 14, 2, 'y'); d.p('w', 2, 2, 13, 3); }, SC);
