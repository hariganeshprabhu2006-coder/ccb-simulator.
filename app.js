// SCM CCB Simulator & Configuration Item Registry
// Vit SCM Review 3 Implementation

// Initial Sample Data (Consistent with Review 1 and Review 2 Slides)
const DEFAULT_CIS = [
  {
    id: "CI-AUTH-01",
    name: "UserAuthenticationService.js",
    category: "Source Code",
    currentVersion: "1.0",
    baselineVersion: "1.0",
    baselineStatus: "Baselined",
    owner: "Member A (Developer)",
    lastModified: "2026-10-18 10:30",
    history: [
      { version: "1.0", date: "2026-10-18 10:30", author: "Member A", comment: "Initial baseline release BL-v1.0" }
    ]
  },
  {
    id: "CI-SRS-01",
    name: "SystemRequirementsSpec_v1.0.pdf",
    category: "Documentation",
    currentVersion: "1.0",
    baselineVersion: "1.0",
    baselineStatus: "Baselined",
    owner: "Member C (Admin)",
    lastModified: "2026-10-15 14:00",
    history: [
      { version: "1.0", date: "2026-10-15 14:00", author: "Member C", comment: "Review 1 approved SRS document" }
    ]
  },
  {
    id: "CI-DB-02",
    name: "schema_migration_v1.sql",
    category: "Database",
    currentVersion: "1.1",
    baselineVersion: "1.0",
    baselineStatus: "Baselined",
    owner: "Member B (CCB Chair)",
    lastModified: "2026-10-20 16:45",
    history: [
      { version: "1.0", date: "2026-10-16 09:00", author: "Member B", comment: "Initial relational schema" },
      { version: "1.1", date: "2026-10-20 16:45", author: "Member B", comment: "CR-100: Added foreign key constraints" }
    ]
  },
  {
    id: "CI-PAY-03",
    name: "PaymentGatewayAdapter.ts",
    category: "Source Code",
    currentVersion: "1.0",
    baselineVersion: "1.0",
    baselineStatus: "Draft",
    owner: "Member A (Developer)",
    lastModified: "2026-10-21 11:20",
    history: [
      { version: "1.0", date: "2026-10-21 11:20", author: "Member A", comment: "Draft checkout module implementation" }
    ]
  },
  {
    id: "CI-TEST-01",
    name: "Automated_Regression_Suite.test.js",
    category: "Test Suite",
    currentVersion: "1.2",
    baselineVersion: "1.2",
    baselineStatus: "Baselined",
    owner: "Member C (Auditor)",
    lastModified: "2026-10-21 18:00",
    history: [
      { version: "1.0", date: "2026-10-17 12:00", author: "Member C", comment: "Unit tests" },
      { version: "1.1", date: "2026-10-19 14:30", author: "Member C", comment: "Added auth mocks" },
      { version: "1.2", date: "2026-10-21 18:00", author: "Member C", comment: "Integration test assertions" }
    ]
  }
];

const DEFAULT_CRS = [
  {
    id: "CR-101",
    ciId: "CI-AUTH-01",
    title: "Implement Multi-Factor Authentication (MFA) & Secure Token Refresh",
    classification: "Major",
    requester: "Member A (Developer)",
    description: "Upgrade OAuth2 workflow to include mandatory MFA SMS/TOTP challenge for admin sessions.",
    impact: "Impacts login endpoint, requires database token cache update, and regression testing on auth flows.",
    status: "Pending",
    submissionDate: "2026-10-19 09:15", // Older than 48 hours to trigger SLA flag!
    isStale: true,
    decision: null,
    rationale: "",
    resultingVersion: "",
    decidedDate: null
  },
  {
    id: "CR-102",
    ciId: "CI-PAY-03",
    title: "Support Webhook Retry Logic for UPI & Credit Card Gateway",
    classification: "Minor",
    requester: "Member A (Developer)",
    description: "Add exponential backoff retry logic (up to 3 attempts) on failed payment confirmation webhooks.",
    impact: "Payment reliability improvement; requires mock webhook testing.",
    status: "Pending",
    submissionDate: "2026-10-22 10:00",
    isStale: false,
    decision: null,
    rationale: "",
    resultingVersion: "",
    decidedDate: null
  },
  {
    id: "CR-100",
    ciId: "CI-DB-02",
    title: "Add Foreign Key Indices for Order History Queries",
    classification: "Minor",
    requester: "Member B (CCB Chair)",
    description: "Optimize SQL joins across users and transactions table by adding index constraints.",
    impact: "Low risk; migration tested in local staging environment.",
    status: "Approved",
    submissionDate: "2026-10-20 12:00",
    isStale: false,
    decision: "Approved",
    rationale: "Performance benchmarks validated. Safe schema alteration.",
    resultingVersion: "1.1",
    decidedDate: "2026-10-20 16:45"
  }
];

