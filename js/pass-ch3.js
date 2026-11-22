import { add, SC, setCC } from './pass-kit.js';
setCC('ch');
// Thụy Sĩ · Nhóm 3: Ẩm thực
const G = 3, A = 'Món ăn', B = 'Đồ ngọt, đồ uống và rượu', C = 'Món theo mùa và dịp lễ';
const H = { use: 'hold' };
const plate = (d, bg = 'e') => { d.bg(bg); d.e(8, 9, 7, 5, 'w'); d.e(8, 9, 5.8, 4, 'W'); };

// ----- Món ăn -----
add(G, A, 'ch-fondue', 'Fondue phô mai', 'Cheese fondue', 'Nồi phô mai chảy (thường là Gruyère và Vacherin pha rượu vang trắng) được đun trên bếp nhỏ ở giữa bàn. Mọi người dùng nĩa dài nhúng bánh mì, và thường ăn kèm trà nóng hoặc rượu vang trắng để dễ tiêu.',
  d => { d.bg('e'); d.e(8, 10, 6.4, 3.8, 'r'); d.r(2, 8, 12, 1, 'R'); d.e(8, 8.6, 5.2, 1.4, 'y'); d.r(5, 13, 6, 2, 'k'); d.p('o', 8, 15); d.l(12, 2, 9, 8, 'a'); d.r(11, 1, 3, 2, 't'); d.p('Y', 6, 8, 10, 9); }, SC);
add(G, A, 'ch-raclette', 'Raclette', 'Raclette', 'Người ta nướng nửa tảng phô mai cho chảy rồi gạt lên khoai tây luộc, ăn cùng dưa chuột muối và hành ngâm. Món này rất phổ biến ở Valais và trong các bữa tối mùa đông.',
  d => { plate(d); d.e(5, 9, 2.2, 1.6, 'u'); d.e(9, 8, 2.2, 1.6, 'u'); d.r(3, 10, 9, 2, 'y'); d.p('Y', 4, 10, 8, 11, 11, 10); d.p('g', 12, 7, 13, 9); d.p('v', 6, 7, 11, 11); }, SC);
add(G, A, 'ch-rosti', 'Rösti', 'Rösti', 'Khoai tây bào sợi, ép chặt rồi chiên vàng giòn ngoài mềm trong. Ban đầu là món sáng của nông dân vùng Bern, nay thành món ăn kèm quốc dân và còn là gốc của chữ Röstigraben, "rãnh rösti" chỉ ranh giới văn hóa giữa vùng nói tiếng Đức và tiếng Pháp.',
  d => { plate(d); d.e(8, 9, 5, 3.4, 'Y'); d.e(8, 8.6, 4.2, 2.6, 'y'); for (const [x, y] of [[5, 8], [7, 7], [9, 9], [11, 8], [6, 10], [10, 10]]) d.p('O', x, y); d.p('G', 13, 6, 3, 6); }, SC);
add(G, A, 'ch-alplermagronen', 'Älplermagronen', 'Älplermagronen', 'Món mì ống nấu với khoai tây, phô mai, kem và hành chiên, ăn kèm sốt táo. Đây là món của người chăn bò trên núi, dùng nguyên liệu dễ cất giữ.',
  d => { plate(d); d.e(7, 8, 4, 2.8, 'y'); for (const [x, y] of [[5, 7], [7, 9], [9, 7], [6, 10], [9, 10]]) d.r(x, y, 2, 1, 'u'); d.p('n', 5, 6, 8, 6, 10, 9); d.e(13, 9, 1.6, 1.6, 'r'); d.p('R', 13, 9); }, SC);
