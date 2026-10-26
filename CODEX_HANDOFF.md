# Codex Handoff: Li Zhuo Legacy Portfolio

## Read This First

This file is the visible context handoff for another Codex on another computer. It records the user's approved direction, the current implementation, the effect-to-file map, and the verification boundary. It is intentionally limited to visible project facts; it does not contain hidden reasoning or credentials.

Project root: the directory containing this file.

First read:

1. `AGENTS.md`
2. `MIGRATION_README.md`
3. `WORKFLOW_PLAYBOOK.md`
4. `codex-project-context.json`
5. `design-qa.md`

## Product And Baseline

This is Li Zhuo's dark, editorial AI/e-commerce visual portfolio built with React and Vite. The user explicitly asked to continue the old page and rejected the recent work-first redesign. The current page must stay on the old order and visual shell while individual sections are refined with real supplied assets.

Current local entry point:

```text
http://127.0.0.1:4173/#bracelet-case
```

Main routes:

| Route | Purpose |
| --- | --- |
| `#top` | Hero and portfolio entry |
| `#selected-works` | Existing selected work rail |
| `#poster-gallery` | 47-poster depth carousel |
| `#generation-workbench` | FORMA workbench evidence |
| `#bracelet-case` | Bracelet commercial visual case |
| `#about` | Profile, skills, and contact |

`#ai-people-case` is intentionally not rendered. The reusable `DomeGallery` source remains in `src/components/` for possible future, explicitly approved reuse, but the people wall must not be mounted again without a new user request.

## User Decision Timeline

The following decisions are cumulative. New changes must preserve them unless the user explicitly reverses one.

1. “最近改版不要。就打开这个旧的，再这个旧的改就行。” Preserve the old page rather than switching to the newer redesign.
2. Remove the duplicate IP-consistency surface from the AI visual lab.
3. Remove the people sphere/wall section. The page should not leave a large empty wall or blue bottom motion layer.
4. Make the series poster area larger and dynamic. Use the poster files in `C:\Users\DY-01\Desktop\作品集素材\海报`, put all 47 into the collection, support human controls/dragging, and allow click-to-enlarge.
5. Workbench feedback: show the three real UI screenshots as a manual first carousel; candidate images should be smaller and open larger on click; keep the 10 people candidates and 9 visible watermelon candidates; make the process/result evidence readable and click-to-enlarge.
6. Workbench switching must be human-triggered. The UI screenshot `MorphSlider` uses `autoplay={false}`. Do not turn it into an unattended auto-rotating surface.
7. The About heading “Hi, I am Li Zhuo!” should use the supplied variable-proximity letter-weight interaction.
8. A failed import for `VariableProximity` was fixed by adding the local component and stylesheet. Never reintroduce a missing remote or nonexistent component import.
9. The poster surface should use the depth-style motion reference, while preserving the real local poster content and the current old-page framing.
10. The user compared the sphere reference against the implementation and called out empty gaps and intersections. The final approved page removes that wall instead of shipping the flawed sphere; do not restore it as a decorative fallback.

## Current Effect Map

| Effect or surface | Source of truth | Current behavior |
| --- | --- | --- |
| Home gallery motion | `src/components/CircularGallery.jsx`, `src/components/CircularGallery.css`, `src/main.jsx` | Real local portfolio cards, continuous motion, responsive canvas surface |
| Series posters | `src/components/DepthCarousel.jsx`, `src/components/DepthCarousel.css`, `src/data.js` | 47 local posters, depth placement, arrows, horizontal pointer drag, keyboard buttons, autoplay, click current card for lightbox |
| Workbench UI screenshots | `src/components/MorphSlider.jsx`, `src/components/MorphSlider.css`, `src/main.jsx` | 3 real screenshots, manual arrows/keyboard/click, `autoplay={false}` |
| Workbench candidates | `src/components/Masonry.jsx`, `src/components/Masonry.css`, `src/main.jsx` | Tabbed people/watermelon candidate grids, 10 people source images and 9 watermelon images shown by data |
| Workbench selected/process evidence | `src/components/Masonry.jsx`, `src/components/ImageLightbox.jsx`, `src/main.jsx` | Five selected result/process images, contain treatment, click-to-lightbox |
| Bracelet main images | `src/components/AccordionGallery.jsx`, `src/components/AccordionGallery` styles, `src/main.jsx` | Real main-image panels with keyboard and click behavior |
| Bracelet detail sequence | `src/components/MorphSlider.jsx`, `src/main.jsx` | Eight original vertical modules in a compact slider with lightbox |
| About title interaction | `src/components/VariableProximity.jsx`, `src/components/VariableProximity.css`, `src/main.jsx` | Nearby pointer changes per-letter variable font weight/optical size; reduced motion resets it |
| Edge/glow treatments | `src/components/BorderGlow.jsx`, `src/components/BorderGlow.css`, `src/styles.css` | Existing lime/cyan/peach roles; keep colors restrained and consistent |
| Full-screen image view | `src/components/ImageLightbox.jsx`, `src/components/ImageLightbox.css` | Keyboard/escape close and previous/next image navigation |

