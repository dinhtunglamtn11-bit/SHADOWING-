import { add, SC, setCC } from './pass-kit.js';
setCC('ao');
// Angola · Nhóm 3: Ẩm thực

// ----- Món ăn -----
add(3, 'Món ăn', 'ao-funge', 'Funge', 'Funge', 'bột sắn (funge de bombó) hoặc bột ngô (funge de milho) khuấy với nước nóng đến khi dẻo. Người ta xé từng miếng nhỏ, chấm vào nước sốt của món hầm.',
  d => { d.e(8,11,7,3.6,'a'); d.e(6,8,3.8,3.2,'e'); d.p('w',4,7,5,6,6,6); d.e(11.5,9.5,2.6,2,'O'); d.p('r',11,9,13,10); d.p('g',10,10,12,8); d.p('k',3,13,8,14,12,13); }, { use: 'hold' });
add(3, 'Món ăn', 'ao-muamba', 'Muamba de galinha', 'Muamba de galinha', 'gà hầm với dầu cọ, đậu bắp (okra), tỏi và ớt, thường được xem là món quốc hồn. Ăn cùng funge hoặc cơm, mùi dầu cọ rất đặc trưng.',
  d => { d.e(8,11,6.5,3.8,'N'); d.e(8,8,6,2.4,'o'); d.e(6,7.5,2.2,1.8,'n'); d.l(7,6,10,3,'n'); d.p('w',10,2,11,3); d.p('g',9,8,10,7,11,8); d.p('G',10,8,4,9); d.p('r',8,9,12,7); d.p('y',5,9,11,9); }, { use: 'hold' });
add(3, 'Món ăn', 'ao-calulu', 'Calulu', 'Calulu stew', 'món hầm cá khô hoặc thịt cùng rau, đậu bắp và dầu cọ. Nấu lâu trên bếp nhỏ lửa nên vị đậm đà.',
  d => { d.e(8,11,6.5,3.8,'K'); d.e(8,8,6,2.4,'O'); d.e(6,8,2.4,1.2,'a'); d.p('a',9,7,9,9); d.p('k',5,8); d.p('G',10,7,11,8,12,7,8,9); d.p('g',11,7,9,8); d.p('r',4,7,12,9); d.p('y',7,10); }, { use: 'hold' });
add(3, 'Món ăn', 'ao-mufete', 'Mufete', 'Mufete grilled fish plate', 'cá nướng kiểu bãi biển ăn với chuối chiên, khoai mì, đậu và hành giấm. Đây là món quen thuộc ở các quán ven biển Luanda, đặc biệt ở Ilha.',
  d => { d.e(8,11,7,3.8,'w'); d.e(7,8,4,2,'n'); d.dtri(10,6,5,3,'_'); d.p('n',11,7,12,6,13,5,12,8,13,9); d.p('k',4,8,6,7,7,9,8,7); d.p('y',4,11,5,11,4,12,5,12); d.p('o',11,11,12,11,13,10); d.p('v',8,12,9,12); d.p('m',10,13,11,12); }, { use: 'hold' });
add(3, 'Món ăn', 'ao-feijao-palm', 'Feijão de óleo de palma', 'Beans in palm oil', 'đậu nấu với dầu cọ, ăn kèm khoai mì hoặc cá. Món giản dị mà bổ dưỡng, quen thuộc trong bữa cơm gia đình.',
  d => { d.e(8,11,6.5,3.8,'b'); d.e(8,8,6,2.4,'o'); for(const [x,y] of [[4,8],[6,7],[8,9],[10,7],[11,8],[7,8],[9,8],[5,9]]) d.p('m',x,y); d.p('y',5,7,12,9); d.p('w',3,12,4,13); d.p('g',9,7); }, { use: 'hold' });
