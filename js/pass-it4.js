import { add, SC, setCC } from './pass-kit.js';
setCC('it');
// Ý · Nhóm 4: Văn hóa và nghệ thuật

// ----- Lễ hội -----
add(4, 'Lễ hội', 'it-carnevale', 'Carnevale di Venezia (Lễ hội hóa trang Venice)', 'The Venice Carnival', 'diễn ra trước Mùa Chay, với mặt nạ và trang phục cầu kỳ đi dạo trên phố và quảng trường. Lễ hội có lịch sử nhiều thế kỷ và được khôi phục mạnh vào cuối thế kỷ 20.',
  d => { d.bg('V'); d.e(5,6,3,3.5,'w'); d.p('k',4,5,6,5); d.p('r',5,8); d.e(11,7,3,3.5,'y'); d.p('k',10,6,12,6); d.p('r',11,9); d.tri(2,1,6,2,'k'); d.p('p',13,2,14,1,12,3,15,2); d.r(2,10,6,6,'r'); d.r(8,11,6,5,'b'); d.p('y',4,12,11,13,6,14,13,1); }, SC);
add(4, 'Lễ hội', 'it-palio', 'Palio di Siena', 'The Palio of Siena', 'cuộc đua ngựa trần giữa các khu phố (contrada) của thành phố Siena, tổ chức hai lần mỗi năm vào ngày 2 tháng 7 và 16 tháng 8. Đây là lễ hội dân gian sôi động và ghi dấu bản sắc của người Siena.',
  d => { d.bg('t'); d.r(0,12,16,4,'n'); d.r(0,1,16,3,'r'); d.p('y',2,2,7,2,12,2); d.e(7,8,4,2.4,'N'); d.r(10,5,2,3,'N'); d.e(12,5,1.8,1.4,'N'); d.l(4,10,3,13,'k'); d.l(6,10,7,13,'k'); d.l(9,10,8,13,'k'); d.l(10,9,13,12,'k'); d.e(7,4.5,1.2,1.2,'s'); d.r(6,5,3,2,'g'); d.p('r',2,7,1,8); }, SC);
add(4, 'Lễ hội', 'it-calcio-storico', 'Calcio Storico Fiorentino', 'Calcio Storico Fiorentino', 'trò chơi bóng cổ truyền ở Firenze, kết hợp bóng đá, bóng bầu dục và vật, thường được tổ chức vào giữa năm trên sân cát giữa thành phố. Người chơi mặc trang phục thời Phục hưng và trận đấu rất quyết liệt.',
  d => { d.bg('t'); d.r(0,0,16,4,'e'); for(let x=1;x<16;x+=3) d.p('r',x,1); for(const [x,c] of [[3,'r'],[11,'b']]){ d.e(x+.5,6,1.4,1.4,'s'); d.r(x-1,8,4,4,c); d.r(x,8,2,4,c==='r'?'y':'w'); d.p('k',x-1,12,x-1,13,x+2,12,x+2,13); } d.e(8,10,1.5,1.5,'w'); d.p('n',2,14,9,15,13,14); }, SC);
add(4, 'Lễ hội', 'it-scoppio', 'Scoppio del Carro (Pháo hoa xe)', 'The Explosion of the Cart', 'lễ Phục sinh ở Firenze, khi một chiếc xe lớn đầy pháo được đốt trước nhà thờ chính tòa. Người dân tin cảnh này mang đến mùa màng tốt đẹp.',
  d => { d.bg('B'); d.r(4,7,8,6,'n'); d.r(5,4,6,3,'r'); d.tri(5,2,6,2,'y'); d.e(4,13,2,2,'k'); d.e(12,13,2,2,'k'); d.p('y',2,2,13,3,1,6,14,7,3,0); d.p('o',3,4,12,1,15,5,1,9); d.p('w',7,1,10,0,2,5); d.p('y',6,9,9,10); d.r(0,15,16,1,'a'); }, SC);
