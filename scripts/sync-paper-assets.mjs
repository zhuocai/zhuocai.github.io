import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicationsDir = path.join(rootDir, "src", "content", "publications");
const publicDir = path.join(rootDir, "public");

async function readPublicationFiles() {
  const entries = await readdir(publicationsDir, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".json"));

  return Promise.all(
    files.map(async (entry) => {
      const absolutePath = path.join(publicationsDir, entry.name);
      const raw = await readFile(absolutePath, "utf8");
      return JSON.parse(raw);
    })
  );
}

function getCandidateUrls(publication) {
  return [publication.links?.paper, publication.links?.preprint].filter(Boolean);
}

function getDestinationPath(localPdfPath) {
  if (!localPdfPath || !localPdfPath.startsWith("/papers/")) {
    throw new Error(`Invalid localPdfPath: ${localPdfPath}`);
  }

  return path.join(publicDir, localPdfPath.replace(/^\//, ""));
}

async function fetchPdf(url) {
  const headResponse = await fetch(url, { method: "HEAD", redirect: "follow" }).catch(() => null);
  const contentType = headResponse?.headers.get("content-type") ?? "";

  if (headResponse && !contentType.includes("application/pdf")) {
    throw new Error(`HEAD check failed for ${url}: ${contentType || "missing content type"}`);
  }

  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`Download failed for ${url}: ${response.status} ${response.statusText}`);
  }

  const bodyType = response.headers.get("content-type") ?? "";
  if (!bodyType.includes("application/pdf")) {
    throw new Error(`Unexpected content type for ${url}: ${bodyType || "missing content type"}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  const publications = await readPublicationFiles();
  let syncedCount = 0;

  for (const publication of publications) {
    if (publication.contentAvailability !== "local-pdf" || !publication.localPdfPath) {
      continue;
    }

    const destination = getDestinationPath(publication.localPdfPath);
    const candidates = getCandidateUrls(publication);

    await mkdir(path.dirname(destination), { recursive: true });

    let completed = false;
    for (const url of candidates) {
      try {
        const pdf = await fetchPdf(url);
        await writeFile(destination, pdf);
        console.log(`synced ${publication.title} -> ${publication.localPdfPath}`);
        syncedCount += 1;
        completed = true;
        break;
      } catch (error) {
        console.warn(`skip candidate for ${publication.title}: ${url}`);
        console.warn(String(error));
      }
    }

    if (!completed) {
      console.warn(`no downloadable public PDF found for ${publication.title}`);
    }
  }

  console.log(`paper sync complete: ${syncedCount} file(s) updated`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
