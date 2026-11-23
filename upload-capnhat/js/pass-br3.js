import { add, SC, setCC } from './pass-kit.js';
setCC('br');
// Brasil · Nhóm 3: Ẩm thực
const G = 3, A = 'Món ăn', B = 'Đồ uống và trà/rượu', C = 'Món theo mùa và dịp lễ';
const H = { use: 'hold' };

// ----- Món ăn -----
add(G, A, 'br-feijoada', 'Feijoada (món hầm đậu đen)', 'Feijoada (black bean stew)', 'Món hầm đậu đen với nhiều loại thịt heo và xúc xích, ăn kèm cơm trắng, cải xanh xào và cam cắt lát; thường nấu vào thứ Bảy và ăn chậm cùng bạn bè.',
  d => { d.bg('e'); d.e(8, 9, 7, 5, 'N'); d.e(8, 9, 6, 4, 'k'); d.e(5, 8, 1.4, 1, 'r'); d.e(10, 7, 1.4, 1, 'o'); d.e(9, 11, 1.4, 1, 'r'); d.e(6, 11, 1, 1, 'O'); d.p('K', 7, 8, 11, 10, 8, 6); d.r(0, 0, 3, 3, 'w'); d.r(13, 1, 3, 3, 'o'); d.p('g', 14, 0); }, H);
add(G, A, 'br-pao-de-queijo', 'Pão de queijo (bánh phô mai sắn)', 'Pão de queijo (cheese bread)', 'Bánh nhỏ tròn làm từ bột sắn và phô mai, vỏ giòn nhẹ, ruột dai mềm; đặc trưng của bang Minas Gerais, ăn bữa sáng hoặc ăn nhẹ buổi chiều.',
  d => { d.bg('e'); for (const [x, y] of [[5, 6], [10, 6], [8, 10], [3, 11], [12, 11]]) { d.e(x, y, 3, 2.8, 'o'); d.e(x - 0.5, y - 0.5, 1.6, 1.4, 'y'); d.put(x + 1, y + 1, 'O'); } }, H);
add(G, A, 'br-churrasco', 'Churrasco (thịt nướng xiên)', 'Churrasco (skewered grilled meat)', 'Thịt nướng xiên trên than hồng rồi cắt thẳng vào đĩa của khách tại bàn; gắn với vùng chăn bò miền Nam, đặc biệt là quán churrascaria.',
  d => { d.bg('e'); d.l(2, 14, 13, 3, 'a'); d.e(5, 11, 2.2, 2, 'N'); d.e(8, 8, 2.2, 2, 'n'); d.e(11, 5, 2.2, 2, 'N'); d.p('O', 5, 11, 8, 8); d.p('r', 4, 10, 7, 7, 10, 4); d.p('r', 0, 15, 15, 14); d.r(0, 14, 16, 2, 'r'); d.p('o', 2, 14, 7, 15, 12, 14); d.p('y', 4, 15, 10, 14); }, H);
add(G, A, 'br-moqueca', 'Moqueca (hầm cá nước cốt dừa)', 'Moqueca (fish and coconut stew)', 'Món hầm cá hoặc tôm với nước cốt dừa, cà chua, hành và ngò, nấu trong nồi đất; moqueca Bahia dùng dầu cọ, moqueca Espírito Santo thì không.',
  d => { d.bg('e'); d.e(8, 10, 7, 4.6, 'N'); d.e(8, 8, 6.4, 3, 'o'); d.e(8, 8, 5.2, 2.2, 'u'); d.e(6, 8, 2.6, 1, 'o'); d.p('k', 4, 8); d.p('r', 9, 7, 11, 9); d.p('g', 7, 6, 12, 8); d.p('w', 5, 3, 8, 2, 11, 3); }, H);
add(G, A, 'br-acaraje', 'Acarajé (bánh đậu chiên)', 'Acarajé (black-eyed pea fritter)', 'Bánh làm từ đậu đũa nghiền chiên trong dầu cọ rồi bổ ra nhồi tôm khô, rau và sốt cay; các bà bán bánh mặc trang phục Baiana đứng bán ngay trên đường phố Salvador.',
  d => { d.bg('e'); d.e(8, 9, 7, 4.4, 'O'); d.e(8, 8, 6, 3, 'o'); d.r(2, 9, 12, 2, 'u'); d.p('r', 4, 9, 7, 10, 11, 9); d.p('g', 5, 10, 9, 9, 12, 10); d.p('Y', 4, 6, 8, 5, 11, 6); }, H);
