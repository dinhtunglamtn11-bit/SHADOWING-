// Dữ liệu mục “Phát âm” (Luyện âm → 📚 Phát âm). Biên soạn theo giáo trình “Nền tảng phát âm tiếng Trung phổ thông”:
// 4 giai đoạn (thanh mẫu → vận mẫu → thanh điệu & biến điệu → cặp / nhóm dễ nhầm), mỗi giai đoạn gồm nhiều bài.
// Cú pháp: mỗi dòng của g là MỘT NHÓM từ gần giống nhau (dùng để nghe-phân-biệt), các từ cách nhau bằng dấu ; và mỗi từ là
//   chữ Hán | pinyin kèm số thanh (cách nhau bằng dấu cách, 5 = thanh nhẹ) | nghĩa tiếng Việt
// Dòng bắt đầu bằng ! là nhóm không dùng cho bài nghe-chọn (từ đồng âm / chỉ khác thanh nhẹ: vẫn đọc theo và gõ được).
export const STAGES = [
  { id: 'ini', t: '🗣 1. Thanh mẫu (21 phụ âm đầu)', d: 'Học từng nhóm phụ âm đầu theo vị trí phát âm; trọng tâm là bật hơi / không bật hơi và uốn lưỡi.' },
  { id: 'fin', t: '🔤 2. Vận mẫu (phần vần)', d: 'Vận mẫu đơn, kép, mũi và ba vận mẫu viết tắt.' },
  { id: 'ton', t: '🎵 3. Thanh điệu & biến điệu', d: 'Bốn thanh, 20 tổ hợp thanh điệu, biến điệu thanh 3, 一 / 不, thanh nhẹ, âm cuộn lưỡi.' },
  { id: 'pair', t: '⚔ 4. Cặp & nhóm dễ nhầm', d: 'Thật nhiều cặp gần giống để nghe phân biệt, gõ và đọc theo. Đây là phần luyện tai và miệng quan trọng nhất.' },
  { id: 'cmp', t: '🎯 5. Tổng hợp & tăng tốc', d: 'Từ hai âm tiết khó, vần + thanh phối hợp: luyện sau khi đã qua các giai đoạn trước.' },
];

const U = [];
const add = (id, st, t, tip, g, o = {}) => U.push({ id, st, t, tip, g, ...o });

// ======================= GIAI ĐOẠN 1: THANH MẪU =======================
add('i-bpmf', 'ini', 'b · p · m · f (âm môi)',
  '**b** = “p” KHÔNG bật hơi (không đọc “b” Việt). **p** = bật hơi mạnh. **m** như “m” Việt, **f** như “ph” Việt.\nTự kiểm tra: để tờ giấy mỏng trước miệng, đọc **pà** thì giấy phải bay, đọc **bà** thì giấy gần như đứng yên.',
  `八|ba1|tám;怕|pa4|sợ;妈|ma1|mẹ;发|fa1|gửi, phát
笔|bi3|cây bút;皮|pi2|da;米|mi3|gạo
班|ban1|lớp;盘|pan2|cái đĩa;慢|man4|chậm;饭|fan4|cơm
杯|bei1|cái ly;陪|pei2|đi cùng;美|mei3|đẹp;飞|fei1|bay
包|bao1|cái túi;跑|pao3|chạy;帽|mao4|cái mũ
本|ben3|quyển;盆|pen2|cái chậu;门|men2|cửa;分|fen1|phút, điểm
帮|bang1|giúp;胖|pang4|béo;忙|mang2|bận;方|fang1|vuông
布|bu4|vải;普|pu3|phổ biến;母|mu3|mẹ;福|fu2|phúc
病|bing4|bệnh;平|ping2|bằng phẳng;名|ming2|tên
表|biao3|đồng hồ, bảng;票|piao4|vé;秒|miao3|giây
边|bian1|bên;片|pian4|mảnh;面|mian4|mì, mặt
爸爸|ba4 ba5|bố;朋友|peng2 you5|bạn bè;明白|ming2 bai5|hiểu;方便|fang1 bian4|tiện lợi`);

add('i-dtnl', 'ini', 'd · t · n · l (đầu lưỡi – lợi)',
  '**d** = “t” Việt, không bật hơi (KHÔNG đọc “đ”). **t** = “th” bật hơi mạnh. **n** như “n”, **l** như “l”.\n**n** hơi thoát qua mũi, **l** hơi thoát hai bên lưỡi.',
  `大|da4|to;他|ta1|anh ấy;拿|na2|cầm;拉|la1|kéo
低|di1|thấp;提|ti2|xách;你|ni3|bạn;里|li3|trong
道|dao4|đường;套|tao4|bộ;闹|nao4|ồn;老|lao3|già
对|dui4|đúng;推|tui1|đẩy
点|dian3|điểm;天|tian1|trời;年|nian2|năm;连|lian2|liền
都|dou1|đều;头|tou2|đầu;楼|lou2|tầng
灯|deng1|đèn;疼|teng2|đau;能|neng2|có thể;冷|leng3|lạnh
多|duo1|nhiều;脱|tuo1|cởi;落|luo4|rơi
懂|dong3|hiểu;同|tong2|cùng;农|nong2|nông;龙|long2|rồng
弟弟|di4 di5|em trai;太太|tai4 tai5|vợ, bà;老大|lao3 da4|anh cả`);

add('i-gkh', 'ini', 'g · k · h (gốc lưỡi)',
  '**g** = “c/k” không bật hơi (KHÔNG đọc “g”). **k** = “k” bật hơi mạnh (không phải “kh” Việt). **h** xát ở cuống lưỡi, gần “kh” nhưng nhẹ hơn, không phải “h” Việt.',
  `哥|ge1|anh trai;科|ke1|khoa;喝|he1|uống
个|ge4|cái;课|ke4|bài học;和|he2|và
高|gao1|cao;考|kao3|thi;好|hao3|tốt
狗|gou3|chó;口|kou3|miệng;后|hou4|sau
干|gan4|làm;看|kan4|xem;汉|han4|Hán
刚|gang1|vừa mới;康|kang1|khỏe;航|hang2|hàng không
工|gong1|công;空|kong1|trống;红|hong2|đỏ
关|guan1|đóng;宽|kuan1|rộng;换|huan4|đổi
光|guang1|ánh sáng;矿|kuang4|mỏ;黄|huang2|vàng
国|guo2|nước;扩|kuo4|mở rộng;火|huo3|lửa
瓜|gua1|dưa;夸|kua1|khen;花|hua1|hoa
贵|gui4|đắt;亏|kui1|thiệt;回|hui2|về`);

add('i-jqx', 'ini', 'j · q · x (mặt lưỡi)',
  'j q x chỉ đi với **i, ü**. **j** ≈ “ch” không bật hơi; **q** ≈ “ch” bật hơi mạnh (KHÔNG đọc “qu”); **x** ≈ “x” nhưng mặt lưỡi áp rộng lên vòm, môi kéo ngang.\nSau j q x, chữ **u** viết là u nhưng đọc là **ü** (qù, xué, jūn).',
  `鸡|ji1|gà;七|qi1|bảy;西|xi1|tây
借|jie4|mượn;切|qie1|cắt;谢|xie4|cảm ơn
叫|jiao4|gọi;巧|qiao3|khéo;小|xiao3|nhỏ
九|jiu3|chín;球|qiu2|quả bóng;修|xiu1|sửa
见|jian4|thấy;钱|qian2|tiền;现|xian4|hiện
今|jin1|nay;亲|qin1|thân;新|xin1|mới
讲|jiang3|nói;墙|qiang2|tường;想|xiang3|muốn
京|jing1|kinh đô;青|qing1|xanh;星|xing1|sao
举|ju3|giơ lên;取|qu3|lấy;许|xu3|cho phép
绝|jue2|tuyệt;缺|que1|thiếu;学|xue2|học
卷|juan3|cuộn;全|quan2|toàn;选|xuan3|chọn
军|jun1|quân;群|qun2|đám đông;寻|xun2|tìm`);

