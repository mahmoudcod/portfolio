---
title: 'Hospital Operations Tracker'
summary: 'Arabic-first Electron desktop app for hospital supplies, surgeries and daily medications — local accounts, inventory and print-ready reports.'
description: 'A desktop app for hospital staff built around the real daily workflow: supplies intake, operation management and the daily medications board — all in a full Arabic RTL interface. Runs locally with Electron and SQLite, so it works without internet and keeps patient-adjacent data on the machine.'
category: 'Desktop'
tech: ['Electron', 'JavaScript', 'SQLite', 'html2canvas', 'RTL / i18n']
status: 'active'
featured: true
order: 3
date: 2026-09-20
repo: 'mahmoudcod/hospital2'
cover: './assets/hospital-home.png'
gallery:
  - src: './assets/hospital-home.png'
    alt: 'Hospital tracker home screen with supplies and operations sections in Arabic'
    caption: 'Home — supplies (مستلزمات) and operations (عمليات) at a glance.'
    frame: 'browser'
  - src: './assets/hospital-login.png'
    alt: 'Hospital tracker login screen in Arabic with local account signup'
    caption: 'Local account login — data stays in SQLite on the machine.'
    frame: 'browser'
overview:
  problem: 'Hospital departments still track supplies, surgeries and daily medication distribution on whiteboards and paper — nothing is searchable, printable or auditable, and cloud tools are a non-starter for sensitive data.'
  solution: 'An offline-first desktop app: local accounts, SQLite storage, and three focused boards — supplies intake, operation workflow and daily meds — with search and print-ready reports.'
  result: 'Staff log inventory movements and daily meds in seconds, and generate printable reports (html2canvas) for the paperwork the hospital already requires. An earlier iteration (hospitalg) was rewritten into this leaner, Arabic-first version.'
howItWorks:
  - title: 'Shell'
    description: 'Electron main process manages windows and local persistence; the renderer is a lightweight vanilla-JS UI — fast on old clinic hardware.'
  - title: 'Data'
    description: 'SQLite database on the machine stores users, supplies, operations and daily medications; signup/login is local — no server, no accounts in the cloud.'
  - title: 'Reports'
    description: 'Printable views are rendered as HTML and captured with html2canvas for consistent printouts.'
  - title: 'Interface'
    description: 'Full Arabic RTL layout designed natively (not mirrored after the fact), with search across patients and supplies.'
challenges:
  - challenge: 'Desktop apps for non-technical staff live or die on clarity — the first version had too many nested menus.'
    resolution: 'Rebuilt the UX around three boards that mirror how staff already think: what came in, what is happening today, what gets given out today.'
  - challenge: 'Keeping data local while still supporting multiple staff accounts on one machine.'
    resolution: 'Local account system in SQLite with hashed passwords and role-aware screens — no network required.'
lessons:
  - 'Offline-first is a feature, not a limitation — "data never leaves this room" is what made the tool acceptable at all.'
  - 'Watch real users: the redesign came from seeing staff navigate, not from imagining their workflow.'
---
