# Developer Portfolio — "Orbital Cairo"

A futuristic, fully static developer portfolio built with **Astro + Tailwind CSS 4 + TypeScript**, with a WebGL particle-galaxy hero powered by **three.js** (bundled, code-split — no CDN tags).

- **Hero** — three.js starfield: 2,600-point spiral galaxy + nebula sprites + far dust shell, pointer-parallax camera, animated neon grid horizon; degrades to a static CSS starfield without WebGL and renders a single static frame under `prefers-reduced-motion`
- **Selected work** — five numbered project stations, each with an embedded walkthrough video (`<video poster controls>`), a screenshot stills grid with a keyboard-accessible lightbox (arrows + Escape, focus restore), feature bullets, tech-stack tags, and a GitHub repo link (labeled "Private repo" where private) plus a live-demo link when one exists
- **Stack marquee** — two counter-scrolling rows that pause on hover and collapse to static text under `prefers-reduced-motion`
- **About / Contact** — bio, skills by area, stats, résumé link, big contact CTA
- **SEO** — canonical, OG/Twitter meta with generated `og/default.png`, sitemap, robots.txt, JSON-LD Person
- **A11y** — skip link, focus-visible rings, scroll-spy nav with `aria-current`, labelled media, `prefers-reduced-motion` respected everywhere

Project media lives in `public/media/<slug>/` (`walkthrough.mp4` + `shot-*.png` per project); copy and feature bullets are curated in **`src/lib/projects.ts`**.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve the build locally
```

## Deploy

GitHub Pages via `.github/workflows/deploy.yml` on push to `main` (plus a daily rebuild so stats stay fresh). The workflow derives `SITE_URL` and `BASE_PATH` automatically, so the site works both as a user site and a project site (`/portfolio`).

## Content map

| What | Where |
|---|---|
| Name, bio, headline, links, availability | `src/lib/site.config.ts` |
| Project showcase cards (order, features, tags, links) | `src/lib/projects.ts` |
| Skills groups + marquee items | `src/lib/site.config.ts` |
| Design tokens (palette, fonts, glow) | `src/styles/global.css` |
| WebGL hero | `src/components/Hero.astro` |
| Walkthrough media | `public/media/<slug>/` |
| Résumé | `public/resume.pdf` |
| Social share image | `public/og/default.png` (1200×630) |

## Adding a project

1. Drop its media into `public/media/<slug>/` — `walkthrough.mp4` plus `shot-1.png … shot-N.png`.
2. Add an entry to the `projects` array in `src/lib/projects.ts` (name, lede, tags, features, caption, repo URL, `isPrivate`, `liveUrl`, `shotCount`). The card, video, stills grid and lightbox are generated from it.