add(4, 'Lễ hội', 'it-infiorata', 'Lễ hoa Infiorata', 'The Infiorata flower carpets', 'nhiều thị trấn trải thảm hoa nhiều màu trên đường phố vào dịp lễ Corpus Domini. Mỗi bức tranh hoa thường chỉ tồn tại trong vài ngày.',
  d => { d.bg('a'); d.r(0,0,3,16,'t'); d.r(13,0,3,16,'e'); d.r(3,0,10,16,'g'); d.e(8,5,4,3.5,'r'); d.e(8,5,2,2,'y'); d.e(8,12,4,3.5,'v'); d.e(8,12,2,2,'w'); d.p('p',4,8,11,9,5,9,10,8); d.p('N',1,4,1,10,14,6,14,12); }, SC);
add(4, 'Lễ hội', 'it-repubblica', 'Ngày Cộng hòa (Festa della Repubblica, 2 tháng 6)', 'Republic Day (2 June)', 'ngày quốc khánh đánh dấu cuộc trưng cầu dân ý năm 1946, khi người Ý chọn chế độ cộng hòa. Có duyệt binh ở Roma và nhiều hoạt động ở khắp nước.',
  d => { d.bg('c'); for(const [y,c] of [[2,'g'],[4,'w'],[6,'r']]){ d.l(1,y+4,14,y,c); d.l(1,y+5,14,y+1,c); } for(const x of [3,8,13]) d.p('a',x,13,x-1,14,x+1,14); d.r(0,15,16,1,'t'); d.p('w',12,12,2,1); }, SC);
add(4, 'Lễ hội', 'it-ferragosto', 'Ferragosto (15 tháng 8)', 'Ferragosto (15 August)', 'ngày lễ giữa mùa hè gắn với kỳ nghỉ lớn nhất trong năm, nhiều gia đình đi biển hoặc về quê. Ngày này cũng trùng với lễ Đức Mẹ Lên Trời của Giáo hội Công giáo.',
  d => { d.bg('c'); d.e(13,3,2,2,'y'); d.r(0,8,16,3,'C'); d.r(0,11,16,5,'t'); d.tri(1,5,6,3,'r'); d.r(3,8,1,6,'N'); d.tri(8,7,6,3,'b'); d.r(10,10,1,5,'N'); d.p('w',3,6,10,8); d.e(6,14,1.5,1.5,'o'); d.p('w',2,9,13,9); }, SC);
add(4, 'Lễ hội', 'it-sanremo', 'Festival di Sanremo', 'The Sanremo Music Festival', 'cuộc thi ca nhạc truyền hình thường niên tổ chức ở thành phố biển Sanremo từ năm 1951. Nhiều bài hát nổi tiếng ở Ý đã ra mắt từ sân khấu này.',
  d => { d.bg('i'); d.r(0,12,16,4,'V'); d.r(7,4,2,8,'a'); d.e(8,4,2.4,2.6,'k'); d.p('a',7,3,8,5,9,3); d.e(8,12,3,1,'a'); for(const x of [2,13]){ d.p('y',x,1,x,2,x-1,3,x+1,3); } d.p('p',4,8,12,9,3,6); d.p('c',13,7,2,10); d.p('r',4,13,8,14,12,13); }, SC);
add(4, 'Lễ hội', 'it-mostra', 'Liên hoan phim Venezia (Mostra del Cinema)', 'The Venice Film Festival', 'liên hoan phim lâu đời nhất thế giới, khởi đầu năm 1932 trên đảo Lido. Giải thưởng cao nhất là Sư tử Vàng.',
  d => { d.bg('r'); d.e(8,6,4,3,'y'); d.e(10,4,2,2,'y'); d.p('k',11,3); d.p('Y',12,4,13,4); d.tri(1,2,6,4,'Y'); d.r(5,8,2,3,'Y'); d.r(9,8,2,3,'Y'); d.r(4,11,9,2,'y'); d.r(3,13,11,3,'k'); d.p('w',5,14,8,14,11,14); }, SC);

// ----- Nhạc cụ -----
add(4, 'Nhạc cụ', 'it-violino', 'Đàn violin (Cremona)', 'The violin of Cremona', 'thành phố Cremona là quê hương của nghề làm đàn violin, đặc biệt là các gia đình Amati, Guarneri và Stradivari. Những cây đàn cổ do họ làm ra ngày nay có giá rất cao.',
  d => { d.e(8,11,4,3.8,'O'); d.e(8,6,3,3,'O'); d.p('_',4,8,12,8); d.r(7,0,2,5,'N'); d.p('N',6,0,9,0); d.l(7,5,7,13,'k'); d.l(8,5,8,13,'e'); d.p('k',5,10,5,11,11,10,11,11); d.l(2,14,14,2,'n'); }, { use: 'hold' });
