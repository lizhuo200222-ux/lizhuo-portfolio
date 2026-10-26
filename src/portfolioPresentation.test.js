import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as portfolioData from './data.js';

const stylesSource = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');
const indexSource = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const mainSource = readFileSync(new URL('./main.jsx', import.meta.url), 'utf8');
const fanSource = readFileSync(new URL('./components/FanGallery.jsx', import.meta.url), 'utf8');
const masonrySource = readFileSync(new URL('./components/Masonry.jsx', import.meta.url), 'utf8');
const masonryStyles = readFileSync(new URL('./components/Masonry.css', import.meta.url), 'utf8');

test('IP consistency presentation uses real work from all three IP systems', () => {
  assert.ok(Array.isArray(portfolioData.ipConsistencyItems), 'ipConsistencyItems must be exported');
  assert.equal(portfolioData.ipConsistencyItems.length, 5);
  assert.deepEqual(
    new Set(portfolioData.ipConsistencyItems.map((item) => item.caseId)),
    new Set(['tea-case', 'kitten-case', 'ip-case']),
  );
  assert.ok(portfolioData.ipConsistencyItems.every((item) => item.image && item.label && item.alt && item.link));
});

test('legacy AI lab removes the duplicate IP consistency surface', () => {
  assert.doesNotMatch(mainSource, /id="ai-consistency"/);
  assert.doesNotMatch(mainSource, /items=\{ipConsistencyItems\}/);
  assert.doesNotMatch(stylesSource, /ai-consistency/);
});

test('poster depth carousel exposes a larger moving stage', () => {
  const depthSource = readFileSync(new URL('./components/DepthCarousel.jsx', import.meta.url), 'utf8');
  const depthStyles = readFileSync(new URL('./components/DepthCarousel.css', import.meta.url), 'utf8');
  assert.match(depthSource, /setInterval/);
  assert.match(depthSource, /loop/);
  assert.match(depthStyles, /--depth-card-height/);
  assert.match(stylesSource, /\.poster-gallery-frame \.depth-carousel \{[^}]*min-height: clamp\(460px, 32vw, 500px\)/s);
});

test('poster fan gallery uses the complete supplied poster collection', () => {
  assert.equal(portfolioData.posterGalleryItems.length, 47);
  assert.equal(new Set(portfolioData.posterGalleryItems.map((item) => item.image)).size, 47);
  assert.ok(portfolioData.posterGalleryItems.every((item) => item.image.startsWith('/assets/portfolio/dome-posters/collection/')));
});

test('poster fan gallery keeps horizontal pointer dragging available', () => {
  const fanSource = readFileSync(new URL('./components/FanGallery.jsx', import.meta.url), 'utf8');
  const fanStyles = readFileSync(new URL('./components/FanGallery.css', import.meta.url), 'utf8');
  assert.match(fanSource, /onLostPointerCapture=\{handlePointerUp\}/);
  assert.match(fanSource, /event\.preventDefault\(\)/);
  assert.match(fanStyles, /touch-action: none/);
});

test('generation workbench uses a manual interface carousel and compact result grids', () => {
  assert.match(mainSource, /generation-workbench-ui-carousel/);
  assert.match(mainSource, /<MorphSlider[\s\S]*autoplay=\{false\}/);
  assert.match(mainSource, /batchMasonryItems[\s\S]*height: \[220, 190, 240, 200, 225\]/);
  assert.match(mainSource, /selectedMasonryItems[\s\S]*height: \[150, 150, 200, 170, 170\]/);
  assert.match(stylesSource, /\.generation-workbench-ui-carousel \{[^}]*min-height: clamp\(520px, 46vw, 650px\)/s);
  assert.match(stylesSource, /\.generation-batch-masonry \{[^}]*max-width: 900px/s);
  assert.match(stylesSource, /\.generation-selected-masonry \{[^}]*max-width: 820px/s);
});

