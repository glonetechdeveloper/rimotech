const icons = {
  client: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16a1.5 1.5 0 011.5 1.5v8A1.5 1.5 0 0120 16h-9l-4.5 4v-4H4a1.5 1.5 0 01-1.5-1.5v-8A1.5 1.5 0 014 5z"/></svg>`,
  invoice: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3V3z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>`,
  task: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12l2.5 2.5L16 9"/></svg>`,
  event: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15H6z"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`,
  automation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>`,
  person: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.3"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"/></svg>`,
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83"/></svg>`
};

const CATEGORY_LABEL = {
  client:'Clients', invoice:'Invoices', task:'Tasks', event:'Calendar events',
  file:'Files', chat:'Conversations', automation:'Automations', person:'Team'
};

const searchIndex = [
  { type:'client', title:'Priya Shah', sub:'Lumen Studio · Leads' },
  { type:'client', title:'Dana Osei', sub:'Reef Co. · Active' },
  { type:'client', title:'Northline Team', sub:'Northline Inc. · Closed' },
  { type:'client', title:'Marcus Webb', sub:'Grovepoint · Leads' },

  { type:'invoice', title:'Invoice #0142', sub:'Northline · $1,200 · Paid' },
  { type:'invoice', title:'Invoice #0143', sub:'Dana (Reef Co.) · $2,400 · Pending' },
  { type:'invoice', title:'Invoice #0138', sub:'Grovepoint · $450 · Overdue' },

  { type:'task', title:'Draft the Q3 client proposal', sub:'Reef Co. · High priority · Due Aug 14' },
  { type:'task', title:'Homepage redesign', sub:'Northline · In review' },
  { type:'task', title:'Fix invoice PDF export bug', sub:'Internal · In progress' },

  { type:'event', title:'Kickoff call — Reef Co.', sub:'Aug 12 · 10:00 AM' },
  { type:'event', title:'Team sync', sub:'Aug 12 · 2:00 PM' },
  { type:'event', title:'Design review', sub:'Aug 20 · 3:30 PM' },

  { type:'file', title:'Northside Studio - MSA.pdf', sub:'Contracts · 1.2 MB' },
  { type:'file', title:'Brand Guidelines.pdf', sub:'Client Files / Reef Co. · 2.1 MB' },
  { type:'file', title:'Q2 Revenue Report.xlsx', sub:'Home · 842 KB' },

  { type:'chat', title:'Dana (Reef Co.)', sub:'"One question on the timeline for phase 2."' },
  { type:'chat', title:'Alex Kim', sub:'"Got it, thank you!"' },

  { type:'automation', title:'Invoice reminder', sub:'Overdue by 3 days → Send email' },
  { type:'automation', title:'Weekly digest', sub:'Every Monday 9am → Send summary' },

  { type:'person', title:'Joseph Prince', sub:'Founder · Owner' },
  { type:'person', title:'Alex Kim', sub:'Admin' },
  { type:'person', title:'Jamie Ruiz', sub:'Member' },
  { type:'person', title:'Dana Osei', sub:'Member' },
];

const quickLinks = [
  { icon:'dashboard', label:'Dashboard' },
  { icon:'chat', label:'Chat' },
  { icon:'client', label:'CRM' },
  { icon:'event', label:'Calendar' },
  { icon:'task', label:'Tasks' },
  { icon:'invoice', label:'Finances' },
  { icon:'automation', label:'Automations' },
  { icon:'file', label:'Files' },
  { icon:'settings', label:'Settings' },
];

const recentSearches = ['Reef Co.', 'Invoice #0143', 'Homepage redesign', 'Dana Osei'];

const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const emptyState = document.getElementById('emptyState');
const resultsState = document.getElementById('resultsState');

let flatResults = [];
let highlightIndex = -1;

function renderEmptyExtras(){
  document.getElementById('recentRow').innerHTML = recentSearches.map(r => `<button class="recent-chip" data-q="${r}">${r}</button>`).join('');
  document.querySelectorAll('.recent-chip').forEach(chip => {
    chip.addEventListener('click', () => { searchInput.value = chip.dataset.q; runSearch(); });
  });

  document.getElementById('quicklinksGrid').innerHTML = quickLinks.map(q => `
    <button class="quicklink-card" data-label="${q.label}">
      <div class="quicklink-icon">${icons[q.icon]}</div>
      <div class="quicklink-label">${q.label}</div>
    </button>
  `).join('');
  document.querySelectorAll('.quicklink-card').forEach(card => {
    card.addEventListener('click', () => showToast(`Opening ${card.dataset.label}…`));
  });
}

