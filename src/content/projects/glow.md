---
title: 'GLOW — Bilingual E-Commerce Platform'
summary: 'Full-featured EN/AR e-commerce storefront with admin panel: accounts, reviews, wishlists, orders and analytics.'
description: 'GLOW is a complete e-commerce platform with full Arabic/English localization: a customer storefront (auth, cart, reviews, wishlist) and a full admin panel (products, orders, analytics, users). Built with Next.js 16 App Router, Prisma and NextAuth — production-minded from the start with Netlify edge functions configured. Private client project.'
category: 'E-Commerce'
tech: ['Next.js', 'TypeScript', 'Prisma', 'NextAuth', 'PostgreSQL', 'Tailwind CSS', 'next-intl']
status: 'active'
featured: true
order: 2
date: 2026-10-10
repo: 'mahmoudcod/E-commers-mina'
privateRepo: true
cover: './assets/glow-home.png'
gallery:
  - src: './assets/glow-home.png'
    alt: 'GLOW storefront home page with hero, featured products and navigation'
    caption: 'Storefront home — hero, featured products, locale-aware navigation.'
    frame: 'browser'
  - src: './assets/glow-products.png'
    alt: 'GLOW products listing page with filters and product cards'
    caption: 'Product listing with adaptive grids and quick-view.'
    frame: 'browser'
overview:
  problem: 'Small stores want a real e-commerce presence in both Arabic and English — most templates fake i18n: untranslated admin panels, LTR-only layouts, and checkout flows that break in RTL.'
  solution: 'A storefront and admin panel designed bilingual from day one: next-intl routing with locale redirects, RTL-corrected UI, and role-separated experiences (customer vs admin) on one codebase.'
  result: 'A complete, deployable platform covering the full purchase loop — register → verify email → browse → review → reorder — plus an admin side that manages products, orders, users and settings.'
howItWorks:
  - title: 'Storefront'
    description: 'Next.js 16 App Router with next-intl for EN/AR routing; cart persists in localStorage; wishlist badges stay in sync across sessions.'
  - title: 'Auth'
    description: 'NextAuth with JWT sessions plus email-verification tokens; register/login flows with SMTP delivery.'
  - title: 'Data'
    description: 'Prisma ORM on PostgreSQL (Neon) with a SQLite fallback for local development; schema covers products, categories, orders, reviews, wishlists and users.'
  - title: 'Admin'
    description: 'Product & category management, order detail views, dashboard analytics, uploads handling and user administration behind role checks.'
challenges:
  - challenge: 'Keeping the admin panel as polished and localized as the storefront — it is usually an afterthought.'
    resolution: 'Treated admin as a first-class surface: same i18n pipeline, same component system, RTL-aware tables and forms.'
  - challenge: 'Prisma on two databases (PostgreSQL in production, SQLite in dev) behaves differently on edge cases.'
    resolution: 'Kept a single schema with provider-agnostic types and pinned deployment envs; dev fallback exists for onboarding speed, not for production parity.'
lessons:
  - 'Localization is architecture: locale routing, RTL components and translated admin flows must be designed before the first screen.'
  - 'NextAuth + verification tokens covers 90% of store auth needs if you model the user state machine carefully.'
readme: |
  ## ✨ Features

  | Storefront | Admin |
  |---|---|
  | 🌐 **Bilingual EN/AR** with RTL support (next-intl) | 📦 Product & category management |
  | 🔐 Auth: register, login, email verification (NextAuth) | 🧾 Order management & detail views |
  | ⭐ Product reviews with ratings & summaries | 📊 Dashboard analytics |
  | ❤️ Wishlist with persistent badge state | 🗂️ Uploads handling |
  | 🛒 Cart with localStorage persistence | ⚙️ Store settings |
  | 🔔 Notifications, toasts, quick-view modals | 👥 User administration |
  | 📱 Responsive: mobile menu, adaptive grids | |

  ## 🛠️ Tech Stack

  - **Next.js 16** (App Router)
  - **Prisma ORM** (PostgreSQL — Neon; SQLite for dev fallback)
  - **NextAuth** with JWT sessions + verification tokens
  - **next-intl** for AR/EN routing & translation
  - **Tailwind CSS**
  - **Netlify** deployment ready (edge functions configured)
---