test('people wall is removed while the reusable dome keeps the reference geometry', () => {
  const domeSource = readFileSync(new URL('./components/DomeGallery.jsx', import.meta.url), 'utf8');
  const domeStyles = readFileSync(new URL('./components/DomeGallery.css', import.meta.url), 'utf8');
  assert.doesNotMatch(mainSource, /<AiPeopleCase\s*\/>/);
  assert.doesNotMatch(mainSource, /<DomeGallery/);
  assert.match(domeSource, /dome-gallery-label/);
  assert.match(domeSource, /DEFAULT_SEGMENTS = 35/);
  assert.match(domeStyles, /\.item \{[^}]*transform: rotateY\(/s);
  assert.match(domeStyles, /\.edge-fade \{[^}]*filter: blur\(7px\)/s);
});

test('poster section uses the supplied depth carousel with image enlargement', () => {
  const depthSource = readFileSync(new URL('./components/DepthCarousel.jsx', import.meta.url), 'utf8');
  const depthStyles = readFileSync(new URL('./components/DepthCarousel.css', import.meta.url), 'utf8');
  assert.match(mainSource, /<DepthCarousel[\s\S]*cardHeight=\{350\}[\s\S]*radius=\{20\}[\s\S]*duration=\{900\}/);
  assert.match(depthSource, /ImageLightbox/);
  assert.match(depthSource, /cardHeight/);
  assert.match(depthSource, /lightboxIndex/);
  assert.match(depthStyles, /--depth-card-height/);
  assert.match(depthStyles, /--depth-radius/);
  assert.match(depthSource, /onPointerDown/);
  assert.match(depthSource, /onPointerMove/);
  assert.match(depthSource, /setPointerCapture/);
  assert.match(depthSource, /suppressClick = moved && Math\.abs\(distance\) > 24/);
  assert.match(depthSource, /onKeyDown=\{\(event\) =>/);
  assert.match(depthStyles, /touch-action: none/);
});

test('legacy portfolio removes the people image wall and keeps project navigation usable', () => {
  assert.doesNotMatch(mainSource, /<AiPeopleCase\s*\/>/);
  assert.doesNotMatch(mainSource, /<DomeGallery/);
  assert.match(mainSource, /href="#poster-gallery">PROJECTS/);
});

test('legacy hash links settle after asynchronous media layout', () => {
  assert.match(mainSource, /function useHashScroll/);
  assert.match(mainSource, /target\.scrollIntoView\(\{ block: 'start', behavior: 'auto' \}\)/);
  assert.match(mainSource, /useHashScroll\(\);/);
});

test('about profile heading uses variable proximity letters', () => {
  const proximitySource = readFileSync(new URL('./components/VariableProximity.jsx', import.meta.url), 'utf8');
  assert.match(mainSource, /<VariableProximity/);
  assert.match(mainSource, /containerRef=\{profileHeadingRef\}/);
  assert.match(proximitySource, /fromFontVariationSettings/);
  assert.match(proximitySource, /fontVariationSettings/);
  assert.match(proximitySource, /requestAnimationFrame/);
});

test('poster presentation includes all cat and general poster assets', () => {
  assert.equal(portfolioData.posterGalleryItems.length, 47);
  const filenames = portfolioData.posterGalleryItems.map((item) => item.image.split('/').pop());
  assert.ok(filenames.includes('001-item-291855.jpg'));
  assert.ok(filenames.includes('task-110894-item-293547.jpg'));
  assert.ok(portfolioData.posterGalleryItems.every((item) => item.title && item.alt));
});

test('bracelet main images are ready for AccordionGallery', () => {
  assert.equal(portfolioData.braceletCase.main.length, 5);
  assert.ok(
    portfolioData.braceletCase.main.every(
      (item) => item.image && item.title && item.label && item.alt && item.link === '#bracelet-case',
    ),
  );
  assert.match(stylesSource, /\.accordion-item img \{[^}]*object-fit: cover;/s);
  assert.match(stylesSource, /\.accordion-item \{[^}]*border-radius: 14px;/s);
  const accordionSource = readFileSync(new URL('./components/AccordionGallery.jsx', import.meta.url), 'utf8');
  assert.match(accordionSource, /gallery\.scrollTo\(\{ left:/);
  assert.match(accordionSource, /if \(isHoverMode \|\| item\.link === '#'\) event\.preventDefault\(\);/);
});

test('automation presentation defines the guided flow and reliability branches', () => {
  assert.ok(Array.isArray(portfolioData.automationFlowStages), 'automationFlowStages must be exported');
  assert.equal(portfolioData.automationFlowStages.length, 5);
  assert.deepEqual(
    portfolioData.automationFlowStages.map((stage) => stage.id),
    ['input', 'normalize', 'lookup', 'reconcile', 'publish'],
  );
  assert.ok(Array.isArray(portfolioData.automationReliabilityBranches));
  assert.equal(portfolioData.automationReliabilityBranches.length, 3);
  assert.ok(portfolioData.automationReliabilityBranches.every((branch) => branch.title && branch.copy));
});

test('automation presentation explains the migration from ShadowBot RPA to scheduled Codex runs', () => {
  assert.ok(Array.isArray(portfolioData.automationEvolutionStages), 'automationEvolutionStages must be exported');
  assert.deepEqual(
    portfolioData.automationEvolutionStages.map((stage) => stage.id),
    ['shadowbot', 'codex-migration', 'scheduled-crawl', 'stable-run'],
  );
  assert.match(portfolioData.automationEvolutionStages[1].copy, /Codex/);
  assert.match(portfolioData.automationEvolutionStages[2].copy, /定时爬取/);
  assert.match(portfolioData.automationEvolutionStages[3].copy, /不再依赖影刀滑块/);
});

test('bracelet detail presentation uses a compact inspection viewport', () => {
  assert.match(stylesSource, /\.commercial-detail-slider \{[^}]*width: min\(100%, 680px\)/s);
  assert.match(stylesSource, /\.commercial-detail-slider \.morph-slider \{[^}]*min-height: clamp\(390px, 40vw, 520px\)/s);
  assert.match(stylesSource, /\.commercial-detail-slider \.morph-slider \{[^}]*max-height: 520px/s);
  assert.match(stylesSource, /@media \(max-width: 900px\)[\s\S]*\.commercial-detail-slider \{[^}]*width: min\(100%, 620px\)/s);
});

test('profile skills foreground batch image work and the concise AI video workflow', () => {
  const aiContent = portfolioData.strengths.find((item) => item.title === 'AI 设计提效');
  assert.ok(aiContent);
  assert.match(aiContent.copy, /批量生图/);
  assert.match(aiContent.copy, /批量洗图/);
  assert.ok(aiContent.tools.includes('AI 视频复刻'));
  assert.ok(aiContent.tools.includes('自动粗剪'));
  assert.ok(portfolioData.videoWorkflowSkill);
  assert.match(portfolioData.videoWorkflowSkill.title, /复刻|生成/);
  assert.match(portfolioData.videoWorkflowSkill.copy, /剪映/);
  assert.equal(portfolioData.videoWorkflowSkill.media.length, 2);
  assert.ok(portfolioData.videoWorkflowSkill.media.every((item) => item.src.startsWith('/assets/portfolio/video-workflow/')));
});

test('legacy portfolio summary preserves its existing work directions and order', () => {
  assert.ok(Array.isArray(portfolioData.selectedWorksSummary));
  assert.equal(portfolioData.selectedWorksSummary.length, 3);
  assert.deepEqual(
    portfolioData.selectedWorksSummary.map((item) => item.href),
    ['#bracelet-case', '/portfolio-template/index.html', '#poster-gallery'],
  );
  assert.ok(portfolioData.selectedWorksSummary.every((item) => item.title && item.image && item.alt));
  assert.equal(portfolioData.selectedWorksSummary[1].title, '电商图');
  assert.equal(portfolioData.selectedWorksSummary[1].image, '/assets/ecommerce-model-cover.png');
  assert.equal(portfolioData.selectedWorksSummary[1].href, '/portfolio-template/index.html');
  assert.equal(portfolioData.selectedWorksSummary[1].copy, '');
  assert.match(mainSource, /function SelectedWorksSummary/);
  assert.match(mainSource, /className="selected-works-grid"/);
  assert.match(stylesSource, /\.selected-works-grid \{[^}]*height: clamp\(360px, 28vw, 500px\);[^}]*min-height: 0;/s);
  assert.ok(mainSource.indexOf('<SelectedWorksSummary />') > mainSource.indexOf('<section className="experience-section"'));
  assert.ok(mainSource.indexOf('<SelectedWorksSummary />') < mainSource.indexOf('<CoreStrengthsSummary />'));
});

test('legacy portfolio keeps its motion surfaces without adopting the rejected layout rewrite', () => {
  assert.match(mainSource, /<HeroMedia \/>/);
  assert.match(mainSource, /<CircularGallery/);
  assert.match(mainSource, /<DepthCarousel/);
  assert.doesNotMatch(mainSource, /<AiPeopleCase\s*\/>/);
  assert.doesNotMatch(mainSource, /portfolio-flow/);
  assert.match(mainSource, /colors=\{\['#c8ff36', '#74d8c4', '#e6a078'\]\}/g);
  assert.doesNotMatch(mainSource, /#c084fc|#f472b6|#38bdf8/);
  assert.doesNotMatch(stylesSource, /132, 0, 255|#38bdf8|#f472b6/);
});

test('selected works stays within a single desktop viewport', () => {
  assert.match(stylesSource, /\.selected-works\.section \{[^}]*padding: 44px 0 52px;/s);
  assert.match(stylesSource, /\.selected-works-grid \{[^}]*height: clamp\(360px, 28vw, 500px\);[^}]*min-height: 0;/s);
  assert.match(stylesSource, /@media \(max-width: 560px\)[\s\S]*\.selected-works-grid \{[^}]*height: auto;/s);
});

test('hero gallery exposes a continuous set of real portfolio work', () => {
  assert.equal(portfolioData.heroGalleryItems.length, 12);
  assert.equal(new Set(portfolioData.heroGalleryItems.map((item) => item.image)).size, 12);
  assert.ok(portfolioData.heroGalleryItems.every((item) => item.image.startsWith('/assets/') && item.text));
});

test('core strengths use five interactive cards with a lime hover state', () => {
  assert.equal(portfolioData.strengths.length, 5);
  assert.ok(portfolioData.strengths.every((item) => item.number && item.title && item.copy && item.icon));
  assert.match(stylesSource, /\.strength-card:hover[\s\S]*background: var\(--hero-lime\)/);
  assert.match(stylesSource, /\.strength-card:focus-visible[\s\S]*background: var\(--hero-lime\)/);
  assert.match(stylesSource, /\.strength-card-glow:nth-child\(-n \+ 2\)/);
});

test('dense evidence galleries preserve readable image proportions', () => {
  assert.match(mainSource, /className="bracelet-process-masonry"/);
  assert.match(mainSource, /className="rpa-evidence-masonry"/);
  assert.match(mainSource, /className="bracelet-process-masonry"[\s\S]*fit="contain"/);
  assert.match(mainSource, /className="rpa-evidence-masonry"[\s\S]*columns=\{2\}[\s\S]*fit="contain"/);
  assert.match(masonryStyles, /\.masonry\.is-contain \.masonry-item \{[^}]*aspect-ratio: auto !important;[^}]*min-height: 0;/s);
  assert.match(masonryStyles, /\.masonry\.is-contain \.masonry-item img \{[^}]*height: auto;[^}]*object-fit: contain;/s);
  assert.match(masonrySource, /columns/);
});

test('poster fan gallery uses a small self-moving inner card layer', () => {
  assert.match(fanSource, /useEffect/);
  assert.match(fanSource, /setInterval/);
  assert.match(fanSource, /fan-gallery-card-inner/);
  assert.match(fanSource, /onPointerDown/);
  assert.match(fanSource, /setPointerCapture/);
  const fanStyles = readFileSync(new URL('./components/FanGallery.css', import.meta.url), 'utf8');
  assert.match(fanStyles, /@keyframes fan-card-idle/);
  assert.match(fanStyles, /animation: fan-card-idle 12s/);
  assert.match(fanStyles, /cursor: grab/);
});

test('morph sliders autoplay only while engaged', () => {
  const morphSource = readFileSync(new URL('./components/MorphSlider.jsx', import.meta.url), 'utf8');
  assert.match(morphSource, /const \[isEngaged, setIsEngaged\]/);
  assert.match(morphSource, /!isEngaged/);
  assert.match(morphSource, /onPointerEnter/);
  assert.match(morphSource, /onPointerLeave/);
});

test('page defaults to no translation and preserves the brand wordmark', () => {
  assert.match(indexSource, /<html lang="zh-CN" translate="no">/);
  assert.match(indexSource, /<meta name="google" content="notranslate"\s*\/>/);
  assert.match(mainSource, /className="wordmark notranslate"/);
  assert.match(mainSource, /className="hero-title notranslate"/);
});

test('automation evolution retains a scroll-driven presentation effect', () => {
  assert.match(mainSource, /import ScrollStack, \{ ScrollStackItem \} from '\.\/components\/ScrollStack';/);
  assert.match(mainSource, /automation-evolution-stack/);
  assert.match(mainSource, /ScrollStackItem/);
});

test('visible case surfaces keep continuous edge motion and the DriftWall effect', () => {
  assert.match(mainSource, /animated: true/);
  assert.match(mainSource, /import DriftWall from '\.\/components\/DriftWall';/);
  assert.match(mainSource, /bracelet-main-motion/);
});

test('circular gallery uses the requested compact hero-overlay configuration', () => {
  const circularSource = readFileSync(new URL('./components/CircularGallery.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(circularSource, /autoRotateSpeed\s*=/);
  assert.doesNotMatch(circularSource, /this\.scroll\.target \+= this\.autoRotateSpeed/);
  assert.doesNotMatch(circularSource, /function StaticGallery/);
  assert.doesNotMatch(circularSource, /circular-gallery-loading/);
  assert.match(mainSource, /bend=\{3\}/);
  assert.match(mainSource, /borderRadius=\{0\.05\}/);
  assert.match(mainSource, /scrollEase=\{0\.02\}/);
  assert.match(mainSource, /fontUrl="https:\/\/fonts\.googleapis\.com\/css2\?family=Playfair\+Display:wght@700&display=swap"/);
  assert.match(mainSource, /font="bold 30px Orbitron"/);
  assert.doesNotMatch(mainSource, /scrollSpeed=\{/);
  assert.match(stylesSource, /\.hero-gallery-section \{[^}]*height: 348px;[^}]*min-height: 348px;[^}]*margin-top: -250px;/s);
  assert.match(stylesSource, /\.hero-gallery-stage \{[^}]*top: 48px;[^}]*height: 300px;/s);
});

test('circular gallery restores the official React Bits geometry, titles, and continuous motion', () => {
  const circularSource = readFileSync(new URL('./components/CircularGallery.jsx', import.meta.url), 'utf8');

  assert.match(circularSource, /class Title/);
  assert.match(circularSource, /class Media/);
  assert.match(circularSource, /class App/);
  assert.match(circularSource, /createTextTexture/);
  assert.match(circularSource, /this\.plane\.scale\.y = \(this\.viewport\.height \* \(900 \* this\.scale\)\) \/ this\.screen\.height/);
  assert.match(circularSource, /this\.plane\.scale\.x = \(this\.viewport\.width \* \(700 \* this\.scale\)\) \/ this\.screen\.width/);
  assert.match(circularSource, /this\.padding = 2/);
  assert.match(circularSource, /this\.width = this\.plane\.scale\.x \+ this\.padding/);
  assert.match(circularSource, /heightSegments: 50,\s*widthSegments: 100/);
  assert.match(circularSource, /0\.1 \+ uSpeed \* 0\.5/);
  assert.match(circularSource, /this\.scroll\.target \+= \(delta > 0 \? this\.scrollSpeed : -this\.scrollSpeed\) \* 0\.2/);
  assert.match(circularSource, /this\.onCheckDebounce = debounce\(this\.onCheck, 200\)/);
  assert.match(circularSource, /tabIndex=\{0\}/);
  assert.match(circularSource, /textColor,\s*borderRadius,\s*font/s);
  assert.doesNotMatch(circularSource, /onActivate/);
  assert.doesNotMatch(circularSource, /seededOffset/);
  assert.doesNotMatch(circularSource, /className="circular-gallery-active-link"/);
  assert.match(stylesSource, /@media \(max-width: 900px\)[\s\S]*\.hero-gallery-section \{ height: 276px; min-height: 276px; margin-top: -200px; \}/s);
});

test('DriftWall passes React keys explicitly instead of spreading them into DOM props', () => {
  const driftSource = readFileSync(new URL('./components/DriftWall.jsx', import.meta.url), 'utf8');
  assert.match(driftSource, /const tileKey =/);
  assert.match(driftSource, /key=\{tileKey\}/);
  assert.doesNotMatch(driftSource, /const tileProps = \{\s*className:[\s\S]*key:/);
});
