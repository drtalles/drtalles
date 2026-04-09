import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  ExternalLink,
  Heart,
  MessageCircle,
  Monitor,
  Stethoscope,
  User,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dr. Talles Leandro | Urologista em Campina Grande",
  description:
    "Conheça a trajetória do Dr. Talles Leandro, urologista em Campina Grande, com atuação em saúde do homem, atendimento personalizado e cirurgia robótica urológica.",
};

const DOCTORALIA_URL =
  "https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande?utm_id=34199&utm_source=widget-doctor-34199&utm_medium=big&utm_campaign=&utm_content=#highlight-calendar";
const WA_URL = "https://wa.me/5583999999999";

const TRAJETORIA = [
  {
    title: "Formação",
    icon: User,
    items: ["Graduação em Medicina pela Universidade Federal de Roraima."],
  },
  {
    title: "Especialização",
    icon: Stethoscope,
    items: [
      "Residência em Cirurgia Geral no Hospital Universitário Lauro Wanderley - UFPB.",
      "Residência Médica em Urologia no Hospital São Rafael - Salvador.",
      "Estágio em Urologia na Ludwig Maximilian Universität - Munique, Alemanha.",
    ],
  },
  {
    title: "Experiência profissional",
    icon: Monitor,
    items: [
      "Atuação como médico urologista no Hospital Universitário Alcides Carneiro - UFCG.",
      "Professor da disciplina de Urologia da UFCG.",
    ],
  },
];

const DIFERENCIAIS = [
  { icon: User, text: "Atendimento personalizado" },
  { icon: Clock, text: "Consulta por hora marcada" },
  { icon: Heart, text: "Foco em saúde do homem" },
  { icon: Stethoscope, text: "Experiência em Urologia clínica e cirúrgica" },
  { icon: CalendarCheck, text: "Agendamento online com praticidade" },
  { icon: Monitor, text: "Ampliação da atuação em cirurgia robótica urológica" },
];

