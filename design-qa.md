# Design QA

## Source Visual Truth

- Current homepage reference: user screenshot `89e7863fcfa34cf089ad09be3dd64f9d.png`
- Experience page reference: `output/design-qa/reference-experience.png`

## Implementation Evidence

- Homepage desktop: `output/playwright/final-home-1440-20260823.png`
- Homepage mobile: `output/playwright/final-home-390-20260823.png`
- Latest mixed-category homepage: `output/playwright/home-mixed-final-20260823.png`
- Current English-layout homepage desktop: `output/playwright/english-layout-1440-final.png`
- Current English-layout homepage mobile: `output/playwright/english-layout-390-final.png`
- Side-by-side comparison: `output/design-qa/english-layout-comparison-final.png`
- Experience desktop: `output/playwright/final-experience-tight-1440-20260823.png`
- IP case desktop: `output/playwright/final-ip-case-1440-20260823.png`

## Viewport And State

- Desktop: 1440 x 900, default homepage state.
- Mobile: 390 x 844, default homepage state.
- IP case: 1440 x 900, fourth accordion item hovered for interaction verification.
- Browser: local Vite server at `http://127.0.0.1:4173/`.

## Comparison

The homepage follows the selected screenshot's structure: full-bleed supplied video, narrow floating navigation, lime `XIAOLI`, white `PORTFOLIO`, small script signature, and compact English supporting copy. The earlier project rail, right-side information panel, and CSS scroll-door have been removed. The reference screenshot image itself is not used.

The final side-by-side comparison shows the title group at the same center-left visual anchor and a matching lime/white geometric-sans hierarchy. Expected differences are the user-requested `XIAOLI` name, the supplied video's current animation frame and brightness, and omission of the screenshot's browser translation overlay. No focused crop was needed because the 1440px comparison keeps the navigation and complete title group legible in both halves.

The experience page follows the second reference composition: chapter heading, left portrait visual, right introduction/contact/stat block, and a career path line at the bottom. Copy and metrics come from the resume rather than the reference persona.

Focused region checks covered the hero title and rail, the experience profile/stat grid, and the IP accordion gallery. The accordion's active track expands to approximately 52% of the desktop gallery after hover.

## Findings And Iterations

1. Initial hero used a split right-side image card. Replaced it with a cinematic full-bleed background, floating navigation, animated image drift, light sweep, and a mixed work rail.
2. Initial accordion ratio made the active panel narrower. Changed `expandRatio` handling so the active panel occupies approximately 52% of the gallery.
3. Initial work rail overrepresented the Snow Monster IP. Rebalanced data to include IP, textile visual, data dashboard, posters, and apparel. Pool imagery was removed from the homepage and commercial project list after user correction.
4. Experience visual was too tall to reveal the career path. Tightened the desktop grid rhythm so the career line appears at the bottom of the 900px viewport.
5. Replaced the static Hero background with the user's supplied local MP4 and kept a local poster fallback for load failure.
6. Rebuilt the Hero typography around the latest selected screenshot: `XIAOLI / PORTFOLIO`, lime-and-white hierarchy, script signature, and a center-left content block.
7. Replaced the earlier video with `13431948623625007.mp4` and removed the CSS scroll-door layer because the opening sequence is now part of the supplied video itself.
8. First English pass kept the title too high and retained the older bottom rail. Moved the title into the reference's middle-left zone, removed the rail from the first viewport, raised video brightness, and captured a second side-by-side comparison.

## Required Fidelity Surfaces

- Typography: `Arial Black`/Arial geometric sans hierarchy approximates the reference; `XIAOLI` and `PORTFOLIO` do not clip or wrap at 1440px or 390px.
- Spacing/layout: full-bleed rounded video, narrow navigation, and center-left title match the selected composition; no horizontal overflow at 1440px or 390px.
- Colors/tokens: lime `#c8ff36`, white display text, dark translucent navigation, and a restrained dark overlay follow the source hierarchy.
- Image quality: the Hero uses the exact supplied local MP4 plus a poster frame extracted from that same MP4; no screenshot imagery or code-drawn substitute is used.
- Copy/content: the requested `XIAOLI / PORTFOLIO` wording and English navigation/supporting copy are present. The reference brand name and browser translation overlay are intentionally excluded.

## Verification

