import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowsOut } from '@phosphor-icons/react';
import { balanceMasonryItems, resolveMasonryEase } from '../galleryLayout';
import ImageLightbox from './ImageLightbox';
import './Masonry.css';

export default function Masonry({
  items = [],
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  className = '',
  columns,
  fit = 'cover',
  ariaLabel = '瀑布流画廊',
}) {
  const rootRef = useRef(null);
  const [columnCount, setColumnCount] = useState(columns || 3);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const root = rootRef.current;
    if (columns || !root || !('ResizeObserver' in window)) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setColumnCount(width >= 760 ? 3 : width >= 420 ? 2 : 1);
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const effectiveColumnCount = columns || columnCount;
  const columnItems = useMemo(() => balanceMasonryItems(items, effectiveColumnCount, 14), [effectiveColumnCount, items]);

  return (
    <div
      ref={rootRef}
      className={`masonry ${className} ${fit === 'contain' ? 'is-contain' : ''} ${scaleOnHover ? 'has-hover-scale' : ''} ${blurToFocus ? 'has-blur-focus' : ''} ${colorShiftOnHover ? 'has-color-shift' : ''}`}
      style={{ '--masonry-columns': effectiveColumnCount, '--masonry-duration': `${duration}s`, '--masonry-stagger': `${stagger}s`, '--masonry-hover-scale': hoverScale, '--masonry-from-y': animateFrom === 'top' ? '-24px' : '24px', '--masonry-ease': resolveMasonryEase(ease) }}
      aria-label={ariaLabel}
    >
      {columnItems.map((column, columnIndex) => (
        <div className="masonry-column" key={`column-${columnIndex}`}>
          {column.items.map((item) => {
            const sourceIndex = items.findIndex((candidate) => candidate.id === item.id);
            return (
              <button
                type="button"
                className="masonry-item"
                style={{ '--masonry-item-index': sourceIndex, ...(fit === 'contain' ? {} : { aspectRatio: `1 / ${Math.max(.55, item.height / 400)}` }) }}
                key={item.id}
                onClick={() => setLightboxIndex(sourceIndex)}
                aria-label={`${item.caption || item.alt || item.id}，点击查看全图`}
              >
                <img src={item.img} alt={item.alt || item.caption || `作品 ${item.id}`} loading="lazy" />
                <span aria-hidden="true"><ArrowsOut size={18} weight="bold" /></span>
              </button>
            );
          })}
        </div>
      ))}
      {lightboxIndex !== null ? <ImageLightbox items={items} activeIndex={lightboxIndex} onChange={setLightboxIndex} onClose={() => setLightboxIndex(null)} /> : null}
    </div>
  );
}
