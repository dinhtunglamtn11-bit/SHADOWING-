import { add, SC, setCC } from './pass-kit.js';
setCC('lr');
// Liberia · Nhóm 3: Ẩm thực

// ----- Cơm và món chính -----
add(3, 'Cơm và món chính', 'lr-palm-butter', 'Cơm với bơ cọ (palm butter and rice)', 'Palm butter and rice', 'món được nhiều người xem như món quốc dân, nấu bằng quả cọ dầu hấp, giã và lọc thành sốt đặc rồi nấu với cá, gà hoặc thịt khói. Sốt có màu cam đỏ, vị béo và thơm đặc trưng.',
  d => { d.e(8,11,7,3.8,'a'); d.e(6,8,3.6,3,'w'); d.p('W',4,7,5,6,6,8); d.e(11,10,3.4,2.4,'o'); d.p('r',10,9,12,10); d.e(11,9,1.6,1,'n'); d.p('y',9,10); d.p('R',10,12,12,11); }, { use: 'hold' });
add(3, 'Cơm và món chính', 'lr-jollof', 'Cơm Jollof (jollof rice)', 'Jollof rice', 'gạo nấu cùng cà chua, hành và gia vị thành món cơm đỏ cay nhẹ, nguồn gốc từ vùng Senegambia. Ở Liberia, món này thường có trong tiệc và ngày lễ.',
  d => { d.e(8,12,7,3,'w'); d.e(8,9,5.5,3.2,'r'); d.p('o',5,8,7,7,9,9,11,8,6,10,10,10,8,8); d.p('g',6,7,10,7); d.p('y',8,10,12,9); d.p('m',4,10,9,6); }, { use: 'hold' });
add(3, 'Cơm và món chính', 'lr-cassava-leaf', 'Canh lá sắn (cassava leaf)', 'Cassava leaf soup', 'lá sắn giã nhỏ nấu lâu với dầu cọ, cá khô và thịt. Món sệt màu xanh đậm, ăn với cơm trắng.',
  d => { d.e(8,11,6.5,3.8,'N'); d.e(8,8,6,2.4,'G'); d.p('g',4,8,5,7,6,9,8,7,9,9,11,7,12,8); d.p('t',6,8,10,8); d.p('n',9,7,8,8); d.p('r',11,9); d.p('t',3,12,13,12); }, { use: 'hold' });
add(3, 'Cơm và món chính', 'lr-potato-greens', 'Canh lá khoai lang (potato greens)', 'Potato greens', 'lá khoai lang xanh hầm với ớt, hành và cá hoặc thịt. Đây là món gia đình rất quen thuộc.',
  d => { d.e(8,11,7,3.6,'a'); d.e(8,9,5.5,2.8,'g'); d.p('G',5,9,6,8,8,10,9,8,11,9); d.e(6,8,1.4,1,'h'); d.e(10,9,1.4,1,'h'); d.p('r',7,9,11,8); d.p('n',9,10,10,10); d.p('g',5,5,6,4,7,5); d.p('G',6,5,6,6); }, { use: 'hold' });
add(3, 'Cơm và món chính', 'lr-dumboy', 'Dumboy (bột sắn giã dẻo)', 'Dumboy pounded cassava', 'sắn luộc rồi giã nhuyễn thành khối dẻo mịn, chấm với canh hoặc sốt. Người ăn thường nuốt chứ không nhai nhiều.',
  d => { d.e(8,11,7,3.8,'n'); d.e(8,9,6,2.4,'o'); d.e(6,8,3,2.6,'e'); d.p('w',5,7,6,6); d.p('r',10,9,12,10); d.p('g',11,8,9,10); d.p('t',7,10,5,10); }, { use: 'hold' });
add(3, 'Cơm và món chính', 'lr-groundnut-soup', 'Canh đậu phộng (groundnut soup)', 'Groundnut soup', 'đậu phộng nghiền sệt nấu với gà và ớt, có vị béo và ngọt nhẹ. Thường ăn với cơm hoặc dumboy.',
  d => { d.e(8,11,6.5,3.8,'b'); d.e(8,8,6,2.4,'t'); d.p('n',5,8,7,7,9,9,11,8); d.e(6,8,2,1.2,'O'); d.p('r',9,7,10,9); d.p('g',11,9); d.p('w',3,12,4,13); for(const [x,y] of [[2,4],[4,2],[6,4]]) d.e(x,y,1,1.2,'n'); }, { use: 'hold' });
