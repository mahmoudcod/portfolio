// One-off generator for the sample placeholder artwork (SVG).
// Output is committed, so you only need to run this again if you want new art.
//   node scripts/make-placeholder-images.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'src', 'content', 'projects');
const ABOUT = path.join(process.cwd(), 'src', 'assets');

const themes = {
  taskflow: { hue: 190, hue2: 260, name: 'TaskFlow' },
  shopsprint: { hue: 262, hue2: 300, name: 'ShopSprint' },
  sheetpilot: { hue: 150, hue2: 190, name: 'SheetPilot' },
  pulsechat: { hue: 30, hue2: 5, name: 'PulseChat' },
};

const font = `font-family="ui-monospace, SFMono-Regular, Menlo, monospace"`;

function wrap(inner, w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${inner}</svg>`;
}

function chrome(x, y, w, h, title) {
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#0f1626" stroke="#2a3550" stroke-width="2"/>
  <rect x="${x}" y="${y}" width="${w}" height="36" rx="14" fill="#141d33"/>
  <rect x="${x}" y="${y + 22}" width="${w}" height="14" fill="#141d33"/>
  <circle cx="${x + 22}" cy="${y + 18}" r="5" fill="#f87171"/>
  <circle cx="${x + 40}" cy="${y + 18}" r="5" fill="#fbbf24"/>
  <circle cx="${x + 58}" cy="${y + 18}" r="5" fill="#34d399"/>
  <rect x="${x + w / 2 - 110}" y="${y + 9}" width="220" height="18" rx="9" fill="#0b1020"/>
  <text x="${x + w / 2}" y="${y + 22}" text-anchor="middle" fill="#64748b" font-size="11" ${font}>${title}</text>`;
}

function barChart(x, y, w, h, color, n = 7) {
  let out = '';
  const bw = w / (n * 1.6);
  for (let i = 0; i < n; i++) {
    const bh = h * (0.25 + Math.abs(Math.sin(i * 1.7)) * 0.75);
    out += `<rect x="${x + i * bw * 1.6}" y="${y + h - bh}" width="${bw}" height="${bh}" rx="${bw / 3}" fill="${color}" opacity="${0.45 + (i % 3) * 0.2}"/>`;
  }
  return out;
}

function dashboard(w, h, theme, title) {
  const p = 56;
  return wrap(`
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${theme.hue} 45% 8%)"/>
      <stop offset="1" stop-color="hsl(${theme.hue2} 40% 12%)"/>
    </linearGradient>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="hsl(${theme.hue} 85% 60%)"/>
      <stop offset="1" stop-color="hsl(${theme.hue2} 85% 68%)"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  ${chrome(p, p, w - p * 2, h - p * 2, title)}
  <rect x="${p + 1}" y="${p + 37}" width="${150}" height="${h - p * 2 - 38}" fill="#0c1222"/>
  ${[0, 1, 2, 3].map((i) => `<rect x="${p + 20}" y="${p + 66 + i * 38}" width="110" height="12" rx="6" fill="${i === 0 ? 'url(#acc)' : '#253048'}"/>`).join('')}
  ${[0, 1, 2].map((i) => `<rect x="${p + 185 + i * 205}" y="${p + 66}" width="185" height="72" rx="10" fill="#141d33" stroke="#253048"/>
     <rect x="${p + 200 + i * 205}" y="${p + 80}" width="70" height="9" rx="4.5" fill="#334155"/>
     <rect x="${p + 200 + i * 205}" y="${p + 100}" width="100" height="16" rx="5" fill="${i === 1 ? 'url(#acc)' : '#e2e8f0'}" opacity="${i === 1 ? 1 : 0.85}"/>`).join('')}
  <rect x="${p + 185}" y="${p + 158}" width="${w - p * 2 - 220}" height="150" rx="10" fill="#141d33" stroke="#253048"/>
  ${barChart(p + 205, p + 172, w - p * 2 - 260, 122, 'hsl(' + theme.hue + ' 85% 60%)')}
  <rect x="${p + 185}" y="${p + 326}" width="${w - p * 2 - 220}" height="${h - p * 2 - 340}" rx="10" fill="#141d33" stroke="#253048"/>
  ${[0, 1, 2, 3].map((i) => `<rect x="${p + 205}" y="${p + 344 + i * 34}" width="${(w - p * 2 - 260) * (0.9 - i * 0.18)}" height="12" rx="6" fill="#253048"/>
     <circle cx="${p + 192}" cy="${p + 350 + i * 34}" r="5" fill="hsl(${theme.hue} 85% 60%)"/>`).join('')}`, w, h);
}

