import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Activity,
  CalendarCheck,
  Dna,
  ExternalLink,
  Heart,
  MessageCircle,
  Microscope,
  ShieldPlus,
  User,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Áreas de Atuação em Urologia | Dr. Talles Leandro — Campina Grande, PB",
  description:
    "Saúde do homem, urologia geral, andrologia, disfunções sexuais, endourologia e uroginecologia em Campina Grande/PB. Conheça as especialidades do Dr. Talles Leandro, urologista CRM-PB 5970.",
  keywords: [
    "áreas de atuação urologia",
    "saúde do homem Campina Grande",
    "andrologia Campina Grande",
    "disfunção erétil Campina Grande",
    "endourologia",
    "uroginecologia Campina Grande",
    "urologia geral PB",
    "cirurgia urológica minimamente invasiva",
    "videolaparoscopia urológica",
  ],
  alternates: {
    canonical: "https://drtallesleandro.com.br/areas-de-atuacao",
  },
  openGraph: {
    type: "website",
    url: "https://drtallesleandro.com.br/areas-de-atuacao",
    title: "Áreas de Atuação em Urologia | Dr. Talles Leandro — Campina Grande, PB",
    description:
      "Saúde do homem, andrologia, disfunções sexuais, endourologia, uroginecologia e cirurgia robótica em Campina Grande/PB.",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Áreas de Atuação — Dr. Talles Leandro, Urologista",
      },
    ],
  },
};

const DOCTORALIA_URL =
  "https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande?utm_id=34199&utm_source=widget-doctor-34199&utm_medium=big&utm_campaign=&utm_content=#highlight-calendar";
const WA_URL = "https://wa.me/5583999999999";
const CRM_LABEL = "CRM-PB 5970";
type AreaBlock = {
  id: string;
  nav: string;
  title: string;
  text: string;
  icon: LucideIcon;
};

const AREA_BLOCKS: AreaBlock[] = [
  {
    id: "saude-do-homem",
    nav: "Saúde do homem",
    title: "Saúde do homem",
    text:
      "A saúde do homem exige atenção em diferentes fases da vida, tanto na prevenção quanto na investigação de sintomas e no acompanhamento de condições que impactam a qualidade de vida. Dentro dessa frente, o atendimento busca oferecer avaliação cuidadosa, orientação clara e definição da melhor conduta para cada caso.",
    icon: User,
  },
  {
    id: "urologia-geral",
    nav: "Urologia Geral",
    title: "Urologia Geral",
    text:
      "A urologia geral envolve a avaliação, o diagnóstico e o acompanhamento de alterações do sistema urinário em homens e mulheres, além de condições relacionadas ao aparelho reprodutor masculino. O objetivo é conduzir cada caso com clareza, atenção individual e segurança na tomada de decisão.",
    icon: Activity,
  },
  {
    id: "andrologia",
    nav: "Andrologia",
    title: "Andrologia",
    text:
      "A andrologia é a área voltada à saúde sexual e reprodutiva do homem. O atendimento considera as particularidades de cada paciente, com escuta cuidadosa e investigação adequada para orientar o tratamento de forma personalizada.",
    icon: Dna,
  },
  {
    id: "disfuncoes-sexuais",
    nav: "Disfunções Sexuais",
    title: "Disfunções Sexuais",
    text:
      "Queixas relacionadas ao desempenho e à saúde sexual masculina devem ser avaliadas com atenção, discrição e critério médico. A proposta do atendimento é investigar cada caso de forma individualizada, identificar possíveis causas e orientar a melhor conduta com responsabilidade e clareza.",
    icon: Heart,
  },
  {
    id: "endourologia",
    nav: "Endourologia",
    title: "Endourologia",
    text:
      "A endourologia reúne abordagens minimamente invasivas voltadas ao diagnóstico e ao tratamento de diferentes condições do trato urinário. Essa frente contribui para uma condução mais precisa em casos que exigem avaliação técnica e definição criteriosa de procedimentos.",
    icon: Microscope,
  },
  {
    id: "uro-ginecologia",
    nav: "Uroginecologia",
    title: "Uroginecologia",
    text:
      "A uroginecologia contempla condições urológicas que também dialogam com a saúde feminina, especialmente em quadros funcionais e de suporte. O acompanhamento busca avaliar sintomas, organizar o diagnóstico e indicar a melhor condução para cada situação.",
    icon: Users,
  },
];

const MENU_ITEMS = [
  ...AREA_BLOCKS.map((item) => ({ id: item.id, label: item.nav })),
  { id: "cirurgias-urologicas", label: "Cirurgias Urológicas" },
  { id: "agendar-consulta", label: "Agendamento" },
];

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://drtallesleandro.com.br" },
    { "@type": "ListItem", position: 2, name: "Áreas de Atuação", item: "https://drtallesleandro.com.br/areas-de-atuacao" },
  ],
};

const jsonLdSpecialties = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Áreas de Atuação — Dr. Talles Leandro, Urologista",
  itemListElement: AREA_BLOCKS.map((area, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "MedicalSpecialty",
      name: area.title,
      description: area.text,
    },
  })),
};

