import { add, SC, setCC } from './pass-kit.js';
setCC('pt');
// Bồ Đào Nha · Nhóm 1: Nơi chốn và thiên nhiên

// ----- Địa danh -----
add(1, 'Địa danh', 'pt-lisboa', 'Lisboa', 'Lisbon', 'thủ đô trải trên bảy ngọn đồi bên cửa sông Tejo, nổi tiếng với tàu điện vàng, phố dốc và những mặt tiền phủ gạch men. Thành phố có lịch sử lâu đời và là điểm xuất phát của nhiều chuyến hải trình lớn.',
  d => { d.bg('c'); d.r(0,12,16,4,'a'); d.r(0,7,5,5,'u'); d.r(5,5,5,7,'x'); d.r(10,8,6,4,'l'); d.tri(0,5,5,2,'r'); d.tri(5,3,5,2,'R'); d.tri(10,6,6,2,'r'); d.r(2,11,9,3,'y'); d.p('B',3,12,5,12,7,12,9,12); d.p('k',3,14,9,14); d.l(0,10,15,10,'K'); }, SC);
add(1, 'Địa danh', 'pt-alfama', 'Alfama', 'Alfama', 'khu phố cổ nhất Lisboa với ngõ hẹp, cầu thang đá và nhà thờ nhỏ, nơi fado vang lên trong các quán nhỏ. Khu này sống sót tốt hơn nhiều nơi khác sau trận động đất năm 1755.',
  d => { d.bg('c'); d.r(0,3,6,13,'e'); d.r(10,5,6,11,'x'); d.tri(0,1,6,2,'r'); d.tri(10,3,6,2,'r'); for(let y=7;y<16;y+=2) d.r(6,y,4,1,'a'); for(let y=8;y<16;y+=2) d.r(6,y,4,1,'W'); d.p('B',2,6,2,10,4,8,12,8,14,12); d.p('r',3,11,13,10); d.p('y',11,8); }, SC);
add(1, 'Địa danh', 'pt-belem', 'Tháp Belém (Torre de Belém)', 'Belem Tower', 'tháp canh bằng đá vôi xây đầu thế kỷ 16 bên bờ sông Tejo, mang kiểu kiến trúc Manueline. UNESCO (Tổ chức Giáo dục, Khoa học và Văn hóa Liên Hợp Quốc) công nhận tháp cùng Tu viện Jerónimos là di sản thế giới từ năm 1983.',
  d => { d.bg('c'); d.r(0,12,16,4,'C'); d.r(3,9,10,4,'e'); d.r(5,3,6,6,'e'); for(let x=3;x<13;x+=2) d.p('e',x,8); for(let x=5;x<11;x+=2) d.p('e',x,2); d.r(7,1,2,1,'t'); d.p('N',7,5,8,5,7,11,8,11,5,11,10,11); d.p('t',4,9,12,9); d.p('w',1,14,12,15,5,13); }, SC);
add(1, 'Địa danh', 'pt-jeronimos', 'Tu viện Jerónimos (Mosteiro dos Jerónimos)', 'Jeronimos Monastery', 'tu viện lớn với hành lang chạm khắc dày đặc hình dây thừng, san hô và sinh vật biển. Nơi đây gắn với thời kỳ Khám phá của Bồ Đào Nha.',
  d => { d.bg('c'); d.r(0,14,16,2,'g'); d.r(0,5,16,9,'e'); for(let x=1;x<16;x+=4){ d.r(x,9,3,5,'t'); d.p('t',x+1,8); d.p('N',x+1,11,x+1,12,x+1,13); } for(let x=0;x<16;x+=2) d.p('e',x,4); d.tri(6,0,4,5,'t'); d.p('y',8,0); d.p('B',3,6,12,6,7,7,8,7); }, SC);
