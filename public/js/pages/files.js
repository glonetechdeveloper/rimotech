// ===== ICONS =====
const icons = {
  folder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 012-2h4l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>`,
  pdf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15H6z"/><path d="M9 12h1.5a1.5 1.5 0 000-3H9v6M14 9v6M14 12h1.5M18 9v6"/></svg>`,
  doc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15H6z"/><path d="M9 12h6M9 15h6M9 9h3"/></svg>`,
  sheet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15H6z"/><path d="M9 10h6M9 14h6M9 18h6M12 10v8"/></svg>`,
  image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M20 15l-4.5-4.5L8 18"/></svg>`,
  zip: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15H6z"/><path d="M11 3v3h2M11 8h2M11 11h2M11 14h2"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15H6z"/></svg>`,
  more: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>`
};

const EXT_MAP = {
  pdf:'pdf', doc:'doc', docx:'doc', txt:'doc', rtf:'doc',
  xls:'sheet', xlsx:'sheet', csv:'sheet',
  png:'image', jpg:'image', jpeg:'image', gif:'image', svg:'image', webp:'image',
  zip:'zip', rar:'zip', '7z':'zip',
};
function typeFromName(name){
  const ext = name.split('.').pop().toLowerCase();
  return EXT_MAP[ext] || 'file';
}
function iconGroup(kind){
  return ['pdf','doc','sheet','zip','file'].includes(kind) ? 'doc' : 'folder';
}

// ===== DATA =====
let items = [
  { id:1, type:'folder', name:'Contracts', parentId:null, modified:'Jun 30', owner:'Joseph Prince' },
  { id:2, type:'folder', name:'Brand Assets', parentId:null, modified:'Jun 02', owner:'Jamie Ruiz' },
  { id:3, type:'folder', name:'Client Files', parentId:null, modified:'Jul 22', owner:'Alex Kim' },
  { id:4, type:'file', kind:'sheet', name:'Q2 Revenue Report.xlsx', size:842000, parentId:null, modified:'Jul 20', owner:'Joseph Prince' },
  { id:5, type:'file', kind:'doc', name:'Proposal Template.docx', size:210000, parentId:null, modified:'Jul 12', owner:'Alex Kim' },
  { id:6, type:'file', kind:'pdf', name:'Northside Studio - MSA.pdf', size:1240000, parentId:1, modified:'Jun 30', owner:'Joseph Prince' },
  { id:7, type:'file', kind:'pdf', name:'Reef Co. - NDA.pdf', size:512000, parentId:1, modified:'Jul 05', owner:'Dana Osei' },
  { id:8, type:'file', kind:'zip', name:'Logo Files.zip', size:3400000, parentId:2, modified:'May 18', owner:'Jamie Ruiz' },
  { id:9, type:'file', kind:'image', name:'headshot-joseph.jpg', size:980000, parentId:2, modified:'Jun 02', owner:'Joseph Prince' },
  { id:10, type:'folder', name:'Reef Co.', parentId:3, modified:'Jul 01', owner:'Dana Osei' },
  { id:11, type:'file', kind:'doc', name:'Onboarding Notes.docx', size:88000, parentId:3, modified:'Jul 22', owner:'Alex Kim' },
  { id:12, type:'file', kind:'pdf', name:'Brand Guidelines.pdf', size:2100000, parentId:10, modified:'Jul 01', owner:'Dana Osei' },
];
let currentFolder = null; // null = root
let currentView = 'list';
let typeFilter = 'all';
let activeItemId = null;

function formatBytes(bytes){
  if (!bytes) return '—';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024*1024) return (bytes/1024).toFixed(0) + ' KB';
  return (bytes/(1024*1024)).toFixed(1) + ' MB';
}

function breadcrumbTrail(){
  const trail = [];
  let id = currentFolder;
  while (id !== null){
    const folder = items.find(i => i.id === id);
    if (!folder) break;
    trail.unshift(folder);
    id = folder.parentId;
  }
  return trail;
}

function renderBreadcrumb(){
  const bc = document.getElementById('breadcrumb');
  const trail = breadcrumbTrail();
  let html = `<button class="${currentFolder === null ? 'current' : ''}" data-nav="root">Home</button>`;
  trail.forEach((f, i) => {
    html += `<span class="breadcrumb-sep">/</span><button class="${i === trail.length-1 ? 'current' : ''}" data-nav="${f.id}">${f.name}</button>`;
  });
  bc.innerHTML = html;
  bc.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFolder = btn.dataset.nav === 'root' ? null : Number(btn.dataset.nav);
      render();
    });
  });
}