add('i-zhchshr', 'ini', 'zh · ch · sh · r (uốn lưỡi)',
  'Uốn lưỡi: cong đầu lưỡi lên chạm vòm cứng. **zh** ≈ “tr” không bật hơi, **ch** ≈ “tr” bật hơi mạnh, **sh** ≈ “s” uốn lưỡi, **r** như sh nhưng rung dây thanh, ma sát rất nhẹ.\nChữ **i** đứng sau zh ch sh r đọc gần “ư” (zhī, shì), KHÔNG đọc “i”.',
  `知|zhi1|biết;吃|chi1|ăn;十|shi2|mười;日|ri4|ngày
这|zhe4|này;车|che1|xe;社|she4|xã hội;热|re4|nóng
找|zhao3|tìm;超|chao1|vượt;少|shao3|ít;绕|rao4|vòng
周|zhou1|tuần;抽|chou1|rút;手|shou3|tay;肉|rou4|thịt
站|zhan4|đứng;产|chan3|sinh ra;山|shan1|núi;染|ran3|nhuộm
真|zhen1|thật;陈|chen2|họ Trần;身|shen1|thân;人|ren2|người
正|zheng4|chính;城|cheng2|thành phố;生|sheng1|sinh;仍|reng2|vẫn
张|zhang1|tờ;长|chang2|dài;上|shang4|trên
中|zhong1|giữa;虫|chong2|sâu;容|rong2|dung
住|zhu4|ở;出|chu1|ra;书|shu1|sách;入|ru4|vào
桌|zhuo1|cái bàn;说|shuo1|nói;弱|ruo4|yếu
转|zhuan3|chuyển;船|chuan2|thuyền;软|ruan3|mềm
追|zhui1|đuổi;吹|chui1|thổi;水|shui3|nước
装|zhuang1|lắp;床|chuang2|giường;双|shuang1|đôi`);

add('i-zcs', 'ini', 'z · c · s (đầu lưỡi – răng)',
  'Đầu lưỡi **phẳng**, chạm sau răng cửa trên (KHÔNG uốn). **z** = “t” + “x” không bật hơi, **c** như z nhưng bật hơi mạnh, **s** gần “x/s” Việt.\nChữ **i** sau z c s đọc gần “ư” (zì, cí, sì), không đọc “i”.',
  `字|zi4|chữ;次|ci4|lần;四|si4|bốn
在|zai4|ở;菜|cai4|rau;赛|sai4|thi đấu
早|zao3|sớm;草|cao3|cỏ;嫂|sao3|chị dâu
走|zou3|đi;凑|cou4|ghép;搜|sou1|tìm kiếm
杂|za2|tạp;擦|ca1|lau;洒|sa3|rắc
做|zuo4|làm;错|cuo4|sai;所|suo3|nơi
最|zui4|nhất;脆|cui4|giòn;岁|sui4|tuổi
总|zong3|tổng;从|cong2|từ;送|song4|tặng
咱|zan2|chúng ta;餐|can1|bữa ăn;三|san1|ba
自己|zi4 ji3|bản thân;词典|ci2 dian3|từ điển;思想|si1 xiang3|tư tưởng`);

add('i-allinit', 'ini', 'Tổng hợp 21 thanh mẫu',
  'Mỗi nhóm có đủ các thanh mẫu của một hàng: nghe thật kỹ rồi chọn. Đây là bài tổng ôn cho giai đoạn 1.',
  `八|ba1|tám;怕|pa4|sợ;大|da4|to;他|ta1|anh ấy
哥|ge1|anh trai;科|ke1|khoa;家|jia1|nhà;七|qi1|bảy
知|zhi1|biết;吃|chi1|ăn;资|zi1|vốn;次|ci4|lần
是|shi4|là;四|si4|bốn;西|xi1|tây;日|ri4|ngày
妈|ma1|mẹ;你|ni3|bạn;来|lai2|đến;发|fa1|gửi
好|hao3|tốt;老|lao3|già;饱|bao3|no;跑|pao3|chạy
喝|he1|uống;和|he2|và;河|he2|sông;课|ke4|bài
谢谢|xie4 xie5|cảm ơn;再见|zai4 jian4|tạm biệt;你好|ni3 hao3|xin chào`);

// ======================= GIAI ĐOẠN 2: VẬN MẪU =======================
add('f-simple', 'fin', '6 vận mẫu đơn: a o e i u ü',
  '**e** đọc giữa “ơ” và “ưa”, môi KHÔNG tròn (không đọc “e” Việt). **o** môi tròn, nghe gần “ua/uô” nhẹ.\n**ü**: giữ lưỡi như đọc **i**, rồi tròn môi lại như đọc **u** (không đổi vị trí lưỡi). Mẹo: kéo dài “iiii…” rồi từ từ chu môi.',
  `他|ta1|anh ấy;大|da4|to;妈|ma1|mẹ;发|fa1|gửi
破|po4|vỡ;佛|fo2|Phật;磨|mo2|mài;摸|mo1|sờ
喝|he1|uống;饿|e4|đói;可|ke3|có thể;热|re4|nóng
你|ni3|bạn;米|mi3|gạo;一|yi1|một;鸡|ji1|gà
不|bu4|không;书|shu1|sách;五|wu3|năm;路|lu4|đường
女|nü3|nữ;去|qu4|đi;鱼|yu2|cá;绿|lü4|xanh lục
吗|ma5|(trợ từ);么|me5|(hậu tố);哦|o4|ồ`);

add('f-special', 'fin', 'Vận mẫu đặc biệt: -i và er',
  '**-i** sau z c s: đọc gần “ư”, lưỡi phẳng (字 zì ≈ “tư”). **-i** sau zh ch sh r: gần “ư” nhưng giữ lưỡi **uốn** (知 zhī, 是 shì).\n**er**: đọc “ơ” rồi cuộn đầu lưỡi lên (二 èr). Lỗi rất phổ biến: đọc 是 là “shi” hoặc 四 là “xi”.',
  `字|zi4|chữ;次|ci4|lần;四|si4|bốn
知|zhi1|biết;吃|chi1|ăn;是|shi4|là;日|ri4|ngày
鸡|ji1|gà;知|zhi1|biết;资|zi1|vốn
西|xi1|tây;师|shi1|thầy;思|si1|nghĩ
洗|xi3|rửa;死|si3|chết;史|shi3|lịch sử;起|qi3|dậy
二|er4|hai;耳|er3|tai;儿|er2|con;而|er2|mà
儿子|er2 zi5|con trai;耳朵|er3 duo5|cái tai;女儿|nü3 er2|con gái
词|ci2|từ;迟|chi2|muộn;时|shi2|giờ`);

add('f-ai-ei-ao-ou', 'fin', 'ai · ei · ao · ou',
  '**ai** ≈ “ai”, **ei** ≈ “ây”, **ao** ≈ “ao”, **ou** ≈ “âu”. Nghe đủ cả hai phần của vần, không nuốt âm cuối.',
  `买|mai3|mua;每|mei3|mỗi;猫|mao1|mèo;某|mou3|nào đó
来|lai2|đến;雷|lei2|sấm;老|lao3|già;楼|lou2|tầng
白|bai2|trắng;杯|bei1|cái ly;包|bao1|túi;偷|tou1|trộm
海|hai3|biển;黑|hei1|đen;好|hao3|tốt;后|hou4|sau
在|zai4|ở;贼|zei2|kẻ trộm;早|zao3|sớm;走|zou3|đi
开|kai1|mở;给|gei3|cho;考|kao3|thi;口|kou3|miệng
爱|ai4|yêu;北|bei3|bắc;少|shao3|ít;手|shou3|tay
太|tai4|quá;累|lei4|mệt;套|tao4|bộ;透|tou4|xuyên qua`);