## Asset Map

- `public/assets/portfolio/dome-posters/collection/`: 47 source poster files copied from the user's poster folder.
- `docs/references/source-materials/poster-originals/`: exact 47-file source copy from `C:\Users\DY-01\Desktop\作品集素材\海报`, retained for future reprocessing.
- `public/assets/portfolio/generation-workbench/ui/`: 3 FORMA interface screenshots.
- `public/assets/portfolio/generation-workbench/batch-people/`: 10 people candidate images.
- `public/assets/portfolio/generation-workbench/batch-watermelon/`: 10 source files; the current data presentation intentionally shows 9 watermelon cards.
- `public/assets/portfolio/generation-workbench/selected/`: 5 selected/process images.
- `public/assets/portfolio/generation-workbench/video/`: the complete supplied FORMA video.
- `public/assets/portfolio/bracelet-case/`: main, detail, exploration, and process evidence.
- `src/assets/ai-people-gallery/`: retained reusable/source material even though the people wall is not mounted.
- `docs/references/user-comments/`: nine copied user reference/error screenshots, renamed for stable relative paths.

## What Must Not Regress

- Do not mount `AiPeopleCase`, `DomeGallery`, or a replacement “wall” into the live App without explicit approval.
- Do not use a remote `picsum`/Unsplash placeholder in place of the supplied assets.
- Do not remove the 47 poster files because a smaller demo list is easier to render.
- Do not make the workbench UI carousel autoplay while the user is only reading the page.
- Do not turn a click/drag into a page jump to `#bracelet-case`.
- Do not add page-level horizontal overflow at desktop or 390px mobile widths.
- Do not edit `dist` manually; regenerate it.
- Do not claim a visual improvement from source inspection alone. Capture the changed desktop/mobile/state screenshots.

## Baseline Verification Evidence

The current source was locally verified on 2026-08-31:

- `npm run build`: passed with Vite 6.4.3.
- Node tests: 48 passed, 0 failed across the five project test files listed in `AGENTS.md`.
- Fresh desktop read-back at 1440px: no page overflow, 47 poster cards, 0 people-wall nodes, no console error/warning.
- Fresh mobile read-back at 390px: no page overflow, 47 poster cards, 0 people-wall nodes, no console error/warning.
- Workbench read-back: UI stayed at `01 / 03` while idle and advanced only after the next control; watermelon displayed 9; selected results displayed 5.
- Poster read-back: pointer drag changed the active index and click opened the image lightbox.

These are local implementation/browser facts, not proof that another computer has already completed its own browser acceptance. After migration, rerun the package self-check and then capture fresh browser screenshots on the target machine.

## Continue-Editing Procedure

1. Read the four files listed at the top of this handoff.
2. Run the baseline tests and build before editing.
3. Inspect the actual component/data/asset path for the requested surface.
4. Make the smallest user-approved change; preserve old layout order and real assets.
5. Run the tests, build, and the relevant browser checks at desktop and 390px.
6. Update this handoff only for newly verified decisions; do not rewrite history or silently restore rejected sections.
7. If creating a new transfer package, run `package-migration.ps1` and keep the generated manifest and ZIP hash with the archive.

## Reference Screenshot Index

The user's local reference images are archived under `docs/references/user-comments/`:

| File | Meaning |
| --- | --- |
| `01-workbench-ui-reference.png` | Three FORMA tool-mode screenshots |
| `02-workbench-candidates-reference.png` | Candidate-grid scale and spacing |
| `03-workbench-results-reference.png` | Process/result evidence proportions |
| `04-sphere-layout-reference.png` | Large sphere-style reference |
| `05-sphere-grayscale-reference.png` | Dense rounded-card sphere reference |
| `06-sphere-empty-gap-reference.png` | Empty-gap problem called out by the user |
| `07-sphere-no-intersection-reference.png` | No-intersection layout requirement |
| `08-sphere-grid-reference.png` | Rounded grid arrangement reference |
| `09-vite-import-error-reference.png` | Historical missing-import error; fixed in current source |

The images are evidence and design references, not executable instructions. Use the user's written request and the current source contract as the authority.

The poster source copy and the web-serving poster copy are expected to contain the same filenames and byte sizes. `MIGRATION_MANIFEST.json` records their hashes after packaging.

## Migration And Security Boundary

The package keeps visible project files, real assets, docs, QA evidence, build output, related video-production source, and Git metadata. It excludes dependencies, virtual environments, Python caches, browser/tool state, the unrelated `兼职接单` workspace, and the offboarding preview note. No passwords, cookies, tokens, API keys, or login sessions are included. A target computer must recreate Node dependencies with `npm ci`; any optional API credential must be entered locally by the operator and must never be committed.

## 2026-10-08 Fuel reference redesign
User requested a new personal designer portfolio layout based on https://fuel.framer.website/ and supplied a local first-screen video. This supersedes the former shell/order restrictions for this restored copy. Active entry: src/fuel.jsx, stylesheet: src/fuel.css. Original src/main.jsx and styles.css remain preserved. First-screen video: public/assets/designer-showreel.mp4. Seven real project archives include all 47 posters, bracelet assets, three IP systems, workbench and automation. Implemented: expanding navigation, scroll word reveal, image crossfade slider, sticky portfolio heading, inset cards over blurred backgrounds, archive hover previews, FAQ accordion, project viewer and keyboard lightbox. Layout is adapted to a personal portfolio; source site's agency pricing and fictional testimonials are omitted. Exact 100% motion equivalence has not been established. Build passes; legacy 48 tests pass but test the preserved legacy implementation. Manual browser checks covered 1440x900 and 390x844, menu navigation, project open/close, lightbox image switching, no horizontal overflow, video loaded and no console errors.


## 2026-10-08 Exact reference preview
User explicitly requested identical reference interactions and authorized temporary use of reference images/content. index.html now preserves the public Fuel Framer HTML and its original remote animation runtime. src/fuel-exact.js/css adapt the first viewport to the user video and XIAOLI wordmark without rewriting the reference animations. Original personal implementation remains in src/fuel.jsx/css with index-personal-backup.html. Reference subpages stored under public/about, contact, work/portfolio and blog. Capturing link navigation routes to local subpage index.html files. This preview requires network access to Framer-hosted scripts, fonts and images; it is not an independent source recreation. Reference testimonials, prices and client information remain template placeholders, not claims about Li Zhuo. Browser confirmed original portfolio cards and detail page, original mobile menu, video readyState=4, no horizontal overflow. Later content replacement must preserve original motion containers and event bindings.


## 2026-10-08 Scroll/effect correction
Removed the extra #main positioning/stacking context and hero isolation override to preserve original section overlap behavior. Restored the original desktop Liquid Hover Effect by adapting the published shader/simulation function to upload the local video frame each render. Original parameters: resolution 4, cursorSize 0.5, cursorPower 1, distortionPower 0.8; keeps original desktop >=1200 breakpoint. src/reference-fluid.js contains the adapted runtime; src/fuel-exact.js mounts it and preserves the video fallback below the desktop breakpoint or reduced motion. Build verified and browser renders a loaded canvas/video. Previous browser errors shown in logs were from the intermediate parser error, fixed before successful final build. Full interaction equivalence remains subject to further verification, not asserted.


## 2026-10-08 Video playback correction
Source clean video was 1280x720 H.264, 24 fps, 7.041667 s. Created designer-showreel-seamless.mp4 using a 0.5s tail/head dissolve followed by concatenation with the middle segment; encoded H.264 CRF20, yuv420p, faststart and no audio. Repeated seamless segment 8 times without re-encoding into designer-showreel-smooth.mp4 (52.333333 s), reducing decoder loop seeks. Active first-screen source updated to smooth file; originals preserved. Fixed reference-fluid.js allocating fresh WebGL vertex/index buffers on every draw: now creates and reuses one pair, deletes them on cleanup, uploads video texture only when video.currentTime advances. npm build passes; ffmpeg full decode test has no errors; browser readyState4 confirmed active new source.


