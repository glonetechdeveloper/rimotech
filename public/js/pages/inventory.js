// ===================================================================
// INVENTORY & STOCKING ENGINE — MULTI-CLIENT OS
// ===================================================================

const SEED_INVENTORY = [
  // 1. Retail & E-Commerce
  {
    id: 'SKU-1001',
    sku: 'RET-HP-01',
    barcode: '890214810214',
    name: 'Studio Wireless ANC Headphones (Black)',
    category: 'Electronics',
    persona: 'retail',
    location: 'Main Warehouse',
    qty: 42,
    minQty: 15,
    unitCost: 78.00,
    unitPrice: 199.00,
    supplier: 'Acoustic Labs Tech',
    leadTimeDays: 7,
    movements: [
      { date: '2026-07-24', type: 'in', qty: 25, reason: 'Supplier PO #902 Delivery' },
      { date: '2026-07-22', type: 'out', qty: 5, reason: 'E-commerce Order Batch #8819' }
    ]
  },
  {
    id: 'SKU-1002',
    sku: 'APP-HD-L',
    barcode: '890214810221',
    name: 'Organic Heavyweight Cotton Hoodie (Large)',
    category: 'Apparel',
    persona: 'retail',
    location: 'Retail Storefront',
    qty: 8,
    minQty: 20,
    unitCost: 22.50,
    unitPrice: 85.00,
    supplier: 'EcoTextile Mills',
    leadTimeDays: 14,
    movements: [
      { date: '2026-07-25', type: 'out', qty: 12, reason: 'In-store Sales Weekend' }
    ]
  },
  {
    id: 'SKU-1003',
    sku: 'ACC-MG-01',
    barcode: '890214810238',
    name: 'Minimalist Ceramic Desk Mug (Matte Charcoal)',
    category: 'Accessories',
    persona: 'retail',
    location: 'Main Warehouse',
    qty: 0,
    minQty: 25,
    unitCost: 4.20,
    unitPrice: 28.00,
    supplier: 'ClayCraft Studios',
    leadTimeDays: 10,
    movements: [
      { date: '2026-07-20', type: 'out', qty: 30, reason: 'Sold Out — Web Store Promotion' }
    ]
  },

  // 2. Wholesale & B2B Distribution
  {
    id: 'SKU-2001',
    sku: 'WHS-BOX-50',
    barcode: '784019280112',
    name: 'Industrial Corrugated Shipping Boxes (Pack of 50)',
    category: 'Packaging',
    persona: 'wholesale',
    location: '3PL Logistics Hub',
    qty: 160,
    minQty: 50,
    unitCost: 18.00,
    unitPrice: 39.00,
    supplier: 'Apex Paper & Pulp Corp',
    leadTimeDays: 5,
    movements: [
      { date: '2026-07-21', type: 'in', qty: 100, reason: 'Pallet Delivery Inbound' }
    ]
  },
  {
    id: 'SKU-2002',
    sku: 'WHS-PL-06',
    barcode: '784019280129',
    name: 'Heavy Duty Stretch Film Pallet Wrap (6 Rolls)',
    category: 'Logistics',
    persona: 'wholesale',
    location: '3PL Logistics Hub',
    qty: 34,
    minQty: 15,
    unitCost: 45.00,
    unitPrice: 88.00,
    supplier: 'Apex Paper & Pulp Corp',
    leadTimeDays: 4,
    movements: [
      { date: '2026-07-18', type: 'out', qty: 8, reason: 'B2B Client Order #B2B-109' }
    ]
  },

  // 3. Food, Beverage & Hospitality
  {
    id: 'SKU-3001',
    sku: 'FOD-COF-05',
    barcode: '650192830114',
    name: 'Single-Origin Ethiopian Yirgacheffe (5kg Bag)',
    category: 'Perishables',
    persona: 'food',
    location: 'Cold Storage',
    qty: 14,
    minQty: 10,
    unitCost: 62.00,
    unitPrice: 120.00,
    supplier: 'Equator Coffee Roasters',
    leadTimeDays: 3,
    movements: [
      { date: '2026-07-23', type: 'in', qty: 10, reason: 'Weekly Roaster Shipment' }
    ]
  },
  {
    id: 'SKU-3002',
    sku: 'FOD-EXT-01',
    barcode: '650192830121',
    name: 'Artisan Pure Madagascar Vanilla Extract (1 Liter)',
    category: 'Ingredients',
    persona: 'food',
    location: 'Cold Storage',
    qty: 3,
    minQty: 8,
    unitCost: 48.00,
    unitPrice: 95.00,
    supplier: 'SpiceRoute Direct',
    leadTimeDays: 9,
    movements: [
      { date: '2026-07-24', type: 'out', qty: 4, reason: 'Kitchen Production Batch #14' }
    ]
  },

  // 4. Manufacturing & Hardware Assembly
  {
    id: 'SKU-4001',
    sku: 'MFG-MCU-04',
    barcode: '440192830991',
    name: 'ARM Cortex-M4 Microcontroller IC Chips',
    category: 'Components',
    persona: 'manufacturing',
    location: 'Production Floor',
    qty: 450,
    minQty: 100,
    unitCost: 3.40,
    unitPrice: 12.00,
    supplier: 'Silicon Direct Ltd.',
    leadTimeDays: 21,
    movements: [
      { date: '2026-07-15', type: 'in', qty: 500, reason: 'Reel Batch Import' },
      { date: '2026-07-22', type: 'out', qty: 50, reason: 'SMT Line Splicing' }
    ]
  },
  {
    id: 'SKU-4002',
    sku: 'MFG-CNC-TOP',
    barcode: '440192830998',
    name: 'Anodized CNC Aluminum Top Chassis Plates',
    category: 'Raw Materials',
    persona: 'manufacturing',
    location: 'Production Floor',
    qty: 65,
    minQty: 25,
    unitCost: 18.50,
    unitPrice: 55.00,
    supplier: 'Apex Precision Metals',
    leadTimeDays: 12,
    movements: [
      { date: '2026-07-19', type: 'out', qty: 20, reason: 'Milled Enclosure Assembly' }
    ]
  },

  // 5. Internal Studio Assets & Equipment
  {
    id: 'SKU-5001',
    sku: 'AST-MBP-16',
    barcode: '190284910291',
    name: 'Apple MacBook Pro 16" M3 Max (64GB / 1TB)',
    category: 'IT Hardware',
    persona: 'internal',
    location: 'Main Warehouse',
    qty: 4,
    minQty: 2,
    unitCost: 2899.00,
    unitPrice: 3499.00,
    supplier: 'Apple Corporate Direct',
    leadTimeDays: 3,
    movements: [
      { date: '2026-07-10', type: 'in', qty: 5, reason: 'Engineering New Hire Fleet' },
      { date: '2026-07-20', type: 'out', qty: 1, reason: 'Assigned to Jordan Hayes' }
    ]
  },
  {
    id: 'SKU-5002',
    sku: 'AST-CAM-FX3',
    barcode: '190284910307',
    name: 'Sony FX3 Full-Frame Cinema Camera Body',
    category: 'Media Gear',
    persona: 'internal',
    location: 'Main Warehouse',
    qty: 2,
    minQty: 1,
    unitCost: 3899.00,
    unitPrice: 4200.00,
    supplier: 'B&H Photo Video Pro',
    leadTimeDays: 2,
    movements: [
      { date: '2026-06-30', type: 'in', qty: 2, reason: 'Video Studio Upgrade' }
    ]
  }
];