add(G, A, 'ch-geschnetzeltes', 'Zürcher Geschnetzeltes', 'Zürcher Geschnetzeltes', 'Thịt bê thái mỏng xào với nấm và sốt kem rượu vang trắng, thường ăn cùng rösti. Món này gắn với Zurich và xuất hiện trong nhiều nhà hàng truyền thống.',
  d => { plate(d); d.e(6, 9, 4, 3, 'Y'); d.e(10, 9, 4.4, 3.4, 'u'); for (const [x, y] of [[9, 8], [11, 9], [10, 11], [12, 10]]) d.p('t', x, y); d.p('n', 10, 9, 11, 10, 9, 10); d.p('G', 8, 6, 12, 7); }, SC);
add(G, A, 'ch-bundner', 'Bündnerfleisch và Capuns', 'Bündnerfleisch and Capuns', 'Bündnerfleisch là thịt bò phơi khô trong gió núi vùng Graubünden, thái lát rất mỏng. Capuns là lá cải củ cuộn bột trứng và thịt muối, nấu trong sữa hoặc nước dùng.',
  d => { plate(d); d.e(5, 9, 2.6, 1.8, 'm'); d.e(8, 8, 2.6, 1.8, 'R'); d.e(5, 11, 2.6, 1.6, 'R'); d.p('x', 4, 9, 8, 8); d.r(10, 7, 4, 2, 'G'); d.r(10, 10, 4, 2, 'g'); d.p('h', 11, 7, 12, 10); }, SC);
add(G, A, 'ch-pizzoccheri', 'Pizzoccheri và polenta ở Ticino', 'Pizzoccheri and polenta in Ticino', 'Ở vùng nói tiếng Ý, người ta ăn mì kiều mạch với bắp cải, khoai tây và phô mai, hoặc polenta hầm cùng thịt. Các món này gần với ẩm thực miền bắc nước Ý.',
  d => { plate(d); d.e(7, 9, 4.4, 2.8, 'n'); for (let x = 4; x < 11; x += 2) d.p('N', x, 8, x + 1, 10); d.p('g', 5, 9, 9, 8); d.p('y', 6, 10, 10, 9); d.r(11, 8, 3, 3, 'y'); d.r(11, 8, 3, 1, 'u'); d.p('r', 12, 9); }, SC);
add(G, A, 'ch-saucisson', 'Saucisson vaudois', 'Saucisson vaudois', 'Xúc xích thịt lợn hun khói của bang Vaud, thường luộc ăn với tỏi tây và khoai tây. Nó là món của mùa đông và các hội chợ.',
  d => { plate(d); d.e(8, 8, 5, 2, 'n'); d.e(8, 8, 4, 1.2, 'm'); d.p('t', 6, 8, 10, 8); d.r(3, 11, 6, 1, 'g'); d.r(3, 12, 6, 1, 'h'); d.e(12, 11, 1.8, 1.4, 'u'); d.e(11, 12, 1.4, 1, 'y'); }, SC);
add(G, A, 'ch-cervelat', 'Cervelat', 'Cervelat', 'Xúc xích bò và lợn được coi là xúc xích quốc dân, thường nướng trên lửa trại với hai vết rạch chéo. Món này quen thuộc trong các buổi dã ngoại.',
  d => { d.bg('G'); d.r(0, 13, 16, 3, 'N'); d.p('r', 3, 14, 6, 14, 9, 14); d.p('o', 4, 12, 7, 12, 8, 13); d.l(1, 3, 13, 9, 'n'); d.e(8, 6, 4.6, 1.6, 'm'); d.l(5, 5, 6, 7, 'R'); d.l(8, 5, 9, 7, 'R'); d.l(11, 5, 12, 7, 'R'); d.p('x', 6, 5, 9, 5); }, SC);

// ----- Đồ ngọt, đồ uống và rượu -----
add(G, B, 'ch-chocolate', 'Sô cô la Thụy Sĩ', 'Swiss chocolate', 'Một trong những hình ảnh nổi tiếng nhất của đất nước, với Lindt, Toblerone, Cailler hay Sprüngli. Sô cô la sữa mịn mượt có được nhờ những cải tiến công thức ở thế kỷ 19.',
  d => { d.bg('e'); d.r(2, 3, 12, 10, 'N'); for (let y = 3; y < 13; y += 3) for (let x = 2; x < 14; x += 3) { d.r(x, y, 3, 3, 'n'); d.p('N', x + 2, y, x, y + 2); } d.r(2, 13, 12, 1, 'r'); d.p('y', 5, 14, 8, 14); }, SC);
