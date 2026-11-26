import { add, SC, setCC } from './pass-kit.js';
setCC('sa');
// Ả Rập Xê Út · Nhóm 5: Con vật, tín ngưỡng, lịch sử và người nổi tiếng

// ----- Con vật và linh vật -----
add(5, 'Con vật và linh vật', 'sa-camel', 'Lạc đà một bướu', 'The dromedary camel', 'con vật gắn bó nhất với đời sống sa mạc, dùng để chuyên chở, lấy sữa và thịt. Nhiều cuộc đua lạc đà và lễ hội vẫn được tổ chức mỗi năm.',
  d => { d.e(8,9,5,3,'t'); d.e(8,6,2.6,2.4,'t'); d.l(12,8,13,4,'t'); d.l(13,8,14,4,'t'); d.e(13.5,3,2.2,1.6,'t'); d.p('t',12,1); d.p('k',14,3); for(const x of [4,6,10,12]){ d.r(x,11,1,4,'t'); d.p('n',x,15); } d.l(3,8,1,12,'n'); d.r(6,7,5,2,'r'); d.p('y',7,9,9,9); }, { use: 'pet' });
add(5, 'Con vật và linh vật', 'sa-arabhorse', 'Ngựa Ả Rập', 'The Arabian horse', 'giống ngựa thanh mảnh, cổ cong, được người Bedouin gìn giữ và lai tạo từ rất lâu. Giống ngựa này đã góp máu cho nhiều giống ngựa trên thế giới.',
  d => { d.e(8,9,5,3,'W'); d.l(11,8,12,4,'W'); d.l(12,8,13,4,'W'); d.l(13,8,13,5,'W'); d.e(14,4,2,1.6,'W'); d.p('W',12,1,13,2); d.p('k',13,3); d.p('a',11,3,10,4,10,5,10,6); d.l(3,8,0,5,'a'); d.l(3,9,1,12,'a'); for(const x of [4,6,10,12]){ d.r(x,11,1,4,'W'); d.p('k',x,15); } }, { use: 'pet' });
add(5, 'Con vật và linh vật', 'sa-falcon', 'Chim ưng (falcon)', 'The falcon', 'chim săn mồi được huấn luyện từ thời xưa và được xem là biểu tượng của sự can đảm. UNESCO công nhận nghề nuôi chim săn là di sản phi vật thể chung của nhiều nước, trong đó có Ả Rập Xê Út.',
  d => { d.e(8,8,3.5,4.5,'n'); d.e(8,3,2.6,2.4,'n'); d.p('y',8,4,8,5); d.p('k',7,3,9,3); d.e(8,9,2,3,'e'); d.p('N',7,8,9,9,8,10); d.l(4,7,2,12,'N'); d.l(12,7,14,12,'N'); d.p('y',6,13,9,13); d.r(3,14,10,2,'R'); }, { use: 'pet' });
add(5, 'Con vật và linh vật', 'sa-oryx', 'Linh dương Ả Rập (Arabian oryx)', 'The Arabian oryx', 'loài linh dương trắng sừng dài, từng gần tuyệt chủng rồi được thả lại tự nhiên. Câu chuyện được kể ở cuối nhóm.',
  d => { d.e(8,10,4.5,3,'w'); d.e(4,7,2.4,2.6,'w'); d.l(4,4,7,0,'k'); d.l(3,4,5,0,'k'); d.p('N',3,7,3,8,4,9); d.p('k',4,6); d.p('N',5,5); for(const x of [5,7,10,12]){ d.r(x,12,1,3,'n'); d.p('k',x,15); } d.l(12,9,14,12,'W'); }, { use: 'pet' });
