import { add, SC, setCC } from './pass-kit.js';
setCC('ar');
// Argentina · Nhóm 3: Ẩm thực
const G = 3, A = 'Món ăn', B = 'Đồ uống và trà/rượu', C = 'Món theo mùa và dịp lễ';
const H = { use: 'hold' };

// ----- Món ăn -----
add(G, A, 'ar-asado', 'Asado (tiệc nướng)', 'Asado (the barbecue feast)', 'Buổi tiệc nướng gồm sườn bò, xúc xích, lòng và nhiều phần thịt khác, nướng chậm trên than hồng. Đây là nghi thức gia đình thường vào ngày Chủ nhật và các dịp ăn mừng.',
  d => { d.bg('e'); d.r(1, 11, 14, 4, 'k'); d.p('r', 2, 12, 5, 13, 8, 12, 11, 13, 13, 12); d.p('o', 3, 13, 9, 13, 12, 14); d.l(1, 10, 14, 10, 'a'); d.e(5, 7, 3, 2, 'N'); d.e(11, 7, 3, 2.2, 'n'); d.r(7, 5, 2, 4, 'r'); d.p('O', 4, 7, 10, 8); d.p('w', 3, 2, 8, 1, 12, 3, 6, 3); }, H);
add(G, A, 'ar-empanada', 'Empanada', 'Empanada', 'Bánh nhân nướng hoặc chiên với nhân thịt bò, gà, phô mai hoặc ngô ngọt. Mỗi tỉnh có cách gập và nhân riêng; Tucumán nổi tiếng với loại nhỏ nhân thịt bò băm tay.',
  d => { d.bg('e'); d.fan(8, 12, 7, 'o'); d.r(1, 12, 14, 2, 'O'); d.fan(8, 12, 5.4, 'y'); d.p('O', 2, 11, 4, 9, 6, 7, 9, 7, 11, 9, 13, 11); d.p('N', 3, 12, 5, 12, 7, 12, 9, 12, 11, 12, 13, 12); d.p('w', 6, 9, 8, 8, 10, 10); }, H);
add(G, A, 'ar-milanesa', 'Milanesa', 'Milanesa', 'Lát thịt bò hoặc gà tẩm bột rồi chiên, ăn cùng khoai tây chiên. Biến thể "milanesa a la napolitana" phủ thêm sốt cà chua và phô mai.',
  d => { d.bg('e'); d.e(7, 8, 6, 4.4, 'y'); d.e(7, 8, 5, 3.4, 'o'); d.p('O', 4, 7, 8, 6, 10, 9, 6, 10); d.p('y', 5, 8, 9, 8); d.r(11, 2, 1, 5, 'y'); d.r(13, 3, 1, 5, 'y'); d.r(9, 3, 1, 4, 'y'); d.p('Y', 11, 6, 13, 7, 9, 6); d.p('r', 6, 7, 8, 9); }, H);
add(G, A, 'ar-locro', 'Locro', 'Locro', 'Món hầm ngô, đậu, thịt và bí ngô đặc trưng của miền bắc, ăn vào ngày quốc khánh 25 tháng Năm. Món này có nguồn gốc từ người bản địa vùng Andes.',
  d => { d.bg('e'); d.e(8, 9, 7, 5, 'N'); d.r(1, 7, 14, 2, 'n'); d.e(8, 8, 6, 1.6, 'o'); d.p('y', 4, 8, 7, 8, 10, 8, 12, 8); d.p('w', 5, 8, 9, 8, 11, 8); d.p('r', 6, 9, 9, 9); d.p('w', 5, 3, 8, 2, 11, 4, 7, 1); d.p('O', 3, 12, 8, 13, 13, 12); }, H);
add(G, A, 'ar-choripan', 'Choripán', 'Choripán', 'Bánh mì kẹp xúc xích chorizo nướng, thêm sốt chimichurri. Đây là món ăn vặt phổ biến ở sân vận động và chợ ven đường.',
  d => { d.bg('e'); d.e(8, 11, 7, 3.2, 't'); d.e(8, 6, 7, 3, 't'); d.r(2, 8, 12, 2, 'O'); d.e(8, 8, 6.4, 1.6, 'r'); d.e(8, 8, 6.4, 1, 'R'); d.p('g', 4, 7, 7, 7, 10, 7, 12, 7); d.p('G', 5, 7, 9, 7); d.p('o', 3, 5, 6, 4, 10, 4, 13, 5); d.p('N', 3, 12, 8, 13, 12, 12); }, H);
