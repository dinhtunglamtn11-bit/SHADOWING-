import { add, SC, setCC } from './pass-kit.js';
setCC('sa');
// Ả Rập Xê Út · Nhóm 4: Văn hóa và nghệ thuật

// ----- Lễ hội -----
add(4, 'Lễ hội', 'sa-fitr', 'Eid al-Fitr', 'Eid al-Fitr', 'lễ kết thúc tháng Ramadan, gia đình mặc đồ mới, thăm viếng nhau và chia bánh kẹo. Trẻ em thường được nhận tiền mừng (eidiya).',
  d => { d.bg('B'); d.e(7,7,4.5,4.5,'u'); d.e(9,5.5,4,4,'B'); d.p('y',12,4,11,5,12,5,13,5,12,6); d.p('w',2,2,14,10,3,12); d.r(2,12,3,3,'r'); d.r(7,11,3,4,'g'); d.r(12,12,3,3,'v'); d.p('y',3,11,8,10,13,11); }, SC);
add(4, 'Lễ hội', 'sa-adha-le', 'Eid al-Adha', 'Eid al-Adha festival', 'lễ hiến tế trong tháng hành hương Hajj, người ta mổ gia súc và chia thịt. Đây là một trong hai lễ lớn nhất của Đạo Hồi.',
  d => { d.bg('c'); d.r(0,13,16,3,'t'); for(let x=1;x<15;x+=3) { d.p('r',x,1); d.p('g',x+1,2); d.p('y',x+2,1); } for(const [x,c] of [[3,'w'],[11,'g']]){ d.e(x+.5,6,1.5,1.5,'s'); d.r(x-1,4,4,1,'w'); d.r(x-1,8,4,5,c); } d.r(7,10,2,2,'r'); d.p('y',7,9,8,9); }, SC);
add(4, 'Lễ hội', 'sa-hajj', 'Hajj (hành hương)', 'The Hajj pilgrimage', 'chuyến hành hương đến Mecca mỗi năm, thu hút hàng triệu tín đồ từ nhiều nước. Đây là một trong năm trụ cột của Đạo Hồi và gắn với ngành dịch vụ lớn của nước này.',
  d => { d.bg('t'); d.e(8,8,7.5,6.5,'W'); d.r(6,5,4,5,'i'); d.r(6,6,4,1,'y'); for(let i=0;i<22;i++){ const a=i/22*Math.PI*2; d.p('w',8+Math.cos(a)*5.5,8+Math.sin(a)*4.8); } for(let i=0;i<14;i++){ const a=(i+.5)/14*Math.PI*2; d.p('a',8+Math.cos(a)*4,8+Math.sin(a)*3.8); } }, SC);
add(4, 'Lễ hội', 'sa-nationalday', 'Quốc khánh (23 tháng 9) và Ngày Lập quốc (22 tháng 2)', 'National Day and Founding Day', 'quốc khánh kỷ niệm việc hợp nhất vương quốc năm 1932. Ngày Lập quốc kỷ niệm sự ra đời của nhà nước Saud đầu tiên năm 1727 và được tổ chức từ năm 2022.',
  d => { d.bg('c'); d.r(2,2,1,13,'N'); d.r(3,2,11,8,'G'); d.r(5,4,7,1,'w'); d.p('w',6,5,8,5,10,5); d.r(5,7,7,1,'w'); d.p('w',11,8); d.p('y',2,1,13,12,12,13,14,13,7,12); d.p('r',10,14); d.r(0,15,16,1,'t'); }, SC);
