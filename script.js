// Версия виджета. Обновляйте только это значение при изменениях.
const APP_VERSION = '1.0.0';

const ICON_SIZE = 140;
const ASSET_BASE = 'assets/raw/';

const LOGOS = [
  {
    id: 'zentist',
    label: 'Zentist',
    textOnly: true,
    fullW: 217.448,
    fullH: 55,
    nameFile: 'a5220963de6c0b6028912767f76d8fdbbc2b57b7',
    layers: [],
  },
  {
    id: 'remit-ai',
    label: 'Remit AI',
    fullW: 570.338,
    fullH: 140,
    nameFile: 'ba53ffb65ab8dd3d2167b250435d1d9dfcfbdc54',
    nameX: 180,
    nameY: 20.46,
    nameW: 390.338,
    nameH: 123.544,
    layers: [
      { file: '86e4b8561a0838c63cf936fdeec0ee4f65bc5da7', inset: [5.32, 41.17, 41.17, 5.32] },
      { file: '813a3f4fe4dc9da88ca11f8d7c6d5e17f42940aa', inset: [41.17, 41.17, 5.32, 5.32] },
      { file: 'e35f2a86aae63aa9a96def34e05008fc6912f178', inset: [41.17, 5.32, 5.32, 41.17] },
      { file: '82c20f4038408ae3bf17a98d8a06559313b8d5f7', inset: [5.32, 5.32, 41.17, 41.17] },
      { file: 'ff419726a900d5057c27caf204e8d88f974a132b', inset: [0, 40, 80, 40] },
      { file: 'd776eaf623a9c76b7473c82aa064661b590b3d8e', inset: [40, 80, 40, 0] },
      { file: 'ff419726a900d5057c27caf204e8d88f974a132b', inset: [80, 40, 0, 40] },
      { file: 'd776eaf623a9c76b7473c82aa064661b590b3d8e', inset: [40, 0, 40, 80] },
    ],
  },
  {
    id: 'caviar',
    label: 'Caviar',
    fullW: 483.644,
    fullH: 140,
    nameFile: '1873c9aabf758fbc55705e1b21a374a788cc9456',
    nameX: 180,
    nameY: 29.41,
    nameW: 303.644,
    nameH: 81.18,
    layers: [
      { file: '6ae96650719b57be306a64153b50d954a89f208d', inset: [2.93, 42.93, 42.93, 2.93] },
      { file: '2efd6aa3b3a27c66ed1dd3108a6ab5d4e57b5718', inset: [2.93, 2.93, 42.93, 42.93] },
      { file: 'c2ea1e5fe85e5545a992656670b04a93dde7226f', inset: [42.93, 42.93, 2.93, 2.93] },
      { file: '644f3a447713778d5d680da73da92360f33a8b9a', inset: [42.93, 2.93, 2.93, 42.93] },
      { file: '4b7b7419abe83f47ff6a68e96f5bf719695051ef', inset: [80, 40, 0, 40] },
      { file: '4b7b7419abe83f47ff6a68e96f5bf719695051ef', inset: [40, 0, 40, 80] },
      { file: '4b7b7419abe83f47ff6a68e96f5bf719695051ef', inset: [40, 80, 40, 0] },
      { file: '4b7b7419abe83f47ff6a68e96f5bf719695051ef', inset: [0, 40, 80, 40] },
    ],
  },
  {
    id: 'vault',
    label: 'Vault',
    fullW: 421.481,
    fullH: 140,
    nameFile: 'd5ef1558edc9b60efa26d9f4fe50db5de7926f4a',
    nameX: 180,
    nameY: 30.56,
    nameW: 241.481,
    nameH: 78.87,
    layers: [
      { file: 'ae1398f31a66f2c2559a1da4b0242a1b87921356', inset: [0, 10, 80, 10] },
      { file: 'e167acb1c98e20be083456c48cf202713878ec72', inset: [10, 80, 10, 0] },
      { file: 'bfe9872f84e4663fb0834acf5ae9a4b42db60676', inset: [10, 0, 10, 80] },
      { file: '0b72786e8da19c0835d777c800703c3971a2de3a', inset: [80, 10, 0, 10] },
      { file: '41d9fc462999ed8b870a3963da7f3428894d4647', inset: [40, 40, 40, 40] },
      { file: '41d9fc462999ed8b870a3963da7f3428894d4647', inset: [80, 0, 0, 80] },
      { file: '41d9fc462999ed8b870a3963da7f3428894d4647', inset: [80, 80, 0, 0] },
      { file: '41d9fc462999ed8b870a3963da7f3428894d4647', inset: [0, 0, 80, 80] },
      { file: '41d9fc462999ed8b870a3963da7f3428894d4647', inset: [0, 80, 80, 0] },
    ],
  },
  {
    id: 'remy',
    label: 'Remy',
    fullW: 446.267,
    fullH: 140,
    nameFile: 'a470f6d8adb487dfc522bf8f9d8342cbd348198f',
    nameX: 180,
    nameY: 26.23,
    nameW: 266.267,
    nameH: 99.55,
    layers: [
      { file: '485c5956f9486a3f17028396538e8db7a85ae6ef', inset: [0, 0, 50, 0] },
      { file: 'e2aca1f7f4c380a618b50ba37eb85acff034fa74', inset: [50, 0, 0, 0] },
      { file: '6548f97cb1d5ffb11f7110b37e13374ccb550025', inset: [40, 80, 40, 0] },
      { file: '6548f97cb1d5ffb11f7110b37e13374ccb550025', inset: [40, 0, 40, 80] },
      { file: '6548f97cb1d5ffb11f7110b37e13374ccb550025', inset: [40, 40, 40, 40] },
    ],
  },
  {
    id: 'verify',
    label: 'Verify',
    fullW: 461.668,
    fullH: 140,
    nameFile: '67259b0958a71132f7aa794f502140b2632b1491',
    nameX: 180,
    nameY: 20.29,
    nameW: 281.668,
    nameH: 101.42,
    layers: [
      { file: '940eec5f330c1991853c5a0e1edec1e690b401eb', inset: [5.53, 41.06, 5.53, 1.06] },
      { file: 'da4ac1f5042b6177afcfd46f743f5f219e1a1822', inset: [5.53, 1.06, 5.53, 41.06] },
      { file: '77353839bc334afa0ab9067be2457c33867d45ad', inset: [80, 40, 0, 40] },
      { file: '77353839bc334afa0ab9067be2457c33867d45ad', inset: [0, 80, 80, 0] },
      { file: '77353839bc334afa0ab9067be2457c33867d45ad', inset: [0, 0, 80, 80] },
    ],
  },
  {
    id: 'autoposting',
    label: 'Autoposting',
    fullW: 772.465,
    fullH: 140,
    nameFile: '2ac82ed31c750001d18bcf9caa6a38dea3350066',
    nameX: 180,
    nameY: 23.74,
    nameW: 592.465,
    nameH: 102.52,
    layers: [
      { file: 'd4f45d236fcf3a9bf906ded3bbf9200ab0370816', inset: [0, 49.76, 49.76, 0] },
      { file: 'bfd1204aedb5533de91a84466a3edc55ebc55147', inset: [0, 40, 80, 40] },
      { file: '0c3cea72703fcaa45ed1e9d82a319b4bef25313b', inset: [0, 0, 49.76, 49.76] },
      { file: 'bfd1204aedb5533de91a84466a3edc55ebc55147', inset: [40, 0, 40, 80] },
      { file: '9ccee1299a4d20a276e0af16229d54deeeeacc8a', inset: [49.76, 0, 0, 49.76] },
      { file: 'bfd1204aedb5533de91a84466a3edc55ebc55147', inset: [40, 40, 40, 40] },
      { file: 'b7cb8abc449d4e4b82fc75c81274c164c74de6e4', inset: [49.76, 49.76, 0, 0] },
      { file: 'bfd1204aedb5533de91a84466a3edc55ebc55147', inset: [80, 40, 0, 40] },
      { file: 'bfd1204aedb5533de91a84466a3edc55ebc55147', inset: [40, 80, 40, 0] },
    ],
  },
];

