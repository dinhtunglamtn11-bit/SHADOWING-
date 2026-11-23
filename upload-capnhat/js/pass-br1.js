import { add, SC, setCC } from './pass-kit.js';
setCC('br');
// Brasil · Nhóm 1: Nơi chốn và thiên nhiên
const G = 1, A = 'Địa danh', B = 'Mùa và thiên nhiên', C = 'Vùng miền', E = 'Hiện tượng đặc biệt';

// ----- Địa danh -----
add(G, A, 'br-rio', 'Rio de Janeiro (Thành phố Kỳ diệu)', 'Rio de Janeiro (Marvelous City)', 'Thành phố nằm giữa biển và những ngọn đồi đá hoa cương, nổi tiếng với bãi biển Copacabana, Ipanema và núi Pão de Açúcar (Sugarloaf).',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(0, 11, 16, 1, 'u'); d.e(4, 11, 4, 5, 'a'); d.e(4, 7, 3, 2, 'a'); d.e(12, 11, 5, 4, 'G'); d.r(0, 11, 16, 1, 'u'); d.p('A', 3, 8, 5, 9, 4, 6); d.p('w', 2, 14, 7, 15, 12, 14); d.e(13, 2, 1.4, 1.4, 'y'); }, SC);
add(G, A, 'br-cristo', 'Tượng Chúa Kitô Cứu thế (Cristo Redentor)', 'Christ the Redeemer', 'Tượng cao 30 m trên đỉnh núi Corcovado, dựng xong năm 1931 bằng bê tông cốt thép phủ đá xà phong, là một trong Bảy kỳ quan Thế giới mới.',
  d => { d.bg('c'); d.e(8, 17, 9, 5, 'G'); d.r(7, 6, 2, 8, 'w'); d.r(2, 7, 12, 2, 'w'); d.r(7, 3, 2, 3, 'w'); d.r(6, 12, 4, 2, 'W'); d.p('W', 3, 8, 12, 8, 8, 5); d.p('w', 12, 2, 2, 3); }, SC);
add(G, A, 'br-iguazu', 'Thác Iguazú (Iguazu Falls)', 'Iguazu Falls', 'Hệ thống hơn 250 dòng thác tràn trên biên giới Brasil và Argentina; khu lớn nhất gọi là Họng Quỷ (Garganta do Diabo).',
  d => { d.bg('c'); d.r(0, 0, 16, 5, 'G'); d.r(0, 11, 16, 5, 'C'); for (const x of [1, 4, 7, 10, 13]) { d.r(x, 5, 2, 7, 'w'); d.p('l', x, 7, x + 1, 9); } d.r(0, 5, 16, 1, 'N'); d.p('w', 2, 12, 6, 13, 10, 12, 14, 13); d.p('g', 0, 4, 15, 4); }, SC);
add(G, A, 'br-amazon', 'Rừng Amazon', 'Amazon rainforest', 'Khu rừng nhiệt đới lớn nhất thế giới, phần lớn nằm ở Brasil, có những dòng sông dài và đa dạng sinh học khổng lồ; Manaus là cửa ngõ cho các chuyến đi sông.',
  d => { d.bg('G'); d.r(0, 10, 16, 6, 'C'); for (const [x, y, r] of [[3, 4, 3.4], [9, 3, 3.6], [13, 6, 3], [6, 8, 2.8]]) d.e(x, y, r, r - 0.6, 'g'); d.p('h', 3, 3, 9, 2, 13, 5); d.r(0, 9, 16, 1, 'N'); d.l(2, 15, 14, 12, 'c'); d.p('N', 5, 12, 10, 14); }, SC);