add(4, 'Lễ hội', 'sa-janadriyah', 'Janadriyah', 'The Janadriyah heritage festival', 'lễ hội di sản quốc gia hằng năm gần Riyadh, có trưng bày nghề thủ công, đua lạc đà và biểu diễn dân gian. Lễ hội bắt đầu từ năm 1985.',
  d => { d.bg('u'); d.r(0,12,16,4,'t'); d.tri(0,4,8,4,'R'); d.r(1,8,6,4,'e'); for(let x=1;x<8;x+=2) d.p('r',x,3); d.e(11,8,3,2,'n'); d.p('n',10,6); d.l(13,7,14,4,'n'); d.p('n',15,4); for(const x of [9,11,13]) d.r(x,9,1,4,'n'); d.p('w',10,1,3,1); }, SC);
add(4, 'Lễ hội', 'sa-okaz', 'Souk Okaz', 'Souk Okaz', 'hội chợ thơ của Taif, được tổ chức lại từ năm 2007 theo một hội chợ cổ xưa. Xem thêm phần câu chuyện ở cuối nhóm.',
  d => { d.bg('t'); d.r(0,12,16,4,'n'); d.tri(0,2,7,4,'r'); d.tri(9,2,7,4,'g'); d.r(1,6,1,6,'N'); d.r(5,6,1,6,'N'); d.r(10,6,1,6,'N'); d.r(14,6,1,6,'N'); d.e(8,7,1.6,1.6,'s'); d.r(7,5,3,1,'w'); d.r(6,9,5,4,'w'); d.r(11,9,2,3,'e'); d.p('Y',3,10,12,10); }, SC);
add(4, 'Lễ hội', 'sa-riyadhseason', 'Riyadh Season và các mùa lễ hội giải trí', 'Riyadh Season', 'chuỗi sự kiện âm nhạc, ẩm thực và giải trí tổ chức từ năm 2019 trong mùa lạnh. Đây là một trong những dấu hiệu rõ của sự thay đổi đời sống văn hóa.',
  d => { d.bg('i'); for(const [x,y,c] of [[4,4,'p'],[11,3,'y'],[8,8,'c']]){ d.p(c,x,y-2,x,y+2,x-2,y,x+2,y,x-1,y-1,x+1,y+1,x+1,y-1,x-1,y+1); d.p('w',x,y); } d.r(0,12,16,4,'V'); d.r(1,10,2,2,'r'); d.r(5,11,2,1,'g'); d.r(10,10,2,2,'o'); d.r(13,11,2,1,'b'); }, SC);
add(4, 'Lễ hội', 'sa-redseafilm', 'Liên hoan phim Biển Đỏ (Red Sea International Film Festival)', 'The Red Sea Film Festival', 'tổ chức ở Jeddah từ năm 2021, giới thiệu phim Ả Rập và quốc tế. Liên hoan phim đánh dấu bước quay lại của ngành điện ảnh sau nhiều năm không có rạp công cộng.',
  d => { d.bg('C'); d.e(8,7,5,5,'k'); d.e(8,7,1.2,1.2,'a'); for(const [x,y] of [[8,3],[11,6],[10,10],[6,10],[5,6]]) d.e(x+.5,y+.5,1.2,1.2,'a'); d.l(12,10,15,12,'k'); d.r(0,13,16,3,'r'); d.p('y',2,2,14,2,13,4); }, SC);

// ----- Nhạc cụ -----
add(4, 'Nhạc cụ', 'sa-oud', 'Đàn oud', 'The oud', 'đàn dây có thân tròn như quả lê, không có phím, được xem là tổ tiên của nhiều loại đàn dây. Âm thanh ấm, trầm và thường đi kèm giọng hát.',
  d => { d.e(7,10,5,5,'O'); d.e(7,10,3.8,3.8,'t'); d.e(7,9,1.4,1.4,'N'); d.l(9,7,12,3,'n'); d.l(8,6,11,2,'n'); d.l(11,2,15,3,'N'); d.p('N',12,1,14,2,13,4); d.l(6,13,10,6,'w'); d.r(5,12,4,1,'N'); }, { use: 'hold' });
