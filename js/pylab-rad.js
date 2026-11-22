// 214 bộ thủ Khang Hy cho mục "Bộ thủ" của Luyện âm. Mỗi dòng: chữ bộ (ghi chú dạng khác / giản thể) | pinyin | Hán Việt | ý nghĩa. Số nét suy ra từ số thứ tự.
const RAW = `
一 | yī | Nhất | số một, nét ngang
丨 | gǔn | Cổn | nét sổ thẳng
丶 | zhǔ | Chủ | nét chấm
丿 | piě | Phiệt | nét phẩy
乙 (dạng khác: 乚) | yǐ | Ất | can thứ hai trong Thập can (mười thiên can)
亅 | jué | Quyết | nét sổ móc
二 | èr | Nhị | số hai
亠 | tóu | Đầu | phần nắp đậy phía trên, đầu
人 (dạng khác: 亻) | rén | Nhân | con người
儿 | ér | Nhi | đôi chân người, trẻ con
入 | rù | Nhập | đi vào
八 (dạng khác: 丷) | bā | Bát | số tám, chia tách
冂 | jiōng | Quynh | vùng biên giới, đồng hoang xa
冖 | mì | Mịch | tấm khăn phủ, che đậy
冫 | bīng | Băng | băng giá, nước đá
几 | jī (cũng đọc jǐ) | Kỷ | cái ghế dựa, bàn nhỏ
凵 | kǎn | Khảm | há miệng, vật đựng hình khuyết
刀 (dạng khác: 刂) | dāo | Đao | con dao
力 | lì | Lực | sức mạnh
勹 | bāo | Bao | bao bọc
匕 | bǐ | Chủy | cái thìa, cái muỗng
匚 | fāng | Phương | cái hòm, tủ vuông
匸 | xì | Hễ | che giấu
十 | shí | Thập | số mười
卜 | bǔ | Bốc | bói toán
卩 (dạng khác: 㔾) | jié | Tiết | đốt tre, dấu tín
厂 | hǎn (cũng đọc chǎng) | Hán | sườn núi, vách đá
厶 | sī | Khư / Tư | riêng tư
又 | yòu | Hựu | lại, thêm lần nữa; bàn tay phải
口 | kǒu | Khẩu | cái miệng
囗 | wéi | Vi | vây quanh, bao quanh
土 | tǔ | Thổ | đất
士 | shì | Sĩ | kẻ sĩ, người có học
夂 | zhǐ | Truy | đi đến sau, theo sau
夊 | suī | Tuy | đi chậm
夕 | xī | Tịch | buổi tối, đêm
大 | dà | Đại | to lớn
女 | nǚ | Nữ | phụ nữ
子 | zǐ | Tử | con, đứa trẻ
宀 | mián | Miên | mái nhà
寸 | cùn | Thốn | tấc (đơn vị đo)
小 (dạng khác: ⺌, ⺍) | xiǎo | Tiểu | nhỏ bé
尢 (dạng khác: 尣, 兀) | wāng (cũng đọc yóu) | Uông | yếu đuối, chân khoèo
尸 | shī | Thi | xác chết, thân người
屮 | chè (cũng đọc cǎo) | Triệt | mầm cây mới nhú
山 | shān | Sơn | núi
巛 (dạng khác: 川) | chuān | Xuyên | sông ngòi
工 | gōng | Công | công việc, thợ
己 | jǐ | Kỷ | bản thân mình
巾 | jīn | Cân | cái khăn
干 | gān | Can | khô; can dự, cái mộc
幺 | yāo | Yêu | nhỏ bé, sợi tơ nhỏ
广 | yǎn (cũng đọc guǎng) | Nghiễm | mái nhà dựa vách núi
廴 | yǐn | Dẫn | bước dài
廾 | gǒng | Củng | chắp hai tay
弋 | yì | Dặc | bắn tên, cọc buộc
弓 | gōng | Cung | cái cung
彐 (dạng khác: 彑, ⺕) | jì | Ký | đầu con nhím
彡 | shān | Sam | lông, tóc dài, nét trang trí
彳 | chì | Xích | bước chân trái, đi
心 (dạng khác: 忄, ⺗) | xīn | Tâm | trái tim, tâm trí
戈 | gē | Qua | cây qua, binh khí dài
戶 (giản thể: 户; dạng khác: 戸) | hù | Hộ | cửa một cánh
手 (dạng khác: 扌, 龵) | shǒu | Thủ | bàn tay
支 | zhī | Chi | cành cây, chi nhánh
攴 (dạng khác: 攵) | pū | Phộc | đánh khẽ, gõ nhẹ
文 | wén | Văn | văn chương, chữ viết
斗 | dǒu | Đấu / Đẩu | cái đấu đong, đơn vị đo lường
斤 | jīn | Cân | cái rìu; đơn vị cân
方 | fāng | Phương | hình vuông, phương hướng
无 (dạng khác: 旡) | wú | Vô | không
日 | rì | Nhật | mặt trời, ngày
曰 | yuē | Viết | nói rằng
月 | yuè | Nguyệt | mặt trăng, tháng
木 | mù | Mộc | cây, gỗ
欠 | qiàn | Khiếm | thiếu, há miệng ngáp
止 | zhǐ | Chỉ | dừng lại
歹 (dạng khác: 歺) | dǎi | Đãi | xấu, hư hỏng, chết
殳 | shū | Thù | cái gậy, binh khí dài
毋 | wú | Vô | chớ, đừng
比 | bǐ | Tỉ | so sánh
毛 | máo | Mao | lông
氏 | shì | Thị | họ, dòng họ
气 | qì | Khí | hơi nước, hơi thở
水 (dạng khác: 氵, 氺) | shuǐ | Thủy | nước
火 (dạng khác: 灬) | huǒ | Hỏa | lửa
爪 (dạng khác: 爫) | zhǎo | Trảo | móng vuốt
父 | fù | Phụ | cha
爻 | yáo | Hào | vạch hào âm, hào dương trong Kinh Dịch
爿 (giản thể: 丬) | qiáng | Tường | mảnh gỗ, nửa bên trái của chữ 木 chẻ đôi
片 | piàn | Phiến | mảnh, tấm
牙 | yá | Nha | răng nanh
牛 (dạng khác: 牜) | niú | Ngưu | con trâu, con bò
犬 (dạng khác: 犭) | quǎn | Khuyển | con chó
玄 | xuán | Huyền | huyền bí, màu đen sẫm
玉 (dạng khác: 王, 玊) | yù | Ngọc | ngọc, đá quý
瓜 | guā | Qua | quả dưa
瓦 | wǎ | Ngõa | ngói, đồ gốm
甘 | gān | Cam | ngọt
生 | shēng | Sinh | sinh đẻ, sống
用 | yòng | Dụng | dùng
田 | tián | Điền | ruộng
疋 (dạng khác: 匹, ⺪) | pǐ | Thất | đơn vị đo vải, chân
疒 | nè | Nạch | bệnh tật
癶 | bō | Bát | hai chân gạt ngược, bước lên
白 | bái | Bạch | màu trắng
皮 | pí | Bì | da
皿 | mǐn | Mãnh | bát, đĩa
目 | mù | Mục | mắt
矛 | máo | Mâu | cây giáo
矢 | shǐ | Thỉ | mũi tên
石 | shí | Thạch | đá
示 (dạng khác: 礻) | shì | Thị | chỉ thị, thần linh, tế lễ
禸 | róu | Nhựu | vết chân thú
禾 | hé | Hòa | cây lúa
穴 | xué | Huyệt | hang, lỗ
立 | lì | Lập | đứng, thành lập
竹 (dạng khác: ⺮) | zhú | Trúc | tre, trúc
米 | mǐ | Mễ | gạo
糸 (giản thể: 纟; dạng khác: 糹) | mì | Mịch | sợi tơ nhỏ
缶 | fǒu | Phẫu | đồ sành, vại
网 (dạng khác: 罓, 罒) | wǎng | Võng | cái lưới
羊 (dạng khác: ⺶, 𦍌) | yáng | Dương | con dê
羽 | yǔ | Vũ | lông vũ
老 (dạng khác: 耂) | lǎo | Lão | già
而 | ér | Nhi | mà, và; râu
耒 | lěi | Lỗi | cái cày
耳 | ěr | Nhĩ | tai
聿 | yù | Duật | cây bút
肉 (dạng khác: ⺼) | ròu | Nhục | thịt
臣 | chén | Thần | bề tôi
自 | zì | Tự | bản thân, tự mình
至 | zhì | Chí | đến, tới
臼 | jiù | Cữu | cái cối
舌 | shé | Thiệt | cái lưỡi
舛 | chuǎn | Suyễn | trái ngược, sai lầm
舟 | zhōu | Chu | cái thuyền
艮 | gèn | Cấn | quẻ Cấn, bền vững
色 | sè | Sắc | màu sắc, vẻ mặt
艸 (dạng khác: 艹) | cǎo | Thảo | cỏ
虍 | hū | Hổ | vằn con hổ
虫 | chóng | Trùng | sâu bọ
血 | xuè | Huyết | máu
行 | xíng | Hành | đi, thi hành
衣 (dạng khác: 衤) | yī | Y | áo
襾 (dạng khác: 西, 覀) | yà | Á | che đậy, úp lên
見 (giản thể: 见) | jiàn | Kiến | nhìn thấy
角 | jiǎo (cũng đọc jué) | Giác | góc, sừng thú
言 (giản thể: 讠; dạng khác: 訁) | yán | Ngôn | nói, lời nói
谷 | gǔ | Cốc | thung lũng, hang suối
豆 | dòu | Đậu | hạt đậu, đồ đựng ngày xưa
豕 | shǐ | Thỉ | con heo
豸 | zhì | Trãi | loài thú dữ không chân, sâu không chân
貝 (giản thể: 贝) | bèi | Bối | vỏ sò, vật báu, tiền bạc
赤 | chì | Xích | màu đỏ
走 (dạng khác: 赱) | zǒu | Tẩu | đi, chạy
足 (dạng khác: ⻊) | zú | Túc / Thất | chân; đầy đủ
身 | shēn | Thân | thân thể, bản thân
車 (giản thể: 车) | chē | Xa | chiếc xe
辛 | xīn | Tân | cay đắng, vất vả; can thứ tám
辰 | chén | Thần / Thìn | chi Thìn, giờ Thìn
辵 (dạng khác: 辶, ⻌) | chuò | Sước | bước đi, đi nhanh rồi dừng
邑 (dạng khác: 阝, đứng bên phải chữ) | yì | Ấp | vùng đất, thành ấp
酉 | yǒu | Dậu | chi Dậu (con gà); rượu
釆 | biàn | Biện | phân biệt
里 | lǐ | Lý | dặm, làng xóm
金 (giản thể: 钅; dạng khác: 釒) | jīn | Kim | kim loại, vàng
長 (giản thể: 长; dạng khác: 镸) | cháng | Trường | dài, lớn lên
門 (giản thể: 门) | mén | Môn | cửa hai cánh
阜 (dạng khác: 阝, đứng bên trái chữ) | fù | Phụ | gò đất, đống đất
隶 (phồn thể của chữ lệ: 隸) | dài | Đãi | kịp, đến kịp
隹 | zhuī | Chuy / Truy | chim đuôi ngắn
雨 | yǔ | Vũ | mưa
青 (dạng khác: 靑) | qīng | Thanh | màu xanh
非 | fēi | Phi | không, sai trái
面 (dạng khác: 靣) | miàn | Diện | mặt, khuôn mặt
革 | gé | Cách | da thú đã thuộc, cải cách
韋 (giản thể: 韦) | wéi | Vi | da thuộc mềm
韭 | jiǔ | Cửu | rau hẹ
音 | yīn | Âm | âm thanh
頁 (giản thể: 页) | yè | Hiệt | trang giấy, cái đầu
風 (giản thể: 风; dạng khác: 凬) | fēng | Phong | gió
飛 (giản thể: 飞) | fēi | Phi | bay
食 (giản thể: 饣; dạng khác: 飠) | shí | Thực | ăn, thức ăn
首 | shǒu | Thủ | cái đầu
香 | xiāng | Hương | mùi thơm
馬 (giản thể: 马) | mǎ | Mã | con ngựa
骨 | gǔ | Cốt | xương
高 (dạng khác: 髙) | gāo | Cao | cao
髟 | biāo | Bưu / Tiêu | tóc dài, tóc rủ xuống
鬥 (giản thể: 斗) | dòu | Đấu | đánh nhau, chiến đấu
鬯 | chàng | Xưởng | rượu nếp cúng tế, bao đựng cung
鬲 | gé (cũng đọc lì) | Cách / Lịch | cái đỉnh ba chân, nồi
鬼 | guǐ | Quỷ | con quỷ, hồn ma
魚 (giản thể: 鱼) | yú | Ngư | con cá
鳥 (giản thể: 鸟) | niǎo | Điểu | con chim
鹵 (giản thể: 卤) | lǔ | Lỗ | đất mặn, muối
鹿 | lù | Lộc | con hươu
麥 (giản thể: 麦) | mài | Mạch | lúa mạch
麻 | má | Ma | cây gai, cây đại ma
黃 (giản thể: 黄) | huáng | Hoàng | màu vàng
黍 | shǔ | Thử | lúa nếp, kê dẻo
黑 (dạng khác: 黒) | hēi | Hắc | màu đen
黹 | zhǐ | Chỉ | may vá, thêu
黽 (giản thể: 黾) | mǐn | Mãnh | con ếch, con cóc
鼎 | dǐng | Đỉnh | cái đỉnh
鼓 | gǔ | Cổ | cái trống
鼠 | shǔ | Thử | con chuột
鼻 | bí | Tỵ | cái mũi
齊 (giản thể: 齐; dạng khác: 斊) | qí | Tề | ngăn nắp, ngang bằng
齒 (giản thể: 齿; dạng khác: 歯) | chǐ | Xỉ | răng
龍 (giản thể: 龙) | lóng | Long | con rồng
龜 (giản thể: 龟; dạng khác: 亀) | guī | Quy | con rùa
龠 | yuè | Dược | cái sáo ba lỗ, nhạc cụ thổi
`;
// mốc số nét: bộ có số thứ tự ≤ giá trị này thì thuộc số nét tương ứng
const CUT = [[6, 1], [29, 2], [60, 3], [94, 4], [117, 5], [146, 6], [166, 7], [175, 8], [186, 9], [194, 10], [200, 11], [204, 12], [208, 13], [210, 14], [211, 15], [213, 16], [214, 17]];
const strokesOf = n => CUT.find(([m]) => n <= m)[1];
const TONE = { a: 'āáǎà', e: 'ēéěè', i: 'īíǐì', o: 'ōóǒò', u: 'ūúǔù', ü: 'ǖǘǚǜ' };
const TM = {}; for (const [b, s] of Object.entries(TONE)) [...s].forEach((c, i) => { TM[c] = [b, i + 1]; });
export const unmark = syl => { let b = '', t = 0; for (const c of syl) { if (TM[c]) { b += TM[c][0]; t = TM[c][1]; } else b += c; } return { b, t }; };

export const RADS = RAW.trim().split('\n').map((line, i) => {
  const [h, p, hv, vi] = line.split(' | ').map(s => s.trim());
  const m = /^(\S+)(?:\s*\((.*)\))?$/.exec(h), n = i + 1;
  const py = (p.replace(/\(.*?\)/g, ' ').match(/[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]+/g) || []);
  const extra = (p.match(/\((.*?)\)/g) || []).join(' ').replace(/cũng đọc/g, ' ').match(/[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]+/g) || [];
  const all = [...new Set([...py, ...extra])];
  return { id: 'r' + n, rad: true, n, st: strokesOf(n), hz: m[1], note: m[2] || '', py: all, rd: all.map(unmark), hv, vi };
});
