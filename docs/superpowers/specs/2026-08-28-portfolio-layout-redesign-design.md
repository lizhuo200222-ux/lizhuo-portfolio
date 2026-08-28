# Portfolio Layout Redesign Design

## Design Read

This is an existing AI visual and workflow portfolio for recruiters and potential collaborators. The first task is fast comprehension of the author's strongest work, followed by evidence of process and technical range. The intended language is editorial and quietly technical: real imagery carries the emphasis, while metadata and interaction remain restrained.

Dial values: `DESIGN_VARIANCE 8`, `MOTION_INTENSITY 6`, `VISUAL_DENSITY 3`.

## Observed Problem

The current page has strong material but too many equally weighted surfaces in sequence: a cinematic hero, an overlapping circular gallery, a full experience block, a three-card summary, five strength cards, three long case studies, an AI lab, a workbench, a people gallery, a commercial case, and an automation case. On desktop this creates a long stream of dark sections with repeated headings; on mobile the fixed nav, hero title, and gallery compete for the same first viewport.

The current code also uses purple/pink border-glow accents in several surfaces even though the project design system defines a single restrained accent. That makes the page feel more decorative than editorial.

## Chosen Direction

Use a work-first editorial hierarchy while preserving all real content and existing interactions:

1. Keep the supplied hero video and title, but reduce its vertical claim and make the work preview a clearly separated band instead of an overlap-heavy continuation.
2. Move the selected-work index immediately after the hero preview. Give the first project a larger lead track and make the other two supporting entries visually quieter.
3. Move experience/about after the work index and compress it into a readable two-column editorial block; keep contact, stats, career path, and the expandable video examples.
4. Keep long case studies and tool cases, but separate them with stronger chapter markers, consistent max widths, and lower visual noise. No content is deleted.
5. Normalize page shells to a narrower editorial width, use one accent token for borders/glows, and reduce repeated rounded containers.
6. On mobile, use a compact nav with a horizontally scrollable link row, a shorter hero, and a single-line horizontal work preview with stable card dimensions.

## Component Boundaries

- `src/main.jsx`: preserve data and interactions; adjust section order and add semantic modifier classes needed by the new hierarchy.
- `src/styles.css`: own layout tokens, section rhythm, hero/work-preview treatment, responsive breakpoints, and accent normalization.
- `src/portfolioPresentation.test.js`: add presentation contract checks for section order and stable class hooks without asserting implementation-only pixel values.
- `design-qa.md`: append fresh screenshot paths, viewport checks, and a score after the critique/fix cycle.

## Acceptance Criteria

- The first desktop viewport communicates identity, role, and a clear route to selected work within five seconds.
- The first mobile viewport keeps the title, support copy, primary action, and navigation readable without horizontal page overflow.
- Selected work appears before the long experience and capability content.
- All existing project anchors and interactive galleries remain available.
- Accent glow/border surfaces use the project accent token rather than purple/pink defaults.
- `npm run build` passes and the existing presentation tests remain green.
- Fresh screenshots exist for 1440x900, 390x844, and at least one interactive/expanded state.

## Rollback

Changes are limited to the page composition, CSS, presentation tests, and QA notes. Reverting those files restores the previous layout without touching source media or data files.
