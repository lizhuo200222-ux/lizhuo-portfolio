import React, { useEffect, useMemo, useRef } from 'react';
import './VariableProximity.css';

function parseSettings(settings) {
  return String(settings || '')
    .split(',')
    .map((part) => part.trim().split(/\s+/))
    .filter(([axis, value]) => axis && Number.isFinite(Number.parseFloat(value)))
    .map(([axis, value]) => ({ axis: axis.replace(/['\"]/g, ''), value: Number.parseFloat(value) }));
}

function influenceFor(distance, radius, falloff) {
  const normalized = Math.min(1, Math.max(0, 1 - distance / Math.max(1, radius)));
  if (falloff === 'exponential') return normalized ** 2;
  if (falloff === 'gaussian') return Math.exp(-((distance / Math.max(1, radius / 2)) ** 2) / 2);
  return normalized;
}

export default function VariableProximity({
  label,
  fromFontVariationSettings,
  toFontVariationSettings,
  containerRef,
  radius = 100,
  falloff = 'linear',
  className = '',
  style,
  ...restProps
}) {
  const rootRef = useRef(null);
  const letterRefs = useRef([]);
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const fromSettings = useMemo(() => parseSettings(fromFontVariationSettings), [fromFontVariationSettings]);
  const toSettings = useMemo(() => parseSettings(toFontVariationSettings), [toFontVariationSettings]);

  useEffect(() => {
    const container = containerRef?.current || rootRef.current;
    if (!container) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reset = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      letterRefs.current.forEach((letter) => {
        if (letter) {
          letter.style.fontVariationSettings = fromFontVariationSettings;
          letter.style.fontWeight = '';
        }
      });
    };
    const apply = () => {
      frameRef.current = null;
      if (reducedMotion.matches) return;
      const bounds = container.getBoundingClientRect();
      const pointerX = pointerRef.current.x - bounds.left;
      const pointerY = pointerRef.current.y - bounds.top;
      letterRefs.current.forEach((letter) => {
        if (!letter) return;
        const letterBounds = letter.getBoundingClientRect();
        const centerX = letterBounds.left + letterBounds.width / 2 - bounds.left;
        const centerY = letterBounds.top + letterBounds.height / 2 - bounds.top;
        const distance = Math.hypot(pointerX - centerX, pointerY - centerY);
        const influence = influenceFor(distance, radius, falloff);
        const settings = fromSettings.map(({ axis, value }, index) => {
          const target = toSettings[index]?.value ?? value;
          return `'${axis}' ${(value + (target - value) * influence).toFixed(2)}`;
        }).join(', ');
        letter.style.fontVariationSettings = settings || fromFontVariationSettings;
        const weightAxis = fromSettings.findIndex(({ axis }) => axis === 'wght');
        if (weightAxis >= 0) {
          const base = fromSettings[weightAxis].value;
          const target = toSettings[weightAxis]?.value ?? base;
          letter.style.fontWeight = String(Math.round(base + (target - base) * influence));
        }
      });
    };
    const update = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(apply);
    };
    container.addEventListener('pointermove', update, { passive: true });
    container.addEventListener('pointerleave', reset, { passive: true });
    reducedMotion.addEventListener?.('change', reset);
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      container.removeEventListener('pointermove', update);
      container.removeEventListener('pointerleave', reset);
      reducedMotion.removeEventListener?.('change', reset);
    };
  }, [containerRef, falloff, fromFontVariationSettings, fromSettings, radius, toSettings]);

  return (
    <span ref={rootRef} className={`variable-proximity ${className}`} style={style} aria-label={label} {...restProps}>
      {Array.from(String(label || '')).map((character, index) => (
        <span
          key={`${character}-${index}`}
          ref={(element) => { letterRefs.current[index] = element; }}
          className="variable-proximity-letter"
          style={{ fontVariationSettings: fromFontVariationSettings }}
          aria-hidden="true"
        >
          {character}
        </span>
      ))}
    </span>
  );
}
