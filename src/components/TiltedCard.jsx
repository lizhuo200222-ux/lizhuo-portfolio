import React, { useRef } from 'react';
import './TiltedCard.css';

export default function TiltedCard({
  imageSrc,
  altText,
  captionText,
  containerHeight = '300px',
  containerWidth = '300px',
  imageHeight = '300px',
  imageWidth = '300px',
  rotateAmplitude = 12,
  scaleOnHover = 1.08,
  showTooltip = true,
  displayOverlayContent = true,
  overlayContent,
}) {
  const ref = useRef(null);

  const move = (event) => {
    if (event.pointerType === 'touch' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.setProperty('--tilt-rotate-x', `${-ny * rotateAmplitude}deg`);
    ref.current.style.setProperty('--tilt-rotate-y', `${nx * rotateAmplitude}deg`);
    ref.current.style.setProperty('--tilt-scale', scaleOnHover);
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--tilt-rotate-x', '0deg');
    ref.current.style.setProperty('--tilt-rotate-y', '0deg');
    ref.current.style.setProperty('--tilt-scale', 1);
  };

  return (
    <figure className="tilted-card-wrap" style={{ width: containerWidth, height: containerHeight }}>
      <div ref={ref} className="tilted-card" onPointerMove={move} onPointerLeave={reset}>
        <img src={imageSrc} alt={altText} style={{ width: imageWidth, height: imageHeight }} />
        {displayOverlayContent ? <div className="tilted-card-overlay">{overlayContent}</div> : null}
        {showTooltip ? <span className="tilted-card-tooltip">{captionText}</span> : null}
      </div>
    </figure>
  );
}
