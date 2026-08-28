# Portfolio Layout Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorder and restyle the existing portfolio so real work is understood before the supporting biography and long case-study surfaces.

**Architecture:** Keep React data and interactive case components intact. Make the hierarchy change in `App` and centralize the visual change in CSS tokens and section modifiers, with narrow presentation tests guarding order and key hooks.

**Tech Stack:** React 19, Vite, native CSS, Phosphor Icons, Node test runner, Playwright browser checks.

**Spec:** `docs/superpowers/specs/2026-08-28-portfolio-layout-redesign-design.md`

## Global Constraints

- Preserve all existing real media and project anchors.
- Keep the supplied hero video and poster fallback.
- Do not add a second visual theme or a new dependency.
- Keep the page within the viewport at 1440x900 and 390x844.
- Use the existing accent token for borders, focus rings, and glow surfaces.
- Verify desktop, mobile, and one interactive state with fresh screenshots.

---

### Task 1: Guard The New Page Hierarchy

**Files:**
- Modify: `src/portfolioPresentation.test.js`
- Test: `src/portfolioPresentation.test.js`

**Interfaces:**
- Consumes: rendered source text from `src/main.jsx`.
- Produces: presentation contract checks for the hero, preview, selected work, and experience ordering.

- [ ] **Step 1: Write the failing test**

Add a test that reads `src/main.jsx` and asserts the index positions of `hero-gallery-section`, `selected-works`, and `experience-section`, plus a test that requires the new `portfolio-flow` class hook.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test src/portfolioPresentation.test.js`

Expected: FAIL because the current source places `experience-section` before `selected-works` and has no `portfolio-flow` hook.

- [ ] **Step 3: Implement the smallest source change**

Reorder the existing JSX and add the class hook in Task 2 without changing data contracts.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `node --test src/portfolioPresentation.test.js`

Expected: PASS for the new hierarchy checks and all pre-existing presentation checks.

- [ ] **Step 5: Commit the focused source/test change**

Run: `git add src/portfolioPresentation.test.js src/main.jsx && git commit -m "refactor: establish work-first portfolio hierarchy"`

### Task 2: Reorder The Page And Add Editorial Modifiers

**Files:**
- Modify: `src/main.jsx`

**Interfaces:**
- Consumes: existing `SelectedWorksSummary`, `CoreStrengthsSummary`, `PortfolioCase`, `AiVisualLab`, and case components.
- Produces: one `portfolio-flow` wrapper and a stable section order: hero, work preview, selected work, experience, strengths, detailed cases, contact.

- [ ] **Step 1: Move existing sections without changing their props**

Keep `hero-door` and `hero-gallery-section` first. Place `SelectedWorksSummary` next, then `experience-section`, then `CoreStrengthsSummary`, followed by all existing detailed cases and contact.

- [ ] **Step 2: Add semantic modifiers**

Add `portfolio-flow` to the main content wrapper and `is-lead` to the first selected-work item through its existing index-based class path. Do not remove anchors or interactive components.

- [ ] **Step 3: Run the focused presentation test**

Run: `node --test src/portfolioPresentation.test.js`

Expected: PASS with the new source-order assertions.

### Task 3: Normalize Layout Tokens And Section Rhythm

**Files:**
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: existing CSS custom properties and section class names.
- Produces: narrower shells, consistent vertical rhythm, one accent glow language, and responsive rules for the new order.

- [ ] **Step 1: Write the CSS changes behind existing selectors**

Set the shared shell to `min(1360px, calc(100% - 48px))`, add a `--editorial-gap` token, reduce repeated section padding, and make `--magic-bento-glow` follow the existing accent. Normalize `BorderGlow` color arrays in the rendered props to the accent family.

- [ ] **Step 2: Style the separated work preview**

Give `.hero-gallery-section` a solid section background and clear top/bottom padding. Keep card dimensions stable; remove the large negative overlap on desktop and mobile.

- [ ] **Step 3: Style the selected-work hierarchy**

Use a two-column editorial grid where the lead card spans two rows on desktop, and let supporting cards retain independent card framing. Keep cards under the existing 8px-or-less radius guidance where possible.

- [ ] **Step 4: Compress experience and case transitions**

Reduce repeated top margins, add a visible section divider before long cases, and ensure headings and metadata align to the same shell width.

- [ ] **Step 5: Add mobile rules**

At 900px and 640px, collapse the selected-work grid, keep the preview horizontally scrollable, reduce hero minimum height, and prevent nav links from forcing page overflow.

### Task 4: Run Build And Browser QA

**Files:**
- Modify: `design-qa.md`
- Create: `output/playwright/portfolio-layout-redesign-desktop-1440x900.png`
- Create: `output/playwright/portfolio-layout-redesign-mobile-390x844.png`
- Create: `output/playwright/portfolio-layout-redesign-selected-works.png`

**Interfaces:**
- Consumes: the local Vite app at `http://127.0.0.1:4174/`.
- Produces: fresh visual evidence and a score for hierarchy, composition, typography, color, consistency, states, responsiveness, domain fit, and accessibility.

- [ ] **Step 1: Run the production build**

Run: `npm run build`

Expected: exit code 0 and a generated `dist` bundle.

- [ ] **Step 2: Capture desktop and mobile screenshots**

Use the connected local browser at 1440x900 and 390x844. Capture the default homepage and the selected-work region after scrolling.

- [ ] **Step 3: Inspect overflow and console state**

Read `document.documentElement.scrollWidth`, `document.documentElement.clientWidth`, and browser console logs at both viewports. Expected: equal widths and no new console errors.

- [ ] **Step 4: Perform one critique/fix cycle**

Score all nine visual dimensions from 0 to 4. If any score is below 3, patch the smallest relevant CSS rule and recapture the affected screenshot.

- [ ] **Step 5: Record evidence**

Append the screenshot paths, viewport measurements, build result, and final scores to `design-qa.md`.
