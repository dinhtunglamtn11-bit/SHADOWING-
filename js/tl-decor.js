// TeaLab: cửa hàng trang trí. Đồ mua bằng xu chung của app (xu Passport), chỉ để ngắm: KHÔNG đổi tiền, khách hay luật kinh doanh trong game.
// Mỗi món: câu chuyện + một bí mật ẩn (chạm nhiều lần, ban đêm, trời mưa, ngày đặc biệt hoặc đặt cùng món khác). Tìm ra bí mật được thưởng ít xu, một lần.
// Hình vẽ bằng ô vuông trên khung 160×100 như cảnh quán. Chữ có sẵn hai thứ tiếng (giao diện Trung hiện tiếng Anh).
import { uiLang } from './i18n.js';
import { shopGeo } from './tl-scene.js';

export const SECRET_COINS = 10;
const L = (vi, en) => (uiLang === 'vi' ? vi : en);

// chỗ đặt: mỗi chỗ chỉ một món, đặt món mới thì món cũ cất vào kho
export const SLOTS = {
  roofL: ['out', 'Mái bên trái', 'Roof, left'], roofR: ['out', 'Mái bên phải', 'Roof, right'], facade: ['out', 'Tường mặt tiền', 'Shop front'], door: ['out', 'Hai bên cửa', 'By the door'],
  bell: ['out', 'Trên cửa', 'Above the door'], mat: ['out', 'Trước cửa', 'Doorstep'], sky: ['out', 'Trên trời', 'Sky'], left: ['out', 'Góc vỉa hè', 'Pavement corner'], pot: ['out', 'Chậu bên quán', 'Planter'], road: ['out', 'Lòng đường', 'Street'],
  iwall: ['in', 'Tường (đồng hồ)', 'Wall (clock)'], iframe: ['in', 'Khung tranh', 'Picture frame'], iphoto: ['in', 'Ảnh treo', 'Photos'], icounter: ['in', 'Trên quầy', 'Counter top'], ihang: ['in', 'Góc treo', 'Hanging corner'],
  iceil: ['in', 'Trần nhà', 'Ceiling'], ifloor: ['in', 'Sàn giữa', 'Middle floor'], ipet: ['in', 'Chỗ thú cưng', 'Pet corner'], icorner: ['in', 'Góc phòng', 'Room corner'],
  roofM: ['out', 'Giữa mái', 'Roof, middle'], sky2: ['out', 'Trời giữa', 'Mid sky'], road2: ['out', 'Đường bên trái', 'Street, left'],
  icounter2: ['in', 'Đầu quầy', 'Counter end'], isill: ['in', 'Bệ cửa sổ', 'Window sill'], ilow: ['in', 'Tường thấp trái', 'Lower wall, left'], ilow2: ['in', 'Tường thấp giữa', 'Lower wall, middle'],
};

const OUT = '#2d1f47', GOLD = '#ffd84d', RED = '#e8454d', LEAF = '#2f9a4a', LEAF2 = '#5fd068', WOOD = '#8a5a36', WOOD2 = '#c9905a', WHITE = '#ffffff', PINK = '#ff7fb5', BLUE = '#5ab4ff', GREY = '#9aa0a8';
const glow = (g, x, y, r, c = '#ffd84d40') => { g.fillStyle = c; g.beginPath(); g.arc(x, y, r, 0, 6.3); g.fill(); };
const cat = (R, x, y, col = '#ff9a3c', up = 0) => { R(x + 1, y + 3 - up, 8, 4, col); R(x + 6, y - up, 5, 4, col); R(x + 6, y - 1 - up, 1, 1, col); R(x + 10, y - 1 - up, 1, 1, col); R(x + 7, y + 1 - up, 1, 1, OUT); R(x + 9, y + 1 - up, 1, 1, OUT); R(x - 1, y + 1 - up, 2, 3, col); R(x + 2, y + 7 - up, 1, 1, col); R(x + 7, y + 7 - up, 1, 1, col); };
const note = (R, x, y, c = OUT) => { R(x + 2, y, 1, 5, c); R(x, y + 4, 3, 2, c); R(x + 3, y, 2, 2, c); };

