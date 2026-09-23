const TODAY = new Date(2026, 7, 12); // Aug 12, 2026

let tasks = [
  { id:1, title:'Draft the Q3 client proposal', project:'Reef Co.', priority:'high', stage:'todo', due:'2026-08-14', assignee:'JP', notes:'' },
  { id:2, title:'Update onboarding email copy', project:'Internal', priority:'low', stage:'todo', due:'2026-08-20', assignee:'AK', notes:'' },
  { id:3, title:'Homepage redesign', project:'Northline', priority:'medium', stage:'review', due:'2026-08-13', assignee:'JM', notes:'' },
  { id:4, title:'Fix invoice PDF export bug', project:'Internal', priority:'high', stage:'progress', due:'2026-08-10', assignee:'AK', notes:'' },
  { id:5, title:'Prepare brand guideline deck', project:'Reef Co.', priority:'medium', stage:'progress', due:'2026-08-16', assignee:'DA', notes:'' },
  { id:6, title:'Client kickoff call notes', project:'Grovepoint', priority:'low', stage:'done', due:'2026-08-05', assignee:'JP', notes:'' },
  { id:7, title:'Renew Northline contract', project:'Northline', priority:'high', stage:'todo', due:'2026-08-11', assignee:'JP', notes:'' },
  { id:8, title:'Social media assets for launch', project:'Foundry Co.', priority:'medium', stage:'done', due:'2026-08-01', assignee:'JM', notes:'' },
];
let dragTaskId = null;
let activeTaskId = null;
let priorityFilter = 'all';

function initials(str){ return str; }

function populateProjectFilter(){
  const select = document.getElementById('projectFilter');
  const projects = [...new Set(tasks.map(t => t.project))].sort();
  select.innerHTML = '<option value="all">All projects</option>' + projects.map(p => `<option value="${p}">${p}</option>`).join('');
}

function isOverdue(due, stage){
  return stage !== 'done' && new Date(due + 'T00:00:00') < TODAY;
}
function formatDue(due){
  const d = new Date(due + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month:'short', day:'numeric' });
}

function renderBoard(){
  const q = document.getElementById('topSearch').value.trim().toLowerCase();
  const projectFilter = document.getElementById('projectFilter').value;

  ['todo','progress','review','done'].forEach(stage => {
    const col = document.querySelector(`.task-column-body[data-stage="${stage}"]`);
    col.innerHTML = '';
    const list = tasks.filter(t => t.stage === stage);
    let visible = 0;
    list.forEach(t => {
      const matches = (!q || t.title.toLowerCase().includes(q))
        && (priorityFilter === 'all' || t.priority === priorityFilter)
        && (projectFilter === 'all' || t.project === projectFilter);
      if (matches) visible++;
      const card = document.createElement('div');
      card.className = 'task-card' + (matches ? '' : ' hidden-card');
      card.draggable = true;
      card.dataset.id = t.id;
      const overdue = isOverdue(t.due, t.stage);
      card.innerHTML = `
        <span class="task-priority ${t.priority}">${t.priority}</span>
        <div class="task-title">${t.title}</div>
        <div class="task-project">${t.project}</div>
        <div class="task-footer">
          <span class="task-avatar">${t.assignee}</span>
          <span class="task-due ${overdue ? 'overdue' : ''}">${overdue ? 'Overdue · ' : ''}${formatDue(t.due)}</span>
        </div>
      `;
      card.addEventListener('dragstart', () => { dragTaskId = t.id; card.classList.add('dragging'); });
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
      card.addEventListener('click', () => openDetail(t.id));
      col.appendChild(card);
    });
    col.closest('.task-column').querySelector('.task-column-count').textContent = visible;
  });

  renderStats();
}

