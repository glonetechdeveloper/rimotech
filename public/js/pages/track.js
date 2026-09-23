const TODAY = new Date(2026, 7, 12); // Aug 12, 2026
const RATE = 75;

let entries = [
  { id:1, project:'Reef Co.', task:'Brand guideline review', date:'2026-08-12', hours:1.5, billable:true },
  { id:2, project:'Internal', task:'Team sync', date:'2026-08-12', hours:0.5, billable:false },
  { id:3, project:'Northline', task:'Homepage redesign', date:'2026-08-11', hours:3, billable:true },
  { id:4, project:'Grovepoint', task:'Proposal draft', date:'2026-08-11', hours:2, billable:true },
  { id:5, project:'Internal', task:'Admin & email', date:'2026-08-10', hours:1, billable:false },
  { id:6, project:'Reef Co.', task:'Kickoff call prep', date:'2026-08-10', hours:1.5, billable:true },
];

let entryFilter = 'all';

// ===== TIMER =====
let timerRunning = false;
let timerSeconds = 0;
let timerInterval = null;
const timerDisplay = document.getElementById('timerDisplay');
const timerBtn = document.getElementById('timerBtn');
const timerPulse = document.getElementById('timerPulse');

function formatTimer(sec){
  const h = String(Math.floor(sec/3600)).padStart(2,'0');
  const m = String(Math.floor((sec%3600)/60)).padStart(2,'0');
  const s = String(sec%60).padStart(2,'0');
  return `${h}:${m}:${s}`;
}

timerBtn.addEventListener('click', () => {
  if (!timerRunning){
    timerRunning = true;
    timerBtn.textContent = 'Stop & save';
    timerBtn.classList.add('running');
    timerPulse.classList.add('active');
    timerInterval = setInterval(() => {
      timerSeconds++;
      timerDisplay.textContent = formatTimer(timerSeconds);
    }, 1000);
  } else {
    timerRunning = false;
    clearInterval(timerInterval);
    timerBtn.textContent = 'Start timer';
    timerBtn.classList.remove('running');
    timerPulse.classList.remove('active');
    if (timerSeconds > 0){
      const hours = Math.round((timerSeconds/3600) * 100) / 100;
      const id = Math.max(...entries.map(e => e.id), 0) + 1;
      entries.unshift({
        id, project: document.getElementById('timerProject').value,
        task: document.getElementById('timerTask').value.trim() || 'Untitled task',
        date: '2026-08-12', hours, billable: true
      });
      showToast(`Logged ${formatTimer(timerSeconds)} to ${document.getElementById('timerProject').value}.`);
    }
    timerSeconds = 0;
    timerDisplay.textContent = '00:00:00';
    document.getElementById('timerTask').value = '';
    populateProjectFilter();
    renderTimesheet();
  }
});

// ===== TIMESHEET =====
function populateProjectFilter(){
  const select = document.getElementById('projectFilter');
  const current = select.value;
  const projects = [...new Set(entries.map(e => e.project))].sort();
  select.innerHTML = '<option value="all">All projects</option>' + projects.map(p => `<option value="${p}">${p}</option>`).join('');
  if (projects.includes(current)) select.value = current;
}