function runSearch(){
  const q = searchInput.value.trim().toLowerCase();
  clearBtn.style.display = q ? 'flex' : 'none';
  document.getElementById('searchKbd').style.display = q ? 'none' : 'block';

  if (!q){
    emptyState.style.display = 'block';
    resultsState.style.display = 'none';
    flatResults = [];
    highlightIndex = -1;
    return;
  }

  emptyState.style.display = 'none';
  resultsState.style.display = 'block';

  const matches = searchIndex.filter(item =>
    item.title.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q)
  );

  if (!matches.length){
    resultsState.innerHTML = `
      <div class="no-results">
        <div class="no-results-title">No results for "${searchInput.value}"</div>
        <p class="no-results-sub">Try a different name, invoice number, or keyword.</p>
      </div>
    `;
    flatResults = [];
    highlightIndex = -1;
    return;
  }

  const groups = {};
  matches.forEach(m => { (groups[m.type] = groups[m.type] || []).push(m); });

  flatResults = [];
  let html = '';
  Object.keys(groups).forEach(type => {
    html += `<div class="result-group"><div class="result-group-title"><span>${CATEGORY_LABEL[type]}</span><span>${groups[type].length}</span></div><div class="result-panel">`;
    groups[type].forEach(item => {
      const idx = flatResults.length;
      flatResults.push(item);
      html += `
        <div class="result-row" data-index="${idx}">
          <div class="result-icon">${icons[item.type]}</div>
          <div class="result-body"><div class="result-title">${item.title}</div><div class="result-sub">${item.sub}</div></div>
          <span class="result-enter">↵</span>
        </div>
      `;
    });
    html += `</div></div>`;
  });
  resultsState.innerHTML = html;

  document.querySelectorAll('.result-row').forEach(row => {
    row.addEventListener('click', () => openResult(Number(row.dataset.index)));
    row.addEventListener('mouseenter', () => setHighlight(Number(row.dataset.index)));
  });
  highlightIndex = 0;
  updateHighlight();
}

function setHighlight(i){
  highlightIndex = i;
  updateHighlight();
}
function updateHighlight(){
  document.querySelectorAll('.result-row').forEach(row => {
    row.classList.toggle('highlighted', Number(row.dataset.index) === highlightIndex);
  });
}
function openResult(i){
  const item = flatResults[i];
  if (!item) return;
  showToast(`Opening ${item.title}…`);
}

searchInput.addEventListener('input', runSearch);
clearBtn.addEventListener('click', () => { searchInput.value = ''; runSearch(); searchInput.focus(); });

document.addEventListener('keydown', (e) => {
  if (!flatResults.length) return;
  if (e.key === 'ArrowDown'){ e.preventDefault(); highlightIndex = Math.min(highlightIndex + 1, flatResults.length - 1); updateHighlight(); scrollHighlightIntoView(); }
  if (e.key === 'ArrowUp'){ e.preventDefault(); highlightIndex = Math.max(highlightIndex - 1, 0); updateHighlight(); scrollHighlightIntoView(); }
  if (e.key === 'Enter'){ e.preventDefault(); openResult(highlightIndex); }
});
function scrollHighlightIntoView(){
  const el = document.querySelector('.result-row.highlighted');
  if (el) el.scrollIntoView({ block:'nearest' });
}

// ===== TOAST (lightweight, no stack needed here) =====
function showToast(message){
  let stack = document.getElementById('toastStack');
  if (!stack){
    stack = document.createElement('div');
    stack.id = 'toastStack';
    stack.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;z-index:80;display:flex;flex-direction:column;gap:.6rem;align-items:flex-end;';
    document.body.appendChild(stack);
  }
  const toast = document.createElement('div');
  toast.style.cssText = 'display:flex;align-items:center;gap:.6rem;background:var(--ink);color:#fff;font-size:.85rem;font-weight:600;padding:.8rem 1.1rem;border-radius:999px;box-shadow:4px 4px 0 var(--accent);animation:toastIn .3s ease both;';
  toast.innerHTML = `<span>${message}</span>`;
  stack.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}
const styleTag = document.createElement('style');
styleTag.textContent = '@keyframes toastIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}';
document.head.appendChild(styleTag);

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

// ===== AMBIENT + FADE-IN =====
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth * 100).toFixed(1);
  const y = (e.clientY / window.innerHeight * 100).toFixed(1);
  document.documentElement.style.setProperty('--mx', `${x}%`);
  document.documentElement.style.setProperty('--my', `${y}%`);
});
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => document.body.classList.add('loaded'));
  searchInput.focus();
});

// ===== INIT =====
renderEmptyExtras();