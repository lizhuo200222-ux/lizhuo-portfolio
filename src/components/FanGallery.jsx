import React, { useEffect, useRef, useState } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { nextLoopIndex } from '../galleryLayout';
import ImageLightbox from './ImageLightbox';
import './FanGallery.css';

export default function FanGallery({ items = [], ariaLabel = '扇形作品轮播', spread = 96, slideInterval = 4200 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const stageRef = useRef(null);
  const slideResetRef = useRef(null);
  const dragRef = useRef({ pointerId: null, startX: 0, lastX: 0, moved: false, suppressClick: false });

  const goToIndex = (nextIndex) => {
    setIsSliding(true);
    setActiveIndex((current) => typeof nextIndex === 'function' ? nextIndex(current) : nextIndex);
    window.clearTimeout(slideResetRef.current);
    slideResetRef.current = window.setTimeout(() => setIsSliding(false), 760);
  };

  useEffect(() => () => window.clearTimeout(slideResetRef.current), []);

  useEffect(() => {
    if (items.length < 2 || isDragging || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => {
      goToIndex((current) => nextLoopIndex(current, 1, items.length));
    }, slideInterval);
    return () => window.clearInterval(timer);
  }, [items.length, isDragging, slideInterval]);

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
    const steps = Math.min(3, Math.max(1, Math.round(Math.abs(distance) / 120)));
    if (moved && Math.abs(distance) > 24) {
      goToIndex((current) => {
        let next = current;
        for (let step = 0; step < steps; step += 1) next = nextLoopIndex(next, distance < 0 ? 1 : -1, items.length);
        return next;
      });
    }
    dragRef.current.suppressClick = moved;
    dragRef.current.pointerId = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  if (!items.length) return <div className="fan-gallery-empty" role="status">素材待补充</div>;

  return (
    <div className="fan-gallery" role="region" aria-roledescription="carousel" aria-label={ariaLabel}>
      <div
        ref={stageRef}
        className={`fan-gallery-stage ${isDragging ? 'is-dragging' : ''} ${isSliding ? 'is-sliding' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
      >
        {items.map((item, index) => {
          const relative = ((index - activeIndex + items.length + Math.floor(items.length / 2)) % items.length) - Math.floor(items.length / 2);
          const distance = Math.abs(relative);
          return (
            <button
              type="button"
              className={`fan-gallery-card ${relative === 0 ? 'is-active' : ''}`}
              key={item.image || item.img}
              style={{
                '--fan-x': `${relative * spread}px`,
                '--fan-y': `${Math.pow(distance, 1.35) * 16}px`,
                '--fan-rotate': `${relative * 6}deg`,
                '--fan-scale': relative === 0 ? 1.12 : Math.max(.72, 1 - distance * .075),
                '--fan-layer': 20 - distance,
                '--fan-opacity': Math.max(.38, 1 - distance * .14),
              }}
              onClick={() => {
                if (dragRef.current.suppressClick) {
                  dragRef.current.suppressClick = false;
                  return;
                }
                if (relative === 0) setLightboxIndex(index);
                else goToIndex(index);
              }}
              aria-label={`${item.caption || item.alt || `海报 ${index + 1}`}，${relative === 0 ? '点击查看全图' : '点击切换到此图'}`}
            >
              <span className="fan-gallery-card-inner">
                <img src={item.image || item.img} alt={item.alt || item.caption || `海报 ${index + 1}`} loading="lazy" />
              </span>
            </button>
          );
        })}
      </div>
      <div className="fan-gallery-controls">
        <button type="button" onClick={() => goToIndex(nextLoopIndex(activeIndex, -1, items.length))} aria-label="上一张"><CaretLeft size={19} weight="bold" aria-hidden="true" /></button>
        <small>{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</small>
        <button type="button" onClick={() => goToIndex(nextLoopIndex(activeIndex, 1, items.length))} aria-label="下一张"><CaretRight size={19} weight="bold" aria-hidden="true" /></button>
      </div>
      {lightboxIndex !== null ? <ImageLightbox items={items} activeIndex={lightboxIndex} onChange={setLightboxIndex} onClose={() => setLightboxIndex(null)} /> : null}
    </div>
  );
}