// App State
let inventory = [];
try {
  const local = localStorage.getItem('rimotech_inventory_items');
  inventory = local ? JSON.parse(local) : SEED_INVENTORY;
} catch (e) {
  inventory = SEED_INVENTORY;
}

let activePersona = 'all';
let activeStockFilter = 'all';
let activeLocation = 'all';
let searchQuery = '';
let activeItemForAction = null;

// ===================================================================
// DOM ELEMENTS
// ===================================================================
const invTableBody = document.getElementById('invTableBody');
const emptyTableState = document.getElementById('emptyTableState');
const personaPills = document.querySelectorAll('.persona-pill');
const stockFilterChips = document.querySelectorAll('.stock-filter-chip');
const locationSelect = document.getElementById('locationSelect');
const tableSearch = document.getElementById('tableSearch');

// Stats Elements
const statTotalValuation = document.getElementById('statTotalValuation');
const statTotalSkus = document.getElementById('statTotalSkus');
const statLowStock = document.getElementById('statLowStock');
const statOutOfStock = document.getElementById('statOutOfStock');

// Modals
const modalBackdrop = document.getElementById('modalBackdrop');
const adjustModal = document.getElementById('adjustModal');
const newItemModal = document.getElementById('newItemModal');
const reorderModal = document.getElementById('reorderModal');
const detailDrawer = document.getElementById('detailDrawer');