add(4, 'Nhạc cụ', 'it-pianoforte', 'Đàn piano', 'The piano', 'do Bartolomeo Cristofori, người làm nhạc cụ ở Firenze, phát minh vào khoảng đầu thế kỷ 18. Đàn đầu tiên có thể chơi nhỏ và to bằng cách thay đổi lực bấm phím.',
  d => { d.r(1,5,14,5,'k'); d.tri(1,2,10,3,'K'); d.r(2,8,12,2,'w'); for(let x=3;x<14;x+=2) d.p('k',x,8); d.r(2,10,2,5,'k'); d.r(12,10,2,5,'k'); d.r(7,10,2,4,'k'); d.p('y',6,6,9,6); d.p('v',13,1,13,2,14,1); }, { use: 'hold' });
add(4, 'Nhạc cụ', 'it-mandolino', 'Đàn mandolin', 'The mandolin', 'nhạc cụ dây nhỏ gảy bằng miếng gảy, thường gắn với nhạc dân gian Napoli. Âm thanh réo rắt quen thuộc trong những bài hát tình ca.',
  d => { d.e(6,10,4.5,4.5,'O'); d.e(6,10,3,3,'t'); d.e(6,10,1.2,1.2,'N'); d.l(9,7,13,3,'N'); d.l(8,6,12,2,'N'); d.r(12,1,3,3,'n'); d.p('y',15,1,12,0,15,3); d.l(4,12,12,4,'e'); }, { use: 'hold' });
add(4, 'Nhạc cụ', 'it-zampogna', 'Kèn túi zampogna', 'The zampogna bagpipe', 'loại kèn túi da dân gian ở miền trung và nam, thường chơi trong dịp Giáng sinh. Người chơi thường là nhóm người chăn cừu đi từng làng.',
  d => { d.e(7,7,5,4,'e'); d.e(6,6,3,2,'w'); d.l(9,9,11,15,'n'); d.l(10,9,13,15,'n'); d.l(6,10,5,15,'n'); d.l(11,5,14,1,'n'); d.p('N',11,15,13,15,5,15,14,0); d.p('r',4,8,10,7); }, { use: 'hold' });
add(4, 'Nhạc cụ', 'it-tamburello', 'Trống tay (tamburello)', 'The tamburello', 'trống lắc có chuông nhỏ, dùng trong điệu nhảy tarantella ở miền nam. Tiết tấu nhanh và dồn dập là đặc trưng.',
  d => { d.e(8,8,7,7,'n'); d.e(8,8,5.2,5.2,'e'); for(const [x,y] of [[8,1],[14,8],[8,14],[1,8],[13,3],[3,13],[13,13],[3,3]]) d.p('y',x,y); d.p('r',8,6,6,8,10,8,8,10); d.p('r',8,8); }, { use: 'hold' });

// ----- Nghệ thuật biểu diễn -----
add(4, 'Nghệ thuật biểu diễn', 'it-opera', 'Opera', 'Opera', 'loại hình kịch hát ra đời ở Ý vào khoảng đầu thế kỷ 17, với những nhà soạn nhạc như Rossini, Verdi và Puccini. Nhiều vở như La Traviata, Tosca hay Madama Butterfly vẫn được dàn dựng trên thế giới.',
  d => { d.bg('r'); d.r(0,0,3,16,'R'); d.r(13,0,3,16,'R'); d.r(0,0,16,2,'y'); d.r(3,12,10,4,'n'); d.e(8,5.5,2,2,'s'); d.p('N',6,4,7,3,8,3,9,3,10,4); d.tri(4,7,8,6,'w'); d.p('k',8,6); d.p('y',12,4,12,5,11,6,4,9,8,9); }, SC);
