# Accounts AI — UI/UX Design Mockup

Static, click-through **HTML/CSS/JS** mockup of the Accounts AI app (Android phone frame, dark + light theme). It mirrors the Expo app in `accounts-ai-app` and is a **design reference only**. There is no backend and all data lives in memory.

## Preview

No build step.

```bash
python -m http.server 8103
```

Open `http://localhost:8103`. After pulling changes, hard refresh (`Ctrl+Shift+R`) because the browser may cache `script.js`.

## Screens

- **Home**: header (profile left, bell/search right), **Add data** chips (Input by chat, Sales, Purchase, Gold in/out, Upload), **Report** chips (Chat with data, Sales, Purchase, Stock), chat composer, floating tab bar. `+` opens Click / Upload. Sending a message turns Home into an in-place chat thread (canned demo replies).
- **Transactions**, **Reports** tabs.
- **Sales / Purchase entry**: one page, same layout for both (see below).
- **Sales / Purchase report**: read-only, grouped by date, one row per party and item.
- **Stock**: totals card, From/To date range, list of cards, and a read-only detail page per card.
- **Profile drawer**: Masters, Dashboard, Subscription, History, dark/light toggle, Logout.

### Sales / Purchase entry layout

1. **Header card**: Date (auto, d/m/y), Invoice (auto, `SAL-0001` / `PUR-0001`), Customer or Supplier dropdown (with `+ Add new`).
2. **Item cards** (repeat per item):
   - Item: Item name, Jewell code, Design no.
   - **Gold**: Gross weight, Net weight, Purity % (input) and Karat (dropdown, separate).
   - **Diamond**: Shape, Value, Color, Clarity, Weight, Rate.
   - **Color Stone**: same fields as Diamond.
   - **Labour**: Labour rate with a Gr. Wt / Nt. Wt. dropdown, and Labour value.
3. **Total card**: Total Gross Weight, Net Weight, Diamond Weight, Diamond Value, Labour Amount, Total Amount. Values are `—` in the mockup.
4. **Add more item** adds another item block below (same party and invoice, Remove on each extra item). **Save sales/purchase** saves the whole invoice.

All inputs are plain manual inputs. **No formulas run in the UI**: totals, fine weight, labour value and so on are for the backend to compute.

### Stock

- Total card (same six lines as above), then a From / To date picker (native date input).
- Cards show item name, party and amount only. Tap a card to open the full entry (Type, Date, Invoice, Party, Item, Gold, Diamond, Color Stone, Labour, Total Amount).
- Data is hardcoded in `STOCK_TOTALS` and `STOCK_DEMO` in `script.js`. Replace with the backend response (keep the field names). Date filtering is not implemented in the UI.

## Notes for backend

- Saved entry shape (see the save handler in `script.js`): `type, invoice, party, item, net, date`. The form holds all other fields per item (`newItem()`), but only these are stored in the mockup.
- Stock list and detail read from `STOCK_DEMO`, not from saved entries.
- "Input by chat" and "Upload" are stubs: chat replies are canned and Upload imports 3 sample rows.
- "Gold in/out" has no screen yet.

## Changelog

### 2026-11-05

- **Sales / Purchase entry rebuilt**: new card layout (header, item, Gold, Diamond, Color Stone, Labour, Total), Salesman / Purchaser field removed, item name is now a text input, Purity % input and Karat dropdown are separate, Labour rate has a Gr. Wt / Nt. Wt. dropdown.
- **Add more item**: adds another item block on the same invoice and party, with Remove. One Save stores the invoice.
- **Auto fields**: Date and Invoice number are auto-filled. Everything else is manual.
- **Removed UI logic**: fine weight, labour, diamond and total calculations, and the amount/weight summaries in the Sales/Purchase report and chat demo. The Total card shows `—`.
- **Stock redesigned**: removed the "Total fine" card, added a Total card, a From/To date range and clickable cards (item, party, amount) with a read-only detail page. Uses two dummy cards.
- Fixed `script.js` cache and `$$` helper regressions found while testing.

## Files

- `index.html`: all screens as `<section class="screen">` (no router), including `#screenStockDetail`.
- `styles.css`: design tokens at the top match the app's `theme/colors.ts`.
- `script.js`: navigation, drawer, theme, entry form, reports, stock, demo chat.
