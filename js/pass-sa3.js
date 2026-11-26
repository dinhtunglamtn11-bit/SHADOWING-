import { add, SC, setCC } from './pass-kit.js';
setCC('sa');
// Ả Rập Xê Út · Nhóm 3: Ẩm thực

// ----- Cơm và món chính -----
add(3, 'Cơm và món chính', 'sa-kabsa', 'Kabsa', 'Kabsa', 'cơm nấu với thịt gà hoặc cừu, cà chua và hỗn hợp gia vị, thường được xem là món quốc gia. Món này có nhiều biến thể theo vùng và gia đình.',
  d => { d.e(8,11,7.5,3.5,'a'); d.e(8,10,6,2.8,'o'); d.e(8,8,4,2.5,'y'); d.e(7,7,3,2,'O'); d.p('n',6,6,8,7); d.p('r',4,10,11,9,10,11); d.p('g',5,9,9,11,12,10); d.p('w',9,6,10,5); }, { use: 'hold' });
add(3, 'Cơm và món chính', 'sa-mandi', 'Mandi', 'Mandi', 'thịt cừu hoặc gà hấp chín mềm và ướp khói, ăn cùng cơm. Nhiều người nói món có nguồn gốc từ Yemen, nhưng đã trở nên phổ biến ở nhiều nơi.',
  d => { d.e(8,12,7.5,3,'n'); d.e(8,10,6,2.8,'u'); d.e(8,8,4,2.8,'N'); d.e(7,7,2,1.4,'n'); d.p('e',11,6,12,5); d.p('Y',5,10,10,11); d.p('a',3,5,4,3,3,1,13,3,12,1); d.p('r',9,10); }, { use: 'hold' });
add(3, 'Cơm và món chính', 'sa-saleeg', 'Saleeg', 'Saleeg', 'cơm trắng nấu mềm với sữa và gà, thường được nhắc tới như món của vùng Hejaz. Vị béo nhẹ và dễ ăn nên phù hợp với cả người lớn và trẻ nhỏ.',
  d => { d.e(8,11,7,3.5,'b'); d.e(8,9,5.8,3,'w'); d.e(8,8,3,2,'O'); d.p('Y',7,7,9,8); d.p('e',4,9,11,10,6,11); d.p('g',10,8); d.p('a',5,4,6,2,10,4,11,2); }, { use: 'hold' });
add(3, 'Cơm và món chính', 'sa-jareesh', 'Jareesh', 'Jareesh', 'lúa mì nghiền thô nấu với sữa chua hoặc nước dùng thịt, món dân dã của vùng Najd. Đây là món ăn gắn với những bữa cơm gia đình truyền thống.',
  d => { d.e(8,11,7,3.5,'n'); d.e(8,9,5.8,3,'t'); for(const [x,y] of [[4,9],[6,8],[9,9],[11,8],[7,10],[10,10],[8,7]]) d.p('e',x,y); d.e(8,9,1.8,1,'O'); d.p('G',9,8); d.p('N',5,10,12,9); }, { use: 'hold' });
add(3, 'Cơm và món chính', 'sa-harees', 'Harees', 'Harees', 'lúa mì xay nhỏ nấu nhừ với thịt thành một hỗn hợp mịn như cháo đặc. Món này hay được nấu vào tháng Ramadan và dịp lễ.',
  d => { d.e(8,11,7,3.5,'e'); d.e(8,9,5.8,3,'u'); d.e(8,9,3,1.6,'y'); d.p('O',7,9,8,8,9,9); d.p('w',5,8,11,10); d.l(12,2,10,7,'n'); d.e(12.5,2,1.6,1.4,'n'); }, { use: 'hold' });
