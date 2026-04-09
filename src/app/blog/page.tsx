import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BlogListingClient from "./BlogListingClient";
import { getAllCategories, getAllPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog | Dr. Talles Leandro",
  description:
    "Conteúdos sobre Urologia, saúde do homem, prevenção e cirurgia robótica com linguagem clara e foco em orientação médica.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const lastUpdatedLabel = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(new Date(posts[0]?.publishedAt ?? Date.now()));

  return (
    <>
      <Header />
      <main id="blog-page">
        <style>{`
          .blog-hero-wave {
            position: absolute;
            right: -90px;
            bottom: -124px;
            width: min(56vw, 760px);
            height: min(30vw, 360px);
            border-radius: 999px;
            pointer-events: none;
            border: 1px solid rgba(255,255,255,0.16);
            transform: rotate(-10deg);
            opacity: 0.42;
          }

          .blog-hero-wave::before {
            content: "";
            position: absolute;
            inset: 14px;
            border-radius: inherit;
            border: 1px solid rgba(125,223,215,0.42);
          }

          .blog-hero-wave::after {
            content: "";
            position: absolute;
            inset: 28px;
            border-radius: inherit;
            border: 1px solid rgba(255,255,255,0.16);
          }

          .blog-hero-meta {
            margin-top: 1.35rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.55rem;
          }

          .blog-hero-meta span {
            display: inline-flex;
            align-items: center;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.3);
            background: rgba(255,255,255,0.08);
            color: rgba(235,247,255,0.9);
            padding: 0.42rem 0.78rem;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.01em;
          }

          .blog-catalog {
            background: var(--color-neutral-50);
          }

          .blog-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .blog-search-wrap {
            width: min(100%, 540px);
            display: flex;
            align-items: center;
            gap: 0.65rem;
            padding: 0.7rem 0.85rem;
            border-radius: 0.8rem;
            border: 1px solid var(--color-neutral-200);
            background: #fff;
            box-shadow: 0 6px 22px rgba(27,77,110,0.06);
          }

          .blog-search-wrap svg {
            color: var(--color-neutral-400);
            flex-shrink: 0;
          }

          .blog-search-wrap input {
            width: 100%;
            border: none;
            outline: none;
            background: transparent;
            color: var(--color-neutral-700);
            font-size: 0.95rem;
            font-family: var(--font-body);
          }

          .blog-search-wrap input::placeholder {
            color: var(--color-neutral-400);
          }

          .blog-count {
            margin: 0;
            color: var(--color-neutral-700);
            font-size: 0.85rem;
            font-weight: 600;
            white-space: nowrap;
          }

          .blog-filter-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.55rem;
            margin-bottom: 1.35rem;
          }

          .blog-filter-chip {
            border: 1px solid var(--color-neutral-200);
            background: #fff;
            color: var(--color-neutral-700);
            font-family: var(--font-body);
            font-size: 0.8rem;
            font-weight: 600;
            border-radius: 999px;
            padding: 0.45rem 0.75rem;
            cursor: pointer;
            transition: border-color 0.22s ease, background 0.22s ease, color 0.22s ease;
          }

          .blog-filter-chip:hover {
            border-color: rgba(46,196,182,0.7);
            background: rgba(46,196,182,0.12);
            color: var(--color-primary-dark);
          }

          .blog-filter-chip.is-active {
            border-color: transparent;
            background: linear-gradient(135deg, #1B4D6E 0%, #2A7AB5 56%, #2EC4B6 100%);
            color: #fff;
          }

          .blog-post-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1rem;
          }

          .blog-post-card {
            border-radius: 1rem;
            border: 1px solid var(--color-neutral-200);
            background: #fff;
            box-shadow: 0 8px 24px rgba(27,77,110,0.06);
            padding: 1.15rem;
            display: flex;
            flex-direction: column;
            min-height: 286px;
            transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
          }

          .blog-post-media {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 9;
            margin-bottom: 0.95rem;
            border-radius: 0.8rem;
            overflow: hidden;
            border: 1px solid var(--color-neutral-200);
            background: linear-gradient(145deg, #edf3f7 0%, #f7fbfd 100%);
          }

          .blog-post-media img {
            display: block;
          }

          .blog-post-media-placeholder {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 0.42rem;
            color: var(--color-neutral-400);
            background:
              radial-gradient(circle at 20% 20%, rgba(42,122,181,0.16) 0%, transparent 45%),
              radial-gradient(circle at 85% 85%, rgba(46,196,182,0.18) 0%, transparent 42%),
              linear-gradient(145deg, #ecf2f6 0%, #f8fbfd 100%);
          }

          .blog-post-media-placeholder span {
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.03em;
            color: var(--color-neutral-700);
          }

          .blog-post-card:hover {
            transform: translateY(-3px);
            border-color: rgba(46,196,182,0.72);
            box-shadow: 0 14px 30px rgba(27,77,110,0.12);
          }

          .blog-post-card.is-featured {
            border-color: rgba(42,122,181,0.3);
            background: linear-gradient(165deg, rgba(255,255,255,1), rgba(241,248,252,0.7));
          }

          .blog-post-head {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.42rem;
            margin-bottom: 0.85rem;
          }

          .blog-post-category {
            border-radius: 999px;
            padding: 0.3rem 0.58rem;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            background: rgba(46,196,182,0.16);
            border: 1px solid rgba(46,196,182,0.3);
            color: var(--color-primary-dark);
          }

          .blog-post-meta {
            margin: 0;
            font-size: 0.76rem;
            color: var(--color-neutral-400);
            white-space: normal;
          }

          .blog-post-card h3 {
            font-size: 1.12rem;
            font-weight: 700;
            margin: 0 0 0.68rem;
            line-height: 1.36;
            color: var(--color-primary-dark);
          }

          .blog-post-card p {
            margin: 0;
            color: var(--color-neutral-700);
            font-size: 0.9rem;
            line-height: 1.72;
          }

          .blog-post-tags {
            margin-top: 0.95rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
          }

          .blog-post-tags span {
            border-radius: 999px;
            border: 1px solid var(--color-neutral-200);
            background: var(--color-neutral-50);
            color: var(--color-neutral-700);
            font-size: 0.72rem;
            padding: 0.24rem 0.5rem;
            line-height: 1;
          }

          .blog-post-link {
            margin-top: auto;
            padding-top: 1rem;
            display: inline-flex;
            align-items: center;
            gap: 0.42rem;
            font-size: 0.84rem;
            font-weight: 700;
            color: var(--color-primary);
            text-decoration: none;
          }

          .blog-post-link:hover {
            text-decoration: underline;
          }

          .blog-empty-state {
            text-align: center;
            border-radius: 1rem;
            border: 1px solid var(--color-neutral-200);
            background: #fff;
            padding: 2.5rem 1.5rem;
            box-shadow: 0 8px 24px rgba(27,77,110,0.05);
          }

          .blog-empty-state h2 {
            margin: 0 0 0.7rem;
            font-size: 1.3rem;
            color: var(--color-primary-dark);
          }

          .blog-empty-state p {
            margin: 0;
            color: var(--color-neutral-700);
            line-height: 1.75;
            max-width: 54ch;
            margin-inline: auto;
          }

          @media (max-width: 1050px) {
            .blog-post-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 860px) {
            .blog-toolbar {
              flex-direction: column;
              align-items: stretch;
            }

            .blog-search-wrap {
              width: 100%;
            }

            .blog-count {
              white-space: normal;
            }

            .blog-hero-wave {
              display: none;
            }
          }

          @media (max-width: 640px) {
            .blog-post-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <section className="internal-hero" data-header-theme="dark">
          <div className="internal-hero-glow" aria-hidden />
          <div className="internal-hero-lines" aria-hidden />
          <div className="blog-hero-wave" aria-hidden />

          <div className="container-site">
            <div className="internal-hero-inner">
              <p className="internal-hero-kicker">Conteúdo médico</p>
              <h1 className="internal-hero-title">Blog de Urologia</h1>
              <p className="internal-hero-description">
                Artigos com linguagem clara sobre saúde do homem, diagnóstico,
                prevenção e cirurgia robótica, com foco em orientação clínica e
                tomada de decisão informada.
              </p>

              <div className="blog-hero-meta">
                <span>{posts.length} artigos simulados</span>
                <span>Atualizado em {lastUpdatedLabel}</span>
              </div>
            </div>
          </div>
        </section>

        <BlogListingClient posts={posts} categories={categories} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
