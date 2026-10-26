import React, { useEffect, useState } from 'react';
import { ArrowsOut, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { nextLoopIndex } from '../galleryLayout';
import ImageLightbox from './ImageLightbox';
import './MorphSlider.css';

export default function MorphSlider({
  items = [],
  transition = 'melt',
  intensity = 0.55,
  aberration = 0.35,
  drift = 0.4,
  autoplay = false,
  ariaLabel = '作品轮播',
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEngaged, setIsEngaged] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (!autoplay || !isEngaged || items.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setActiveIndex((current) => nextLoopIndex(current, 1, items.length)), 4300);
    return () => window.clearInterval(timer);
  }, [autoplay, isEngaged, items.length]);

  if (!items.length) return <div className="morph-slider-empty" role="status">素材待补充</div>;

  const item = items[activeIndex];
  return (
    <div
      className={`morph-slider is-${transition}`}
      style={{ '--morph-intensity': intensity, '--morph-aberration': aberration, '--morph-drift': drift }}
      tabIndex={0}
      aria-label={ariaLabel}
      onPointerEnter={() => setIsEngaged(true)}
      onPointerLeave={() => setIsEngaged(false)}
      onFocus={() => setIsEngaged(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsEngaged(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') setActiveIndex(nextLoopIndex(activeIndex, -1, items.length));
        if (event.key === 'ArrowRight') setActiveIndex(nextLoopIndex(activeIndex, 1, items.length));
      }}
    >
      <button type="button" className="morph-slider-image" onClick={() => setLightboxIndex(activeIndex)} aria-label={`${item.caption}，点击查看全图`}>
        <img key={`${item.image}-${activeIndex}`} src={item.image} alt={item.alt || item.caption} />
        <span className="morph-slider-expand" aria-hidden="true"><ArrowsOut size={20} weight="bold" /></span>
      </button>
      <div className="morph-slider-footer">
        <button type="button" onClick={() => setActiveIndex(nextLoopIndex(activeIndex, -1, items.length))} aria-label="上一张">
          <CaretLeft size={20} weight="bold" aria-hidden="true" />
        </button>
        <div>
          <strong>{item.caption}</strong>
          <small>{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</small>
        </div>
        <button type="button" onClick={() => setActiveIndex(nextLoopIndex(activeIndex, 1, items.length))} aria-label="下一张">
          <CaretRight size={20} weight="bold" aria-hidden="true" />
        </button>
      </div>
      {lightboxIndex !== null ? <ImageLightbox items={items} activeIndex={lightboxIndex} onChange={setLightboxIndex} onClose={() => setLightboxIndex(null)} /> : null}
    </div>
  );
}
