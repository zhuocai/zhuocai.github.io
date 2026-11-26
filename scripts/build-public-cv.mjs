/** Build the website CV without the application CV's unreleased-manuscript section. */
import { mkdtemp, readFile, writeFile, copyFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(root, "..", "cv-caizhuo");
const buildDir = await mkdtemp(path.join(tmpdir(), "zhuo-public-cv-"));

try {
  const original = await readFile(path.join(source, "cv-caizhuo.tex"), "utf8");
  const manuscriptSection = /\\CVSection\{Manuscripts\}\s*\\CVManuscripts/;
  if (!manuscriptSection.test(original)) {
    throw new Error("Application CV structure changed. Review its manuscript section before rebuilding the public copy.");
  }
  await writeFile(path.join(buildDir, "cv-caizhuo.tex"), original.replace(manuscriptSection, ""));
  await copyFile(path.join(source, "faculty-publications.tex"), path.join(buildDir, "faculty-publications.tex"));
  const style = await readFile(path.join(source, "faculty-cv.sty"), "utf8");
  await writeFile(path.join(buildDir, "faculty-cv.sty"), style.replace(
    "Distributed Algorithms · Decentralized System Security· Blockchains",
    "Decentralized System Security · Distributed Algorithms · Blockchains"
  ));

  for (let pass = 0; pass < 2; pass++) {
    const result = spawnSync("xelatex", ["-interaction=nonstopmode", "-halt-on-error", "cv-caizhuo.tex"], {
      cwd: buildDir,
      encoding: "utf8"
    });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(result.stdout.slice(-5000) + result.stderr);
  }

  await copyFile(path.join(buildDir, "cv-caizhuo.pdf"), path.join(root, "public", "cv", "caizhuo_CV.pdf"));
  console.log("Built public/cv/caizhuo_CV.pdf without unreleased manuscripts. Application CV sources and PDF are unchanged.");
} finally {
  await rm(buildDir, { recursive: true, force: true });
}
