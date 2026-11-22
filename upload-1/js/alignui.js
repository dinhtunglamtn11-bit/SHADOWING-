// Hộp thoại “✨ Canh từ”: chọn cách, chạy, báo tiến độ.
import { $, toast, langInfo } from './util.js';
import * as store from './store.js';
import { currentItemId, currentCues, currentLang, applyCues, setCuesFromFile, simplifyCues, temp } from './player.js';
import { classifySrc } from './util.js';
import { alignCues, decodeAudio, transcribeAll, addPinyin } from './align.js';

let ctl = null;
const MAX_BYTES = 400 * 1024 * 1024;

export async function getBlob(it, id) {
  const a = await store.getAsset(it.assetId);
  if (a) return a.blob;
  if (temp.has(id)) return temp.get(id);
  if (classifySrc(it.src).kind === 'file') {
    const r = await fetch(it.src.trim());
    if (!r.ok) throw new Error('Không tải được file từ link (' + r.status + ')');
    return await r.blob();
  }
  return null;
}

function setBusy(b) {
  $('#aStart').hidden = b; $('#aStop').hidden = !b; $('#aMode').disabled = b; $('#aModel').disabled = b;
  $('#aProg').hidden = !b && !$('#aStat').textContent;
}

async function run() {
  const id = currentItemId(), it = id && store.get('items', id);
  if (!it) { toast('Hãy mở một video trước'); return; }
  const cues = JSON.parse(JSON.stringify(currentCues()));
  if (!cues.length) { toast('Video cần có phụ đề (.srt/.vtt) trước'); return; }
  const k = classifySrc(it.src).kind;
  if (k === 'youtube' || k === 'tiktok') {
    $('#aStat').textContent = 'YouTube/TikTok không cho app lấy âm thanh. Hãy tải video về máy rồi thêm bằng “＋ Thêm video”.';
    return;
  }
  const lang = currentLang(), words = langInfo(lang).words, mode = $('#aMode').value;
  ctl = new AbortController();
  setBusy(true);
  $('#aProg').removeAttribute('value'); $('#aStat').textContent = 'Đang đọc âm thanh…';
  try {
    const blob = await getBlob(it, id);
    if (!blob) throw new Error('Video này chưa có file trên máy. Hãy chọn file video trước.');
    if (blob.size > MAX_BYTES) throw new Error('File quá nặng để phân tích (giới hạn khoảng 400 MB).');
    const x = await decodeAudio(blob);
    const r = await alignCues(x, cues, {
      mode, model: $('#aModel').value, words, lang, signal: ctl.signal,
      onLoad: (p, f) => { $('#aProg').value = p / 100; $('#aStat').textContent = `Đang tải mô hình AI… ${Math.round(p)}% (${f.split('/').pop()}). Chỉ tải lần đầu.`; },
      onProgress: (d, n, note) => { if (n) { $('#aProg').value = d / n; $('#aStat').textContent = note ? `${note} ${d + 1}/${n}…` : ''; } },
    });
    applyCues(cues);
    $('#aStat').textContent = mode === 'ai'
      ? `Xong: ${r.aiCount} câu canh bằng AI, ${r.fastCount} câu dùng phân tích âm thanh.`
      : `Xong: đã canh ${cues.length} câu.`;
    toast('Đã canh từng từ ✨');
  } catch (e) {
    $('#aStat').textContent = e.name === 'AbortError' ? 'Đã dừng. Các câu chưa xong giữ nguyên.' : 'Lỗi: ' + (e.message || e);
    if (e.name !== 'AbortError') console.warn(e);
  } finally { ctl = null; setBusy(false); }
}

// Tạo dòng phiên âm pinyin (tiếng Trung) cho những câu mới có 1 dòng; mỗi chữ Hán ứng với 1 âm tiết
async function makePinyin() {
  const id = currentItemId();
  if (!id) { toast('Hãy mở một video trước'); return; }
  if (currentLang() !== 'zh') { $('#aStat').textContent = 'Tự tạo phiên âm hiện chỉ có cho tiếng Trung. Với tiếng Nhật/Hàn, hãy dùng file phụ đề đã có sẵn dòng phiên âm.'; return; }
  const cues = JSON.parse(JSON.stringify(currentCues()));
  if (!cues.length) { toast('Video cần có phụ đề trước'); return; }
  $('#aStat').textContent = 'Đang tải bộ tạo pinyin…';
  try {
    const made = await addPinyin(cues);
    if (!made) { $('#aStat').textContent = 'Không có câu nào cần tạo (câu đã có 2 dòng trở lên được giữ nguyên).'; return; }
    applyCues(cues);
    $('#aStat').textContent = `Đã tạo phiên âm cho ${made} câu.`;
  } catch (e) { $('#aStat').textContent = 'Lỗi tạo phiên âm: ' + (e.message || e) + ' (cần có mạng ở lần đầu)'; }
}

