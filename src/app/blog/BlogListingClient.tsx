"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Search, ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import type { BlogPostSummary, BlogCategory } from "@/lib/blog-posts";

type Props = {
  posts: BlogPostSummary[];
  categories: BlogCategory[];
};

function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function parseTags(tags: string | null): string[] {
  if (!tags) return [];
  return tags.split(",").map((t) => t.trim()).filter(Boolean);
}

export default function BlogListingClient({ posts, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return posts.filter((post) => {
      const categoryMatch =
        selectedCategory === "all" || post.categoryId === selectedCategory;
      const termMatch =
        term.length === 0 ||
        post.title.toLowerCase().includes(term) ||
        (post.excerpt ?? "").toLowerCase().includes(term) ||
        (post.tags ?? "").toLowerCase().includes(term);
      return categoryMatch && termMatch;
    });
  }, [posts, search, selectedCategory]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section className="section-pad blog-catalog">
      <style>{`
        .blog-catalog { background: var(--color-neutral-50); }

        /* ── Toolbar ── */
        .blog-toolbar {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          margin-bottom: 1.5rem;
        }
        .blog-search-wrap {
          position: relative;
          max-width: 520px;
          width: 100%;
        }
        .blog-search-wrap svg {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-neutral-400);
          pointer-events: none;
        }
        .blog-search-wrap input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border-radius: 0.75rem;
          border: 1px solid var(--color-neutral-200);
          background: #fff;
          font-size: 0.9rem;
          color: var(--color-neutral-900);
          transition: border-color 0.18s, box-shadow 0.18s;
          outline: none;
        }
        .blog-search-wrap input:focus {
          border-color: var(--color-primary-light);
          box-shadow: 0 0 0 3px rgba(42,122,181,0.12);
        }
        .blog-filter-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .blog-filter-chip {
          border-radius: 999px;
          border: 1px solid var(--color-neutral-200);
          background: #fff;
          color: var(--color-neutral-700);
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.38rem 0.9rem;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .blog-filter-chip:hover { border-color: var(--color-primary-light); color: var(--color-primary); }
        .blog-filter-chip.is-active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: #fff;
        }
        .blog-count {
          font-size: 0.82rem;
          color: var(--color-neutral-400);
          margin: 0;
        }

        /* ── Featured card ── */
        .blog-featured-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-radius: 1.1rem;
          border: 1px solid var(--color-neutral-200);
          background: #fff;
          box-shadow: 0 4px 24px rgba(27,77,110,0.07);
          overflow: hidden;
          margin-bottom: 2.2rem;
          transition: box-shadow 0.22s, transform 0.22s;
          text-decoration: none;
          color: inherit;
        }
        .blog-featured-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(27,77,110,0.12);
        }
        .blog-featured-media {
          position: relative;
          min-height: 280px;
          background: linear-gradient(145deg, #edf3f7 0%, #f7fbfd 100%);
        }
        .blog-featured-media-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: var(--color-neutral-400);
          background:
            radial-gradient(circle at 20% 20%, rgba(42,122,181,0.14) 0%, transparent 46%),
            radial-gradient(circle at 85% 82%, rgba(46,196,182,0.16) 0%, transparent 42%),
            linear-gradient(145deg, #ecf2f6 0%, #f8fbfd 100%);
        }
        .blog-featured-body {
          padding: clamp(1.4rem, 3vw, 2.2rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.9rem;
        }
        .blog-featured-kicker {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .blog-post-category-badge {
          display: inline-block;
          border-radius: 999px;
          padding: 0.22rem 0.65rem;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          background: rgba(46,196,182,0.12);
          color: var(--color-accent-dark);
        }
        .blog-post-meta-line {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.78rem;
          color: var(--color-neutral-400);
        }
        .blog-featured-body h2 {
          margin: 0;
          font-size: clamp(1.25rem, 2.2vw, 1.55rem);
          color: var(--color-primary-dark);
          line-height: 1.28;
        }
        .blog-featured-body p {
          margin: 0;
          color: var(--color-neutral-700);
          line-height: 1.75;
          font-size: 0.93rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-featured-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }
        .blog-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          border-radius: 999px;
          border: 1px solid var(--color-neutral-200);
          background: var(--color-neutral-50);
          color: var(--color-neutral-700);
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
        }
        .blog-featured-link {
          display: inline-flex;
          align-items: center;
          gap: 0.42rem;
          color: var(--color-primary);
          font-size: 0.87rem;
          font-weight: 700;
          margin-top: auto;
          transition: gap 0.18s;
        }
        .blog-featured-link:hover { gap: 0.7rem; }

        /* ── Grid ── */
        .blog-post-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.1rem;
        }
        .blog-post-card {
          border-radius: 1rem;
          border: 1px solid var(--color-neutral-200);
          background: #fff;
          box-shadow: 0 2px 12px rgba(27,77,110,0.05);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
        }
        .blog-post-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(27,77,110,0.1);
          border-color: rgba(46,196,182,0.5);
        }
        .blog-post-media {
          position: relative;
          aspect-ratio: 16 / 9;
          background: linear-gradient(145deg, #edf3f7 0%, #f7fbfd 100%);
          flex-shrink: 0;
        }
        .blog-post-media-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          color: var(--color-neutral-400);
          font-size: 0.72rem;
          background:
            radial-gradient(circle at 20% 20%, rgba(42,122,181,0.1) 0%, transparent 46%),
            radial-gradient(circle at 85% 82%, rgba(46,196,182,0.12) 0%, transparent 42%),
            linear-gradient(145deg, #ecf2f6 0%, #f8fbfd 100%);
        }
        .blog-post-body {
          padding: 1.1rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 0.6rem;
        }
        .blog-post-body h3 {
          margin: 0;
          font-size: 1rem;
          color: var(--color-primary-dark);
          line-height: 1.38;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-post-body p {
          margin: 0;
          color: var(--color-neutral-700);
          font-size: 0.85rem;
          line-height: 1.7;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }
        .blog-post-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 0.7rem;
          border-top: 1px solid var(--color-neutral-100);
        }
        .blog-post-link {
          display: inline-flex;
          align-items: center;
          gap: 0.38rem;
          color: var(--color-primary);
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          transition: gap 0.18s;
        }
        .blog-post-link:hover { gap: 0.6rem; }

        /* ── Empty ── */
        .blog-empty-state {
          text-align: center;
          padding: clamp(3rem, 8vw, 5rem) 1rem;
          color: var(--color-neutral-700);
        }
        .blog-empty-state h3 { margin: 0 0 0.6rem; color: var(--color-primary-dark); }
        .blog-empty-state p { margin: 0; font-size: 0.92rem; }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .blog-featured-card { grid-template-columns: 1fr; }
          .blog-featured-media { min-height: 220px; aspect-ratio: 16 / 7; }
          .blog-post-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          .blog-post-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="container-site">
        {/* Toolbar */}
        <div className="blog-toolbar">
          <div className="blog-search-wrap">
            <Search size={17} aria-hidden />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título, tema ou palavra-chave…"
              aria-label="Buscar artigos"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
            <div className="blog-filter-row" role="toolbar" aria-label="Filtrar por categoria">
              <button
                type="button"
                className={`blog-filter-chip ${selectedCategory === "all" ? "is-active" : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`blog-filter-chip ${selectedCategory === cat.id ? "is-active" : ""}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={selectedCategory === cat.id && cat.color ? { background: cat.color, borderColor: cat.color } : undefined}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <p className="blog-count">
              {filtered.length} {filtered.length === 1 ? "artigo" : "artigos"}
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="blog-empty-state">
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📭</div>
            <h3>Nenhum artigo encontrado</h3>
            <p>Tente ajustar a busca ou selecionar outra categoria.</p>
          </div>
        ) : (
          <>
            {/* Featured — primeiro post em destaque */}
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="blog-featured-card">
                <div className="blog-featured-media">
                  {featured.listingImage ?? featured.coverImage ? (
                    <Image
                      src={(featured.listingImage ?? featured.coverImage)!}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 980px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className="blog-featured-media-placeholder">
                      <BookOpen size={28} />
                    </div>
                  )}
                </div>
                <div className="blog-featured-body">
                  <div className="blog-featured-kicker">
                    {featured.categoryName && (
                      <span
                        className="blog-post-category-badge"
                        style={featured.categoryColor ? { background: featured.categoryColor + "20", color: featured.categoryColor } : undefined}
                      >
                        {featured.categoryName}
                      </span>
                    )}
                    <span className="blog-post-meta-line">
                      <Clock size={12} />
                      {featured.readingTime} min
                    </span>
                  </div>
                  <h2>{featured.title}</h2>
                  {featured.excerpt && <p>{featured.excerpt}</p>}
                  {parseTags(featured.tags).length > 0 && (
                    <div className="blog-featured-tags">
                      {parseTags(featured.tags).slice(0, 4).map((tag) => (
                        <span key={tag} className="blog-tag">
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="blog-featured-link">
                    Ler artigo completo
                    <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            )}

            {/* Grid dos demais */}
            {rest.length > 0 && (
              <div className="blog-post-grid">
                {rest.map((post) => {
                  const thumb = post.listingImage ?? post.coverImage;
                  const tags = parseTags(post.tags);
                  return (
                    <article key={post.slug} className="blog-post-card">
                      <div className="blog-post-media">
                        {thumb ? (
                          <Image
                            src={thumb}
                            alt={post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div className="blog-post-media-placeholder">
                            <BookOpen size={20} />
                          </div>
                        )}
                      </div>
                      <div className="blog-post-body">
                        <div className="blog-featured-kicker">
                          {post.categoryName && (
                            <span
                              className="blog-post-category-badge"
                              style={post.categoryColor ? { background: post.categoryColor + "20", color: post.categoryColor } : undefined}
                            >
                              {post.categoryName}
                            </span>
                          )}
                          {post.readingTime && (
                            <span className="blog-post-meta-line">
                              <Clock size={11} />
                              {post.readingTime} min
                            </span>
                          )}
                        </div>
                        <h3>{post.title}</h3>
                        {post.excerpt && <p>{post.excerpt}</p>}
                        {tags.length > 0 && (
                          <div className="blog-featured-tags">
                            {tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="blog-tag">
                                <Tag size={9} />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="blog-post-footer">
                          <span className="blog-post-meta-line">
                            {formatDate(post.publishedAt)}
                          </span>
                          <Link href={`/blog/${post.slug}`} className="blog-post-link">
                            Ler artigo
                            <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