add('f-ia-ie-ua-uo', 'fin', 'ia · ie · ua · uo · üe',
  '**ie** đọc gần “iê” (谢 xiè), **üe** gần “uê” với môi tròn (学 xué). **uo** ≈ “ua/uô”, **ua** ≈ “oa”.',
  `家|jia1|nhà;街|jie1|phố;下|xia4|xuống;谢|xie4|cảm ơn
牙|ya2|răng;爷|ye2|ông nội;鞋|xie2|giày;夜|ye4|đêm
花|hua1|hoa;火|huo3|lửa;瓜|gua1|dưa;国|guo2|nước
刷|shua1|chải;说|shuo1|nói;多|duo1|nhiều;锁|suo3|khóa
学|xue2|học;月|yue4|tháng;雪|xue3|tuyết;绝|jue2|tuyệt
写|xie3|viết;些|xie1|một vài;靴|xue1|ủng;确|que4|chắc chắn
爬|pa2|leo;坐|zuo4|ngồi;错|cuo4|sai;哥|ge1|anh`);

add('f-iao-iou-uai-uei', 'fin', 'iao · iou · uai · uei',
  'Khi đọc phải đủ âm giữa: **iou** → “iêu”, **uei** → “uây”. Chú ý **iao** đọc “i-ao” liền một hơi.',
  `小|xiao3|nhỏ;九|jiu3|chín;快|kuai4|nhanh;对|dui4|đúng
叫|jiao4|gọi;六|liu4|sáu;坏|huai4|hỏng;贵|gui4|đắt
表|biao3|đồng hồ;牛|niu2|bò;怀|huai2|ôm;水|shui3|nước
鸟|niao3|chim;游|you2|bơi;帅|shuai4|đẹp trai;回|hui2|về
跳|tiao4|nhảy;秋|qiu1|thu;外|wai4|ngoài;队|dui4|đội
药|yao4|thuốc;有|you3|có;歪|wai1|lệch;为|wei4|vì
笑|xiao4|cười;留|liu2|lưu;帅|shuai4|đẹp trai;岁|sui4|tuổi`);

add('f-short', 'fin', 'Ba vận mẫu viết tắt: iu · ui · un',
  'Khi có thanh mẫu đứng trước, **iou → iu**, **uei → ui**, **uen → un** (viết rút gọn) nhưng khi ĐỌC vẫn có âm giữa: 六 liù ≈ “liêu”, 对 duì ≈ “tuây”, 春 chūn ≈ “truân”.\nDấu thanh đặt lên chữ cái đứng SAU (liù, guì).',
  `六|liu4|sáu;九|jiu3|chín;牛|niu2|bò;秋|qiu1|thu
对|dui4|đúng;贵|gui4|đắt;回|hui2|về;水|shui3|nước
春|chun1|xuân;顿|dun4|bữa;准|zhun3|chuẩn;滚|gun3|lăn
修|xiu1|sửa;休|xiu1|nghỉ;留|liu2|lưu;球|qiu2|bóng
最|zui4|nhất;岁|sui4|tuổi;队|dui4|đội;堆|dui1|đống
困|kun4|buồn ngủ;论|lun4|bàn luận;孙|sun1|cháu;魂|hun2|hồn`);

add('f-nasal', 'fin', 'Vận mẫu mũi: an en ang eng · ian in iang ing · uan un uang ong…',
  '**-n**: đầu lưỡi chạm lợi trên (như “n” cuối tiếng Việt). **-ng**: gốc lưỡi nâng, miệng mở (như “ng”). Hai loại này PHÂN BIỆT NGHĨA: 金 jīn ≠ 京 jīng.\n**ian** đọc “iên”, **ing** đọc gần “inh”, **eng** gần “âng”, **ong** gần “ung”.',
  `看|kan4|xem;很|hen3|rất;忙|mang2|bận;冷|leng3|lạnh
饭|fan4|cơm;分|fen1|phút;放|fang4|đặt;风|feng1|gió
山|shan1|núi;深|shen1|sâu;上|shang4|trên;生|sheng1|sinh
天|tian1|trời;新|xin1|mới;想|xiang3|muốn;听|ting1|nghe
见|jian4|thấy;近|jin4|gần;讲|jiang3|nói;静|jing4|yên tĩnh
先|xian1|trước;心|xin1|tim;香|xiang1|thơm;星|xing1|sao
关|guan1|đóng;春|chun1|xuân;光|guang1|ánh sáng;工|gong1|công
穿|chuan1|mặc;顿|dun4|bữa;床|chuang2|giường;中|zhong1|giữa
完|wan2|xong;文|wen2|văn;王|wang2|vua;翁|weng1|ông lão
远|yuan3|xa;云|yun2|mây;熊|xiong2|gấu;用|yong4|dùng
圆|yuan2|tròn;群|qun2|đám đông;穷|qiong2|nghèo;勇|yong3|dũng`);

// ======================= GIAI ĐOẠN 3: THANH ĐIỆU =======================
add('t-four', 'ton', 'Bốn thanh điệu (cùng một âm tiết)',
  '**Thanh 1** (55) cao và bằng, cao hơn hẳn thanh ngang Việt. **Thanh 2** (35) đi lên, kéo dài, mềm. **Thanh 3** (214) xuống thấp rồi lên, quan trọng nhất là đoạn trầm thấp. **Thanh 4** (51) rơi mạnh từ cao xuống thấp, ngắn, dứt khoát.\nKhó với người Việt: thanh 3 > thanh 4 > thanh 1 > thanh 2.',
  `妈|ma1|mẹ;麻|ma2|gai;马|ma3|ngựa;骂|ma4|mắng
汤|tang1|canh;糖|tang2|đường;躺|tang3|nằm;烫|tang4|bỏng
书|shu1|sách;熟|shu2|chín;鼠|shu3|chuột;树|shu4|cây
衣|yi1|áo;姨|yi2|dì;椅|yi3|ghế;意|yi4|ý
吃|chi1|ăn;迟|chi2|muộn;尺|chi3|thước;翅|chi4|cánh
八|ba1|tám;拔|ba2|nhổ;把|ba3|cầm;爸|ba4|bố
温|wen1|ấm;文|wen2|văn;吻|wen3|hôn;问|wen4|hỏi
方|fang1|vuông;房|fang2|phòng;访|fang3|thăm;放|fang4|đặt
通|tong1|thông;同|tong2|cùng;桶|tong3|thùng;痛|tong4|đau
花|hua1|hoa;滑|hua2|trơn;画|hua4|vẽ
高|gao1|cao;糕|gao1|bánh;搞|gao3|làm;告|gao4|báo`);

add('t-c1', 'ton', 'Tổ hợp: thanh 1 + (1 · 2 · 3 · 4 · nhẹ)',
  'Luyện đọc hàng ngang: hai âm tiết là đơn vị thật của tiếng Trung. Với thanh 1 đứng đầu, đọc **thật cao và đều** rồi chuyển sang thanh sau.',
  `飞机|fei1 ji1|máy bay;中国|zhong1 guo2|Trung Quốc;铅笔|qian1 bi3|bút chì;生日|sheng1 ri4|sinh nhật;桌子|zhuo1 zi5|cái bàn
今天|jin1 tian1|hôm nay;家庭|jia1 ting2|gia đình;参考|can1 kao3|tham khảo;方便|fang1 bian4|tiện lợi;妈妈|ma1 ma5|mẹ
咖啡|ka1 fei1|cà phê;欢迎|huan1 ying2|chào mừng;经理|jing1 li3|giám đốc;医院|yi1 yuan4|bệnh viện;衣服|yi1 fu5|quần áo
工资|gong1 zi1|lương;公园|gong1 yuan2|công viên;开始|kai1 shi3|bắt đầu;吃饭|chi1 fan4|ăn cơm;休息|xiu1 xi5|nghỉ ngơi
星期|xing1 qi1|tuần lễ;山东|shan1 dong1|Sơn Đông;香港|xiang1 gang3|Hồng Kông;商店|shang1 dian4|cửa hàng;商量|shang1 liang5|bàn bạc`);