add(5, 'Con vật và linh vật', 'sa-leopard', 'Báo Ả Rập', 'The Arabian leopard', 'loài báo nhỏ chỉ còn rất ít cá thể ở dãy núi phía tây nam, thuộc nhóm bị đe dọa rất nghiêm trọng. Các chương trình nhân giống và bảo tồn đang được thực hiện.',
  d => { d.e(9,9,4.5,3,'y'); d.e(5,6,3.4,3,'y'); d.p('y',2,3,3,2,7,2,8,3); d.p('g',4,5,6,5); d.p('p',5,7); d.p('w',4,8,6,8); for(const [x,y] of [[8,7],[11,8],[9,10],[12,10],[7,9],[10,8],[4,3]]) d.p('N',x,y); for(const x of [6,8,11,12]) d.r(x,11,1,4,'y'); d.l(13,9,15,5,'y'); d.p('N',15,4); }, { use: 'pet' });
add(5, 'Con vật và linh vật', 'sa-baboon', 'Khỉ hamadryas ở núi Asir và Taif', 'The hamadryas baboon', 'loài khỉ đầu chó sống thành đàn trên sườn núi, đôi khi xuất hiện gần đường. Du khách thường được nhắc không cho chúng ăn.',
  d => { d.e(8,6,5,4.5,'a'); d.e(8,7,2.4,3,'x'); d.p('k',7,6,9,6); d.p('R',7,9,8,9,9,9); d.e(8,12,3.5,2.5,'a'); d.r(5,13,2,2,'A'); d.r(9,13,2,2,'A'); d.l(11,12,14,9,'a'); d.p('W',3,5,4,8,12,8,13,5); }, { use: 'pet' });
add(5, 'Con vật và linh vật', 'sa-dugong', 'Cá mập voi và bò biển (dugong) ở Biển Đỏ', 'Whale sharks and dugongs of the Red Sea', 'vùng biển có san hô và nhiều loài sinh vật biển quan trọng. Một số khu vực được bảo vệ để phục vụ du lịch lặn biển.',
  d => { d.e(8,8,6.5,3.5,'a'); d.e(3,8,3,2.8,'a'); d.p('k',3,7); d.p('x',1,9,2,9); d.l(13,8,15,5,'A'); d.l(13,9,15,12,'A'); d.p('A',14,6,14,11); d.tri(6,11,4,3,'A'); d.p('w',7,6,9,7,11,6,8,9); d.p('c',2,3,4,1,12,3); }, { use: 'pet' });
add(5, 'Con vật và linh vật', 'sa-emblem', 'Cây chà là và hai thanh kiếm trên quốc huy', 'The palm and crossed swords emblem', 'huy hiệu có một cây chà là và hai thanh kiếm bắt chéo, biểu tượng của sự sống và sức mạnh. Lá cờ xanh có dòng chữ Ả Rập và một thanh kiếm.',
  d => { d.bg('G'); d.l(8,3,8,9,'w'); for(const [x,y] of [[4,4],[5,1],[8,0],[11,1],[12,4]]) d.l(8,3,x,y,'w'); d.l(2,9,13,15,'y'); d.l(13,9,2,15,'y'); d.p('e',3,8,12,8,2,10,13,10); }, SC);

// ----- Tín ngưỡng và lễ tục -----
add(5, 'Tín ngưỡng và lễ tục', 'sa-islam', 'Đạo Hồi', 'Islam', 'tôn giáo của đa số người dân, ra đời ở Mecca và Medina vào thế kỷ 7. Đời sống hằng ngày, lịch nghỉ và luật lệ đều chịu ảnh hưởng của đạo.',
  d => { d.bg('B'); d.e(7,5,3.5,3.5,'u'); d.e(8.6,4,3,3,'B'); d.p('y',11,4,10,5,11,5,12,5,11,6); d.r(0,13,16,3,'G'); d.r(4,9,8,4,'e'); d.fan(8,9,2.5,'g'); d.r(2,6,1,7,'e'); d.r(13,6,1,7,'e'); d.p('y',2,5,13,5); d.r(7,11,2,2,'N'); }, SC);
add(5, 'Tín ngưỡng và lễ tục', 'sa-pillars', 'Năm trụ cột', 'The Five Pillars', 'gồm đức tin, cầu nguyện năm lần mỗi ngày, bố thí, nhịn ăn trong Ramadan và hành hương Hajj nếu đủ điều kiện. Đây là khung cơ bản của đời sống tín đồ.',
  d => { d.bg('c'); d.r(1,3,14,2,'y'); d.tri(1,0,14,3,'Y'); for(const x of [2,5,8,11,13]) d.r(x,5,1,8,'w'); d.r(1,13,14,1,'W'); d.r(0,14,16,2,'t'); }, SC);
