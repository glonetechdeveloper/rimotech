// ===================================================
// GENERATIVE UI ENGINE
// Reusable rendering engine for turning onboarding
// answers into live workspace modules. Supports
// updating a module in place (slotKey) so going back
// and changing an answer replaces the existing card
// instead of duplicating it.
// ===================================================

window.GenerativeUI = (function(){

  const icons = {
    solo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.3"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"/></svg>`,
    small: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><circle cx="16" cy="9.5" r="2.4"/><path d="M3.5 20c0-3.6 2.9-6.2 6.5-6.2 1.6 0 3 .5 4.1 1.4"/><path d="M14 20c.3-2.7 2.4-4.6 5-4.6"/></svg>`,
    growing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="8" r="2.6"/><circle cx="14" cy="7" r="2.6"/><circle cx="19" cy="10" r="2.2"/><path d="M2.5 20c0-3.3 2.6-5.7 5.9-5.7 2 0 3.7.9 4.7 2.3M13 20c.3-2.6 2-4.4 4.3-4.4 1.9 0 3.5 1.2 4.1 2.9"/></svg>`,
    large: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="9" width="7" height="12"/><rect x="13" y="3" width="7" height="18"/><path d="M7 13h1M7 16h1M16 7h1M16 10h1M16 13h1"/></svg>`,
    clients: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16a1.5 1.5 0 011.5 1.5v8A1.5 1.5 0 0120 16h-9l-4.5 4v-4H4a1.5 1.5 0 01-1.5-1.5v-8A1.5 1.5 0 014 5z"/></svg>`,
    commerce: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12L12 3h7a2 2 0 012 2v7l-9 9a2 2 0 01-2.8 0l-6.2-6.2a2 2 0 010-2.8z"/><circle cx="8.5" cy="8.5" r="1.4" fill="currentColor" stroke="none"/></svg>`,
    creative: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3.5" width="18" height="17" rx="3"/><circle cx="9" cy="9.5" r="1.7"/><path d="M4 17l5-5 3.5 3.5L17 11l3 3"/></svg>`,
    consulting: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4.5h16a1.5 1.5 0 011.5 1.5v8a1.5 1.5 0 01-1.5 1.5h-8l-4.5 4v-4H4A1.5 1.5 0 012.5 14V6A1.5 1.5 0 014 4.5z"/><path d="M9.2 9.2a2.3 2.3 0 014.4.9c0 1.5-2.1 1.7-2.1 3.1"/><circle cx="11.5" cy="15.3" r=".4" fill="currentColor" stroke="none"/></svg>`,
    saas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>`,
    organized: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/><path d="M18.5 15.5l1.6 1.6 3-3.1" stroke-width="1.9"/></svg>`,
    revenue: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 6h6v6"/></svg>`,
    team: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><circle cx="16" cy="9.5" r="2.4"/><path d="M3.5 20c0-3.6 2.9-6.2 6.5-6.2 1.6 0 3 .5 4.1 1.4"/><path d="M14 20c.3-2.6 2-4.4 5-4.4"/></svg>`,
    cashflow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><circle cx="7" cy="14.5" r="1" fill="currentColor" stroke="none"/></svg>`,
    invoices: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3V3z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>`,
    subscriptions: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 0113.9-5.4M20 12a8 8 0 01-13.9 5.4"/><path d="M18 3v4h-4M6 21v-4h4"/></svg>`,
    onetime: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 016 0"/></svg>`,
    notyet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-dasharray="3 3"><circle cx="12" cy="12" r="8.5"/></svg>`,
    spreadsheets: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M3.5 9.5h17M3.5 15h17M10 3.5v17M16 3.5v17"/></svg>`,
    emailchat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`,
    othertool: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v4M15 3v4M6 7h12l-1 4a5 5 0 01-10 0L6 7z"/><path d="M12 15v6"/></svg>`,
    nothing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z"/><path d="M19 15l.7 1.9L21.5 17.5l-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7L19 15z"/></svg>`,
    insights: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.5l2.3 2.3 4.7-5.4"/></svg>`,
    ecommerce: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>`,
    warehousing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>`,
    powersystems: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    healthcare: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    agriculture: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22s5.5-2 9-7.5C14.5 9 17 2 17 2s-7 2.5-12.5 6C-1 13.5 2 22 2 22z"/><path d="M11 13c1.5 2.5 4 4.5 7 5 1-2.5 1-6-1-8.5"/></svg>`,
    artisans: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m14 7 3-3 4 4-3 3M6 21l8-8-4-4L2 17v4h4z"/></svg>`,
    services: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>`,
    fulfillment: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
    uptime: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
    coordination: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    contracts: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`
  };

  function escapeHtml(str){
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  const moduleTemplates = {
    identity: (state) => {
      const initials = (state.company.match(/\b\w/g) || ['B']).slice(0, 2).join('').toUpperCase();
      return `
        <div class="identity-mark">${initials}</div>
        <div class="module-title">${escapeHtml(state.company)}</div>
        <p class="module-sub">Your workspace name and branding, set.</p>
      `;
    },
    'structure:solo': () => `
        <div class="module-head"><span class="module-icon">${icons.solo}</span><span class="module-title">Your day</span></div>
        <ul class="mini-list">
          <li><span>Client follow-up</span><span>9:30</span></li>
          <li><span>Send invoice</span><span>11:00</span></li>
          <li><span>Focus block</span><span>2:00</span></li>
        </ul>
    `,
    'structure:small': () => `
        <div class="module-head"><span class="module-icon">${icons.small}</span><span class="module-title">Team</span></div>
        <div class="avatar-row"><span class="avatar">AK</span><span class="avatar">JM</span><span class="avatar">RT</span></div>
        <p class="module-sub">3 people, one shared calendar.</p>
    `,
    'structure:growing': () => `
        <div class="module-head"><span class="module-icon">${icons.growing}</span><span class="module-title">Team</span></div>
        <div class="avatar-row"><span class="avatar">AK</span><span class="avatar">JM</span><span class="avatar">RT</span><span class="avatar">+9</span></div>
        <ul class="mini-list" style="margin-top:.7rem;">
          <li><span>Design</span><span>4</span></li>
          <li><span>Sales</span><span>3</span></li>
          <li><span>Ops</span><span>5</span></li>
        </ul>
    `,
    'structure:large': () => `
        <div class="module-head"><span class="module-icon">${icons.large}</span><span class="module-title">Departments</span></div>
        <div class="kanban">
          <div class="kanban-col"><h4>Sales</h4><span class="kanban-count">12</span></div>
          <div class="kanban-col"><h4>Ops</h4><span class="kanban-count">18</span></div>
          <div class="kanban-col"><h4>Support</h4><span class="kanban-count">9</span></div>
        </div>
    `,
    'focus:ecommerce': () => `
        <div class="module-head"><span class="module-icon">${icons.ecommerce}</span><span class="module-title">Order fulfillment</span></div>
        <div class="kanban">
          <div class="kanban-col"><h4>New</h4><span class="kanban-count">34</span></div>
          <div class="kanban-col"><h4>Packed</h4><span class="kanban-count">20</span></div>
          <div class="kanban-col"><h4>Dispatched</h4><span class="kanban-count">68</span></div>
        </div>
        <p class="module-sub">6 low-stock SKUs flagged for reorder.</p>
    `,
    'focus:warehousing': () => `
        <div class="module-head"><span class="module-icon">${icons.warehousing}</span><span class="module-title">Bay storage & capacity</span></div>
        <div class="kanban">
          <div class="kanban-col"><h4>Zone A (Dry)</h4><span class="kanban-count">92%</span></div>
          <div class="kanban-col"><h4>Zone B (Rack)</h4><span class="kanban-count">81%</span></div>
          <div class="kanban-col"><h4>Zone C (Cold)</h4><span class="kanban-count">65%</span></div>
        </div>
        <p class="module-sub">12 inbound dock shipments scheduled today.</p>
    `,
    'focus:powersystems': () => `
        <div class="module-head"><span class="module-icon">${icons.powersystems}</span><span class="module-title">Grid telemetry & load</span></div>
        <div class="dial-wrap">
          <div class="dial" style="--pct:99"><div class="dial-inner">99%</div></div>
          <div>
            <div style="font-weight:700;font-size:.9rem;">48.6 MW Active Output</div>
            <p class="module-sub" style="margin:0;">Substation frequency 50.02 Hz · 0 fault alarms.</p>
          </div>
        </div>
    `,
    'focus:healthcare': () => `
        <div class="module-head"><span class="module-icon">${icons.healthcare}</span><span class="module-title">Patient triage & clinic</span></div>
        <div class="kanban">
          <div class="kanban-col"><h4>Triage</h4><span class="kanban-count">6</span></div>
          <div class="kanban-col"><h4>Consult</h4><span class="kanban-count">4</span></div>
          <div class="kanban-col"><h4>Observ.</h4><span class="kanban-count">8</span></div>
        </div>
        <p class="module-sub">14 on-call doctors & nursing staff active.</p>
    `,
    'focus:agriculture': () => `
        <div class="module-head"><span class="module-icon">${icons.agriculture}</span><span class="module-title">Field & silo telemetry</span></div>
        <div class="stat-row" style="display:flex;gap:1.5rem;">
          <div><div class="stat-value">68%</div><div class="stat-label">Soil moisture</div></div>
          <div><div class="stat-value">72%</div><div class="stat-label">Silo capacity</div></div>
        </div>
        <p class="module-sub">Winter wheat harvest projected +14% yield.</p>
    `,
    'focus:artisans': () => `
        <div class="module-head"><span class="module-icon">${icons.artisans}</span><span class="module-title">Workshop bench</span></div>
        <div class="kanban">
          <div class="kanban-col"><h4>Cut</h4><span class="kanban-count">3</span></div>
          <div class="kanban-col"><h4>Craft</h4><span class="kanban-count">4</span></div>
          <div class="kanban-col"><h4>Finish</h4><span class="kanban-count">2</span></div>
        </div>
        <p class="module-sub">Walnut dining table ready for final oil polish.</p>
    `,
    'focus:services': () => `
        <div class="module-head"><span class="module-icon">${icons.services}</span><span class="module-title">Client retainers</span></div>
        <div class="kanban">
          <div class="kanban-col"><h4>Leads</h4><span class="kanban-count">4</span></div>
          <div class="kanban-col"><h4>Active</h4><span class="kanban-count">6</span></div>
          <div class="kanban-col"><h4>Delivered</h4><span class="kanban-count">18</span></div>
        </div>
        <p class="module-sub">$16.4k retainer revenue MTD.</p>
    `,
    'focus:clients': () => `
        <div class="module-head"><span class="module-icon">${icons.clients}</span><span class="module-title">Client pipeline</span></div>
        <div class="kanban">
          <div class="kanban-col"><h4>Leads</h4><span class="kanban-count">6</span></div>
          <div class="kanban-col"><h4>Active</h4><span class="kanban-count">3</span></div>
          <div class="kanban-col"><h4>Done</h4><span class="kanban-count">11</span></div>
        </div>
    `,
    'focus:commerce': () => `
        <div class="module-head"><span class="module-icon">${icons.commerce}</span><span class="module-title">Revenue</span></div>
        <svg class="ledger-chart" viewBox="0 0 200 60" preserveAspectRatio="none">
          <polyline class="chart-line" points="0,50 30,42 60,44 90,28 120,32 150,14 180,18 200,6" fill="none" stroke-width="2.5"/>
        </svg>
        <p class="module-sub">Up 18% from last month.</p>
    `,
    'focus:creative': () => `
        <div class="module-head"><span class="module-icon">${icons.creative}</span><span class="module-title">Timeline</span></div>
        <div class="timeline">
          <span class="timeline-dot"></span><span class="timeline-line"></span>
          <span class="timeline-dot"></span><span class="timeline-line"></span>
          <span class="timeline-dot"></span>
        </div>
        <p class="module-sub">3 projects in progress.</p>
    `,
    'focus:consulting': () => `
        <div class="module-head"><span class="module-icon">${icons.consulting}</span><span class="module-title">Upcoming sessions</span></div>
        <ul class="mini-list">
          <li><span>Strategy call — Dana</span><span>Mon</span></li>
          <li><span>Onboarding — Reef Co.</span><span>Wed</span></li>
          <li><span>Check-in — Priya</span><span>Fri</span></li>
        </ul>
    `,
    'focus:saas': () => `
        <div class="module-head"><span class="module-icon">${icons.saas}</span><span class="module-title">Product usage</span></div>
        <div class="stat-row">
          <div class="stat"><div class="stat-value">1,204</div><div class="stat-label">Active users</div></div>
          <div class="stat"><div class="stat-value">37</div><div class="stat-label">Signups today</div></div>
        </div>
    `,
    'priority:fulfillment': () => `
        <div class="module-head"><span class="module-icon">${icons.fulfillment}</span><span class="module-title">Fulfillment flow</span></div>
        <div class="stat-row">
          <div class="stat"><div class="stat-value">99.4%</div><div class="stat-label">On-time dispatch</div></div>
          <div class="stat"><div class="stat-value">4.2h</div><div class="stat-label">Avg turnaround</div></div>
        </div>
        <p class="module-sub">Zero bottleneck across active queues.</p>
    `,
    'priority:uptime': () => `
        <div class="module-head"><span class="module-icon">${icons.uptime}</span><span class="module-title">Asset uptime</span></div>
        <div class="dial-wrap">
          <div class="dial" style="--pct:99"><div class="dial-inner">99%</div></div>
          <p class="module-sub">Zero critical downtime incidents this month.</p>
        </div>
    `,
    'priority:coordination': () => `
        <div class="module-head"><span class="module-icon">${icons.coordination}</span><span class="module-title">Crew & shift sync</span></div>
        <ul class="mini-list">
          <li><span>Morning Shift Handover</span><span style="color:var(--accent);font-weight:700;">Complete</span></li>
          <li><span>Afternoon Crew Dispatch</span><span style="color:var(--sun);font-weight:700;">14 Staff Active</span></li>
        </ul>
    `,
    'priority:organized': () => `
        <div class="module-head"><span class="module-icon">${icons.organized}</span><span class="module-title">Getting organized</span></div>
        <ul class="mini-list">
          <li><span>Centralize files</span><span>To do</span></li>
          <li><span>Set up templates</span><span>To do</span></li>
          <li><span>Inbox zero</span><span>Started</span></li>
        </ul>
    `,
    'priority:revenue': () => `
        <div class="module-head"><span class="module-icon">${icons.revenue}</span><span class="module-title">Revenue goal</span></div>
        <div class="stat-row">
          <div class="stat"><div class="stat-value">$8.2k</div><div class="stat-label">This month</div></div>
          <div class="stat"><div class="stat-value">$12k</div><div class="stat-label">Goal</div></div>
        </div>
    `,
    'priority:team': () => `
        <div class="module-head"><span class="module-icon">${icons.team}</span><span class="module-title">Team check-ins</span></div>
        <div class="avatar-row"><span class="avatar">AK</span><span class="avatar">JM</span><span class="avatar">RT</span></div>
        <p class="module-sub">Weekly sync scheduled for Monday.</p>
    `,
    'priority:cashflow': () => `
        <div class="module-head"><span class="module-icon">${icons.cashflow}</span><span class="module-title">Cash flow</span></div>
        <div class="stat-row">
          <div class="stat"><div class="stat-value">$14.6k</div><div class="stat-label">In the bank</div></div>
          <div class="stat"><div class="stat-value">$3.1k</div><div class="stat-label">Outstanding</div></div>
        </div>
    `,
    'payment:contracts': () => `
        <div class="module-head"><span class="module-icon">${icons.contracts}</span><span class="module-title">Supply contracts</span></div>
        <ul class="mini-list">
          <li><span>Bulk Agreement #842</span><span>$24,000 / mo</span></li>
          <li><span>Off-Take Supply Term</span><span>Active</span></li>
        </ul>
    `,
    'payment:direct': () => `
        <div class="module-head"><span class="module-icon">${icons.onetime}</span><span class="module-title">Direct checkout & POS</span></div>
        <div class="stat-row">
          <div class="stat"><div class="stat-value">62</div><div class="stat-label">Transactions today</div></div>
          <div class="stat"><div class="stat-value">$3.8k</div><div class="stat-label">Processed</div></div>
        </div>
    `,
    'payment:invoices': () => `
        <div class="module-head"><span class="module-icon">${icons.invoices}</span><span class="module-title">Upcoming invoices</span></div>
        <ul class="mini-list">
          <li><span>Reef Co.</span><span>$1,200</span></li>
          <li><span>Dana M.</span><span>$450</span></li>
          <li><span>Northline</span><span>$3,000</span></li>
        </ul>
    `,
    'payment:subscriptions': () => `
        <div class="module-head"><span class="module-icon">${icons.subscriptions}</span><span class="module-title">Subscriptions</span></div>
        <div class="dial-wrap">
          <div class="dial" style="--pct:78"><div class="dial-inner">78%</div></div>
          <p class="module-sub">$4.3k MRR across 92 subscribers.</p>
        </div>
    `,
    'payment:onetime': () => `
        <div class="module-head"><span class="module-icon">${icons.onetime}</span><span class="module-title">Orders</span></div>
        <div class="kanban">
          <div class="kanban-col"><h4>New</h4><span class="kanban-count">14</span></div>
          <div class="kanban-col"><h4>Shipped</h4><span class="kanban-count">32</span></div>
          <div class="kanban-col"><h4>Refunds</h4><span class="kanban-count">1</span></div>
        </div>
    `,
    'payment:notyet': () => `
        <div class="module-head"><span class="module-icon">${icons.notyet}</span><span class="module-title">Get paid</span></div>
        <p class="empty-prompt">Connect a payment method when you're ready to start charging.</p>
    `,
    'currentTool:spreadsheets': () => `
        <div class="module-head"><span class="module-icon">${icons.spreadsheets}</span><span class="module-title">Import</span></div>
        <p class="empty-prompt">We'll turn your spreadsheets into structured records automatically.</p>
    `,
    'currentTool:emailchat': () => `
        <div class="module-head"><span class="module-icon">${icons.emailchat}</span><span class="module-title">Import</span></div>
        <p class="empty-prompt">We'll pull the key threads into one shared inbox.</p>
    `,
    'currentTool:othertool': () => `
        <div class="module-head"><span class="module-icon">${icons.othertool}</span><span class="module-title">Connect</span></div>
        <p class="empty-prompt">Link your existing tool anytime from Settings — nothing's lost.</p>
    `,
    'currentTool:nothing': () => `
        <div class="module-head"><span class="module-icon">${icons.nothing}</span><span class="module-title">Fresh start</span></div>
        <p class="empty-prompt">No migration needed — everything begins empty and tidy.</p>
    `,
    insights: () => `
        <div class="module-head"><span class="module-icon">${icons.insights}</span><span class="module-title">Readiness</span></div>
        <div class="dial-wrap">
          <div class="dial" style="--pct:92"><div class="dial-inner">92%</div></div>
          <p class="module-sub">You're all set to get started.</p>
        </div>
    `
  };

  function renderIcons(root){
    root.querySelectorAll('[data-icon]').forEach(el => {
      el.innerHTML = icons[el.dataset.icon] || '';
    });
  }

  // slotKey ties a module to a specific question (e.g. 'structure', 'focus').
  // If a module already exists for that slot, its content is replaced in
  // place (with a brief highlight flash) instead of appending a duplicate —
  // this is what makes going back and changing an answer feel correct.
  function renderModule(fieldEl, type, state, slotKey){
    const empty = fieldEl.querySelector('.canvas-empty');
    if (empty) empty.remove();

    let el = slotKey ? fieldEl.querySelector(`[data-slot="${slotKey}"]`) : null;

    if (el){
      el.innerHTML = moduleTemplates[type](state);
      el.classList.remove('module-pulse');
      void el.offsetWidth; // force reflow so the animation restarts
      el.classList.add('module-pulse');
    } else {
      el = document.createElement('div');
      el.className = 'module';
      if (slotKey) el.dataset.slot = slotKey;
      el.innerHTML = moduleTemplates[type](state);
      fieldEl.appendChild(el);
    }
  }

  return { icons, renderIcons, renderModule, moduleTemplates };

})();