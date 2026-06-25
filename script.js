// Версия виджета. Обновляйте только это значение при изменениях.
const APP_VERSION = '1.3.0';

const ASSET_BASE = 'assets/raw/';
// Папка с предгенерированными логотипами (см. build-logos.js).
const LOGOS_DIR = 'logos';

// Конфигурация и логика сборки берутся из общего модуля logo-builder.js,
// который также используется Node-скриптом предгенерации.
const { LOGOS, ICON_SIZE, iconVariant, layerFile, composeSvg, logoFileName } = LogoBuilder;

const svgCache = new Map();

const state = {
  view: 'full',
  theme: 'light',
  mono: false,
};

function applyInset(el, inset) {
  const [top, right, bottom, left] = inset;
  el.style.top = `${top}%`;
  el.style.right = `${right}%`;
  el.style.bottom = `${bottom}%`;
  el.style.left = `${left}%`;
}

function createIconMarkup(logo) {
  const icon = document.createElement('div');
  icon.className = 'logo-icon';
  icon.setAttribute('aria-hidden', 'true');

  const variant = iconVariant(state.theme, state.mono);

  logo.layers.forEach((layer) => {
    const layerEl = document.createElement('div');
    layerEl.className = 'logo-icon__layer';
    applyInset(layerEl, layer.inset);

    const img = document.createElement('img');
    img.dataset.full = layer.file;
    if (layer.dark) img.dataset.dark = layer.dark;
    if (layer.light) img.dataset.light = layer.light;
    img.src = `${ASSET_BASE}${layerFile(layer, variant)}.svg`;
    img.alt = '';
    img.decoding = 'async';
    layerEl.appendChild(img);
    icon.appendChild(layerEl);
  });

  return icon;
}

function updateIconSources() {
  const variant = iconVariant(state.theme, state.mono);
  document.querySelectorAll('.logo-icon__layer img').forEach((img) => {
    const file = img.dataset[variant] || img.dataset.full;
    const next = `${ASSET_BASE}${file}.svg`;
    if (img.getAttribute('src') !== next) img.setAttribute('src', next);
  });
}

function createLogoDisplay(logo) {
  const display = document.createElement('div');
  display.className = 'logo-display';
  display.style.setProperty('--logo-aspect', String(logo.fullW / logo.fullH));

  if (logo.textOnly) {
    display.classList.add('logo-display--text');
    const text = document.createElement('img');
    text.className = 'logo-name';
    text.src = `${ASSET_BASE}${logo.nameFile}.svg`;
    text.alt = logo.label;
    display.appendChild(text);
    return display;
  }

  display.style.setProperty('--icon-share', `${(ICON_SIZE / logo.fullW) * 100}%`);
  display.style.setProperty('--name-left', `${(logo.nameX / logo.fullW) * 100}%`);
  display.style.setProperty('--name-top', `${(logo.nameY / logo.fullH) * 100}%`);
  display.style.setProperty('--name-width', `${(logo.nameW / logo.fullW) * 100}%`);
  display.style.setProperty('--name-height', `${(logo.nameH / logo.fullH) * 100}%`);

  const icon = createIconMarkup(logo);
  display.appendChild(icon);

  const name = document.createElement('img');
  name.className = 'logo-name';
  name.src = `${ASSET_BASE}${logo.nameFile}.svg`;
  name.alt = logo.label;
  display.appendChild(name);

  return display;
}

function createCard(logo) {
  const card = document.createElement('article');
  card.className = 'logo-card';
  card.dataset.brand = logo.id;

  const preview = document.createElement('div');
  preview.className = 'logo-card__preview';
  preview.appendChild(createLogoDisplay(logo));

  const actions = document.createElement('div');
  actions.className = 'logo-card__actions';

  const label = document.createElement('span');
  label.className = 'logo-card__actions-label';
  label.textContent = 'Download';

  const buttons = document.createElement('div');
  buttons.className = 'logo-card__actions-buttons';

  const svgBtn = document.createElement('button');
  svgBtn.type = 'button';
  svgBtn.className = 'logo-card__btn';
  svgBtn.dataset.download = 'svg';
  svgBtn.textContent = 'SVG';

  const pngBtn = document.createElement('button');
  pngBtn.type = 'button';
  pngBtn.className = 'logo-card__btn';
  pngBtn.dataset.download = 'png';
  pngBtn.textContent = 'PNG';

  const copyBtn = document.createElement('button');
  copyBtn.type = 'button';
  copyBtn.className = 'logo-card__btn';
  copyBtn.dataset.download = 'copy';
  copyBtn.textContent = 'Copy';

  const linkBtn = document.createElement('button');
  linkBtn.type = 'button';
  linkBtn.className = 'logo-card__btn';
  linkBtn.dataset.download = 'link';
  linkBtn.textContent = 'Link';

  buttons.append(svgBtn, pngBtn, copyBtn, linkBtn);
  actions.append(label, buttons);
  card.append(preview, actions);
  return card;
}

function renderGrid() {
  const grid = document.getElementById('logos-grid');
  grid.replaceChildren(...LOGOS.map(createCard));
}

