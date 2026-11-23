import { add, SC, setCC } from './pass-kit.js';
setCC('my');
// Malaysia · Nhóm 5: Con vật, linh vật, tín ngưỡng, lịch sử và người nổi tiếng
const G = 5, A = 'Con vật và linh vật', B = 'Tín ngưỡng', C = 'Lịch sử', E = 'Người nổi tiếng';
const PET = { use: 'pet' }, H = { use: 'hold' };
const person = (d, bg, hair, body, skin = 's') => { d.bg(bg); d.e(8, 6, 3, 3.4, skin); d.r(5, 2, 6, 2, hair); d.r(4, 9, 8, 7, body); d.p('k', 7, 6, 9, 6); d.p('r', 8, 8); };

// ----- Con vật và linh vật -----
add(G, A, 'my-tiger', 'Hổ Malaya (Harimau Malaya)', 'Malayan tiger', 'Quốc thú của Malaysia, xuất hiện trên quốc huy và logo nhiều tổ chức. Đây là loài cực kỳ nguy cấp, số cá thể còn rất ít do mất rừng và bị săn trộm.',
  d => { d.bg('G'); d.e(8, 9, 5.4, 5.2, 'o'); d.e(3.5, 4.5, 1.8, 1.8, 'o'); d.e(12.5, 4.5, 1.8, 1.8, 'o'); d.e(8, 11, 3, 2.2, 'e'); d.p('k', 5, 7, 11, 7, 8, 10, 4, 10, 12, 10, 6, 5, 10, 5); d.p('k', 7, 11, 9, 11); d.p('r', 8, 12); }, PET);
add(G, A, 'my-hornbill', 'Chim hồng hoàng (hornbill)', 'Hornbill', 'Người dân Sarawak gọi nơi đây là "xứ sở của chim hồng hoàng". Chim có mỏ lớn và vạch màu, được người Iban tôn kính như biểu tượng của chiến binh và thần linh.',
  d => { d.bg('c'); d.e(7, 9, 4, 4, 'k'); d.e(7, 6, 2.4, 2.4, 'k'); d.l(9, 5, 14, 7, 'y'); d.l(9, 6, 14, 8, 'o'); d.p('r', 10, 4, 11, 4); d.p('w', 3, 11, 5, 13, 4, 8); d.p('k', 6, 5); d.r(6, 12, 1, 3, 'n'); d.r(9, 12, 1, 3, 'n'); }, PET);
add(G, A, 'my-orangutan', 'Đười ươi (orangutan)', 'Orangutan', '"Người của rừng" theo nghĩa tiếng Mã Lai, sống ở Borneo, được chăm sóc tại trung tâm Sepilok ở Sabah. Loài này chậm sinh sản nên rất dễ bị tổn thương.',
  d => { d.bg('G'); d.e(8, 6, 4.6, 4, 'o'); d.e(8, 7, 2.8, 2.8, 'S'); d.p('k', 7, 6, 9, 6); d.p('n', 7, 9, 9, 9); d.r(5, 10, 6, 5, 'O'); d.l(5, 11, 2, 15, 'o'); d.l(11, 11, 14, 15, 'o'); d.p('O', 4, 3, 12, 3); }, PET);
add(G, A, 'my-elephant', 'Voi Á và voi lùn Borneo', 'Asian and Borneo pygmy elephants', 'Voi sống trong rừng ở bán đảo, còn voi nhỏ hơn sống ở Sabah. Khi rừng thu hẹp, voi đôi khi lạc vào vùng trồng cọ dầu và gây xung đột với người dân.',
  d => { d.bg('h'); d.e(7, 8, 5, 5, 'a'); d.e(3, 7, 2.4, 3, 'A'); d.l(10, 8, 12, 14, 'a'); d.l(11, 8, 13, 14, 'a'); d.p('w', 10, 10, 11, 11); d.p('k', 7, 6); d.r(4, 12, 2, 3, 'A'); d.r(7, 12, 2, 3, 'A'); d.p('G', 1, 14, 14, 14); }, PET);
