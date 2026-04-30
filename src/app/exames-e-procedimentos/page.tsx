import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Activity,
  CalendarCheck,
  Dna,
  ExternalLink,
  MessageCircle,
  Microscope,
  Snowflake,
  Droplets,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Exames e Procedimentos Urológicos em Campina Grande | Dr. Talles Leandro",
  description:
    "Cistoscopia, urodinâmica, urofluxometria, crioterapia e biópsia de pênis em Campina Grande/PB. Exames e procedimentos urológicos com indicação individualizada pelo Dr. Talles Leandro, CRM-PB 5970.",
  keywords: [
    "exames urológicos Campina Grande",
    "cistoscopia Campina Grande",
    "urodinâmica Campina Grande",
    "urofluxometria",
    "crioterapia HPV",
    "biópsia pênis",
    "procedimentos urológicos PB",
    "diagnóstico urológico Campina Grande",
  ],
  alternates: {
    canonical: "https://www.drtallesleandrourologista.com.br/exames-e-procedimentos",
  },
  openGraph: {
    type: "website",
    url: "https://www.drtallesleandrourologista.com.br/exames-e-procedimentos",
    title: "Exames e Procedimentos Urológicos em Campina Grande | Dr. Talles Leandro",
    description:
      "Cistoscopia, urodinâmica, urofluxometria e procedimentos urológicos em Campina Grande/PB com indicação médica individualizada.",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Exames e Procedimentos Urológicos — Dr. Talles Leandro",
      },
    ],
  },
};

const DOCTORALIA_URL =
  "https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande?utm_id=34199&utm_source=widget-doctor-34199&utm_medium=big&utm_campaign=&utm_content=#highlight-calendar";
const WA_URL = "https://wa.me/558391350081";
const CRM_LABEL = "CRM-PB 5970";
const EXAMES = [
  {
    title: "Cistoscopia",
    text: "A cistoscopia é um exame utilizado para auxiliar a investigação de alterações da bexiga e de outras condições do trato urinário inferior. Sua indicação depende de avaliação médica e do contexto clínico de cada paciente.",
    icon: Microscope,
    color: "#1B4D6E",
  },
  {
    title: "Urodinâmica",
    text: "A urodinâmica é um exame que avalia o funcionamento da bexiga e da micção, contribuindo para o diagnóstico de disfunções urinárias e para uma condução mais precisa do tratamento.",
    icon: Activity,
    color: "#2A7AB5",
  },
  {
    title: "Urofluxometria",
    text: "A urofluxometria é um exame simples que analisa a velocidade e o volume do fluxo urinário, ajudando na investigação de alterações relacionadas ao esvaziamento da bexiga.",
    icon: Droplets,
    color: "#2EC4B6",
  },
];

const PROCEDIMENTOS = [
  {
    title: "Crioterapia",
    text: "A crioterapia é um procedimento utilizado em casos selecionados, inclusive em abordagens relacionadas a lesões por HPV. A condução é definida de forma objetiva e criteriosa, de acordo com a avaliação médica.",
    icon: Snowflake,
    num: "01",
  },
  {
    title: "Biópsia de pênis",
    text: "A biópsia de pênis é um procedimento indicado para investigação diagnóstica em lesões suspeitas, sempre conforme avaliação clínica e definição da melhor abordagem para cada caso.",
    icon: Dna,
    num: "02",
  },
];

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.drtallesleandrourologista.com.br" },
    { "@type": "ListItem", position: 2, name: "Exames e Procedimentos", item: "https://www.drtallesleandrourologista.com.br/exames-e-procedimentos" },
  ],
};

const jsonLdMedicalTests = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Exames e Procedimentos Urológicos",
  description: "Lista de exames e procedimentos urológicos realizados pelo Dr. Talles Leandro em Campina Grande/PB.",
  itemListElement: [
    ...EXAMES.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "DiagnosticTest",
        name: e.title,
        description: e.text,
        usedToDiagnose: { "@type": "MedicalCondition", name: "Disfunções do Trato Urinário" },
      },
    })),
    ...PROCEDIMENTOS.map((p, i) => ({
      "@type": "ListItem",
      position: EXAMES.length + i + 1,
      item: {
        "@type": "MedicalProcedure",
        name: p.title,
        description: p.text,
        procedureType: "https://schema.org/TherapeuticProcedure",
      },
    })),
  ],
};

