// ===================================================================
// SIMPLE, INTUITIVE DOCUMENT & INVOICE GENERATOR
// ===================================================================

const TODAY = new Date();
const formatDate = (d) => d.toISOString().slice(0, 10);
const formatDisplayDate = (dStr) => {
  if (!dStr) return '';
  const d = new Date(dStr + 'T00:00:00');
  return isNaN(d) ? dStr : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Available Currencies
const CURRENCIES = {
  USD: { symbol: '$', code: 'USD' },
  EUR: { symbol: '€', code: 'EUR' },
  GBP: { symbol: '£', code: 'GBP' },
  CAD: { symbol: 'CA$', code: 'CAD' },
  AUD: { symbol: 'AU$', code: 'AUD' },
  NGN: { symbol: '₦', code: 'NGN' },
  INR: { symbol: '₹', code: 'INR' },
  JPY: { symbol: '¥', code: 'JPY' }
};

// Optional Quick Starters (Helps start quickly, but completely editable)
const STARTERS = {
  blank: {
    type: 'custom',
    title: 'DOCUMENT',
    docNum: 'DOC-001',
    currency: 'USD',
    issueDate: formatDate(TODAY),
    dueDate: '',
    sender: {
      name: 'Northside Studio',
      address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
      email: 'hello@northsidestudio.com',
      phone: '+1 (555) 239-8100'
    },
    recipient: {
      name: 'Client / Recipient Name',
      company: 'Organization',
      address: 'Street Address\nCity, State, ZIP',
      email: 'contact@example.com'
    },
    sections: [
      {
        title: 'Overview',
        body: 'Write the details, scope, or terms of your document here. You can add more sections below or delete this one.'
      }
    ],
    items: [],
    taxPercent: 0,
    discountPercent: 0,
    notes: 'Thank you for your business.',
    showSignatures: true,
    senderSigner: 'Joseph Prince',
    senderTitle: 'Founder',
    recipientSigner: 'Authorized Signatory',
    recipientTitle: 'Representative'
  },
  invoice: {
    type: 'invoice',
    title: 'INVOICE',
    docNum: 'INV-0148',
    currency: 'USD',
    issueDate: formatDate(TODAY),
    dueDate: formatDate(new Date(TODAY.getTime() + 14 * 86400000)),
    sender: {
      name: 'Northside Studio',
      address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
      email: 'billing@northsidestudio.com',
      phone: '+1 (555) 239-8100'
    },
    recipient: {
      name: 'Dana Osei',
      company: 'Reef Co. Technologies',
      address: '420 Harbor Blvd\nSan Francisco, CA 94105',
      email: 'dana@reefco.io'
    },
    items: [
      { desc: 'Web Application Design & UI Architecture', qty: 35, rate: 120 },
      { desc: 'Frontend Development & API Integration', qty: 45, rate: 130 },
      { desc: 'Cloud Deployment & Security Setup', qty: 1, rate: 850 }
    ],
    taxPercent: 8,
    discountPercent: 0,
    notes: 'Payment is due within 14 days.\nDirect Deposit / Wire: JPMorgan Chase · Account: 9928-4019-33 · Routing: 021000021',
    showSignatures: false,
    sections: []
  },
  contract: {
    type: 'contract',
    title: 'SERVICE AGREEMENT',
    docNum: 'AGR-2026-08',
    currency: 'USD',
    issueDate: formatDate(TODAY),
    dueDate: formatDate(new Date(TODAY.getTime() + 180 * 86400000)),
    sender: {
      name: 'Northside Studio',
      address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
      email: 'legal@northsidestudio.com',
      phone: '+1 (555) 239-8100'
    },
    recipient: {
      name: 'Priya Shah',
      company: 'Lumen Studio Enterprises',
      address: '142 S 4th St\nBrooklyn, NY 11211',
      email: 'priya@lumenstudio.co'
    },
    sections: [
      {
        title: '1. Scope of Work',
        body: 'Provider agrees to furnish digital product design, software engineering, and technical advisory services as mutually agreed upon in writing.'
      },
      {
        title: '2. Payment Terms',
        body: 'Client agrees to pay all invoiced amounts within 14 business days. Late payments accrue interest at 1.5% per month.'
      },
      {
        title: '3. Intellectual Property Rights',
        body: 'Upon receipt of full payment, all custom deliverables created specifically for Client shall become the sole property of Client.'
      },
      {
        title: '4. Confidentiality',
        body: 'Both parties agree to treat all shared business, customer, and technical information as strictly confidential.'
      }
    ],
    items: [],
    taxPercent: 0,
    discountPercent: 0,
    notes: 'Governed by the laws of New York State. Executed in duplicate counterparts.',
    showSignatures: true,
    senderSigner: 'Joseph Prince',
    senderTitle: 'Managing Partner',
    recipientSigner: 'Priya Shah',
    recipientTitle: 'Principal'
  },
  offer: {
    type: 'offer',
    title: 'OFFER OF EMPLOYMENT',
    docNum: 'EMP-2026-04',
    currency: 'USD',
    issueDate: formatDate(TODAY),
    dueDate: formatDate(new Date(TODAY.getTime() + 7 * 86400000)),
    sender: {
      name: 'Northside Studio',
      address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
      email: 'people@northsidestudio.com',
      phone: '+1 (555) 239-8100'
    },
    recipient: {
      name: 'Jordan Hayes',
      company: 'Prospective Employee',
      address: '522 Columbus Ave\nNew York, NY 10024',
      email: 'jordan@example.com'
    },
    sections: [
      {
        title: 'Role & Responsibilities',
        body: 'We are pleased to offer you the full-time position of Lead Software Engineer. In this role, you will lead core product development and report directly to the Head of Engineering.'
      },
      {
        title: 'Compensation & Schedule',
        body: '• Base Salary: $135,000.00 USD per annum, paid semi-monthly.\n• Target Start Date: August 15, 2026.\n• Classification: Full-time exempt.'
      },
      {
        title: 'Benefits & Perks',
        body: '• 100% company-paid health, dental, and vision insurance.\n• 401(k) retirement plan with 4% company match.\n• Unlimited paid time off (minimum 20 days recommended per year).\n• $3,000 home office and computer hardware stipend.'
      }
    ],
    items: [],
    taxPercent: 0,
    discountPercent: 0,
    notes: 'Please sign below to confirm acceptance and return by the acceptance date indicated above.',
    showSignatures: true,
    senderSigner: 'Joseph Prince',
    senderTitle: 'Founder',
    recipientSigner: 'Jordan Hayes',
    recipientTitle: 'Candidate'
  },
  onboarding: {
    type: 'onboarding',
    title: 'ONBOARDING & WELCOME PACKET',
    docNum: 'ONB-2026-11',
    currency: 'USD',
    issueDate: formatDate(TODAY),
    dueDate: '',
    sender: {
      name: 'Northside Studio',
      address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
      email: 'team@northsidestudio.com',
      phone: '+1 (555) 239-8100'
    },
    recipient: {
      name: 'Jordan Hayes',
      company: 'Engineering Team',
      address: 'New York, NY',
      email: 'jordan@northsidestudio.com'
    },
    sections: [
      {
        title: 'Welcome to Northside Studio',
        body: 'We are excited to have you join our team. This document outlines your Day 1 schedule, setup instructions, and primary contacts.'
      },
      {
        title: 'First Week Milestones',
        body: '• Day 1: 1Password vault setup, Slack channel introductions, and hardware setup.\n• Day 2: Engineering repo walkthrough and local development environment setup.\n• Day 3: Team lunch and 1-on-1 kick-off with your onboarding mentor.\n• Day 4-5: First codebase contribution and review cycle.'
      },
      {
        title: 'Assigned Company Assets',
        body: '• Laptop: Apple MacBook Pro 16" (M3 Max, 36GB RAM, 1TB SSD)\n• Serial Number: C02GK993MD6R · Asset Tag: NS-1049\n• Security Policy: FileVault disk encryption required. Return upon separation.'
      }
    ],
    items: [],
    taxPercent: 0,
    discountPercent: 0,
    notes: 'If you have any questions during your first week, reach out directly in #team-welcome.',
    showSignatures: true,
    senderSigner: 'Joseph Prince',
    senderTitle: 'Operations Lead',
    recipientSigner: 'Jordan Hayes',
    recipientTitle: 'Team Member'
  }
};

// Current Working Document State
let currentDoc = JSON.parse(JSON.stringify(STARTERS.invoice));

// Saved Documents (localStorage)
let savedDocs = [];
try {
  const local = localStorage.getItem('rimotech_saved_documents');
  if (local) savedDocs = JSON.parse(local);
  else {
    savedDocs = [
      { id: '1', title: 'Invoice #INV-0148 (Reef Co.)', date: '2026-07-25', type: 'Invoice', data: STARTERS.invoice },
      { id: '2', title: 'Service Agreement (Lumen Studio)', date: '2026-07-22', type: 'Contract', data: STARTERS.contract },
      { id: '3', title: 'Offer Letter (Jordan Hayes)', date: '2026-07-18', type: 'Offer Letter', data: STARTERS.offer }
    ];
  }
} catch (e) {
  savedDocs = [];
}

// ===================================================================
// DOM ELEMENTS
// ===================================================================
const editorPanel = document.getElementById('editorPanel');
const previewPanel = document.getElementById('previewPanel');
const paperSheet = document.getElementById('paperSheet');
const starterSelect = document.getElementById('starterSelect');
const typeChips = document.querySelectorAll('.type-chip');
const viewModeBtns = document.querySelectorAll('.view-mode-btn');

// ===================================================================
// RENDER FORM EDITOR
// ===================================================================
function renderEditor() {
  const isInvoice = currentDoc.type === 'invoice';
  const curSymbol = CURRENCIES[currentDoc.currency]?.symbol || '$';

  let contentEditorHtml = '';

  // 1. INVOICE LINE ITEMS
  if (isInvoice) {
    const rows = (currentDoc.items || []).map((it, idx) => `
      <tr data-index="${idx}">
        <td><input type="text" class="item-desc" value="${escapeHtml(it.desc)}" placeholder="Description of service/product"></td>
        <td style="width:65px;"><input type="number" min="1" step="any" class="item-qty" value="${it.qty}"></td>
        <td style="width:85px;"><input type="number" min="0" step="any" class="item-rate" value="${it.rate}"></td>
        <td style="width:75px; text-align:right; font-weight:700;">${curSymbol}${((it.qty || 0) * (it.rate || 0)).toFixed(2)}</td>
        <td style="width:30px; text-align:center;">
          <button class="btn-del-row" data-index="${idx}" title="Delete row">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </td>
      </tr>
    `).join('');

    contentEditorHtml = `
      <div class="panel-section">
        <span class="section-title">Invoice Items</span>
        <div class="line-items-box">
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
                <th style="text-align:right;">Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <button class="btn-add-row" id="btnAddRow">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
          Add Item
        </button>

        <div class="grid-2" style="margin-top:.5rem;">
          <div class="form-group">
            <label>Tax Rate (%)</label>
            <input type="number" min="0" step="0.1" class="form-input" id="inpTax" value="${currentDoc.taxPercent || 0}">
          </div>
          <div class="form-group">
            <label>Discount (%)</label>
            <input type="number" min="0" step="0.1" class="form-input" id="inpDiscount" value="${currentDoc.discountPercent || 0}">
          </div>
        </div>
      </div>
    `;
  } else {
    // 2. TEXT SECTIONS / CLAUSES (CONTRACT, OFFER, ONBOARDING, CUSTOM)
    const sectionsHtml = (currentDoc.sections || []).map((sec, idx) => `
      <div class="custom-section-card" data-index="${idx}">
        <div class="custom-section-top">
          <input type="text" class="sec-title-input" value="${escapeHtml(sec.title)}" placeholder="Section Title (e.g. Scope, Terms, Deliverables)">
          <button class="btn-remove-section" data-index="${idx}" title="Remove section">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <textarea class="form-textarea sec-body-input" rows="3" placeholder="Enter paragraph details, bullet points, or conditions...">${escapeHtml(sec.body)}</textarea>
      </div>
    `).join('');

    contentEditorHtml = `
      <div class="panel-section">
        <span class="section-title">Document Content & Clauses</span>
        <p style="font-size:.75rem; color:var(--ink-soft); margin-bottom:.4rem;">Add as many sections, clauses, or paragraphs as you need.</p>
        <div id="sectionsList">${sectionsHtml}</div>
        <button class="btn-add-row" id="btnAddSection">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
          Add New Section
        </button>
      </div>
    `;
  }

  editorPanel.innerHTML = `
    <!-- 1. Document Information -->
    <div class="panel-section">
      <span class="section-title">Document Details</span>
      <div class="grid-2">
        <div class="form-group">
          <label>Document Title</label>
          <input type="text" class="form-input" id="inpDocTitle" value="${escapeHtml(currentDoc.title)}" placeholder="e.g. INVOICE, AGREEMENT, OFFER">
        </div>
        <div class="form-group">
          <label>Reference / Number</label>
          <input type="text" class="form-input" id="inpDocNum" value="${escapeHtml(currentDoc.docNum)}" placeholder="e.g. INV-001">
        </div>
      </div>
      <div class="grid-3">
        <div class="form-group">
          <label>Date</label>
          <input type="date" class="form-input" id="inpIssueDate" value="${currentDoc.issueDate}">
        </div>
        <div class="form-group">
          <label>Due / Effective Date</label>
          <input type="date" class="form-input" id="inpDueDate" value="${currentDoc.dueDate || ''}">
        </div>
        <div class="form-group">
          <label>Currency</label>
          <select class="form-select" id="inpCurrency">
            ${Object.entries(CURRENCIES).map(([k, v]) => `<option value="${k}" ${currentDoc.currency === k ? 'selected' : ''}>${v.code} (${v.symbol})</option>`).join('')}
          </select>
        </div>
      </div>
    </div>

    <!-- 2. From (Your Business) -->
    <div class="panel-section">
      <span class="section-title">From (Your Business)</span>
      <div class="form-group">
        <label>Business Name</label>
        <input type="text" class="form-input" id="inpSenderName" value="${escapeHtml(currentDoc.sender.name)}" placeholder="Your Business / Studio Name">
      </div>
      <div class="form-group">
        <label>Address</label>
        <textarea class="form-textarea" id="inpSenderAddr" rows="2" placeholder="Street Address, City, State">${escapeHtml(currentDoc.sender.address)}</textarea>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-input" id="inpSenderEmail" value="${escapeHtml(currentDoc.sender.email)}" placeholder="email@yourbusiness.com">
        </div>
        <div class="form-group">
          <label>Phone / Website</label>
          <input type="text" class="form-input" id="inpSenderPhone" value="${escapeHtml(currentDoc.sender.phone)}" placeholder="+1 (555) 000-0000">
        </div>
      </div>
    </div>

    <!-- 3. To (Recipient / Client) -->
    <div class="panel-section">
      <span class="section-title">To (Client / Employee / Recipient)</span>
      <div class="grid-2">
        <div class="form-group">
          <label>Recipient Name</label>
          <input type="text" class="form-input" id="inpRecName" value="${escapeHtml(currentDoc.recipient.name)}" placeholder="Client or Person Name">
        </div>
        <div class="form-group">
          <label>Company / Organization</label>
          <input type="text" class="form-input" id="inpRecCompany" value="${escapeHtml(currentDoc.recipient.company)}" placeholder="Company Name (Optional)">
        </div>
      </div>
      <div class="form-group">
        <label>Address</label>
        <textarea class="form-textarea" id="inpRecAddr" rows="2" placeholder="Client Address">${escapeHtml(currentDoc.recipient.address)}</textarea>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-input" id="inpRecEmail" value="${escapeHtml(currentDoc.recipient.email)}" placeholder="client@example.com">
      </div>
    </div>

    <!-- 4. Dynamic Content (Items or Sections) -->
    ${contentEditorHtml}

    <!-- 5. Payment Terms & Notes -->
    <div class="panel-section">
      <span class="section-title">Notes & Payment Details</span>
      <div class="form-group">
        <label>Payment Instructions, Wire Details, or Closing Note</label>
        <textarea class="form-textarea" id="inpNotes" rows="3" placeholder="Add wire info, direct deposit, or a thank you note...">${escapeHtml(currentDoc.notes)}</textarea>
      </div>
    </div>

    <!-- 6. Signatures -->
    <div class="panel-section">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="section-title" style="margin:0; border:none; padding:0;">Signatures</span>
        <label style="font-size:.76rem; font-weight:700; display:flex; align-items:center; gap:.4rem; cursor:pointer;">
          <input type="checkbox" id="chkSignatures" ${currentDoc.showSignatures ? 'checked' : ''}>
          Include Signature Lines
        </label>
      </div>
      <div id="sigFields" style="${currentDoc.showSignatures ? 'display:block;' : 'display:none;'}">
        <div class="grid-2" style="margin-top:.5rem;">
          <div class="form-group">
            <label>Your Signer Name</label>
            <input type="text" class="form-input" id="inpSenderSigner" value="${escapeHtml(currentDoc.senderSigner || 'Joseph Prince')}">
          </div>
          <div class="form-group">
            <label>Your Title</label>
            <input type="text" class="form-input" id="inpSenderTitle" value="${escapeHtml(currentDoc.senderTitle || 'Founder')}">
          </div>
        </div>
        <div class="grid-2" style="margin-top:.5rem;">
          <div class="form-group">
            <label>Recipient Signer Name</label>
            <input type="text" class="form-input" id="inpRecSigner" value="${escapeHtml(currentDoc.recipientSigner || currentDoc.recipient.name || '')}">
          </div>
          <div class="form-group">
            <label>Recipient Title</label>
            <input type="text" class="form-input" id="inpRecTitle" value="${escapeHtml(currentDoc.recipientTitle || 'Authorized Representative')}">
          </div>
        </div>
      </div>
    </div>
  `;

  attachEditorEvents();
}

function attachEditorEvents() {
  // Bind inputs directly
  bindInput('inpDocTitle', val => currentDoc.title = val);
  bindInput('inpDocNum', val => currentDoc.docNum = val);
  bindInput('inpIssueDate', val => currentDoc.issueDate = val);
  bindInput('inpDueDate', val => currentDoc.dueDate = val);
  bindInput('inpCurrency', val => { currentDoc.currency = val; renderEditor(); });

  bindInput('inpSenderName', val => currentDoc.sender.name = val);
  bindInput('inpSenderAddr', val => currentDoc.sender.address = val);
  bindInput('inpSenderEmail', val => currentDoc.sender.email = val);
  bindInput('inpSenderPhone', val => currentDoc.sender.phone = val);

  bindInput('inpRecName', val => currentDoc.recipient.name = val);
  bindInput('inpRecCompany', val => currentDoc.recipient.company = val);
  bindInput('inpRecAddr', val => currentDoc.recipient.address = val);
  bindInput('inpRecEmail', val => currentDoc.recipient.email = val);

  bindInput('inpNotes', val => currentDoc.notes = val);

  // Signatures
  const chkSig = document.getElementById('chkSignatures');
  if (chkSig) {
    chkSig.addEventListener('change', (e) => {
      currentDoc.showSignatures = e.target.checked;
      const sigFields = document.getElementById('sigFields');
      if (sigFields) sigFields.style.display = e.target.checked ? 'block' : 'none';
      renderPaper();
    });
  }
  bindInput('inpSenderSigner', val => currentDoc.senderSigner = val);
  bindInput('inpSenderTitle', val => currentDoc.senderTitle = val);
  bindInput('inpRecSigner', val => currentDoc.recipientSigner = val);
  bindInput('inpRecTitle', val => currentDoc.recipientTitle = val);

  // Invoice Items
  if (currentDoc.type === 'invoice') {
    bindInput('inpTax', val => currentDoc.taxPercent = parseFloat(val) || 0);
    bindInput('inpDiscount', val => currentDoc.discountPercent = parseFloat(val) || 0);

    document.querySelectorAll('.item-desc').forEach(el => {
      el.addEventListener('input', e => {
        const idx = e.target.closest('tr').dataset.index;
        currentDoc.items[idx].desc = e.target.value;
        renderPaper();
      });
    });
    document.querySelectorAll('.item-qty').forEach(el => {
      el.addEventListener('input', e => {
        const idx = e.target.closest('tr').dataset.index;
        currentDoc.items[idx].qty = parseFloat(e.target.value) || 0;
        renderEditor();
        renderPaper();
      });
    });
    document.querySelectorAll('.item-rate').forEach(el => {
      el.addEventListener('input', e => {
        const idx = e.target.closest('tr').dataset.index;
        currentDoc.items[idx].rate = parseFloat(e.target.value) || 0;
        renderEditor();
        renderPaper();
      });
    });
    document.querySelectorAll('.btn-del-row').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.index;
        if (currentDoc.items.length > 1) {
          currentDoc.items.splice(idx, 1);
          renderEditor();
          renderPaper();
        } else {
          showToast('Keep at least one line item');
        }
      });
    });

    const btnAddRow = document.getElementById('btnAddRow');
    if (btnAddRow) {
      btnAddRow.addEventListener('click', () => {
        currentDoc.items.push({ desc: 'New service item or deliverable', qty: 1, rate: 100 });
        renderEditor();
        renderPaper();
      });
    }
  } else {
    // Custom Text Sections
    document.querySelectorAll('.sec-title-input').forEach(el => {
      el.addEventListener('input', e => {
        const idx = e.target.closest('.custom-section-card').dataset.index;
        currentDoc.sections[idx].title = e.target.value;
        renderPaper();
      });
    });
    document.querySelectorAll('.sec-body-input').forEach(el => {
      el.addEventListener('input', e => {
        const idx = e.target.closest('.custom-section-card').dataset.index;
        currentDoc.sections[idx].body = e.target.value;
        renderPaper();
      });
    });
    document.querySelectorAll('.btn-remove-section').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.index;
        currentDoc.sections.splice(idx, 1);
        renderEditor();
        renderPaper();
      });
    });

    const btnAddSection = document.getElementById('btnAddSection');
    if (btnAddSection) {
      btnAddSection.addEventListener('click', () => {
        if (!currentDoc.sections) currentDoc.sections = [];
        currentDoc.sections.push({
          title: `Section ${currentDoc.sections.length + 1}`,
          body: 'Describe the details, obligations, deliverables, or terms here.'
        });
        renderEditor();
        renderPaper();
      });
    }
  }
}

