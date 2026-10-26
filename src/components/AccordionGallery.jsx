import React, { useEffect, useRef, useState } from 'react';

export default function AccordionGallery({ items, defaultIndex = 0, expandRatio = 0.52, trigger = 'hover', ariaLabel = 'IP 视觉案例画廊' }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const galleryRef = useRef(null);
  const itemRefs = useRef([]);
  const isHoverMode = trigger === 'hover';
  const activeTrack = Math.min(Math.max(expandRatio, 0.3), 0.7);
  const collapsedTrack = (1 - activeTrack) / Math.max(items.length - 1, 1);
  const columns = items.map((_, index) => (index === activeIndex ? `${activeTrack}fr` : `${collapsedTrack}fr`)).join(' ');

  useEffect(() => {
    const gallery = galleryRef.current;
    const item = itemRefs.current[activeIndex];
    if (!gallery || !item || typeof window === 'undefined' || window.innerWidth > 560) return;
    const targetLeft = item.offsetLeft - ((gallery.clientWidth - item.offsetWidth) / 2);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gallery.scrollTo({ left: Math.max(0, targetLeft), behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [activeIndex]);

  return (
    <div
      ref={galleryRef}
      className="accordion-gallery"
      style={{ '--accordion-columns': columns }}
      aria-label={ariaLabel}
    >
      {items.map((item, index) => (
        <a
          className={`accordion-item ${index === activeIndex ? 'is-active' : ''}`}
          href={item.link || '#ip-case'}
          key={`${item.label}-${item.image}`}
          ref={(node) => { itemRefs.current[index] = node; }}
          onClick={(event) => {
            if (isHoverMode || item.link === '#') event.preventDefault();
            setActiveIndex(index);
          }}
          onFocus={() => setActiveIndex(index)}
          onMouseEnter={isHoverMode ? () => setActiveIndex(index) : undefined}
          onKeyDown={(event) => {
            const lastIndex = items.length - 1;
            const nextIndex = event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? lastIndex
                : event.key === 'ArrowRight' || event.key === 'ArrowDown'
                  ? Math.min(index + 1, lastIndex)
                  : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
                    ? Math.max(index - 1, 0)
                    : null;
            if (nextIndex === null) return;
            event.preventDefault();
            setActiveIndex(nextIndex);
            itemRefs.current[nextIndex]?.focus();
          }}
          aria-label={`${item.label}，${index === activeIndex ? '当前展开' : '展开'}`}
        >
          <img src={item.image} alt={item.alt || item.label} loading="eager" />
          <span className="accordion-shade" />
          <span className="accordion-label">{item.label}</span>
          <span className="accordion-index">0{index + 1}</span>
        </a>
      ))}
    </div>
  );
}