// Toast
const toastStack = document.getElementById('toastStack');

// ===================================================================
// FILTER & RENDER ENGINE
// ===================================================================
function getFilteredItems() {
  const q = searchQuery.trim().toLowerCase();
  return inventory.filter(item => {
    // 1. Persona filter
    if (activePersona !== 'all' && item.persona !== activePersona) return false;

    // 2. Location filter
    if (activeLocation !== 'all' && item.location !== activeLocation) return false;

    // 3. Stock Status filter
    if (activeStockFilter === 'low' && (item.qty <= 0 || item.qty > item.minQty)) return false;
    if (activeStockFilter === 'out' && item.qty > 0) return false;
    if (activeStockFilter === 'instock' && item.qty <= item.minQty) return false;

    // 4. Search query
    if (q) {
      const matchName = item.name.toLowerCase().includes(q);
      const matchSku = item.sku.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchSupplier = (item.supplier || '').toLowerCase().includes(q);
      if (!matchName && !matchSku && !matchCategory && !matchSupplier) return false;
    }

    return true;
  });
}

function renderInventoryTable() {
  const filtered = getFilteredItems();
  invTableBody.innerHTML = '';

  if (filtered.length === 0) {
    emptyTableState.style.display = 'block';
  } else {
    emptyTableState.style.display = 'none';
  }

  filtered.forEach(item => {
    // Determine status
    let statusClass = 'in-stock';
    let statusLabel = 'In Stock';
    let barFillClass = 'good';
    let pct = Math.min(100, Math.round((item.qty / (item.minQty * 2.5 || 10)) * 100));

    if (item.qty <= 0) {
      statusClass = 'out-of-stock';
      statusLabel = 'Out of Stock';
      barFillClass = 'crit';
      pct = 0;
    } else if (item.qty <= item.minQty) {
      statusClass = 'low-stock';
      statusLabel = 'Low Stock';
      barFillClass = 'warn';
      pct = Math.max(12, Math.round((item.qty / item.minQty) * 50));
    }

    const valuation = item.qty * item.unitCost;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="item-cell-title">${escapeHtml(item.name)}</div>
        <div class="item-cell-sub">
          <span class="sku-badge">${escapeHtml(item.sku)}</span>
          <span class="category-tag">${escapeHtml(item.category)}</span>
        </div>
      </td>
      <td>
        <span style="font-weight:600; font-size:.82rem;">${escapeHtml(item.location)}</span>
      </td>
      <td>
        <div class="stock-level-group">
          <div class="stock-numbers">
            <span>${item.qty.toLocaleString()}</span>
            <span style="font-size:.7rem; color:var(--ink-faint);">Min: ${item.minQty}</span>
          </div>
          <div class="stock-bar-track">
            <div class="stock-bar-fill ${barFillClass}" style="width:${pct}%;"></div>
          </div>
        </div>
      </td>
      <td>
        <span class="status-pill ${statusClass}">
          <span style="width:6px; height:6px; border-radius:50%; background:currentColor;"></span>
          ${statusLabel}
        </span>
      </td>
      <td>
        <div style="font-weight:700;">$${item.unitCost.toFixed(2)}</div>
        <div style="font-size:.72rem; color:var(--ink-faint);">Retail: $${item.unitPrice.toFixed(2)}</div>
      </td>
      <td>
        <span style="font-family:var(--font-display); font-weight:800; font-size:.92rem;">
          $${valuation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </td>
      <td>
        <div class="row-actions">
          <button class="btn-table-action" onclick="openAdjustModal('${item.id}')" title="Adjust stock in or out">Adjust</button>
          ${item.qty <= item.minQty ? `<button class="btn-table-action primary" onclick="openReorderModal('${item.id}')">Reorder</button>` : ''}
          <button class="btn-table-action" onclick="openDetailDrawer('${item.id}')" title="Audit history">Details</button>
        </div>
      </td>
    `;
    invTableBody.appendChild(tr);
  });

  updateStats();
  updateChipCounts();
}

// ===================================================================
// STATS CALCULATOR
// ===================================================================
function updateStats() {
  let totalVal = 0;
  let lowCount = 0;
  let outCount = 0;

  inventory.forEach(it => {
    totalVal += (it.qty * it.unitCost);
    if (it.qty <= 0) outCount++;
    else if (it.qty <= it.minQty) lowCount++;
  });

  statTotalValuation.textContent = `$${totalVal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  statTotalSkus.textContent = inventory.length;
  statLowStock.textContent = lowCount;
  statOutOfStock.textContent = outCount;
}

function updateChipCounts() {
  const allCount = inventory.length;
  const lowCount = inventory.filter(it => it.qty > 0 && it.qty <= it.minQty).length;
  const outCount = inventory.filter(it => it.qty <= 0).length;
  const inStockCount = inventory.filter(it => it.qty > it.minQty).length;

  const cAll = document.getElementById('chipCountAll');
  const cLow = document.getElementById('chipCountLow');
  const cOut = document.getElementById('chipCountOut');
  const cIn = document.getElementById('chipCountIn');

  if (cAll) cAll.textContent = allCount;
  if (cLow) cLow.textContent = lowCount;
  if (cOut) cOut.textContent = outCount;
  if (cIn) cIn.textContent = inStockCount;
}

function saveState() {
  try {
    localStorage.setItem('rimotech_inventory_items', JSON.stringify(inventory));
  } catch (e) {}
}

// ===================================================================
// MODAL CONTROLS & STOCK ADJUSTMENT
// ===================================================================
function closeModal() {
  modalBackdrop.classList.remove('open');
  if (adjustModal) adjustModal.classList.remove('open');
  if (newItemModal) newItemModal.classList.remove('open');
  if (reorderModal) reorderModal.classList.remove('open');
  if (detailDrawer) detailDrawer.classList.remove('open');
  activeItemForAction = null;
}

modalBackdrop.addEventListener('click', closeModal);
document.querySelectorAll('.modal-close-btn').forEach(btn => btn.addEventListener('click', closeModal));

// 1. Stock Adjustment Modal
window.openAdjustModal = function(id) {
  const item = inventory.find(i => i.id === id);
  if (!item) return;
  activeItemForAction = item;

  document.getElementById('adjustItemName').textContent = `${item.name} (${item.sku})`;
  document.getElementById('adjustCurrentQty').textContent = `${item.qty} units currently on hand`;
  document.getElementById('adjustQtyInput').value = 1;
  document.getElementById('adjustReasonInput').value = '';

  modalBackdrop.classList.add('open');
  adjustModal.classList.add('open');
};

document.getElementById('btnConfirmAdjust').addEventListener('click', () => {
  if (!activeItemForAction) return;

  const type = document.getElementById('adjustTypeSelect').value;
  const amount = parseInt(document.getElementById('adjustQtyInput').value, 10) || 0;
  const reason = document.getElementById('adjustReasonInput').value.trim() || 'Manual stock update';

  if (amount <= 0) {
    showToast('Please enter a valid quantity greater than 0');
    return;
  }

  let isAddition = type === 'received' || type === 'audit_add';
  if (isAddition) {
    activeItemForAction.qty += amount;
  } else {
    if (activeItemForAction.qty < amount) {
      if (!confirm(`Warning: Stock will drop below 0 to ${activeItemForAction.qty - amount}. Proceed?`)) return;
    }
    activeItemForAction.qty = Math.max(0, activeItemForAction.qty - amount);
  }

  // Log movement
  if (!activeItemForAction.movements) activeItemForAction.movements = [];
  activeItemForAction.movements.unshift({
    date: new Date().toISOString().slice(0, 10),
    type: isAddition ? 'in' : 'out',
    qty: amount,
    reason: `${type.toUpperCase()}: ${reason}`
  });

  saveState();
  renderInventoryTable();
  closeModal();
  showToast(`Updated stock for ${activeItemForAction.sku}: now ${activeItemForAction.qty} units`);
});

// 2. Reorder / Purchase Order Modal
window.openReorderModal = function(id) {
  const item = inventory.find(i => i.id === id);
  if (!item) return;
  activeItemForAction = item;

  const suggestedOrder = Math.max(item.minQty * 2, 20);
  document.getElementById('reorderItemName').textContent = `${item.name} (${item.sku})`;
  document.getElementById('reorderSupplierName').textContent = item.supplier || 'Standard Vendor';
  document.getElementById('reorderLeadTime').textContent = `${item.leadTimeDays || 7} business days`;
  document.getElementById('reorderQtyInput').value = suggestedOrder;
  document.getElementById('reorderEstCost').textContent = `$${(suggestedOrder * item.unitCost).toFixed(2)}`;

  modalBackdrop.classList.add('open');
  reorderModal.classList.add('open');
};

document.getElementById('reorderQtyInput').addEventListener('input', (e) => {
  if (!activeItemForAction) return;
  const qty = parseInt(e.target.value, 10) || 0;
  document.getElementById('reorderEstCost').textContent = `$${(qty * activeItemForAction.unitCost).toFixed(2)}`;
});

document.getElementById('btnConfirmReorder').addEventListener('click', () => {
  if (!activeItemForAction) return;
  const qty = parseInt(document.getElementById('reorderQtyInput').value, 10) || 0;

  // Simulate pending PO delivery
  if (!activeItemForAction.movements) activeItemForAction.movements = [];
  activeItemForAction.movements.unshift({
    date: new Date().toISOString().slice(0, 10),
    type: 'in',
    qty: qty,
    reason: `PO CREATED: Ordered ${qty} units from ${activeItemForAction.supplier}`
  });

  saveState();
  renderInventoryTable();
  closeModal();
  showToast(`Purchase order created for ${qty} units of ${activeItemForAction.sku}!`);
});

// 3. New Item Modal
document.getElementById('btnNewItem').addEventListener('click', () => {
  modalBackdrop.classList.add('open');
  newItemModal.classList.add('open');
});

document.getElementById('btnSaveNewItem').addEventListener('click', () => {
  const name = document.getElementById('newProdName').value.trim();
  const sku = document.getElementById('newProdSku').value.trim();
  const category = document.getElementById('newProdCategory').value.trim() || 'General';
  const persona = document.getElementById('newProdPersona').value;
  const location = document.getElementById('newProdLocation').value;
  const qty = parseInt(document.getElementById('newProdQty').value, 10) || 0;
  const minQty = parseInt(document.getElementById('newProdMin').value, 10) || 5;
  const cost = parseFloat(document.getElementById('newProdCost').value) || 0;
  const price = parseFloat(document.getElementById('newProdPrice').value) || 0;
  const supplier = document.getElementById('newProdSupplier').value.trim() || 'Direct Supplier';

  if (!name || !sku) {
    showToast('Product name and SKU are required');
    return;
  }

  const newItem = {
    id: 'SKU-' + Date.now().toString().slice(-4),
    sku: sku.toUpperCase(),
    barcode: Math.floor(100000000000 + Math.random() * 900000000000).toString(),
    name: name,
    category: category,
    persona: persona,
    location: location,
    qty: qty,
    minQty: minQty,
    unitCost: cost,
    unitPrice: price,
    supplier: supplier,
    leadTimeDays: 7,
    movements: [
      { date: new Date().toISOString().slice(0, 10), type: 'in', qty: qty, reason: 'Initial inventory catalog entry' }
    ]
  };

  inventory.unshift(newItem);
  saveState();
  renderInventoryTable();
  closeModal();

  // Reset form
  document.getElementById('newProdName').value = '';
  document.getElementById('newProdSku').value = '';
  document.getElementById('newProdCost').value = '';
  document.getElementById('newProdPrice').value = '';

  showToast(`Added ${newItem.name} (${newItem.sku}) to inventory`);
});

// 4. SKU Details Drawer / Modal
window.openDetailDrawer = function(id) {
  const item = inventory.find(i => i.id === id);
  if (!item) return;

  document.getElementById('detailDrawerTitle').textContent = item.name;
  document.getElementById('detailDrawerSku').textContent = `SKU: ${item.sku} · Barcode: ${item.barcode}`;
  document.getElementById('detailDrawerLocation').textContent = item.location;
  document.getElementById('detailDrawerCategory').textContent = item.category;
  document.getElementById('detailDrawerQty').textContent = `${item.qty} units`;
  document.getElementById('detailDrawerMin').textContent = `${item.minQty} units`;
  document.getElementById('detailDrawerCost').textContent = `$${item.unitCost.toFixed(2)}`;
  document.getElementById('detailDrawerPrice').textContent = `$${item.unitPrice.toFixed(2)}`;

  const margin = item.unitPrice > 0 ? (((item.unitPrice - item.unitCost) / item.unitPrice) * 100).toFixed(1) : 0;
  document.getElementById('detailDrawerMargin').textContent = `${margin}%`;

  const logList = document.getElementById('detailMovementLogs');
  if (item.movements && item.movements.length > 0) {
    logList.innerHTML = item.movements.map(m => `
      <div class="history-log-row">
        <div>
          <div class="history-log-type ${m.type}">${m.type === 'in' ? '+' + m.qty + ' Stock In' : '-' + m.qty + ' Stock Out'}</div>
          <div class="history-log-meta">${escapeHtml(m.reason)}</div>
        </div>
        <div style="font-size:.72rem; color:var(--ink-faint);">${m.date}</div>
      </div>
    `).join('');
  } else {
    logList.innerHTML = `<div style="text-align:center; padding:1rem; color:var(--ink-faint); font-size:.8rem;">No stock movement history recorded yet.</div>`;
  }

  modalBackdrop.classList.add('open');
  detailDrawer.classList.add('open');
};

// ===================================================================
// EVENT LISTENERS & FILTER CLICKS
// ===================================================================
// 1. Industry / Client Persona Switcher
personaPills.forEach(pill => {
  pill.addEventListener('click', () => {
    personaPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    activePersona = pill.dataset.persona;
    renderInventoryTable();
    showToast(`Filtered by ${pill.textContent.trim()}`);
  });
});

// 2. Stock Status Chips
stockFilterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    stockFilterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeStockFilter = chip.dataset.status;
    renderInventoryTable();
  });
});

