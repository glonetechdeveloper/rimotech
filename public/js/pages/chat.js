// ===== DATA =====
let conversations = [
  { id:1, name:'Dana (Reef Co.)', avatar:'DA', unread:2, messages:[
    { from:'them', text:"Hi! Just reviewed the proposal — looks great.", time:'9:02 AM' },
    { from:'them', text:"One question on the timeline for phase 2.", time:'9:03 AM' },
  ]},
  { id:2, name:'Alex Kim', avatar:'AK', unread:0, messages:[
    { from:'me', text:'Invoice #0142 is out to Northline.', time:'Yesterday' },
    { from:'them', text:'Got it, thank you!', time:'Yesterday' },
  ]},
  { id:3, name:'Jamie Ruiz', avatar:'JM', unread:0, messages:[
    { from:'them', text:'Moved the homepage redesign to Active.', time:'Mon' },
  ]},
  { id:4, name:'Northline Team', avatar:'NL', unread:1, messages:[
    { from:'them', text:'Can we push the kickoff call to Thursday?', time:'8:41 AM' },
  ]},
];
let activeId = 1;
const replies = [
  "Sounds good, thanks for the update!",
  "Got it — I'll take a look shortly.",
  "Appreciate you flagging this.",
  "Perfect, let's go with that.",
  "Thanks! I'll follow up tomorrow."
];
 
const icons = {};
document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icons[el.dataset.icon] || el.innerHTML; });
 
const conversationItems = document.getElementById('conversationItems');
const threadMessages = document.getElementById('threadMessages');
const threadName = document.getElementById('threadName');
const threadAvatar = document.getElementById('threadAvatar');
const composerInput = document.getElementById('composerInput');
const chatContent = document.getElementById('chatContent');
 
function renderList(filter = ''){
  const q = filter.trim().toLowerCase();
  conversationItems.innerHTML = '';
  conversations
    .filter(c => c.name.toLowerCase().includes(q))
    .forEach(c => {
      const last = c.messages[c.messages.length - 1];
      const el = document.createElement('div');
      el.className = 'conversation-item' + (c.id === activeId ? ' active' : '');
      el.innerHTML = `
        <div class="conv-avatar">${c.avatar}</div>
        <div class="conv-meta">
          <div class="conv-name-row"><span class="conv-name">${c.name}</span><span class="conv-time">${last ? last.time : ''}</span></div>
          <div class="conv-preview">${last ? last.text : ''}</div>
        </div>
        ${c.unread > 0 ? `<span class="conv-unread">${c.unread}</span>` : ''}
      `;
      el.addEventListener('click', () => selectConversation(c.id));
      conversationItems.appendChild(el);
    });
}
 
function renderThread(){
  const convo = conversations.find(c => c.id === activeId);
  threadName.textContent = convo.name;
  threadAvatar.textContent = convo.avatar;
  threadMessages.innerHTML = '';
  convo.messages.forEach(m => appendBubble(m.from, m.text, m.time, false));
  threadMessages.scrollTop = threadMessages.scrollHeight;
}
 
function appendBubble(from, text, time, scroll = true){
  const bubble = document.createElement('div');
  bubble.className = `msg ${from}`;
  bubble.innerHTML = `${text}<span class="msg-time">${time}</span>`;
  threadMessages.appendChild(bubble);
  if (scroll) threadMessages.scrollTop = threadMessages.scrollHeight;
}
 
function selectConversation(id){
  activeId = id;
  const convo = conversations.find(c => c.id === id);
  convo.unread = 0;
  renderList(document.getElementById('convoSearch').value);
  renderThread();
  if (window.innerWidth <= 760) chatContent.classList.add('show-thread');
  composerInput.focus();
}
 
document.getElementById('threadBack').addEventListener('click', () => chatContent.classList.remove('show-thread'));
 
document.getElementById('convoSearch').addEventListener('input', (e) => renderList(e.target.value));
 
// ===== SENDING MESSAGES =====
function sendMessage(){
  const text = composerInput.value.trim();
  if (!text) return;
  const convo = conversations.find(c => c.id === activeId);
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  convo.messages.push({ from: 'me', text, time });
  appendBubble('me', text, time);
  composerInput.value = '';
  composerInput.style.height = 'auto';
  renderList(document.getElementById('convoSearch').value);
 
  const typing = document.createElement('div');
  typing.className = 'typing-indicator';
  typing.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
  threadMessages.appendChild(typing);
  threadMessages.scrollTop = threadMessages.scrollHeight;
 
  setTimeout(() => {
    typing.remove();
    const reply = replies[Math.floor(Math.random() * replies.length)];
    const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    convo.messages.push({ from: 'them', text: reply, time: replyTime });
    appendBubble('them', reply, replyTime);
    renderList(document.getElementById('convoSearch').value);
  }, 1300);
}
document.getElementById('sendBtn').addEventListener('click', sendMessage);
composerInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); sendMessage(); }
});
composerInput.addEventListener('input', () => {
  composerInput.style.height = 'auto';
  composerInput.style.height = Math.min(composerInput.scrollHeight, 120) + 'px';
});
 
// ===== TOPBAR SEARCH ALSO FILTERS CONVERSATIONS =====
document.getElementById('topSearch').addEventListener('input', (e) => renderList(e.target.value));
 
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
 
document.getElementById('newBtn').addEventListener('click', () => openModal(document.getElementById('newConvoModal')));
document.getElementById('profileMenuBtn').addEventListener('click', () => openModal(document.getElementById('profileModal')));
document.getElementById('settingsMenuBtn').addEventListener('click', () => openModal(document.getElementById('settingsModal')));
 
const newConvoName = document.getElementById('newConvoName');
const startConvoBtn = document.getElementById('startConvoBtn');
newConvoName.addEventListener('input', () => startConvoBtn.classList.toggle('is-disabled', newConvoName.value.trim().length === 0));
startConvoBtn.addEventListener('click', () => {
  if (startConvoBtn.classList.contains('is-disabled')) return;
  const name = newConvoName.value.trim();
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const id = Math.max(...conversations.map(c => c.id)) + 1;
  conversations.unshift({ id, name, avatar: initials, unread: 0, messages: [] });
  newConvoName.value = '';
  startConvoBtn.classList.add('is-disabled');
  closeModal();
  selectConversation(id);
  showToast(`Started a conversation with ${name}.`);
});
 
document.getElementById('saveProfile').addEventListener('click', () => { closeModal(); showToast('Profile updated.'); });
document.querySelectorAll('#settingsModal .switch').forEach(sw => sw.addEventListener('click', () => { const on = sw.classList.toggle('on'); sw.setAttribute('aria-checked', String(on)); }));
 
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
  if (e.key === 'Escape'){ closeModal(); closeAllDropdowns(); sidebar.classList.remove('open'); sidebarBackdrop.classList.remove('open'); return; }
  if (isTyping) return;
  if (e.key === '/'){ e.preventDefault(); document.getElementById('topSearch').focus(); }
  if (e.key.toLowerCase() === 'n'){ e.preventDefault(); openModal(document.getElementById('newConvoModal')); }
});
 
// ===== AMBIENT GLOW + FADE-IN =====
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth * 100).toFixed(1);
  const y = (e.clientY / window.innerHeight * 100).toFixed(1);
  document.documentElement.style.setProperty('--mx', `${x}%`);
  document.documentElement.style.setProperty('--my', `${y}%`);
});
window.addEventListener('DOMContentLoaded', () => requestAnimationFrame(() => document.body.classList.add('loaded')));
 
// ===== INIT =====
renderList();
renderThread();