add(4, 'Nhạc cụ', 'sa-rebab', 'Rebab (rababa)', 'The rebab', 'đàn một dây kéo bằng cung, thường đệm cho thơ và chuyện kể của người Bedouin. Tiếng đàn trầm và mộc.',
  d => { d.r(4,8,7,6,'t'); d.r(5,9,5,4,'e'); d.r(7,1,1,13,'n'); d.p('N',6,1,8,1,6,2); d.l(7,14,7,15,'N'); d.l(2,13,13,6,'N'); d.l(2,12,13,5,'w'); }, { use: 'hold' });
add(4, 'Nhạc cụ', 'sa-mizmar', 'Mizmar', 'The mizmar', 'kèn hai lưỡi gà phổ biến ở vùng Hejaz, thường chơi trong lễ hội. Âm thanh sắc và vang xa.',
  d => { d.l(3,2,11,10,'n'); d.l(4,2,12,10,'n'); d.l(3,3,10,10,'N'); d.dtri(10,9,5,2,'Y'); d.e(12.5,12,2.8,2.4,'Y'); d.p('k',6,5,8,7,10,9); d.p('t',1,0,2,1,3,1); d.p('v',1,10,2,9,2,10); }, { use: 'hold' });
add(4, 'Nhạc cụ', 'sa-tabl', 'Trống tabl và daf (tar)', 'The tabl and daf drums', 'những chiếc trống cầm tay giữ nhịp cho điệu nhảy và bài hát tập thể. Nhịp đập mạnh và đều.',
  d => { d.e(6,8,5.5,5.5,'n'); d.e(6,8,4,4,'e'); d.p('y',6,3,2,8,10,8,6,13); d.r(10,9,5,6,'r'); d.e(12.5,9,2.5,1,'e'); d.l(10,10,14,14,'y'); d.l(14,10,10,14,'y'); d.l(12,3,15,7,'N'); }, { use: 'hold' });
add(4, 'Nhạc cụ', 'sa-mirwas', 'Mirwas', 'The mirwas', 'trống nhỏ hai mặt dùng trong các bài hát ở Hejaz và vùng Vịnh. Âm thanh giòn và nhanh.',
  d => { d.r(4,5,8,7,'O'); d.e(8,5,4,2,'e'); d.e(8,12,4,2,'n'); d.l(4,6,6,11,'w'); d.l(6,6,4,11,'w'); d.l(8,7,10,12,'w'); d.l(10,7,8,12,'w'); d.p('y',12,2,13,1,14,2,2,3); }, { use: 'hold' });

// ----- Nghệ thuật biểu diễn -----
add(4, 'Nghệ thuật biểu diễn', 'sa-ardah', 'Ardah', 'The ardah sword dance', 'điệu múa kiếm của nam giới, đứng thành hàng và đọc thơ theo nhịp trống, một hình ảnh gắn với Najd. UNESCO ghi nhận ardah năm 2015 là di sản văn hóa phi vật thể.',
  d => { d.bg('u'); d.r(0,13,16,3,'t'); for(const x of [2,7,12]){ d.e(x+.5,6,1.4,1.4,'s'); d.r(x-1,4,3,1,'r'); d.r(x-1,8,3,5,'w'); d.l(x+2,8,x+3,2,'a'); d.p('y',x+2,9); } }, SC);
add(4, 'Nghệ thuật biểu diễn', 'sa-samri', 'Samri và các điệu nhảy theo vùng', 'Samri and regional dances', 'mỗi vùng có điệu nhảy và bài hát riêng, như samri ở Hejaz, người biểu diễn hát và vỗ tay theo nhịp. Các buổi biểu diễn thường được tổ chức trong lễ cưới.',
  d => { d.bg('V'); d.r(0,13,16,3,'r'); for(const [x,c] of [[2,'w'],[7,'e'],[12,'w']]){ d.e(x+.5,6,1.4,1.4,'s'); d.r(x-1,4,3,1,'k'); d.r(x-1,8,3,5,c); d.p('s',x-2,9,x+2,9); } d.p('y',4,2,9,1,13,3); d.p('p',5,3,10,2); }, SC);