add(3, 'Cơm và món chính', 'sa-aseeda', 'Aseeda', 'Aseeda', 'khối bột lúa mì nấu chín dẻo, thường ăn với mật ong, bơ hoặc nước sốt. Đây là món dân gian ăn sáng hoặc ăn nhẹ.',
  d => { d.e(8,12,7,3,'w'); d.e(8,9,5,3.5,'t'); d.e(8,8,2.8,1.8,'Y'); d.p('y',8,8,7,8,9,9,5,10,11,11); d.p('O',6,11,10,10); d.l(13,3,11,7,'n'); d.p('y',11,8,11,9); d.p('N',5,12,12,12); }, { use: 'hold' });
add(3, 'Cơm và món chính', 'sa-marqooq', 'Marqooq', 'Marqooq', 'món hầm có bánh mỏng cắt nhỏ cho vào nước sốt thịt và rau. Thường nấu cho bữa tối ấm áp.',
  d => { d.r(2,7,12,6,'n'); d.dtri(2,13,12,2,'n'); d.r(1,6,14,2,'N'); d.e(8,7,5.5,1.4,'o'); d.p('t',5,6,6,7,9,6,11,7); d.p('g',7,7,10,6); d.p('r',8,6); d.p('N',0,8,15,8); d.p('a',5,3,6,1,10,3); }, { use: 'hold' });

// ----- Bánh, đồ ăn nhẹ và món sáng -----
add(3, 'Bánh, đồ ăn nhẹ và món sáng', 'sa-mutabbaq', 'Mutabbaq', 'Mutabbaq', 'bánh mỏng gấp nhân thịt băm, trứng hoặc rau rồi chiên trên chảo. Thường ăn ở các quán vỉa hè và nhất là trong tháng Ramadan.',
  d => { d.r(2,5,12,9,'O'); d.r(3,6,10,7,'y'); d.l(3,6,12,12,'O'); d.l(12,6,3,12,'O'); d.p('N',5,6,10,12,3,9,12,9); d.p('g',7,8,9,10); d.p('r',8,11,6,9); d.r(1,15,14,1,'a'); }, { use: 'hold' });
add(3, 'Bánh, đồ ăn nhẹ và món sáng', 'sa-sambusak', 'Sambusak', 'Sambusak', 'bánh nhân gấp tam giác, nhân thịt hoặc phô mai, chiên giòn. Đây là món quen thuộc trên bàn ăn khi mở chay.',
  d => { d.tri(0,3,9,8,'O'); d.tri(7,6,9,8,'O'); d.tri(1,5,7,6,'y'); d.tri(8,8,7,6,'y'); d.p('n',4,7,3,9,6,10,11,10,10,12,13,12); d.p('g',4,9,11,11); }, { use: 'hold' });
add(3, 'Bánh, đồ ăn nhẹ và món sáng', 'sa-ful', 'Ful medames và bánh mì', 'Ful medames and bread', 'đậu fava hầm với dầu ô liu và chanh, ăn kèm bánh mì nướng. Nhiều người ăn sáng bằng món này.',
  d => { d.e(6,10,5.5,4,'a'); d.e(6,9,4,2.8,'n'); d.p('N',4,9,6,8,8,10,5,10); d.p('y',7,8,4,8); d.p('g',6,9); d.e(12,6,3.5,3.5,'t'); d.p('O',11,5,13,7,12,4); d.p('y',2,3,3,3,2,4,3,4); d.p('g',4,2); }, { use: 'hold' });
add(3, 'Bánh, đồ ăn nhẹ và món sáng', 'sa-shawarma', 'Shawarma', 'Shawarma', 'thịt quay xiên cắt mỏng, cuốn bánh mì với rau và nước sốt. Đây là món ăn nhanh rất phổ biến ở thành phố.',
  d => { d.l(4,1,4,13,'a'); d.dtri(1,2,7,2,'n'); d.r(2,4,5,5,'n'); d.dtri(2,9,5,4,'N'); d.p('O',3,5,5,7,4,10); d.l(9,6,13,14,'t'); d.l(10,6,14,14,'t'); d.l(11,6,15,13,'e'); d.l(8,7,12,14,'e'); d.p('g',9,5,11,5); d.p('r',10,4); d.r(1,14,7,1,'a'); }, { use: 'hold' });
