# Zentist Logos

A lightweight, static gallery page for browsing the Zentist logo and related brand logos. Each logo is composed dynamically from individual SVG layers and supports display, theme, and color-mode toggles, plus SVG / PNG export.

Built with vanilla HTML, CSS, and JavaScript — no build step and no dependencies.

## Features

- **Full Logo / Icon** — switch between the full lockup (icon + wordmark) and the icon only.
- **Dark Mode** — toggle the preview background between light and dark; wordmarks invert automatically.
- **Monochrome** — show single-color versions of every logo (except Zentist). In light theme it renders the dark monochrome logo; in dark theme it renders the light monochrome logo.
- **Download SVG / PNG** — per-card export buttons that appear on hover. PNGs are rendered at a minimum of 2000px wide. Gradients are preserved in exports via scoped SVG IDs.
- **Responsive grid** — 1 / 2 / 3 columns depending on viewport width.
- **Version badge** — shown in the header; update a single constant to bump it.
- Logos are declared in `script.js` and rendered from SVG layers in `assets/raw/`.

## Project structure

```
.
├── index.html       # Page markup and controls
├── styles.css       # Styles, themes, and responsive grid
├── script.js        # Logo configuration, rendering, and export logic
└── assets/
    └── raw/         # Source SVG layers (icons + wordmarks)
```

## Running

The project is fully static — no build required. You can open `index.html` directly, but a local server is recommended so the SVGs load correctly:

```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve .
```

Then open [http://localhost:8000](http://localhost:8000).

## Configuration

### Version

The header version comes from a single constant at the top of `script.js`:

```js
const APP_VERSION = '1.1.1';
```

Bump this value whenever you ship a change.

### Adding a new logo

1. Drop the SVG layers into `assets/raw/` (file names match the asset hashes exported from Figma).
2. Add an entry to the `LOGOS` array in `script.js`:
   - `id`, `label` — identifier and display name.
   - `fullW` / `fullH` — full lockup dimensions (used for aspect ratio and export).
   - `nameFile` — the wordmark SVG.
   - `nameX` / `nameY` / `nameW` / `nameH` — wordmark placement within the full lockup.
   - `layers` — the icon layers. Each layer is `{ file, dark, light, inset }`, where:
     - `file` is the full-color SVG,
     - `dark` / `light` are the monochrome variants,
     - `inset` is `[top, right, bottom, left]` in percentages.

For a text-only logo (like Zentist), set `textOnly: true`, provide only `nameFile`, and leave `layers` empty. Text-only logos are excluded from the Monochrome toggle and simply recolor with the theme.
