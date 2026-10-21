// Thư viện: chia theo ngôn ngữ, theo loại (video / tài liệu / ghi chú) và theo mục tự tạo.
import { $, $$, esc, fmtMB, fmtS, toast, bus, uid, pickFile, getLang, langInfo, LANGS, classifySrc, hostOf } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import { pickAndAdd, openItem, addByLink } from './player.js';
import * as notes from './notes.js';

let tab = 'video', folder = 'all', editId = null;
const lang = it => it.lang || 'zh';
const byRecent = (a, b) => (b.u || 0) - (a.u || 0);
const curFolder = () => (folder === 'all' ? '' : folder);

function itemsOf(t) {
  return store.list('items').filter(i =>
    (t === 'pdf' ? (i.type === 'pdf' || i.type === 'text') : i.type === t) && lang(i) === getLang());
}
const foldersOf = l => store.list('folders').filter(f => lang(f) === l).sort((a, b) => a.name.localeCompare(b.name));

function render() {
  $$('#libTabs button').forEach(b => b.classList.toggle('on', b.dataset.t === tab));
  const all = itemsOf(tab), folders = foldersOf(getLang());
  if (folder !== 'all' && folder !== '' && !folders.some(f => f.id === folder)) folder = 'all';
  const cnt = id => all.filter(i => (i.folder || '') === id).length;
  const chip = (id, name, n) => `<button class="chip ${folder === id ? 'on' : ''}" data-f="${id}">${esc(name)} <small>${n}</small></button>`;
  $('#folderBar').innerHTML =
    chip('all', 'Tất cả', all.length) + chip('', 'Chưa phân mục', cnt('')) +
    folders.map(f => chip(f.id, f.name, cnt(f.id))).join('') +
    '<button class="chip add" id="newFolder">＋ Mục mới</button>' +
    (folder && folder !== 'all' ? '<button class="chip add" id="renFolder">✎ Đổi tên</button><button class="chip add" id="delFolder">🗑 Xóa mục</button>' : '');

  const q = ($('#libSearch').value || '').trim().toLowerCase();
  const shown = (folder === 'all' ? all : all.filter(i => (i.folder || '') === folder))
    .filter(i => !q || (i.title || '').toLowerCase().includes(q) || (i.body || '').toLowerCase().includes(q)).sort(byRecent);
  const addLabel = { video: '＋ Thêm video', pdf: '＋ Thêm tài liệu (PDF, TXT)', note: '＋ Ghi chú mới' }[tab];
  $('#libAdd').textContent = addLabel;
  $('#libLink').hidden = tab !== 'video';
  $('#libItems').innerHTML = shown.length ? shown.map(card).join('') :
    `<div class="empty">Chưa có mục nào cho ${esc(langInfo().name)}.<br>Bấm nút “${addLabel}” ở trên.</div>`;
  // trạng thái: có file trong máy / phát từ link / cần chọn lại file
  $$('#libItems .card[data-asset]').forEach(el => {
    const a = el.dataset.asset, hasSrc = el.dataset.src === '1', b = $('[data-loc]', el);
    const none = hasSrc ? '🔗 phát từ link' : '☁ chưa có file trên máy này';
    if (!a) { b.textContent = none; return; }
    store.hasAsset(a).then(ok => { b.textContent = ok ? '✓ có trên máy' : none; });
  });
  store.usage().then(u => { $('#libUsage').textContent = u ? `Bộ nhớ app: ${fmtMB(u.used)} / ${fmtMB(u.quota)}` : ''; });
}

function card(i) {
  const icon = i.type === 'video' ? (i.frame === 'portrait' ? '📱' : '🎬') : i.type === 'note' ? '📝' : i.type === 'pdf' ? '📄' : '📃';
  let meta = '';
  if (i.type === 'video') {
    const pct = i.duration ? Math.round(100 * (i.position || 0) / i.duration) + '% · ' : '';
    meta = `${i.cueCount || 0} câu · ${pct}${i.frame === 'portrait' ? 'khung dọc' : 'khung ngang'}${i.src ? ' · ' + hostOf(i.src) : ''}`;
  } else if (i.type === 'note') meta = ((i.body || '').replace(/\[\[(?:audio|video):[^|\]]*\|?([^\]]*)\]\]/g, '$1').trim().slice(0, 60) || 'Ghi chú trống');
  else meta = (i.type === 'pdf' ? 'PDF' : 'Văn bản') + (i.size ? ' · ' + fmtMB(i.size) : '');
  const hasAsset = i.type !== 'note';
  return `<div class="card" data-id="${i.id}" data-type="${i.type}" ${hasAsset ? `data-asset="${i.assetId || ''}" data-src="${i.src ? 1 : 0}"` : ''}>
    <div class="thumb ${i.frame === 'portrait' ? 'p' : ''}">${icon}</div>
    <div class="ci"><b>${esc(i.title)}</b><span class="dim">${esc(meta)}</span>${hasAsset ? '<span class="badge" data-loc></span>' : ''}</div>
    <button class="btn more" data-edit="${i.id}" title="Sửa">⋯</button></div>`;
}