add(3, 'Bánh, đồ ăn nhẹ và món sáng', 'sa-samak', 'Cá nướng ven Biển Đỏ', 'Grilled Red Sea fish', 'cá tươi ướp gia vị và nướng, ăn với cơm hoặc bánh mì ở Jeddah và các đảo. Đây là hương vị khác biệt so với món thịt ở nội địa.',
  d => { d.e(7,9,6,3.5,'O'); d.tri(11,5,5,4,'O'); d.dtri(11,9,5,4,'O'); d.p('k',3,8); d.l(6,7,8,12,'N'); d.l(9,6,11,11,'N'); d.e(4,13,2,1.5,'y'); d.p('g',8,13,9,14,11,13); }, { use: 'hold' });

// ----- Đồ uống -----
add(3, 'Đồ uống', 'sa-qahwa', 'Cà phê Ả Rập (qahwa)', 'Arabic coffee (qahwa)', 'cà phê rang nhẹ, màu vàng nhạt, pha với bạch đậu khấu và đôi khi nghệ tây hoặc đinh hương. Đây là biểu tượng của sự hiếu khách, xem phần câu chuyện bên dưới.',
  d => { d.e(6,9,3.8,3.5,'Y'); d.r(4,12,5,2,'Y'); d.r(5,4,3,2,'y'); d.p('y',6,2,6,3); d.l(9,8,12,4,'Y'); d.l(2,7,1,10,'n'); d.l(1,10,3,12,'n'); d.r(10,10,5,2,'w'); d.dtri(10,12,5,3,'w'); d.r(11,10,3,1,'Y'); d.p('g',2,14,3,15); }, { use: 'hold' });
add(3, 'Đồ uống', 'sa-shai', 'Trà (shai)', 'Tea (shai)', 'trà đen pha đường, đôi khi thêm bạc hà hoặc xô thơm, uống sau bữa ăn hoặc trong mọi cuộc gặp. Nhiều người uống trà nhiều lần trong ngày.',
  d => { d.r(4,5,7,9,'o'); d.r(4,5,7,2,'l'); d.l(4,5,4,14,'W'); d.l(10,5,10,14,'W'); d.r(3,14,9,1,'a'); d.p('y',6,9,6,10); d.p('w',5,7); d.p('g',8,6,9,5,10,4,11,5); d.p('a',6,3,7,1,9,2); }, { use: 'hold' });
add(3, 'Đồ uống', 'sa-tamr-qahwa', 'Quả chà là và cà phê', 'Dates with coffee', 'chà là thường được ăn kèm cà phê đắng, cho vị ngọt cân bằng. Đây là cách tiếp khách quen thuộc nhất.',
  d => { d.e(5,11,3,2,'N'); d.e(9,12,3,2,'n'); d.e(6,13,3,1.8,'n'); d.p('t',4,10,8,11); d.r(10,5,5,2,'w'); d.dtri(10,7,5,4,'w'); d.r(11,5,3,1,'Y'); d.p('a',12,3,13,1); d.p('g',2,9,1,8); }, { use: 'hold' });
add(3, 'Đồ uống', 'sa-laban', 'Laban', 'Laban', 'sữa chua uống lỏng, mặn nhẹ, dễ giải khát trong trời nóng. Thường đi kèm các món cơm và thịt.',
  d => { d.r(4,3,7,11,'l'); d.r(4,5,7,9,'w'); d.r(3,2,9,1,'W'); d.r(5,14,5,1,'a'); d.r(5,8,5,3,'b'); d.p('w',7,9,8,9); d.p('W',6,6,6,12); d.p('g',12,5,13,4,12,3); }, { use: 'hold' });