// ---------- danh mục ----------
// d(R, c): vẽ; c = { g, G (hình học mặt tiền), t, night, rain, day, fx (đang diễn hiệu ứng sau khi chạm), found, sk (chỉ số buổi), stage, season }
// box(G): khung bao để chạm và để cắt hình xem thử. s: bí mật { how, need, with, days, hint, text }
export const ITEMS = [
  // ===== ngoài phố =====
  { id: 'meomai', slot: 'roofL', price: 120, name: ['Mèo mướp trên mái', 'Tabby on the roof'],
    story: ['Không ai biết con mèo này của ai. Sáng nào nó cũng lên mái ngắm phố, trưa xuống xin một giọt sữa.', 'Nobody knows whose cat this is. Each morning it climbs up to watch the street, at noon it asks for a drop of milk.'],
    s: { how: 'tap', need: 3, hint: ['Thử gọi nó vài lần.', 'Try calling it a few times.'], text: ['Mèo tên là Mận. Trên cổ có mảnh giấy: “Cảm ơn đã cho Mận ở nhờ”.', 'The cat is called Plum. A note on its collar reads: “Thank you for looking after Plum”.'] },
    box: G => [G.x0 + 2, G.top - 9, 13, 10], d: (R, c) => cat(R, c.G.x0 + 3, c.G.top - 7, '#ff9a3c', c.fx ? Math.round(Math.abs(Math.sin(c.t * 9)) * 4) : 0) },
  { id: 'chongchong', slot: 'roofL', price: 80, name: ['Chong chóng gió', 'Pinwheel'],
    story: ['Cô bé hàng xóm làm tặng ngày khai trương, bằng giấy gói trà cũ.', 'A girl next door made it from old tea wrappers for the opening day.'],
    s: { how: 'rain', hint: ['Chờ một ngày trời mưa.', 'Wait for a rainy day.'], text: ['Gặp mưa, giấy hiện ra dòng chữ nhỏ: “Chúc quán đông khách”.', 'In the rain a tiny line appears on the paper: “May your shop be busy”.'] },
    box: G => [G.x0 + 3, G.top - 12, 11, 14], d: (R, c) => { const x = c.G.x0 + 8, y = c.G.top - 8, a = Math.floor(c.t * (c.rain ? 8 : 3)) % 2; R(x, y, 1, 9, WOOD); if (a) { R(x - 3, y - 3, 3, 3, RED); R(x + 1, y - 3, 3, 3, GOLD); R(x + 1, y + 1, 3, 3, BLUE); R(x - 3, y + 1, 3, 3, LEAF2); } else { R(x - 1, y - 4, 3, 3, RED); R(x + 2, y - 1, 3, 3, GOLD); R(x - 1, y + 2, 3, 3, BLUE); R(x - 4, y - 1, 3, 3, LEAF2); } R(x, y, 1, 1, WHITE); } },
  { id: 'bocau', slot: 'roofL', price: 90, name: ['Đôi bồ câu', 'Pair of pigeons'],
    story: ['Hai con chim nhận mái quán làm nhà, ăn vụn bánh khách đánh rơi.', 'Two pigeons have made your roof their home and live on dropped crumbs.'],
    s: { how: 'tap', need: 2, hint: ['Lại gần xem chúng có bay không.', 'Get closer and see if they fly.'], text: ['Chúng bay một vòng rồi đậu lại. Một con tha về cọng rơm: sắp có tổ.', 'They circle and land again. One brings a straw home: a nest is coming.'] },
    box: G => [G.x0 + 1, G.top - 8, 18, 9], d: (R, c) => { const up = c.fx ? 6 : 0; for (const [i, dx] of [[0, 2], [1, 11]]) { const x = c.G.x0 + dx + (c.fx ? Math.round(Math.sin(c.t * 4 + i * 3) * 4) : 0), y = c.G.top - 5 - up; R(x, y + 1, 5, 3, '#cfd6e8'); R(x + 4, y - 1, 3, 3, GREY); R(x + 7, y, 1, 1, '#ff9a3c'); R(x + 5, y, 1, 1, OUT); if (up && Math.floor(c.t * 8) % 2) R(x + 1, y - 2, 4, 2, WHITE); else R(x + 1, y + 2, 3, 1, GREY); R(x + 2, y + 4, 1, 1, RED); } } },
  { id: 'neon', slot: 'roofR', price: 220, name: ['Đèn neon hình ly trà', 'Neon tea cup'],
    story: ['Mua lại của một tiệm cũ đã đóng cửa. Chủ cũ dặn: đừng bao giờ tắt nó vào đêm giao thừa.', 'Bought from a shop that closed down. The old owner said: never switch it off on New Year’s Eve.'],
    s: { how: 'night', hint: ['Ngắm nó khi trời tối.', 'Look at it after dark.'], text: ['Về đêm, làn khói neon uốn thành hình trái tim.', 'At night the neon steam curls into a heart.'] },
    box: G => [G.x1 - 22, G.top - 15, 18, 16], d: (R, c) => { const x = c.G.x1 - 19, y = c.G.top - 8, on = c.night; R(x + 5, y + 6, 1, 3, OUT); R(x, y, 11, 6, on ? '#ff7fb5' : '#b9789a'); R(x + 1, y + 1, 9, 4, on ? '#fff3b0' : '#d8cfa8'); R(x + 11, y + 1, 3, 3, on ? PINK : '#b9789a'); if (on && c.found) { R(x + 3, y - 5, 2, 2, PINK); R(x + 6, y - 5, 2, 2, PINK); R(x + 3, y - 4, 5, 2, PINK); R(x + 5, y - 2, 1, 1, PINK); } else { R(x + 3, y - 3, 1, 2, WHITE); R(x + 6, y - 5, 1, 3, WHITE); } if (on) glow(c.g, x + 6, y + 2, 11, '#ff7fb538'); } },
  { id: 'angten', slot: 'roofR', price: 60, name: ['Ăng-ten cổ', 'Old TV aerial'],
    story: ['Còn sót lại từ thời cả xóm xem chung một cái tivi.', 'Left over from the days when the whole lane shared one television.'],
    s: { how: 'tap', need: 4, hint: ['Chỉnh nó vài lần xem bắt được gì.', 'Adjust it a few times and see what it picks up.'], text: ['Rè rè… bắt được một bản nhạc cũ: bài mà bà của Lame hay hát.', 'Crackle… it catches an old tune, the one Lame’s grandmother used to sing.'] },
    box: G => [G.x1 - 17, G.top - 12, 14, 13], d: (R, c) => { const x = c.G.x1 - 11, y = c.G.top; R(x, y - 11, 1, 11, GREY); for (let i = 0; i < 3; i++) R(x - 5 + i, y - 11 + i * 3, 11 - i * 2, 1, '#cfd6e8'); if (c.fx) { note(R, x - 8, y - 12 + Math.round(Math.sin(c.t * 5) * 2)); note(R, x + 4, y - 9 + Math.round(Math.cos(c.t * 5) * 2)); } } },
  { id: 'hoagiay', slot: 'facade', price: 150, name: ['Giàn hoa giấy', 'Bougainvillea'],
    story: ['Trồng từ một cành giâm xin của quán nước đầu ngõ. Ba mùa là phủ kín mái hiên.', 'Grown from a cutting given by the café at the end of the lane. Three seasons and it covers the awning.'],
    s: { how: 'rain', hint: ['Hoa đẹp nhất khi có mưa.', 'It is loveliest in the rain.'], text: ['Cánh hoa rụng theo mưa. Khách bảo giẫm lên cánh hoa này thì gặp may.', 'Petals fall with the rain. Customers say stepping on one brings luck.'] },
    box: G => [G.x0 - 3, G.signY - 2, 14, 30], d: (R, c) => { const x = c.G.x0 - 1, y = c.G.signY; R(x + 2, y + 6, 1, c.G.baseY - y - 8, WOOD); for (let i = 0; i < 16; i++) R(x + (i * 5) % 9, y + (i * 3) % 18, 3, 3, i % 4 === 0 ? LEAF : i % 2 ? '#e8459d' : PINK); if (c.rain) for (let i = 0; i < 5; i++) R(x + (i * 7) % 13, y + 18 + ((c.t * 9 + i * 7) % 22), 2, 1, PINK); } },
  { id: 'bangden', slot: 'facade', price: 100, name: ['Bảng phấn thực đơn', 'Chalk menu board'],
    story: ['Lame viết tên món bằng ba thứ tiếng, chữ Hán còn run tay.', 'Lame writes the drinks in three languages, the Chinese characters still shaky.'],
    s: { how: 'tap', need: 3, hint: ['Đọc kỹ góc bảng.', 'Read the corner of the board carefully.'], text: ['Góc bảng có dòng nhỏ: 今天也要加油 (hôm nay cũng cố lên nhé).', 'A small line in the corner: 今天也要加油 (do your best today too).'] },
    box: G => [G.x0 - 2, G.winY - 3, 10, 16], d: (R, c) => { const x = c.G.x0 - 1, y = c.G.winY - 2; R(x, y, 8, 14, WOOD); R(x + 1, y + 1, 6, 12, '#1c1233'); for (let i = 0; i < 4; i++) R(x + 2, y + 3 + i * 2, 3 + (i % 2), 1, i % 2 ? GOLD : WHITE); if (c.found) R(x + 2, y + 11, 4, 1, PINK); } },
  { id: 'longcua', slot: 'door', price: 100, name: ['Đèn lồng Hội An', 'Hoi An lanterns'],
    story: ['Gửi từ Hội An, bọc ba lớp báo. Người làm đèn viết kèm: “Treo thấp thì ấm, treo cao thì xa”.', 'Sent from Hoi An wrapped in three layers of newspaper. The maker wrote: “Hang low for warmth, high to be seen afar”.'],
    s: { how: 'night', hint: ['Đợi đèn được thắp.', 'Wait until they are lit.'], text: ['Ánh đèn in lên cửa kính một chữ “Phúc” mờ mờ.', 'Their light casts a faint character for “fortune” on the glass.'] },
    box: G => [G.doorX - 6, G.winY - 3, G.doorW + 12, 13], d: (R, c) => { for (const [i, x] of [[0, c.G.doorX - 5], [1, c.G.doorX + c.G.doorW]]) { const s = Math.round(Math.sin(c.t * 1.5 + i * 2)), y = c.G.winY - 2; R(x + 2, y, 1, 2, OUT); R(x + s, y + 2, 5, 6, i ? '#ff9a3c' : RED); R(x + 1 + s, y + 2, 1, 6, GOLD); R(x + 2 + s, y + 8, 1, 3, GOLD); if (c.night) glow(c.g, x + 2, y + 5, 7); } } },
  { id: 'caudoi', slot: 'door', price: 130, name: ['Đôi câu đối', 'Couplet scrolls'],
    story: ['Ông đồ đầu phố viết tặng: một bên “trà thơm”, một bên “khách quý”.', 'The old calligrapher on the corner wrote them: “fragrant tea” on one side, “honoured guests” on the other.'],
    s: { how: 'day', days: [67, 68, 69, 70, 71], hint: ['Chờ đến Tết.', 'Wait for Lunar New Year.'], text: ['Mùng Tết, nét mực ánh lên vàng. Ông đồ ghé uống chén trà và không lấy tiền công.', 'At New Year the ink gleams gold. The calligrapher stops by for tea and refuses payment.'] },
    box: G => [G.doorX - 5, G.winY - 2, G.doorW + 10, 18], d: (R, c) => { for (const x of [c.G.doorX - 4, c.G.doorX + c.G.doorW + 1]) { R(x, c.G.winY - 1, 3, 16, '#c2354a'); R(x, c.G.winY - 1, 3, 1, GOLD); for (let i = 0; i < 4; i++) R(x + 1, c.G.winY + 2 + i * 3, 1, 2, GOLD); R(x, c.G.winY + 15, 3, 1, GOLD); } } },
  { id: 'chuonggio', slot: 'bell', price: 60, name: ['Chuông gió', 'Wind chime'],
    story: ['Mỗi lần cửa mở là một tiếng leng keng. Lame bảo đó là tiếng của khách đầu tiên.', 'It tinkles whenever the door opens. Lame calls it the sound of the first customer.'],
    s: { how: 'tap', need: 5, hint: ['Gõ nhẹ vài lần.', 'Give it a few gentle taps.'], text: ['Năm tiếng chuông ghép lại thành giai điệu bài “Mừng khai trương” Lame tự nghĩ.', 'Five chimes make the little opening-day tune Lame invented.'] },
    box: G => [G.doorX + 3, G.winY - 8, 10, 11], d: (R, c) => { const x = c.G.doorX + 5, y = c.G.winY - 6, s = c.fx ? Math.round(Math.sin(c.t * 12) * 2) : Math.round(Math.sin(c.t * 2) * 0.8); R(x, y, 7, 1, WOOD); for (let i = 0; i < 3; i++) R(x + 1 + i * 2 + (i - 1) * 0 + s, y + 1, 1, 5 + (i % 2) * 2, i % 2 ? GOLD : '#cfd6e8'); } },
  { id: 'tham', slot: 'mat', price: 30, name: ['Thảm chào', 'Welcome mat'],
    story: ['Tấm thảm đầu tiên của quán, mua ở chợ với giá một ly trà sữa.', 'The shop’s very first mat, bought at the market for the price of one milk tea.'],
    s: { how: 'tap', need: 4, hint: ['Lật mép thảm xem.', 'Lift the edge of the mat.'], text: ['Dưới thảm có tờ giấy chào bằng bốn thứ tiếng: Welcome · 欢迎 · 환영 · ようこそ.', 'Under it, a note in four languages: Welcome · 欢迎 · 환영 · ようこそ.'] },
    box: G => [G.doorX - 1, G.baseY - 2, G.doorW + 2, 6], d: (R, c) => { const x = c.G.doorX, y = c.G.baseY - 1; R(x, y, c.G.doorW, 4, '#a0522d'); R(x + 1, y + 1, c.G.doorW - 2, 2, '#c9704a'); for (let i = 0; i < 5; i++) R(x + 3 + i * 2, y + 2, 1, 1, GOLD); } },
  { id: 'bongbay', slot: 'sky', price: 90, name: ['Chùm bóng bay', 'Bunch of balloons'],
    story: ['Còn dư từ tiệc sinh nhật một khách quen. Cô ấy bảo: để bóng ở đây cho quán vui.', 'Left over from a regular’s birthday party. “Keep them,” she said, “they cheer the place up”.'],
    s: { how: 'tap', need: 3, hint: ['Chạm thử một quả.', 'Touch one of them.'], text: ['Bụp! Trong bóng có mẩu giấy: “Ước gì quán mở mãi”.', 'Pop! Inside is a slip of paper: “I hope this shop stays open forever”.'] },
    box: () => [4, 14, 18, 28], d: (R, c) => { const b = Math.round(Math.sin(c.t * 1.3) * 1.5); for (const [i, [x, y, col]] of [[5, 18, RED], [11, 15, GOLD], [14, 22, BLUE]].entries()) { if (c.fx && i === 1) { for (let j = 0; j < 6; j++) R(x + 3 + (j % 3 - 1) * 4, y + b + 3 + (j > 2 ? 4 : -3), 1, 1, col); continue; } R(x, y + b + 1, 7, 6, col); R(x + 1, y + b, 5, 8, col); R(x + 2, y + b + 2, 1, 2, WHITE); R(x + 3, y + b + 8, 1, 12 - (i === 2 ? 4 : 0), GREY); } } },
  { id: 'dieu', slot: 'sky', price: 110, name: ['Cánh diều', 'Kite'],
    story: ['Diều giấy của lũ trẻ trong xóm gửi nhờ, chiều nào cũng lấy ra thả.', 'The neighbourhood children leave it with you and fly it every afternoon.'],
    s: { how: 'day', days: [83, 84, 85, 86, 87, 88, 89, 90], hint: ['Cuối mùa, gió nổi.', 'Wait for the late-season wind.'], text: ['Gió xuân đưa diều lên cao nhất. Đuôi diều buộc tấm vải: tên của mọi đứa trẻ, thêm tên Lame.', 'The spring wind lifts it highest. On its tail: every child’s name, plus Lame’s.'] },
    box: () => [18, 12, 22, 26], d: (R, c) => { const x = 26 + Math.round(Math.sin(c.t * 0.9) * 4), y = 15 + Math.round(Math.cos(c.t * 1.4) * 2); R(x + 3, y, 2, 2, RED); R(x + 1, y + 2, 6, 2, RED); R(x, y + 4, 8, 2, GOLD); R(x + 1, y + 6, 6, 2, GOLD); R(x + 3, y + 8, 2, 2, BLUE); for (let i = 1; i < 6; i++) R(x + 3 + Math.round(Math.sin(c.t * 3 + i) * 1.5), y + 9 + i * 2, 1, 2, i % 2 ? PINK : GREY); } },
  { id: 'dayden', slot: 'sky', price: 160, name: ['Dây đèn giăng phố', 'Street string lights'],
    story: ['Cả dãy phố góp mỗi nhà một đoạn dây. Đoạn của quán là đoạn sáng nhất.', 'Every house on the street chipped in a length of wire. Yours is the brightest.'],
    s: { how: 'night', hint: ['Đèn thì phải ngắm lúc tối.', 'Lights are best seen at night.'], text: ['Đêm xuống, đèn nhấp nháy lần lượt như đang đếm khách về muộn.', 'After dark the bulbs blink in turn, as if counting the late walkers home.'] },
    box: () => [0, 11, 160, 14], d: (R, c) => { for (let i = 0; i <= 32; i++) { const x = i * 5, y = 12 + Math.round(Math.sin((i % 8) / 8 * Math.PI) * 5); R(x, y, 5, 1, OUT); if (i % 2 === 0) { const on = c.night && (Math.floor(c.t * 3) + i / 2) % 3 !== 0; R(x + 1, y + 1, 2, 3, on ? [GOLD, PINK, BLUE][(i / 2) % 3] : GREY); if (on) glow(c.g, x + 2, y + 3, 3, '#ffd84d30'); } } } },
  { id: 'homthu', slot: 'left', price: 70, name: ['Hòm thư đỏ', 'Red postbox'],
    story: ['Khách đi xa vẫn gửi bưu thiếp về. Lame dán hết lên tường kho.', 'Customers who moved away still send postcards. Lame pins them all in the storeroom.'],
    s: { how: 'day', days: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84], hint: ['Thư thường đến vào Chủ nhật của tuần chơi.', 'Letters tend to arrive at the end of a game week.'], text: ['Có thư! Một du học sinh viết: “Bên này không đâu pha trà đá chanh ngon bằng quán mình”.', 'A letter! A student abroad writes: “Nobody here makes iced lemon tea like yours”.'] },
    box: () => [6, 54, 11, 18], d: (R, c) => { R(11, 64, 2, 8, OUT); R(7, 55, 10, 10, RED); R(8, 54, 8, 1, RED); R(9, 58, 6, 1, OUT); R(10, 60, 4, 3, WHITE); if (c.found) { R(14, 52, 4, 3, WHITE); R(15, 53, 2, 1, RED); } } },
  { id: 'hoca', slot: 'left', price: 260, name: ['Hồ cá koi nhỏ', 'Little koi pond'],
    story: ['Ba con cá, đặt tên theo ba loại trà: Lài, Sen và Ô Long.', 'Three fish named after three teas: Jasmine, Lotus and Oolong.'],
    s: { how: 'combo', with: 'meomai', hint: ['Có ai đó trên mái rất thích cá.', 'Someone on the roof would love these fish.'], text: ['Mận ngồi canh hồ cả buổi nhưng chưa bao giờ thò chân. Tình bạn là có thật.', 'Plum watches the pond all day yet never dips a paw. A true friendship.'] },
    box: () => [2, 62, 24, 11], d: (R, c) => { R(3, 63, 22, 9, GREY); R(4, 64, 20, 7, '#2f7ad1'); R(5, 65, 18, 5, BLUE); for (let i = 0; i < 3; i++) { const x = 6 + ((c.t * (3 + i) + i * 6) % 15); R(x, 65 + i * 2, 3, 1, [WHITE, '#ff9a3c', GOLD][i]); R(x - 1, 65 + i * 2, 1, 1, RED); } R(18, 63, 3, 1, LEAF2); R(19, 62, 1, 1, PINK); } },
  { id: 'tuonglame', slot: 'left', price: 500, name: ['Tượng Lame bằng đá', 'Stone statue of Lame'],
    story: ['Khách quen góp tiền tạc tặng. Lame ngượng đến mức che nó suốt tuần đầu.', 'Regulars chipped in to have it carved. Lame was so shy it stayed covered for a week.'],
    s: { how: 'tap', need: 10, hint: ['Xoa đầu tượng lấy may… nhiều lần.', 'Rub its head for luck… many times.'], text: ['Dưới đế tượng khắc: “Người pha trà nhớ tên từng vị khách”.', 'Carved on the base: “The tea maker who remembered every guest’s name”.'] },
    box: () => [6, 48, 14, 24], d: (R, c) => { R(6, 67, 14, 5, GREY); R(7, 66, 12, 1, '#cfd6e8'); R(9, 57, 8, 10, '#b8bdc8'); R(10, 50, 6, 7, '#cfd6e8'); R(9, 49, 8, 3, '#9aa0a8'); R(11, 53, 1, 1, OUT); R(14, 53, 1, 1, OUT); R(16, 58, 3, 4, '#cfd6e8'); R(17, 56, 3, 2, WHITE); if (c.fx || c.found) for (let i = 0; i < 4; i++) R(5 + i * 5, 46 + ((c.t * 4 + i * 3) % 6), 1, 1, GOLD); } },
  { id: 'daotet', slot: 'pot', price: 120, name: ['Chậu đào nhỏ', 'Little peach tree'],
    story: ['Mua lúc còn trơ cành, ai cũng bảo hớ.', 'Bought as a bare twig; everyone said you had been cheated.'],
    s: { how: 'day', days: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], hint: ['Hoa đào đợi đến gần Tết.', 'Peach blossom waits for the New Year.'], text: ['Đào nở đúng dịp Tết. Người bán năm xưa đi ngang, cười: “Thấy chưa!”.', 'It blooms right on New Year. The seller walks past and grins: “Told you!”'] },
    box: G => [Math.min(145, G.x1 - 1), 50, 15, 22], d: (R, c) => { const x = Math.min(147, c.G.x1 + 1), bloom = c.day >= 60 && c.day <= 80; R(x + 2, 65, 8, 6, '#c2354a'); R(x + 1, 65, 10, 1, RED); R(x + 5, 55, 2, 10, WOOD); R(x + 2, 58, 4, 1, WOOD); R(x + 7, 55, 4, 1, WOOD); for (const [a, b] of [[1, 56], [10, 53], [5, 52], [3, 61], [9, 59]]) R(x + a, b, bloom ? 3 : 2, bloom ? 3 : 2, bloom ? PINK : LEAF); } },
  { id: 'xuongrong', slot: 'pot', price: 40, name: ['Xương rồng', 'Cactus'],
    story: ['Quên tưới ba tuần vẫn sống. Lame coi nó là hình mẫu quản lý rủi ro.', 'Survived three weeks without water. Lame calls it a model of risk management.'],
    s: { how: 'day', days: [30, 45], hint: ['Kiên nhẫn cả tháng.', 'Be patient for a month.'], text: ['Nó ra một bông hoa vàng bé xíu. Đúng ngày không ai ngờ.', 'It grows one tiny yellow flower, on the day nobody expected.'] },
    box: G => [Math.min(148, G.x1), 56, 11, 16], d: (R, c) => { const x = Math.min(149, c.G.x1 + 2); R(x + 1, 66, 7, 5, '#c9905a'); R(x + 3, 58, 3, 8, LEAF); R(x, 60, 2, 3, LEAF); R(x + 1, 62, 2, 1, LEAF); R(x + 7, 61, 2, 3, LEAF); R(x + 6, 63, 1, 1, LEAF); R(x + 4, 59, 1, 6, LEAF2); if (c.day >= 30) R(x + 3, 56, 3, 2, GOLD); } },
  { id: 'xedap', slot: 'road', price: 180, name: ['Xe đạp của bà', 'Grandma’s bicycle'],
    story: ['Chiếc xe bà đạp đi bán chè ba mươi năm. Giỏ trước còn thơm mùi lá dứa.', 'Grandma rode it selling sweet soup for thirty years. The basket still smells of pandan.'],
    s: { how: 'tap', need: 3, hint: ['Bấm chuông xe vài cái.', 'Ring the bell a few times.'], text: ['Kính coong. Trong giỏ có công thức chè viết tay, mực đã phai.', 'Ting-ting. In the basket: a handwritten recipe in faded ink.'] },
    box: () => [108, 76, 30, 20], d: (R, c) => { const wheel = x => { R(x + 2, 84, 7, 1, OUT); R(x + 2, 93, 7, 1, OUT); R(x, 86, 1, 6, OUT); R(x + 10, 86, 1, 6, OUT); R(x + 1, 85, 1, 1, OUT); R(x + 9, 85, 1, 1, OUT); R(x + 1, 92, 1, 1, OUT); R(x + 9, 92, 1, 1, OUT); R(x + 5, 88, 1, 2, GREY); }; wheel(109); wheel(125); R(114, 88, 16, 1, LEAF); R(118, 82, 1, 7, LEAF); R(116, 81, 5, 2, OUT); R(129, 80, 1, 9, LEAF); R(127, 80, 4, 1, OUT); R(130, 78, 7, 5, WOOD2); R(130, 78, 7, 1, WOOD); if (c.fx) note(R, 122, 70); } },
  { id: 'vespa', slot: 'road', price: 300, name: ['Vespa màu bạc hà', 'Mint scooter'],
    story: ['Của một khách gửi trước quán rồi đi công tác… đã mười một tháng.', 'A customer left it outside before a business trip… eleven months ago.'],
    s: { how: 'day', days: [24, 31, 76], hint: ['Chủ xe hẹn về vào một đêm lễ.', 'The owner promised to return on a festive night.'], text: ['Anh chủ xe về, mua mười ly mời cả phố và tặng luôn chiếc xe cho quán.', 'The owner is back, buys ten cups for the street and gives you the scooter.'] },
    box: () => [108, 77, 28, 19], d: R => { R(110, 90, 6, 5, OUT); R(128, 90, 6, 5, OUT); R(112, 92, 2, 1, GREY); R(130, 92, 2, 1, GREY); R(112, 85, 12, 6, '#9fe3cf'); R(121, 88, 9, 3, '#9fe3cf'); R(127, 81, 4, 10, '#9fe3cf'); R(114, 83, 8, 2, WOOD); R(126, 79, 6, 2, OUT); R(130, 82, 2, 2, GOLD); R(112, 86, 5, 1, WHITE); } },
  { id: 'xichlo', slot: 'road', price: 350, name: ['Xích lô hoa', 'Flower cyclo'],
    story: ['Bác xích lô nghỉ hưu cho quán mượn xe để bày hoa. Điều kiện: mỗi sáng một chén trà nóng.', 'A retired cyclo driver lends it to display flowers, in return for a hot cup each morning.'],
    s: { how: 'combo', with: 'binhtra', hint: ['Bác ấy mê trà pha ấm cổ.', 'He loves tea from an antique pot.'], text: ['Uống trà từ chiếc ấm cổ, bác kể chuyện phố này năm 1980, cả quán lặng nghe.', 'Sipping from the antique pot, he tells of this street in 1980 and the shop falls silent.'] },
    box: () => [104, 74, 34, 22], d: R => { const wheel = x => { R(x + 2, 86, 5, 1, OUT); R(x + 2, 94, 5, 1, OUT); R(x, 88, 1, 5, OUT); R(x + 8, 88, 1, 5, OUT); R(x + 1, 87, 1, 1, OUT); R(x + 7, 87, 1, 1, OUT); R(x + 4, 90, 1, 1, GREY); }; wheel(106); wheel(126); R(108, 83, 18, 7, RED); R(108, 83, 18, 2, '#ff7b88'); for (let i = 0; i < 6; i++) R(109 + i * 3, 78 + (i % 2) * 2, 3, 4, [PINK, GOLD, WHITE][i % 3]); R(110, 82, 15, 1, LEAF2); R(126, 80, 1, 10, OUT); R(124, 79, 6, 1, OUT); R(106, 75, 20, 2, GOLD); R(107, 77, 1, 6, WOOD); R(124, 77, 1, 6, WOOD); } },
  // ===== trong quán =====
  { id: 'dongho', slot: 'iwall', price: 90, name: ['Đồng hồ quả lắc', 'Pendulum clock'],
    story: ['Chạy chậm đúng năm phút. Lame không chỉnh vì khách hay ngồi thêm năm phút.', 'It runs exactly five minutes slow. Lame leaves it, since guests then stay five minutes more.'],
    s: { how: 'night', hint: ['Nghe nó lúc quán sắp đóng.', 'Listen when the shop is closing.'], text: ['Buổi tối, đồng hồ điểm đúng một tiếng thay vì tám: giờ nghỉ của riêng Lame.', 'In the evening it strikes once instead of eight times: Lame’s own break.'] },
    box: () => [145, 3, 13, 18], d: (R, c) => { R(147, 4, 10, 10, WOOD); R(148, 5, 8, 8, WHITE); R(152, 7, 1, 3, OUT); R(152, 9, 2 + (c.sk > 2 ? 1 : 0), 1, OUT); R(149, 14, 6, 6, WOOD); R(151 + Math.round(Math.sin(c.t * 3)), 15, 2, 4, GOLD); } },
  { id: 'tranhnui', slot: 'iframe', price: 130, name: ['Tranh đồi chè', 'Painting of a tea hill'],
    story: ['Vẽ đồi chè Tân Cương, nơi lô trà đầu tiên của quán ra đời.', 'It shows the Tan Cuong tea hills where your first batch of leaves was grown.'],
    s: { how: 'tap', need: 5, hint: ['Nhìn thật lâu vào bức tranh.', 'Look long into the picture.'], text: ['Giữa luống chè có một người đội nón rất bé: chính là bố của Lame.', 'Among the rows stands a tiny figure in a conical hat: Lame’s father.'] },
    box: () => [56, 10, 26, 20], d: (R, c) => { R(57, 11, 24, 18, WOOD); R(59, 13, 20, 14, '#cfe8f8'); R(59, 20, 20, 7, '#3dbb5a'); R(63, 17, 10, 3, LEAF); for (let i = 0; i < 3; i++) R(59, 21 + i * 2, 20, 1, LEAF); R(74, 14, 3, 3, GOLD); if (c.found) { R(68, 21, 3, 1, GOLD); R(69, 22, 1, 3, WHITE); } } },
  { id: 'bando', slot: 'iframe', price: 150, name: ['Bản đồ thế giới', 'World map'],
    story: ['Khách đến từ đâu thì cắm một ghim ở đó. Còn thiếu châu Nam Cực.', 'Guests stick a pin where they come from. Only Antarctica is missing.'],
    s: { how: 'day', days: [26, 40, 55], hint: ['Chờ một đoàn khách từ rất xa.', 'Wait for visitors from very far away.'], text: ['Một nhà nghiên cứu vừa từ Nam Cực về cắm chiếc ghim cuối cùng. Bản đồ đã đủ.', 'A researcher back from Antarctica places the last pin. The map is complete.'] },
    box: () => [56, 10, 26, 20], d: (R, c) => { R(57, 11, 24, 18, WOOD2); R(59, 13, 20, 14, BLUE); for (const [x, y, w, h] of [[60, 15, 5, 4], [63, 20, 3, 5], [68, 15, 4, 3], [69, 19, 3, 5], [72, 15, 6, 5], [75, 22, 3, 2]]) R(x, y, w, h, LEAF2); for (const [x, y] of [[62, 16], [70, 16], [75, 17], [70, 21]]) R(x, y, 1, 1, RED); R(59, 26, 20, 1, WHITE); if (c.found) R(68, 26, 1, 1, RED); } },
  { id: 'anhxua', slot: 'iphoto', price: 100, name: ['Ảnh ngày khai trương', 'Opening-day photos'],
    story: ['Ba tấm ảnh: tờ lãi đầu tiên, ly vỡ đầu tiên và nụ cười đầu tiên của khách.', 'Three photos: the first profit note, the first broken cup and the first customer’s smile.'],
    s: { how: 'season', hint: ['Đi hết một mùa rồi nhìn lại.', 'Finish a whole season, then look again.'], text: ['Có thêm tấm thứ tư: cả quán đứng chung sau 90 ngày.', 'A fourth photo appears: everyone together after 90 days.'] },
    box: () => [54, 30, 30, 11], d: (R, c) => { const n = c.season || c.found ? 4 : 3; for (let i = 0; i < n; i++) { const x = 55 + i * 7, y = 31 + (i % 2); R(x, y, 6, 8, WHITE); R(x + 1, y + 1, 4, 4, [BLUE, PINK, GOLD, LEAF2][i]); R(x + 2, y + 3, 2, 2, OUT); R(x + 3, y - 1, 1, 1, RED); } } },
  { id: 'meovay', slot: 'icounter', price: 120, name: ['Mèo thần tài', 'Lucky cat'],
    story: ['Vẫy tay suốt ngày. Pin thay lần nào cũng đúng hôm quán đông.', 'It waves all day. Its battery always needs changing on the busiest days.'],
    s: { how: 'tap', need: 8, hint: ['Bắt tay nó vài lần.', 'Shake its paw a few times.'], text: ['Dưới đế có đồng xu cổ và dòng chữ “Lộc ít mà bền”.', 'Under it: an old coin and the words “small luck that lasts”.'] },
    box: () => [145, 42, 12, 15], d: (R, c) => { const up = Math.floor(c.t * (c.fx ? 8 : 2)) % 2; R(147, 48, 8, 8, WHITE); R(148, 43, 6, 6, WHITE); R(148, 42, 1, 1, WHITE); R(153, 42, 1, 1, WHITE); R(149, 45, 1, 1, OUT); R(152, 45, 1, 1, OUT); R(148, 49, 6, 1, RED); R(150, 51, 2, 3, GOLD); R(154, 44 + up * 3, 2, 4, WHITE); } },
  { id: 'kenhac', slot: 'icounter', price: 220, name: ['Máy hát đĩa than', 'Record player'],
    story: ['Loa kèn đã móp, nhưng tiếng ấm hơn mọi cái loa mới.', 'The horn is dented, yet it sounds warmer than any new speaker.'],
    s: { how: 'tap', need: 3, hint: ['Đặt kim vào đĩa vài lần.', 'Drop the needle a few times.'], text: ['Mặt B của đĩa là giọng ai đó chúc: “Pha trà chậm thôi, đời còn dài”.', 'On side B someone says: “Brew slowly, life is long”.'] },
    box: () => [140, 38, 18, 19], d: (R, c) => { R(141, 50, 16, 6, WOOD); R(143, 48, 10, 2, OUT); R(147 + (Math.floor(c.t * 4) % 2), 48, 2, 1, RED); R(152, 42, 2, 8, GOLD); R(150, 39, 8, 5, GOLD); R(151, 40, 6, 3, '#c86a1f'); if (c.fx) for (let i = 0; i < 2; i++) note(R, 134 + i * 8, 34 - ((c.t * 6 + i * 4) % 8), GOLD); } },
  { id: 'binhtra', slot: 'icounter', price: 180, name: ['Ấm tử sa cổ', 'Antique clay pot'],
    story: ['Đã pha trà cho bốn đời. Rửa bằng xà phòng là cả nhà giận.', 'It has brewed for four generations. Washing it with soap is unforgivable.'],
    s: { how: 'day', days: [15, 30, 60], hint: ['Ấm quý cần thời gian.', 'A good pot needs time.'], text: ['Lòng ấm lên nước bóng. Nhấc nắp ra thấy khắc tên cụ tổ của Lame.', 'A deep sheen has formed. Inside the lid: the name of Lame’s great-grandfather.'] },
    box: () => [142, 45, 16, 12], d: (R, c) => { R(146, 50, 9, 6, '#8a3a2a'); R(147, 49, 7, 1, '#a04a36'); R(149, 47, 3, 2, '#8a3a2a'); R(143, 50, 3, 2, '#8a3a2a'); R(155, 51, 2, 3, '#8a3a2a'); R(147, 51, 3, 1, '#c96a4a'); const s = (c.t * 5) % 6; R(143, 48 - s, 1, 2, '#ffffffaa'); } },
  { id: 'trauba', slot: 'ihang', price: 60, name: ['Chậu trầu bà treo', 'Hanging pothos'],
    story: ['Cắt từ một nhánh trong ly nước. Càng để lâu càng buông dài.', 'Started from a sprig in a glass of water. It trails further with time.'],
    s: { how: 'day', days: [45, 75], hint: ['Để cây lớn qua nhiều tuần.', 'Let it grow for many weeks.'], text: ['Dây trầu dài chạm mặt bàn. Khách đo thử: hơn một mét.', 'The vine reaches the table. A guest measures it: over a metre.'] },
    box: () => [0, 3, 14, 40], d: (R, c) => { const len = 6 + Math.min(26, Math.floor(c.day / 3)); R(5, 3, 1, 8, OUT); R(1, 11, 10, 6, '#c9905a'); R(2, 9, 8, 3, LEAF2); for (const [i, x] of [[0, 2], [1, 8], [2, 5]]) for (let y = 0; y < len - i * 3; y += 3) R(x + ((y / 3) % 2), 17 + y, 2, 2, (y / 3) % 2 ? LEAF : LEAF2); } },
  { id: 'longgiay', slot: 'iceil', price: 80, name: ['Đèn lồng giấy', 'Paper lanterns'],
    story: ['Lame tự dán trong một đêm mất điện, hồ làm bằng cơm nguội.', 'Lame glued them during a blackout, with paste made from leftover rice.'],
    s: { how: 'night', hint: ['Thắp đèn lên.', 'Light them.'], text: ['Trên giấy hiện bóng chữ của bài tập tiếng Trung cũ: giấy tận dụng mà.', 'Old Chinese homework shows through the paper: recycled, of course.'] },
    box: () => [18, 3, 124, 18], d: (R, c) => { for (const [i, x] of [[0, 22], [1, 85], [2, 132]]) { const s = Math.round(Math.sin(c.t + i * 2)), col = [RED, GOLD, PINK][i]; R(x + 3, 3, 1, 6, OUT); R(x + s, 9, 7, 8, col); R(x + 1 + s, 8, 5, 10, col); R(x + 2 + s, 9, 1, 8, WHITE); if (c.night) glow(c.g, x + 3, 13, 9); } } },
  { id: 'disco', slot: 'iceil', price: 200, name: ['Quả cầu disco', 'Disco ball'],
    story: ['Mua vì một phút bốc đồng. Giờ tối thứ bảy nào học sinh cũng đòi bật.', 'An impulse buy. Now the students ask for it every Saturday night.'],
    s: { how: 'night', hint: ['Disco chỉ đẹp trong tối.', 'Disco only works in the dark.'], text: ['Cả quán thành sàn nhảy một phút. Lame nhảy trước, khách vỗ tay.', 'For one minute the shop is a dance floor. Lame starts, the guests clap.'] },
    box: () => [81, 3, 12, 20], d: (R, c) => { R(86, 3, 1, 7, OUT); R(82, 10, 9, 9, '#cfd6e8'); R(83, 9, 7, 11, '#cfd6e8'); for (let i = 0; i < 9; i++) R(83 + (i % 3) * 3, 11 + Math.floor(i / 3) * 3, 2, 2, (Math.floor(c.t * 5) + i) % 3 ? GREY : WHITE); if (c.night) for (let i = 0; i < 10; i++) { const a = c.t * 1.5 + i * 0.63; R(87 + Math.cos(a) * (18 + (i % 3) * 14), 28 + Math.sin(a) * (10 + (i % 2) * 10), 2, 2, [PINK, BLUE, GOLD][i % 3]); } } },
  { id: 'beca', slot: 'ifloor', price: 240, name: ['Bể cá vàng', 'Goldfish tank'],
    story: ['Một khách chuyển nhà gửi lại, kèm tờ hướng dẫn dài ba trang.', 'Left by a customer who moved away, with three pages of instructions.'],
    s: { how: 'combo', with: 'omeo', hint: ['Bạn cùng phòng của cá thích nằm ổ.', 'The fish would like a sleepy neighbour.'], text: ['Mèo ngủ quay lưng vào bể. Cá bơi sát kính nhìn trộm.', 'The cat sleeps with its back to the tank. The fish press against the glass to peek.'] },
    box: () => [60, 78, 24, 20], d: (R, c) => { R(62, 92, 20, 5, WOOD); R(62, 80, 20, 12, '#cfe8f8'); R(63, 82, 18, 9, BLUE); R(62, 80, 20, 1, OUT); for (let i = 0; i < 3; i++) { const x = 64 + ((c.t * (2 + i) + i * 5) % 12); R(x, 83 + i * 3, 3, 2, ['#ff9a3c', RED, GOLD][i]); R(x - 1, 83 + i * 3, 1, 2, '#ff9a3c'); } R(77, 87, 1, 4, LEAF2); R(79, 85, 1, 6, LEAF); R(66, 82 - ((c.t * 4) % 2), 1, 1, WHITE); } },
  { id: 'kesach', slot: 'ifloor', price: 200, name: ['Kệ sách trao đổi', 'Book swap shelf'],
    story: ['Lấy một cuốn thì để lại một cuốn. Chưa ai gian lận cả.', 'Take one, leave one. Nobody has cheated yet.'],
    s: { how: 'tap', need: 6, hint: ['Rút thử vài cuốn.', 'Pull out a few books.'], text: ['Kẹp trong cuốn từ điển là vé xem phim từ 1998 và lời tỏ tình chưa gửi.', 'Inside the dictionary: a 1998 cinema ticket and an unsent love note.'] },
    box: () => [62, 72, 20, 26], d: (R, c) => { R(63, 73, 18, 24, WOOD); R(64, 74, 16, 22, '#3b2418'); const cols = [RED, BLUE, GOLD, LEAF2, PINK, '#a98bff']; for (let row = 0; row < 3; row++) { for (let i = 0; i < 6; i++) { const h = 5 + ((i + row) % 2); R(65 + i * 2.5, 80 + row * 7 - h, 2, h, cols[(i + row * 2) % 6]); } R(64, 80 + row * 7, 16, 1, WOOD2); } if (c.fx) R(81, 80, 3, 4, WHITE); } },
  { id: 'omeo', slot: 'ipet', price: 160, name: ['Ổ mèo ngủ', 'Sleeping cat bed'],
    story: ['Đệm may từ tạp dề cũ. Mèo hoang chọn nó ngay đêm đầu.', 'A cushion sewn from old aprons. A stray claimed it the very first night.'],
    s: { how: 'night', hint: ['Xem mèo ngủ ban đêm.', 'Watch it sleep at night.'], text: ['Mèo ngủ mớ, chân đạp như đang chạy. Lame đặt tên là Gừng.', 'It dreams and its paws run. Lame names it Ginger.'] },
    box: () => [36, 84, 20, 13], d: (R, c) => { R(37, 90, 18, 6, '#c2354a'); R(39, 89, 14, 5, '#ff7b88'); R(41, 87, 10, 5, '#ff9a3c'); R(47, 85, 6, 5, '#ff9a3c'); R(47, 84, 1, 1, '#ff9a3c'); R(52, 84, 1, 1, '#ff9a3c'); R(48, 87, 2, 1, OUT); R(51, 87, 1, 1, OUT); R(40, 91, 8, 1, '#c86a1f'); const z = (c.t * 3) % 6; R(55, 82 - z, 2, 1, WHITE); R(56, 83 - z, 1, 1, WHITE); R(55, 84 - z, 2, 1, WHITE); } },
  { id: 'ghita', slot: 'icorner', price: 140, name: ['Đàn ghi-ta cũ', 'Old guitar'],
    story: ['Ai cũng được đàn, miễn là không đàn quá ba bài buồn liên tiếp.', 'Anyone may play, but never more than three sad songs in a row.'],
    s: { how: 'tap', need: 4, hint: ['Gảy thử vài nốt.', 'Pluck a few notes.'], text: ['Trong thùng đàn có tờ hợp âm tự chép, đề: “Tặng quán trà đầu tiên chịu nghe tôi hát”.', 'Inside, a chord sheet reads: “For the first tea shop willing to hear me sing”.'] },
    box: () => [140, 82, 14, 18], d: (R, c) => { R(147, 82, 2, 9, WOOD); R(146, 81, 4, 2, OUT); R(143, 89, 10, 6, WOOD2); R(144, 87, 8, 10, WOOD2); R(147, 91, 3, 3, OUT); R(148, 83, 1, 13, '#fff3b0'); if (c.fx) note(R, 136, 78 - ((c.t * 6) % 6), GOLD); } },
  // ===== đợt 2: ngoài phố =====
  { id: 'laco', slot: 'roofM', price: 90, name: ['Lá cờ tiệm trà', 'Tea shop flag'],
    story: ['May từ vải thừa của tạp dề. Gió càng to, chữ “trà” càng rõ.', 'Sewn from apron offcuts. The stronger the wind, the clearer the word for tea.'],
    s: { how: 'rain', hint: ['Chờ ngày mưa gió.', 'Wait for wind and rain.'], text: ['Cờ ướt hiện thêm hình một chiếc lá trà.', 'Wet, the flag reveals a tea leaf.'] },
    box: G => { const x = (G.x0 + G.x1) >> 1; return [x - 4, G.top - 13, 13, 14]; }, d: (R, c) => { const x = (c.G.x0 + c.G.x1) >> 1, y = c.G.top, w = Math.round(Math.sin(c.t * 3)); R(x - 3, y - 12, 1, 12, GREY); R(x - 2, y - 12 + w, 5, 6, RED); R(x + 3, y - 12 - w, 5, 6, RED); R(x, y - 10, 4, 2, GOLD); if (c.rain) R(x + 4, y - 9, 2, 3, LEAF2); } },
  { id: 'ngoisao', slot: 'roofM', price: 150, name: ['Ngôi sao biển hiệu', 'Rooftop star'],
    story: ['Phần thưởng cho tuần đầu không đổ bỏ một ly nào, Lame tự trao cho mình.', 'Lame’s own prize for a first week without pouring away a single cup.'],
    s: { how: 'night', hint: ['Sao đợi trời tối.', 'Stars wait for the dark.'], text: ['Sao nháy ba lần: tín hiệu cho khách quen biết quán còn mở.', 'It blinks three times: the regulars’ sign that you are still open.'] },
    box: G => { const x = (G.x0 + G.x1) >> 1; return [x - 5, G.top - 12, 11, 12]; }, d: (R, c) => { const x = (c.G.x0 + c.G.x1) >> 1, y = c.G.top - 11, col = c.night && Math.floor(c.t * 3) % 2 ? '#fff3b0' : GOLD; R(x, y, 1, 2, col); R(x - 1, y + 2, 3, 2, col); R(x - 4, y + 4, 9, 2, col); R(x - 2, y + 6, 5, 2, col); R(x - 3, y + 8, 2, 2, col); R(x + 2, y + 8, 2, 2, col); R(x, y + 8, 1, 3, GREY); if (c.night) glow(c.g, x, y + 5, 9); } },
  { id: 'vuonmai', slot: 'roofM', price: 200, name: ['Vườn rau thơm trên mái', 'Rooftop herb garden'],
    story: ['Bạc hà, sả, tía tô: nguyên liệu “nhà trồng” cho những ly trà đặc biệt.', 'Mint, lemongrass and perilla: home-grown extras for special cups.'],
    s: { how: 'day', days: [20, 40, 60, 80], hint: ['Cây cần thời gian lớn.', 'Plants need time.'], text: ['Lứa bạc hà đầu tiên! Cả xóm được mời một ly trà bạc hà.', 'First mint harvest! The whole lane gets a free mint tea.'] },
    box: G => { const x = (G.x0 + G.x1) >> 1; return [x - 7, G.top - 8, 13, 9]; }, d: (R, c) => { const x = (c.G.x0 + c.G.x1) >> 1, y = c.G.top; R(x - 6, y - 3, 12, 3, WOOD); for (let i = 0; i < 4; i++) { const h = 3 + (i % 3) + (c.day >= 40 ? 1 : 0); R(x - 5 + i * 3, y - 3 - h, 2, h, i % 2 ? LEAF : LEAF2); R(x - 6 + i * 3, y - 2 - h, 4, 1, LEAF2); } } },
  { id: 'khicau', slot: 'sky2', price: 240, name: ['Khinh khí cầu', 'Hot-air balloon'],
    story: ['Thi thoảng bay ngang phố. Người lái từng là khách của quán.', 'It drifts over now and then. The pilot used to be your customer.'],
    s: { how: 'tap', need: 3, hint: ['Vẫy nó vài lần.', 'Wave at it a few times.'], text: ['Người lái thả xuống một tấm thiệp: “Nhìn từ trên này, quán bạn sáng nhất phố”.', 'A card floats down: “From up here, yours is the brightest shop”.'] },
    box: () => [40, 6, 14, 20], d: (R, c) => { const b = Math.round(Math.sin(c.t * 0.8) * 2), y = 8 + b; R(43, y, 8, 2, RED); R(41, y + 2, 12, 6, RED); R(43, y + 8, 8, 3, RED); R(45, y, 3, 11, GOLD); R(44, y + 11, 1, 3, WOOD); R(50, y + 11, 1, 3, WOOD); R(45, y + 14, 5, 3, WOOD2); if (c.fx) R(47, y + 18 + (c.t * 8) % 6, 3, 2, WHITE); } },
  { id: 'danchim', slot: 'sky2', price: 80, name: ['Đàn chim én', 'Swallows'],
    story: ['Én bay thấp thì trời sắp mưa, bà dặn thế.', 'Low swallows mean rain is coming, grandma said.'],
    s: { how: 'day', days: [67, 68, 69, 70, 75, 85], hint: ['Én báo mùa xuân.', 'Swallows announce spring.'], text: ['Én về làm tổ dưới mái hiên. Quán có thêm hàng xóm.', 'They nest under your awning. The shop has new neighbours.'] },
    box: () => [36, 8, 24, 14], d: (R, c) => { for (const [i, [x, y]] of [[38, 12], [47, 9], [52, 17]].entries()) { const f = Math.floor(c.t * 5 + i) % 2, dx = Math.round(Math.sin(c.t + i) * 2); R(x + dx, y + (f ? 0 : 2), 3, 1, OUT); R(x + 3 + dx, y + 1, 2, 2, OUT); R(x + 5 + dx, y + (f ? 0 : 2), 3, 1, OUT); } } },
  { id: 'cauvong', slot: 'sky2', price: 300, name: ['Mây cầu vồng', 'Rainbow cloud'],
    story: ['Một đám mây không chịu bay đi từ hôm khai trương bán thêm món mới.', 'A cloud that refuses to leave since the day you added a new drink.'],
    s: { how: 'rain', hint: ['Cầu vồng cần mưa.', 'Rainbows need rain.'], text: ['Mưa tạnh, cầu vồng cắm thẳng xuống cửa quán.', 'After the rain, the rainbow lands right on your door.'] },
    box: () => [36, 6, 26, 16], d: (R, c) => { ['#e8454d', '#ff9a3c', '#ffd84d', '#5fd068', '#5ab4ff', '#a98bff'].forEach((col, i) => { R(40 + i, 8 + i, 18 - i * 2, 1, col); R(39 + i, 9 + i, 1, 9 - i, col); R(58 - i, 9 + i, 1, 9 - i, col); }); R(36, 16, 9, 4, WHITE); R(38, 14, 5, 3, WHITE); R(54, 16, 8, 4, WHITE); } },
  { id: 'maybaygiay', slot: 'sky2', price: 50, name: ['Máy bay giấy', 'Paper plane'],
    story: ['Gấp từ tờ hóa đơn đã trả xong. Cảm giác bay bổng khó tả.', 'Folded from a bill you finally paid off. A light feeling indeed.'],
    s: { how: 'tap', need: 2, hint: ['Bắt lấy nó.', 'Catch it.'], text: ['Mở ra thấy lời nhắn của khách: “Cho em xin công thức trà đào”.', 'Unfold it: “Please share your peach tea recipe”.'] },
    box: () => [40, 10, 16, 9], d: (R, c) => { const x = 42 + Math.round(Math.sin(c.t * 1.1) * 4), y = 12 + Math.round(Math.cos(c.t * 1.7) * 2) - (c.fx ? 4 : 0); R(x, y + 3, 11, 1, WHITE); R(x + 2, y + 2, 9, 1, WHITE); R(x + 5, y + 1, 6, 1, WHITE); R(x + 8, y, 3, 1, WHITE); R(x + 5, y + 4, 4, 1, '#cfd6e8'); } },
  { id: 'chovang', slot: 'road2', price: 220, name: ['Chó Vàng gác phố', 'Goldie the dog'],
    story: ['Chó của bác bảo vệ, tan ca là nằm trước quán chờ miếng bánh.', 'The guard’s dog; after his shift it waits by your shop for a crumb.'],
    s: { how: 'tap', need: 5, hint: ['Xoa đầu nó nhiều lần.', 'Pat it again and again.'], text: ['Vàng đứng lên bắt tay. Bác bảo vệ ngạc nhiên: “Nó chưa bắt tay ai bao giờ”.', 'It stands and offers a paw. “It has never done that for anyone,” says the guard.'] },
    box: () => [6, 76, 18, 11], d: (R, c) => { const col = '#e8a23c', w = Math.floor(c.t * (c.fx ? 10 : 3)) % 2; R(8, 80, 11, 5, col); R(16, 76, 6, 6, col); R(16, 75, 2, 2, '#c97f24'); R(21, 79, 2, 2, col); R(19, 78, 1, 1, OUT); R(22, 79, 1, 1, OUT); R(6, 78 + w, 2, 3, col); R(9, 85, 2, 2, col); R(16, 85, 2, 2, col); } },
  { id: 'vungnuoc', slot: 'road2', price: 70, name: ['Vũng nước và chú ếch', 'Puddle and frog'],
    story: ['Ổ gà trước quán chưa ai vá. Có một chú ếch thấy vậy là tuyệt.', 'Nobody has fixed the pothole. One frog thinks that is wonderful.'],
    s: { how: 'rain', hint: ['Ếch thích mưa.', 'Frogs love rain.'], text: ['Ếch kêu ba tiếng, hôm đó quán hết sạch trà nóng.', 'It croaks three times, and the hot tea sells out that day.'] },
    box: () => [6, 77, 20, 10], d: (R, c) => { R(7, 82, 18, 4, '#6aa8d8'); R(10, 81, 12, 6, '#6aa8d8'); R(11, 83, 5, 1, WHITE); const j = c.rain ? Math.round(Math.abs(Math.sin(c.t * 4)) * 3) : 0; R(15, 79 - j, 6, 4, LEAF2); R(15, 78 - j, 2, 2, LEAF2); R(19, 78 - j, 2, 2, LEAF2); R(15, 78 - j, 1, 1, OUT); R(20, 78 - j, 1, 1, OUT); } },
  { id: 'xebanhmi', slot: 'road2', price: 320, name: ['Xe bánh mì cô Tư', 'Aunt Tư’s bread cart'],
    story: ['Cô Tư đỗ nhờ mỗi sáng, trả công bằng ổ bánh mì đầu tiên.', 'She parks here every morning and pays with the first loaf.'],
    s: { how: 'tap', need: 4, hint: ['Hỏi thăm cô vài lần.', 'Stop and chat a few times.'], text: ['Cô Tư tiết lộ bí quyết: “Nhớ tên khách thì bán gì cũng được”.', 'Her secret: “Remember their names and you can sell anything”.'] },
    box: () => [3, 70, 27, 18], d: R => { R(4, 71, 25, 2, GOLD); R(5, 73, 1, 5, WOOD); R(27, 73, 1, 5, WOOD); R(4, 78, 25, 7, RED); R(6, 79, 12, 4, '#cfe8f8'); for (let i = 0; i < 3; i++) R(7 + i * 4, 80, 3, 2, '#d89a4a'); R(20, 79, 7, 4, GOLD); R(6, 85, 4, 3, OUT); R(23, 85, 4, 3, OUT); } },
  { id: 'vantruot', slot: 'road2', price: 60, name: ['Ván trượt bỏ quên', 'Forgotten skateboard'],
    story: ['Của cậu học sinh hay uống trà đá chanh. Vẫn chưa quay lại lấy.', 'It belongs to the lemon-tea student. Still not collected.'],
    s: { how: 'day', days: [30, 50, 70], hint: ['Chủ nó sẽ quay lại.', 'Its owner will return.'], text: ['Cậu bé quay lại, cao hơn một cái đầu, và gọi đúng món cũ.', 'The boy is back, a head taller, and orders the usual.'] },
    box: () => [6, 80, 18, 7], d: R => { R(7, 82, 16, 2, '#a98bff'); R(6, 81, 2, 1, '#a98bff'); R(22, 81, 2, 1, '#a98bff'); R(9, 84, 3, 2, OUT); R(18, 84, 3, 2, OUT); R(11, 82, 8, 1, GOLD); } },
  // ===== đợt 2: trong quán =====
  { id: 'lohoa', slot: 'icounter2', price: 80, name: ['Lọ hoa cúc', 'Vase of daisies'],
    story: ['Hoa của khách mang tặng, thay mỗi tuần mà không ai biết là ai.', 'Replaced every week by a customer nobody has identified.'],
    s: { how: 'day', days: [14, 28, 42, 56], hint: ['Cuối tuần chơi, để ý lọ hoa.', 'Watch the vase at the end of a game week.'], text: ['Tìm thấy mẩu giấy trong lọ: người tặng là bà cụ hay uống trà gừng.', 'A note in the vase: it is the old lady who drinks ginger tea.'] },
    box: () => [86, 40, 11, 17], d: R => { R(89, 49, 6, 7, BLUE); R(90, 50, 1, 5, WHITE); for (const [x, y] of [[87, 42], [92, 40], [94, 45]]) { R(x + 1, y, 1, 3, WHITE); R(x, y + 1, 3, 1, WHITE); R(x + 1, y + 1, 1, 1, GOLD); R(x + 1, y + 3, 1, 5, LEAF); } } },
  { id: 'hutien', slot: 'icounter2', price: 60, name: ['Hũ tiền boa', 'Tip jar'],
    story: ['Dán chữ “Góp cho chuyến đi Đà Lạt của cả quán”.', 'Labelled “For the staff trip to Da Lat”.'],
    s: { how: 'tap', need: 6, hint: ['Lắc thử vài lần.', 'Give it a few shakes.'], text: ['Trong hũ có cả tiền xu nước ngoài và một cái cúc áo.', 'Among the coins: foreign money and one shirt button.'] },
    box: () => [86, 43, 11, 13], d: (R, c) => { R(87, 46, 9, 10, '#cfe8f8'); R(87, 45, 9, 1, GREY); for (let i = 0; i < 6; i++) R(88 + (i % 3) * 2.5, 53 - Math.floor(i / 3) * 2, 2, 2, GOLD); if (c.fx) R(91, 42 + ((c.t * 8) % 4), 2, 2, GOLD); } },
  { id: 'nenthom', slot: 'icounter2', price: 90, name: ['Nến thơm hương trà', 'Tea-scented candle'],
    story: ['Đốt vào buổi tối, mùi hoa lài bay ra tận cửa.', 'Lit in the evening, its jasmine drifts to the door.'],
    s: { how: 'night', hint: ['Thắp lên khi trời tối.', 'Light it after dark.'], text: ['Khách ngửi mùi nến mà nhớ nhà, ngồi thêm một ấm.', 'The scent reminds a guest of home; they order another pot.'] },
    box: () => [87, 42, 9, 14], d: (R, c) => { R(88, 49, 7, 7, '#ffe9b0'); R(88, 49, 7, 1, '#d8b878'); R(91, 47, 1, 2, OUT); if (c.night) { const f = Math.floor(c.t * 8) % 2; R(90, 43 + f, 3, 4, '#ff9a3c'); R(91, 44 + f, 1, 2, GOLD); glow(c.g, 91, 45, 8); } } },
  { id: 'bonsai', slot: 'isill', price: 190, name: ['Cây bonsai', 'Bonsai'],
    story: ['Tuổi bằng Lame. Tỉa một lần mất cả buổi chiều.', 'The same age as Lame. One trim takes a whole afternoon.'],
    s: { how: 'day', days: [45, 60, 90], hint: ['Chậm mà chắc.', 'Slow but sure.'], text: ['Cây ra một lá non màu đỏ. Ba năm nay mới thấy.', 'A red new leaf appears, the first in three years.'] },
    box: () => [28, 27, 16, 12], d: (R, c) => { R(31, 35, 11, 3, '#2f7ad1'); R(35, 30, 2, 5, WOOD); R(33, 32, 3, 1, WOOD); R(30, 28, 8, 3, LEAF); R(37, 30, 6, 3, LEAF); R(32, 27, 4, 2, LEAF2); if (c.day >= 45) R(42, 29, 2, 2, RED); } },
  { id: 'quacautuyet', slot: 'isill', price: 130, name: ['Quả cầu tuyết', 'Snow globe'],
    story: ['Quà Noel của một khách người nước ngoài.', 'A Christmas present from a visitor from abroad.'],
    s: { how: 'tap', need: 3, hint: ['Lắc cho tuyết rơi.', 'Shake it to make it snow.'], text: ['Trong quả cầu là mô hình đúng con phố này. Ai làm vậy?', 'Inside is a model of this very street. Who made it?'] },
    box: () => [29, 27, 12, 12], d: (R, c) => { R(31, 35, 9, 3, WOOD); R(31, 29, 9, 6, '#cfe8f8'); R(33, 28, 5, 1, '#cfe8f8'); R(34, 32, 3, 3, RED); R(33, 31, 5, 1, LEAF); for (let i = 0; i < 4; i++) R(32 + (i * 3) % 7, 29 + ((c.t * (c.fx ? 9 : 2) + i * 2) % 5), 1, 1, WHITE); } },
  { id: 'hopnhac', slot: 'isill', price: 170, name: ['Hộp nhạc cũ', 'Old music box'],
    story: ['Vặn mười vòng thì được một phút nhạc.', 'Ten turns of the key buy one minute of music.'],
    s: { how: 'night', hint: ['Nghe lúc yên tĩnh.', 'Listen when it is quiet.'], text: ['Giai điệu đúng bài ru mà Lame vẫn ngân khi lau quầy.', 'It plays the lullaby Lame hums while wiping the counter.'] },
    box: () => [28, 24, 15, 15], d: (R, c) => { R(30, 32, 11, 6, '#8a3a6a'); R(30, 32, 11, 1, GOLD); R(34, 28, 3, 4, PINK); R(35, 26, 1, 2, '#ffd8b0'); if (c.night) note(R, 39, 24 + Math.round(Math.sin(c.t * 4) * 1), GOLD); } },
  { id: 'phitieu', slot: 'ilow', price: 110, name: ['Bảng phi tiêu', 'Dartboard'],
    story: ['Ai ném trúng hồng tâm được thêm trân châu. Chưa ai nhận được.', 'Hit the bullseye for extra pearls. No one has claimed it.'],
    s: { how: 'tap', need: 7, hint: ['Ném nhiều lần sẽ trúng.', 'Keep throwing.'], text: ['Trúng hồng tâm! Người ném là… bà của Lame, tám mươi tuổi.', 'Bullseye! Thrown by… Lame’s eighty-year-old grandmother.'] },
    box: () => [12, 44, 14, 14], d: (R, c) => { R(14, 45, 10, 12, OUT); R(13, 46, 12, 10, OUT); R(15, 47, 8, 8, WHITE); R(16, 48, 6, 6, RED); R(17, 49, 4, 4, WHITE); R(18, 50, 2, 2, RED); if (c.fx) { R(19, 50, 5, 1, GOLD); R(23, 49, 2, 3, BLUE); } } },
  { id: 'kemohinh', slot: 'ilow', price: 150, name: ['Kệ mô hình nhỏ', 'Shelf of figurines'],
    story: ['Khách đi du lịch đâu cũng mang về một con.', 'Every travelling customer brings one back.'],
    s: { how: 'tap', need: 4, hint: ['Đếm xem có bao nhiêu con.', 'Count how many there are.'], text: ['Con thứ tư là tượng Lame tí hon do một em bé nặn.', 'The fourth is a tiny Lame moulded by a child.'] },
    box: () => [10, 45, 24, 13], d: (R, c) => { R(11, 55, 22, 2, WOOD); [BLUE, PINK, LEAF2, GOLD].forEach((col, i) => { const x = 12 + i * 5.5, j = c.fx && i === 3 ? 2 : 0; R(x, 50 - j, 4, 5, col); R(x + 1, 47 - j, 3, 3, col); R(x + 1, 48 - j, 1, 1, OUT); }); } },
  { id: 'diathan', slot: 'ilow', price: 120, name: ['Tường đĩa than', 'Vinyl wall'],
    story: ['Ba đĩa nhạc không còn nghe được nữa nhưng bìa quá đẹp.', 'Three records too scratched to play but too handsome to bin.'],
    s: { how: 'day', days: [31, 55, 76], hint: ['Đêm hội, có người nhận ra đĩa.', 'On a festive night someone recognises one.'], text: ['Một khách ôm đĩa khóc cười: đĩa đám cưới của bố mẹ cô.', 'A guest laughs and cries: it was played at her parents’ wedding.'] },
    box: () => [10, 45, 24, 12], d: R => { [RED, GOLD, BLUE].forEach((col, i) => { const x = 11 + i * 8; R(x + 1, 46, 5, 9, OUT); R(x, 48, 7, 5, OUT); R(x + 2, 49, 3, 3, col); R(x + 3, 50, 1, 1, WHITE); }); } },
  { id: 'lichboc', slot: 'ilow2', price: 40, name: ['Lịch bóc tường', 'Tear-off calendar'],
    story: ['Mỗi sáng bóc một tờ, mặt sau ghi doanh thu hôm qua.', 'One page a day; yesterday’s takings go on the back.'],
    s: { how: 'day', days: [31, 67], hint: ['Bóc đến ngày đầu năm.', 'Tear through to a New Year.'], text: ['Tờ lịch đầu năm có câu: “Chậm mà đều”. Lame đóng khung nó.', 'The New Year page reads “slow and steady”. Lame frames it.'] },
    box: () => [38, 44, 11, 14], d: (R, c) => { R(39, 45, 9, 12, WHITE); R(39, 45, 9, 3, RED); const n = ((c.day - 1) % 31) + 1; R(41, 50, 2 + (n % 3), 4, OUT); R(45, 50, 1, 4, OUT); } },
  { id: 'bangghim', slot: 'ilow2', price: 100, name: ['Bảng ghim lời nhắn', 'Message board'],
    story: ['Khách ghim lời chúc, tìm đồ thất lạc, cả lời xin lỗi.', 'Guests pin wishes, lost-and-found notes, even apologies.'],
    s: { how: 'tap', need: 5, hint: ['Đọc hết các mảnh giấy.', 'Read every slip.'], text: ['Mảnh giấy dưới cùng: “Nhờ ly trà hôm đó mà mình không bỏ cuộc”.', 'The bottom one: “That cup of tea kept me from giving up”.'] },
    box: () => [38, 43, 16, 15], d: R => { R(39, 44, 14, 13, WOOD2); R(39, 44, 14, 1, WOOD); for (const [x, y, col] of [[40, 46, WHITE], [46, 45, GOLD], [41, 51, PINK], [47, 50, LEAF2]]) { R(x, y, 5, 4, col); R(x + 2, y, 1, 1, RED); } } },
  { id: 'bangkhen', slot: 'ilow2', price: 260, name: ['Bằng khen khu phố', 'Neighbourhood award'],
    story: ['“Quán sạch, chủ vui”. Chữ ký của bác tổ trưởng to hơn cả tên quán.', '“Clean shop, cheerful owner”. The signature is bigger than the shop’s name.'],
    s: { how: 'season', hint: ['Hoàn thành cả mùa.', 'Finish a whole season.'], text: ['Bác tổ trưởng ghé đóng thêm con dấu đỏ: “Quán của phố ta”.', 'The ward head adds a red seal: “Our street’s own shop”.'] },
    box: () => [38, 44, 15, 13], d: (R, c) => { R(39, 45, 13, 11, GOLD); R(40, 46, 11, 9, '#fff8e0'); R(42, 48, 7, 1, OUT); R(41, 50, 9, 1, GREY); R(46, 52, 3, 3, RED); if (c.season || c.found) R(42, 52, 3, 3, RED); } },
];

