import { add, SC, setCC } from './pass-kit.js';
setCC('ly');
// Libya · Nhóm 5: Con vật, linh vật, tín ngưỡng, lịch sử, người nổi tiếng
const G = 5, A = 'Con vật và linh vật', B = 'Tín ngưỡng và phong tục', C = 'Lịch sử', E = 'Người nổi tiếng';
const PET = { use: 'pet' }, H = { use: 'hold' };
const person = (d, bg, hair, body, skin = 's') => { d.bg(bg); d.e(8, 6, 3, 3.4, skin); d.r(5, 2, 6, 2, hair); d.r(4, 9, 8, 7, body); d.p('k', 7, 6, 9, 6); d.p('r', 8, 8); };

// ----- Con vật và linh vật -----
add(G, A, 'ly-camel', 'Lạc đà một bướu (dromedary)', 'Dromedary camel', 'Loài vật gắn liền với sa mạc, chịu khát tốt và mang hàng cho các đoàn buôn xuyên Sahara. Người Bedouin dùng cả sữa, thịt và lông của nó.',
  d => { d.bg('c'); d.e(7, 9, 4.6, 3, 'o'); d.e(6, 5, 2, 2.2, 'O'); d.l(11, 7, 13, 3, 'o'); d.e(13, 3, 1.6, 1.2, 'o'); d.p('k', 13, 3); d.r(4, 11, 1, 4, 'O'); d.r(9, 11, 1, 4, 'O'); d.p('N', 2, 8, 3, 7); d.p('y', 6, 8, 8, 8); }, PET);
add(G, A, 'ly-fennec', 'Cáo fennec', 'Fennec fox', 'Cáo nhỏ tai rất to, sống ở Sahara, tai giúp tản nhiệt và nghe con mồi dưới cát. Nó hoạt động vào ban đêm để tránh nắng nóng.',
  d => { d.bg('c'); d.e(8, 11, 4.4, 3.6, 'u'); d.e(8, 9, 3.4, 3, 'u'); d.tri(2, 0, 4, 8, 'u'); d.tri(10, 0, 4, 8, 'u'); d.tri(3, 2, 2, 5, 'x'); d.tri(11, 2, 2, 5, 'x'); d.p('k', 6, 9, 10, 9, 8, 11); d.r(7, 10, 2, 1, 'w'); d.r(4, 13, 2, 2, 'y'); d.r(10, 13, 2, 2, 'y'); }, PET);
add(G, A, 'ly-saluki', 'Chó saluki', 'Saluki dog', 'Giống chó săn mảnh khảnh, chạy nhanh, được người Bedouin trân trọng và thường không bán. Người ta xem nó như một thành viên gia đình.',
  d => { d.bg('u'); d.e(7, 9, 4.6, 2.6, 't'); d.e(12, 6, 2, 2, 't'); d.l(13, 7, 15, 8, 'T'); d.e(10, 5, 1, 2.4, 'N'); d.p('k', 13, 5); d.r(4, 11, 1, 4, 't'); d.r(8, 11, 1, 4, 't'); d.l(2, 8, 0, 11, 't'); d.p('w', 6, 9, 9, 9); }, PET);
add(G, A, 'ly-aoudad', 'Cừu núi Barbary (aoudad)', 'Barbary sheep (aoudad)', 'Loài cừu hoang có sừng cong, sống trên vùng núi đá khô. Nó thích nghi tốt với khí hậu khắc nghiệt và ít nước.',
  d => { d.bg('u'); d.e(8, 10, 4.6, 3.4, 'O'); d.e(11, 6, 2.2, 2.2, 'O'); d.l(10, 4, 8, 1, 'W'); d.l(8, 1, 6, 3, 'W'); d.l(11, 4, 12, 1, 'W'); d.p('k', 12, 6); d.r(5, 12, 1, 3, 'N'); d.r(10, 12, 1, 3, 'N'); d.p('y', 7, 9, 5, 9); d.p('o', 11, 8); }, PET);
add(G, A, 'ly-barb', 'Ngựa Barb', 'Barb horse', 'Giống ngựa bền bỉ, nhỏ và nhanh, được nuôi ở Bắc Phi từ lâu. Nó là tổ tiên của nhiều giống ngựa châu Âu.',
  d => { d.bg('c'); d.e(7, 9, 4.6, 3, 'n'); d.l(11, 7, 13, 3, 'n'); d.e(13, 3, 1.8, 1.4, 'n'); d.l(10, 5, 10, 8, 'N'); d.p('k', 13, 3); d.r(4, 11, 1, 4, 'N'); d.r(9, 11, 1, 4, 'N'); d.l(2, 8, 1, 12, 'N'); d.p('w', 14, 4); }, PET);
