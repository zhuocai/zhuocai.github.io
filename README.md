# zhuocai.github.io

Personal academic website for Zhuo Cai, built with [Astro](https://astro.build).

## Research content and local review

The human-written research archive is the sibling `../research/` folder in `career-plan`. It remains independent of this website. The website owns its public explanations, metadata, publication grouping, and selected-paper order; archive notes require no website fields or formatting.

- `src/data/projects.ts` defines three research areas, accounts of selected public results, a short general vision, and earlier work. The homepage takes its area names and descriptions from this same data. Each area's `papers` contains a `publicationId`, a research-page `description`, and an optional legacy `anchorId`.
- `src/pages/index.astro`: edit the `home-biography` block for visible homepage research and biography prose, and `home-fields` for the subject line under the name. `src/data/site.ts` supplies `positionContext` for the linked position/advisor sentence and the shared profile details. Its `summary` is description metadata only; the old `hero` and extended `bio` fields are not rendered. Editing guides are included as comments in these files and in `src/data/projects.ts` and `src/pages/research.astro`.
- `src/content/publications/` contains public-facing paper records. `summary` is a brief explanation; `abstract` with `abstractLabel: Technical overview` is an authored website explanation rather than a verbatim publisher abstract.
- `selectedOrder` controls the homepage selection of published/accepted papers. Public preprints appear only in the full bibliography, which remains chronological within each group.
- The website-local `research/manuscripts/` inputs currently generate three public records: `tx-order`, `no-tx-fee`, and `parallel-execution-marble`. Edit these website inputs when changing those records, then run `npm run sync:research`; other publication JSON files are maintained directly.
- Unreleased manuscripts and detailed future directions stay private in the gitignored registry. The sync script rejects public manuscript entries without a `links.paper` or `links.preprint` URL. The publication loader also excludes such manuscripts before rendering or serializing data for the browser. A public URL must point to an intentionally released version; it is not permission to copy private notes into website prose.
- Creating a local preview does not publish it. GitHub Actions deploys after a push, so keep review changes local until Zhuo asks to publish.
- The linked CV is a website copy with the unreleased-manuscript section omitted. `npm run build:public-cv` rebuilds it from the sibling `../cv-caizhuo/` sources using XeLaTeX, without changing the application CV. After a rebuild, check the PDF layout and update `src/data/cv.ts` with its date and page count. Do not overwrite the public copy with the application PDF.

The 26 November revision emphasizes completed public work and replaces specific future projects with a general research vision. It supersedes the research-page structure described in the earlier local review guide.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Astro 5 (SSG, island architecture) |
| UI components | Astro + React islands (`@astrojs/react`) |
| Content | Astro Content Collections (JSON data files) |
| Styles | Scoped CSS + global CSS variables |
| Type-safety | TypeScript (`astro check`) |

---

## Build Commands

```bash
npm run dev            # Start local dev server at http://localhost:4321
npm run build          # Production build → dist/
npm run preview        # Preview production build locally
npm run check          # TypeScript + Astro type-check
npm run build:public-cv # Build the website CV without unreleased manuscripts (XeLaTeX)
npm run sync:papers    # Download PDFs listed as local-pdf in publications
npm run sync:research  # Sync private research registry → src/content/
```

---

## Content Collections

### `src/content/publications/`

Each file is a `.json` conforming to the `publications` schema in `src/content/config.ts`. Key fields:

| Field | Description |
|-------|-------------|
| `title` | Full paper title |
| `authors` | Array of author name strings |
| `venue` / `venueShort` | Full and abbreviated venue |
| `year` | Publication year |
| `type` | `conference` \| `journal` \| `workshop` \| `manuscript` |
| `status` | Free string (e.g., "Accepted", "Under submission") |
| `tags` | Keyword tags for filtering |
| `selected` | Pin to homepage featured section |
| `selectedOrder` | Order among homepage selected papers |
| `area` | Research area used by the bibliography filter |
| `summary` | Short explanation displayed with the paper |
| `abstract` / `abstractLabel` | Expandable abstract or labeled technical overview |
| `contentAvailability` | `local-pdf` \| `external-pdf` \| `abstract-only` |
| `links` | Object with optional `paper`, `preprint`, `doi`, `code`, `slides`, `video`, `scholar` URLs |

### `src/content/directions/`

Generated by `npm run sync:research` from `research/directions/*.md`. Each file is a `.json` conforming to the `directions` schema:

| Field | Description |
|-------|-------------|
| `title` | Direction title |
| `summary` | 1–2 sentence pitch |
| `description` | Full paragraph for the homepage card |
| `tags` | Keyword tags |
| `status` | `planned` \| `active` \| `under-submission` |
| `relatedPublications` | Array of publication IDs (filename stems from `src/content/publications/`) |
| `links` | Object with optional `preprint` and `code` URLs |

---

## Private Research Registry

The `research/` folder is **gitignored**. It stores private manuscripts and research directions as structured Markdown files with YAML frontmatter. Nothing in this folder is committed or publicly accessible.

### Folder Layout

```
research/
  manuscripts/        ← papers under submission or in preparation
    tx-order.md
    no-tx-fee.md
  directions/         ← ongoing/planned research without a paper yet
    dynamic-snarks.md
    tfm-delayed-inclusion.md
    tfm-dag-sharding.md
    parallel-execution-incentive.md
  README.md           ← detailed field reference (this folder)
  .sync-manifest.json ← auto-generated by sync script; do not edit
```

### Visibility Toggle

Every entry has a `visibility` field in its YAML frontmatter:

| Value | Effect |
|-------|--------|
| `private` | Entry stays entirely local. Nothing written to website. |
| `public` | Sync script writes a `.json` into `src/content/`. Entry appears on website after rebuild. |

**To publish an entry:**

1. Open the relevant `.md` file in `research/manuscripts/` or `research/directions/`.
2. Check that the frontmatter is suitable for public release, then change `visibility: private` → `visibility: public`. A manuscript must have a public `links.paper` or `links.preprint` URL.
3. Run `npm run sync:research`.
4. Restart the dev server (`npm run dev`) or rebuild (`npm run build`).

**To retract an entry:**

1. Change `visibility: public` → `visibility: private`.
2. Run `npm run sync:research` — the previously generated `.json` is deleted automatically.

### Manuscript Frontmatter Fields

```yaml
---
title: "Full paper title"
type: manuscript
visibility: private            # 'private' | 'public'
tags:
  - consensus
  - incentive-design
status: "Under submission"     # shown verbatim on website
venue: "ACM Symposium on Principles of Distributed Computing"
venueShort: "PODC 2026"
year: 2026
authors:
  - "Zhuo Cai"
  - "Co-Author Name"
localRepoPath: ~/research-writing/tx-order   # path to LaTeX writeup
selected: false                # true → pin to homepage featured section
abstract: >
  Abstract text (shown on website when visibility: public).
note: "Under review. Do not circulate."
---

## Notes

Free-form Markdown — personal notes, open problems, related work pointers.
AI reads this body when you ask for help with the manuscript.
```

### Direction Frontmatter Fields

```yaml
---
title: "Research direction title"
type: direction
visibility: private            # 'private' | 'public'
tags:
  - transaction-fee-mechanisms
  - blockchain
status: active                 # 'planned' | 'active' | 'under-submission'
summary: >
  1–2 sentence homepage preview pitch.
description: >
  Full paragraph shown on the homepage card.
relatedPublications:           # IDs from src/content/publications/ (filename stem)
  - rogue
links:
  preprint: ""                 # optional public URL
  code: ""                     # optional public URL
---

## Notes

Free-form Markdown context for personal use and AI assistance.
```

### Adding a New Entry

```bash
# Manuscript
cp research/manuscripts/tx-order.md research/manuscripts/new-paper.md
# edit frontmatter and notes

# Direction
cp research/directions/dynamic-snarks.md research/directions/new-direction.md
# edit frontmatter and notes
```

The JSON slug is derived from the filename stem (e.g., `new-paper.md` → `src/content/publications/new-paper.json`).

---

## AI Workflow for Research Entries

When asking GitHub Copilot (or any AI) to help with a research entry:

1. Open the relevant `.md` file in `research/manuscripts/` or `research/directions/`.
2. The free-form **Notes** body provides AI with full context.
3. For manuscripts, AI can read the LaTeX writeup at `localRepoPath` for precise assistance (abstract rewriting, related-work checks, proof gap identification).
4. Review any edited public frontmatter for disclosure of unpublished ideas before running `npm run sync:research`. Keep private research detail in the body or in entries marked `visibility: private`.

**Example prompt:** *"Read the manuscript at `localRepoPath` in `research/manuscripts/tx-order.md` and rewrite the `abstract` field to be suitable for a PODC audience."*

---

## Project Structure

```
src/
  components/         Astro + React UI components
  content/
    config.ts         Zod schemas for all collections
    publications/     JSON files (committed or sync-generated)
    directions/       JSON files (sync-generated from research/)
  data/
    site.ts           Profile metadata, hero copy, quick links
    projects.ts       Research theme descriptions
  layouts/
    BaseLayout.astro  HTML shell, <head>, nav, footer
  lib/
    publications.ts   getCollection helpers + serialize
    directions.ts     getCollection helpers + serialize
    publication-ui.ts Primary action + secondary links logic
  pages/              Astro page routes
  styles/
    global.css        Design tokens + all utility classes
public/
  papers/             Static PDF files (synced by sync:papers)
scripts/
  sync-paper-assets.mjs   Download PDFs referenced as local-pdf
  sync-research.mjs       Sync research/ registry → src/content/
research/                 Gitignored private registry (see above)
```