export const byId = Object.fromEntries(ITEMS.map(i => [i.id, i]));
export const viewOf = it => SLOTS[it.slot][0];
export const nameOf = it => L(...it.name), storyOf = it => L(...it.story), hintOf = it => L(...it.s.hint), secretOf = it => L(...it.s.text), slotName = it => L(SLOTS[it.slot][1], SLOTS[it.slot][2]);

// ---------- vẽ lên cảnh ----------
const fxUntil = new Map(); // id -> thời điểm (t của cảnh) hết hiệu ứng sau khi chạm
const rect = g => (x, y, w, h, col) => { g.fillStyle = col; g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); };
// ---------- chống chồng lấn ----------
const SOFT = new Set(['dayden', 'longgiay']); // dây treo mảnh, được phép vắt ngang món khác
export function areaOf(it, stage) { const [x, y, w, h] = it.box(shopGeo(stage)), [dx, dy] = shiftOf(it.slot, stage); return [x + dx, y + dy, w, h]; }
// các cặp chỗ này khung có giao nhau nhưng hình không che nhau (chuông nằm giữa hai đèn; đồ trên đường đứng phía trước)
const FINE = new Set(['bell+door', 'door+pot', 'left+road2']);
function overlaps(a, b, stage) { // chồng nhau đáng kể: phần giao hơn 15% món nhỏ hơn
  if (a.slot === b.slot) return true;
  if (FINE.has([a.slot, b.slot].sort().join('+'))) return false;
  if (SOFT.has(a.id) || SOFT.has(b.id) || viewOf(a) !== viewOf(b)) return false;
  const [ax, ay, aw, ah] = areaOf(a, stage), [bx, by, bw, bh] = areaOf(b, stage);
  const w = Math.min(ax + aw, bx + bw) - Math.max(ax, bx), h = Math.min(ay + ah, by + bh) - Math.max(ay, by);
  return w > 0 && h > 0 && w * h > 0.15 * Math.min(aw * ah, bw * bh);
}
// bày món it: trả về cách bày mới và danh sách món bị cất vì cùng chỗ hoặc đè lên nhau
export function arrange(on, it, stage) {
  const next = { ...on }, removed = [];
  for (const id in next) { const o = byId[id]; if (o && o.id !== it.id && overlaps(it, o, stage)) { delete next[id]; removed.push(o); } }
  next[it.id] = 1;
  return { on: next, removed };
}
export function slotArea(slot, on, stage) { // khung của một chỗ đặt: theo món đang bày, chưa có thì theo món đầu tiên của chỗ đó
  const list = ITEMS.filter(i => i.slot === slot), it = list.find(i => on[i.id]) || list.find(i => !SOFT.has(i.id)) || list[0];
  return it ? areaOf(it, stage) : null;
}
export const slotsOf = view => Object.keys(SLOTS).filter(s => SLOTS[s][0] === view);
export function slotAt(on, view, stage, x, y) { // chỗ đặt dưới điểm chạm (chỗ nhỏ nhất được ưu tiên)
  const hit = slotsOf(view).map(s => [s, slotArea(s, on, stage)]).filter(([, a]) => a && x >= a[0] - 1 && x <= a[0] + a[2] + 1 && y >= a[1] - 1 && y <= a[1] + a[3] + 1);
  hit.sort((p, q) => p[1][2] * p[1][3] - q[1][2] * q[1][3]);
  return hit[0]?.[0] || null;
}
export function drawSlots(g, on, env, sel) { // chế độ sắp đặt: khung đứt nét cho mọi chỗ, chỗ đang chọn tô sáng
  g.save(); g.lineWidth = 0.7;
  slotsOf(env.view).forEach((s, i) => {
    const a = slotArea(s, on, env.stage); if (!a) return;
    const filled = ITEMS.some(it => it.slot === s && on[it.id]);
    g.setLineDash([2, 1.5]); g.strokeStyle = s === sel ? '#ff5a36' : filled ? '#2f9a4a' : '#2d1f47';
    if (s === sel) { g.fillStyle = '#ffd84d55'; g.fillRect(a[0], a[1], a[2], a[3]); }
    g.strokeRect(a[0] + 0.5, a[1] + 0.5, a[2] - 1, a[3] - 1);
    g.setLineDash([]); g.fillStyle = s === sel ? '#ff5a36' : '#2d1f47'; const ly = Math.max(0, a[1] - 6); // số nằm phía trên khung để không che món đồ
    g.fillRect(a[0], ly, i > 8 ? 9 : 6, 6);
    g.fillStyle = '#fff'; g.font = '5px sans-serif'; g.textBaseline = 'top'; g.fillText(String(i + 1), a[0] + 1, ly + 0.5);
  });
  g.restore();
}
export function setupHtml(api, view, sel) { // bảng dưới cảnh khi đang sắp đặt
  const slots = slotsOf(view), n = Object.keys(api.on).length;
  const chips = slots.map((s, i) => { const it = ITEMS.find(x => x.slot === s && api.on[x.id]); return `<button class="chip ${s === sel ? 'on' : ''}" data-sslot="${s}">${i + 1}. ${slotName({ slot: s })}${it ? ' ✓' : ''}</button>`; }).join('');
  const mine = sel ? ITEMS.filter(x => x.slot === sel && api.own[x.id] != null) : [];
  const pick = !sel ? `<div class="dim tl-note">${L('Chạm vào một khung trên cảnh hoặc chọn một chỗ ở trên.', 'Tap a frame in the picture or choose a spot above.')}</div>`
    : `<div class="tl-sets">${mine.map(it => `<button class="tl-seti ${api.on[it.id] ? 'on' : ''}" data-sput="${it.id}"><img src="${previewOf(it)}" alt=""><span>${nameOf(it)}</span></button>`).join('')}<button class="tl-seti ${mine.some(it => api.on[it.id]) ? '' : 'on'}" data-sclear="${sel}"><span>${L('Để trống', 'Leave empty')}</span></button></div>${mine.length ? '' : `<div class="dim tl-note">${L('Bạn chưa có món nào cho chỗ này.', 'You own nothing for this spot yet.')}</div>`}`;
  return `<div class="tl-setup tl-user">
    <div class="row"><b>🛠 ${L('Sắp đặt', 'Arrange')} · ${view === 'in' ? L('Trong quán', 'Inside') : L('Ngoài phố', 'Outside')}</b><span class="grow"></span>
      <button class="btn" data-sview="1">${view === 'in' ? L('Ra ngoài', 'Go outside') : L('Vào trong', 'Go inside')}</button><button class="btn primary" data-sdone="1">← ${L('Xong', 'Done')}</button></div>
    <div class="tl-tabs">${chips}</div>${pick}
    <div class="row"><button class="btn" data-sshop="1">🛒 ${L('Cửa hàng', 'Shop')}</button><button class="btn" data-shide="1">${api.hidden ? '👁 ' + L('Hiện đồ trang trí', 'Show decorations') : '🙈 ' + L('Ẩn tất cả', 'Hide all')}</button><button class="btn" data-sempty="1" ${n ? '' : 'disabled'}>🧹 ${L('Cất hết', 'Put all away')}</button></div></div>`;
}
export const removedText = list => L(`Đã cất để khỏi chồng lên nhau: ${list.map(nameOf).join(', ')}`, `Put away to avoid overlapping: ${list.map(nameOf).join(', ')}`);

