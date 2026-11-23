import { add, SC, setCC } from './pass-kit.js';
setCC('au');
// Úc · Nhóm 3: Ẩm thực
const G = 3, A = 'Món ăn', B = 'Đồ uống và rượu', C = 'Món ngọt và món theo dịp';
const H = { use: 'hold' };
const plate = (d, bg = 'e') => { d.bg(bg); d.e(8, 9, 7, 5, 'w'); d.e(8, 9, 5.8, 4, 'W'); };
const glass = (d, x, c) => { d.r(x, 5, 4, 8, 'c'); d.r(x, 5, 4, 1, 'l'); d.r(x + 1, 7, 2, 5, c); d.r(x, 13, 4, 1, 'a'); };

// ----- Món ăn -----
add(G, A, 'au-pie', 'Meat pie (bánh nhân thịt)', 'Meat pie', 'Chiếc bánh nhỏ cầm tay nhồi thịt bò bằm và nước sốt, thường ăn kèm sốt cà chua. Người ta ăn ở sân vận động, quán lề và trạm xe.',
  d => { plate(d); d.e(8, 9, 5.4, 3.4, 'O'); d.e(8, 8.4, 4.6, 2.6, 'o'); d.p('y', 6, 7, 10, 8, 8, 6); d.p('r', 8, 8, 11, 10); d.p('O', 5, 10, 11, 11); }, SC);
add(G, A, 'au-vegemite', 'Vegemite trên bánh mì nướng', 'Vegemite on toast', 'Mứt màu đen làm từ chiết xuất men bia, vị mặn đậm, phết mỏng lên bánh mì bơ. Nhiều người ngoại quốc thấy khó ăn lần đầu, nhưng đây là món quen thuộc với người Úc.',
  d => { plate(d); d.r(3, 5, 10, 8, 't'); d.r(3, 5, 10, 1, 'n'); d.r(4, 7, 8, 5, 'k'); d.r(5, 8, 6, 1, 'K'); d.p('n', 3, 12, 12, 12); d.p('y', 4, 6, 11, 6); }, SC);
add(G, A, 'au-snag', 'Thịt nướng barbecue và xúc xích (snags)', 'Barbecue and sausages (snags)', 'Xúc xích nướng kẹp bánh mì trắng với hành chiên, gọi là sausage sizzle. Nhiều trường học và câu lạc bộ bán món này để gây quỹ.',
  d => { d.bg('e'); d.e(8, 10, 7, 3, 'w'); d.e(8, 9, 6, 2, 't'); d.e(8, 8, 5, 1.8, 'R'); d.p('y', 4, 7, 7, 7, 10, 7, 12, 8); d.p('r', 6, 6, 9, 6); d.r(2, 12, 12, 1, 'W'); }, SC);
add(G, A, 'au-fishchips', 'Fish and chips', 'Fish and chips', 'Cá chiên giòn với khoai tây chiên, thường ăn ngoài bãi biển. Các loại cá như barramundi và flathead được nhiều người ưa chuộng.',
  d => { d.bg('e'); d.r(2, 5, 12, 9, 'W'); d.e(6, 8, 3.6, 1.6, 'O'); d.p('y', 4, 8, 8, 8); d.p('o', 5, 7); for (const x of [10, 11, 12, 13]) d.r(x, 8, 1, 4, 'y'); d.r(3, 12, 7, 1, 'g'); d.p('r', 7, 11); d.p('w', 3, 5, 13, 6); }, SC);
add(G, A, 'au-parma', 'Chicken parma (parmigiana gà)', 'Chicken parma', 'Lát ức gà tráng bột chiên, phủ sốt cà chua và phô mai, ăn với khoai chiên và salad. Đây là món quen thuộc ở quán rượu (pub).',
  d => { plate(d); d.e(7, 8, 4.6, 3, 'O'); d.e(7, 8, 4, 2.4, 'r'); d.e(7, 8, 3.4, 1.8, 'y'); d.p('R', 5, 7, 9, 9); for (const x of [11, 12, 13]) d.r(x, 7, 1, 4, 'y'); d.p('g', 3, 12, 5, 12); }, SC);