function dayLabel(dateStr){
  const d = new Date(dateStr + 'T00:00:00');
  const diff = Math.round((TODAY - d) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return d.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
}

function renderTimesheet(){
  const q = document.getElementById('topSearch').value.trim().toLowerCase();
  const projectFilter = document.getElementById('projectFilter').value;
  const container = document.getElementById('timesheetContainer');
  container.innerHTML = '';

  const sorted = [...entries].sort((a,b) => b.date.localeCompare(a.date));
  const groups = [];
  sorted.forEach(e => {
    const label = dayLabel(e.date);
    let g = groups.find(x => x.label === label);
    if (!g){ g = { label, items: [] }; groups.push(g); }
    g.items.push(e);
  });

  let anyVisible = false;
  groups.forEach(group => {
    const visible = group.items.filter(e =>
      (entryFilter === 'all' || (entryFilter === 'yes' ? e.billable : !e.billable)) &&
      (projectFilter === 'all' || e.project === projectFilter) &&
      (!q || e.task.toLowerCase().includes(q) || e.project.toLowerCase().includes(q))
    );
    if (!visible.length) return;
    anyVisible = true;

    const totalHours = visible.reduce((sum, e) => sum + e.hours, 0);
    const groupEl = document.createElement('div');
    groupEl.className = 'day-group';
    groupEl.innerHTML = `<div class="day-heading"><span class="day-heading-label">${group.label}</span><span class="day-heading-total">${totalHours}h logged</span></div>`;

    const panel = document.createElement('div');
    panel.className = 'entries-panel';
    visible.forEach(e => {
      const row = document.createElement('div');
      row.className = 'entry-row';
      row.innerHTML = `
        <div><div class="entry-project">${e.project}</div><div class="entry-task">${e.task}</div></div>
        <div class="entry-duration">${e.hours}h</div>
        <div class="entry-billable ${e.billable ? 'yes' : 'no'}">${e.billable ? 'Billable' : 'Internal'}</div>
        <button class="entry-remove" data-id="${e.id}" aria-label="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
      `;
      row.querySelector('.entry-remove').addEventListener('click', () => {
        entries = entries.filter(x => x.id !== e.id);
        renderTimesheet();
        showToast('Entry deleted.');
      });
      panel.appendChild(row);
    });
    groupEl.appendChild(panel);
    container.appendChild(groupEl);
  });

  if (!anyVisible){
    container.innerHTML = '<p class="timesheet-empty">No time entries match your filters.</p>';
  }

  renderStats();
}

function renderStats(){
  const todayEntries = entries.filter(e => e.date === '2026-08-12');
  const todayHours = todayEntries.reduce((s,e) => s + e.hours, 0);
  const weekEntries = entries.filter(e => (TODAY - new Date(e.date + 'T00:00:00')) / 86400000 <= 7);
  const weekHours = weekEntries.reduce((s,e) => s + e.hours, 0);
  const billableHours = weekEntries.filter(e => e.billable).reduce((s,e) => s + e.hours, 0);
  document.getElementById('statToday').textContent = `${Math.floor(todayHours)}h ${Math.round((todayHours%1)*60)}m`;
  document.getElementById('statWeek').textContent = `${weekHours}h`;
  document.getElementById('statBillable').textContent = `${billableHours}h`;
  document.getElementById('statUnbilled').textContent = `$${Math.round(billableHours * RATE).toLocaleString()}`;
}

document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    entryFilter = chip.dataset.filter;
    renderTimesheet();
  });
});
document.getElementById('projectFilter').addEventListener('change', renderTimesheet);
document.getElementById('topSearch').addEventListener('input', renderTimesheet);

// ===== NEW ENTRY MODAL =====
const entryTask = document.getElementById('entryTask');
const entryDate = document.getElementById('entryDate');
const entryHours = document.getElementById('entryHours');
const saveEntryBtn = document.getElementById('saveEntryBtn');
const entryBillableBox = document.getElementById('entryBillableBox');
let entryBillable = true;

function validateEntry(){
  saveEntryBtn.classList.toggle('is-disabled', !(entryTask.value.trim() && entryDate.value && entryHours.value));
}
[entryTask, entryDate, entryHours].forEach(el => el.addEventListener('input', validateEntry));

document.getElementById('entryBillableRow').addEventListener('click', () => {
  entryBillable = !entryBillable;
  entryBillableBox.classList.toggle('checked', entryBillable);
});

document.getElementById('newBtn').addEventListener('click', () => {
  entryTask.value = ''; entryDate.value = '2026-08-12'; entryHours.value = '';
  entryBillable = true; entryBillableBox.classList.add('checked');
  saveEntryBtn.classList.add('is-disabled');
  openModal(document.getElementById('newEntryModal'));
});

saveEntryBtn.addEventListener('click', () => {
  if (saveEntryBtn.classList.contains('is-disabled')) return;
  const id = Math.max(...entries.map(e => e.id), 0) + 1;
  entries.unshift({
    id, project: document.getElementById('entryProject').value,
    task: entryTask.value.trim(), date: entryDate.value,
    hours: parseFloat(entryHours.value), billable: entryBillable
  });
  closeModal();
  populateProjectFilter();
  renderTimesheet();
  showToast('Time entry added.');
});

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
  const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  if (e.key === 'Escape'){ closeModal(); closeAllDropdowns(); sidebar.classList.remove('open'); sidebarBackdrop.classList.remove('open'); return; }
  if (isTyping) return;
  if (e.key === '/'){ e.preventDefault(); document.getElementById('topSearch').focus(); }
  if (e.key.toLowerCase() === 'n'){ e.preventDefault(); document.getElementById('newBtn').click(); }
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
populateProjectFilter();
renderTimesheet();