function currentChildren(){
  return items.filter(i => i.parentId === currentFolder);
}

function matchesFilter(item){
  if (typeFilter === 'all') return true;
  if (typeFilter === 'folder') return item.type === 'folder';
  return item.type === 'file' && item.kind === typeFilter;
}

function render(){
  renderBreadcrumb();
  renderStats();
  const q = document.getElementById('topSearch').value.trim().toLowerCase();
  const children = currentChildren();
  const panel = document.getElementById('filesPanel');
  const grid = document.getElementById('filesGrid');
  panel.innerHTML = '';
  grid.innerHTML = '';

  if (!children.length){
    panel.innerHTML = '<p class="files-empty">This folder is empty.</p>';
  }

  children.forEach(item => {
    const matches = matchesFilter(item) && (!q || item.name.toLowerCase().includes(q));
    const kind = item.type === 'folder' ? 'folder' : item.kind;
    const iconHtml = icons[item.type === 'folder' ? 'folder' : kind] || icons.file;
    const groupClass = item.type === 'folder' ? 'folder' : 'doc';

    // list row
    const row = document.createElement('div');
    row.className = 'file-row' + (matches ? '' : ' hidden-row');
    row.innerHTML = `
      <div class="file-icon ${groupClass}">${iconHtml}</div>
      <div class="file-name">${item.name}</div>
      <div class="file-size">${item.type === 'folder' ? '—' : formatBytes(item.size)}</div>
      <div class="file-modified">${item.modified}</div>
      <div class="file-owner">${item.owner}</div>
      <button class="icon-btn file-more" data-id="${item.id}" aria-label="More">${icons.more}</button>
    `;
    row.addEventListener('click', (e) => {
      if (e.target.closest('.file-more')) return;
      if (item.type === 'folder'){ currentFolder = item.id; render(); }
      else openDetail(item.id);
    });
    row.querySelector('.file-more').addEventListener('click', (e) => { e.stopPropagation(); openItemMenu(item.id, e.currentTarget); });
    panel.appendChild(row);

    // grid card
    const card = document.createElement('div');
    card.className = 'file-card' + (matches ? '' : ' hidden-row');
    card.innerHTML = `
      <div class="file-icon ${groupClass}">${iconHtml}</div>
      <div class="file-name">${item.name}</div>
      <div class="file-size">${item.type === 'folder' ? '' : formatBytes(item.size)}</div>
    `;
    card.addEventListener('click', () => {
      if (item.type === 'folder'){ currentFolder = item.id; render(); }
      else openDetail(item.id);
    });
    grid.appendChild(card);
  });
}

function renderStats(){
  const files = items.filter(i => i.type === 'file');
  const folders = items.filter(i => i.type === 'folder');
  const totalSize = files.reduce((sum, f) => sum + (f.size || 0), 0);
  document.getElementById('statFiles').textContent = files.length;
  document.getElementById('statStorage').textContent = formatBytes(totalSize);
  document.getElementById('statFolders').textContent = folders.length;
  document.getElementById('statRecent').textContent = Math.min(files.length, 4);
}

// ===== ITEM CONTEXT MENU (rename/delete) =====
let itemMenuPanel = null;
function openItemMenu(id, anchor){
  closeItemMenu();
  activeItemId = id;
  const item = items.find(i => i.id === id);
  const panel = document.createElement('div');
  panel.className = 'dropdown-panel small open';
  panel.style.position = 'fixed';
  const rect = anchor.getBoundingClientRect();
  panel.style.top = (rect.bottom + 6) + 'px';
  panel.style.right = (window.innerWidth - rect.right) + 'px';
  panel.innerHTML = `
    <button class="dropdown-item" id="ctxRename">Rename</button>
    <button class="dropdown-item danger" id="ctxDelete">Delete</button>
  `;
  document.body.appendChild(panel);
  itemMenuPanel = panel;
  panel.querySelector('#ctxRename').addEventListener('click', (e) => { e.stopPropagation(); closeItemMenu(); openRename(item.id); });
  panel.querySelector('#ctxDelete').addEventListener('click', (e) => { e.stopPropagation(); closeItemMenu(); deleteItem(item.id); });
  setTimeout(() => document.addEventListener('click', closeItemMenu, { once: true }), 0);
}
function closeItemMenu(){ if (itemMenuPanel){ itemMenuPanel.remove(); itemMenuPanel = null; } }