add(1, 'Địa danh', 'pt-porto', 'Porto', 'Porto', 'thành phố bên sông Douro, nổi tiếng với những dãy nhà màu sắc ven sông, cầu Dom Luís I bằng sắt hai tầng và các hầm rượu vang. Trung tâm thành phố được UNESCO công nhận năm 1996.',
  d => { d.bg('c'); d.r(0,12,16,4,'C'); d.r(0,6,3,6,'r'); d.r(3,4,3,8,'y'); d.r(6,7,3,5,'b'); d.r(9,5,3,7,'e'); d.r(12,8,4,4,'o'); for(let x=1;x<16;x+=3) d.p('N',x,8,x,10); d.fan(8,13,6,'k'); d.fan(8,14,5,'C'); d.r(0,10,16,1,'k'); d.p('w',2,14,13,15); }, SC);
add(1, 'Địa danh', 'pt-sintra', 'Sintra', 'Sintra', 'thị trấn trên đồi gần Lisboa với cung điện Pena sặc sỡ, lâu đài Moors và những khu rừng phủ sương. Khung cảnh cổ tích khiến nơi này là điểm đến cuối tuần quen thuộc.',
  d => { d.bg('c'); d.tri(0,6,16,10,'G'); d.r(3,5,4,4,'y'); d.r(9,4,4,5,'r'); d.e(5,4,2,1.5,'o'); d.r(10,1,2,3,'v'); d.p('N',4,7,6,7,10,6,12,6); d.r(6,7,4,2,'e'); d.p('l',1,11,2,11,3,11,12,12,13,12,14,12,5,13,6,13); }, SC);
add(1, 'Địa danh', 'pt-coimbra', 'Coimbra', 'Coimbra University', 'thành phố đại học cổ, nơi có một trong những trường đại học lâu đời nhất châu Âu, thành lập từ năm 1290. Thư viện Joanina với trần chạm vàng là điểm tham quan nổi tiếng.',
  d => { d.bg('c'); d.r(0,13,16,3,'C'); d.tri(0,6,16,7,'g'); d.r(3,6,10,5,'u'); d.r(7,1,3,6,'e'); d.tri(7,0,3,2,'t'); d.p('k',8,3); for(let x=4;x<13;x+=2) d.p('N',x,8,x,9); d.r(3,5,10,1,'r'); d.p('w',3,14,11,15); }, SC);
add(1, 'Địa danh', 'pt-evora', 'Évora', 'Evora', 'thành phố cổ vùng Alentejo với đền La Mã và nhà thờ lớn, trung tâm lịch sử được UNESCO công nhận. Nhà nguyện Xương (Capela dos Ossos) trang trí bằng xương người, gây ấn tượng mạnh.',
  d => { d.bg('c'); d.r(0,13,16,3,'t'); d.r(2,11,12,2,'a'); for(let x=3;x<14;x+=2){ d.r(x,4,1,7,'W'); d.p('e',x,3); } d.r(3,2,9,1,'a'); d.p('a',13,5,13,6); d.e(1,12,1.4,1,'g'); d.p('y',14,1,15,1,14,2); }, SC);
add(1, 'Địa danh', 'pt-guimaraes', 'Guimarães', 'Guimaraes Castle', 'thành phố ở miền bắc được coi là nơi khai sinh của quốc gia Bồ Đào Nha. Lâu đài và trung tâm cổ được bảo tồn tốt.',
  d => { d.bg('c'); d.r(0,13,16,3,'g'); d.r(2,8,12,5,'a'); d.r(2,4,3,5,'A'); d.r(11,4,3,5,'A'); d.r(6,2,4,11,'a'); for(const x of [2,4,6,8,11,13]) d.p('a',x,x>5&&x<10?1:3); d.p('k',7,5,8,5,7,11,8,11,7,12,8,12,3,6,12,6); d.r(8,0,3,1,'r'); }, SC);