add('t-c2', 'ton', 'Tổ hợp: thanh 2 + (1 · 2 · 3 · 4 · nhẹ)',
  'Thanh 2 đứng đầu: **đi lên mềm** rồi đổi sang thanh kế. Đừng đọc quá ngắn và gắt như thanh sắc Việt.',
  `明天|ming2 tian1|ngày mai;学习|xue2 xi2|học tập;苹果|ping2 guo3|quả táo;学校|xue2 xiao4|trường học;朋友|peng2 you5|bạn bè
房间|fang2 jian1|căn phòng;银行|yin2 hang2|ngân hàng;啤酒|pi2 jiu3|bia;白色|bai2 se4|màu trắng;什么|shen2 me5|cái gì
昨天|zuo2 tian1|hôm qua;人民|ren2 min2|nhân dân;牛奶|niu2 nai3|sữa bò;杂志|za2 zhi4|tạp chí;学生|xue2 sheng5|học sinh
回家|hui2 jia1|về nhà;同学|tong2 xue2|bạn học;游泳|you2 yong3|bơi;城市|cheng2 shi4|thành phố;名字|ming2 zi5|tên`);

add('t-c3', 'ton', 'Tổ hợp: thanh 3 + (1 · 2 · 3 · 4 · nhẹ)',
  'Thanh 3 đứng trước thanh khác chỉ đọc **nửa thanh 3** (21): trầm xuống, KHÔNG lên lại. Hai thanh 3 liền nhau: thanh đầu → thanh 2 (你好 đọc ní hǎo).',
  `手机|shou3 ji1|điện thoại;美国|mei3 guo2|nước Mỹ;你好|ni3 hao3|xin chào;考试|kao3 shi4|thi;姐姐|jie3 jie5|chị gái
北京|bei3 jing1|Bắc Kinh;起床|qi3 chuang2|ngủ dậy;水果|shui3 guo3|trái cây;早饭|zao3 fan4|bữa sáng;我们|wo3 men5|chúng tôi
老师|lao3 shi1|giáo viên;旅游|lü3 you2|du lịch;可以|ke3 yi3|có thể;请问|qing3 wen4|xin hỏi;喜欢|xi3 huan5|thích
火车|huo3 che1|tàu hỏa;语言|yu3 yan2|ngôn ngữ;老板|lao3 ban3|ông chủ;感谢|gan3 xie4|cảm ơn;椅子|yi3 zi5|cái ghế`);

add('t-c4', 'ton', 'Tổ hợp: thanh 4 + (1 · 2 · 3 · 4 · nhẹ)',
  'Thanh 4 đứng đầu: **bắt đầu thật cao** rồi rơi mạnh. Lỗi hay gặp: bắt đầu quá thấp nên nghe thành thanh huyền hoặc nặng.',
  `上班|shang4 ban1|đi làm;问题|wen4 ti2|vấn đề;电脑|dian4 nao3|máy tính;再见|zai4 jian4|tạm biệt;爸爸|ba4 ba5|bố
后天|hou4 tian1|ngày kia;大学|da4 xue2|đại học;办法|ban4 fa3|cách;电话|dian4 hua4|điện thoại;谢谢|xie4 xie5|cảm ơn
汽车|qi4 che1|ô tô;地图|di4 tu2|bản đồ;热水|re4 shui3|nước nóng;运动|yun4 dong4|vận động;漂亮|piao4 liang5|xinh đẹp
电视|dian4 shi4|tivi;故事|gu4 shi5|câu chuyện;意思|yi4 si5|ý nghĩa;大夫|dai4 fu5|bác sĩ`);

add('t-sandhi', 'ton', 'Biến điệu thanh 3 (3 + 3 → 2 + 3)',
  '**Quy tắc 1**: hai thanh 3 liền nhau → thanh đầu đọc thành **thanh 2** (你好 nǐ hǎo → ní hǎo). **Quy tắc 2**: thanh 3 đứng trước thanh 1, 2, 4 hoặc thanh nhẹ chỉ đọc nửa thanh 3. **Quy tắc 3**: ba thanh 3 liền nhau tùy cách ngắt nghĩa, nói nhanh thường thành 2-2-3.\nPinyin vẫn ghi thanh gốc; bạn phải tự biến điệu khi đọc. Khi gõ, nhập thanh gốc hoặc thanh đã biến đều được chấm đúng.',
  `你好|ni3 hao3|xin chào;可以|ke3 yi3|có thể;水果|shui3 guo3|trái cây;洗手|xi3 shou3|rửa tay
老板|lao3 ban3|ông chủ;雨伞|yu3 san3|cái ô;很好|hen3 hao3|rất tốt;手表|shou3 biao3|đồng hồ
洗澡|xi3 zao3|tắm;打扫|da3 sao3|quét dọn;法语|fa3 yu3|tiếng Pháp;美女|mei3 nü3|người đẹp
展览馆|zhan3 lan3 guan3|nhà triển lãm;我很好|wo3 hen3 hao3|tôi rất khỏe;买水果|mai3 shui3 guo3|mua trái cây;好老板|hao3 lao3 ban3|ông chủ tốt`);

add('t-yibu', 'ton', 'Biến điệu của 一 (yī) và 不 (bù)',
  '**不**: trước thanh 4 → **bú** (不是 bú shì); trước thanh 1, 2, 3 và đứng cuối giữ **bù**. Giữa câu hỏi chính phản (好不好) → thanh nhẹ.\n**一**: đứng một mình, cuối từ, số thứ tự → **yī**. Trước thanh 4 → **yí**. Trước thanh 1, 2, 3 → **yì**. Giữa động từ lặp (看一看) → thanh nhẹ.\nMẹo: 一 và 不 đều đổi thành thanh 2 trước thanh 4; riêng 一 đổi thành thanh 4 trước các thanh còn lại.',
  `一天|yi1 tian1|một ngày;一年|yi1 nian2|một năm;一起|yi1 qi3|cùng nhau;一个|yi1 ge4|một cái;一样|yi1 yang4|giống nhau
不去|bu4 qu4|không đi;不是|bu4 shi4|không phải;不好|bu4 hao3|không tốt;不来|bu4 lai2|không đến;不要|bu4 yao4|không cần
一定|yi1 ding4|nhất định;一些|yi1 xie1|một vài;一边|yi1 bian1|một bên;一直|yi1 zhi2|luôn luôn;一般|yi1 ban1|thường
第一|di4 yi1|thứ nhất;十一|shi2 yi1|mười một;统一|tong3 yi1|thống nhất;唯一|wei2 yi1|duy nhất
看一看|kan4 yi5 kan4|xem thử;想一想|xiang3 yi5 xiang3|nghĩ thử;好不好|hao3 bu5 hao3|được không;去不去|qu4 bu5 qu4|đi không
不对|bu4 dui4|không đúng;不怕|bu4 pa4|không sợ;不多|bu4 duo1|không nhiều;不同|bu4 tong2|khác nhau;不错|bu4 cuo4|không tệ`);

