import { getCollection, type CollectionEntry } from "astro:content";

export type PublicationEntry = CollectionEntry<"publications">;
export type PublicationLinkMap = PublicationEntry["data"]["links"];

export type SerializedPublication = {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  venueShort?: string;
  year: number;
  type: "conference" | "journal" | "workshop" | "manuscript";
  status: string;
  tags: string[];
  selected: boolean;
  selectedOrder?: number;
  area?: "ordering-consensus" | "cryptography" | "incentives-resources" | "earlier-work";
  summary?: string;
  abstractLabel: string;
  alphaOrder: boolean;
  note?: string;
  abstract?: string;
  abstractSourceUrl?: string;
  localPdfPath?: string;
  contentAvailability: "local-pdf" | "external-pdf" | "abstract-only";
  links: PublicationLinkMap;
};

export function comparePublications(a: PublicationEntry, b: PublicationEntry) {
  if (a.data.year !== b.data.year) {
    return b.data.year - a.data.year;
  }

  return a.data.title.localeCompare(b.data.title);
}

export async function getAllPublications() {
  const publications = await getCollection("publications");
  // Unreleased manuscripts must never reach rendered pages or React island props.
  return publications.filter((publication) => publication.data.type !== "manuscript" ||
    Boolean(publication.data.links.paper || publication.data.links.preprint))
    .sort(comparePublications);
}

export async function getSelectedPublications(limit = 5) {
  const publications = await getAllPublications();
  return publications.filter((publication) => publication.data.selected && publication.data.type !== "manuscript")
    .sort((a, b) => (a.data.selectedOrder ?? 999) - (b.data.selectedOrder ?? 999))
    .slice(0, limit);
}

export async function getPublicationMap() {
  const publications = await getAllPublications();
  return new Map(publications.map((publication) => [publication.id, publication]));
}

export function serializePublication(publication: PublicationEntry): SerializedPublication {
  return {
    id: publication.id,
    title: publication.data.title,
    authors: publication.data.authors,
    venue: publication.data.venue,
    venueShort: publication.data.venueShort,
    year: publication.data.year,
    type: publication.data.type,
    status: publication.data.status,
    tags: publication.data.tags,
    selected: publication.data.selected,
    selectedOrder: publication.data.selectedOrder,
    area: publication.data.area,
    summary: publication.data.summary,
    abstractLabel: publication.data.abstractLabel,
    alphaOrder: publication.data.alphaOrder,
    note: publication.data.note,
    abstract: publication.data.abstract,
    abstractSourceUrl: publication.data.abstractSourceUrl,
    localPdfPath: publication.data.localPdfPath,
    contentAvailability: publication.data.contentAvailability,
    links: publication.data.links
  };
}

export function groupPublicationsByYear(publications: PublicationEntry[]) {
  return publications.reduce(
    (groups, publication) => {
      const bucket = groups.get(publication.data.year) ?? [];
      bucket.push(publication);
      groups.set(publication.data.year, bucket);
      return groups;
    },
    new Map<number, PublicationEntry[]>()
  );
}

export type { ParsedAuthor } from "./author-utils";
export { parseAuthors } from "./author-utils";
