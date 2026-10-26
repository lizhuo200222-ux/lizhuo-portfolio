import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as portfolioData from './data.js';

const mainSource = readFileSync(new URL('./main.jsx', import.meta.url), 'utf8');
const stylesSource = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');

test('generation workbench data exposes the complete supplied media set', () => {
  const workbench = portfolioData.generationWorkbench;
  assert.ok(workbench, 'generationWorkbench must be exported');
  assert.equal(workbench.ui.length, 3);
  assert.equal(workbench.batchPeople.length, 10);
  assert.equal(workbench.batchWatermelon.length, 9);
  assert.equal(workbench.selected.length, 5);
  assert.equal(workbench.video.src, '/assets/portfolio/generation-workbench/video/FORMA_三种生图方式_自然配音精剪.mp4');
  assert.ok(workbench.ui.every((item) => item.image.startsWith('/assets/portfolio/generation-workbench/ui/')));
  assert.ok(workbench.batchPeople.every((item) => item.image.startsWith('/assets/portfolio/generation-workbench/batch-people/')));
  assert.ok(workbench.batchWatermelon.every((item) => item.image.startsWith('/assets/portfolio/generation-workbench/batch-watermelon/')));
  assert.ok(workbench.selected.every((item) => item.image.startsWith('/assets/portfolio/generation-workbench/selected/')));
});

test('generation workbench is rendered as a discoverable case with accessible batch tabs', () => {
  assert.match(mainSource, /function GenerationWorkbenchCase/);
  assert.match(mainSource, /id="generation-workbench"/);
  assert.match(mainSource, /role="tablist"/);
  assert.match(mainSource, /generationWorkbench\.title/);
  assert.match(stylesSource, /\.generation-workbench/);
  assert.match(mainSource, /<MorphSlider[\s\S]*autoplay=\{false\}/);
});
