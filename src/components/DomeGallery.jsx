import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowsOut } from '@phosphor-icons/react';
import { useGesture } from '@use-gesture/react';
import ImageLightbox from './ImageLightbox';
import './DomeGallery.css';

const DEFAULT_SEGMENTS = 35;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function wrapAngle(degrees) {
  const value = ((degrees + 180) % 360 + 360) % 360;
  return value - 180;
}

function buildDomeItems(images, segments = DEFAULT_SEGMENTS) {
  const columns = Math.max(5, Math.floor(segments));
  const xColumns = Array.from({ length: columns }, (_, index) => -(columns - 1) + index * 2);
  const evenRows = [-4, -2, 0, 2, 4];
  const oddRows = [-3, -1, 1, 3, 5];
  const coordinates = xColumns.flatMap((x, column) => {
    const rows = column % 2 === 0 ? evenRows : oddRows;
    return rows.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });
  const normalized = images.map((item, sourceIndex) => ({ ...item, sourceIndex }));
  if (!normalized.length) return [];

  const assigned = coordinates.map((_, index) => normalized[index % normalized.length]);
  for (let index = 1; index < assigned.length; index += 1) {
    if (assigned[index].image === assigned[index - 1].image && normalized.length > 1) {
      const swapIndex = (index + 7) % assigned.length;
      [assigned[index], assigned[swapIndex]] = [assigned[swapIndex], assigned[index]];
    }
  }
  return coordinates.map((coordinate, index) => ({
    ...coordinate,
    ...assigned[index],
    tileIndex: index,
  }));
}