add(4, 'Nghệ thuật biểu diễn', 'it-scala', 'Nhà hát La Scala (Teatro alla Scala)', 'La Scala', 'nhà hát opera nổi tiếng ở Milano, khai trương năm 1778. Mùa diễn thường mở màn vào ngày 7 tháng 12, lễ của thánh bảo trợ thành phố.',
  d => { d.bg('B'); d.r(0,14,16,2,'a'); d.r(1,6,14,8,'e'); d.tri(3,2,10,4,'W'); d.r(3,6,10,1,'t'); for(let x=3;x<13;x+=2) d.r(x,7,1,4,'t'); for(const x of [2,5,10,13]){ d.r(x,12,1,2,'N'); } d.r(7,11,2,3,'y'); d.p('w',2,2,14,1,13,4); }, SC);
add(4, 'Nghệ thuật biểu diễn', 'it-commedia', 'Commedia dell’arte', 'Commedia dell\'arte', 'kịch dân gian từ thế kỷ 16, với nhân vật cố định như Arlecchino và Pulcinella, người diễn đeo mặt nạ và ứng biến. Nhiều câu chuyện hài kịch châu Âu về sau chịu ảnh hưởng từ đây.',
  d => { d.bg('e'); d.e(8,5,2.6,2.6,'s'); d.r(5,4,6,2,'k'); d.p('w',6,4,9,4); d.tri(4,0,8,3,'k'); d.p('r',12,0); d.r(5,8,6,6,'y'); for(let y=8;y<14;y+=2) for(let x=5;x<11;x+=2){ d.p('r',x,y); d.p('b',x+1,y+1); } d.p('k',5,14,6,15,9,14,10,15); d.l(12,9,14,6,'n'); }, SC);
add(4, 'Nghệ thuật biểu diễn', 'it-tarantella', 'Vũ điệu tarantella', 'The tarantella', 'điệu nhảy nhanh, vui nhộn ở miền nam, gắn với vùng Puglia và Napoli. Có những câu chuyện dân gian cho rằng điệu nhảy dùng để xua đuổi nọc nhện, nhưng đó chỉ là truyền thuyết.',
  d => { d.bg('u'); d.r(0,14,16,2,'t'); d.e(8,4,2,2,'s'); d.p('k',6,3,7,2,8,2,9,2,10,3); d.p('r',10,2); d.r(7,6,3,3,'w'); d.tri(3,8,11,6,'r'); d.p('y',5,12,8,11,11,12); d.l(6,7,3,4,'s'); d.l(10,7,13,4,'s'); d.e(13,3,1.8,1.8,'n'); d.p('y',13,3); d.p('s',6,14,10,14); }, SC);
add(4, 'Nghệ thuật biểu diễn', 'it-cinema', 'Điện ảnh Ý', 'Italian cinema', 'nền điện ảnh có trường phái “tân hiện thực” sau chiến tranh, rồi đến những phim của Federico Fellini như La Dolce Vita. Xưởng phim Cinecittà ở Roma vẫn là trung tâm làm phim lớn.',
  d => { d.bg('A'); d.r(2,7,12,7,'k'); d.r(2,4,12,3,'w'); for(let x=3;x<14;x+=3){ d.p('k',x,4,x+1,5,x+1,6); } d.p('w',4,9,5,9,6,9,8,11,9,11,4,12); d.l(10,9,12,9,'w'); d.e(2,2,1.6,1.6,'k'); d.e(13,2,1.6,1.6,'k'); }, SC);

// ----- Hội họa và kiến trúc -----
add(4, 'Hội họa và kiến trúc', 'it-leonardo', 'Leonardo da Vinci', 'Leonardo da Vinci', 'họa sĩ và nhà phát minh thời Phục hưng, tác giả bức “Mona Lisa” và “Bữa ăn tối cuối cùng”. Ông cũng để lại nhiều bản phác thảo về giải phẫu và máy móc.',
  d => { d.bg('t'); d.r(2,1,12,14,'n'); d.r(3,2,10,12,'G'); d.e(8,6,2.4,2.8,'s'); d.r(5,4,1,7,'N'); d.r(10,4,1,7,'N'); d.r(6,3,4,1,'N'); d.p('k',7,6,9,6); d.p('r',8,8); d.r(5,9,6,5,'N'); d.p('s',7,12,8,12,9,12); }, SC);