add(G, A, 'br-coxinha', 'Coxinha (bánh gà chiên hình giọt nước)', 'Coxinha (teardrop chicken croquette)', 'Bánh chiên hình giọt nước, vỏ bột bọc nhân thịt gà xé và phô mai kem; món ăn vặt phổ biến nhất ở quán ăn nhanh, tiệm bánh và tiệc sinh nhật.',
  d => { d.tri(3, 3, 10, 11, 'o'); d.e(8, 11, 5, 3.4, 'o'); d.tri(5, 3, 6, 6, 'y'); d.p('O', 4, 11, 11, 11, 8, 13, 6, 9, 10, 8); d.p('y', 7, 5, 8, 6); d.p('u', 7, 10); }, H);
add(G, A, 'br-farofa', 'Farofa (bột sắn rang)', 'Farofa (toasted cassava flour)', 'Bột sắn rang với bơ, hành và đôi khi có thịt xông khói, rắc lên cơm hoặc thịt; gần như có mặt trong mọi bữa nướng và feijoada.',
  d => { d.bg('e'); d.e(8, 11, 7, 3, 'w'); d.e(8, 9, 5, 4, 'u'); d.e(8, 8, 3.4, 2.6, 'y'); for (const [x, y] of [[5, 7], [7, 5], [10, 6], [11, 9], [4, 10], [9, 9], [6, 9]]) d.put(x, y, 'O'); d.p('Y', 8, 4, 6, 6); d.p('r', 10, 8); }, H);
add(G, A, 'br-tapioca', 'Tapioca (bánh bột sắn)', 'Tapioca (cassava crepe)', 'Bột sắn rây ướt, trải lên chảo nóng thành miếng bánh mỏng rồi gập đôi cùng nhân phô mai, dừa hoặc chuối; xuất phát từ người bản địa vùng đông bắc.',
  d => { d.bg('e'); d.e(8, 9, 7, 5, 'w'); d.r(1, 9, 14, 5, '_'); d.e(8, 11, 7, 4, 'w'); d.e(8, 9, 6, 2, 'u'); d.r(1, 11, 14, 1, 'W'); d.p('y', 4, 9, 8, 9, 12, 9); d.p('W', 3, 8, 12, 8); d.p('k', 2, 12, 13, 12); }, H);

// ----- Đồ uống và trà/rượu -----
add(G, B, 'br-caipirinha', 'Caipirinha', 'Caipirinha', 'Cocktail làm từ cachaça, chanh xanh, đường và đá; thức uống quốc gia của Brasil, có mặt ở bữa tiệc, quán bar và bãi biển.',
  d => { d.r(4, 4, 8, 9, 'l'); d.r(5, 5, 6, 7, 'h'); d.r(6, 7, 2, 2, 'w'); d.r(9, 9, 2, 2, 'w'); d.r(5, 13, 6, 1, 'a'); d.r(3, 3, 10, 1, 'g'); d.e(12, 3, 2.4, 2.4, 'g'); d.e(12, 3, 1.4, 1.4, 'h'); d.l(8, 1, 10, 7, 'r'); }, H);
add(G, B, 'br-cachaca', 'Cachaça (rượu mía)', 'Cachaça (sugarcane spirit)', 'Rượu mạnh chưng cất từ nước mía tươi, khác với rum làm từ mật mía; Brasil có hàng nghìn nhãn thủ công, nhiều loại ủ trong thùng gỗ bản địa.',
  d => { d.r(6, 1, 4, 3, 'N'); d.r(5, 4, 6, 10, 'u'); d.r(5, 4, 6, 1, 'o'); d.r(5, 7, 6, 4, 'w'); d.r(6, 8, 4, 2, 'g'); d.r(5, 13, 6, 1, 'Y'); d.l(3, 2, 3, 12, 'g'); d.l(13, 4, 13, 14, 'G'); }, H);
