const TODAY = new Date(2026, 7, 12); // Aug 12, 2026
let viewYear = TODAY.getFullYear();
let viewMonth = TODAY.getMonth();
let typeFilter = 'all';
let activeDayKey = null;

function dateKey(y, m, d){ return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }
function sameDay(a, b){ return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }

let events = [
  { id:1, title:'Kickoff call — Reef Co.', date:dateKey(2026,7,12), time:'10:00', type:'call' },
  { id:2, title:'Team sync', date:dateKey(2026,7,12), time:'14:00', type:'meeting' },
  { id:3, title:'Invoice #0143 due', date:dateKey(2026,7,15), time:'09:00', type:'deadline' },
  { id:4, title:'Send proposal — Grovepoint', date:dateKey(2026,7,18), time:'11:00', type:'reminder' },
  { id:5, title:'Design review', date:dateKey(2026,7,20), time:'15:30', type:'meeting' },
  { id:6, title:'Contract renewal — Northline', date:dateKey(2026,7,25), time:'09:00', type:'deadline' },
  { id:7, title:'Client check-in — Dana', date:dateKey(2026,8,2), time:'10:30', type:'call' },
];

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function eventsForDate(key){
  const q = document.getElementById('topSearch').value.trim().toLowerCase();
  return events.filter(e => e.date === key)
    .filter(e => typeFilter === 'all' || e.type === typeFilter)
    .filter(e => !q || e.title.toLowerCase().includes(q));
}

function renderCalendar(){
  document.getElementById('monthTitle').textContent = `${MONTH_NAMES[viewMonth]} ${viewYear}`;
  const grid = document.getElementById('calendarGrid');
  grid.innerHTML = '';
  WEEKDAYS.forEach(w => {
    const el = document.createElement('div');
    el.className = 'calendar-weekday';
    el.textContent = w;
    grid.appendChild(el);
  });

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const startOffset = firstOfMonth.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const cells = [];
  for (let i = startOffset - 1; i >= 0; i--){
    cells.push({ day: daysInPrevMonth - i, other: true, y: viewMonth === 0 ? viewYear-1 : viewYear, m: viewMonth === 0 ? 11 : viewMonth-1 });
  }
  for (let d = 1; d <= daysInMonth; d++){
    cells.push({ day: d, other: false, y: viewYear, m: viewMonth });
  }
  while (cells.length % 7 !== 0 || cells.length < 42){
    const last = cells[cells.length-1];
    const nextM = last.m === 11 ? 0 : last.m + 1;
    const nextY = last.m === 11 ? last.y + 1 : last.y;
    cells.push({ day: cells.length - (startOffset + daysInMonth) + 1, other: true, y: viewMonth === 11 ? viewYear+1 : viewYear, m: viewMonth === 11 ? 0 : viewMonth+1 });
    if (cells.length >= 42) break;
  }

  cells.forEach(c => {
    const key = dateKey(c.y, c.m, c.day);
    const cellDate = new Date(c.y, c.m, c.day);
    const dayEvents = events.filter(e => e.date === key).filter(e => typeFilter === 'all' || e.type === typeFilter);
    const el = document.createElement('div');
    el.className = 'calendar-day' + (c.other ? ' other-month' : '') + (sameDay(cellDate, TODAY) ? ' today' : '') + (dayEvents.length ? ' has-events' : '');
    let inner = `<span class="calendar-day-num">${c.day}</span>`;
    dayEvents.slice(0, 2).forEach(e => {
      inner += `<span class="calendar-event-chip ${e.type}">${e.title}</span>`;
    });
    if (dayEvents.length > 2) inner += `<span class="calendar-more">+${dayEvents.length - 2} more</span>`;
    el.innerHTML = inner;
    el.addEventListener('click', () => openDay(key));
    grid.appendChild(el);
  });
}

