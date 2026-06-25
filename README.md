# Zentist Logos

A lightweight, static gallery page for browsing the Zentist logo and related brand logos. Each logo is composed dynamically from individual SVG layers and supports display, theme, and color-mode toggles, plus SVG / PNG export.

Built with vanilla HTML, CSS, and JavaScript — no build step and no dependencies.

## Features

- **Full Logo / Icon** — switch between the full lockup (icon + wordmark) and the icon only.
- **Dark Mode** — toggle the preview background between light and dark; wordmarks invert automatically.
- **Monochrome** — show single-color versions of every logo (except Zentist). In light theme it renders the dark monochrome logo; in dark theme it renders the light monochrome logo.
- **Save / Copy dropdowns** — each card shows two split-button dropdowns on hover:
  - **Save** → `SVG` / `PNG` download. PNGs are rendered at a minimum of 2000px wide. Gradients are preserved in exports via scoped SVG IDs.
  - **Copy** → `File to Clipboard` (copies the current logo's SVG markup) / `Link URL` (copies a direct URL to the pre-generated SVG file for the current state, e.g. `https://your-domain.com/logos/remit-ai/remit-ai-full-light.svg`, resolved against the current page location so it works both locally and on a deployed domain).
- **Responsive grid** — 1 / 2 / 3 columns depending on viewport width.
- **Version badge** — shown in the header; update a single constant to bump it.
- Logo config and the SVG-composition logic live in `logo-builder.js`, shared by the page and the build script (single source of truth).

## Project structure

```
.
├── index.html        # Page markup and controls
├── styles.css        # Styles, themes, and responsive grid
├── logo-builder.js   # Shared config + SVG composition (browser + Node)
├── script.js         # Page UI: rendering, toggles, export, copy/link
├── build-logos.js    # Node script that pre-generates all logo files + logos-data.js
├── logos-data.js     # Auto-generated: inlined SVG layers (lets export work from file://)
├── logos/            # Pre-generated SVG files (committed; served as URLs)
│   └── <brand>/<brand>-<view>-<theme>[-mono].svg
└── assets/
    └── raw/          # Source SVG layers (icons + wordmarks)
```

## Running

The page works with no build, either way:

- **Open `index.html` directly** (double-click, `file://`). Save/Copy work offline because the SVG layers are inlined in `logos-data.js` (no `fetch` needed).
- **Serve it** over HTTP (recommended for development):

```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve .
```

Then open [http://localhost:8000](http://localhost:8000).

## Pre-generating logo files (for the Copy → Link URL action)

The **Copy → Link URL** action points to static files under `logos/`. Regenerate them whenever a
logo's config or assets change:

```bash
npm run build      # or: node build-logos.js
```

This composes every view/theme/mono combination for each brand and writes them to
`logos/<brand>/`. It also regenerates `logos-data.js` (the inlined SVG layers used
for `file://` export). The files are produced with the exact same logic as the live
preview and the SVG download, so they always match. Commit the `logos/` folder and
`logos-data.js`, and deploy them alongside the page; the resulting public URLs look
like `https://your-domain.com/logos/remit-ai/remit-ai-full-light.svg`.

Re-run `npm run build` whenever you change a logo's config or its source assets.

## Configuration

### Version

The header version comes from a single constant at the top of `script.js`:

```js
const APP_VERSION = '1.3.0';
```

Bump this value whenever you ship a change.

### Adding a new logo

1. Drop the SVG layers into `assets/raw/` (file names match the asset hashes exported from Figma).
2. Add an entry to the `LOGOS` array in `logo-builder.js`:
   - `id`, `label` — identifier and display name.
   - `fullW` / `fullH` — full lockup dimensions (used for aspect ratio and export).
   - `nameFile` — the wordmark SVG.
   - `nameX` / `nameY` / `nameW` / `nameH` — wordmark placement within the full lockup.
   - `layers` — the icon layers. Each layer is `{ file, dark, light, inset }`, where:
     - `file` is the full-color SVG,
     - `dark` / `light` are the monochrome variants,
     - `inset` is `[top, right, bottom, left]` in percentages.

For a text-only logo (like Zentist), set `textOnly: true`, provide only `nameFile`, and leave `layers` empty. Text-only logos are excluded from the Monochrome toggle and simply recolor with the theme.

3. Run `npm run build` to regenerate the static files in `logos/`.
