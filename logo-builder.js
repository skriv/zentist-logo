// Общий модуль сборки логотипов.
// Работает и в браузере (window.LogoBuilder), и в Node (module.exports).
// Это единственный источник правды для конфигурации логотипов и логики
// генерации итогового SVG, чтобы превью на странице, скачивание и
// предгенерированные файлы в папке logos/ всегда совпадали.
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.LogoBuilder = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  const ICON_SIZE = 140;

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
      nameFile: 'f0716c50c1954b82a9692dae68b355cf1731bfef',
      nameX: 180,
      nameY: 29.74,
      nameW: 390.338,
      nameH: 80.52,
      layers: [
        { file: '86e4b8561a0838c63cf936fdeec0ee4f65bc5da7', dark: '4f7064c1a29a023c6e9eb68239702ec5b9d56a18', light: '69ffc37de7ccbb1465632fb8e3c6c7190f8a79fb', inset: [5.32, 41.17, 41.17, 5.32] },
        { file: '813a3f4fe4dc9da88ca11f8d7c6d5e17f42940aa', dark: '965d19776bd377ba3f72729ad9f73c49dece9251', light: '1b8b09ba0aad2aa81b5248586ed619aa29d4fae1', inset: [41.17, 41.17, 5.32, 5.32] },
        { file: 'e35f2a86aae63aa9a96def34e05008fc6912f178', dark: '697328aec0f82b72fbd5962b619a5298f662d5d1', light: 'dfe708725c3ed0435aa93c75a02c768a1306c624', inset: [41.17, 5.32, 5.32, 41.17] },
        { file: '82c20f4038408ae3bf17a98d8a06559313b8d5f7', dark: 'eb584002b8f9d02ce7ff0516a21f9ee9bb23e021', light: '5c566713b1122390cfd49abc09fde356eae83727', inset: [5.32, 5.32, 41.17, 41.17] },
        { file: 'ff419726a900d5057c27caf204e8d88f974a132b', dark: '29f101e276698cddd2128723715d096afe0d8dda', light: 'b94caa5995da5989892d4dfd8b9574123556e4a2', inset: [0, 40, 80, 40] },
        { file: 'd776eaf623a9c76b7473c82aa064661b590b3d8e', dark: '29f101e276698cddd2128723715d096afe0d8dda', light: 'b94caa5995da5989892d4dfd8b9574123556e4a2', inset: [40, 80, 40, 0] },
        { file: 'ff419726a900d5057c27caf204e8d88f974a132b', dark: '29f101e276698cddd2128723715d096afe0d8dda', light: 'b94caa5995da5989892d4dfd8b9574123556e4a2', inset: [80, 40, 0, 40] },
        { file: 'd776eaf623a9c76b7473c82aa064661b590b3d8e', dark: '29f101e276698cddd2128723715d096afe0d8dda', light: 'b94caa5995da5989892d4dfd8b9574123556e4a2', inset: [40, 0, 40, 80] },
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
        { file: '6ae96650719b57be306a64153b50d954a89f208d', dark: 'e7319aeb022d06c0afbfa1e82cc26fe6a78dab5b', light: '0dfae7630798b6baef6d65cab8df3e5f7fbbae45', inset: [2.93, 42.93, 42.93, 2.93] },
        { file: '2efd6aa3b3a27c66ed1dd3108a6ab5d4e57b5718', dark: '40e1ac37056d7dae42ec4a5f274d950aa17c375f', light: '8bc24215cc5b222ba2404edcb501484f6293ffd7', inset: [2.93, 2.93, 42.93, 42.93] },
        { file: 'c2ea1e5fe85e5545a992656670b04a93dde7226f', dark: '26fbb0a4f3b3c8676888fc4ea2afbb3639299dae', light: '2b9a6c5a5586e4dfa860820c95f60753e8f1810b', inset: [42.93, 42.93, 2.93, 2.93] },
        { file: '644f3a447713778d5d680da73da92360f33a8b9a', dark: '49335ab04a2adb1faeb9fc93ca3e6a157a5f9da3', light: '494277da9ea7102a0b2eb18ce32efaae736f8537', inset: [42.93, 2.93, 2.93, 42.93] },
        { file: '4b7b7419abe83f47ff6a68e96f5bf719695051ef', dark: '9a35540e95a344f915b374b02116fb7ce3692e01', light: '4fe6f303d91d66787175ebe1c979d2b81674727b', inset: [80, 40, 0, 40] },
        { file: '4b7b7419abe83f47ff6a68e96f5bf719695051ef', dark: '9a35540e95a344f915b374b02116fb7ce3692e01', light: '4fe6f303d91d66787175ebe1c979d2b81674727b', inset: [40, 0, 40, 80] },
        { file: '4b7b7419abe83f47ff6a68e96f5bf719695051ef', dark: '9a35540e95a344f915b374b02116fb7ce3692e01', light: '4fe6f303d91d66787175ebe1c979d2b81674727b', inset: [40, 80, 40, 0] },
        { file: '4b7b7419abe83f47ff6a68e96f5bf719695051ef', dark: '9a35540e95a344f915b374b02116fb7ce3692e01', light: '4fe6f303d91d66787175ebe1c979d2b81674727b', inset: [0, 40, 80, 40] },
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
        { file: 'ae1398f31a66f2c2559a1da4b0242a1b87921356', dark: '0f538d7e5e5b3daf0018296b977b1262edc82650', light: '67eb9a7fb7229b0dc435301a3b55e382ce19b39a', inset: [0, 10, 80, 10] },
        { file: 'e167acb1c98e20be083456c48cf202713878ec72', dark: '3e146733d5f3715f716e04281c1336a3837b5764', light: '1641d15bf90b82b762198aa5d2d00691058aabee', inset: [10, 80, 10, 0] },
        { file: 'bfe9872f84e4663fb0834acf5ae9a4b42db60676', dark: '90506691a7268eda6631516b6140d4d0c05b4bb2', light: 'e9868f4eec28387d8ac27221ea0095b4499225cf', inset: [10, 0, 10, 80] },
        { file: '0b72786e8da19c0835d777c800703c3971a2de3a', dark: '8f7e29c0994c230c2a5b0a5798d1a94c8b1bb424', light: '3ffdbc4bd1f32f3d2b960958d1779a2a630b94b8', inset: [80, 10, 0, 10] },
        { file: '41d9fc462999ed8b870a3963da7f3428894d4647', dark: '7d787d2c0281e56ec525df31e7cd9690e4d7342f', light: 'a3e245cf60030490e2e68f7e58b1f259f4777eaa', inset: [40, 40, 40, 40] },
        { file: '41d9fc462999ed8b870a3963da7f3428894d4647', dark: '7d787d2c0281e56ec525df31e7cd9690e4d7342f', light: 'a3e245cf60030490e2e68f7e58b1f259f4777eaa', inset: [80, 0, 0, 80] },
        { file: '41d9fc462999ed8b870a3963da7f3428894d4647', dark: '7d787d2c0281e56ec525df31e7cd9690e4d7342f', light: 'a3e245cf60030490e2e68f7e58b1f259f4777eaa', inset: [80, 80, 0, 0] },
        { file: '41d9fc462999ed8b870a3963da7f3428894d4647', dark: '7d787d2c0281e56ec525df31e7cd9690e4d7342f', light: 'a3e245cf60030490e2e68f7e58b1f259f4777eaa', inset: [0, 0, 80, 80] },
        { file: '41d9fc462999ed8b870a3963da7f3428894d4647', dark: '7d787d2c0281e56ec525df31e7cd9690e4d7342f', light: 'a3e245cf60030490e2e68f7e58b1f259f4777eaa', inset: [0, 80, 80, 0] },
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
        { file: '485c5956f9486a3f17028396538e8db7a85ae6ef', dark: '1f822cb52b49b1536620700131f9a077194d581a', light: '0c48602edc7684e1d37edf69b1551ab6c3c51137', inset: [0, 0, 50, 0] },
        { file: 'e2aca1f7f4c380a618b50ba37eb85acff034fa74', dark: 'cb4156af79aff2443dad3eac345ab63779c16f45', light: '73452db379a5fc0b9df6ddc6887d2602b899bf5a', inset: [50, 0, 0, 0] },
        { file: '6548f97cb1d5ffb11f7110b37e13374ccb550025', dark: '27c20e86a25e2499ec6e093433a743280f929ffe', light: 'e16d1012c3901d59c8ffe978794e4627bfe268e3', inset: [40, 80, 40, 0] },
        { file: '6548f97cb1d5ffb11f7110b37e13374ccb550025', dark: '27c20e86a25e2499ec6e093433a743280f929ffe', light: 'e16d1012c3901d59c8ffe978794e4627bfe268e3', inset: [40, 0, 40, 80] },
        { file: '6548f97cb1d5ffb11f7110b37e13374ccb550025', dark: '27c20e86a25e2499ec6e093433a743280f929ffe', light: 'e16d1012c3901d59c8ffe978794e4627bfe268e3', inset: [40, 40, 40, 40] },
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
        { file: '940eec5f330c1991853c5a0e1edec1e690b401eb', dark: '1a0fdbfcf99f080312c34a3a00a9da7efbaf2fbd', light: 'b02ae76f11d0570a5bbc2f56c6b23e677969bec6', inset: [5.53, 41.06, 5.53, 1.06] },
        { file: 'da4ac1f5042b6177afcfd46f743f5f219e1a1822', dark: '32d66e809479ed7a55c76535bd18ca3f2c5afbe1', light: 'f55b832d07b2b4ca0144d23e1a25868138cfa194', inset: [5.53, 1.06, 5.53, 41.06] },
        { file: '77353839bc334afa0ab9067be2457c33867d45ad', dark: '9a35540e95a344f915b374b02116fb7ce3692e01', light: '4fe6f303d91d66787175ebe1c979d2b81674727b', inset: [80, 40, 0, 40] },
        { file: '77353839bc334afa0ab9067be2457c33867d45ad', dark: '9a35540e95a344f915b374b02116fb7ce3692e01', light: '4fe6f303d91d66787175ebe1c979d2b81674727b', inset: [0, 80, 80, 0] },
        { file: '77353839bc334afa0ab9067be2457c33867d45ad', dark: '9a35540e95a344f915b374b02116fb7ce3692e01', light: '4fe6f303d91d66787175ebe1c979d2b81674727b', inset: [0, 0, 80, 80] },
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
        { file: 'd4f45d236fcf3a9bf906ded3bbf9200ab0370816', dark: '6a72aaf104252664e9f871246f565c600fa5bd12', light: 'b25cf4248c0e548f472e08ca56e3edac92f6d436', inset: [0, 49.76, 49.76, 0] },
        { file: 'bfd1204aedb5533de91a84466a3edc55ebc55147', dark: '9a35540e95a344f915b374b02116fb7ce3692e01', light: '4fe6f303d91d66787175ebe1c979d2b81674727b', inset: [0, 40, 80, 40] },
        { file: '0c3cea72703fcaa45ed1e9d82a319b4bef25313b', dark: 'e4f4355ab9037234838a973a6f51c06c9a8166d4', light: '6d808945810ea4c61c85973662fc2b23f73c6f2b', inset: [0, 0, 49.76, 49.76] },
        { file: 'bfd1204aedb5533de91a84466a3edc55ebc55147', dark: '9a35540e95a344f915b374b02116fb7ce3692e01', light: '4fe6f303d91d66787175ebe1c979d2b81674727b', inset: [40, 0, 40, 80] },
        { file: '9ccee1299a4d20a276e0af16229d54deeeeacc8a', dark: 'adb1f19a35ff5e8d4717cd47a24a8512c3902214', light: '63f7450539076e3d6f85cbc639b153437c9bc52d', inset: [49.76, 0, 0, 49.76] },
        { file: 'bfd1204aedb5533de91a84466a3edc55ebc55147', dark: '9a35540e95a344f915b374b02116fb7ce3692e01', light: '4fe6f303d91d66787175ebe1c979d2b81674727b', inset: [40, 40, 40, 40] },
        { file: 'b7cb8abc449d4e4b82fc75c81274c164c74de6e4', dark: 'df27cd36626e344a4e51914358e441a2cd703afa', light: '7469fb8e584e6e1c2803ba6f96c2fe8f0f93159c', inset: [49.76, 49.76, 0, 0] },
        { file: 'bfd1204aedb5533de91a84466a3edc55ebc55147', dark: '9a35540e95a344f915b374b02116fb7ce3692e01', light: '4fe6f303d91d66787175ebe1c979d2b81674727b', inset: [80, 40, 0, 40] },
        { file: 'bfd1204aedb5533de91a84466a3edc55ebc55147', dark: '9a35540e95a344f915b374b02116fb7ce3692e01', light: '4fe6f303d91d66787175ebe1c979d2b81674727b', inset: [40, 80, 40, 0] },
      ],
    },
  ];

  function iconVariant(theme, mono) {
    if (!mono) return 'full';
    return theme === 'dark' ? 'light' : 'dark';
  }

  function layerFile(layer, variant) {
    return layer[variant] || layer.file;
  }

  // Извлекает defs, внутреннее содержимое и viewBox из строки SVG
  // (без DOMParser, чтобы работать и в Node).
  function extractSvgInner(svgText) {
    const viewBoxMatch = svgText.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 100 100';

    const inner = svgText
      .replace(/^[\s\S]*?<svg[^>]*>/, '')
      .replace(/<\/svg>\s*$/, '');

    let defs = '';
    const content = inner.replace(/<defs[\s\S]*?<\/defs>/g, (match) => {
      defs += match;
      return '';
    });

    return { content: content.trim(), defs, viewBox };
  }

  function colorizeNameSvg(svgText, theme) {
    if (theme === 'dark') {
      return svgText
        .replace(/var\(--fill-0,\s*black\)/g, 'white')
        .replace(/fill="black"/g, 'fill="white"');
    }
    return svgText;
  }

  // Делает id внутри defs уникальными и обновляет ссылки url(#...) / href="#..."
  // чтобы градиенты не конфликтовали при объединении нескольких слоёв.
  function scopeSvg(prefix, defs, content) {
    const scopeRefs = (str) =>
      str
        .replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)
        .replace(/(xlink:href|href)="#([^"]+)"/g, `$1="#${prefix}-$2"`);

    const scopedDefs = scopeRefs(defs.replace(/id="([^"]+)"/g, `id="${prefix}-$1"`));
    const scopedContent = scopeRefs(content);
    return { scopedDefs, scopedContent };
  }

  // readSvg(file) -> строка SVG или Promise<строка>. await работает в обоих случаях.
  async function composeSvg(logo, view, theme, mono, readSvg) {
    const variant = iconVariant(theme, mono);
    const defsParts = [];
    const bodyParts = [];
    let defsIndex = 0;

    if (logo.textOnly) {
      const raw = colorizeNameSvg(await readSvg(logo.nameFile), theme);
      const { content, defs, viewBox } = extractSvgInner(raw);
      const prefix = `logo-${logo.id}-text`;
      const { scopedDefs, scopedContent } = scopeSvg(prefix, defs, content);
      if (scopedDefs) defsParts.push(scopedDefs);

      const [, , vbW = logo.fullW, vbH = logo.fullH] = viewBox.split(/\s+/).map(Number);
      bodyParts.push(
        `<g transform="scale(${logo.fullW / vbW} ${logo.fullH / vbH})">${scopedContent}</g>`
      );

      return wrap(logo.fullW, logo.fullH, defsParts, bodyParts);
    }

    const addLayer = async (file, x, y, w, h) => {
      const raw = await readSvg(file);
      const { content, defs, viewBox } = extractSvgInner(raw);
      const prefix = `logo-${logo.id}-${defsIndex++}`;
      const { scopedDefs, scopedContent } = scopeSvg(prefix, defs, content);
      if (scopedDefs) defsParts.push(scopedDefs);

      const [, , vbW = w, vbH = h] = viewBox.split(/\s+/).map(Number);
      bodyParts.push(
        `<g transform="translate(${x} ${y}) scale(${w / vbW} ${h / vbH})">${scopedContent}</g>`
      );
    };

    for (const layer of logo.layers) {
      const [top, right, bottom, left] = layer.inset;
      const x = (left / 100) * ICON_SIZE;
      const y = (top / 100) * ICON_SIZE;
      const w = ((100 - left - right) / 100) * ICON_SIZE;
      const h = ((100 - top - bottom) / 100) * ICON_SIZE;
      await addLayer(layerFile(layer, variant), x, y, w, h);
    }

    if (view === 'icon') {
      return wrap(ICON_SIZE, ICON_SIZE, defsParts, bodyParts);
    }

    const nameRaw = colorizeNameSvg(await readSvg(logo.nameFile), theme);
    const { content: nameContent, defs: nameDefs, viewBox: nameViewBox } = extractSvgInner(nameRaw);
    const namePrefix = `logo-${logo.id}-name`;
    const { scopedDefs: scopedNameDefs, scopedContent: scopedNameContent } = scopeSvg(namePrefix, nameDefs, nameContent);
    if (scopedNameDefs) defsParts.push(scopedNameDefs);

    const [, , nameVbW = logo.nameW, nameVbH = logo.nameH] = nameViewBox.split(/\s+/).map(Number);
    bodyParts.push(
      `<g transform="translate(${logo.nameX} ${logo.nameY}) scale(${logo.nameW / nameVbW} ${logo.nameH / nameVbH})">${scopedNameContent}</g>`
    );

    return wrap(logo.fullW, logo.fullH, defsParts, bodyParts);
  }

  function wrap(w, h, defsParts, bodyParts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="none">
${defsParts.join('\n')}
${bodyParts.join('\n')}
</svg>`;
  }

  // Имя файла без расширения, например remit-ai-full-light или remit-ai-icon-dark-mono.
  function logoFileName(logo, view, theme, mono) {
    const monoSuffix = mono && !logo.textOnly ? '-mono' : '';
    return `${logo.id}-${view}-${theme}${monoSuffix}`;
  }

  // Все уникальные комбинации (view/theme/mono), которые умеет отображать UI.
  function logoVariants(logo) {
    const views = ['full', 'icon'];
    const themes = ['light', 'dark'];
    const monos = logo.textOnly ? [false] : [false, true];
    const seen = new Set();
    const out = [];
    for (const view of views) {
      for (const theme of themes) {
        for (const mono of monos) {
          const name = logoFileName(logo, view, theme, mono);
          if (seen.has(name)) continue;
          seen.add(name);
          out.push({ view, theme, mono });
        }
      }
    }
    return out;
  }

  return {
    ICON_SIZE,
    LOGOS,
    iconVariant,
    layerFile,
    extractSvgInner,
    colorizeNameSvg,
    scopeSvg,
    composeSvg,
    logoFileName,
    logoVariants,
  };
});