add(G, B, 'br-cafezinho', 'Cà phê (cafezinho)', 'Coffee (cafezinho)', 'Ly cà phê nhỏ, đậm và ngọt, rót từ phích hoặc bình lọc cho khách; Brasil là nước sản xuất cà phê lớn nhất thế giới nên mời cà phê là phép lịch sự gần như bắt buộc.',
  d => { d.bg('e'); d.r(4, 8, 7, 5, 'w'); d.r(5, 9, 5, 2, 'N'); d.r(11, 9, 2, 3, 'w'); d.r(12, 10, 1, 1, 'e'); d.r(3, 13, 10, 1, 'W'); d.p('l', 6, 5, 8, 4, 7, 2, 9, 6); }, H);
add(G, B, 'br-guarana', 'Nước ngọt Guaraná', 'Guaraná soda', 'Nước ngọt có ga làm từ quả guaraná của vùng Amazon, vị gần giống táo và hơi the; nhãn như Guaraná Antarctica có mặt gần như ở mọi bàn ăn.',
  d => { d.r(5, 1, 6, 2, 'G'); d.r(6, 3, 4, 2, 'y'); d.r(4, 5, 8, 9, 'y'); d.r(4, 5, 8, 1, 'Y'); d.r(4, 8, 8, 3, 'g'); d.e(8, 9, 2, 1, 'r'); d.p('w', 5, 6, 5, 12); d.r(4, 13, 8, 1, 'Y'); }, H);
add(G, B, 'br-chimarrao', 'Chimarrão (trà mate nóng)', 'Chimarrão (hot mate)', 'Trà mate nóng uống bằng bình quả bầu và ống hút kim loại, phổ biến ở miền Nam; mọi người chuyền một bình quanh vòng, là dấu hiệu của sự hiếu khách.',
  d => { d.bg('e'); d.e(7, 10, 5, 5, 'n'); d.e(7, 7, 4, 1.6, 'G'); d.e(7, 7, 3, 1, 'g'); d.l(9, 7, 13, 1, 'a'); d.p('A', 13, 0); d.p('N', 3, 11, 11, 12, 7, 14); d.p('l', 4, 4, 8, 3, 12, 6); }, H);
add(G, B, 'br-acai', 'Nước ép açaí và nước dừa', 'Açaí and coconut water', 'Açaí là quả tím của cọ Amazon, thường xay đông lạnh như sinh tố đặc; nước dừa tươi được bán ở quầy bãi biển ngay trong trái dừa xanh.',
  d => { d.e(4, 10, 3.6, 4.4, 'g'); d.e(4, 9, 2, 2, 'h'); d.p('w', 3, 7, 5, 8); d.l(5, 3, 8, 0, 'w'); d.r(8, 7, 6, 7, 'v'); d.r(8, 7, 6, 2, 'p'); d.r(8, 7, 6, 1, 'w'); d.r(9, 5, 4, 2, 'V'); d.p('P', 9, 10, 12, 12); d.p('y', 13, 5); }, H);
add(G, B, 'br-chopp', 'Bia (cerveja) và chopp', 'Beer (cerveja) and chopp', 'Bia tươi nhạt uống thật lạnh trong ly nhỏ, thường kèm món nhậu; nhiều quán bar đổi ly liên tục để bia luôn mát.',
  d => { d.r(3, 3, 7, 11, 'l'); d.r(4, 5, 5, 8, 'y'); d.r(3, 2, 7, 3, 'w'); d.r(10, 5, 3, 6, 'W'); d.r(11, 6, 1, 4, '_'); d.p('Y', 5, 7, 7, 9, 5, 11); d.p('w', 4, 1, 7, 1, 9, 2); d.r(3, 13, 7, 1, 'a'); }, H);

// ----- Món theo mùa và dịp lễ -----
add(G, C, 'br-brigadeiro', 'Brigadeiro (kẹo sô-cô-la sữa đặc)', 'Brigadeiro (chocolate fudge ball)', 'Viên kẹo sô-cô-la tròn làm từ sữa đặc, bột cacao và bơ, lăn qua cốm sô-cô-la; hầu như có mặt ở mọi tiệc sinh nhật của trẻ em.',
  d => { d.bg('p'); for (const [x, y] of [[4, 5], [11, 5], [8, 9], [4, 12], [12, 12]]) { d.e(x, y, 2.6, 2.6, 'N'); d.p('k', x - 1, y - 1, x + 1, y); d.p('K', x, y + 1); } d.r(0, 14, 16, 2, 'w'); }, H);
