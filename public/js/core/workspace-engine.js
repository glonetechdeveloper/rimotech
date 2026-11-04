// =============================================================================
// RIMOTECH BUSINESS OS — WORKSPACE GENERATION ENGINE
// Deterministic selective logic (no AI required) that tailors workspace
// navigation, KPIs, and dashboard modules based on:
// 1. Industry / Sector
// 2. Team Size & Organization Structure
// 3. Operational Priorities
// 4. Payment / Billing Model
// =============================================================================

window.WorkspaceEngine = (function(){

  // Universal and industry-specific SVG icons
  const SVG = {
    ecommerce: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>`,
    warehousing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>`,
    powersystems: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    healthcare: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    agriculture: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22s5.5-2 9-7.5C14.5 9 17 2 17 2s-7 2.5-12.5 6C-1 13.5 2 22 2 22z"/><path d="M11 13c1.5 2.5 4 4.5 7 5 1-2.5 1-6-1-8.5"/></svg>`,
    artisans: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m14 7 3-3 4 4-3 3M6 21l8-8-4-4L2 17v4h4z"/></svg>`,
    services: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>`,
    saas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>`,
    dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg>`,
    inventory: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`,
    dispatch: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
    telemetry: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
    clinical: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    field: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 000 20M2 12h20"/></svg>`,
    workshop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
    crm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
    tasks: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12l2.5 2.5L16 9"/></svg>`,
    finances: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l3 3v15l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3V3z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>`,
    shifts: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1 1.55V21a2 2 0 01-4 0v-.09a1.7 1.7 0 00-1-1.55 1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.34-1.87 1.7 1.7 0 00-1.55-1H3a2 2 0 010-4h.09a1.7 1.7 0 001.55-1 1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06a1.7 1.7 0 001.87.34H9a1.7 1.7 0 001-1.55V3a2 2 0 014 0v.09a1.7 1.7 0 001 1.55 1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06a1.7 1.7 0 00-.34 1.87V9a1.7 1.7 0 001.55 1H21a2 2 0 010 4h-.09a1.7 1.7 0 00-1.55 1z"/></svg>`,
    documents: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`
  };

  // ===========================================================================
  // INDUSTRY BLUEPRINTS (Deterministic Feature & Layout Mapping)
  // ===========================================================================
  const BLUEPRINTS = {
    ecommerce: {
      id: 'ecommerce',
      label: 'E-Commerce & Retail',
      role: 'Store Operations',
      badge: 'Order Funnel & Stock Engine',
      stats: [
        { label: 'Unfulfilled Orders', value: 34, decimals: 0, prefix: '', suffix: '', delta: '8 priority' },
        { label: 'Gross Sales (MTD)', value: 42.8, decimals: 1, prefix: '$', suffix: 'k', delta: '+22.4%' },
        { label: 'Low Stock SKUs', value: 6, decimals: 0, prefix: '', suffix: '', delta: 'Reorder alert', isDown: true },
        { label: 'Cart Conversion', value: 3.8, decimals: 1, prefix: '', suffix: '%', delta: '+0.6% vs last week' }
      ],
      nav: [
        { key: 'dashboard', label: 'Dashboard', icon: SVG.dashboard, href: './dashboard.html', active: true },
        { key: 'orders', label: 'Orders & Fulfillment', icon: SVG.ecommerce, href: './tasks.html' },
        { key: 'inventory', label: 'Inventory & SKUs', icon: SVG.inventory, href: './files.html' },
        { key: 'finances', label: 'Store Revenue', icon: SVG.finances, href: './finances.html' },
        { key: 'calendar', label: 'Campaigns & Drops', icon: SVG.calendar, href: './calendar.html' },
        { key: 'settings', label: 'Store Settings', icon: SVG.settings, href: './settings.html' }
      ],
      modules: [
        {
          id: 'fulfillment',
          title: 'Order Fulfillment Pipeline',
          icon: SVG.ecommerce,
          html: `
            <div class="kanban">
              <div class="kanban-col"><h4>Awaiting Pick</h4><span class="kanban-count">14</span></div>
              <div class="kanban-col"><h4>Packed</h4><span class="kanban-count">20</span></div>
              <div class="kanban-col"><h4>Dispatched</h4><span class="kanban-count">68</span></div>
            </div>
            <p class="module-sub">FedEx & DHL pick-up scheduled at 16:30 today.</p>
          `
        },
        {
          id: 'inventory_alert',
          title: 'Inventory & Stock Watch',
          icon: SVG.inventory,
          html: `
            <ul class="mini-list">
              <li><span>Hydro Flask 750ml (Black)</span><span style="color:var(--danger);font-weight:700;">4 left</span></li>
              <li><span>Merino Wool Beanie</span><span style="color:var(--danger);font-weight:700;">8 left</span></li>
              <li><span>Leather Tote (Caramel)</span><span style="color:var(--ink-soft);">29 in stock</span></li>
            </ul>
            <p class="module-sub">Automated PO re-order draft ready for supplier approval.</p>
          `
        },
        {
          id: 'revenue_trend',
          title: 'Daily Channel Revenue',
          icon: SVG.finances,
          html: `
            <svg class="ledger-chart" viewBox="0 0 200 60" preserveAspectRatio="none">
              <polyline class="chart-line" points="0,48 30,36 60,40 90,22 120,26 150,12 180,14 200,4" fill="none" stroke-width="2.5"/>
            </svg>
            <div class="stat-row" style="margin-top:.7rem;display:flex;justify-content:space-between;">
              <div><span style="font-size:.72rem;color:var(--ink-faint);">SHOPIFY</span><div style="font-weight:800;font-size:1.1rem;">$28.4k</div></div>
              <div><span style="font-size:.72rem;color:var(--ink-faint);">AMAZON</span><div style="font-weight:800;font-size:1.1rem;">$14.4k</div></div>
            </div>
          `
        },
        {
          id: 'courier_dispatch',
          title: 'Dispatch & Return Tracking',
          icon: SVG.dispatch,
          html: `
            <ul class="mini-list">
              <li><span>#ORD-9021 · Express to Chicago</span><span style="color:var(--accent);font-weight:600;">Out for Delivery</span></li>
              <li><span>#ORD-9018 · Standard to Austin</span><span style="color:var(--ink-soft);font-weight:600;">In Transit</span></li>
              <li><span>#RET-0412 · Return inspection</span><span style="color:var(--sun);font-weight:700;">Awaiting QA</span></li>
            </ul>
          `
        }
      ]
    },

    warehousing: {
      id: 'warehousing',
      label: 'Warehousing & Logistics',
      role: 'Warehouse Operations Director',
      badge: 'Bin Storage & Fleet Logistics',
      stats: [
        { label: 'Bay Capacity Utilization', value: 84.6, decimals: 1, prefix: '', suffix: '%', delta: '154 bays free' },
        { label: 'Inbound Dock Shipments', value: 12, decimals: 0, prefix: '', suffix: '', delta: '4 arriving next 2h' },
        { label: 'Outbound Pallets (Today)', value: 248, decimals: 0, prefix: '', suffix: '', delta: '+18% vs avg' },
        { label: 'Fulfillment Accuracy', value: 99.8, decimals: 1, prefix: '', suffix: '%', delta: 'Zero misplaced SKUs' }
      ],
      nav: [
        { key: 'dashboard', label: 'Warehouse Hub', icon: SVG.dashboard, href: './dashboard.html', active: true },
        { key: 'bays', label: 'Bay & Rack Matrix', icon: SVG.warehousing, href: './files.html' },
        { key: 'inbound', label: 'Inbound Dock & QA', icon: SVG.inventory, href: './tasks.html' },
        { key: 'fleet', label: 'Fleet & Dispatch', icon: SVG.dispatch, href: './track.html' },
        { key: 'shifts', label: 'Floor Shifts & Crew', icon: SVG.shifts, href: './calendar.html' },
        { key: 'finances', label: 'Freight & Billing', icon: SVG.finances, href: './finances.html' },
        { key: 'settings', label: 'Facility Settings', icon: SVG.settings, href: './settings.html' }
      ],
      modules: [
        {
          id: 'bay_allocation',
          title: 'Bay Storage Occupancy (Zones A–D)',
          icon: SVG.warehousing,
          html: `
            <div class="kanban">
              <div class="kanban-col"><h4>Zone A (Dry)</h4><span class="kanban-count">92%</span></div>
              <div class="kanban-col"><h4>Zone B (Rack)</h4><span class="kanban-count">81%</span></div>
              <div class="kanban-col"><h4>Zone C (Cold)</h4><span class="kanban-count">65%</span></div>
            </div>
            <p class="module-sub">Forklift crew #2 clearing Aisle 4 for 14:00 bulk container delivery.</p>
          `
        },
        {
          id: 'dock_receiving',
          title: 'Dock Inbound Queue',
          icon: SVG.inventory,
          html: `
            <ul class="mini-list">
              <li><span>Bay 3: Volvo FH16 (Freightliners)</span><span style="color:var(--accent);font-weight:700;">Unloading</span></li>
              <li><span>Bay 5: Scania R450 (Apex Logistics)</span><span style="color:var(--sun);font-weight:700;">Paperwork Check</span></li>
              <li><span>Bay 8: DAF XF (Northline Trans)</span><span style="color:var(--ink-soft);">ETA 15:15</span></li>
            </ul>
          `
        },
        {
          id: 'forklift_maintenance',
          title: 'Equipment & Lift Health',
          icon: SVG.telemetry,
          html: `
            <div class="dial-wrap">
              <div class="dial" style="--pct:94"><div class="dial-inner">94%</div></div>
              <div>
                <div style="font-weight:700;font-size:.9rem;">7 of 8 Lifts Active</div>
                <p class="module-sub" style="margin:0;">Lift #4 in scheduled battery replacement.</p>
              </div>
            </div>
          `
        },
        {
          id: 'dispatch_manifest',
          title: 'Outgoing Carrier Manifests',
          icon: SVG.dispatch,
          html: `
            <ul class="mini-list">
              <li><span>Route 12 (Midwest Depot)</span><span>48 Pallets · Loaded</span></li>
              <li><span>Route 07 (Regional Hub)</span><span>32 Pallets · Staged</span></li>
              <li><span>Route 19 (Air Cargo Terminal)</span><span>14 Pallets · Scanning</span></li>
            </ul>
          `
        }
      ]
    },

    powersystems: {
      id: 'powersystems',
      label: 'Power Systems & Energy',
      role: 'Grid Operations Chief',
      badge: 'High Voltage Telemetry & Dispatch',
      stats: [
        { label: 'Active Grid Output', value: 48.6, decimals: 1, prefix: '', suffix: ' MW', delta: 'Load matched' },
        { label: 'Substation Frequency', value: 50.02, decimals: 2, prefix: '', suffix: ' Hz', delta: 'Nominal stability' },
        { label: 'Sensor Alarms / Faults', value: 0, decimals: 0, prefix: '', suffix: '', delta: 'All feeders clear' },
        { label: 'Solar / Turbine Health', value: 99.4, decimals: 1, prefix: '', suffix: '%', delta: '+0.2% efficiency' }
      ],
      nav: [
        { key: 'dashboard', label: 'Grid Telemetry Hub', icon: SVG.dashboard, href: './dashboard.html', active: true },
        { key: 'substations', label: 'Substation Monitoring', icon: SVG.powersystems, href: './files.html' },
        { key: 'fieldorders', label: 'High-Voltage Work Orders', icon: SVG.tasks, href: './tasks.html' },
        { key: 'crews', label: 'Field Engineers on Call', icon: SVG.shifts, href: './calendar.html' },
        { key: 'outages', label: 'Downtime & Incident Logs', icon: SVG.telemetry, href: './activities.html' },
        { key: 'ppa', label: 'PPA Contracts & Tariffs', icon: SVG.finances, href: './finances.html' },
        { key: 'settings', label: 'SCADA Settings', icon: SVG.settings, href: './settings.html' }
      ],
      modules: [
        {
          id: 'grid_telemetry',
          title: 'Substation Feeders & Load Balance',
          icon: SVG.powersystems,
          html: `
            <svg class="ledger-chart" viewBox="0 0 200 60" preserveAspectRatio="none">
              <polyline class="chart-line" points="0,32 25,30 50,34 75,28 100,26 125,29 150,22 175,25 200,20" fill="none" stroke-width="2.5"/>
            </svg>
            <div class="stat-row" style="margin-top:.7rem;display:flex;justify-content:space-between;">
              <div><span style="font-size:.72rem;color:var(--ink-faint);">FEEDER A1 (NORTH)</span><div style="font-weight:800;font-size:1.05rem;">24.2 MW</div></div>
              <div><span style="font-size:.72rem;color:var(--ink-faint);">FEEDER B3 (INDUSTRIAL)</span><div style="font-weight:800;font-size:1.05rem;">24.4 MW</div></div>
            </div>
          `
        },
        {
          id: 'field_work_orders',
          title: 'High-Voltage Maintenance Orders',
          icon: SVG.tasks,
          html: `
            <ul class="mini-list">
              <li><span>Substation 4B Transformer Oil Test</span><span style="color:var(--accent);font-weight:700;">In Progress</span></li>
              <li><span>Inverter Bank 12 Infrared Thermal Scan</span><span style="color:var(--sun);font-weight:700;">Scheduled 15:00</span></li>
              <li><span>Feeder 09 Lightning Arrester Check</span><span style="color:var(--ink-soft);">Completed</span></li>
            </ul>
          `
        },
        {
          id: 'telemetry_status',
          title: 'Asset Availability Index',
          icon: SVG.telemetry,
          html: `
            <div class="dial-wrap">
              <div class="dial" style="--pct:99"><div class="dial-inner">99%</div></div>
              <div>
                <div style="font-weight:700;font-size:.9rem;">16 Inverters Online</div>
                <p class="module-sub" style="margin:0;">No harmonic distortion detected across main busbar.</p>
              </div>
            </div>
          `
        },
        {
          id: 'ppa_billing',
          title: 'Power Purchase & Off-Take Ledger',
          icon: SVG.finances,
          html: `
            <div class="stat-row" style="display:flex;gap:1.5rem;">
              <div><div style="font-size:.7rem;color:var(--ink-faint);text-transform:uppercase;">Daily Generation</div><div style="font-weight:800;font-size:1.3rem;">384 MWh</div></div>
              <div><div style="font-size:.7rem;color:var(--ink-faint);text-transform:uppercase;">Est. Tariff Billing</div><div style="font-weight:800;font-size:1.3rem;">$32,640</div></div>
            </div>
            <p class="module-sub">Monthly settlement report automatically compiled for grid operator.</p>
          `
        }
      ]
    },

    healthcare: {
      id: 'healthcare',
      label: 'Healthcare & Clinics',
      role: 'Clinical Director & Lead MD',
      badge: 'Patient Flow & Clinical Triage',
      stats: [
        { label: 'Patients Treated Today', value: 42, decimals: 0, prefix: '', suffix: '', delta: '6 in triage queue' },
        { label: 'Clinic Bed Occupancy', value: 78, decimals: 0, prefix: '', suffix: '%', delta: '4 beds available' },
        { label: 'On-Call Doctors & Staff', value: 14, decimals: 0, prefix: '', suffix: '', delta: 'Shift switch in 3h' },
        { label: 'Lab & Diagnostic Turnaround', value: 45, decimals: 0, prefix: '', suffix: ' min', delta: '-12 min vs avg' }
      ],
      nav: [
        { key: 'dashboard', label: 'Clinic Overview', icon: SVG.dashboard, href: './dashboard.html', active: true },
        { key: 'patients', label: 'Patient Triage & Intake', icon: SVG.clinical, href: './tasks.html' },
        { key: 'calendar', label: 'Consultations & Surgery', icon: SVG.calendar, href: './calendar.html' },
        { key: 'emr', label: 'Electronic Medical Records', icon: SVG.documents, href: './files.html' },
        { key: 'shifts', label: 'Physician Shift Roster', icon: SVG.shifts, href: './activities.html' },
        { key: 'claims', label: 'Billing & Insurance Claims', icon: SVG.finances, href: './finances.html' },
        { key: 'settings', label: 'Compliance & HIPAA', icon: SVG.settings, href: './settings.html' }
      ],
      modules: [
        {
          id: 'patient_triage',
          title: 'Live Patient Intake Queue',
          icon: SVG.clinical,
          html: `
            <div class="kanban">
              <div class="kanban-col"><h4>Triage Waiting</h4><span class="kanban-count">6</span></div>
              <div class="kanban-col"><h4>In Consult</h4><span class="kanban-count">4</span></div>
              <div class="kanban-col"><h4>Observation</h4><span class="kanban-count">8</span></div>
            </div>
            <p class="module-sub">Average wait time currently 11 minutes.</p>
          `
        },
        {
          id: 'doctor_roster',
          title: 'Attending Doctors & Shift Status',
          icon: SVG.shifts,
          html: `
            <ul class="mini-list">
              <li><span>Dr. Amina Okafor (Cardiology)</span><span style="color:var(--accent);font-weight:700;">In Room 102</span></li>
              <li><span>Dr. Daniel Vance (Pediatrics)</span><span style="color:var(--accent);font-weight:700;">Reviewing Labs</span></li>
              <li><span>Nurse Lead Marcus (ICU Ward)</span><span style="color:var(--ink-soft);">Shift until 19:00</span></li>
            </ul>
          `
        },
        {
          id: 'diagnostic_status',
          title: 'Laboratory & Radiology Results',
          icon: SVG.documents,
          html: `
            <ul class="mini-list">
              <li><span>Blood Panel #4092 (Stat)</span><span style="color:var(--accent);font-weight:700;">Ready for MD</span></li>
              <li><span>Chest X-Ray #4088</span><span style="color:var(--ink-soft);">Uploaded to EMR</span></li>
              <li><span>Lipid Profile #4095</span><span style="color:var(--sun);font-weight:700;">Processing</span></li>
            </ul>
          `
        },
        {
          id: 'insurance_claims',
          title: 'Insurance Claim Authorization',
          icon: SVG.finances,
          html: `
            <div class="stat-row" style="display:flex;gap:1.5rem;">
              <div><div style="font-size:.7rem;color:var(--ink-faint);text-transform:uppercase;">Pending Payer Approval</div><div style="font-weight:800;font-size:1.2rem;">$18,400</div></div>
              <div><div style="font-size:.7rem;color:var(--ink-faint);text-transform:uppercase;">Copays Collected</div><div style="font-weight:800;font-size:1.2rem;">$3,250</div></div>
            </div>
          `
        }
      ]
    },

    agriculture: {
      id: 'agriculture',
      label: 'Agriculture & Farming',
      role: 'Farm Operations Director',
      badge: 'Crop Cycles & Silo Telemetry',
      stats: [
        { label: 'Harvest Projected Yield', value: 124, decimals: 0, prefix: '', suffix: ' Tons', delta: '+14% vs last cycle' },
        { label: 'Soil Moisture Level', value: 68, decimals: 0, prefix: '', suffix: '%', delta: 'Optimal hydration' },
        { label: 'Grain Silo Capacity', value: 72, decimals: 0, prefix: '', suffix: '%', delta: '280 tons available' },
        { label: 'Active Field Equipment', value: 8, decimals: 0, prefix: '', suffix: ' Units', delta: 'Combine #3 in Field 2' }
      ],
      nav: [
        { key: 'dashboard', label: 'Farm Central Hub', icon: SVG.dashboard, href: './dashboard.html', active: true },
        { key: 'fields', label: 'Field Map & Soil Telemetry', icon: SVG.agriculture, href: './files.html' },
        { key: 'harvest', label: 'Harvest & Crop Schedule', icon: SVG.calendar, href: './tasks.html' },
        { key: 'livestock', label: 'Livestock & Health Census', icon: SVG.field, href: './track.html' },
        { key: 'silos', label: 'Storage & Cold Chain', icon: SVG.warehousing, href: './files.html' },
        { key: 'grainsales', label: 'Commodity Contracts & Sales', icon: SVG.finances, href: './finances.html' },
        { key: 'settings', label: 'Farm Settings', icon: SVG.settings, href: './settings.html' }
      ],
      modules: [
        {
          id: 'soil_telemetry',
          title: 'Field Telemetry & Irrigation Cycles',
          icon: SVG.agriculture,
          html: `
            <div class="kanban">
              <div class="kanban-col"><h4>North Field (Corn)</h4><span class="kanban-count">71% moist</span></div>
              <div class="kanban-col"><h4>South Field (Soy)</h4><span class="kanban-count">64% moist</span></div>
              <div class="kanban-col"><h4>Greenhouse 1</h4><span class="kanban-count">24°C / 78%</span></div>
            </div>
            <p class="module-sub">Next automated drip irrigation cycle scheduled for 21:00.</p>
          `
        },
        {
          id: 'harvest_forecast',
          title: 'Crop Maturity & Harvest Timeline',
          icon: SVG.calendar,
          html: `
            <ul class="mini-list">
              <li><span>Winter Wheat (Field 4)</span><span style="color:var(--accent);font-weight:700;">Harvest in 12 days</span></li>
              <li><span>Soybeans (Field 2)</span><span style="color:var(--ink-soft);">Flowering stage</span></li>
              <li><span>Organic Apples (Orchard A)</span><span style="color:var(--accent);font-weight:700;">Picking active</span></li>
            </ul>
          `
        },
        {
          id: 'silo_fill_rates',
          title: 'Grain Silo & Bulk Storage Status',
          icon: SVG.warehousing,
          html: `
            <div class="dial-wrap">
              <div class="dial" style="--pct:72"><div class="dial-inner">72%</div></div>
              <div>
                <div style="font-weight:700;font-size:.9rem;">Silo #1 & #2 Ready</div>
                <p class="module-sub" style="margin:0;">Grain aeration fans operating normally. Moisture content 13.2%.</p>
              </div>
            </div>
          `
        },
        {
          id: 'bulk_contracts',
          title: 'Commodity Delivery Contracts',
          icon: SVG.finances,
          html: `
            <ul class="mini-list">
              <li><span>Cargill Grain Agreement (50 Tons)</span><span style="color:var(--accent);font-weight:700;">Staged for pickup</span></li>
              <li><span>Local Co-op Dairy Delivery</span><span style="color:var(--ink-soft);">Daily recurring</span></li>
            </ul>
          `
        }
      ]
    },

    artisans: {
      id: 'artisans',
      label: 'Artisans & Custom Trades',
      role: 'Master Craftsman & Workshop Lead',
      badge: 'Custom Commissions & Bench Queue',
      stats: [
        { label: 'Active Work Orders', value: 9, decimals: 0, prefix: '', suffix: '', delta: '3 ready for client review' },
        { label: 'Raw Materials in Stock', value: 88, decimals: 0, prefix: '', suffix: '%', delta: 'Walnut & brass secured' },
        { label: 'Milestone Payments Due', value: 4.8, decimals: 1, prefix: '$', suffix: 'k', delta: 'Upon delivery' },
        { label: 'Workshop Turnaround', value: 6.2, decimals: 1, prefix: '', suffix: ' days', delta: '-1.5 days vs avg' }
      ],
      nav: [
        { key: 'dashboard', label: 'Workshop Bench', icon: SVG.dashboard, href: './dashboard.html', active: true },
        { key: 'commissions', label: 'Custom Commissions', icon: SVG.workshop, href: './tasks.html' },
        { key: 'materials', label: 'Raw Materials & Parts', icon: SVG.inventory, href: './files.html' },
        { key: 'quotes', label: 'Estimates & Invoices', icon: SVG.finances, href: './finances.html' },
        { key: 'calendar', label: 'Delivery Schedule', icon: SVG.calendar, href: './calendar.html' },
        { key: 'settings', label: 'Workshop Settings', icon: SVG.settings, href: './settings.html' }
      ],
      modules: [
        {
          id: 'custom_bench',
          title: 'Bench Work Order Pipeline',
          icon: SVG.workshop,
          html: `
            <div class="kanban">
              <div class="kanban-col"><h4>Design & Cut</h4><span class="kanban-count">3</span></div>
              <div class="kanban-col"><h4>Assembly / Craft</h4><span class="kanban-count">4</span></div>
              <div class="kanban-col"><h4>Finishing</h4><span class="kanban-count">2</span></div>
            </div>
            <p class="module-sub">Bespoke Dining Table (Walnut) ready for oil coat and polish.</p>
          `
        },
        {
          id: 'material_supplies',
          title: 'Workshop Raw Material Stocks',
          icon: SVG.inventory,
          html: `
            <ul class="mini-list">
              <li><span>Kiln-Dried American Walnut</span><span style="color:var(--accent);font-weight:700;">120 Board Feet</span></li>
              <li><span>Solid Brass Hardware Rods</span><span style="color:var(--sun);font-weight:700;">Low (Order placed)</span></li>
              <li><span>Hand-Tanned Italian Leather</span><span style="color:var(--ink-soft);">4 Hides in stock</span></li>
            </ul>
          `
        },
        {
          id: 'client_proofing',
          title: 'Client Milestone Approvals',
          icon: SVG.crm,
          html: `
            <ul class="mini-list">
              <li><span>Custom Credenza — Sarah K.</span><span style="color:var(--accent);font-weight:700;">Photo Proof Approved</span></li>
              <li><span>Bespoke Brass Pendant — Studio 9</span><span style="color:var(--sun);font-weight:700;">Awaiting Sign-off</span></li>
            </ul>
          `
        },
        {
          id: 'quick_invoicing',
          title: 'Instant Job Cost & Balance Due',
          icon: SVG.finances,
          html: `
            <div class="stat-row" style="display:flex;gap:1.5rem;">
              <div><div style="font-size:.7rem;color:var(--ink-faint);text-transform:uppercase;">Deposits Collected</div><div style="font-weight:800;font-size:1.2rem;">$7,400</div></div>
              <div><div style="font-size:.7rem;color:var(--ink-faint);text-transform:uppercase;">Final Delivery Balance</div><div style="font-weight:800;font-size:1.2rem;">$4,850</div></div>
            </div>
          `
        }
      ]
    },

    services: {
      id: 'services',
      label: 'Professional Services & Consulting',
      role: 'Managing Partner',
      badge: 'Client Retainers & Project Pipeline',
      stats: [
        { label: 'Active Client Accounts', value: 11, decimals: 0, prefix: '', suffix: '', delta: '+2 this quarter' },
        { label: 'Retainer Revenue (MTD)', value: 16.4, decimals: 1, prefix: '$', suffix: 'k', delta: '+14% vs target' },
        { label: 'Billable Hours Logged', value: 142, decimals: 0, prefix: '', suffix: ' hrs', delta: '88% utilization' },
        { label: 'Proposals Awaiting Close', value: 4, decimals: 0, prefix: '', suffix: '', delta: '$28k pipeline value' }
      ],
      nav: [
        { key: 'dashboard', label: 'Executive Dashboard', icon: SVG.dashboard, href: './dashboard.html', active: true },
        { key: 'crm', label: 'Client Pipeline & CRM', icon: SVG.crm, href: './crm.html' },
        { key: 'projects', label: 'Deliverables & Briefs', icon: SVG.tasks, href: './tasks.html' },
        { key: 'hours', label: 'Time Tracking & Hours', icon: SVG.shifts, href: './track.html' },
        { key: 'invoicing', label: 'Invoices & Retainers', icon: SVG.finances, href: './finances.html' },
        { key: 'calendar', label: 'Client Syncs & Calls', icon: SVG.calendar, href: './calendar.html' },
        { key: 'settings', label: 'Settings', icon: SVG.settings, href: './settings.html' }
      ],
      modules: [
        {
          id: 'client_pipeline',
          title: 'Client Pipeline & Stages',
          icon: SVG.crm,
          html: `
            <div class="kanban">
              <div class="kanban-col"><h4>Lead / Brief</h4><span class="kanban-count">4</span></div>
              <div class="kanban-col"><h4>Active Sprint</h4><span class="kanban-count">6</span></div>
              <div class="kanban-col"><h4>Delivered</h4><span class="kanban-count">18</span></div>
            </div>
            <p class="module-sub">Reef Co. Q4 brand revamp ready for review today.</p>
          `
        },
        {
          id: 'retainer_revenue',
          title: 'Monthly Recurring Retainers',
          icon: SVG.finances,
          html: `
            <ul class="mini-list">
              <li><span>Apex Global — Growth Retainer</span><span>$5,000/mo</span></li>
              <li><span>Northline Media — Design Advisory</span><span>$3,500/mo</span></li>
              <li><span>Solstice Health — Strategy Sprint</span><span>$4,200/mo</span></li>
            </ul>
          `
        },
        {
          id: 'billable_utilization',
          title: 'Team Billable Capacity',
          icon: SVG.telemetry,
          html: `
            <div class="dial-wrap">
              <div class="dial" style="--pct:88"><div class="dial-inner">88%</div></div>
              <div>
                <div style="font-weight:700;font-size:.9rem;">Healthy Utilization</div>
                <p class="module-sub" style="margin:0;">12 hours remaining for sprint capacity before over-allocation.</p>
              </div>
            </div>
          `
        },
        {
          id: 'upcoming_reviews',
          title: 'Upcoming Client Reviews',
          icon: SVG.calendar,
          html: `
            <ul class="mini-list">
              <li><span>Strategy sync — Apex Global</span><span>Today 14:00</span></li>
              <li><span>Deliverable walkthrough — Reef Co.</span><span>Tomorrow 11:30</span></li>
            </ul>
          `
        }
      ]
    },

    saas: {
      id: 'saas',
      label: 'Software & Technology',
      role: 'Product Lead / Founder',
      badge: 'Product Usage & MRR Engine',
      stats: [
        { label: 'Monthly Recurring Rev (MRR)', value: 24.8, decimals: 1, prefix: '$', suffix: 'k', delta: '+16.2% MoM' },
        { label: 'Active Monthly Users', value: 2480, decimals: 0, prefix: '', suffix: '', delta: '+340 signups' },
        { label: 'Net Monthly Churn', value: 1.2, decimals: 1, prefix: '', suffix: '%', delta: 'Well below 2% ceiling' },
        { label: 'API & Platform Uptime', value: 99.98, decimals: 2, prefix: '', suffix: '%', delta: 'All endpoints green' }
      ],
      nav: [
        { key: 'dashboard', label: 'Platform Hub', icon: SVG.dashboard, href: './dashboard.html', active: true },
        { key: 'usage', label: 'User Activity & Product', icon: SVG.saas, href: './track.html' },
        { key: 'subscribers', label: 'Subscribers & CRM', icon: SVG.crm, href: './crm.html' },
        { key: 'billing', label: 'Stripe Subscriptions', icon: SVG.finances, href: './finances.html' },
        { key: 'sprints', label: 'Feature Roadmaps', icon: SVG.tasks, href: './tasks.html' },
        { key: 'settings', label: 'API Keys & Org', icon: SVG.settings, href: './settings.html' }
      ],
      modules: [
        {
          id: 'mrr_growth',
          title: 'Subscription MRR Growth',
          icon: SVG.finances,
          html: `
            <svg class="ledger-chart" viewBox="0 0 200 60" preserveAspectRatio="none">
              <polyline class="chart-line" points="0,52 30,44 60,40 90,32 120,28 150,18 180,12 200,6" fill="none" stroke-width="2.5"/>
            </svg>
            <p class="module-sub">Annual contract value (ARR) run-rate currently at $297k.</p>
          `
        },
        {
          id: 'active_sessions',
          title: 'Product Usage & Conversion',
          icon: SVG.saas,
          html: `
            <div class="stat-row" style="display:flex;gap:1.5rem;">
              <div><div style="font-size:.7rem;color:var(--ink-faint);text-transform:uppercase;">Daily Active Users</div><div style="font-weight:800;font-size:1.25rem;">1,420</div></div>
              <div><div style="font-size:.7rem;color:var(--ink-faint);text-transform:uppercase;">Trial to Paid</div><div style="font-weight:800;font-size:1.25rem;">14.2%</div></div>
            </div>
          `
        },
        {
          id: 'server_health',
          title: 'Infrastructure & Latency',
          icon: SVG.telemetry,
          html: `
            <div class="dial-wrap">
              <div class="dial" style="--pct:99"><div class="dial-inner">99%</div></div>
              <div>
                <div style="font-weight:700;font-size:.9rem;">42ms Median Response</div>
                <p class="module-sub" style="margin:0;">US-East & EU-West edge clusters running smoothly.</p>
              </div>
            </div>
          `
        },
        {
          id: 'roadmap_sprints',
          title: 'Feature Release Velocity',
          icon: SVG.tasks,
          html: `
            <ul class="mini-list">
              <li><span>Webhook V2 Architecture</span><span style="color:var(--accent);font-weight:700;">Code Review</span></li>
              <li><span>Self-Serve SSO (SAML)</span><span style="color:var(--sun);font-weight:700;">Testing</span></li>
              <li><span>Export to Parquet / CSV</span><span style="color:var(--ink-soft);">Shipped</span></li>
            </ul>
          `
        }
      ]
    }
  };

  // ===========================================================================
  // TEAM SIZE MODIFICATION LOGIC (Eliminates bloat based on organization scale)
  // ===========================================================================
  function applyTeamSizeModifiers(blueprint, teamSize){
    // Deep clone to prevent mutating master blueprint
    const bp = JSON.parse(JSON.stringify(blueprint));

    if (teamSize === 'solo'){
      // Solopreneurs / Artisans:
      // Remove shift scheduling, team chat channels, multi-tiered hierarchy
      bp.nav = bp.nav.filter(item => !['shifts', 'chat', 'crews'].includes(item.key));
      
      // Inject solo daily focus module if not already specialized
      bp.modules = bp.modules.slice(0, 3);
      bp.modules.push({
        id: 'solo_focus',
        title: 'Your Focus Block Today',
        icon: SVG.tasks,
        html: `
          <ul class="mini-list">
            <li><span>High priority order delivery</span><span>09:30</span></li>
            <li><span>Send pending invoices</span><span>13:00</span></li>
            <li><span>Deep focus / crafting block</span><span>14:30 – 17:00</span></li>
          </ul>
          <p class="module-sub">Solo workspace calibrated: No team chat or shift clutter.</p>
        `
      });
    } else if (teamSize === 'small'){
      // 2-5 people: lightweight shared calendar & simple task board
      // Ensure shared calendar is included
      const hasCalendar = bp.nav.some(n => n.key === 'calendar');
      if (!hasCalendar){
        bp.nav.splice(3, 0, { key: 'calendar', label: 'Shared Calendar', icon: SVG.calendar, href: './calendar.html' });
      }
    } else if (teamSize === 'growing' || teamSize === 'large'){
      // 6-20+ people: include team management, shifts/roster, audit activities
      const hasShifts = bp.nav.some(n => n.key === 'shifts' || n.key === 'crews');
      if (!hasShifts){
        bp.nav.splice(3, 0, { key: 'shifts', label: 'Team & Roster', icon: SVG.shifts, href: './activities.html' });
      }
      bp.modules.push({
        id: 'team_overview',
        title: 'Team Alignment & Shifts',
        icon: SVG.shifts,
        html: `
          <div class="avatar-row"><span class="avatar">AK</span><span class="avatar">JM</span><span class="avatar">RT</span><span class="avatar">+8</span></div>
          <p class="module-sub" style="margin-top:.7rem;">All departments actively synchronized across 2 active shifts.</p>
        `
      });
    }

    return bp;
  }

  // ===========================================================================
  // PROFILE PERSISTENCE (LocalStorage)
  // ===========================================================================
  const STORAGE_KEY = 'rimotech_workspace_profile';

  function getStoredProfile(){
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data){
        return JSON.parse(data);
      }
    } catch(e) {
      console.warn('Error reading workspace profile from localStorage:', e);
    }
    // Return a default blueprint if not yet onboarded
    return {
      company: 'Northside Studio',
      structure: 'small',
      focus: 'warehousing',
      priority: 'fulfillment',
      payment: 'invoices',
      currentTool: 'spreadsheets'
    };
  }

  function saveProfile(profile){
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch(e) {
      console.warn('Error saving workspace profile:', e);
    }
  }

  function getTailoredWorkspace(profileOverride){
    const profile = profileOverride || getStoredProfile();
    const focusKey = profile.focus || 'warehousing';
    const base = BLUEPRINTS[focusKey] || BLUEPRINTS.warehousing;
    return applyTeamSizeModifiers(base, profile.structure || 'small');
  }

  return {
    SVG,
    BLUEPRINTS,
    getStoredProfile,
    saveProfile,
    getTailoredWorkspace,
    applyTeamSizeModifiers
  };

})();
