const icons = {
  team: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><circle cx="16" cy="9.5" r="2.4"/><path d="M3.5 20c0-3.6 2.9-6.2 6.5-6.2 1.6 0 3 .5 4.1 1.4"/><path d="M14 20c.3-2.6 2-4.4 5-4.4"/></svg>`,
  crm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16a1.5 1.5 0 011.5 1.5v8A1.5 1.5 0 0120 16h-9l-4.5 4v-4H4a1.5 1.5 0 01-1.5-1.5v-8A1.5 1.5 0 014 5z"/></svg>`,
  finances: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3V3z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>`,
  automations: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>`,
  files: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 012-2h4l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>`
};

const NAMES = { JP:'Joseph Prince', AK:'Alex Kim', JM:'Jamie Ruiz', DA:'Dana Osei' };

const activity = [
  { id:1, actor:'JP', category:'settings', text:'<strong>Joseph Prince</strong> logged in from a new device', when:new Date(2026,7,12,9,10) },
  { id:2, actor:'AK', category:'finances', text:'<strong>Alex Kim</strong> sent invoice #0143 to Dana Osei', when:new Date(2026,7,12,9,45) },
  { id:3, actor:'JM', category:'crm', text:'<strong>Jamie Ruiz</strong> moved Northline to Active', when:new Date(2026,7,12,11,2) },
  { id:4, actor:'JP', category:'automations', text:'<strong>Joseph Prince</strong> paused the "Payment received" automation', when:new Date(2026,7,12,13,20) },
  { id:5, actor:'DA', category:'files', text:'<strong>Dana Osei</strong> uploaded Brand Guidelines.pdf', when:new Date(2026,7,11,10,15) },
  { id:6, actor:'JP', category:'settings', text:'<strong>Alex Kim</strong>\'s role changed to Admin by Joseph Prince', when:new Date(2026,7,11,14,40) },
  { id:7, actor:'AK', category:'team', text:'<strong>Alex Kim</strong> invited jamie@northsidestudio.com', when:new Date(2026,7,11,16,5) },
  { id:8, actor:'JM', category:'crm', text:'<strong>Jamie Ruiz</strong> added a new client: Priya Shah', when:new Date(2026,7,10,9,30) },
  { id:9, actor:'DA', category:'finances', text:'<strong>Dana Osei</strong> marked invoice #0141 as paid', when:new Date(2026,7,10,12,0) },
  { id:10, actor:'JP', category:'automations', text:'<strong>Joseph Prince</strong> created the "Weekly digest" automation', when:new Date(2026,7,9,8,50) },
  { id:11, actor:'AK', category:'files', text:'<strong>Alex Kim</strong> renamed a folder to "Client Files"', when:new Date(2026,7,9,15,10) },
  { id:12, actor:'JP', category:'settings', text:'<strong>Joseph Prince</strong> updated the workspace time zone', when:new Date(2026,7,8,10,0) },
];

let categoryFilter = 'all';

function dayLabel(date){
  const today = new Date(2026,7,12);
  const diffDays = Math.round((new Date(today.getFullYear(),today.getMonth(),today.getDate()) - new Date(date.getFullYear(),date.getMonth(),date.getDate())) / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return date.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
}
function timeLabel(date){
  return date.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
}

function renderFeed(){
  const q = document.getElementById('topSearch').value.trim().toLowerCase();
  const memberFilter = document.getElementById('memberFilter').value;
  const container = document.getElementById('feedContainer');
  container.innerHTML = '';

  const sorted = [...activity].sort((a,b) => b.when - a.when);
  const groups = [];
  sorted.forEach(item => {
    const label = dayLabel(item.when);
    let group = groups.find(g => g.label === label);
    if (!group){ group = { label, items: [] }; groups.push(group); }
    group.items.push(item);
  });

  let anyVisible = false;
  groups.forEach(group => {
    const visibleItems = group.items.filter(item =>
      (categoryFilter === 'all' || item.category === categoryFilter) &&
      (memberFilter === 'all' || item.actor === memberFilter) &&
      (!q || item.text.toLowerCase().includes(q))
    );
    if (!visibleItems.length) return;
    anyVisible = true;

    const groupEl = document.createElement('div');
    groupEl.className = 'day-group';
    const panel = document.createElement('div');
    panel.className = 'feed-panel';
    visibleItems.forEach(item => {
      const row = document.createElement('div');
      row.className = 'feed-row';
      row.innerHTML = `
        <div class="feed-icon ${item.category}">${icons[item.category]}</div>
        <span class="feed-actor">${item.actor}</span>
        <div class="feed-body">
          <div class="feed-text">${item.text}</div>
          <div class="feed-time">${timeLabel(item.when)}</div>
        </div>
      `;
      panel.appendChild(row);
    });
    groupEl.innerHTML = `<div class="day-heading">${group.label}</div>`;
    groupEl.appendChild(panel);
    container.appendChild(groupEl);
  });

  if (!anyVisible){
    container.innerHTML = '<p class="feed-empty">No activity matches your filters.</p>';
  }

  renderStats();
}

function renderStats(){
  const today = new Date(2026,7,12);
  const todayCount = activity.filter(a => dayLabel(a.when) === 'Today').length;
  const weekCount = activity.filter(a => (today - a.when) / 86400000 <= 7).length;
  const activeMembers = new Set(activity.filter(a => (today - a.when) / 86400000 <= 7).map(a => a.actor)).size;
  const securityCount = activity.filter(a => a.category === 'settings').length;
  document.getElementById('statToday').textContent = todayCount;
  document.getElementById('statWeek').textContent = weekCount;
  document.getElementById('statMembers').textContent = activeMembers;
  document.getElementById('statSecurity').textContent = securityCount;
}

document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    categoryFilter = chip.dataset.filter;
    renderFeed();
  });
});
document.getElementById('memberFilter').addEventListener('change', renderFeed);
document.getElementById('topSearch').addEventListener('input', renderFeed);

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

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  const tag = document.activeElement.tagName;
  const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  if (e.key === 'Escape'){ closeAllDropdowns(); sidebar.classList.remove('open'); sidebarBackdrop.classList.remove('open'); return; }
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