import type { Metadata } from "next";
import { Activity, HeartHandshake, Stethoscope } from "lucide-react";
import {
  LP_BASE_URL,
  LP_STYLES,
  LpAboutDoctor,
  LpBand,
  LpFaqSection,
  LpFinalCta,
  LpHero,
  LpImage,
  LpStickyWhatsApp,
  LpWaCta,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  type LpFaqItem,
} from "@/components/landing/lp-shared";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PATH = "/vasectomia";
const ORIGEM = "lp_vasectomia";

export const metadata: Metadata = {
  title: "Vasectomia em Campina Grande | Dr. Talles Leandro — Urologista",
  description:
    "Pensando em fazer vasectomia em Campina Grande? Entenda como funciona o procedimento, tire suas dúvidas e agende uma avaliação com o Dr. Talles Leandro.",
  keywords: [
    "vasectomia",
    "vasectomia em Campina Grande",
    "urologista para vasectomia",
    "cirurgia de vasectomia",
    "como funciona a vasectomia",
    "vasectomia dói",
    "recuperação da vasectomia",
    "vasectomia causa impotência",
    "requisitos para fazer vasectomia",
    "urologista em Campina Grande",
  ],
  alternates: { canonical: `${LP_BASE_URL}${PATH}` },
  openGraph: {
    type: "website",
    url: `${LP_BASE_URL}${PATH}`,
    title: "Vasectomia em Campina Grande | Dr. Talles Leandro — Urologista",
    description:
      "Entenda como funciona a vasectomia, o que muda (e o que não muda) após o procedimento, e agende uma avaliação com o Dr. Talles Leandro em Campina Grande.",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vasectomia — Dr. Talles Leandro",
      },
    ],
  },
};

const FAQ: LpFaqItem[] = [
  {
    question: "Vasectomia dói? É preciso anestesia geral?",
    answer:
      "A vasectomia costuma ser realizada com anestesia local, em procedimento ambulatorial. O nível de desconforto varia de pessoa para pessoa, e o urologista pode explicar em detalhes o que esperar durante a consulta de avaliação.",
  },
  {
    question: "Quanto tempo de repouso é necessário depois da cirurgia?",
    answer:
      "A recuperação costuma ser rápida, mas o tempo de repouso e o retorno às atividades físicas e ao trabalho variam de pessoa para pessoa e devem ser orientados individualmente pelo urologista.",
  },
  {
    question: "Quais cuidados são necessários depois do procedimento?",
    answer:
      "Os cuidados costumam incluir repouso relativo por alguns dias e atenção a sinais como dor intensa, inchaço importante ou febre. As orientações completas — incluindo uso de suporte, se indicado, e quando retomar cada atividade — são dadas pelo urologista antes da alta.",
  },
  {
    question: "A vasectomia funciona imediatamente?",
    answer:
      "Não. É necessário manter outro método contraceptivo até a confirmação médica, feita por exame de sêmen no período orientado pelo urologista.",
  },
  {
    question: "É possível reverter uma vasectomia?",
    answer:
      "Existem procedimentos de reversão, mas o resultado não é garantido. Por isso, a vasectomia deve ser encarada como um método permanente de contracepção.",
  },
  {
    question: "Preciso da autorização da minha esposa ou companheira?",
    answer:
      "Não. A legislação brasileira atual não exige o consentimento do cônjuge ou companheira para a realização da vasectomia.",
  },
  {
    question: "Existem critérios legais para fazer vasectomia?",
    answer:
      "Sim. Esses critérios são explicados e confirmados durante a consulta de avaliação com o urologista.",
  },
];

const jsonLdProcedure = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "Vasectomia",
  procedureType: "https://schema.org/SurgicalProcedure",
  description:
    "Procedimento cirúrgico de contracepção permanente masculina, em que os ductos deferentes são interrompidos, impedindo que os espermatozoides façam parte do líquido ejaculado.",
  bodyLocation: "Sistema reprodutor masculino",
  preparation: "Consulta de avaliação com urologista, conforme requisitos previstos na legislação vigente.",
  howPerformed:
    "De forma geral, procedimento ambulatorial realizado com anestesia local, sem necessidade de internação.",
  followup:
    "Manter outro método contraceptivo até a confirmação médica por exame de sêmen, no período orientado pelo urologista.",
  performer: {
    "@type": "Physician",
    name: "Dr. Talles Leandro",
    identifier: "CRM-PB 5970",
  },
};

