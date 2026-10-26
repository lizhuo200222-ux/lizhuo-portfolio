import React, { useRef } from 'react';
import { getEdgeGlowOpacity } from '../galleryLayout';
import './BorderGlow.css';

const DEFAULT_COLORS = ['#c8ff36', '#74d8c4', '#e6a078'];

export default function BorderGlow({
  children,
  className = '',
  style: styleProp,
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = DEFAULT_COLORS,
  ...rest
}) {
  const ref = useRef(null);

  const updateGlow = (event) => {
    if (event.pointerType === 'touch' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const edgeDistance = Math.min(x, y, rect.width - x, rect.height - y);
    const edgeOpacity = getEdgeGlowOpacity(edgeDistance, edgeSensitivity, glowIntensity);
    const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI) + coneSpread;
    ref.current.style.setProperty('--border-glow-x', `${x}px`);
    ref.current.style.setProperty('--border-glow-y', `${y}px`);
    ref.current.style.setProperty('--border-glow-opacity', edgeOpacity.toFixed(3));
    ref.current.style.setProperty('--border-glow-angle', `${angle}deg`);
  };

  const setActive = (active) => {
    ref.current?.classList.toggle('is-border-glow-active', active);
    if (!active) {
      ref.current?.style.setProperty('--border-glow-opacity', edgeSensitivity <= 0 ? String(Math.min(1, glowIntensity)) : '0');
    }
  };

  return (
    <div
      ref={ref}
      className={`border-glow ${animated ? 'is-border-glow-animated' : ''} ${className}`}
      style={{
        ...styleProp,
        '--border-glow-rgb': glowColor,
        '--border-glow-bg': backgroundColor,
        '--border-glow-radius': `${borderRadius}px`,
        '--border-glow-blur': `${Math.max(4, glowRadius / 5)}px`,
        '--border-glow-c1': colors[0] || DEFAULT_COLORS[0],
        '--border-glow-c2': colors[1] || DEFAULT_COLORS[1],
        '--border-glow-c3': colors[2] || DEFAULT_COLORS[2],
        '--border-glow-opacity': edgeSensitivity <= 0 ? Math.min(1, glowIntensity) : 0,
      }}
      onPointerEnter={() => setActive(true)}
      onPointerMove={updateGlow}
      onPointerLeave={() => setActive(false)}
      {...rest}
    >
      {children}
    </div>
  );
}