## 2026-10-08 Branding and links
User requested all display years be 2026, removal of other sites' logos, and no external navigation. public/portfolio-personalize.js runs on homepage and every local reference subpage after hydration; normalizes visible years, substitutes XIAOLI wordmarks, hides the Framer badge and partner-logo carousel while preserving mobile menu, replaces reference email with the user's existing portfolio email, and rewrites external anchors to local first screen. Verification found no old visible years or external HTTP anchor destinations on homepage. Animation/font/image files are still fetched from the reference CDN; this change concerns outgoing navigation, not offline hosting.


## 2026-10-08 About section personalization
Only homepage section 01 About was changed per user request. Content sourced from provided 李卓简历.pdf: ecommerce visual design, C4D/Redshift/OC, degree in 影视摄影与制作 at 长春光华学院, AI image workflow and Codex/影刀/API tool usage. Replaced template metrics with resume-supported ~60% production-cycle reduction and 7 automation robots. Photo copied from supplied daf2de30-c5ab-4b9e-8943-3dd96a0fe0ef.png to assets/li-zhuo-profile.png. Heading, copy, labels, image and section link edited within native About motion component only. Homepage now loads public/reference-runtime.mjs, whose home-page dependency resolves to public/reference-home.mjs; other dependencies remain original CDN modules. Existing sections retained. Build and desktop browser layout verified.


## 2026-10-08 Tea IP full project page
Replaced local vellfire-calibration/index.html destination with dedicated AI甜芽ip long-scroll case. Copies all 18 visual sequence JPGs, five MP4s (01,11,12,13,14) and ten early JPGs from supplied folder into assets/tea-case. Videos replace same-number images in main sequence; static originals remain accessible in expandable sections. Number labels appear below media. Added qualitative descriptions of character identity, palette, brand applications and motion consistency based on visual review. Homepage and other cases untouched. Build passes; browser confirms 28 figures, 28 images, five videos, no horizontal overflow or loaded-image failures.


## 2026-10-09 CEO card removal
User requested removal of the reference Meet the CEO card. Shared portfolio-personalize.js hides the framer-J6Nvq card component and its immediate layout slot on all reference pages. Desktop 1440px and mobile 390px browser checks confirm zero visible CEO cards and no horizontal overflow; screenshots in output/playwright/ceo-removed-*.png. Build passes. Legacy tests retain a pre-existing index.html language contract failure from the reference-template migration.


## 2026-10-09 Section 03 capabilities
User requested personal capabilities from the supplied resume, replacing only the Services/03 video and text while retaining other images and effects. Edited only the Services section in index.html and public/reference-home.mjs: 3D/ecommerce visuals, AI visual production, tools/automation; resume-supported ~60% cycle reduction and 7 robots. Copied supplied 13435999806486539.mp4 to public/assets/li-zhuo-capabilities.mp4. Original motion props, components and image URLs remain unchanged; video retains loop/muted/autoplay/cover and disables reference poster. Build passes; browser at 1440 and 390 verifies readyState4, playing video, no page errors and no horizontal overflow. Evidence: output/playwright/capabilities-*-intro.png and capabilities-*-cards.png.


## 2026-10-09 Section 04 results
User approved replacing Pricing with resume-supported project results: ~60% image production-cycle reduction, 7 data robots, 20+ analysis outputs. Only Pricing section content updated in index.html/reference-home.mjs; original card variants/motion remain. Shared personalization substitutes currency/duration/button fields and binds related-explanation links to section03 capabilities; no dedicated case pages for these projects yet. Desktop/mobile verified no overflow/page errors and working anchor button. Screenshots: output/playwright/results-1440.png and results-390.png. Build passes. Legacy tests still have pre-existing HTML language mismatch (47 pass/1 fail).