add(G, A, 'ar-pizza', 'Pizza kiểu Buenos Aires', 'Buenos Aires-style pizza', 'Pizza dày, nhiều phô mai, ăn kèm fainá (bánh đậu gà nướng). Nhiều tiệm pizza lâu đời gắn liền với người nhập cư Ý.',
  d => { d.bg('e'); d.e(8, 8, 7, 7, 'O'); d.e(8, 8, 6, 6, 'y'); d.p('r', 5, 4, 10, 5, 4, 9, 9, 8, 7, 12, 12, 10); d.p('g', 7, 5, 11, 8, 5, 11, 9, 11, 6, 7); d.p('w', 8, 6, 5, 7, 11, 11, 7, 9, 10, 9); d.l(8, 1, 8, 15, 'O'); d.l(1, 8, 15, 8, 'O'); }, H);
add(G, A, 'ar-provoleta', 'Provoleta', 'Provoleta', 'Lát phô mai provolone nướng trên vỉ, rắc oregano. Thường ăn khai vị trước asado.',
  d => { d.bg('e'); d.e(8, 9, 7, 4.4, 'y'); d.e(8, 9, 6, 3.6, 'u'); d.p('O', 4, 8, 7, 7, 10, 9, 12, 8, 6, 11, 9, 11); d.p('g', 5, 9, 8, 8, 11, 10, 7, 10, 10, 8); d.r(1, 12, 14, 1, 'k'); d.l(1, 14, 14, 14, 'a'); d.p('r', 3, 13, 12, 13); d.p('w', 6, 3, 9, 2); }, H);
add(G, A, 'ar-humita', 'Humita', 'Humita', 'Bột ngô non nghiền gói trong vỏ ngô rồi hấp, từ ẩm thực Andes. Một phiên bản khác nấu thành hỗn hợp như súp đặc.',
  d => { d.bg('e'); d.e(8, 9, 4, 6, 'y'); d.e(8, 9, 3, 5, 'u'); d.l(4, 3, 1, 14, 'g'); d.l(5, 2, 2, 14, 'h'); d.l(11, 3, 14, 14, 'g'); d.l(10, 2, 13, 14, 'h'); d.p('Y', 7, 7, 9, 8, 7, 10, 9, 11, 8, 13); d.p('N', 8, 1, 8, 2); }, H);

// ----- Đồ uống và trà/rượu -----
add(G, B, 'ar-matetea', 'Mate (thức uống quốc gia)', 'Mate (the national drink)', 'Trà yerba mate nóng uống chung theo vòng. Vị đắng nhẹ như râu cỏ, và người ta uống quanh năm.',
  d => { d.bg('e'); d.e(8, 10, 5, 4.6, 'G'); d.r(3, 6, 10, 2, '_'); d.e(8, 7, 4.6, 1.6, 'g'); d.p('h', 6, 7, 9, 7); d.p('w', 6, 3, 8, 2, 10, 4, 7, 1, 9, 0); d.l(10, 7, 14, 2, 'a'); d.p('A', 14, 1); d.p('N', 5, 12, 10, 13); }, H);
add(G, B, 'ar-malbec', 'Rượu vang Malbec', 'Malbec wine', 'Giống nho đỏ có nguồn gốc Pháp nhưng trở thành biểu tượng của Argentina, trồng nhiều ở Mendoza. Rượu có vị trái cây đậm và đứng tốt cùng thịt nướng.',
  d => { d.bg('e'); d.r(6, 1, 4, 5, 'G'); d.r(5, 5, 6, 10, 'G'); d.r(6, 6, 4, 8, 'm'); d.r(5, 5, 6, 1, 'g'); d.r(7, 1, 2, 2, 'y'); d.p('V', 7, 8, 8, 11, 6, 12); d.p('w', 6, 7, 6, 9); d.p('v', 12, 9, 13, 8, 12, 11, 13, 12); d.p('g', 14, 7); }, H);
