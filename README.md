# Accounts AI — UI/UX Design Mockup

Static, click-through **HTML/CSS/JS** mockup of the Accounts AI mobile app (Android phone frame, dark + light theme). It mirrors the Expo app in `accounts-ai-app` and is a **design reference only**: there is no backend, and all data lives in memory (a refresh clears it).

Last updated: **2026-11-07**. Day-by-day changes are in the [Changelog](#changelog).

## Run it

No install, no build, no internet needed.

```bash
python serve.py
```

Then open `http://localhost:8103` (`python serve.py 9000` to use another port). You can also just double-click `index.html`.

- `serve.py` is a tiny static server that sends no-cache headers, so after a `git pull` the browser always shows the latest version. Plain `python -m http.server 8103` also works, but browsers may keep an old cached page.
- After pulling, hard refresh once (`Ctrl+Shift+R`). If a browser still shows an old copy, bump the `?v=` number on the `styles.css` / `script.js` links in `index.html`.
- Fonts load from Google Fonts and fall back to the system font when offline.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | Every screen as a `<section class="screen">` (no router): Home, Transactions, Reports, Sales/Purchase entry, Sales/Purchase report, Stock, Stock detail, AI chat, profile drawer. |
| `styles.css` | Design tokens at the top (match the app's `theme/colors.ts`), then component styles. |
| `script.js` | Navigation, drawer, theme, attach menus, AI chat, searchable dropdown, entry form, reports, stock, toast. |
| `serve.py` | No-cache static server (optional). |
| `.gitattributes` | Forces LF line endings so Windows and Mac clones match. |

## Screens

- **Home**: profile avatar (left), bell and search (right). Two rows of chips:
  - **Transaction**: AI chat, Sales, Purchase, Gold in/out, Upload.
  - **Report**: AI chat, Sales, Purchase, Stock.
  - A chat composer sits above the floating tab bar (Home / Transactions / Reports). Rows scroll sideways by touch swipe, mouse drag or mouse wheel.
- **AI chat**: full screen with a back button. Opened by either **AI chat** chip or by sending a message from the Home composer. The composer has a `+` menu (Click / Upload), mic and send. Replies are canned ("Demo reply."). The two chips behave the same today and are meant to diverge later (one for entering data, one for asking about data).
- **Sales / Purchase entry**: one layout for both (below).
- **Sales / Purchase report**: read-only, grouped by date, one row per party and item. Fed by every saved entry.
- **Stock**: totals card, From/To dates, list of cards, and a detail page per card (below).
- **Transactions** and **Reports** tabs: static demo content, not wired to anything.
- **Profile drawer**: Masters, Dashboard, Subscription, History (menu only, no screens), dark/light toggle, Logout.

## Sales / Purchase entry

Opened from Home (Transaction > Sales or Purchase). The form is identical for both, except the party label (Customer name / Supplier name) and the invoice prefix (`SAL-` / `PUR-`).

### Field types

| Type | Fields |
| --- | --- |
| **Auto, read-only** | Date (today, d/m/y), Invoice (`SAL-0001` / `PUR-0001`, next free number per type), Jewell code, Net weight, Value (Diamond), Value (Color Stone) |
| **Dropdown** (Search + `+ Add new`) | Customer/Supplier name, Item name, Karat, Shape, Color, Clarity |
| **Dropdown, fixed list** | Labour "Per": Gr. Wt / Nt. Wt. |
| **Manual input** | Design no., Gross weight, Purity %, Diamond Weight, Diamond Rate, Color Stone Weight, Color Stone Rate, Labour rate, Labour value |

Dropdown behaviour: shows **Search** instead of "Select"; typing filters the list; **Add new** adds the typed name to that list and selects it. Lists live in `ledger.masters`. Karat starts with 24K, 22K, 18K, 14K. Customer, Supplier, Item, Shape, Color and Clarity start empty (users build them). Shape, Color and Clarity lists are shared by the Diamond and Color Stone cards.

### Layout (top to bottom)

1. **Header card**: Date, Invoice, Customer/Supplier.
2. **Item block** (repeats per item; once there are 2 or more items, each shows an "Item N" heading and a Remove button):
   - Card: Item name, Jewell code, Design no.
   - **Gold**: Gross weight | Net weight; Purity % | Karat.
   - **Diamond**: Shape | Value; Color | Clarity; Weight | Rate.
   - **Color Stone**: same fields as Diamond.
   - **Labour**: Labour rate | Per (Gr. Wt / Nt. Wt.); Labour value.
3. **Total card**: Total Gross Weight, Total Net Weight, Total Diamond Weight, Total Diamond Value, Total Labour Amount, Total Amount.
4. **Add more item** and **Save sales/purchase**.

### Behaviour

- **Add more item** appends another item block below. Party, date and invoice stay the same (one invoice, many items). Totals sum all items.
- **Save** is enabled only when a party is chosen and every item has an Item name. Saving stores one entry per item, shows a toast, and resets the form with the next invoice number.
- **Jewell code follows the Item name**: shows `—` until an item is chosen. A known item shows its saved code. A new item gets the last saved code + 1 (`JC-0001`, `JC-0002`, ...). The same new item twice in one invoice shares one code. One counter is shared by Sales and Purchase. Codes are stored per item in `ledger.itemCodes` when the invoice is saved.

### Placeholder maths (UI only; the backend should own the real rules)

- Net weight = Gross weight - Diamond weight - Color Stone weight (no carat-to-gram conversion).
- Value (Diamond / Color Stone) = Weight x Rate.
- Total Amount = Diamond value + Color Stone value + Labour value.
- Totals are plain sums over all items.

## Stock

- **Total card** (six lines, same as the entry Total card), then a **From / To** date range (native date inputs).
- Below that, one **card per entry** showing only item name, party and amount. Tapping a card opens a read-only **detail page** with: Type, Date, Invoice, Party; Item name, Jewell code, Design no.; Gold, Diamond, Color Stone, Labour (all fields); Total Amount. Back returns to the Stock list.
- Everything here is placeholder data: `STOCK_TOTALS` and `STOCK_DEMO` (2 cards: one Purchase, one Sales) in `script.js`. Replace them with the backend response and keep the field names. Date filtering is not implemented (the inputs are UI only). Saved entries do **not** appear in Stock.

## Notes for backend

Where to connect (all in `script.js`):

| What | Where | Today |
| --- | --- | --- |
| Save an invoice | save handler in `renderEntry()` | Calls `addEntry()` once per item with `{type, invoice, party, item, code, net}` (+ `date`, `ts`). The other form fields exist on each item object (`newItem()`: name, code, design, gross, purity, karat, dShape/dColor/dClarity/dWt/dRate, cShape/cColor/cClarity/cWt/cRate, lRate, lBasis, lValue) but are not stored. Send the whole item object. |
| Dropdown lists | `ledger.masters` | In-memory. Replace with API lists and a "create" call for **Add new**. |
| Jewell code | `assignCodes()`, `ledger.itemCodes`, `ledger.jcLast` | Computed in the browser. The backend should own it: look up the code by item, or issue the next one. |
| Invoice number | `nextInvoice(type)` | Counts saved invoices in memory. Backend should issue it. |
| Net weight, Value, totals | `calc()` in `renderEntry()` | Placeholder maths above. |
| Sales / Purchase report | `renderReport(type)` | Reads `ledger.entries`. |
| Stock list, totals, detail | `STOCK_TOTALS`, `STOCK_DEMO`, `renderStock()`, `renderStockDetail()` | Hardcoded. |
| AI chat | `ask()` and `demoAnswer()` | Canned reply. |
| Upload | `importSheet()` | Adds 3 sample rows (no file is read). |

Stubs and gaps:

- **Gold in/out** chip only shows a toast. There is no screen yet.
- Photo ("Click") in the attach menu only shows a toast.
- `ledger.masters` still has unused `salesman` / `purchaser` lists (the field was removed from the form).
- Transactions and Reports tabs, and the drawer menu rows, are visual only.

## Changelog

### 2026-11-07

- **Entry fields reworked**: Jewell code, Net weight and Value (Diamond, Color Stone) are auto read-only fields; Item name, Karat, Shape, Color, Clarity are dropdowns; Design no., Gross weight, Purity % are manual input.
- **Searchable dropdowns**: every list (Customer/Supplier, Item, Karat, Shape, Color, Clarity) shows "Search", filters as you type, and keeps `+ Add new`.
- **Jewell code follows the item**: `—` until an item is chosen; a known item shows its saved code; a new item gets last + 1; the same item twice in one invoice shares one code.
- **Totals card live again**: sums Gross, Net, Diamond weight, Diamond value, Labour and Total Amount.
- **Home**: "Add data" heading renamed **Transaction**. "Input by chat" and "Chat with data" both renamed **AI chat**.
- **AI chat screen**: both chips (and sending from the Home composer) open a full-screen chat with back button, thread, and composer with the attach menu. Replies are canned.
- **Stale page fix**: added `serve.py` (no-cache). Browsers were reusing an old cached `index.html`, so new changes did not show on some machines.

### 2026-11-05

- **Sales / Purchase entry rebuilt** as cards: header, item, Gold, Diamond, Color Stone, Labour, Total. Salesman/Purchaser field removed. Purity % input and Karat dropdown are separate. Labour rate got a Gr. Wt / Nt. Wt. dropdown.
- **Add more item**: another item block on the same invoice and party, with Remove. One Save stores the invoice.
- **Auto fields**: Date and Invoice number.
- **Removed UI logic** (then, since restored in part, see 2026-11-07): fine weight, labour/diamond/total maths, and the amount/weight summaries in the Sales/Purchase report and chat demo.
- **Stock redesigned**: removed the "Total fine" card; added Total card, From/To dates, clickable cards (item, party, amount) and a read-only detail page, using two dummy cards.
- **Chip rows scroll on desktop** (mouse drag and wheel), so Stock and the other chips are reachable with a mouse.
- **Portability**: `?v=` cache-busting on CSS/JS links, system-font fallbacks, `.gitattributes` (LF endings). Verified from a fresh clone and as a plain `file://` page.
