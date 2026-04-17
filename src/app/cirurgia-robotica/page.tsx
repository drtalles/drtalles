import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  CalendarCheck,
  Droplets,
  Eye,
  MessageCircle,
  Minimize2,
  ShieldCheck,
  Target,
  Timer,
  UserRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cirurgia Robótica Urológica | Dr. Talles Leandro",
  description:
    "Entenda o que é cirurgia robótica urológica, seus principais benefícios e como essa nova frente integra a atuação do Dr. Talles Leandro.",
};

const DOCTORALIA_URL =
  "https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande?utm_id=34199&utm_source=widget-doctor-34199&utm_medium=big&utm_campaign=&utm_content=#highlight-calendar";
const WA_URL = "https://wa.me/5583999999999";
const CRM_LABEL = "CRM-PB 5970";

const BENEFICIOS = [
  {
    icon: Minimize2,
    title: "Menor invasividade",
    text: "Abordagem minimamente invasiva com incisão reduzida e menor impacto tecidual.",
  },
  {
    icon: Target,
    title: "Alta precisão cirúrgica",
    text: "Movimentos refinados e controle técnico detalhado durante o procedimento.",
  },
  {
    icon: Droplets,
    title: "Menor perda de sangue",
    text: "Técnica com potencial de reduzir sangramento em casos bem indicados.",
  },
  {
    icon: Timer,
    title: "Recuperação mais rápida",
    text: "Pós-operatório potencialmente mais confortável e retorno progressivo das atividades.",
  },
  {
    icon: ShieldCheck,
    title: "Menor risco de complicações",
    text: "Planejamento e execução técnica favorecem segurança em casos selecionados.",
  },
  {
    icon: Eye,
    title: "Melhor visualização",
    text: "Visão ampliada da área operada para apoiar decisões intraoperatórias.",
  },
];

const FAQ = [
  {
    question: "O que é cirurgia robótica urológica?",
    answer:
      "É uma abordagem cirúrgica minimamente invasiva em que o médico controla, com precisão, instrumentos acoplados a uma plataforma robótica.",
  },
  {
    question: "Quais casos podem ter indicação?",
    answer:
      "A indicação depende de avaliação médica individualizada. Entre os casos que mais se destacam estão situações oncológicas na urologia, especialmente relacionadas à próstata e aos rins.",
  },
  {
    question: "Quais são os possíveis benefícios dessa abordagem?",
    answer:
      "Entre os principais pontos estão menor invasividade, maior precisão, menor perda de sangue e recuperação potencialmente mais rápida.",
  },
  {
    question: "Como saber se meu caso tem indicação?",
    answer:
      "A definição depende de consulta, avaliação clínica e análise individualizada do quadro de cada paciente.",
  },
];

const KEYWORDS = [
  { icon: Target, label: "Precisão cirúrgica" },
  { icon: ShieldCheck, label: "Critério médico" },
  { icon: CalendarCheck, label: "Planejamento" },
  { icon: UserRound, label: "Abordagem individualizada" },
];

