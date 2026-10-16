---
title: 'Spider-Man Educational Word Game'
summary: 'Kid-friendly word-learning game with 5 levels, villains, animations and a content-management dashboard — zero dependencies.'
description: 'An educational game where kids complete English words by guessing letters while Spider-Man fights villains — with visual hints, sound effects, lives and score tracking. Every sound is generated with the Web Audio API (no audio files at all), and a companion dashboard lets a teacher manage the word lists. Built in vanilla JavaScript with zero runtime dependencies.'
category: 'Games'
tech: ['JavaScript', 'Web Audio API', 'HTML5', 'CSS', 'Vanilla JS']
status: 'active'
featured: true
order: 4
date: 2026-10-10
repo: 'mahmoudcod/mando-spiderman-word-game'
privateRepo: true
cover: './assets/mando-game.png'
gallery:
  - src: './assets/mando-game.png'
    alt: 'Gameplay screen showing word completion, lives and villain battle'
    caption: 'Gameplay — complete the word, earn points, defeat the villain.'
    frame: 'browser'
  - src: './assets/mando-dashboard.png'
    alt: 'Content management dashboard for editing word lists'
    caption: 'Content dashboard — teachers manage words and hints.'
    frame: 'browser'
overview:
  problem: 'Kids drill English vocabulary with flashcards and lose interest in minutes; the free games that do exist are ad-heavy, need installs, or never let teachers pick the actual word lists.'
  solution: 'A browser game that turns word practice into a Spider-Man battle: guess letters to land punches, lose lives on wrong guesses, level up through five villains. A content dashboard lets a teacher control exactly which words appear.'
  result: 'A zero-dependency game that runs on any school browser: 5 levels, 5 villains, dynamic backgrounds, animations for punches/attacks/victories, and generated sound effects — with no assets to download and nothing to install.'
howItWorks:
  - title: 'Game loop'
    description: 'Word completion logic with letter or whole-word guesses, 3 lives per game, per-level score targets and a villain progression (Green Goblin → Doc Ock → Venom → Electro → Mysterio).'
  - title: 'Audio'
    description: 'All sound effects — thwips, villain laughs, jingles, fanfares — are synthesized at runtime with the Web Audio API oscillators. Zero audio files.'
  - title: 'Animation'
    description: 'CSS keyframe choreography for punches, attacks, level-ups and victory modals, with a unique gradient background per level.'
  - title: 'Content dashboard'
    description: 'A separate management screen where teachers add/edit words, hints and visual pairings — game and content stay in sync.'
challenges:
  - challenge: 'Making the game feel alive without any image or sound assets.'
    resolution: 'Learned the Web Audio API to synthesize every effect, and leaned on CSS art + keyframes for animation — the whole game ships as code.'
  - challenge: 'Balancing difficulty so a 7-year-old and a 10-year-old are both challenged.'
    resolution: 'Word lists and hint strength are per-level and editable from the dashboard, so difficulty is a content decision, not a code change.'
lessons:
  - 'Constraints breed craft: no assets forced me to learn Web Audio synthesis and CSS animation properly.'
  - 'For educational software, the content-management side is as important as the game itself.'
readme: |
  ## 🎮 Game Features

  - **Word Completion Gameplay** — kids complete words by guessing letters or the whole word
  - **Visual Learning** — each word comes with hints and visual representations
  - **5 Exciting Levels** — progress by earning points
  - **Multiple Villains** — Green Goblin, Doctor Octopus, Venom, Electro, Mysterio
  - **Lives System** — 3 lives per game; wrong answers trigger villain attacks!
  - **Score Tracking** — points for each correct word

  ## 🎨 Animations & Effects

  Spider-Man punches the villain on correct answers; wrong answers trigger attack
  animations; victory celebrations and smooth level-up transitions throughout.

  ## 🔊 Sound Effects

  All sounds — correct-answer thwips, villain laughs, victory jingles, defeat
  sounds, level-up fanfares — are generated with the **Web Audio API**
  (no external files needed).
---