// Tự tạo phụ đề từ giọng nói của video (AI Whisper chạy trên máy bạn)
async function makeSubs() {
  const id = currentItemId(), it = id && store.get('items', id);
  if (!it) { toast('Hãy mở một video trước'); return; }
  const k = classifySrc(it.src).kind;
  if (k === 'youtube' || k === 'tiktok') { $('#aStat').textContent = 'YouTube/TikTok không cho app lấy âm thanh. Hãy tải video về máy rồi thêm bằng “＋ Thêm video”.'; return; }
  if (currentCues().length && !confirm('Video này đã có phụ đề. Tạo phụ đề mới sẽ thay thế phụ đề hiện tại. Tiếp tục?')) return;
  const lang = currentLang();
  ctl = new AbortController();
  $('#aMakeSubs').disabled = true; $('#aStop').hidden = false; $('#aStart').hidden = true;
  $('#aProg').hidden = false; $('#aProg').removeAttribute('value'); $('#aStat').textContent = 'Đang đọc âm thanh…';
  try {
    const blob = await getBlob(it, id);
    if (!blob) throw new Error('Video này chưa có file trên máy. Hãy chọn file video trước.');
    if (blob.size > MAX_BYTES) throw new Error('File quá nặng để phân tích (giới hạn khoảng 400 MB).');
    const x = await decodeAudio(blob);
    const cues = await transcribeAll(x, {
      lang, model: $('#aModel').value, signal: ctl.signal,
      onLoad: (p, f) => { $('#aProg').value = p / 100; $('#aStat').textContent = `Đang tải mô hình AI… ${Math.round(p)}% (${f.split('/').pop()}). Chỉ tải lần đầu.`; },
      onProgress: (d, n) => { $('#aProg').value = d / n; $('#aStat').textContent = `AI đang nghe… ${Math.floor(d / 60)}:${String(Math.floor(d % 60)).padStart(2, '0')} / ${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2, '0')}`; },
    });
    if (!cues.length) throw new Error('Không nghe ra lời nói nào (video không có tiếng, hoặc chọn sai ngôn ngữ).');
    setCuesFromFile(await simplifyCues(cues, lang)); // AI hay chép tiếng Trung ra chữ phồn thể: đổi sang giản thể
    $('#aStat').textContent = `Xong: ${cues.length} câu. Bạn nên xem lại bằng “✏️ Sửa phụ đề”, rồi dùng “Canh từ” để chữ sáng theo từng từ.`;
    toast(`Đã tạo ${cues.length} câu phụ đề`);
  } catch (e) {
    $('#aStat').textContent = e.name === 'AbortError' ? 'Đã dừng.' : 'Lỗi: ' + (e.message || e);
    if (e.name !== 'AbortError') console.warn(e);
  } finally { ctl = null; $('#aMakeSubs').disabled = false; $('#aStop').hidden = true; $('#aStart').hidden = false; }
}

export function init() {
  $('#aMakeSubs').onclick = makeSubs;
  $('#aPinyin').onclick = makePinyin;
  $('#btnAlign').onclick = () => {
    if (!currentItemId()) { toast('Hãy mở một video trước'); return; }
    $('#aStat').textContent = '';
    $('#aProg').hidden = true;
    $('#aModelRow').hidden = false; // luôn hiện: cũng dùng cho “Tạo phụ đề tự động”
    $('#alignDlg').showModal();
  };
  $('#aStart').onclick = run;
  $('#aStop').onclick = () => ctl?.abort();
  $('#aClear').onclick = () => {
    const cues = JSON.parse(JSON.stringify(currentCues()));
    cues.forEach(c => delete c.t);
    applyCues(cues);
    $('#aStat').textContent = 'Đã xóa giờ từng từ: chữ chạy đều theo độ dài câu.';
  };
  $('#aClose').onclick = () => { ctl?.abort(); $('#alignDlg').close(); };
}
