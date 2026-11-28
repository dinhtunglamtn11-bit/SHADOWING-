import { add, SC, setCC } from './pass-kit.js';
setCC('ca');
// Canada · Nhóm 3: Ẩm thực

// ----- Món ăn -----
add(3, 'Món ăn', 'ca-poutine', 'Poutine', 'Poutine', 'khoai tây chiên phủ phô mai đông (cheese curds) và nước sốt gravy nóng. Món này xuất hiện ở nông thôn Québec vào cuối thập niên 1950 và nay được xem là biểu tượng ẩm thực.',
  d => { d.r(2,9,12,5,'w'); d.r(3,14,10,1,'a'); d.r(2,11,12,1,'r'); for(const x of [3,5,7,9,11,12]) d.l(x,4+(x%3),x+1,9,'y'); d.e(8,8,6,2.4,'n'); for(const [x,y] of [[4,7],[8,6],[11,8],[7,9]]) d.r(x,y,2,2,'e'); d.p('y',6,5,10,4); }, { use: 'hold' });
add(3, 'Món ăn', 'ca-tourtiere', 'Tourtière', 'Tourtiere meat pie', 'bánh nhân thịt heo và gia vị, ăn vào dịp lễ ở Québec. Nhân thường có thêm quế và đinh hương.',
  d => { d.e(8,10,7.6,4,'Y'); d.e(8,9,7,3.4,'o'); d.e(8,9,5.6,2.4,'O'); d.p('N',6,8,7,9,9,8,10,9); for(let x=2;x<15;x+=2) d.p('t',x,11); d.p('a',6,3,7,4,6,5,10,2,9,3,10,4); }, { use: 'hold' });
add(3, 'Món ăn', 'ca-sugar-pie', 'Tarte au sucre', 'Sugar pie', 'bánh ngọt nhân đường và si-rô phong, rất ngọt và đậm đà. Phổ biến ở Québec trong mùa lễ.',
  d => { d.tri(1,4,14,9,'n'); d.r(2,11,12,3,'t'); d.r(5,8,6,3,'n'); d.r(7,6,2,2,'n'); d.l(2,11,13,11,'O'); d.p('y',6,9,9,10,7,7); d.e(11,4,2.4,2,'w'); d.p('r',11,2); d.r(1,14,14,1,'a'); }, { use: 'hold' });
add(3, 'Món ăn', 'ca-butter-tart', 'Butter tart', 'Butter tart', 'bánh nhỏ vỏ giòn, nhân bơ, trứng và đường, thêm nho khô hoặc hạt tùy ý. Đây là món tráng miệng gắn với Ontario.',
  d => { d.r(3,8,10,5,'Y'); d.r(4,13,8,1,'O'); for(let x=3;x<13;x+=2){ d.p('t',x,7); d.l(x,9,x,12,'O'); } d.e(8,8,5,2,'o'); d.e(8,7.6,4,1.2,'n'); d.p('N',6,7,9,8,10,7); d.p('y',7,7,8,8); }, { use: 'hold' });
add(3, 'Món ăn', 'ca-nanaimo-bar', 'Nanaimo bar', 'Nanaimo bar', 'bánh không cần nướng gồm ba lớp: vụn bánh qui sô-cô-la, kem bơ và sô-cô-la phủ. Tên bánh lấy từ thành phố Nanaimo ở British Columbia.',
  d => { d.r(2,4,12,2,'N'); d.r(2,6,12,4,'u'); d.r(2,10,12,4,'n'); d.p('N',3,11,6,12,9,11,12,13,5,13); d.p('t',4,12,8,13,11,11); d.p('n',3,4,7,4,11,5); d.p('w',3,7,4,7); d.r(2,3,12,1,'N'); }, { use: 'hold' });