const svgCache = new Map();

const state = {
  view: 'full',
  theme: 'light',
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

  logo.layers.forEach((layer) => {
    const layerEl = document.createElement('div');
    layerEl.className = 'logo-icon__layer';
    applyInset(layerEl, layer.inset);

    const img = document.createElement('img');
    img.src = `${ASSET_BASE}${layer.file}.svg`;
    img.alt = '';
    img.decoding = 'async';
    layerEl.appendChild(img);
    icon.appendChild(layerEl);
  });

  return icon;
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

  buttons.append(svgBtn, pngBtn);
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

  const viewToggle = document.querySelector('[data-toggle="view"]');
  const darkToggle = document.querySelector('[data-toggle="dark"]');

  const viewActive = state.view === 'full';
  const darkActive = state.theme === 'dark';

  viewToggle.classList.toggle('is-active', viewActive);
  viewToggle.setAttribute('aria-pressed', String(viewActive));
  darkToggle.classList.toggle('is-active', darkActive);
  darkToggle.setAttribute('aria-pressed', String(darkActive));
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

  document.getElementById('logos-grid').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-download]');
    if (!btn) return;

    const card = btn.closest('.logo-card');
    const logo = LOGOS.find((item) => item.id === card.dataset.brand);
    if (!logo) return;

    const format = btn.dataset.download;
    if (format === 'svg') {
      downloadSvg(logo);
    } else {
      downloadPng(logo);
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

function extractSvgInner(svgText) {
  const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
  const svg = doc.querySelector('svg');
  if (!svg) return { content: '', defs: '' };

  const defs = svg.querySelector('defs');
  const defsHtml = defs ? defs.outerHTML : '';
  if (defs) defs.remove();

  return {
    content: svg.innerHTML,
    defs: defsHtml,
    viewBox: svg.getAttribute('viewBox') || '0 0 100 100',
  };
}

function colorizeNameSvg(svgText, theme) {
  if (theme === 'dark') {
    return svgText
      .replace(/var\(--fill-0,\s*black\)/g, 'white')
      .replace(/fill="black"/g, 'fill="white"');
  }
  return svgText;
}

function scopeSvg(prefix, defs, content) {
  const scopeRefs = (str) =>
    str
      .replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)
      .replace(/(xlink:href|href)="#([^"]+)"/g, `$1="#${prefix}-$2"`);

  const scopedDefs = scopeRefs(defs.replace(/id="([^"]+)"/g, `id="${prefix}-$1"`));
  const scopedContent = scopeRefs(content);
  return { scopedDefs, scopedContent };
}