add(3, 'Món ăn', 'ao-kizaca', 'Kizaca (lá sắn nấu)', 'Kizaca cassava leaves', 'lá sắn giã nấu với đậu phộng, cá khô hoặc thịt. Món này có nét tương đồng với nhiều món lá sắn ở Trung Phi.',
  d => { d.e(8,11,6.5,3.8,'n'); d.e(8,8,6,2.4,'G'); d.p('g',4,8,5,7,6,9,8,7,9,9,11,7,12,8); d.p('t',6,8,10,8,8,9); d.p('a',9,7,10,7); d.p('y',3,12,12,12,5,13,10,13); }, { use: 'hold' });
add(3, 'Món ăn', 'ao-grilled-fish', 'Peixe grelhado (cá nướng)', 'Grilled fish', 'cá tươi nướng than, ăn với nước chấm ớt và cơm. Đây là món phổ biến ở vùng biển như Benguela và Namibe.',
  d => { d.r(1,12,14,2,'a'); d.e(7,8,5,2.8,'o'); d.dtri(11,5,5,3,'_'); d.p('o',12,7,13,6,14,5,12,9,13,10,14,11,11,8); d.l(5,6,4,10,'N'); d.l(8,6,7,10,'N'); d.p('k',3,7); d.p('y',2,12,3,11); d.e(13,13,1.8,1.4,'y'); d.p('r',9,13,10,13); }, { use: 'hold' });
add(3, 'Món ăn', 'ao-kakuso', 'Kakuso (cá nhỏ nướng)', 'Kakuso small fish', 'cá nước ngọt nhỏ nướng hoặc rán, ăn cả con. Thường được bán ở chợ ven đường.',
  d => { d.e(8,12,7,3,'t'); for(const [x,y,c] of [[3,5,'O'],[5,8,'o'],[3,11,'O']]){ d.e(x+3,y,3.4,1.4,c); d.p(c,x+7,y-1,x+7,y+1,x+8,y-1,x+8,y+1,x+6,y); d.p('k',x+1,y); } d.p('g',12,11,13,12); }, { use: 'hold' });
add(3, 'Món ăn', 'ao-churrasco', 'Churrasco (thịt nướng)', 'Churrasco barbecue', 'thịt bò, gà hoặc heo nướng than, ăn vào cuối tuần với gia đình. Ảnh hưởng Bồ Đào Nha và Brazil rất rõ.',
  d => { d.r(2,11,12,3,'k'); d.p('o',4,12,7,12,10,12,12,12); for(const x of [3,13]) d.p('a',x,14,x,15); d.l(1,10,15,10,'a'); d.e(5,7,3,2.4,'m'); d.e(11,8,2.6,1.8,'m'); d.p('N',4,6,6,8,10,7,12,8); d.l(11,8,14,5,'n'); d.p('w',14,4,15,5); }, { use: 'hold' });
add(3, 'Món ăn', 'ao-bacalhau', 'Bacalhau (cá tuyết khô)', 'Bacalhau salt cod', 'món du nhập từ Bồ Đào Nha, được nấu theo nhiều kiểu trong dịp lễ. Nhiều gia đình chọn món này cho bữa tiệc.',
  d => { d.tri(2,2,12,9,'e'); d.r(5,10,6,2,'e'); d.tri(4,12,8,3,'t'); d.l(8,3,8,12,'t'); d.p('t',5,8,6,7,10,7,11,8,6,10,10,10); d.p('Y',7,5,9,5); d.p('w',4,9,5,6); d.r(7,0,2,2,'n'); }, { use: 'hold' });
add(3, 'Món ăn', 'ao-pastel', 'Pastel và chuối chiên', 'Pastel and fried banana', 'bánh xếp chiên có nhân thịt hoặc cá, ăn nhẹ giữa ngày. Chuối chiên phổ biến làm món ăn kèm.',
  d => { d.e(8,12,7,3,'w'); d.fan(5.5,10,4.4,'o'); d.p('O',2,9,3,7,5,6,7,6,8,8,9,9); d.p('y',4,8,6,8); for(const x of [10,12]){ d.l(x,11,x+2,6,'y'); d.l(x+1,11,x+3,6,'Y'); } d.p('N',4,12,12,12); }, { use: 'hold' });