function updateRootClasses() {
  const root = document.getElementById('zentist-logos');
  root.classList.toggle('zentist-logos--icon', state.view === 'icon');
  root.classList.toggle('zentist-logos--full', state.view === 'full');
  root.classList.toggle('zentist-logos--dark', state.theme === 'dark');
  root.classList.toggle('zentist-logos--mono', state.mono);

  const viewToggle = document.querySelector('[data-toggle="view"]');
  const darkToggle = document.querySelector('[data-toggle="dark"]');
  const monoToggle = document.querySelector('[data-toggle="mono"]');

  const viewActive = state.view === 'full';
  const darkActive = state.theme === 'dark';
  const monoActive = state.mono;

  viewToggle.classList.toggle('is-active', viewActive);
  viewToggle.setAttribute('aria-pressed', String(viewActive));
  darkToggle.classList.toggle('is-active', darkActive);
  darkToggle.setAttribute('aria-pressed', String(darkActive));
  if (monoToggle) {
    monoToggle.classList.toggle('is-active', monoActive);
    monoToggle.setAttribute('aria-pressed', String(monoActive));
  }

  updateIconSources();
}

function setupControls() {
  document.querySelector('[data-toggle="view"]').addEventListener('click', () => {
    state.view = state.view === 'full' ? 'icon' : 'full';
    updateRootClasses();
  });

  document.querySelector('[data-toggle="dark"]').addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    updateRootClasses();
  });

  const monoToggle = document.querySelector('[data-toggle="mono"]');
  if (monoToggle) {
    monoToggle.addEventListener('click', () => {
      state.mono = !state.mono;
      updateRootClasses();
    });
  }

  document.getElementById('logos-grid').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-download]');
    if (!btn) return;

    const card = btn.closest('.logo-card');
    const logo = LOGOS.find((item) => item.id === card.dataset.brand);
    if (!logo) return;

    const format = btn.dataset.download;
    if (format === 'svg') {
      downloadSvg(logo);
    } else if (format === 'png') {
      downloadPng(logo);
    } else if (format === 'copy') {
      copySvg(logo, btn);
    } else if (format === 'link') {
      copyLink(logo, btn);
    }
  });
}

async function fetchSvgText(file) {
  const key = `${ASSET_BASE}${file}.svg`;
  if (svgCache.has(key)) return svgCache.get(key);
  const response = await fetch(key);
  const text = await response.text();
  svgCache.set(key, text);
  return text;
}

function buildCompositeSvg(logo, view, theme, mono = false) {
  return composeSvg(logo, view, theme, mono, fetchSvgText);
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadName(logo, ext) {
  const mono = state.mono && !logo.textOnly ? '-mono' : '';
  return `${logo.id}-${state.view}-${state.theme}${mono}.${ext}`;
}

async function downloadSvg(logo) {
  const svg = await buildCompositeSvg(logo, state.view, state.theme, state.mono);
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  triggerDownload(blob, downloadName(logo, 'svg'));
}

async function downloadPng(logo) {
  const svg = await buildCompositeSvg(logo, state.view, state.theme, state.mono);
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const image = new Image();
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = url;
  });

  const srcW = (state.view === 'icon' && !logo.textOnly) ? ICON_SIZE : logo.fullW;
  const srcH = (state.view === 'icon' && !logo.textOnly) ? ICON_SIZE : logo.fullH;
  const targetW = 2000;
  const targetH = Math.round((targetW / srcW) * srcH);

  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, targetW, targetH);

  URL.revokeObjectURL(url);

  await new Promise((resolve) => {
    canvas.toBlob((pngBlob) => {
      triggerDownload(pngBlob, downloadName(logo, 'png'));
      resolve();
    }, 'image/png');
  });
}

// URL предгенерированного файла относительно текущего адреса страницы,
// поэтому ссылка корректна и на localhost, и на боевом домене.
function logoUrl(logo) {
  const name = logoFileName(logo, state.view, state.theme, state.mono);
  const relative = `${LOGOS_DIR}/${logo.id}/${name}.svg`;
  return new URL(relative, window.location.href).href;
}

async function copyLink(logo, btn) {
  const url = logoUrl(logo);
  const original = btn ? btn.textContent : '';
  try {
    await navigator.clipboard.writeText(url);
    if (btn) flashButton(btn, 'Copied', original);
  } catch (err) {
    const ok = legacyCopyText(url);
    if (btn) flashButton(btn, ok ? 'Copied' : 'Error', original);
  }
}

async function copySvg(logo, btn) {
  const svg = await buildCompositeSvg(logo, state.view, state.theme, state.mono);
  const original = btn ? btn.textContent : '';
  try {
    await navigator.clipboard.writeText(svg);
    if (btn) flashButton(btn, 'Copied', original);
  } catch (err) {
    const ok = legacyCopyText(svg);
    if (btn) flashButton(btn, ok ? 'Copied' : 'Error', original);
  }
}

function legacyCopyText(text) {
  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch (err) {
    ok = false;
  }
  document.body.removeChild(area);
  return ok;
}

function flashButton(btn, message, original) {
  btn.textContent = message;
  btn.classList.add('is-flashing');
  window.clearTimeout(btn._flashTimer);
  btn._flashTimer = window.setTimeout(() => {
    btn.textContent = original;
    btn.classList.remove('is-flashing');
  }, 1200);
}

function renderVersion() {
  const el = document.querySelector('[data-version]');
  if (el) el.textContent = `v${APP_VERSION}`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderGrid();
  setupControls();
  updateRootClasses();
  renderVersion();
});