// dời cả chỗ đặt cho khỏi đè lên đồ đạc của quán (quán lớn có thêm bàn và cửa sổ thứ hai)
const shiftOf = (slot, stage) => (slot === 'road' ? [-26, 0] : slot === 'icorner' ? [-12, 0] : slot === 'ifloor' ? [44, 0] : slot === 'ipet' ? [46, 0] : slot === 'iframe' && stage >= 3 ? [0, 31] : [0, 0]);
// st: { on: {id:1}, found: {id:1} } · env: { view, stage, t, night, rain, day, sk, season }
export function drawDecor(g, st, env) {
  const R = rect(g), G = shopGeo(env.stage);
  for (const it of ITEMS) {
    if (!st.on[it.id] || viewOf(it) !== env.view) continue;
    const [dx, dy] = shiftOf(it.slot, env.stage);
    g.save(); g.translate(dx, dy);
    it.d(R, { ...env, g, G, fx: (fxUntil.get(it.id) || 0) > env.t, found: !!st.found[it.id] });
    g.restore();
  }
}
export function hitDecor(st, env, x, y) { // món đang đặt nằm dưới điểm chạm (món vẽ sau nằm trên)
  const G = shopGeo(env.stage);
  for (let i = ITEMS.length - 1; i >= 0; i--) {
    const it = ITEMS[i];
    if (!st.on[it.id] || viewOf(it) !== env.view) continue;
    const [x0, y0, bw, bh] = it.box(G), [dx, dy] = shiftOf(it.slot, env.stage), bx = x0 + dx, by = y0 + dy;
    if (x >= bx - 1 && x <= bx + bw + 1 && y >= by - 1 && y <= by + bh + 1) return it;
  }
  return null;
}
export function startFx(id, t, sec = 2.5) { fxUntil.set(id, t + sec); }
// bí mật tự lộ ra khi đủ điều kiện (không tính loại phải chạm). Trả về các món vừa đủ điều kiện.
export function autoSecrets(st, env) {
  return ITEMS.filter(it => {
    if (!st.on[it.id] || st.found[it.id] || viewOf(it) !== env.view) return false;
    const s = it.s;
    return s.how === 'night' ? env.night : s.how === 'rain' ? env.rain : s.how === 'day' ? s.days.includes(env.day) : s.how === 'season' ? env.season : s.how === 'combo' ? !!st.on[s.with] : false;
  });
}

