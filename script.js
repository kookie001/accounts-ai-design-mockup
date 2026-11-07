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
  masters: { customer: [], supplier: [], salesman: [], purchaser: [], item: [], karat: ['24K', '22K', '18K', '14K'], basis: ['Gr. Wt', 'Nt. Wt.'], shape: [], color: [], clarity: [] },
  jcLast: 0,
  itemCodes: {}, // item name (lowercase) -> Jewell code
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
      openChat();
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

// ───────────────────────── attach menus + AI chat ─────────────────────────
const attach = $('#attachLayer');
const closeAttach = () => (attach.hidden = true);
$$('.attach-layer').forEach((layer) => {
  const close = () => (layer.hidden = true);
  $('[data-plus]', layer.parentElement).addEventListener('click', () => (layer.hidden = !layer.hidden));
  layer.addEventListener('click', (e) => { if (e.target === layer) close(); });
  $$('.attach-opt', layer).forEach((b) =>
    b.addEventListener('click', () => {
      close();
      if (b.dataset.action === 'upload') importSheet();
      toast(b.dataset.action === 'click' ? 'Photo added' : 'Sheet imported');
    }),
  );
});

function wireComposer(root, onSend) {
  const field = $('input', root), send = $('[data-send]', root), mic = $('[data-mic]', root);
  field.addEventListener('input', () => {
    const has = field.value.trim().length > 0;
    send.hidden = !has; mic.hidden = has;
  });
  const submit = () => {
    const q = field.value.trim();
    if (!q) return;
    field.value = '';
    field.dispatchEvent(new Event('input'));
    onSend(q);
  };
  field.addEventListener('keydown', (e) => e.key === 'Enter' && submit());
  send.addEventListener('click', submit);
  return field;
}

function bot(text, kind = 'bot') {
  const el = document.createElement('div');
  el.className = `bubble ${kind}`;
  el.textContent = text;
  $('#chatThread').appendChild(el);
  $('#chatScroll').scrollTop = 1e6;
  return el;
}
function ask(q) {
  bot(q, 'user');
  const typing = bot('working…', 'typing');
  setTimeout(() => { typing.remove(); bot(demoAnswer(q)); }, 900);
}
const chatField = wireComposer($('#chatComposer'), ask);
function openChat(q) {
  openStack('screenChat');
  if (q) ask(q); else setTimeout(() => chatField.focus(), 300);
}
wireComposer($('#homeComposer'), openChat);

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
  let open = false, adding = false, q = '';
  const pick = (v) => { set(v); open = false; adding = false; q = ''; draw(); onChange(); };

  const list = () => {
    const box = $('.dd-list', wrap);
    const all = ledger.masters[kind];
    const shown = fixed ? all : all.filter((o) => o.toLowerCase().includes(q.trim().toLowerCase()));
    box.innerHTML = `${shown.length || adding ? '' : `<div class="dd-note">${all.length ? 'No match' : 'No options'}</div>`}
      ${shown.map((o) => `<button type="button" class="dd-item ${o === get() ? 'sel' : ''}" data-v="${esc(o)}">${esc(o)}${suffix}</button>`).join('')}
      ${fixed ? '' : adding
        ? `<div class="dd-new"><input placeholder="New ${label.toLowerCase()}" value="${esc(q)}"><button type="button" data-ok>${svg('check', 18)}</button></div>`
        : `<button type="button" class="dd-add">${svg('add-circle', 18)} Add new</button>`}`;
    $$('.dd-item', box).forEach((b) => (b.onclick = () => pick(b.dataset.v)));
    const add = $('.dd-add', box);
    if (add) add.onclick = () => { adding = true; list(); $('.dd-new input', box).focus(); };
    const ok = $('[data-ok]', box);
    if (ok) {
      const field = $('.dd-new input', box);
      const commit = () => {
        const name = field.value.trim();
        if (!name) return;
        const hit = ledger.masters[kind].find((o) => o.toLowerCase() === name.toLowerCase());
        if (!hit) ledger.masters[kind].push(name);
        pick(hit || name);
      };
      ok.onclick = commit;
      field.onkeydown = (e) => e.key === 'Enter' && commit();
    }
  };

  const draw = () => {
    wrap.classList.toggle('open', open);
    const chev = `<span class="dd-chev">${svg(open ? 'chev-up' : 'chev-down', 18)}</span>`;
    wrap.innerHTML = `<span class="label">${label}</span>` + (open && !fixed
      ? `<div class="dd-btn searching"><input class="dd-search" placeholder="Search" value="${esc(q)}" autocomplete="off">${chev}</div>`
      : `<button type="button" class="dd-btn ${get() ? '' : 'empty'}"><span>${get() ? esc(get()) + suffix : fixed ? 'Select' : 'Search'}</span>${chev}</button>`)
      + (open ? '<div class="dd-list"></div>' : '');
    const btn = $('.dd-btn', wrap);
    if (open && !fixed) {
      const s = $('.dd-search', wrap);
      s.oninput = () => { q = s.value; if (adding) adding = false; list(); };
      $('.dd-chev', wrap).onclick = () => { open = false; adding = false; q = ''; draw(); };
      s.focus();
    } else {
      btn.onclick = () => { open = !open; adding = false; q = ''; draw(); };
    }
    if (open) list();
  };
  draw();
  return wrap;
}

const newItem = () => ({ name: '', code: '', design: '', gross: '', purity: '', karat: '',
  dShape: '', dColor: '', dClarity: '', dWt: '', dRate: '',
  cShape: '', cColor: '', cClarity: '', cWt: '', cRate: '', lRate: '', lBasis: '', lValue: '' });