add(3, 'Cơm và món chính', 'lr-fried-fish', 'Cá chiên và cá nướng (fried fish)', 'Fried and grilled fish', 'cá biển như cá mú, cá đỏ hoặc cá mòi được ướp gia vị rồi chiên hoặc nướng. Bán nhiều ở bến cảng và quán ven đường.',
  d => { d.e(8,12,7,3,'w'); d.e(7,8,5,2.8,'o'); d.dtri(11,5,5,3,'_'); d.p('o',12,7,13,6,14,5,12,9,13,10,14,11,11,8); d.l(5,6,4,10,'N'); d.l(8,6,7,10,'N'); d.p('k',3,7); d.e(13,13,1.8,1.4,'y'); d.p('g',2,12,3,11); }, { use: 'hold' });
add(3, 'Cơm và món chính', 'lr-bush-meat', 'Thịt rừng (bush meat)', 'Bush meat', 'thịt động vật hoang dã từng là nguồn đạm quan trọng ở vùng rừng. Việc săn bắt tràn lan đã gây lo ngại cho động vật hoang dã và sức khỏe cộng đồng.',
  d => { d.r(2,11,12,3,'k'); d.p('o',4,12,7,12,10,12,12,12); for(const x of [3,13]) d.p('a',x,14,x,15); d.l(1,10,15,10,'a'); d.e(5,7,3,2.4,'N'); d.e(11,8,2.6,1.8,'n'); d.p('m',4,6,6,8,10,7,12,8); d.l(11,8,14,5,'n'); d.p('w',14,4,15,5); }, { use: 'hold' });

// ----- Súp và món hầm -----
add(3, 'Súp và món hầm', 'lr-pepper-soup', 'Súp cay (pepper soup)', 'Pepper soup', 'nước dùng trong suốt với thịt dê, gà hoặc cá, ớt và gia vị thảo mộc. Người ta tin rằng súp cay giúp ấm người khi trời mưa.',
  d => { d.e(8,11,6.5,3.8,'w'); d.e(8,8,6,2.4,'o'); d.e(6,8,2,1.4,'n'); d.p('r',9,7,10,7,11,8,12,7,9,9); d.p('R',10,8); d.p('g',4,8,11,9); d.l(12,4,14,2,'r'); d.p('g',15,1,14,1); d.p('b',4,12,6,13,8,12,10,13,12,12); }, { use: 'hold' });
add(3, 'Súp và món hầm', 'lr-okra-soup', 'Canh đậu bắp (okra soup)', 'Okra soup', 'đậu bắp thái nhỏ nấu nhớt với cá khô hoặc tôm. Ăn kèm cơm hoặc bột sắn.',
  d => { d.e(8,11,6.5,3.8,'N'); d.e(8,8,6,2.4,'G'); for(const [x,y] of [[5,8],[9,7],[11,9]]){ d.e(x,y,1.4,1.2,'h'); d.p('G',x,y); } d.p('o',7,9,7,7); d.p('n',3,8); d.l(10,5,13,1,'g'); d.p('G',13,0,14,1); }, { use: 'hold' });
add(3, 'Súp và món hầm', 'lr-butter-beans', 'Đậu lima (butter bean) hầm thịt', 'Butter beans with meat', 'đậu lớn hầm mềm với thịt, ăn với cơm. Buổi tối gia đình nấu một nồi lớn để chia nhau.',
  d => { d.e(8,11,6.5,3.8,'r'); d.e(8,8,6,2.4,'O'); for(const [x,y] of [[4,8],[6,7],[8,9],[10,7],[11,9]]){ d.p('u',x,y,x+1,y); } d.e(7,8,1.4,1,'N'); d.e(11,8,1.2,1,'m'); d.p('w',3,12,4,13); }, { use: 'hold' });
add(3, 'Súp và món hầm', 'lr-bitterball', 'Quả cà đắng (bitterball)', 'Bitterball', 'loại cà nhỏ vị đắng được cho vào canh và món hầm. Vị đắng nhẹ làm món sâu thêm hương vị.',
  d => { for(const [x,y,c] of [[5,10,'e'],[11,9,'g'],[8,13,'h']]){ d.e(x,y,3.2,2.8,c); d.p('w',x-1,y-1); d.p('G',x,y-3,x,y-4,x-1,y-3,x+1,y-3); } d.p('g',2,3,3,2,4,3,3,3,12,3,13,2,14,3); }, { use: 'hold' });