add(5, 'Tín ngưỡng và lễ tục', 'sa-umrah', 'Mecca, Medina và Umrah', 'Mecca, Medina and Umrah', 'ngoài Hajj theo mùa, nhiều người đến Mecca hành hương nhỏ (Umrah) quanh năm. Dịch vụ khách sạn, giao thông và đón tiếp phục vụ số lượng rất lớn.',
  d => { d.bg('t'); d.r(0,12,16,4,'n'); d.l(1,15,14,9,'e'); d.r(6,4,4,5,'i'); d.r(6,5,4,1,'y'); d.fan(3,9,2,'g'); d.r(1,9,4,2,'w'); d.r(12,3,1,8,'w'); d.p('g',12,2); d.p('w',8,13,11,11); }, SC);
add(5, 'Tín ngưỡng và lễ tục', 'sa-arafat', 'Núi Arafat và hang Hira', 'Mount Arafat and the Cave of Hira', 'núi Arafat là nơi tín đồ đứng cầu nguyện trong Hajj, còn hang Hira trên núi Jabal al-Nour gắn với những truyền thống về thời kỳ đầu của đạo. Người theo đạo tới thăm vì ý nghĩa tôn giáo.',
  d => { d.bg('o'); d.e(13,3,1.8,1.8,'y'); d.tri(0,3,16,11,'n'); d.e(6,10,2.2,2,'i'); d.r(4,10,5,2,'i'); d.r(10,3,1,3,'w'); d.p('N',9,8,11,11,4,13,13,12); d.r(0,14,16,2,'t'); d.p('w',8,14,9,13,12,15); }, SC);
add(5, 'Tín ngưỡng và lễ tục', 'sa-jumuah', 'Ngày thứ Sáu (Jumu’ah)', 'Friday (Jumu\'ah)', 'ngày thứ Sáu là ngày cầu nguyện tập thể giữa trưa, và nhiều cửa hàng đóng cửa thời gian ngắn. Thành phố trở nên yên tĩnh hơn lúc đó.',
  d => { d.bg('c'); d.e(8,3,2,2,'y'); d.r(0,13,16,3,'t'); d.r(3,8,10,5,'w'); d.fan(8,8,3,'a'); d.r(1,4,2,9,'w'); d.p('g',1,3,2,3); for(const x of [4,7,10]) d.r(x,10,2,3,'G'); d.p('k',5,14,8,14,11,14); }, SC);
add(5, 'Tín ngưỡng và lễ tục', 'sa-shia', 'Cộng đồng Shia ở miền đông', 'The Shia community of the east', 'phần lớn dân theo nhánh Sunni, nhưng có một cộng đồng Shia thiểu số ở Tỉnh Miền Đông như Qatif và Al-Ahsa. Hai nhánh có một số thói quen tôn giáo khác nhau.',
  d => { d.bg('u'); d.r(0,13,16,3,'g'); d.r(4,8,8,5,'e'); d.fan(8,8,3,'c'); d.p('y',8,4); d.r(7,10,2,3,'B'); d.l(1,13,1,6,'n'); d.p('G',0,6,2,6,1,5,0,5,2,5); d.l(14,13,14,6,'n'); d.p('G',13,6,15,6,14,5,13,5,15,5); }, SC);
add(5, 'Tín ngưỡng và lễ tục', 'sa-worship', 'Quy định về nơi thờ tự', 'Rules on places of worship', 'các đạo khác không được xây nơi thờ tự công khai. Đây là một mục du khách nên tìm hiểu trước khi đến.',
  d => { d.bg('e'); d.r(2,1,12,14,'n'); d.r(3,2,10,12,'w'); for(const y of [4,6,8,10]) d.r(5,y,6,1,'a'); d.e(11,12,2,2,'r'); d.p('y',11,12); d.p('G',5,2,6,2,7,2); }, SC);

