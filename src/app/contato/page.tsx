import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  CalendarCheck,
  Clock3,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Agendar Consulta com Urologista em Campina Grande | Dr. Talles Leandro",
  description:
    "Agende sua consulta de urologia em Campina Grande/PB com o Dr. Talles Leandro. Atendimento na Clínica Vitta, R. Dep. Álvaro Gaudêncio, 281 — Centro. WhatsApp: (83) 9 8828-7705. Seg–Sex 07h30–17h30.",
  keywords: [
    "agendar consulta urologista Campina Grande",
    "consulta urologia Campina Grande",
    "Clínica Vitta Campina Grande",
    "telefone urologista Campina Grande",
    "endereço urologista Campina Grande",
    "WhatsApp urologista Campina Grande",
    "Dr. Talles Leandro contato",
    "marcar consulta urologia PB",
  ],
  alternates: {
    canonical: "https://drtallesleandro.com.br/contato",
  },
  openGraph: {
    type: "website",
    url: "https://drtallesleandro.com.br/contato",
    title: "Agendar Consulta com Urologista em Campina Grande | Dr. Talles Leandro",
    description:
      "Agende sua consulta na Clínica Vitta, Campina Grande/PB. WhatsApp, telefone ou agendamento online pelo Doctoralia.",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Agendar Consulta — Dr. Talles Leandro, Urologista em Campina Grande",
      },
    ],
  },
};

const DOCTORALIA_URL =
  "https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande?utm_id=34199&utm_source=widget-doctor-34199&utm_medium=big&utm_campaign=&utm_content=#highlight-calendar";
const WA_URL = "https://wa.me/558391350081";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=R.+Dep.+%C3%81lvaro+Gaud%C3%AAncio,+281,+Centro,+Campina+Grande,+PB,+58400-243";

const PHONES = ["(83) 3142-1505", "(83) 3142-1507", "(83) 9 8828-7705"];
const CLINIC_NAME = "Clínica Vitta";
const ADDRESS = "R. Dep. Álvaro Gaudêncio, 281 - Centro - CEP: 58400-243";
const CITY = "Campina Grande, PB";
const HOURS = "De segunda a sexta-feira, das 07h30 às 17h30";
const CRM_LABEL = "CRM-PB 5970";
const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://drtallesleandro.com.br" },
    { "@type": "ListItem", position: 2, name: "Contato e Agendamento", item: "https://drtallesleandro.com.br/contato" },
  ],
};

const jsonLdClinic = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Clínica Vitta — Dr. Talles Leandro",
  description: "Consultório de urologia do Dr. Talles Leandro em Campina Grande/PB.",
  url: "https://drtallesleandro.com.br/contato",
  telephone: ["+55-83-3142-1505", "+55-83-3142-1507", "+55-83-98828-7705"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Dep. Álvaro Gaudêncio, 281",
    addressLocality: "Campina Grande",
    addressRegion: "PB",
    postalCode: "58400-243",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -7.2308,
    longitude: -35.8817,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:30",
      closes: "17:30",
    },
  ],
  hasMap: "https://www.google.com/maps/search/?api=1&query=R.+Dep.+%C3%81lvaro+Gaud%C3%AAncio,+281,+Centro,+Campina+Grande,+PB,+58400-243",
  medicalSpecialty: "Urology",
};

