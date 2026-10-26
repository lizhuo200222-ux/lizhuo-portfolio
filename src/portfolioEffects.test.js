import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const mainSource = readFileSync(new URL('./main.jsx', import.meta.url), 'utf8');
const moltenPath = new URL('./components/MoltenMetal.jsx', import.meta.url);
const moltenStylesPath = new URL('./components/MoltenMetal.css', import.meta.url);
const moltenSource = existsSync(moltenPath) ? readFileSync(moltenPath, 'utf8') : '';
const moltenStyles = existsSync(moltenStylesPath) ? readFileSync(moltenStylesPath, 'utf8') : '';

test('legacy portfolio removes the people wall and its blue background layer', () => {
  assert.doesNotMatch(mainSource, /import .*MoltenMetal/);
  assert.doesNotMatch(mainSource, /<MoltenMetal/);
  assert.doesNotMatch(mainSource, /<DomeGallery/);
  assert.doesNotMatch(mainSource, /<AiPeopleCase\s*\/>/);
  assert.ok(existsSync(new URL('./components/MoltenMetal.jsx', import.meta.url)));
  assert.ok(existsSync(new URL('./components/MoltenMetal.css', import.meta.url)));
  assert.match(moltenStyles, /pointer-events: none/);
});

test('MoltenMetal respects reduced motion and cleans animation resources', () => {
  assert.match(moltenSource, /prefers-reduced-motion/);
  assert.match(moltenSource, /requestAnimationFrame/);
  assert.match(moltenSource, /cancelAnimationFrame/);
  assert.match(moltenSource, /ResizeObserver/);
  assert.match(moltenSource, /mouseInteraction/);
});

test('MoltenMetal is not rendered as a separate interlude section', () => {
  assert.doesNotMatch(mainSource, /function MoltenMetalInterlude/);
  assert.doesNotMatch(mainSource, /<MoltenMetalInterlude \/>/);
  assert.doesNotMatch(mainSource, /ai-people-gallery-viewport/);
});