add(G, A, 'br-pantanal', 'Pantanal (đầm lầy nhiệt đới)', 'Pantanal wetlands', 'Vùng đầm lầy nhiệt đới lớn nhất thế giới, ngập nước theo mùa; dễ thấy báo jaguar và cá sấu caiman hơn cả ở Amazon.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'C'); d.r(0, 8, 16, 2, 'h'); d.p('G', 1, 8, 5, 7, 9, 8, 13, 7); d.l(12, 9, 12, 4, 'N'); d.e(12, 4, 1.4, 1, 'g'); d.e(5, 12, 3, 1.2, 'G'); d.p('y', 3, 12); d.p('k', 4, 12); d.p('w', 8, 14, 13, 13); d.p('l', 2, 3, 7, 2); }, SC);
add(G, A, 'br-lencois', 'Lençóis Maranhenses (cồn cát trắng)', 'Lençóis Maranhenses', 'Cồn cát trắng có những hồ nước mưa xanh đẹp xen kẽ, nhất là vào mùa mưa; một cảnh quan hiếm vì sát biển nhưng lại là bồn cát.',
  d => { d.bg('c'); d.r(0, 6, 16, 10, 'e'); d.e(3, 6, 5, 2, 'e'); d.e(12, 6, 6, 2.4, 'e'); d.e(5, 11, 3, 1.4, 'C'); d.e(11, 13, 3.6, 1.4, 'b'); d.e(9, 9, 2, 1, 'c'); d.p('W', 1, 8, 7, 7, 13, 8, 2, 14, 14, 11); d.e(13, 2, 1.4, 1.4, 'y'); }, SC);
add(G, A, 'br-salvador', 'Salvador (Bahia) và khu Pelourinho', 'Salvador (Bahia) and Pelourinho', 'Thành phố cảng cổ và là thủ đô đầu tiên của Brasil, với khu Pelourinho sặc màu thuộc địa; là trung tâm văn hóa gốc Phi.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(0, 5, 5, 9, 'y'); d.r(5, 7, 5, 7, 'p'); d.r(10, 4, 6, 10, 'b'); d.tri(0, 3, 5, 2, 'R'); d.tri(10, 2, 6, 2, 'R'); for (const [x, y] of [[1, 7], [3, 10], [6, 9], [8, 12], [11, 6], [13, 9]]) d.r(x, y, 1, 2, 'k'); d.r(6, 11, 2, 3, 'N'); }, SC);
add(G, A, 'br-brasilia', 'Brasília (thủ đô quy hoạch)', 'Brasília (the planned capital)', 'Thủ đô được xây trong vài năm từ cuối thập niên 1950, khai trương năm 1960, quy hoạch theo hình chiếc máy bay với các công trình của Oscar Niemeyer.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'h'); d.r(2, 11, 12, 2, 'w'); d.e(4, 11, 3, 2.4, 'w'); d.dtri(9, 6, 6, 5, 'w'); d.r(9, 6, 6, 1, 'W'); d.r(6, 5, 1, 6, 'W'); d.r(9, 5, 1, 6, 'W'); d.p('c', 3, 10, 5, 10); d.p('W', 1, 14, 14, 14); }, SC);

// ----- Mùa và thiên nhiên -----
add(G, B, 'br-summer', 'Mùa hè (tháng 12 đến tháng 3)', 'Summer (December to March)', 'Trời nóng và ẩm, là mùa cao điểm du lịch biển và Carnaval; nhiều nơi có mưa giông vào buổi chiều.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(0, 11, 16, 1, 'u'); d.e(8, 5, 4, 4, 'y'); for (const [x, y] of [[8, 0], [8, 10], [2, 5], [14, 5], [4, 1], [12, 1]]) d.put(x, y, 'o'); d.fan(3, 15, 3, 'r'); d.p('N', 3, 15); d.p('w', 12, 14); }, SC);
add(G, B, 'br-autumn', 'Mùa thu (tháng 3 đến tháng 6)', 'Autumn (March to June)', 'Trời dịu hơn, mưa giảm ở miền nam và đông nam; nhiều người đi dã ngoại và tham quan núi.',
  d => { d.bg('c'); d.tri(0, 6, 9, 9, 'A'); d.tri(6, 4, 10, 11, 'a'); d.tri(7, 4, 4, 3, 'w'); d.r(0, 13, 16, 3, 'O'); d.p('o', 2, 14, 6, 15, 10, 14, 13, 15); d.p('y', 4, 15, 12, 14); d.p('w', 12, 2); }, SC);
add(G, B, 'br-winter', 'Mùa đông (tháng 6 đến tháng 9)', 'Winter (June to September)', 'Lạnh nhất ở miền nam, có nơi xuống dưới 0 độ C và thỉnh thoảng có tuyết, trong khi miền Bắc vẫn nóng ẩm quanh năm.',
  d => { d.bg('A'); d.r(0, 12, 16, 4, 'w'); d.tri(3, 6, 6, 6, 'G'); d.tri(10, 4, 5, 8, 'G'); d.tri(4, 7, 4, 2, 'w'); d.tri(11, 5, 3, 2, 'w'); d.p('w', 1, 2, 5, 4, 9, 1, 13, 3, 2, 8, 14, 9); d.r(6, 12, 1, 1, 'N'); }, SC);
add(G, B, 'br-spring', 'Mùa xuân (tháng 9 đến tháng 12) và cây ipê', 'Spring (September to December) and the ipê tree', 'Hoa nở rực rỡ, nhất là cây ipê nở hoa vàng, hồng, tím; nhiều thành phố rực màu hoa.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(7, 7, 2, 7, 'N'); d.e(8, 5, 6, 4, 'y'); d.p('o', 5, 4, 10, 3, 8, 7); d.p('y', 4, 14, 11, 15, 8, 14); d.p('v', 2, 14, 13, 15); }, SC);
add(G, B, 'br-amazon-seasons', 'Mùa mưa và mùa khô ở Amazon', 'Wet and dry seasons in the Amazon', 'Mùa mưa, sông dâng thành rừng ngập nước; mùa khô, nước rút lại và lộ ra bãi cát ven sông.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'C'); d.r(0, 11, 16, 5, 'b'); d.l(3, 11, 3, 3, 'N'); d.l(8, 11, 8, 2, 'N'); d.l(13, 11, 13, 4, 'N'); for (const x of [3, 8, 13]) d.e(x, 3, 2.4, 1.8, 'g'); d.p('c', 5, 12, 10, 13, 12, 14); d.p('l', 1, 1, 12, 1); }, SC);
add(G, B, 'br-cerrado', 'Cerrado (thảo nguyên cây bụi)', 'Cerrado savanna', 'Vùng thảo nguyên cây bụi ở cao nguyên miền trung, một trong những vùng sinh thái đa dạng nhất thế giới.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'Y'); d.r(0, 9, 16, 1, 'u'); d.l(4, 14, 4, 8, 'N'); d.e(4, 7, 3, 1.8, 'G'); d.l(11, 14, 11, 9, 'N'); d.e(11, 8, 2.6, 1.6, 'g'); d.p('u', 1, 12, 7, 13, 13, 12, 8, 15); d.e(13, 2, 1.4, 1.4, 'y'); }, SC);
add(G, B, 'br-mata', 'Rừng Atlantic (Mata Atlântica)', 'Atlantic Forest (Mata Atlântica)', 'Rừng nhiệt đới ven biển đông nam đã bị thu hẹp rất nhiều do đô thị hóa; phần còn lại vẫn có nhiều loài chỉ sống ở đây.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'C'); d.e(8, 11, 8, 4, 'G'); d.e(5, 8, 3.4, 3, 'g'); d.e(11, 8, 3.4, 3.4, 'g'); d.e(8, 6, 3, 2.6, 'h'); d.p('G', 4, 9, 11, 9); d.p('w', 3, 14, 12, 15); }, SC);

// ----- Vùng miền -----
add(G, C, 'br-norte', 'Miền Bắc (Norte)', 'North (Norte)', 'Gồm rừng Amazon và các bang như Amazonas và Pará; dân cư thưa, nhiều cộng đồng bản địa và dựa vào sông ngòi để đi lại.',
  d => { d.bg('G'); d.r(0, 9, 16, 7, 'C'); d.e(4, 4, 3.4, 3, 'g'); d.e(12, 4, 3.4, 3, 'g'); d.r(3, 10, 7, 2, 'N'); d.tri(4, 7, 5, 3, 'o'); d.l(6, 7, 6, 5, 'k'); d.p('l', 11, 13, 2, 14); }, SC);
add(G, C, 'br-nordeste', 'Đông Bắc (Nordeste) và vùng sertão', 'Northeast (Nordeste) and the sertão', 'Vùng có bờ biển đẹp, văn hóa gốc Phi đậm nét và nội địa khô hạn gọi là sertão; nơi có Salvador, Recife và Fortaleza.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'o'); d.r(0, 13, 16, 3, 'C'); d.r(0, 12, 16, 1, 'u'); d.l(4, 12, 4, 6, 'G'); d.p('G', 3, 8, 5, 9, 4, 7); d.p('O', 9, 10, 12, 11, 2, 11); d.e(12, 3, 2, 2, 'y'); }, SC);
add(G, C, 'br-centro', 'Trung Tây (Centro-Oeste)', 'Central-West (Centro-Oeste)', 'Gồm Brasília, cao nguyên cerrado và Pantanal; vùng có nhiều nông trại trồng đậu tương và ngô.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'h'); for (let y = 9; y < 16; y += 2) d.r(0, y, 16, 1, 'g'); d.r(5, 8, 6, 1, 'W'); d.r(6, 6, 4, 2, 'w'); d.e(13, 3, 2, 2, 'y'); d.p('Y', 2, 11, 12, 13); }, SC);
add(G, C, 'br-sudeste', 'Đông Nam (Sudeste)', 'Southeast (Sudeste)', 'Vùng đông dân và giàu nhất, gồm São Paulo, Rio de Janeiro và Minas Gerais; trung tâm công nghiệp và tài chính.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(1, 5, 4, 9, 'A'); d.r(6, 2, 4, 12, 'a'); d.r(11, 6, 4, 8, 'A'); for (const [x, y] of [[2, 7], [3, 10], [7, 4], [8, 7], [7, 10], [12, 8], [13, 11]]) d.put(x, y, 'y'); }, SC);
add(G, C, 'br-sul', 'Miền Nam (Sul) và văn hóa gaucho', 'South (Sul) and gaucho culture', 'Gồm Paraná, Santa Catarina và Rio Grande do Sul, khí hậu mát hơn, nhiều người gốc Đức, Ý; văn hóa gaucho (người chăn bò) là nét đặc trưng.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'g'); d.e(8, 5, 4, 1.2, 'N'); d.r(6, 5, 4, 1, 'N'); d.e(8, 7, 2, 2, 's'); d.r(6, 9, 4, 3, 'r'); d.r(3, 12, 10, 2, 'n'); d.p('w', 2, 2, 13, 3); d.p('h', 1, 14, 14, 15); }, SC);
add(G, C, 'br-saopaulo', 'São Paulo (thành phố lớn nhất Nam Bán cầu)', 'São Paulo (largest city in the Southern Hemisphere)', 'Trung tâm kinh tế và ẩm thực, với cộng đồng gốc Nhật lớn nhất bên ngoài Nhật Bản.',
  d => { d.bg('k'); d.r(0, 14, 16, 2, 'K'); for (const [x, w, y] of [[0, 3, 8], [3, 3, 4], [6, 4, 2], [10, 3, 6], [13, 3, 9]]) { d.r(x, y, w, 14 - y, 'A'); } for (const [x, y] of [[1, 9], [4, 6], [4, 9], [7, 4], [8, 8], [11, 8], [14, 11], [7, 11], [1, 12]]) d.put(x, y, 'y'); d.p('w', 12, 1, 2, 3); }, SC);

// ----- Hiện tượng đặc biệt -----
add(G, E, 'br-pororoca', 'Pororoca (sóng triều ngược sông Amazon)', 'Pororoca (tidal bore on the Amazon)', 'Sóng triều dâng ngược lên sông Amazon khi thủy triều lên, tạo sóng cao kéo dài hàng km; nhiều người lướt sóng tìm đến để thử sức.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.e(8, 11, 8, 5, 'b'); d.e(10, 12, 6, 4, 'C'); d.p('w', 4, 8, 6, 7, 8, 7, 3, 9, 11, 9, 13, 10); d.r(0, 4, 16, 2, 'G'); d.p('N', 7, 5); }, SC);
add(G, E, 'br-encontro', 'Cuộc gặp của hai dòng sông (Encontro das Águas)', 'Meeting of the Waters (Encontro das Águas)', 'Gần Manaus, sông Negro màu tối và sông Solimões màu nâu đục chảy cạnh nhau nhiều km mà chưa trộn lẫn, do khác nhau về nhiệt độ, tốc độ và độ đặc của nước.',
  d => { d.bg('G'); d.r(0, 6, 8, 10, 'd'); d.r(8, 6, 8, 10, 'n'); d.r(7, 6, 2, 10, 't'); d.l(7, 8, 9, 10, 'W'); d.p('w', 3, 9, 12, 12, 4, 13); d.r(0, 0, 16, 5, 'g'); d.p('G', 2, 3, 9, 2, 13, 4); }, SC);
add(G, E, 'br-rios-voadores', 'Sông bay (rios voadores)', 'Flying rivers (rios voadores)', 'Luồng hơi nước do rừng Amazon bốc lên rồi thổi về phía nam thành mưa, giữ vai trò quan trọng với nông nghiệp ở miền nam.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'G'); d.e(4, 12, 4, 2.4, 'g'); d.l(4, 10, 4, 7, 'l'); d.e(8, 5, 4, 2, 'w'); d.e(12, 4, 3, 1.8, 'l'); d.l(6, 4, 14, 8, 'l'); d.p('C', 12, 10, 13, 12, 12, 14, 10, 13); }, SC);
add(G, E, 'br-fire', 'Lửa ở Amazon và nạn phá rừng', 'Amazon fires and deforestation', 'Nhiều vụ cháy và phá rừng đã làm mất diện tích rừng lớn, trở thành đề tài được chú ý trên toàn thế giới.',
  d => { d.bg('A'); d.r(0, 12, 16, 4, 'N'); d.tri(1, 4, 5, 8, 'r'); d.tri(3, 7, 3, 5, 'o'); d.tri(9, 3, 6, 9, 'r'); d.tri(10, 6, 4, 6, 'o'); d.p('y', 3, 10, 12, 10); d.r(14, 11, 2, 1, 'G'); d.p('K', 5, 1, 8, 2, 12, 1); }, SC);
add(G, E, 'br-noronha', 'Quần đảo Fernando de Noronha', 'Fernando de Noronha archipelago', 'Quần đảo núi lửa xa bờ với bãi biển trong vắt, rùa biển và cá heo; hạn chế số khách để bảo vệ thiên nhiên.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'C'); d.r(0, 12, 16, 4, 'b'); d.tri(5, 3, 7, 7, 'A'); d.tri(7, 3, 3, 3, 'G'); d.r(4, 9, 9, 2, 'u'); d.e(4, 13, 2, 1.2, 'g'); d.p('g', 5, 13); d.p('k', 3, 13); d.p('w', 11, 13, 13, 11); d.e(13, 2, 1.4, 1.4, 'y'); }, SC);
