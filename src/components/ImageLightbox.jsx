import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react';
import { nextLoopIndex } from '../galleryLayout';
import './ImageLightbox.css';

export default function ImageLightbox({ items, activeIndex, onChange, onClose }) {
  const closeRef = useRef(null);
  const item = items[activeIndex];

  useEffect(() => {
    if (!item) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onChange(nextLoopIndex(activeIndex, -1, items.length));
      if (event.key === 'ArrowRight') onChange(nextLoopIndex(activeIndex, 1, items.length));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, item, items.length, onChange, onClose]);

  if (!item) return null;

  const content = (
    <div
      className="image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.caption || item.title || item.alt || '作品'}全图`}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button ref={closeRef} type="button" className="image-lightbox-close" onClick={onClose} aria-label="关闭全图">
        <X size={22} weight="bold" aria-hidden="true" />
      </button>
      {items.length > 1 ? (
        <button type="button" className="image-lightbox-prev" onClick={() => onChange(nextLoopIndex(activeIndex, -1, items.length))} aria-label="上一张">
          <CaretLeft size={24} weight="bold" aria-hidden="true" />
        </button>
      ) : null}
      <figure>
        <img src={item.image || item.img} alt={item.alt || item.caption || item.title || '作品全图'} />
        <figcaption>
          <span>{item.caption || item.title || item.alt || '作品'}</span>
          <small>{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</small>
        </figcaption>
      </figure>
      {items.length > 1 ? (
        <button type="button" className="image-lightbox-next" onClick={() => onChange(nextLoopIndex(activeIndex, 1, items.length))} aria-label="下一张">
          <CaretRight size={24} weight="bold" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );

  return typeof document === 'undefined' ? content : createPortal(content, document.body);
}