const DEFAULT_LOGS = [
  {
    id: "LOG-01",
    timestamp: "2026-10-15 14:00:00",
    user: "Member C (Admin)",
    role: "Admin",
    action: "BASELINE CREATED",
    details: "Established Project Baseline BL-v1.0 (SRS Approved)."
  },
  {
    id: "LOG-02",
    timestamp: "2026-10-18 10:30:00",
    user: "Member A (Developer)",
    role: "Developer",
    action: "CI REGISTERED",
    details: "Registered CI-AUTH-01 (UserAuthenticationService.js) at version 1.0."
  },
  {
    id: "LOG-03",
    timestamp: "2026-10-19 09:15:00",
    user: "Member A (Developer)",
    role: "Developer",
    action: "CR SUBMITTED",
    details: "Raised CR-101 (Major) for CI-AUTH-01: Multi-Factor Authentication."
  },
  {
    id: "LOG-04",
    timestamp: "2026-10-20 16:45:00",
    user: "Member B (Chairperson)",
    role: "CCB Chair",
    action: "CR APPROVED & AUTO-VERSIONED",
    details: "Approved CR-100 for CI-DB-02. Auto-incremented version from 1.0 to 1.1."
  }
];

const DEFAULT_FCA_ITEMS = [
  { id: "FCA-1", req: "REQ-AUTH-01: User authentication with token issuance", verified: true, testRef: "TEST-SUITE-AUTH-01" },
  { id: "FCA-2", req: "REQ-AUTH-02: Multi-Factor Authentication enforcement", verified: false, testRef: "Pending CR-101 Approval & Merge" },
  { id: "FCA-3", req: "REQ-DB-01: Foreign key referential integrity constraints", verified: true, testRef: "TEST-SUITE-DB-03" },
  { id: "FCA-4", req: "REQ-PAY-01: Payment transaction idempotency & error handling", verified: true, testRef: "TEST-SUITE-PAY-02" },
  { id: "FCA-5", req: "REQ-SCM-01: Automated audit trail logging for all CCB verdicts", verified: true, testRef: "SCM-AUDIT-VERIFY" }
];

// In-Memory / LocalStorage State Management
let CIs = [];
let CRs = [];
let HistoryLogs = [];
let FcaItems = [];
let activeRole = "chairperson"; // 'developer', 'chairperson', 'admin', 'viewer'
let selectedCrForReview = null;
let chosenDecision = "Approved";

// Chart instances
let statusChartInstance = null;
let typeChartInstance = null;

// Initialize System
function initSystem() {
  loadData();
  setupRoleInterface();
  renderAll();
  checkStaleAlerts();
}

// Data Storage Utilities
function loadData() {
  try {
    const storedCIs = localStorage.getItem("scm_cis");
    const storedCRs = localStorage.getItem("scm_crs");
    const storedLogs = localStorage.getItem("scm_logs");
    const storedFca = localStorage.getItem("scm_fca");

    CIs = storedCIs ? JSON.parse(storedCIs) : [...DEFAULT_CIS];
    CRs = storedCRs ? JSON.parse(storedCRs) : [...DEFAULT_CRS];
    HistoryLogs = storedLogs ? JSON.parse(storedLogs) : [...DEFAULT_LOGS];
    FcaItems = storedFca ? JSON.parse(storedFca) : [...DEFAULT_FCA_ITEMS];
  } catch (e) {
    console.error("Failed to load localStorage, using defaults", e);
    CIs = [...DEFAULT_CIS];
    CRs = [...DEFAULT_CRS];
    HistoryLogs = [...DEFAULT_LOGS];
    FcaItems = [...DEFAULT_FCA_ITEMS];
  }
}

function saveData() {
  localStorage.setItem("scm_cis", JSON.stringify(CIs));
  localStorage.setItem("scm_crs", JSON.stringify(CRs));
  localStorage.setItem("scm_logs", JSON.stringify(HistoryLogs));
  localStorage.setItem("scm_fca", JSON.stringify(FcaItems));
}

function resetToSampleData() {
  if (confirm("Reset simulator database to initial Review 2 slide data?")) {
    CIs = JSON.parse(JSON.stringify(DEFAULT_CIS));
    CRs = JSON.parse(JSON.stringify(DEFAULT_CRS));
    HistoryLogs = JSON.parse(JSON.stringify(DEFAULT_LOGS));
    FcaItems = JSON.parse(JSON.stringify(DEFAULT_FCA_ITEMS));
    saveData();
    renderAll();
    showToast("Data restored to Review 2 presentation baseline!", "info");
  }
}

// Logging Utility (Immutable Audit Log)
function logAudit(action, details) {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const userMap = {
    developer: "Member A (Developer)",
    chairperson: "Member B (CCB Chair)",
    admin: "Member C (Admin)",
    viewer: "Guest (Viewer)"
  };
  const roleMap = {
    developer: "Developer",
    chairperson: "CCB Chair",
    admin: "Admin",
    viewer: "Viewer"
  };

  const newLog = {
    id: "LOG-" + (HistoryLogs.length + 1).toString().padStart(2, '0'),
    timestamp: timestamp,
    user: userMap[activeRole] || activeRole,
    role: roleMap[activeRole] || activeRole,
    action: action,
    details: details
  };

  HistoryLogs.unshift(newLog);
  saveData();
  renderHistory();
}