add(3, 'Món ăn', 'ao-cocada', 'Cocada amarela (bánh dừa vàng)', 'Cocada amarela', 'bánh ngọt làm từ dừa nạo, trứng và đường, có màu vàng đẹp. Công thức có nguồn gốc Bồ Đào Nha.',
  d => { d.e(8,12,7,3,'b'); for(const [x,y] of [[4,10],[9,10],[7,6]]){ d.e(x+.5,y,2.6,2,'y'); d.p('Y',x-1,y+1,x+2,y+1); d.p('w',x,y-1,x+1,y-1); d.p('o',x+1,y); } d.p('w',3,12,12,12); }, { use: 'hold' });

// ----- Đồ uống -----
add(3, 'Đồ uống', 'ao-kissangua', 'Kissangua', 'Kissangua maize drink', 'thức uống lên men nhẹ từ ngô, vị chua ngọt và ít cồn. Thường được bán ở chợ và dịp lễ.',
  d => { d.r(4,4,8,11,'l'); d.r(4,6,8,8,'u'); d.p('y',5,8,7,11,10,9,9,12); d.r(4,4,8,1,'w'); d.r(4,14,8,1,'n'); d.l(13,3,14,10,'Y'); d.p('y',12,2,13,2,13,1,14,2,14,3); d.p('w',5,7,5,10); }, { use: 'hold' });
add(3, 'Đồ uống', 'ao-maruvo', 'Maruvo (rượu cọ)', 'Maruvo palm wine', 'rượu lấy từ nhựa cây cọ, uống ở vùng phía bắc và nông thôn. Rượu tươi có vị ngọt nhẹ và dễ chua theo thời gian.',
  d => { d.e(6,11,4,4,'t'); d.r(5,5,3,3,'t'); d.r(5,4,3,1,'N'); d.p('n',3,11,6,13,9,11,5,9,8,9); d.l(13,2,13,15,'N'); for(const [x,y] of [[9,1],[10,4],[12,0],[15,1],[15,4]]){ d.l(13,3,x,y,'G'); } d.p('e',11,6,11,7); }, { use: 'hold' });
add(3, 'Đồ uống', 'ao-cuca', 'Bia Cuca', 'Cuca beer', 'nhãn bia nổi tiếng của Angola, có mặt từ những năm 1950. Bia còn gắn với tên gọi thân mật ở nhiều vùng.',
  d => { d.r(5,6,6,9,'N'); d.r(6,1,4,5,'N'); d.r(6,0,4,1,'y'); d.r(5,8,6,5,'y'); d.r(5,9,6,2,'r'); d.p('w',6,9,6,10,8,9,8,10,10,9,10,10); d.p('w',5,7); d.r(12,8,3,7,'o'); d.r(12,7,3,1,'w'); }, { use: 'hold' });
add(3, 'Đồ uống', 'ao-nocal-eka', 'Nocal và Eka', 'Nocal and Eka beers', 'hai nhãn bia khác có mặt trong quán và siêu thị. Mỗi nhãn có nhóm khách quen riêng.',
  d => { for(const [x,c] of [[2,'r'],[9,'g']]){ d.r(x,6,5,9,'G'); d.r(x+1,2,3,4,'G'); d.r(x+1,1,3,1,'y'); d.r(x,8,5,4,'w'); d.r(x,9,5,2,c); d.p('w',x+1,9,x+3,10); d.p('g',x,7); } }, { use: 'hold' });
add(3, 'Đồ uống', 'ao-mucua-juice', 'Nước múcua (sumo de múcua)', 'Baobab (mucua) juice', 'nước ép từ quả baobab, có vị chua nhẹ và giàu vitamin C. Thường được uống lạnh trong ngày nóng.',
  d => { d.r(2,5,7,10,'l'); d.r(2,7,7,8,'e'); d.p('t',4,9,6,11,3,12); d.l(7,1,5,10,'r'); d.e(12,10,2.8,4,'n'); d.p('N',12,5,12,6); d.p('t',11,8,13,9,11,12); d.p('w',3,8,3,9); }, { use: 'hold' });
