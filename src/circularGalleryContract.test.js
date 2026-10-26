import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const mainSource = readFileSync(new URL('./main.jsx', import.meta.url), 'utf8');
const gallerySource = readFileSync(new URL('./components/CircularGallery.jsx', import.meta.url), 'utf8');
const galleryStyles = readFileSync(new URL('./components/CircularGallery.css', import.meta.url), 'utf8');
const pageStyles = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');
const dataSource = readFileSync(new URL('./data.js', import.meta.url), 'utf8');

test('homepage uses the requested CircularGallery motion settings', () => {
  assert.match(mainSource, /scrollEase=\{0\.02\}/);
  assert.doesNotMatch(mainSource, /scrollSpeed=\{/);
  assert.match(mainSource, /<CircularGallery\s+items=\{circularGalleryItems\}/);
  assert.match(mainSource, /const circularGalleryItems = heroGalleryItems/);
  assert.match(dataSource, /export const heroGalleryItems = \[/);
  assert.ok((dataSource.match(/heroGalleryItems/g) || []).length >= 1);
  assert.match(mainSource, /bend=\{3\}/);
});

test('CircularGallery stays aligned with the supplied reference implementation', () => {
  assert.doesNotMatch(gallerySource, /function StaticGallery/);
  assert.doesNotMatch(gallerySource, /circular-gallery-loading/);
  assert.doesNotMatch(gallerySource, /seededOffset/);
  assert.match(gallerySource, /const responsiveScale = Math\.min\(1, Math\.max\(0\.72, this\.screen\.width \/ 1180\)\)/);
  assert.match(gallerySource, /const bendScale = this\.screen\.width < 700 \? 0\.16 : 0\.55/);
  assert.match(gallerySource, /const bendAmount = this\.bend \* bendScale/);
  assert.match(gallerySource, /const initialIndex = Math\.floor\(galleryItems\.length \/ 2\)/);
  assert.match(galleryStyles, /\.hero-gallery-section \.hero-gallery-stage \{[^}]*border: 0;[^}]*background: transparent;/s);
  assert.match(pageStyles, /\.hero-gallery-section \{[^}]*height: 348px;[^}]*min-height: 348px;[^}]*margin-top: -250px;/s);
  assert.match(pageStyles, /\.hero-gallery-stage \{[^}]*top: 48px;[^}]*height: 300px;/s);
});
