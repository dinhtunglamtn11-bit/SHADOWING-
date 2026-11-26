// TeaLab: nội dung hướng dẫn (cách chơi, ký hiệu và từ viết tắt, công thức máy tính). Dữ liệu thuần, dùng cho cửa sổ Hướng dẫn và danh sách công thức trong máy tính.
// Quy ước máy tính: ngăn cách đối số bằng dấu chấm phẩy ( ; ), số thập phân bằng dấu phẩy ( , ).

import { uiLang } from './i18n.js';
import * as EN from './tl-guide-en.js';

const HOWTO_VI = [
  ['Mục tiêu', 'Điều hành tiệm trà từ 01/12/2026 đến 28/02/2027 (90 ngày). Kiếm lãi, giữ uy tín, nâng cấp tiệm, đạt nhiều sao ở các cột mốc để có Điểm Mùa cao. Hết ngày 90 có màn Chung kết; sau đó bạn có thể chơi tiếp ở chế độ tự do.'],
  ['Một ngày gồm các buổi', 'Mỗi ngày có tối đa 5 buổi: S1 Sáng, S2 Trưa, S3 Chiều, S4 Tối, S5 Đêm (22–24h, chỉ vài ngày đặc biệt). Mỗi buổi có ba pha: <b>Chuẩn bị</b> (đặt giá, đặt hàng, dự đoán, nhân sự) → <b>Mở cửa</b> (đồng hồ chạy, có thể ra lệnh) → <b>Xem lại</b> (báo cáo, chẩn đoán, đặt hàng cho buổi sau). Bấm <b>Nghỉ buổi</b> nếu không muốn mở.'],
  ['Điểm hành động (AP)', 'Mỗi buổi bạn có một số AP (giai đoạn 1: 6, rồi 7, 8, 9; độ khó Nhàn ×1,5, Khó ×0,75). AP dư tối đa 2 được giữ sang buổi sau. Lệnh khi đang bán tốn AP: đổi giá 1, giao khẩn 2, khuyến mãi 2, nghỉ giải lao 1, đóng cửa sớm hoặc mở lại 1. Việc ở pha Chuẩn bị (đặt giá lần đầu, đặt hàng) thì không tốn AP.'],
  ['Đặt giá và thực đơn', 'Mỗi món có giá tham chiếu (ref). Bạn được đặt giá trong khoảng 70%–150% giá ref. Mỗi khách có ngưỡng giá riêng: nếu giá món vượt ngưỡng, khách không xét món đó, còn không món nào vừa thì bỏ đi hẳn. Giá cao = lãi mỗi ly cao nhưng ít khách; giá thấp = đông khách nhưng dễ hết hàng và quá tải. Từ giai đoạn 2 có thể tắt bớt món (bỏ dấu tích) nếu không muốn nhập nguyên liệu cho món đó.'],
  ['Đặt hàng và kho', 'Chọn nhà cung cấp (A–D): mỗi nơi khác giá, phí giao và ngày đóng cửa. Mỗi nơi có <b>thời gian giao</b> riêng (A chờ 1 buổi, B 2 buổi, D 4 buổi; C chỉ bán hàng tươi và giao sau 2 ngày), mức đặt tối thiểu, mức miễn phí giao và giảm giá theo số phần (50+: 3%, 150+: 7%, 400+: 12%). Nhà cung cấp đóng cửa vào ngày hàng về thì không đặt được. <b>Hàng tươi</b> (sữa, trái cây…) hỏng nhanh, <b>hàng khô</b> để lâu hơn. Thiếu MỘT nguyên liệu của công thức là cả món hết, nên cần giữ kho cân bằng. Đặt nhiều quá thì hao hụt, đặt ít quá thì mất khách. Hàng đang nằm trong kho còn hạn dùng ghi ở mục Báo cáo → Kho.'],
  ['Sức chứa, phí giữ hàng và công nợ', '<b>Kệ khô, tủ lạnh, ngăn đá</b> đều có sức chứa; hàng đang trên đường cũng tính chỗ, hết chỗ thì không đặt thêm được. Mở rộng ở mục Đặt hàng → Mở rộng kho (+50% mỗi khu). Cuối mỗi ngày tính <b>phí giữ hàng</b> trên giá trị còn tồn (kệ khô 1%, tủ lạnh và ngăn đá 2%). Đặt ít lần thì đỡ phí giao và được giảm giá, nhưng tốn phí giữ và chỗ chứa: đó là bài toán EOQ (H = giá một phần × 1% × số ngày). Vì phải chờ hàng, nên đặt khi tồn còn bằng mức dùng trong lúc chờ cộng dự phòng (ROP). Sau 5 lần nhận hàng, A và B cho <b>ghi nợ 7 ngày</b>; từ đó trả ngay được giảm 2%. Ghi nợ giữ được tiền mặt nhưng tiền nợ không tính là vốn khi nâng cấp. Luật này áp cho lượt chơi bắt đầu từ bản cập nhật này; lượt cũ giữ luật cũ.'],
  ['Đặt hàng tự động', 'Mục Đặt hàng → <b>🤖 Đặt hàng tự động</b> (hoặc Menu): mỗi nguyên liệu chọn một luật. <b>(s, Q)</b>: còn ≤ s thì đặt Q. <b>(s, S)</b>: còn ≤ s thì đặt cho đầy tới S. <b>Định kỳ</b>: cứ T buổi đặt tới S. Luật chạy sau mỗi buổi, kể cả khi đi ngủ, và tính cả hàng đang về. Đơn chung nhà cung cấp được gộp lại để đỡ phí giao; chưa đạt mức tối thiểu hay thiếu tiền thì đơn không được đặt, xem Nhật ký đặt tự động. Luật không biết trước lễ Tết: đọc Lịch rồi tự chỉnh.'],
  ['Chỉ số, dự báo và ABC–XYZ', 'Báo cáo → <b>Chỉ số</b>: tỷ lệ đáp ứng, mức phục vụ, số ngày tồn kho, vòng quay, tỷ lệ hỏng, phí giữ, đồ thị răng cưa. Báo cáo → <b>Dự báo</b> (mua bằng IP): so bốn cách dự báo và cả dự đoán của bạn bằng sai số. Báo cáo → <b>ABC–XYZ</b> (mua bằng IP): nguyên liệu nào đáng canh kỹ nhất.'],
  ['Sơ chế theo mẻ (từ giai đoạn 2)', 'Trân châu phải nấu 40 phút, trà phải ủ 20 phút. Phần đã nấu chỉ dùng trong buổi đó: dư thì đổ, thiếu thì khách bỏ đi dù kho còn nguyên liệu thô. Ở pha Chuẩn bị chọn số nấu sẵn, cỡ mẻ và ngưỡng nấu thêm (để trống thì tự tính); khi đang bán có thể bấm Nấu thêm (1 AP).'],
  ['Trạm và điểm nghẽn', 'Mỗi nhân viên có thể xếp vào thu ngân, pha chế, đóng gói hay giao hàng. Bàn đóng gói gánh 30% công mỗi ly. Quầy pha chật: người thứ ba trở đi làm được ít hơn. Cuối buổi xem công suất từng trạm; trạm cao nhất là điểm nghẽn, chỉ gỡ ở đó mới tăng được số ly.'],
  ['Hợp đồng mua hàng (từ giai đoạn 2)', 'Cam kết một lượng mỗi tuần với nhà cung cấp A hoặc B trong 28 ngày: giá rẻ hơn 8%, giao chắc hơn, mua thiếu phải bù. Tối đa 2 hợp đồng. Hợp đồng đổi sự linh hoạt lấy giá và độ chắc chắn.'],
  ['Kho trung tâm và hiệu ứng roi da (giai đoạn 4)', 'Kho trung tâm trữ hàng khô cho hai chi nhánh. Chi nhánh xin hàng theo luật đặt hàng tự động; thiếu thì tự mua phần còn lại. Kho chỉ thấy đơn chi nhánh gửi lên nên dễ đặt giật cục: đó là hiệu ứng roi da. Bật Chia sẻ dữ liệu bán thì kho dự báo theo số khách mua thật.'],
  ['Khủng hoảng nhiều bước', 'Vài lần trong mùa có cảnh báo trước 3 ngày rồi sự cố nối tiếp nhau: giao hàng gián đoạn, giá tăng, nơi bán đóng cửa. Thư cảnh báo cho chọn một phương án dự phòng; mỗi phương án chỉ che một loại rủi ro, và phải trả lời ngay trong ngày.'],
  ['Ba quyết định tốn tiền nhất', 'Báo cáo → <b>Tốn tiền</b> (và màn Chung kết) xếp ba quyết định làm mất nhiều tiền nhất: đặt thiếu, trữ dư, nấu thiếu hay dư, để nghẽn quầy, đặt giá, phí giao… kèm số tiền, ngày nặng nhất và cách làm lần sau. Đây là ước tính để so các quyết định với nhau, không phải số kế toán.'],
  ['Dự đoán', 'Trước buổi bán, nhập một khoảng số ly bạn đoán sẽ bán (thấp–cao). Khoảng hẹp mà trúng thì điểm cao; trúng được thưởng IP. Đây là cách tập đánh giá nhu cầu, rồi dùng làm cơ sở để đặt hàng.'],
  ['Khi đang mở cửa', 'Đồng hồ game chạy: ×1 là 1 phút game mỗi 0,75 giây, ×2 và ×4 nhanh hơn. Mở bất kỳ cửa sổ nào là tự tạm dừng. Theo dõi <b>đơn đang chờ</b>: nếu dài quá khách bỏ đi vì chờ lâu. Nhân viên mệt thì pha sai nhiều hơn: dùng Nghỉ giải lao. Hết hàng thì dùng Giao khẩn (chỉ nhà cung cấp B, giá ×1,3 và phí riêng, hàng đến sau khoảng 60 phút, tối đa 2 lần mỗi buổi). Nghỉ giải lao tạm dừng quầy 15 phút game và hồi 10 sức khỏe cho Lame. Khuyến mãi tăng khách khoảng 10% nhưng giảm tác dụng nếu dùng nhiều ngày liền.'],
  ['Theo dõi kho khi đang bán', 'Khi mở cửa, khối <b>📦 Theo dõi kho trực tiếp</b> ngay dưới các số liệu cho biết từng nguyên liệu còn bao nhiêu phần, ước tính còn đủ bao nhiêu phút theo tốc độ dùng gần đây (“~25p”) và từng món còn bán được khoảng bao nhiêu ly. Ô <b>vàng</b>: sẽ hết trước khi đóng cửa hoặc còn ≤ 6. Ô <b>đỏ</b>: đã hết, các món dùng nó dừng bán và trên cảnh có nhãn “Hết: …”. Khi sắp hết bạn có thể bấm <b>Giao khẩn</b> (từ nhà cung cấp B). Cuối buổi xem lại ở Báo cáo → Kho. Ở giai đoạn 4 có hai bảng riêng cho hai chi nhánh.'],
  ['Nhân sự và thiết bị', 'Từ giai đoạn 2 có thể thuê nhân viên (phỏng vấn trước khi thuê), mua thiết bị để tăng công suất. Nhân viên có lương, mood, sức khỏe. Làm quá giờ khi còn đơn dồn thì có tăng ca (lương phần thêm ×1,5). Ngày lễ lương ×3 nếu mở cửa. Sa thải tốn tiền bồi thường và ảnh hưởng tâm trạng người ở lại.'],
  ['Nâng cấp tiệm', 'Giai đoạn 1: tiệm khởi đầu → 2: tiệm nhỏ → 3: cửa hàng → 4: chuỗi (có chi nhánh 2). Mỗi lần nâng cần đủ tiền mặt, uy tín R và có vốn lưu động. Mỗi giai đoạn mở thêm món, nhân viên, AP và chi phí cố định mỗi ngày cũng tăng.'],
  ['Đi ngủ', 'Chạy các buổi còn lại của ngày theo <b>Kế hoạch đứng</b> (đặt ở Menu) rồi chốt ngày: hàng hỏng, thuê mặt bằng, lương, danh tiếng, cột mốc. Buổi tự chạy bị phí 5% doanh thu và không tính điểm chất lượng quyết định.'],
  ['Lịch, cầnvà tin tức', 'Đọc Lịch và cầntrước các ngày lễ, Tết: nhà cung cấp đóng cửa, học sinh nghỉ, thời tiết đổi. Tin có độ tin cậy khác nhau: chính thức, nguồn tin cậy, tin đồn. Có thể có báo động giả. cần“cần quyết định” có hạn trả lời, nếu quá hạn thì lấy lựa chọn mặc định.'],
  ['Sao, huy hiệu và thưởng', 'Cột mốc (A–E) cho tối đa 3 sao mỗi cái. Sao đổi ra xu (cộng vào Passport) và IP. Ở 10, 30, 60, 90 sao mở khóa thử thách tuần, bộ trang trí Mùa Xuân, danh hiệu và huy hiệu Ngôi sao Xuân. Thưởng không bao giờ là tiền trong game, nên không làm lệch cân bằng. Sao chỉ tính khi bạn tự chơi ít nhất một nửa số buổi trong kỳ đo (buổi chạy bằng Đi ngủ không tính là tự chơi). Các cột mốc so sánh hoặc đo hụt hàng, hao hụt chỉ chấm khi quán mở bán ít nhất khoảng 80% số ngày của kỳ đo; thử thách tuần cần mở bán 6/7 ngày.'],
  ['Hồ sơ và lịch sử các lượt', 'Menu → <b>🏅 Hồ sơ và lịch sử các lượt</b> ghi lại từng lượt chơi: sao từng cột mốc, huy hiệu, Điểm Mùa, lãi. Có 3 mục: <b>Tổng quan</b> (kỷ lục mọi lượt), <b>Các lượt</b> (chi tiết từng lượt) và <b>So sánh</b> (đặt 2–4 lượt cạnh nhau để xem lượt nào đạt nhiều hơn). Thành tích đã đạt ở bất kỳ lượt nào vẫn được công nhận và giữ (thẻ “kỷ lục”). Khi chơi lại, lượt mới tính từ đầu: bạn phải đạt lại các thành tích đó (và thêm cái khác) trong lượt mới để so sánh.'],
  ['Công cụ phân tích', 'IP mua công cụ ở mục Thành tích: đếm khách, khảo sát nhanh, nhật ký nhà cung cấp, thí nghiệm giá, chẩn đoán đầy đủ (DQI, tách may rủi và kỹ năng), kiểm kê chi tiết lô. <b>Chạy lại giả định</b> chạy lại chính buổi vừa rồi với giá khác (cùng khách, cùng may rủi) để biết quyết định tốt hay chỉ gặp may.'],
];