// ----- Lịch sử -----
add(5, 'Lịch sử', 'sa-nabataea', 'Vương quốc Nabataea và Lihyan', 'The Nabataean and Lihyanite kingdoms', 'các nền văn minh cổ ở tây bắc bán đảo, gắn với tuyến hương liệu và Hegra. Những dấu tích đá và chữ khắc vẫn còn để lại.',
  d => { d.bg('u'); d.r(0,13,16,3,'t'); d.r(2,3,12,10,'O'); d.r(3,2,3,1,'O'); d.r(10,2,2,1,'O'); for(const y of [5,7,9,11]) for(let x=3;x<13;x+=2) d.p('N',x,y+((x/2|0)%2)); d.p('e',4,6,8,8,11,5); }, SC);
add(5, 'Lịch sử', 'sa-islamrise', 'Sự ra đời của Đạo Hồi (thế kỷ 7)', 'The rise of Islam (7th century)', 'đạo phát triển ở Mecca rồi Medina, nhanh chóng lan ra ngoài bán đảo. Hai thành phố trở thành trung tâm tôn giáo lâu dài.',
  d => { d.bg('V'); d.p('y',3,2,13,3,9,1,2,7); d.e(11,5,2.5,2.5,'u'); d.e(12.2,4,2.2,2.2,'V'); d.r(0,12,16,4,'n'); d.r(2,7,5,5,'i'); d.r(2,8,5,1,'y'); d.e(11,11,2.4,1.5,'N'); d.p('N',13,10,14,9,10,13,12,13); }, SC);
add(5, 'Lịch sử', 'sa-ottoman', 'Thời kỳ Ottoman', 'The Ottoman period', 'nhiều thế kỷ Đế quốc Ottoman có ảnh hưởng mạnh ở Hejaz và các thánh địa. Tuyến đường sắt Hejaz năm 1908 là một dấu ấn của thời kỳ này.',
  d => { d.bg('c'); d.r(0,12,16,4,'t'); d.r(0,13,16,1,'k'); for(let x=1;x<16;x+=2) d.p('N',x,14); d.r(2,7,8,5,'k'); d.r(9,5,4,7,'R'); d.r(3,4,2,3,'k'); d.e(5,2,2,1.4,'W'); d.p('y',10,7,11,7); d.e(4,12,1.4,1.4,'a'); d.e(8,12,1.4,1.4,'a'); d.e(11,12,1.4,1.4,'a'); }, SC);
add(5, 'Lịch sử', 'sa-firststate', 'Nhà nước Saud thứ nhất và thứ hai', 'The first and second Saudi states', 'nhà nước đầu tiên ra đời ở Diriyah vào thế kỷ 18, nhà nước thứ hai tồn tại trong thế kỷ 19. Cả hai đều có trung tâm ở cao nguyên Najd.',
  d => { d.bg('o'); d.r(0,13,16,3,'t'); d.r(2,6,5,7,'n'); d.r(8,4,6,9,'O'); for(const [x,y] of [[2,5],[4,5],[6,5],[8,3],[10,3],[12,3]]) d.p(x<7?'n':'O',x,y); d.p('N',4,8,10,7,12,7); d.r(10,10,2,3,'N'); d.r(0,2,1,11,'N'); d.r(1,2,4,3,'G'); }, SC);
add(5, 'Lịch sử', 'sa-unification', 'Abdulaziz Al Saud và việc lập quốc (1902–1932)', 'King Abdulaziz and the founding (1902–1932)', 'năm 1902 ông chiếm lại Riyadh, rồi qua nhiều năm mở rộng để thống nhất nhiều vùng. Năm 1932, vương quốc Ả Rập Xê Út được tuyên bố.',
  d => { d.bg('u'); d.r(0,13,16,3,'t'); d.r(9,6,6,7,'O'); d.p('O',9,5,11,5,13,5); d.r(11,10,2,3,'N'); d.r(2,1,1,13,'N'); d.r(3,1,6,5,'G'); d.r(4,3,4,1,'w'); d.p('w',5,4); d.l(4,12,7,9,'a'); d.p('y',3,13); }, SC);
