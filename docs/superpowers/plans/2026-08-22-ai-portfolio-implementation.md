# AI Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a runnable React + Vite portfolio for Li Zhuo with a dark, restrained, technology-forward visual system.

**Architecture:** A single React page with data-driven project, strength, timeline, and metric content. CSS owns the visual system and responsive layout; a small IntersectionObserver hook owns reveal state, while all contact actions remain standard links.

**Tech Stack:** React 19, Vite 6, native CSS, Phosphor Icons, local portfolio assets plus a remote video source with a poster fallback.

---

### Task 1: Scaffold and data contract

**Files:** `package.json`, `index.html`, `src/data.js`

- [x] Define Vite scripts and runtime dependencies.
- [x] Define the single-page metadata and Chinese document language.
- [x] Centralize resume-derived project, timeline, skill, and metric data in arrays.

### Task 2: Build page sections

**Files:** `src/main.jsx`

- [x] Implement Hero, About, Work, Strengths, and Contact sections.
- [x] Keep image failures readable with a local fallback state.
- [x] Add anchor navigation, mail and phone actions, and reduced-motion-friendly reveal behavior.

### Task 3: Establish visual system and responsive behavior

**Files:** `src/styles.css`

- [x] Implement the dark palette, single mint accent, 1700px shell, asymmetric grids, and stable aspect ratios.
- [x] Add desktop, tablet, mobile, focusable links, hover states, image fallbacks, and reduced-motion handling.

### Task 4: Verify

- [x] Run `npm install` and `npm run build`.
- [x] Run a local Vite server and capture desktop/mobile screenshots.
- [x] Check the main anchors and contact links in the browser.