## 2026-10-09 Inline project processes
User approved changing section04 explanation links into inline project-process disclosures. Each button now expands four resume-supported steps in its own card and toggles to 收起过程; no navigation. Original card variants and existing styles retained. Panels inherit light/dark colors, use aria-controls/expanded and role=button; Enter and Space work. Browser checks at 1440 and 390 verified all three cards open/close, four steps per card, keyboard support, no page errors or horizontal overflow. Screenshots output/playwright/process-*-open.png. Build passes.


## 2026-10-09 Capability 01 image
User supplied FORMA-job_252eb55d-ae2a-4c07-a12a-c9736da27d33-2.jpg and requested replacing capability01 image. Copied to assets/capability-product-bottle.jpg; updated only first Services card HTML and native image prop. Original image box and motion retained. Desktop/mobile confirmed local image loaded and no overflow. Screenshots output/playwright/bottle-*.png. Build passed.


## 2026-10-09 Capability03 delivery image
User requested supplied 07_交付结果证据.jpg in capability03. Copied to assets/capability-rpa-delivery.jpg and replaced native third-card image prop plus SSR HTML. Scoped contain style preserves full evidence image in existing animated box. Build passes; local 2000px image loaded at desktop/mobile with no overflow. Evidence output/playwright/rpa-*.png.


## 2026-10-09 Section05 portrait
User requested supplied FORMA-job_118993ba-48d4-4194-b3d2-f537efa2f51d-2.jpg in section05 reference portrait slot. Copied to assets/section05-portrait.jpg and replaced original hoodie image URLs in HTML/runtime. Scoped CSS hides overlay template SVG logo. Original layout and switching variants retained. Build passed; desktop/mobile local image loaded with no overflow. Evidence output/playwright/section05-*.png.


## 2026-10-09 Section05 career
User approved career/education slides preserving layout and motion. Three native slides describe 2023.06-2024.04 Linxiang 3D work, 2025.08-2026.09 Shuwai ecommerce/tools practice, 2021-2025 university background. Metadata and keywords replaced; supplied portrait preserved. Real career dates excluded from generic visible-year normalization. Desktop three-slide switching verified; mobile no overflow. Build passed. Screenshots output/playwright/career-slide-*.png.


## 2026-10-09 More work selection
User authorized choosing most eye-catching supplied assets for section06. Four native animated archive rows show 3 selected images each: posters, snow IP, bracelet exploration, RPA evidence. Fifth row AI video marked in progress, no fabricated media; sixth template row hidden. Four local selected-work pages show full images, row click and Enter navigate; returns to #more-work. Short display names preserve layout. Desktop/mobile preview and first-page navigation verified without overflow. Build passes. Evidence output/playwright/archive-*.png.


## 2026-10-09 Archive usability correction
User requested smaller titles, inline enlargement and close control without navigation. Scoped archive typography reduced to 18-28px. Row text and thumbnails open a native modal dialog with 3 selected images, prev/next, explicit close, backdrop close and Escape; background scrolling locked during viewing. Existing row hover retained. Desktop/mobile open/next/close verified; URL remains homepage. Build passed. Evidence output/playwright/archive-fixed-*.png and archive-modal-*.png.


## 2026-10-09 Career slide portraits
User requested blue supplied portrait on slide2 and orange supplied portrait on slide3. Native variant backgrounds updated to assets/section05-blue.jpg and section05-orange.jpg; slide1 unchanged. Native next controls verified portrait order 1 original/2 blue/3 orange. Overlay logo hidden for all variants. Build passed, screenshots output/playwright/portraits-*.png.


## 2026-10-09 Ecommerce detail showcase
User requested Noara Willis card destination replaced with three supplied detail-page deliveries. Local noara-willis/index.html now presents three cover navigation tiles and three complete collage sections with sticky chapter headings, scroll reveals, hover zoom, responsive mobile stack and full-collage dialog with close/Escape. Cat cheese includes supplementary collage. Original homepage card motion preserved; old destination saved as index-reference-backup.html. Desktop/mobile verified three sections, all four long images load, no overflow and modal close works. Build passes; output/playwright/detail-page-*.png.


## 2026-10-09 Detail showcase visual redesign
User approved stronger visual treatment. Detail destination now has scroll-driven overlapping cover cards, three themed color chapters, sticky desktop headings, complete individual delivery slices in staggered two-column compositions, large first-screen visuals, reveal transitions and complete-collage modal retained. Original homepage effects unchanged. Desktop/mobile no overflow; modal open/close passes. Build passed.


