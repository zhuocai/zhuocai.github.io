/**
 * sync-research.mjs
 *
 * Reads research/manuscripts/*.md and research/directions/*.md.
 * For entries with `visibility: public`, writes JSON into src/content/.
 * Removes stale generated files tracked in research/.sync-manifest.json.
 *
 * Usage: npm run sync:research
 */

import { readdir, readFile, writeFile, unlink, mkdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const RESEARCH_DIR = path.join(root, "research");
const MANUSCRIPTS_DIR = path.join(RESEARCH_DIR, "manuscripts");
const DIRECTIONS_DIR = path.join(RESEARCH_DIR, "directions");
const PUBLICATIONS_OUT = path.join(root, "src", "content", "publications");
const DIRECTIONS_OUT = path.join(root, "src", "content", "directions");
const MANIFEST_PATH = path.join(RESEARCH_DIR, ".sync-manifest.json");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function readMarkdownFiles(dir) {
  if (!(await fileExists(dir))) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return entries.filter((e) => e.isFile() && e.name.endsWith(".md") && e.name !== "README.md");
}

async function loadManifest() {
  if (!(await fileExists(MANIFEST_PATH))) return { publications: [], directions: [] };
  try {
    const raw = await readFile(MANIFEST_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return { publications: [], directions: [] };
  }
}

async function saveManifest(manifest) {
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n", "utf8");
}

function slug(filename) {
  return path.basename(filename, ".md");
}

// ---------------------------------------------------------------------------
// Manuscript → publications JSON
// ---------------------------------------------------------------------------

function buildPublicationJson(fm) {
  const linkFields = ["paper", "preprint", "doi", "code", "slides", "video", "scholar"];
  const links = {};
  for (const key of linkFields) {
    if (fm.links?.[key]) links[key] = fm.links[key];
  }

  return {
    title: fm.title,
    authors: fm.authors ?? ["Zhuo Cai"],
    venue: fm.venue ?? "Unpublished",
    ...(fm.venueShort ? { venueShort: fm.venueShort } : {}),
    year: fm.year ?? new Date().getFullYear(),
    type: fm.publicationType ?? "manuscript",
    status: fm.status ?? "Under submission",
    tags: fm.tags ?? [],
    selected: fm.selected ?? false,
    alphaOrder: fm.alphaOrder ?? false,
    ...(fm.note ? { note: fm.note } : {}),
    ...(fm.abstract ? { abstract: fm.abstract } : {}),
    contentAvailability: fm.localPdfPath ? "local-pdf" : "abstract-only",
    ...(fm.localPdfPath ? { localPdfPath: fm.localPdfPath } : {}),
    links
  };
}

// ---------------------------------------------------------------------------
// Direction → directions JSON
// ---------------------------------------------------------------------------

function buildDirectionJson(fm) {
  const links = {};
  if (fm.links?.preprint) links.preprint = fm.links.preprint;
  if (fm.links?.code) links.code = fm.links.code;

  return {
    title: fm.title,
    summary: fm.summary ?? "",
    ...(fm.description ? { description: fm.description } : {}),
    tags: fm.tags ?? [],
    status: fm.status ?? "planned",
    relatedPublications: fm.relatedPublications ?? [],
    links
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  await mkdir(PUBLICATIONS_OUT, { recursive: true });
  await mkdir(DIRECTIONS_OUT, { recursive: true });

  const manifest = await loadManifest();
  const prevPublications = new Set(manifest.publications ?? []);
  const prevDirections = new Set(manifest.directions ?? []);
  const nextPublications = new Set();
  const nextDirections = new Set();

  let generated = 0;
  let removed = 0;

  // --- Process manuscripts ---
  const manuscriptFiles = await readMarkdownFiles(MANUSCRIPTS_DIR);
  for (const entry of manuscriptFiles) {
    const src = path.join(MANUSCRIPTS_DIR, entry.name);
    const raw = await readFile(src, "utf8");
    const { data: fm } = matter(raw);
    const s = slug(entry.name);

    if (fm.visibility !== "public") continue;

    const outPath = path.join(PUBLICATIONS_OUT, `${s}.json`);
    const json = buildPublicationJson(fm);
    await writeFile(outPath, JSON.stringify(json, null, 2) + "\n", "utf8");
    nextPublications.add(s);
    generated++;
    console.log(`  ✓ publications/${s}.json`);
  }

  // --- Process directions ---
  const directionFiles = await readMarkdownFiles(DIRECTIONS_DIR);
  for (const entry of directionFiles) {
    const src = path.join(DIRECTIONS_DIR, entry.name);
    const raw = await readFile(src, "utf8");
    const { data: fm } = matter(raw);
    const s = slug(entry.name);

    if (fm.visibility !== "public") continue;

    const outPath = path.join(DIRECTIONS_OUT, `${s}.json`);
    const json = buildDirectionJson(fm);
    await writeFile(outPath, JSON.stringify(json, null, 2) + "\n", "utf8");
    nextDirections.add(s);
    generated++;
    console.log(`  ✓ directions/${s}.json`);
  }

  // --- Cleanup stale files ---
  for (const s of prevPublications) {
    if (!nextPublications.has(s)) {
      const stale = path.join(PUBLICATIONS_OUT, `${s}.json`);
      if (await fileExists(stale)) {
        await unlink(stale);
        removed++;
        console.log(`  ✗ removed publications/${s}.json (no longer public)`);
      }
    }
  }
  for (const s of prevDirections) {
    if (!nextDirections.has(s)) {
      const stale = path.join(DIRECTIONS_OUT, `${s}.json`);
      if (await fileExists(stale)) {
        await unlink(stale);
        removed++;
        console.log(`  ✗ removed directions/${s}.json (no longer public)`);
      }
    }
  }

  // --- Save manifest ---
  await saveManifest({
    publications: [...nextPublications],
    directions: [...nextDirections]
  });

  if (generated === 0 && removed === 0) {
    console.log("  (nothing to sync — all entries are private)");
  }
  console.log(`\nSync complete: ${generated} generated, ${removed} removed.`);
}

main().catch((err) => {
  console.error("sync-research failed:", err);
  process.exit(1);
});
