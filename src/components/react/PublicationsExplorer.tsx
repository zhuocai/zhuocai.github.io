import { startTransition, useDeferredValue, useState } from "react";
import type { SerializedPublication } from "../../lib/publications";
import {
  getPublicationPrimaryAction,
  getPublicationSecondaryLinks
} from "../../lib/publication-ui";

type Props = {
  publications: SerializedPublication[];
};

export default function PublicationsExplorer({ publications }: Props) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const [tag, setTag] = useState("all");
  const [type, setType] = useState("all");

  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const years = [...new Set(publications.map((publication) => publication.year.toString()))];
  const tags = [...new Set(publications.flatMap((publication) => publication.tags))].sort((a, b) =>
    a.localeCompare(b)
  );

  const filteredPublications = publications.filter((publication) => {
    const matchesQuery =
      deferredQuery.length === 0 ||
      publication.title.toLowerCase().includes(deferredQuery) ||
      publication.authors.join(" ").toLowerCase().includes(deferredQuery) ||
      publication.venue.toLowerCase().includes(deferredQuery) ||
      publication.tags.join(" ").toLowerCase().includes(deferredQuery);
    const matchesYear = year === "all" || publication.year.toString() === year;
    const matchesTag = tag === "all" || publication.tags.includes(tag);
    const matchesType = type === "all" || publication.type === type;

    return matchesQuery && matchesYear && matchesTag && matchesType;
  });

  const resetFilters = () => {
    startTransition(() => {
      setQuery("");
      setYear("all");
      setTag("all");
      setType("all");
    });
  };

  return (
    <div className="publications-shell">
      <div className="filter-bar">
        <label>
          <span className="sr-only">Search publications</span>
          <input
            className="field"
            type="search"
            value={query}
            placeholder="Search titles, venues, authors, or tags"
            onChange={(event) => {
              const nextValue = event.currentTarget.value;
              startTransition(() => setQuery(nextValue));
            }}
          />
        </label>

        <label>
          <span className="sr-only">Filter by year</span>
          <select
            className="select"
            value={year}
            onChange={(event) => {
              const nextValue = event.currentTarget.value;
              startTransition(() => setYear(nextValue));
            }}
          >
            <option value="all">All years</option>
            {years.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="sr-only">Filter by tag</span>
          <select
            className="select"
            value={tag}
            onChange={(event) => {
              const nextValue = event.currentTarget.value;
              startTransition(() => setTag(nextValue));
            }}
          >
            <option value="all">All tags</option>
            {tags.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="sr-only">Filter by type</span>
          <select
            className="select"
            value={type}
            onChange={(event) => {
              const nextValue = event.currentTarget.value;
              startTransition(() => setType(nextValue));
            }}
          >
            <option value="all">All types</option>
            <option value="conference">Conference</option>
            <option value="journal">Journal</option>
            <option value="workshop">Workshop</option>
          </select>
        </label>
      </div>

      <div className="results-meta">
        <p>
          Showing <strong>{filteredPublications.length}</strong> of <strong>{publications.length}</strong>{" "}
          publications
        </p>
        <button className="link-pill" type="button" onClick={resetFilters}>
          Reset filters
        </button>
      </div>

      {filteredPublications.length === 0 ? (
        <div className="empty-state">
          No results matched the current filters. Try broadening the search or clearing the tag and year filters.
        </div>
      ) : (
        <div className="results-grid">
          {filteredPublications.map((publication) => {
            const primaryAction = getPublicationPrimaryAction(publication);
            const secondaryLinks = getPublicationSecondaryLinks(publication);

            return (
              <article className="publication-card" key={publication.id}>
                <div className="publication-card__meta">
                  <span className="pill">{publication.venueShort ?? publication.venue}</span>
                  <span className="status-badge">{publication.status}</span>
                </div>

                <h3>{publication.title}</h3>
                <p className="publication-card__authors">{publication.authors.join(", ")}</p>
                <p className="publication-card__venue">
                  {publication.venue} <span>· {publication.year}</span>
                </p>

                {publication.note ? <p className="publication-card__note">{publication.note}</p> : null}

                {publication.abstract ? <p className="publication-card__abstract">{publication.abstract}</p> : null}

                <div className="tag-row">
                  {publication.tags.map((entry) => (
                    <span className="tag" key={entry}>
                      {entry}
                    </span>
                  ))}
                </div>

                <div className="publication-card__actions">
                  <a
                    className="button button--ghost button--small"
                    href={primaryAction.href}
                    target={primaryAction.external ? "_blank" : undefined}
                    rel={primaryAction.external ? "noreferrer" : undefined}
                  >
                    {primaryAction.label}
                  </a>
                </div>

                {secondaryLinks.length > 0 ? (
                  <div className="publication-card__links">
                    {secondaryLinks.map((link) => (
                      <a className="inline-link" href={link.href} target="_blank" rel="noreferrer" key={link.key}>
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
