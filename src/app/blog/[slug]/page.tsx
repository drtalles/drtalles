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
  UserRound,
} from "lucide-react";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";

type BlogPostDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artigo não encontrado | Blog Dr. Talles Leandro",
      description: "O conteúdo solicitado não foi encontrado.",
    };
  }

  return {
    title: `${post.title} | Blog Dr. Talles Leandro`,
    description: post.excerpt,
  };
}

export default async function BlogPostDetailPage({
  params,
}: BlogPostDetailPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);

  return (
    <>
      <Header />
      <main id="blog-post-page">
        <style>{`
          .blog-post-hero-wave {
            position: absolute;
            right: -92px;
            bottom: -122px;
            width: min(56vw, 740px);
            height: min(31vw, 360px);
            border-radius: 999px;
            pointer-events: none;
            border: 1px solid rgba(255,255,255,0.16);
            transform: rotate(-10deg);
            opacity: 0.42;
          }

          .blog-post-hero-wave::before {
            content: "";
            position: absolute;
            inset: 14px;
            border-radius: inherit;
            border: 1px solid rgba(125,223,215,0.42);
          }

          .blog-post-hero-wave::after {
            content: "";
            position: absolute;
            inset: 28px;
            border-radius: inherit;
            border: 1px solid rgba(255,255,255,0.16);
          }

          .blog-post-hero-intro {
            max-width: 100%;
          }

          .blog-post-hero-intro .internal-hero-title {
            max-width: 100%;
            white-space: nowrap;
            text-wrap: nowrap;
          }

          .blog-post-meta-row {
            margin-top: 1.3rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.55rem;
          }

          .blog-post-meta-row span {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.3);
            background: rgba(255,255,255,0.08);
            color: rgba(235,247,255,0.9);
            padding: 0.4rem 0.72rem;
            font-size: 0.75rem;
            font-weight: 600;
          }

          .blog-article-wrap {
            background: var(--color-neutral-50);
          }

          .blog-back-link {
            display: inline-flex;
            align-items: center;
            gap: 0.42rem;
            margin-bottom: 0.95rem;
            font-size: 0.82rem;
            font-weight: 700;
            color: var(--color-primary);
            text-decoration: none;
          }

          .blog-back-link:hover {
            text-decoration: underline;
          }

          .blog-article-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(260px, 320px);
            gap: 1rem;
            align-items: start;
          }

          .blog-article-content {
            border-radius: 1rem;
            border: 1px solid var(--color-neutral-200);
            background: #fff;
            box-shadow: 0 8px 24px rgba(27,77,110,0.06);
            padding: clamp(1.2rem, 2.6vw, 2rem);
          }

          .blog-article-cover {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 9;
            margin-bottom: 1.2rem;
            border-radius: 0.9rem;
            overflow: hidden;
            border: 1px solid var(--color-neutral-200);
            background: linear-gradient(145deg, #edf3f7 0%, #f7fbfd 100%);
          }

          .blog-article-cover img {
            display: block;
          }

          .blog-article-cover-placeholder {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            color: var(--color-neutral-400);
            background:
              radial-gradient(circle at 20% 20%, rgba(42,122,181,0.16) 0%, transparent 46%),
              radial-gradient(circle at 85% 82%, rgba(46,196,182,0.18) 0%, transparent 42%),
              linear-gradient(145deg, #ecf2f6 0%, #f8fbfd 100%);
          }

          .blog-article-cover-placeholder span {
            font-size: 0.8rem;
            font-weight: 600;
            letter-spacing: 0.03em;
            color: var(--color-neutral-700);
          }

          .blog-article-section + .blog-article-section {
            margin-top: 1.7rem;
            padding-top: 1.7rem;
            border-top: 1px solid var(--color-neutral-100);
          }

          .blog-article-section h2 {
            margin: 0 0 0.8rem;
            font-size: clamp(1.3rem, 2.2vw, 1.8rem);
            color: var(--color-primary-dark);
            line-height: 1.25;
          }

          .blog-article-section p {
            margin: 0;
            color: var(--color-neutral-700);
            line-height: 1.85;
            font-size: 0.98rem;
          }

          .blog-article-section p + p {
            margin-top: 0.9rem;
          }

          .blog-article-section ul {
            margin: 0.95rem 0 0;
            padding-left: 1.05rem;
            display: grid;
            gap: 0.55rem;
          }

          .blog-article-section li {
            color: var(--color-neutral-700);
            line-height: 1.7;
            font-size: 0.95rem;
          }

          .blog-article-sidebar {
            display: grid;
            gap: 0.85rem;
          }

          .blog-side-card {
            border-radius: 0.95rem;
            border: 1px solid var(--color-neutral-200);
            background: #fff;
            box-shadow: 0 6px 18px rgba(27,77,110,0.06);
            padding: 1rem;
          }

          .blog-side-card h3 {
            margin: 0 0 0.7rem;
            font-family: var(--font-body);
            font-size: 0.92rem;
            color: var(--color-primary-dark);
          }

          .blog-side-meta {
            margin: 0;
            padding: 0;
            list-style: none;
            display: grid;
            gap: 0.52rem;
          }

          .blog-side-meta li {
            display: flex;
            align-items: center;
            gap: 0.42rem;
            color: var(--color-neutral-700);
            font-size: 0.84rem;
          }

          .blog-side-meta svg {
            color: var(--color-primary);
            flex-shrink: 0;
          }

          .blog-side-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
          }

          .blog-side-tags span {
            border-radius: 999px;
            border: 1px solid var(--color-neutral-200);
            background: var(--color-neutral-50);
            color: var(--color-neutral-700);
            font-size: 0.72rem;
            padding: 0.25rem 0.52rem;
            line-height: 1;
          }

          .blog-side-card p {
            margin: 0;
            color: var(--color-neutral-700);
            line-height: 1.7;
            font-size: 0.87rem;
          }

          .blog-side-card .btn {
            margin-top: 0.85rem;
            width: 100%;
          }

          .blog-related {
            background: #fff;
          }

          .blog-related-head {
            max-width: 760px;
            margin: 0 auto 1.6rem;
            text-align: center;
          }

          .blog-related-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1rem;
          }

          .blog-related-card {
            border-radius: 0.95rem;
            border: 1px solid var(--color-neutral-200);
            background: var(--color-neutral-50);
            padding: 1rem;
            transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          }

          .blog-related-card:hover {
            transform: translateY(-3px);
            border-color: rgba(46,196,182,0.72);
            box-shadow: 0 12px 28px rgba(27,77,110,0.09);
          }

          .blog-related-category {
            margin: 0 0 0.52rem;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: var(--color-accent-dark);
          }

          .blog-related-card h3 {
            margin: 0 0 0.55rem;
            font-size: 1.01rem;
            color: var(--color-primary-dark);
            line-height: 1.38;
          }

          .blog-related-date {
            margin: 0 0 0.7rem;
            color: var(--color-neutral-400);
            font-size: 0.8rem;
          }

          .blog-related-link {
            display: inline-flex;
            align-items: center;
            gap: 0.38rem;
            color: var(--color-primary);
            font-size: 0.82rem;
            font-weight: 700;
            text-decoration: none;
          }

          .blog-related-link:hover {
            text-decoration: underline;
          }

          @media (max-width: 980px) {
            .blog-post-hero-intro .internal-hero-title {
              white-space: normal;
              text-wrap: balance;
            }

            .blog-article-grid {
              grid-template-columns: 1fr;
            }

            .blog-related-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 860px) {
            .blog-post-hero-wave {
              display: none;
            }
          }

          @media (max-width: 640px) {
            .blog-related-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <section className="internal-hero" data-header-theme="dark">
          <div className="internal-hero-glow" aria-hidden />
          <div className="internal-hero-lines" aria-hidden />
          <div className="blog-post-hero-wave" aria-hidden />

          <div className="container-site">
            <div className="internal-hero-inner blog-post-hero-intro">
              <p className="internal-hero-kicker">{post.category}</p>
              <h1 className="internal-hero-title">{post.title}</h1>
              <p className="internal-hero-description">{post.excerpt}</p>

              <div className="blog-post-meta-row" aria-label="Metadados do artigo">
                <span>
                  <CalendarDays size={14} />
                  {formatDate(post.publishedAt)}
                </span>
                <span>
                  <Clock3 size={14} />
                  {post.readingTime} min de leitura
                </span>
                <span>
                  <UserRound size={14} />
                  {post.author}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad blog-article-wrap">
          <div className="container-site">
            <Link href="/blog" className="blog-back-link">
              <ArrowLeft size={14} />
              Voltar para todos os artigos
            </Link>

            <div className="blog-article-grid">
              <article className="blog-article-content">
                <div className="blog-article-cover">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.coverAlt ?? post.title}
                      fill
                      sizes="(max-width: 980px) 100vw, 66vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className="blog-article-cover-placeholder">
                      <BookOpen size={24} />
                      <span>Espaço para imagem do artigo</span>
                    </div>
                  )}
                </div>

                {post.sections.map((section) => (
                  <section key={section.heading} className="blog-article-section">
                    <h2>{section.heading}</h2>

                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {section.bullets && section.bullets.length > 0 ? (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </article>

              <aside className="blog-article-sidebar" aria-label="Informações complementares">
                <div className="blog-side-card">
                  <h3>Resumo do artigo</h3>
                  <ul className="blog-side-meta">
                    <li>
                      <CalendarDays size={14} />
                      Publicado em {formatDate(post.publishedAt)}
                    </li>
                    <li>
                      <Clock3 size={14} />
                      Leitura estimada: {post.readingTime} min
                    </li>
                    <li>
                      <UserRound size={14} />
                      {post.author}
                    </li>
                  </ul>
                </div>

                <div className="blog-side-card">
                  <h3>Tópicos deste conteúdo</h3>
                  <div className="blog-side-tags">
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="blog-side-card">
                  <h3>Próximo passo</h3>
                  <p>
                    Se você precisa de avaliação individualizada para o seu caso,
                    agende consulta e receba orientação médica direcionada.
                  </p>
                  <Link href="/contato" className="btn btn-primary">
                    Agendar consulta
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="section-pad blog-related">
          <div className="container-site">
            <div className="blog-related-head">
              <p className="eyebrow" style={{ justifyContent: "center" }}>
                Leitura relacionada
              </p>
              <h2 style={{ marginBottom: "0.82rem" }}>Outros artigos do blog</h2>
              <p style={{ margin: 0, color: "var(--color-neutral-700)", lineHeight: 1.72 }}>
                Continue explorando conteúdos sobre Urologia, prevenção e saúde do
                homem.
              </p>
            </div>

            <div className="blog-related-grid">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.slug} className="blog-related-card">
                  <p className="blog-related-category">{relatedPost.category}</p>
                  <h3>{relatedPost.title}</h3>
                  <p className="blog-related-date">
                    {formatDate(relatedPost.publishedAt)}
                  </p>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="blog-related-link"
                  >
                    Ler artigo
                    <ArrowRight size={14} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