add(G, A, 'my-rhino', 'Tê giác Sumatra', 'Sumatran rhinoceros', 'Loài tê giác hai sừng nhỏ nhất thế giới, được cho là đã tuyệt chủng tại Malaysia khi cá thể cuối cùng chết năm 2019. Đây là một hồi chuông cảnh tỉnh về bảo tồn.',
  d => { d.bg('G'); d.e(8, 9, 6, 4.4, 'n'); d.e(13, 9, 2.6, 3, 'N'); d.tri(13, 4, 2, 4, 'l'); d.tri(11, 6, 2, 3, 'l'); d.p('k', 12, 8, 4, 8, 7, 11); d.p('N', 4, 6, 9, 6, 8, 12); d.r(4, 12, 2, 3, 'N'); d.r(10, 12, 2, 3, 'N'); }, PET);
add(G, A, 'my-turtle', 'Rùa biển', 'Sea turtle', 'Nhiều bãi biển ở Terengganu và quần đảo Turtle ở Sabah là nơi rùa đẻ trứng. Các chương trình bảo tồn đưa trứng vào vườn ươm để thả rùa con về biển.',
  d => { d.bg('C'); d.e(8, 9, 5, 4, 'G'); d.e(8, 9, 3.6, 2.8, 'g'); d.p('h', 6, 8, 10, 8, 8, 10); d.e(14, 8, 1.8, 1.6, 'g'); d.p('k', 14, 8); d.l(4, 12, 2, 14, 'G'); d.l(11, 12, 13, 14, 'G'); d.l(4, 6, 2, 4, 'G'); d.l(11, 6, 13, 4, 'G'); }, PET);
add(G, A, 'my-pangolin', 'Tê tê Malaya (pangolin)', 'Malayan pangolin', 'Loài thú có vảy, cực kỳ nguy cấp vì bị buôn lậu lấy vảy và thịt. Khi gặp nguy hiểm, chúng cuộn tròn thành quả bóng.',
  d => { d.bg('u'); d.e(7, 9, 5, 4, 'n'); for (let x = 3; x < 12; x += 2) for (let y = 6; y < 12; y += 2) d.p('N', x + (y % 4 ? 1 : 0), y); d.e(13, 10, 2, 1.6, 't'); d.p('k', 13, 9); d.l(2, 11, 0, 14, 'n'); d.r(5, 13, 2, 2, 'N'); d.r(9, 13, 2, 2, 'N'); }, PET);
add(G, A, 'my-kancil', 'Kancil (hươu chuột)', 'Kancil (mouse deer)', 'Nhân vật tinh khôn trong truyện dân gian Mã Lai, nhỏ bé nhưng luôn dùng mưu trí vượt qua kẻ mạnh. Truyện kancil được kể cho trẻ em ở nhiều nơi.',
  d => { d.bg('h'); d.e(7, 10, 4, 2.8, 'n'); d.e(11, 7, 2, 2, 'n'); d.p('w', 10, 5, 12, 5); d.p('k', 11, 7); d.l(12, 8, 14, 8, 'N'); d.r(4, 12, 1, 3, 'N'); d.r(9, 12, 1, 3, 'N'); d.p('w', 3, 10, 5, 9, 7, 11, 9, 10); d.p('t', 10, 9); }, PET);
