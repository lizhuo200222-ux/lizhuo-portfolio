import assert from 'node:assert/strict';
import test from 'node:test';
import {
  balanceMasonryItems,
  buildSphereItems,
  decayDomeVelocity,
  getEdgeGlowOpacity,
  getVisibleLoopItems,
  isDomeDragDistance,
  nextLoopIndex,
  resolveMasonryEase,
} from './galleryLayout.js';

test('nextLoopIndex wraps in both directions', () => {
  assert.equal(nextLoopIndex(4, 1, 5), 0);
  assert.equal(nextLoopIndex(0, -1, 5), 4);
  assert.equal(nextLoopIndex(2, 1, 5), 3);
});

test('balanceMasonryItems assigns every item to the shortest column', () => {
  const items = [400, 250, 600, 320, 280].map((height, index) => ({ id: String(index + 1), height }));
  const columns = balanceMasonryItems(items, 3, 18);

  assert.equal(columns.length, 3);
  assert.deepEqual(columns.flatMap((column) => column.items).map((item) => item.id).sort(), ['1', '2', '3', '4', '5']);
  assert.deepEqual(columns.map((column) => column.items.map((item) => item.id)), [['1', '5'], ['2', '4'], ['3']]);
});

test('balanceMasonryItems keeps an empty input stable', () => {
  assert.deepEqual(balanceMasonryItems([], 3, 18), [
    { height: 0, items: [] },
    { height: 0, items: [] },
    { height: 0, items: [] },
  ]);
});

test('getVisibleLoopItems wraps without duplicating source items', () => {
  const items = ['a', 'b', 'c', 'd', 'e', 'f'];
  const visible = getVisibleLoopItems(items, 0, 2);

  assert.deepEqual(visible.map((entry) => entry.item), ['e', 'f', 'a', 'b', 'c']);
  assert.deepEqual(visible.map((entry) => entry.offset), [-2, -1, 0, 1, 2]);
  assert.equal(new Set(visible.map((entry) => entry.sourceIndex)).size, visible.length);
});

test('getVisibleLoopItems never duplicates a small collection', () => {
  const visible = getVisibleLoopItems(['a', 'b', 'c'], 0, 4);

  assert.deepEqual(visible.map((entry) => entry.item), ['c', 'a', 'b']);
  assert.equal(visible.length, 3);
});

test('getEdgeGlowOpacity treats zero sensitivity as a persistent edge glow', () => {
  assert.equal(getEdgeGlowOpacity(24, 0, 2.3), 1);
  assert.equal(getEdgeGlowOpacity(20, 30, 1), 1 / 3);
  assert.equal(getEdgeGlowOpacity(40, 30, 1), 0);
});

test('resolveMasonryEase maps the requested power3 easing and preserves CSS easing', () => {
  assert.equal(resolveMasonryEase('power3.out'), 'cubic-bezier(.16,1,.3,1)');
  assert.equal(resolveMasonryEase('linear'), 'linear');
});

test('isDomeDragDistance ignores click jitter and only suppresses a real drag', () => {
  assert.equal(isDomeDragDistance(0), false);
  assert.equal(isDomeDragDistance(8), false);
  assert.equal(isDomeDragDistance(-13), true);
});

test('buildSphereItems places every source image once across a full dome', () => {
  const images = Array.from({ length: 102 }, (_, index) => ({ src: `image-${index}`, alt: `Image ${index}` }));
  const items = buildSphereItems(images, 21);

  assert.equal(items.length, 102);
  assert.equal(new Set(items.map((item) => item.src)).size, 102);
  assert.equal(Math.min(...items.map((item) => item.x)), -20);
  assert.ok(Math.max(...items.map((item) => item.x)) >= 18);
  assert.ok(items.slice(0, 5).every((item) => item.x === 0));
  assert.ok(items.every((item) => item.sizeX === 2 && item.sizeY === 2));
});

test('decayDomeVelocity eases inertia gradually toward rest', () => {
  const afterOneFrame = decayDomeVelocity(40, 1000 / 60);
  const afterOneSecond = decayDomeVelocity(40, 1000);

  assert.ok(afterOneFrame > 35 && afterOneFrame < 40);
  assert.ok(afterOneSecond > 0 && afterOneSecond < 1);
  assert.equal(decayDomeVelocity(0.005, 16), 0);
});