// Tab Switching
function switchTab(tabKey) {
  const allContents = document.querySelectorAll('.tab-content');
  allContents.forEach(content => content.classList.add('hidden'));

  const activeContent = document.getElementById(`view-${tabKey}`);
  if (activeContent) activeContent.classList.remove('hidden');

  const allTabs = document.querySelectorAll('.tab-btn');
  allTabs.forEach(btn => {
    btn.classList.remove('bg-indigo-600', 'text-white');
    btn.classList.add('text-slate-400', 'hover:text-white', 'hover:bg-slate-700/50');
  });

  const activeBtn = document.getElementById(`tab-${tabKey}`);
  if (activeBtn) {
    activeBtn.classList.remove('text-slate-400', 'hover:bg-slate-700/50');
    activeBtn.classList.add('bg-indigo-600', 'text-white');
  }

  // Refresh charts if opening CSA
  if (tabKey === 'csa') {
    setTimeout(renderCharts, 100);
  }
}

// Role Handling (RBAC)
function handleRoleChange() {
  activeRole = document.getElementById('roleSelector').value;
  setupRoleInterface();
  showToast(`Active persona switched to: ${getRoleTitle(activeRole)}`, "info");
}

function getRoleTitle(role) {
  switch (role) {
    case 'developer': return 'Member A (Developer)';
    case 'chairperson': return 'Member B (CCB Chairperson)';
    case 'admin': return 'Member C (SCM Admin / Auditor)';
    case 'viewer': return 'Stakeholder (Viewer Only)';
    default: return role;
  }
}

function setupRoleInterface() {
  const addCiBtn = document.getElementById('addCiBtn');
  const crRequesterInput = document.getElementById('crRequester');
  
  if (activeRole === 'viewer') {
    if (addCiBtn) addCiBtn.classList.add('hidden');
    if (crRequesterInput) crRequesterInput.disabled = true;
  } else {
    if (addCiBtn) addCiBtn.classList.remove('hidden');
    if (crRequesterInput) {
      crRequesterInput.disabled = false;
      crRequesterInput.value = getRoleTitle(activeRole);
    }
  }

  // Re-render CCB queue to disable buttons if not chairperson or admin
  renderCcbQueue();
}

// Check for Stale CRs (> 48 hours pending without decision)
function checkStaleAlerts() {
  const pendingCrs = CRs.filter(cr => cr.status === 'Pending');
  const hasStale = pendingCrs.some(cr => cr.isStale);

  const staleBadge = document.getElementById('staleBadge');
  const alertBanner = document.getElementById('staleAlertBanner');

  if (hasStale) {
    if (staleBadge) staleBadge.classList.remove('hidden');
    if (alertBanner) alertBanner.classList.remove('hidden');
  } else {
    if (staleBadge) staleBadge.classList.add('hidden');
    if (alertBanner) alertBanner.classList.add('hidden');
  }
}

// Render All Components
function renderAll() {
  renderCIs();
  populateCrTargetDropdown();
  renderCcbQueue();
  renderCcbConcluded();
  renderCsaDashboard();
  renderPcaTable();
  renderFcaChecklist();
  renderHistory();
  updateBadges();
  checkStaleAlerts();
}

function updateBadges() {
  const ciBadge = document.getElementById('ciCountBadge');
  if (ciBadge) ciBadge.textContent = CIs.length;

  const pendingCount = CRs.filter(c => c.status === 'Pending').length;
  const pendingBadge = document.getElementById('pendingCrBadge');
  if (pendingBadge) pendingBadge.textContent = pendingCount;

  const queueCount = document.getElementById('pendingQueueCount');
  if (queueCount) queueCount.textContent = pendingCount;
}

