import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getAllPublishedPosts, getPublishedCategories } from "@/lib/blog-posts";
import BlogListingClient from "./BlogListingClient";

export const metadata: Metadata = {
  title: "Blog de Urologia | Dr. Talles Leandro — Artigos sobre Saúde do Homem",
  description:
    "Artigos sobre urologia, saúde do homem, prevenção, diagnóstico e cirurgia robótica escritos pelo Dr. Talles Leandro, urologista em Campina Grande/PB. Linguagem clara e orientação clínica.",
  keywords: [
    "blog urologia",
    "artigos urologia",
    "saúde do homem",
    "prevenção urológica",
    "cirurgia robótica artigos",
    "Dr. Talles Leandro blog",
    "urologia Campina Grande",
  ],
  alternates: {
    canonical: "https://www.drtallesleandrourologista.com.br/blog",
  },
  openGraph: {
    type: "website",
    url: "https://www.drtallesleandrourologista.com.br/blog",
    title: "Blog de Urologia | Dr. Talles Leandro",
    description:
      "Artigos sobre urologia, saúde do homem e cirurgia robótica com linguagem clara pelo Dr. Talles Leandro.",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blog de Urologia — Dr. Talles Leandro",
      },
    ],
  },
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllPublishedPosts(),
    getPublishedCategories(),
  ]);

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.drtallesleandrourologista.com.br" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.drtallesleandrourologista.com.br/blog" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
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
          @media (max-width: 860px) {
            .blog-hero-wave { display: none; }
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
