// Версия виджета. Обновляйте только это значение при изменениях.
const APP_VERSION = '1.5.0';

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

  actions.append(
    createMenu('Save', [
      { action: 'svg', label: 'SVG' },
      { action: 'png', label: 'PNG' },
    ]),
    createMenu('Copy', [
      { action: 'copy', label: 'File to Clipboard' },
      { action: 'link', label: 'Link URL' },
    ])
  );

  card.append(preview, actions);
  return card;
}

const CHEVRON_SVG =
  '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function createMenu(label, items) {
  const menu = document.createElement('div');
  menu.className = 'logo-menu';

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'logo-menu__trigger';
  trigger.dataset.menuTrigger = '';
  trigger.setAttribute('aria-haspopup', 'true');
  trigger.setAttribute('aria-expanded', 'false');

  const labelEl = document.createElement('span');
  labelEl.className = 'logo-menu__label';
  labelEl.textContent = label;

  const chevron = document.createElement('span');
  chevron.className = 'logo-menu__chevron';
  chevron.innerHTML = CHEVRON_SVG;

  trigger.append(labelEl, chevron);

  const list = document.createElement('ul');
  list.className = 'logo-menu__list';
  list.setAttribute('role', 'menu');

  items.forEach((item) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'logo-menu__item';
    btn.dataset.download = item.action;
    btn.setAttribute('role', 'menuitem');
    btn.textContent = item.label;
    li.appendChild(btn);
    list.appendChild(li);
  });

  menu.append(trigger, list);
  return menu;
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
    const trigger = event.target.closest('[data-menu-trigger]');
    if (trigger) {
      toggleMenu(trigger);
      return;
    }

    const item = event.target.closest('[data-download]');
    if (!item) return;

    const card = item.closest('.logo-card');
    const logo = LOGOS.find((entry) => entry.id === card.dataset.brand);
    if (!logo) return;

    closeAllMenus();

    const format = item.dataset.download;
    if (format === 'svg') {
      downloadSvg(logo);
    } else if (format === 'png') {
      downloadPng(logo);
    } else if (format === 'copy') {
      copySvg(logo);
    } else if (format === 'link') {
      copyLink(logo);
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.logo-menu')) closeAllMenus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAllMenus();
  });
}

function toggleMenu(trigger) {
  const menu = trigger.closest('.logo-menu');
  const willOpen = !menu.classList.contains('is-open');
  closeAllMenus();
  if (willOpen) {
    menu.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
  }
}

function closeAllMenus() {
  document.querySelectorAll('.logo-menu.is-open').forEach((menu) => {
    menu.classList.remove('is-open');
    const trigger = menu.querySelector('[data-menu-trigger]');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
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
  showToast('SVG saved');
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
  showToast('PNG saved');
}

// URL предгенерированного файла относительно текущего адреса страницы,
// поэтому ссылка корректна и на localhost, и на боевом домене.
function logoUrl(logo) {
  const name = logoFileName(logo, state.view, state.theme, state.mono);
  const relative = `${LOGOS_DIR}/${logo.id}/${name}.svg`;
  return new URL(relative, window.location.href).href;
}

async function copyLink(logo) {
  const url = logoUrl(logo);
  try {
    await navigator.clipboard.writeText(url);
  } catch (err) {
    legacyCopyText(url);
  }
  showToast('Link copied');
}

async function copySvg(logo) {
  const svg = await buildCompositeSvg(logo, state.view, state.theme, state.mono);
  try {
    await navigator.clipboard.writeText(svg);
  } catch (err) {
    legacyCopyText(svg);
  }
  showToast('File copied');
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

const TOAST_ICON =
  '<svg viewBox="0 0 14 14.5" fill="none" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.0029 3.70246L6.22295 1.67683C6.46546 1.56043 6.73101 1.5 7 1.5C7.26899 1.5 7.53454 1.56043 7.77705 1.67683L11.9971 3.70246C12.3045 3.85 12.5 4.16074 12.5 4.50168V5C12.5 7.91539 11.0145 10.6298 8.55893 12.2014L7.57312 12.8323C7.40203 12.9418 7.20314 13 7 13C6.79686 13 6.59797 12.9418 6.42688 12.8323L5.44107 12.2014C2.98553 10.6298 1.5 7.91539 1.5 5V4.50168C1.5 4.16073 1.69553 3.85 2.0029 3.70246ZM5.57386 0.324549L1.3538 2.35018C0.526356 2.74735 0 3.58385 0 4.50168V5C0 8.42686 1.74615 11.6175 4.63249 13.4648L5.6183 14.0957C6.03078 14.3597 6.51027 14.5 7 14.5C7.48973 14.5 7.96922 14.3597 8.3817 14.0957L9.36751 13.4648C12.2539 11.6175 14 8.42686 14 5V4.50168C14 3.58385 13.4736 2.74735 12.6462 2.35018L8.42614 0.324548C7.98107 0.110914 7.49369 0 7 0C6.50631 0 6.01893 0.110914 5.57386 0.324549ZM10.1 5.45C10.3485 5.11863 10.2814 4.64853 9.95 4.4C9.61863 4.15147 9.14853 4.21863 8.9 4.55L6.41885 7.85819L5.03033 6.46967C4.73744 6.17678 4.26256 6.17678 3.96967 6.46967C3.67678 6.76256 3.67678 7.23744 3.96967 7.53033L5.96967 9.53033C6.12341 9.68407 6.3363 9.76353 6.55317 9.74811C6.77004 9.7327 6.96955 9.62393 7.1 9.45L10.1 5.45Z" fill="#17C964"/></svg>';

let toastContainer;

function showToast(message) {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'zentist-toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'zentist-toast';
  toast.setAttribute('role', 'status');

  const icon = document.createElement('span');
  icon.className = 'zentist-toast__icon';
  icon.innerHTML = TOAST_ICON;

  const text = document.createElement('span');
  text.className = 'zentist-toast__text';
  text.textContent = message;

  toast.append(icon, text);
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('is-visible'));

  window.setTimeout(() => {
    toast.classList.remove('is-visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 2400);
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
