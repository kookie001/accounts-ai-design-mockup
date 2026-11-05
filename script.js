/* Accounts AI — design mockup. Everything is in-memory; no backend.
   Screens are <section class="screen"> elements toggled by class (no router). */

// ───────────────────────── icons (inline SVG, 24×24 stroke) ─────────────────────────
const ICONS = {
  bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0',
  search: 'M21 21l-4.3-4.3M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z',
  home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  swap: 'M17 4l4 4-4 4M21 8H7M7 20l-4-4 4-4M3 16h14',
  bar: 'M5 21V11M12 21V4M19 21v-7',
  plus: 'M12 5v14M5 12h14',
  mic: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3',
  'arrow-up': 'M12 19V5M5 12l7-7 7 7',
  camera: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  upload: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12',
  'chev-left': 'M15 18l-6-6 6-6', 'chev-right': 'M9 18l6-6-6-6', 'chev-down': 'M6 9l6 6 6-6', 'chev-up': 'M18 15l-6-6-6 6',
  x: 'M18 6 6 18M6 6l12 12',
  trending: 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
  cart: 'M6 6h15l-1.5 9H8L6 3H2M9 20.5h.01M18 20.5h.01',
  cube: 'M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7zM3.3 7 12 12l8.7-5M12 22V12',
  layers: 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  diamond: 'M6 3h12l4 6-10 12L2 9zM2 9h20',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
  calendar: 'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18',
  check: 'M20 6 9 17l-5-5',
  'add-circle': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v8M8 12h8',
  flash: 'M13 2 3 14h9l-1 8 10-12h-9z',
  down: 'M12 5v14M19 12l-7 7-7-7',
  chat: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  doc: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6',
  wifi: 'M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01',
};
const svg = (name, size = 20) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${ICONS[name]}"/></svg>`;
function paintIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach((el) => {
    el.innerHTML = svg(el.dataset.icon, +el.dataset.size || 20);
    el.style.display = 'inline-flex';
  });
}

