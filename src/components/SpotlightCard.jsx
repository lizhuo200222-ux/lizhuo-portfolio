import React, { useRef } from 'react';
import './SpotlightCard.css';

export default function SpotlightCard({ children, className = '', spotlightColor = 'rgba(0, 229, 255, 0.2)' }) {
  const ref = useRef(null);

  const updateSpotlight = (event) => {
    if (event.pointerType === 'touch' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--spotlight-card-x', `${event.clientX - rect.left}px`);
    ref.current.style.setProperty('--spotlight-card-y', `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`}
      style={{ '--spotlight-card-color': spotlightColor }}
      onPointerEnter={() => ref.current?.classList.add('is-spotlight-active')}
      onPointerMove={updateSpotlight}
      onPointerLeave={() => ref.current?.classList.remove('is-spotlight-active')}
      onPointerDown={() => ref.current?.classList.add('is-spotlight-pressed')}
      onPointerUp={() => ref.current?.classList.remove('is-spotlight-pressed')}
    >
      {children}
    </div>
  );
}
