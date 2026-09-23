let team = [
  { id:1, name:'Joseph Prince', email:'joseph@northsidestudio.com', role:'Owner' },
  { id:2, name:'Alex Kim', email:'alex@northsidestudio.com', role:'Admin' },
  { id:3, name:'Jamie Ruiz', email:'jamie@northsidestudio.com', role:'Member' },
];

function initials(name){ return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase(); }

function renderTeam(){
  const list = document.getElementById('teamList');
  list.innerHTML = '';
  team.forEach(m => {
    const row = document.createElement('div');
    row.className = 'team-row';
    row.innerHTML = `
      <div class="team-avatar">${initials(m.name)}</div>
      <div class="team-meta"><div class="team-name">${m.name}</div><div class="team-email">${m.email}</div></div>
      <span class="team-role">${m.role}</span>
      ${m.role !== 'Owner' ? `<button class="team-remove" data-id="${m.id}" aria-label="Remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>` : '<span style="width:32px;"></span>'}
    `;
    const removeBtn = row.querySelector('.team-remove');
    if (removeBtn){
      removeBtn.addEventListener('click', () => {
        team = team.filter(t => t.id !== m.id);
        renderTeam();
        showToast(`${m.name} removed from the workspace.`);
      });
    }
    list.appendChild(row);
  });
}

// ===== TABS =====
document.querySelectorAll('.settings-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`.settings-section[data-section="${tab.dataset.tab}"]`).classList.add('active');
  });
});

// ===== SAVE ACTIONS =====
document.getElementById('saveProfileTab').addEventListener('click', () => showToast('Profile updated.'));
document.getElementById('saveWorkspaceBtn').addEventListener('click', () => showToast('Workspace settings saved.'));
document.getElementById('exportBtn').addEventListener('click', () => showToast('Preparing your export — we\'ll email you when it\'s ready.'));
document.querySelectorAll('.settings-section[data-section="notifications"] .switch').forEach(sw => {
  sw.addEventListener('click', () => {
    const on = sw.classList.toggle('on');
    sw.setAttribute('aria-checked', String(on));
    showToast('Notification preference updated.');
  });
});

// ===== INVITE MODAL =====
const inviteEmail = document.getElementById('inviteEmail');
const sendInviteBtn = document.getElementById('sendInviteBtn');
inviteEmail.addEventListener('input', () => sendInviteBtn.classList.toggle('is-disabled', !/^\S+@\S+\.\S+$/.test(inviteEmail.value.trim())));
sendInviteBtn.addEventListener('click', () => {
  if (sendInviteBtn.classList.contains('is-disabled')) return;
  const email = inviteEmail.value.trim();
  const role = document.getElementById('inviteRole').value;
  const id = Math.max(...team.map(t => t.id), 0) + 1;
  team.push({ id, name: email.split('@')[0], email, role });
  inviteEmail.value = '';
  sendInviteBtn.classList.add('is-disabled');
  closeModal();
  renderTeam();
  showToast(`Invite sent to ${email}.`);
});
document.getElementById('newBtn').addEventListener('click', () => openModal(document.getElementById('inviteModal')));

// ===== DELETE WORKSPACE =====
const deleteConfirmInput = document.getElementById('deleteConfirmInput');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
document.getElementById('openDeleteModal').addEventListener('click', () => {
  deleteConfirmInput.value = '';
  confirmDeleteBtn.disabled = true;
  openModal(document.getElementById('deleteModal'));
});
deleteConfirmInput.addEventListener('input', () => {
  confirmDeleteBtn.disabled = deleteConfirmInput.value.trim() !== 'Northside Studio';
});
confirmDeleteBtn.addEventListener('click', () => {
  if (confirmDeleteBtn.disabled) return;
  closeModal();
  showToast('Workspace deletion started — this is a demo, nothing was actually deleted.');
});

// ===== UPGRADE =====
document.getElementById('upgradePlanBtn').addEventListener('click', () => showToast('Redirecting to checkout — demo only.'));

// ===== PROFILE / SETTINGS DROPDOWN =====
document.getElementById('profileMenuBtn').addEventListener('click', () => openModal(document.getElementById('profileModal')));
document.getElementById('settingsMenuBtn').addEventListener('click', () => { closeAllDropdowns(); });
document.getElementById('saveProfile').addEventListener('click', () => { closeModal(); showToast('Profile updated.'); });

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
  if (e.key.toLowerCase() === 'n'){ e.preventDefault(); openModal(document.getElementById('inviteModal')); }
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
renderTeam();