add('t-neutral', 'ton', 'Thanh nhẹ (轻声)',
  'Thanh nhẹ đọc **ngắn, nhẹ**, độ cao phụ thuộc thanh đứng trước: sau thanh 1 hơi thấp, sau thanh 2 trung bình, sau thanh 3 hơi cao, sau thanh 4 thấp. Không đánh dấu thanh.\nHay gặp ở: trợ từ (的 了 吗 呢 吧), hậu tố (子 们 头 么), âm tiết sau của từ láy chỉ người thân, và một số từ phải học thuộc (东西, 客气, 认识, 知道, 喜欢). Có cặp đổi nghĩa khi thêm thanh nhẹ.',
  `的|de5|của;了|le5|rồi;吗|ma5|không (hỏi);呢|ne5|thì;吧|ba5|nhé
桌子|zhuo1 zi5|cái bàn;椅子|yi3 zi5|cái ghế;我们|wo3 men5|chúng tôi;木头|mu4 tou5|gỗ;什么|shen2 me5|cái gì
妈妈|ma1 ma5|mẹ;哥哥|ge1 ge5|anh trai;姐姐|jie3 jie5|chị gái;爸爸|ba4 ba5|bố;看看|kan4 kan5|xem thử
客气|ke4 qi5|khách sáo;认识|ren4 shi5|quen biết;知道|zhi1 dao5|biết;喜欢|xi3 huan5|thích;朋友|peng2 you5|bạn bè
先生|xian1 sheng5|ông;名字|ming2 zi5|tên;时候|shi2 hou5|lúc;地方|di4 fang5|nơi;意思|yi4 si5|ý nghĩa
!东西|dong1 xi1|đông và tây;东西|dong1 xi5|đồ vật
!地道|di4 dao4|địa đạo;地道|di4 dao5|chính tông
!大意|da4 yi4|đại ý;大意|da4 yi5|sơ ý`);

add('t-erhua', 'ton', 'Âm cuộn lưỡi 儿化 (érhuà)',
  'Giọng Bắc Kinh gắn 儿 vào cuối âm tiết trước, làm âm tiết đó cuộn lưỡi, viết pinyin thêm **-r**. Khi cuộn lưỡi âm cuối -i, -n thường rơi mất (一点儿 yìdiǎnr, 玩儿 wánr); -ng để lại âm mũi trên nguyên âm.\nBạn cần nghe hiểu; không bắt buộc phải dùng nhiều khi nói (miền Nam và Đài Loan ít dùng).',
  `哪儿|nar3|ở đâu;这儿|zher4|ở đây;那儿|nar4|ở đó
一点儿|yi4 dianr3|một chút;玩儿|wanr2|chơi;一块儿|yi2 kuair4|cùng nhau
花儿|huar1|hoa;画儿|huar4|tranh;小孩儿|xiao3 hair2|em bé
事儿|shir4|việc;今儿|jinr1|hôm nay;空儿|kongr4|thời gian rảnh`,
  { nt: true });

// ======================= GIAI ĐOẠN 4: CẶP & NHÓM DỄ NHẦM =======================
add('p-bp', 'pair', 'b ↔ p (không bật hơi / bật hơi)',
  'Thử tờ giấy: **p** phải thổi bay tờ giấy, **b** thì không. Khi đọc b, d, g cổ họng KHÔNG rung.',
  `爸|ba4|bố;怕|pa4|sợ
白|bai2|trắng;排|pai2|xếp hàng
宝|bao3|bảo bối;跑|pao3|chạy
被|bei4|bị;配|pei4|ghép
半|ban4|nửa;判|pan4|phán xét
本|ben3|quyển;喷|pen1|phun
帮|bang1|giúp;旁|pang2|bên cạnh
变|bian4|biến;骗|pian4|lừa
标|biao1|nhãn;飘|piao1|bay lượn
布|bu4|vải;谱|pu3|bản nhạc
冰|bing1|băng;平|ping2|bằng phẳng
八|ba1|tám;趴|pa1|nằm sấp
不|bu4|không;扑|pu1|nhào
壁|bi4|vách;屁|pi4|rắm
笔|bi3|cây bút;批|pi1|phê`);

add('p-dt', 'pair', 'd ↔ t (không bật hơi / bật hơi)',
  '**d** = “t” Việt (không đọc “đ”), **t** = “th” bật hơi mạnh. Nhớ: d không phải “đ”.',
  `肚|du4|bụng;兔|tu4|thỏ
多|duo1|nhiều;脱|tuo1|cởi
到|dao4|đến;套|tao4|bộ
大|da4|to;他|ta1|anh ấy
地|di4|đất;替|ti4|thay
电|dian4|điện;天|tian1|trời
对|dui4|đúng;退|tui4|lùi
豆|dou4|đậu;偷|tou1|trộm
等|deng3|đợi;疼|teng2|đau
东|dong1|đông;同|tong2|cùng
蛋|dan4|trứng;谈|tan2|nói chuyện
低|di1|thấp;梯|ti1|thang
刀|dao1|dao;桃|tao2|đào
段|duan4|đoạn;团|tuan2|đoàn
单|dan1|đơn;摊|tan1|quầy hàng
夺|duo2|giành;驼|tuo2|lạc đà`);

add('p-gk', 'pair', 'g ↔ k (không bật hơi / bật hơi)',
  '**g** = “c/k” không bật hơi (không đọc “g”), **k** = “k” bật hơi mạnh (không phải “kh”).',
  `哥|ge1|anh trai;科|ke1|khoa
个|ge4|cái;课|ke4|bài học
高|gao1|cao;考|kao3|thi
狗|gou3|chó;口|kou3|miệng
刚|gang1|vừa mới;康|kang1|khỏe
工|gong1|công;空|kong1|trống
关|guan1|đóng;宽|kuan1|rộng
古|gu3|cổ;苦|ku3|đắng
瓜|gua1|dưa;夸|kua1|khen
果|guo3|quả;阔|kuo4|rộng rãi
光|guang1|ánh sáng;矿|kuang4|mỏ
管|guan3|quản;款|kuan3|khoản
根|gen1|gốc;肯|ken3|chịu
贵|gui4|đắt;亏|kui1|thiệt
改|gai3|sửa;开|kai1|mở`);

add('p-jq', 'pair', 'j ↔ q (không bật hơi / bật hơi)',
  '**q** KHÔNG đọc “qu”: gần “ch” bật hơi mạnh với mặt lưỡi áp vòm. **j** gần “ch” nhẹ, không bật hơi.',
  `鸡|ji1|gà;七|qi1|bảy
姐|jie3|chị;且|qie3|vả lại
讲|jiang3|nói;抢|qiang3|cướp
叫|jiao4|gọi;桥|qiao2|cầu
九|jiu3|chín;球|qiu2|quả bóng
件|jian4|cái (áo);欠|qian4|nợ
近|jin4|gần;勤|qin2|chăm
京|jing1|kinh đô;清|qing1|trong
静|jing4|yên tĩnh;请|qing3|mời
剧|ju4|kịch;去|qu4|đi
绝|jue2|tuyệt;缺|que1|thiếu
军|jun1|quân;群|qun2|đám đông
卷|juan3|cuộn;圈|quan1|vòng
极|ji2|cực;齐|qi2|đều
机|ji1|máy;期|qi1|kỳ
借|jie4|mượn;切|qie1|cắt`);

add('p-zhch', 'pair', 'zh ↔ ch (không bật hơi / bật hơi)',
  'Cả hai đều **uốn lưỡi**; **ch** thêm luồng hơi mạnh. Đừng đọc thành z / c (lưỡi phẳng).',
  `知|zhi1|biết;吃|chi1|ăn
直|zhi2|thẳng;迟|chi2|muộn
这|zhe4|này;车|che1|xe
找|zhao3|tìm;超|chao1|vượt
中|zhong1|giữa;虫|chong2|sâu
正|zheng4|chính;成|cheng2|thành
真|zhen1|thật;陈|chen2|họ Trần
站|zhan4|đứng;产|chan3|sinh ra
张|zhang1|tờ;长|chang2|dài
周|zhou1|tuần;抽|chou1|rút
住|zhu4|ở;出|chu1|ra
转|zhuan3|chuyển;船|chuan2|thuyền
装|zhuang1|lắp;床|chuang2|giường
追|zhui1|đuổi;吹|chui1|thổi
招|zhao1|vẫy;潮|chao2|thủy triều
争|zheng1|tranh;撑|cheng1|chống`);