add(1, 'Địa danh', 'pt-braga', 'Braga', 'Bom Jesus, Braga', 'thành phố cổ giàu tính tôn giáo ở miền bắc, với đền Bom Jesus do Monte có cầu thang chữ chi lên đồi. Thành phố nổi tiếng với các lễ Tuần Thánh.',
  d => { d.bg('c'); d.tri(0,3,16,13,'G'); d.r(5,2,6,4,'w'); d.r(5,1,2,1,'w'); d.r(9,1,2,1,'w'); d.p('y',5,0,10,0); d.p('N',7,4,8,4,7,5,8,5); for(let i=0;i<5;i++){ const y=7+i*2; d.l(i%2?4:11,y,i%2?11:4,y+1,'W'); } d.p('w',3,15,12,15); }, SC);
add(1, 'Địa danh', 'pt-obidos', 'Óbidos', 'Obidos', 'thị trấn thành lũy nhỏ với tường trắng, hoa giấy và những con ngõ lát đá. Nơi này nổi tiếng với rượu anh đào ginjinha uống trong ly sô-cô-la.',
  d => { d.bg('c'); d.r(0,12,16,4,'a'); d.r(0,8,16,4,'t'); for(let x=0;x<16;x+=2) d.p('t',x,7); d.r(2,4,5,4,'w'); d.tri(1,2,7,2,'r'); d.r(9,5,5,3,'w'); d.tri(8,3,7,2,'r'); d.r(2,7,5,1,'y'); d.p('B',3,5,12,6); d.p('P',9,4,10,5,14,5,14,6,13,4); d.r(7,9,2,3,'N'); }, SC);
add(1, 'Địa danh', 'pt-nazare', 'Nazaré', 'Nazare', 'làng chài nổi tiếng với những con sóng khổng lồ vào mùa đông, thu hút người lướt sóng từ khắp thế giới. Phụ nữ địa phương từng mặc nhiều lớp váy ngắn truyền thống.',
  d => { d.bg('c'); d.r(0,12,16,4,'u'); d.r(0,8,16,4,'C'); d.tri(11,2,6,8,'n'); d.r(12,1,3,2,'w'); d.p('r',13,0); d.p('w',1,9,3,10,6,9,8,11); d.r(2,12,6,2,'r'); d.r(3,11,4,1,'y'); d.p('k',2,12,7,12); d.p('e',5,9,5,10); }, SC);
add(1, 'Địa danh', 'pt-fatima', 'Fátima', 'Fatima', 'nơi hành hương lớn của người Công giáo, gắn với những lần được cho là Đức Mẹ hiện ra năm 1917. Hàng năm có nhiều người từ khắp nơi đến đây.',
  d => { d.bg('c'); d.r(0,13,16,3,'a'); d.r(1,9,14,4,'w'); d.r(6,3,4,10,'w'); d.tri(6,1,4,2,'e'); d.p('y',8,0); d.p('a',7,6,8,6,7,11,8,11,7,12,8,12); for(let x=2;x<15;x+=2) d.p('N',x,11,x,12); d.p('y',2,14,5,15,11,14,13,15); d.p('o',2,13,5,14,11,13,13,14); }, SC);

// ----- Biển, sông, đảo và núi -----
add(1, 'Biển, sông, đảo và núi', 'pt-rivers', 'Sông Tejo và Douro', 'Tagus and Douro rivers', 'hai con sông lớn chảy từ Tây Ban Nha sang Bồ Đào Nha rồi đổ ra Đại Tây Dương. Douro tạo ra thung lũng trồng nho nổi tiếng.',
  d => { d.bg('g'); d.l(0,3,5,5,'b'); d.l(5,5,9,3,'b'); d.l(9,3,12,6,'b'); d.l(0,4,5,6,'b'); d.l(5,6,9,4,'b'); d.l(0,11,6,9,'b'); d.l(6,9,12,12,'b'); d.l(0,12,6,10,'b'); d.l(6,10,12,13,'b'); d.r(12,0,4,16,'C'); d.p('w',13,3,14,9,13,13); d.p('y',2,1,8,14); }, SC);