// ==========================================
// 1. CI REGISTRY MODULE
// ==========================================
function renderCIs() {
  const tbody = document.getElementById('ciTableBody');
  if (!tbody) return;

  const query = (document.getElementById('ciSearchInput')?.value || '').toLowerCase();
  const filtered = CIs.filter(ci => 
    ci.id.toLowerCase().includes(query) ||
    ci.name.toLowerCase().includes(query) ||
    ci.category.toLowerCase().includes(query) ||
    ci.owner.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-6 text-slate-500">No Configuration Items match criteria.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(ci => {
    const isBaselined = ci.baselineStatus === 'Baselined';
    const statusBadge = isBaselined 
      ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 w-max"><i class="fa-solid fa-lock text-[9px]"></i> Baselined</span>`
      : `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1 w-max"><i class="fa-solid fa-pen-ruler text-[9px]"></i> Draft</span>`;

    return `
      <tr class="hover:bg-slate-700/20 transition">
        <td class="px-4 py-3 font-mono font-bold text-cyan-400">${ci.id}</td>
        <td class="px-4 py-3">
          <div class="font-semibold text-white">${ci.name}</div>
          <div class="text-[10px] text-slate-400">Baseline Tag: BL-${ci.baselineVersion}</div>
        </td>
        <td class="px-4 py-3">
          <span class="px-2 py-0.5 rounded text-[10px] bg-slate-700 text-slate-300">${ci.category}</span>
        </td>
        <td class="px-4 py-3 font-mono text-white font-bold">v${ci.currentVersion}</td>
        <td class="px-4 py-3">${statusBadge}</td>
        <td class="px-4 py-3 text-slate-300">${ci.owner}</td>
        <td class="px-4 py-3 text-slate-400 text-[11px]">${ci.lastModified}</td>
        <td class="px-4 py-3 text-right">
          <button onclick="quickRaiseCr('${ci.id}')" class="px-2.5 py-1 text-[11px] rounded bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 font-semibold transition" title="Raise CR against this CI">
            <i class="fa-solid fa-file-pen mr-1"></i> Raise CR
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function openAddCiModal() {
  if (activeRole === 'viewer') {
    showToast("Stakeholder (Viewer) has read-only access. Switch role to Developer or Admin.", "error");
    return;
  }
  document.getElementById('addCiModal').classList.remove('hidden');
}

function closeAddCiModal() {
  document.getElementById('addCiModal').classList.add('hidden');
  document.getElementById('newCiForm').reset();
}

function handleCreateCI(e) {
  e.preventDefault();
  const id = document.getElementById('newCiId').value.trim().toUpperCase();
  const name = document.getElementById('newCiName').value.trim();
  const category = document.getElementById('newCiCategory').value;
  const version = document.getElementById('newCiVersion').value.trim();
  const owner = document.getElementById('newCiOwner').value.trim();
  const baselineStatus = document.getElementById('newCiBaseline').value;

  if (CIs.some(c => c.id === id)) {
    alert(`Configuration Item with ID ${id} already exists in registry!`);
    return;
  }

  const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

  const newCi = {
    id: id,
    name: name,
    category: category,
    currentVersion: version,
    baselineVersion: version,
    baselineStatus: baselineStatus,
    owner: owner,
    lastModified: now,
    history: [
      { version: version, date: now, author: owner, comment: `Registered CI in ${baselineStatus} state.` }
    ]
  };

  CIs.push(newCi);
  saveData();
  logAudit("CI REGISTERED", `Added ${id} (${name}) at v${version} as ${baselineStatus}.`);
  closeAddCiModal();
  renderAll();
  showToast(`Successfully registered ${id} in CI Registry!`, "success");
}

function quickRaiseCr(ciId) {
  switchTab('cr-form');
  const dropdown = document.getElementById('crTargetCi');
  if (dropdown) dropdown.value = ciId;
}

// ==========================================
// 2. CHANGE REQUEST (CR) ENGINE
// ==========================================
function populateCrTargetDropdown() {
  const select = document.getElementById('crTargetCi');
  if (!select) return;

  select.innerHTML = CIs.map(ci => `
    <option value="${ci.id}">
      [${ci.id}] ${ci.name} (Current: v${ci.currentVersion} - ${ci.baselineStatus})
    </option>
  `).join('');
}

function handleCRSubmit(e) {
  e.preventDefault();

  if (activeRole === 'viewer') {
    showToast("Viewer persona cannot submit Change Requests.", "error");
    return;
  }

  const ciId = document.getElementById('crTargetCi').value;
  const title = document.getElementById('crTitle').value.trim();
  const classification = document.getElementById('crClassification').value;
  const requester = document.getElementById('crRequester').value.trim();
  const description = document.getElementById('crDescription').value.trim();
  const impact = document.getElementById('crImpact').value.trim();

  const nextCrNum = 100 + CRs.length + 1;
  const crId = `CR-${nextCrNum}`;
  const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

  const newCr = {
    id: crId,
    ciId: ciId,
    title: title,
    classification: classification,
    requester: requester,
    description: description,
    impact: impact,
    status: "Pending",
    submissionDate: now,
    isStale: false,
    decision: null,
    rationale: "",
    resultingVersion: "",
    decidedDate: null
  };

  CRs.unshift(newCr);
  saveData();
  logAudit("CR SUBMITTED", `Raised ${crId} for ${ciId} [${classification}]: ${title}`);
  
  document.getElementById('crSubmitForm').reset();
  renderAll();
  showToast(`Change Request ${crId} submitted to CCB queue!`, "success");

  // Switch to CCB queue to view
  setTimeout(() => switchTab('ccb'), 600);
}

// ==========================================
// 3. CCB ADJUDICATION & AUTO-VERSIONING
// ==========================================
function renderCcbQueue() {
  const container = document.getElementById('ccbQueueContainer');
  if (!container) return;

  const pendingList = CRs.filter(c => c.status === 'Pending');

  if (pendingList.length === 0) {
    container.innerHTML = `
      <div class="bg-slate-800/40 p-6 rounded-xl border border-slate-700/60 text-center text-slate-400">
        <i class="fa-solid fa-circle-check text-emerald-400 text-3xl mb-2"></i>
        <p class="font-semibold text-white">All Clear! No Pending Change Requests</p>
        <p class="text-xs text-slate-500 mt-1">Submit a new CR from the "Raise Change Request" tab to simulate the review flow.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = pendingList.map(cr => {
    const ci = CIs.find(c => c.id === cr.ciId) || { name: "Unknown", currentVersion: "1.0" };
    
    // Class badges
    let classBadge = "";
    if (cr.classification === 'Major') {
      classBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">Major Change (v+1.0)</span>`;
    } else if (cr.classification === 'Emergency') {
      classBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Emergency Hotfix</span>`;
    } else {
      classBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Minor Change (v+0.1)</span>`;
    }

    // Stale warning indicator
    const staleHtml = cr.isStale ? `
      <div class="bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded text-rose-300 text-[11px] font-semibold flex items-center gap-1.5 animate-pulse">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <span>Pending &gt; 48 hrs (SLA Breach)</span>
      </div>
    ` : '';

    const canReview = (activeRole === 'chairperson' || activeRole === 'admin');

    return `
      <div class="bg-slate-800 p-4 rounded-xl border ${cr.isStale ? 'border-rose-500/50' : 'border-slate-700'} shadow-md space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-2.5">
          <div class="flex items-center space-x-2">
            <span class="font-mono font-bold text-cyan-400 text-sm">${cr.id}</span>
            <span class="text-slate-500">&bull;</span>
            <span class="font-mono text-slate-300 text-xs">${cr.ciId}</span>
            <span class="text-slate-500">&bull;</span>
            ${classBadge}
          </div>
          <div class="flex items-center space-x-2">
            ${staleHtml}
            <span class="text-[11px] text-slate-400">Raised: ${cr.submissionDate} by ${cr.requester}</span>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-semibold text-white">${cr.title}</h4>
          <p class="text-xs text-slate-300 mt-1">${cr.description}</p>
        </div>

        <div class="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div><strong class="text-slate-300">Target CI:</strong> ${ci.name} (Current baseline: <span class="font-mono text-white">v${ci.currentVersion}</span>)</div>
          <div><strong class="text-slate-300">Impact:</strong> ${cr.impact}</div>
        </div>

        <div class="flex items-center justify-end space-x-2 pt-1">
          ${canReview ? `
            <button onclick="openCcbReviewModal('${cr.id}')" class="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow transition">
              <i class="fa-solid fa-gavel"></i> Adjudicate / Review
            </button>
          ` : `
            <span class="text-slate-500 text-xs italic">Only CCB Chairperson or Admin can adjudicate.</span>
          `}
        </div>
      </div>
    `;
  }).join('');
}

function renderCcbConcluded() {
  const tbody = document.getElementById('ccbConcludedTableBody');
  if (!tbody) return;

  const concluded = CRs.filter(c => c.status !== 'Pending');

  if (concluded.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-slate-500">No concluded decisions yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = concluded.map(cr => {
    let decisionBadge = "";
    if (cr.decision === 'Approved') {
      decisionBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Approved</span>`;
    } else if (cr.decision === 'Rejected') {
      decisionBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">Rejected</span>`;
    } else {
      decisionBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-500/20 text-slate-300 border border-slate-500/30">Deferred</span>`;
    }

    return `
      <tr class="hover:bg-slate-700/20 transition">
        <td class="px-4 py-2.5 font-mono text-cyan-400 font-bold">${cr.id}</td>
        <td class="px-4 py-2.5 font-mono text-slate-300">${cr.ciId}</td>
        <td class="px-4 py-2.5 text-white font-medium">${cr.title}</td>
        <td class="px-4 py-2.5 text-[11px] text-slate-300">${cr.classification}</td>
        <td class="px-4 py-2.5">${decisionBadge}</td>
        <td class="px-4 py-2.5 font-mono text-white font-bold">${cr.resultingVersion ? 'v' + cr.resultingVersion : '&mdash;'}</td>
        <td class="px-4 py-2.5 text-slate-400 text-[11px] max-w-xs truncate" title="${cr.rationale}">${cr.rationale || 'N/A'}</td>
        <td class="px-4 py-2.5 text-slate-400 text-[11px]">${cr.decidedDate || 'N/A'}</td>
      </tr>
    `;
  }).join('');
}

