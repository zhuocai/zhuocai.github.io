import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Keep the public filename stable while refreshing links when the PDF changes.
const pdfPath = "/cv/caizhuo_CV.pdf";
const version = createHash("sha256")
  .update(readFileSync(resolve("public", "cv", "caizhuo_CV.pdf")))
  .digest("hex")
  .slice(0, 12);

export const cvDocument = {
  href: `${pdfPath}?v=${version}`,
  downloadName: "Zhuo_Cai_CV.pdf",
  updated: "2026-11-19",
  pageCount: 2,
  expectedGraduation: "July 2027"
} as const;