add(G, A, 'my-migratory', 'Chim di cư', 'Migratory birds', 'Rừng ngập mặn và bãi bùn ven biển là nơi dừng chân của nhiều loài chim di cư. Người ngắm chim thường đến đây vào mùa thu đông.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'n'); d.e(7, 8, 3, 2.4, 'w'); d.l(9, 7, 13, 5, 'y'); d.l(5, 8, 1, 5, 'a'); d.l(6, 9, 2, 8, 'A'); d.p('k', 10, 7); d.r(6, 10, 1, 3, 'o'); d.r(8, 10, 1, 3, 'o'); d.p('l', 3, 2, 12, 3, 8, 1); }, PET);

// ----- Tín ngưỡng -----
add(G, B, 'my-islam', 'Hồi giáo (Islam)', 'Islam', 'Tôn giáo chính thức của liên bang, được nhiều người Mã Lai theo, trong khi hiến pháp vẫn bảo đảm quyền tự do tôn giáo cho các cộng đồng khác. Nhiều quy định như thực phẩm halal ảnh hưởng đến đời sống chung.',
  d => { d.bg('G'); d.e(8, 5, 3, 3, 'y'); d.e(9, 5, 2.4, 2.4, 'G'); d.p('y', 11, 3, 12, 4, 11, 5); d.r(4, 9, 8, 7, 'w'); d.e(8, 8, 3, 2.6, 'w'); d.r(7, 11, 2, 5, 'g'); d.r(2, 7, 2, 9, 'W'); d.r(12, 7, 2, 9, 'W'); d.p('y', 3, 6, 13, 6); }, SC);
add(G, B, 'my-chinesefaith', 'Phật giáo và tín ngưỡng Trung Hoa', 'Buddhism and Chinese folk religion', 'Người Hoa thờ Phật, Quan Âm, Tua Pek Kong và tổ tiên, đốt nhang trong đền và ngôi miếu nhỏ. Nhiều gia đình kết hợp cả Phật giáo, Đạo giáo và thờ cúng tổ tiên.',
  d => { d.bg('R'); d.r(3, 9, 10, 6, 'N'); d.tri(2, 4, 12, 5, 'y'); d.r(5, 11, 6, 4, 'k'); d.p('y', 8, 3, 4, 8, 12, 8); d.r(7, 6, 2, 3, 'r'); d.p('w', 7, 1, 9, 0, 8, 2); d.p('o', 5, 14, 11, 14); }, SC);
add(G, B, 'my-datukong', 'Datuk Kong', 'Datuk Kong', 'Vị thần bản địa được người Hoa thờ trong những miếu nhỏ ở gốc cây hoặc ven đường. Đây là ví dụ rõ cho sự pha trộn giữa tín ngưỡng Hoa và Mã Lai.',
  d => { d.bg('G'); d.r(6, 5, 4, 11, 'N'); d.e(8, 4, 6, 3.6, 'g'); d.r(4, 11, 8, 4, 'r'); d.tri(3, 8, 10, 3, 'R'); d.r(6, 12, 4, 3, 'k'); d.p('y', 8, 13, 5, 10, 11, 10); d.p('w', 8, 1); }, SC);
add(G, B, 'my-hindu', 'Ấn Độ giáo', 'Hinduism', 'Do người gốc Ấn mang đến, với nhiều đền thờ thần Murugan, Ganesha và Mariamman. Các lễ như Thaipusam và Deepavali là dịp quan trọng nhất.',
  d => { d.bg('o'); d.e(8, 8, 6, 6, 'y'); d.e(8, 8, 4.6, 4.6, 'o'); d.r(5, 4, 1, 4, 'r'); d.r(5, 4, 3, 1, 'r'); d.r(8, 4, 1, 8, 'r'); d.p('r', 9, 9, 10, 10, 11, 11, 6, 9, 7, 11, 9, 6); d.p('w', 8, 2); }, SC);
add(G, B, 'my-christian', 'Cơ Đốc giáo', 'Christianity', 'Chiếm đa số ở nhiều cộng đồng bản địa Sabah và Sarawak, do các nhà truyền giáo đưa đến từ thế kỷ 19. Nhiều ngôi nhà dài có nhà thờ nhỏ ngay bên cạnh.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(4, 7, 8, 6, 'W'); d.tri(3, 4, 10, 3, 'N'); d.r(7, 9, 2, 4, 'n'); d.l(8, 0, 8, 4, 'w'); d.l(6, 2, 10, 2, 'w'); d.p('c', 5, 9, 10, 9); d.p('G', 1, 12, 14, 12); }, SC);
add(G, B, 'my-animism', 'Tín ngưỡng vạn vật bản địa', 'Indigenous animism', 'Người Iban, Kadazan-Dusun và Orang Asli tin vào linh hồn của rừng, núi và lúa. Các thầy cúng như bobohizan đóng vai trò trung gian với thế giới linh hồn.',
  d => { d.bg('G'); d.r(0, 13, 16, 3, 'N'); d.tri(1, 3, 6, 10, 'g'); d.tri(9, 5, 6, 8, 'g'); d.e(8, 6, 1.6, 1.6, 's'); d.r(6, 8, 4, 5, 'k'); d.p('y', 7, 4, 9, 4, 8, 3); d.p('w', 3, 5, 12, 6, 5, 9, 11, 9); }, SC);
add(G, B, 'my-bomoh', 'Pawang và bomoh', 'Pawang and bomoh', 'Người chữa bệnh truyền thống của người Mã Lai, dùng bùa chú và thảo dược. Vai trò của họ vẫn được nhắc đến trong một số vùng.',
  d => { d.bg('e'); d.e(8, 5, 2.6, 2.6, 's'); d.r(5, 1, 6, 2, 'k'); d.r(5, 8, 6, 6, 'w'); d.p('k', 7, 5, 9, 5); d.p('y', 4, 15, 12, 14); d.e(13, 11, 1.8, 1.6, 'g'); d.p('h', 12, 10, 14, 10); d.p('r', 3, 11, 3, 12); d.p('w', 8, 13); }, SC);
add(G, B, 'my-hungryghost', 'Lễ Vu Lan (Hungry Ghost Festival)', 'Hungry Ghost Festival', 'Tháng bảy âm lịch, người Hoa cúng đồ ăn, đốt giấy tế và có khi tổ chức biểu diễn đường phố. Mục đích là an ủi linh hồn lang thang.',
  d => { d.bg('i'); d.r(0, 13, 16, 3, 'k'); d.r(5, 9, 6, 5, 'R'); d.p('o', 6, 7, 8, 6, 10, 7, 7, 8, 9, 8); d.p('y', 8, 5, 8, 9); d.e(3, 4, 1.8, 2, 'l'); d.e(13, 5, 1.8, 2, 'l'); d.p('k', 3, 4, 13, 5); d.p('w', 2, 7, 14, 8); }, SC);

// ----- Lịch sử -----
add(G, C, 'my-srivijaya', 'Các vương quốc cổ và Srivijaya', 'Early kingdoms and Srivijaya', 'Nhiều cảng và vương quốc nhỏ ở bán đảo chịu ảnh hưởng Ấn Độ giáo và Phật giáo. Di tích khảo cổ ở thung lũng Bujang ở Kedah chứng tỏ sự giao thương sớm.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(4, 6, 8, 6, 't'); d.tri(5, 2, 6, 4, 'n'); d.tri(7, 0, 2, 3, 'N'); d.r(7, 8, 2, 4, 'k'); d.p('w', 1, 14, 12, 15); d.p('y', 8, 0); }, SC);
add(G, C, 'my-sultanate', 'Vương quốc Hồi giáo Melaka (khoảng đầu thế kỷ 15)', 'Melaka Sultanate (early 15th century)', 'Một trung tâm thương mại lớn, thu hút thương nhân Ả Rập, Ấn Độ và Trung Hoa. Đây là nơi Hồi giáo và ngôn ngữ Mã Lai lan tỏa rộng rãi.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.r(3, 9, 10, 2, 'N'); d.l(6, 9, 6, 2, 'n'); d.l(10, 9, 10, 3, 'n'); d.r(3, 2, 7, 5, 'w'); d.r(10, 3, 4, 4, 'W'); d.p('r', 5, 4, 11, 4); d.p('y', 8, 12, 3, 14); d.p('w', 1, 14, 12, 15); }, SC);
add(G, C, 'my-portuguese', 'Bồ Đào Nha chiếm Melaka (1511)', 'Portuguese conquest of Melaka (1511)', 'Afonso de Albuquerque chinh phục thành phố để kiểm soát đường buôn gia vị. Đây là một trong những bước đầu tiên của châu Âu tại Đông Nam Á.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(3, 10, 10, 2, 'N'); d.l(8, 10, 8, 3, 'n'); d.tri(4, 2, 4, 6, 'w'); d.tri(9, 3, 4, 5, 'w'); d.p('r', 6, 4, 11, 5); d.p('B', 4, 7, 13, 8); d.p('w', 1, 14, 12, 15); }, SC);
add(G, C, 'my-dutchbritish', 'Hà Lan và Anh', 'The Dutch and the British', 'Hà Lan thay Bồ Đào Nha năm 1641, sau đó Anh mở rộng ảnh hưởng từ Penang, Singapore và Melaka. Anh dần thành lập các bang bảo hộ trên bán đảo.',
  d => { d.bg('e'); d.r(0, 0, 16, 6, 'o'); d.r(0, 6, 16, 5, 'w'); d.r(0, 11, 16, 5, 'b'); d.e(4, 8, 2, 2, 'r'); d.r(2, 12, 12, 2, 'R'); d.p('w', 3, 13, 6, 13); d.p('y', 8, 3, 12, 8); }, SC);
add(G, C, 'my-tinrubber', 'Ngành thiếc và cao su thời thuộc địa', 'Colonial tin and rubber industries', 'Người Hoa đến khai mỏ thiếc, người Ấn đến làm đồn điền cao su. Hệ quả là cơ cấu dân cư đa sắc tộc như ngày nay.',
  d => { d.bg('u'); d.r(0, 10, 16, 6, 'n'); d.r(1, 11, 5, 3, 'a'); d.r(2, 10, 3, 1, 'l'); d.r(7, 2, 2, 12, 'N'); d.p('w', 9, 6, 9, 8); d.r(9, 7, 2, 2, 'a'); d.l(12, 4, 14, 14, 'N'); d.p('G', 11, 3, 13, 2, 14, 3); d.p('y', 4, 12, 6, 12); }, SC);
add(G, C, 'my-brooke', 'Nhà Brooke ở Sarawak (1841–1946)', 'The Brookes of Sarawak (1841–1946)', 'Một dòng họ người Anh cai trị Sarawak với tư cách "Rajah Trắng". Sarawak sau đó trở thành thuộc địa của Anh.',
  d => { d.bg('G'); d.r(0, 13, 16, 3, 'C'); d.e(8, 5, 2.6, 2.6, 's'); d.r(5, 1, 6, 2, 'w'); d.r(5, 8, 6, 6, 'w'); d.p('k', 7, 5, 9, 5); d.p('y', 7, 9, 8, 11, 9, 9); d.p('r', 8, 7); d.l(12, 5, 12, 12, 'N'); d.r(12, 5, 3, 2, 'r'); }, SC);
add(G, C, 'my-japanese', 'Nhật chiếm đóng (1941–1945)', 'Japanese occupation (1941–1945)', 'Nhật chiếm Malaya và Borneo trong Thế chiến II, để lại ký ức nặng nề. Sau chiến tranh, phong trào đòi độc lập dần lớn mạnh.',
  d => { d.bg('A'); d.r(0, 12, 16, 4, 'K'); d.r(5, 8, 6, 4, 'a'); d.r(8, 5, 1, 3, 'a'); d.r(4, 4, 8, 1, 'w'); d.e(8, 4, 2, 2, 'w'); d.e(8, 4, 1.4, 1.4, 'r'); d.p('y', 2, 2, 14, 3); d.p('k', 3, 14, 12, 14); }, SC);
add(G, C, 'my-emergency', 'Tình trạng khẩn cấp Malaya (1948–1960)', 'The Malayan Emergency (1948–1960)', 'Cuộc chống đối du kích cộng sản kéo dài nhiều năm. Anh và chính quyền Malaya cuối cùng giành thắng lợi.',
  d => { d.bg('G'); d.r(0, 12, 16, 4, 'N'); for (const x of [2, 6, 10]) { d.r(x, 3, 2, 9, 'n'); d.e(x + 1, 3, 2.4, 2.4, 'g'); } d.e(12, 8, 1.4, 1.4, 's'); d.r(11, 9, 3, 4, 'g'); d.l(14, 9, 15, 4, 'a'); d.p('k', 3, 13, 9, 14); }, SC);
add(G, C, 'my-independence', 'Độc lập (31 tháng 8 năm 1957)', 'Independence (31 August 1957)', 'Malaya trở thành quốc gia độc lập dưới sự lãnh đạo của Tunku Abdul Rahman. Cuộc đàm phán diễn ra chủ yếu bằng đối thoại.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.l(4, 2, 4, 13, 'w'); for (let i = 0; i < 6; i++) d.r(5, 2 + i, 9, 1, i % 2 ? 'w' : 'r'); d.r(5, 2, 4, 3, 'B'); d.p('y', 7, 3); d.e(11, 11, 1.6, 1.6, 's'); d.r(10, 12, 3, 3, 'w'); }, SC);
add(G, C, 'my-malaysia63', 'Thành lập Malaysia (16 tháng 9 năm 1963)', 'Formation of Malaysia (16 September 1963)', 'Malaya hợp nhất với Sabah, Sarawak và Singapore, sau đó Singapore tách ra năm 1965. Đây là nền tảng của liên bang hiện nay.',
  d => { d.bg('B'); d.r(0, 5, 16, 6, 'w'); for (let i = 0; i < 3; i++) d.r(0, 5 + i * 2, 16, 1, 'r'); d.r(0, 5, 7, 4, 'B'); d.e(3, 7, 1.6, 1.6, 'y'); d.p('y', 11, 13, 4, 14, 14, 3, 2, 3); }, SC);
add(G, C, 'my-nep', 'Chính sách kinh tế mới và hiện đại hóa', 'New Economic Policy and modernisation', 'Từ thập niên 1970, Malaysia theo đuổi tăng trưởng và thu hẹp khoảng cách giữa các nhóm dân tộc. Nền kinh tế chuyển dần sang công nghiệp và dịch vụ.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(1, 8, 4, 6, 'A'); d.r(6, 5, 3, 9, 'K'); d.r(10, 9, 5, 5, 'a'); d.l(3, 6, 14, 2, 'G'); d.l(3, 6, 8, 3, 'g'); d.p('y', 2, 9, 7, 7, 12, 11, 8, 10); d.p('g', 1, 15, 14, 15); }, SC);

// ----- Người nổi tiếng -----
add(G, E, 'my-parameswara', 'Parameswara', 'Parameswara', 'Người được cho là sáng lập ra Melaka khoảng đầu thế kỷ 15. Nhiều chi tiết về cuộc đời ông còn màu sắc truyền thuyết.',
  d => { person(d, 'B', 'k', 'y'); d.r(4, 1, 8, 2, 'r'); d.p('y', 8, 0); d.p('Y', 5, 12, 10, 12); d.p('k', 6, 8, 10, 8); }, SC);
add(G, E, 'my-hangtuah', 'Hang Tuah', 'Hang Tuah', 'Chiến binh nổi tiếng của Melaka trong truyền thuyết, biểu tượng của lòng trung thành. Các nhà sử học vẫn tranh luận về mức độ có thật.',
  d => { person(d, 'G', 'k', 'r'); d.r(4, 1, 8, 2, 'k'); d.p('y', 6, 12, 9, 13); d.l(12, 6, 12, 14, 'a'); d.p('Y', 12, 14); d.p('k', 6, 8, 10, 8); }, SC);
add(G, E, 'my-tunku', 'Tunku Abdul Rahman', 'Tunku Abdul Rahman', 'Thủ tướng đầu tiên, được gọi là "Cha của Độc lập". Ông đọc diễn văn tuyên bố độc lập tại Sân vận động Merdeka năm 1957.',
  d => { person(d, 'c', 'a', 'w'); d.r(4, 1, 8, 2, 'k'); d.p('k', 6, 8, 10, 8); d.p('y', 8, 10); d.l(13, 2, 13, 14, 'w'); d.r(13, 2, 3, 2, 'r'); }, SC);
add(G, E, 'my-razak', 'Tun Abdul Razak', 'Tun Abdul Razak', 'Thủ tướng thứ hai, gắn với kế hoạch phát triển nông thôn và Chính sách kinh tế mới. Ông được nhớ đến như "Cha của Phát triển".',
  d => { person(d, 'h', 'k', 'A'); d.r(4, 1, 8, 2, 'k'); d.p('w', 8, 10); d.p('a', 6, 8, 10, 8); d.r(11, 11, 4, 4, 'g'); d.p('y', 12, 12); }, SC);
add(G, E, 'my-pramlee', 'P. Ramlee', 'P. Ramlee', 'Nghệ sĩ đa tài, nhạc sĩ và đạo diễn phim (đã kể ở Nhóm 4). Các tác phẩm của ông vẫn được nhắc đến mỗi dịp lễ.',
  d => { person(d, 'k', 'k', 'w'); d.r(4, 1, 8, 2, 'k'); d.p('r', 8, 10); d.r(10, 10, 4, 5, 'a'); d.e(12, 12, 1.4, 1.4, 'l'); d.p('y', 3, 3, 13, 3); }, SC);
add(G, E, 'my-yeoh', 'Michelle Yeoh', 'Michelle Yeoh', 'Diễn viên sinh ở Ipoh, nổi tiếng quốc tế nhờ phim hành động và giành giải Oscar Nữ diễn viên chính xuất sắc năm 2023. Bà là người châu Á đầu tiên nhận giải này.',
  d => { person(d, 'y', 'k', 'r'); d.r(3, 3, 2, 8, 'k'); d.r(11, 3, 2, 8, 'k'); d.p('r', 8, 8); d.r(12, 10, 2, 5, 'Y'); d.e(13, 9, 1.4, 1.4, 'y'); d.p('w', 2, 2, 14, 2); }, SC);
add(G, E, 'my-jimmychoo', 'Jimmy Choo', 'Jimmy Choo', 'Nhà thiết kế giày sinh ở Penang, để lại tên tuổi trên thế giới thời trang. Thương hiệu mang tên ông là biểu tượng của giày cao gót sang trọng.',
  d => { d.bg('p'); d.r(3, 3, 3, 8, 'k'); d.r(3, 10, 9, 3, 'k'); d.r(3, 13, 9, 1, 'r'); d.r(10, 6, 2, 8, 'k'); d.p('y', 4, 5, 4, 7); d.p('R', 2, 13, 11, 13); d.p('w', 5, 3); }, SC);
add(G, E, 'my-leechongwei', 'Lee Chong Wei', 'Lee Chong Wei', 'Tay cầu lông từng đứng đầu thế giới nhiều năm và giành nhiều huy chương Olympic. Ông được xem là anh hùng thể thao của đất nước.',
  d => { person(d, 'g', 'k', 'r'); d.r(4, 1, 8, 2, 'k'); d.l(13, 14, 11, 5, 'n'); d.e(11, 4, 2, 1.6, 'w'); d.p('y', 6, 12, 9, 12); d.p('w', 8, 10); }, H);
add(G, E, 'my-nicol', 'Nicol David', 'Nicol David', 'Vận động viên squash nữ giữ ngôi số một thế giới trong thời gian rất dài, gây ấn tượng mạnh với khán giả trong nước.',
  d => { person(d, 'w', 'k', 'b'); d.r(4, 1, 8, 2, 'k'); d.r(3, 3, 2, 6, 'k'); d.l(13, 14, 11, 6, 'a'); d.e(11, 5, 2, 1.6, 'y'); d.p('w', 6, 12, 9, 12); }, SC);
add(G, E, 'my-siti', 'Siti Nurhaliza', 'Siti Nurhaliza', 'Ca sĩ nữ được nhiều người gọi là nữ hoàng nhạc pop Mã Lai, với giọng hát êm và rất nhiều giải thưởng.',
  d => { person(d, 'v', 'p', 'P'); d.r(4, 2, 8, 3, 'p'); d.r(5, 8, 6, 1, 'p'); d.p('w', 8, 8); d.p('y', 12, 2, 3, 3); d.r(11, 11, 1, 4, 'a'); d.e(11, 10, 1.4, 1.4, 'a'); }, SC);
add(G, E, 'my-yasmin', 'Yasmin Ahmad', 'Yasmin Ahmad', 'Đạo diễn phim và quảng cáo, nổi tiếng với những tác phẩm đề cao sự thấu hiểu giữa các sắc tộc. Nhiều câu chuyện của bà khiến khán giả xúc động.',
  d => { person(d, 'e', 'p', 'v'); d.r(4, 2, 8, 3, 'p'); d.p('k', 6, 6, 10, 6); d.r(11, 10, 4, 5, 'k'); d.p('w', 12, 11, 13, 12); d.p('y', 2, 3); }, SC);
add(G, E, 'my-lat', 'Lat (Mohammad Nor Khalid)', 'Lat (Mohammad Nor Khalid)', 'Họa sĩ biếm họa, kể những chuyện đời thường ở làng quê và thành phố bằng nét vẽ dí dỏm. Tác phẩm Kampung Boy được dịch ra nhiều thứ tiếng.',
  d => { d.bg('u'); d.e(8, 7, 4, 4, 'e'); d.p('k', 6, 7, 10, 7, 8, 9, 7, 5, 9, 5); d.e(8, 3, 3, 1.4, 'k'); d.r(4, 11, 8, 4, 'g'); d.l(2, 14, 6, 11, 'n'); d.p('N', 2, 14); d.p('r', 8, 8); }, H);
