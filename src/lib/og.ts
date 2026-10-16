/**
 * OG image generation. Sharp rasterizes an SVG template into a 1200×630 PNG,
 * rendered statically for every project (plus a default image) at build time.
 */
import sharp from 'sharp';

const W = 1200;
const H = 630;

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Greedy word-wrap for the big title. */
function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const w of words) {
    if ((current + ' ' + w).trim().length > maxChars && current) {
      lines.push(current.trim());
      current = w;
      if (lines.length === maxLines) break;
    } else {
      current = (current + ' ' + w).trim();
    }
  }
  if (lines.length < maxLines && current) lines.push(current.trim());
  if (lines.length === maxLines && words.join(' ') !== lines.join(' ')) {
    lines[maxLines - 1] = lines[maxLines - 1].replace(/[.,;:]?$/, '…');
  }
  return lines;
}

export interface OgInput {
  kicker: string;
  title: string;
  subtitle: string;
}

export function buildOgSvg({ kicker, title, subtitle }: OgInput): string {
  const lines = wrap(title, 24, 3);
  const fontSize = lines.length <= 1 ? 68 : lines.length === 2 ? 56 : 46;
  const titleTop = 240 + (3 - lines.length) * fontSize * 0.55;
  const titleSvg = lines
    .map((l, i) => `<text x="80" y="${titleTop + i * fontSize * 1.18}" font-size="${fontSize}" font-weight="800" fill="#e7ecf5" font-family="Helvetica, Arial, DejaVu Sans, sans-serif">${esc(l)}</text>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#22d3ee"/>
      <stop offset="1" stop-color="#818cf8"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#22d3ee" stop-opacity="0.14"/>
      <stop offset="1" stop-color="#818cf8" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#080c16"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <circle cx="1120" cy="60" r="260" fill="#22d3ee" opacity="0.06"/>
  <circle cx="80" cy="600" r="200" fill="#818cf8" opacity="0.06"/>
  <rect x="80" y="150" width="200" height="5" rx="2.5" fill="url(#acc)"/>
  <text x="80" y="120" font-size="26" letter-spacing="6" fill="#22d3ee" font-family="Helvetica, Arial, DejaVu Sans, sans-serif">${esc(kicker.toUpperCase())}</text>
  ${titleSvg}
  <text x="80" y="540" font-size="30" fill="#9aa6bc" font-family="Helvetica, Arial, DejaVu Sans, sans-serif">${esc(subtitle)}</text>
  <rect x="80" y="575" width="360" height="3" rx="1.5" fill="url(#acc)" opacity="0.5"/>
</svg>`;
}

export async function renderOgPng(svg: string): Promise<Buffer> {
  return sharp(Buffer.from(svg)).png().toBuffer();
}