// CCB Modal & Auto-Versioning Calculus
function openCcbReviewModal(crId) {
  selectedCrForReview = CRs.find(c => c.id === crId);
  if (!selectedCrForReview) return;

  const targetCi = CIs.find(c => c.id === selectedCrForReview.ciId);

  document.getElementById('modalCrId').textContent = selectedCrForReview.id;
  document.getElementById('modalCrTitle').textContent = selectedCrForReview.title;
  document.getElementById('modalCrCi').textContent = `Target CI: ${selectedCrForReview.ciId} (${targetCi ? targetCi.name : 'Unknown'}) &bull; Current Ver: v${targetCi ? targetCi.currentVersion : '1.0'}`;
  document.getElementById('modalCrDesc').textContent = selectedCrForReview.description;
  document.getElementById('modalCrBadge').textContent = selectedCrForReview.classification;

  // Calculate next version preview
  if (targetCi) {
    const nextVer = calculateNextVersion(targetCi.currentVersion, selectedCrForReview.classification);
    document.getElementById('modalNextVersionText').textContent = `v${targetCi.currentVersion} \u2192 v${nextVer}`;
  }

  selectDecision('Approved');
  document.getElementById('modalCcbRationale').value = "";
  document.getElementById('ccbReviewModal').classList.remove('hidden');
}