add(1, 'Biển, sông, đảo và núi', 'pt-alto-douro', 'Thung lũng Douro (Alto Douro)', 'Alto Douro wine valley', 'vùng đồi bậc thang trồng nho làm rượu vang Porto, UNESCO công nhận năm 2001. Đây được coi là một trong những vùng rượu vang lâu đời nhất thế giới được phân định ranh giới chính thức.',
  d => { d.bg('c'); d.tri(0,2,12,12,'G'); d.tri(7,4,9,10,'g'); for(let y=6;y<14;y+=2){ for(let x=1;x<8;x+=2) d.p('v',x,y); for(let x=9;x<16;x+=2) d.p('v',x,y+1); d.l(0,y+1,7,y+1,'t'); } d.r(0,14,16,2,'C'); d.p('n',4,14,5,14,6,14); d.p('w',5,13); }, SC);
add(1, 'Biển, sông, đảo và núi', 'pt-algarve-coast', 'Algarve', 'Algarve coast', 'bờ biển phía nam với vách đá vàng, hang động và hang biển. Bãi Praia da Marinha và Benagil là những điểm được chụp ảnh nhiều.',
  d => { d.bg('c'); d.r(0,9,16,7,'C'); d.r(0,4,6,9,'o'); d.r(0,3,6,1,'g'); d.e(3,11,1.6,2.4,'C'); d.r(11,6,3,6,'y'); d.r(11,5,3,1,'g'); d.r(0,13,16,3,'u'); d.p('w',8,10,9,12,14,11); d.p('O',1,6,4,8,12,8); }, SC);
add(1, 'Biển, sông, đảo và núi', 'pt-roca', 'Vách Cabo da Roca', 'Cabo da Roca', 'mũi đất ở cực tây của lục địa châu Âu, gần Sintra. Nơi này gắn với cụm từ "nơi đất liền kết thúc và biển bắt đầu".',
  d => { d.bg('c'); d.r(0,9,16,7,'C'); d.tri(0,6,12,10,'n'); d.r(0,8,8,8,'n'); d.r(0,7,8,1,'g'); d.r(3,2,2,5,'w'); d.p('r',3,3,4,3,3,1,4,1); d.p('y',2,1,5,1); d.p('w',10,12,12,13,9,15,14,10); d.r(6,4,1,3,'a'); d.p('a',5,5,7,5); }, SC);
add(1, 'Biển, sông, đảo và núi', 'pt-geres', 'Công viên quốc gia Peneda-Gerês', 'Peneda-Geres National Park', 'khu rừng núi duy nhất được gọi là công viên quốc gia của Bồ Đào Nha, ở miền bắc, có suối, thác và ngựa hoang. Đây là nơi sống của sói Iberia.',
  d => { d.bg('c'); d.tri(0,1,10,11,'a'); d.tri(6,3,10,9,'G'); d.r(0,11,16,5,'g'); d.r(7,6,1,6,'c'); d.r(8,9,1,3,'w'); d.r(5,12,8,2,'b'); for(const x of [1,3,13]){ d.tri(x-1,7,3,4,'G'); d.p('N',x,11); } d.p('w',2,2,6,13,10,12); }, SC);
add(1, 'Biển, sông, đảo và núi', 'pt-estrela', 'Serra da Estrela', 'Serra da Estrela', 'dãy núi cao nhất đất liền, đỉnh khoảng 1.993 m. Mùa đông nơi đây có tuyết và người ta làm phô mai Serra nổi tiếng.',
  d => { d.bg('l'); d.tri(0,3,16,12,'a'); d.tri(5,3,6,4,'w'); d.r(0,13,16,3,'w'); d.p('w',2,2,12,1,14,5,3,6,13,8,1,9); d.e(4,13,1.6,1.1,'e'); d.p('k',3,12); d.e(11,13,1.6,1.1,'e'); d.p('k',12,12); }, SC);
