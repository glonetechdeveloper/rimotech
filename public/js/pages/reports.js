const reports = {
  revenue: {
    title: 'Revenue by client',
    columns: ['Client', 'Revenue', 'Invoices', 'Avg. deal'],
    gridTemplate: '2fr 1fr 1fr 1fr',
    data: [
      { label:'Reef Co.', value:6800, row:['Reef Co.', '$6,800', '4', '$1,700'] },
      { label:'Northline', value:5200, row:['Northline', '$5,200', '3', '$1,733'] },
      { label:'Grovepoint', value:3100, row:['Grovepoint', '$3,100', '2', '$1,550'] },
      { label:'Lumen Studio', value:2400, row:['Lumen Studio', '$2,400', '2', '$1,200'] },
      { label:'Foundry Co.', value:1600, row:['Foundry Co.', '$1,600', '1', '$1,600'] },
    ],
    prefix:'$', unit:''
  },
  time: {
    title: 'Time by project',
    columns: ['Project', 'Hours', 'Billable', 'Utilization'],
    gridTemplate: '2fr 1fr 1fr 1fr',
    data: [
      { label:'Reef Co.', value:38, row:['Reef Co.', '38h', '34h', '89%'] },
      { label:'Northline', value:29, row:['Northline', '29h', '26h', '90%'] },
      { label:'Grovepoint', value:21, row:['Grovepoint', '21h', '17h', '81%'] },
      { label:'Internal', value:14, row:['Internal', '14h', '0h', '0%'] },
    ],
    prefix:'', unit:'h'
  },
  invoices: {
    title: 'Invoice status breakdown',
    columns: ['Status', 'Amount', 'Count', 'Share'],
    gridTemplate: '2fr 1fr 1fr 1fr',
    data: [
      { label:'Paid', value:5480, row:['Paid', '$5,480', '5', '61%'] },
      { label:'Pending', value:2400, row:['Pending', '$2,400', '2', '27%'] },
      { label:'Overdue', value:1050, row:['Overdue', '$1,050', '1', '12%'] },
    ],
    prefix:'$', unit:''
  },
  tasks: {
    title: 'Task completion by member',
    columns: ['Member', 'Completed', 'On time', 'Rate'],
    gridTemplate: '2fr 1fr 1fr 1fr',
    data: [
      { label:'Joseph', value:14, row:['Joseph Prince', '14', '13', '93%'] },
      { label:'Alex', value:11, row:['Alex Kim', '11', '9', '82%'] },
      { label:'Jamie', value:9, row:['Jamie Ruiz', '9', '8', '89%'] },
      { label:'Dana', value:7, row:['Dana Osei', '7', '7', '100%'] },
    ],
    prefix:'', unit:''
  }
};

let activeReport = 'revenue';

function renderReport(){
  const report = reports[activeReport];
  document.getElementById('chartTitle').textContent = report.title;

  // ===== BAR CHART =====
  const chart = document.getElementById('barChart');
  const max = Math.max(...report.data.map(d => d.value));
  chart.innerHTML = report.data.map(d => `
    <div class="bar-col">
      <div class="bar-track">
        <div class="bar-fill" data-height="${(d.value / max) * 100}">
          <span class="bar-tooltip">${report.prefix}${d.value.toLocaleString()}${report.unit}</span>
        </div>
      </div>
      <span class="bar-label">${d.label}</span>
    </div>
  `).join('');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    chart.querySelectorAll('.bar-fill').forEach(bar => { bar.style.height = bar.dataset.height + '%'; });
  }));

  // ===== TABLE =====
  document.getElementById('tableHead').style.gridTemplateColumns = report.gridTemplate;
  document.getElementById('tableHead').innerHTML = report.columns.map(c => `<span>${c}</span>`).join('');
  const body = document.getElementById('tableBody');
  body.innerHTML = report.data.map(d => `
    <div class="report-table-row" style="grid-template-columns:${report.gridTemplate}">
      <span class="cell-strong">${d.row[0]}</span>
      <span>${d.row[1]}</span>
      <span class="cell-muted">${d.row[2]}</span>
      <span class="cell-muted">${d.row[3]}</span>
    </div>
  `).join('');
}

document.querySelectorAll('.report-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.report-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeReport = tab.dataset.report;
    renderReport();
  });
});

document.getElementById('rangeSelect').addEventListener('change', (e) => {
  showToast(`Showing data for ${e.target.options[e.target.selectedIndex].text.toLowerCase()}.`);
  renderReport();
});
document.getElementById('exportBtn').addEventListener('click', () => {
  showToast(`Exporting "${reports[activeReport].title}" as CSV…`);
});

// ===== TOP STATS COUNTERS =====
function animateStat(el, target, prefix = '', suffix = ''){
  const duration = 900;
  const start = performance.now();
  function tick(now){
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = `${prefix}${Math.round(target * eased).toLocaleString()}${suffix}`;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
animateStat(document.getElementById('statRevenue'), 19100, '$');
animateStat(document.getElementById('statHours'), 102, '', 'h');
animateStat(document.getElementById('statCompletion'), 89, '', '%');

// ===== TOAST =====
function showToast(message){
  const stack = document.getElementById('toastStack');
  const toast = document.createElement('div');
  toast.style.cssText = 'display:flex;align-items:center;gap:.6rem;background:var(--ink);color:#fff;font-size:.85rem;font-weight:600;padding:.8rem 1.1rem;border-radius:999px;box-shadow:4px 4px 0 var(--accent);animation:toastIn .3s ease both;';
  toast.innerHTML = `<span>${message}</span>`;
  stack.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
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
window.addEventListener('DOMContentLoaded', () => requestAnimationFrame(() => document.body.classList.add('loaded')));

// ===== INIT =====
renderReport();