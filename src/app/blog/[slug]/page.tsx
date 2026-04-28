import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Tag,
} from "lucide-react";
import {
  getPublishedPostBySlug,
  getRelatedPosts,
  getAllPublishedSlugs,
} from "@/lib/blog-posts";

type Props = { params: Promise<{ slug: string }> };

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

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "Artigo não encontrado | Blog Dr. Talles Leandro",
      description: "O conteúdo solicitado não foi encontrado.",
    };
  }

  const title = post.metaTitle || `${post.title} | Blog Dr. Talles Leandro`;
  const description = post.metaDescription || post.excerpt || "";
  const image = post.coverImage || "/img/og-image.jpg";

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.publishedAt?.toISOString(),
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) notFound();

  const related = await getRelatedPosts(post.slug, post.categoryId, 3);
  const tags = parseTags(post.tags);

  return (
    <>
      <Header />
      <main id="blog-post-page">
        <style>{`
          /* ── Hero ── */
          .blog-post-hero-wave {
            position: absolute;
            right: -92px; bottom: -122px;
            width: min(56vw, 740px); height: min(31vw, 360px);
            border-radius: 999px;
            pointer-events: none;
            border: 1px solid rgba(255,255,255,0.16);
            transform: rotate(-10deg);
            opacity: 0.42;
          }
          .blog-post-hero-wave::before {
            content: ""; position: absolute; inset: 14px;
            border-radius: inherit; border: 1px solid rgba(125,223,215,0.42);
          }
          .blog-post-hero-wave::after {
            content: ""; position: absolute; inset: 28px;
            border-radius: inherit; border: 1px solid rgba(255,255,255,0.16);
          }
          .blog-post-meta-row {
            margin-top: 1.3rem;
            display: flex; flex-wrap: wrap; gap: 0.55rem;
          }
          .blog-post-meta-row span {
            display: inline-flex; align-items: center; gap: 0.35rem;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.3);
            background: rgba(255,255,255,0.08);
            color: rgba(235,247,255,0.9);
            padding: 0.4rem 0.72rem;
            font-size: 0.75rem; font-weight: 600;
          }

          /* ── Article layout ── */
          .blog-article-wrap { background: var(--color-neutral-50); }
          .blog-back-link {
            display: inline-flex; align-items: center; gap: 0.42rem;
            margin-bottom: 1.2rem;
            font-size: 0.82rem; font-weight: 700;
            color: var(--color-primary); text-decoration: none;
          }
          .blog-back-link:hover { text-decoration: underline; }
          .blog-article-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 300px;
            gap: 1.5rem;
            align-items: start;
          }
          .blog-article-content {
            border-radius: 1rem;
            border: 1px solid var(--color-neutral-200);
            background: #fff;
            box-shadow: 0 8px 24px rgba(27,77,110,0.06);
            padding: clamp(1.4rem, 3vw, 2.2rem);
          }
          .blog-article-cover {
            position: relative;
            width: 100%; aspect-ratio: 16 / 9;
            margin-bottom: 1.6rem;
            border-radius: 0.9rem; overflow: hidden;
            border: 1px solid var(--color-neutral-200);
            background: linear-gradient(145deg, #edf3f7 0%, #f7fbfd 100%);
          }
          .blog-article-cover-placeholder {
            position: absolute; inset: 0;
            display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;
            color: var(--color-neutral-400);
            background:
              radial-gradient(circle at 20% 20%, rgba(42,122,181,0.16) 0%, transparent 46%),
              radial-gradient(circle at 85% 82%, rgba(46,196,182,0.18) 0%, transparent 42%),
              linear-gradient(145deg, #ecf2f6 0%, #f8fbfd 100%);
          }

          /* ── Rich content (HTML do Tiptap) ── */
          .blog-prose {
            font-size: 1rem;
            line-height: 1.85;
            color: var(--color-neutral-700);
          }
          .blog-prose h1, .blog-prose h2, .blog-prose h3 {
            color: var(--color-primary-dark);
            line-height: 1.25;
            margin-top: 2rem;
            margin-bottom: 0.75rem;
          }
          .blog-prose h2 { font-size: clamp(1.25rem, 2vw, 1.6rem); }
          .blog-prose h3 { font-size: clamp(1.05rem, 1.6vw, 1.25rem); }
          .blog-prose p { margin: 0 0 1rem; }
          .blog-prose p:last-child { margin-bottom: 0; }
          .blog-prose ul, .blog-prose ol {
            margin: 0.8rem 0 1rem; padding-left: 1.4rem; display: grid; gap: 0.45rem;
          }
          .blog-prose li { line-height: 1.7; }
          .blog-prose blockquote {
            border-left: 3px solid var(--color-accent);
            margin: 1.5rem 0; padding: 0.8rem 1.2rem;
            background: var(--color-accent-light);
            border-radius: 0 0.6rem 0.6rem 0;
            color: var(--color-neutral-900);
            font-style: italic;
          }
          .blog-prose code {
            background: var(--color-neutral-100);
            color: var(--color-primary-dark);
            padding: 0.15em 0.4em;
            border-radius: 0.3rem;
            font-size: 0.88em;
          }
          .blog-prose pre {
            background: var(--color-neutral-900);
            color: #e2e8f0;
            padding: 1rem 1.2rem;
            border-radius: 0.7rem;
            overflow-x: auto;
            margin: 1.2rem 0;
          }
          .blog-prose pre code { background: none; color: inherit; padding: 0; }
          .blog-prose a { color: var(--color-primary); text-decoration: underline; }
          .blog-prose a:hover { color: var(--color-primary-dark); }
          .blog-prose hr { border: none; border-top: 1px solid var(--color-neutral-200); margin: 2rem 0; }
          .blog-prose img { max-width: 100%; border-radius: 0.75rem; margin: 1rem 0; }
          .blog-prose strong { color: var(--color-neutral-900); font-weight: 700; }

          /* ── Sidebar ── */
          .blog-article-sidebar { display: grid; gap: 1rem; }
          .blog-side-card {
            border-radius: 0.95rem;
            border: 1px solid var(--color-neutral-200);
            background: #fff;
            box-shadow: 0 4px 16px rgba(27,77,110,0.06);
            padding: 1.1rem;
          }
          .blog-side-card h3 {
            margin: 0 0 0.8rem;
            font-size: 0.88rem; font-weight: 700;
            color: var(--color-primary-dark);
            text-transform: uppercase; letter-spacing: 0.04em;
          }
          .blog-side-meta { margin: 0; padding: 0; list-style: none; display: grid; gap: 0.55rem; }
          .blog-side-meta li {
            display: flex; align-items: center; gap: 0.45rem;
            color: var(--color-neutral-700); font-size: 0.84rem;
          }
          .blog-side-meta svg { color: var(--color-primary); flex-shrink: 0; }
          .blog-side-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
          .blog-side-tag {
            border-radius: 999px; border: 1px solid var(--color-neutral-200);
            background: var(--color-neutral-50); color: var(--color-neutral-700);
            font-size: 0.72rem; padding: 0.22rem 0.55rem;
          }
          .blog-side-card p {
            margin: 0; color: var(--color-neutral-700);
            line-height: 1.7; font-size: 0.87rem;
          }
          .blog-side-cta-btn {
            display: block; margin-top: 0.9rem; width: 100%; text-align: center;
            padding: 0.72rem 1rem;
            background: var(--color-primary); color: #fff;
            border-radius: 0.7rem; font-size: 0.87rem; font-weight: 700;
            text-decoration: none; transition: background 0.18s;
          }
          .blog-side-cta-btn:hover { background: var(--color-primary-dark); }

          /* ── Category chip ── */
          .blog-detail-category {
            display: inline-block;
            border-radius: 999px;
            padding: 0.25rem 0.75rem;
            font-size: 0.75rem; font-weight: 700;
            letter-spacing: 0.04em; text-transform: uppercase;
            background: rgba(46,196,182,0.12); color: var(--color-accent-dark);
            margin-bottom: 0.5rem;
          }

          /* ── Source ── */
          .blog-source {
            margin-top: 2rem; padding-top: 1.2rem;
            border-top: 1px solid var(--color-neutral-100);
            font-size: 0.8rem; color: var(--color-neutral-400);
          }
          .blog-source a { color: var(--color-primary); }

          /* ── Related ── */
          .blog-related { background: #fff; }
          .blog-related-head { max-width: 680px; margin: 0 auto 2rem; text-align: center; }
          .blog-related-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1rem;
          }
          .blog-related-card {
            border-radius: 0.95rem;
            border: 1px solid var(--color-neutral-200);
            overflow: hidden;
            background: var(--color-neutral-50);
            transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
            display: flex; flex-direction: column;
          }
          .blog-related-card:hover {
            transform: translateY(-3px);
            border-color: rgba(46,196,182,0.6);
            box-shadow: 0 10px 28px rgba(27,77,110,0.09);
          }
          .blog-related-media {
            position: relative; aspect-ratio: 16 / 9;
            background: linear-gradient(145deg, #edf3f7 0%, #f7fbfd 100%);
            flex-shrink: 0;
          }
          .blog-related-media-placeholder {
            position: absolute; inset: 0;
            display: flex; align-items: center; justify-content: center;
            color: var(--color-neutral-400);
          }
          .blog-related-body { padding: 0.9rem; flex: 1; display: flex; flex-direction: column; gap: 0.5rem; }
          .blog-related-category {
            font-size: 0.7rem; font-weight: 700; letter-spacing: 0.05em;
            text-transform: uppercase; color: var(--color-accent-dark); margin: 0;
          }
          .blog-related-body h3 {
            margin: 0; font-size: 0.95rem;
            color: var(--color-primary-dark); line-height: 1.38;
            display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
          }
          .blog-related-date { margin: 0; color: var(--color-neutral-400); font-size: 0.77rem; }
          .blog-related-link {
            display: inline-flex; align-items: center; gap: 0.38rem;
            color: var(--color-primary); font-size: 0.82rem; font-weight: 700;
            text-decoration: none; margin-top: auto; transition: gap 0.18s;
          }
          .blog-related-link:hover { gap: 0.6rem; }

          /* ── Responsive ── */
          @media (max-width: 980px) {
            .blog-article-grid { grid-template-columns: 1fr; }
            .blog-article-sidebar { grid-row: 1; }
            .blog-related-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 860px) {
            .blog-post-hero-wave { display: none; }
          }
          @media (max-width: 640px) {
            .blog-related-grid { grid-template-columns: 1fr; }
          }
        `}</style>

        {/* Hero */}
        <section className="internal-hero" data-header-theme="dark">
          <div className="internal-hero-glow" aria-hidden />
          <div className="internal-hero-lines" aria-hidden />
          <div className="blog-post-hero-wave" aria-hidden />
          <div className="container-site">
            <div className="internal-hero-inner">
              {post.categoryName && (
                <p className="internal-hero-kicker">{post.categoryName}</p>
              )}
              <h1 className="internal-hero-title" style={{ maxWidth: "820px" }}>
                {post.title}
              </h1>
              {post.subtitle && (
                <p className="internal-hero-description">{post.subtitle}</p>
              )}
              <div className="blog-post-meta-row" aria-label="Metadados do artigo">
                {post.publishedAt && (
                  <span>
                    <CalendarDays size={14} />
                    {formatDate(post.publishedAt)}
                  </span>
                )}
                {post.readingTime && (
                  <span>
                    <Clock3 size={14} />
                    {post.readingTime} min de leitura
                  </span>
                )}
                <span>Dr. Talles Leandro</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article */}
        <section className="section-pad blog-article-wrap">
          <div className="container-site">
            <Link href="/blog" className="blog-back-link">
              <ArrowLeft size={14} />
              Voltar para todos os artigos
            </Link>

            <div className="blog-article-grid">
              {/* Content */}
              <article className="blog-article-content">
                {post.coverImage && (
                  <div className="blog-article-cover">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 980px) 100vw, 66vw"
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </div>
                )}

                <div
                  className="blog-prose"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {post.source && (
                  <p className="blog-source">
                    Fonte:{" "}
                    {post.source.startsWith("http") ? (
                      <a href={post.source} target="_blank" rel="noopener noreferrer">
                        {post.source}
                      </a>
                    ) : (
                      post.source
                    )}
                  </p>
                )}
              </article>

              {/* Sidebar */}
              <aside className="blog-article-sidebar" aria-label="Informações complementares">
                <div className="blog-side-card">
                  <h3>Resumo</h3>
                  {post.excerpt && (
                    <p style={{ marginBottom: "0.9rem" }}>{post.excerpt}</p>
                  )}
                  <ul className="blog-side-meta">
                    {post.publishedAt && (
                      <li>
                        <CalendarDays size={14} />
                        {formatDate(post.publishedAt)}
                      </li>
                    )}
                    {post.readingTime && (
                      <li>
                        <Clock3 size={14} />
                        {post.readingTime} min de leitura
                      </li>
                    )}
                    {post.categoryName && (
                      <li>
                        <Tag size={14} />
                        {post.categoryName}
                      </li>
                    )}
                  </ul>
                </div>

                {tags.length > 0 && (
                  <div className="blog-side-card">
                    <h3>Tópicos</h3>
                    <div className="blog-side-tags">
                      {tags.map((tag) => (
                        <span key={tag} className="blog-side-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="blog-side-card">
                  <h3>Próximo passo</h3>
                  <p>
                    Precisa de avaliação individualizada? Agende consulta e
                    receba orientação médica direcionada ao seu caso.
                  </p>
                  <Link href="/contato" className="blog-side-cta-btn">
                    Agendar consulta
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="section-pad blog-related">
            <div className="container-site">
              <div className="blog-related-head">
                <p className="eyebrow" style={{ justifyContent: "center" }}>
                  Leitura relacionada
                </p>
                <h2 style={{ marginBottom: "0.6rem" }}>Outros artigos do blog</h2>
                <p style={{ margin: 0, color: "var(--color-neutral-700)", lineHeight: 1.72 }}>
                  Continue explorando conteúdos sobre urologia, prevenção e saúde do homem.
                </p>
              </div>

              <div className="blog-related-grid">
                {related.map((rel) => {
                  const thumb = rel.listingImage ?? rel.coverImage;
                  return (
                    <article key={rel.slug} className="blog-related-card">
                      <div className="blog-related-media">
                        {thumb ? (
                          <Image
                            src={thumb}
                            alt={rel.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div className="blog-related-media-placeholder">
                            <BookOpen size={22} />
                          </div>
                        )}
                      </div>
                      <div className="blog-related-body">
                        {rel.categoryName && (
                          <p className="blog-related-category">{rel.categoryName}</p>
                        )}
                        <h3>{rel.title}</h3>
                        {rel.publishedAt && (
                          <p className="blog-related-date">{formatDate(rel.publishedAt)}</p>
                        )}
                        <Link href={`/blog/${rel.slug}`} className="blog-related-link">
                          Ler artigo
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