export default function ContatoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdClinic) }} />
      <Header />
      <main id="contato-page">
        <style>{`
          .ct-hero-intro {
            position: relative;
            z-index: 1;
            max-width: 860px;
          }

          .ct-hero-intro .internal-hero-title {
            max-width: 100%;
            white-space: nowrap;
            text-wrap: nowrap;
          }

          .ct-hero-wave {
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

          .ct-hero-wave::before {
            content: "";
            position: absolute;
            inset: 14px;
            border-radius: inherit;
            border: 1px solid rgba(125,223,215,0.42);
          }

          .ct-hero-wave::after {
            content: "";
            position: absolute;
            inset: 28px;
            border-radius: inherit;
            border: 1px solid rgba(255,255,255,0.16);
          }

          .ct-hero-meta {
            margin-top: 1.35rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.55rem;
          }

          .ct-hero-meta span {
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

          .ct-hero-actions {
            margin-top: 1.35rem;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.85rem;
          }

          .ct-main-channels {
            background: var(--color-neutral-50);
          }

          .ct-main-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
          }

          .ct-main-card {
            border-radius: 1rem;
            border: 1px solid var(--color-neutral-200);
            background: #fff;
            padding: 1.25rem;
            box-shadow: 0 10px 26px rgba(27,77,110,0.06);
            transition: transform 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease;
          }

          .ct-main-card:hover {
            transform: translateY(-3px);
            border-color: rgba(46,196,182,0.72);
            box-shadow: 0 14px 30px rgba(27,77,110,0.12);
          }

          .ct-main-icon {
            width: 2.7rem;
            height: 2.7rem;
            border-radius: 0.75rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            margin-bottom: 0.75rem;
          }

          .ct-main-card h2 {
            margin: 0 0 0.5rem;
            font-size: 1.08rem;
            color: var(--color-primary-dark);
            font-family: var(--font-body);
            line-height: 1.36;
          }

          .ct-main-card p {
            margin: 0;
            color: var(--color-neutral-700);
            font-size: 0.9rem;
            line-height: 1.7;
          }

          .ct-main-actions {
            margin-top: 1rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.65rem;
          }

          .ct-info {
            background: #fff;
          }

          .ct-info-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1rem;
          }

          .ct-info-card {
            border-radius: 1rem;
            border: 1px solid var(--color-neutral-200);
            background: linear-gradient(152deg, rgba(248,250,251,0.95), rgba(255,255,255,0.98));
            padding: 1.2rem;
          }

          .ct-info-head {
            display: flex;
            align-items: center;
            gap: 0.62rem;
            margin-bottom: 0.7rem;
          }

          .ct-info-head span {
            width: 2.3rem;
            height: 2.3rem;
            border-radius: 0.7rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #1B4D6E 0%, #2EC4B6 100%);
            color: #fff;
            flex-shrink: 0;
          }

          .ct-info-head h3 {
            margin: 0;
            font-family: var(--font-body);
            font-size: 1rem;
            color: var(--color-primary-dark);
          }

          .ct-info-card p {
            margin: 0;
            color: var(--color-neutral-700);
            line-height: 1.7;
            font-size: 0.9rem;
          }

          .ct-phone-list {
            list-style: none;
            margin: 0.4rem 0 0;
            padding: 0;
            display: grid;
            gap: 0.36rem;
          }

          .ct-phone-list a {
            text-decoration: none;
            color: var(--color-primary-dark);
            font-weight: 600;
            font-size: 0.95rem;
          }

          .ct-phone-list a:hover {
            text-decoration: underline;
          }

          .ct-address-link {
            margin-top: 0.85rem;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            color: var(--color-primary);
            font-size: 0.86rem;
            font-weight: 700;
            text-decoration: none;
          }

          .ct-address-link:hover {
            text-decoration: underline;
          }

          .ct-final {
            background: linear-gradient(135deg, var(--color-primary-dark) 0%, #163e5a 50%, var(--color-primary) 100%);
            position: relative;
            overflow: hidden;
          }

          .ct-final::before {
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

          .ct-final-inner {
            position: relative;
            z-index: 1;
            max-width: 760px;
            margin-inline: auto;
            text-align: center;
          }

          .ct-final-actions {
            margin-top: 1.95rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.9rem;
          }

          .ct-note {
            margin-top: 1.45rem;
            color: rgba(255,255,255,0.6);
            font-size: 0.8rem;
            letter-spacing: 0.03em;
          }

          @media (max-width: 980px) {
            .ct-info-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 860px) {
            .ct-hero-intro .internal-hero-title {
              white-space: normal;
              text-wrap: balance;
            }

            .ct-main-grid {
              grid-template-columns: 1fr;
            }

            .ct-hero-wave {
              display: none;
            }
          }
        `}</style>

        {/* Hero */}
        <section className="internal-hero" data-header-theme="dark">
          <div className="internal-hero-glow" aria-hidden />
          <div className="internal-hero-lines" aria-hidden />
          <div className="ct-hero-wave" aria-hidden />

          <div className="container-site">
            <div className="internal-hero-inner ct-hero-intro">
              <p className="internal-hero-kicker">Contato e agendamento</p>
              <h1 className="internal-hero-title">Agende sua consulta</h1>
              <p className="internal-hero-description">
                Escolha o canal mais prático para entrar em contato, organizar
                seu atendimento e esclarecer informações sobre consulta, exames
                e orientações iniciais.
              </p>

              <div className="ct-hero-meta">
                <span>{CRM_LABEL}</span>
              </div>

              <div className="ct-hero-actions">
                <a
                  href={DOCTORALIA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <CalendarCheck size={17} />
                  Agendar online
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Blocos principais: agendamento + whatsapp */}
        <section className="section-pad ct-main-channels">
          <div className="container-site ct-main-grid">
            <article className="ct-main-card">
              <span
                className="ct-main-icon"
                style={{ background: "linear-gradient(135deg, #1B4D6E 0%, #2EC4B6 100%)" }}
                aria-hidden
              >
                <CalendarCheck size={18} />
              </span>
              <h2>Agendamento online</h2>
              <p>
                O agendamento online oferece mais praticidade no primeiro contato
                e ajuda a organizar o atendimento de forma mais rápida e objetiva.
              </p>
              <div className="ct-main-actions">
                <a
                  href={DOCTORALIA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent"
                >
                  Agendar online
                  <ExternalLink size={14} />
                </a>
              </div>
            </article>

            <article className="ct-main-card">
              <span
                className="ct-main-icon"
                style={{ background: "#25D366" }}
                aria-hidden
              >
                <MessageCircle size={18} />
              </span>
              <h2>WhatsApp</h2>
              <p>
                Para dúvidas iniciais e orientações rápidas sobre o atendimento,
                o WhatsApp pode funcionar como canal de apoio ao agendamento.
              </p>
              <div className="ct-main-actions">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ background: "#25D366", border: "none", boxShadow: "0 4px 16px rgba(37,211,102,0.32)" }}
                >
                  Falar no WhatsApp
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* Blocos informativos: telefone, endereço e horário */}
        <section className="section-pad ct-info">
          <div className="container-site ct-info-grid">
            <article className="ct-info-card">
              <div className="ct-info-head">
                <span aria-hidden>
                  <Phone size={16} />
                </span>
                <h3>Telefones de contato</h3>
              </div>
              <p>
                <strong>{CLINIC_NAME}</strong>
              </p>
              <ul className="ct-phone-list">
                {PHONES.map((phone) => (
                  <li key={phone}>
                    <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: "0.7rem", fontSize: "0.84rem", color: "var(--color-neutral-400)" }}>
                Entre em contato para informações sobre atendimento e organização da agenda.
              </p>
            </article>

            <article className="ct-info-card">
              <div className="ct-info-head">
                <span aria-hidden>
                  <MapPin size={16} />
                </span>
                <h3>Endereço e localização</h3>
              </div>
              <p>
                <strong>{CLINIC_NAME}</strong>
              </p>
              <p style={{ marginTop: "0.35rem" }}>
                {ADDRESS}
                <br />
                {CITY}
              </p>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ct-address-link"
              >
                Abrir rota no mapa
                <ExternalLink size={13} />
              </a>
            </article>

            <article className="ct-info-card">
              <div className="ct-info-head">
                <span aria-hidden>
                  <Clock3 size={16} />
                </span>
                <h3>Horários de atendimento</h3>
              </div>
              <p>
                Consulte os horários disponíveis e escolha o melhor momento para
                organizar seu atendimento.
              </p>
              <p style={{ marginTop: "0.75rem", color: "var(--color-primary-dark)", fontWeight: 700 }}>
                {HOURS}
              </p>
            </article>
          </div>
        </section>

        {/* CTA final */}
        <section id="agendar-consulta" className="section-pad ct-final">
          <div className="container-site ct-final-inner">
            <p className="eyebrow" style={{ justifyContent: "center", color: "var(--color-accent)" }}>
              Conversão
            </p>
            <h2 style={{ color: "#fff", marginBottom: "1rem" }}>
              Atendimento com mais praticidade
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
              A proposta do novo site é facilitar o caminho entre a busca do
              paciente e o agendamento da consulta, com canais claros,
              orientação objetiva e acesso rápido às principais informações.
            </p>

            <div className="ct-final-actions">
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

            <p className="ct-note">
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
