# Codex Project Instructions

Read `CODEX_HANDOFF.md`, `WORKFLOW_PLAYBOOK.md`, and `MIGRATION_README.md` before changing this project. This is the preserved legacy Li Zhuo portfolio, not a request to revive the rejected newer layout.

## Baseline

- Keep the current old page order, dark visual shell, real local assets, and existing routes.
- Treat `src/main.jsx`, `src/data.js`, `src/styles.css`, `src/components/`, and `public/assets/` as the editable source of truth.
- `dist/` is a derived snapshot. Rebuild it with `npm run build`; do not edit generated files by hand.

## Non-negotiable user decisions

- Do not restore the removed people sphere/wall or the duplicate IP consistency block.
- Do not add the rejected blue bottom effect or the rejected August 28 work-first rewrite.
- Keep the poster carousel and other user-requested motion, but keep workbench UI switching manual (`autoplay={false}`).
- Preserve click-to-enlarge, keyboard controls, drag behavior, reduced-motion handling, and image aspect ratios.
- Use the supplied local assets before inventing replacements. Do not replace the 47-poster collection with remote placeholders.

## Before and after edits

1. Run `node --test src/portfolioPresentation.test.js src/generationWorkbench.test.js src/portfolioEffects.test.js src/galleryLayout.test.js src/circularGalleryContract.test.js`.
2. Run `npm run build`.
3. For visual changes, capture desktop, 390px mobile, and the changed interaction state.
4. Re-check page overflow, console errors, asset loading, and hash navigation.
5. Update `CODEX_HANDOFF.md` only when a new user-approved decision or verified behavior changes the baseline.

## Sensitive data boundary

Never add passwords, cookies, API keys, browser profiles, or login state to this project or its migration package. `OMINIAPI_API_KEY` is an environment-variable name only; its value must remain outside the repository.

## Migration

Use `package-migration.ps1` to produce a fresh portable package after substantial changes. Use `verify-migration.ps1 -Install -Build -Test` after extracting on another computer. Do not silently merge the package into an existing project directory.