add(3, 'Súp và món hầm', 'lr-dried-fish-shrimp', 'Cá khô và tôm khô', 'Dried fish and shrimp', 'nguyên liệu thường cho vào canh để tạo độ đậm đà. Dễ cất giữ trong khí hậu ẩm.',
  d => { d.r(1,2,14,1,'N'); for(const x of [3,8]){ d.e(x+.5,7,1.6,4,'n'); d.dtri(x-1,11,5,3,'N'); d.p('k',x,5); d.p('N',x,7,x+1,9); d.p('a',x,3); } for(const y of [4,8,12]){ d.p('o',12,y,13,y,14,y+1,14,y+2,13,y+2); d.p('r',12,y+1); } }, { use: 'hold' });

// ----- Bánh và đồ ăn vặt -----
add(3, 'Bánh và đồ ăn vặt', 'lr-rice-bread', 'Bánh gạo (Liberian rice bread)', 'Liberian rice bread', 'bánh nhẹ, ngọt làm từ bột gạo, chuối chín và đường, nướng mềm. Nhiều gia đình làm vào dịp lễ và đãi khách.',
  d => { d.e(8,13,7,2.4,'w'); d.r(3,6,10,7,'o'); d.r(3,5,10,2,'O'); d.e(8,5,5,1.4,'O'); d.p('y',5,8,8,10,11,8,6,11,10,11); d.p('t',4,7,9,7); d.p('N',3,12,12,12); }, { use: 'hold' });
add(3, 'Bánh và đồ ăn vặt', 'lr-kala', 'Kala (bánh chiên chuối)', 'Kala banana fritters', 'bột gạo trộn chuối chín chiên vàng, bán đầy các quán ven đường. Ngọt và thơm mùi dầu.',
  d => { d.e(8,12,7,3,'a'); for(const [x,y] of [[5,10],[11,10],[8,7]]){ d.e(x,y,2.8,2.6,'O'); d.p('o',x-1,y-1,x,y-1); d.p('n',x+1,y+1); } d.l(2,4,5,2,'y'); d.l(3,5,6,3,'y'); d.p('N',2,3,6,2); }, { use: 'hold' });
add(3, 'Bánh và đồ ăn vặt', 'lr-fried-plantain', 'Chuối chiên (fried plantain)', 'Fried plantain', 'chuối nấu chín cắt lát và chiên vàng, ăn kèm cá hoặc làm món vặt. Giòn ngoài, mềm trong.',
  d => { d.e(8,12,7,3,'w'); for(const [x,y] of [[3,9],[7,11],[11,9],[6,7],[10,6]]){ d.e(x+.5,y,2.4,1.4,'y'); d.p('O',x,y-1,x+1,y,x+2,y-1); d.p('n',x-1,y); } d.p('g',2,12,3,13); }, { use: 'hold' });
add(3, 'Bánh và đồ ăn vặt', 'lr-cassava', 'Sắn luộc và bánh sắn', 'Boiled cassava and cake', 'sắn có thể luộc, chiên hoặc làm bánh. Là món phổ biến khi thiếu gạo.',
  d => { d.e(8,12,7,3,'n'); d.l(2,9,8,5,'N'); d.l(3,10,9,6,'N'); d.l(4,11,10,7,'N'); d.e(10,6.5,1.6,2,'w'); d.p('t',10,6); d.r(9,9,5,3,'u'); d.p('o',9,9,10,9,11,9,12,9,13,9); d.p('G',2,6,3,5); }, { use: 'hold' });
add(3, 'Bánh và đồ ăn vặt', 'lr-corn-peanuts', 'Ngô nướng và đậu phộng rang', 'Roasted corn and peanuts', 'đồ ăn vặt giản dị bán bên đường. Ngô nướng thơm khói than rất được ưa chuộng.',
  d => { d.e(6,7,2.8,6,'y'); for(let y=2;y<13;y+=2) d.p('O',5,y,7,y+1); d.p('N',6,4,5,9,7,11); d.p('g',2,10,3,11,3,12,4,13,9,10,9,12,8,13); d.r(5,13,3,3,'t'); for(const [x,y] of [[11,13],[13,11],[14,14],[11,10]]){ d.e(x,y,1.4,1,'n'); d.p('N',x,y); } }, { use: 'hold' });