add(1, 'Biển, sông, đảo và núi', 'pt-madeira', 'Madeira', 'Madeira', 'đảo núi lửa ngoài khơi Đại Tây Dương, với rừng nguyệt quế cổ thụ Laurissilva và những kênh dẫn nước levada để đi bộ. Thủ phủ là Funchal.',
  d => { d.bg('c'); d.r(0,12,16,4,'C'); d.tri(1,2,14,11,'G'); d.tri(4,5,9,8,'g'); d.p('w',5,3,6,3); d.p('r',4,10,6,9,10,11,11,10); d.p('w',4,11,6,10,10,12,11,11); d.p('P',3,12,13,12); d.p('y',8,12,8,13); d.p('w',2,14,12,15); }, SC);
add(1, 'Biển, sông, đảo và núi', 'pt-azores', 'Azores', 'The Azores', 'quần đảo chín đảo giữa Đại Tây Dương với hồ miệng núi lửa, suối nước nóng và cảnh đồng cỏ xanh. Lồng cá voi và xem cá voi là hoạt động nổi bật.',
  d => { d.bg('C'); d.e(8,9,7,5,'g'); d.e(6,8,3,2,'B'); d.e(11,10,2,1.4,'t'); d.p('G',2,9,4,12,9,13,13,8,10,6); d.p('w',2,2,3,2,4,2,11,3,12,3); d.p('v',5,12,8,11,13,11); d.p('w',1,14,14,14); }, SC);
add(1, 'Biển, sông, đảo và núi', 'pt-rias', 'Ria Formosa và Ria de Aveiro', 'Ria Formosa and Ria de Aveiro', 'những đầm phá ven biển với bãi cát, cò và chim di cư. Ở Aveiro người ta đi thuyền moliceiro sơn màu.',
  d => { d.bg('c'); d.r(0,8,16,8,'C'); d.r(0,13,16,3,'u'); d.l(2,9,13,9,'y'); d.r(3,10,10,2,'r'); d.p('k',2,9,13,9,1,8,14,8); d.p('b',4,10,7,10,10,10); d.r(8,3,1,6,'N'); d.p('w',3,5,4,4,5,5); d.p('p',12,4,13,3,13,4,13,5,13,6); }, SC);

// ----- Mùa và thiên nhiên -----
add(1, 'Mùa và thiên nhiên', 'pt-spring', 'Mùa xuân', 'Spring', 'hoa dại nở khắp đồng cỏ Alentejo, và hoa hạnh nhân nở ở Algarve từ cuối mùa đông. Đây là thời điểm dễ chịu để đi bộ đường dài.',
  d => { d.bg('c'); d.r(0,9,16,7,'g'); for(const [x,y,c] of [[2,11,'v'],[5,13,'y'],[8,11,'w'],[11,14,'r'],[13,11,'y'],[3,14,'p']]) d.p(c,x,y-1,x-1,y,x+1,y,x,y+1); d.r(11,4,1,6,'N'); d.e(11.5,4,3,2.6,'p'); d.p('w',10,3,12,4,13,2); d.e(3,3,2,2,'y'); }, SC);
add(1, 'Mùa và thiên nhiên', 'pt-summer', 'Mùa hè', 'Summer', 'nắng nhiều, ít mưa, bãi biển đông du khách. Nhiệt độ ở nội địa phía nam có thể rất cao.',
  d => { d.bg('c'); d.e(12,4,3,3,'y'); d.p('o',12,0,15,1,8,4,12,8); d.r(0,9,16,3,'C'); d.r(0,12,16,4,'u'); d.fan(4,10,3.4,'r'); d.p('w',2,8,4,7,6,8); d.r(4,10,1,4,'n'); d.r(9,13,5,1,'b'); d.p('S',9,12,10,12); d.p('w',2,10,12,10); }, SC);
