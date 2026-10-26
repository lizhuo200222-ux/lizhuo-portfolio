export function nextLoopIndex(currentIndex, direction, itemCount) {
  if (itemCount <= 0) return 0;
  return (currentIndex + direction + itemCount) % itemCount;
}

export function balanceMasonryItems(items, columnCount, gap = 0) {
  const count = Math.max(1, Math.floor(columnCount));
  const columns = Array.from({ length: count }, () => ({ height: 0, items: [] }));

  items.forEach((item) => {
    const target = columns.reduce((shortest, column) => (
      column.height < shortest.height ? column : shortest
    ), columns[0]);
    target.items.push(item);
    target.height += Math.max(1, Number(item.height) || 1) + (target.items.length > 1 ? gap : 0);
  });

  return columns;
}

export function getVisibleLoopItems(items, activeIndex, radius) {
  if (!items.length) return [];
  const safeRadius = Math.max(0, Math.floor(radius));
  const visibleCount = Math.min(items.length, safeRadius * 2 + 1);
  const firstOffset = -Math.floor((visibleCount - 1) / 2);

  return Array.from({ length: visibleCount }, (_, index) => {
    const offset = firstOffset + index;
    const sourceIndex = nextLoopIndex(activeIndex, offset, items.length);
    return { item: items[sourceIndex], offset, sourceIndex };
  });
}

export function getEdgeGlowOpacity(edgeDistance, edgeSensitivity, glowIntensity = 1) {
  const intensity = Math.max(0, Number(glowIntensity) || 0);
  if (edgeSensitivity <= 0) return Math.min(1, intensity);
  const ratio = (edgeSensitivity - edgeDistance) / edgeSensitivity;
  return Math.max(0, Math.min(1, ratio)) * intensity;
}

export function resolveMasonryEase(ease = 'power3.out') {
  return ease === 'power3.out' ? 'cubic-bezier(.16,1,.3,1)' : ease;
}

export function isDomeDragDistance(distance, threshold = 12) {
  return Math.abs(Number(distance) || 0) > threshold;
}

export function buildSphereItems(images, segments = 21) {
  const columns = Math.max(1, Math.floor(segments));
  const coords = [];
  for (let column = 0; column < columns; column += 1) {
    const x = -columns + 1 + column * 2;
    const rows = column % 2 === 0 ? [-4, -2, 0, 2, 4] : [-3, -1, 1, 3, 5];
    rows.forEach((y) => coords.push({ x, y, sizeX: 2, sizeY: 2 }));
  }
  coords.sort((left, right) => Math.abs(left.x) - Math.abs(right.x) || Math.abs(left.y) - Math.abs(right.y));
  return coords.slice(0, images.length).map((coord, index) => ({ ...coord, ...images[index] }));
}

export function decayDomeVelocity(value, deltaMs, damping = 0.92) {
  const velocity = Number(value) || 0;
  if (Math.abs(velocity) < 0.01) return 0;
  const frameCount = Math.max(0, Number(deltaMs) || 0) / (1000 / 60);
  const nextVelocity = velocity * Math.pow(damping, frameCount);
  return Math.abs(nextVelocity) < 0.01 ? 0 : nextVelocity;
}
