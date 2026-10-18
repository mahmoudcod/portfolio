/**
 * Project showcase data — one entry per curated project, in display order.
 * Copy is mined from the verified product survey (features verbatim) and the
 * previous site's case studies. Media lives in /public/media/<slug>/.
 */
import { u } from './urls';

export type Project = {
  slug: string;
  name: string;
  /** One-line summary under the title. */
  lede: string;
  category: string;
  /** Tech-stack tags rendered as chips. */
  tags: string[];
  /** Verbatim feature bullets from the product survey. */
  features: string[];
  /** Caption shown with the walkthrough video. */
  caption: string;
  repoUrl: string;
  isPrivate: boolean;
  liveUrl: string | null;
  shotCount: number;
};

const projects: Project[] = [
  {
    slug: 'glow-ecommerce',
    name: 'GLOW — Bilingual E-Commerce Platform',
    lede: 'Flagship full product: storefront plus admin panel with EN/AR RTL, reviews, wishlists and analytics — and a SQLite dev fallback so it demos without the cloud DB.',
    category: 'E-Commerce',
    tags: ['Next.js 16', 'Prisma', 'Neon Postgres', 'SQLite', 'NextAuth', 'next-intl', 'zustand', 'Tailwind CSS'],
    features: [
      'Bilingual EN/AR storefront with next-intl locale routing and full RTL — /ar renders dir="rtl" lang="ar" with complete Arabic message catalogs',
      'Full commerce flow: filterable catalog (category/price, sort, pagination) → zustand localStorage-persisted cart (survived a server restart) → checkout → order #ORD-1792281830052 with status lifecycle',
      'Product reviews with star ratings and verified-purchase flags, plus a product-request flow where customers submit items for admin approval',
      'NextAuth v5 credentials auth with JWT sessions and email-verification tokens, and a role-gated admin panel covering products, categories, orders, product requests and store settings',
      'Admin dashboard with DB-persisted store settings (currency EGP, shipping fee, homepage hero) and live analytics — total revenue updated to EGP 1,029 right after the demo order',
      'Next.js 16 App Router + Prisma + Tailwind 4 running fully offline on the SQLite fallback (prisma/dev.db) — zero cloud dependencies for local dev',
    ],
    caption:
      'A demo user browses the storefront, filters the catalog, adds a perfume to the persisted cart, checks out cash-on-delivery, flips the whole UI to Arabic RTL, and signs in as admin to see the order land in the EGP revenue dashboard.',
    repoUrl: 'https://github.com/mahmoudcod/E-commers-mina',
    isPrivate: true,
    liveUrl: null,
    shotCount: 8,
  },
  {
    slug: 'warehouse-management',
    name: 'Warehouse Management System',
    lede: 'Full warehouse ERP — inventory with serial tracking, installment-device assignments, auto-generated receipts posting into double-entry accounting, and role-based dashboards. Live on Render.',
    category: 'Full-Stack · DevOps',
    tags: ['React', 'Vite', 'Node.js', 'Express 5', 'MongoDB', 'Docker', 'Render', 'Recharts'],
    features: [
      'Full warehouse ERP: inventory with categories, warehouses and serial-tracked units, stock movements and SKU/barcode lookup',
      'Assignment workflow ("device taken on credit") with automatic stock decrement, oversell rejection and server-computed customer balances/aging',
      'Payments with auto-generated receipt numbers that auto-post linked income entries into double-entry-style accounting with cash/bank balances',
      'Role-based access control (super_admin/accountant/staff) with a per-user permission matrix applied to live sessions immediately, plus a full audit log',
      'Financial module: installment plans/schedules, locked accounting periods, daily cash close, P&L / inventory valuation / receivables aging reports and an RTL Arabic dashboard (Recharts)',
      'Production-shaped deployment: Express 5 serves the built React client same-origin behind one port; Dockerfile + render.yaml for Render with /api/health probes',
    ],
    caption:
      'Bilingual Arabic/English warehouse ERP — from the RTL dashboard to recording a device taken on credit, its auto-generated receipt, the P&L report and the per-user permission matrix.',
    repoUrl: 'https://github.com/mahmoudcod/warehouse-management',
    isPrivate: false,
    liveUrl: 'https://demoblog-h71e.onrender.com',
    shotCount: 8,
  },
  {
    slug: 'ayadty-clinic',
    name: 'Ayadty Clinic Management',
    lede: 'Offline-first clinic desktop app: Tauri 2 + Rust over an SQLCipher-encrypted local database, with RSA-signed hardware-fingerprint licensing — a systems-language story.',
    category: 'Desktop · Systems',
    tags: ['Tauri 2', 'Rust', 'React', 'TypeScript', 'SQLCipher', 'i18next', 'jsPDF'],
    features: [
      'Tauri 2 + Rust backend with a fully typed IPC command surface over an encrypted-at-rest local SQLCipher database (keys derived at runtime, never committed)',
      'Offline RSA-signed licensing system: hardware-fingerprint binding, license verification, keygen/verify tooling in src-tauri/tools, and a hardware-locked activation screen',
      'Complete clinic workflow: patient records with search/stats/pagination, per-day appointment scheduling with conflict guard, digital prescriptions generated client-side with jsPDF, invoicing with partial payments and date-range reporting',
      'Bilingual Arabic/English UI (i18next) with full RTL mirroring, doctor-scoped data filtering and multi-doctor management',
      'Appointment reminder engine — native system notifications in the desktop shell plus an in-app notification dropdown on a 1-minute polling loop',
      'Secure database backup flow through the native save dialog (JSON snapshot export in browser mode)',
    ],
    caption:
      'Ayadty runs the full clinic loop — registering a patient, booking a same-day appointment, and invoicing — in one Tauri desktop app over an encrypted SQLCipher store, finishing in fully mirrored Arabic RTL.',
    repoUrl: 'https://github.com/mahmoudcod/ayadty',
    isPrivate: true,
    liveUrl: null,
    shotCount: 8,
  },
  {
    slug: 'hospital-desktop',
    name: 'Hospital Operations Tracker',
    lede: 'Arabic-first Electron command center for hospital supplies, surgeries and daily meds — fully redesigned into a modular Vite + React 19 SPA with live inventory deduction.',
    category: 'Desktop',
    tags: ['Electron', 'React 19', 'TypeScript', 'Vite', 'SQLite', 'RTL / i18n'],
    features: [
      'Futuristic dark command center — glass panels, aurora glow and neon cyan/violet gradients, Arabic-first with one-click EN toggle (full RTL↔LTR flip)',
      'Operations board with live stat chips, search across ticket/patient/nursing, month filter and operation cards with type badges',
      'Guided surgery workflow: 9-field operation record, 6 device toggles, and supply selection with live stock validation that auto-deducts inventory on save',
      'Role-aware supplies intake: inventory grouped by neon type badges, low-stock alerts, admin-only delete, and stock edits that non-admins can only increase',
      'Admin operation editor with automatic stock rebalancing (quantity deltas restore or consume inventory, negative-stock saves rejected) plus print-ready details',
      'Daily meds board (أدوية اليوم) listing every consumed item per operation with code, quantity, user and date filtering',
    ],
    caption:
      'From Arabic sign-in to a saved surgery: recording operation TKT-1004 with live inventory deduction, low-stock alerts, and a full RTL↔English flip of the command center.',
    repoUrl: 'https://github.com/mahmoudcod/hospital2',
    isPrivate: false,
    liveUrl: null,
    shotCount: 8,
  },
  {
    slug: 'word-safari',
    name: 'Word Safari — Spider-Man Word Game',
    lede: 'A finished, charming preschool product: tap-and-listen safari hosted by Kiki the monkey, 4 illustrated scenes, 32 spoken words and a password-protected word CMS — zero npm dependencies.',
    category: 'Game · Education',
    tags: ['Vanilla JS', 'Web Audio API', 'Web Speech API', 'CSS art', 'localStorage'],
    features: [
      'Preschool tap-and-listen word game hosted by Kiki the monkey, with 4 illustrated scenes (Jungle, Farm, Kitchen, Under the Sea) and 32 spoken words',
      'Two age profiles (3-4 / 5-6) tune object count, target size, distractors, written-word prompts, speech rate and hint wiggles',
      'Explore-then-challenge loop: tapping objects awards sparkles, then a Find It! challenge with spoken asks, emoji picture cues and star progress',
      'Sticker reward system with per-scene collectibles, confetti celebration, and localStorage persistence of age, sparkles and stickers',
      'Fully offline-capable: CSS-drawn scene backgrounds, Web Speech API narration (no cloud TTS), inline favicon, zero npm dependencies',
      'Defensive boot: a friendly loading screen polls for window.SAFARI_DATA and re-injects the data script instead of crashing',
    ],
    caption:
      'Kiki the monkey hosts a tap-and-listen safari where preschoolers explore four illustrated scenes, earn sparkles, and win sticker celebrations — all fully offline.',
    repoUrl: 'https://github.com/mahmoudcod/mando-spiderman-word-game',
    isPrivate: true,
    liveUrl: null,
    shotCount: 7,
  },
];

/** Media helpers — base-path aware URLs into /public/media. */
export function videoSrc(p: Project): string {
  return u(`/media/${p.slug}/walkthrough.mp4`);
}
export function posterSrc(p: Project): string {
  return u(`/media/${p.slug}/shot-1.png`);
}
export function shotSrc(p: Project, i: number): string {
  return u(`/media/${p.slug}/shot-${i + 1}.png`);
}
/** Accessible label for walkthrough still N — describes the artifact, not guessed contents. */
export function shotAlt(p: Project, i: number): string {
  return `${p.name} — walkthrough still ${i + 1} of ${p.shotCount}`;
}
export function shotLabel(i: number): string {
  return `Still ${String(i + 1).padStart(2, '0')}`;
}

export const projectList = projects;