// ---------- tài liệu: xem PDF / văn bản ----------
let pdfjsP = null;
function loadPdfJs() {
  return pdfjsP ||= new Promise((res, rej) => {
    const B = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
    const s = document.createElement('script');
    s.src = B + 'pdf.min.js';
    s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = B + 'pdf.worker.min.js'; res(window.pdfjsLib); };
    s.onerror = () => { pdfjsP = null; rej(new Error('Không tải được bộ đọc PDF (cần mạng ở lần đầu)')); };
    document.head.appendChild(s);
  });
}

async function renderPdf(blob, body) {
  const lib = await loadPdfJs();
  const pdf = await lib.getDocument({ data: new Uint8Array(await blob.arrayBuffer()) }).promise;
  body.innerHTML = '';
  const w = Math.min(body.clientWidth || 800, 900) - 8, dpr = Math.min(2, devicePixelRatio || 1);
  const first = await pdf.getPage(1), r = first.getViewport({ scale: 1 });
  const ratio = r.height / r.width;
  const io = new IntersectionObserver(es => es.forEach(async e => {
    if (!e.isIntersecting) return;
    const d = e.target; io.unobserve(d);
    const page = await pdf.getPage(+d.dataset.n);
    const vp = page.getViewport({ scale: (w / page.getViewport({ scale: 1 }).width) * dpr });
    const c = document.createElement('canvas');
    c.width = vp.width; c.height = vp.height; c.style.width = w + 'px'; c.style.height = (vp.height / dpr) + 'px';
    d.innerHTML = ''; d.style.minHeight = '0'; d.appendChild(c);
    await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
  }), { rootMargin: '600px' });
  for (let n = 1; n <= pdf.numPages; n++) {
    const d = document.createElement('div');
    d.className = 'pdfpage'; d.dataset.n = n; d.style.width = w + 'px'; d.style.minHeight = (w * ratio) + 'px';
    body.appendChild(d); io.observe(d);
  }
}