function closeCcbReviewModal() {
  document.getElementById('ccbReviewModal').classList.add('hidden');
  selectedCrForReview = null;
}

function selectDecision(decision) {
  chosenDecision = decision;
  const btnApprove = document.getElementById('btnDecideApprove');
  const btnReject = document.getElementById('btnDecideReject');
  const btnDefer = document.getElementById('btnDecideDefer');
  const versionPreview = document.getElementById('modalVersionPreview');

  [btnApprove, btnReject, btnDefer].forEach(b => {
    b.classList.remove('ring-2', 'ring-white');
  });

  if (decision === 'Approved') {
    btnApprove.classList.add('ring-2', 'ring-white');
    versionPreview.classList.remove('hidden');
  } else if (decision === 'Rejected') {
    btnReject.classList.add('ring-2', 'ring-white');
    versionPreview.classList.add('hidden');
  } else {
    btnDefer.classList.add('ring-2', 'ring-white');
    versionPreview.classList.add('hidden');
  }
}

// Auto-Versioning Engine (SWEBOK & Semantic Versioning Rules)
function calculateNextVersion(currentVer, classification) {
  const parts = currentVer.split('.').map(p => parseInt(p, 10));
  let major = parts[0] || 1;
  let minor = parts[1] || 0;

  if (classification === 'Major') {
    // Major bump: v1.1 -> v2.0
    return `${major + 1}.0`;
  } else if (classification === 'Minor') {
    // Minor bump: v1.0 -> v1.1
    return `${major}.${minor + 1}`;
  } else if (classification === 'Emergency') {
    // Emergency bump: e.g. patch or minor increment
    return parts.length > 2 ? `${major}.${minor}.${(parts[2] || 0) + 1}` : `${major}.${minor + 1}`;
  }
  return `${major}.${minor + 1}`;
}

function submitCcbDecision() {
  if (!selectedCrForReview) return;
  const rationale = document.getElementById('modalCcbRationale').value.trim();

  if (!rationale) {
    alert("Under SCM governance rules, a CCB rationale is strictly mandatory!");
    return;
  }

  const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
  const targetCi = CIs.find(c => c.id === selectedCrForReview.ciId);

  selectedCrForReview.status = chosenDecision;
  selectedCrForReview.decision = chosenDecision;
  selectedCrForReview.rationale = rationale;
  selectedCrForReview.decidedDate = now;
  selectedCrForReview.isStale = false;

  let versionBumpNote = "";

  if (chosenDecision === 'Approved' && targetCi) {
    const oldVer = targetCi.currentVersion;
    const newVer = calculateNextVersion(oldVer, selectedCrForReview.classification);

    // Apply auto-versioning
    targetCi.currentVersion = newVer;
    targetCi.lastModified = now;
    targetCi.history.push({
      version: newVer,
      date: now,
      author: getRoleTitle(activeRole),
      comment: `${selectedCrForReview.id}: ${selectedCrForReview.title} (Approved by CCB)`
    });

    selectedCrForReview.resultingVersion = newVer;
    versionBumpNote = ` Version auto-bumped from v${oldVer} \u2192 v${newVer}.`;
  }

  saveData();
  logAudit(`CCB ${chosenDecision.toUpperCase()}`, `Adjudicated ${selectedCrForReview.id} (${selectedCrForReview.title}) as ${chosenDecision}.${versionBumpNote} Rationale: ${rationale}`);
  
  closeCcbReviewModal();
  renderAll();
  showToast(`CCB Verdict recorded: ${selectedCrForReview.id} was ${chosenDecision}!`, chosenDecision === 'Approved' ? 'success' : 'info');
}

