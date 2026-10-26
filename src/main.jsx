import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowSquareOut,
  ArrowUpRight,
  BracketsCurly,
  Cube,
  EnvelopeSimple,
  FileText,
  FilmStrip,
  Kanban,
  MapPin,
  Phone,
  Sparkle,
  UsersThree,
  X,
} from '@phosphor-icons/react';
import {
  automationEvolutionStages,
  automationFlowStages,
  automationReliabilityBranches,
  braceletCase,
  generationWorkbench,
  heroGalleryItems,
  posterGalleryItems,
  portfolioCases,
  rpaCase,
  selectedWorksSummary,
  strengths,
  stats,
  timeline,
  videoWorkflowSkill,
} from './data';
import VariableProximity from './components/VariableProximity';
import AccordionGallery from './components/AccordionGallery';
import CircularGallery from './components/CircularGallery';
import BorderGlow from './components/BorderGlow';
import DepthCarousel from './components/DepthCarousel';
import Masonry from './components/Masonry';
import MorphSlider from './components/MorphSlider';
import DriftWall from './components/DriftWall';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack';
import SpotlightCard from './components/SpotlightCard';
import TiltedCard from './components/TiltedCard';
import './styles.css';

const iconMap = { cube: Cube, sparkle: Sparkle, code: BracketsCurly, kanban: Kanban, users: UsersThree };
const circularGalleryItems = heroGalleryItems;
const borderGlowProps = {
  edgeSensitivity: 30,
  glowColor: '40 80 80',
  backgroundColor: '#120F17',
  glowRadius: 40,
  glowIntensity: 1,
  coneSpread: 25,
  animated: true,
  colors: ['#c8ff36', '#74d8c4', '#e6a078'],
};

function scrollToTop(event) {
  event.preventDefault();
  window.history.replaceState(null, '', '#top');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function useHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#top') return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      target.scrollIntoView({ block: 'start', behavior: 'auto' });
    };
    let timers = [];
    const schedule = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [0, 220, 700, 1500, 2600].map((delay) => window.setTimeout(scrollToHash, delay));
    };
    schedule();
    window.addEventListener('hashchange', schedule);
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener('hashchange', schedule);
    };
  }, []);
}

function ImageWithFallback({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`image-fallback ${className}`} role="img" aria-label={`${alt}暂时无法加载`}>
        <span>视觉素材载入中</span>
      </div>
    );
  }
  return <img className={className} src={src} alt={alt} loading="eager" decoding="async" onError={() => setFailed(true)} />;
}

function AutoPauseVideo({ src, label }) {
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0.35 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  if (failed) {
    return <div className="video-fallback" role="status">{label} 暂时无法播放</div>;
  }

  return (
    <video
      ref={videoRef}
      src={src}
      aria-label={`${label}，自动循环动图`}
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      onError={() => setFailed(true)}
    />
  );
}

