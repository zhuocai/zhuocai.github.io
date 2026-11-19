import { startTransition, useDeferredValue, useState } from "react";
import type { SerializedPublication } from "../../lib/publications";
import { parseAuthors } from "../../lib/author-utils";
import {
  getPublicationActions,
  getPublicationVenueLabel
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
            <option value="manuscript">Manuscript</option>
          </select>
        </label>
      </div>

      <div className="results-meta">
        <p aria-live="polite" aria-atomic="true">
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
            const actions = getPublicationActions(publication);
            const authors = parseAuthors(publication.authors);
            const hasEqualContrib = authors.some((author) => author.equalContrib);

            return (
              <article className="publication-row" id={`paper-${publication.id}`} key={publication.id}>
                <div className="citation-venue">
                  <abbr title={publication.venue}>{getPublicationVenueLabel(publication)}</abbr>
                  <span className="citation-year">{publication.year}</span>
                </div>
                <div className="citation-content">
                  <h3>{publication.title}</h3>
                  <div className="citation-meta">
                    {authors.length > 0 && (
                      <p className="pub-author-list">
                        {authors.map((author, index) => (
                          <span key={index} className={["pub-author", author.isMe ? "pub-author--me" : ""].filter(Boolean).join(" ")}>
                            {author.name}{author.equalContrib && <sup>*</sup>}{publication.alphaOrder && <sup className="pub-author__marker">α</sup>}
                          </span>
                        ))}
                        {publication.alphaOrder && <span className="pub-author-note"><sup>α</sup> Alphabetical order</span>}
                        {hasEqualContrib && <span className="pub-author-note"><sup>*</sup> Equal contribution</span>}
                      </p>
                    )}
                    <div className="publication-links">
                      {actions.map((action) => (
                        <a key={action.href} href={action.href} target={action.external ? "_blank" : undefined} rel={action.external ? "noreferrer" : undefined}>{action.label}</a>
                      ))}
                    </div>
                  </div>
                  {publication.status !== "Published" && <p className="publication-status">{publication.status}</p>}
                  {publication.note && <p className="publication-note">{publication.note}</p>}
                  {publication.abstract && (
                    <details className="citation-abstract">
                      <summary>Abstract</summary>
                      <p>{publication.abstract}</p>
                    </details>
                  )}
                  <div className="tag-row">
                    {publication.tags.map((entry) => <span className="tag" key={entry}>{entry}</span>)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
