// Generates public/resume.pdf — Mahmoud Kamel's one-page resume.
//   node scripts/make-resume.mjs
import { writeFile } from 'node:fs/promises';

const esc = (s) => s.replace(/([\\()])/g, '\\$1');

let y = 0;
const ops = [];
const pageW = 612, pageH = 792, margin = 54;

function text(str, { size = 10.5, font = 'F1', x = margin, dy = 14, color = null, bold = false } = {}) {
  y += dy;
  const c = color ? `${color} rg` : '0.1 0.13 0.2 rg';
  ops.push(`BT ${c} /${font === 'F2' ? 'F2' : 'F1'} ${size} Tf ${x} ${pageH - y} Td (${esc(str)}) Tj ET`);
}
function rule({ dy = 10, color = '0.06 0.71 0.83' } = {}) {
  y += dy;
  ops.push(`${color} RG 1.5 w ${margin} ${pageH - y} m ${pageW - margin} ${pageH - y} l S`);
}

// Header
text('Mahmoud Kamel', { size: 24, dy: 34, font: 'F2' });
text('Full-Stack Developer — Cairo, Egypt (open to remote)', { size: 11, dy: 16, color: '0.25 0.3 0.4' });
text('spop66009@gmail.com  ·  github.com/mahmoudcod  ·  linkedin.com/in/mahmoud-kamel-61bb16221', { size: 9.5, dy: 14, color: '0.3 0.35 0.45' });
rule();

// Summary
text('SUMMARY', { size: 10, dy: 22, font: 'F2', color: '0.02 0.45 0.56' });
text('Full-stack developer building bilingual (Arabic/English) products end-to-end: desktop apps with Electron & Tauri,', { size: 10, dy: 14 });
text('web platforms with Next.js & React, and Node.js/Express APIs with MongoDB, PostgreSQL and SQLite. I ship complete', { size: 10, dy: 13 });
text('systems — UI, API, database and deployment — and design RTL-native interfaces rather than translating after the fact.', { size: 10, dy: 13 });

// Skills
text('SKILLS', { size: 10, dy: 22, font: 'F2', color: '0.02 0.45 0.56' });
text('Frontend: React, Next.js, Vue, Nuxt, Tailwind CSS, RTL/i18n', { size: 10, dy: 14 });
text('Desktop: Electron, Tauri, vanilla JavaScript', { size: 10, dy: 13 });
text('Backend: Node.js, Express, Strapi, Prisma, NextAuth, JWT', { size: 10, dy: 13 });
text('Data & Deploy: MongoDB, PostgreSQL, SQLite, Docker, Render, Cloudflare Pages, GitHub Actions', { size: 10, dy: 13 });

// Selected projects
text('SELECTED PROJECTS', { size: 10, dy: 22, font: 'F2', color: '0.02 0.45 0.56' });
text('Moaz AIR — Warehouse Management System  ·  React · TypeScript · Express · MongoDB  ·  Live demo available', { size: 10, dy: 14, font: 'F2' });
text('Production warehouse platform (inventory, clients, collections, accounting) with role-based access and a', { size: 10, dy: 13 });
text('full Arabic/English RTL interface. Deployed: React SPA on Cloudflare Pages, Dockerized API on Render.', { size: 10, dy: 13 });
text('GLOW — Bilingual E-Commerce Platform  ·  Next.js 16 · Prisma · NextAuth · next-intl', { size: 10, dy: 15, font: 'F2' });
text('Complete EN/AR storefront plus admin panel: auth with email verification, reviews, wishlists, order', { size: 10, dy: 13 });
text('management and dashboard analytics. PostgreSQL (Neon) with SQLite dev fallback; Netlify-ready.', { size: 10, dy: 13 });
text('Hospital Operations Tracker  ·  Electron · SQLite · Arabic-first', { size: 10, dy: 15, font: 'F2' });
text('Offline-first desktop app for hospital staff: supplies intake, operation workflow, daily medications board,', { size: 10, dy: 13 });
text('local accounts and print-ready reports. Full Arabic RTL UI built natively.', { size: 10, dy: 13 });
text('Spider-Man Educational Word Game  ·  Vanilla JS · Web Audio API', { size: 10, dy: 15, font: 'F2' });
text('Kid-friendly word-learning game (5 levels, villains, lives, scores) with a teacher content dashboard. All', { size: 10, dy: 13 });
text('sounds synthesized at runtime — zero dependencies, zero asset files.', { size: 10, dy: 13 });

// More work
text('MORE WORK', { size: 10, dy: 22, font: 'F2', color: '0.02 0.45 0.56' });
text('Mohtawa (محتوى) content platform suite (Next.js front, admin dashboard, Express/Mongo backend, hardened', { size: 10, dy: 14 });
text('API variant) · Ektesad platform (Vue/Nuxt + Strapi CMS + Next.js dashboard) · Money Board finance', { size: 10, dy: 13 });
text('dashboard · Blog platform (Strapi CMS + Next.js) · Auth microservices (Node + JWT) · odysseus local-first', { size: 10, dy: 13 });
text('AI assistant framework (Python, Docker) · ayadty clinic desktop app with licensing (Tauri + SQLCipher).', { size: 10, dy: 13 });

// Education footer
text('More: github.com/mahmoudcod — 22 public repositories, all projects above include source.', { size: 9, dy: 22, color: '0.3 0.35 0.45' });

const stream = ops.join('\n');
const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
];

let pdf = '%PDF-1.4\n';
const offsets = [0];
objects.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xrefStart = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let i = 1; i <= objects.length; i++) {
  pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

await writeFile(new URL('../public/resume.pdf', import.meta.url), pdf, 'latin1');
console.log(`Resume written (${y}pt of content used).`);
