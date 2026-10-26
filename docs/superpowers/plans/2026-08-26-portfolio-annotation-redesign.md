# Portfolio Annotation Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recompose the portfolio around independent IP, poster, bracelet, and automation presentations while fixing oversized and overly dense media regions.

**Architecture:** Keep the existing React/Vite single page and reusable gallery components. Replace the AiVisualLab ScrollStack with dedicated sections driven by explicit data arrays, reuse AccordionGallery and FanGallery, and add one semantic HTML/CSS automation diagram whose structure matches an editable Excalidraw artifact.

**Tech Stack:** React 19, Vite 6, CSS, Node test runner, in-app browser verification, Excalidraw v2 JSON.

---

### Task 1: Lock the presentation data contract

**Files:**
- Create: `src/portfolioPresentation.test.js`
- Modify: `src/data.js`

- [ ] Write failing assertions for `ipConsistencyItems`, ten poster items, five bracelet accordion items, and five automation flow stages.
- [ ] Run `node --test src/portfolioPresentation.test.js` and confirm the assertions fail because the new contract is absent or incomplete.
- [ ] Add the minimal exported data structures to `src/data.js`.
- [ ] Re-run the test and confirm all presentation-contract tests pass.

### Task 2: Generate the reusable workflow diagram

**Files:**
- Create: `docs/diagrams/1688-automation-guided-flow.excalidraw`

- [ ] Create valid Excalidraw v2 JSON with five primary process nodes, three reliability branches, unique IDs, and `fontFamily: 5` for every text element.
- [ ] Parse the file as JSON and verify element IDs are unique and all text uses Excalifont.

### Task 3: Replace the combined AI stack

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/styles.css`

- [ ] Remove ScrollStack imports and the stack mapping.
- [ ] Import AccordionGallery and the new presentation data.
- [ ] Render an AI lab introduction, a dedicated IP consistency AccordionGallery, and a dedicated poster FanGallery.
- [ ] Keep the real-people DomeGallery as its existing independent section.
- [ ] Add responsive section-specific sizing without changing global gallery defaults.

### Task 4: Recompose the bracelet and automation cases

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/styles.css`

- [ ] Replace the bracelet main MorphSlider with a five-item AccordionGallery.
- [ ] Replace two four-item detail sliders with one eight-item MorphSlider.
- [ ] Add the five-step automation guide and three reliability branches before the full RPA evidence content.
- [ ] Make the diagram keyboard-readable and collapse it to a vertical route on mobile.

### Task 5: Fix the annotated density problems

**Files:**
- Modify: `src/styles.css`

- [ ] Constrain kitten media/copy/footer to 1280px and snow to a slightly tighter local width.
- [ ] Reduce local MorphSlider height without changing bracelet or unrelated sliders.
- [ ] Ensure CTA labels and media captions do not wrap or overlap.

### Task 6: Verify and visually revise

**Files:**
- Update: `output/playwright/*-annotation-redesign.png`

- [ ] Run `node --test src/galleryLayout.test.js src/portfolioPresentation.test.js`.
- [ ] Run `npm run build`.
- [ ] Verify DOM counts, interactions, console errors/warnings, and horizontal overflow at 1440x900 and 390x844.
- [ ] Capture IP, poster, bracelet, automation, and mobile screenshots.
- [ ] Score hierarchy, composition, type, color, consistency, states, responsiveness, domain fit, and accessibility; fix every score below 3/4 and recapture.