add(G, A, 'ly-turtle', 'Rùa biển và chim di cư ven biển', 'Sea turtles and migrating shorebirds', 'Bờ biển Libya là nơi rùa biển đẻ trứng và chim di cư dừng chân giữa châu Âu và châu Phi. Các đầm nước mặn là điểm nghỉ quan trọng.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.r(0, 13, 16, 3, 'u'); d.e(6, 12, 3.2, 2, 'G'); d.e(6, 12, 2.2, 1.2, 'g'); d.e(10, 12, 1.2, 1, 'G'); d.p('G', 3, 14, 9, 14); d.p('w', 3, 3, 4, 2, 10, 4, 11, 3, 7, 5); d.p('w', 5, 6, 12, 5); }, SC);
add(G, A, 'ly-lion', 'Sư tử trong biểu tượng', 'The lion as a symbol', '"Sư tử sa mạc" là biệt danh của Omar Mukhtar, và hình ảnh sư tử xuất hiện trong nhiều tác phẩm và cờ hiệu của các phong trào. Sư tử Barbary từng sống ở Bắc Phi nhưng đã bị diệt chủng ngoài tự nhiên.',
  d => { d.bg('u'); d.e(8, 8, 6, 6, 'O'); d.e(8, 8, 4, 4, 'o'); d.p('k', 6, 7, 10, 7); d.r(7, 9, 2, 2, 'x'); d.p('k', 8, 9, 7, 11, 9, 11); d.p('N', 3, 5, 13, 5, 2, 9, 14, 9, 4, 12, 12, 12); d.e(4, 4, 1.4, 1.4, 'o'); d.e(12, 4, 1.4, 1.4, 'o'); }, PET);

// ----- Tín ngưỡng và phong tục -----
add(G, B, 'ly-maliki', 'Đạo Hồi Sunni (trường phái Maliki)', 'Sunni Islam (Maliki school)', 'Phần lớn người dân theo trường phái Maliki, phổ biến ở Bắc và Tây Phi. Nhiều người Berber ở miền núi Nafusa lại theo trường phái Ibadi.',
  d => { d.bg('G'); d.e(8, 8, 3, 3, 'y'); d.e(9.2, 8, 2.6, 2.6, 'G'); d.p('y', 11, 7, 11, 6); d.r(1, 13, 14, 3, 'g'); d.e(4, 11, 2, 2, 'w'); d.r(3, 12, 3, 1, 'w'); d.l(4, 9, 4, 10, 'y'); }, SC);
add(G, B, 'ly-pillars', 'Năm trụ cột Hồi giáo', 'The five pillars of Islam', 'Gồm đức tin, cầu nguyện năm lần mỗi ngày, bố thí, nhịn ăn Ramadan và hành hương. Những điều này định hình nhịp sống hằng ngày, ví dụ giờ làm việc được chỉnh trong Ramadan.',
  d => { d.bg('B'); for (let i = 0; i < 5; i++) { d.r(1 + i * 3, 5, 2, 8, i % 2 ? 'e' : 'W'); d.r(i * 3, 4, 4, 1, 'y'); d.r(i * 3, 13, 4, 1, 'y'); } d.e(8, 2, 1.4, 1.4, 'y'); d.p('w', 2, 1, 14, 1); }, SC);
add(G, B, 'ly-hospitality', 'Truyền thống hiếu khách', 'Tradition of hospitality', 'Khách luôn được mời trà, cà phê và thức ăn, kể cả khi gia chủ không dư dả. Đây là giá trị chủ đạo ở cả đô thị và sa mạc.',
  d => { d.bg('u'); d.r(0, 12, 16, 4, 'r'); d.r(0, 12, 16, 1, 'R'); d.e(4, 6, 1.4, 1.4, 's'); d.r(3, 8, 3, 4, 'w'); d.e(12, 6, 1.4, 1.4, 's'); d.r(11, 8, 3, 4, 'b'); d.e(8, 10, 2, 1.4, 'a'); d.r(7, 8, 2, 2, 'a'); d.p('o', 8, 11); d.p('c', 7, 12, 9, 12); }, SC);
add(G, B, 'ly-senussi', 'Phong tục Senussi (Sufi)', 'Senussi (Sufi) tradition', 'Trường phái Sufi do Muhammad ibn Ali as-Senussi sáng lập năm 1837, có ảnh hưởng lớn ở miền đông. Các zawiya (nhà dòng) của họ vừa là nơi cầu nguyện vừa là trường học và trạm dừng chân.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.r(3, 6, 10, 7, 'w'); d.e(8, 6, 4, 3, 'W'); d.l(8, 2, 8, 3, 'y'); d.r(7, 9, 2, 4, 'N'); d.p('G', 4, 8, 11, 8); d.p('g', 5, 10, 10, 10); d.p('a', 1, 14, 14, 14); }, SC);
add(G, B, 'ly-khamsaeye', 'Tin vào "con mắt xấu" và bàn tay Khamsa', 'The evil eye and the Khamsa hand', 'Người ta tin một số ánh nhìn ghen tị có thể mang vận xui. Bàn tay Khamsa và hạt xanh dương được dùng để bảo vệ.',
  d => { d.bg('e'); d.r(5, 7, 6, 7, 'b'); for (const x of [5, 7, 9]) d.r(x, 3 + (x === 7 ? 0 : 1), 1, 4, 'b'); d.r(11, 6, 1, 3, 'b'); d.r(3, 9, 2, 3, 'b'); d.e(8, 10, 2.2, 2.2, 'w'); d.e(8, 10, 1.4, 1.4, 'c'); d.p('k', 8, 10); }, SC);
add(G, B, 'ly-marabout', 'Thăm đền thờ các vị thánh địa phương', 'Visiting local saints\' shrines', 'Nhiều làng có mộ người được kính trọng gọi là marabout. Dân đến cầu nguyện và mang quà, dù quan điểm về phong tục này khác nhau giữa các nhóm.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.r(4, 8, 8, 5, 'w'); d.e(8, 8, 4, 3.4, 'w'); d.l(8, 4, 8, 5, 'y'); d.r(7, 10, 2, 3, 'N'); d.p('G', 2, 12, 13, 12); d.p('y', 3, 14, 12, 14); }, SC);

// ----- Lịch sử -----
add(G, C, 'ly-garamantes', 'Người Garamantes', 'The Garamantes', 'Nền văn minh sa mạc ở Fezzan thời cổ đại, xây hệ thống đường hầm dẫn nước ngầm gọi là foggara. Họ buôn bán xuyên Sahara và từng có thủ đô Germa.',
  d => { d.bg('u'); d.r(0, 10, 16, 6, 'y'); d.r(0, 9, 16, 1, 'Y'); for (const x of [3, 8, 13]) { d.r(x - 1, 8, 3, 1, 'N'); d.r(x, 11, 1, 3, 'b'); } d.l(3, 14, 13, 14, 'b'); d.r(5, 3, 6, 5, 'e'); d.p('k', 7, 5, 9, 5); d.p('G', 1, 6, 14, 6); }, SC);
add(G, C, 'ly-phoenicia', 'Phoenicia, Hy Lạp và Carthage', 'Phoenicians, Greeks and Carthage', 'Người Phoenicia lập các thương điếm ở Tripolitania, trong khi người Hy Lạp lập Cyrene ở miền đông. Ba thành phố Oea, Sabratha và Leptis chính là gốc của tên gọi Tripolis ("ba thành phố").',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.r(5, 5, 6, 5, 'N'); d.tri(4, 1, 8, 5, 'r'); d.l(8, 1, 8, 5, 'w'); d.p('w', 3, 12, 8, 13, 12, 12); d.r(3, 9, 10, 1, 'n'); d.p('y', 8, 2); }, SC);
add(G, C, 'ly-roman', 'Thời La Mã', 'Roman era', 'Sau khi Carthage sụp đổ, vùng đất này dần thuộc La Mã và giàu lên nhờ dầu ô liu và ngũ cốc. Leptis Magna trở thành một trong những thành phố giàu có nhất Bắc Phi.',
  d => { d.bg('r'); d.r(0, 12, 16, 4, 'R'); d.r(3, 4, 2, 8, 'y'); d.r(11, 4, 2, 8, 'y'); d.e(8, 5, 5, 4, 'y'); d.e(8, 6, 3.2, 3, 'r'); d.r(3, 3, 10, 1, 'Y'); d.p('w', 8, 4, 7, 8, 9, 8); }, SC);
add(G, C, 'ly-arab', 'Chinh phục của người Ả Rập (thế kỷ 7)', 'The Arab conquest (7th century)', 'Sau năm 642, đạo Hồi và tiếng Ả Rập lan vào vùng này. Nhiều nhóm Berber dần theo đạo Hồi và hòa nhập vào xã hội mới.',
  d => { d.bg('G'); d.r(0, 12, 16, 4, 'u'); d.e(8, 8, 2, 2.4, 'o'); d.r(7, 9, 2, 4, 'N'); d.l(8, 4, 8, 8, 'N'); d.tri(8, 2, 6, 3, 'w'); d.r(8, 2, 1, 6, 'W'); d.p('y', 3, 3, 13, 5, 2, 7); d.p('w', 2, 13, 13, 14); }, SC);
add(G, C, 'ly-ottomanera', 'Ottoman và các nước cướp biển', 'Ottomans and the Barbary states', 'Từ thế kỷ 16, Ottoman cai trị Tripoli, và vùng bờ biển trở thành nơi hoạt động của các nước cướp biển Barbary. Gia tộc Karamanli cai trị Tripoli khá độc lập từ 1711 đến 1835.',
  d => { d.bg('r'); d.e(5, 8, 3.4, 3.4, 'w'); d.e(6.4, 8, 2.8, 2.8, 'r'); d.p('w', 9, 6, 10, 7, 9, 8, 11, 8, 10, 9); d.r(2, 13, 12, 2, 'N'); d.tri(2, 12, 4, 1, 'k'); }, SC);
add(G, C, 'ly-barbarywar', 'Chiến tranh Barbary với Mỹ (1801–1805)', 'The Barbary War with the US (1801–1805)', 'Mỹ giao tranh với Tripoli vì đòi bồi thường cho tàu thương mại. Trận này còn được nhắc trong lời hát của Thủy quân lục chiến Mỹ với cụm "bờ biển Tripoli".',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(3, 9, 10, 2, 'N'); d.l(5, 9, 5, 2, 'n'); d.l(10, 9, 10, 3, 'n'); d.tri(3, 3, 4, 5, 'w'); d.tri(8, 3, 5, 6, 'w'); d.p('r', 4, 4, 9, 4); d.p('b', 3, 3, 8, 3); d.p('w', 2, 13, 8, 14, 13, 13); }, SC);
add(G, C, 'ly-italyoccup', 'Ý chiếm đóng (1911–1943)', 'Italian occupation (1911–1943)', 'Ý xâm chiếm Libya từ 1911 và gặp kháng cự kéo dài, nhất là ở miền đông. Thời kỳ này để lại nhiều tổn thương lâu dài trong ký ức dân tộc.',
  d => { d.bg('u'); d.r(1, 3, 4, 10, 'g'); d.r(5, 3, 6, 10, 'w'); d.r(11, 3, 4, 10, 'r'); d.p('K', 2, 14, 13, 14); d.l(0, 15, 15, 15, 'N'); }, SC);
add(G, C, 'ly-independence2', 'Độc lập 1951 và thời kỳ dầu mỏ', 'Independence 1951 and the oil era', 'Libya giành độc lập ngày 24 tháng 12 năm 1951 dưới đức vua Idris I. Việc phát hiện dầu mỏ năm 1959 đã thay đổi nền kinh tế đất nước.',
  d => { d.bg('u'); d.r(0, 12, 16, 4, 'y'); d.l(4, 12, 8, 3, 'k'); d.l(12, 12, 8, 3, 'k'); d.r(6, 3, 4, 2, 'k'); d.l(8, 5, 8, 12, 'K'); d.e(8, 13, 4, 1.2, 'k'); d.p('k', 6, 14, 10, 14); d.r(7, 7, 2, 1, 'a'); }, SC);
add(G, C, 'ly-1969', 'Những biến động 1969 và 2011', 'The upheavals of 1969 and 2011', 'Năm 1969 quân đội lật đổ vua Idris, và năm 2011 cuộc nổi dậy dẫn đến sự sụp đổ của chính quyền cũ. Từ đó đất nước trải qua nhiều năm bất ổn và chia rẽ.',
  d => { d.bg('K'); d.r(0, 12, 16, 4, 'k'); d.r(1, 4, 14, 3, 'r'); d.r(1, 7, 14, 4, 'k'); d.r(1, 11, 14, 3, 'g'); d.e(7, 9, 2, 2, 'w'); d.e(8, 9, 1.6, 1.6, 'k'); d.p('w', 10, 9); d.p('a', 4, 2, 11, 2); }, SC);

// ----- Người nổi tiếng -----
add(G, E, 'ly-severus', 'Septimius Severus', 'Septimius Severus', 'Hoàng đế La Mã sinh ở Leptis Magna, cầm quyền từ năm 193 đến 211. Ông là hoàng đế đầu tiên có gốc châu Phi.',
  d => { person(d, 'r', 'a', 'R'); d.r(4, 2, 8, 1, 'G'); d.p('g', 5, 2, 7, 1, 9, 1, 11, 2); d.p('a', 5, 8, 10, 8); d.p('y', 8, 12, 6, 11, 10, 11); }, SC);
add(G, E, 'ly-mukhtar', 'Omar Mukhtar', 'Omar Mukhtar', 'Nhà lãnh đạo kháng chiến chống Ý, biệt danh "Sư tử sa mạc". Người dân Libya xem ông là anh hùng dân tộc.',
  d => { person(d, 'u', 'w', 'w'); d.r(4, 2, 8, 3, 'w'); d.p('w', 3, 3, 12, 3, 4, 5, 11, 5); d.p('a', 6, 9, 9, 9); d.l(13, 4, 13, 14, 'n'); d.p('y', 13, 3); }, SC);
add(G, E, 'ly-idris', 'Vua Idris I', 'King Idris I', 'Người đứng đầu giáo phái Senussi và trở thành quốc vương đầu tiên của Libya độc lập. Ông bị lật đổ năm 1969.',
  d => { person(d, 'G', 'w', 'e'); d.r(4, 2, 8, 2, 'w'); d.r(3, 3, 10, 1, 'r'); d.p('y', 8, 1, 6, 0, 10, 0); d.p('a', 5, 8, 10, 8); d.p('y', 7, 12, 8, 12, 9, 12); }, SC);
add(G, E, 'ly-gaddafi', 'Muammar Gaddafi', 'Muammar Gaddafi', 'Lãnh đạo cầm quyền từ 1969 đến 2011, một nhân vật gây tranh cãi, bị giết năm 2011. Quan điểm về ông khác nhau rất nhiều giữa người Libya và quốc tế.',
  d => { person(d, 'K', 'k', 'N'); d.r(4, 2, 8, 2, 'k'); d.r(4, 6, 3, 2, 'k'); d.r(9, 6, 3, 2, 'k'); d.p('a', 5, 6, 10, 6); d.p('Y', 7, 12, 9, 12); }, SC);
add(G, E, 'ly-alkoni', 'Ibrahim al-Koni', 'Ibrahim al-Koni', 'Nhà văn người Tuareg viết tiếng Ả Rập, nổi tiếng với tiểu thuyết về sa mạc. Nhiều tác phẩm được dịch sang tiếng Anh.',
  d => { person(d, 'u', 'b', 'b'); d.r(4, 2, 8, 3, 'b'); d.r(4, 6, 8, 2, 'b'); d.p('c', 5, 3, 10, 3); d.p('k', 7, 7, 9, 7); d.r(11, 11, 4, 4, 'o'); d.r(11, 11, 4, 1, 'y'); }, SC);
add(G, E, 'ly-matar2', 'Hisham Matar', 'Hisham Matar', 'Nhà văn gốc Libya, đoạt giải Pulitzer năm 2017 cho tác phẩm "The Return". Ông viết về gia đình, lưu vong và quê hương.',
  d => { person(d, 'P', 'k', 'K'); d.r(7, 9, 2, 3, 'w'); d.r(10, 11, 4, 4, 'N'); d.r(10, 11, 4, 1, 'y'); d.e(13, 3, 1.4, 1.4, 'y'); d.p('Y', 13, 3); }, SC);
add(G, E, 'ly-eratosthenes', 'Synesius của Cyrene và Eratosthenes', 'Synesius of Cyrene and Eratosthenes', 'Eratosthenes, sinh ở Cyrene, là người đầu tiên ước tính chu vi Trái đất khá chính xác. Synesius là giám mục và triết gia thời hậu La Mã.',
  d => { d.bg('c'); d.e(5, 8, 4, 4, 'C'); d.e(5, 8, 4, 4, 'g'); d.p('c', 4, 7, 6, 9, 3, 9); d.l(5, 3, 5, 13, 'k'); d.l(1, 8, 9, 8, 'k'); d.e(12, 6, 1.2, 1.4, 's'); d.r(10, 8, 4, 6, 'w'); d.p('k', 12, 6); d.l(11, 4, 14, 4, 'y'); }, SC);