export async function openDoc(id) {
  const it = store.get('items', id);
  if (!it || it.deleted) return;
  $('#docTitle').textContent = it.title;
  const body = $('#docBody');
  body.innerHTML = '<div class="empty">Đang mở…</div>';
  bus.emit('nav', 'doc');
  const a = await store.getAsset(it.assetId);
  if (!a) {
    body.innerHTML = `<div class="empty">File chưa có trên máy này.<br><button class="btn primary" id="docPick">📂 Chọn lại file ${esc(it.fileName || '')}</button></div>`;
    $('#docPick').onclick = () => pickFile('.pdf,.txt,.md,application/pdf,text/plain').then(async ([f]) => {
      if (!f) return;
      const aid = it.assetId || uid();
      await store.putAsset(aid, f, f.name);
      store.put('items', id, { assetId: aid, fileName: f.name, size: f.size });
      openDoc(id);
    });
    return;
  }
  tracker.read();
  try {
    if (it.type === 'text') body.innerHTML = `<pre class="txt" lang="${langInfo(lang(it)).bcp}">${esc(await a.blob.text())}</pre>`;
    else await renderPdf(a.blob, body);
  } catch (e) { body.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
}

// ---------- sửa mục ----------
function fillFolders(l, sel) {
  $('#eFolder').innerHTML = '<option value="">Chưa phân mục</option>' +
    foldersOf(l).map(f => `<option value="${f.id}" ${f.id === sel ? 'selected' : ''}>${esc(f.name)}</option>`).join('');
}
function openEdit(id) {
  const it = store.get('items', id); if (!it) return;
  editId = id;
  $('#eTitle').value = it.title;
  $('#eLang').innerHTML = LANGS.map(l => `<option value="${l.id}" ${l.id === lang(it) ? 'selected' : ''}>${l.name}</option>`).join('');
  fillFolders(lang(it), it.folder || '');
  $('#eFrameRow').hidden = it.type !== 'video';
  $('#eSrcRow').hidden = it.type !== 'video';
  $('#eFrame').value = it.frame || 'landscape';
  $('#eSrc').value = it.src || '';
  $('#editDlg').showModal();
}

export function init() {
  $('#libTabs').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { tab = b.dataset.t; folder = 'all'; render(); } });
  $('#folderBar').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.f !== undefined) { folder = b.dataset.f; render(); return; }
    if (b.id === 'newFolder') {
      const name = (prompt('Tên mục mới (ví dụ: HSK 3, Phim, TikTok):') || '').trim();
      if (!name) return;
      const id = uid(); store.put('folders', id, { name, lang: getLang() }); folder = id; render();
    } else if (b.id === 'renFolder') {
      const f = store.get('folders', folder); const name = (prompt('Tên mới:', f?.name) || '').trim();
      if (name) { store.put('folders', folder, { name }); render(); }
    } else if (b.id === 'delFolder') {
      const f = store.get('folders', folder);
      if (!confirm(`Xóa mục "${f?.name}"? Các mục con sẽ chuyển về “Chưa phân mục”.`)) return;
      store.list('items').filter(i => i.folder === folder).forEach(i => store.put('items', i.id, { folder: '' }));
      store.del('folders', folder); folder = 'all'; render();
    }
  });
  $('#libAdd').onclick = () => {
    if (tab === 'video') pickAndAdd(curFolder()).then(render);
    else if (tab === 'pdf') {
      pickFile('.pdf,.txt,.md,application/pdf,text/plain', true).then(async fs => {
        for (const f of fs) {
          const isPdf = /\.pdf$/i.test(f.name) || f.type === 'application/pdf', assetId = uid();
          try { await store.putAsset(assetId, f, f.name); } catch (e) { toast('Không lưu được: ' + e.message); continue; }
          store.put('items', uid(), { type: isPdf ? 'pdf' : 'text', title: f.name.replace(/\.[^.]+$/, ''), lang: getLang(), folder: curFolder(), assetId, fileName: f.name, size: f.size, created: Date.now() });
        }
        render();
      });
    } else notes.newNote(curFolder());
  };
  $('#libSearch').addEventListener('input', render);
  $('#libLink').onclick = () => { $('#lUrl').value = ''; $('#lTitle').value = ''; $('#linkDlg').showModal(); };
  $('#lSave').onclick = async () => {
    const url = $('#lUrl').value.trim();
    if (!url) return;
    const k = classifySrc(url).kind;
    if (k === 'link' && !confirm('Link này không phát trực tiếp được trong app (chỉ mở sang tab mới).\nVẫn lưu vào thư viện?')) return;
    $('#lSave').disabled = true;
    const id = await addByLink(url, $('#lTitle').value.trim(), curFolder());
    $('#lSave').disabled = false;
    if (!id) return;
    $('#linkDlg').close(); render();
    toast('Đã thêm vào thư viện');
  };
  $('#libItems').addEventListener('click', e => {
    const ed = e.target.closest('[data-edit]');
    if (ed) { openEdit(ed.dataset.edit); return; }
    const c = e.target.closest('.card'); if (!c) return;
    const t = c.dataset.type;
    if (t === 'video') openItem(c.dataset.id);
    else if (t === 'note') notes.openNote(c.dataset.id);
    else openDoc(c.dataset.id);
  });
  $('#eLang').onchange = () => fillFolders($('#eLang').value, '');
  $('#eClose').onclick = () => $('#editDlg').close();
  $('#eSave').onclick = () => {
    const it = store.get('items', editId);
    const patch = { title: $('#eTitle').value.trim() || it.title, lang: $('#eLang').value, folder: $('#eFolder').value };
    if (it.type === 'video') {
      patch.frame = $('#eFrame').value;
      const s = $('#eSrc').value.trim();
      if (s && ['bad', 'none'].includes(classifySrc(s).kind)) { toast('Link nguồn không hợp lệ (phải bắt đầu bằng http hoặc https)'); return; }
      patch.src = s;
    }
    store.put('items', editId, patch);
    $('#editDlg').close();
  };
  $('#eDel').onclick = () => {
    const it = store.get('items', editId);
    if (!confirm(`Xóa "${it.title}"? (file trong máy này cũng bị xóa)`)) return;
    store.del('items', editId);
    if (it.assetId) store.delAsset(it.assetId);
    $('#editDlg').close();
  };
  $('#docBack').onclick = () => bus.emit('nav', 'library');
  bus.on('store', c => { if (document.body.dataset.view === 'library' && (c === 'items' || c === 'folders' || c === '*')) render(); });
  bus.on('lang', () => { folder = 'all'; render(); });
  bus.on('show', v => { if (v === 'library') render(); });
  render();
}