add(G, B, 'ar-torrontes', 'Torrontés', 'Torrontés', 'Giống nho trắng thơm đặc trưng của Salta và các vùng cao. Rượu tươi mát, thích hợp với hải sản và món nhẹ.',
  d => { d.bg('e'); d.fan(8, 7, 5, 'u'); d.r(3, 7, 10, 1, 'y'); d.e(8, 7, 5, 4.4, 'u'); d.r(3, 3, 10, 3, 'e'); d.r(7, 11, 2, 3, 'l'); d.r(5, 14, 6, 1, 'l'); d.p('w', 5, 6, 5, 8); d.p('y', 7, 9, 9, 8); d.p('g', 13, 3, 14, 4); }, H);
add(G, B, 'ar-fernet', 'Fernet con Coca', 'Fernet con Coca', 'Cocktail pha rượu thảo mộc Fernet và Coca-Cola, đặc biệt phổ biến ở Córdoba. Nhiều nhóm bạn trẻ uống món này trong các buổi tiệc.',
  d => { d.bg('e'); d.r(4, 2, 8, 12, 'N'); d.r(4, 2, 8, 2, 'n'); d.r(5, 4, 6, 9, 'k'); d.p('w', 5, 3, 7, 2, 9, 3, 6, 5, 8, 6, 10, 5, 7, 8, 9, 10, 6, 11); d.p('r', 12, 6); d.l(11, 1, 13, 5, 'r'); d.p('l', 5, 4); }, H);
add(G, B, 'ar-cortado', 'Cà phê cắt và medialunas', 'Café cortado and medialunas', 'Cà phê đậm pha chút sữa, ăn kèm bánh sừng bò nhỏ. Đây là bữa sáng và bữa chiều quen thuộc ở các quán cà phê cổ.',
  d => { d.bg('e'); d.r(2, 9, 7, 4, 'w'); d.r(3, 13, 5, 1, 'W'); d.r(9, 10, 2, 2, 'W'); d.r(3, 9, 5, 1, 'N'); d.p('n', 4, 10, 6, 10); d.p('w', 4, 6, 6, 5, 5, 3); d.fan(12, 13, 3, 'O'); d.fan(12, 13, 2, 'o'); d.r(9, 13, 6, 2, 'O'); d.p('y', 11, 11, 13, 12); }, H);
add(G, B, 'ar-licuado', 'Licuado và nước ép', 'Licuado and fruit juice', 'Sinh tố trái cây pha sữa hoặc nước, phổ biến trong mùa hè. Nhiều tiệm bán loại này cùng bánh mì kẹp.',
  d => { d.bg('e'); d.r(4, 4, 8, 10, 'p'); d.r(4, 4, 8, 1, 'P'); d.r(5, 13, 6, 1, 'P'); d.p('w', 5, 6, 5, 7); d.l(9, 4, 12, 0, 'r'); d.e(6, 3, 2, 1.4, 'o'); d.p('g', 5, 2, 7, 2); d.p('P', 8, 8, 10, 10); }, H);
add(G, B, 'ar-beer', 'Bia và quán bar', 'Beer and the bar', 'Bia lạnh phổ biến tại các quán bar quanh Palermo. Nhiều người uống bia khi xem bóng đá.',
  d => { d.bg('e'); d.r(3, 4, 8, 10, 'y'); d.r(3, 1, 8, 3, 'w'); d.p('W', 4, 2, 7, 1, 9, 2); d.r(11, 6, 3, 6, 'a'); d.r(12, 7, 1, 4, 'e'); d.p('Y', 4, 6, 4, 9, 4, 12, 9, 12); d.p('o', 6, 7, 8, 9, 6, 11); d.p('w', 5, 8, 9, 10); }, H);