// ==========================================
// 4. STATUS ACCOUNTING (CSA) DASHBOARD
// ==========================================
function renderCsaDashboard() {
  const totalCis = CIs.length;
  const baselinedCis = CIs.filter(c => c.baselineStatus === 'Baselined').length;
  const approvedCrs = CRs.filter(c => c.status === 'Approved').length;
  const pendingCrs = CRs.filter(c => c.status === 'Pending').length;

  document.getElementById('csaTotalCis').textContent = totalCis;
  document.getElementById('csaBaselinedCis').textContent = baselinedCis;
  document.getElementById('csaApprovedCrs').textContent = approvedCrs;
  document.getElementById('csaPendingCrs').textContent = pendingCrs;

  // CSA Detailed Table
  const tbody = document.getElementById('csaTableBody');
  if (!tbody) return;

  tbody.innerHTML = CIs.map(ci => {
    const ciCrs = CRs.filter(c => c.ciId === ci.id);
    const latestCr = ciCrs.length > 0 ? ciCrs[0] : null;

    let crStatusBadge = `<span class="text-slate-500 italic">No CRs raised</span>`;
    if (latestCr) {
      if (latestCr.status === 'Approved') {
        crStatusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">${latestCr.id}: Approved</span>`;
      } else if (latestCr.status === 'Pending') {
        crStatusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">${latestCr.id}: In Review</span>`;
      } else {
        crStatusBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300">${latestCr.id}: ${latestCr.status}</span>`;
      }
    }

    const isMatch = ci.currentVersion === ci.baselineVersion;
    const integrityBadge = isMatch 
      ? `<span class="text-emerald-400 font-semibold flex items-center gap-1"><i class="fa-solid fa-circle-check"></i> Baseline Intact</span>`
      : `<span class="text-cyan-400 font-semibold flex items-center gap-1"><i class="fa-solid fa-arrow-trend-up"></i> Evolved via CR</span>`;

    return `
      <tr class="hover:bg-slate-700/20 transition">
        <td class="px-4 py-3 font-mono font-bold text-cyan-400">${ci.id}</td>
        <td class="px-4 py-3 font-medium text-white">${ci.name}</td>
        <td class="px-4 py-3 text-slate-300">${ci.category}</td>
        <td class="px-4 py-3 font-mono text-slate-300">v${ci.baselineVersion}</td>
        <td class="px-4 py-3 font-mono text-white font-bold">v${ci.currentVersion}</td>
        <td class="px-4 py-3 text-slate-300">${ciCrs.length}</td>
        <td class="px-4 py-3">${crStatusBadge}</td>
        <td class="px-4 py-3 text-[11px]">${integrityBadge}</td>
      </tr>
    `;
  }).join('');
}

function renderCharts() {
  // CR Status Doughnut Chart
  const approved = CRs.filter(c => c.status === 'Approved').length;
  const pending = CRs.filter(c => c.status === 'Pending').length;
  const rejected = CRs.filter(c => c.status === 'Rejected').length;
  const deferred = CRs.filter(c => c.status === 'Deferred').length;

  const ctxStatus = document.getElementById('crStatusChart')?.getContext('2d');
  if (ctxStatus) {
    if (statusChartInstance) statusChartInstance.destroy();
    statusChartInstance = new Chart(ctxStatus, {
      type: 'doughnut',
      data: {
        labels: ['Approved', 'Pending CCB', 'Rejected', 'Deferred'],
        datasets: [{
          data: [approved, pending, rejected, deferred],
          backgroundColor: ['#10b981', '#f59e0b', '#f43f5e', '#64748b'],
          borderWidth: 2,
          borderColor: '#1e293b'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#94a3b8', boxWidth: 12, font: { size: 10 } } }
        }
      }
    });
  }

  // CI Categories Bar Chart
  const categories = {};
  CIs.forEach(ci => {
    categories[ci.category] = (categories[ci.category] || 0) + 1;
  });

  const ctxType = document.getElementById('ciTypeChart')?.getContext('2d');
  if (ctxType) {
    if (typeChartInstance) typeChartInstance.destroy();
    typeChartInstance = new Chart(ctxType, {
      type: 'bar',
      data: {
        labels: Object.keys(categories),
        datasets: [{
          label: 'Count of Items',
          data: Object.values(categories),
          backgroundColor: '#6366f1',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { color: '#94a3b8', stepSize: 1 }, grid: { color: '#334155' } },
          x: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { display: false } }
        }
      }
    });
  }
}

