#!/usr/bin/env node
// Предгенерация всех логотипов в статические SVG-файлы.
// Использует ту же логику сборки, что и страница (logo-builder.js),
// поэтому файлы 1:1 совпадают с превью и скачиванием.
//
// Запуск: node build-logos.js   (или npm run build)
// Результат: logos/<brand>/<brand>-<view>-<theme>[-mono].svg

const fs = require('fs');
const path = require('path');
const LB = require('./logo-builder.js');

const RAW_DIR = path.join(__dirname, 'assets', 'raw');
const OUT_DIR = path.join(__dirname, 'logos');

const readSvg = (file) => fs.readFileSync(path.join(RAW_DIR, `${file}.svg`), 'utf8');

async function main() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let count = 0;
  for (const logo of LB.LOGOS) {
    const brandDir = path.join(OUT_DIR, logo.id);
    fs.mkdirSync(brandDir, { recursive: true });

    for (const variant of LB.logoVariants(logo)) {
      const svg = await LB.composeSvg(logo, variant.view, variant.theme, variant.mono, readSvg);
      const name = `${LB.logoFileName(logo, variant.view, variant.theme, variant.mono)}.svg`;
      fs.writeFileSync(path.join(brandDir, name), svg, 'utf8');
      count += 1;
    }
  }

  console.log(`Generated ${count} logo files in ${path.relative(__dirname, OUT_DIR)}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