// ----- Món theo mùa và dịp lễ -----
add(G, C, 'ar-dulce', 'Dulce de leche', 'Dulce de leche', 'Sốt sữa đặc nấu với đường thành màu nâu caramen, dùng quết bánh, bánh quy và kem. Nhiều người coi đây là hương vị Argentina nổi tiếng nhất.',
  d => { d.bg('e'); d.r(3, 5, 10, 9, 'O'); d.r(3, 5, 10, 2, 'o'); d.r(2, 3, 12, 3, 'w'); d.r(4, 7, 8, 5, 'N'); d.r(5, 8, 6, 3, 'n'); d.p('y', 6, 8, 9, 9); d.p('w', 5, 3, 10, 3); d.p('k', 3, 13, 12, 13); }, H);
add(G, C, 'ar-alfajor', 'Alfajor', 'Alfajor', 'Bánh quy kẹp dulce de leche, thường phủ sô-cô-la hoặc bột dừa. Đây là món quà nhỏ phổ biến nhất.',
  d => { d.bg('e'); d.e(8, 6, 6, 2.4, 'N'); d.r(2, 6, 12, 1, 'N'); d.e(8, 9, 5.4, 1.6, 'o'); d.r(3, 9, 10, 1, 'O'); d.e(8, 12, 6, 2.4, 'N'); d.p('n', 5, 5, 9, 5, 6, 12, 10, 12); d.p('w', 3, 8, 13, 8, 8, 4); }, H);
add(G, C, 'ar-pandulce', 'Pan dulce và sidra dịp Giáng sinh', 'Pan dulce and cider at Christmas', 'Bánh ngọt có trái cây khô và rượu táo có ga cho đêm Noel. Nhiều gia đình ăn tối muộn quanh nửa đêm.',
  d => { d.bg('e'); d.r(1, 8, 8, 6, 'O'); d.e(5, 8, 4, 3, 'o'); d.p('r', 3, 9, 6, 8, 5, 11, 7, 10); d.p('g', 4, 11, 7, 12); d.p('w', 2, 7, 8, 7); d.r(11, 5, 3, 9, 'G'); d.r(12, 2, 1, 3, 'G'); d.r(11, 3, 3, 1, 'y'); d.p('l', 11, 7, 11, 10); d.p('y', 12, 11, 12, 12); }, H);
add(G, C, 'ar-vitel', 'Vitel toné', 'Vitel toné', 'Thịt bê luộc nguội phủ sốt cá ngừ và kem, thường ăn trong bữa tối Giáng sinh mùa hè. Món có nguồn gốc Ý.',
  d => { d.bg('e'); d.e(8, 10, 7, 4, 'w'); d.e(8, 10, 6, 3, 'W'); d.fan(5, 10, 3, 'p'); d.fan(10, 10, 3, 'p'); d.p('e', 5, 8, 6, 9, 10, 8, 9, 9); d.p('g', 7, 7, 8, 7, 13, 8); d.p('r', 8, 9, 11, 10); d.p('G', 6, 7, 9, 7); }, H);
add(G, C, 'ar-tortafrita', 'Torta frita', 'Torta frita', 'Bánh chiên tròn ăn vào những ngày mưa hoặc lạnh. Món này thường đi kèm mate.',
  d => { d.bg('e'); d.e(8, 9, 6.4, 5.4, 'O'); d.e(8, 8, 6, 4.4, 'o'); d.e(8, 8, 4, 3, 'y'); d.p('O', 4, 7, 8, 6, 11, 9, 6, 11); d.p('w', 7, 7, 9, 9, 6, 9); d.p('b', 2, 2, 3, 3, 4, 2); d.p('w', 12, 2); }, H);
add(G, C, 'ar-locro25', 'Locro ngày 25 tháng Năm', 'The 25 de Mayo locro', 'Gia đình nấu locro lớn để kỷ niệm ngày Cách mạng tháng Năm 1810. Đây là dịp ăn mừng lâu đời của cả nước.',
  d => { d.bg('c'); d.r(0, 0, 16, 5, 'w'); d.r(0, 5, 16, 6, 'c'); d.r(0, 11, 16, 5, 'w'); d.e(8, 8, 3, 3, 'y'); for (let a = 0; a < 12; a++) { const t = a / 12 * 6.28; d.put(8 + Math.cos(t) * 4.4, 8 + Math.sin(t) * 4.4, 'o'); } d.e(8, 8, 1.6, 1.6, 'Y'); d.p('y', 2, 2, 13, 2); }, SC);