add(3, 'Đồ uống', 'ao-fruit-juice', 'Nước ép chanh dây và xoài', 'Passion fruit and mango juice', 'trái cây nhiệt đới ép tươi bán ở quán và chợ. Thường có thêm đường và đá.',
  d => { d.r(2,5,6,10,'l'); d.r(2,7,6,8,'o'); d.r(2,7,6,1,'y'); d.l(7,1,5,9,'g'); d.p('w',3,9,6,12); d.e(12,6,2.8,3,'y'); d.p('r',13,5,13,7); d.p('G',11,2,12,3,13,2); d.e(11,12,3,3,'v'); d.e(11,12,1.6,1.6,'y'); d.p('k',10,12,12,11,11,13); }, { use: 'hold' });
add(3, 'Đồ uống', 'ao-coffee', 'Cà phê Angola', 'Angolan coffee', 'trước độc lập, nước này từng là một trong những nơi xuất khẩu cà phê lớn. Vùng Amboim và Cuanza Sul gắn với cây cà phê.',
  d => { d.r(2,8,9,6,'w'); d.r(2,8,9,1,'N'); d.p('w',11,9,12,9,13,10,13,11,12,12,11,12); d.r(1,14,12,1,'a'); d.p('r',4,11,5,11,6,11,7,11,8,11); for(const [x,y] of [[10,3],[13,5],[7,4]]){ d.e(x,y,1.4,1.8,'N'); d.p('t',x,y-1,x,y,x,y+1); } }, { use: 'hold' });
add(3, 'Đồ uống', 'ao-portuguese-wine', 'Rượu vang Bồ Đào Nha', 'Portuguese wine', 'phổ biến ở các bữa tiệc và nhà hàng. Nhiều loại được nhập khẩu.',
  d => { d.r(3,6,4,10,'G'); d.r(4,1,2,5,'G'); d.r(4,0,2,1,'r'); d.r(3,9,4,4,'e'); d.p('r',4,10,5,11); d.e(11.5,5,3,3,'l'); d.e(11.5,6,2.6,2,'m'); d.r(11,8,1,6,'l'); d.r(9,14,6,1,'a'); d.p('w',10,4); }, { use: 'hold' });
add(3, 'Đồ uống', 'ao-kaporroto', 'Rượu tự nấu (kaporroto)', 'Home-brewed kaporroto', 'rượu chưng cất tại nhà bằng ngô hoặc trái cây, thường mạnh. Việc dùng cần thận trọng vì không được kiểm định.',
  d => { d.e(5,10,4,4.6,'A'); d.r(3,4,5,2,'a'); d.p('a',2,8,2,10); d.l(7,4,11,3,'O'); d.l(11,3,12,9,'O'); d.r(10,9,5,6,'l'); d.r(10,12,5,3,'c'); d.tri(3,13,5,3,'o'); d.p('r',1,1,2,0,2,2,3,1); }, { use: 'hold' });