add(G, A, 'au-brunch', 'Buổi sáng kiểu Úc (brunch)', 'Aussie brunch', 'Trứng, bơ nghiền trên bánh mì chua, nấm và cà phê. Melbourne và Sydney có nhiều quán chuyên phục vụ bữa này.',
  d => { plate(d); d.r(3, 6, 8, 5, 't'); d.r(4, 7, 6, 3, 'h'); d.e(7, 7, 2, 1.6, 'w'); d.p('y', 7, 7); d.r(11, 6, 3, 5, 'w'); d.p('n', 12, 7, 12, 9); d.p('r', 5, 12, 8, 12); }, SC);
add(G, A, 'au-seafood', 'Hải sản tươi', 'Fresh seafood', 'Tôm, hào Sydney và cua biển được nhiều người thưởng thức vào dịp lễ. Giá có thể tăng cao vào ngày Giáng sinh.',
  d => { d.bg('C'); d.r(0, 10, 16, 6, 'e'); d.e(5, 10, 3, 1.8, 'r'); d.l(2, 9, 3, 6, 'r'); d.p('R', 4, 9, 6, 11); d.e(11, 11, 3, 2, 'a'); d.e(11, 10.6, 2, 1, 'l'); d.p('y', 8, 14, 14, 13); d.p('g', 1, 14); }, SC);
add(G, A, 'au-lamb', 'Thịt cừu và thịt kangaroo', 'Lamb and kangaroo meat', 'Thịt cừu được nướng phổ biến, còn thịt kangaroo nạc, ít mỡ và bán ở nhiều siêu thị. Một số nhà hàng phục vụ ở dạng bít tết.',
  d => { plate(d); d.e(5, 9, 2.6, 2, 'm'); d.p('R', 4, 9, 6, 8); d.l(3, 8, 3, 12, 'W'); d.e(10, 9, 3, 2, 'r'); d.p('R', 9, 9, 11, 10); d.p('g', 8, 12, 13, 8); d.p('w', 8, 6); }, SC);

// ----- Đồ uống và rượu -----
add(G, B, 'au-flatwhite', 'Cà phê Flat White', 'Flat white coffee', 'Cà phê espresso với sữa nóng đánh mịn, được nhiều người xem là sáng tạo của Úc hoặc New Zealand. Melbourne nổi tiếng với văn hóa cà phê riêng.',
  d => { d.bg('e'); d.r(3, 6, 9, 6, 'w'); d.r(12, 7, 2, 3, 'w'); d.e(7, 6, 4, 1.4, 'n'); d.e(7, 6, 2.6, 0.8, 'w'); d.p('t', 5, 6, 9, 6); d.r(2, 12, 11, 1, 'W'); d.p('w', 5, 3, 8, 2, 9, 4); }, H);
add(G, B, 'au-wine', 'Rượu vang Úc', 'Australian wine', 'Vùng Barossa Valley, Margaret River và Yarra Valley sản xuất rượu vang nổi tiếng, đặc biệt là Shiraz. Nhiều nhà sản xuất mở cửa tham quan.',
  d => { d.bg('e'); d.e(5, 6, 2.4, 3, 'W'); d.e(5, 7, 2, 1.8, 'm'); d.l(5, 9, 5, 13, 'a'); d.r(3, 14, 5, 1, 'a'); d.r(10, 3, 3, 3, 'G'); d.r(10, 6, 3, 8, 'G'); d.r(11, 2, 1, 1, 'G'); d.r(10, 8, 3, 3, 'y'); }, SC);
add(G, B, 'au-beer', 'Bia Úc', 'Australian beer', 'Các nhãn như Victoria Bitter, XXXX và Tooheys, cùng nhiều nhà sản xuất bia thủ công nhỏ. Người ta thường uống bia lạnh trong ngày nóng.',
  d => { d.bg('e'); d.r(3, 4, 7, 10, 'y'); d.r(3, 4, 7, 2, 'w'); d.r(10, 6, 3, 5, 'a'); d.r(11, 7, 1, 3, 'e'); d.p('Y', 4, 8, 8, 10, 5, 12); d.p('w', 4, 3, 7, 3); }, SC);
