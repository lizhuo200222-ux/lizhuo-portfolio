# Portfolio Annotation Redesign

## Goal

Apply the seven browser annotations without removing credible portfolio content. Replace the combined AI capability stack with clearer, task-specific presentation patterns and reduce media density where the current page is difficult to scan.

## Confirmed Interpretation

- Keep all three IP case studies, but constrain the kitten and snow media to the same comfortable reading width used by the tea case.
- Present cross-project IP consistency in its own AccordionGallery using real tea, kitten, and snow assets.
- Present the five bracelet commercial main images with AccordionGallery.
- Present cat and general posters together in an independent FanGallery section.
- Remove ScrollStack as the AI capability presentation pattern.
- Keep automation content, but express it as a guided process diagram with validation and recovery branches. The detailed RPA case remains the evidence destination.
- Replace the two simultaneous bracelet detail sliders with one eight-item slider.
- Keep the existing real-people DomeGallery because it was not the item selected by the automation annotation.

## Information Architecture

```text
Tea case
Kitten case, constrained media width
Snow case, constrained media width
AI Visual Lab introduction
IP consistency, AccordionGallery
Poster systems, FanGallery
Real people and product scenes, DomeGallery
Bracelet commercial case, AccordionGallery plus one detail slider
Automation guided diagram plus full RPA case
```

## Automation Diagram

The main route is:

```text
Business input -> Collect and normalize -> Missing-item lookup -> Validate and reconcile -> Publish and read back
```

Three supporting branches explain reliable execution:

- Checkpoint recovery and bounded retries.
- Explicit exception states and human handoff.
- Output validation, hash/read-back evidence, and completed status.

The diagram uses verified production evidence already approved for public display: 4,161 source rows, 211 lookup plans, 210 recovered, one explicit order_not_found, zero unresolved, completed.

## Visual Direction

Preserve the current dark editorial portfolio, electric green action color, sharp media framing, and motion language. Use stable maximum widths, unframed page bands, one active media item at a time where detail inspection matters, and reduced-motion fallbacks already present in the project.

## Acceptance

- No ScrollStack remains in the AI lab DOM.
- The IP consistency gallery contains real tea, kitten, and snow work.
- The poster section contains ten real poster assets.
- The bracelet main gallery contains five items; the detail area contains one slider with eight items.
- The automation diagram contains five primary steps and three supporting reliability branches.
- Desktop and 390px mobile have no page-level horizontal overflow.
- Accordion, FanGallery, detail lightbox, and automation destination are interactively verified.

