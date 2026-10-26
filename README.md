# Accounts AI — UI/UX Design Mockup

Static, click-through **HTML/CSS/JS** mockup of the Accounts AI app (Android phone frame, dark + light theme). It mirrors the Expo app in `accounts-ai-app` and is a **design reference only** — no backend, all data lives in memory.

## Preview

No build step.

```bash
python -m http.server 8103
```

Open `http://localhost:8103`.

## Screens

- **Home** — header (profile left, bell/search right), **Add data** chips (Input by chat, Sales, Purchase, Gold in/out, Upload), **Report** chips (Chat with data, Sales, Purchase, Stock), chat composer, floating tab bar. `+` opens Click / Upload; sending a message turns Home into an in-place chat thread (canned demo replies).
- **Transactions**, **Reports** tabs.
- **Sales / Purchase entry** — auto date (d/m/y), invoice no, party / salesman (or purchaser) / item dropdowns with `+ Add new`, then weight & rates. Formulas: fine wt = net × purity %, labour amt = net × labour rate, diamond amt = diamond rate × diamond wt, total = labour + diamond.
- **Sales / Purchase report** — read-only, grouped by date, one row per party. Fed by every input route (form, chat, uploaded sheet) through a single `addEntry()` in `script.js`.
- **Stock** — Purchase − Sales (net, fine, diamond weight).
- **Profile drawer** — Masters, Dashboard, Subscription, History, dark/light toggle, Logout.

## Notes for backend

- Entry shape: see `addEntry()` / the save handler in `script.js` (`type, party, item, net, fine, dia, total, date`).
- "Input by chat" and "Upload" are stubs: chat replies are canned and Upload imports 3 sample rows.
- "Gold in/out" has no screen yet.

## Files

- `index.html` — all screens as `<section class="screen">` (no router).
- `styles.css` — design tokens at the top match the app's `theme/colors.ts`.
- `script.js` — navigation, drawer, theme, entry form + formulas, reports, stock, demo chat.