// ───────────────────────── state ─────────────────────────
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
const wt = (n) => `${Number(n.toFixed(3))} g`;
const num = (s) => (Number.isFinite(parseFloat(s)) ? parseFloat(s) : 0);
const today = () => { const d = new Date(); return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`; };

const ledger = {
  entries: [],
  masters: { customer: [], supplier: [], salesman: [], purchaser: [], item: [], karat: ['24K', '22K', '18K', '14K'], basis: ['Gr. Wt', 'Nt. Wt.'] },
};

const TRANSACTIONS = [
  ['flash', 'Electricity Bill', 'Utilities', '₹2,340', 'dr', 'Today, 10:24 AM'],
  ['down', 'Client Payment', 'Income', '₹45,000', 'cr', 'Yesterday, 4:10 PM'],
  ['doc', 'Vendor Invoice', 'Purchases', '₹18,500', 'dr', 'Aug 4, 2:00 PM'],
  ['wifi', 'Internet Bill', 'Utilities', '₹999', 'dr', 'Aug 2, 9:15 AM'],
  ['down', 'Refund', 'Income', '₹1,200', 'cr', 'Jul 30, 6:45 PM'],
];

// ───────────────────────── navigation ─────────────────────────
const tabScreens = { Home: 'screenHome', Transactions: 'screenTransactions', Reports: 'screenReports' };
let currentTab = 'Home';

function showTab(name) {
  currentTab = name;
  $$('.screen.tab').forEach((s) => s.classList.toggle('active', s.id === tabScreens[name]));
  $$('.tab-btn').forEach((b) => b.classList.toggle('active', b.dataset.tab === name));
  closeAttach();
}
function openStack(id) {
  $('#tabbar').classList.add('hidden');
  $$('.screen.stack').forEach((s) => s.classList.toggle('active', s.id === id));
}
function back() {
  $$('.screen.stack').forEach((s) => s.classList.remove('active'));
  $('#tabbar').classList.remove('hidden');
}
function openReport(kind) {
  if (kind === 'stock') return go('stock');
  renderReport(kind);
  openStack('screenReport');
}
function go(target) {
  if (target === 'stock') { renderStock(); openStack('screenStock'); }
  else { renderEntry(target); openStack('screenEntry'); }
}

$$('.tab-btn').forEach((b) => b.addEventListener('click', () => showTab(b.dataset.tab)));
$$('[data-report]').forEach((b) => b.addEventListener('click', () => openReport(b.dataset.report)));
$$('[data-go]').forEach((b) => b.addEventListener('click', () => go(b.dataset.go)));

// Home shortcuts: chat / gold in-out / upload
$$('[data-chip]').forEach((b) =>
  b.addEventListener('click', () => {
    const k = b.dataset.chip;
    if (k === 'chat') {
      $('#chatInput').focus();
    } else if (k === 'upload') attach.hidden = false;
    else toast('Gold in/out');
  }),
);
$$('[data-action="back"]').forEach((b) => b.addEventListener('click', back));
$$('[data-action="back-stock"]').forEach((b) => b.addEventListener('click', () => openStack('screenStock')));

// ───────────────────────── drawer & theme ─────────────────────────
const drawer = $('#drawerLayer');
$$('[data-action="open-drawer"]').forEach((b) => b.addEventListener('click', () => drawer.classList.add('open')));
$$('[data-action="close-drawer"]').forEach((b) => b.addEventListener('click', () => drawer.classList.remove('open')));

function setTheme(mode) {
  document.documentElement.dataset.theme = mode;
  $('#themeLabel').textContent = mode === 'dark' ? 'Dark Mode' : 'Light Mode';
  $('#themeIcon').dataset.icon = mode === 'dark' ? 'moon' : 'sun';
  paintIcons($('#themeRow'));
}
$('#themeRow').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

// ───────────────────────── home: attach menu + chat ─────────────────────────
const attach = $('#attachLayer');
const closeAttach = () => (attach.hidden = true);
$('#plusBtn').addEventListener('click', () => (attach.hidden = !attach.hidden));
attach.addEventListener('click', (e) => { if (e.target === attach) closeAttach(); });
$$('.attach-opt').forEach((b) =>
  b.addEventListener('click', () => {
    closeAttach();
    if (b.dataset.action === 'upload') importSheet();
    toast(b.dataset.action === 'click' ? 'Photo added' : 'Sheet imported');
  }),
);

const input = $('#chatInput');
input.addEventListener('input', () => {
  const has = input.value.trim().length > 0;
  $('#sendBtn').hidden = !has;
  $('#micBtn').hidden = has;
});
input.addEventListener('keydown', (e) => e.key === 'Enter' && sendChat());
$('#sendBtn').addEventListener('click', sendChat);

function bot(text, kind = 'bot') {
  $('#homeIdle').hidden = true;
  const thread = $('#chatThread');
  thread.hidden = false;
  const el = document.createElement('div');
  el.className = `bubble ${kind}`;
  el.textContent = text;
  thread.appendChild(el);
  $('#homeScroll').scrollTop = 1e6;
  return el;
}
function sendChat() {
  const q = input.value.trim();
  if (!q) return;
  input.value = '';
  input.dispatchEvent(new Event('input'));
  bot(q, 'user');
  const typing = bot('working…', 'typing');
  setTimeout(() => { typing.remove(); bot(demoAnswer(q)); }, 900);
}
function demoAnswer() {
  return 'Demo reply.';
}

// ───────────────────────── transactions & reports ─────────────────────────
$('#txList').innerHTML = TRANSACTIONS.map(
  ([ic, title, cat, amt, kind, date]) => `
  <div class="card tx"><span class="tx-ic">${svg(ic, 18)}</span>
    <div class="tx-main"><b>${title}</b><small>${cat} · ${date}</small></div>
    <span class="amt ${kind}">${kind === 'cr' ? '+' : '−'}${amt}</span></div>`,
).join('');
$('#bars').innerHTML = [38, 62, 45, 80, 55, 70, 48]
  .map((v) => `<span style="height:${v}%;opacity:${0.55 + (v / 100) * 0.45}"></span>`).join('');

// ───────────────────────── entry (sales / purchase) ─────────────────────────
function dropdown({ label, kind, suffix = '', fixed = false, get, set, onChange }) {
  const wrap = document.createElement('div');
  wrap.className = 'field dd';
  let open = false, adding = false;
  const draw = () => {
    const opts = ledger.masters[kind];
    wrap.classList.toggle('open', open);
    wrap.innerHTML = `<span class="label">${label}</span>
      <button type="button" class="dd-btn ${get() ? '' : 'empty'}"><span>${get() ? get() + suffix : 'Select'}</span>${svg(open ? 'chev-up' : 'chev-down', 18)}</button>
      ${open ? `<div class="dd-list">
        ${opts.length || adding || fixed ? '' : '<div class="dd-note">No options</div>'}
        ${opts.map((o) => `<button type="button" class="dd-item ${o === get() ? 'sel' : ''}" data-v="${o}">${o}${suffix}</button>`).join('')}
        ${fixed ? '' : adding
          ? `<div class="dd-new"><input placeholder="New ${label.toLowerCase()}" autofocus><button type="button" data-ok>${svg('check', 18)}</button></div>`
          : `<button type="button" class="dd-add">${svg('add-circle', 18)} Add new</button>`}
      </div>` : ''}`;
    $('.dd-btn', wrap).onclick = () => { open = !open; adding = false; draw(); };
    $$('.dd-item', wrap).forEach((b) => (b.onclick = () => { set(b.dataset.v); open = false; draw(); onChange(); }));
    const add = $('.dd-add', wrap);
    if (add) add.onclick = () => { adding = true; draw(); $('.dd-new input', wrap).focus(); };
    const ok = $('[data-ok]', wrap);
    if (ok) {
      const commit = () => {
        const name = $('.dd-new input', wrap).value.trim();
        if (!name) return;
        if (!opts.some((o) => o.toLowerCase() === name.toLowerCase())) opts.push(name);
        set(name); open = false; adding = false; draw(); onChange();
      };
      ok.onclick = commit;
      $('.dd-new input', wrap).onkeydown = (e) => e.key === 'Enter' && commit();
    }
  };
  draw();
  return wrap;
}

const newItem = () => ({ name: '', code: '', design: '', gross: '', net: '', purity: '', karat: '',
  dShape: '', dValue: '', dColor: '', dClarity: '', dWt: '', dRate: '',
  cShape: '', cValue: '', cColor: '', cClarity: '', cWt: '', cRate: '', lRate: '', lBasis: '', lValue: '' });
const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const nextInvoice = (type) => {
  const used = new Set(ledger.entries.filter((e) => e.type === type).map((e) => e.invoice).filter(Boolean));
  return `${type === 'sales' ? 'SAL' : 'PUR'}-${String(used.size + 1).padStart(4, '0')}`;
};

const TOTAL_LABELS = ['Total Gross Weight', 'Total Net Weight', 'Total Diamond Weight', 'Total Diamond Value', 'Total Labour Amount', 'Total Amount'];

function renderEntry(type) {
  const isSales = type === 'sales';
  const title = isSales ? 'Sales' : 'Purchase';
  const head = { party: '' };
  const items = [];
  const invoice = nextInvoice(type);
  $('#entryTitle').textContent = `${title} report`;
  const body = $('#entryBody');
  const inp = (label, key, it, ph = '', mode = 'decimal') =>
    `<div class="field"><span class="label">${label}</span><input data-f="${key}" inputmode="${mode}" placeholder="${ph}" value="${esc(it[key])}"></div>`;
  const stoneCard = (label, p, it) => `
    <div class="float-card"><h3 class="card-title">${label}</h3>
      <div class="row2">${inp('Shape', p + 'Shape', it, '', 'text')}${inp('Value', p + 'Value', it, '0')}</div>
      <div class="row2">${inp('Color', p + 'Color', it, '', 'text')}${inp('Clarity', p + 'Clarity', it, '', 'text')}</div>
      <div class="row2">${inp('Weight', p + 'Wt', it, '0')}${inp('Rate', p + 'Rate', it, '0')}</div>
    </div>`;

  body.innerHTML = `
    <div class="float-card">
      <div class="date-row"><span class="label" style="margin:0">Date</span><span class="date-chip">${svg('calendar', 14)} ${today()}</span></div>
      <div class="date-row" style="margin-bottom:14px"><span class="label" style="margin:0">Invoice</span><span class="date-chip">${invoice}</span></div>
      <div id="ddParty"></div>
    </div>
    <div id="itemList"></div>
    <div class="float-card"><h3 class="card-title">Total</h3><div id="totals"></div></div>
    <div class="btn-row">
      <button class="save ghost" id="addItemBtn" type="button">Add more item</button>
      <button class="save" id="saveBtn" type="button" disabled>Save ${title.toLowerCase()}</button>
    </div>`;

  const calc = () => {
    // Totals are computed by the backend; the UI only renders them.
    $('#totals').innerHTML = TOTAL_LABELS.map((k) => `<div class="tot-row"><span>${k}</span><b>—</b></div>`).join('');
    $('#saveBtn').disabled = !(head.party && items.every((it) => it.name.trim()));
  };

  const numberItems = () => items.forEach((it, i) => {
    $('.item-head', it.el).hidden = items.length < 2;
    $('.item-head b', it.el).textContent = `Item ${i + 1}`;
  });

  const addItem = () => {
    const it = newItem();
    items.push(it);
    const el = document.createElement('div');
    el.innerHTML = `
      <div class="item-head"><b></b><button type="button" class="item-rm">Remove</button></div>
      <div class="float-card">
        ${inp('Item name', 'name', it, '', 'text')}${inp('Jewell code', 'code', it, '', 'text')}${inp('Design no.', 'design', it, '', 'text')}
      </div>
      <div class="float-card"><h3 class="card-title">Gold</h3>
        <div class="row2">${inp('Gross weight', 'gross', it, '0')}${inp('Net weight', 'net', it, '0')}</div>
        <div class="row2">${inp('Purity %', 'purity', it, '0')}<div data-dd="karat"></div></div>
      </div>
      ${stoneCard('Diamond', 'd', it)}${stoneCard('Color Stone', 'c', it)}
      <div class="float-card"><h3 class="card-title">Labour</h3>
        <div class="row2">${inp('Labour rate', 'lRate', it, '0')}<div data-dd="basis"></div></div>
        ${inp('Labour value', 'lValue', it, '0')}
      </div>`;
    it.el = el;
    $$('[data-f]', el).forEach((x) => x.addEventListener('input', () => { it[x.dataset.f] = x.value; calc(); }));
    $('[data-dd="karat"]', el).appendChild(dropdown({ label: 'Karat', kind: 'karat', get: () => it.karat, set: (v) => (it.karat = v), onChange: calc }));
    $('[data-dd="basis"]', el).appendChild(dropdown({ label: 'Per', kind: 'basis', fixed: true, get: () => it.lBasis, set: (v) => (it.lBasis = v), onChange: calc }));
    $('.item-rm', el).onclick = () => { items.splice(items.indexOf(it), 1); el.remove(); numberItems(); calc(); };
    $('#itemList').appendChild(el);
    numberItems();
    calc();
    return el;
  };

  $('#ddParty').appendChild(dropdown({ label: isSales ? 'Customer name' : 'Supplier name', kind: isSales ? 'customer' : 'supplier',
    get: () => head.party, set: (v) => (head.party = v), onChange: calc }));
  addItem();
  $('#addItemBtn').onclick = () => { const el = addItem(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  $('#saveBtn').onclick = () => {
    items.forEach((it) => addEntry({ type, invoice, party: head.party, item: it.name.trim(), net: it.net }));
    toast(`${title} saved`);
    renderEntry(type);
    $('#screenEntry .scroll').scrollTop = 0;
  };
}

// Every source (form, chat, uploaded sheet) lands here, so reports always stay in sync.
function addEntry(e) {
  ledger.entries.push({ date: today(), ts: Date.now(), ...e });
}
function importSheet() {
  const rows = [
    { type: 'purchase', invoice: 'PUR-0001', party: 'Mehta Bullion', item: 'Ring', net: '40' },
    { type: 'sales', invoice: 'SAL-0001', party: 'Ravi Jewels', item: 'Ring', net: '12' },
    { type: 'sales', invoice: 'SAL-0002', party: 'Shree Gems', item: 'Chain', net: '8' },
  ];
  rows.forEach((r) => {
    const kind = r.type === 'sales' ? 'customer' : 'supplier';
    if (!ledger.masters[kind].includes(r.party)) ledger.masters[kind].push(r.party);
    addEntry(r);
  });
}

// ───────────────────────── reports (sales / purchase) ─────────────────────────
function renderReport(type) {
  const list = ledger.entries.filter((e) => e.type === type).sort((a, b) => b.ts - a.ts);
  $('#reportTitle').textContent = type === 'sales' ? 'Sales' : 'Purchase';
  const byDate = new Map();
  list.forEach((e) => byDate.set(e.date, [...(byDate.get(e.date) || []), e]));
  $('#reportBody').innerHTML = list.length
    ? [...byDate].map(([date, rows]) => `<div class="rep-date">${date}</div><div class="card rep-card">${rows.map((e) =>
        `<div class="rep-row"><div><b>${e.party || '—'}</b><small>${e.item}</small></div></div>`).join('')}</div>`).join('')
    : '<p class="empty-note">No data yet.</p>';
}

// ───────────────────────── stock ─────────────────────────
// Placeholder data. Replace with the backend response (same field names).
const STOCK_TOTALS = ['1,250.40 g', '1,102.75 g', '84.20 ct', '₹18,40,000', '₹2,15,000', '₹62,75,000'];
const STOCK_DEMO = [
  { type: 'Purchase', date: '05/11/2026', invoice: 'PUR-0001', party: 'Mehta Bullion', name: 'Diamond Ladies Ring', code: 'JC-1042', design: 'D-218', amount: '₹1,85,000',
    gold: { 'Gross weight': '12.450 g', 'Net weight': '11.800 g', 'Purity %': '75', Karat: '18K' },
    diamond: { Shape: 'Round', Value: '₹60,000', Color: 'F', Clarity: 'VS1', Weight: '0.85 ct', Rate: '₹70,000' },
    stone: { Shape: 'Oval', Value: '₹8,000', Color: 'Blue', Clarity: 'VVS', Weight: '0.60 ct', Rate: '₹13,000' },
    labour: { 'Labour rate': '₹450', Per: 'Nt. Wt.', 'Labour value': '₹5,310' } },
  { type: 'Sales', date: '04/11/2026', invoice: 'SAL-0007', party: 'Ravi Jewels', name: 'Diamond Gents Ring', code: 'JC-0877', design: 'D-104', amount: '₹2,40,000',
    gold: { 'Gross weight': '18.200 g', 'Net weight': '17.350 g', 'Purity %': '91.6', Karat: '22K' },
    diamond: { Shape: 'Princess', Value: '₹90,000', Color: 'G', Clarity: 'VS2', Weight: '1.20 ct', Rate: '₹75,000' },
    stone: { Shape: '', Value: '', Color: '', Clarity: '', Weight: '', Rate: '' },
    labour: { 'Labour rate': '₹500', Per: 'Gr. Wt', 'Labour value': '₹9,100' } },
];

const kv = (obj) => Object.entries(obj).map(([k, v]) => `<div class="kv"><span>${k}</span><b>${v || '—'}</b></div>`).join('');

function renderStock() {
  $('#stockBody').innerHTML = `
    <div class="float-card"><h3 class="card-title">Total</h3>
      ${TOTAL_LABELS.map((k, i) => `<div class="tot-row"><span>${k}</span><b>${STOCK_TOTALS[i]}</b></div>`).join('')}
    </div>
    <div class="float-card">
      <div class="row2">
        <div class="field"><span class="label">From</span><input type="date" id="stockFrom"></div>
        <div class="field"><span class="label">To</span><input type="date" id="stockTo"></div>
      </div>
    </div>
    ${STOCK_DEMO.map((s, i) => `
      <button class="card stock-row" data-stock="${i}"><div><b>${s.name}</b><b class="amt">${s.amount}</b></div><small>${s.party}</small></button>`).join('')}`;
  $$('[data-stock]', $('#stockBody')).forEach((b) => (b.onclick = () => { renderStockDetail(STOCK_DEMO[b.dataset.stock]); openStack('screenStockDetail'); }));
}

function renderStockDetail(s) {
  const card = (title, obj) => `<div class="float-card"><h3 class="card-title">${title}</h3>${kv(obj)}</div>`;
  $('#stockDetailBody').innerHTML =
    card('Entry', { Type: s.type, Date: s.date, Invoice: s.invoice, Party: s.party }) +
    card('Item', { 'Item name': s.name, 'Jewell code': s.code, 'Design no.': s.design }) +
    card('Gold', s.gold) + card('Diamond', s.diamond) + card('Color Stone', s.stone) + card('Labour', s.labour) +
    card('Total', { 'Total Amount': s.amount });
}

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  $('#phone').appendChild(t);
  setTimeout(() => t.remove(), 1600);
}

// Chip rows: swipe on touch, drag or wheel with a mouse.
$$('.chips').forEach((row) => {
  let down = false, startX = 0, startLeft = 0, moved = false;
  row.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true; moved = false; startX = e.clientX; startLeft = row.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) moved = true;
    row.scrollLeft = startLeft - dx;
  });
  window.addEventListener('pointerup', () => { down = false; });
  row.addEventListener('click', (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  row.addEventListener('wheel', (e) => {
    if (row.scrollWidth <= row.clientWidth) return;
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    row.scrollLeft += d;
    e.preventDefault();
  }, { passive: false });
});

paintIcons();
