const icons = {
  team: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><circle cx="16" cy="9.5" r="2.4"/><path d="M3.5 20c0-3.6 2.9-6.2 6.5-6.2 1.6 0 3 .5 4.1 1.4"/><path d="M14 20c.3-2.6 2-4.4 5-4.4"/></svg>`,
  crm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16a1.5 1.5 0 011.5 1.5v8A1.5 1.5 0 0120 16h-9l-4.5 4v-4H4a1.5 1.5 0 01-1.5-1.5v-8A1.5 1.5 0 014 5z"/></svg>`,
  finances: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3V3z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>`,
  automations: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>`,
  files: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 012-2h4l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`,
  security: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>`
};

let notifications = [
  { id:1, category:'finances', text:'<strong>Invoice #0143</strong> is now overdue', when:new Date(2026,7,12,9,0), read:false },
  { id:2, category:'chat', text:'<strong>Dana Osei</strong> sent you a message', when:new Date(2026,7,12,9,45), read:false },
  { id:3, category:'crm', text:'<strong>Jamie Ruiz</strong> moved Northline to Active', when:new Date(2026,7,12,11,2), read:false },
  { id:4, category:'automations', text:'The <strong>"Weekly digest"</strong> automation ran successfully', when:new Date(2026,7,12,8,0), read:true },
  { id:5, category:'security', text:'New login from a device in Lagos, Nigeria', when:new Date(2026,7,11,20,15), read:false },
  { id:6, category:'team', text:'<strong>Alex Kim</strong>\'s role changed to Admin', when:new Date(2026,7,11,14,40), read:true },
  { id:7, category:'files', text:'<strong>Dana Osei</strong> shared "Brand Guidelines.pdf"', when:new Date(2026,7,11,10,15), read:true },
  { id:8, category:'finances', text:'<strong>Invoice #0141</strong> was paid', when:new Date(2026,7,10,12,0), read:true },
  { id:9, category:'crm', text:'<strong>Jamie Ruiz</strong> added a new client: Priya Shah', when:new Date(2026,7,10,9,30), read:true },
  { id:10, category:'team', text:'<strong>Alex Kim</strong> invited jamie@northsidestudio.com', when:new Date(2026,7,9,16,5), read:true },
];

let statusFilter = 'all';

function dayLabel(date){
  const today = new Date(2026,7,12);
  const diffDays = Math.round((new Date(today.getFullYear(),today.getMonth(),today.getDate()) - new Date(date.getFullYear(),date.getMonth(),date.getDate())) / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return date.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
}
function timeLabel(date){ return date.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' }); }

function updateUnreadBadge(){
  const count = notifications.filter(n => !n.read).length;
  document.getElementById('unreadBadge').textContent = count;
}

function renderFeed(){
  const q = document.getElementById('topSearch').value.trim().toLowerCase();
  const categoryFilter = document.getElementById('categoryFilter').value;
  const container = document.getElementById('feedContainer');
  container.innerHTML = '';

  const sorted = [...notifications].sort((a,b) => b.when - a.when);
  const groups = [];
  sorted.forEach(item => {
    const label = dayLabel(item.when);
    let group = groups.find(g => g.label === label);
    if (!group){ group = { label, items: [] }; groups.push(group); }
    group.items.push(item);
  });

  let anyVisible = false;
  groups.forEach(group => {
    const visible = group.items.filter(item =>
      (statusFilter === 'all' || !item.read) &&
      (categoryFilter === 'all' || item.category === categoryFilter) &&
      (!q || item.text.toLowerCase().includes(q))
    );
    if (!visible.length) return;
    anyVisible = true;

    const groupEl = document.createElement('div');
    groupEl.className = 'day-group';
    groupEl.innerHTML = `<div class="day-heading">${group.label}</div>`;
    const panel = document.createElement('div');
    panel.className = 'notif-panel';
    visible.forEach(item => {
      const row = document.createElement('div');
      row.className = 'notif-row' + (item.read ? '' : ' unread');
      row.innerHTML = `
        ${!item.read ? '<span class="notif-unread-dot"></span>' : ''}
        <div class="notif-icon ${item.category}">${icons[item.category]}</div>
        <div class="notif-body"><div class="notif-text">${item.text}</div><div class="notif-time">${timeLabel(item.when)}</div></div>
        <button class="notif-dismiss" data-id="${item.id}" aria-label="Dismiss"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
      `;
      row.addEventListener('click', (e) => {
        if (e.target.closest('.notif-dismiss')) return;
        item.read = true;
        renderFeed();
        showToast('Opening…');
      });
      row.querySelector('.notif-dismiss').addEventListener('click', (e) => {
        e.stopPropagation();
        notifications = notifications.filter(n => n.id !== item.id);
        renderFeed();
        showToast('Notification dismissed.');
      });
      panel.appendChild(row);
    });
    groupEl.appendChild(panel);
    container.appendChild(groupEl);
  });

  if (!anyVisible){
    container.innerHTML = '<p class="notif-empty">Nothing here. You\'re all caught up.</p>';
  }

  updateUnreadBadge();
}

document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    statusFilter = chip.dataset.filter;
    renderFeed();
  });
});
document.getElementById('categoryFilter').addEventListener('change', renderFeed);
document.getElementById('topSearch').addEventListener('input', renderFeed);

document.getElementById('markAllBtn').addEventListener('click', () => {
  notifications.forEach(n => n.read = true);
  renderFeed();
  showToast('All notifications marked as read.');
});

// ===== PREFERENCES MODAL =====
const modalBackdrop = document.getElementById('modalBackdrop');
const prefsModal = document.getElementById('prefsModal');
document.getElementById('prefsBtn').addEventListener('click', () => { prefsModal.classList.add('open'); modalBackdrop.classList.add('open'); });
modalBackdrop.addEventListener('click', closeModal);
document.querySelector('.modal-close').addEventListener('click', closeModal);
function closeModal(){ prefsModal.classList.remove('open'); modalBackdrop.classList.remove('open'); }
document.querySelectorAll('#prefsModal .switch').forEach(sw => sw.addEventListener('click', () => {
  const on = sw.classList.toggle('on'); sw.setAttribute('aria-checked', String(on));
}));

// ===== SIDEBAR OVERLAY =====
const sidebar = document.getElementById('sidebar');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');
document.getElementById('hamburgerBtn').addEventListener('click', () => { sidebar.classList.add('open'); sidebarBackdrop.classList.add('open'); });
document.getElementById('sidebarClose').addEventListener('click', () => { sidebar.classList.remove('open'); sidebarBackdrop.classList.remove('open'); });
sidebarBackdrop.addEventListener('click', () => { sidebar.classList.remove('open'); sidebarBackdrop.classList.remove('open'); });

// ===== USER DROPDOWN =====
const userPanel = document.getElementById('userPanel');
document.getElementById('userBtn').addEventListener('click', (e) => { e.stopPropagation(); userPanel.classList.toggle('open'); });
document.addEventListener('click', () => userPanel.classList.remove('open'));

// ===== TOAST =====
function showToast(message){
  const stack = document.getElementById('toastStack');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  stack.appendChild(toast);
  setTimeout(() => { toast.classList.add('leaving'); setTimeout(() => toast.remove(), 300); }, 2200);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  const tag = document.activeElement.tagName;
  const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  if (e.key === 'Escape'){ closeModal(); userPanel.classList.remove('open'); sidebar.classList.remove('open'); sidebarBackdrop.classList.remove('open'); return; }
  if (isTyping) return;
  if (e.key === '/'){ e.preventDefault(); document.getElementById('topSearch').focus(); }
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
renderFeed();