add('p-zc', 'pair', 'z ↔ c (không bật hơi / bật hơi)',
  'Lưỡi phẳng sau răng cửa. **c** = z + luồng hơi mạnh. Cả hai KHÔNG uốn lưỡi.',
  `在|zai4|ở;菜|cai4|rau
早|zao3|sớm;草|cao3|cỏ
走|zou3|đi;凑|cou4|ghép
做|zuo4|làm;错|cuo4|sai
杂|za2|tạp;擦|ca1|lau
最|zui4|nhất;脆|cui4|giòn
总|zong3|tổng;从|cong2|từ
赞|zan4|khen;灿|can4|rực rỡ
字|zi4|chữ;次|ci4|lần
组|zu3|nhóm;粗|cu1|thô
尊|zun1|tôn;存|cun2|tồn tại
咱|zan2|chúng ta;餐|can1|bữa ăn
才|cai2|mới;栽|zai1|trồng
曾|zeng1|từng;层|ceng2|tầng`);

add('p-zzh', 'pair', 'z ↔ zh (lưỡi phẳng / lưỡi uốn)',
  'Cặp **khó nhất** với người Việt. z: đầu lưỡi phẳng chạm sau răng cửa trên. zh: **cong lưỡi** lên vòm cứng. Luyện cặp 资源 zīyuán (tài nguyên) / 支援 zhīyuán (chi viện) mỗi ngày.',
  `资|zi1|vốn;知|zhi1|biết
字|zi4|chữ;志|zhi4|chí
杂|za2|tạp;闸|zha2|cái chặn
再|zai4|lại;债|zhai4|nợ
早|zao3|sớm;找|zhao3|tìm
走|zou3|đi;周|zhou1|tuần
做|zuo4|làm;桌|zhuo1|cái bàn
赞|zan4|khen;站|zhan4|đứng
总|zong3|tổng;中|zhong1|giữa
组|zu3|nhóm;主|zhu3|chủ
尊|zun1|tôn;准|zhun3|chuẩn
最|zui4|nhất;追|zhui1|đuổi
自|zi4|tự;治|zhi4|trị
资源|zi1 yuan2|tài nguyên;支援|zhi1 yuan2|chi viện
增|zeng1|tăng;蒸|zheng1|hấp
脏|zang1|bẩn;张|zhang1|tờ`);

add('p-cch', 'pair', 'c ↔ ch (lưỡi phẳng / lưỡi uốn, đều bật hơi)',
  'Cùng bật hơi mạnh, khác ở lưỡi: **c** phẳng, **ch** cong lên. Đối chiếu: 粗 cū (thô) / 出 chū (ra).',
  `粗|cu1|thô;出|chu1|ra
擦|ca1|lau;插|cha1|cắm
菜|cai4|rau;拆|chai1|dỡ
才|cai2|mới;柴|chai2|củi
草|cao3|cỏ;炒|chao3|xào
从|cong2|từ;虫|chong2|sâu
层|ceng2|tầng;成|cheng2|thành
蚕|can2|tằm;缠|chan2|quấn
次|ci4|lần;翅|chi4|cánh
错|cuo4|sai;戳|chuo1|chọc
村|cun1|làng;春|chun1|xuân
餐|can1|bữa ăn;产|chan3|sinh ra`);

add('p-ssh', 'pair', 's ↔ sh (lưỡi phẳng / lưỡi uốn)',
  'Đối chiếu kinh điển: 三 sān (ba) / 山 shān (núi); 四 sì (bốn) / 是 shì (là). Câu luyện: **四是四，十是十** (sì shì sì, shí shì shí).',
  `三|san1|ba;山|shan1|núi
四|si4|bốn;是|shi4|là
死|si3|chết;史|shi3|lịch sử
色|se4|màu;社|she4|xã hội
苏|su1|họ Tô;书|shu1|sách
岁|sui4|tuổi;睡|shui4|ngủ
散|san4|tan;扇|shan4|quạt
搜|sou1|tìm kiếm;收|shou1|thu
桑|sang1|dâu;商|shang1|buôn bán
森|sen1|rừng;深|shen1|sâu
思|si1|nghĩ;师|shi1|thầy
素|su4|chay;树|shu4|cây
洒|sa3|rắc;傻|sha3|ngốc
所|suo3|nơi;说|shuo1|nói
四是四|si4 shi4 si4|bốn là bốn;十是十|shi2 shi4 shi2|mười là mười`);

add('p-xsh', 'pair', 'x ↔ sh (mặt lưỡi / lưỡi uốn) và j ↔ zh',
  '**x**: môi kéo ngang, mặt lưỡi áp vòm, nghe “mềm”. **sh**: lưỡi CONG lên. Tương tự **j** (mặt lưỡi) và **zh** (lưỡi uốn).',
  `西|xi1|tây;师|shi1|thầy
小|xiao3|nhỏ;少|shao3|ít
想|xiang3|muốn;赏|shang3|thưởng
心|xin1|tim;深|shen1|sâu
星|xing1|sao;生|sheng1|sinh
笑|xiao4|cười;绍|shao4|giới thiệu
修|xiu1|sửa;收|shou1|thu
鸡|ji1|gà;知|zhi1|biết
九|jiu3|chín;周|zhou1|tuần
见|jian4|thấy;站|zhan4|đứng
经|jing1|kinh;正|zheng4|chính
家|jia1|nhà;扎|zha1|buộc
叫|jiao4|gọi;照|zhao4|chiếu
今|jin1|nay;真|zhen1|thật`);

add('p-rl', 'pair', 'r ↔ l (và r ↔ sh / r ↔ z)',
  '**r** = lưỡi cong như **sh** nhưng rung dây thanh, ma sát rất nhẹ; KHÔNG đọc “d”, “gi”, “z” hay “l”. **l** = đầu lưỡi chạm lợi, hơi qua hai bên.',
  `热|re4|nóng;乐|le4|vui
让|rang4|nhường;浪|lang4|sóng
肉|rou4|thịt;漏|lou4|rò
日|ri4|ngày;力|li4|sức
软|ruan3|mềm;卵|luan3|trứng
绕|rao4|vòng;烙|lao4|nướng
然|ran2|nhiên;兰|lan2|lan
容|rong2|dung;龙|long2|rồng
如|ru2|như;炉|lu2|lò
人|ren2|người;神|shen2|thần
日|ri4|ngày;是|shi4|là
热|re4|nóng;色|se4|màu
仍|reng2|vẫn;层|ceng2|tầng
让|rang4|nhường;上|shang4|trên`);

add('p-nl', 'pair', 'n ↔ l',
  '**n**: đầu lưỡi chạm lợi trên, hơi thoát qua MŨI (bịt mũi sẽ không đọc được). **l**: hơi thoát hai bên lưỡi. Với **ü**: 女 nǚ (nữ) ≠ 努 nǔ (cố gắng), 绿 lǜ ≠ 路 lù.',
  `你|ni3|bạn;里|li3|trong
南|nan2|nam;蓝|lan2|xanh lam
牛|niu2|bò;流|liu2|chảy
脑|nao3|não;老|lao3|già
农|nong2|nông;龙|long2|rồng
暖|nuan3|ấm;乱|luan4|loạn
奶|nai3|sữa;来|lai2|đến
年|nian2|năm;连|lian2|liền
难|nan2|khó;篮|lan2|giỏ
内|nei4|trong;累|lei4|mệt
泥|ni2|bùn;离|li2|cách
女|nü3|nữ;吕|lü3|họ Lã
努|nu3|cố gắng;鲁|lu3|họ Lỗ
绿|lü4|xanh lục;路|lu4|đường`);

add('p-fh', 'pair', 'f ↔ h',
  '**f** = răng trên chạm môi dưới (như “ph” Việt). **h** = xát ở cuống lưỡi, gần “kh” nhẹ. Người miền Nam Trung Quốc hay lẫn f / hu; cặp kinh điển: 肥 féi / 回 huí, 房 fáng / 黄 huáng.',
  `飞|fei1|bay;黑|hei1|đen
饭|fan4|cơm;汉|han4|Hán
福|fu2|phúc;湖|hu2|hồ
夫|fu1|chồng;呼|hu1|gọi
复|fu4|phục;户|hu4|hộ
风|feng1|gió;哼|heng1|hừ
发|fa1|gửi;花|hua1|hoa
肥|fei2|béo;回|hui2|về
粉|fen3|bột;很|hen3|rất
房|fang2|phòng;黄|huang2|vàng
放|fang4|đặt;荒|huang1|hoang
法|fa3|phép;哈|ha1|ha`);

