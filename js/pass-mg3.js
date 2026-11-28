import { add, SC, setCC } from './pass-kit.js';
setCC('mg');
// Madagascar · Nhóm 3: Ẩm thực

// ----- Món ăn -----
add(3, 'Món ăn', 'mg-romazava', 'Romazava', 'Romazava stew', 'món hầm thịt bò (thường là bò zebu) nấu với các loại lá rau gọi chung là brèdes, thêm cà chua, hành và gừng. Được nhiều người xem là món quốc hồn, ăn với cơm trắng.',
  d => { d.e(8,11,6.5,3.8,'N'); d.e(8,8,6,2.4,'o'); d.p('G',4,8,5,7,7,9,10,7,12,8); d.p('g',6,8,9,8,11,9); d.p('m',5,9,6,9,9,7,10,9); d.p('r',8,9,11,8); d.p('y',7,7); }, { use: 'hold' });
add(3, 'Món ăn', 'mg-ravitoto', 'Ravitoto', 'Ravitoto cassava leaves', 'lá sắn giã nhuyễn, nấu lâu với thịt heo, tỏi và đôi khi cả nước cốt dừa. Món rất phổ biến ở cao nguyên và bờ đông, thường có vị đậm.',
  d => { d.e(8,11,7,3.6,'w'); d.e(8,9,5.5,2.8,'G'); d.p('g',5,9,7,8,9,10,11,9); d.r(6,7,3,2,'x'); d.p('m',6,8,8,7); d.r(10,9,2,2,'x'); d.p('m',11,10); d.p('k',5,10,9,8,8,11); d.p('w',4,9); }, { use: 'hold' });
add(3, 'Món ăn', 'mg-vary-anana', 'Vary amin\'anana (cơm với rau lá)', 'Rice with greens', 'cơm ăn cùng các loại rau lá xào hoặc nấu mềm. Đây là bữa ăn giản dị mà gần như nhà nào cũng có.',
  d => { d.e(8,11,7,3.6,'a'); d.e(6,9,3.6,2.6,'w'); d.p('W',5,8,7,9,6,10); d.e(11,10,3,2,'G'); d.p('g',10,9,12,10,11,11); d.p('y',9,8); d.r(2,3,1,5,'l'); d.e(2.5,2.5,1.4,1.4,'l'); }, { use: 'hold' });
add(3, 'Món ăn', 'mg-henakisoa', 'Henakisoa sy voanjobory', 'Pork with bambara groundnuts', 'thịt heo hầm với đậu bambara (voanjobory), món ăn gia đình quen thuộc. Đậu bùi và thịt mềm hợp ăn cùng cơm.',
  d => { d.e(8,11,6.5,3.8,'a'); d.e(8,8,6,2.4,'n'); for(const [x,y] of [[4,8],[7,7],[10,9],[11,7],[6,9]]) d.e(x+.5,y+.5,1.1,1,'t'); d.r(8,8,3,2,'x'); d.p('m',9,8); d.p('g',5,7,12,8); }, { use: 'hold' });
add(3, 'Món ăn', 'mg-coconut-chicken', 'Akoho sy voanio (gà nấu nước cốt dừa)', 'Chicken in coconut milk', 'gà nấu với dừa, gừng và hành, phổ biến ở vùng ven biển. Nước sốt béo nhẹ và thơm mùi dừa.',
  d => { d.e(8,12,7,3,'w'); d.e(8,10,5.5,2.4,'e'); d.e(7,8,2.6,2,'o'); d.l(9,7,12,4,'o'); d.p('w',12,3,13,4); d.p('y',4,10,10,11,11,9); d.p('g',5,11,12,10); d.e(2.5,5,2,2,'N'); d.e(2.5,5,1,1,'w'); }, { use: 'hold' });
add(3, 'Món ăn', 'mg-kitoza', 'Kitoza', 'Kitoza dried meat', 'thịt tẩm gia vị rồi phơi hoặc hun khói thành dải mỏng, thường là thịt bò hoặc heo. Ăn với cơm hoặc nướng lại trước khi dùng.',
  d => { d.r(1,2,14,1,'N'); for(const x of [3,7,11]){ d.r(x,3,2,10,'m'); d.p('R',x,4,x+1,7,x,10); d.p('N',x+1,5,x,8,x+1,11); d.p('y',x,2); } d.p('a',4,14,5,13,9,14,10,13,13,14); d.r(1,15,14,1,'k'); d.p('o',3,15,8,15,12,15); }, { use: 'hold' });
