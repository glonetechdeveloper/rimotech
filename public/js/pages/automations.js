let automations = [
  { id:1, name:'Invoice reminder', trigger:'Invoice overdue by 3 days', action:'Send email reminder', active:true, lastRun:'2h ago' },
  { id:2, name:'Welcome new clients', trigger:'New client added', action:'Send welcome email', active:true, lastRun:'1d ago' },
  { id:3, name:'Weekly digest', trigger:'Every Monday 9am', action:'Send revenue summary', active:true, lastRun:'3d ago' },
  { id:4, name:'Payment received', trigger:'Invoice marked paid', action:'Send thank-you note', active:false, lastRun:'Never' },
  { id:5, name:'Task follow-up', trigger:'Task overdue by 1 day', action:'Notify assignee', active:true, lastRun:'5h ago' },
];
let activeAutomationId = null;
let statusFilter = 'all';

const icons = {
  gear: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>`
};

function renderAutomations(search = ''){
  const q = search.trim().toLowerCase();
  const panel = document.getElementById('automationsPanel');
  panel.innerHTML = '';

  const counts = { all: automations.length, active: 0, paused: 0 };
  automations.forEach(a => counts[a.active ? 'active' : 'paused']++);
  document.getElementById('countAll').textContent = counts.all;
  document.getElementById('countActive').textContent = counts.active;
  document.getElementById('countPaused').textContent = counts.paused;

  automations.forEach(a => {
    const matchesSearch = !q || a.name.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' ? a.active : !a.active);
    const matches = matchesSearch && matchesStatus;
    const row = document.createElement('div');
    row.className = 'automation-row' + (matches ? '' : ' hidden-row');
    row.innerHTML = `
      <div class="automation-icon">${icons.gear}</div>
      <div class="automation-meta">
        <div class="automation-name">${a.name}</div>
        <div class="automation-flow">${a.trigger} → ${a.action}</div>
      </div>
      <div class="automation-lastrun">${a.lastRun}</div>
      <button class="switch ${a.active ? 'on' : ''}" role="switch" aria-checked="${a.active}" data-id="${a.id}"></button>
      <div class="automation-actions"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--ink-faint);"><path d="M9 18l6-6-6-6"/></svg></div>
    `;
    row.querySelector('.switch').addEventListener('click', (e) => {
      e.stopPropagation();
      a.active = !a.active;
      renderAutomations(document.getElementById('topSearch').value);
      showToast(`${a.name} ${a.active ? 'activated' : 'paused'}.`);
    });
    row.addEventListener('click', () => openDetail(a.id));
    panel.appendChild(row);
  });
}

function openDetail(id){
  activeAutomationId = id;
  const a = automations.find(x => x.id === id);
  document.getElementById('detailName').textContent = a.name;
  document.getElementById('detailFlow').textContent = `${a.trigger} → ${a.action}`;
  const sw = document.getElementById('detailSwitch');
  sw.classList.toggle('on', a.active);
  sw.setAttribute('aria-checked', String(a.active));
  openModal(document.getElementById('detailModal'));
}
document.getElementById('detailSwitch').addEventListener('click', () => {
  const sw = document.getElementById('detailSwitch');
  const on = sw.classList.toggle('on');
  sw.setAttribute('aria-checked', String(on));
});
document.getElementById('saveAutomationBtn').addEventListener('click', () => {
  const a = automations.find(x => x.id === activeAutomationId);
  a.active = document.getElementById('detailSwitch').classList.contains('on');
  closeModal();
  renderAutomations(document.getElementById('topSearch').value);
  showToast(`${a.name} updated.`);
});
document.getElementById('deleteAutomationBtn').addEventListener('click', () => {
  const a = automations.find(x => x.id === activeAutomationId);
  automations = automations.filter(x => x.id !== activeAutomationId);
  closeModal();
  renderAutomations(document.getElementById('topSearch').value);
  showToast(`${a.name} deleted.`);
});

document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    statusFilter = chip.dataset.filter;
    renderAutomations(document.getElementById('topSearch').value);
  });
});

const autoName = document.getElementById('autoName');
const createAutomationBtn = document.getElementById('createAutomationBtn');
autoName.addEventListener('input', () => createAutomationBtn.classList.toggle('is-disabled', autoName.value.trim().length === 0));
createAutomationBtn.addEventListener('click', () => {
  if (createAutomationBtn.classList.contains('is-disabled')) return;
  const name = autoName.value.trim();
  const trigger = document.getElementById('autoTrigger').value;
  const action = document.getElementById('autoAction').value;
  const id = Math.max(...automations.map(a => a.id), 0) + 1;
  automations.unshift({ id, name, trigger, action, active: true, lastRun: 'Never' });
  autoName.value = '';
  createAutomationBtn.classList.add('is-disabled');
  closeModal();
  renderAutomations(document.getElementById('topSearch').value);
  showToast(`${name} created.`);
});

document.getElementById('newBtn').addEventListener('click', () => openModal(document.getElementById('newAutomationModal')));
document.getElementById('topSearch').addEventListener('input', (e) => renderAutomations(e.target.value));

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
document.querySelectorAll('#settingsModal .switch').forEach(sw => sw.addEventListener('click', () => {
  const on = sw.classList.toggle('on'); sw.setAttribute('aria-checked', String(on));
}));

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
  if (e.key.toLowerCase() === 'n'){ e.preventDefault(); openModal(document.getElementById('newAutomationModal')); }
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
renderAutomations();