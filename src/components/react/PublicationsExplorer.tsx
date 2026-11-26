import { startTransition, useDeferredValue, useState } from "react";
import type { SerializedPublication } from "../../lib/publications";
import { parseAuthors } from "../../lib/author-utils";
import { getPublicationActions, getPublicationVenueLabel, publicationAreas } from "../../lib/publication-ui";

type Props = { publications: SerializedPublication[] };

function PublicationRow({ publication }: { publication: SerializedPublication }) {
  const actions = getPublicationActions(publication)
    .filter((action) => action.href !== `/publications/#paper-${publication.id}`);
  const authors = parseAuthors(publication.authors);
  const hasEqualContrib = authors.some((author) => author.equalContrib);
  return (
    <article className="publication-row" id={`paper-${publication.id}`}>
      <div className="citation-venue">
        <abbr title={publication.venue}>{getPublicationVenueLabel(publication)}</abbr>
        <span className="citation-year">{publication.year}</span>
      </div>
      <div className="citation-content">
        <h3>{publication.title}</h3>
        <div className="citation-meta">
          <p className="pub-author-list">
            {authors.map((author, index) => (
              <span key={index} className={["pub-author", author.isMe ? "pub-author--me" : ""].filter(Boolean).join(" ")}>
                {author.name}{author.equalContrib && <sup>*</sup>}{publication.alphaOrder && <sup className="pub-author__marker">α</sup>}
              </span>
            ))}
            {publication.alphaOrder && <span className="pub-author-note"><sup>α</sup> Alphabetical order</span>}
            {hasEqualContrib && <span className="pub-author-note"><sup>*</sup> Equal contribution</span>}
          </p>
          <div className="publication-links">
            {actions.map((action) => <a key={action.href} href={action.href} target={action.external ? "_blank" : undefined} rel={action.external ? "noreferrer" : undefined}>{action.label}</a>)}
          </div>
        </div>
        {publication.status !== "Published" && <p className="publication-status">{publication.status}</p>}
        {publication.summary && <p className="publication-summary">{publication.summary}</p>}
        {publication.note && <p className="publication-note">{publication.note}</p>}
        {publication.abstract && (
          <details className="citation-abstract">
            <summary>{publication.abstractLabel}</summary>
            <p>{publication.abstract}</p>
          </details>
        )}
        <div className="tag-row">{publication.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      </div>
    </article>
  );
}

export default function PublicationsExplorer({ publications }: Props) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const [area, setArea] = useState("all");
  const [type, setType] = useState("all");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const years = [...new Set(publications.map((publication) => publication.year.toString()))];
  const filtered = publications.filter((publication) => {
    const searchable = [publication.title, ...publication.authors, publication.venue, publication.venueShort, publication.summary, ...publication.tags].join(" ").toLowerCase();
    return (!deferredQuery || searchable.includes(deferredQuery)) &&
      (year === "all" || publication.year.toString() === year) &&
      (area === "all" || publication.area === area) &&
      (type === "all" || publication.type === type);
  });
  const groups = [
    { id: "published-papers", title: "Published and accepted papers", entries: filtered.filter((p) => p.type !== "manuscript") },
    { id: "preprints", title: "Preprints", entries: filtered.filter((p) => p.type === "manuscript") }
  ];
  const reset = () => startTransition(() => { setQuery(""); setYear("all"); setArea("all"); setType("all"); });
  return (
    <div className="publications-shell">
      <div className="filter-bar">
        <label>
          <span className="sr-only">Search publications</span>
          <input className="field" type="search" value={query} placeholder="Search papers or keywords" onChange={(event) => setQuery(event.currentTarget.value)} />
        </label>
        <label>
          <span className="sr-only">Filter by year</span>
          <select className="select" value={year} onChange={(event) => setYear(event.currentTarget.value)}>
            <option value="all">All years</option>
            {years.map((entry) => <option key={entry} value={entry}>{entry}</option>)}
          </select>
        </label>
        <label>
          <span className="sr-only">Filter by research area</span>
          <select className="select" value={area} onChange={(event) => setArea(event.currentTarget.value)}>
            <option value="all">All research areas</option>
            {Object.entries(publicationAreas).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
          </select>
        </label>
        <label>
          <span className="sr-only">Filter by publication type</span>
          <select className="select" value={type} onChange={(event) => setType(event.currentTarget.value)}>
            <option value="all">All types</option>
            <option value="conference">Conference</option>
            <option value="journal">Journal</option>
            <option value="workshop">Workshop</option>
            <option value="manuscript">Preprint</option>
          </select>
        </label>
      </div>
      <div className="results-meta">
        <p aria-live="polite" aria-atomic="true">Showing <strong>{filtered.length}</strong> of <strong>{publications.length}</strong> papers</p>
        <button className="link-pill" type="button" onClick={reset}>Reset filters</button>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state">No papers match these filters. Try another keyword or reset the filters.</div>
      ) : groups.filter((group) => group.entries.length > 0).map((group) => (
        <section className="publication-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-heading`}>
          {group.id === "preprints" && <span id="manuscripts" aria-hidden="true" />}
          <h2 id={`${group.id}-heading`}>{group.title} <span className="group-count">({group.entries.length})</span></h2>
          <div className="results-grid">{group.entries.map((publication) => <PublicationRow key={publication.id} publication={publication} />)}</div>
        </section>
      ))}
    </div>
  );
}