add(3, 'Món ăn', 'mg-hena-omby', 'Hena omby (thịt bò zebu nướng, hầm)', 'Zebu beef', 'thịt zebu được nướng trên than hoặc hầm nhừ. Zebu vừa là thực phẩm vừa là biểu tượng của sự giàu có.',
  d => { d.r(1,11,14,2,'k'); for(const x of [3,7,11]) d.p('a',x,13,x,14); d.l(1,7,15,7,'a'); for(const x of [3,7,11]){ d.r(x,5,3,4,'m'); d.p('N',x,5,x+2,8); d.p('x',x+1,6); } d.p('o',2,15,6,15,10,15,14,15); }, { use: 'hold' });
add(3, 'Món ăn', 'mg-trondro', 'Trondro (cá) nấu nước sốt', 'Fish in tomato sauce', 'cá nước ngọt hoặc cá biển nấu cà chua, hành, gừng và rau thơm. Vùng ven biển còn có tôm, cua và tôm hùm nướng.',
  d => { d.e(8,11,7,3.6,'w'); d.e(8,10,5.5,2.6,'r'); d.e(7,9,4,1.8,'a'); d.dtri(10,7,5,3,'_'); d.p('a',11,8,12,7,13,8,13,10,12,10); d.p('k',4,8); d.p('g',6,11,9,12,11,11); d.p('y',5,10); d.p('R',3,10,12,12); }, { use: 'hold' });
add(3, 'Món ăn', 'mg-lasary', 'Lasary (gỏi rau củ)', 'Lasary vegetable salad', 'món rau củ ngâm chua nhẹ hoặc trộn, ăn kèm thịt nướng. Có nhiều kiểu như lasary cà chua hay lasary xoài xanh.',
  d => { d.e(8,11,6.5,3.8,'b'); d.e(8,8,6,2.4,'w'); for(const [x,y,c] of [[4,8,'o'],[6,7,'g'],[8,9,'o'],[10,7,'r'],[12,8,'g'],[7,8,'y'],[9,8,'r']]) d.p(c,x,y,x+1,y); d.p('o',5,9,11,9); d.p('w',3,12,5,13); }, { use: 'hold' });
add(3, 'Món ăn', 'mg-mi-sao', 'Mi sao (mì xào)', 'Mi sao noodles', 'mì xào theo kiểu người Hoa với rau, thịt hoặc trứng. Món này cho thấy ảnh hưởng của cộng đồng gốc Hoa.',
  d => { d.e(8,12,7,3,'r'); d.e(8,10,5.5,2.6,'y'); d.p('Y',4,10,5,9,7,11,9,9,11,11,12,10,8,10); d.p('g',6,9,10,10); d.p('o',8,8,5,11,11,9); d.e(9,8,2,1.2,'w'); d.p('y',9,8); d.l(9,1,12,8,'N'); d.l(12,1,13,8,'N'); }, { use: 'hold' });
add(3, 'Món ăn', 'mg-mofo-gasy', 'Mofo gasy (bánh gạo)', 'Mofo gasy rice cakes', 'bánh bột gạo nướng trong khuôn tròn, ăn sáng cùng cà phê hoặc trà. Bánh có vị ngọt nhẹ, ngoài giòn trong mềm.',
  d => { d.r(1,9,14,5,'k'); for(const x of [4,8,12]){ d.e(x,9,2,1.6,'o'); d.p('y',x-1,8,x,8); } d.p('o',3,15,7,15,11,15); d.p('r',5,15,9,15); for(const x of [6,10]){ d.e(x,5,2,1.4,'o'); d.p('u',x,4); } }, { use: 'hold' });
add(3, 'Món ăn', 'mg-koba', 'Koba', 'Koba cake', 'bánh làm từ bột gạo, lạc và đường, gói lá và hấp hoặc nướng. Ăn được cả bữa nhẹ lẫn làm quà mang đi đường.',
  d => { d.r(2,6,12,7,'G'); d.r(2,7,12,1,'g'); d.p('g',5,6,5,12,10,6,10,12); d.p('t',2,9,13,9,7,9,8,9); d.e(12,12,3,2.4,'n'); d.p('t',11,11,13,12,12,13); d.p('w',12,11); d.r(2,13,6,1,'N'); }, { use: 'hold' });
