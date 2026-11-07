# Accounts AI — UI/UX Design Mockup

Static, click-through **HTML/CSS/JS** mockup of the Accounts AI app (Android phone frame, dark + light theme). It mirrors the Expo app in `accounts-ai-app` and is a **design reference only**. There is no backend and all data lives in memory.

## Preview

No build step.

```bash
python -m http.server 8103
```

Open `http://localhost:8103`. You can also just double-click `index.html` (no server needed). It needs no install and no internet; fonts fall back to the system font when offline.

After pulling changes, hard refresh (`Ctrl+Shift+R`). If a browser keeps an old copy, bump the `?v=` number on the `styles.css` / `script.js` links in `index.html`.

## Screens

- **Home**: header (profile left, bell/search right), **Transaction** chips (Input by chat, Sales, Purchase, Gold in/out, Upload), **Report** chips (Chat with data, Sales, Purchase, Stock), chat composer, floating tab bar. `+` opens Click / Upload.
- **AI chat**: opened by "Input by chat", "Chat with data", or sending from the Home composer. Full screen with back button (canned demo replies).
- **Transactions**, **Reports** tabs.
- **Sales / Purchase entry**: one page, same layout for both (see below).
- **Sales / Purchase report**: read-only, grouped by date, one row per party and item.
- **Stock**: totals card, From/To date range, list of cards, and a read-only detail page per card.
- **Profile drawer**: Masters, Dashboard, Subscription, History, dark/light toggle, Logout.

### Sales / Purchase entry layout

Field types:

- **Auto (read-only)**: Date, Invoice (`SAL-0001` / `PUR-0001`), Jewell code (`JC-0001`, last saved code + 1, shared by Sales and Purchase), Net weight, Value (Diamond and Color Stone).
- **Dropdown** (all have Search, `+ Add new`): Customer/Supplier name, Item name, Karat, Shape, Color, Clarity. Karat starts with 24K/22K/18K/14K. The others start empty. Labour "Per" is a fixed Gr. Wt / Nt. Wt. list.
- **Manual input**: Design no., Gross weight, Purity %, Diamond/Color Stone Weight and Rate, Labour rate, Labour value.

Layout:

1. **Header card**: Date, Invoice, Customer or Supplier.
2. **Item cards** (repeat per item):
   - Item: Item name, Jewell code, Design no.
   - **Gold**: Gross weight, Net weight, Purity % and Karat.
   - **Diamond**: Shape, Value, Color, Clarity, Weight, Rate.
   - **Color Stone**: same fields as Diamond.
   - **Labour**: Labour rate with a Gr. Wt / Nt. Wt. dropdown, and Labour value.
3. **Total card**: Total Gross Weight, Net Weight, Diamond Weight, Diamond Value, Labour Amount, Total Amount.
4. **Add more item** adds another item block below (same party and invoice, Remove on each extra item). **Save sales/purchase** saves the whole invoice.

Placeholder maths in the UI (backend should own the real rules): Net weight = Gross weight - Diamond weight - Color Stone weight (no ct to g conversion), Value = Weight x Rate, Total Amount = Diamond value + Color Stone value + Labour value.

### Stock

- Total card (same six lines as above), then a From / To date picker (native date input).
- Cards show item name, party and amount only. Tap a card to open the full entry (Type, Date, Invoice, Party, Item, Gold, Diamond, Color Stone, Labour, Total Amount).
- Data is hardcoded in `STOCK_TOTALS` and `STOCK_DEMO` in `script.js`. Replace with the backend response (keep the field names). Date filtering is not implemented in the UI.

## Notes for backend

- Saved entry shape (see the save handler in `script.js`): `type, invoice, party, item, code, net, date`. The form holds all other fields per item (`newItem()`), but only these are stored in the mockup.
- Stock list and detail read from `STOCK_DEMO`, not from saved entries.
- "Input by chat" and "Upload" are stubs: chat replies are canned and Upload imports 3 sample rows.
- "Gold in/out" has no screen yet.

## Changelog

### 2026-11-07

- **Entry fields reworked**: Jewell code (auto, last saved + 1), Net weight and Value (Diamond, Color Stone) are now auto read-only fields; Item name, Karat, Shape, Color, Clarity are dropdowns; Design no., Gross weight, Purity % are manual.
- **Searchable dropdowns**: every list (Customer/Supplier, Item, Karat, Shape, Color, Clarity) shows "Search" instead of "Select", filters as you type, and keeps `+ Add new`.
- **Totals card live again**: sums Gross, Net, Diamond weight, Diamond value, Labour, Total Amount from the fields above.
- **Home**: "Add data" heading renamed to **Transaction**.
- **AI chat screen**: "Input by chat" and "Chat with data" both open a full-screen AI chat (back button, thread, composer with attach menu). Sending from the Home composer opens the same screen. Replies are still canned.

### 2026-11-05

- **Sales / Purchase entry rebuilt**: new card layout (header, item, Gold, Diamond, Color Stone, Labour, Total), Salesman / Purchaser field removed, item name is now a text input, Purity % input and Karat dropdown are separate, Labour rate has a Gr. Wt / Nt. Wt. dropdown.
- **Add more item**: adds another item block on the same invoice and party, with Remove. One Save stores the invoice.
- **Auto fields**: Date and Invoice number are auto-filled. Everything else is manual.
- **Removed UI logic**: fine weight, labour, diamond and total calculations, and the amount/weight summaries in the Sales/Purchase report and chat demo. The Total card shows `—`.
- **Stock redesigned**: removed the "Total fine" card, added a Total card, a From/To date range and clickable cards (item, party, amount) with a read-only detail page. Uses two dummy cards.
- **Chip rows scroll on desktop**: the Add data / Report rows hid their scrollbar, so Stock (and other chips) were unreachable with a mouse. They now scroll by mouse drag and mouse wheel (touch swipe already worked).
- **Works the same on any laptop**: added `?v=` cache-busting on the CSS/JS links, system-font fallback for every font (so it looks right offline), and `.gitattributes` (LF line endings) so Windows/Mac clones match. Verified from a fresh clone over `http.server` and as a plain `file://` page.
- Fixed `script.js` cache and `$$` helper regressions found while testing.

## Files

- `index.html`: all screens as `<section class="screen">` (no router), including `#screenStockDetail`.
- `styles.css`: design tokens at the top match the app's `theme/colors.ts`.
- `script.js`: navigation, drawer, theme, entry form, reports, stock, demo chat.