export default function VasectomiaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(FAQ)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd("Vasectomia", PATH)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProcedure) }}
      />

      <Header />
      <main className="lp-page">
        <style>{LP_STYLES}</style>

        <LpHero
          kicker="Urologia · Planejamento familiar"
          title="Pensando em Fazer Vasectomia? Tire Suas Dúvidas e Agende uma Avaliação"
          subtitle="Entenda como funciona o procedimento, esclareça suas principais dúvidas e saiba se ele é uma opção adequada para o seu planejamento familiar."
          complement="Urologista em Campina Grande."
          origem={ORIGEM}
        />

        {/* Seção 1 — O que é (texto + imagem) */}
        <section className="section-pad">
          <div className="container-site lp-split">
            <div>
              <p className="eyebrow">Entenda o procedimento</p>
              <h2 className="lp-h2">O que é a vasectomia?</h2>
              <p className="lp-text">
                A vasectomia é um procedimento cirúrgico de contracepção
                permanente. Durante o procedimento, os canais responsáveis por
                transportar os espermatozoides (ductos deferentes) são
                interrompidos, impedindo que eles passem a fazer parte do líquido
                ejaculado.
              </p>
              <p className="lp-text">
                O homem continua produzindo hormônios normalmente e continua
                ejaculando após o procedimento.
              </p>
            </div>
            <LpImage
              src="/img/vas.jpg"
              alt="Ilustração explicativa da vasectomia, procedimento de contracepção permanente masculina"
              ratio="4 / 3.4"
            />
          </div>
        </section>

        {/* Seção 2 — O que muda e o que não muda */}
        <section className="section-pad lp-alt">
          <div className="container-site">
            <div className="lp-lead">
              <p className="eyebrow">Vida sexual e fertilidade</p>
              <h2 className="lp-h2">O que muda — e o que não muda — depois da vasectomia?</h2>
            </div>
            <div className="lp-card-grid">
              <article className="lp-card">
                <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <HeartHandshake size={18} style={{ color: "var(--color-accent-dark)" }} aria-hidden />
                  O que não muda
                </h3>
                <p>
                  A vasectomia não interfere na produção de testosterona, no
                  desejo sexual, na capacidade de ereção nem no orgasmo. O homem
                  continua tendo ereções, orgasmos e ejaculação normalmente.
                </p>
              </article>
              <article className="lp-card">
                <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Activity size={18} style={{ color: "var(--color-accent-dark)" }} aria-hidden />
                  O que muda
                </h3>
                <p>
                  A mudança acontece na fertilidade: os espermatozoides deixam de
                  fazer parte do líquido ejaculado. Esse efeito não é imediato —
                  por isso, é necessário continuar usando outro método
                  contraceptivo até a confirmação médica, feita por exame de sêmen
                  no período orientado pelo urologista.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Seção 3 — Caráter permanente (faixa escura) */}
        <LpBand eyebrow="Decisão consciente" title="A vasectomia deve ser considerada uma decisão permanente">
          <p>
            Existem técnicas de reversão, mas isso não significa que a fertilidade
            será necessariamente recuperada — os resultados variam e não são
            garantidos. Por esse motivo, a decisão de fazer uma vasectomia deve
            ser tomada com segurança, entendendo o caráter permanente do
            procedimento.
          </p>
        </LpBand>

        {/* Seção 4 — Como funciona, na prática (imagem + texto) */}
        <section className="section-pad lp-alt">
          <div className="container-site lp-split lp-split--media-first">
            <div>
              <p className="eyebrow">Passo a passo</p>
              <h2 className="lp-h2">Como funciona, na prática, até a realização da vasectomia?</h2>
              <p className="lp-text">
                A realização da vasectomia segue os requisitos e etapas previstos
                na legislação vigente, que são explicados durante a avaliação com o
                urologista.
              </p>
              <p className="lp-text">
                O primeiro passo é uma consulta, na qual é possível conversar sobre
                a decisão e as expectativas, esclarecer dúvidas sobre o
                procedimento, avaliar o histórico de saúde, e receber orientações
                sobre preparo, anestesia e recuperação.
              </p>
              <div className="lp-soft-highlight" style={{ marginTop: "1.2rem" }}>
                <p className="lp-text" style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start" }}>
                  <Stethoscope size={20} style={{ color: "var(--color-accent-dark)", flexShrink: 0, marginTop: "0.2rem" }} aria-hidden />
                  <span>
                    De forma geral, a vasectomia é um procedimento ambulatorial,
                    realizado com anestesia local, sem necessidade de internação —
                    mas os detalhes do preparo e da recuperação devem ser sempre
                    confirmados diretamente com o urologista, já que podem variar de
                    caso para caso.
                  </span>
                </p>
              </div>
              <div style={{ marginTop: "1.5rem" }}>
                <LpWaCta origem={`${ORIGEM}_meio`} />
              </div>
            </div>
            <LpImage
              src="/img/vas2.jpg"
              alt="Consulta de avaliação com o urologista Dr. Talles Leandro antes da vasectomia"
              ratio="4 / 4.4"
            />
          </div>
        </section>

        <LpAboutDoctor
          title="Atendimento em Urologia em Campina Grande"
          text="Dr. Talles Leandro realiza avaliação individualizada para homens que desejam esclarecer dúvidas e considerar a vasectomia como opção de planejamento familiar. Durante a consulta, o procedimento, seus efeitos e as etapas necessárias são explicados com clareza, para uma decisão consciente e segura."
          origem={ORIGEM}
        />

        <LpFaqSection faq={FAQ} />

        <LpFinalCta
          title="Está considerando fazer uma vasectomia?"
          text="Informação e avaliação médica são importantes para tomar essa decisão com segurança. Converse com o Dr. Talles Leandro, esclareça suas dúvidas e entenda as etapas necessárias para a realização do procedimento."
          origem={ORIGEM}
        />
      </main>
      <Footer />
      <LpStickyWhatsApp origem={ORIGEM} />
    </>
  );
}