function editor(w, h, theme, title) {
  const p = 56;
  const lines = ['#22d3ee', '#a5b4fc', '#e2e8f0', '#a5b4fc', '#34d399', '#e2e8f0', '#fbbf24', '#a5b4fc', '#e2e8f0', '#22d3ee'];
  return wrap(`
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${theme.hue} 45% 8%)"/>
      <stop offset="1" stop-color="hsl(${theme.hue2} 40% 12%)"/>
    </linearGradient>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="hsl(${theme.hue} 85% 60%)"/>
      <stop offset="1" stop-color="hsl(${theme.hue2} 85% 68%)"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  ${chrome(p, p, w - p * 2, h - p * 2, title)}
  <rect x="${p + 185}" y="${p + 37}" width="4" height="${h - p * 2 - 38}" fill="#1c2740"/>
  ${lines.map((c, i) => `<rect x="${p + 40}" y="${p + 78 + i * 34}" width="${60 + ((i * 97) % 160)}" height="10" rx="5" fill="${c}" opacity="0.75"/>
    <text x="${p + 200}" y="${p + 88 + i * 34}" fill="#475569" font-size="12" ${font}>${i + 1}</text>`).join('')}
  <rect x="${p + 205}" y="${p + 60}" width="${w - p * 2 - 240}" height="120" rx="10" fill="#141d33" stroke="#253048"/>
  <rect x="${p + 225}" y="${p + 80}" width="180" height="14" rx="7" fill="url(#acc)"/>
  <rect x="${p + 225}" y="${p + 108}" width="${w - p * 2 - 290}" height="9" rx="4.5" fill="#253048"/>
  <rect x="${p + 225}" y="${p + 128}" width="${w - p * 2 - 380}" height="9" rx="4.5" fill="#253048"/>
  <rect x="${p + 205}" y="${p + 200}" width="${w - p * 2 - 240}" height="${h - p * 2 - 215}" rx="10" fill="#141d33" stroke="#253048"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${p + 230}" y="${p + 222 + i * 44}" width="24" height="24" rx="6" fill="hsl(${theme.hue} 85% 60%)" opacity="${0.35 + (i % 3) * 0.25}"/>
     <rect x="${p + 268}" y="${p + 228 + i * 44}" width="${(w - p * 2 - 330) * (0.9 - (i % 3) * 0.2)}" height="11" rx="5.5" fill="#253048"/>`).join('')}`, w, h);
}

function mobile(w, h, theme) {
  const p = 46;
  const iw = w - p * 2;
  return wrap(`
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${theme.hue} 45% 8%)"/>
      <stop offset="1" stop-color="hsl(${theme.hue2} 40% 12%)"/>
    </linearGradient>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="hsl(${theme.hue} 85% 60%)"/>
      <stop offset="1" stop-color="hsl(${theme.hue2} 85% 68%)"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect x="${p}" y="${p}" width="${iw}" height="${h - p * 2}" rx="36" fill="#0f1626" stroke="#2a3550" stroke-width="2"/>
  <rect x="${w / 2 - 55}" y="${p + 14}" width="110" height="22" rx="11" fill="#0b1020"/>
  <rect x="${p + 22}" y="${p + 60}" width="${iw - 44}" height="52" rx="14" fill="url(#acc)"/>
  <text x="${w / 2}" y="${p + 93}" text-anchor="middle" fill="#06121f" font-size="20" font-weight="700" ${font}>${theme.name}</text>
  ${[0, 1, 2].map((i) => `<rect x="${p + 22}" y="${p + 132 + i * 118}" width="${iw - 44}" height="100" rx="16" fill="#141d33" stroke="#253048"/>
     <circle cx="${p + 54}" cy="${p + 168 + i * 118}" r="14" fill="hsl(${theme.hue} 85% 60%)" opacity="${0.5 + i * 0.2}"/>
     <rect x="${p + 82}" y="${p + 152 + i * 118}" width="${iw * 0.5}" height="12" rx="6" fill="#334155"/>
     <rect x="${p + 82}" y="${p + 174 + i * 118}" width="${iw * 0.32}" height="9" rx="4.5" fill="#1e293b"/>`).join('')}
  <rect x="${p + 22}" y="${h - p - 74}" width="${iw - 44}" height="52" rx="14" fill="#141d33" stroke="#253048"/>
  ${[0, 1, 2, 3].map((i) => `<circle cx="${p + 52 + i * ((iw - 44) / 4)}" cy="${h - p - 48}" r="10" fill="${i === 0 ? 'url(#acc)' : '#253048'}"/>`).join('')}`, w, h);
}

function cover(w, h, theme) {
  return wrap(`
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${theme.hue} 55% 9%)"/>
      <stop offset="1" stop-color="hsl(${theme.hue2} 45% 14%)"/>
    </linearGradient>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="hsl(${theme.hue} 90% 62%)"/>
      <stop offset="1" stop-color="hsl(${theme.hue2} 90% 70%)"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <circle cx="${w * 0.85}" cy="${h * 0.2}" r="${h * 0.5}" fill="hsl(${theme.hue} 80% 55%)" opacity="0.08"/>
  <circle cx="${w * 0.1}" cy="${h * 0.9}" r="${h * 0.4}" fill="hsl(${theme.hue2} 80% 60%)" opacity="0.07"/>
  <text x="${w / 2}" y="${h * 0.34}" text-anchor="middle" fill="#e2e8f0" font-size="${h * 0.11}" font-weight="800" font-family="Inter, ui-sans-serif, system-ui, sans-serif">${theme.name}</text>
  <rect x="${w / 2 - 90}" y="${h * 0.4}" width="180" height="6" rx="3" fill="url(#acc)"/>
  <text x="${w / 2}" y="${h * 0.5}" text-anchor="middle" fill="#7c8aa5" font-size="${h * 0.035}" ${font}>PLACEHOLDER SCREENSHOT — replace with your own</text>
  <g transform="translate(${w * 0.12}, ${h * 0.58})">
    ${chrome(0, 0, w * 0.76, h * 0.32, `${theme.name.toLowerCase()}.app`)}
  </g>`, w, h);
}

const jobs = [];
for (const [slug, theme] of Object.entries(themes)) {
  const dir = path.join(OUT, slug, 'assets');
  jobs.push(mkdir(dir, { recursive: true }).then(async () => {
    await writeFile(path.join(dir, 'cover.svg'), cover(1600, 1000, theme));
    await writeFile(path.join(dir, 'shot-desktop-1.svg'), dashboard(1440, 900, theme, `${slug}.app`));
    await writeFile(path.join(dir, 'shot-desktop-2.svg'), editor(1440, 900, theme, 'localhost:5173'));
    await writeFile(path.join(dir, 'shot-mobile-1.svg'), mobile(750, 1334, theme));
  }));
}
await mkdir(ABOUT, { recursive: true });
jobs.push(writeFile(
  path.join(ABOUT, 'avatar.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="hsl(190 60% 30%)"/><stop offset="1" stop-color="hsl(262 60% 38%)"/>
  </linearGradient></defs>
  <rect width="800" height="800" fill="url(#g)"/>
  <circle cx="400" cy="320" r="130" fill="#0b1020" opacity="0.55"/>
  <path d="M150 800 C150 590 280 520 400 520 C520 520 650 590 650 800 Z" fill="#0b1020" opacity="0.55"/>
  <text x="400" y="445" text-anchor="middle" fill="#e2e8f0" font-size="120" font-weight="800" font-family="Inter, sans-serif" opacity="0.9">&lt;/&gt;</text>
</svg>`
));

await Promise.all(jobs);
console.log('Placeholder images written.');
