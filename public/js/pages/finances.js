const TODAY = new Date(2026, 6, 25); // Jul 25, 2026 — reference "today" for this demo

let invoices = [
  { id:1, number:'0142', client:'Northline', amount:'$1,200', status:'paid', due:new Date(2026,6,18) },
  { id:2, number:'0143', client:'Dana (Reef Co.)', amount:'$2,400', status:'pending', due:new Date(2026,7,2) },
  { id:3, number:'0138', client:'Grovepoint', amount:'$450', status:'overdue', due:new Date(2026,6,10) },
  { id:4, number:'0144', client:'Ruiz & Partners', amount:'$3,000', status:'pending', due:new Date(2026,7,9) },
  { id:5, number:'0141', client:'Lumen Studio', amount:'$1,850', status:'paid', due:new Date(2026,6,15) },
  { id:6, number:'0139', client:'Foundry Co.', amount:'$980', status:'paid', due:new Date(2026,6,5) },
  { id:7, number:'0145', client:'Priya Shah', amount:'$2,100', status:'pending', due:new Date(2026,9,15) },
  { id:8, number:'0136', client:'Marcus Webb', amount:'$750', status:'paid', due:new Date(2026,3,20) },
];
let activeInvoiceId = null;
let statusFilter = 'all';

function initials(name){ return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase(); }
function formatDue(d){ return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); }
function toDateInputValue(d){ return d.toISOString().slice(0, 10); }

function matchesPeriod(due, period){
  if (period === 'all') return true;
  if (period === 'year') return due.getFullYear() === TODAY.getFullYear();
  const days = Number(period);
  const diff = (due - TODAY) / 86400000;
  return diff >= 0 && diff <= days;
}

function renderInvoices(search = ''){
  const q = search.trim().toLowerCase();
  const period = document.getElementById('periodFilter').value;
  const panel = document.getElementById('invoicesPanel');
  panel.innerHTML = '';

  const counts = { all: invoices.length, paid: 0, pending: 0, overdue: 0 };
  invoices.forEach(inv => counts[inv.status]++);
  document.getElementById('countAll').textContent = counts.all;
  document.getElementById('countPaid').textContent = counts.paid;
  document.getElementById('countPending').textContent = counts.pending;
  document.getElementById('countOverdue').textContent = counts.overdue;

  invoices.forEach(inv => {
    const matchesSearch = !q || inv.client.toLowerCase().includes(q) || inv.number.includes(q);
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    const matches = matchesSearch && matchesStatus && matchesPeriod(inv.due, period);
    const row = document.createElement('div');
    row.className = 'invoice-row' + (matches ? '' : ' hidden-row');
    row.innerHTML = `
      <div class="invoice-client">
        <div class="invoice-avatar">${initials(inv.client)}</div>
        <div><div class="invoice-name">${inv.client}</div><div class="invoice-number">Invoice #${inv.number}</div></div>
      </div>
      <div class="invoice-amount">${inv.amount}</div>
      <div class="invoice-status ${inv.status}">${inv.status}</div>
      <div class="invoice-due">Due ${formatDue(inv.due)}</div>
      <div class="invoice-actions"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--ink-faint);"><path d="M9 18l6-6-6-6"/></svg></div>
    `;
    row.addEventListener('click', () => openDetail(inv.id));
    panel.appendChild(row);
  });
}

document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    statusFilter = chip.dataset.filter;
    renderInvoices(document.getElementById('topSearch').value);
  });
});
document.getElementById('periodFilter').addEventListener('change', () => renderInvoices(document.getElementById('topSearch').value));

function openDetail(id){
  activeInvoiceId = id;
  const inv = invoices.find(i => i.id === id);
  document.getElementById('detailInvNumber').textContent = `Invoice #${inv.number}`;
  document.getElementById('detailInvClient').textContent = inv.client;
  document.getElementById('detailInvAmount').value = inv.amount;
  document.getElementById('detailInvStatus').value = inv.status;
  document.getElementById('detailInvDue').value = toDateInputValue(inv.due);
  openModal(document.getElementById('invoiceDetailModal'));
}
document.getElementById('saveInvoiceBtn').addEventListener('click', () => {
  const inv = invoices.find(i => i.id === activeInvoiceId);
  inv.amount = document.getElementById('detailInvAmount').value;
  inv.status = document.getElementById('detailInvStatus').value;
  const dueVal = document.getElementById('detailInvDue').value;
  if (dueVal) inv.due = new Date(dueVal + 'T00:00:00');
  closeModal();
  renderInvoices(document.getElementById('topSearch').value);
  showToast(`Invoice #${inv.number} updated.`);
});
document.getElementById('remindInvoiceBtn').addEventListener('click', () => {
  const inv = invoices.find(i => i.id === activeInvoiceId);
  showToast(`Reminder sent to ${inv.client}.`);
});
document.getElementById('deleteInvoiceBtn').addEventListener('click', () => {
  const inv = invoices.find(i => i.id === activeInvoiceId);
  invoices = invoices.filter(i => i.id !== activeInvoiceId);
  closeModal();
  renderInvoices(document.getElementById('topSearch').value);
  showToast(`Invoice #${inv.number} deleted.`);
});