function HeroMedia() {
  const [videoState, setVideoState] = useState('loading');
  return (
    <div className={`hero-background is-${videoState}`} aria-hidden="true">
      <img
        className={`hero-background-poster ${videoState === 'failed' ? 'is-visible' : ''}`}
        src="/assets/hero-poster.png"
        alt=""
      />
      <video
        className={`hero-background-video ${videoState === 'ready' ? 'is-ready' : ''}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/hero-poster.png"
        onCanPlay={() => setVideoState('ready')}
        onError={() => setVideoState('failed')}
      >
        <source src="/assets/hero-user.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy, light = false }) {
  return (
    <div className={`section-heading ${light ? 'section-heading-light' : ''}`} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </div>
  );
}

function SelectedWorksSummary() {
  return (
    <section className="selected-works section" id="selected-works">
      <div className="selected-works-shell shell">
        <div className="summary-heading" data-reveal>
          <h2>SELECTED WORKS <ArrowDownRight size={24} weight="bold" aria-hidden="true" /></h2>
          <span>作品概览</span>
        </div>
        <div className="selected-works-grid" data-reveal>
          {selectedWorksSummary.map((item, index) => (
            <a className={`selected-work-card selected-work-card-${index + 1}`} href={item.href} key={item.title}>
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
              <span className="selected-work-shade" aria-hidden="true" />
              <span className="selected-work-copy">
                <strong>{item.title}</strong>
                {item.copy ? <small>{item.copy}</small> : null}
              </span>
              <ArrowDownRight className="selected-work-arrow" size={22} weight="bold" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoreStrengthsSummary() {
  return (
    <section className="strengths section shell" id="strengths">
      <div className="summary-heading" data-reveal>
        <h2>CORE STRENGTHS <ArrowDownRight size={24} weight="bold" aria-hidden="true" /></h2>
        <span>个人优势</span>
      </div>
      <div className="strength-grid">
        {strengths.map((item) => {
          const Icon = iconMap[item.icon];
          return <SpotlightStrengthCard item={item} Icon={Icon} key={item.number} />;
        })}
      </div>
      <div className="principle-strip" data-reveal>
        <FilmStrip size={26} weight="duotone" aria-hidden="true" />
        <p>从“做一张图”到“搭一条线”，我希望把每一次交付都变成下一次更快、更稳的起点。</p>
        <ArrowRight size={22} aria-hidden="true" />
      </div>
    </section>
  );
}

function SpotlightStrengthCard({ item, Icon }) {
  return (
    <article
      className={`strength-card-glow strength-card accent-${item.accent}`}
      tabIndex={0}
      data-reveal
    >
      <div className="strength-top"><span>{item.number}</span><small>{indexLabel(item.number)}</small></div>
      <h3>{item.title}<span aria-hidden="true">.</span></h3>
      <p>{item.copy}</p>
      <div className="tool-list">{item.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
      <Icon className="strength-symbol" size={118} weight="duotone" aria-hidden="true" />
    </article>
  );
}

function indexLabel(number) {
  return Number(number) <= 2 ? 'CORE' : 'SYSTEM';
}

function PortfolioCase({ caseStudy, className = '' }) {
  const [activeNumber, setActiveNumber] = useState(caseStudy.items[0].number);
  const activeItem = caseStudy.items.find((item) => item.number === activeNumber) || caseStudy.items[0];
  const hasVideos = caseStudy.items.some((item) => Boolean(item.video));

  const heading = (
    <div className="portfolio-case-heading" data-reveal>
      <div>
        <p className="eyebrow">{caseStudy.eyebrow}</p>
        <h2>{caseStudy.title}</h2>
      </div>
      <div className="portfolio-case-meta">
        <span>{caseStudy.year}</span>
        <strong>{caseStudy.meta}</strong>
      </div>
    </div>
  );

  if (caseStudy.layout === 'vertical') {
    return (
      <section className={`portfolio-case portfolio-case-vertical section shell ${className}`} id={caseStudy.id}>
        {heading}
        <div className="vertical-case-intro" data-reveal>
          <p>{caseStudy.description}</p>
          <span className="real-work-mark"><span aria-hidden="true" />18 个编号纵向完整展示</span>
        </div>
        <div className="vertical-case-sequence" aria-label={`${caseStudy.title}完整编号作品`}>
          {caseStudy.items.map((item) => (
            <article className={`vertical-case-item is-${item.orientation} ${item.video ? 'has-video' : 'has-image'}`} key={item.number}>
              <header className="vertical-case-chapter">
                <span>{item.number}</span>
                <div>
                  <strong>{item.video ? 'MOTION / AI 动态预览' : 'IMAGE / AI 视觉设定'}</strong>
                  <small>{item.label}</small>
                </div>
              </header>
              <div className="vertical-case-media">
                <figure>
                  {item.video ? (
                    <AutoPauseVideo src={item.video} label={`${caseStudy.title} 编号 ${item.number}`} />
                  ) : (
                    <ImageWithFallback src={item.image} alt={`${caseStudy.title} 编号 ${item.number}`} />
                  )}
                </figure>
              </div>
            </article>
          ))}
        </div>
        <div className="portfolio-case-footer" data-reveal>
          <span>{caseStudy.shortTitle}</span>
          <p>01、11、12、13、14 使用无控件的自动循环动图，不重复显示同号图片；静态图单独保留为后续 PDF 归档素材。</p>
        </div>
      </section>
    );
  }

  if (caseStudy.layout === 'morph') {
    const sliderItems = caseStudy.items.map((item) => ({
      image: item.image,
      caption: `${item.number} / ${item.label}`,
      alt: `${caseStudy.title} 编号 ${item.number}，${item.label}`,
    }));
    return (
      <section className={`portfolio-case portfolio-case-morph section shell ${className}`} id={caseStudy.id}>
        {heading}
        <div className="accordion-case-copy" data-reveal>
          <p>{caseStudy.description}</p>
          <span className="real-work-mark"><span aria-hidden="true" />原始竖图完整展示，可点击查看全图</span>
        </div>
        <BorderGlow className="portfolio-morph-glow" borderRadius={12} {...borderGlowProps} data-reveal>
          <MorphSlider
            items={sliderItems}
            transition="melt"
            intensity={0.55}
            aberration={0.35}
            drift={0.4}
            autoplay
            ariaLabel={`${caseStudy.title}作品轮播`}
          />
        </BorderGlow>
        <div className="portfolio-case-footer" data-reveal>
          <span>{caseStudy.shortTitle}</span>
          <p>按原始素材序号自动切换；保留完整竖图方向，支持按钮、方向键和点击全图。</p>
        </div>
      </section>
    );
  }

  const moveTab = (event, index) => {
    const key = event.key;
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(key)) return;
    event.preventDefault();
    const lastIndex = caseStudy.items.length - 1;
    const nextIndex = key === 'Home'
      ? 0
      : key === 'End'
        ? lastIndex
        : (key === 'ArrowRight' || key === 'ArrowDown')
          ? Math.min(index + 1, lastIndex)
          : Math.max(index - 1, 0);
    const nextItem = caseStudy.items[nextIndex];
    setActiveNumber(nextItem.number);
    requestAnimationFrame(() => document.getElementById(`${caseStudy.id}-tab-${nextItem.number}`)?.focus());
  };

  return (
    <section className={`portfolio-case section shell ${className}`} id={caseStudy.id}>
      {heading}

      <div className="numbered-case" data-reveal>
        <div className="numbered-case-index" role="tablist" aria-label={`${caseStudy.title}素材序号`}>
          {caseStudy.items.map((item, index) => (
            <button
              type="button"
              className={item.number === activeNumber ? 'is-active' : ''}
              key={item.number}
              onClick={() => setActiveNumber(item.number)}
              onKeyDown={(event) => moveTab(event, index)}
              id={`${caseStudy.id}-tab-${item.number}`}
              tabIndex={item.number === activeNumber ? 0 : -1}
              role="tab"
              aria-selected={item.number === activeNumber}
              aria-controls={`${caseStudy.id}-panel`}
            >
              <span>{item.number}</span>
              {item.video ? <small>VIDEO</small> : null}
            </button>
          ))}
        </div>

        <div className="numbered-case-status">
          <span>CURRENT</span>
          <strong>{activeItem.number} / {String(caseStudy.items.length).padStart(2, '0')}</strong>
          <small>{activeItem.video ? 'VIDEO / 动态演示' : 'IMAGE / 静态设定图'}</small>
        </div>

        <BorderGlow className="numbered-case-panel-glow" borderRadius={12} {...borderGlowProps}>
          <div
            className={`numbered-case-panel ${activeItem.video ? 'has-video' : ''}`}
            id={`${caseStudy.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${caseStudy.id}-tab-${activeItem.number}`}
            aria-live="polite"
          >
            {activeItem.video ? (
              <figure className="numbered-case-video">
                <AutoPauseVideo src={activeItem.video} label={`${caseStudy.title} 编号 ${activeItem.number}`} />
                <figcaption>{activeItem.video.split('/').pop()} / 动态演示</figcaption>
              </figure>
            ) : (
              <figure>
                <ImageWithFallback src={activeItem.image} alt={`${caseStudy.title} 编号 ${activeItem.number}`} />
                <figcaption>{activeItem.number}.jpg / 静态设定图 / {activeItem.label}</figcaption>
              </figure>
            )}
          </div>
        </BorderGlow>

        <div className="numbered-case-copy">
          <p>{caseStudy.description}</p>
          <span className="real-work-mark"><span aria-hidden="true" />{hasVideos ? '视频按原始编号展示，静态图保留归档' : '图片按原始编号展示，后续可继续补充动态内容'}</span>
        </div>
      </div>

      <div className="portfolio-case-footer" data-reveal>
        <span>{caseStudy.shortTitle}</span>
        <p>{hasVideos ? '按原始素材序号浏览。带 VIDEO 标记的编号只展示动态片段，同号静态图保留用于后续 PDF 归档。' : '按原始素材序号浏览，每个编号对应一张独立作品图，后续可以继续补充过程稿和动态演示。'}</p>
      </div>
    </section>
  );
}

function AiVisualLab() {
  const posterItems = posterGalleryItems.map((item) => ({ image: item.image, alt: item.alt, title: item.title }));
  return (
    <>
      <section className="ai-lab-intro section" id="ai-lab">
        <div className="ai-lab-heading shell" data-reveal>
          <p className="eyebrow">AI 视觉能力</p>
          <h2>AI VISUAL LAB</h2>
          <p>把系列海报、人物与场景、商品视觉拆成独立案例，让每一种能力都能用最适合的方式被检查。</p>
          <a className="ai-lab-feature-link" href="#generation-workbench">
            查看生图工作台案例 <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="ai-presentation-section poster-gallery-section section" id="poster-gallery">
        <div className="poster-gallery-shell shell">
          <div className="ai-presentation-heading" data-reveal>
            <h2>系列海报系统</h2>
            <p>将 47 张真实海报整理为一组连续画面，保留完整比例并支持逐张查看。</p>
          </div>
          <div className="poster-gallery-frame" data-reveal>
            <DepthCarousel
              items={posterItems}
              depth={340}
              spread={205}
              tilt={0}
              tiltDirection="right"
              perspective={2400}
              visibleCards={4}
              falloff={0.08}
              blur={0}
              autoplay
              loop
              cardHeight={350}
              radius={20}
              duration={900}
              ariaLabel="AI 系列海报深度轮播"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function GenerationWorkbenchCase() {
  const batchTabs = [
    { id: 'people', label: '吃西瓜的人', detail: '人物场景候选', items: generationWorkbench.batchPeople },
    { id: 'watermelon', label: '西瓜主图', detail: '商品主图候选', items: generationWorkbench.batchWatermelon },
  ];
  const [activeBatchId, setActiveBatchId] = useState(batchTabs[0].id);
  const shouldFocusBatchTab = useRef(false);
  const activeBatch = batchTabs.find((tab) => tab.id === activeBatchId) || batchTabs[0];
  const activeBatchIndex = batchTabs.findIndex((tab) => tab.id === activeBatch.id);

  useEffect(() => {
    if (!shouldFocusBatchTab.current) return;
    shouldFocusBatchTab.current = false;
    requestAnimationFrame(() => document.getElementById(`generation-batch-tab-${activeBatch.id}`)?.focus());
  }, [activeBatch.id]);

  const moveBatchTab = (event) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? batchTabs.length - 1
        : (event.key === 'ArrowRight' || event.key === 'ArrowDown')
          ? Math.min(activeBatchIndex + 1, batchTabs.length - 1)
          : Math.max(activeBatchIndex - 1, 0);
    const nextTab = batchTabs[nextIndex];
    shouldFocusBatchTab.current = true;
    setActiveBatchId(nextTab.id);
  };

  const batchMasonryItems = activeBatch.items.map((item, index) => ({
    ...item,
    img: item.image,
    caption: `${item.title} / ${item.detail || activeBatch.detail}`,
    height: [220, 190, 240, 200, 225][index % 5],
  }));
  const selectedMasonryItems = generationWorkbench.selected.map((item, index) => ({
    ...item,
    img: item.image,
    caption: `${item.title} / ${item.label}`,
    height: [150, 150, 200, 170, 170][index % 5],
  }));

  return (
    <section className="generation-workbench section shell" id="generation-workbench">
      <div className="generation-workbench-heading" data-reveal>
        <div>
          <p className="eyebrow">{generationWorkbench.eyebrow}</p>
          <h2>{generationWorkbench.title}</h2>
        </div>
        <p>{generationWorkbench.description}</p>
      </div>

      <div className="generation-workbench-stats" data-reveal aria-label="生图工作台素材概览">
        <div><strong>03</strong><span>工具工作模式</span></div>
        <div><strong>19</strong><span>批量候选画面</span></div>
        <div><strong>05</strong><span>精选输出与过程</span></div>
        <div><strong>02:24</strong><span>完整流程视频</span></div>
      </div>

      <div className="generation-workbench-block" data-reveal>
        <div className="generation-workbench-block-heading">
          <span>01</span>
          <div>
            <h3>工具界面 / 三种工作模式</h3>
            <p>同一工作台覆盖自由生图、商品处理和节点式设计创作，单张界面证据保留真实的输入、参数和输出区域。</p>
          </div>
        </div>
        <div className="generation-workbench-ui-carousel">
          <MorphSlider
            items={generationWorkbench.ui.map((item) => ({ image: item.image, caption: item.title, alt: item.alt }))}
            transition="melt"
            intensity={0.35}
            aberration={0.18}
            drift={0.2}
            autoplay={false}
            ariaLabel="工具界面三种工作模式手动轮播"
          />
        </div>
      </div>

      <div className="generation-workbench-block" data-reveal>
        <div className="generation-workbench-block-heading">
          <span>02</span>
          <div>
            <h3>批量生图 / 候选与筛选</h3>
            <p>人物场景保留 10 张、西瓜主图保留 9 张原始候选。一次只展开一组，保持比较时的画面尺度稳定。</p>
          </div>
        </div>
        <div className="generation-batch-tabs" role="tablist" aria-label="批量生图任务">
          {batchTabs.map((tab) => (
            <button
              type="button"
              role="tab"
              id={`generation-batch-tab-${tab.id}`}
              aria-selected={tab.id === activeBatch.id}
              aria-controls="generation-batch-panel"
              tabIndex={tab.id === activeBatch.id ? 0 : -1}
              className={tab.id === activeBatch.id ? 'is-active' : ''}
              key={tab.id}
              onClick={() => setActiveBatchId(tab.id)}
              onKeyDown={moveBatchTab}
            >
              <span>{tab.label}</span>
              <small>{tab.detail} / {tab.items.length}</small>
            </button>
          ))}
        </div>
        <div
          className="generation-batch-panel"
          id="generation-batch-panel"
          role="tabpanel"
          aria-labelledby={`generation-batch-tab-${activeBatch.id}`}
          aria-live="polite"
        >
          <div className="generation-batch-panel-meta">
            <span>{activeBatch.detail}</span>
            <strong>{activeBatch.items.length} 张原始候选</strong>
          </div>
          <Masonry
            items={batchMasonryItems}
            className="generation-batch-masonry"
            ease="power3.out"
            duration={0.55}
            stagger={0.035}
            animateFrom="bottom"
            hoverScale={0.965}
            colorShiftOnHover={false}
            ariaLabel={`${activeBatch.label}${activeBatch.detail}画廊`}
          />
        </div>
      </div>

      <div className="generation-workbench-block" data-reveal>
        <div className="generation-workbench-block-heading">
          <span>03</span>
          <div>
            <h3>过程与生图效果 / 从界面到结果</h3>
            <p>把工作台输出状态、横幅、竖幅和方幅结果放在同一组证据里，保留原始比例，点击任意画面可以查看全图。</p>
          </div>
        </div>
        <Masonry
          items={selectedMasonryItems}
          className="generation-selected-masonry"
          fit="contain"
          scaleOnHover={false}
          blurToFocus={false}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          colorShiftOnHover={false}
          ariaLabel="生图工作台精选输出画廊"
        />
      </div>

      <div className="generation-workbench-block generation-workbench-video-block" data-reveal>
        <div className="generation-workbench-block-heading">
          <span>04</span>
          <div>
            <h3>三种生图方式 / 完整流程演示</h3>
            <p>用一段完整录屏把工具模式、参数选择和输出结果串起来，视频保留原始配音并提供手动播放控件。</p>
          </div>
        </div>
        <figure className="generation-workbench-video">
          <video controls preload="metadata" playsInline poster={generationWorkbench.video.poster} aria-label={generationWorkbench.video.label}>
            <source src={generationWorkbench.video.src} type="video/mp4" />
          </video>
          <figcaption>
            <span>{generationWorkbench.video.label}</span>
            <small>MP4 / 1920 × 1080 / 02:24</small>
          </figcaption>
        </figure>
      </div>

      <p className="evidence-boundary" data-reveal>证据边界：本案例展示工作台界面、批量生成候选、精选输出和完整操作演示；当前不把这些素材表述为上线规模、销量或转化率结果。</p>
    </section>
  );
}

function AiVideoEditingCase() {
  return (
    <section className="ai-video-editing-case section shell" id="ai-video-editing-case">
      <div className="ai-video-editing-layout" data-reveal>
        <span className="ai-video-editing-number" aria-label="项目编号 04">04</span>
        <div className="ai-video-editing-evidence">
          <div className="ai-video-editing-label"><span>AI VIDEO WORKFLOW</span><span>自动粗剪 / 可编辑交付</span></div>
          <div className="ai-video-editing-videos">
            {videoWorkflowSkill.media.map((item, index) => (
              <figure key={item.src}>
                <video controls preload="metadata" playsInline aria-label={item.label}>
                  <source src={item.src} type="video/mp4" />
                </video>
                <figcaption><span>0{index + 1}</span>{item.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="ai-video-editing-copy">
          <p className="eyebrow">04 / AI VIDEO EDITING</p>
          <h2>AI 自动剪辑</h2>
          <p className="ai-video-editing-tools">参考视频复刻 / AI 生成 / 剪映草稿</p>
          <p className="ai-video-editing-description">根据参考视频和提示词表生成匹配素材，自动完成镜头筛选与粗剪，并交付可继续编辑的剪映草稿。</p>
        </div>
      </div>
    </section>
  );
}

function BraceletCommercialCase() {
  const detailItems = braceletCase.detail.map((item) => ({
    ...item,
    alt: `${item.caption}，黄玉貔貅木珠手串详情页视觉`,
  }));
  return (
    <section className="bracelet-case section shell" id="bracelet-case">
      <div className="commercial-case-heading" data-reveal>
        <div>
          <p className="eyebrow">Commercial AI case</p>
          <h2>黄玉貔貅木珠手串<br />AI 电商视觉全链路</h2>
        </div>
        <p>以同一款实物手串为基准，完成视觉方向探索、候选淘汰、产品一致性检查、后期修图和电商页面编排。重点不是生成数量，而是让珠型、顺序、材质和配件在不同场景中保持稳定。</p>
      </div>
      <div className="commercial-case-stats" data-reveal>
        <div><strong>9</strong><span>生成探索方向</span></div>
        <div><strong>1</strong><span>通过候选</span></div>
        <div><strong>5</strong><span>商业主图</span></div>
        <div><strong>8</strong><span>详情页模块</span></div>
      </div>

      <div className="commercial-case-block" data-reveal>
        <div className="commercial-case-block-heading"><span>01</span><div><h3>AI 批量探索与筛选</h3><p>探索稿用于证明选择过程，不作为最终商品主图。</p></div></div>
        <Masonry
          items={braceletCase.exploration.map((item, index) => ({ id: `bracelet-explore-${index + 1}`, img: item.image, alt: item.alt, caption: item.alt, height: [370, 300, 410, 320, 390][index % 5] }))}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          hoverScale={0.95}
          colorShiftOnHover={false}
          ariaLabel="手串 AI 生成探索瀑布流"
        />
      </div>

      <div className="commercial-case-block" data-reveal>
        <div className="commercial-case-block-heading"><span>02</span><div><h3>商业主图系统</h3><p>产品 Hero、细节拆解、价值卖点和场景收束在同一展开式画廊中比较，重点检查珠型、顺序和材质是否稳定。</p></div></div>
        <div className="bracelet-main-accordion">
          <AccordionGallery
            items={braceletCase.main}
            defaultIndex={2}
            expandRatio={0.52}
            trigger="hover"
            ariaLabel="黄玉貔貅木珠手串商业主图一致性画廊"
          />
        </div>
        <div className="bracelet-main-motion" data-reveal>
          <div className="bracelet-main-motion-heading">
            <span>动态排版预览</span>
            <p>同一组主图以持续漂移的方式快速扫过，点击任意画面仍可打开全图。</p>
          </div>
          <DriftWall
            items={braceletCase.main.map((item) => ({ image: item.image, title: item.title }))}
            columns={4}
            repeat={2}
            tileWidth={208}
            tileHeight={142}
            gap={18}
            tilt={5}
            turn={-3}
            perspective={1600}
            depth={24}
            speed={54}
            lift={16}
            fade={0.3}
            dim={0.25}
            enableLightbox
          />
        </div>
      </div>

      <div className="commercial-detail-showcase commercial-case-block" data-reveal>
        <div className="commercial-case-block-heading"><span>03</span><div><h3>详情页系统</h3><p>八个纵向模块合并为一组，一次只展示一张，保留完整比例并支持方向键、自动切换和全图查看。</p></div></div>
        <BorderGlow className="commercial-detail-slider" borderRadius={12} {...borderGlowProps}>
          <MorphSlider items={detailItems} transition="melt" intensity={0.55} aberration={0.35} drift={0.4} autoplay ariaLabel="手串详情页全部八个模块" />
        </BorderGlow>
      </div>

      <div className="commercial-case-block" data-reveal>
        <div className="commercial-case-block-heading"><span>04</span><div><h3>设计判断与质量检查</h3><p>展示 Brief、受众定位、一致性验证、淘汰理由、修图和综合交付证据。</p></div></div>
        <div className="evidence-reading-guide" aria-label="设计判断阅读说明">
          <div><strong>看什么</strong><span>产品结构、材质和卖点是否清楚</span></div>
          <div><strong>怎么判断</strong><span>先筛选一致性，再检查细节和场景可信度</span></div>
          <div><strong>交付什么</strong><span>保留通过稿、淘汰理由和可复用页面模块</span></div>
        </div>
        <Masonry
          items={braceletCase.process.map((item, index) => ({ id: `bracelet-process-${index + 1}`, img: item.image, alt: item.alt, caption: item.alt, height: [380, 330, 410, 360][index % 4] }))}
          className="bracelet-process-masonry"
          fit="contain"
          scaleOnHover={false}
          blurToFocus={false}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          hoverScale={0.95}
          colorShiftOnHover={false}
          ariaLabel="手串商业视觉过程证据"
        />
      </div>
      <p className="evidence-boundary" data-reveal>证据边界：本案例证明视觉系统与质量验证已完成；当前没有上线、销量、点击率、转化率或 A/B 测试数据。</p>
    </section>
  );
}

function AutomationGuide() {
  return (
    <div className="automation-guide" aria-labelledby="automation-guide-title" data-reveal>
      <div className="automation-guide-heading">
        <div>
          <span>GUIDED FLOW</span>
          <h3 id="automation-guide-title">从影刀原型到 Codex 定时运行</h3>
        </div>
        <p>先展示工具如何从影刀 RPA 迁移为代码化定时任务，再展开每天的数据处理主线与可靠性分支。</p>
      </div>
      <div className="automation-evolution" aria-label="自动化工具演进路径">
        <span className="automation-route-label">工具演进</span>
        <ScrollStack
          className="automation-evolution-stack"
          itemDistance={54}
          itemScale={0.02}
          itemStackDistance={24}
          stackPosition="18%"
          scaleEndPosition="8%"
          baseScale={0.92}
          rotationAmount={0.25}
          blurAmount={0}
          useWindowScroll
        >
          {automationEvolutionStages.map((stage, index) => (
            <ScrollStackItem key={stage.id} itemClassName={`automation-evolution-card is-${stage.id}`}>
              <span>{stage.number}</span>
              <h4>{stage.title}</h4>
              <p>{stage.copy}</p>
              <strong>{stage.tag}</strong>
              {index < automationEvolutionStages.length - 1 ? <ArrowRight className="automation-evolution-arrow" size={20} weight="bold" aria-hidden="true" /> : null}
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
      <span className="automation-route-label">每日业务闭环</span>
      <ol className="automation-flow" aria-label="1688 每日销售自动化主流程">
        {automationFlowStages.map((stage, index) => (
          <li className={`automation-flow-stage is-${stage.id}`} key={stage.id}>
            <span>{stage.number}</span>
            <h4>{stage.title}</h4>
            <p>{stage.copy}</p>
            <strong>{stage.metric}</strong>
            {index < automationFlowStages.length - 1 ? <ArrowRight className="automation-flow-arrow" size={22} weight="bold" aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
      <ul className="automation-branches" aria-label="自动化可靠性分支">
        {automationReliabilityBranches.map((branch) => (
          <li key={branch.title}>
            <strong>{branch.title}</strong>
            <p>{branch.copy}</p>
          </li>
        ))}
      </ul>
      <div className="automation-guide-foot">
        <p><code>211</code> 条查询计划由 <code>210</code> 条成功找回和 <code>1</code> 条明确的 <code>order_not_found</code> 构成，因此未解决记录为 <code>0</code>。</p>
        <a href="#rpa-evidence">查看流程与运行证据 <ArrowDownRight size={17} weight="bold" aria-hidden="true" /></a>
      </div>
    </div>
  );
}

function RpaAutomationCase() {
  const [isDocumentOpen, setDocumentOpen] = useState(false);
  const documentUrl = '/assets/portfolio/rpa-case/1688-daily-sales-case-study.pdf';

  useEffect(() => {
    if (!isDocumentOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setDocumentOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isDocumentOpen]);

  return (
    <section className="rpa-case section shell" id="rpa-case">
      <div className="commercial-case-heading" data-reveal>
        <div><p className="eyebrow">Automation case</p><h2>1688 每日销售<br />数据自动化闭环</h2></div>
        <p>从影刀 RPA 业务原型迁移为可恢复、可核查的代码化流水线，按缺失项查询并在发布前完成结构与内容回读。</p>
      </div>
      <AutomationGuide />

      <div className="case-document-card" data-reveal>
        <div>
          <span>完整案例文档 / 8 页</span>
          <h3>从影刀 RPA 到可恢复、可校验的代码流水线</h3>
          <p>完整文档集中说明业务背景、六步数据闭环、RPA 迁移判断、可靠性机制和 2026-08-19 代表性运行证据，页面不再重复展开这些内容。</p>
        </div>
        <button type="button" className="case-document-button" onClick={() => setDocumentOpen(true)}>
          <FileText size={20} weight="duotone" aria-hidden="true" />查看完整案例文档
        </button>
      </div>

      <div className="commercial-case-block rpa-evidence-block" id="rpa-evidence" data-reveal>
        <div className="commercial-case-block-heading"><span>01</span><div><h3>流程与运行证据</h3><p>原型流程、代码化结构、完成态回读和持续输出统一脱敏展示；代表性运行状态为 <code>completed</code>，其中 1 条明确为 <code>order_not_found</code>。</p></div></div>
        <div className="evidence-reading-guide evidence-reading-guide-rpa" aria-label="自动化证据阅读说明">
          <div><strong>输入</strong><span>导出源数据与查询计划</span></div>
          <div><strong>处理</strong><span>匹配缺失项并保留异常分支</span></div>
          <div><strong>结果</strong><span>完成态、输出文件和最终回读</span></div>
        </div>
        <Masonry
          items={rpaCase.images.map((item, index) => ({ id: `rpa-${index + 1}`, img: item.image, alt: item.alt, caption: item.alt, height: index >= 5 ? 440 : 260 }))}
          className="rpa-evidence-masonry"
          columns={2}
          fit="contain"
          scaleOnHover={false}
          blurToFocus={false}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          hoverScale={0.95}
          colorShiftOnHover={false}
          ariaLabel="影刀 RPA 与代码化自动化证据"
        />
      </div>

      {isDocumentOpen && typeof document !== 'undefined' ? createPortal(
        <div className="case-document-modal" role="dialog" aria-modal="true" aria-label="1688 每日销售数据自动化完整案例文档" onPointerDown={(event) => { if (event.target === event.currentTarget) setDocumentOpen(false); }}>
          <div className="case-document-modal-shell">
            <header>
              <div><span>CASE DOCUMENT</span><strong>1688 每日销售数据自动化</strong></div>
              <div>
                <a href={documentUrl} target="_blank" rel="noreferrer">新窗口打开 <ArrowSquareOut size={17} weight="bold" aria-hidden="true" /></a>
                <button type="button" onClick={() => setDocumentOpen(false)} aria-label="关闭文档"><X size={20} weight="bold" aria-hidden="true" /></button>
              </div>
            </header>
            <iframe title="1688 每日销售数据自动化案例文档" src={`${documentUrl}#view=FitH`} />
          </div>
        </div>,
        document.body,
      ) : null}
    </section>
  );
}