add(4, 'Nghệ thuật biểu diễn', 'sa-nabati', 'Thơ Nabati', 'Nabati poetry', 'thơ đọc theo phương ngữ của người Bedouin, kể về tình yêu, danh dự và sa mạc. Nhiều người Ả Rập ngày nay vẫn mê loại thơ này.',
  d => { d.bg('B'); d.p('w',2,2,7,1,13,3,10,5); d.r(0,12,16,4,'n'); d.e(5,7,1.8,1.8,'s'); d.r(3,5,5,1,'r'); d.r(3,9,5,4,'t'); d.p('o',11,11,12,10,13,11,12,9); d.p('r',12,11); d.l(10,12,14,12,'N'); d.p('e',8,6,9,5,10,6,9,4); }, SC);
add(4, 'Nghệ thuật biểu diễn', 'sa-concert', 'Lễ hội âm nhạc hiện đại', 'Modern music festivals', 'những sự kiện âm nhạc điện tử và pop tổ chức ở Riyadh và Jeddah thu hút nhiều người trẻ. Nghệ sĩ địa phương và quốc tế cùng biểu diễn.',
  d => { d.bg('i'); for(const [x,c] of [[2,'p'],[8,'c'],[13,'y']]){ d.l(x,0,x-2,9,c); d.l(x,0,x+2,9,c); } d.r(0,10,16,2,'A'); d.e(8,7,1.4,1.4,'s'); d.r(7,8,2,2,'v'); for(let x=0;x<16;x+=2){ d.e(x+1,14,1.2,1.2,'k'); d.p('k',x,15,x+1,15); } }, SC);
add(4, 'Nghệ thuật biểu diễn', 'sa-cinema', 'Rạp chiếu phim', 'Cinemas reopen', 'rạp công cộng mở lại năm 2018 sau hơn ba thập niên đóng cửa. Từ đó nhiều phim Ả Rập được sản xuất và chiếu trong nước.',
  d => { d.bg('R'); d.r(2,2,12,7,'w'); d.e(8,5,2,2,'c'); d.p('y',4,4,11,6); d.r(1,1,14,1,'y'); for(const y of [11,13]) for(let x=1;x<15;x+=3){ d.r(x,y,2,2,'m'); d.p('r',x,y,x+1,y); } }, SC);

// ----- Kiến trúc và tạo hình -----
add(4, 'Kiến trúc và tạo hình', 'sa-calligraphy', 'Thư pháp Ả Rập', 'Arabic calligraphy', 'nghệ thuật viết chữ Ả Rập đẹp, thấy trên đền thờ, sách và đồ trang trí. Nhiều kiểu chữ như thuluth và diwani cùng tồn tại.',
  d => { d.bg('e'); d.l(2,10,12,10,'k'); d.l(3,11,11,11,'k'); d.p('k',2,9,2,8,12,9,13,8,13,7); d.l(5,3,5,9,'k'); d.l(8,5,8,9,'k'); d.p('k',9,5,10,6,9,7,6,13,8,13); d.p('r',10,3); d.l(14,2,12,5,'n'); d.r(0,15,16,1,'Y'); }, SC);
add(4, 'Kiến trúc và tạo hình', 'sa-kiswa', 'Kiswa', 'The Kiswa', 'tấm vải đen thêu chữ vàng phủ Kaaba, được thay mỗi năm. Vải được làm ở một xưởng chuyên trách gần Mecca.',
  d => { d.bg('t'); d.r(2,2,12,13,'i'); d.r(2,5,12,2,'y'); for(let x=3;x<13;x+=2) d.p('Y',x,5,x+1,6); d.r(9,9,3,6,'y'); d.p('Y',10,10,10,12); for(let x=3;x<9;x+=2) d.p('K',x,9,x+1,11,x,13); d.r(1,15,14,1,'W'); }, SC);