add('p-kh', 'pair', 'k ↔ h',
  '**k** bật hơi mạnh; **h** chỉ xát nhẹ ở cuống lưỡi. Đừng đọc k là “kh”, cũng đừng đọc h là “h” Việt.',
  `看|kan4|xem;汉|han4|Hán
开|kai1|mở;害|hai4|hại
口|kou3|miệng;厚|hou4|dày
苦|ku3|đắng;虎|hu3|hổ
课|ke4|bài học;贺|he4|chúc mừng
空|kong1|trống;红|hong2|đỏ
快|kuai4|nhanh;坏|huai4|hỏng
宽|kuan1|rộng;欢|huan1|vui
矿|kuang4|mỏ;黄|huang2|vàng
扩|kuo4|mở rộng;火|huo3|lửa
客|ke4|khách;核|he2|hạt nhân
困|kun4|buồn ngủ;婚|hun1|hôn nhân`);

add('p-an-ang', 'pair', '-n ↔ -ng (an/ang · en/eng)',
  '**-n**: đầu lưỡi chạm lợi trên, miệng gần khép. **-ng**: gốc lưỡi nâng, miệng mở, âm vang trong mũi. Hai âm này phân biệt nghĩa: 人民 rénmín (nhân dân) ≠ 人名 rénmíng (tên người).',
  `山|shan1|núi;伤|shang1|bị thương
班|ban1|lớp;帮|bang1|giúp
烦|fan2|phiền;房|fang2|phòng
蓝|lan2|xanh lam;狼|lang2|sói
晚|wan3|tối;网|wang3|mạng
饭|fan4|cơm;放|fang4|đặt
深|shen1|sâu;生|sheng1|sinh
陈|chen2|họ Trần;程|cheng2|họ Trình
真|zhen1|thật;争|zheng1|tranh
门|men2|cửa;盟|meng2|liên minh
森|sen1|rừng;僧|seng1|nhà sư
分|fen1|phút;风|feng1|gió
根|gen1|gốc;更|geng1|hơn
神|shen2|thần;绳|sheng2|sợi dây
站|zhan4|đứng;张|zhang1|tờ
人民|ren2 min2|nhân dân;人名|ren2 ming2|tên người`);

add('p-in-ing', 'pair', '-n ↔ -ng (in/ing · ian/iang · uan/uang · ong/eng)',
  '**in** đọc “in”, **ing** đọc gần “inh” (hơi vang mũi). **ian** đọc “iên”, **iang** đọc “i-ang”. Cặp kinh điển: 金 jīn (vàng) / 京 jīng (kinh đô).',
  `金|jin1|vàng;京|jing1|kinh đô
新|xin1|mới;星|xing1|sao
民|min2|dân;名|ming2|tên
亲|qin1|thân;青|qing1|xanh
进|jin4|vào;净|jing4|sạch
心|xin1|tim;行|xing2|được
林|lin2|rừng;零|ling2|không
先|xian1|trước;香|xiang1|thơm
见|jian4|thấy;酱|jiang4|tương
现|xian4|hiện;像|xiang4|giống
钱|qian2|tiền;墙|qiang2|tường
年|nian2|năm;娘|niang2|mẹ
关|guan1|đóng;光|guang1|ánh sáng
完|wan2|xong;王|wang2|vua
欢|huan1|vui;慌|huang1|hoảng
穿|chuan1|mặc;窗|chuang1|cửa sổ
东|dong1|đông;灯|deng1|đèn
同|tong2|cùng;疼|teng2|đau`);

add('p-vowel', 'pair', 'Cặp vận mẫu: ü/u/i · ai/ei · ao/ou · uo/ou',
  '**ü ↔ u**: môi tròn nhưng lưỡi ở vị trí i (ü) / lưỡi lùi sau (u). 女 nǚ ≠ 努 nǔ, 绿 lǜ ≠ 路 lù. **ai ↔ ei**, **ao ↔ ou**, **uo ↔ ou** là các cặp nghe gần giống: tập nghe vần.',
  `女|nü3|nữ;努|nu3|cố gắng
绿|lü4|xanh lục;路|lu4|đường
去|qu4|đi;气|qi4|khí
鱼|yu2|cá;姨|yi2|dì
需|xu1|cần;西|xi1|tây
举|ju3|giơ lên;几|ji3|mấy
雨|yu3|mưa;椅|yi3|ghế
月|yue4|tháng;夜|ye4|đêm
学|xue2|học;鞋|xie2|giày
远|yuan3|xa;眼|yan3|mắt
云|yun2|mây;银|yin2|bạc
来|lai2|đến;雷|lei2|sấm
拍|pai1|vỗ;陪|pei2|đi cùng
害|hai4|hại;黑|hei1|đen
猫|mao1|mèo;某|mou3|nào đó
道|dao4|đường;豆|dou4|đậu
走|zou3|đi;早|zao3|sớm
烧|shao1|đốt;收|shou1|thu
说|shuo1|nói;收|shou1|thu
多|duo1|nhiều;都|dou1|đều
错|cuo4|sai;凑|cou4|ghép
左|zuo3|trái;走|zou3|đi
哥|ge1|anh;锅|guo1|nồi
喝|he1|uống;活|huo2|sống
乐|le4|vui;落|luo4|rơi`);

add('p-tone12', 'pair', 'Thanh 1 ↔ thanh 2',
  'Thanh 1: cao và **bằng**. Thanh 2: **đi lên**, kéo dài và mềm. Lỗi hay gặp: đọc thanh 1 quá thấp (như thanh ngang Việt) hoặc thanh 2 quá gắt.',
  `妈|ma1|mẹ;麻|ma2|gai
汤|tang1|canh;糖|tang2|đường
书|shu1|sách;熟|shu2|chín
衣|yi1|áo;姨|yi2|dì
吃|chi1|ăn;迟|chi2|muộn
偷|tou1|trộm;头|tou2|đầu
方|fang1|vuông;房|fang2|phòng
听|ting1|nghe;停|ting2|dừng
青|qing1|xanh;晴|qing2|nắng
花|hua1|hoa;滑|hua2|trơn
鸡|ji1|gà;急|ji2|gấp
低|di1|thấp;敌|di2|địch
八|ba1|tám;拔|ba2|nhổ
温|wen1|ấm;文|wen2|văn
通|tong1|thông;同|tong2|cùng
香|xiang1|thơm;祥|xiang2|lành`);

add('p-tone23', 'pair', 'Thanh 2 ↔ thanh 3',
  'Thanh 2 đi lên, thanh 3 **xuống thấp rồi mới lên** (nửa thanh 3 chỉ xuống). Nhớ gạch chân phần trầm thấp của thanh 3.',
  `麻|ma2|gai;马|ma3|ngựa
糖|tang2|đường;躺|tang3|nằm
熟|shu2|chín;鼠|shu3|chuột
池|chi2|ao;尺|chi3|thước
鱼|yu2|cá;雨|yu3|mưa
姨|yi2|dì;椅|yi3|ghế
玩|wan2|chơi;晚|wan3|tối
蓝|lan2|xanh;懒|lan3|lười
才|cai2|mới;彩|cai3|màu
读|du2|đọc;肚|du3|bụng
前|qian2|trước;浅|qian3|nông
房|fang2|phòng;访|fang3|thăm
棉|mian2|bông;免|mian3|miễn
文|wen2|văn;吻|wen3|hôn
时|shi2|giờ;使|shi3|khiến
人|ren2|người;忍|ren3|nhịn`);