add(3, 'Món ăn', 'mg-sambos', 'Sambos', 'Sambos', 'bánh xếp chiên có nhân thịt hoặc rau, gần với samosa của Ấn Độ. Thường được bán ở chợ và quán ven đường.',
  d => { d.e(8,12,7,2.6,'w'); for(const [x,y] of [[2,6],[7,4],[9,8]]){ d.tri(x,y,7,5,'o'); d.p('O',x+1,y+4,x+3,y+4,x+5,y+4,x+3,y+1); d.p('u',x+3,y+2); } d.p('g',2,12,13,13); d.p('r',3,13); }, { use: 'hold' });

// ----- Đồ uống -----
add(3, 'Đồ uống', 'mg-ranon-ampango', 'Ranon\'ampango (nước cháy cơm)', 'Burnt rice water', 'nước nấu từ lớp cơm cháy dưới đáy nồi, uống ấm sau bữa ăn. Đây là thức uống giản dị gắn với mọi gia đình.',
  d => { d.r(4,6,8,8,'l'); d.r(4,8,8,6,'Y'); d.r(4,13,8,1,'N'); d.p('n',5,12,7,13,9,12,10,13); d.p('u',5,9,6,10); d.r(4,6,8,1,'w'); }, { use: 'hold' });
add(3, 'Đồ uống', 'mg-sahambavy-tea', 'Trà Sahambavy', 'Sahambavy tea', 'trà trồng quanh Sahambavy, gần Fianarantsoa, nơi có đồn điền trà nổi tiếng. Nơi này được nhiều du khách ghé thăm.',
  d => { d.r(3,8,8,5,'w'); d.r(3,8,8,1,'O'); d.fan(11,10,2.4,'_'); d.p('w',11,9,12,9,13,10,13,11,12,12,11,12); d.r(2,13,10,1,'a'); d.p('g',12,2,13,3,14,4,11,3,12,4); d.p('G',12,3,13,5); }, { use: 'hold' });
add(3, 'Đồ uống', 'mg-coffee', 'Cà phê', 'Coffee', 'được trồng ở nhiều vùng, uống trong bữa sáng với bánh mofo. Hương vị cà phê thay đổi theo vùng trồng.',
  d => { d.r(2,8,9,6,'r'); d.r(2,8,9,1,'N'); d.p('r',11,9,12,9,13,10,13,11,12,12,11,12); d.r(1,14,12,1,'a'); d.e(13,4,1.6,2,'N'); d.p('t',13,3,13,4,13,5); }, { use: 'hold' });
add(3, 'Đồ uống', 'mg-ginger-tea', 'Trà gừng và nước thảo mộc', 'Ginger and herbal tea', 'uống ấm để giải khát hoặc khi người mệt. Nhiều nhà dùng gừng và lá tươi trong vườn.',
  d => { d.r(2,7,8,7,'l'); d.r(2,9,8,5,'y'); d.p('l',10,9,11,9,12,10,11,12,10,12); d.p('g',4,10,5,11,7,10); d.e(12.5,5,2,1.8,'t'); d.p('t',14,3,15,2,11,3,13,7); d.p('Y',12,5); }, { use: 'hold' });
add(3, 'Đồ uống', 'mg-toaka-gasy', 'Toaka gasy (rượu mía tự nấu)', 'Toaka gasy cane spirit', 'loại rượu chưng cất từ mía, rất phổ biến ở nông thôn dù thường nằm ngoài hệ thống chính thức. Rượu thường dùng trong nghi lễ và dịp gặp gỡ.',
  d => { d.r(3,6,6,9,'l'); d.r(5,2,2,4,'l'); d.r(5,1,2,1,'n'); d.r(4,10,4,4,'e'); d.r(11,1,1,14,'t'); d.r(13,3,1,12,'g'); d.p('N',11,5,11,10,13,7,13,11); d.p('g',9,2,10,1,12,0,14,2,15,1); d.p('w',4,7); }, { use: 'hold' });
