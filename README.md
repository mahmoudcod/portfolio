# Developer Portfolio

A modern, fully static developer portfolio built with **Astro + Tailwind CSS + TypeScript**. Dark mode by default, Lighthouse-friendly, and wired to the GitHub API at build time so project stats (stars, forks, language, last update) stay current on every rebuild.

- **Home** — hero, featured projects, skills, about snippet, contact CTA
- **Projects** — searchable / filterable / sortable grid + "More on GitHub" section
- **Case study per project** — demo video, screenshot gallery with lightbox, problem → solution → result, features, architecture, challenges, rendered README, prev/next navigation
- **About** — story, skills by area, experience timeline, resume download
- **Contact** — Formspree form, direct links, resume PDF
- **SEO** — meta/OG/Twitter tags, auto-generated OG image per project, sitemap, robots.txt, JSON-LD

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve the build locally
```

## Replace / extend (as needed)

Personal data (name, bio, links, skills) in **`src/lib/site.config.ts`** is already filled in. Remaining items:

| What | Where |
|---|---|
| Contact form | Create a form at [formspree.io](https://formspree.io), paste its id into `formspreeId` in `site.config.ts` (until then the contact page shows setup instructions and the email link) |
| Avatar photo | Replace `public/avatar.svg` |
| Experience timeline | Add entries to `timeline` in `site.config.ts` (the About section appears when there is at least one) |
| Resume | Edit `scripts/make-resume.mjs` and run `node scripts/make-resume.mjs`, or drop your own `public/resume.pdf` |

## Add a new project in 2 minutes

1. **Create one Markdown file** — `src/content/projects/my-project.md`:

```yaml
---
title: 'My Project'
repo: 'your-username/my-project'   # merges live GitHub stats
summary: 'One line about what it does.'
description: 'Two or three sentences for the case study intro.'
category: 'Web App'
tech: ['React', 'TypeScript']
status: 'active'          # active | maintained | wip | archived
featured: true            # shows on the home page
order: 1                  # sort position (lower = earlier)
date: 2026-01-15
cover: './assets/cover.svg'

gallery:                  # optional, any number of shots
  - { src: './assets/desktop.png', alt: 'Main dashboard', frame: 'browser' }
  - { src: './assets/mobile.png', alt: 'Mobile view', frame: 'phone' }

demo: 'https://myproject.vercel.app'           # optional
video:                                          # optional
  type: 'youtube'                               # youtube | loom | mp4 | gif
  src: 'https://www.youtube.com/watch?v=XXXX'

overview:
  problem: 'What was broken.'
  solution: 'What you built.'
  result: 'What improved.'

features: ['Fast thing', 'Useful thing']

howItWorks:                       # optional architecture flow
  - title: 'Step'
    description: 'What happens.'

challenges:                       # optional
  - challenge: 'What was hard.'
    resolution: 'How you fixed it.'

lessons: ['What you learned.']    # optional
---

Optional Markdown body — used as extra case-study text.
```

2. **Drop images in a folder next to the file** — `src/content/projects/my-project/assets/` (the folder name must be `assets`; PNG/JPG/WebP/AVIF/SVG all work. SVGs pass through as-is; raster images are optimized by Astro automatically).

3. Save. `featured: true` puts it on the home page; every field beyond `title/summary/repo/category/tech/cover/overview` is optional.

That's it — no layout code to touch. **Removing** a project is deleting its `.md` file.

## GitHub integration

At build time the site fetches `https://api.github.com/users/<username>/repos` and:

- **Merges stats** into any curated project whose `repo` frontmatter matches a real repo name (stars, forks, language, topics, last push, homepage → demo button fallback).
- **Generates "More on GitHub" cards** for public non-fork repos that have no curated Markdown file.
- **Renders the repo README** into each case study (sanitized HTML).

Rate limits & caching:

- Responses are cached in `node_modules/.cache/portfolio-github/` for 6 hours; if the API is down or rate-limited, the last good cache is reused so the build never fails.
- Add a `GITHUB_TOKEN` env var (no scopes needed — it only reads public data) to raise the limit from 60 to 5,000 requests/hour. Copy `.env.example` to `.env` locally, or set it in your host's environment settings.

## Deployment

The site is 100% static (`dist/`) — any static host works.

### Cloudflare Pages (recommended)

1. Push this folder to a GitHub repository.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
3. Build settings: **Framework preset: Astro** (build command `npm run build`, output `dist`) — both filled automatically.
4. Environment variables (Settings → Variables): optionally `GITHUB_TOKEN` (recommended) and `SITE_URL` (e.g. `https://yourname.dev`) so canonical/OG/sitemap URLs use your domain.
5. Deploy. Every push now deploys automatically. For the daily stats refresh, add the `CF_DEPLOY_HOOK` secret (Cloudflare → Settings → Builds & deployments → Deploy hooks) and keep `.github/workflows/cloudflare-daily.yml` enabled.

### GitHub Pages

1. Push to a GitHub repository (branch `main`).
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Done — `.github/workflows/deploy.yml` builds and deploys on every push, once a day (fresh GitHub stats), and manually via **Actions → Build & Deploy → Run workflow**. The workflow derives `SITE_URL`/`BASE_PATH` for `username.github.io` and project pages automatically.

Using a **custom domain** on either host? Set `SITE_URL` to it (and clear `BASE_PATH`) so sitemap/OG URLs are correct.

## Customizing the design

- **Colors / theme** — CSS variables at the top of `src/styles/global.css` (`--accent`, `--bg`, …), used by both dark and light modes.
- **Fonts** — self-hosted via Fontsource; swap `@fontsource-variable/inter` / `-jetbrains-mono` in `global.css` + `package.json`.
- **Sections** — page templates in `src/pages/`, shared components in `src/components/`.

## Not included (by design)

- **Arabic / RTL toggle** — the layout is LTR-only for now; adding RTL means a `dir="rtl"` variant plus translated strings. Ask and it can be added.

## Notes

- The four curated case studies (warehouse, GLOW, hospital tracker, word game) use real screenshots. GLOW and the word game are private repos, so their case studies use bundled README content and hide the GitHub button.
- Only the warehouse project has a live web demo (the others are desktop/private); demo buttons render automatically only when a working URL exists, so there are no dead links.
- Placeholder artwork generators were removed; `node scripts/make-resume.mjs` regenerates the resume PDF.
