/**
 * Single source of truth for everything personal on the site.
 */
export const site = {
  name: 'Mahmoud Kamel',
  title: 'Full-Stack Developer',
  tagline: 'I build bilingual (Arabic/English) products end-to-end — from Electron & Tauri desktop apps to Next.js platforms and the Node APIs behind them.',
  bio: 'Full-stack developer from Cairo building bilingual (Arabic/English) products end-to-end — desktop apps with Electron & Tauri, web platforms with Next.js & React, and hardened Node.js APIs. I care about shipping complete systems: auth, dashboards, deployments and the details in between. Open to remote work.',
  location: 'Cairo, Egypt · Open to remote work',
  github: 'https://github.com/mahmoudcod',
  githubUsername: 'mahmoudcod',
  linkedin: 'https://www.linkedin.com/in/mahmoud-kamel-61bb16221/',
  email: 'spop66009@gmail.com',
  resumePath: '/resume.pdf',
  /** Formspree form id — create a form at https://formspree.io and paste the id (e.g. "xyzabcd"). */
  formspreeId: 'YOUR_FORM_ID',
} as const;

export const nav = [
  { label: 'Home', href: '/#top' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
] as const;

/** Skills shown on the home page and grouped on the About page. */
export const skills = [
  { area: 'Frontend', items: ['React', 'Next.js', 'Vue', 'Nuxt', 'Tailwind CSS'] },
  { area: 'Desktop', items: ['Electron', 'Tauri', 'Vanilla JS', 'RTL / i18n'] },
  { area: 'Backend', items: ['Node.js', 'Express', 'Strapi', 'Prisma', 'NextAuth'] },
  { area: 'Data & Deploy', items: ['MongoDB', 'PostgreSQL', 'SQLite', 'Docker', 'Render', 'Cloudflare'] },
] as const;

/** Optional experience timeline on the About page. Add entries to show the section. */
export const timeline: { period: string; role: string; org: string; note: string }[] = [];