add(3, 'Món ăn', 'ca-bannock', 'Bannock', 'Bannock bread', 'bánh mì dẹt nướng hoặc chiên mà nhiều cộng đồng bản địa đã đưa vào bữa ăn hằng ngày. Công thức hiện nay phản ánh sự giao thoa với người châu Âu.',
  d => { d.e(8,9,7,5,'O'); d.e(8,8,6,4,'t'); d.p('O',5,6,6,7,10,6,9,9,11,10,4,9); d.p('e',7,5,8,5,5,8); d.p('N',3,12,12,12); d.r(1,14,14,1,'a'); }, { use: 'hold' });
add(3, 'Món ăn', 'ca-beavertails', 'BeaverTails', 'BeaverTails pastry', 'bánh chiên dẹt hình đuôi hải ly, rắc đường và quế hoặc phủ sô-cô-la. Được bán nhiều ở Ottawa và các điểm du lịch.',
  d => { d.e(8,7,5,6.6,'O'); d.e(8,7,4,5.6,'o'); d.r(7,12,2,4,'e'); for(let i=3;i<12;i+=3){ d.l(5,i,10,i+2,'O'); } d.p('w',6,3,9,4,7,6,10,8,6,9,8,10); d.p('N',8,2,10,5,5,7,9,7,7,11); }, { use: 'hold' });
add(3, 'Món ăn', 'ca-montreal-bagel', 'Bagel kiểu Montréal', 'Montreal bagel', 'vòng bánh mì nhỏ hơn, ngọt nhẹ, luộc nước mật ong rồi nướng lò củi. Nó khác bagel kiểu New York ở độ dẻo.',
  d => { d.e(8,8,7,6,'O'); d.e(8,7,6,4.6,'o'); d.e(8,7.4,2,1.6,'_'); for(const [x,y] of [[5,4],[8,3],[11,5],[3,7],[12,8],[5,10],[9,11]]) d.p('e',x,y); d.p('y',6,5,10,10); }, { use: 'hold' });
add(3, 'Món ăn', 'ca-smoked-meat', 'Thịt ướp xông khói kiểu Montréal (smoked meat)', 'Montreal smoked meat sandwich', 'thịt bò ướp gia vị rồi xông khói, kẹp bánh mì lúa mạch. Nhiều tiệm đồ ăn lâu năm có món này.',
  d => { d.e(8,4,6,2.6,'t'); d.r(2,4,12,2,'t'); for(let y=6;y<11;y++) d.r(y%2?1:2,y,13,1,y%2?'R':'m'); d.p('p',3,7,7,9,11,7); d.r(2,11,12,3,'t'); d.p('O',3,3,7,2,11,3); d.p('y',3,6,4,6,12,6); d.e(13.5,13,1.2,2.4,'g'); }, { use: 'hold' });
add(3, 'Món ăn', 'ca-peameal', 'Peameal bacon sandwich', 'Peameal bacon sandwich', 'bánh mì kẹp thịt heo muối cuốn bột ngô, nướng mỏng. Món đặc trưng của Toronto, đặc biệt ở khu chợ St. Lawrence.',
  d => { d.e(8,5,7,3.4,'o'); d.r(1,5,14,2,'o'); d.e(8,8,7.4,1.4,'p'); d.r(1,9,14,2,'p'); d.p('y',2,8,5,7,9,8,13,7,3,10,11,10); d.r(1,11,14,1,'g'); d.r(1,12,14,3,'o'); d.p('e',5,3,8,2,11,4); }, { use: 'hold' });
add(3, 'Món ăn', 'ca-pacific-salmon', 'Cá hồi Thái Bình Dương', 'Plank-grilled Pacific salmon', 'nướng trên tấm gỗ, xông khói hoặc làm jerky. Đây là món quan trọng của vùng bờ tây và nhiều cộng đồng bản địa.',
  d => { d.r(1,9,14,4,'n'); d.p('N',2,10,5,12,10,10,13,11); d.e(8,8,6,3,'o'); d.p('r',4,8,13,8); for(let x=4;x<13;x+=3) d.l(x,6,x+1,10,'e'); d.p('g',3,5,4,6,12,11); d.e(13,5,1.8,1.4,'y'); d.p('a',6,2,7,3,6,4); }, { use: 'hold' });
