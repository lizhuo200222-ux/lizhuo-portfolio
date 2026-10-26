import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import ImageLightbox from './ImageLightbox';

export default function DriftWall({
  items = [],
  columns = 5,
  repeat = 3,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  tilt = 16,
  turn = -14,
  perspective = 1200,
  depth = 120,
  speed = 42,
  direction = 'up',
  variance = 0.45,
  parallax = 0.6,
  lift = 64,
  fade = 0.6,
  dim = 0.55,
  overlayColor = '#060010',
  enableLightbox = false,
}) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const tiles = useMemo(() => {
    if (!items.length) return [];
    const count = Math.max(items.length * repeat, columns * 2);
    return Array.from({ length: count }, (_, index) => {
      const sourceIndex = index % items.length;
      return { item: items[sourceIndex], index, sourceIndex };
    });
  }, [columns, items, repeat]);

  return (
    <div
      className={`drift-wall drift-${direction}`}
      style={{
        '--drift-columns': columns,
        '--tile-width': `${tileWidth}px`,
        '--tile-height': `${tileHeight}px`,
        '--drift-gap': `${gap}px`,
        '--drift-tilt': `${tilt}deg`,
        '--drift-turn': `${turn}deg`,
        '--drift-perspective': `${perspective}px`,
        '--drift-depth': `${depth}px`,
        '--drift-speed': `${speed}s`,
        '--drift-variance': variance,
        '--drift-parallax': parallax,
        '--drift-lift': `${lift}px`,
        '--drift-fade': fade,
        '--drift-dim': dim,
        '--drift-overlay': overlayColor,
      }}
      aria-label="持续整理中的视觉材料"
    >
      <div className="drift-wall-plane">
        {tiles.map(({ item, index, sourceIndex }) => {
          const content = (
            <>
              <img src={item.image} alt={item.title || item.alt || `作品 ${sourceIndex + 1}`} loading="lazy" />
              <span className="drift-tile-shade" />
              <span className="drift-tile-caption">
                <strong>{item.title || item.caption || item.alt || `作品 ${sourceIndex + 1}`}</strong>
                {item.example ? <small>示例图 / 待替换</small> : null}
              </span>
            </>
          );
          const tileKey = `${item.title || item.caption || item.alt || item.image}-${index}`;
          const tileProps = {
            className: `drift-tile ${item.example ? 'is-example' : ''}`,
            style: {
              '--tile-index': index,
              '--tile-delay': `${(index % columns) * -1.6}s`,
              '--tile-rotate': `${((index * 13) % 9) - 4}deg`,
              '--tile-shift': `${((index * 17) % 28) - 14}px`,
            },
          };

          if (enableLightbox) {
            return (
              <button
                {...tileProps}
                key={tileKey}
                type="button"
                onClick={() => setLightboxIndex(sourceIndex)}
                aria-label={`${item.title || item.caption || item.alt || `作品 ${sourceIndex + 1}`}，点击查看全图`}
              >
                {content}
              </button>
            );
          }

          return (
            <a {...tileProps} key={tileKey} href={item.href || '#work'}>
              {content}
            </a>
          );
        })}
      </div>
      {enableLightbox && lightboxIndex !== null && typeof document !== 'undefined'
        ? createPortal(
          <ImageLightbox
            items={items}
            activeIndex={lightboxIndex}
            onChange={setLightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />,
          document.body,
        )
        : null}
    </div>
  );
}