add(4, 'Kiến trúc và tạo hình', 'sa-umbrellas', 'Mái che khổng lồ ở đền Al-Masjid an-Nabawi', 'The giant umbrellas of the Prophet\'s Mosque', 'hàng trăm chiếc dù lớn mở ra để che nắng cho tín đồ ngoài sân đền ở Medina. Các chiếc dù đóng lại khi trời mát.',
  d => { d.bg('c'); d.r(0,13,16,3,'W'); for(const x of [3,8,13]){ d.dtri(x-3,4,6,3,'e'); d.r(x-3,3,6,1,'y'); d.r(x,4,1,9,'a'); } d.p('g',8,1,8,2); for(let x=1;x<16;x+=3) d.p('a',x,14); }, SC);
add(4, 'Kiến trúc và tạo hình', 'sa-abraj', 'Tháp đồng hồ Abraj Al-Bait (Mecca)', 'The Abraj Al-Bait clock tower', 'tòa tháp cao khoảng 600 mét ở gần đền lớn, có một mặt đồng hồ rất lớn. Nó là một trong những tòa nhà cao nhất thế giới.',
  d => { d.bg('B'); d.r(0,13,16,3,'W'); d.r(1,8,3,6,'t'); d.r(12,7,3,7,'t'); d.r(5,4,6,10,'e'); d.e(8,6,2.5,2.5,'w'); d.l(8,6,8,4,'k'); d.l(8,6,9,7,'k'); d.r(7,2,2,2,'t'); d.p('y',8,0,7,1,8,1); d.p('y',2,10,13,9,6,10,9,11); }, SC);
add(4, 'Kiến trúc và tạo hình', 'sa-rahma', 'Đền nổi Al-Rahma (Jeddah)', 'The floating Al-Rahma mosque', 'nhà thờ trắng xây sát mép nước bên Biển Đỏ, nhìn như nổi trên mặt nước. Đây là một điểm chụp ảnh nổi tiếng.',
  d => { d.bg('c'); d.r(0,10,16,6,'C'); d.r(3,6,9,4,'w'); d.fan(7.5,6,2.8,'w'); d.p('b',7,3); d.r(13,2,1,8,'w'); d.p('g',13,1); for(const x of [4,6,8,10]) d.r(x,8,1,2,'b'); for(const x of [4,7,10]) d.r(x,10,1,3,'a'); d.p('w',2,12,12,13,6,14); }, SC);
add(4, 'Kiến trúc và tạo hình', 'sa-kingdom', 'Kingdom Centre (Riyadh)', 'Kingdom Centre', 'tòa tháp có lỗ hình vòm ở phần đỉnh, biểu tượng của Riyadh hiện đại. Tòa nhà cao khoảng 300 mét.',
  d => { d.bg('o'); d.r(0,14,16,2,'k'); d.r(4,5,8,9,'A'); d.r(4,1,3,4,'a'); d.r(9,1,3,4,'a'); d.e(8,3,2.5,3.5,'o'); d.r(6,1,4,1,'c'); for(let y=7;y<14;y+=2) d.p('u',5,y,7,y,9,y,11,y); d.p('w',2,2,14,5); }, SC);
add(4, 'Kiến trúc và tạo hình', 'sa-maraya', 'Maraya (AlUla)', 'Maraya in AlUla', 'hội trường phủ kính gương giữa sa mạc, phản chiếu cảnh núi xung quanh. Một trong những công trình kiến trúc độc đáo của vùng.',
  d => { d.bg('c'); d.tri(0,2,7,8,'O'); d.tri(10,3,6,7,'O'); d.r(0,10,16,6,'t'); d.r(2,6,12,6,'l'); d.tri(3,6,6,6,'O'); d.r(10,8,3,4,'c'); d.l(2,6,13,6,'w'); d.p('w',4,8,11,9); d.r(2,12,12,1,'n'); }, SC);