add(G, B, 'ch-toblerone', 'Toblerone', 'Toblerone', 'Thanh sô cô la hình tam giác có hạnh nhân và mật ong, ra đời ở Bern năm 1908. Hình dạng thường được cho là gợi nhớ dãy núi, nhưng đây chỉ là cách giải thích phổ biến chứ không phải lúc nào cũng chắc chắn.',
  d => { d.bg('e'); d.tri(1, 4, 14, 9, 'y'); d.tri(2, 5, 12, 7, 'n'); d.r(1, 13, 14, 1, 'Y'); d.p('y', 3, 12, 6, 12, 9, 12, 12, 12); d.p('r', 7, 6, 8, 6); d.p('w', 8, 4); d.p('N', 5, 9, 10, 9, 7, 11); }, SC);
add(G, B, 'ch-muesli', 'Birchermüesli', 'Birchermüesli', 'Món yến mạch ngâm sữa với táo bào, hạt và trái cây do bác sĩ Maximilian Bircher-Benner phát triển ở Zurich đầu thế kỷ 20. Ngày nay muesli được ăn khắp thế giới.',
  d => { d.bg('e'); d.e(8, 10, 6, 4.4, 'w'); d.e(8, 9, 5, 3, 'u'); d.p('t', 5, 8, 8, 7, 10, 9, 7, 10, 11, 8); d.p('r', 9, 7, 6, 9); d.p('b', 10, 10); d.p('G', 8, 6, 12, 10); d.r(11, 1, 1, 6, 'a'); }, SC);
add(G, B, 'ch-wine', 'Rượu vang Thụy Sĩ', 'Swiss wine', 'Các vườn nho bậc thang quanh hồ Geneva (Lavaux) và Valais cho vang trắng như Chasselas và vang đỏ như Pinot Noir. Phần lớn được tiêu thụ trong nước nên ít khi xuất khẩu.',
  d => { d.bg('e'); d.e(5, 6, 2.4, 3, 'W'); d.e(5, 7, 2, 1.8, 'y'); d.l(5, 9, 5, 13, 'a'); d.r(3, 14, 5, 1, 'a'); d.e(11, 6, 2.4, 3, 'W'); d.e(11, 7, 2, 1.8, 'm'); d.l(11, 9, 11, 13, 'a'); d.r(9, 14, 5, 1, 'a'); d.p('G', 8, 2, 9, 3); d.p('v', 8, 3); }, SC);
add(G, B, 'ch-absinthe', 'Absinthe ở Val-de-Travers', 'Absinthe from Val-de-Travers', 'Rượu thảo mộc màu xanh có hồi và ngải đắng, có nguồn gốc vùng Neuchâtel. Từng bị cấm ở Thụy Sĩ hơn một thế kỷ và được hợp pháp trở lại năm 2005.',
  d => { d.bg('e'); d.tri(4, 2, 8, 8, 'h'); d.r(7, 9, 2, 4, 'g'); d.r(4, 13, 8, 1, 'G'); d.r(4, 2, 8, 1, 'w'); d.l(3, 4, 12, 1, 'a'); d.p('w', 6, 5, 8, 6); d.p('G', 10, 3, 5, 14); d.p('g', 13, 14, 2, 14); }, SC);