add(3, 'Đồ uống', 'mg-rhum-arrange', 'Rhum arrangé (rượu rum ngâm)', 'Rhum arrange', 'rum ngâm với vani, quế, vỏ cam hoặc trái cây. Thành phẩm có mùi thơm đậm và hơi ngọt.',
  d => { d.r(3,4,10,11,'O'); d.r(4,5,8,9,'o'); d.r(4,2,8,2,'n'); d.p('k',6,6,6,7,6,8,6,9,6,10,6,11,6,12,8,7,8,8,8,9,8,10,8,11,8,12); d.e(10.5,11,1.6,1.6,'y'); d.p('N',10,6,10,7,10,8); d.p('w',4,6); }, { use: 'hold' });
add(3, 'Đồ uống', 'mg-dzama', 'Rum Dzama', 'Dzama rum', 'nhãn rum của Nosy Be, được ủ trong thùng gỗ và bán cho du khách. Nhãn này thường được nhắc đến khi nói về rượu Madagascar.',
  d => { d.r(4,6,8,9,'N'); d.r(6,2,4,4,'N'); d.r(6,1,4,1,'r'); d.r(5,9,6,4,'e'); d.p('r',6,10,9,10); d.p('G',7,11,8,11,6,12,9,12); d.p('o',5,7); d.p('w',4,7,4,8); d.p('y',6,5,9,5); }, { use: 'hold' });
add(3, 'Đồ uống', 'mg-thb', 'Bia THB (Three Horses Beer)', 'Three Horses Beer', 'nhãn bia phổ biến toàn đảo, sản xuất ở Antsirabe. Tên gọi "ba con ngựa" khiến nhiều người dễ nhớ.',
  d => { d.r(5,6,6,9,'N'); d.r(6,1,4,5,'N'); d.r(6,0,4,1,'y'); d.r(5,8,6,5,'w'); d.r(5,8,6,1,'r'); d.p('r',6,10,8,10,10,10,6,11,8,11,10,11); d.p('k',6,9,8,9,10,9); d.r(12,8,3,7,'y'); d.r(12,7,3,1,'w'); }, { use: 'hold' });
add(3, 'Đồ uống', 'mg-lazani-betsileo', 'Rượu vang Lazan\'i Betsileo', 'Lazan\'i Betsileo wine', 'vang trồng quanh vùng Fianarantsoa, nơi có nhiều đồi cao và nắng ấm. Đây là một trong số ít vùng làm vang ở đảo.',
  d => { d.r(3,6,5,9,'m'); d.r(4,2,3,4,'m'); d.r(4,1,3,1,'y'); d.r(3,9,5,3,'e'); d.p('v',4,10,6,10); for(const [x,y] of [[11,8],[13,8],[10,10],[12,10],[14,10],[11,12],[13,12],[12,14]]) d.e(x,y,1.2,1.2,'v'); d.p('N',12,6,12,5); d.p('g',13,5,14,4,14,5); }, { use: 'hold' });