add(4, 'Kiến trúc và tạo hình', 'sa-desertx', 'Desert X AlUla', 'Desert X AlUla', 'triển lãm nghệ thuật đương đại đặt giữa sa mạc, tổ chức từ năm 2020. Các tác phẩm được đặt ngoài trời và hòa với cảnh quan.',
  d => { d.bg('c'); d.r(0,11,16,5,'t'); d.tri(10,4,6,7,'n'); d.e(4,7,3,3,'r'); d.e(4,7,1.5,1.5,'c'); d.l(4,10,4,12,'r'); d.r(8,6,1,7,'y'); d.r(10,9,1,4,'v'); d.r(12,10,1,3,'g'); d.e(13,2,1.6,1.6,'y'); }, SC);

// ----- Văn hóa hiện đại -----
add(4, 'Văn hóa hiện đại', 'sa-football', 'Bóng đá', 'Football', 'môn thể thao được yêu thích nhất, với các câu lạc bộ lớn như Al Hilal và Al Nassr. Đội tuyển đã thắng Argentina 2-1 tại World Cup 2022, một kết quả gây chú ý.',
  d => { d.e(8,8,6.5,6.5,'w'); d.e(8,8,2.2,2.2,'G'); for(const [x,y] of [[8,2],[3,6],[13,6],[5,12],[11,12]]) d.r(x-1,y,2,2,'G'); d.p('a',8,5,8,4,5,8,11,8); }, { use: 'hold' });
add(4, 'Văn hóa hiện đại', 'sa-esports', 'Thể thao điện tử (esports)', 'Esports', 'Riyadh tổ chức các giải game lớn, thu hút nhiều đội quốc tế. Nhiều người trẻ ở nước này chơi game thường xuyên.',
  d => { d.e(5,9,4,3.5,'k'); d.e(11,9,4,3.5,'k'); d.r(4,6,8,5,'k'); d.r(3,8,4,1,'w'); d.r(4,7,1,3,'w'); d.p('r',11,7); d.p('y',10,8); d.p('g',12,9); d.p('b',11,10); d.p('a',7,10,9,10); d.p('c',2,2,3,3,13,3,14,2); }, { use: 'hold' });
add(4, 'Văn hóa hiện đại', 'sa-coffeeshop', 'Quán cà phê và mạng xã hội', 'Coffee shops and social media', 'các quán cà phê đông người trẻ vào buổi tối, và mạng xã hội rất phổ biến. Đây là nơi người trẻ gặp nhau và chia sẻ ý kiến.',
  d => { d.bg('e'); d.r(0,11,16,2,'n'); d.r(2,6,4,5,'w'); d.p('w',6,7,7,8,6,9); d.r(2,6,4,1,'N'); d.p('a',3,4,4,2); d.r(9,4,5,7,'k'); d.r(10,5,3,5,'c'); d.p('r',10,6,12,6,11,7); d.p('r',15,2,14,1,13,2); d.r(1,13,1,3,'N'); d.r(14,13,1,3,'N'); }, SC);
add(4, 'Văn hóa hiện đại', 'sa-vision2030', 'Tầm nhìn 2030 (Saudi Vision 2030)', 'Saudi Vision 2030', 'chương trình cải cách công bố năm 2016 nhằm đa dạng hóa nền kinh tế, giảm phụ thuộc vào dầu mỏ. Chương trình này cùng với du lịch và giải trí đang thay đổi không khí xã hội.',
  d => { d.bg('B'); d.r(0,13,16,3,'t'); d.r(1,10,2,3,'g'); d.r(4,8,2,5,'g'); d.r(7,6,2,7,'h'); d.r(10,4,2,9,'h'); d.r(13,2,2,11,'y'); d.l(1,7,13,0,'w'); d.p('w',12,0,13,1,14,0); d.p('u',3,3,7,2); }, SC);
