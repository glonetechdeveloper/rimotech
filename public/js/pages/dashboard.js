// ===================================================
// DASHBOARD PAGE
// Sidebar overlay for mobile, generic modal system,
// dropdowns, animated counters, keyboard shortcuts.
// ===================================================

const icons = {
  clients: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16a1.5 1.5 0 011.5 1.5v8A1.5 1.5 0 0120 16h-9l-4.5 4v-4H4a1.5 1.5 0 01-1.5-1.5v-8A1.5 1.5 0 014 5z"/></svg>`,
  revenue: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 6h6v6"/></svg>`,
  team: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><circle cx="16" cy="9.5" r="2.4"/><path d="M3.5 20c0-3.6 2.9-6.2 6.5-6.2 1.6 0 3 .5 4.1 1.4"/><path d="M14 20c.3-2.6 2-4.4 5-4.4"/></svg>`,
  insights: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.5l2.3 2.3 4.7-5.4"/></svg>`,
  invoices: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3V3z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>`,
  task: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12l2.5 2.5L16 9"/></svg>`,
  automation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>`
};
document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icons[el.dataset.icon] || ''; });

// ===== TIME-OF-DAY GREETING =====
const welcomeTitle = document.getElementById('welcomeTitle');
const hour = new Date().getHours();
const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
welcomeTitle.textContent = `${greeting}, Northside Studio 👋`;

// ===== MOBILE SIDEBAR OVERLAY =====
const sidebar = document.getElementById('sidebar');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebarClose = document.getElementById('sidebarClose');

function openSidebar(){ sidebar.classList.add('open'); sidebarBackdrop.classList.add('open'); }
function closeSidebar(){ sidebar.classList.remove('open'); sidebarBackdrop.classList.remove('open'); }
hamburgerBtn.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
sidebarBackdrop.addEventListener('click', closeSidebar);

// ===== DROPDOWNS (notifications + user menu) =====
function setupDropdown(btnId, panelId){
  const btn = document.getElementById(btnId);
  const panel = document.getElementById(panelId);
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = panel.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) panel.classList.add('open');
  });
  return panel;
}
const notifPanel = setupDropdown('notifBtn', 'notifPanel');
const userPanel = setupDropdown('userBtn', 'userPanel');
function closeAllDropdowns(){ notifPanel.classList.remove('open'); userPanel.classList.remove('open'); }
document.addEventListener('click', closeAllDropdowns);

// ===== TRIAL BANNER =====
document.getElementById('trialDismiss').addEventListener('click', () => {
  document.getElementById('trialBanner').classList.add('dismissed');
});

// ===== GENERIC MODAL SYSTEM =====
const modalBackdrop = document.getElementById('modalBackdrop');
let currentModal = null;

function openModal(modal){
  currentModal = modal;
  modal.classList.add('open');
  modalBackdrop.classList.add('open');
  closeAllDropdowns();
}
function closeModal(){
  if (currentModal) currentModal.classList.remove('open');
  modalBackdrop.classList.remove('open');
  currentModal = null;
}
modalBackdrop.addEventListener('click', closeModal);
document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', closeModal));

document.getElementById('newBtn').addEventListener('click', () => openModal(document.getElementById('newModal')));
document.getElementById('customizeBtn').addEventListener('click', () => openModal(document.getElementById('customizeModal')));
document.getElementById('viewAllBtn').addEventListener('click', () => openModal(document.getElementById('activityModal')));
document.getElementById('upgradeBtn').addEventListener('click', () => openModal(document.getElementById('upgradeModal')));
document.getElementById('profileMenuBtn').addEventListener('click', () => openModal(document.getElementById('profileModal')));
document.getElementById('settingsMenuBtn').addEventListener('click', () => openModal(document.getElementById('settingsModal')));

// ===== NEW-ITEM OPTIONS =====
document.querySelectorAll('.modal-option').forEach(opt => {
  opt.addEventListener('click', () => {
    const item = opt.dataset.item;
    closeModal();
    showToast(`New ${item.toLowerCase()} created.`);
  });
});

// ===== CUSTOMIZE: TOGGLE SWITCHES CONTROL MODULE VISIBILITY =====
document.querySelectorAll('#customizeModal .switch').forEach(sw => {
  sw.addEventListener('click', () => {
    const isOn = sw.classList.toggle('on');
    sw.setAttribute('aria-checked', String(isOn));
  });
});
document.getElementById('saveCustomize').addEventListener('click', () => {
  document.querySelectorAll('#customizeList .customize-row').forEach(row => {
    const key = row.dataset.target;
    const on = row.querySelector('.switch').classList.contains('on');
    const moduleEl = document.querySelector(`.module[data-module="${key}"]`);
    if (moduleEl) moduleEl.classList.toggle('hidden-module', !on);
  });
  closeModal();
  showToast('Workspace updated.');
});

// ===== SETTINGS QUICK TOGGLES =====
document.querySelectorAll('#settingsModal .switch').forEach(sw => {
  sw.addEventListener('click', () => {
    const isOn = sw.classList.toggle('on');
    sw.setAttribute('aria-checked', String(isOn));
  });
});

document.getElementById('saveProfile').addEventListener('click', () => {
  closeModal();
  showToast('Profile updated.');
});
document.getElementById('confirmUpgrade').addEventListener('click', () => {
  closeModal();
  showToast('Upgraded to Pro.');
});

// ===== TOAST =====
function showToast(message){
  const stack = document.getElementById('toastStack');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg><span>${message}</span>`;
  stack.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('leaving');
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  const tag = document.activeElement.tagName;
  const isTyping = tag === 'INPUT' || tag === 'TEXTAREA';

  if (e.key === 'Escape'){
    closeModal(); closeAllDropdowns(); closeSidebar();
    return;
  }
  if (isTyping) return;

  if (e.key === '/'){
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
  if (e.key.toLowerCase() === 'n'){
    e.preventDefault();
    openModal(document.getElementById('newModal'));
  }
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
    const value = target * eased;
    el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
document.querySelectorAll('.stat-card-value[data-count]').forEach(animateCount);

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting){ entry.target.classList.add('in-view'); observer.unobserve(entry.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ===== AMBIENT REACTIVE GLOW =====
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth * 100).toFixed(1);
  const y = (e.clientY / window.innerHeight * 100).toFixed(1);
  document.documentElement.style.setProperty('--mx', `${x}%`);
  document.documentElement.style.setProperty('--my', `${y}%`);
});

// ===== PAGE FADE-IN =====
window.addEventListener('DOMContentLoaded', () => requestAnimationFrame(() => document.body.classList.add('loaded')));