function bindInput(id, callback) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', e => {
    callback(e.target.value);
    renderPaper();
  });
  el.addEventListener('change', e => {
    callback(e.target.value);
    renderPaper();
  });
}

// ===================================================================
// RENDER CLEAN, HUMAN DOCUMENT SHEET (REALISTIC DESIGN)
// ===================================================================
function renderPaper() {
  const curSymbol = CURRENCIES[currentDoc.currency]?.symbol || '$';
  const isInvoice = currentDoc.type === 'invoice';

  // 1. Center Body (Line Items vs Sections)
  let bodyHtml = '';

  if (isInvoice) {
    let subtotal = 0;
    const itemRows = (currentDoc.items || []).map(it => {
      const lineTotal = (it.qty || 0) * (it.rate || 0);
      subtotal += lineTotal;
      return `
        <tr>
          <td><strong>${escapeHtml(it.desc)}</strong></td>
          <td class="num-col" style="text-align:center;">${it.qty}</td>
          <td class="num-col">${curSymbol}${(it.rate || 0).toFixed(2)}</td>
          <td class="num-col"><strong>${curSymbol}${lineTotal.toFixed(2)}</strong></td>
        </tr>
      `;
    }).join('');

    const discountAmount = subtotal * ((currentDoc.discountPercent || 0) / 100);
    const taxable = Math.max(0, subtotal - discountAmount);
    const taxAmount = taxable * ((currentDoc.taxPercent || 0) / 100);
    const grandTotal = taxable + taxAmount;

    bodyHtml = `
      <table class="doc-clean-table">
        <thead>
          <tr>
            <th>Description</th>
            <th style="text-align:center; width:70px;">Qty</th>
            <th class="num-col" style="width:110px;">Rate</th>
            <th class="num-col" style="width:110px;">Amount</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <div class="doc-totals-summary">
        <div class="totals-line"><span>Subtotal:</span><span>${curSymbol}${subtotal.toFixed(2)}</span></div>
        ${currentDoc.discountPercent > 0 ? `<div class="totals-line"><span>Discount (${currentDoc.discountPercent}%):</span><span>-${curSymbol}${discountAmount.toFixed(2)}</span></div>` : ''}
        ${currentDoc.taxPercent > 0 ? `<div class="totals-line"><span>Tax (${currentDoc.taxPercent}%):</span><span>${curSymbol}${taxAmount.toFixed(2)}</span></div>` : ''}
        <div class="totals-line grand-total"><span>Total Due:</span><span>${curSymbol}${grandTotal.toFixed(2)}</span></div>
      </div>
    `;
  } else {
    // Custom Text Blocks
    const sectionsHtml = (currentDoc.sections || []).map(s => `
      <div class="doc-text-block">
        <h4>${escapeHtml(s.title)}</h4>
        <p>${escapeHtml(s.body)}</p>
      </div>
    `).join('');

    bodyHtml = `<div>${sectionsHtml}</div>`;
  }

  // 2. Signatures Block
  let signaturesHtml = '';
  if (currentDoc.showSignatures) {
    signaturesHtml = `
      <div class="doc-signatures-wrap">
        <div class="sig-slot">
          <div class="sig-line-rule"></div>
          <div class="sig-slot-name">${escapeHtml(currentDoc.senderSigner || currentDoc.sender.name)}</div>
          <div class="sig-slot-sub">${escapeHtml(currentDoc.senderTitle || 'Authorized Signature')} · ${formatDisplayDate(currentDoc.issueDate)}</div>
        </div>
        <div class="sig-slot">
          <div class="sig-line-rule"></div>
          <div class="sig-slot-name">${escapeHtml(currentDoc.recipientSigner || currentDoc.recipient.name || 'Recipient')}</div>
          <div class="sig-slot-sub">${escapeHtml(currentDoc.recipientTitle || 'Signature')} · Date: _______________</div>
        </div>
      </div>
    `;
  }

  // 3. Assemble Clean Document
  paperSheet.innerHTML = `
    <!-- Top Header -->
    <div class="doc-top">
      <div class="doc-sender">
        <h2>${escapeHtml(currentDoc.sender.name || 'Northside Studio')}</h2>
        <p>${escapeHtml(currentDoc.sender.address || '')}${currentDoc.sender.email ? '\n' + escapeHtml(currentDoc.sender.email) : ''}${currentDoc.sender.phone ? ' · ' + escapeHtml(currentDoc.sender.phone) : ''}</p>
      </div>
      <div class="doc-info-block">
        <div class="doc-title-display">${escapeHtml(currentDoc.title || 'DOCUMENT')}</div>
        <div class="doc-meta-row">
          ${currentDoc.docNum ? `<div><strong>Ref #:</strong> ${escapeHtml(currentDoc.docNum)}</div>` : ''}
          <div><strong>Date:</strong> ${formatDisplayDate(currentDoc.issueDate)}</div>
          ${currentDoc.dueDate ? `<div><strong>${isInvoice ? 'Due Date:' : 'Effective:'}</strong> ${formatDisplayDate(currentDoc.dueDate)}</div>` : ''}
        </div>
      </div>
    </div>

    <!-- Recipient -->
    <div class="doc-recipient-box">
      <div class="doc-section-label">${isInvoice ? 'Billed To' : 'Prepared For'}</div>
      <div class="doc-recipient-name">${escapeHtml(currentDoc.recipient.name || '')}</div>
      <div class="doc-recipient-sub">
        ${currentDoc.recipient.company ? `<strong>${escapeHtml(currentDoc.recipient.company)}</strong>\n` : ''}
        ${escapeHtml(currentDoc.recipient.address || '')}
        ${currentDoc.recipient.email ? '\n' + escapeHtml(currentDoc.recipient.email) : ''}
      </div>
    </div>

    <!-- Body Content -->
    <div class="doc-body">
      ${bodyHtml}
      ${currentDoc.notes ? `
        <div class="doc-payment-info">
          <div class="doc-section-label" style="margin-bottom:.2rem;">${isInvoice ? 'Payment Instructions & Notes' : 'Notes'}</div>
          ${escapeHtml(currentDoc.notes)}
        </div>
      ` : ''}
    </div>

    <!-- Signatures -->
    ${signaturesHtml}

    <!-- Footer -->
    <div class="doc-footer">
      <span>${escapeHtml(currentDoc.sender.name || '')}</span>
      <span>${escapeHtml(currentDoc.docNum || '')} · Page 1 of 1</span>
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ===================================================================
// DOCUMENT TYPE SWITCHING (SIMPLE & FLEXIBLE)
// ===================================================================
typeChips.forEach(chip => {
  chip.addEventListener('click', () => {
    typeChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const type = chip.dataset.type;
    currentDoc.type = type;

    if (type === 'invoice') {
      currentDoc.title = 'INVOICE';
      if (!currentDoc.items || currentDoc.items.length === 0) {
        currentDoc.items = [
          { desc: 'Professional Services / Deliverables', qty: 1, rate: 1200 }
        ];
      }
      currentDoc.showSignatures = false;
    } else if (type === 'contract') {
      currentDoc.title = 'SERVICE AGREEMENT';
      currentDoc.showSignatures = true;
      if (!currentDoc.sections || currentDoc.sections.length === 0) {
        currentDoc.sections = STARTERS.contract.sections;
      }
    } else if (type === 'offer') {
      currentDoc.title = 'OFFER OF EMPLOYMENT';
      currentDoc.showSignatures = true;
      if (!currentDoc.sections || currentDoc.sections.length === 0) {
        currentDoc.sections = STARTERS.offer.sections;
      }
    } else if (type === 'onboarding') {
      currentDoc.title = 'ONBOARDING DOCUMENT';
      currentDoc.showSignatures = true;
      if (!currentDoc.sections || currentDoc.sections.length === 0) {
        currentDoc.sections = STARTERS.onboarding.sections;
      }
    } else {
      currentDoc.title = 'DOCUMENT';
      currentDoc.showSignatures = true;
      if (!currentDoc.sections || currentDoc.sections.length === 0) {
        currentDoc.sections = [
          { title: 'Overview', body: 'Add your custom content, policy, instructions, or agreements here.' }
        ];
      }
    }

    renderEditor();
    renderPaper();
    showToast(`Switched to ${chip.textContent.trim()}`);
  });
});

// Quick Starter Dropdown
if (starterSelect) {
  starterSelect.addEventListener('change', (e) => {
    const key = e.target.value;
    if (STARTERS[key]) {
      currentDoc = JSON.parse(JSON.stringify(STARTERS[key]));
      // Update active type chip
      typeChips.forEach(c => {
        c.classList.toggle('active', c.dataset.type === currentDoc.type);
      });
      renderEditor();
      renderPaper();
      showToast(`Loaded ${currentDoc.title}`);
    }
  });
}

// ===================================================================
// MOBILE VIEW TOGGLE (EDIT vs PREVIEW)
// ===================================================================
viewModeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    viewModeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const mode = btn.dataset.mode;
    if (mode === 'preview') {
      editorPanel.classList.add('m-hidden');
      previewPanel.classList.remove('m-hidden');
    } else {
      previewPanel.classList.add('m-hidden');
      editorPanel.classList.remove('m-hidden');
    }
  });
});