export default function DomeGallery({
  items = [],
  className = '',
  grayscale = false,
  fit = 0.55,
  minRadius = 560,
  maxRadius = 920,
  dragSensitivity = 20,
  dragDampening = 0.72,
  maxVerticalRotationDeg = 5,
  segments = DEFAULT_SEGMENTS,
}) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const sphereRef = useRef(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotationRef = useRef({ x: 0, y: 0 });
  const startPositionRef = useRef(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const lastDragEndRef = useRef(0);
  const inertiaRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const domeItems = useMemo(() => buildDomeItems(items, segments), [items, segments]);

  const applyRotation = useCallback((x, y) => {
    if (!sphereRef.current) return;
    sphereRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${x}deg) rotateY(${y}deg)`;
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaRef.current) {
      cancelAnimationFrame(inertiaRef.current);
      inertiaRef.current = null;
    }
  }, []);

  const startInertia = useCallback((velocityX, velocityY) => {
    stopInertia();
    let nextVelocityX = clamp(velocityX, -1.4, 1.4) * 72;
    let nextVelocityY = clamp(velocityY, -1.4, 1.4) * 72;
    let frameCount = 0;
    const friction = 0.94 + clamp(dragDampening, 0, 1) * 0.05;
    const tick = () => {
      nextVelocityX *= friction;
      nextVelocityY *= friction;
      frameCount += 1;
      if (frameCount > 360 || (Math.abs(nextVelocityX) < 0.015 && Math.abs(nextVelocityY) < 0.015)) {
        inertiaRef.current = null;
        return;
      }
      const nextX = clamp(rotationRef.current.x - nextVelocityY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
      const nextY = wrapAngle(rotationRef.current.y + nextVelocityX / 200);
      rotationRef.current = { x: nextX, y: nextY };
      applyRotation(nextX, nextY);
      inertiaRef.current = requestAnimationFrame(tick);
    };
    inertiaRef.current = requestAnimationFrame(tick);
  }, [applyRotation, dragDampening, maxVerticalRotationDeg, stopInertia]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const resize = () => {
      const bounds = root.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);
      const basis = width / height >= 1.3 ? width : Math.min(width, height);
      const radius = clamp(basis * fit, minRadius, maxRadius);
      root.style.setProperty('--radius', `${Math.round(radius)}px`);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      applyRotation(rotationRef.current.x, rotationRef.current.y);
    };
    const observer = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
    observer?.observe(root);
    if (!observer) window.addEventListener('resize', resize);
    resize();
    return () => {
      observer?.disconnect();
      if (!observer) window.removeEventListener('resize', resize);
    };
  }, [applyRotation, fit, grayscale, maxRadius, minRadius]);

  useEffect(() => () => stopInertia(), [stopInertia]);

  useGesture({
    onDragStart: ({ event }) => {
      stopInertia();
      draggingRef.current = true;
      movedRef.current = false;
      startRotationRef.current = { ...rotationRef.current };
      startPositionRef.current = { x: event.clientX, y: event.clientY };
    },
    onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement = [0, 0] }) => {
      if (!startPositionRef.current) return;
      const dx = event.clientX - startPositionRef.current.x;
      const dy = event.clientY - startPositionRef.current.y;
      if (Math.hypot(dx, dy) > 4) movedRef.current = true;
      const nextX = clamp(startRotationRef.current.x - dy / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
      const nextY = wrapAngle(startRotationRef.current.y + dx / dragSensitivity);
      rotationRef.current = { x: nextX, y: nextY };
      applyRotation(nextX, nextY);
      if (last) {
        draggingRef.current = false;
        if (movedRef.current) lastDragEndRef.current = performance.now();
        const [velocityX, velocityY] = velocity;
        const [directionX, directionY] = direction;
        const fallbackX = Array.isArray(movement) ? movement[0] / dragSensitivity * 0.02 : 0;
        const fallbackY = Array.isArray(movement) ? movement[1] / dragSensitivity * 0.02 : 0;
        startInertia(
          Math.abs(velocityX) > 0.001 ? velocityX * directionX : fallbackX,
          Math.abs(velocityY) > 0.001 ? velocityY * directionY : fallbackY,
        );
        startPositionRef.current = null;
        window.setTimeout(() => { movedRef.current = false; }, 180);
      }
    },
  }, { target: trackRef, eventOptions: { passive: false } });

  if (!items.length) return <div className={`sphere-root dome-gallery dome-gallery-empty ${className}`} role="status">素材待补充</div>;

  return (
    <div
      ref={rootRef}
      className={`sphere-root dome-gallery ${className}`}
      style={{ '--segments-x': segments, '--segments-y': segments, '--image-filter': grayscale ? 'grayscale(1)' : 'none' }}
    >
      <main ref={trackRef} className="sphere-main" aria-label="AI 作品 Dome Gallery，可拖动浏览，点击查看全图">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {domeItems.map((item) => (
              <div
                className={`item ${item.tileIndex % 9 === 0 ? 'is-label' : ''}`}
                key={`${item.image}-${item.tileIndex}`}
                style={{ '--offset-x': item.x, '--offset-y': item.y, '--item-size-x': item.sizeX, '--item-size-y': item.sizeY }}
              >
                <button
                  type="button"
                  className="item__image"
                  onClick={() => {
                    if (draggingRef.current || movedRef.current || performance.now() - lastDragEndRef.current < 180) return;
                    setSelectedIndex(item.sourceIndex);
                  }}
                  aria-label={`${item.title || item.alt || `作品 ${item.sourceIndex + 1}`}，点击查看全图`}
                >
                  <img src={item.image} alt={item.alt || item.title || `AI 作品 ${item.sourceIndex + 1}`} loading={item.tileIndex < 18 ? 'eager' : 'lazy'} draggable="false" />
                  <span className="dome-gallery-label">{item.title || `作品 ${item.sourceIndex + 1}`}</span>
                  <span className="dome-gallery-expand" aria-hidden="true"><ArrowsOut size={18} weight="bold" /></span>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />
      </main>
      {selectedIndex !== null ? <ImageLightbox items={items} activeIndex={selectedIndex} onChange={setSelectedIndex} onClose={() => setSelectedIndex(null)} /> : null}
    </div>
  );
}