const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const nextInvoice = (type) => {
  const used = new Set(ledger.entries.filter((e) => e.type === type).map((e) => e.invoice).filter(Boolean));
  return `${type === 'sales' ? 'SAL' : 'PUR'}-${String(used.size + 1).padStart(4, '0')}`;
};
const jewelCode = (n) => `JC-${String(n).padStart(4, '0')}`;

const TOTAL_LABELS = ['Total Gross Weight', 'Total Net Weight', 'Total Diamond Weight', 'Total Diamond Value', 'Total Labour Amount', 'Total Amount'];
const DD = {
  name: { label: 'Item name', kind: 'item' }, karat: { label: 'Karat', kind: 'karat' }, lBasis: { label: 'Per', kind: 'basis', fixed: true },
  dShape: { label: 'Shape', kind: 'shape' }, dColor: { label: 'Color', kind: 'color' }, dClarity: { label: 'Clarity', kind: 'clarity' },
  cShape: { label: 'Shape', kind: 'shape' }, cColor: { label: 'Color', kind: 'color' }, cClarity: { label: 'Clarity', kind: 'clarity' },
};

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
  const dd = (key) => `<div data-dd="${key}"></div>`;
  const auto = (label, o) => `<div class="field"><span class="label">${label}</span><div class="auto"><b data-o="${o}">—</b></div></div>`;
  const stoneCard = (label, p, it) => `
    <div class="float-card"><h3 class="card-title">${label}</h3>
      <div class="row2">${dd(p + 'Shape')}${auto('Value', p + 'Value')}</div>
      <div class="row2">${dd(p + 'Color')}${dd(p + 'Clarity')}</div>
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
    const t = { gross: 0, net: 0, dWt: 0, dVal: 0, lab: 0, total: 0 };
    assignCodes();
    items.forEach((it) => {
      const dVal = num(it.dWt) * num(it.dRate);
      const cVal = num(it.cWt) * num(it.cRate);
      const net = num(it.gross) - num(it.dWt) - num(it.cWt);
      Object.assign(it, { _net: net, _dVal: dVal, _cVal: cVal });
      const set = (o, v) => ($(`[data-o="${o}"]`, it.el).textContent = v);
      set('net', it.gross === '' ? '—' : wt(net));
      set('dValue', dVal ? inr(dVal) : '—');
      set('cValue', cVal ? inr(cVal) : '—');
      t.gross += num(it.gross); t.net += it.gross === '' ? 0 : net; t.dWt += num(it.dWt);
      t.dVal += dVal; t.lab += num(it.lValue); t.total += dVal + cVal + num(it.lValue);
    });
    const vals = [wt(t.gross), wt(t.net), wt(t.dWt), inr(t.dVal), inr(t.lab), inr(t.total)];
    $('#totals').innerHTML = TOTAL_LABELS.map((k, i) => `<div class="tot-row"><span>${k}</span><b>${vals[i]}</b></div>`).join('');
    $('#saveBtn').disabled = !(head.party && items.every((it) => it.name.trim()));
  };

  const numberItems = () => items.forEach((it, i) => {
    $('.item-head', it.el).hidden = items.length < 2;
    $('.item-head b', it.el).textContent = `Item ${i + 1}`;
  });

  // Jewell code follows the chosen item: known item -> its code, new item -> last code + 1.
  const assignCodes = () => {
    const fresh = new Map();
    items.forEach((it) => {
      const key = it.name.trim().toLowerCase();
      let code = '';
      if (key) {
        code = ledger.itemCodes[key];
        if (!code) {
          if (!fresh.has(key)) fresh.set(key, jewelCode(ledger.jcLast + fresh.size + 1));
          code = fresh.get(key);
        }
      }
      it.code = code;
      $('[data-o="code"]', it.el).textContent = code || '—';
    });
    return fresh;
  };

  const addItem = () => {
    const it = newItem();
    items.push(it);
    const el = document.createElement('div');
    el.innerHTML = `
      <div class="item-head"><b></b><button type="button" class="item-rm">Remove</button></div>
      <div class="float-card">
        ${dd('name')}${auto('Jewell code', 'code')}${inp('Design no.', 'design', it, '', 'text')}
      </div>
      <div class="float-card"><h3 class="card-title">Gold</h3>
        <div class="row2">${inp('Gross weight', 'gross', it, '0')}${auto('Net weight', 'net')}</div>
        <div class="row2">${inp('Purity %', 'purity', it, '0')}${dd('karat')}</div>
      </div>
      ${stoneCard('Diamond', 'd', it)}${stoneCard('Color Stone', 'c', it)}
      <div class="float-card"><h3 class="card-title">Labour</h3>
        <div class="row2">${inp('Labour rate', 'lRate', it, '0')}${dd('lBasis')}</div>
        ${inp('Labour value', 'lValue', it, '0')}
      </div>`;
    it.el = el;
    $$('[data-f]', el).forEach((x) => x.addEventListener('input', () => { it[x.dataset.f] = x.value; calc(); }));
    $$('[data-dd]', el).forEach((slot) => {
      const key = slot.dataset.dd;
      slot.replaceWith(dropdown({ ...DD[key], get: () => it[key], set: (v) => (it[key] = v), onChange: calc }));
    });
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
    const fresh = assignCodes();
    items.forEach((it) => addEntry({ type, invoice, party: head.party, item: it.name.trim(), code: it.code, net: it._net }));
    fresh.forEach((code, key) => (ledger.itemCodes[key] = code));
    ledger.jcLast += fresh.size;
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