add(3, 'Đồ uống', 'sa-sobia', 'Sobia', 'Sobia', 'thức uống lạnh được làm từ bột lúa mạch hoặc gạo ngâm, thường bán nhiều ở Hejaz vào tháng Ramadan. Người ta uống khi mở chay.',
  d => { d.r(4,4,7,10,'e'); d.r(4,4,7,2,'l'); d.r(3,14,9,1,'a'); d.r(5,7,2,2,'c'); d.r(8,10,2,2,'c'); d.p('t',6,12,9,7,7,10); d.l(9,0,7,6,'r'); d.p('n',12,10,13,11,12,12,13,13); }, { use: 'hold' });
add(3, 'Đồ uống', 'sa-champagne', '“Saudi champagne” (không cồn)', 'Non-alcoholic "Saudi champagne"', 'nước táo pha nước có ga, chanh và bạc hà, dùng mừng tiệc. Tên gọi vui nhưng không có rượu.',
  d => { d.r(5,3,6,11,'y'); d.r(5,3,6,2,'l'); d.r(4,14,8,1,'a'); d.e(7,7,1.5,1.5,'h'); d.e(9,11,1.5,1.5,'r'); d.p('w',6,9,10,6,8,12); d.p('g',11,2,12,1,13,2,12,3); d.e(3,11,2,2,'h'); d.l(8,0,8,4,'r'); }, { use: 'hold' });
add(3, 'Đồ uống', 'sa-zamzam', 'Nước Zamzam', 'Zamzam water', 'nước từ giếng ngay gần Kaaba ở Mecca, được nhiều người hành hương mang về. Đây có ý nghĩa tôn giáo đặc biệt.',
  d => { d.r(6,1,4,2,'g'); d.r(5,3,6,2,'l'); d.r(4,5,8,10,'l'); d.r(4,8,8,7,'c'); d.r(4,9,8,3,'w'); d.p('g',6,10,8,10,9,10); d.p('w',5,6,5,13); d.p('b',13,4,13,5,2,8); }, { use: 'hold' });
add(3, 'Đồ uống', 'sa-camelmilk', 'Sữa lạc đà', 'Camel milk', 'thức uống truyền thống của người Bedouin, ngày nay có bán ở một số nơi. Một số ý kiến cho rằng sữa này có lợi, nhưng chưa nên xem là thuốc.',
  d => { d.r(7,5,6,9,'w'); d.r(7,4,6,1,'W'); d.r(6,14,8,1,'a'); d.r(7,8,6,2,'t'); d.e(3,10,3,2,'t'); d.p('t',2,8,5,7,5,8,5,9); d.p('t',6,6); d.p('k',6,6); d.l(2,11,2,14,'n'); d.l(4,11,4,14,'n'); }, { use: 'hold' });

// ----- Tráng miệng và món lễ -----
add(3, 'Tráng miệng và món lễ', 'sa-tamr', 'Chà là (tamr)', 'Dates (tamr)', 'trái cây biểu tượng của Ả Rập Xê Út, có nhiều giống như Ajwa ở Medina và Sukkari ở Qassim. Người ta ăn chà là khi mở chay và dùng làm quà biếu.',
  d => { d.e(8,13,7,2.5,'t'); for(const [x,y] of [[4,10],[8,9],[12,10],[6,12],[10,12],[8,6]]){ d.e(x+.5,y+.5,2,1.6,'n'); d.p('t',x,y); d.p('N',x+1,y+1); } d.p('G',8,3,9,2,10,2,7,3); d.p('y',8,4); }, { use: 'hold' });
add(3, 'Tráng miệng và món lễ', 'sa-kunafa', 'Kunafa', 'Kunafa', 'bánh sợi mỏng giòn nhân phô mai mềm, đổ si rô ngọt. Đây là món tráng miệng phổ biến ở nhiều nước Ả Rập.',
  d => { d.e(8,11,7,3.5,'a'); d.r(2,7,12,4,'O'); d.r(2,6,12,2,'o'); d.r(2,9,12,1,'u'); for(let x=3;x<14;x+=2) d.p('y',x,6,x+1,7); d.e(8,5,2,1,'g'); d.p('h',8,5); }, { use: 'hold' });