add(3, 'Bánh và đồ ăn vặt', 'lr-fruits', 'Xoài, dứa và đu đủ', 'Mango, pineapple and papaya', 'trái cây nhiệt đới chín ở nhiều vùng, bán rẻ ở chợ. Xoài chín rộ vào khoảng đầu mùa hè.',
  d => { d.e(3.5,11,2.8,3.4,'y'); d.p('r',3,9,4,10); d.r(7,7,4,7,'o'); for(let y=8;y<14;y+=2) d.p('O',7,y,9,y+1); d.p('G',7,6,8,4,9,6,10,3,9,2,7,3,8,5); d.e(13.5,10,2.2,4.4,'g'); d.e(13.5,10,1,2.8,'o'); d.p('k',13,9,14,11); }, { use: 'hold' });

// ----- Đồ uống -----
add(3, 'Đồ uống', 'lr-liberica-coffee', 'Cà phê Liberica (Liberian coffee)', 'Liberica coffee', 'loài cà phê có nguồn gốc Tây Phi, mang tên chính đất nước này. Hạt lớn, hương khói, gỗ và trái cây chín.',
  d => { d.r(1,8,8,6,'w'); d.r(1,8,8,1,'N'); d.p('w',9,9,10,9,11,10,11,11,10,12,9,12); d.r(0,14,11,1,'a'); for(const [x,y] of [[11,3],[13,7],[6,3]]){ d.e(x,y,1.8,2.6,'n'); d.l(x,y-2,x,y+2,'N'); } d.p('g',2,2,3,1,2,3); }, { use: 'hold' });
add(3, 'Đồ uống', 'lr-palm-wine', 'Rượu cọ (palm wine)', 'Palm wine', 'nhựa cây cọ lên men nhẹ, ngọt khi mới lấy và chua dần theo thời gian. Nhiều người uống vào buổi chiều trong làng.',
  d => { d.e(6,11,4,4,'t'); d.r(5,5,3,3,'t'); d.r(5,4,3,1,'N'); d.p('n',3,11,6,13,9,11,5,9,8,9); d.l(13,2,13,15,'N'); for(const [x,y] of [[9,1],[10,4],[12,0],[15,1],[15,4]]) d.l(13,3,x,y,'G'); d.p('e',11,6,11,7); }, { use: 'hold' });
add(3, 'Đồ uống', 'lr-cane-juice', 'Rượu mía (cane juice)', 'Cane juice liquor', 'rượu mạnh cất từ nước mía lên men, đặc sản địa phương. Rất mạnh và thường uống chỉ một ít.',
  d => { d.r(3,6,6,9,'l'); d.r(5,2,2,4,'l'); d.r(5,1,2,1,'n'); d.r(4,10,4,4,'e'); d.r(11,1,1,14,'t'); d.r(13,3,1,12,'g'); d.p('N',11,5,11,10,13,7,13,11); d.p('g',9,2,10,1,12,0,14,2,15,1); }, { use: 'hold' });
add(3, 'Đồ uống', 'lr-ginger-beer', 'Nước gừng (ginger beer)', 'Ginger beer', 'nước gừng giã pha với đường và chanh, uống lạnh. Cay nồng, giải khát trong ngày nóng.',
  d => { d.r(2,5,7,10,'l'); d.r(2,7,7,8,'u'); d.p('w',3,9,6,12,4,13); d.l(7,1,5,9,'g'); d.e(12,11,2.8,2.4,'t'); d.p('t',11,8,10,7,14,9,15,8); d.p('n',11,11,13,12); d.e(12,4,2,2,'g'); d.e(12,4,1,1,'h'); }, { use: 'hold' });
add(3, 'Đồ uống', 'lr-sugarcane-coconut', 'Nước mía và nước dừa tươi', 'Sugarcane juice and coconut', 'đồ uống rẻ và dễ mua ven đường. Nhiều người dùng khi đi chợ giữa trưa.',
  d => { d.e(5,10,4.4,4.4,'g'); d.e(5,6,3,1.2,'w'); d.l(6,6,9,1,'r'); d.r(11,5,4,10,'l'); d.r(11,7,4,8,'h'); d.p('G',3,12,4,13); d.r(11,1,1,4,'t'); d.r(13,2,1,3,'t'); d.p('G',11,2,13,3); }, { use: 'hold' });