// ----- Món lễ và theo mùa -----
add(3, 'Món lễ và theo mùa', 'ao-natal', 'Giáng sinh (Natal)', 'Christmas dinner', 'nhiều gia đình ăn bacalhau, heo sữa quay hoặc gà nướng và bánh ngọt. Bữa tiệc thường kéo dài cả buổi tối.',
  d => { d.e(8,12,7,3,'w'); d.e(7,9,4.4,3,'n'); d.p('O',5,7,6,7,8,8); d.l(10,9,13,6,'n'); d.p('w',13,5,14,6); d.p('g',3,11,12,11,4,12); d.p('r',5,12,11,12); d.r(2,1,1,5,'w'); d.p('y',2,0); d.tri(11,1,5,5,'G'); d.p('y',13,0); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'ao-independence-feast', 'Ngày Độc lập (11 tháng 11)', 'Independence Day barbecue', 'ngày quốc khánh, nhiều nơi tổ chức tiệc nướng và hoạt động cộng đồng. Đây là dịp cả nhà tụ họp.',
  d => { d.e(8,12,7,3,'a'); for(const y of [8,11]){ d.l(2,y,14,y,'t'); for(const x of [4,7,10]) d.r(x,y-1,2,3,'m'); } d.r(2,0,1,6,'N'); d.r(3,0,6,2,'r'); d.r(3,2,6,2,'k'); d.p('y',5,1,6,2,5,2); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'ao-carnival-stall', 'Carnaval', 'Carnival street food', 'ngày hội lớn nhất trong năm, quanh đó có nhiều quán bán đồ nướng và bia lạnh. Nhiều gia đình chuẩn bị món ăn để tiếp khách.',
  d => { d.dtri(0,1,16,3,'r'); d.r(0,0,16,1,'y'); d.r(1,3,1,9,'N'); d.r(14,3,1,9,'N'); d.r(2,9,12,2,'n'); for(const x of [3,6]){ d.r(x,7,2,2,'m'); d.p('t',x,9); } d.r(10,5,2,4,'Y'); d.r(10,5,2,1,'w'); d.r(2,11,12,4,'t'); d.p('p',4,13,8,12,12,14); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'ao-alambamento', 'Alambamento (lễ hỏi)', 'Alambamento engagement gifts', 'nghi thức hỏi cưới truyền thống, gia đình nhà trai mang lễ vật đến nhà gái. Hai bên cùng ăn uống sau khi thỏa thuận.',
  d => { d.r(1,9,14,4,'n'); d.r(1,9,14,1,'N'); d.r(2,5,4,4,'r'); d.r(3,5,1,4,'y'); d.r(7,4,2,5,'G'); d.r(7,3,2,1,'y'); d.r(10,6,5,3,'b'); d.r(10,6,5,1,'o'); d.p('y',2,4,5,4,3,3,4,3); d.p('N',3,13,3,14,12,13,12,14); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'ao-wedding', 'Tiệc cưới', 'Wedding feast', 'thịt nướng, funge, bia và bánh được chuẩn bị cho đông khách. Nhạc và nhảy thường kéo dài đến khuya.',
  d => { d.r(4,9,8,5,'w'); d.r(5,6,6,3,'w'); d.r(6,3,4,3,'w'); d.p('p',4,10,6,11,8,10,10,11,11,10,5,7,7,7,9,7); d.p('r',7,2,8,1,8,2,9,2); d.r(2,14,12,1,'a'); d.p('y',2,4,13,3,2,8,13,8); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'ao-funeral-meal', 'Lễ tang', 'Funeral meal', 'gia đình phục vụ bữa ăn cho người đến viếng. Nhiều cộng đồng cùng đóng góp thức ăn.',
  d => { d.r(4,7,8,7,'A'); d.r(3,6,10,1,'a'); d.e(8,5,4.4,1.2,'w'); d.r(2,8,2,1,'k'); d.r(12,8,2,1,'k'); d.r(1,14,14,1,'N'); d.r(2,1,1,3,'e'); d.p('o',2,0); d.r(13,1,1,3,'e'); d.p('o',13,0); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'ao-summer-fruits', 'Trái cây mùa nóng', 'Summer fruits', 'xoài, chuối, dứa và chanh dây chín rộ vào cuối năm. Chợ đầy màu sắc trái cây.',
  d => { d.e(4,10,3,4,'y'); d.p('r',5,8,5,9); d.p('G',4,5,5,4); d.l(7,13,12,12,'y'); d.l(7,14,12,13,'Y'); d.e(12,7,2.8,3.4,'o'); for(let y=5;y<11;y+=2) d.p('O',11,y,13,y+1); d.p('G',10,2,11,3,12,1,13,3,14,2,12,3); d.e(8,7,1.8,1.8,'v'); }, { use: 'hold' });