add('p-tone34', 'pair', 'Thanh 3 ↔ thanh 4',
  'Thanh 4 **rơi mạnh, ngắn, dứt khoát** từ cao xuống thấp; thanh 3 trầm hơn và dài hơn. Cặp trong giáo trình: 买 mǎi (mua) / 卖 mài (bán); 水饺 shuǐjiǎo / 睡觉 shuìjiào; 吻 wěn / 问 wèn.',
  `马|ma3|ngựa;骂|ma4|mắng
躺|tang3|nằm;烫|tang4|bỏng
鼠|shu3|chuột;树|shu4|cây
尺|chi3|thước;翅|chi4|cánh
雨|yu3|mưa;遇|yu4|gặp
椅|yi3|ghế;意|yi4|ý
晚|wan3|tối;万|wan4|vạn
买|mai3|mua;卖|mai4|bán
水饺|shui3 jiao3|sủi cảo;睡觉|shui4 jiao4|ngủ
吻|wen3|hôn;问|wen4|hỏi
懒|lan3|lười;烂|lan4|nát
彩|cai3|màu;菜|cai4|rau
久|jiu3|lâu;就|jiu4|thì
早|zao3|sớm;造|zao4|tạo
手|shou3|tay;受|shou4|chịu
写|xie3|viết;谢|xie4|cảm ơn`);

add('p-tone14', 'pair', 'Thanh 1 ↔ thanh 4',
  'Thanh 1 giữ **cao và bằng**; thanh 4 **rơi** từ cao xuống. Đừng bắt đầu thanh 4 quá thấp (sẽ nghe thành thanh huyền hay nặng).',
  `妈|ma1|mẹ;骂|ma4|mắng
汤|tang1|canh;烫|tang4|bỏng
书|shu1|sách;树|shu4|cây
吃|chi1|ăn;翅|chi4|cánh
衣|yi1|áo;意|yi4|ý
弯|wan1|cong;万|wan4|vạn
温|wen1|ấm;问|wen4|hỏi
方|fang1|vuông;放|fang4|đặt
山|shan1|núi;扇|shan4|quạt
花|hua1|hoa;画|hua4|vẽ
通|tong1|thông;痛|tong4|đau
高|gao1|cao;告|gao4|báo
烧|shao1|đốt;少|shao4|trẻ
鸡|ji1|gà;计|ji4|tính`);

add('p-homo', 'pair', 'Cùng âm, khác chữ (đồng âm)',
  'Tiếng Trung chỉ có khoảng 400 âm tiết (không kể thanh) nên rất nhiều chữ đọc GIỐNG HỆT nhau, vì vậy thanh điệu phải thật đúng. Bài này để đọc theo và gõ pinyin; không có bài nghe-chọn vì các từ đọc như nhau.',
  `!是|shi4|là;事|shi4|việc;市|shi4|chợ;试|shi4|thử;室|shi4|phòng;视|shi4|nhìn
!鸡|ji1|gà;机|ji1|máy;基|ji1|cơ sở;积|ji1|tích
!意|yi4|ý;义|yi4|nghĩa;易|yi4|dễ;艺|yi4|nghệ
!工|gong1|công;公|gong1|công cộng;功|gong1|công lao;弓|gong1|cung
!里|li3|trong;理|li3|lý;礼|li3|lễ;李|li3|họ Lý
!知|zhi1|biết;支|zhi1|nhánh;之|zhi1|của;枝|zhi1|cành
!记|ji4|nhớ;计|ji4|tính;季|ji4|mùa;继|ji4|tiếp
!到|dao4|đến;道|dao4|đường;倒|dao4|đổ;盗|dao4|trộm
!书|shu1|sách;输|shu1|thua;叔|shu1|chú;舒|shu1|thoải mái`);

// ======================= GIAI ĐOẠN 5: TỔNG HỢP =======================
add('c-words', 'cmp', 'Từ hai âm tiết khó (phối hợp thanh mẫu + vận mẫu + thanh điệu)',
  'Đọc chậm, chia thành từng âm tiết rồi nối lại. Chú ý uốn lưỡi, bật hơi, thanh điệu từng chữ.',
  `资源|zi1 yuan2|tài nguyên;支援|zhi1 yuan2|chi viện;自愿|zi4 yuan4|tự nguyện;志愿|zhi4 yuan4|nguyện vọng
老师|lao3 shi1|giáo viên;老实|lao3 shi5|thật thà;劳动|lao2 dong4|lao động;牢记|lao2 ji4|ghi nhớ
熟悉|shu2 xi1|quen thuộc;书写|shu1 xie3|viết;输血|shu1 xue4|truyền máu
商业|shang1 ye4|thương mại;事业|shi4 ye4|sự nghiệp;伤口|shang1 kou3|vết thương
习惯|xi2 guan4|thói quen;吸管|xi1 guan3|ống hút;西瓜|xi1 gua1|dưa hấu
天气|tian1 qi4|thời tiết;甜菜|tian2 cai4|củ cải đường;电器|dian4 qi4|đồ điện
一起|yi4 qi3|cùng nhau;意气|yi4 qi4|ý khí;已经|yi3 jing1|đã
上海|shang4 hai3|Thượng Hải;商会|shang1 hui4|thương hội;伤害|shang1 hai4|làm hại
中心|zhong1 xin1|trung tâm;重新|chong2 xin1|làm lại;种植|zhong4 zhi2|trồng trọt
学校|xue2 xiao4|trường học;效果|xiao4 guo3|hiệu quả;小学|xiao3 xue2|tiểu học
出差|chu1 chai1|đi công tác;出租车|chu1 zu1 che1|taxi;吃草|chi1 cao3|ăn cỏ`);

add('c-sentence', 'cmp', 'Câu luyện đọc & vần điệu',
  'Câu luyện tổng hợp: đọc chậm, đúng thanh điệu và thanh mẫu, rồi tăng tốc dần. Ghi âm lại và so sánh với giọng mẫu.',
  `!你好！|ni3 hao3|Xin chào!
!我是越南人。|wo3 shi4 yue4 nan2 ren2|Tôi là người Việt Nam.
!很高兴认识你。|hen3 gao1 xing4 ren4 shi5 ni3|Rất vui được làm quen với bạn.
!你是哪国人？|ni3 shi4 na3 guo2 ren2|Bạn là người nước nào?
!谢谢！不客气。|xie4 xie5 bu4 ke4 qi5|Cảm ơn! Không có gì.
!我们一起去吧。|wo3 men5 yi4 qi3 qu4 ba5|Chúng ta cùng đi nhé.
!四是四，十是十。|si4 shi4 si4 shi2 shi4 shi2|Bốn là bốn, mười là mười.
!十四是十四，四十是四十。|shi2 si4 shi4 shi2 si4 si4 shi2 shi4 si4 shi2|Mười bốn là mười bốn, bốn mươi là bốn mươi.`);

// ----------------------- phân tích -----------------------
const parseW = s => { const [hz, py, ...vi] = s.split('|'); return { hz: hz.trim(), py: py.trim(), vi: vi.join('|').trim(), key: hz.trim() + '|' + py.trim() }; };
export const UNITS = U.map(u => {
  const groups = u.g.split('\n').map(l => l.trim()).filter(Boolean).map(l => {
    const nq = l.startsWith('!'); if (nq) l = l.slice(1);
    return { nq, ws: l.split(';').map(parseW).filter(w => w.hz && w.py) };
  }).filter(g => g.ws.length);
  const seen = new Set(), items = [];
  groups.forEach((g, gi) => g.ws.forEach(w => { if (!seen.has(w.key)) { seen.add(w.key); items.push({ ...w, gi, nq: g.nq, nt: !!u.nt }); } }));
  return { id: u.id, st: u.st, t: u.t, tip: u.tip, nt: !!u.nt, groups, items };
});
export const UNIT = Object.fromEntries(UNITS.map(u => [u.id, u]));