add(1, 'Mùa và thiên nhiên', 'pt-autumn', 'Mùa thu', 'Autumn', 'mùa thu hoạch nho và hạt dẻ, rừng sồi chuyển màu nâu vàng. Nhiều lễ hội ẩm thực diễn ra vào thời gian này.',
  d => { d.bg('u'); d.r(0,12,16,4,'n'); d.r(4,7,2,6,'N'); d.e(5,5,4,3.4,'o'); d.p('r',3,4,6,6,7,3); d.p('y',4,6,5,2); d.p('o',2,10,8,11,12,14,6,14); d.r(10,10,5,3,'N'); d.e(12.5,9,2.5,1.5,'n'); d.p('v',11,11,13,11,12,12); }, SC);
add(1, 'Mùa và thiên nhiên', 'pt-winter', 'Mùa đông', 'Winter', 'mưa nhiều hơn ở miền bắc và vùng Atlantic, trong khi miền nam ôn hòa. Biển động mạnh, sóng lớn ở Nazaré.',
  d => { d.bg('a'); d.r(0,10,16,6,'B'); d.p('c',2,2,5,4,9,1,13,3,3,6,11,6,7,7); d.p('c',2,3,5,5,9,2,13,4); d.tri(1,6,11,7,'C'); d.p('w',5,7,6,6,7,7,3,10,9,11,12,10,14,12); d.r(0,14,16,2,'W'); }, SC);
add(1, 'Mùa và thiên nhiên', 'pt-cork-oak', 'Rừng sồi bần (sobreiro)', 'Cork oak forest', 'những cây sồi vỏ xốp dùng để làm nút chai, đặc biệt ở vùng Alentejo. Bồ Đào Nha là nước sản xuất nút chai lớn nhất thế giới, vỏ được bóc thủ công vài năm một lần.',
  d => { d.bg('c'); d.r(0,13,16,3,'t'); d.r(6,7,3,6,'o'); d.r(6,10,3,3,'O'); d.e(8,4,5,3.4,'G'); d.p('g',5,3,8,2,10,4); d.p('G',4,7,11,7); d.r(11,11,4,2,'n'); d.p('N',12,11,13,12); d.p('N',3,13,2,12); }, SC);
add(1, 'Mùa và thiên nhiên', 'pt-laurissilva', 'Rừng Laurissilva ở Madeira', 'Laurissilva forest', 'rừng nguyệt quế cổ xưa, được UNESCO công nhận năm 1999. Đây là mảng rừng loại này còn lại lớn nhất thế giới.',
  d => { d.bg('G'); for(const x of [2,7,12]){ d.r(x,4,2,12,'n'); d.e(x+1,3,2.8,2.4,'g'); d.p('h',x,2,x+2,3); } d.p('g',4,9,5,10,10,8,14,11,1,13); d.p('w',0,12,1,12,2,12,9,11,10,11); d.r(4,14,8,2,'c'); }, SC);
add(1, 'Mùa và thiên nhiên', 'pt-wildlife', 'Chim và động vật hoang dã', 'Birds and wildlife', 'cò trắng làm tổ trên tháp chuông, chim hồng hạc ở các đầm phá, và cá heo ngoài khơi bờ biển. Linh miêu Iberia là loài rất hiếm.',
  d => { d.bg('c'); d.r(0,12,16,4,'C'); d.e(5,5,2.6,1.6,'w'); d.p('k',7,5,8,6); d.p('r',8,4,9,4,10,5); d.r(5,7,1,4,'r'); d.e(11,9,2,1.4,'p'); d.p('p',13,7,13,8,12,6); d.p('k',13,6); d.r(11,10,1,3,'p'); d.p('w',2,13,3,12,4,13,13,15); }, SC);

// ----- Vùng miền -----
add(1, 'Vùng miền', 'pt-norte', 'Norte (miền Bắc)', 'Northern region', 'vùng núi xanh, nhiều mưa, có Porto, Braga và Guimarães. Đây là nơi bắt nguồn rượu vinho verde và nhiều truyền thống dân gian.',
  d => { d.bg('l'); d.tri(0,4,10,9,'G'); d.tri(7,3,9,10,'g'); d.r(0,12,16,4,'G'); d.r(5,9,6,4,'a'); d.tri(4,7,8,2,'A'); d.p('k',7,11,7,12,9,10); d.p('b',1,1,3,3,13,1,11,2,6,2,14,4); d.p('v',2,14,3,14,13,14); }, SC);
