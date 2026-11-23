// Hộp thư của case SCM: thư/tin nhắn xuất hiện theo giờ thật khi chơi chế độ "Thời gian thực".
// Nguyên tắc: KHÔNG đổi số liệu, KHÔNG ảnh hưởng điểm và đáp án; không có hạn trả lời, không phạt, không âm thanh.
// Thư được tính xác định từ (mã case + giờ bắt đầu lượt chơi), nên hai máy cùng thấy đúng những thư giống nhau và không cần lưu gì thêm ngoài trạng thái đã đọc.
// Gồm: nhắc mốc (6 giờ trước khi một mốc khóa bước), vài thư ngẫu nhiên (mẹo, tin đồn báo giá, thư không liên quan), tối đa 3 thư ngẫu nhiên mỗi case.
const hash = s => { let h = 2166136261; for (const ch of String(s)) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const rng = seed => () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

const KIND = { tip: ['💡', 'Gợi ý'], nudge: ['⏰', 'Nhắc mốc'], noise: ['📨', 'Thư không liên quan'], price: ['💲', 'Tin giá chưa chính thức'] };
export const kindInfo = k => KIND[k] || KIND.tip;

const POOL = {
  common: [
    { kind: 'tip', from: 'Quản lý', subj: 'Nhắc nhanh về đơn vị', body: 'Trước khi nộp, em đối chiếu lại đơn vị của từng ô (%, nghìn, triệu, tỷ, số chữ số thập phân) với cột "Unit" trong form nhé. Nhiều lỗi mất điểm chỉ vì lệch đơn vị.' },
    { kind: 'tip', from: 'Quản lý', subj: 'Ô nào em thật sự chắc chắn?', body: 'Em chỉ nên đánh dấu 🎯 "chắc chắn" ở ô đã tính lại hai lần. Ô 🎯 mà sai sẽ bị trừ 5 điểm, còn ô không đánh dấu thì không bị trừ.' },
    { kind: 'tip', from: 'Đồng nghiệp', subj: 'Mẹo đọc hồ sơ', body: 'Anh hay đọc các bảng quy tắc (Rules) trước rồi mới nhìn số liệu. Quy tắc thường là chỗ quyết định phương án nào bị loại.' },
    { kind: 'noise', from: 'Phòng Hành chính', subj: 'Đăng ký suất ăn trưa thứ Sáu', body: 'Mọi người đăng ký suất ăn trưa thứ Sáu trước 15:00 giúp phòng nhé. (Thư này không liên quan đến case của em.)' },
    { kind: 'noise', from: 'IT', subj: 'Bảo trì hệ thống email tối nay', body: 'Hệ thống email sẽ bảo trì từ 23:00 đến 23:30. Bạn không cần làm gì. (Không liên quan đến case.)' },
    { kind: 'noise', from: 'Marketing', subj: 'Mời dự hội thảo logistics tháng sau', body: 'Công ty được mời cử người dự hội thảo logistics vào tháng sau. Ai quan tâm báo lại trong tuần. (Không liên quan đến case.)' },
    { kind: 'price', from: 'Nhà vận tải', subj: 'Thông báo điều chỉnh giá quý sau', body: 'Chúng tôi dự kiến điều chỉnh bảng giá từ quý sau, chưa có văn bản chính thức. Lưu ý: bài này chỉ dùng số liệu trong hồ sơ và các Exhibit cập nhật chính thức của case, không dùng tin chưa xác nhận.' },
    { kind: 'price', from: 'Nhà cung cấp', subj: 'Báo giá tham khảo mới', body: 'Gửi anh/chị báo giá tham khảo cho các đơn hàng sau này. Báo giá này không thay thế số liệu trong hồ sơ case: hãy tiếp tục dùng số liệu đã có.' },
    { kind: 'price', from: 'Đồng nghiệp', subj: 'Nghe nói tỷ giá sắp đổi', body: 'Nghe nói tỷ giá sắp đổi nhưng chưa có thông báo chính thức. Đừng sửa số liệu theo tin đồn: case chỉ cập nhật dữ liệu qua Exhibit chính thức.' },
  ],
  A: [{ kind: 'tip', from: 'Trưởng bộ phận hải quan', subj: 'Cơ sở tính thuế', body: 'Em kiểm tra lại cơ sở tính thuế mà hồ sơ quy định (giá trị, tỷ giá ngày đăng ký, các khoản cộng thêm) trước khi nhân với thuế suất.' }],
  B: [{ kind: 'tip', from: 'Ngân hàng', subj: 'Điều khoản và phí', body: 'Khi so các điều khoản thanh toán, hãy tính phí và chi phí tài trợ theo đúng quy tắc trong hồ sơ, và để ý giới hạn hạn mức của từng điều khoản.' }],
  C: [{ kind: 'tip', from: 'Trưởng phòng mua hàng', subj: 'So sánh theo tổng chi phí', body: 'Đơn giá thấp chưa chắc là rẻ nhất: hãy so theo tổng chi phí và kiểm tra các giới hạn (công suất, tỷ trọng, thời gian giao) theo hồ sơ.' }],
  D: [{ kind: 'tip', from: 'CFO', subj: 'Giới hạn cứng trước, giá trị sau', body: 'Phương án vi phạm giới hạn cứng (hạn mức, covenant, trần vốn) là phương án bị loại, dù nhìn có lợi nhuận cao. Kiểm tra giới hạn trước khi so sánh giá trị.' }],
  E: [{ kind: 'tip', from: 'Giám đốc phân tích', subj: 'Làm sạch dữ liệu trước', body: 'Trước khi tính KPI, hãy kiểm tra bản ghi trùng, số liệu bất thường và đối chiếu với ghi chú đi kèm. Số liệu bẩn làm sai mọi chỉ số phía sau.' }],
  F: [{ kind: 'tip', from: 'Điều phối viên', subj: 'Ràng buộc cứng trước', body: 'Trong bài lập kế hoạch, mọi ràng buộc cứng phải được thỏa trước, sau đó mới tối ưu chi phí hoặc doanh thu. Một kế hoạch rẻ nhưng vi phạm ràng buộc là kế hoạch không dùng được.' }],
};

// cs: { code, hours, ms: [{ id, name, h, steps }] }; run: { start, speed, sub }; enabled: người chơi bật tính năng này
export function eventsFor(cs, run, enabled = true) {
  if (!enabled || !run || run.sub || run.speed !== 'real') return [];
  const H = cs.hours, out = [];
  for (const m of cs.ms) { // nhắc mốc: 6 giờ trước khi khóa bước (chỉ với mốc đủ xa, không nhắc ngay khi vừa bắt đầu)
    if (m.h >= 12) out.push({ id: 'n-' + m.id, at: m.h - 6, kind: 'nudge', from: 'Hệ thống', subj: `Nhắc: ${m.id} sắp đến hạn`, body: `Khoảng 6 giờ nữa là tới ${m.id} (${m.name}). Các bước ${m.steps.join(', ')} sẽ bị khóa lúc đó. Bài được tự lưu liên tục; bạn chỉ cần hoàn tất phần cần làm.` });
  }
  const rand = rng(hash(cs.code + ':' + run.start)), n = Math.max(1, Math.min(3, Math.round(H / 48)));
  const pool = [...POOL.common, ...(POOL[cs.code[0]] || [])].map((e, i) => ({ ...e, key: i })), lo = 3, hi = H - Math.max(12, 0.15 * H);
  const bad = t => cs.ms.some(m => t > m.h - 3 && t < m.h + 0.5) || out.some(o => o.kind !== 'nudge' && Math.abs(o.at - t) < 8) || out.some(o => o.kind === 'nudge' && Math.abs(o.at - t) < 1);
  if (hi > lo) for (let k = 0; k < n; k++) {
    for (let tries = 0; tries < 40; tries++) { const t = +(lo + rand() * (hi - lo)).toFixed(1); if (bad(t)) continue; const p = pool.splice(Math.floor(rand() * pool.length), 1)[0]; if (!p) break; out.push({ id: 'r-' + p.key, at: t, kind: p.kind, from: p.from, subj: p.subj, body: p.body }); break; }
  }
  return out.sort((a, b) => a.at - b.at);
}