add(5, 'Lịch sử', 'sa-oil', 'Phát hiện dầu mỏ (1938)', 'The discovery of oil (1938)', 'giếng dầu thành công ở Dammam mở ra kỷ nguyên dầu mỏ. Nguồn thu từ dầu đã thay đổi nhanh nền kinh tế và xã hội.',
  d => { d.bg('o'); d.r(0,13,16,3,'t'); d.l(8,3,4,13,'k'); d.l(8,3,12,13,'k'); for(const y of [7,10]) d.l(6,y,10,y,'k'); d.l(6,10,10,7,'k'); d.r(7,0,2,3,'i'); d.p('i',5,1,10,1,4,3,11,2,6,0,9,0); d.e(3,13,2,1,'i'); }, SC);
add(5, 'Lịch sử', 'sa-opec', 'Thành lập OPEC (1960)', 'The founding of OPEC (1960)', 'Ả Rập Xê Út cùng một số nước sản xuất dầu lập ra Tổ chức Các nước Xuất khẩu Dầu mỏ (OPEC) để phối hợp chính sách dầu. Nước này là một trong những thành viên sáng lập.',
  d => { d.bg('B'); d.r(5,4,6,10,'k'); d.r(4,6,8,1,'a'); d.r(4,11,8,1,'a'); d.e(8,4,3,1,'K'); d.p('y',8,8,7,9,8,9,9,9,8,10); d.p('w',1,3,2,2,14,2,13,3,1,12,14,12); d.r(0,15,16,1,'t'); }, SC);

// ----- Người nổi tiếng -----
add(5, 'Người nổi tiếng', 'sa-khadija', 'Khadija bint Khuwaylid', 'Khadija bint Khuwaylid, merchant of Mecca', 'thương nhân ở Mecca và là vợ đầu của nhà tiên tri Muhammad, được tôn kính trong Đạo Hồi. Đây là một hình ảnh cho vai trò của phụ nữ trong thương mại thời đó.',
  d => { d.bg('u'); d.r(0,13,16,3,'t'); d.r(2,5,1,7,'N'); d.r(0,5,7,1,'N'); d.fan(1,9,1.5,'Y'); d.fan(5,9,1.5,'Y'); d.l(1,6,1,8,'N'); d.l(5,6,5,8,'N'); d.e(11,9,3,2,'n'); d.p('n',10,7); d.l(13,8,14,5,'n'); d.p('n',15,5); for(const x of [9,11,13]) d.r(x,10,1,3,'n'); d.r(10,8,3,1,'r'); }, SC);
add(5, 'Người nổi tiếng', 'sa-imru', 'Imru’ al-Qais', 'The poet Imru\' al-Qais', 'nhà thơ tiền Hồi giáo, được xem là một trong những nhà thơ lớn nhất của văn học Ả Rập. Tên ông gắn với các bài thơ treo (Mu’allaqat).',
  d => { d.bg('V'); d.p('w',3,2,13,3,10,1); d.r(3,4,10,10,'e'); d.r(2,3,12,2,'t'); d.r(2,13,12,2,'t'); for(const y of [7,9,11]) d.l(5,y,11,y,'n'); d.l(14,2,10,8,'w'); d.p('r',10,9); }, SC);
add(5, 'Người nổi tiếng', 'sa-abdulaziz', 'Vua Abdulaziz (Ibn Saud, 1875–1953)', 'King Abdulaziz (Ibn Saud)', 'người sáng lập vương quốc hiện đại, được kính trọng trong lịch sử quốc gia. Ông mất năm 1953 sau nhiều thập niên trị vì.',
  d => { d.bg('G'); d.e(8,7,3,3.4,'s'); d.dtri(2,3,12,9,'w'); d.r(4,3,8,2,'w'); d.e(8,8,2.8,3,'s'); d.r(4,3,8,1,'k'); d.p('k',7,7,9,7); d.r(6,9,5,2,'N'); d.r(3,11,10,5,'n'); d.l(5,11,5,15,'y'); d.l(10,11,10,15,'y'); }, SC);
