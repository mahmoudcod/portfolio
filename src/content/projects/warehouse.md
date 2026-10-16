---
title: 'Moaz AIR — Warehouse Management System'
summary: 'Full warehouse operations platform — inventory, clients, collections and accounting — bilingual Arabic/English with role-based access.'
description: 'A complete warehouse management platform for store and warehouse owners: inventory, clients, devices taken on credit, collections and accounts — all in one place, in Arabic and English. Deployed with a React front-end on Cloudflare Pages and an Express API on Render, backed by MongoDB Atlas.'
category: 'Full-Stack'
tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Docker']
status: 'active'
featured: true
order: 1
date: 2026-10-14
repo: 'mahmoudcod/warehouse-management'
demo: 'https://warehouse-management-client.pages.dev'
cover: './assets/dash-desktop.png'
gallery:
  - src: './assets/dash-desktop.png'
    alt: 'Warehouse dashboard with revenue, collections, customers and device KPIs plus revenue-vs-collections charts (Arabic RTL UI)'
    caption: 'Dashboard: KPIs, revenue vs collections, top clients and stock breakdown.'
    frame: 'browser'
  - src: './assets/login.png'
    alt: 'Bilingual login screen with demo accounts for admin, accountant and employee roles'
    caption: 'Bilingual login with one-click demo accounts per role.'
    frame: 'browser'
  - src: './assets/dash-mobile.png'
    alt: 'Mobile view of the dashboard with stacked KPI cards and bottom navigation'
    caption: 'Fully responsive on mobile — bottom navigation and stacked KPIs.'
    frame: 'phone'
overview:
  problem: 'Small warehouse owners track inventory, clients, installment devices and collections across notebooks and spreadsheets. Numbers go stale, payments get missed, and there is no single view of who owes what.'
  solution: 'One bilingual platform that models the real workflow: stock in/out, client ledger, devices taken on credit, daily collections and expenses — with role-based dashboards for owners, accountants and employees.'
  result: 'Live in production on Cloudflare Pages + Render with MongoDB Atlas. Demo accounts let anyone try the full system in one click — admin, accountant and employee roles each see a different app.'
howItWorks:
  - title: 'Client — React + Vite + Tailwind'
    description: 'A TypeScript SPA with React Router, Recharts analytics and a fully RTL-aware Arabic/English interface (theme and language switchers included).'
  - title: 'API — Express 5 + TypeScript'
    description: 'REST API with zod validation, JWT authentication (bcrypt-hashed passwords) and role-based authorization middleware.'
  - title: 'Data — MongoDB Atlas'
    description: 'Mongoose models for inventory, clients, devices, collections and expenses, with a migration + seed pipeline (docker compose for local dev).'
  - title: 'Deploy — Docker, Render, Cloudflare'
    description: 'The API runs in Docker on Render; the client deploys to Cloudflare Pages. Render.yaml and Dockerfile are in the repo, so the whole stack rebuilds from zero.'
challenges:
  - challenge: 'The Arabic RTL layout kept breaking in charts and tables — Recharts tooltips, date pickers and number columns all assume LTR.'
    resolution: 'Built a direction-aware component layer: mirrored paddings via logical CSS properties, RTL-corrected chart containers, and locale-aware number/date formatting (EGP).'
  - challenge: 'Different roles must not see each other’s screens — but client-side route guards alone are not security.'
    resolution: 'Enforced authorization in the Express API per route and per resource, then mirrored it in the UI. The client hides what the server would refuse anyway.'
  - challenge: 'Free-tier backends sleep, so the first request after idle takes ~30s.'
    resolution: 'Documented it on the demo login screen, and the client retries with a friendly loading state. (The demo accounts make wake-up painless.)'
lessons:
  - 'Bilingual apps are a layout problem before they are a translation problem — design RTL and LTR together from day one.'
  - 'A public demo with one-click role accounts sells a product better than any screenshot.'
readme: ''
---