add(3, 'Món ăn', 'ca-lobster-roll', 'Lobster roll và hải sản Maritimes', 'Lobster roll', 'bánh mì độn tôm hùm, sò điệp và ngao ở vùng bờ đông. Món ăn đơn giản nhưng nguyên liệu rất tươi.',
  d => { d.r(1,8,14,5,'t'); d.r(2,13,12,1,'O'); d.e(5,7,3,2,'r'); d.e(9,6,3,2.4,'r'); d.e(12,7.5,2,1.8,'o'); d.p('w',4,6,9,5,11,7); d.p('g',2,8,7,8,13,8); d.p('R',9,3,10,2,8,2); d.p('y',3,11,12,11); }, { use: 'hold' });
add(3, 'Món ăn', 'ca-jiggs-dinner', 'Jiggs dinner', 'Jiggs dinner', 'bữa ăn ngày chủ nhật của Newfoundland gồm thịt bò muối luộc, khoai, cải và cà rốt. Thường ăn kèm bánh pudding đậu.',
  d => { d.e(8,10,8,4.4,'w'); d.e(8,10,6.4,3.2,'a'); d.r(3,7,4,3,'m'); d.p('p',4,8,5,8); d.e(10,8,2,1.8,'u'); d.e(12,11,1.8,1.4,'u'); d.l(4,11,8,12,'o'); d.e(8,7,2,2,'h'); d.p('g',7,6,9,7); d.r(8,10,2,2,'y'); }, { use: 'hold' });
add(3, 'Món ăn', 'ca-saskatoon-pie', 'Bánh quả saskatoon', 'Saskatoon berry pie', 'bánh nhân quả mọng saskatoon, loại quả nhỏ màu tím của thảo nguyên. Món tráng miệng thân thuộc với vùng Prairies.',
  d => { d.e(8,10,7.6,4,'Y'); d.e(8,9,6.4,3,'V'); for(let x=3;x<14;x+=3) d.l(x,7,x+2,11,'t'); for(let x=5;x<15;x+=3) d.l(x,7,x-2,11,'o'); d.e(3,3,1.6,1.6,'v'); d.e(6,3,1.4,1.4,'V'); d.p('g',4,1,5,0,6,1); d.p('w',3,2); }, { use: 'hold' });
add(3, 'Món ăn', 'ca-kraft-dinner', 'Kraft Dinner (mì ngón xý phô mai hộp)', 'Kraft Dinner macaroni', 'mì ống đóng hộp với bột phô mai, rất phổ biến đối với sinh viên và gia đình. Người Canada gọi thân mật là KD.',
  d => { d.r(1,2,6,9,'b'); d.r(1,5,6,3,'y'); d.p('r',3,6,4,6); d.r(7,8,8,6,'w'); d.r(8,14,6,1,'a'); d.e(11,8,4.4,2.4,'y'); d.p('o',9,7,11,8,13,7,10,9,12,9); d.p('Y',8,8,11,6,14,8); d.l(14,2,11,7,'a'); }, { use: 'hold' });

// ----- Đồ uống -----
add(3, 'Đồ uống', 'ca-maple-syrup', 'Si-rô phong (maple syrup)', 'Maple syrup', 'nước cô đặc từ nhựa cây phong, đổ lên bánh kếp, bánh ngọt hoặc phủ thịt. Québec sản xuất phần lớn si-rô phong của thế giới.',
  d => { d.r(4,5,8,10,'O'); d.r(6,2,4,3,'O'); d.r(6,1,4,1,'r'); d.r(4,7,8,6,'e'); d.s(5,7,['..r..','r.r.r','rrrrr','.rrr.','..r..','..r..']); d.p('y',5,5,5,14); d.l(12,6,14,8,'O'); d.p('O',13,6); }, { use: 'hold' });
