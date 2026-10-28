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

## 2026-10-28 Section 02 portfolio cards

User reported two defects in section 02 (Portfolio): the second card linked to the ecommerce template page instead of the 电商详情页 work, and the fourth card still showed the bracelet artwork instead of the 跨境短视频粗剪 cover. Both were confirmed in `public/portfolio-personalize.js`: the previous `match:`-based mapping pinned the third card to `generation-workbench`, dropped the detail-page destination, and left the fourth card's image untouched. Card order is now index-based `a[data-framer-name="Project"]` mapping to 甜芽 IP / 电商详情页 / 生图工作台 / 跨境短视频粗剪, and the fourth card gains an explicit summary so the leftover English `Art Direction` placeholder is replaced.

User approved opening the 电商详情页 work inline instead of navigating: the second card now opens `#ecommerce-detail-preview`, a dialog that embeds `/work/portfolio/noara-willis/` in an iframe with a close button, backdrop click, Escape, focus return and body scroll lock. The anchor keeps its href so ctrl/cmd/middle click still opens the page normally. Click interception runs in a `window` capture listener because Framer's router handled the anchor click before a bubble-phase listener.

Verified on `http://127.0.0.1:4173/` at 1440x900 and 390x844: four cards in the expected order, card 2 modal opens with the detail iframe while the URL stays on the homepage, Escape closes it and restores scroll, card 4 shows `cross-border-video/handbag.jpg` and links to `/work/portfolio/ai-video-workflow/`, no horizontal overflow. `node --test` reports 47 pass / 1 fail; the single failure is the pre-existing `page defaults to no translation` index.html lang contract noted on 2026-10-09. `npm run build` succeeds.

Known remaining, not changed: the 生图工作台 card renders a template video inside a black 16:9 box rather than the intended `/assets/workbench-case/ui-01.png`; card 1 still pulls its cover from framerusercontent.com; the 甜芽 IP card shows its title twice.

