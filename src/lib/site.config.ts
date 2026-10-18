/**
 * Single source of truth for everything personal on the site.
 */
export const site = {
  name: 'Mahmoud Kamel',
  nameAr: 'محمود كامل',
  title: 'Full-Stack Developer',
  /** Short headline unique to this build — appears in the hero <h1>. */
  headline: 'Building the future in two alphabets',
  tagline:
    'I build bilingual (Arabic/English) products end-to-end — from Tauri & Electron desktop apps to Next.js platforms and the Node APIs behind them.',
  bio: 'Full-stack developer from Cairo building bilingual (Arabic/English) products end-to-end — desktop apps with Tauri & Electron, web platforms with Next.js & React, and hardened Node.js APIs behind them. I care about shipping complete systems: auth, dashboards, deployments and the details in between. Open to remote work.',
  location: 'Cairo, Egypt',
  availability: 'Open to remote roles & freelance work',
  github: 'https://github.com/mahmoudcod',
  githubUsername: 'mahmoudcod',
  linkedin: 'https://www.linkedin.com/in/mahmoud-kamel-61bb16221/',
  email: 'spop66009@gmail.com',
  resumePath: '/resume.pdf',
} as const;

export const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Stack', href: '/#stack' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
] as const;

/** Skill groups for the About section (the marquee below Work is a flat list). */
export const skills = [
  { area: 'Frontend', items: ['React 19', 'Next.js', 'Vue', 'Nuxt', 'Tailwind CSS', 'RTL / i18n'] },
  { area: 'Desktop', items: ['Tauri 2', 'Rust', 'Electron', 'Vanilla JS', 'Web Audio API'] },
  { area: 'Backend', items: ['Node.js', 'Express', 'Prisma', 'NextAuth', 'REST APIs'] },
  { area: 'Data & Deploy', items: ['MongoDB', 'PostgreSQL', 'SQLite', 'Docker', 'Render', 'GitHub Pages'] },
] as const;

/** Flat list for the marquee rows (alternating directions). */
export const marquee = [
  'Next.js', 'React 19', 'TypeScript', 'Tauri 2', 'Rust', 'Electron', 'Node.js', 'Express',
  'Prisma', 'NextAuth', 'MongoDB', 'PostgreSQL', 'SQLite', 'Tailwind CSS', 'Docker', 'Vite',
  'Web Audio API', 'RTL / i18n', 'SQLCipher', 'Recharts',
] as const;
