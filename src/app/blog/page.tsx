import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BookOpen } from "lucide-react";

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
    canonical: "https://drtallesleandro.com.br/blog",
  },
  openGraph: {
    type: "website",
    url: "https://drtallesleandro.com.br/blog",
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

export default function BlogPage() {
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

          .blog-coming-soon {
            background: var(--color-neutral-50);
          }

          .blog-coming-soon-inner {
            max-width: 620px;
            margin-inline: auto;
            text-align: center;
            padding-block: clamp(3rem, 8vw, 5.5rem);
          }

          .blog-coming-icon {
            width: 4rem;
            height: 4rem;
            border-radius: 1.1rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #1B4D6E 0%, #2EC4B6 100%);
            color: #fff;
            margin-bottom: 1.5rem;
          }

          .blog-coming-soon-inner h2 {
            color: var(--color-primary-dark);
            margin-bottom: 0.85rem;
          }

          .blog-coming-soon-inner p {
            color: var(--color-neutral-700);
            line-height: 1.78;
            margin: 0;
            max-width: 48ch;
            margin-inline: auto;
          }

          @media (max-width: 860px) {
            .blog-hero-wave {
              display: none;
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
            </div>
          </div>
        </section>

        <section className="blog-coming-soon">
          <div className="container-site">
            <div className="blog-coming-soon-inner">
              <span className="blog-coming-icon" aria-hidden>
                <BookOpen size={22} />
              </span>
              <p className="eyebrow" style={{ justifyContent: "center" }}>Novidades em breve</p>
              <h2>Artigos chegando em breve</h2>
              <p>
                Em breve publicaremos artigos sobre urologia, saúde do homem,
                prevenção e cirurgia robótica. Acompanhe para receber conteúdos
                com orientação clínica clara e linguagem acessível.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