add(G, B, 'ch-rivella', 'Rivella', 'Rivella', 'Nước giải khát làm từ váng sữa, có vị ngọt nhẹ như thảo mộc, xuất hiện từ thập niên 1950. Nhiều người nước ngoài thấy lạ lần đầu uống.',
  d => { d.bg('e'); d.r(6, 1, 4, 2, 'k'); d.r(7, 3, 2, 2, 'r'); d.r(5, 5, 6, 10, 'r'); d.r(5, 7, 6, 4, 'w'); d.p('r', 7, 8, 9, 9, 8, 10); d.p('R', 5, 14, 10, 14); d.p('l', 5, 6); }, H);
add(G, B, 'ch-ovo', 'Ovomaltine', 'Ovomaltine', 'Bột mạch nha, trứng và ca cao pha với sữa, được phát triển ở Bern cuối thế kỷ 19. Nhiều người dùng làm đồ uống nóng hoặc phết lên bánh mì.',
  d => { d.bg('e'); d.r(4, 3, 8, 11, 'o'); d.r(3, 2, 10, 2, 'k'); d.r(4, 7, 8, 3, 'w'); d.p('o', 6, 8, 8, 9, 10, 8); d.p('O', 4, 13, 11, 13); d.p('y', 5, 5, 10, 5); }, H);
add(G, B, 'ch-kirsch', 'Kirsch', 'Kirsch', 'Rượu mạnh chưng cất từ quả anh đào, dùng trong fondue và làm bánh. Nó cũng được uống như rượu tiêu hóa sau bữa.',
  d => { d.bg('e'); d.e(5, 11, 2.4, 2.4, 'r'); d.e(10, 12, 2.4, 2.4, 'R'); d.l(5, 9, 7, 5, 'G'); d.l(10, 10, 8, 5, 'G'); d.p('G', 8, 4); d.r(11, 3, 3, 2, 'a'); d.r(12, 5, 1, 4, 'l'); d.p('w', 5, 10, 10, 11); }, SC);

// ----- Món theo mùa và dịp lễ -----
add(G, C, 'ch-winterdish', 'Fondue và raclette mùa đông', 'Winter fondue and raclette', 'Hai món này gần như là biểu tượng của những buổi tối lạnh. Gia đình và bạn bè thường quây quần quanh nồi chung.',
  d => { d.bg('k'); d.r(0, 10, 16, 6, 'N'); d.e(8, 9, 4, 2, 'r'); d.e(8, 8.4, 3, 1, 'y'); d.p('o', 8, 11, 7, 11, 9, 11); for (const x of [1, 13]) { d.e(x + 1, 6, 1.4, 1.4, 's'); d.r(x, 8, 3, 4, 'b'); } d.p('y', 2, 2, 12, 3, 7, 1); d.p('w', 5, 3, 11, 5); }, SC);
add(G, C, 'ch-vermicelles', 'Hạt dẻ và Vermicelles mùa thu', 'Chestnuts and Vermicelles', 'Hạt dẻ rang bán ở các góc phố, còn Vermicelles là kem hạt dẻ đùn thành sợi trên kem tươi và bánh meringue. Đây là món tráng miệng mùa thu ở nhiều nơi.',
  d => { d.bg('e'); d.e(8, 11, 6, 3, 'w'); d.tri(3, 3, 10, 9, 'N'); for (let y = 4; y < 11; y += 2) d.l(5 + (y - 4) / 2, y, 11 - (y - 4) / 2, y, 'n'); d.p('t', 8, 2); d.p('w', 6, 10, 10, 10); }, SC);
