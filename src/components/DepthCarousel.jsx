import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import ImageLightbox from './ImageLightbox';
import './DepthCarousel.css';

export default function DepthCarousel({
  items = [],
  depth = 220,
  spread = 90,
  tilt = 22,
  tiltDirection = 'right',
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.2,
  blur = 6,
  autoplay = false,
  loop = false,
  cardHeight = 350,
  radius = 20,
  duration = 900,
  ariaLabel = '深度轮播',
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ pointerId: null, startX: 0, lastX: 0, moved: false, suppressClick: false });

  const go = useCallback((direction) => {
    setActiveIndex((current) => {
      const next = current + direction;
      if (loop) return (next + items.length) % items.length;
      return Math.max(0, Math.min(items.length - 1, next));
    });
  }, [items.length, loop]);

  useEffect(() => {
    if (!autoplay || isDragging || lightboxIndex !== null || items.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const interval = window.setInterval(() => go(1), 3200);
    return () => window.clearInterval(interval);
  }, [autoplay, go, isDragging, items.length, lightboxIndex]);

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, lastX: event.clientX, moved: false, suppressClick: false };
    setIsDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    dragRef.current.lastX = event.clientX;
    if (Math.abs(event.clientX - dragRef.current.startX) > 8) {
      dragRef.current.moved = true;
      event.preventDefault();
    }
  };

  const handlePointerUp = (event) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    const distance = dragRef.current.lastX - dragRef.current.startX;
    const moved = dragRef.current.moved;
    if (moved && Math.abs(distance) > 24) go(distance < 0 ? 1 : -1);
    dragRef.current.suppressClick = moved && Math.abs(distance) > 24;
    dragRef.current.pointerId = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  if (!items.length) return <div className="depth-carousel-empty" role="status">素材待补充</div>;

  return (
    <div
      className="depth-carousel"
      style={{ '--depth-perspective': `${perspective}px`, '--depth-card-height': `${cardHeight}px`, '--depth-radius': `${radius}px`, '--depth-duration': `${duration}ms` }}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        className={`depth-carousel-stage ${isDragging ? 'is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
      >
        {items.map((item, index) => {
          let offset = index - activeIndex;
          if (loop && offset > items.length / 2) offset -= items.length;
          if (loop && offset < -items.length / 2) offset += items.length;
          const abs = Math.abs(offset);
          const hidden = abs >= visibleCards;
          const direction = tiltDirection === 'left' ? -1 : 1;
          return (
            <button
              type="button"
              className={`depth-carousel-card ${offset === 0 ? 'is-active' : ''}`}
              key={item.image || item.img || index}
              onClick={() => {
                if (dragRef.current.suppressClick) {
                  dragRef.current.suppressClick = false;
                  return;
                }
                if (offset === 0) setLightboxIndex(index);
                else setActiveIndex(index);
              }}
              onKeyDown={(event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                if (offset === 0) setLightboxIndex(index);
                else setActiveIndex(index);
              }}
              style={{
                '--depth-x': `${offset * spread}px`,
                '--depth-z': `${-abs * depth}px`,
                '--depth-rotate': `${offset * tilt * direction}deg`,
                '--depth-opacity': hidden ? 0 : Math.max(0.2, 1 - abs * falloff),
                '--depth-blur': `${abs * blur}px`,
                '--depth-scale': Math.max(0.72, 1 - abs * 0.08),
                pointerEvents: hidden ? 'none' : 'auto',
              }}
              aria-label={`${item.alt || item.title || `海报 ${index + 1}`}，第 ${index + 1} 张`}
              aria-current={offset === 0 ? 'true' : undefined}
            >
              <img src={item.image || item.img} alt={item.alt || item.title || `海报 ${index + 1}`} loading="lazy" />
              <span className="depth-carousel-label">{item.title || item.alt || `海报 ${index + 1}`}</span>
            </button>
          );
        })}
      </div>
      <div className="depth-carousel-controls">
        <button type="button" onClick={() => go(-1)} aria-label="上一张场景"><CaretLeft size={19} weight="bold" aria-hidden="true" /></button>
        <span>{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
        <button type="button" onClick={() => go(1)} aria-label="下一张场景"><CaretRight size={19} weight="bold" aria-hidden="true" /></button>
      </div>
      {lightboxIndex !== null ? <ImageLightbox items={items} activeIndex={lightboxIndex} onChange={setLightboxIndex} onClose={() => setLightboxIndex(null)} /> : null}
    </div>
  );
}