// [ký hiệu, tên đầy đủ, giải thích ngắn]
const GLOSSARY_VI = [
  ['N', 'Ngày', 'Số thứ tự ngày game (N1 = 01/12/2026, N90 = 28/02/2027).'],
  ['Giờ game', 'Đồng hồ trong game', 'Chỉ chạy khi mở cửa. Buổi S1 bắt đầu 06:00, S2 10:00, S3 14:00, S4 18:00, S5 22:00.'],
  ['S1–S5', 'Buổi trong ngày', 'S1 Sáng, S2 Trưa, S3 Chiều, S4 Tối, S5 Đêm (22–24h, chỉ vài ngày).'],
  ['AP', 'Action Points, điểm hành động', 'Số lệnh bạn ra được khi đang bán. Hết AP là không đổi giá hay gọi hàng khẩn được nữa.'],
  ['R', 'Uy tín (danh tiếng)', 'Thang 0–100. Cao thì khách tới nhiều hơn và đủ điều kiện nâng cấp. Hàng đợi dài, hết hàng và pha sai làm giảm R.'],
  ['L', 'Khách quen (loyalty)', 'Lượng khách quay lại. Tăng khi khách hài lòng, giảm khi họ bỏ đi.'],
  ['Tiền', 'Tiền mặt', 'Hiển thị gọn: 240M = 240 triệu, 1.358K = 1.358 nghìn. Âm nghĩa là đang nợ.'],
  ['K, M, B', 'Nghìn, triệu, tỷ đồng', 'Viết tắt tiếng Anh: 1K = 1.000đ (thousand); 1M = 1.000.000đ (million); 1B = 1.000.000.000đ (billion).'],
  ['ref', 'Giá tham chiếu', 'Giá bán gợi ý của một món. Bạn được đặt từ 70% đến 150% ref.'],
  ['vốn', 'Giá vốn một ly', 'Tiền nguyên liệu để làm một ly theo giá nhập hiện tại.'],
  ['lãi', 'Lãi gộp một ly', 'Giá bán trừ giá vốn. Chưa trừ chi phí cố định và lương.'],
  ['DT', 'Doanh thu', 'Tổng tiền bán ra, chưa trừ chi phí.'],
  ['COGS', 'Giá vốn hàng bán', 'Tổng giá vốn nguyên liệu của những ly đã bán.'],
  ['Lãi gộp buổi', 'Doanh thu − giá vốn − lương', 'Lãi sau khi trừ nguyên liệu và lương của buổi. Chưa trừ thuê mặt bằng.'],
  ['CPCD', 'Chi phí cố định mỗi ngày', 'Mặt bằng, điện nước… trả mỗi ngày dù có bán hay không. Tăng theo giai đoạn.'],
  ['TB', 'Trung bình', 'Giá trị trung bình, ví dụ LY7 là số ly trung bình 7 ngày gần nhất.'],
  ['LY7, DT7, LAI7', 'Số liệu 7 ngày', 'Số ly, doanh thu, lãi trung bình mỗi ngày trong 7 ngày gần nhất (có trong ô Dữ liệu của máy tính).'],
  ['SDLY7', 'Độ lệch chuẩn số ly/buổi', 'Mức dao động của số ly mỗi buổi trong 7 ngày. Dùng để tính tồn kho an toàn.'],
  ['IP', 'Insight Points, điểm phân tích', 'Kiếm từ dự đoán trúng, thử thách, cột mốc. Dùng mua công cụ phân tích ở mục Thành tích.'],
  ['xu', 'Xu của app', 'Kiếm từ lợi nhuận và sao, cộng vào Passport để mua thẻ văn hóa. Không ảnh hưởng game.'],
  ['★', 'Sao cột mốc', 'Mỗi cột mốc tối đa 3 sao. Tổng sao quyết định các mốc mở khóa 10/30/60/90.'],
  ['CT01–CT35', 'Cột mốc', 'Mục tiêu có hạn ngày, chia 5 nhóm: A Khởi động, B Kỹ năng phân tích, C Tăng trưởng, D Lễ và Tết, E Chung kết.'],
  ['DQI', 'Decision Quality Index', 'Điểm chất lượng quyết định 0–100 (giá, tồn kho, hàng đợi). Tách phần may rủi khỏi kỹ năng. Mở bằng IP.'],
  ['Điểm Mùa', 'Điểm cuối mùa', 'Gộp tài sản ròng, uy tín, DQI, độ chính xác dự đoán, ổn định lãi và tỉ lệ buổi chơi tay. Quyết định danh hiệu.'],
  ['Chuẩn bị / Mở cửa / Xem lại', 'PREP / LIVE / REVIEW', 'Ba pha của một buổi.'],
  ['NCC A–D', 'Nhà cung cấp', 'Mỗi nhà khác giá, thời gian giao, ngày đóng cửa và chính sách. Có thể bị tăng giá hay giao trễ.'],
  ['Lô hàng', 'Lô nguyên liệu', 'Hàng nhập về theo lô, mỗi lô có số lượng, giá nhập, chất lượng và hạn dùng.'],
  ['Hao hụt', 'Hàng hỏng/hết hạn', 'Hàng quá hạn bị loại, tính vào chi phí. Hàng tươi hao nhanh hơn hàng khô.'],
  ['Tồn kho an toàn', 'Safety stock', 'Phần hàng dự phòng để không hụt khi nhu cầu dao động.'],
  ['Tăng ca', 'Làm thêm giờ', 'Khi cuối buổi còn đơn dồn, nhân viên làm thêm, lương phần thêm ×1,5.'],
  ['Lương lễ ×3', 'Lương ngày lễ', 'Mở cửa ngày lễ thì lương nhân viên nhân 3.'],
  ['Kế hoạch đứng', 'Standing plan', 'Cấu hình mở/đóng các buổi khi bạn “đi ngủ” sớm. Đặt ở Menu.'],
  ['Chạy lại giả định', 'What-if', 'Chạy lại đúng buổi vừa rồi (cùng khách, cùng may rủi) với giá khác để so sánh.'],
  ['Seed', 'Hạt giống ngẫu nhiên', 'Cùng seed thì cùng chuỗi khách và may rủi, nên so sánh hai cách chơi là công bằng.'],
  ['Thí nghiệm giá', 'Price experiment', 'Thử hai mức giá trong nhiều buổi, rồi kiểm định xem khác biệt có đủ tin cậy (mức 90%) không.'],
  ['Sổ giả thuyết', 'Hypothesis notebook', 'Nơi ghi các điều bạn đoán và kiểm chứng lại.'],
  ['Chi nhánh 2', 'Giai đoạn 4', 'Cửa hàng thứ hai với kho và nhân viên riêng; chuyển hàng giữa hai nơi tốn phí.'],
  ['Mùa', '90 ngày', 'Một lượt chơi từ 01/12 đến 28/02. Chung kết chấm Điểm Mùa.'],
  ['Thử thách tuần', 'Weekly challenge', 'Mở khi có 10 sao. Chấm vào cuối mỗi tuần game (ngày chia hết cho 7), thưởng IP và xu.'],
];

