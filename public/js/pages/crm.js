let clients = [
  { id:1, name:'Priya Shah', company:'Lumen Studio', value:'$3,200', stage:'leads', notes:'' },
  { id:2, name:'Marcus Webb', company:'Grovepoint', value:'$1,800', stage:'leads', notes:'' },
  { id:3, name:'Dana Osei (Reef Co.)', company:'Reef Co.', value:'$4,500', stage:'active', notes:'Reviewing phase 2 timeline.' },
  { id:4, name:'Alex Kim', company:'Northline', value:'$2,100', stage:'active', notes:'' },
  { id:5, name:'Jamie Ruiz', company:'Ruiz & Partners', value:'$5,000', stage:'active', notes:'' },
  { id:6, name:'Northline Team', company:'Northline Inc.', value:'$6,200', stage:'closed', notes:'Contract signed.' },
  { id:7, name:'Sana Malik', company:'Foundry Co.', value:'$1,950', stage:'closed', notes:'' },
];
let dragCardId = null;
let activeDetailId = null;

const board = document.getElementById('crmBoard');

function initials(name){ return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase(); }

function renderBoard(filter = ''){
  const q = filter.trim().toLowerCase();
  document.querySelectorAll('.crm-column-body').forEach(col => { col.innerHTML = ''; });

  ['leads','active','closed'].forEach(stage => {
    const list = clients.filter(c => c.stage === stage);
    const col = document.querySelector(`.crm-column-body[data-stage="${stage}"]`);
    const countEl = col.closest('.crm-column').querySelector('.crm-column-count');
    let visibleCount = 0;

    list.forEach(c => {
      const matches = !q || c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q);
      if (matches) visibleCount++;
      const card = document.createElement('div');
      card.className = 'crm-card' + (matches ? '' : ' hidden-card');
      card.draggable = true;
      card.dataset.id = c.id;
      card.innerHTML = `
        <div class="crm-card-top">
          <div class="crm-card-avatar">${initials(c.name)}</div>
          <div><div class="crm-card-name">${c.name}</div><div class="crm-card-company">${c.company}</div></div>
        </div>
        <div class="crm-card-bottom">
          <span class="crm-card-value">${c.value}</span>
          <span class="crm-card-tag">${stage}</span>
        </div>
      `;
      card.addEventListener('dragstart', () => { dragCardId = c.id; card.classList.add('dragging'); });
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
      card.addEventListener('click', () => openDetail(c.id));
      col.appendChild(card);
    });
    countEl.textContent = visibleCount;
  });
}

document.querySelectorAll('.crm-column-body').forEach(col => {
  col.addEventListener('dragover', (e) => { e.preventDefault(); col.classList.add('drag-over'); });
  col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
  col.addEventListener('drop', (e) => {
    e.preventDefault();
    col.classList.remove('drag-over');
    const client = clients.find(c => c.id === dragCardId);
    if (client){
      client.stage = col.dataset.stage;
      renderBoard(document.getElementById('topSearch').value);
      showToast(`Moved ${client.name} to ${col.dataset.stage}.`);
    }
  });
});

// ===== DETAIL MODAL =====
function openDetail(id){
  activeDetailId = id;
  const c = clients.find(cl => cl.id === id);
  document.getElementById('detailName').textContent = c.name;
  document.getElementById('detailCompany').textContent = c.company;
  document.getElementById('detailValue').value = c.value;
  document.getElementById('detailStage').value = c.stage;
  document.getElementById('detailNotes').value = c.notes;
  openModal(document.getElementById('detailModal'));
}
document.getElementById('saveClientBtn').addEventListener('click', () => {
  const c = clients.find(cl => cl.id === activeDetailId);
  c.value = document.getElementById('detailValue').value;
  c.stage = document.getElementById('detailStage').value;
  c.notes = document.getElementById('detailNotes').value;
  closeModal();
  renderBoard(document.getElementById('topSearch').value);
  showToast(`${c.name} updated.`);
});
document.getElementById('deleteClientBtn').addEventListener('click', () => {
  const c = clients.find(cl => cl.id === activeDetailId);
  clients = clients.filter(cl => cl.id !== activeDetailId);
  closeModal();
  renderBoard(document.getElementById('topSearch').value);
  showToast(`${c.name} removed.`);
});

// ===== ADD CLIENT MODAL =====
const addName = document.getElementById('addName');
const addClientBtn = document.getElementById('addClientBtn');
addName.addEventListener('input', () => addClientBtn.classList.toggle('is-disabled', addName.value.trim().length === 0));
addClientBtn.addEventListener('click', () => {
  if (addClientBtn.classList.contains('is-disabled')) return;
  const name = addName.value.trim();
  const company = document.getElementById('addCompany').value.trim() || '—';
  const value = document.getElementById('addValue').value.trim() || '$0';
  const stage = document.getElementById('addStage').value;
  const id = Math.max(...clients.map(c => c.id), 0) + 1;
  clients.unshift({ id, name, company, value, stage, notes: '' });
  ['addName','addCompany','addValue'].forEach(id => document.getElementById(id).value = '');
  addClientBtn.classList.add('is-disabled');
  closeModal();
  renderBoard(document.getElementById('topSearch').value);
  showToast(`${name} added to ${stage}.`);
});

document.getElementById('newBtn').addEventListener('click', () => openModal(document.getElementById('addClientModal')));

// ===== SEARCH =====
document.getElementById('topSearch').addEventListener('input', (e) => renderBoard(e.target.value));

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
  const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  if (e.key === 'Escape'){ closeModal(); closeAllDropdowns(); sidebar.classList.remove('open'); sidebarBackdrop.classList.remove('open'); return; }
  if (isTyping) return;
  if (e.key === '/'){ e.preventDefault(); document.getElementById('topSearch').focus(); }
  if (e.key.toLowerCase() === 'n'){ e.preventDefault(); openModal(document.getElementById('addClientModal')); }
});

// ===== ANIMATED STAT COUNTERS =====
function animateCount(el){
  const target = parseFloat(el.dataset.count);
  const decimals = Number(el.dataset.decimals || 0);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 900;
  const start = performance.now();
  function tick(now){
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = `${prefix}${(target * eased).toFixed(decimals)}${suffix}`;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
document.querySelectorAll('.stat-card-value[data-count]').forEach(animateCount);

// ===== AMBIENT + FADE-IN =====
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth * 100).toFixed(1);
  const y = (e.clientY / window.innerHeight * 100).toFixed(1);
  document.documentElement.style.setProperty('--mx', `${x}%`);
  document.documentElement.style.setProperty('--my', `${y}%`);
});
window.addEventListener('DOMContentLoaded', () => requestAnimationFrame(() => document.body.classList.add('loaded')));

// ===== INIT =====
renderBoard();