add(G, B, 'au-milo', 'Milo và thức uống mạch nha', 'Milo and malted drinks', 'Bột ca cao mạch nha pha sữa, phổ biến với trẻ em. Nó xuất hiện ở nhiều bữa sáng.',
  d => { d.bg('e'); d.r(4, 3, 8, 11, 'G'); d.r(3, 2, 10, 2, 'k'); d.r(5, 6, 6, 4, 'y'); d.p('G', 7, 7, 9, 8); d.p('g', 5, 12, 10, 12); }, H);
add(G, B, 'au-lemonlime', 'Lemon, lime and bitters', 'Lemon, lime and bitters', 'Đồ uống không cồn pha nước chanh, chanh xanh và thêm vài giọt bitters, thường phục vụ ở quán rượu. Đây là lựa chọn khi không muốn uống bia.',
  d => { d.bg('e'); glass(d, 6, 'h'); d.e(5, 6, 2, 2, 'y'); d.p('G', 5, 6); d.e(12, 5, 1.6, 1.6, 'g'); d.p('r', 8, 8, 9, 10); d.l(10, 3, 8, 7, 'r'); }, H);
add(G, B, 'au-tea', 'Trà và bánh quy', 'Tea and biscuits', 'Nhiều người vẫn uống trà đen kèm bánh quy vào buổi chiều. Phong tục này được du nhập từ Anh.',
  d => { d.bg('e'); d.r(2, 7, 7, 5, 'w'); d.r(9, 8, 2, 3, 'w'); d.r(3, 7, 5, 2, 'N'); d.r(1, 12, 9, 1, 'W'); d.e(13, 10, 2.4, 1.2, 'o'); d.e(13, 11, 1.6, 0.8, 'O'); d.p('w', 4, 4, 6, 3); }, SC);
add(G, B, 'au-bushtea', 'Trà thảo mộc tự nhiên (bush tea)', 'Bush tea', 'Lá cây bản địa như chanh sả và hạt bản địa được dùng pha nước uống. Người thổ dân dùng các thảo mộc này từ lâu đời.',
  d => { d.bg('h'); d.r(3, 7, 7, 5, 'w'); d.r(10, 8, 2, 3, 'w'); d.r(4, 7, 5, 2, 'g'); d.p('G', 5, 3, 7, 4, 9, 3, 10, 5); d.p('g', 4, 4, 8, 5); d.r(2, 12, 9, 1, 'W'); }, SC);

// ----- Món ngọt và món theo dịp -----
add(G, C, 'au-lamington', 'Lamington', 'Lamington', 'Bánh bông lan vuông phủ sô cô la và dừa nạo, thường nhồi thêm mứt. Người ta thường làm chúng để gây quỹ từ thiện.',
  d => { plate(d); d.r(4, 6, 8, 6, 'N'); d.r(4, 6, 8, 1, 'n'); for (const [x, y] of [[5, 7], [7, 9], [9, 7], [10, 10], [6, 11]]) d.p('w', x, y); d.p('w', 4, 8, 11, 8, 5, 10); }, SC);
add(G, C, 'au-pavlova', 'Pavlova', 'Pavlova', 'Bánh meringue giòn phủ kem tươi và trái cây, phổ biến vào dịp Giáng sinh. Úc và New Zealand đều nhận là nơi sáng tạo ra món này.',
  d => { d.bg('e'); d.e(8, 11, 6, 2.6, 'w'); d.e(8, 8, 4.6, 3, 'l'); d.e(8, 6.6, 3.4, 2, 'w'); d.p('r', 6, 5, 10, 6, 8, 4); d.p('g', 7, 3); d.p('y', 5, 7, 11, 8); d.p('p', 9, 5); }, SC);