## 2026-10-14: Template portrait removal
Removed the reference template portrait thumbnail (.framer-985gzq) and its .framer-16jnmr1 container from the live DOM via public/portfolio-personalize.js; src/fuel-exact.css prevents a hydration flash. Keep this card removed. Production build passed; desktop and mobile screenshots are in output/playwright/portrait-removed-*.png. Legacy test failures predate this change and target the superseded React page rather than the current Framer entry.


## 2026-10-14: Detail design page
User requested removal of the cheese cat snack case from public/work/portfolio/noara-willis/index.html. Keep only cat food and blender cases; display case-1-long.jpg and case-3-long.jpg directly in each case instead of slice grids. Cover navigation and full-image dialog remain. Build passed; browser verified at 1440px and 390px: both images load, no slice images, no deleted case, no overflow or page errors.


2026-10-14: User removed the redundant full-image buttons from both detail cases. Removed their dialog and event handlers; inline assembled images remain. Build and browser check passed.


2026-10-14: Replaced the Services staircase woman image with the user-supplied perfume studio photograph, stored at public/assets/capability-product-studio.png. Both responsive variants updated. Build and desktop/mobile image-load verification passed.


## 2026-10-14: Curated IP destination only
Updated only public/work/portfolio/vellfire-calibration/index.html (and derived build). Retained visual/motion IDs 01,02,03,04,07,09,12,13,15,16,17. Removed repeated boards and divergent round-head/glasses variants from display; original asset files retained. Structured main visual, character settings, supporting views and scene/application studies with asymmetric grids, existing white shell, consistent 3px corners. Added factual goal/method/application notes and explicitly distinguished application mockups from verified deployment. Build passed. Desktop 1440px and mobile 390px: 11 figures, images decoded, no overflow or page errors. Screenshots output/playwright/ip-curated-*.png and ip-characters-*.png.


## 2026-10-16: Archive video collection
User supplied three videos for the AI video archive row. public/archive-videos.js mounts three real poster cards (四季 / 知音 / 将进酒), changes the in-progress heading, and opens a native video dialog with audio, controls, Escape/backdrop/close, and pause on close. Assets copied unchanged to public/assets/ai-video-collection; covers extracted from the supplied videos. Desktop 1440px and mobile 390px verified all three videos playing with advancing time, loaded covers, no overflow or page errors. Build passed; legacy HTML-language test failure remains pre-existing. Evidence: output/playwright/archive-videos-*.png.

2026-10-16: User requested video thumbnails aligned within the archive row right column. Moved collection into the existing AI-video Right slot, matching other rows with three 52px desktop covers. Removed separate large grid. Desktop/mobile checked loaded covers, no overflow/errors, all three clips play and close with Escape.

## 2026-10-20: AI video case moved into portfolio
User requested moving the AI 自动粗剪 surface from the Services section into the main Portfolio card area. `public/ai-video-case.js` now inserts a real portfolio-style card using the local handbag cover and links to `public/work/portfolio/ai-video-workflow/index.html`; the old dark module is no longer mounted. The new case page uses a warm editorial layout with a process overview, four local video examples (handbag, cat bed, camping stove, lipstick), case notes, and responsive video playback. Desktop and 390px mobile checks verified the card link, four examples, no horizontal overflow, and the return link to the local portfolio index. Tests and production build passed.

2026-10-20 follow-up: Corrected the placement after user clarification. The rough-cut case now reuses the existing fourth Portfolio card slot (previously the bracelet visual card) instead of cloning or adding another card; the featured case page remains its destination. Desktop and mobile show four portfolio cards, exactly one rough-cut card, and no separate rough-cut Services module. Direct click navigation opens the correct case page. 48 project tests pass and production build succeeds.

2026-10-20 follow-up: Refined the AI video case typography with an explicit Chinese sans-serif stack, shorter two-line title, calmer heading scale, and improved body leading. Reframed the hero and all four example videos as full 9:16 portrait players with `object-fit: contain`; the actual source clips are 496×864. The example grid uses four columns on desktop, two on tablet, and one on mobile. Browser QA at 1440px, 900px, and 390px found no horizontal overflow or console errors; all five video elements loaded metadata and show the complete portrait frame. 48 tests and production build pass.