- `npm run build`: passed.
- Homepage desktop `scrollWidth`: 1440, viewport width 1440.
- Homepage mobile `scrollWidth`: 390, viewport width 390.
- Commercial project cards: 2, covering visual production and data automation.
- Hero video: `13431948623625007.mp4` is copied to `public/assets/hero-motion.mp4`, reaches `readyState=4`, remains `paused=false`, and advances `currentTime` during browser verification.
- Hero poster: `public/assets/hero-poster.png` was extracted from the same supplied MP4.
- Hero scroll behavior: the Hero is exactly one viewport high; normal scrolling proceeds directly into the next section, with `door-panels=0`.
- First-viewport project rail: removed to match the latest selected reference; projects remain in later sections.
- IP accordion hover interaction: passed; active grid track expands.
- Browser console errors: 0 in final desktop and mobile checks.

## Visual Score

- Task hierarchy: 4/4
- Composition and rhythm: 4/4
- Typography: 4/4
- Color: 3/4
- Consistency: 4/4
- States and fallback: 3/4
- Responsiveness: 4/4
- Domain fit: 4/4
- Accessibility: 3/4

No score is below 3. The critique-fix-recapture cycle addressed the high title position, obsolete first-viewport project rail, and overly dark video treatment before the final comparison.

## August 28 Gallery Follow-up

The user reference for the gallery layout is `C:\Users\DY-01\AppData\Local\Temp\codex-clipboard-2998ef67-5ef8-4e81-ab35-84cb4e76c783.png`. The two requested gallery surfaces now use the same observable pattern: one expanded track at approximately 52% width, four full-height image strips, rounded 14px panels, low-contrast edges, and a dark inactive treatment. Images use `object-fit: cover` so side panels do not collapse into small centered thumbnails.

The IP consistency gallery and bracelet commercial main-image gallery were checked in the settled state and after pointer hover. The mobile gallery scrolls the active item into view, keeping the selected artwork centered while preserving adjacent previews. Evidence captures:

- `tmp/qa-accordion-ip-1280.jpg`
- `tmp/qa-accordion-bracelet-1280.jpg`
- `tmp/qa-accordion-ip-390.jpg`
- `tmp/qa-fan-gallery-1280.jpg`
- `tmp/qa-home-1280.jpg`
- `tmp/qa-home-390.jpg`
- `tmp/qa-selected-works-1280.jpg`

Viewport checks: 1280 x 900 and 390 x 844. Document width stayed within the viewport (`scrollWidth` matched the client width); no horizontal page overflow was observed. The fan gallery remains a compact, self-moving poster surface. The snow case continues to use the local `MorphSlider` with the original full-image contain treatment, while the AccordionGallery surfaces use full-bleed cover treatment.

## August 29 Legacy Continuation

This pass intentionally keeps the pre-August-28 page order and visual shell. The rejected work-first layout rewrite is not mounted.

Changes verified:

- Removed the duplicate `AI 视觉能力 / IP 角色一致性` section and the separate people image wall (`#ai-people-case`). `PROJECTS` now points to the surviving poster case.
- Added the native `VariableProximity` letter effect to the About heading without changing the existing lime name treatment.
- Replaced the poster fan surface with a `DepthCarousel` using all 47 files from `C:\Users\DY-01\Desktop\作品集素材\海报`; each source is copied to `public/assets/portfolio/dome-posters/collection/` and has a unique URL. Cards support autoplay, buttons, horizontal drag, and click-to-lightbox.
- Changed the workbench interface block to one manual `MorphSlider` with three real UI screenshots and `autoplay={false}`. People candidates remain 10; watermelon candidates are 9. Candidate and selected-result thumbnails use centered maximum widths and remain click-to-enlarge.
- Normalized visible BorderGlow and automation edge colors to the existing lime, cyan, and peach roles.
- Prevented hover Accordion panels from navigating back to `#bracelet-case`; deep hash links retry alignment while asynchronous media settles.

Evidence captures:

- Desktop: `output/playwright/legacy-poster-depth-desktop-1440x900.png`, `legacy-workbench-desktop-1440x900.png`, `legacy-about-desktop-1440x900.png`, `legacy-about-proximity-desktop-1440x900.png`.
- Desktop key states: `output/playwright/legacy-workbench-ui-desktop-1440x900.png`, `legacy-workbench-candidates-desktop-1440x900.png`, `legacy-workbench-results-desktop-1440x900.png`, `legacy-poster-lightbox-desktop-1440x900.png`.
- Mobile: `output/playwright/legacy-poster-depth-mobile-390x844.png`, `legacy-workbench-mobile-390x844.png`, `legacy-about-mobile-390x844.png`, `legacy-workbench-candidates-mobile-390x844.png`, `legacy-workbench-results-mobile-390x844.png`, `legacy-poster-drag-mobile-390x844.png`.
- Frontmost legacy case: `output/playwright/final-legacy-bracelet-desktop.png`.

Fresh browser read-back:

- Desktop `1440 x 900`: `scrollWidth=1425`, `clientWidth=1425`; poster cards `47`; people wall `0`; console error/warn `0`.
- Mobile `390 x 844`: `scrollWidth=375`, `clientWidth=375`; poster cards `47`; people wall `0`; console error/warn `0`.
- Workbench: manual UI carousel stayed `01 / 03` after 4.8 seconds and moved to `02 / 03` only after the next button; watermelon tab rendered `9` cards; selected results rendered `5` cards.
- Poster interaction: horizontal drag changed the active counter (`30 / 47` -> `32 / 47` in the mobile run); click-to-lightbox opened `.image-lightbox` with the selected source image in the live page.
- Build/tests: `npm run build` passed; `node --test src/portfolioPresentation.test.js src/generationWorkbench.test.js src/portfolioEffects.test.js src/galleryLayout.test.js` passed `46/46`.

Visual score after the critique/fix cycle:

- Task hierarchy: 3/4
- Composition and rhythm: 3/4
- Typography: 3/4
- Color: 3/4
- Consistency: 3/4
- States and fallback: 3/4
- Responsiveness: 3/4
- Domain fit: 4/4
- Accessibility: 3/4

## Final Result

passed

2026-10-09: Removed template CEO card. Browser verified at 1440px and 390px: visibleCEO=0, overflow=false. Evidence: output/playwright/ceo-removed-1440.png and ceo-removed-390.png. Build passed.


2026-10-09 Section 03: desktop/mobile screenshots visually inspected. Personal copy in native motion components; supplied video readyState=4 and paused=false at both widths. No page errors or horizontal overflow. Build passed. Legacy language assertion failure predates this edit.


2026-10-09 Section04: resume results cards visually inspected at 1440 and 390px. Original staggered card styles and animation settings retained. No horizontal overflow/page errors. First explanation link tested at both widths. Evidence output/playwright/results-*.png.


2026-10-09 Inline project-process panels: visually inspected desktop/mobile expanded screenshots. All three open/close and Enter/Space toggles verified, no overflow/errors. Build passed.


## 2026-10-13 Section 07 AI Systems
Replaced template statistics with AI Native, Agent Systems, Reusable Skills and Creative Pipeline, with Chinese capability descriptions. Desktop 1440px and mobile 390px screenshots: output/playwright/ai-systems-1440.png and ai-systems-390.png. Both have no horizontal overflow or page errors. Build passed. Legacy tests: 47 passed, one pre-existing index.html language contract failure.

## 2026-10-13 AI practice generated covers
Four Wuyin-generated conceptual covers added with a consistent black/chrome/ivory/yellow visual direction. Modals distinguish concept artwork from existing related work and workflow design. Desktop/mobile card clicks and Escape close passed, all four images loaded, no overflow or page errors. Screenshots: output/playwright/ai-practice-generated-*.png. Build passed; legacy language-contract failure persists.

2026-10-14: Removed template portrait card and container. Browser verified at 1440px and 390px; screenshots: output/playwright/portrait-removed-1440.png and portrait-removed-390.png. Production build passed.


2026-10-14: Detail design page now contains two cases and inline assembled images. Desktop/mobile verification passed, including image dialog and no horizontal overflow. Screenshots: output/playwright/detail-long-1440.png and detail-long-390.png.


2026-10-14: IP destination curation and asymmetric layout verified at 1440px/390px. Removed visual IDs 05,06,08,10,11,14,18 from page for repetition or character drift. Preserved actual assets and existing site shell. 11 figures remain; image decoding and responsive checks passed. Build succeeded.


2026-10-16: AI video archive: 3 real videos verified playing at 1440px and 390px; covers loaded, Escape closes, no overflow/page errors. Production build passed. Screenshots: output/playwright/archive-videos-*.png.