add(1, 'Vùng miền', 'pt-centro', 'Centro (miền Trung)', 'Central region', 'gồm Coimbra, Aveiro và núi Serra da Estrela, kết hợp biển, núi và các thành phố cổ.',
  d => { d.bg('c'); d.tri(0,2,9,8,'a'); d.p('w',4,2,3,3,4,3,5,3); d.r(0,9,9,7,'g'); d.r(9,10,7,6,'C'); d.r(9,10,1,6,'u'); d.r(2,10,5,3,'e'); d.tri(2,8,5,2,'r'); d.p('N',4,12); d.p('r',11,12,12,12,13,12); d.p('y',12,11); }, SC);
add(1, 'Vùng miền', 'pt-lisboa-region', 'Lisboa và Vale do Tejo', 'Lisbon and the Tagus Valley', 'vùng đông dân nhất, trung tâm chính trị và kinh tế, có thủ đô và các bãi biển gần thành phố.',
  d => { d.bg('c'); d.r(0,10,16,6,'C'); d.r(0,8,7,3,'e'); d.p('r',1,7,2,6,3,7,4,7,5,6,6,7); d.r(4,4,1,3,'e'); d.r(9,4,1,8,'r'); d.r(14,4,1,8,'r'); d.r(7,9,9,1,'r'); d.l(7,8,9,4,'R'); d.l(9,4,14,4,'R'); d.l(10,5,12,8,'R'); d.l(12,8,13,5,'R'); d.p('w',2,13,12,14); }, SC);
add(1, 'Vùng miền', 'pt-alentejo', 'Alentejo', 'Alentejo plains', 'vùng đồng bằng khô và rộng ở phía nam sông Tejo, nổi tiếng với rừng sồi bần, đồi lúa mì và rượu vang. Nhịp sống ở đây chậm và thanh bình.',
  d => { d.bg('c'); d.e(13,3,2,2,'y'); d.r(0,9,16,7,'y'); for(let x=1;x<16;x+=2) d.p('Y',x,10+(x%4),x,13); d.r(4,6,1,5,'N'); d.e(4.5,5,3,2,'G'); d.r(10,7,5,3,'w'); d.tri(10,5,5,2,'r'); d.p('b',11,8); d.p('O',2,12,7,14,12,13); }, SC);
add(1, 'Vùng miền', 'pt-algarve-region', 'Algarve', 'Algarve region', 'vùng ven biển phía nam với khí hậu ấm quanh năm, là điểm nghỉ dưỡng nổi tiếng.',
  d => { d.bg('c'); d.e(3,3,2,2,'y'); d.r(0,10,16,6,'C'); d.r(0,12,16,4,'u'); d.r(11,4,1,8,'n'); d.p('G',9,3,10,3,12,3,13,3,11,2,8,4,14,4); d.r(2,7,5,5,'w'); d.p('b',3,8,5,8); d.r(3,10,2,2,'b'); d.r(2,6,5,1,'o'); d.p('r',8,13,9,13); }, SC);
add(1, 'Vùng miền', 'pt-islands', 'Quần đảo Madeira và Azores', 'Madeira and Azores regions', 'hai vùng tự trị với văn hóa, ẩm thực và thiên nhiên riêng. Thời tiết nơi đây chịu tác động của Đại Tây Dương.',
  d => { d.bg('C'); d.e(4,5,3.4,2.6,'g'); d.e(11,10,4,2.8,'G'); d.tri(2,2,4,3,'G'); d.tri(10,6,3,4,'a'); d.p('w',11,5,12,4,13,5); d.p('w',2,10,3,10,8,3,14,4,6,13,7,13); d.p('r',4,6,11,11); d.p('y',5,5,12,11); }, SC);