add(3, 'Đồ uống', 'lr-kola-nut', 'Hạt kola (kola nut)', 'Kola nuts', 'hạt đắng có chất kích thích nhẹ, được nhai và dùng để chào khách và trong nghi lễ. Tặng hạt kola là biểu hiện sự tôn trọng.',
  d => { for(const [x,y,c] of [[5,10,'r'],[10,11,'m'],[8,6,'t']]){ d.e(x,y,3,2.8,c); d.l(x,y-2,x,y+2,'N'); d.p('w',x-1,y-1); } d.p('g',2,3,3,2,4,3,3,4,12,3,13,2,14,3,13,4); }, { use: 'hold' });

// ----- Món lễ và theo mùa -----
add(3, 'Món lễ và theo mùa', 'lr-christmas-easter', 'Giáng sinh và lễ Phục Sinh', 'Christmas and Easter meal', 'bữa cơm đông đúc với cơm jollof, gà nướng, bánh gạo và bánh ngọt. Nhiều gia đình họp mặt sau buổi lễ nhà thờ.',
  d => { d.e(8,12,7,3,'w'); d.e(7,10,4.4,2.6,'n'); d.p('O',5,9,6,9,8,10); d.l(10,10,13,7,'n'); d.p('w',13,6,14,7); d.p('g',3,12,12,12); d.tri(10,0,5,6,'G'); d.p('y',12,0); d.e(3,3,1.8,2.4,'p'); d.p('b',2,3,3,3,4,3); d.p('y',3,2); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'lr-thanksgiving-meal', 'Lễ Tạ ơn (Thanksgiving, thứ Năm đầu tháng Mười Một)', 'Thanksgiving meal', 'ngày lễ được Liberia giữ từ ảnh hưởng của người đến từ Mỹ, dùng bữa tiệc lớn với gà hoặc gà tây. Nhiều nhà thờ tổ chức lễ cảm ơn.',
  d => { d.e(8,12,7,3,'a'); d.e(8,9,4.8,3.2,'O'); d.p('o',6,7,7,7,8,6); d.l(4,9,2,5,'n'); d.l(12,9,14,5,'n'); d.p('w',2,4,1,5,14,4,15,5); d.p('g',4,12,5,11,11,12,12,11); d.p('r',6,12,10,12); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'lr-independence-meal', 'Ngày Độc lập (26 tháng 7)', 'Independence Day food', 'ngày quốc khánh với tiệc ngoài trời, cơm, thịt nướng và nước ngọt. Mọi người xem diễu hành và cùng ăn uống.',
  d => { d.e(8,12,7,3,'w'); for(const [x,y] of [[5,11],[11,11]]) d.e(x,y,2.4,1.6,'n'); d.e(8,9.5,2.8,1.8,'r'); d.p('g',7,12,9,12); d.r(2,0,1,8,'N'); for(let y=0;y<5;y++) d.r(3,y,7,1,y%2?'w':'r'); d.r(3,0,3,3,'B'); d.p('w',4,1); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'lr-eid-meal', 'Ramadan và Eid (Lễ Hồi giáo)', 'Ramadan and Eid meal', 'cộng đồng Hồi giáo ăn sáng sớm trước bình minh và chia sẻ bữa cơm lúc hoàng hôn. Ngày Eid thường có thịt dê và cơm.',
  d => { d.e(8,12,7,3,'a'); d.e(6,9,3.4,2.6,'w'); d.e(11,10,2.6,1.8,'N'); d.p('m',10,9,12,10); d.e(4,3.5,3,3,'y'); d.e(5.5,3,2.6,2.6,'_'); d.p('y',11,2,10,3,11,3,12,3,11,4); d.p('n',13,6,14,7); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'lr-rice-harvest', 'Mùa thu hoạch gạo (khoảng tháng 9 đến tháng 11)', 'Rice harvest', 'gạo mới được nấu và chia sẻ trong làng. Nhiều cộng đồng tổ chức tiệc nhỏ tạ ơn.',
  d => { d.bg('c'); d.r(0,9,16,7,'y'); for(let x=1;x<16;x+=2){ d.r(x,8,1,4,'Y'); d.p('y',x+1,7); } d.e(10,5,1.4,1.4,'N'); d.p('r',9,3,10,3,11,3); d.r(9,7,3,5,'b'); d.l(12,8,14,10,'a'); d.e(3,12,2.4,1.8,'t'); d.p('O',2,11,4,12); }, SC);