// ---------- hình xem thử cho cửa hàng ----------
const shots = new Map(); // hình xem thử chỉ vẽ một lần: cửa hàng mở và vẽ lại nhanh
export function previewOf(it) {
  if (!shots.has(it.id)) shots.set(it.id, renderPreview(it));
  return shots.get(it.id);
}
function renderPreview(it) {
  const full = document.createElement('canvas'); full.width = 160; full.height = 100;
  const g = full.getContext('2d'), G = shopGeo(2), night = it.s.how === 'night' || it.id === 'neon';
  it.d(rect(g), { g, G, t: 1.3, night, rain: false, day: 62, sk: 1, stage: 2, fx: false, found: false, season: false });
  const [bx, by, bw, bh] = it.box(G), w = Math.max(bw, 18), h = Math.max(bh, 18), x = Math.max(0, bx - (w - bw) / 2), y = Math.max(0, by - (h - bh) / 2);
  const out = document.createElement('canvas'); out.width = w + 2; out.height = h + 2;
  const o = out.getContext('2d'); o.imageSmoothingEnabled = false;
  o.fillStyle = night ? '#3b3470' : viewOf(it) === 'in' ? '#f6e6c6' : '#cfe3f6'; o.fillRect(0, 0, out.width, out.height);
  o.drawImage(full, x, y, w, h, 1, 1, w, h);
  return out.toDataURL();
}