function exportCsaReport() {
  let csv = "CI ID,Artifact Name,Category,Baseline Version,Current Version,Baseline Status,Owner,Last Modified\n";
  CIs.forEach(ci => {
    csv += `"${ci.id}","${ci.name}","${ci.category}","${ci.baselineVersion}","${ci.currentVersion}","${ci.baselineStatus}","${ci.owner}","${ci.lastModified}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `SCM_CSA_Report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Configuration Status Accounting CSV downloaded!", "success");
}

// ==========================================
// 5. AUDIT PAGE (FCA / PCA)
// ==========================================
function renderPcaTable() {
  const tbody = document.getElementById('pcaTableBody');
  if (!tbody) return;

  tbody.innerHTML = CIs.map(ci => {
    // Physical audit check: compare authorized baseline against live version
    const isCompliant = (ci.baselineStatus === 'Baselined') ? (ci.currentVersion >= ci.baselineVersion) : true;
    
    // Simulate drift detection for demonstration if needed
    const hasDrift = ci.id === 'CI-PAY-03'; // Sample draft item not yet baselined

    let driftBadge = "";
    let finding = "";

    if (hasDrift) {
      driftBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 w-max"><i class="fa-solid fa-triangle-exclamation"></i> Working Draft (Unbaselined)</span>`;
      finding = "Artifact in development; requires formal CCB baseline review before release tag BL-v2.0.";
    } else {
      driftBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 w-max"><i class="fa-solid fa-check"></i> Baselined &amp; Verified</span>`;
      finding = `Physical build SHA and version v${ci.currentVersion} accurately match authorized SCM ledger.`;
    }

    return `
      <tr class="hover:bg-slate-700/20 transition">
        <td class="px-4 py-2.5 font-mono text-cyan-400 font-bold">${ci.id}</td>
        <td class="px-4 py-2.5 text-white font-medium">${ci.name}</td>
        <td class="px-4 py-2.5 font-mono text-slate-300">v${ci.baselineVersion}</td>
        <td class="px-4 py-2.5 font-mono text-white font-bold">v${ci.currentVersion}</td>
        <td class="px-4 py-2.5">${driftBadge}</td>
        <td class="px-4 py-2.5 text-slate-400 text-[11px]">${finding}</td>
      </tr>
    `;
  }).join('');
}

function renderFcaChecklist() {
  const container = document.getElementById('fcaChecklistContainer');
  if (!container) return;

  container.innerHTML = FcaItems.map(item => `
    <div class="flex items-start space-x-3 p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
      <input type="checkbox" id="${item.id}" ${item.verified ? 'checked' : ''} onchange="toggleFcaVerification('${item.id}')" class="mt-0.5 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-800 border-slate-600">
      <div class="flex-1 text-xs">
        <label for="${item.id}" class="font-semibold text-slate-200 cursor-pointer">${item.req}</label>
        <div class="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
          <span>Verification Ref: <code class="text-cyan-400 font-mono">${item.testRef}</code></span>
          <span>&bull;</span>
          <span class="${item.verified ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}">${item.verified ? 'PASS (FCA Compliant)' : 'OPEN / PENDING'}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleFcaVerification(itemId) {
  const item = FcaItems.find(f => f.id === itemId);
  if (item) {
    item.verified = !item.verified;
    saveData();
    logAudit("FCA VERIFIED", `Updated verification state for ${item.id} (${item.req}) to ${item.verified ? 'VERIFIED' : 'UNVERIFIED'}.`);
    renderFcaChecklist();
    showToast(`FCA Checklist item updated!`, "info");
  }
}

function runConfigurationAudit() {
  logAudit("AUDIT EXECUTED", "Automated baseline verification & physical configuration audit executed across all CIs.");
  document.getElementById('pcaAuditStatus').textContent = "Status: Audit Complete (100% Integrity Validated)";
  document.getElementById('pcaAuditStatus').classList.remove('text-cyan-300');
  document.getElementById('pcaAuditStatus').classList.add('text-emerald-400', 'font-bold');
  showToast("Automated FCA/PCA baseline audit completed successfully!", "success");
}

// ==========================================
// 6. IMMUTABLE CHANGE HISTORY LOG
// ==========================================
function renderHistory() {
  const container = document.getElementById('timelineContainer');
  if (!container) return;

  if (HistoryLogs.length === 0) {
    container.innerHTML = `<p class="text-slate-500 text-xs italic pl-4">No audit logs recorded yet.</p>`;
    return;
  }

  container.innerHTML = HistoryLogs.map(log => `
    <div class="relative pl-6">
      <!-- Dot on vertical line -->
      <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-800 border-2 border-indigo-500 flex items-center justify-center">
        <div class="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
      </div>
      
      <div class="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60 text-xs space-y-1">
        <div class="flex items-center justify-between text-[11px] text-slate-400">
          <div class="flex items-center space-x-2">
            <span class="font-bold text-white">${log.user}</span>
            <span class="px-1.5 py-0.2 rounded text-[9px] bg-slate-700 text-slate-300">${log.role}</span>
          </div>
          <span class="font-mono text-slate-400">${log.timestamp}</span>
        </div>
        <div class="font-mono text-cyan-400 font-semibold text-[11px]">${log.action}</div>
        <p class="text-slate-300 text-xs">${log.details}</p>
      </div>
    </div>
  `).join('');
}

function clearHistoryLog() {
  if (confirm("Clear local change history log? (Demo purpose only; production SCM logs are immutable)")) {
    HistoryLogs = [];
    saveData();
    renderHistory();
    showToast("Audit log cleared.", "info");
  }
}

// Toast Notification System
function showToast(message, type = "info") {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bgColor = type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-rose-600' : 'bg-indigo-600';
  const icon = type === 'success' ? 'fa-check' : type === 'error' ? 'fa-triangle-exclamation' : 'fa-info';

  toast.className = `${bgColor} text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center space-x-2 transform transition-all duration-300 ease-out translate-y-2 opacity-0`;
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  // Auto remove
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// On Page Load
window.addEventListener('DOMContentLoaded', () => {
  initSystem();
});
