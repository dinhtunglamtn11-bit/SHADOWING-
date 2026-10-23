// Chạy AI Whisper trong một luồng riêng (Web Worker): chấm điểm giọng nói khi video đang chạy mà trang không bị khựng.
// Mô hình dùng chung bộ nhớ đệm của trình duyệt với phần Luyện nói / Canh từ nên tải một lần là đủ. Các yêu cầu xử lý lần lượt từng cái.
const TRANSFORMERS = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.6/dist/transformers.min.js';
const LANG_NAME = { en: 'english', zh: 'chinese', ko: 'korean', ja: 'japanese' };
let asr = null, name = '', chain = Promise.resolve();

async function load(model, id) {
  if (asr && name === model) return asr;
  const T = await import(/* @vite-ignore */ TRANSFORMERS);
  T.env.allowLocalModels = false;
  asr = await T.pipeline('automatic-speech-recognition', model, {
    progress_callback: p => { if (p.status === 'progress') self.postMessage({ id, type: 'load', p: p.progress || 0, f: p.file || '' }); },
  });
  name = model;
  return asr;
}

async function handle(d) {
  try {
    const t = await load(d.model, d.id);
    if (d.type === 'warm') { self.postMessage({ id: d.id, type: 'done', text: '' }); return; }
    const r = await t(d.audio, { language: LANG_NAME[d.lang] || undefined, task: 'transcribe', chunk_length_s: 30 });
    self.postMessage({ id: d.id, type: 'done', text: (r.text || '').trim() });
  } catch (e) {
    self.postMessage({ id: d.id, type: 'error', msg: String(e?.message || e) });
  }
}
self.onmessage = e => { chain = chain.then(() => handle(e.data)); };