add(4, 'Hội họa và kiến trúc', 'it-michelangelo', 'Michelangelo', 'Michelangelo', 'điêu khắc tượng David và vẽ trần đền Sistina ở Vatican. Ông là một trong những nghệ sĩ ảnh hưởng nhất của châu Âu.',
  d => { d.bg('B'); d.e(8,3,2,2,'W'); d.p('a',6,2,7,1,8,1,9,1); d.r(7,5,3,5,'w'); d.l(6,5,5,9,'W'); d.l(10,5,11,3,'W'); d.l(7,10,6,13,'w'); d.l(9,10,10,13,'w'); d.r(4,13,8,3,'a'); d.p('l',8,7); d.p('y',2,2,13,6,3,9); }, SC);
add(4, 'Hội họa và kiến trúc', 'it-botticelli', 'Sandro Botticelli và Raffaello', 'Botticelli and Raphael', 'Botticelli vẽ “Sự ra đời của Venus”, còn Raffaello nổi tiếng với bức “Trường Athens”. Hai bức tranh thể hiện sự hài hòa của hội họa Phục hưng.',
  d => { d.bg('c'); d.r(0,11,16,5,'C'); d.fan(8,15,6,'x'); d.l(8,10,4,14,'w'); d.l(8,10,12,14,'w'); d.l(8,10,8,14,'w'); d.e(8,3,2,2,'s'); d.l(6,2,5,9,'o'); d.l(10,2,12,8,'o'); d.r(6,1,4,1,'o'); d.r(7,5,3,6,'s'); d.p('o',7,8,8,9,9,7); d.p('p',2,3,13,2,3,7); }, SC);
add(4, 'Hội họa và kiến trúc', 'it-caravaggio', 'Caravaggio', 'Caravaggio', 'họa sĩ thời Baroque, nổi tiếng với ánh sáng tương phản mạnh giữa tối và sáng. Tranh của ông thường đưa người dân bình thường vào cảnh tôn giáo.',
  d => { d.bg('i'); d.l(15,0,9,6,'u'); d.l(14,0,8,6,'Y'); d.e(7,7,2.8,3,'s'); d.p('S',5,7,5,8,6,9); d.r(5,3,5,2,'N'); d.p('k',7,7,9,7); d.r(3,10,9,6,'R'); d.p('w',8,10,9,11); d.e(12,12,2,2,'n'); d.p('y',12,10); }, SC);
add(4, 'Hội họa và kiến trúc', 'it-uffizi', 'Bảo tàng Uffizi và Galleria dell’Accademia (Firenze)', 'The Uffizi and the Accademia', 'nơi trưng bày nhiều tác phẩm nổi tiếng của Phục hưng. Đây là điểm phải ghé của nhiều du khách.',
  d => { d.bg('e'); d.r(0,14,16,2,'n'); for(const [x,c] of [[1,'b'],[6,'r'],[11,'G']]){ d.r(x,3,4,6,'Y'); d.r(x+1,4,2,4,c); d.p('s',x+1,5,x+2,5); } d.l(0,11,15,11,'r'); d.p('y',0,10,5,10,10,10,15,10); d.p('k',7,12,7,13,8,12,8,13); d.p('s',7,10,8,10); }, SC);
add(4, 'Hội họa và kiến trúc', 'it-archi-romana', 'Kiến trúc La Mã', 'Roman architecture', 'người La Mã đã dùng bê tông, vòm cuốn và mái vòm để xây đấu trường, cầu cạn và đền thờ. Nhiều công trình vẫn đứng đến ngày nay.',
  d => { d.bg('c'); d.r(0,13,16,3,'C'); d.r(0,3,16,2,'t'); d.r(0,5,16,8,'t'); for(const x of [1,6,11]){ d.r(x,8,4,5,'c'); d.e(x+2,8,2,2,'c'); d.r(x,11,4,2,'c'); } for(let x=1;x<15;x+=3) d.r(x,5,2,1,'N'); d.r(0,4,16,1,'n'); }, SC);
add(4, 'Hội họa và kiến trúc', 'it-barocco', 'Kiến trúc Baroque (Bernini và Borromini)', 'Baroque architecture', 'các nhà thờ và đài phun nước có đường cong mạnh, nhiều điêu khắc và ánh sáng kịch tính ở Roma. Hai nghệ sĩ này thường được nhắc tới như đối thủ.',
  d => { d.bg('c'); d.r(0,14,16,2,'a'); d.r(3,6,10,8,'e'); d.e(8,6,5,2,'t'); d.fan(8,4,2.5,'a'); d.p('y',8,0,8,1); d.l(3,7,1,13,'t'); d.l(12,7,14,13,'t'); for(const x of [4,7,11]) d.r(x,8,1,6,'W'); d.r(7,11,2,3,'N'); d.p('y',5,9,10,9); }, SC);
