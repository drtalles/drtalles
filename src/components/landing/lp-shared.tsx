import Image from "next/image";
import type { ReactNode } from "react";
import { ImagePlus, MessageCircle } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";

/**
 * Base compartilhada das landing pages de tráfego pago (HPB, Vasectomia,
 * Cálculos Renais, Câncer de Próstata). Uma única arquitetura visual,
 * com variações de ênfase por página — ver docs/landing-pages-dr-talles-v2.md.
 *
 * O WhatsApp das LPs usa o número definido no documento de campanha
 * (wa.me/5583988287705), independente do botão flutuante do site.
 */

export const LP_WA_URL = "https://wa.me/5583988287705";
export const LP_WA_DISPLAY = "(83) 98828-7705";
export const LP_CRM_LABEL = "CRM-PB 5970 · RQE Nº: 3821";
export const LP_BASE_URL = "https://www.drtallesleandrourologista.com.br";

export type LpFaqItem = { question: string; answer: string };

export function buildFaqJsonLd(faq: LpFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function buildBreadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: LP_BASE_URL },
      { "@type": "ListItem", position: 2, name, item: `${LP_BASE_URL}${path}` },
    ],
  };
}

/** CTA de WhatsApp com evento GA4. Variante "accent" (principal) ou "ghost" (secundária). */
export function LpWaCta({
  origem,
  label = "Agendar consulta pelo WhatsApp",
  variant = "accent",
  large = false,
}: {
  origem: string;
  label?: string;
  variant?: "accent" | "ghost" | "outline-white";
  large?: boolean;
}) {
  const className =
    variant === "accent"
      ? "btn btn-accent"
      : variant === "outline-white"
        ? "btn btn-outline-white"
        : "btn btn-outline";
  return (
    <TrackedLink
      event="clique_whatsapp"
      origem={origem}
      href={LP_WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={large ? { fontSize: "1rem", padding: "0.98rem 1.95rem" } : undefined}
    >
      <MessageCircle size={large ? 18 : 16} />
      {label}
    </TrackedLink>
  );
}

/** Hero escuro no padrão das páginas internas, com CTA principal. */
export function LpHero({
  kicker,
  title,
  subtitle,
  complement,
  origem,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  complement: string;
  origem: string;
}) {
  return (
    <section className="internal-hero lp-hero" data-header-theme="dark">
      <div className="internal-hero-glow" aria-hidden />
      <div className="internal-hero-lines" aria-hidden />
      <div className="container-site">
        <div className="internal-hero-inner lp-hero-inner">
          <p className="internal-hero-kicker">{kicker}</p>
          <h1 className="internal-hero-title">{title}</h1>
          <p className="internal-hero-description">{subtitle}</p>
          <div className="lp-hero-actions">
            <LpWaCta origem={`${origem}_hero`} large />
          </div>
          <p className="lp-hero-complement">{complement}</p>
        </div>
      </div>
    </section>
  );
}

/**
 * Espaço reservado para imagem/ilustração — o cliente substitui depois.
 * `label` descreve a imagem sugerida para o espaço.
 */
export function LpImageSlot({ label, ratio = "4 / 3" }: { label: string; ratio?: string }) {
  return (
    <div className="lp-split-media">
      <div className="lp-media-slot" style={{ aspectRatio: ratio }}>
        <ImagePlus size={26} aria-hidden />
        <span className="lp-media-slot-title">Espaço para imagem</span>
        <span className="lp-media-slot-label">{label}</span>
      </div>
    </div>
  );
}

/**
 * Imagem final de um bloco em duas colunas, no mesmo enquadramento do espaço
 * reservado (`LpImageSlot`). `ratio` mantém o recorte estável entre as LPs.
 */
export function LpImage({
  src,
  alt,
  ratio = "4 / 3",
  priority = false,
}: {
  src: string;
  alt: string;
  ratio?: string;
  priority?: boolean;
}) {
  return (
    <div className="lp-split-media">
      <div className="lp-media-figure" style={{ aspectRatio: ratio }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 900px) 100vw, 400px"
          priority={priority}
        />
      </div>
    </div>
  );
}

/** Faixa escura de destaque, no padrão dos blocos institucionais do site. */
export function LpBand({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="section-pad lp-band" data-header-theme="dark">
      <div className="container-site">
        <div className="lp-band-card">
          <p className="eyebrow" style={{ color: "var(--color-accent)" }}>
            {eyebrow}
          </p>
          <h2 style={{ color: "#fff", marginBottom: "0.9rem" }}>{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}

/** Bloco "Sobre o Dr. Talles" com foto, credenciais e CTA. */
export function LpAboutDoctor({
  title,
  text,
  origem,
}: {
  title: string;
  text: string;
  origem: string;
}) {
  return (
    <section className="section-pad lp-about">
      <div className="container-site lp-about-grid">
        <div className="lp-about-photo">
          <Image
            src="/img/dr-talles-5.jpg"
            alt="Dr. Talles Leandro, médico urologista em Campina Grande"
            width={420}
            height={530}
          />
        </div>
        <div>
          <p className="eyebrow">Sobre o Dr. Talles</p>
          <h2 className="lp-h2">{title}</h2>
          <p className="lp-text">{text}</p>
          <p className="lp-credentials">
            Dr. Talles Leandro — médico urologista — {LP_CRM_LABEL}
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <LpWaCta origem={`${origem}_sobre`} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** FAQ em <details>, no mesmo padrão visual do restante do site. */
export function LpFaqSection({ faq }: { faq: LpFaqItem[] }) {
  return (
    <section className="section-pad lp-faq">
      <div className="container-site">
        <div className="lp-center-head">
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            Dúvidas comuns
          </p>
          <h2>Perguntas frequentes</h2>
        </div>
        <div className="lp-faq-list">
          {faq.map((item) => (
            <details key={item.question} className="lp-faq-item">
              <summary className="lp-faq-summary">{item.question}</summary>
              <div className="lp-faq-answer">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** CTA final escuro, com o número por extenso (reservado a este bloco e ao rodapé). */
export function LpFinalCta({
  title,
  text,
  origem,
}: {
  title: string;
  text: string;
  origem: string;
}) {
  return (
    <section className="section-pad lp-final" data-header-theme="dark">
      <div className="container-site lp-final-inner">
        <p className="eyebrow" style={{ justifyContent: "center", color: "var(--color-accent)" }}>
          Agendamento
        </p>
        <h2 style={{ color: "#fff", marginBottom: "1rem" }}>{title}</h2>
        <p className="lp-final-text">{text}</p>
        <div className="lp-final-actions">
          <LpWaCta origem={`${origem}_final`} large />
        </div>
        <p className="lp-final-phone">
          WhatsApp: <strong>{LP_WA_DISPLAY}</strong>
        </p>
        <p className="lp-note">{LP_CRM_LABEL}</p>
      </div>
    </section>
  );
}

/** Barra fixa de WhatsApp no mobile, visível durante toda a rolagem. */
export function LpStickyWhatsApp({ origem }: { origem: string }) {
  return (
    <div className="lp-sticky" aria-hidden={false}>
      <TrackedLink
        event="clique_whatsapp"
        origem={`${origem}_sticky`}
        href={LP_WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="lp-sticky-btn"
      >
        <MessageCircle size={18} />
        Agendar consulta pelo WhatsApp
      </TrackedLink>
    </div>
  );
}

/** Estilos compartilhados das LPs — renderizar uma vez por página, dentro de <main>. */
export const LP_STYLES = `
  /* Ritmo vertical mais compacto que o institucional */
  .lp-page .section-pad { padding-block: clamp(2.5rem, 4.2vw, 3.7rem); }

  /* Hero: título menor e mais largo que o padrão institucional (H1 longos) */
  .lp-hero {
    padding-top: calc(76px + clamp(2.2rem, 4vw, 3.4rem));
    padding-bottom: clamp(2.1rem, 4vw, 3.2rem);
  }

  .lp-hero-inner { max-width: 100%; }

  .lp-hero .internal-hero-title {
    font-size: clamp(1.8rem, 3.4vw, 2.8rem);
    line-height: 1.18;
    letter-spacing: -0.01em;
    max-width: 46ch;
    text-wrap: balance;
  }

  .lp-hero .internal-hero-description {
    margin-top: 1.1rem;
    max-width: 82ch;
  }

  /* Seções em duas colunas (texto + mídia) */
  .lp-split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 400px);
    gap: clamp(1.6rem, 4vw, 3rem);
    align-items: center;
  }

  .lp-split--media-first { grid-template-columns: minmax(0, 400px) minmax(0, 1fr); }

  .lp-split--media-first .lp-split-media { order: -1; }

  .lp-split-media { min-width: 0; }

  .lp-split-media img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 1.1rem;
  }

  /* Imagem final do bloco em duas colunas */
  .lp-media-figure {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 1.1rem;
    background: linear-gradient(155deg, rgba(27,77,110,0.06), rgba(46,196,182,0.09));
    box-shadow: 0 18px 40px -26px rgba(11,42,64,0.55);
  }

  .lp-split-media .lp-media-figure img {
    height: 100%;
    border-radius: 0;
    object-fit: cover;
    object-position: center;
  }

  /* Espaço reservado para imagem (substituir pelo asset final) */
  .lp-media-slot {
    width: 100%;
    border-radius: 1.1rem;
    border: 1.5px dashed rgba(27,77,110,0.32);
    background: linear-gradient(155deg, rgba(27,77,110,0.06), rgba(46,196,182,0.09));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 1.4rem;
    text-align: center;
    color: var(--color-primary);
  }

  .lp-media-slot-title {
    font-weight: 700;
    font-size: 0.88rem;
    color: var(--color-primary-dark);
    font-family: var(--font-body);
  }

  .lp-media-slot-label {
    font-size: 0.79rem;
    color: var(--color-neutral-700);
    max-width: 32ch;
    line-height: 1.5;
  }

  /* Faixa escura de destaque */
  .lp-band {
    background: linear-gradient(135deg, var(--color-primary-dark) 0%, #163e5a 56%, var(--color-primary) 100%);
    position: relative;
    overflow: hidden;
  }

  .lp-band::before {
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

  .lp-band-card {
    position: relative;
    z-index: 1;
    max-width: 900px;
    margin-inline: auto;
    border-radius: 1.2rem;
    border: 1px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
    padding: clamp(1.5rem, 3vw, 2.2rem);
  }

  .lp-band-card p {
    margin: 0;
    color: rgba(255,255,255,0.82);
    line-height: 1.8;
  }

  .lp-band-card p + p { margin-top: 0.9rem; }

  /* Lista compacta (coluna de mídia) */
  .lp-check-list {
    display: grid;
    gap: 0.65rem;
  }

  .lp-hero-actions {
    margin-top: 1.9rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.9rem;
  }

  .lp-hero-complement {
    margin-top: 1.05rem;
    font-size: 0.86rem;
    color: rgba(255,255,255,0.62);
    letter-spacing: 0.02em;
  }

  .lp-h2 {
    color: var(--color-primary-dark);
    margin-bottom: 1rem;
  }

  .lp-text {
    color: var(--color-neutral-700);
    line-height: 1.82;
    max-width: 72ch;
  }

  .lp-text + .lp-text { margin-top: 0.9rem; }

  /* Seções de largura total: o texto ocupa a largura toda do container */
  .lp-lead { max-width: none; }

  .lp-lead .lp-text { max-width: none; }

  .lp-center-head {
    text-align: center;
    max-width: 740px;
    margin-inline: auto;
    margin-bottom: 1.7rem;
  }

  .lp-alt { background: var(--color-neutral-50); }

  /* Lista de sintomas / checagem */
  .lp-check-grid {
    margin-top: 1.6rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .lp-check-item {
    display: flex;
    align-items: flex-start;
    gap: 0.7rem;
    border-radius: 0.85rem;
    border: 1px solid var(--color-neutral-200);
    background: #fff;
    padding: 0.95rem 1.05rem;
    font-size: 0.92rem;
    line-height: 1.55;
    color: var(--color-neutral-700);
  }

  .lp-check-icon {
    width: 1.55rem;
    height: 1.55rem;
    border-radius: 0.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color-accent-dark);
    background: rgba(46,196,182,0.14);
    border: 1px solid rgba(46,196,182,0.32);
    flex-shrink: 0;
    margin-top: 0.05rem;
  }

  /* Cartões (procedimentos, pares de seção) */
  .lp-card-grid {
    margin-top: 1.6rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .lp-card {
    border-radius: 1rem;
    border: 1px solid var(--color-neutral-200);
    background: #fff;
    padding: 1.4rem 1.35rem;
    box-shadow: 0 8px 26px rgba(27,77,110,0.06);
  }

  .lp-card h3 {
    margin: 0 0 0.55rem;
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-primary-dark);
    line-height: 1.4;
  }

  .lp-card p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--color-neutral-700);
  }

  .lp-card-note {
    margin-top: 1.1rem;
    font-size: 0.88rem;
    color: var(--color-neutral-700);
    line-height: 1.7;
    font-style: italic;
  }

  /* Destaque suave (faixa com fundo accent claro) */
  .lp-soft-highlight {
    border-radius: 1.1rem;
    border: 1px solid rgba(46,196,182,0.3);
    background: var(--color-accent-light);
    padding: clamp(1.3rem, 2.6vw, 1.8rem);
  }

  /* Bloco de urgência (LP3) */
  .lp-urgency {
    border-radius: 1.1rem;
    border: 1px solid rgba(214,138,32,0.38);
    background: #FDF6EA;
    padding: clamp(1.35rem, 2.8vw, 1.9rem);
    display: grid;
    gap: 0.85rem;
  }

  .lp-urgency-head {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    color: #8a5a10;
    font-weight: 700;
    font-family: var(--font-body);
    font-size: 1.06rem;
  }

  .lp-urgency p {
    margin: 0;
    color: var(--color-neutral-700);
    line-height: 1.75;
    font-size: 0.94rem;
  }

  /* Sobre o Dr. Talles */
  .lp-about-grid {
    display: grid;
    grid-template-columns: minmax(0, 340px) minmax(0, 1fr);
    gap: clamp(1.4rem, 4vw, 3rem);
    align-items: center;
  }

  .lp-about-grid .lp-text { max-width: none; }

  .lp-about-photo {
    border-radius: 1.2rem;
    overflow: hidden;
    border: 1px solid rgba(27,77,110,0.16);
    background: linear-gradient(155deg, rgba(27,77,110,0.13), rgba(46,196,182,0.11));
  }

  .lp-about-photo img { display: block; width: 100%; height: auto; }

  .lp-credentials {
    margin-top: 1.1rem;
    font-size: 0.83rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--color-primary);
  }

  /* FAQ */
  .lp-faq { background: var(--color-neutral-50); }

  .lp-faq-list {
    max-width: 900px;
    margin: 0 auto;
    display: grid;
    gap: 0.75rem;
  }

  .lp-faq-item {
    border-radius: 0.95rem;
    border: 1px solid var(--color-neutral-200);
    background: #fff;
    overflow: hidden;
  }

  .lp-faq-summary {
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

  .lp-faq-summary::-webkit-details-marker { display: none; }

  .lp-faq-summary::after {
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

  .lp-faq-item[open] .lp-faq-summary::after { transform: rotate(45deg); }

  .lp-faq-answer {
    color: var(--color-neutral-700);
    line-height: 1.72;
    font-size: 0.9rem;
    padding: 0 1.1rem 1rem;
  }

  /* CTA final */
  .lp-final {
    background: linear-gradient(135deg, var(--color-primary-dark) 0%, #163e5a 50%, var(--color-primary) 100%);
    position: relative;
    overflow: hidden;
  }

  .lp-final::before {
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

  .lp-final-inner {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 760px;
    margin-inline: auto;
  }

  .lp-final-text {
    margin: 0;
    color: rgba(255,255,255,0.75);
    line-height: 1.82;
    max-width: 58ch;
    margin-inline: auto;
  }

  .lp-final-actions {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.95rem;
  }

  .lp-final-phone {
    margin-top: 1.4rem;
    font-size: 0.95rem;
    color: rgba(255,255,255,0.82);
  }

  .lp-final-phone strong { color: #fff; letter-spacing: 0.02em; }

  .lp-note {
    margin-top: 0.9rem;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.58);
    letter-spacing: 0.03em;
  }

  /* Barra fixa mobile */
  .lp-sticky {
    display: none;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 60;
    padding: 0.6rem 0.9rem calc(0.6rem + env(safe-area-inset-bottom));
    background: rgba(255,255,255,0.94);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-top: 1px solid var(--color-neutral-200);
    box-shadow: 0 -6px 24px rgba(15,45,66,0.12);
  }

  .lp-sticky-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    width: 100%;
    padding: 0.85rem 1rem;
    border-radius: 0.65rem;
    background: #25D366;
    color: #fff;
    font-weight: 700;
    font-size: 0.95rem;
    font-family: var(--font-body);
    text-decoration: none;
    box-shadow: 0 4px 18px rgba(37,211,102,0.4);
  }

  @media (max-width: 860px) {
    .lp-check-grid,
    .lp-card-grid,
    .lp-about-grid,
    .lp-split,
    .lp-split--media-first {
      grid-template-columns: 1fr;
    }

    .lp-split--media-first .lp-split-media { order: 0; }

    .lp-sticky { display: block; }

    /* Evita que a barra fixa cubra o rodapé da página */
    .lp-page { padding-bottom: 4.4rem; }
  }
`;