add(3, 'Đồ uống', 'ca-caesar', 'Caesar', 'Caesar cocktail', 'cocktail pha từ vodka, nước Clamato (cà chua và nước sò), nước sốt cay, viền muối và que cần tây. Thức uống này ra đời ở Calgary vào cuối thập niên 1960.',
  d => { d.r(4,4,8,10,'r'); d.r(3,3,10,1,'w'); d.p('a',3,4,12,4); d.r(5,14,6,1,'c'); d.l(10,0,8,9,'g'); d.p('h',9,0,11,0,11,1); d.p('c',4,6,4,10); d.e(4,2.5,2,1.6,'h'); d.p('o',6,7,9,11); d.p('w',5,5); }, { use: 'hold' });
add(3, 'Đồ uống', 'ca-ice-wine', 'Rượu ice wine', 'Ice wine', 'vang ngọt ép từ nho đóng băng ngoài cành, sản xuất ở vùng Niagara và Okanagan. Mỗi chùm nho cho rất ít nước nên rượu đắt.',
  d => { d.r(3,3,4,12,'G'); d.r(4,0,2,3,'Y'); d.r(3,7,4,5,'e'); d.p('b',4,9,5,10); d.e(11,6,2.8,2.6,'y'); d.r(11,9,1,5,'c'); d.r(9,14,5,1,'c'); d.p('w',10,5,2,5,14,2,13,3,15,3,14,4,9,1); }, { use: 'hold' });
add(3, 'Đồ uống', 'ca-ice-cider', 'Cidre de glace (rượu táo băng)', 'Ice cider', 'rượu táo ngọt đặc sản Québec, làm từ táo ép lạnh trong mùa đông. Vị đậm và thơm táo.',
  d => { d.r(3,4,4,11,'o'); d.r(4,1,2,3,'n'); d.r(3,8,4,4,'w'); d.p('r',4,9,5,10); d.e(11.5,11,3.4,3.4,'r'); d.p('N',11,7,12,6); d.p('g',13,6,14,6); d.p('w',10,10,2,5); d.p('c',13,2,12,3,14,3,13,4,13,3,9,2); }, { use: 'hold' });
add(3, 'Đồ uống', 'ca-rye-whisky', 'Rượu whisky rye Canada', 'Canadian rye whisky', 'whisky thường pha từ ngũ cốc như lúa mạch đen, ủ trong thùng gỗ. Canadian whisky thường êm và dễ uống.',
  d => { d.r(2,4,6,11,'O'); d.r(3,1,4,3,'O'); d.r(3,0,4,1,'N'); d.r(2,7,6,5,'e'); d.r(3,9,4,1,'r'); d.r(10,9,5,6,'c'); d.r(10,11,5,3,'o'); d.r(11,11,2,2,'w'); d.p('y',3,5,3,13); d.p('Y',12,2,13,3,12,4,13,5,12,6); d.l(12,7,12,2,'Y'); }, { use: 'hold' });
add(3, 'Đồ uống', 'ca-beer', 'Bia thủ công và bia lớn', 'Canadian beer', 'Molson, Labatt và nhiều hãng bia thủ công địa phương. Bia thường đi kèm trận khúc côn cầu.',
  d => { d.r(2,5,8,10,'y'); d.r(2,3,8,3,'w'); d.p('w',2,2,4,2,7,2,5,1,8,3); d.r(10,7,2,1,'c'); d.r(12,7,1,5,'c'); d.r(10,11,2,1,'c'); for(const x of [3,5,7]) d.l(x,7,x,13,'Y'); d.s(3,8,['..r..','rrrrr','.rrr.','..r..']); }, { use: 'hold' });