// ----- Hiện tượng đặc biệt -----
add(1, 'Hiện tượng đặc biệt', 'pt-big-wave', 'Sóng lớn ở Nazaré (Praia do Norte)', 'Giant wave of Nazare', 'vào mùa đông, một hẻm sâu dưới đáy biển làm sóng cao lên rất nhiều, có lúc cao trên 20 m. Người lướt sóng từ nhiều nước đến thử sức.',
  d => { d.bg('l'); d.e(7,12,9,8,'C'); d.e(10,12,6,5,'b'); d.e(12,13,4,3,'c'); d.p('w',2,6,3,5,4,4,5,4,6,4,7,5,8,5,1,7,9,7,10,8); d.p('k',11,10,12,11); d.p('r',10,11,11,11,12,12,13,12); d.r(0,14,16,2,'B'); d.r(13,2,3,3,'n'); }, SC);
add(1, 'Hiện tượng đặc biệt', 'pt-birds', 'Mùa chim di cư ở Ria Formosa', 'Bird migration', 'nhiều loài chim dừng chân trên đường di cư giữa châu Âu và châu Phi. Người yêu chim thường đến đây quan sát.',
  d => { d.bg('c'); for(const [x,y] of [[3,3],[7,5],[11,3],[5,8],[9,9]]) d.p('k',x-1,y-1,x,y,x+1,y-1); d.r(0,12,16,4,'C'); d.p('G',1,11,2,12,13,11,14,12,2,11); d.p('w',12,10,13,10,12,11); d.p('o',14,10); d.p('w',5,13,9,14); }, SC);
add(1, 'Hiện tượng đặc biệt', 'pt-nortada', 'Gió Nortada', 'Nortada wind', 'gió mạnh thổi từ phía bắc vào mùa hè dọc bờ biển phía tây, mát nhưng đôi khi mạnh. Người lướt ván diều rất thích.',
  d => { d.bg('c'); d.l(1,3,11,3,'w'); d.p('w',12,2,11,1,10,1); d.l(3,6,13,6,'w'); d.p('w',14,7,13,8,12,8); d.r(0,11,16,5,'C'); d.p('r',8,8,9,7,10,6,11,7,9,8,10,8); d.l(8,9,6,12,'k'); d.r(4,12,4,1,'y'); d.p('w',2,13,12,12,14,14); }, SC);
add(1, 'Hiện tượng đặc biệt', 'pt-furnas', 'Núi lửa và suối nước nóng ở Azores', 'Volcanic hot springs of the Azores', 'vùng Furnas có nồi hầm cozido nấu bằng hơi nóng từ lòng đất. Đây là cách nấu ăn đặc biệt chỉ có ở đây.',
  d => { d.bg('a'); d.tri(0,3,16,9,'G'); d.r(0,11,16,5,'n'); d.e(5,12.5,3,1.6,'t'); d.e(12,13,2.4,1.4,'t'); for(const [x,y] of [[4,10],[5,8],[4,6],[12,11],[11,9],[12,7],[6,5]]) d.p('w',x,y); d.p('r',8,14,9,15); d.p('o',2,15,14,15); }, SC);
add(1, 'Hiện tượng đặc biệt', 'pt-sunset', 'Hoàng hôn ở Cabo da Roca và Sagres', 'Sunset at Cabo da Roca and Sagres', 'bầu trời đỏ rực khi mặt trời chìm xuống Đại Tây Dương. Sagres gắn với thời kỳ khám phá hàng hải.',
  d => { d.bg('o'); d.r(0,0,16,3,'v'); d.r(0,3,16,3,'r'); d.e(8,10,4,4,'y'); d.r(0,10,16,6,'B'); d.l(5,11,11,11,'o'); d.l(6,13,10,13,'y'); d.tri(10,6,7,6,'k'); d.r(11,11,5,5,'k'); d.r(12,4,1,3,'k'); d.p('y',12,4); }, SC);