// ===================================================================
// TOP ACTIONS (PRINT, SAVE, COPY, NEW)
// ===================================================================
// 1. Print / Save as PDF
document.getElementById('btnPrint').addEventListener('click', () => {
  window.print();
});

// 2. Save Document
document.getElementById('btnSave').addEventListener('click', () => {
  const saveEntry = {
    id: Date.now().toString(),
    title: `${currentDoc.title} ${currentDoc.docNum ? '#' + currentDoc.docNum : ''} (${currentDoc.recipient.name || 'Draft'})`,
    date: currentDoc.issueDate || formatDate(TODAY),
    type: currentDoc.title,
    data: JSON.parse(JSON.stringify(currentDoc))
  };

  savedDocs.unshift(saveEntry);
  try {
    localStorage.setItem('rimotech_saved_documents', JSON.stringify(savedDocs));
  } catch (e) {}

  updateSavedCount();
  showToast('Document saved to workspace!');
});

// 3. New Document (Reset to clean slate)
document.getElementById('btnNew').addEventListener('click', () => {
  if (confirm('Start a new blank document?')) {
    currentDoc = JSON.parse(JSON.stringify(STARTERS.blank));
    typeChips.forEach(c => c.classList.toggle('active', c.dataset.type === 'custom'));
    renderEditor();
    renderPaper();
    showToast('New blank document started');
  }
});