export default function AreasAtuacaoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSpecialties) }} />
      <Header />
      <main id="areas-page">
        <style>{`
                    /* Internal hero */
          .areas-hero-intro {
            position: relative;
            z-index: 1;
            max-width: 760px;
          }

          .areas-hero-intro .internal-hero-title {
            text-wrap: balance;
            max-width: 14ch;
          }

          .areas-hero-wave {
            position: absolute;
            right: -85px;
            bottom: -120px;
            width: min(54vw, 700px);
            height: min(30vw, 340px);
            border-radius: 999px;
            pointer-events: none;
            border: 1px solid rgba(255,255,255,0.16);
            transform: rotate(-10deg);
            opacity: 0.42;
          }

          .areas-hero-wave::before {
            content: "";
            position: absolute;
            inset: 14px;
            border-radius: inherit;
            border: 1px solid rgba(125,223,215,0.4);
          }

          .areas-hero-wave::after {
            content: "";
            position: absolute;
            inset: 28px;
            border-radius: inherit;
            border: 1px solid rgba(255,255,255,0.16);
          }

          .areas-anchor-nav-wrap {
            position: sticky;
            top: 70px;
            z-index: 24;
            background: rgba(255,255,255,0.93);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-top: 1px solid rgba(27,77,110,0.08);
            border-bottom: 1px solid rgba(27,77,110,0.08);
          }

          .areas-anchor-nav {
            display: flex;
            align-items: center;
            gap: 0.55rem;
            overflow-x: auto;
            padding-block: 0.7rem;
            scrollbar-width: thin;
          }

          .areas-anchor-nav a {
            white-space: nowrap;
            text-decoration: none;
            border-radius: 999px;
            padding: 0.45rem 0.72rem;
            border: 1px solid var(--color-neutral-200);
            background: #fff;
            color: var(--color-neutral-700);
            font-size: 0.8rem;
            font-weight: 600;
            transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
          }

          .areas-anchor-nav a:hover {
            border-color: rgba(46,196,182,0.75);
            color: var(--color-primary-dark);
            background: rgba(46,196,182,0.1);
          }

          .areas-grid-wrap {
            background: var(--color-neutral-50);
          }

          .areas-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
          }

          .area-card {
            border-radius: 1rem;
            border: 1px solid var(--color-neutral-200);
            background: #fff;
            padding: 1.2rem;
            box-shadow: 0 8px 24px rgba(27,77,110,0.06);
            transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
          }

          .area-card:hover {
            transform: translateY(-3px);
            border-color: rgba(46,196,182,0.72);
            box-shadow: 0 12px 28px rgba(27,77,110,0.1);
          }

          .area-card-head {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.7rem;
          }

          .area-icon {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 0.7rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #1B4D6E 0%, #2EC4B6 100%);
            color: #fff;
            flex-shrink: 0;
          }

          .area-card h3 {
            margin: 0;
            font-family: var(--font-body);
            font-size: 1rem;
            color: var(--color-primary-dark);
            line-height: 1.35;
          }

          .area-card p {
            margin: 0;
            color: var(--color-neutral-700);
            font-size: 0.9rem;
            line-height: 1.72;
          }

          .area-anchor-target {
            scroll-margin-top: 160px;
          }

          .areas-surgery {
            background: linear-gradient(135deg, var(--color-primary-dark) 0%, #163e5a 56%, var(--color-primary) 100%);
            position: relative;
            overflow: hidden;
          }

          .areas-surgery::before {
            content: "";
            position: absolute;
            top: -34%;
            right: -9%;
            width: 580px;
            height: 580px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(46,196,182,0.14) 0%, transparent 68%);
            pointer-events: none;
          }

          .areas-surgery-grid {
            position: relative;
            z-index: 1;
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 400px);
            gap: clamp(1.4rem, 4vw, 3rem);
            align-items: center;
          }

          .areas-surgery-media {
            border-radius: 1rem;
            overflow: hidden;
            border: none;
            box-shadow: 0 14px 34px rgba(0,0,0,0.2);
          }

          .areas-surgery-media img {
            display: block;
            width: 100%;
            height: auto;
          }

          .areas-cta {
            background: linear-gradient(135deg, var(--color-primary-dark) 0%, #163e5a 50%, var(--color-primary) 100%);
            position: relative;
            overflow: hidden;
          }

          .areas-cta::before {
            content: "";
            position: absolute;
            top: -26%;
            left: -11%;
            width: 610px;
            height: 610px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(46,196,182,0.08) 0%, transparent 65%);
            pointer-events: none;
          }

          .areas-cta-inner {
            position: relative;
            z-index: 1;
            max-width: 760px;
            margin-inline: auto;
            text-align: center;
          }

          .areas-cta-actions {
            margin-top: 1.95rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.9rem;
          }

          .areas-cta-note {
            margin-top: 1.45rem;
            color: rgba(255,255,255,0.6);
            font-size: 0.8rem;
            letter-spacing: 0.03em;
          }

          @media (max-width: 980px) {
            .areas-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 860px) {
            .areas-hero-wave {
              display: none;
            }

            .areas-surgery-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        {/* Hero */}
        <section className="internal-hero" data-header-theme="dark">
          <div className="internal-hero-glow" aria-hidden />
          <div className="internal-hero-lines" aria-hidden />
          <div className="areas-hero-wave" aria-hidden />

          <div className="container-site">
            <div className="areas-hero-intro internal-hero-inner">
              <p className="internal-hero-kicker">Especialidades em urologia</p>

              <h1 className="internal-hero-title">Áreas de Atuação</h1>

              <p className="internal-hero-description">
                Conheça as principais frentes de atuação em urologia, com avaliação
                clínica criteriosa, planejamento diagnóstico e conduta individualizada
                para cada caso.
              </p>
            </div>
          </div>
        </section>

        {/* Menu interno com âncora */}
        <section className="areas-anchor-nav-wrap">
          <div className="container-site">
            <nav className="areas-anchor-nav" aria-label="Menu interno de áreas">
              {MENU_ITEMS.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Blocos 1 a 6 */}
        <section className="section-pad areas-grid-wrap">
          <div className="container-site">
            <div
              style={{
                textAlign: "center",
                maxWidth: "760px",
                marginInline: "auto",
                marginBottom: "2rem",
              }}
            >
              <p className="eyebrow" style={{ justifyContent: "center" }}>
                Frentes de atuação
              </p>
              <h2 style={{ marginBottom: "0.85rem" }}>
                Cuidado urológico com leitura clara e objetiva
              </h2>
              <p style={{ margin: 0, color: "var(--color-neutral-700)", lineHeight: 1.72 }}>
                Navegue rapidamente pelas principais áreas e entenda como cada
                frente é conduzida com avaliação individualizada e critério
                médico.
              </p>
            </div>

            <div className="areas-grid">
              {AREA_BLOCKS.map((area) => {
                const Icon = area.icon;
                return (
                  <article
                    key={area.id}
                    id={area.id}
                    className="area-card area-anchor-target"
                  >
                    <div className="area-card-head">
                      <span className="area-icon" aria-hidden>
                        <Icon size={17} />
                      </span>
                      <h3>{area.title}</h3>
                    </div>
                    <p>{area.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bloco 7: destaque cirurgias */}
        <section
          id="cirurgias-urologicas"
          className="section-pad areas-surgery area-anchor-target"
        >
          <div className="container-site areas-surgery-grid">
            <div>
              <p className="eyebrow" style={{ color: "var(--color-accent)" }}>
                Cirurgias minimamente invasivas
              </p>
              <h2 style={{ color: "#fff", marginBottom: "1rem" }}>
                Cirurgias Urológicas Minimamente Invasivas
              </h2>
              <p
                style={{
                  margin: 0,
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.84,
                  maxWidth: "62ch",
                }}
              >
                A atuação cirúrgica do Dr. Talles Leandro inclui experiência em
                videolaparoscopia urológica e passa a incorporar também a
                cirurgia robótica como ampliação da sua abordagem em casos
                selecionados. Essa evolução fortalece seu posicionamento
                profissional com foco em precisão, critério técnico e indicação
                adequada para cada paciente.
              </p>

              <div style={{ marginTop: "1.6rem" }}>
                <Link href="/cirurgia-robotica" className="btn btn-outline-white">
                  <ShieldPlus size={17} />
                  Conheça a cirurgia robótica
                </Link>
              </div>
            </div>

            <div className="areas-surgery-media">
              <Image
                src="/img/dr-talles-3.png"
                alt="Contexto cirúrgico urológico"
                width={420}
                height={520}
              />
            </div>
          </div>
        </section>

        {/* Bloco 8: CTA final */}
        <section
          id="agendar-consulta"
          className="section-pad areas-cta area-anchor-target"
        >
          <div className="container-site areas-cta-inner">
            <p className="eyebrow" style={{ justifyContent: "center", color: "var(--color-accent)" }}>
              Agendamento
            </p>
            <h2 style={{ color: "#fff", marginBottom: "1rem" }}>
              Atendimento com foco em clareza e individualização
            </h2>
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.76)",
                lineHeight: 1.82,
                maxWidth: "58ch",
                marginInline: "auto",
              }}
            >
              Cada paciente chega com uma necessidade diferente. Por isso, a
              proposta do atendimento é organizar o diagnóstico, esclarecer
              as possibilidades e indicar a melhor conduta com base em avaliação
              médica cuidadosa, respeitando as particularidades de cada caso.
            </p>

            <div className="areas-cta-actions">
              <a
                href={DOCTORALIA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
                style={{ fontSize: "1rem", padding: "0.98rem 1.95rem" }}
              >
                <CalendarCheck size={18} />
                Agendar consulta
                <ExternalLink size={14} />
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white"
                style={{ fontSize: "1rem", padding: "0.98rem 1.95rem" }}
              >
                <MessageCircle size={18} />
                Falar no WhatsApp
              </a>
            </div>

            <p className="areas-cta-note">
              {CRM_LABEL}
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
