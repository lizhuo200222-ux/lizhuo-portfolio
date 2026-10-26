# Snow Hanhan Ten-Board Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate and verify ten designed Snow Hanhan IP boards that extend the user's existing four-image set.

**Architecture:** A single Python batch script loads the latest mascot images as identity references and converts the supplied long board into an in-memory style contact sheet. OminiAPI produces text-free modular boards; Pillow then normalizes every output and adds deterministic typography so the series has readable, consistent layout furniture.

**Tech Stack:** Python 3, Pillow, NumPy, OminiAPI `gemini-3-pro-image` client.

---

### Task 1: Build the generator

**Files:**
- Create: `tmp/generate_snow_hanhan_layout_series.py`

- [ ] Define the fixed mascot identity prompt and the ten board-specific briefs.
- [ ] Load the four current outputs and an in-memory contact sheet derived from the supplied long reference.
- [ ] Add board selection, skip-existing behavior, retry handling, and deterministic JPEG export.
- [ ] Add exact top-band typography, index, accent rail, and footer treatment.

### Task 2: Generate the series

**Files:**
- Create: `C:\Users\DY-01\Desktop\新建文件夹 (4)\05-*.jpg` through `14-*.jpg`
- Create: `outputs\snow-hanhan-layout-series-20260823\raw\*.png`

- [ ] Generate board 05 as a visual calibration image.
- [ ] Inspect board 05 and adjust the shared brief or overlay if required.
- [ ] Generate boards 06 through 14 in bounded parallel batches.

### Task 3: Verify and refine

**Files:**
- Create: `outputs\snow-hanhan-layout-series-20260823\contact-sheet.jpg`
- Create: `outputs\snow-hanhan-layout-series-20260823\manifest.json`

- [ ] Build a labeled contact sheet from all final boards.
- [ ] Inspect character identity, content coverage, layout, anatomy, products, text, and canvas edges.
- [ ] Regenerate any board that fails visual inspection.
- [ ] Verify exactly ten new files, dimensions, RGB mode, JPEG readability, and SHA-256 hashes.
