import type { SerializedPublication } from "./publications";

export type PublicationLinkEntry = {
  key: "paper" | "preprint" | "doi" | "code" | "slides" | "video" | "scholar";
  label: string;
  href: string;
};

export type PublicationPrimaryAction = {
  href: string;
  label: string;
  external: boolean;
};

export function getPublicationVenueLabel(publication: SerializedPublication): string {
  const venue = publication.venueShort ?? publication.venue;
  return venue.replace(new RegExp(`\\s*${publication.year}$`), "").trim();
}

export function getPublicationActions(publication: SerializedPublication): PublicationPrimaryAction[] {
  const primary = getPublicationPrimaryAction(publication);
  const actions = [
    { ...primary, label: /^(Local|External) PDF$/.test(primary.label) ? "PDF" : primary.label },
    ...getPublicationSecondaryLinks(publication).map((link) => ({ ...link, external: true }))
  ];
  return actions.filter((action, index) => actions.findIndex((other) => other.href === action.href) === index);
}

const linkLabels: Array<[PublicationLinkEntry["key"], string]> = [
  ["paper", "Paper"],
  ["preprint", "Preprint"],
  ["doi", "DOI"],
  ["code", "Code"],
  ["slides", "Slides"],
  ["video", "Video"],
  ["scholar", "Scholar"]
];

export function getPublicationLinks(publication: SerializedPublication): PublicationLinkEntry[] {
  return linkLabels.flatMap(([key, label]) => {
    const href = publication.links[key];
    return href ? [{ key, label, href }] : [];
  });
}

export function getPublicationPrimaryAction(publication: SerializedPublication): PublicationPrimaryAction {
  if (publication.contentAvailability === "local-pdf" && publication.localPdfPath) {
    return {
      href: publication.localPdfPath,
      label: "Local PDF",
      external: false
    };
  }

  if (publication.contentAvailability === "external-pdf") {
    const externalPdf = publication.links.paper ?? publication.links.preprint;
    if (externalPdf) {
      return {
        href: externalPdf,
        label: "External PDF",
        external: true
      };
    }
  }

  if (publication.abstractSourceUrl) {
    return {
      href: publication.abstractSourceUrl,
      label: "Abstract",
      external: true
    };
  }

  return {
    href: `/research/#paper-${publication.id}`,
    label: "Summary",
    external: false
  };
}

export function getPublicationSecondaryLinks(publication: SerializedPublication) {
  const primaryAction = getPublicationPrimaryAction(publication);

  return getPublicationLinks(publication).filter((link) => {
    return !(primaryAction.external && link.href === primaryAction.href);
  });
}