function openDay(key){
  activeDayKey = key;
  const [y, m, d] = key.split('-').map(Number);
  document.getElementById('dayModalTitle').textContent = `${MONTH_NAMES[m-1]} ${d}, ${y}`;
  const list = document.getElementById('dayEventsList');
  const dayEvents = events.filter(e => e.date === key);
  if (!dayEvents.length){
    list.innerHTML = '<p class="upcoming-empty">No events on this day.</p>';
  } else {
    list.innerHTML = dayEvents.map(e => `
      <div class="day-event-row">
        <span class="day-event-tag ${e.type}"></span>
        <div class="day-event-info"><div class="day-event-title">${e.title}</div><div class="day-event-time">${e.time}</div></div>
        <button class="day-event-remove" data-id="${e.id}" aria-label="Remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
      </div>
    `).join('');
    list.querySelectorAll('.day-event-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        events = events.filter(e => e.id !== Number(btn.dataset.id));
        openDay(activeDayKey);
        renderCalendar();
        renderUpcoming();
        showToast('Event removed.');
      });
    });
  }
  openModal(document.getElementById('dayModal'));
}
document.getElementById('addEventForDayBtn').addEventListener('click', () => {
  closeModal();
  document.getElementById('eventDate').value = activeDayKey || '';
  openModal(document.getElementById('eventModal'));
});

function renderUpcoming(){
  const list = document.getElementById('upcomingList');
  const q = document.getElementById('topSearch').value.trim().toLowerCase();
  const upcoming = events
    .filter(e => new Date(e.date + 'T00:00:00') >= TODAY)
    .filter(e => typeFilter === 'all' || e.type === typeFilter)
    .filter(e => !q || e.title.toLowerCase().includes(q))
    .sort((a,b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  if (!upcoming.length){
    list.innerHTML = '<p class="upcoming-empty">Nothing scheduled.</p>';
    return;
  }
  list.innerHTML = upcoming.map(e => {
    const [y,m,d] = e.date.split('-').map(Number);
    return `
      <div class="upcoming-item" data-date="${e.date}">
        <div class="upcoming-date"><div class="upcoming-date-day">${d}</div><div class="upcoming-date-month">${MONTH_NAMES[m-1].slice(0,3)}</div></div>
        <div><div class="upcoming-title">${e.title}</div><div class="upcoming-meta">${e.time} · ${e.type}</div></div>
      </div>
    `;
  }).join('');
  list.querySelectorAll('.upcoming-item').forEach(item => {
    item.addEventListener('click', () => openDay(item.dataset.date));
  });
}

// ===== NAVIGATION =====
document.getElementById('prevMonthBtn').addEventListener('click', () => {
  viewMonth--; if (viewMonth < 0){ viewMonth = 11; viewYear--; }
  renderCalendar();
});
document.getElementById('nextMonthBtn').addEventListener('click', () => {
  viewMonth++; if (viewMonth > 11){ viewMonth = 0; viewYear++; }
  renderCalendar();
});
document.getElementById('todayBtn').addEventListener('click', () => {
  viewYear = TODAY.getFullYear(); viewMonth = TODAY.getMonth();
  renderCalendar();
});

// ===== FILTERS =====
document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    typeFilter = chip.dataset.filter;
    renderCalendar();
    renderUpcoming();
  });
});
document.getElementById('topSearch').addEventListener('input', () => { renderCalendar(); renderUpcoming(); });

// ===== NEW EVENT =====
const eventTitle = document.getElementById('eventTitle');
const eventDate = document.getElementById('eventDate');
const saveEventBtn = document.getElementById('saveEventBtn');
function validateEvent(){
  saveEventBtn.classList.toggle('is-disabled', !(eventTitle.value.trim() && eventDate.value));
}
[eventTitle, eventDate].forEach(el => el.addEventListener('input', validateEvent));

document.getElementById('newBtn').addEventListener('click', () => {
  eventTitle.value = '';
  eventDate.value = '';
  document.getElementById('eventTime').value = '';
  document.getElementById('eventType').value = 'meeting';
  saveEventBtn.classList.add('is-disabled');
  openModal(document.getElementById('eventModal'));
});

saveEventBtn.addEventListener('click', () => {
  if (saveEventBtn.classList.contains('is-disabled')) return;
  const id = Math.max(...events.map(e => e.id), 0) + 1;
  const newEvent = {
    id,
    title: eventTitle.value.trim(),
    date: eventDate.value,
    time: document.getElementById('eventTime').value || '00:00',
    type: document.getElementById('eventType').value
  };
  events.push(newEvent);
  const [y,m] = newEvent.date.split('-').map(Number);
  viewYear = y; viewMonth = m - 1;
  closeModal();
  renderCalendar();
  renderUpcoming();
  showToast(`"${newEvent.title}" added to your calendar.`);
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
  if (e.key === 'ArrowLeft'){ document.getElementById('prevMonthBtn').click(); }
  if (e.key === 'ArrowRight'){ document.getElementById('nextMonthBtn').click(); }
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
renderCalendar();
renderUpcoming();