// ---------- cửa sổ cửa hàng ----------
// api: { balance(), own: {id: giá}, on: {id:1}, found: {id:1} }
export function shopHtml(api, tab = 'all') {
  const tabs = [['all', L('Tất cả', 'All')], ['out', L('Ngoài phố', 'Outside')], ['in', L('Trong quán', 'Inside')], ['mine', L('Của tôi', 'Mine')]];
  const list = ITEMS.filter(it => tab === 'all' || (tab === 'mine' ? api.own[it.id] != null : viewOf(it) === tab));
  const bal = api.balance(), nOwn = ITEMS.filter(i => api.own[i.id] != null).length, nFound = ITEMS.filter(i => api.found[i.id]).length;
  return `<div class="tl-dec tl-user">
    <div class="tl-kpis"><div><b>🪙 ${bal}</b><small>${L('xu đang có', 'coins')}</small></div><div><b>${nOwn}/${ITEMS.length}</b><small>${L('món đã mua', 'items owned')}</small></div><div><b>${nFound}/${ITEMS.length}</b><small>${L('bí mật đã tìm', 'secrets found')}</small></div></div>
    <div class="dim tl-note">${L(`Mua bằng xu chung của app (học, nhiệm vụ, TeaLab). Đồ chỉ để ngắm, không đổi việc kinh doanh. Chạm vào món đồ trên cảnh quán để xem nó làm gì. Mỗi bí mật tìm được thưởng ${SECRET_COINS} xu.`, `Bought with your app coins (study, quests, TeaLab). Decoration only, no effect on business. Tap an item in the scene to see what it does. Each secret found pays ${SECRET_COINS} coins.`)}</div>
    <div class="row"><button class="btn primary" data-dsetup="1">🛠 ${L('Sắp đặt trên cảnh', 'Arrange in the scene')}</button></div>
    <div class="tl-tabs">${tabs.map(([k, n]) => `<button class="chip ${k === tab ? 'on' : ''}" data-dtab="${k}">${n}</button>`).join('')}</div>
    <div class="tl-decg">${list.map(it => {
    const own = api.own[it.id] != null, on = !!api.on[it.id], found = !!api.found[it.id];
    return `<div class="tl-decc ${on ? 'on' : ''}">
        <img src="${previewOf(it)}" alt="" loading="lazy">
        <b>${nameOf(it)}</b>
        <small class="dim">${viewOf(it) === 'in' ? L('Trong quán', 'Inside') : L('Ngoài phố', 'Outside')} · ${slotName(it)}</small>
        ${own ? `<p>${storyOf(it)}</p><p class="${found ? 'found' : 'dim'}">${found ? '✨ ' + secretOf(it) : '❓ ' + hintOf(it)}</p>` : `<small class="dim">${L('Mua để đọc câu chuyện và tìm bí mật.', 'Buy it to read its story and find its secret.')}</small>`}
        ${own ? `<button class="btn ${on ? '' : 'primary'}" data-dput="${it.id}">${on ? L('Cất đi', 'Put away') : L('Đặt vào quán', 'Place')}</button>` : `<button class="btn" data-dbuy="${it.id}" ${bal < it.price ? 'disabled' : ''}>🪙 ${it.price} · ${L('Mua', 'Buy')}</button>`}
      </div>`;
  }).join('') || `<div class="dim">${L('Bạn chưa mua món nào.', 'You have not bought anything yet.')}</div>`}</div></div>`;
}
export const TXT = {
  title: () => L('🎨 Trang trí quán', '🎨 Decorate'), button: () => L('Trang trí', 'Decorate'),
  bought: it => L(`Đã mua và đặt “${nameOf(it)}”`, `Bought and placed “${nameOf(it)}”`),
  found: it => L(`✨ Bí mật của ${nameOf(it)}: ${secretOf(it)} (+${SECRET_COINS} xu)`, `✨ ${nameOf(it)} secret: ${secretOf(it)} (+${SECRET_COINS} coins)`),
  confirm: it => L(`Mua “${nameOf(it)}” giá ${it.price} xu?`, `Buy “${nameOf(it)}” for ${it.price} coins?`),
  emptyAll: () => L('Cất hết đồ đang bày vào kho?', 'Put every decoration away?'),
  poor: () => L('Chưa đủ xu', 'Not enough coins'),
};