add(3, 'Đồ uống', 'ca-tim-double', 'Cà phê Tim Hortons (double-double)', 'Tim Hortons double-double', 'cà phê có hai muỗng kem và hai muỗng đường. Nhiều người mua sáng trên đường đi làm.',
  d => { d.r(4,4,8,3,'R'); d.r(4,7,8,5,'r'); d.r(5,12,6,3,'R'); d.r(3,3,10,2,'w'); d.r(5,1,6,2,'e'); d.e(8,9.5,2.8,1.8,'w'); d.p('r',7,9,9,10); d.p('a',13,1,14,2,13,3); d.p('w',5,6); }, { use: 'hold' });
add(3, 'Đồ uống', 'ca-hot-chocolate', 'Chocolat chaud (sô-cô-la nóng)', 'Hot chocolate', 'thức uống ấm ở mùa lạnh, thường đi kèm bánh. Nhiều quán bán khi có hội chợ đông.',
  d => { d.r(2,6,10,8,'b'); d.r(3,14,8,1,'B'); d.r(12,8,3,1,'b'); d.r(14,8,1,4,'b'); d.r(12,11,3,1,'b'); d.r(3,6,8,2,'N'); d.p('w',4,6,5,6,7,7,9,6,4,5,8,5); d.p('a',5,1,4,2,5,3,9,0,8,1,9,2,8,3); d.p('w',4,10,5,10); }, { use: 'hold' });

// ----- Món lễ và theo mùa -----
add(3, 'Món lễ và theo mùa', 'ca-cabane-sucre', 'Cabane à sucre (mùa si-rô phong)', 'Sugar shack feast', 'vào đầu xuân, nhiều gia đình đến nhà nấu si-rô để ăn trứng, xúc xích và bánh kếp phủ si-rô. Món kẹo si-rô trên tuyết (tire sur la neige) là phần được yêu thích.',
  d => { d.bg('c'); d.r(0,10,16,6,'w'); d.r(2,4,9,6,'n'); d.tri(1,1,11,3,'R'); d.r(5,6,3,4,'N'); d.p('a',9,1,10,0,11,0); d.r(2,12,12,2,'l'); for(let x=3;x<13;x+=2) d.p('O',x,12,x+1,13); d.r(12,10,1,3,'t'); d.e(12.5,9.5,1.6,1.4,'O'); d.p('G',14,4,14,5,13,6,15,6,14,7); }, SC);
