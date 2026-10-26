import React, { useEffect, useRef } from 'react';
import './MoltenMetal.css';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function parseColor(value, fallback) {
  const source = String(value || '').trim().replace('#', '');
  const hex = source.length === 3 ? source.split('').map((part) => `${part}${part}`).join('') : source;
  if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback;
  return [Number.parseInt(hex.slice(0, 2), 16), Number.parseInt(hex.slice(2, 4), 16), Number.parseInt(hex.slice(4, 6), 16)];
}

function rgba(color, alpha) {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${clamp(alpha, 0, 1).toFixed(3)})`;
}

export default function MoltenMetal({
  color1 = '#34d5ff',
  color2 = '#00f5ff',
  color3 = '#ffffff',
  speed = 0.35,
  scale = 4,
  detail = 3,
  glow = 1.6,
  coreSize = 0.1,
  swirl = 1,
  fold = -0.2,
  blackPoint = 0.05,
  brightness = 1.3,
  colorMode = 'molten',
  grain = true,
  grainIntensity = 0.05,
  mouseInteraction = true,
  mouseStrength = 0.3,
  opacity = 1,
}) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!root || !canvas || !context) return undefined;

    const palette = [
      parseColor(color1, [52, 213, 255]),
      parseColor(color2, [0, 245, 255]),
      parseColor(color3, [255, 255, 255]),
    ];
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    const viewport = { width: 1, height: 1, dpr: Math.min(window.devicePixelRatio || 1, 2) };
    let reducedMotion = motionMedia.matches;
    let visible = true;
    let frame = 0;
    let resizeObserver;
    let intersectionObserver;

    const resize = () => {
      const bounds = root.getBoundingClientRect();
      viewport.width = Math.max(1, bounds.width);
      viewport.height = Math.max(1, bounds.height);
      canvas.width = Math.floor(viewport.width * viewport.dpr);
      canvas.height = Math.floor(viewport.height * viewport.dpr);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      context.setTransform(viewport.dpr, 0, 0, viewport.dpr, 0, 0);
    };

    const updatePointer = (event) => {
      if (!mouseInteraction) return;
      const bounds = root.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      pointer.targetX = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
      pointer.targetY = clamp((event.clientY - bounds.top) / bounds.height, 0, 1);
    };

    const resetPointer = () => {
      pointer.targetX = 0.5;
      pointer.targetY = 0.5;
    };

    const draw = (timeMs) => {
      const time = timeMs * 0.001 * Math.max(0.02, speed);
      pointer.x += (pointer.targetX - pointer.x) * 0.045;
      pointer.y += (pointer.targetY - pointer.y) * 0.045;
      const width = viewport.width;
      const height = viewport.height;
      const centerX = width * (0.5 + (pointer.x - 0.5) * mouseStrength * 0.32);
      const centerY = height * (0.5 + (pointer.y - 0.5) * mouseStrength * 0.24);
      const baseRadius = Math.max(width, height) * (0.18 + scale * 0.055);
      const detailCount = clamp(Math.round(detail * 2.2), 4, 12);

      context.clearRect(0, 0, width, height);
      context.fillStyle = `rgba(3, 8, 14, ${clamp(0.84 + blackPoint, 0, 0.98).toFixed(3)})`;
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalCompositeOperation = 'screen';
      for (let index = 0; index < detailCount; index += 1) {
        const ratio = index / Math.max(1, detailCount - 1);
        const phase = time * (0.46 + ratio * 0.14) * swirl + index * 1.77;
        const foldOffset = Math.sin(phase * 0.72 + fold * 4) * baseRadius * 0.16;
        const x = centerX + Math.cos(phase + ratio * 4.2) * baseRadius * (0.38 + ratio * 0.055) + foldOffset;
        const y = centerY + Math.sin(phase * 1.14 - ratio * 3.1) * baseRadius * (0.28 + ratio * 0.06);
        const radiusX = baseRadius * (0.26 + Math.sin(phase * 0.86) * 0.045);
        const radiusY = baseRadius * (0.12 + Math.cos(phase * 0.65) * 0.035);
        const color = palette[index % palette.length];
        const gradient = context.createRadialGradient(x, y, Math.max(1, radiusY * coreSize), x, y, radiusX);
        gradient.addColorStop(0, rgba(palette[2], 0.24 * glow * brightness));
        gradient.addColorStop(0.34, rgba(color, 0.17 * glow * brightness));
        gradient.addColorStop(0.72, rgba(color, 0.065 * glow));
        gradient.addColorStop(1, rgba(color, 0));
        context.fillStyle = gradient;
        context.beginPath();
        context.ellipse(x, y, radiusX, radiusY, Math.sin(phase) * 0.55, 0, Math.PI * 2);
        context.fill();
      }

      const sheen = context.createLinearGradient(0, height * (0.1 + pointer.y * 0.35), width, height * (0.8 - pointer.y * 0.22));
      sheen.addColorStop(0, rgba(palette[0], 0));
      sheen.addColorStop(0.44, rgba(palette[1], 0.08 * brightness));
      sheen.addColorStop(0.53, rgba(palette[2], 0.12 * brightness));
      sheen.addColorStop(0.64, rgba(palette[0], 0.035));
      sheen.addColorStop(1, rgba(palette[0], 0));
      context.fillStyle = sheen;
      context.fillRect(0, 0, width, height);
      context.restore();

      if (grain) {
        context.save();
        context.globalCompositeOperation = 'screen';
        context.fillStyle = `rgba(255, 255, 255, ${clamp(grainIntensity * 0.34, 0, 0.14).toFixed(3)})`;
        const grainCount = clamp(Math.round(width * height / 4600), 80, 420);
        for (let index = 0; index < grainCount; index += 1) {
          const seed = index * 12.9898 + time * 18.7;
          const x = ((Math.sin(seed) * 43758.5453) % 1 + 1) % 1 * width;
          const y = ((Math.sin(seed * 1.37) * 24634.6345) % 1 + 1) % 1 * height;
          context.fillRect(x, y, 0.7, 0.7);
        }
        context.restore();
      }

      if (!reducedMotion && visible) frame = window.requestAnimationFrame(draw);
    };

    const updateMotion = () => {
      reducedMotion = motionMedia.matches;
      if (reducedMotion) {
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(draw);
      } else if (visible && !frame) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(root);
    if (!resizeObserver) window.addEventListener('resize', resize);
    intersectionObserver = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible && !reducedMotion && !frame) frame = window.requestAnimationFrame(draw);
          if (!visible) {
            window.cancelAnimationFrame(frame);
            frame = 0;
          }
        }, { threshold: 0.02 })
      : null;
    intersectionObserver?.observe(root);
    motionMedia.addEventListener?.('change', updateMotion);
    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('pointerleave', resetPointer, { passive: true });
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      motionMedia.removeEventListener?.('change', updateMotion);
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerleave', resetPointer);
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener('resize', resize);
      intersectionObserver?.disconnect();
    };
  }, [blackPoint, brightness, color1, color2, color3, coreSize, detail, fold, grain, grainIntensity, glow, mouseInteraction, mouseStrength, scale, speed, swirl]);

  return (
    <div
      ref={rootRef}
      className={`molten-metal molten-metal-${colorMode}`}
      style={{ '--molten-opacity': opacity }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