const invClient = document.getElementById('invClient');
const createInvoiceBtn = document.getElementById('createInvoiceBtn');
invClient.addEventListener('input', () => createInvoiceBtn.classList.toggle('is-disabled', invClient.value.trim().length === 0));
createInvoiceBtn.addEventListener('click', () => {
  if (createInvoiceBtn.classList.contains('is-disabled')) return;
  const client = invClient.value.trim();
  const amount = document.getElementById('invAmount').value.trim() || '$0';
  const dueVal = document.getElementById('invDue').value;
  const due = dueVal ? new Date(dueVal + 'T00:00:00') : new Date(TODAY.getTime() + 14 * 86400000);
  const id = Math.max(...invoices.map(i => i.id), 0) + 1;
  const number = String(140 + id).padStart(4, '0');
  invoices.unshift({ id, number, client, amount, status: 'pending', due });
  ['invClient','invAmount','invDue'].forEach(fid => document.getElementById(fid).value = '');
  createInvoiceBtn.classList.add('is-disabled');
  closeModal();
  renderInvoices(document.getElementById('topSearch').value);
  showToast(`Invoice #${number} created for ${client}.`);
});

document.getElementById('newBtn').addEventListener('click', () => openModal(document.getElementById('newInvoiceModal')));
document.getElementById('topSearch').addEventListener('input', (e) => renderInvoices(e.target.value));

// ===== PROFILE / SETTINGS =====
document.getElementById('profileMenuBtn').addEventListener('click', () => openModal(document.getElementById('profileModal')));
document.getElementById('settingsMenuBtn').addEventListener('click', () => openModal(document.getElementById('settingsModal')));
document.getElementById('saveProfile').addEventListener('click', () => { closeModal(); showToast('Profile updated.'); });
document.querySelectorAll('#settingsModal .switch').forEach(sw => sw.addEventListener('click', () => {
  const on = sw.classList.toggle('on'); sw.setAttribute('aria-checked', String(on));
}));

// ===== REVENUE CHART =====
const revenueData = {
  days:   [{label:'Mon',value:420},{label:'Tue',value:680},{label:'Wed',value:510},{label:'Thu',value:900},{label:'Fri',value:760},{label:'Sat',value:300},{label:'Sun',value:150}],
  weeks:  [{label:'W1',value:3800},{label:'W2',value:4200},{label:'W3',value:3950},{label:'W4',value:4700},{label:'W5',value:5100},{label:'W6',value:4900},{label:'W7',value:5600},{label:'W8',value:6200}],
  months: [{label:'Aug',value:5200},{label:'Sep',value:4800},{label:'Oct',value:6100},{label:'Nov',value:5900},{label:'Dec',value:6700},{label:'Jan',value:7200},{label:'Feb',value:6800},{label:'Mar',value:7600},{label:'Apr',value:8000},{label:'May',value:7800},{label:'Jun',value:8200},{label:'Jul',value:8600}],
  years:  [{label:'2022',value:42000},{label:'2023',value:51000},{label:'2024',value:63000},{label:'2025',value:74000},{label:'2026',value:88000}],
};
const chartTotals = { days: '$3,720 this week', weeks: '$38,450 last 8 weeks', months: '$8,600 this month', years: '$88,000 this year' };

let currentPoints = [];
const svgNS = 'http://www.w3.org/2000/svg';
const revenueSvg = document.getElementById('revenueSvg');
const chartTooltip = document.getElementById('chartTooltip');
const chartWrap = document.getElementById('chartWrap');

