import { getCollection, type CollectionEntry } from "astro:content";

export type DirectionEntry = CollectionEntry<"directions">;

export type SerializedDirection = {
  id: string;
  title: string;
  summary: string;
  description?: string;
  tags: string[];
  status: "planned" | "active" | "under-submission";
  relatedPublications: string[];
  links: {
    preprint?: string;
    code?: string;
  };
};

export async function getAllDirections(): Promise<DirectionEntry[]> {
  const directions = await getCollection("directions");
  return directions.sort((a, b) => {
    const order = { active: 0, "under-submission": 1, planned: 2 };
    return order[a.data.status] - order[b.data.status];
  });
}

export function serializeDirection(direction: DirectionEntry): SerializedDirection {
  return {
    id: direction.id,
    title: direction.data.title,
    summary: direction.data.summary,
    description: direction.data.description,
    tags: direction.data.tags,
    status: direction.data.status,
    relatedPublications: direction.data.relatedPublications,
    links: direction.data.links
  };
}