add(5, 'Người nổi tiếng', 'sa-faisal', 'Vua Faisal (1906–1975)', 'King Faisal', 'hỗ trợ việc mở trường cho nữ sinh vào năm 1960 và hiện đại hóa nhiều lĩnh vực. Ông bị ám sát năm 1975.',
  d => { d.bg('B'); d.dtri(2,3,12,9,'w'); d.r(4,2,8,3,'w'); for(let x=5;x<12;x+=2) d.p('r',x,2,x,4); d.e(8,8,2.8,3,'s'); d.r(4,4,8,1,'k'); d.p('k',7,7,9,7); d.p('N',8,10,7,10,9,10); d.r(3,11,10,5,'k'); d.r(7,11,2,5,'w'); }, SC);
add(5, 'Người nổi tiếng', 'sa-talal', 'Talal Maddah (1940–2000)', 'The singer Talal Maddah', 'ca sĩ nổi tiếng với những bài hát được yêu thích khắp thế giới Ả Rập. Ông qua đời khi đang biểu diễn trên sân khấu ở Abha.',
  d => { d.bg('V'); d.e(7,5,2.6,2.8,'s'); d.r(5,2,5,2,'k'); d.p('k',6,4,8,4); d.p('N',7,6,8,6); d.r(3,8,9,8,'w'); d.e(8,12,3,2.8,'O'); d.l(10,10,14,6,'n'); d.p('y',13,2,13,3,12,4,14,2,2,3,2,4,1,5); }, SC);
add(5, 'Người nổi tiếng', 'sa-haifaa', 'Haifaa al-Mansour', 'Director Haifaa al-Mansour', 'nữ đạo diễn, tác giả bộ phim “Wadjda” (2012) về một cô bé muốn có chiếc xe đạp. Bộ phim được nhiều người biết đến ở nước ngoài.',
  d => { d.bg('c'); d.r(0,13,16,3,'A'); d.e(4,10,2.6,2.6,'g'); d.e(4,10,1.2,1.2,'c'); d.e(11,10,2.6,2.6,'g'); d.e(11,10,1.2,1.2,'c'); d.l(4,10,7,7,'g'); d.l(7,7,11,10,'g'); d.l(7,7,10,6,'g'); d.r(10,5,2,1,'k'); d.r(6,6,2,1,'k'); d.r(9,0,6,4,'k'); d.p('w',10,1,12,1,14,1); }, SC);
add(5, 'Người nổi tiếng', 'sa-rajaa', 'Rajaa Alsanea', 'Writer Rajaa Alsanea', 'nhà văn, tác giả tiểu thuyết “Girls of Riyadh” kể về những cô gái trẻ ở Riyadh. Cuốn sách được dịch sang nhiều thứ tiếng.',
  d => { d.bg('p'); d.r(3,2,10,12,'v'); d.r(4,2,9,11,'w'); d.r(4,2,1,11,'V'); d.p('p',7,5,9,5,6,6,10,6,8,6,7,7,9,7,8,8); for(const y of [10,12]) d.r(6,y,5,1,'a'); d.l(13,15,15,11,'y'); }, SC);
add(5, 'Người nổi tiếng', 'sa-footstars', 'Sami Al-Jaber và Majed Abdullah', 'Sami Al-Jaber and Majed Abdullah', 'hai ngôi sao bóng đá làm nên tên tuổi cho đội tuyển quốc gia ở thập niên 1980 và 1990. Nhiều người hâm mộ xem họ là biểu tượng của bóng đá nước này.',
  d => { d.bg('c'); d.r(0,12,16,4,'g'); for(const [x,n] of [[3,'w'],[11,'G']]){ d.e(x+.5,4,1.8,1.8,'s'); d.r(x-1,2,4,1,'k'); d.r(x-1,6,4,5,n); d.p('y',x,8,x+1,8); d.p('k',x-1,11,x+2,11,x-1,12,x+2,12); } d.e(8,13,1.6,1.6,'w'); d.p('k',8,13); }, SC);