add(G, C, 'ch-sechselauten', 'Lễ Sechseläuten và Böögg', 'Sechseläuten and the Böögg', 'Lễ mùa xuân ở Zurich có diễu hành và đốt hình nhân tuyết, kèm xúc xích nướng. Người ta tin thời gian hình nhân bị cháy đến lúc đầu nổ báo trước mùa hè.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'G'); d.r(7, 8, 2, 6, 'N'); d.e(8, 5, 2.4, 2.4, 'w'); d.e(8, 9, 3, 2.6, 'w'); d.p('k', 7, 5, 9, 5); d.r(7, 3, 2, 1, 'k'); d.p('r', 8, 6); d.tri(4, 9, 8, 5, 'o'); d.tri(6, 10, 4, 4, 'y'); d.p('r', 3, 12, 12, 11); }, SC);
add(G, C, 'ch-zopf', 'Bánh mì bện Zopf', 'Zopf braided bread', 'Bánh mì bơ sữa bện tóc, ăn vào bữa sáng Chủ nhật. Nó xuất hiện trên bàn của nhiều gia đình.',
  d => { d.bg('e'); d.e(8, 9, 6.6, 3.6, 'O'); d.e(8, 8.4, 6, 3, 'o'); for (let x = 3; x < 14; x += 2) d.l(x, 6, x + 1, 11, 'O'); for (let x = 4; x < 13; x += 3) d.p('y', x, 7, x + 1, 9); d.p('y', 7, 6, 10, 6); }, SC);
add(G, C, 'ch-lackerli', 'Basler Läckerli và Gâteau du Vully', 'Basler Läckerli and Gâteau du Vully', 'Basler Läckerli là bánh gừng mật ong với hạnh nhân của Basel, còn Gâteau du Vully là bánh ngọt phủ kem. Cả hai thường được làm vào dịp lễ và hội chợ.',
  d => { d.bg('e'); d.r(2, 4, 7, 5, 'n'); d.r(2, 4, 7, 2, 'w'); d.p('t', 3, 7, 5, 8, 7, 7); d.e(11, 10, 4, 3, 'y'); d.e(11, 9.4, 3.4, 2, 'u'); d.p('r', 10, 8, 12, 9); d.p('N', 3, 5, 6, 5); }, SC);
add(G, C, 'ch-kuchli', 'Fasnacht Küechli', 'Fasnacht Küechli', 'Bánh chiên mỏng rắc đường, ăn trong dịp lễ hội mùa đông. Chúng thường được bán ở các chợ phiên.',
  d => { d.bg('e'); d.e(8, 8, 6, 5, 'O'); d.e(8, 8, 5.2, 4.2, 'o'); d.e(8, 8, 3, 2.4, 'O'); for (const [x, y] of [[4, 6], [7, 5], [10, 6], [12, 9], [9, 11], [5, 10]]) d.p('w', x, y); d.p('w', 8, 8); }, SC);
add(G, C, 'ch-guetzli', 'Weihnachtsguetzli', 'Weihnachtsguetzli', 'Bánh quy Giáng sinh với nhiều hình dạng và hương vị như quế, hạnh nhân và chanh. Nhiều nhà làm và tặng cho hàng xóm.',
  d => { d.bg('G'); d.tri(1, 4, 5, 5, 'o'); d.e(10, 6, 3, 3, 'y'); d.p('r', 10, 6); d.r(2, 11, 5, 3, 'n'); d.p('w', 3, 12, 5, 12); d.e(12, 12, 2, 2, 'O'); d.p('r', 12, 12); d.p('w', 3, 6, 9, 5, 11, 8, 7, 10); }, SC);
add(G, C, 'ch-nationalday', 'Ngày Quốc khánh 1/8', 'National Day, August 1', 'Người ta nướng xúc xích, thắp đèn lồng và bắn pháo hoa. Bữa ăn ngoài trời với Cervelat là hình ảnh quen thuộc.',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'G'); d.p('y', 3, 2, 8, 1, 13, 3, 5, 5, 11, 5); d.p('r', 3, 3, 4, 2, 2, 2, 13, 2, 12, 4, 14, 4); d.p('w', 8, 2, 8, 0, 7, 1, 9, 1, 5, 4, 11, 6); d.r(5, 8, 6, 5, 'r'); d.r(7, 9, 2, 3, 'w'); d.r(6, 10, 4, 1, 'w'); d.e(14, 11, 1.4, 1.8, 'r'); d.e(2, 11, 1.4, 1.8, 'y'); }, SC);