// Công thức cho máy tính: [mã hàm, tên, cú pháp, công thức, giải thích trong game, ví dụ]
const FORMULAS_VI = [
  ['EOQ', 'Lượng đặt kinh tế', 'EOQ(D;S;H)', 'EOQ = √(2·D·S / H)', 'D: nhu cầu cả kỳ (số phần dùng), S: phí cho mỗi lần đặt (giao hàng, công), H: phí giữ một phần trong kỳ (hao hụt, vốn nằm kho). Cho lượng mỗi lần đặt làm tổng phí đặt + phí giữ nhỏ nhất. Dùng nhiều ở hàng khô, ít hợp với hàng tươi vì hỏng nhanh.', 'EOQ(1400;15;2)'],
  ['TC', 'Tổng chi phí tồn kho', 'TC(D;S;H;Q)', 'TC = D/Q·S + Q/2·H', 'So sánh các mức đặt Q khác nhau. Q = EOQ cho TC thấp nhất; thử Q lớn hơn hay nhỏ hơn để thấy chi phí tăng.', 'TC(1400;15;2;150)'],
  ['ROP', 'Điểm đặt hàng lại', 'ROP(d;L;σ;z)', 'ROP = d·L + z·σ·√L', 'd: dùng trung bình mỗi buổi, L: số buổi từ lúc đặt đến lúc hàng về, σ: độ lệch chuẩn nhu cầu mỗi buổi, z: hệ số an toàn (z=1,28 ứng ~90%, 1,64 ~95%). Khi tồn kho tụt tới ROP thì đặt thêm.', 'ROP(50;2;12;1,64)'],
  ['SS', 'Tồn kho an toàn', 'SS(σ;L;z)', 'SS = z·σ·√L', 'Phần dự phòng cho nhu cầu dao động trong thời gian chờ hàng. Là phần “cộng thêm” trong ROP.', 'SS(12;2;1,64)'],
  ['NV', 'Báo bán lẻ (newsvendor)', 'NV(μ;σ;cu;co)', 'Q* = μ + σ·Φ⁻¹(cu / (cu + co))', 'Mức nên đặt cho hàng chỉ dùng được trong một buổi (tươi). cu: lãi mất khi thiếu một phần, co: tiền mất khi thừa một phần. Nhu cầu μ, σ lấy từ LY7 và SDLY7.', 'NV(110;18;9;4)'],
  ['CR', 'Tỉ lệ tới hạn', 'CR(cu;co)', 'CR = cu / (cu + co)', 'Xác suất bạn nên chuẩn bị đủ hàng. Càng lãi cao, càng nên giữ nhiều hàng.', 'CR(9;4)'],
  ['BE', 'Điểm hòa vốn', 'BE(chi phí cố định;lãi/ly)', 'BE = chi phí cố định / lãi mỗi ly', 'Số ly tối thiểu phải bán để không lỗ (hoặc số ngày để hoàn vốn một khoản đầu tư khi chia cho lãi mỗi ngày).', 'BE(1750000;9500)'],
  ['MG', 'Lãi gộp một ly', 'MG(giá;vốn)', 'MG = giá − vốn', 'Phần còn lại sau khi trừ nguyên liệu.', 'MG(28;9,4)'],
  ['MGP', 'Biên lãi gộp %', 'MGP(giá;vốn)', 'MGP = (giá − vốn) / giá · 100', 'Phần trăm của giá bán là lãi. Món biên thấp thì bán nhiều cũng ít lãi.', 'MGP(28;9,4)'],
  ['MK', 'Mức tăng giá trên vốn (markup)', 'MK(vốn;giá)', 'MK = (giá − vốn) / vốn · 100', 'Khác MGP ở mẫu số: chia cho vốn, không chia cho giá.', 'MK(9,4;28)'],
  ['Δ%', 'Phần trăm thay đổi', 'Δ%(cũ;mới)', 'Δ% = (mới − cũ) / cũ · 100', 'So sánh doanh thu, số ly, giá nguyên liệu giữa hai kỳ.', 'Δ%(1200;1350)'],
  ['ELA', 'Độ co giãn của cầu theo giá', 'ELA(p0;p1;q0;q1)', 'E = ((q1−q0)/q0) / ((p1−p0)/p0)', 'Tăng giá 1% làm số ly đổi bao nhiêu %. |E| > 1: khách rất nhạy giá, nên giảm giá để bán nhiều. |E| < 1: tăng giá có lợi. Lấy số liệu từ thí nghiệm giá.', 'ELA(25;28;100;92)'],
  ['SD', 'Độ lệch chuẩn', 'SD(a;b;c;…)', 'SD = √(Σ(x−x̄)² / (n−1))', 'Mức dao động của một dãy số. Cần ít nhất 2 số.', 'SD(98;110;121;104;117)'],
  ['Z', 'Điểm chuẩn hóa', 'Z(x;μ;σ)', 'Z = (x − μ) / σ', 'Một ngày bán bất thường đến mức nào so với bình thường. |Z| > 2 là hiếm.', 'Z(150;110;18)'],
  ['CI', 'Nửa khoảng tin cậy', 'CI(σ;n;mức)', 'CI = z·σ / √n', 'Sai số của giá trị trung bình khi lấy n quan sát. mức là xác suất, ví dụ 0,95. Dùng để biết sự khác biệt giữa hai giá có thật không.', 'CI(18;14;0,95)'],
  ['NORM', 'Phân phối chuẩn tích lũy', 'NORM(z)', 'Φ(z)', 'Xác suất giá trị chuẩn hóa nhỏ hơn z. NORM(0)=0,5; NORM(1,64)≈0,95.', 'NORM(1,64)'],
  ['NORMINV', 'Nghịch đảo chuẩn', 'NORMINV(p)', 'Φ⁻¹(p)', 'Tìm z từ xác suất. NORMINV(0,95)≈1,64.', 'NORMINV(0,95)'],
  ['TURN', 'Vòng quay tồn kho', 'TURN(COGS;tồn TB)', 'TURN = COGS / tồn kho trung bình', 'Kho quay mấy lần trong kỳ. Quay chậm là hàng nằm lâu, dễ hao hụt và chôn vốn.', 'TURN(9800000;1400000)'],
  ['DOH', 'Số ngày tồn kho', 'DOH(tồn TB;COGS/ngày)', 'DOH = tồn kho TB / COGS mỗi ngày', 'Kho đủ bán bao nhiêu ngày. Hàng tươi chỉ nên giữ 1–2 ngày.', 'DOH(1400000;140000)'],
  ['ROI', 'Tỉ suất hoàn vốn', 'ROI(lãi;vốn)', 'ROI = lãi / vốn · 100', 'Dùng để cân nhắc có nên mua thiết bị hay nâng cấp: lãi tăng thêm mỗi kỳ so với tiền bỏ ra.', 'ROI(450000;6000000)'],
  ['LITTLE', 'Luật Little', 'LITTLE(λ;W)', 'L = λ·W', 'Số đơn đang chờ L = tốc độ khách đến λ (đơn/phút) × thời gian chờ trung bình W (phút). Hàng đợi dài nghĩa là công suất đang thiếu.', 'LITTLE(1,5;6)'],
  ['UTIL', 'Mức tải của quầy', 'UTIL(λ;μ)', 'ρ = λ / μ', 'λ: đơn đến mỗi phút, μ: đơn quầy làm được mỗi phút. ρ gần 1 thì hàng đợi tăng vọt; nên giữ dưới 0,85.', 'UTIL(1,5;1,8)'],
];