function deleteItem(id){
  const item = items.find(i => i.id === id);
  const toDelete = new Set([id]);
  let changed = true;
  while (changed){
    changed = false;
    items.forEach(i => { if (toDelete.has(i.parentId) && !toDelete.has(i.id)){ toDelete.add(i.id); changed = true; } });
  }
  items = items.filter(i => !toDelete.has(i.id));
  render();
  showToast(`${item.name} deleted.`);
}

function openRename(id){
  activeItemId = id;
  const item = items.find(i => i.id === id);
  document.getElementById('renameInput').value = item.name;
  openModal(document.getElementById('renameModal'));
}
document.getElementById('saveRenameBtn').addEventListener('click', () => {
  const item = items.find(i => i.id === activeItemId);
  const val = document.getElementById('renameInput').value.trim();
  if (val) item.name = val;
  closeModal();
  render();
  showToast('Renamed successfully.');
});

// ===== DETAIL MODAL =====
function openDetail(id){
  activeItemId = id;
  const item = items.find(i => i.id === id);
  document.getElementById('detailName').textContent = item.name;
  document.getElementById('detailMeta').innerHTML = `
    <div class="detail-row"><span class="detail-row-label">Size</span><span class="detail-row-value">${formatBytes(item.size)}</span></div>
    <div class="detail-row"><span class="detail-row-label">Modified</span><span class="detail-row-value">${item.modified}</span></div>
    <div class="detail-row"><span class="detail-row-label">Owner</span><span class="detail-row-value">${item.owner}</span></div>
  `;
  openModal(document.getElementById('detailModal'));
}
document.getElementById('deleteFileBtn').addEventListener('click', () => { closeModal(); deleteItem(activeItemId); });
document.getElementById('renameFileBtn').addEventListener('click', () => { closeModal(); openRename(activeItemId); });
document.getElementById('downloadFileBtn').addEventListener('click', () => {
  const item = items.find(i => i.id === activeItemId);
  showToast(`Downloading ${item.name}…`);
});

// ===== UPLOAD (real File API) =====
const fileInput = document.getElementById('fileInput');
function handleFiles(fileList){
  const list = Array.from(fileList);
  if (!list.length) return;
  list.forEach(f => {
    const id = Math.max(...items.map(i => i.id), 0) + 1;
    items.push({
      id, type:'file', kind: typeFromName(f.name), name: f.name, size: f.size,
      parentId: currentFolder, modified:'Just now', owner:'Joseph Prince'
    });
  });
  render();
  showToast(`${list.length} file${list.length > 1 ? 's' : ''} uploaded.`);
}
fileInput.addEventListener('change', () => handleFiles(fileInput.files));
document.getElementById('dropBrowseBtn').addEventListener('click', () => fileInput.click());
document.getElementById('uploadOption').addEventListener('click', () => { closeModal(); fileInput.click(); });

const dropZone = document.getElementById('dropZone');
dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  handleFiles(e.dataTransfer.files);
});

// ===== NEW FOLDER =====
document.getElementById('folderOption').addEventListener('click', () => {
  closeModal();
  document.getElementById('newFolderName').value = '';
  document.getElementById('createFolderBtn').classList.add('is-disabled');
  openModal(document.getElementById('folderModal'));
});
const newFolderName = document.getElementById('newFolderName');
const createFolderBtn = document.getElementById('createFolderBtn');
newFolderName.addEventListener('input', () => createFolderBtn.classList.toggle('is-disabled', newFolderName.value.trim().length === 0));
createFolderBtn.addEventListener('click', () => {
  if (createFolderBtn.classList.contains('is-disabled')) return;
  const name = newFolderName.value.trim();
  const id = Math.max(...items.map(i => i.id), 0) + 1;
  items.push({ id, type:'folder', name, parentId: currentFolder, modified:'Just now', owner:'Joseph Prince' });
  closeModal();
  render();
  showToast(`Folder "${name}" created.`);
});