// 4. Saved Documents Modal
const historyModal = document.getElementById('historyModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const savedDocsList = document.getElementById('savedDocsList');
const btnSavedDocs = document.getElementById('btnSavedDocs');
const closeSavedDocs = document.getElementById('closeSavedDocs');

function openSavedModal() {
  renderSavedList();
  historyModal.classList.add('open');
  modalBackdrop.classList.add('open');
}

function closeSavedModal() {
  historyModal.classList.remove('open');
  modalBackdrop.classList.remove('open');
}

if (btnSavedDocs) btnSavedDocs.addEventListener('click', openSavedModal);
if (closeSavedDocs) closeSavedDocs.addEventListener('click', closeSavedModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeSavedModal);

function renderSavedList() {
  if (!savedDocs.length) {
    savedDocsList.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--ink-soft); font-size:.85rem;">No saved documents found. Create and save a document to see it here.</div>`;
    return;
  }

  savedDocsList.innerHTML = savedDocs.map((item, idx) => `
    <div class="saved-item">
      <div>
        <div class="saved-title">${escapeHtml(item.title)}</div>
        <div class="saved-sub">${escapeHtml(item.type)} · ${item.date}</div>
      </div>
      <div style="display:flex; gap:.4rem;">
        <button class="btn btn-outline btn-sm" onclick="loadSavedDoc(${idx})">Load</button>
        <button class="btn btn-outline btn-sm" style="color:var(--danger);" onclick="deleteSavedDoc(${idx})">Delete</button>
      </div>
    </div>
  `).join('');
}