add(G, C, 'au-anzacbis', 'Anzac biscuit', 'Anzac biscuit', 'Bánh quy yến mạch, dừa và si rô vàng, gắn với ngày Anzac. Chuyện kể rằng phụ nữ ở nhà gửi cho lính vì bánh để được lâu.',
  d => { d.bg('e'); for (const [x, y] of [[3, 4], [9, 5], [5, 9], [11, 10]]) { d.e(x + 1.5, y + 1.5, 2.6, 2.4, 'o'); d.p('O', x + 1, y + 1); d.p('y', x, y + 1); } d.p('r', 8, 14, 3, 14); }, SC);
add(G, C, 'au-timtam', 'Tim Tams', 'Tim Tams', 'Bánh quy sô cô la kẹp kem, có cách ăn đặc biệt gọi là "Tim Tam Slam". Người ta cắn hai góc bánh rồi hút đồ uống nóng qua bánh.',
  d => { d.bg('r'); d.r(3, 5, 10, 3, 'N'); d.r(3, 8, 10, 2, 'w'); d.r(3, 10, 10, 3, 'N'); d.p('n', 4, 6, 7, 6, 10, 6, 5, 11, 9, 11); d.p('R', 3, 13, 12, 13); }, SC);
add(G, C, 'au-fairybread', 'Fairy bread', 'Fairy bread', 'Bánh mì trắng phết bơ và rắc kẹo đường nhiều màu, món quen thuộc ở tiệc sinh nhật trẻ em. Trẻ thường thích màu sắc của nó.',
  d => { d.bg('P'); d.tri(3, 4, 10, 9, 'w'); d.r(3, 12, 10, 1, 'W'); for (const [x, y, c] of [[6, 7, 'r'], [8, 6, 'y'], [9, 9, 'b'], [5, 10, 'g'], [7, 11, 'p'], [10, 11, 'r'], [8, 8, 'o']]) d.p(c, x, y); }, SC);
add(G, C, 'au-xmas', 'Giáng sinh mùa hè', 'Summer Christmas', 'Nhiều gia đình ăn Giáng sinh ngoài trời với hải sản, thịt nguội và pavlova. Có người còn đi biển vào ngày này.',
  d => { d.bg('c'); d.e(13, 3, 2, 2, 'y'); d.r(0, 11, 16, 5, 'u'); d.tri(3, 3, 6, 8, 'G'); d.p('y', 6, 2); d.p('r', 5, 6, 7, 8, 6, 10); d.r(10, 9, 5, 3, 'r'); d.p('w', 11, 10, 13, 10); d.p('C', 1, 13, 14, 14); }, SC);
add(G, C, 'au-ausday', 'Ngày Australia (26/1)', 'Australia Day (January 26)', 'Nhiều gia đình tổ chức barbecue và dã ngoại. Ngày này cũng gây tranh luận vì đối với nhiều người thổ dân nó là ngày tang thương.',
  d => { d.bg('B'); d.r(0, 12, 16, 4, 'G'); d.p('w', 2, 2, 5, 4, 12, 3, 9, 6, 6, 8, 11, 8); d.p('r', 3, 5, 13, 5, 8, 2); d.r(4, 10, 8, 2, 'k'); d.p('r', 5, 9, 7, 9, 10, 9); d.p('y', 1, 8, 14, 9); }, SC);
add(G, C, 'au-afl', 'Meat pie ngày AFL', 'Meat pie on AFL day', 'Trong mùa giải bóng bầu dục kiểu Úc, nhiều người ăn meat pie khi xem. Món này dễ ăn khi đứng ngoài trời.',
  d => { d.bg('g'); for (let x = 0; x < 16; x += 4) d.r(x, 0, 2, 16, 'h'); d.e(5, 9, 3, 2, 'o'); d.p('O', 5, 8); d.e(11, 8, 2.4, 3.6, 'n'); d.p('w', 11, 6, 10, 8, 12, 8, 11, 10); d.p('w', 1, 14, 14, 14); }, SC);