add(3, 'Món lễ và theo mùa', 'ca-thanksgiving', 'Lễ Tạ Ơn (Thanksgiving)', 'Thanksgiving dinner', 'tổ chức vào thứ Hai thứ hai của tháng Mười, với gà tây, khoai nghiền và bánh bí ngô. Ngày lễ này sớm hơn so với Mỹ.',
  d => { d.e(8,12,8,3,'a'); d.e(8,8,5,4,'O'); d.e(8,7,4,2.4,'o'); d.e(3,9,2,1.4,'n'); d.e(13,9,2,1.4,'n'); d.p('w',1,8,15,8); d.p('y',6,6,7,5); d.e(3,12.5,2,1.6,'o'); d.p('g',3,10,11,12,13,12); d.p('r',10,13,12,13); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'ca-reveillon', 'Giáng sinh và réveillon', 'Christmas reveillon', 'ở Québec, nhiều gia đình ăn bữa khuya sau lễ đêm, thường có tourtière. Các nơi khác ăn gà tây hoặc thịt nướng.',
  d => { d.bg('B'); d.tri(1,1,7,9,'G'); d.p('y',4,0,5,0); d.p('r',3,6,5,8); d.p('y',5,4,2,8); d.r(10,2,5,6,'i'); d.p('w',11,3,13,5,12,7); d.r(0,10,16,2,'w'); d.r(0,12,16,4,'r'); d.e(5,10,3,1.4,'o'); d.r(11,8,1,2,'e'); d.p('y',11,7); d.e(13,10.5,2,.9,'t'); }, SC);
add(3, 'Món lễ và theo mùa', 'ca-canada-day', 'Ngày Canada (1 tháng 7)', 'Canada Day', 'nhà nhà dựng tiệc nướng ngoài trời, ăn bánh kem lá phong và xem pháo hoa. Đây là ngày quốc khánh.',
  d => { d.bg('i'); for(const [x,y,c] of [[4,4,'r'],[12,3,'w']]){ for(const [dx,dy] of [[0,-3],[0,3],[-3,0],[3,0],[-2,-2],[2,2],[-2,2],[2,-2]]){ d.p(c,x+dx,y+dy); } d.p('y',x,y); } d.r(2,9,12,5,'e'); d.r(2,8,12,2,'w'); d.r(2,11,12,1,'r'); d.s(6,10,['..r..','rrrrr','.rrr.','..r..']); d.r(1,14,14,1,'a'); }, SC);
add(3, 'Món lễ và theo mùa', 'ca-victoria-day', 'Ngày Victoria và "May Two-Four"', 'Victoria Day weekend', 'cuối tuần dài tháng Năm, đánh dấu khai mạc mùa đi chơi ngoài trời. Người ta hay đùa gọi thùng bia 24 lon là "two-four".',
  d => { d.bg('c'); d.r(0,11,16,5,'g'); d.tri(0,4,8,8,'o'); d.tri(2,7,4,5,'N'); d.r(9,8,6,5,'r'); d.r(9,10,6,1,'w'); d.r(10,7,4,1,'a'); for(const x of [10,12,14]) d.p('y',x,6,x,5); d.p('w',11,12,13,12); d.e(12,2,2,2,'y'); d.p('r',6,14); d.p('o',7,13,7,12); }, SC);
add(3, 'Món lễ và theo mùa', 'ca-stampede-pancake', 'Calgary Stampede', 'Stampede pancake breakfast', 'tuần lễ hội miền Tây, đi kèm các buổi sáng phát bánh kếp miễn phí trong thành phố. Bánh kếp được phục vụ trên những dãy bàn dài.',
  d => { d.bg('c'); d.r(0,9,16,3,'w'); d.r(0,12,16,4,'n'); d.r(1,12,1,4,'N'); d.r(14,12,1,4,'N'); for(const x of [4,11]){ for(let y=4;y<9;y+=2){ d.r(x-3,y,6,1,'t'); d.r(x-3,y+1,6,1,'O'); } d.p('y',x-1,3,x,3); d.p('n',x-3,4,x+2,5); } d.r(5,1,6,1,'N'); d.r(7,0,2,1,'N'); }, SC);
add(3, 'Món lễ và theo mùa', 'ca-lunar-new-year', 'Tết Âm lịch ở Vancouver và Toronto', 'Lunar New Year feast', 'các cộng đồng người Hoa và châu Á chuẩn bị bữa tiệc, dân đông đi chợ. Dim sum và đồ ăn châu Á rất phổ biến ở hai thành phố này.',
  d => { d.bg('R'); for(const x of [3,12]){ d.l(x,0,x,2,'y'); d.e(x+.5,4.5,2.4,2.4,'r'); d.p('y',x,2,x,7,x,8); } d.e(8,12,7,3,'w'); for(const x of [4,7,10]){ d.e(x+1,11,1.6,1.4,'e'); d.p('t',x+1,9); } d.r(7,3,2,5,'y'); }, SC);
add(3, 'Món lễ và theo mùa', 'ca-summer-berries', 'Quả mọng mùa hè', 'Summer berries', 'dâu tây, việt quất và blueberry chín từ tháng Sáu đến tháng Tám. Nhiều gia đình đi hái quả và làm mứt.',
  d => { d.r(2,9,12,5,'n'); d.p('N',3,10,6,12,10,10,12,12,8,13); d.r(1,8,14,1,'t'); for(const [x,y] of [[4,6],[8,5],[11,6]]){ d.e(x,y,2,2,'b'); d.p('c',x-1,y-1); } d.tri(4,1,4,4,'r'); d.tri(9,2,4,3,'r'); d.p('g',5,0,6,0,10,1,11,1); d.p('y',5,2,10,3); }, { use: 'hold' });
