// ================================================================
// RIMOTECH LANDING — INTERACTIVE BEHAVIORS (TREG.TO INSPIRED)
// ================================================================

// 1. Text Wheel Animation on Hero Headline
const roles = [
  'one unified OS',
  'automated operations',
  'an instant cashflow ledger',
  'a single source of truth'
];
let currentRoleIndex = 0;
const roleWheel = document.getElementById('rolewheel');

if (roleWheel) {
  setInterval(() => {
    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    roleWheel.style.opacity = '0';
    roleWheel.style.transform = 'translateY(6px)';
    setTimeout(() => {
      roleWheel.textContent = roles[currentRoleIndex];
      roleWheel.style.opacity = '1';
      roleWheel.style.transform = 'translateY(0)';
    }, 200);
  }, 3200);
}

// 2. Interactive Scene Role / Industry Switcher
const scenePresets = {
  agency: {
    agentRole: 'agency:client-services',
    steps: [
      { text: 'Inbound client proposal accepted', tag: 'CRM' },
      { text: 'Generate MSA & deposit invoice', tag: 'DOCS' },
      { text: 'Log billable sprint hours & team time', tag: 'TIME' }
    ],
    tools: [
      { name: 'Document Studio (Contracts & SOWs)', cost: 'Included' },
      { name: 'Client Deal Pipeline (Drag & Drop)', cost: 'Included' },
      { name: 'Time Tracker & Billable Ledger', cost: 'Included' }
    ],
    footLeft: 'replaces <strong>DocuSign & Harvest</strong>',
    footRight: 'Auto-synced'
  },
  retail: {
    agentRole: 'retail:inventory-ops',
    steps: [
      { text: 'Customer order placed at storefront', tag: 'POS' },
      { text: 'Auto-decrement warehouse stock', tag: 'STOCK' },
      { text: 'Trigger supplier PO at low threshold', tag: 'PO' }
    ],
    tools: [
      { name: 'Multi-Warehouse SKU Tracking', cost: 'Real-time' },
      { name: 'Automated Supplier Reorders', cost: 'Automated' },
      { name: 'Sales Revenue & Cost Valuation', cost: 'Instant' }
    ],
    footLeft: 'replaces <strong>Katana & TradeGecko</strong>',
    footRight: '99.9% Uptime'
  },
  saas: {
    agentRole: 'tech:product-operations',
    steps: [
      { text: 'New enterprise agreement signed', tag: 'LEGAL' },
      { text: 'Provision employee laptop & hardware', tag: 'ASSET' },
      { text: 'Sync MRR analytics & milestone billing', tag: 'FINANCE' }
    ],
    tools: [
      { name: 'Hardware & IT Asset Custody', cost: 'Zero Seat Fee' },
      { name: 'Financial Revenue & Invoicing', cost: 'Integrated' },
      { name: 'Automated Task Runbooks', cost: 'Event-Driven' }
    ],
    footLeft: 'replaces <strong>HubSpot & QuickBooks</strong>',
    footRight: 'Self-Hosted'
  }
};

window.switchScene = function(key) {
  const data = scenePresets[key];
  if (!data) return;

  document.querySelectorAll('.scene-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.scene === key);
  });

  const agRole = document.getElementById('sc-agrole');
  if (agRole) agRole.textContent = data.agentRole;

  const scSteps = document.getElementById('sc-steps');
  if (scSteps) {
    scSteps.innerHTML = data.steps.map((s, i) => `
      <div class="step-item ${i === 1 ? 'live' : ''}">
        <span>${s.text}</span>
        <span class="tag">${s.tag}</span>
      </div>
    `).join('');
  }

  const scTools = document.getElementById('sc-tools');
  if (scTools) {
    scTools.innerHTML = data.tools.map(t => `
      <div class="tool-chip">
        <span>${t.name}</span>
        <span class="cost">${t.cost}</span>
      </div>
    `).join('');
  }

  const scFoot = document.getElementById('sc-foot');
  if (scFoot) {
    scFoot.innerHTML = `<span>${data.footLeft}</span><span style="font-family:var(--mono); color:var(--green);">${data.footRight}</span>`;
  }
};