export default function DrTallesPage() {
  return (
    <>
      <Header />
      <main id="dr-talles-page">
        <style>{`
          /* Internal hero */
          .dr-hero-intro {
            position: relative;
            z-index: 1;
            max-width: 820px;
          }

          .dr-hero-intro .internal-hero-title {
            text-wrap: balance;
            white-space: nowrap;
            max-width: none;
          }

          .dr-hero-intro .internal-hero-description {
            max-width: 62ch;
          }

          .dr-hero-wave {
            position: absolute;
            right: -88px;
            bottom: -124px;
            width: min(54vw, 700px);
            height: min(30vw, 350px);
            border-radius: 999px;
            pointer-events: none;
            border: 1px solid rgba(255,255,255,0.16);
            transform: rotate(-10deg);
            opacity: 0.42;
          }

          .dr-hero-wave::before {
            content: "";
            position: absolute;
            inset: 14px;
            border-radius: inherit;
            border: 1px solid rgba(125,223,215,0.4);
          }

          .dr-hero-wave::after {
            content: "";
            position: absolute;
            inset: 28px;
            border-radius: inherit;
            border: 1px solid rgba(255,255,255,0.16);
          }

          .dr-traj-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.125rem;
          }

          .dr-traj-card {
            position: relative;
            border-radius: 1rem;
            border: 1px solid var(--color-neutral-200);
            background: #fff;
            padding: 1.75rem;
            box-shadow: 0 8px 24px rgba(27,77,110,0.06);
            transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
          }

          .dr-traj-card:hover {
            transform: translateY(-3px);
            border-color: rgba(46,196,182,0.6);
            box-shadow: 0 12px 28px rgba(27,77,110,0.1);
          }

          .dr-traj-card::before {
            content: "";
            position: absolute;
            inset: 0 auto auto 0;
            width: 100%;
            height: 3px;
            border-top-left-radius: 1rem;
            border-top-right-radius: 1rem;
            background: linear-gradient(90deg, #1B4D6E 0%, #2EC4B6 100%);
          }

          .dr-traj-head {
            display: flex;
            align-items: center;
            gap: 0.65rem;
            margin-bottom: 0.875rem;
          }

          .dr-traj-icon {
            width: 2.2rem;
            height: 2.2rem;
            border-radius: 0.65rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #1B4D6E 0%, #2EC4B6 100%);
            color: #fff;
            flex-shrink: 0;
          }

          .dr-traj-list {
            margin: 0;
            padding-left: 1rem;
            display: grid;
            gap: 0.55rem;
          }

          .dr-traj-list li {
            color: var(--color-neutral-700);
            line-height: 1.65;
            font-size: 0.9125rem;
          }

          .dr-phi-grid {
            display: grid;
            grid-template-columns: minmax(0, 420px) minmax(0, 1fr);
            gap: clamp(1.5rem, 4vw, 3rem);
            align-items: center;
          }

          .dr-phi-photo-wrap {
            position: relative;
            border-radius: 1.25rem;
            overflow: hidden;
            background: linear-gradient(160deg, rgba(27,77,110,0.15) 0%, rgba(46,196,182,0.12) 100%);
            border: 1px solid rgba(27,77,110,0.12);
          }

          .dr-phi-photo-wrap img {
            display: block;
            width: 100%;
            height: auto;
          }

          .dr-phi-list {
            margin: 1.5rem 0 0;
            padding: 0;
            list-style: none;
            display: grid;
            gap: 0.625rem;
          }

          .dr-phi-list li {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            color: var(--color-neutral-700);
            font-size: 0.9375rem;
            line-height: 1.55;
          }

          .dr-phi-dot {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background: var(--color-accent);
            box-shadow: 0 0 0 5px rgba(46,196,182,0.18);
            flex-shrink: 0;
          }

          .dr-diff-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1rem;
          }

          .dr-diff-card {
            background: #fff;
            border: 1px solid var(--color-neutral-200);
            border-radius: 0.875rem;
            padding: 1.25rem 1.125rem;
            display: flex;
            align-items: center;
            gap: 0.875rem;
            transition: border-color 0.24s ease, transform 0.24s ease, box-shadow 0.24s ease;
          }

          .dr-diff-card:hover {
            border-color: rgba(46,196,182,0.75);
            transform: translateY(-3px);
            box-shadow: 0 10px 24px rgba(27,77,110,0.09);
          }

          .dr-diff-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2.75rem;
            height: 2.75rem;
            border-radius: 0.75rem;
            color: #fff;
            background: linear-gradient(135deg, #1B4D6E 0%, #2EC4B6 100%);
            flex-shrink: 0;
          }

          .dr-robotic {
            position: relative;
            background: #f4f6f8;
            overflow: hidden;
          }

          .dr-robotic-grid {
            display: grid;
            grid-template-columns: 48fr 52fr;
            min-height: clamp(520px, 64vw, 720px);
          }

          .dr-robotic-photo {
            position: relative;
            overflow: hidden;
            min-height: 100%;
          }

          .dr-robotic-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-block: clamp(2.5rem, 6vw, 5rem);
            padding-inline: clamp(1.5rem, 5vw, 5rem);
          }

          .dr-robotic-eyebrow {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-family: var(--font-body);
            font-size: 0.6875rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--color-accent-dark);
            margin: 0 0 1.25rem;
          }

          .dr-robotic-eyebrow::before {
            content: "";
            display: block;
            width: 2rem;
            height: 1.5px;
            background: var(--color-accent-dark);
            flex-shrink: 0;
          }

          .dr-cta-final {
            background: linear-gradient(135deg, var(--color-primary-dark) 0%, #163e5a 50%, var(--color-primary) 100%);
            position: relative;
            overflow: hidden;
          }

          .dr-cta-final::before {
            content: "";
            position: absolute;
            top: -28%;
            left: -10%;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(46,196,182,0.08) 0%, transparent 65%);
            pointer-events: none;
          }

          .dr-cta-final::after {
            content: "";
            position: absolute;
            bottom: -22%;
            right: -6%;
            width: 380px;
            height: 380px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(42,122,181,0.14) 0%, transparent 65%);
            pointer-events: none;
          }

          .dr-cta-inner {
            position: relative;
            z-index: 1;
            text-align: center;
            max-width: 760px;
            margin-inline: auto;
          }

          .dr-cta-actions {
            margin-top: 2rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }

          .dr-cta-credentials {
            margin-top: 1.5rem;
            color: rgba(255,255,255,0.62);
            font-size: 0.8125rem;
            letter-spacing: 0.03em;
          }

          @media (max-width: 980px) {
            .dr-hero-intro .internal-hero-title {
              white-space: normal;
            }

            .dr-traj-grid,
            .dr-diff-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 860px) {
            .dr-hero-wave {
              display: none;
            }

            .dr-phi-grid {
              grid-template-columns: 1fr;
            }

            .dr-traj-grid,
            .dr-diff-grid {
              grid-template-columns: 1fr;
            }

            .dr-robotic-grid {
              grid-template-columns: 1fr;
              grid-template-rows: minmax(240px, 55vw) 1fr;
              min-height: 0;
            }

            .dr-robotic-content {
              padding-block: 2.5rem;
              padding-inline: 1.5rem;
            }
          }
        `}</style>

        {/* Bloco 1: Hero */}
        <section className="internal-hero" data-header-theme="dark">
          <div className="internal-hero-glow" aria-hidden />
          <div className="internal-hero-lines" aria-hidden />
          <div className="dr-hero-wave" aria-hidden />

          <div className="container-site">
            <div className="dr-hero-intro internal-hero-inner">
              <p className="internal-hero-kicker">Urologia de alta performance clinica</p>

              <h1 className="internal-hero-title">Dr. Talles Leandro</h1>

              <p className="internal-hero-description">
                Urologista com atuacao voltada a saude do homem, atendimento
                personalizado e evolucao continua da pratica cirurgica, com
                conduta medica individualizada para cada paciente.
              </p>
            </div>
          </div>
        </section>

        {/* Bloco 2: Trajetória */}
        <section
          id="trajetoria"
          className="section-pad"
          style={{ background: "var(--color-neutral-50)" }}
        >
          <div className="container-site">
            <div
              style={{
                maxWidth: "860px",
                marginInline: "auto",
                textAlign: "center",
                marginBottom: "2.5rem",
              }}
            >
              <p className="eyebrow" style={{ justifyContent: "center" }}>
                Trajetória
              </p>
              <h2 style={{ marginBottom: "0.95rem" }}>
                Uma trajetória marcada por formação, experiência e
                responsabilidade médica
              </h2>
              <p style={{ margin: 0, color: "var(--color-neutral-700)", lineHeight: 1.7 }}>
                Formação acadêmica, especialização médica e vivência assistencial
                organizadas em uma leitura objetiva e confiável.
              </p>
            </div>

            <div className="dr-traj-grid">
              {TRAJETORIA.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="dr-traj-card">
                    <div className="dr-traj-head">
                      <span className="dr-traj-icon" aria-hidden>
                        <Icon size={16} />
                      </span>
                      <h3
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "1rem",
                          margin: 0,
                          color: "var(--color-primary-dark)",
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <ul className="dr-traj-list">
                      {item.items.map((listItem) => (
                        <li key={listItem}>{listItem}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bloco 3: Atendimento e Filosofia */}
        <section className="section-pad" style={{ background: "#fff" }}>
          <div className="container-site dr-phi-grid">
            <div className="dr-phi-photo-wrap">
              <Image
                src="/img/dr-talles-4.jpg"
                alt="Atendimento do Dr. Talles Leandro"
                width={420}
                height={530}
              />
            </div>
            <div>
              <p className="eyebrow">Modelo de atendimento</p>
              <h2
                style={{
                  marginBottom: "1rem",
                  color: "var(--color-primary-dark)",
                }}
              >
                Atendimento com escuta, clareza e acompanhamento individualizado
              </h2>
              <p
                style={{
                  margin: 0,
                  color: "var(--color-neutral-700)",
                  lineHeight: 1.85,
                }}
              >
                Cada paciente chega com uma necessidade diferente. Por isso, a
                proposta do atendimento é oferecer uma condução médica cuidadosa,
                com consulta por hora marcada, atenção individual e explicações
                claras sobre cada etapa da avaliação e do tratamento. Mais do que
                um atendimento técnico, o compromisso é proporcionar segurança,
                proximidade e confiança na tomada de decisão.
              </p>

              <ul className="dr-phi-list">
                <li>
                  <span className="dr-phi-dot" />
                  Escuta atenta e consulta com tempo dedicado.
                </li>
                <li>
                  <span className="dr-phi-dot" />
                  Clareza na avaliação e na conduta terapêutica.
                </li>
                <li>
                  <span className="dr-phi-dot" />
                  Atendimento individualizado e acompanhamento responsável.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bloco 4: Diferenciais */}
        <section className="section-pad" style={{ background: "var(--color-neutral-50)" }}>
          <div className="container-site">
            <div
              style={{
                textAlign: "center",
                maxWidth: "700px",
                marginInline: "auto",
                marginBottom: "2.25rem",
              }}
            >
              <p className="eyebrow" style={{ justifyContent: "center" }}>
                Atuação
              </p>
              <h2 style={{ marginBottom: "0.875rem" }}>
                Diferenciais da atuação
              </h2>
            </div>

            <div className="dr-diff-grid">
              {DIFERENCIAIS.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.text} className="dr-diff-card">
                    <span className="dr-diff-icon" aria-hidden>
                      <Icon size={18} />
                    </span>
                    <p
                      style={{
                        margin: 0,
                        color: "var(--color-neutral-700)",
                        fontSize: "0.9375rem",
                        lineHeight: 1.55,
                      }}
                    >
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bloco 5: Destaque Cirurgia Robótica */}
        <section className="dr-robotic">
          <div className="dr-robotic-grid">
            <div className="dr-robotic-photo" aria-hidden>
              <Image
                src="/img/dr-talles-3.png"
                alt="Dr. Talles Leandro em contexto de cirurgia robótica"
                fill
                sizes="(max-width: 860px) 100vw, 48vw"
                style={{ objectFit: "cover", objectPosition: "center center" }}
              />
            </div>

            <div className="dr-robotic-content">
              <p className="dr-robotic-eyebrow">
                Cirurgia robótica
              </p>
              <h2
                style={{
                  color: "var(--color-primary-dark)",
                  marginBottom: "1.75rem",
                  fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.015em",
                }}
              >
                Cirurgia robótica como nova etapa da atuação
              </h2>
              <p
                style={{
                  margin: "0 0 1rem",
                  color: "var(--color-neutral-700)",
                  lineHeight: 1.82,
                  fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
                  maxWidth: "62ch",
                }}
              >
                Além da atuação consolidada em Urologia, Dr. Talles Leandro
                amplia sua prática com certificação em cirurgia robótica
                urológica, incorporando essa evolução ao seu trabalho com foco
                em precisão, critério técnico e indicação adequada para cada
                paciente.
              </p>
              <p
                style={{
                  margin: 0,
                  color: "var(--color-neutral-700)",
                  lineHeight: 1.82,
                  fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
                  maxWidth: "62ch",
                }}
              >
                Essa nova etapa reforça seu compromisso com uma medicina atual,
                responsável e alinhada às novas possibilidades da prática
                cirúrgica.
              </p>

              <div style={{ marginTop: "1.75rem" }}>
                <Link href="/cirurgia-robotica" className="btn btn-primary" style={{ gap: "0.5rem" }}>
                  Conheça a cirurgia robótica
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bloco 6: CTA final */}
        <section id="agendamento" className="section-pad dr-cta-final">
          <div className="container-site dr-cta-inner">
            <p className="eyebrow" style={{ justifyContent: "center", color: "var(--color-accent)" }}>
              Agendamento
            </p>
            <h2 style={{ color: "#fff", marginBottom: "1rem" }}>Agende sua consulta</h2>
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.8,
                maxWidth: "58ch",
                marginInline: "auto",
              }}
            >
              Se você busca atendimento urológico com escuta, clareza e
              acompanhamento individualizado, agende sua consulta e conheça de
              perto a atuação do Dr. Talles Leandro.
            </p>

            <div className="dr-cta-actions">
              <a
                href={DOCTORALIA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
                style={{ fontSize: "1.02rem", padding: "1rem 2rem" }}
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
                style={{ fontSize: "1.02rem", padding: "1rem 2rem" }}
              >
                <MessageCircle size={18} />
                Falar no WhatsApp
              </a>
            </div>

            <p className="dr-cta-credentials">CRM-PB 5970</p>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