// ----- Món lễ và theo mùa -----
add(3, 'Món lễ và theo mùa', 'mg-lychee', 'Vải (lychee) mùa cuối năm', 'Lychees', 'vải chín vào khoảng tháng Mười Một đến tháng Giêng, nhất là ở bờ đông quanh Toamasina. Một phần lớn được xuất khẩu sang châu Âu.',
  d => { for(const [x,y] of [[5,7],[10,6],[8,11],[3,11],[12,11]]){ d.e(x+.5,y+.5,2.6,2.6,'r'); d.p('x',x-1,y-1); d.p('R',x+1,y+1,x,y+1,x+1,y); } d.l(5,5,8,1,'N'); d.l(10,4,8,1,'N'); d.p('g',9,1,10,0,11,1,6,1,7,0); d.e(14,5,1.4,1.4,'w'); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'mg-mango-jackfruit', 'Xoài và mít', 'Mango and jackfruit', 'xoài chín rộ vào mùa nóng, bán đầy ở chợ ven đường. Mít cũng là món trái cây quen thuộc ở bờ đông.',
  d => { d.e(5,9,3.6,4.4,'y'); d.p('o',3,10,4,12,6,11); d.p('r',6,7); d.p('G',5,3,6,2,7,3); d.e(11.5,9,3.8,5,'g'); for(let y=5;y<14;y+=2) for(let x=9;x<15;x+=2) d.p('G',x+(y%4?0:1),y); d.p('N',11,2,11,3); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'mg-rice-harvest', 'Gặt lúa ở cao nguyên (khoảng tháng 4–6)', 'Rice harvest', 'sau mùa gặt, nhiều gia đình có gạo mới và nấu thêm món ngon. Lúa là cây trồng quan trọng nhất trên đảo.',
  d => { d.bg('c'); d.r(0,9,16,7,'y'); for(let x=1;x<16;x+=2){ d.r(x,8,1,4,'Y'); d.p('y',x+1,7); } d.e(10,6,1.4,1.4,'N'); d.tri(7,3,7,2,'t'); d.r(9,7,3,5,'r'); d.l(12,8,14,10,'a'); d.p('k',9,12,11,12); d.e(3,13,2.4,1.6,'t'); d.p('O',2,12,4,13); }, SC);
add(3, 'Món lễ và theo mùa', 'mg-famadihana-feast', 'Tiệc famadihana', 'Famadihana feast', 'nhà chủ mổ bò zebu hoặc heo, nấu cơm và món mặn cho cả họ hàng và hàng xóm. Cỗ có thể rất đông người.',
  d => { d.e(8,11,6.5,4,'k'); d.r(2,7,12,2,'a'); d.e(8,7,5.5,1.6,'w'); d.p('W',5,6,8,7,11,6); d.p('m',6,6,9,6); d.p('o',3,14,6,15,10,14,12,15); d.p('y',5,15,9,15); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'mg-fandroana-feast', 'Fandroana và năm mới truyền thống', 'Fandroana family meal', 'thịt zebu và các bữa ăn gia đình là phần không thể thiếu. Nghi lễ liên quan sẽ được nhắc ở Nhóm 4.',
  d => { d.e(8,12,7,3,'n'); d.e(5,9,3,2,'w'); d.e(11,9,3,2,'x'); d.p('m',10,9,12,8); d.e(8,12,3,1.6,'o'); d.p('g',7,12,9,11); d.p('y',2,2,2,3,2,4,13,2,13,3,13,4); d.p('o',2,1,13,1); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'mg-christmas', 'Giáng sinh (Noely)', 'Christmas (Noely)', 'nhiều gia đình Cơ Đốc dùng bữa chung với gà hoặc heo, ăn cùng cơm và rau. Ngày lễ này được tổ chức rộng rãi.',
  d => { d.tri(3,2,10,5,'G'); d.tri(2,5,12,5,'g'); d.tri(1,8,14,5,'G'); d.r(7,13,2,2,'N'); d.p('y',8,0,7,1,8,1,9,1); for(const [x,y,c] of [[7,4,'r'],[9,6,'y'],[5,9,'b'],[10,10,'r'],[7,11,'w'],[4,11,'y']]) d.p(c,x,y); d.r(11,13,4,2,'r'); d.p('y',13,13,13,14); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'mg-independence-meal', 'Ngày Độc lập (26 tháng 6)', 'Independence Day food', 'nhiều gia đình tụ tập ăn uống, bán thức ăn đường phố rất đông. Không khí chợ và quảng trường rất náo nhiệt.',
  d => { d.e(8,12,7,3,'w'); for(const [x,y] of [[4,10],[8,9],[11,11]]) d.e(x,y,2,1.4,'o'); d.p('g',6,12,12,13); d.r(2,1,1,8,'N'); d.r(3,1,2,6,'w'); d.r(5,1,4,3,'r'); d.r(5,4,4,3,'g'); d.p('r',12,3,12,4,13,2,11,2); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'mg-wedding-feast', 'Tiệc cưới', 'Wedding feast', 'thịt zebu hầm là món chính trong nhiều đám cưới ở nông thôn. Zebu cũng có thể xuất hiện trong lễ hỏi.',
  d => { d.e(8,11,6.5,4,'r'); d.e(8,8,6,2.4,'N'); d.p('m',4,8,5,7,7,9,10,7,11,9); d.p('x',6,8,9,8); d.p('y',3,2,4,3,5,2,4,1,11,3,12,4,13,3,12,2); d.e(6,3,2,2,'y'); d.e(6,3,1,1,'_'); d.e(10,3,2,2,'y'); d.e(10,3,1,1,'_'); }, { use: 'hold' });