export default function ExamesProcedimentosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMedicalTests) }} />
      <Header />
      <main>
        <style>{`
          /* Internal hero */
          .ep-hero-intro {
            position: relative;
            z-index: 1;
            max-width: 760px;
          }

          .ep-hero-intro .internal-hero-title {
            text-wrap: balance;
            white-space: nowrap;
            max-width: none;
          }

          .ep-hero-wave {
            position: absolute;
            right: -80px;
            bottom: -120px;
            width: min(52vw, 640px);
            height: min(30vw, 340px);
            border-radius: 999px;
            pointer-events: none;
            border: 1px solid rgba(255,255,255,0.16);
            transform: rotate(-12deg);
            opacity: 0.42;
          }

          .ep-hero-wave::before {
            content: "";
            position: absolute;
            inset: 16px;
            border-radius: inherit;
            border: 1px solid rgba(125,223,215,0.4);
          }

          /* ── CONSULTA SECTION ────────────────────────────── */
          .ep-consulta {
            background: #fff;
          }

          .ep-consulta-inner {
            display: grid;
            grid-template-columns: minmax(0, 460px) 1fr;
            gap: clamp(2rem, 5vw, 5rem);
            align-items: center;
          }

          .ep-consulta-visual {
            position: relative;
          }

          .ep-consulta-img-wrap {
            position: relative;
            border-radius: 1.25rem;
            overflow: hidden;
            box-shadow: 0 24px 56px rgba(15,45,66,0.18);
          }

          .ep-consulta-img-wrap img {
            display: block;
            width: 100%;
            height: auto;
          }

          .ep-consulta-badge {
            position: absolute;
            bottom: -1.2rem;
            right: -1rem;
            background: linear-gradient(135deg, #1B4D6E, #2EC4B6);
            border-radius: 0.85rem;
            padding: 1rem 1.3rem;
            box-shadow: 0 12px 32px rgba(27,77,110,0.28);
            color: #fff;
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.04em;
            white-space: nowrap;
          }

          .ep-consulta-content {
            padding-bottom: 1.2rem;
          }

          .ep-consulta-step {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            border-radius: 999px;
            padding: 0.38rem 0.85rem;
            background: rgba(46,196,182,0.1);
            border: 1px solid rgba(46,196,182,0.3);
            color: var(--color-accent-dark);
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.04em;
            margin-bottom: 1.1rem;
          }

          .ep-consulta-title {
            font-size: clamp(1.8rem, 3vw, 2.6rem);
            color: var(--color-primary-dark);
            margin-bottom: 1.1rem;
            line-height: 1.15;
          }

          .ep-consulta-text {
            color: var(--color-neutral-700);
            line-height: 1.8;
            margin-bottom: 1.5rem;
            font-size: 1.01rem;
          }

          .ep-check-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            gap: 0.65rem;
          }

          .ep-check-list li {
            display: flex;
            align-items: flex-start;
            gap: 0.7rem;
            color: var(--color-neutral-700);
            font-size: 0.94rem;
            line-height: 1.55;
          }

          .ep-check-list li svg {
            color: var(--color-accent);
            flex-shrink: 0;
            margin-top: 0.1rem;
          }

          /* ── EXAMES ─────────────────────────────────────────── */
          .ep-exames {
            background: var(--color-neutral-50);
            position: relative;
            overflow: hidden;
          }

          .ep-exames::before {
            content: "";
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 4px;
            background: linear-gradient(90deg, #1B4D6E, #2EC4B6, #1B4D6E);
          }

          .ep-section-header {
            text-align: center;
            max-width: 680px;
            margin-inline: auto;
            margin-bottom: clamp(2.5rem, 4vw, 3.5rem);
          }

          .ep-section-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: var(--color-accent);
            margin-bottom: 0.9rem;
          }

          .ep-section-eyebrow::before,
          .ep-section-eyebrow::after {
            content: "";
            display: block;
            width: 1.5rem;
            height: 2px;
            background: var(--color-accent);
            border-radius: 2px;
          }

          .ep-exames-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.25rem;
          }

          .ep-exame-card {
            background: #fff;
            border-radius: 1.1rem;
            border: 1px solid var(--color-neutral-200);
            padding: clamp(1.4rem, 2.5vw, 2rem);
            box-shadow: 0 4px 20px rgba(27,77,110,0.05);
            transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
            position: relative;
            overflow: hidden;
          }

          .ep-exame-card::after {
            content: "";
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--card-color, #1B4D6E), transparent);
            opacity: 0;
            transition: opacity 0.25s ease;
          }

          .ep-exame-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 16px 40px rgba(27,77,110,0.12);
            border-color: rgba(46,196,182,0.4);
          }

          .ep-exame-card:hover::after {
            opacity: 1;
          }

          .ep-exame-icon-wrap {
            width: 3rem;
            height: 3rem;
            border-radius: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.1rem;
            color: #fff;
          }

          .ep-exame-card h3 {
            font-size: 1.05rem;
            color: var(--color-primary-dark);
            margin-bottom: 0.65rem;
            font-weight: 700;
          }

          .ep-exame-card p {
            margin: 0;
            font-size: 0.9rem;
            color: var(--color-neutral-700);
            line-height: 1.72;
          }

          /* ── PROCEDIMENTOS ──────────────────────────────────── */
          .ep-proc {
            background: #fff;
          }

          .ep-proc-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-top: clamp(2.5rem, 4vw, 3.5rem);
          }

          .ep-proc-card {
            position: relative;
            border-radius: 1.2rem;
            border: 1px solid var(--color-neutral-200);
            background: linear-gradient(145deg, #f8fafb, #fff);
            padding: clamp(1.6rem, 3vw, 2.4rem);
            overflow: hidden;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
            box-shadow: 0 4px 20px rgba(27,77,110,0.06);
          }

          .ep-proc-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 48px rgba(27,77,110,0.13);
          }

          .ep-proc-num {
            position: absolute;
            top: 1.4rem;
            right: 1.6rem;
            font-size: 3.5rem;
            font-weight: 800;
            color: rgba(27,77,110,0.06);
            line-height: 1;
            letter-spacing: -0.03em;
            pointer-events: none;
            font-family: var(--font-display);
          }

          .ep-proc-icon-wrap {
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 0.9rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #1B4D6E, #2A7AB5);
            color: #fff;
            margin-bottom: 1.2rem;
          }

          .ep-proc-card h3 {
            font-size: 1.15rem;
            color: var(--color-primary-dark);
            margin-bottom: 0.75rem;
            font-weight: 700;
          }

          .ep-proc-card p {
            margin: 0;
            font-size: 0.92rem;
            color: var(--color-neutral-700);
            line-height: 1.76;
          }

          /* ── CTA ─────────────────────────────────────────────── */
          .ep-cta {
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #0a1f2f 0%, #0F2D42 50%, #1B4D6E 100%);
          }

          .ep-cta-bg {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          .ep-cta-bg::before {
            content: "";
            position: absolute;
            top: -30%;
            right: -15%;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(46,196,182,0.1) 0%, transparent 65%);
          }

          .ep-cta-bg::after {
            content: "";
            position: absolute;
            bottom: -20%;
            left: -10%;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(42,122,181,0.12) 0%, transparent 65%);
          }

          .ep-cta-inner {
            position: relative;
            z-index: 1;
            text-align: center;
            max-width: 720px;
            margin-inline: auto;
          }

          .ep-cta-line {
            width: 3rem;
            height: 3px;
            background: linear-gradient(90deg, #2EC4B6, #2A7AB5);
            border-radius: 2px;
            margin: 0 auto 1.5rem;
          }

          .ep-cta-title {
            font-size: clamp(1.8rem, 3.5vw, 2.8rem);
            color: #fff;
            margin-bottom: 1rem;
            line-height: 1.2;
          }

          .ep-cta-text {
            color: rgba(255,255,255,0.68);
            font-size: 1.03rem;
            line-height: 1.8;
            margin-bottom: 0;
          }

          .ep-cta-actions {
            margin-top: 2.2rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }

          .ep-cta-note {
            margin-top: 1.6rem;
            color: rgba(255,255,255,0.38);
            font-size: 0.76rem;
            letter-spacing: 0.06em;
          }

          /* ── RESPONSIVE ─────────────────────────────────────── */
          @media (max-width: 1024px) {
            .ep-exames-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 860px) {
            .ep-hero-wave {
              display: none;
            }

            .ep-consulta-inner {
              grid-template-columns: 1fr;
            }

            .ep-consulta-badge {
              right: 0.5rem;
              bottom: -0.8rem;
            }

            .ep-proc-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 640px) {
            .ep-hero-intro .internal-hero-title {
              white-space: normal;
            }

            .ep-exames-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="internal-hero" data-header-theme="dark">
          <div className="internal-hero-glow" aria-hidden />
          <div className="internal-hero-lines" aria-hidden />
          <div className="ep-hero-wave" aria-hidden />

          <div className="container-site">
            <div className="ep-hero-intro internal-hero-inner">
              <p className="internal-hero-kicker">Diagnóstico e acompanhamento</p>

              <h1 className="internal-hero-title">
                Exames e Procedimentos
              </h1>

              <p className="internal-hero-description">
                Conheça os principais exames e procedimentos utilizados para avaliação,
                diagnóstico e acompanhamento em urologia, com conduta médica
                individualizada para cada caso.
              </p>
            </div>
          </div>
        </section>

        {/* ── CONSULTA ─────────────────────────────────────────── */}
        <section className="section-pad ep-consulta">
          <div className="container-site ep-consulta-inner">
            <div className="ep-consulta-visual">
              <div className="ep-consulta-img-wrap">
                <Image
                  src="/img/dr-talles-6.jpg"
                  alt="Dr. Talles Leandro em consulta"
                  width={460}
                  height={560}
                />
              </div>
              <div className="ep-consulta-badge">
                <ClipboardList size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4rem" }} />
                Primeiro passo da avaliação
              </div>
            </div>

            <div className="ep-consulta-content">
              <span className="ep-consulta-step">
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
                Consulta
              </span>

              <h2 className="ep-consulta-title">
                Consulta em urologia
              </h2>

              <p className="ep-consulta-text">
                A consulta em urologia é o primeiro passo para avaliar sintomas, investigar
                alterações, esclarecer dúvidas e definir a melhor conduta para cada caso.
                O atendimento é realizado com foco na escuta, na clareza das orientações e
                acompanhamento individualizado.
              </p>

              <ul className="ep-check-list">
                <li>
                  <CheckCircle2 size={18} />
                  Escuta clínica e entendimento detalhado do quadro.
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  Organização diagnóstica e orientações objetivas.
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  Definição da conduta conforme a necessidade individual.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── EXAMES ───────────────────────────────────────────── */}
        <section id="exames" className="section-pad ep-exames">
          <div className="container-site">
            <div className="ep-section-header">
              <p className="ep-section-eyebrow">Exames</p>
              <h2 style={{ marginBottom: "0.9rem" }}>
                Exames para avaliação e diagnóstico
              </h2>
              <p style={{ margin: 0, color: "var(--color-neutral-700)", lineHeight: 1.76, fontSize: "1rem" }}>
                Alguns exames urológicos contribuem para investigar sintomas, esclarecer
                alterações e apoiar uma condução clínica mais precisa, sempre conforme
                avaliação médica individualizada.
              </p>
            </div>

            <div className="ep-exames-grid">
              {EXAMES.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="ep-exame-card"
                    style={{ "--card-color": item.color } as React.CSSProperties}
                  >
                    <div
                      className="ep-exame-icon-wrap"
                      style={{ background: `linear-gradient(135deg, ${item.color}, #2EC4B6)` }}
                      aria-hidden
                    >
                      <Icon size={18} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PROCEDIMENTOS ────────────────────────────────────── */}
        <section className="section-pad ep-proc">
          <div className="container-site">
            <div className="ep-section-header">
              <p className="ep-section-eyebrow">Procedimentos</p>
              <h2 style={{ marginBottom: "0.9rem" }}>
                Procedimentos realizados com critério e indicação adequada
              </h2>
              <p style={{ margin: 0, color: "var(--color-neutral-700)", lineHeight: 1.76, fontSize: "1rem" }}>
                Alguns procedimentos podem ser indicados como parte da investigação
                ou da condução terapêutica, sempre com base em avaliação médica
                cuidadosa e definição individualizada.
              </p>
            </div>

            <div className="ep-proc-grid">
              {PROCEDIMENTOS.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="ep-proc-card">
                    <span className="ep-proc-num" aria-hidden>{item.num}</span>
                    <div className="ep-proc-icon-wrap" aria-hidden>
                      <Icon size={20} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section id="agendar" className="section-pad ep-cta">
          <div className="ep-cta-bg" aria-hidden />
          <div className="container-site ep-cta-inner">
            <div className="ep-cta-line" />
            <p style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "0.9rem",
            }}>
              Agendamento
            </p>
            <h2 className="ep-cta-title">
              Exames e procedimentos com<br />indicação individualizada
            </h2>
            <p className="ep-cta-text">
              A indicação de exames e procedimentos sempre depende de consulta e de
              avaliação médica individualizada. Cada caso exige análise cuidadosa para
              definir a melhor forma de investigação, acompanhamento e tratamento.
            </p>

            <div className="ep-cta-actions">
              <a
                href={DOCTORALIA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
                style={{ fontSize: "1rem", padding: "0.95rem 2rem" }}
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
                style={{ fontSize: "1rem", padding: "0.95rem 2rem" }}
              >
                <MessageCircle size={18} />
                Falar no WhatsApp
              </a>
            </div>

            <p className="ep-cta-note">
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