// 3. SaaS Replacement Matrix Tabs
const replacementData = {
  invoicing: [
    { title: 'Commercial Invoicing & Payments', sub: 'Itemized billing, tax & discount math, automated wire instructions', oldTool: 'FreshBooks · $35/mo', status: 'Included · $0' },
    { title: 'Legal Contracts & Retainers', sub: 'Master Services Agreements, Statement of Work, recurring retainers', oldTool: 'DocuSign · $45/mo', status: 'Included · $0' },
    { title: 'Mutual NDAs & Inventions IP', sub: 'Standard trade secret protection & IP assignment agreements', oldTool: 'LegalZoom · $39/mo', status: 'Included · $0' },
    { title: 'HR Offer Letters & Direct Deposit', sub: 'New hire compensation, benefits checklist & banking authorizations', oldTool: 'Deel / Gusto · $49/mo', status: 'Included · $0' }
  ],
  inventory: [
    { title: 'Multi-Warehouse SKU Tracking', sub: 'Retail storefronts, central warehouses, and 3PL fulfillment hubs', oldTool: 'Katana MRP · $199/mo', status: 'Included · $0' },
    { title: 'Low Stock Safety Alerts', sub: 'Real-time reorder threshold notifications and minimum order triggers', oldTool: 'TradeGecko · $99/mo', status: 'Included · $0' },
    { title: '1-Click Supplier Purchase Orders', sub: 'Auto-prefill supplier details, lead time, and bulk order quantities', oldTool: 'Orderhive · $75/mo', status: 'Included · $0' },
    { title: 'Hardware Asset Custody Logs', sub: 'Serial number tracking, laptop assignments, and acceptable use terms', oldTool: 'AssetTiger · $30/mo', status: 'Included · $0' }
  ],
  crm: [
    { title: 'Kanban Deal Pipelines', sub: 'Drag and drop deals between Leads, Active, and Closed Won stages', oldTool: 'HubSpot · $50/mo', status: 'Included · $0' },
    { title: 'Client Contact History', sub: 'Comprehensive client profiles, notes, revenue size, and past invoices', oldTool: 'Pipedrive · $39/mo', status: 'Included · $0' },
    { title: 'One-Click Proposal Generation', sub: 'Instantly convert won pipeline deals into signed client agreements', oldTool: 'PandaDoc · $35/mo', status: 'Included · $0' },
    { title: 'Customer Activity Feed', sub: 'Chronological timeline of all client interactions and status transitions', oldTool: 'Salesforce · $75/mo', status: 'Included · $0' }
  ],
  operations: [
    { title: 'Time Tracking & Timers', sub: 'Live billable stopwatch, task duration logging, and hours ledger', oldTool: 'Harvest · $12/mo', status: 'Included · $0' },
    { title: 'Team Tasks & Project Boards', sub: 'Cross-functional task assignments, due dates, and priority queues', oldTool: 'Asana · $30/mo', status: 'Included · $0' },
    { title: 'Financial Revenue Trends', sub: 'Interactive revenue charts with week/month/year performance tabs', oldTool: 'Baremetrics · $79/mo', status: 'Included · $0' },
    { title: 'Internal Company File Drive', sub: 'Centralized document repository with instant global search', oldTool: 'Dropbox · $20/mo', status: 'Included · $0' }
  ]
};

const replacementSavings = {
  invoicing: '✓ $168/mo of subscriptions → 100% included in your workspace',
  inventory: '✓ $403/mo of inventory SaaS fees → 100% included in your workspace',
  crm: '✓ $199/mo of CRM seats → 100% included in your workspace',
  operations: '✓ $141/mo of project management tools → 100% included in your workspace'
};

const rtabs = document.querySelectorAll('.rtab');
const pgrid = document.getElementById('replacementGrid');
const savingsBanner = document.getElementById('savingsBanner');

if (rtabs.length && pgrid) {
  rtabs.forEach(tab => {
    tab.addEventListener('click', () => {
      rtabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.dataset.cat;
      const items = replacementData[cat] || [];

      pgrid.innerHTML = items.map(item => `
        <div class="pcard">
          <div>
            <div class="pcard-top">
              <span class="pcard-title">${item.title}</span>
              <div class="pcard-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
            </div>
            <div class="pcard-sub" style="margin-top:6px;">${item.sub}</div>
          </div>
          <div class="pcard-pricing">
            <s>${item.oldTool}</s>
            <em>${item.status}</em>
          </div>
        </div>
      `).join('');

      if (savingsBanner && replacementSavings[cat]) {
        savingsBanner.textContent = replacementSavings[cat];
      }
    });
  });
}

// 4. One-Click Copy Command Box
const copyCliBtn = document.getElementById('copyCliBtn');
const cliSnippet = document.getElementById('cliSnippet');

if (copyCliBtn && cliSnippet) {
  copyCliBtn.addEventListener('click', async () => {
    const text = cliSnippet.textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      copyCliBtn.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Copied!`;
      setTimeout(() => {
        copyCliBtn.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy`;
      }, 2000);
    } catch (e) {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      copyCliBtn.textContent = 'Copied!';
      setTimeout(() => { copyCliBtn.textContent = 'Copy'; }, 2000);
    }
  });
}

// 5. Scroll Reveals
const revealElements = document.querySelectorAll('.rv');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// 6. Mobile Nav Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => document.body.classList.add('loaded'));
  if (typeof switchScene === 'function') switchScene('agency');
});