// 3. Warehouse Location Select
if (locationSelect) {
  locationSelect.addEventListener('change', (e) => {
    activeLocation = e.target.value;
    renderInventoryTable();
  });
}

// 4. Live Search Input
if (tableSearch) {
  tableSearch.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderInventoryTable();
  });
}

// 5. Global Top Search Input
const topSearch = document.getElementById('topSearch');
if (topSearch) {
  topSearch.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderInventoryTable();
  });
}

// 6. Export CSV
document.getElementById('btnExportCsv').addEventListener('click', () => {
  const filtered = getFilteredItems();
  let csv = 'SKU,Product Name,Category,Persona,Location,Quantity,Min Safe Stock,Cost Price,Selling Price,Valuation,Supplier\n';
  filtered.forEach(it => {
    const val = (it.qty * it.unitCost).toFixed(2);
    csv += `"${it.sku}","${it.name}","${it.category}","${it.persona}","${it.location}",${it.qty},${it.minQty},${it.unitCost},${it.unitPrice},${val},"${it.supplier || ''}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `inventory-report-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('Inventory report downloaded as CSV');
});

// Toast notification helper
function showToast(msg) {
  if (!toastStack) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg><span>${escapeHtml(msg)}</span>`;
  toastStack.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('leaving');
    setTimeout(() => toast.remove(), 250);
  }, 2400);
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

// Sidebar & Shell Controls
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

// Ambient Mouse Parallax
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth * 100).toFixed(1);
  const y = (e.clientY / window.innerHeight * 100).toFixed(1);
  document.documentElement.style.setProperty('--mx', `${x}%`);
  document.documentElement.style.setProperty('--my', `${y}%`);
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    if (tableSearch) tableSearch.focus();
  }
});

// Init
window.addEventListener('DOMContentLoaded', () => {
  renderInventoryTable();
  requestAnimationFrame(() => document.body.classList.add('loaded'));
});