function App() {
  const profileHeadingRef = useRef(null);
  useReveal();
  useHashScroll();
  return (
    <main>
      <nav className="nav site-nav shell" aria-label="主导航">
          <a className="wordmark notranslate" href="#top" aria-label="返回顶部" onClick={scrollToTop}>
          XIAOLI
        </a>
        <div className="nav-links">
          <a href="#selected-works">WORK</a>
          <a href="#poster-gallery">PROJECTS</a>
          <a href="#generation-workbench">LAB</a>
          <a href="#about">ABOUT</a>
        </div>
        <a className="button-primary nav-contact" href="mailto:3453026257@qq.com">
          CONTACT <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
        </a>
      </nav>

      <section className="hero-door" id="top">
        <div className="hero">
        <HeroMedia />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-light-sweep" aria-hidden="true" />

        <div className="hero-content shell">
          <div className="hero-copy">
            <h1 className="hero-title notranslate" data-reveal>
              <span className="hero-title-line hero-title-name">
                <span>XIAOLI</span>
                <Sparkle className="hero-sparkle" size={48} weight="fill" aria-hidden="true" />
              </span>
              <strong className="hero-title-line hero-title-portfolio">
                PORTFOLIO <em>XiaoLi</em>
              </strong>
            </h1>
            <div className="hero-bottom" data-reveal>
              <p>VISUAL SYSTEMS × AI WORKFLOWS<br />BUILDING DISTINCTIVE CONTENT, FASTER.</p>
              <a className="button-primary hero-cta" href="#selected-works">
                VIEW WORK <ArrowDownRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        </div>
      </section>

      <section className="hero-gallery-section" aria-label="精选作品">
        <div className="hero-gallery-stage">
          <CircularGallery
            items={circularGalleryItems}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
            fontUrl="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap"
            font="bold 30px Orbitron"
          />
        </div>
      </section>

      <section className="experience-section" id="about">
        <div className="experience-shell shell">
          <div className="experience-heading" data-reveal>
            <div>
              <p className="experience-title">WORK EXPERIENCE <ArrowDownRight size={22} weight="bold" aria-hidden="true" /></p>
              <span>个人经历</span>
            </div>
            <span className="experience-index">02 / 05</span>
          </div>
          <div className="experience-grid">
            <div className="experience-visual" data-reveal>
              <BorderGlow
                className="experience-media-glow"
                edgeSensitivity={30}
                glowColor="40 80 80"
                backgroundColor="#120F17"
                borderRadius={18}
                glowRadius={40}
                glowIntensity={1}
                coneSpread={25}
                animated
                      colors={['#c8ff36', '#74d8c4', '#e6a078']}
              >
                <SpotlightCard className="experience-media-spotlight" spotlightColor="rgba(0, 229, 255, 0.2)">
                  <div className="experience-visual-frame">
                    <TiltedCard
                      imageSrc="/assets/portrait.png"
                      altText="李卓户外肖像"
                      captionText="Li Zhuo / AI Visual Designer"
                      containerHeight="100%"
                      containerWidth="100%"
                      imageHeight="100%"
                      imageWidth="100%"
                      rotateAmplitude={10}
                      scaleOnHover={1.06}
                      showTooltip
                      displayOverlayContent
                      overlayContent={(
                        <>
                          <div className="experience-visual-tint" />
                          <span className="experience-chip">AI VISUAL DESIGNER</span>
                        </>
                      )}
                    />
                  </div>
                </SpotlightCard>
              </BorderGlow>
            </div>
            <BorderGlow
              className="experience-profile-glow"
              edgeSensitivity={30}
              glowColor="40 80 80"
              backgroundColor="#120F17"
              borderRadius={18}
              glowRadius={40}
              glowIntensity={1}
              coneSpread={25}
              animated
              colors={['#c8ff36', '#74d8c4', '#e6a078']}
            >
              <SpotlightCard className="experience-profile-spotlight" spotlightColor="rgba(0, 229, 255, 0.2)">
                <div className="experience-profile" data-reveal>
                  <p className="micro-label">ABOUT ME</p>
                  <h2 ref={profileHeadingRef} className="experience-profile-title">
                    <VariableProximity
                      label="Hi, I am "
                      fromFontVariationSettings="'wght' 400, 'opsz' 9"
                      toFontVariationSettings="'wght' 1000, 'opsz' 40"
                      containerRef={profileHeadingRef}
                      radius={120}
                      falloff="linear"
                    />
                    <strong>
                      <VariableProximity
                        label="Li Zhuo!"
                        fromFontVariationSettings="'wght' 400, 'opsz' 9"
                        toFontVariationSettings="'wght' 1000, 'opsz' 40"
                        containerRef={profileHeadingRef}
                        radius={120}
                        falloff="linear"
                      />
                    </strong>
                  </h2>
                  <p className="experience-lead">我把 3D 视觉、批量生图、批量洗图和电商工作流连接起来，持续构建更快、更稳的商业视觉生产方式。</p>
                  <p className="experience-body">影视摄影与制作本科。做过 C4D 建模、OC / Redshift 渲染、批量生图、批量洗图、主图与详情页，也参与过数据自动化和前端页面协作。</p>
                  <div className="experience-details">
                    <div><span>方向</span><strong>AI Visual Designer</strong></div>
                    <div><span>专注</span><strong>Brand / 3D / AIGC</strong></div>
                    <div><span>电话</span><strong>135 5555 8884</strong></div>
                    <div><span>邮箱</span><strong>3453026257@qq.com</strong></div>
                  </div>
                  <div className="experience-stats">
                    {stats.map((stat) => (
                      <div className="experience-stat" key={stat.label}>
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="experience-building">
                    <div className="experience-building-heading">
                      <span>NOW BUILDING</span>
                      <span>进行中的项目</span>
                    </div>
                    <div className="experience-tags">
                      <span>C4D / OC</span><span>AI 生图</span><span>1688 自动化</span><span>React / Vite</span>
                    </div>
                    <div className="experience-skill-note">
                      <span>{videoWorkflowSkill.label}</span>
                      <strong>{videoWorkflowSkill.title}</strong>
                      <small>{videoWorkflowSkill.copy}</small>
                      <details className="experience-skill-more">
                        <summary><FilmStrip size={15} weight="duotone" aria-hidden="true" />查看 2 个示例</summary>
                        <div className="experience-skill-media">
                          {videoWorkflowSkill.media.map((item) => (
                            <figure key={item.src}>
                              <video controls preload="none" playsInline aria-label={item.label}>
                                <source src={item.src} type="video/mp4" />
                              </video>
                              <figcaption>{item.label}</figcaption>
                            </figure>
                          ))}
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </BorderGlow>
          </div>
          <div className="experience-timeline" data-reveal>
            <div className="experience-timeline-heading"><span>CAREER PATH</span><span>工作经历</span></div>
            <div className="experience-timeline-grid">
              {timeline.map((item, index) => (
                <article className="experience-timeline-item" key={item.period}>
                  <span className="timeline-dot" aria-hidden="true" />
                  <span className="timeline-period">{item.period}</span>
                  <h3>{item.company}</h3>
                  <p className="timeline-role">{item.role}</p>
                  <p>{item.body}</p>
                  <span className="timeline-number">0{index + 1}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SelectedWorksSummary />

      <CoreStrengthsSummary />

      <PortfolioCase caseStudy={portfolioCases.tea} className="portfolio-case-tea" />

      <PortfolioCase caseStudy={portfolioCases.kitten} className="portfolio-case-kitten" />

      <PortfolioCase caseStudy={portfolioCases.snow} className="portfolio-case-snow" />

      <AiVisualLab />

      <GenerationWorkbenchCase />

      <AiVideoEditingCase />

      <BraceletCommercialCase />

      <RpaAutomationCase />

      <section className="contact-section" id="contact">
        <div className="contact-inner shell" data-reveal>
          <p className="eyebrow">Open for the next challenge</p>
          <h2>如果你也在做<br /><em>更好的视觉系统，</em>聊聊。</h2>
          <a className="button-primary contact-cta" href="mailto:3453026257@qq.com">
            发送邮件 <ArrowUpRight size={21} weight="bold" aria-hidden="true" />
          </a>
          <div className="contact-footer">
            <span>李卓 / AI 电商视觉</span>
            <span>© 2026</span>
            <a href="#top" onClick={scrollToTop}>回到顶部 <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}

const rootElement = document.getElementById('root');
const appRoot = createRoot(rootElement);
appRoot.render(<App />);

if (import.meta.hot) {
  import.meta.hot.dispose(() => appRoot.unmount());
}