// Chạm vào số trên thanh trên cùng thì hiện giải thích ngắn
const HUD_HELP_VI = {
  hD: 'N = ngày game (N1 là 01/12/2026, N90 là 28/02/2027). Dưới là thứ và ngày dương lịch.',
  hT: 'Giờ game: chỉ chạy khi mở cửa. Mỗi buổi dài 4 tiếng (S5 dài 2 tiếng).',
  hK: 'Buổi hiện tại: S1 Sáng, S2 Trưa, S3 Chiều, S4 Tối, S5 Đêm (22–24h, chỉ vài ngày).',
  hM: 'Tiền mặt. 240M = 240 triệu đồng, 1.358K = 1.358 nghìn. Hết tiền thì không đặt hàng hay nâng cấp được. K = nghìn, M = triệu, B = tỷ.',
  hA: 'AP = điểm hành động. Đổi giá khi đang bán tốn 1, giao khẩn 2, khuyến mãi 2, nghỉ giải lao 1, đóng/mở lại 1.',
  hR: 'R = uy tín 0–100. Cao thì đông khách và đủ điều kiện nâng cấp. Hết hàng, chờ lâu, pha sai làm giảm R.',
};

// Mẹo ngắn theo tình huống
const TIPS_VI = [
  'Khách hết hàng là mất ngay; khách chờ lâu là mất uy tín. Xem biểu đồ “khách bỏ đi” cuối buổi để biết khung giờ nào thiếu hàng hay thiếu người.',
  'Thiếu một nguyên liệu là cả món hết: ly và nắp, đá, trà… cũng phải đủ như sữa và trái cây.',
  'Đặt hàng theo mức dùng gần đây (LY7, SDLY7 trong ô Dữ liệu) cộng tồn kho an toàn (SS) thay vì đoán cảm tính.',
  'Hàng tươi: dùng NV (báo bán lẻ). Hàng khô: dùng EOQ và ROP.',
  'Tăng giá mà số ly giảm ít hơn tỉ lệ tăng thì có lợi. Dùng ELA và thí nghiệm giá để kiểm chứng.',
  'Trước Tết và ngày lễ, nhà cung cấp đóng cửa: đọc Lịch và cầnsớm để dự trữ.',
  'Đừng phản ứng quá sớm với tin đồn: có “báo động giả”, và phản ứng quá mạnh cũng tốn tiền.',
  'Sau mỗi buổi, dùng “Chạy lại giả định” để biết lãi tăng là do giá tốt hay chỉ do may.',
];

// giao diện tiếng Anh (và tiếng Trung) dùng bản hướng dẫn tiếng Anh
const pick = (vi, en) => (uiLang === 'vi' ? vi : en);
export const HOWTO = pick(HOWTO_VI, EN.HOWTO), GLOSSARY = pick(GLOSSARY_VI, EN.GLOSSARY), FORMULAS = pick(FORMULAS_VI, EN.FORMULAS), HUD_HELP = pick(HUD_HELP_VI, EN.HUD_HELP), TIPS = pick(TIPS_VI, EN.TIPS);