add(G, C, 'br-bolo-de-rolo', 'Bolo de rolo (bánh cuộn mứt ổi)', 'Bolo de rolo (guava roll cake)', 'Bánh cuộn mỏng nhiều lớp với nhân mứt ổi, đặc sản của bang Pernambuco; được xem như một di sản ẩm thực của vùng đông bắc.',
  d => { d.bg('e'); d.e(8, 9, 6.4, 5, 'u'); d.e(8, 9, 4.6, 3.4, 'r'); d.e(8, 9, 3, 2, 'u'); d.e(8, 9, 1.4, 1, 'r'); d.r(2, 13, 12, 1, 'Y'); d.p('w', 12, 4); }, H);
add(G, C, 'br-festa-junina', 'Món lễ hội Festa Junina (pamonha, canjica, quentão)', 'Festa Junina foods (pamonha, canjica, quentão)', 'Tháng Sáu, người ta ăn ngô luộc, bánh ngô pamonha, canjica (cháo ngô ngọt) và uống quentão, rượu nóng có gừng; gắn với lễ hội mùa thu hoạch và các thánh tháng Sáu.',
  d => { d.bg('e'); d.e(5, 8, 3, 6, 'y'); d.e(5, 8, 3, 6, 'y'); d.r(3, 7, 4, 6, 'u'); d.p('Y', 4, 5, 5, 9, 4, 11); d.tri(1, 9, 4, 6, 'g'); d.tri(6, 9, 4, 6, 'G'); d.r(10, 7, 5, 6, 'o'); d.r(10, 7, 5, 1, 'O'); d.r(14, 8, 1, 3, 'o'); d.p('w', 12, 3, 11, 5); }, H);
add(G, C, 'br-natal', 'Bữa tối Giáng sinh (gà tây, rabanada)', 'Christmas dinner (turkey, rabanada)', 'Nhiều gia đình ăn gà tây hoặc thịt nguội, cơm với nho khô và hạt khô; bánh panettone và rabanada (bánh mì chiên phủ đường) xuất hiện trên bàn tiệc.',
  d => { d.bg('G'); d.e(8, 10, 6, 4, 'o'); d.e(8, 9, 5, 3, 'O'); d.r(1, 9, 3, 3, 'o'); d.r(12, 9, 3, 3, 'o'); d.r(3, 13, 10, 2, 'w'); d.p('r', 7, 1, 8, 2, 9, 1); d.p('y', 3, 4, 13, 4, 8, 5); d.p('w', 14, 2, 2, 2); }, H);
add(G, C, 'br-pascoa', 'Trứng sô-cô-la Phục sinh (ovo de Páscoa)', 'Easter chocolate egg (ovo de Páscoa)', 'Trứng sô-cô-la lớn nhồi kẹo, thường được tặng cho trẻ em vào Chủ nhật Phục sinh; các tiệm sô-cô-la bán rất đa dạng trong mùa này.',
  d => { d.bg('p'); d.e(8, 9, 5, 6.4, 'N'); d.e(8, 8, 4, 5, 'n'); d.p('y', 6, 6, 10, 6, 8, 10); d.r(4, 9, 8, 1, 'r'); d.r(4, 9, 8, 1, 'y'); d.p('b', 5, 12, 11, 12); d.p('w', 6, 5, 7, 4); }, H);
add(G, C, 'br-reveillon', 'Bữa tối đêm giao thừa (đậu lăng, nho)', 'New Year\'s Eve dinner (lentils, grapes)', 'Nhiều người ăn thịt heo, đậu lăng hoặc nho, tin rằng sẽ mang lại may mắn và tiền bạc; món lentilha là biểu tượng của sự sung túc.',
  d => { d.bg('k'); d.e(5, 11, 4.4, 3, 'w'); d.e(5, 10, 3.4, 2, 'n'); for (const [x, y] of [[4, 9], [5, 10], [6, 9], [4, 11]]) d.put(x, y, 'N'); for (const [x, y] of [[10, 9], [12, 9], [11, 11], [13, 11], [11, 7], [12, 13]]) d.e(x, y, 1.2, 1.2, 'v'); d.p('y', 2, 2, 8, 1, 13, 3); d.p('w', 5, 3, 11, 2); }, H);