function renderStats(){
  const open = tasks.filter(t => t.stage !== 'done').length;
  const dueWeek = tasks.filter(t => {
    const d = new Date(t.due + 'T00:00:00');
    const diff = (d - TODAY) / 86400000;
    return t.stage !== 'done' && diff >= 0 && diff <= 7;
  }).length;
  const overdue = tasks.filter(t => isOverdue(t.due, t.stage)).length;
  const done = tasks.filter(t => t.stage === 'done').length;
  document.getElementById('statOpen').textContent = open;
  document.getElementById('statDueWeek').textContent = dueWeek;
  document.getElementById('statOverdue').textContent = overdue;
  document.getElementById('statDone').textContent = done;
}

document.querySelectorAll('.task-column-body').forEach(col => {
  col.addEventListener('dragover', (e) => { e.preventDefault(); col.classList.add('drag-over'); });
  col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
  col.addEventListener('drop', (e) => {
    e.preventDefault();
    col.classList.remove('drag-over');
    const task = tasks.find(t => t.id === dragTaskId);
    if (task){
      task.stage = col.dataset.stage;
      renderBoard();
      showToast(`Moved "${task.title}" to ${col.dataset.stage === 'progress' ? 'In progress' : col.dataset.stage}.`);
    }
  });
});

// ===== DETAIL MODAL =====
function openDetail(id){
  activeTaskId = id;
  const t = tasks.find(x => x.id === id);
  document.getElementById('detailTitle').textContent = t.title;
  document.getElementById('detailProject').textContent = t.project;
  document.getElementById('detailPriority').value = t.priority;
  document.getElementById('detailStage').value = t.stage;
  document.getElementById('detailDue').value = t.due;
  document.getElementById('detailAssignee').value = t.assignee;
  document.getElementById('detailNotes').value = t.notes;
  openModal(document.getElementById('detailModal'));
}
document.getElementById('saveTaskBtn').addEventListener('click', () => {
  const t = tasks.find(x => x.id === activeTaskId);
  t.priority = document.getElementById('detailPriority').value;
  t.stage = document.getElementById('detailStage').value;
  t.due = document.getElementById('detailDue').value;
  t.assignee = document.getElementById('detailAssignee').value;
  t.notes = document.getElementById('detailNotes').value;
  closeModal();
  renderBoard();
  showToast(`"${t.title}" updated.`);
});
document.getElementById('deleteTaskBtn').addEventListener('click', () => {
  const t = tasks.find(x => x.id === activeTaskId);
  tasks = tasks.filter(x => x.id !== activeTaskId);
  closeModal();
  renderBoard();
  showToast(`"${t.title}" deleted.`);
});

// ===== NEW TASK =====
const taskTitle = document.getElementById('taskTitle');
const createTaskBtn = document.getElementById('createTaskBtn');
taskTitle.addEventListener('input', () => createTaskBtn.classList.toggle('is-disabled', taskTitle.value.trim().length === 0));
createTaskBtn.addEventListener('click', () => {
  if (createTaskBtn.classList.contains('is-disabled')) return;
  const id = Math.max(...tasks.map(t => t.id), 0) + 1;
  const title = taskTitle.value.trim();
  tasks.unshift({
    id, title,
    project: document.getElementById('taskProject').value.trim() || 'Internal',
    priority: document.getElementById('taskPriority').value,
    stage: 'todo',
    due: document.getElementById('taskDue').value || TODAY.toISOString().slice(0,10),
    assignee: document.getElementById('taskAssignee').value,
    notes: ''
  });
  ['taskTitle','taskProject','taskDue'].forEach(id => document.getElementById(id).value = '');
  createTaskBtn.classList.add('is-disabled');
  closeModal();
  populateProjectFilter();
  renderBoard();
  showToast(`"${title}" added to To do.`);
});
document.getElementById('newBtn').addEventListener('click', () => openModal(document.getElementById('newTaskModal')));

// ===== FILTERS =====
document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    priorityFilter = chip.dataset.priority;
    renderBoard();
  });
});
document.getElementById('projectFilter').addEventListener('change', renderBoard);
document.getElementById('topSearch').addEventListener('input', renderBoard);

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
  if (e.key.toLowerCase() === 'n'){ e.preventDefault(); openModal(document.getElementById('newTaskModal')); }
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
renderBoard();