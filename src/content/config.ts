import { defineCollection, z } from "astro:content";

const directions = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    status: z.enum(["planned", "active", "under-submission"]),
    relatedPublications: z.array(z.string()).default([]),
    links: z
      .object({
        preprint: z.string().url().optional(),
        code: z.string().url().optional()
      })
      .default({})
  })
});

const publications = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).default([]),
    venue: z.string(),
    venueShort: z.string().optional(),
    year: z.number().int(),
    type: z.enum(["conference", "journal", "workshop", "manuscript"]),
    status: z.string(),
    tags: z.array(z.string()).default([]),
    selected: z.boolean().default(false),
    selectedOrder: z.number().int().optional(),
    area: z.enum(["ordering-consensus", "cryptography", "incentives-resources", "earlier-work"]).optional(),
    summary: z.string().optional(),
    abstractLabel: z.string().default("Abstract"),
    alphaOrder: z.boolean().default(false),
    note: z.string().optional(),
    abstract: z.string().optional(),
    abstractSourceUrl: z.string().url().optional(),
    localPdfPath: z.string().optional(),
    contentAvailability: z.enum(["local-pdf", "external-pdf", "abstract-only"]).default("abstract-only"),
    links: z
      .object({
        paper: z.string().url().optional(),
        preprint: z.string().url().optional(),
        doi: z.string().url().optional(),
        code: z.string().url().optional(),
        slides: z.string().url().optional(),
        video: z.string().url().optional(),
        scholar: z.string().url().optional()
      })
      .default({})
  })
});

export const collections = { publications, directions };