document.getElementById('newBtn').addEventListener('click', () => openModal(document.getElementById('newModal')));

// ===== VIEW TOGGLE =====
document.getElementById('listViewBtn').addEventListener('click', () => {
  currentView = 'list';
  document.getElementById('listViewBtn').classList.add('active');
  document.getElementById('gridViewBtn').classList.remove('active');
  document.getElementById('filesPanel').classList.remove('hidden');
  document.getElementById('filesGrid').classList.add('hidden');
});
document.getElementById('gridViewBtn').addEventListener('click', () => {
  currentView = 'grid';
  document.getElementById('gridViewBtn').classList.add('active');
  document.getElementById('listViewBtn').classList.remove('active');
  document.getElementById('filesGrid').classList.remove('hidden');
  document.getElementById('filesPanel').classList.add('hidden');
});

// ===== TYPE FILTER =====
document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    typeFilter = chip.dataset.filter;
    render();
  });
});

document.getElementById('topSearch').addEventListener('input', render);

// ===== SIDEBAR OVERLAY =====
const sidebar = document.getElementById('sidebar');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');
document.getElementById('hamburgerBtn').addEventListener('click', () => { sidebar.classList.add('open'); sidebarBackdrop.classList.add('open'); });
document.getElementById('sidebarClose').addEventListener('click', () => { sidebar.classList.remove('open'); sidebarBackdrop.classList.remove('open'); });
sidebarBackdrop.addEventListener('click', () => { sidebar.classList.remove('open'); sidebarBackdrop.classList.remove('open'); });

// ===== DROPDOWNS =====
function setupDropdown(btnId, panelId){
  const btn = document.getElementById(btnId), panel = document.getElementById(panelId);
  btn.addEventListener('click', (e) => { e.stopPropagation(); const isOpen = panel.classList.contains('open'); closeAllDropdowns(); if (!isOpen) panel.classList.add('open'); });
  return panel;
}
const notifPanel = setupDropdown('notifBtn', 'notifPanel');
const userPanel = setupDropdown('userBtn', 'userPanel');
function closeAllDropdowns(){ notifPanel.classList.remove('open'); userPanel.classList.remove('open'); }
document.addEventListener('click', closeAllDropdowns);

// ===== MODALS =====
const modalBackdrop = document.getElementById('modalBackdrop');
let currentModal = null;
function openModal(modal){ currentModal = modal; modal.classList.add('open'); modalBackdrop.classList.add('open'); closeAllDropdowns(); }
function closeModal(){ if (currentModal) currentModal.classList.remove('open'); modalBackdrop.classList.remove('open'); currentModal = null; }
modalBackdrop.addEventListener('click', closeModal);
document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', closeModal));

document.getElementById('profileMenuBtn').addEventListener('click', () => openModal(document.getElementById('profileModal')));
document.getElementById('settingsMenuBtn').addEventListener('click', () => openModal(document.getElementById('settingsModal')));
document.getElementById('saveProfile').addEventListener('click', () => { closeModal(); showToast('Profile updated.'); });

// ===== TOAST =====
function showToast(message){
  const stack = document.getElementById('toastStack');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg><span>${message}</span>`;
  stack.appendChild(toast);
  setTimeout(() => { toast.classList.add('leaving'); setTimeout(() => toast.remove(), 300); }, 2600);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  const tag = document.activeElement.tagName;
  const isTyping = tag === 'INPUT' || tag === 'TEXTAREA';
  if (e.key === 'Escape'){ closeModal(); closeAllDropdowns(); closeItemMenu(); sidebar.classList.remove('open'); sidebarBackdrop.classList.remove('open'); return; }
  if (isTyping) return;
  if (e.key === '/'){ e.preventDefault(); document.getElementById('topSearch').focus(); }
  if (e.key.toLowerCase() === 'n'){ e.preventDefault(); openModal(document.getElementById('newModal')); }
});

// ===== AMBIENT + FADE-IN =====
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth * 100).toFixed(1);
  const y = (e.clientY / window.innerHeight * 100).toFixed(1);
  document.documentElement.style.setProperty('--mx', `${x}%`);
  document.documentElement.style.setProperty('--my', `${y}%`);
});
window.addEventListener('DOMContentLoaded', () => requestAnimationFrame(() => document.body.classList.add('loaded')));

// ===== INIT =====
render();