window.loadSavedDoc = function(idx) {
  const item = savedDocs[idx];
  if (!item || !item.data) return;
  currentDoc = JSON.parse(JSON.stringify(item.data));

  typeChips.forEach(c => c.classList.toggle('active', c.dataset.type === currentDoc.type));
  renderEditor();
  renderPaper();
  closeSavedModal();
  showToast(`Loaded ${item.title}`);
};

window.deleteSavedDoc = function(idx) {
  savedDocs.splice(idx, 1);
  try {
    localStorage.setItem('rimotech_saved_documents', JSON.stringify(savedDocs));
  } catch (e) {}
  renderSavedList();
  updateSavedCount();
  showToast('Removed document');
};

function updateSavedCount() {
  const badge = document.getElementById('savedCountBadge');
  if (badge) badge.textContent = savedDocs.length;
}

// Toast
function showToast(msg) {
  const stack = document.getElementById('toastStack');
  if (!stack) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  stack.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    setTimeout(() => t.remove(), 250);
  }, 2200);
}

// Sidebar Mobile Toggle
const sidebar = document.getElementById('sidebar');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebarClose = document.getElementById('sidebarClose');

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
    sidebarBackdrop.classList.add('open');
  });
}
if (sidebarClose) {
  sidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('open');
  });
}
if (sidebarBackdrop) {
  sidebarBackdrop.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('open');
  });
}

// Dropdowns
const notifBtn = document.getElementById('notifBtn');
const notifPanel = document.getElementById('notifPanel');
const userBtn = document.getElementById('userBtn');
const userPanel = document.getElementById('userPanel');

function closeAllDropdowns() {
  if (notifPanel) notifPanel.classList.remove('open');
  if (userPanel) userPanel.classList.remove('open');
}

if (notifBtn && notifPanel) {
  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = notifPanel.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) notifPanel.classList.add('open');
  });
}
if (userBtn && userPanel) {
  userBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = userPanel.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) userPanel.classList.add('open');
  });
}
document.addEventListener('click', closeAllDropdowns);

// Global Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSavedModal();
    closeAllDropdowns();
    if (sidebar) sidebar.classList.remove('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('open');
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
    e.preventDefault();
    window.print();
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    document.getElementById('btnSave').click();
  }
});

// ===================================================================
// INIT
// ===================================================================
window.addEventListener('DOMContentLoaded', () => {
  renderEditor();
  renderPaper();
  updateSavedCount();
  requestAnimationFrame(() => document.body.classList.add('loaded'));
});