function renderChart(period){
  const data = revenueData[period];
  document.getElementById('revenueTotal').textContent = chartTotals[period];

  const w = 600, h = 220, padL = 38, padR = 14, padT = 14, padB = 28;
  const chartW = w - padL - padR, chartH = h - padT - padB;
  const max = Math.max(...data.map(d => d.value));
  const niceMax = Math.ceil(max / (max > 10000 ? 10000 : 100)) * (max > 10000 ? 10000 : 100);
  const step = data.length > 1 ? chartW / (data.length - 1) : 0;

  currentPoints = data.map((d, i) => ({
    x: padL + i * step,
    y: padT + chartH - (d.value / niceMax) * chartH,
    label: d.label, value: d.value
  }));

  const lineStr = currentPoints.map(p => `${p.x},${p.y}`).join(' ');
  const areaStr = `${padL},${padT + chartH} ${lineStr} ${padL + chartW},${padT + chartH}`;

  let gridHtml = '';
  [0.25, 0.5, 0.75].forEach(f => {
    const y = padT + chartH - f * chartH;
    const val = niceMax * f;
    const label = val >= 1000 ? `$${(val/1000).toFixed(val%1000===0?0:1)}k` : `$${val}`;
    gridHtml += `<line class="chart-grid-line" x1="${padL}" y1="${y}" x2="${padL+chartW}" y2="${y}"/><text class="chart-axis-label" x="${padL-6}" y="${y+3}" text-anchor="end">${label}</text>`;
  });

  const labelStep = data.length > 8 ? Math.ceil(data.length / 8) : 1;
  let axisHtml = '';
  currentPoints.forEach((p, i) => {
    if (i % labelStep === 0 || i === currentPoints.length - 1){
      axisHtml += `<text class="chart-axis-label" x="${p.x}" y="${h-8}" text-anchor="middle">${p.label}</text>`;
    }
  });

  let dotsHtml = '';
  currentPoints.forEach(p => { dotsHtml += `<circle class="chart-dot" cx="${p.x}" cy="${p.y}" r="3"/>`; });

  revenueSvg.innerHTML = `
    ${gridHtml}
    <polygon class="chart-area" points="${areaStr}"/>
    <polyline class="chart-line" points="${lineStr}"/>
    ${dotsHtml}
    ${axisHtml}
    <line class="chart-hover-line" x1="0" y1="${padT}" x2="0" y2="${padT+chartH}"/>
    <circle class="chart-hover-dot" cx="0" cy="0" r="4"/>
  `;

  const line = revenueSvg.querySelector('.chart-line');
  const len = line.getTotalLength();
  line.style.strokeDasharray = len;
  line.style.strokeDashoffset = len;
  requestAnimationFrame(() => requestAnimationFrame(() => { line.style.strokeDashoffset = 0; }));

  requestAnimationFrame(() => {
    revenueSvg.querySelector('.chart-area').classList.add('in-view');
    revenueSvg.querySelectorAll('.chart-dot').forEach(d => d.classList.add('in-view'));
  });
}

function svgPoint(evt){
  const rect = revenueSvg.getBoundingClientRect();
  const x = (evt.clientX - rect.left) / rect.width * 600;
  const y = (evt.clientY - rect.top) / rect.height * 220;
  return { x, y, rect };
}

chartWrap.addEventListener('mousemove', (evt) => {
  if (!currentPoints.length) return;
  const { x, rect } = svgPoint(evt);
  let nearest = currentPoints[0], minDist = Infinity;
  currentPoints.forEach(p => { const d = Math.abs(p.x - x); if (d < minDist){ minDist = d; nearest = p; } });

  const hoverLine = revenueSvg.querySelector('.chart-hover-line');
  const hoverDot = revenueSvg.querySelector('.chart-hover-dot');
  hoverLine.setAttribute('x1', nearest.x); hoverLine.setAttribute('x2', nearest.x); hoverLine.style.opacity = 1;
  hoverDot.setAttribute('cx', nearest.x); hoverDot.setAttribute('cy', nearest.y); hoverDot.style.opacity = 1;

  const screenX = rect.left + (nearest.x / 600) * rect.width;
  const screenY = rect.top + (nearest.y / 220) * rect.height;
  chartTooltip.style.left = `${screenX - chartWrap.getBoundingClientRect().left}px`;
  chartTooltip.style.top = `${screenY - chartWrap.getBoundingClientRect().top}px`;
  chartTooltip.textContent = `${nearest.label}: $${nearest.value.toLocaleString()}`;
  chartTooltip.classList.add('visible');
});
chartWrap.addEventListener('mouseleave', () => {
  const hoverLine = revenueSvg.querySelector('.chart-hover-line');
  const hoverDot = revenueSvg.querySelector('.chart-hover-dot');
  if (hoverLine) hoverLine.style.opacity = 0;
  if (hoverDot) hoverDot.style.opacity = 0;
  chartTooltip.classList.remove('visible');
});

document.querySelectorAll('.chart-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderChart(tab.dataset.period);
  });
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
  if (e.key.toLowerCase() === 'n'){ e.preventDefault(); openModal(document.getElementById('newInvoiceModal')); }
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
renderInvoices();
renderChart('days');