Not to regress: the inline preview must stay a dialog, not a navigation, and it must not reopen as a bubble-phase listener (Framer's router wins there).

## 2026-10-28 Follow-up: inline preview destination

User replaced the inline detail preview target: the second 02 card now embeds `/portfolio-template/index.html?squares=removed` (电商设计作品集全套排版系统, 11 pages) instead of `/work/portfolio/noara-willis/`. The anchor href carries the same URL so ctrl/middle click still opens the page directly. Verified at 1440x900 and 390x844: the dialog opens, the iframe document title is 电商设计作品集全套排版系统（11页完整版）with 34 images loaded, the homepage URL is unchanged and there is no horizontal overflow. Card label and cover are unchanged (电商详情页设计 / detail-card-cover.jpg); say the word to switch them to the 电商设计模板 wording and portfolio-template-cover.png that the older mapping used.

## 2026-10-28 Section 02 covers

Replaced the first three card covers: card 1 now uses `/assets/tea-case/visual-01.jpg` (甜芽茶坊 IP) instead of the remote framerusercontent stock photo; card 2 uses `/assets/portfolio-template-cover.png` so it matches the template system it opens; card 3 uses `/assets/workbench-case/ui-01.png`.

Card 3 had no `<img>` at all — the template renders a `<video>` inside a black letterbox, so the `image` field had never applied. `mountPortfolioCover()` now measures the video box once, builds a blurred backdrop layer plus a sharp inset image of that size, pauses and hides the video and the Inner Image node. Card 2 also needed a summary (`11 页版式 / 分屏结构 / 可复用组件`): with the href no longer matching the old noara-willis rewrite, the template's `Photograhy` placeholder became visible.

Verified at 1440x900 and 390x844: three covers correct and cropped like the fourth card, no visible video, no horizontal overflow, and the card 2 dialog still opens `/portfolio-template/index.html?squares=removed` with the 11-page document loaded.

## 2026-10-28 Section 03 rebuild

Section 03 (Services) is now Li Zhuo's capability list instead of the Fuel template copy. The live page had never received the 2026-10-09 personalization: the previous `personalizeServiceRows()` looked for `[data-framer-name="Title"] p` while the rows render `<h4>`/`<h1>`, so every lookup failed and the English template text stayed.

Rewritten around `capabilityRows`: 01 3D 电商视觉 (C4D / Redshift / OC), 02 AI 视觉制作 (ComfyUI / 批量生图 / 工作台), 03 工具与自动化 (Codex / 影刀 RPA / API / 九数云). Copy comes from `李卓_AI视觉与自动化简历_.docx`. Rows 01/02 use local `capability-product-bottle.jpg` and `capability-product-studio.png`; row 03 mounts `/assets/li-zhuo-capabilities.mp4` (the supplied 13435999806486539.mp4) into the Image slot as a muted looping video over the hidden template image. Row markup, per-line reveal and scroll motion are untouched, so the animation keeps working.

The section headline was still the reference studio's English claim ending in Fuel(R). It is now four Chinese lines on desktop and seven on mobile, driven by `capabilityHeadlineLines` keyed by line count because the desktop and mobile variants split the text differently. The first line takes `.portfolio-capability-first` (202px indent desktop, 118px mobile) to clear the portrait thumbnail; `Explore More` became 查看作品集 linking to `#portfolio`. `personalizeServiceRows()` now also runs inside `apply()` because Framer re-renders the section after hydration and wipes one-shot edits.

Verified at 1440x900 and 390x844: three rows with the expected numbers/titles/subtitles, video present only in row 03 and playing (406px / 342px wide), no horizontal overflow. Known issue: replacing the headline text makes Framer's own text-measuring code throw two `IndexSizeError: setEnd ... offset N is larger than the node's length` exceptions per desktop load, from framerusercontent CDN code. Rendering and animation are unaffected; removing them would mean rebuilding the headline outside the measured spans.

## 2026-10-28 Case pages: back chips

The four 02 destinations (`work/portfolio/vellfire-calibration`, `portfolio-template`, `work/portfolio/generation-workbench`, `work/portfolio/ai-video-workflow`) no longer carry text return links: the header/footer 返回作品集 and 返回代表作品 anchors were removed from the HTML. `public/portfolio-back.js` is now loaded on each of them and appends two fixed chips, top-left and bottom-right, both `aria-label="返回作品集"`.

Clicking either chip calls `history.back()` when the referrer is same-origin, so the homepage returns from history at the exact scroll position with no reflow flash. Only a direct open (no referrer) falls back to `location.replace('/#portfolio')`. As a belt-and-braces measure `portfolio-personalize.js` stores `scrollY` in `sessionStorage` on any click on a `section[data-framer-name="Portfolio"]` card and restores it after a same-origin case load, so the position survives even without bfcache.

The top chip is offset to `header/nav` bottom + 10px at runtime so it never covers a page logo. Verified 1440x900 and 390x844 on all four pages: two chips present, zero legacy return links, back returns to `/` at the pre-click offset (2383px measured). `portfolio-template` had no return control at all before, so it only gained the chips.

## 2026-10-28 Section 03 video position fix

The supplied video belongs in the small portrait slot beside the heading, not in row 03. `mountCapabilityHeaderVideo()` now points the existing `[data-framer-name="Video"]` element at `/assets/li-zhuo-capabilities.mp4` (muted, looped, autoplay, object-fit cover), hides the template portrait behind it, and returns early if the slot is missing. Row 03 switched back to an image and now uses `/assets/capability-rpa-delivery.jpg`.

Verified at 1440x900: exactly one video in the section, `paused: false`, currentTime advancing, box 178x232; rows 01/02/03 images are bottle / studio / rpa-delivery at both 1440 and 390 widths, no row video left over.

## 2026-10-28 Sections 04 and 05

Section 04 (Pricing, id=strengths) keeps its three capability cards and gains a metrics strip appended to the section: 60% 单张图片制作周期缩短 / 7 个 1688 数据采集机器人 / 95%+ 采集效率提升 / 20+ 份竞品与运营分析成果. Those four numbers are the only quantified results in the resume; the strip is generated by `personalizeResultsMetrics()` with scoped styles and collapses to two columns under 810px.

Section 05 (Testimonial) carried the reference agency's English testimonial ("Fuel delivered with clarity..."). `personalizeCareerQuote()` now finds the first large-font Latin span in the section, takes its computed font family/size/line-height/letter-spacing/colour, replaces the quote host with one paragraph holding Li Zhuo's first-person statement about his workflow. The per-line reveal animation on that quote is gone because the block is replaced wholesale; the rest of the section (portrait, name, stats, prev/next controls) is untouched and still animates.

Verified at 1440x900 and 390x844: metrics strip renders four (two on mobile) items with no horizontal overflow, quote is Chinese at the original display size, and the section height stays stable.

## 2026-10-28 Section 04 de-pricing

User read the three-card block as a pricing table and asked for the links to go away. The card CTA anchors (从建模到成片 / 创意到稳定交付 / 减少重复劳动) are now removed from the DOM instead of repointed to `#about`, and their empty wrapper is collapsed, so nothing in section 04 navigates. To break the plan-card reading the metric is reduced from display size to `clamp(24px,2.3vw,34px)` with the suffix as a small inline label, the list heading changed from 能力要点 to 具体做法, and the `+` glyph in front of every point is hidden. The metrics strip added earlier stays.

Section 04 keeps its three-column layout, the light/light/black card rhythm and the metrics strip. If it still reads as a comparison table, the next step would be re-laying it as numbered rows like section 03.

## 2026-10-28 Section 04 layout attempts (reverted)

Tried replacing the three cards with a numbered-row layout like section 03. Two variants failed: appending rows to the outer `section[data-framer-name="Pricing"]` left them outside the fixed-height inner `section[data-framer-name="Overlap Detailing"]`, so rows overlapped the metrics strip; appending inside the inner section and forcing `height:auto` made the rows collapse instead. The card markup is nested in Framer grids sized for 448px columns, so a stacked restyle squeezes the copy into a ~250px column. Both attempts were reverted; section 04 is back to the working three-column version with the CTA anchors and price styling already removed.

A reliable rebuild would need to clear the inner Bottom container and inject the rows there, with the inner section's inline height overridden and verified at 1440 and 390 in the same pass.

## 2026-10-28 Section 04 final: three steps

Section 04 no longer uses the three pricing-style cards. `personalizeStrengthsPage()` now clears the card row container (the parent of `.framer-1g23nsb-container/.framer-7zvvok-container/.framer-4c4yj0-container`, found at runtime because `[data-framer-name="Bottom"]` is not reliably present at first paint) and injects a three-step block: 01 需求拆解 / 02 批量生成 / 03 复核交付, each a top-ruled column with a short paragraph, followed by the existing 60% / 7 / 95%+ / 20+ metrics strip. No cards, no prices, no anchors.

The mount is guarded by `data-steps-mounted` so repeated `apply()` passes do not rebuild it. Verified 1440x900 and 390x844: three steps in a row on desktop and stacked on mobile, no horizontal overflow, metrics strip intact. A residual gap remains between the steps and the metrics because the original section still reserves its old height; tightening it would mean overriding the section's inline height.

## 2026-10-28 Section 05 rewritten as background

The testimonial slider in section 05 is gone. `personalizeCareerPage()` now clears `[data-framer-name="Testimonial Interaction"]` and mounts a first-person block: a lead paragraph, then three rows (01 工作过的地方 / 02 常用工具 / 03 学校) each with one of the user's three portraits and resume facts, namely 浙江树外科技 2025.08-2026.09, 义乌临祥纺织 2023.06-2024.04, the C4D/Redshift/OC/Photoshop/ComfyUI/Codex/影刀 toolset, and 长春光华学院 影视摄影与制作 2021-2025. The section label became (我的经历); the prev/next slider buttons were removed with the slider.

Assets: section05-orange.jpg, section05-blue.jpg and section05-study.jpg in public/assets. Verified 1440x900 and 390x844 with no horizontal overflow; images stack above their copy below 810px.

## 2026-10-28 Section 06 archive restored

The archive section was still showing the template rows (Outside / Juvéde / Zaine / Wall Out / Geaton / Skate with framerusercontent thumbnails) because the 2026-10-09 selectors no longer matched. `personalizeArchive()` now clears that row container and mounts five real rows: 系列海报与城市视觉 (/work/selected-1/), 雪憨憨 IP 视觉系统 (/work/selected-2/), 手串 AI 电商视觉 (/work/selected-3/), 1688 数据自动化 (/work/selected-4/), AI 短视频 (/work/portfolio/ai-video-workflow/), each with three local thumbnails from `assets/archive-selected/1-3`, `assets/portfolio/rpa-case/` and `assets/ai-video-collection/` respectively.

Each row is an anchor to its case page. The year renders as a div, not a span, because the legacy archive rewriter still rewrites `p,span` text matching a year into `2-26`. Verified 1440x900 and 390x844: five rows, no horizontal overflow.

## 2026-10-28 Section 05 back to template

Section 05 returned to the template testimonial slider (user: the row layout looked worse). `personalizeCareerPage()` no longer clears the interaction stage; it only rewrites content in place: label (我的经历), big portrait /assets/section05-orange.jpg, avatar /assets/section05-blue.jpg, name 李卓, role 电商视觉设计 / AI 内容与流程优化, stat columns 60% / 7 / 95%+ (效率提升, 流程优化后) and 20+ / 47 / 11 (交付成果, 真实项目), template client logo hidden. The stat columns stack three numbers vertically and clip to the first, so only 60% and 20+ are visible - by design of the template component.

`personalizeCareerQuote()` now rewrites the reveal component in place instead of replacing its host, so the per-line animation survives: the aria-hidden copy gets the full quote and the six line spans get `careerQuoteLines` (single lines must stay <= about 13 characters or a line wraps and breaks the rhythm). Fallback `splitQuoteFor()` splits by character count when a breakpoint has a different span count.

## 2026-10-28 Section 06 inline preview and new projects

Archive row 2 is now 瑜伽服 AI 电商视觉 (/assets/archive-selected/4-1..3.png) and row 3 高跟鞋 AI 电商视觉 (5-1..3.png), replacing 雪憨憨 IP and 手串. Rows are `<button class="portfolio-archive-row">`, not anchors: clicking any part of the row opens the existing `.archive-viewer` dialog with that project's images, caption `title · n / total`, arrows modal-wrapped over the current image count, Escape/backdrop/close. The page URL and scroll position stay put; nothing navigates. Thumbnails use `object-position:center top` so portrait work is not cropped at the head.

Verified 1440x900 and 390x844: five rows, yoga/heels titles and images, dialog opens on click with 1/3, no horizontal overflow. Build passes.

Pending: the user wants an AI 人物视频 added to the AI 短视频 row; the file has not been located yet (ai-film-beacons-to-answers.mp4 is a motion-graphics film, not a person video).

## 2026-10-28 Section 05 slider gets three real slides

The template arrows did nothing (single-slide testimonial). `careerSlides` now holds three slides and `renderCareerSlide()` swaps big portrait, small avatar and the six quote lines; the arrows (`[data-highlight]`, index 0 = prev, 1 = next) are bound once via `section.dataset.slidesBound` and cycle with a 200ms opacity fade. The user then simplified it: the small avatar mirrors the big portrait of whatever slide is showing, and the duplicate portrait was removed. Slides are now orange / blue (kept because the user likes it) / slide-2, with `({src})` driving both slots. The lamp portrait that was byte-identical in three files (`section05-slide-3.jpg`, `section05-study.jpg`, `section05-portrait.jpg`) was deleted. Files live as `/assets/section05-slide-2.jpg` and `section05-slide-3.jpg` (slide 3 is byte-identical to the older `section05-study.jpg`). Quote line arrays stay around 12-13 characters per line; a longer line wraps inside its span and breaks the rhythm. `careerQuote` / `personalizeCareerQuote` no longer exist; the quote lives in the slides.

Verified 1440x900: next/prev cycle 1-2-3-2, each slide swaps image and text, no overflow. 390x844: text swaps, no overflow (the mobile variant has no big portrait slot).

## 2026-10-28 AI video row plays real video

The AI 短视频 archive row used the image viewer, so every clip opened as a still. `archiveRows[4]` now carries a `videos` list (四季 / 知音 · AI 人物 / 将进酒 with their local mp4 paths) and `openArchiveVideo()` mounts a second `dialog.archive-viewer` holding a `<video controls>`: clicking a poster starts that clip, arrows move through the three clips, close/Escape/backdrop pause and clear the source, page URL and scroll stay put.

The user's `13437140754433913.mp4` is the same 12.1s 720x1280 clip already shipped as `/assets/ai-video-collection/zhiyin.mp4` (the copy made from the Desktop file was byte-different but identical duration/dimensions and has been removed), so 知音 is the AI 人物视频 that was asked for; no fourth card was added.

Verified 1440x900: click on 知音 poster opens the player, `paused:false`, currentTime advancing, duration 12.1; next switches to 将进酒; close pauses and restores scroll.

## 2026-10-28 Section 05: template slider was hijacking real clicks

On a real mouse click the template's own arrow handler advanced its internal testimonial slide and re-rendered the card, which brought back the template photos (the three-person avatar) and new image nodes that our selectors no longer matched. Synthetic `element.click()` never reproduced it, so earlier checks passed while the user kept seeing the stock avatar.

`bindCareerSlides()` now registers one document-level capture listener (`window.__careerSlidesBound`) for `pointerdown`/`mousedown`/`touchstart`/`click` that stops the event before it reaches Framer and steps our slide on `pointerdown` only. It must be bound once, not per section, or one click steps twice. `setImage()` also strips `srcset`/`sizes` every pass so a re-rendered `<img>` can never win with the remote template source.

Verified with trusted `Input.dispatchMouseEvent` clicks at 1440x900 and 390x844: 1-2-3 and back 3-2, big and small images and all six lines change together, no template photo reappears.

## 2026-10-28 Section 06 no longer flashes on load

Every refresh showed rows popping in and disappearing. Cause: each template row sits in its own `ssr-variant` wrapper, so `first.parentElement` was a *row wrapper*, not the list - the old code injected a complete five-row list into every one of those wrappers (four copies on screen), and Framer hydration then removed the unused variants, which read as content appearing and vanishing.

`personalizeArchive()` now clears and mounts into the single `[data-framer-name="List"]` container and re-mounts whenever our `.portfolio-archive` node is missing (React can wipe it). An `#portfolio-anti-flash` style in `index.html` keeps any leftover template `.framer-1gjgywn-container` rows invisible so they can never paint. Do not go back to mounting per row-wrapper.

Measured from navigation: five rows and exactly one list at 286ms, still 5/1 at 0.7s, 1.6s, 3s and 5s; 390x844 gives 5 rows, one list, no horizontal overflow; row image preview and the AI video player still open from the new buttons.

## 2026-10-28 Sections 07 and 08 rebuilt

07 (`section[data-framer-name="Stats"]`): `personalizeAiCapabilities()` replaces the template `[data-framer-name="Cards"]` body with a hairline 2x2 grid (`.ai-cap-grid`), one card per capability (AI Native / Agent Systems / Reusable Skills / Creative Pipeline), each with an index, corner mark, Chinese label and body copy, plus a one-line lead. Hover inverts the card to near-black with a lime top rule, a cursor-follow spotlight (`--mx/--my`), a 7-9deg pointer tilt (`--rx/--ry`) and a 4px heading lift; cards fade up in sequence through an IntersectionObserver. Tilt is skipped when `(hover:hover)` does not match.

08 (`section[data-framer-name="Article"]`): `personalizeAiReel()` swaps the four remote template renders for a six-card horizontal reel of real work (poster, yoga, heels, AI character video poster, workbench UI, RPA map) with a lead line, prev/next buttons, pointer dragging, scroll-snap and per-card tilt/hover zoom. Clicking a card opens the shared `.archive-viewer` with the six images and the caption `AI IN ACTION · n / 6`.

Both mount into their section's own container and call `relaxHeight()` so the fixed template heights do not clip the new blocks; both are re-mountable (guarded by the presence of `.ai-cap-grid` / `.ai-reel`). Verified 1440x900 and 390x844: 4 cards, 6 cards, hover invert and tilt, arrow scroll 0 to 410px, preview opens, no horizontal overflow at rest or while hovered.

## 2026-10-28 Section 08: duplicate reel replaced by workbench anatomy

The user pointed out that the six-card reel repeated section 06's project list. `personalizeAiReel()` was replaced by `personalizeWorkbench()`: 08 now explains the image-generation workbench from the resume (素材上传 / 参数设置 / 批量任务 / 进度查看 / 失败重试 / 历史与下载) as a six-item list wired to the three local UI screenshots (`workbench-case/ui-01..03.png`). Hovering, clicking or focusing a row swaps the screenshot with a 170ms fade, moves the active row to a black state, and updates the caption `FORMA 工作台 · 工具模式 0n / 03`; the stage tilts 3-4deg with the pointer. A metrics line carries 60% / 6 / 3.

Verified 1440x900 and 390x844: six rows, first row active on load, hovering row 05 switches to ui-03 and updates the caption, no horizontal overflow. The old `.ai-reel*` CSS is now unused and can be removed.

## 2026-10-28 Section 08 is now a workflow rail

The user noted the workbench already appears near the top of the page and asked for a workflow instead. `personalizeWorkflow()` replaced the workbench block: a six-node rail with two switchable flows. 商品图批量生产 (需求与素材 / 参考拆解 / ComfyUI 搭流 / 批量生成 / 候选筛选 / 精修交付) and AI 短视频生成 (选题与检索 / 参考拆解 / 生成任务 / 候选比较 / 质检与后期 / 归档复用); every node carries the tool chips and one-line method that the resume supports.

Behaviour: hovering, focusing or clicking a node updates the detail block (title, description, tool chips) and moves the lime dot; the rail has a slow light sweep that stops under `prefers-reduced-motion`; the two tabs repaint the rail with a 150ms cross-fade; under 809px the rail turns vertical. Do not add autoplay here - the user wants control-driven motion.

Verified 1440x900 and 390x844: six nodes per flow, node 04 switches the detail to 批量生成, tab 2 lists the video flow, no horizontal overflow. The `.wb-*` and `.ai-reel*` CSS blocks are now dead and can be pruned.

## 2026-10-28 ComfyUI screenshot wired into the workflow

The user supplied a real ComfyUI graph screenshot (2560x1270, with a red rectangle drawn around the UNet loader) and asked whether it can be shown. It is now `public/assets/workbench-case/comfy-workflow.png` and hangs off node 03 of the 商品图批量生产 flow: the detail block shows a 740x236 crop (`.wf-shot`) under the description, hovering lifts it, and clicking opens the shared image viewer at full size (caption `ComfyUI 节点工作流 · 1 / 1`). Other nodes carry no image, so the figure stays hidden for them.

The red rectangle is the user's own annotation; it is kept for now. If it should read as a callout rather than an edit mark, either recrop to the graph area only or restyle the highlight - ask before changing the source screenshot.

## 2026-10-28 ComfyUI screenshot v2

The user replaced the graph with a newer build (grouped 素材区 / 模型区 / 参考融合区 / 采样区 / 输出, with the reference cat and product images). Same path `public/assets/workbench-case/comfy-workflow.png`. The thumbnail now hugs the image (`width:fit-content`, 326px tall, object-fit contain) instead of sitting in a wide black letterbox, and collapses to full width with `height:auto` under 809px. Click still opens the full graph in the shared viewer.

## 2026-10-28 Workflow nodes carry evidence images

Every node of the 商品图批量生产 flow now has an image, all from real material: 01 需求与素材 = `workbench-case/ui-01.png` (直接生图 interface), 02 参考拆解 = `workbench-case/comfy-fusion.png` (crop of the 参考融合区 group out of the ComfyUI graph), 03 ComfyUI 搭流 = `workbench-case/comfy-workflow.png`, 04 批量生成 = `workbench-case/ui-03.png`, 05 候选筛选 = `workbench-case/candidates.jpg` (5x2 contact sheet generated with Pillow from `generation-workbench/batch-people`), 06 精修交付 = `assets/capability-product-bottle.jpg`. The AI 短视频 flow has three (01 zhiyin poster, 03 seasons poster, 05 jiangjinjiu poster); the other nodes stay text-only until real screenshots exist.

The figure block hides itself when a node has no `image`, opens the full file in the shared viewer on click, and the thumbnail is capped at `max-height:326px` with `width:auto` so portrait assets do not stretch the layout.

## 2026-10-28 AI video flow gets real evidence shots

The user supplied phone/desktop screenshots of how the video work is actually produced. Four were cropped with Pillow (status bar, input bar and keyboard removed) into `public/assets/ai-video-collection`: `video-brief.jpg` (快手参考链接 + 需求原话), `video-storyboard.jpg` (分镜脚本文档卡), `video-prompt.jpg` (复刻参数 + CliPCat 提示词), `video-result.jpg` (生成完成的成片 + 九镜头说明). They now hang off flow 2 nodes 01 / 02 / 03 / 04; node 05 keeps the 将进酒 poster and node 06 stays text-only.

The viewer caption is now generic (点击查看大图) and the lightbox title follows the node (工作流 · 参考拆解) instead of always saying ComfyUI. Do not paste raw phone screenshots into the page without cropping - the status bar and the input bar read as noise.

## 2026-10-28 Video flow tail corrected

The last two nodes of the AI 短视频 flow were wrong: 05 pointed at the 将进酒 poster (a different project) and 06 had no image. Now 05 is 质检与成片 with `video-final.jpg` (crop of the finished 道长 still out of the generation-result screenshot, 184x318) and 06 is renamed 规范与复用 with `video-template.jpg` (the 脚本已完成 / 文档包含 section of the storyboard doc, 1131x750) - that is the part of the user's real routine where the run is written down as a reusable spec. If a screenshot of the task log table ever arrives, it belongs in 06 instead.

## 2026-10-28 Software marquee expanded

`personalizeSoftwareMarquee()` now cycles 18 tools instead of 12, ordered AI-first: FORMA / AI 生图, ComfyUI, DeepSeek, Codex, Claude, WorkBuddy, 剪映 / CapCut, ClipCat, Premiere Pro, After Effects, Photoshop, Illustrator, Cinema 4D, Redshift, Octane Render, 影刀 RPA, 九数云, API. Names are assigned by index into the loop list (the ul holds several cycles of the set), so keep the array length and the visible cycle in mind when adding more - adding a name now also lengthens the copied cycle, which is what the loop relies on.

## 2026-10-28 Portfolio stack: stock template card replaced

The stacked viewer behind 查看作品集 still had one card that was not the user's work: case 2 pointed at `/portfolio-template/index.html` (the 11-page layout system) and used its stock mug-girl cover. It now points at the real 电商详情页 case `/work/portfolio/noara-willis/` with cover `/assets/detail-cases/case-1-cover.jpg` and the summary 三套详情页 / 分屏结构 / 完整交付. The stack markup, blur/inset composition and scroll animation are untouched, so only the content changed - keep it that way when swapping covers.

## 2026-10-28 Real works index + CTA retarget

`public/work/portfolio/index.html` was a redirect stub back to `/`, so the 03 CTA (查看作品集) and the See all card both dumped the visitor on the homepage or, through the hash route, on the template-style `/about` page. The stub is now a real works index built on `portfolio-pages.css` (dark page, nav, header, `.cards` grid): seven cards - AI 甜芽 IP, 电商详情页 (noara-willis), 生图工作台, 跨境短视频粗剪, 系列海报, 瑜伽服商品视觉, 高跟鞋视觉 - each with its own cover and a one-line summary; the last three link to `/#more-work` because their standalone pages are still the old ones.

`personalizeCapabilityHeadline()` now points the 查看作品集 link at `/work/portfolio/` instead of `#portfolio` (the hash route landed on the template /about page, which is what the user saw as "someone else's work").

## 2026-10-28 全站清理与统一（DSH 会话）

用户要求：删掉全部 Fuel 模板痕迹、统一首页与子页设计、修好导航/移动端/锚点、清理源码。

已完成（均已浏览器验证，桌面 1440×900 + 移动 390×844）：

1. `index.html` head 重写：title/description/og/twitter/canonical/favicon/lang=zh-CN，canonical 与 og:url 不再指向 fuel.framer.website；新增 `/assets/og-cover.jpg`（1200×630）与 `/assets/hero-poster.jpg`。
2. 模板文案：Meet the CEO / Lousiana KD6 / CEO、01/ Strategy、Videography、Branding、within 24 hours、We Are Faster…、Contact Now、See all (07)、《见 Fuel®》那段英文工作室介绍，全部替换为中文个人内容。客户端由 Framer 远程 bundle 渲染，静态 HTML 改不到，因此新增 `public/portfolio-shell.js` 在运行时兜底替换（`rewriteCopy()`）。
3. 顶部导航中文化（首页/作品集/关于我/联系我），链接统一尾斜杠；子页 nav 改为 `XIAOLI® + 四个链接`，与首页同一套标识。
4. 移动端：Framer 原生汉堡菜单失效（导航被渲染在页面底部 y≈14900），改为 shell 自建 fixed 全屏菜单（#x-menu），含 tel: 电话；手机端首屏视频 `object-position:68% 40%` + poster 背景。
5. 作品集第 2 个案例：href 从 `/portfolio-template/index.html?squares=removed` 改为 `/portfolio-template/`，副标题改为「三套详情页 / 分屏结构 / 完整交付」。
6. `/work/portfolio/` 原本是跳回首页的 redirect，已重写为真实作品列表页（4 个案例，复用 portfolio-pages.css 的 .cards）。
7. 可访问性：全页只保留 1 个 h1（装饰性 01/02/03 降级为 div + aria-hidden）、图片补 alt、`:focus-visible` 青柠描边、`role="main"`、电话改 tel:。
8. 归档：dist-react-preview、netlify-source-20261026、output、outputs、generated_*、dist 内 *.backup-*、fuel-reference.html、index-personal-backup.html 已移动到 `作品集网站搭建\_archive-20261028\`（未删除）。
9. 重复指标：Testimonial 区块里重复的 60% / 20+ 已隐藏；FAQ 分区标签从「我的优势」改为「(09) 常见问题」。

注意事项：
- 站点由 `vite preview` 直接服务 `dist/`，本次是「改 index.html + public/ → 复制到 dist/」。`npm run build` 走的是遗留 React 代码，**会覆盖 dist**，不要直接跑。
- `public/portfolio-shell.js` 是对 Framer 客户端渲染的补丁层，依赖 `#main` 与文本内容匹配；若以后替换 Framer 页面，需要同步更新它的 COPY 表。
- 移动端仍有 2 条 Framer 自带的 IndexSizeError（改动前就存在），不影响渲染。

## 2026-10-28 首屏视频回退修复

事故：把 `index.html` 同步进 `dist/` 时，丢掉了两条原有引用 —— `<link rel="stylesheet" href="/assets/index-CTie4ior.css">` 与 `<script type="module" src="/assets/index-CsrpCSLq.js">`。首屏视频（`.xiaoli-hero-layer > video.xiaoli-hero-video`，源 `/assets/portfolio-hero-kling.mp4`）正是由该脚本注入，CSS 里负责该层的定位，于是首屏退回模板的静态背景图，看起来像"视频被换了"。

修复：两条引用已补回 `dist/index.html`，视频与流体效果（canvas.xiaoli-fluid）恢复。视频文件本身从未被修改（MD5 `4CDCBDAC11671A187ECEE79A13DE230B`，mtime 2026-10-08 16:38:54）。

另外撤掉了本轮对首屏的两处干预：移动端 `object-position` 调整、video 的 poster 背景，均已删除，不要再加。