add(4, 'Hội họa và kiến trúc', 'it-duomo-mi', 'Nhà thờ Duomo ở Milano', 'Milan Cathedral', 'nhà thờ kiểu Gothic lớn, xây hàng thế kỷ với hơn một trăm tháp nhọn. Du khách có thể đi lên mái để ngắm thành phố.',
  d => { d.bg('c'); d.r(0,14,16,2,'a'); d.tri(1,3,14,5,'w'); d.r(1,8,14,6,'W'); for(const x of [1,4,7,8,11,14]){ d.l(x,x===7||x===8?1:4,x,8,'w'); } for(const x of [3,6,9,12]) d.r(x,9,1,4,'a'); d.r(7,11,2,3,'N'); d.p('y',7,0); d.p('a',7,6,8,6); }, SC);

// ----- Văn hóa hiện đại -----
add(4, 'Văn hóa hiện đại', 'it-calcio', 'Bóng đá (calcio)', 'Football (calcio)', 'môn thể thao phổ biến nhất, với giải Serie A cùng những đội như Juventus, AC Milan và Inter. Đội tuyển quốc gia đã bốn lần vô địch World Cup.',
  d => { d.e(8,8,7,7,'w'); d.e(8,8,2.4,2.4,'k'); for(const [x,y] of [[8,1],[2,6],[14,6],[4,13],[12,13]]) d.r(x-1,y,2,2,'k'); d.p('a',8,4,8,5,5,8,11,8,6,11,10,11); }, { use: 'hold' });
add(4, 'Văn hóa hiện đại', 'it-design', 'Thiết kế và ô tô Ý', 'Italian design and sports cars', 'thương hiệu như Ferrari và Lamborghini là biểu tượng của xe thể thao, còn Milano là trung tâm thiết kế nội thất. Tuần lễ thiết kế hằng năm ở Milano thu hút rất nhiều khách.',
  d => { d.r(1,8,14,4,'r'); d.tri(3,4,10,4,'r'); d.r(6,5,5,3,'c'); d.p('w',7,5); d.r(1,9,2,1,'y'); d.r(13,9,2,1,'R'); d.e(4,12,2.2,2.2,'k'); d.e(12,12,2.2,2.2,'k'); d.p('a',3,12,11,12); d.p('y',8,10); }, { use: 'hold' });
add(4, 'Văn hóa hiện đại', 'it-commedia-dante', 'Dante và “Thần khúc”', 'Dante and the Divine Comedy', 'tác phẩm thơ của Dante Alighieri viết vào đầu thế kỷ 14, kể chuyến đi qua địa ngục, luyện ngục và thiên đàng. Việc Dante viết bằng tiếng địa phương Toscana đã góp phần hình thành tiếng Ý chuẩn.',
  d => { d.r(2,3,12,11,'R'); d.r(3,3,10,10,'e'); d.l(8,3,8,13,'n'); for(let y=5;y<12;y+=2){ d.r(4,y,3,1,'a'); d.r(9,y,3,1,'a'); } d.r(2,13,12,2,'R'); d.p('y',8,1,7,2,9,2,8,0); }, { use: 'hold' });
add(4, 'Văn hóa hiện đại', 'it-maneskin', 'Ban nhạc Måneskin', 'The band Måneskin', 'ban rock trẻ đã thắng cuộc thi Eurovision năm 2021, đưa nhạc rock Ý đến khán giả quốc tế. Ban nhạc đến từ Roma.',
  d => { d.e(5,11,4,3.5,'r'); d.e(7,8,2.4,2.4,'r'); d.l(8,8,14,2,'N'); d.l(9,8,15,2,'N'); d.r(13,0,3,3,'k'); d.p('w',4,11,6,10); d.p('k',5,12,6,12); d.l(4,13,12,4,'a'); d.p('y',1,3,2,2,3,3,2,1); }, { use: 'hold' });