async function buildCompositeSvg(logo, view, theme) {
  const defsParts = [];
  const bodyParts = [];
  let defsIndex = 0;

  if (logo.textOnly) {
    const raw = colorizeNameSvg(await fetchSvgText(logo.nameFile), theme);
    const { content, defs, viewBox } = extractSvgInner(raw);
    const prefix = `logo-${logo.id}-text`;
    const { scopedDefs, scopedContent } = scopeSvg(prefix, defs, content);
    if (scopedDefs) defsParts.push(scopedDefs);

    const [, , vbW = logo.fullW, vbH = logo.fullH] = viewBox.split(/\s+/).map(Number);
    bodyParts.push(
      `<g transform="scale(${logo.fullW / vbW} ${logo.fullH / vbH})">${scopedContent}</g>`
    );

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${logo.fullW} ${logo.fullH}" fill="none">
${defsParts.join('\n')}
${bodyParts.join('\n')}
</svg>`;
  }

  const addLayer = async (file, x, y, w, h) => {
    const raw = await fetchSvgText(file);
    const { content, defs, viewBox } = extractSvgInner(raw);
    const prefix = `logo-${logo.id}-${defsIndex++}`;
    const { scopedDefs, scopedContent } = scopeSvg(prefix, defs, content);
    if (scopedDefs) defsParts.push(scopedDefs);

    const [, , vbW = w, vbH = h] = viewBox.split(/\s+/).map(Number);
    bodyParts.push(
      `<g transform="translate(${x} ${y}) scale(${w / vbW} ${h / vbH})">${scopedContent}</g>`
    );
  };

  if (view === 'icon') {
    for (const layer of logo.layers) {
      const [top, right, bottom, left] = layer.inset;
      const x = (left / 100) * ICON_SIZE;
      const y = (top / 100) * ICON_SIZE;
      const w = ((100 - left - right) / 100) * ICON_SIZE;
      const h = ((100 - top - bottom) / 100) * ICON_SIZE;
      await addLayer(layer.file, x, y, w, h);
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ICON_SIZE} ${ICON_SIZE}" fill="none">
${defsParts.join('\n')}
${bodyParts.join('\n')}
</svg>`;
  }

  for (const layer of logo.layers) {
    const [top, right, bottom, left] = layer.inset;
    const x = (left / 100) * ICON_SIZE;
    const y = (top / 100) * ICON_SIZE;
    const w = ((100 - left - right) / 100) * ICON_SIZE;
    const h = ((100 - top - bottom) / 100) * ICON_SIZE;
    await addLayer(layer.file, x, y, w, h);
  }

  const nameRaw = colorizeNameSvg(await fetchSvgText(logo.nameFile), theme);
  const { content: nameContent, defs: nameDefs, viewBox: nameViewBox } = extractSvgInner(nameRaw);
  const namePrefix = `logo-${logo.id}-name`;
  const { scopedDefs: scopedNameDefs, scopedContent: scopedNameContent } = scopeSvg(namePrefix, nameDefs, nameContent);
  if (scopedNameDefs) defsParts.push(scopedNameDefs);

  const [, , nameVbW = logo.nameW, nameVbH = logo.nameH] = nameViewBox.split(/\s+/).map(Number);
  bodyParts.push(
    `<g transform="translate(${logo.nameX} ${logo.nameY}) scale(${logo.nameW / nameVbW} ${logo.nameH / nameVbH})">${scopedNameContent}</g>`
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${logo.fullW} ${logo.fullH}" fill="none">
${defsParts.join('\n')}
${bodyParts.join('\n')}
</svg>`;
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function downloadSvg(logo) {
  const svg = await buildCompositeSvg(logo, state.view, state.theme);
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  triggerDownload(blob, `${logo.id}-${state.view}-${state.theme}.svg`);
}

async function downloadPng(logo) {
  const svg = await buildCompositeSvg(logo, state.view, state.theme);
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
      triggerDownload(pngBlob, `${logo.id}-${state.view}-${state.theme}.png`);
      resolve();
    }, 'image/png');
  });
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
