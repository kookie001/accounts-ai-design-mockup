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
  masters: { customer: [], supplier: [], salesman: [], purchaser: [], item: [], purity: ['99.9', '91.6', '75', '58.5'] },
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
function demoAnswer(q) {
  const s = q.toLowerCase();
  const sum = (type, key) => ledger.entries.filter((e) => e.type === type).reduce((a, e) => a + e[key], 0);
  if (s.includes('stock')) {
    const rows = stockRows();
    return rows.length ? rows.map((r) => `${r.item}: ${wt(r.net)} net, ${wt(r.fine)} fine`).join('\n') : 'No stock yet.';
  }
  if (s.includes('sale') || s.includes('bikri')) return `Total sales: ${inr(sum('sales', 'total'))} (${ledger.entries.filter((e) => e.type === 'sales').length} entries).`;
  if (s.includes('purchase') || s.includes('kharid')) return `Total purchase: ${inr(sum('purchase', 'total'))} (${ledger.entries.filter((e) => e.type === 'purchase').length} entries).`;
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
function dropdown({ label, kind, suffix = '', get, set, onChange }) {
  const wrap = document.createElement('div');
  wrap.className = 'field dd';
  let open = false, adding = false;
  const draw = () => {
    const opts = ledger.masters[kind];
    wrap.classList.toggle('open', open);
    wrap.innerHTML = `<span class="label">${label}</span>
      <button type="button" class="dd-btn ${get() ? '' : 'empty'}"><span>${get() ? get() + suffix : 'Select'}</span>${svg(open ? 'chev-up' : 'chev-down', 18)}</button>
      ${open ? `<div class="dd-list">
        ${opts.length || adding ? '' : '<div class="dd-note">No options</div>'}
        ${opts.map((o) => `<button type="button" class="dd-item ${o === get() ? 'sel' : ''}" data-v="${o}">${o}${suffix}</button>`).join('')}
        ${adding
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

function renderEntry(type) {
  const isSales = type === 'sales';
  const title = isSales ? 'Sales' : 'Purchase';
  const partyKind = isSales ? 'customer' : 'supplier';
  const agentKind = isSales ? 'salesman' : 'purchaser';
  const f = { invoice: '', party: '', agent: '', item: '', gross: '', net: '', purity: '', dwt: '', drate: '', lrate: '' };
  $('#entryTitle').textContent = `${title} report`;
  const body = $('#entryBody');
  body.innerHTML = `
    <div class="float-card" id="cardA">
      <div class="date-row"><span class="label" style="margin:0">Date</span><span class="date-chip">${svg('calendar', 14)} ${today()}</span></div>
      <div class="field"><span class="label">Invoice no</span><input data-f="invoice" placeholder="e.g. INV-001"></div>
      <div id="ddParty"></div><div id="ddAgent"></div><div id="ddItem"></div>
    </div>
    <div class="float-card" id="cardB">
      <h3 class="card-title">Weight &amp; rates</h3>
      <div class="row2">
        <div class="field"><span class="label">Gross weight</span><input data-f="gross" inputmode="decimal" placeholder="0"></div>
        <div class="field"><span class="label">Net weight</span><input data-f="net" inputmode="decimal" placeholder="0"></div>
      </div>
      <div id="ddPurity"></div>
      <div class="field"><span class="label">Fine weight</span><div class="auto"><b id="oFine"></b><small>net wt × purity %</small></div></div>
      <div class="row2">
        <div class="field"><span class="label">Diamond weight</span><input data-f="dwt" inputmode="decimal" placeholder="0"></div>
        <div class="field"><span class="label">Diamond rate</span><input data-f="drate" inputmode="decimal" placeholder="0"></div>
      </div>
      <div class="field"><span class="label">Labour rate</span><input data-f="lrate" inputmode="decimal" placeholder="0"></div>
      <div class="field"><span class="label">Labour amount</span><div class="auto"><b id="oLab"></b><small>net wt × labour rate</small></div></div>
      <div class="field"><span class="label">Diamond amount</span><div class="auto"><b id="oDia"></b><small>rate × weight</small></div></div>
      <div class="total"><small>TOTAL AMOUNT</small><b id="oTotal"></b></div>
      <button class="save" id="saveBtn" disabled>Save ${title.toLowerCase()}</button>
    </div>`;

  const calc = () => {
    const net = num(f.net);
    const fine = (net * num(f.purity)) / 100;
    const lab = net * num(f.lrate);
    const dia = num(f.drate) * num(f.dwt);
    $('#oFine').textContent = wt(fine); $('#oLab').textContent = inr(lab);
    $('#oDia').textContent = inr(dia); $('#oTotal').textContent = inr(lab + dia);
    $('#saveBtn').disabled = !(f.invoice.trim() && f.party && f.item && net > 0 && num(f.purity) > 0);
    return { net, fine, lab, dia };
  };
  $$('[data-f]', body).forEach((el) => el.addEventListener('input', () => { f[el.dataset.f] = el.value; calc(); }));
  const mk = (id, opts) => $(id, body).appendChild(dropdown({ ...opts, onChange: calc }));
  mk('#ddParty', { label: isSales ? 'Customer name' : 'Supplier name', kind: partyKind, get: () => f.party, set: (v) => (f.party = v) });
  mk('#ddAgent', { label: isSales ? 'Sales man' : 'Purchaser', kind: agentKind, get: () => f.agent, set: (v) => (f.agent = v) });
  mk('#ddItem', { label: 'Item', kind: 'item', get: () => f.item, set: (v) => (f.item = v) });
  mk('#ddPurity', { label: 'Purity %', kind: 'purity', suffix: '%', get: () => f.purity, set: (v) => (f.purity = v) });
  calc();

  $('#saveBtn').onclick = () => {
    const c = calc();
    addEntry({ type, party: f.party, item: f.item, net: c.net, fine: c.fine, dia: num(f.dwt), total: c.lab + c.dia });
    toast(`${title} saved`);
    renderEntry(type);
  };
}

// Every source (form, chat, uploaded sheet) lands here, so reports always stay in sync.
function addEntry(e) {
  ledger.entries.push({ date: today(), ts: Date.now(), ...e });
}
function importSheet() {
  const rows = [
    { type: 'purchase', party: 'Mehta Bullion', item: 'Ring', net: 40, fine: 36.64, dia: 0, total: 20000 },
    { type: 'sales', party: 'Ravi Jewels', item: 'Ring', net: 12, fine: 10.99, dia: 0.3, total: 31000 },
    { type: 'sales', party: 'Shree Gems', item: 'Chain', net: 8, fine: 7.33, dia: 0, total: 4000 },
  ];
  rows.forEach((r) => {
    const kind = r.type === 'sales' ? 'customer' : 'supplier';
    [[kind, r.party], ['item', r.item]].forEach(([k, v]) => !ledger.masters[k].includes(v) && ledger.masters[k].push(v));
    addEntry(r);
  });
}

// ───────────────────────── reports (sales / purchase) ─────────────────────────
function renderReport(type) {
  const list = ledger.entries.filter((e) => e.type === type).sort((a, b) => b.ts - a.ts);
  $('#reportTitle').textContent = type === 'sales' ? 'Sales' : 'Purchase';
  const total = list.reduce((a, e) => a + e.total, 0);
  const net = list.reduce((a, e) => a + e.net, 0);
  const byDate = new Map();
  list.forEach((e) => byDate.set(e.date, [...(byDate.get(e.date) || []), e]));
  $('#reportBody').innerHTML = list.length
    ? `<div class="rep-sum"><div class="card"><small>Amount</small><b>${inr(total)}</b></div><div class="card"><small>Net weight</small><b>${wt(net)}</b></div></div>` +
      [...byDate].map(([date, rows]) => `<div class="rep-date">${date}</div><div class="card rep-card">${rows.map((e) =>
        `<div class="rep-row"><div><b>${e.party || '—'}</b><small>${e.item} · ${wt(e.net)}</small></div><span class="amt">${inr(e.total)}</span></div>`).join('')}</div>`).join('')
    : '<p class="empty-note">No data yet.</p>';
}

// ───────────────────────── stock ─────────────────────────
function stockRows() {
  const map = new Map();
  for (const e of ledger.entries) {
    const r = map.get(e.item.toLowerCase()) || { item: e.item, net: 0, fine: 0, dia: 0, in: 0, out: 0 };
    const s = e.type === 'purchase' ? 1 : -1;
    r.net += s * e.net; r.fine += s * e.fine; r.dia += s * e.dia;
    if (s > 0) r.in += e.net; else r.out += e.net;
    map.set(e.item.toLowerCase(), r);
  }
  return [...map.values()];
}
function renderStock() {
  const rows = stockRows();
  const totalFine = rows.reduce((a, r) => a + r.fine, 0);
  $('#stockBody').innerHTML = `
    <div class="card stock-hero"><small>Total fine stock</small><b>${wt(totalFine)}</b></div>
    ${rows.length ? rows.map((r) => `
      <div class="card stock-row"><div><b>${r.item}</b><b style="color:${r.net < 0 ? 'var(--rose)' : 'var(--mint)'}">${wt(r.net)} net</b></div>
        <small>Fine ${wt(r.fine)} · Diamond ${wt(r.dia)} · In ${wt(r.in)} / Out ${wt(r.out)}</small>
</div>`).join('')
      : '<p class="empty-note">No data yet.</p>'}`;
}

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  $('#phone').appendChild(t);
  setTimeout(() => t.remove(), 1600);
}

paintIcons();