export default function CirurgiaRoboticaPage() {
  return (
    <>
      <Header />
      <main id="cirurgia-robotica-page">
        <style>{`
          /* Internal hero */
          .cr-hero-intro {
            position: relative;
            z-index: 1;
            max-width: 860px;
          }

          .cr-hero-intro .internal-hero-title {
            text-wrap: balance;
            white-space: nowrap;
            max-width: none;
          }

          .cr-hero-wave {
            position: absolute;
            right: -92px;
            bottom: -126px;
            width: min(56vw, 720px);
            height: min(31vw, 360px);
            border-radius: 999px;
            pointer-events: none;
            border: 1px solid rgba(255,255,255,0.16);
            transform: rotate(-10deg);
            opacity: 0.42;
          }

          .cr-hero-wave::before {
            content: "";
            position: absolute;
            inset: 14px;
            border-radius: inherit;
            border: 1px solid rgba(125,223,215,0.42);
          }

          .cr-hero-wave::after {
            content: "";
            position: absolute;
            inset: 28px;
            border-radius: inherit;
            border: 1px solid rgba(255,255,255,0.16);
          }

          .cr-feature-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: clamp(1.5rem, 3vw, 2.2rem);
            align-items: center;
          }

          .cr-feature-card {
            border-radius: 1rem;
            border: 1px solid var(--color-neutral-200);
            background: #fff;
            padding: 1.45rem;
            box-shadow: 0 8px 26px rgba(27,77,110,0.07);
          }

          .cr-feature-media {
            position: relative;
            border-radius: 1.25rem;
            overflow: hidden;
            border: none;
            background: transparent;
          }

          .cr-feature-media img {
            display: block;
            width: 100%;
            height: auto;
          }

          .cr-pills {
            margin-top: 1rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
          }

          .cr-pill {
            font-size: 0.75rem;
            color: var(--color-primary-dark);
            background: rgba(46,196,182,0.16);
            border: 1px solid rgba(46,196,182,0.3);
            border-radius: 999px;
            padding: 0.3rem 0.58rem;
            line-height: 1;
            font-weight: 600;
          }

          .cr-connection {
            background: var(--color-neutral-50);
          }

          .cr-connection-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 320px);
            gap: 1.25rem;
            align-items: stretch;
          }

          .cr-keywords {
            border-radius: 1rem;
            border: 1px solid rgba(27,77,110,0.14);
            background: linear-gradient(145deg, rgba(27,77,110,0.96) 0%, rgba(15,45,66,0.96) 100%);
            color: rgba(255,255,255,0.8);
            padding: 1.35rem;
            box-shadow: 0 10px 28px rgba(15,45,66,0.24);
          }

          .cr-keywords h3 {
            color: #fff;
            font-size: 1.08rem;
            margin: 0 0 0.9rem;
            font-family: var(--font-body);
            letter-spacing: 0.01em;
          }

          .cr-keywords ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.55rem;
          }

          .cr-keywords li {
            display: flex;
            align-items: center;
            gap: 0.55rem;
            font-size: 0.9rem;
          }

          .cr-keyword-icon {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 0.45rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #aaf3ec;
            background: rgba(125,223,215,0.14);
            border: 1px solid rgba(125,223,215,0.35);
            flex-shrink: 0;
          }

          .cr-benefits-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1rem;
          }

          .cr-benefit {
            border-radius: 0.95rem;
            border: 1px solid var(--color-neutral-200);
            background: #fff;
            padding: 1.2rem 1rem;
            transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
          }

          .cr-benefit:hover {
            transform: translateY(-3px);
            border-color: rgba(46,196,182,0.72);
            box-shadow: 0 12px 28px rgba(27,77,110,0.08);
          }

          .cr-benefit-icon {
            width: 2.6rem;
            height: 2.6rem;
            border-radius: 0.7rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #1B4D6E 0%, #2EC4B6 100%);
            color: #fff;
            margin-bottom: 0.7rem;
          }

          .cr-benefit h3 {
            margin: 0 0 0.45rem;
            font-family: var(--font-body);
            font-size: 0.95rem;
            color: var(--color-primary-dark);
            line-height: 1.35;
          }

          .cr-benefit p {
            margin: 0;
            font-size: 0.84rem;
            line-height: 1.58;
            color: var(--color-neutral-700);
          }

          .cr-responsibility {
            background: linear-gradient(135deg, var(--color-primary-dark) 0%, #163e5a 56%, var(--color-primary) 100%);
            position: relative;
            overflow: hidden;
          }

          .cr-responsibility::before {
            content: "";
            position: absolute;
            top: -34%;
            left: -8%;
            width: 560px;
            height: 560px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(46,196,182,0.11) 0%, transparent 68%);
            pointer-events: none;
          }

          .cr-highlight {
            position: relative;
            z-index: 1;
            max-width: 900px;
            margin-inline: auto;
            border-radius: 1.2rem;
            border: 1px solid rgba(255,255,255,0.2);
            background: rgba(255,255,255,0.08);
            backdrop-filter: blur(7px);
            -webkit-backdrop-filter: blur(7px);
            padding: clamp(1.4rem, 2.8vw, 2rem);
          }

          .cr-highlight h2 {
            color: #fff;
            margin-bottom: 0.9rem;
          }

          .cr-highlight p {
            margin: 0;
            color: rgba(255,255,255,0.8);
            line-height: 1.82;
            max-width: 72ch;
          }

          .cr-profile-grid {
            display: grid;
            grid-template-columns: minmax(0, 360px) minmax(0, 1fr);
            gap: clamp(1.4rem, 4vw, 3rem);
            align-items: center;
          }

          .cr-profile-photo {
            border-radius: 1.2rem;
            overflow: hidden;
            border: 1px solid rgba(27,77,110,0.16);
            background: linear-gradient(155deg, rgba(27,77,110,0.13), rgba(46,196,182,0.11));
          }

          .cr-profile-photo img {
            display: block;
            width: 100%;
            height: auto;
          }

          .cr-faq {
            background: var(--color-neutral-50);
          }

          .cr-faq-list {
            max-width: 900px;
            margin: 0 auto;
            display: grid;
            gap: 0.75rem;
          }

          .cr-faq-item {
            border-radius: 0.95rem;
            border: 1px solid var(--color-neutral-200);
            background: #fff;
            overflow: hidden;
          }

          .cr-faq-summary {
            list-style: none;
            cursor: pointer;
            padding: 1rem 1.1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            font-size: 0.94rem;
            font-weight: 700;
            color: var(--color-primary-dark);
            font-family: var(--font-body);
          }

          .cr-faq-summary::-webkit-details-marker {
            display: none;
          }

          .cr-faq-summary::after {
            content: "+";
            width: 1.4rem;
            height: 1.4rem;
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            color: var(--color-primary-dark);
            border: 1px solid rgba(27,77,110,0.22);
            transition: transform 0.22s ease;
          }

          .cr-faq-item[open] .cr-faq-summary::after {
            transform: rotate(45deg);
          }

          .cr-faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.28s ease, padding 0.28s ease;
            color: var(--color-neutral-700);
            line-height: 1.72;
            font-size: 0.9rem;
            padding: 0 1.1rem;
          }

          .cr-faq-item[open] .cr-faq-answer {
            max-height: 220px;
            padding: 0 1.1rem 1rem;
          }

          .cr-final-cta {
            background: linear-gradient(135deg, var(--color-primary-dark) 0%, #163e5a 50%, var(--color-primary) 100%);
            position: relative;
            overflow: hidden;
          }

          .cr-final-cta::before {
            content: "";
            position: absolute;
            top: -30%;
            left: -9%;
            width: 620px;
            height: 620px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(46,196,182,0.08) 0%, transparent 65%);
            pointer-events: none;
          }

          .cr-final-inner {
            position: relative;
            z-index: 1;
            text-align: center;
            max-width: 760px;
            margin-inline: auto;
          }

          .cr-final-actions {
            margin-top: 2rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.95rem;
          }

          .cr-note {
            margin-top: 1.5rem;
            font-size: 0.8rem;
            color: rgba(255,255,255,0.58);
            letter-spacing: 0.03em;
          }

          @media (max-width: 980px) {
            .cr-hero-intro .internal-hero-title {
              white-space: normal;
            }

            .cr-benefits-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 860px) {
            .cr-feature-grid,
            .cr-connection-grid,
            .cr-profile-grid {
              grid-template-columns: 1fr;
            }

            .cr-hero-wave {
              display: none;
            }

            .cr-benefits-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        {/* Bloco 1: Hero / abertura */}
        <section className="internal-hero" data-header-theme="dark">
          <div className="internal-hero-glow" aria-hidden />
          <div className="internal-hero-lines" aria-hidden />
          <div className="cr-hero-wave" aria-hidden />

          <div className="container-site">
            <div className="cr-hero-intro internal-hero-inner">
              <p className="internal-hero-kicker">Tecnologia e critério médico</p>

              <h1 className="internal-hero-title">Cirurgia Robótica Urológica</h1>

              <p className="internal-hero-description">
                Entenda como a cirurgia robótica integra a atuação urológica com
                planejamento técnico, precisão cirúrgica e indicação médica
                individualizada para cada caso.
              </p>
            </div>
          </div>
        </section>

        {/* Bloco 2: Explicação institucional */}
        <section className="section-pad">
          <div className="container-site cr-feature-grid">
            <div className="cr-feature-card">
              <p className="eyebrow">Cirurgia minimamente invasiva</p>
              <h2 style={{ marginBottom: "1rem", color: "var(--color-primary-dark)" }}>
                O que é cirurgia robótica
              </h2>
              <p className="cr-text">
                A cirurgia robótica é uma técnica minimamente invasiva em que o
                médico controla, com alta precisão, instrumentos acoplados a uma
                plataforma cirúrgica.
              </p>
              <p className="cr-text" style={{ marginTop: "0.9rem" }}>
                Na urologia, essa abordagem pode ser especialmente importante em
                procedimentos que exigem refinamento técnico, visão ampliada da
                área operada e maior precisão nos movimentos durante a cirurgia.
              </p>
              <div className="cr-pills">
                <span className="cr-pill">Movimentos controlados</span>
                <span className="cr-pill">Visão ampliada</span>
                <span className="cr-pill">Menor trauma cirúrgico</span>
              </div>
            </div>

            <div className="cr-feature-media">
              <Image
                src="/img/dr-talles-cirurgia.png"
                alt="Contexto de cirurgia robótica urológica"
                width={620}
                height={760}
              />
            </div>
          </div>
        </section>

        {/* Bloco 3: Conexão com a Urologia */}
        <section className="section-pad cr-connection">
          <div className="container-site cr-connection-grid">
            <div>
              <p className="eyebrow">Conexão com a urologia</p>
              <h2 style={{ marginBottom: "1rem", color: "var(--color-primary-dark)" }}>
                Como essa frente se conecta à urologia
              </h2>
              <p className="cr-text">
                Na urologia, a cirurgia robótica vem ganhando espaço em
                casos que exigem abordagem cirúrgica criteriosa e planejamento
                individualizado.
              </p>
              <p className="cr-text" style={{ marginTop: "0.9rem" }}>
                No posicionamento atual do Dr. Talles Leandro, essa nova etapa
                passa a ser comunicada com atenção especial aos casos
                oncológicos urológicos, sobretudo em situações relacionadas à
                próstata e aos rins.
              </p>
            </div>

            <aside className="cr-keywords" aria-label="Pilares da abordagem">
              <h3>Pilares da abordagem</h3>
              <ul>
                {KEYWORDS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <span className="cr-keyword-icon" aria-hidden>
                        <Icon size={14} />
                      </span>
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </section>

        {/* Bloco 4: Benefícios */}
        <section className="section-pad">
          <div className="container-site">
            <div
              style={{
                textAlign: "center",
                maxWidth: "780px",
                marginInline: "auto",
                marginBottom: "2.15rem",
              }}
            >
              <p className="eyebrow" style={{ justifyContent: "center" }}>
                Benefícios
              </p>
              <h2 style={{ marginBottom: "0.85rem" }}>
                Principais benefícios da cirurgia robótica
              </h2>
            </div>

            <div className="cr-benefits-grid">
              {BENEFICIOS.map((beneficio) => {
                const Icon = beneficio.icon;
                return (
                  <article key={beneficio.title} className="cr-benefit">
                    <span className="cr-benefit-icon" aria-hidden>
                      <Icon size={18} />
                    </span>
                    <h3>{beneficio.title}</h3>
                    <p>{beneficio.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bloco 5: Posicionamento e responsabilidade médica */}
        <section className="section-pad cr-responsibility">
          <div className="container-site">
            <div className="cr-highlight">
              <p className="eyebrow" style={{ color: "var(--color-accent)" }}>
                Autoridade e segurança
              </p>
              <h2>Tecnologia com indicação responsável</h2>
              <p>
                A presença da tecnologia, por si só, não define a melhor conduta
                para todos os casos. Por isso, a indicação da cirurgia robótica
                deve sempre ser feita com base em avaliação médica
                individualizada, considerando o quadro clínico, o tipo de
                procedimento e a real necessidade de cada paciente. Na atuação do
                Dr. Talles Leandro, essa etapa é incorporada com seriedade,
                critério técnico e compromisso com uma condução médica segura.
              </p>
            </div>
          </div>
        </section>

        {/* Bloco 6: Posicionamento profissional */}
        <section className="section-pad">
          <div className="container-site cr-profile-grid">
            <div className="cr-profile-photo">
              <Image
                src="/img/dr-talles-5.jpg"
                alt="Dr. Talles Leandro"
                width={420}
                height={530}
              />
            </div>
            <div>
              <p className="eyebrow">Posicionamento profissional</p>
              <h2 style={{ marginBottom: "1rem", color: "var(--color-primary-dark)" }}>
                Uma nova etapa da atuação do Dr. Talles
              </h2>
              <p className="cr-text">
                Com 15 anos de experiência em urologia e certificação em
                cirurgia robótica urológica, Dr. Talles amplia sua prática
                cirúrgica e fortalece seu posicionamento profissional com uma
                abordagem alinhada às novas possibilidades da medicina.
              </p>
              <p className="cr-text" style={{ marginTop: "0.9rem" }}>
                Essa evolução representa mais um passo dentro de uma trajetória
                construída com responsabilidade, atualização constante e foco no
                melhor cuidado para cada paciente.
              </p>

              <div style={{ marginTop: "1.5rem" }}>
                <Link href="/dr-talles" className="btn btn-outline">
                  <UserRound size={16} />
                  Conheça o Dr. Talles
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bloco 7: FAQ */}
        <section className="section-pad cr-faq">
          <div className="container-site">
            <div
              style={{
                textAlign: "center",
                maxWidth: "700px",
                marginInline: "auto",
                marginBottom: "1.85rem",
              }}
            >
              <p className="eyebrow" style={{ justifyContent: "center" }}>
                Perguntas frequentes
              </p>
              <h2>Perguntas frequentes</h2>
            </div>

            <div className="cr-faq-list">
              {FAQ.map((item) => (
                <details key={item.question} className="cr-faq-item">
                  <summary className="cr-faq-summary">{item.question}</summary>
                  <div className="cr-faq-answer">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bloco 8: CTA final */}
        <section id="agendamento" className="section-pad cr-final-cta">
          <div className="container-site cr-final-inner">
            <p className="eyebrow" style={{ justifyContent: "center", color: "var(--color-accent)" }}>
              Agendamento
            </p>
            <h2 style={{ color: "#fff", marginBottom: "1rem" }}>
              Agende sua consulta e tire suas dúvidas
            </h2>
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.82,
                maxWidth: "58ch",
                marginInline: "auto",
              }}
            >
              Se você deseja entender melhor quando a cirurgia robótica pode ser
              indicada, agende sua consulta e receba uma orientação
              individualizada para o seu caso.
            </p>

            <div className="cr-final-actions">
              <a
                href={DOCTORALIA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
                style={{ fontSize: "1rem", padding: "0.98rem 1.95rem" }}
              >
                <CalendarCheck size={18} />
                Agendar consulta
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

            <p className="cr-note">
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