add(3, 'Tráng miệng và món lễ', 'sa-luqaimat', 'Luqaimat', 'Luqaimat', 'viên bột chiên giòn rưới si rô chà là hoặc mật ong. Thường được làm trong tháng Ramadan và lễ hội.',
  d => { d.e(8,13,7,2.5,'b'); for(const [x,y] of [[4,10],[8,10],[11,10],[6,7],[10,7],[8,4]]){ d.e(x+.5,y+.5,2.1,2.1,'O'); d.p('y',x,y-1); d.p('N',x+1,y+1); } d.p('n',6,6,8,3,10,6); }, { use: 'hold' });
add(3, 'Tráng miệng và món lễ', 'sa-maamoul', 'Ma’amoul', 'Ma\'amoul cookies', 'bánh quy nhân chà là hoặc hạt, thường làm vào dịp lễ Eid al-Fitr (lễ kết thúc Ramadan). Nhiều gia đình ép bánh trong khuôn gỗ để tạo hình.',
  d => { for(const [x,y] of [[4,5],[11,6],[7,11]]){ d.e(x+.5,y+.5,3.5,3,'t'); d.p('e',x,y-2,x-2,y,x+2,y,x,y+2); d.p('O',x,y,x-1,y-1,x+1,y+1,x+1,y-1,x-1,y+1); } d.r(2,15,12,1,'a'); }, { use: 'hold' });
add(3, 'Tráng miệng và món lễ', 'sa-iftar', 'Bữa mở chay (iftar)', 'The iftar meal', 'sau khi mặt trời lặn trong tháng Ramadan, người ta ăn chà là và uống nước, rồi ăn súp, sambusak và các món khác. Bữa tối này thường là bữa chung của cả gia đình.',
  d => { d.bg('V'); d.e(12,3,2,2,'u'); d.e(13,2,1.6,1.6,'V'); d.p('y',3,2,7,4); d.r(0,9,16,7,'r'); d.e(5,11,3,1.6,'w'); d.e(11,12,3.5,1.8,'w'); d.p('n',4,11,5,10,6,11); d.p('o',10,12,11,11,12,12); d.r(8,7,2,4,'l'); d.p('b',8,9,9,9); }, SC);
add(3, 'Tráng miệng và món lễ', 'sa-adha', 'Eid al-Adha (lễ hiến tế)', 'Eid al-Adha', 'gia đình mổ cừu hoặc dê rồi chia thịt cho họ hàng và người nghèo. Đây là dịp có nhiều món thịt trên bàn ăn.',
  d => { d.bg('c'); d.r(0,12,16,4,'g'); d.e(8,9,4.5,3.5,'w'); d.e(12,6,2.2,2.2,'w'); d.e(13,7,1.4,1.4,'t'); d.p('k',13,6); d.l(11,4,10,6,'n'); for(const x of [5,7,9,11]) d.r(x,12,1,3,'n'); d.p('y',2,2,3,1,4,2,3,3); }, SC);
add(3, 'Tráng miệng và món lễ', 'sa-terfas', 'Nấm cục sa mạc (terfas)', 'Desert truffles (terfas)', 'loại nấm mọc dưới cát sau những trận mưa mùa đông đến xuân, người dân đi tìm ngoài sa mạc. Đây là món theo mùa và giá có thể khá cao.',
  d => { d.r(0,12,16,4,'t'); d.e(5,10,4,3.5,'n'); d.e(11,11,3.5,3,'O'); d.p('N',3,9,5,11,6,8,11,10,12,12); d.p('t',4,8,10,10); d.p('G',13,6,14,5,13,7); d.p('b',3,2,8,3,12,1); }, { use: 'hold' });
