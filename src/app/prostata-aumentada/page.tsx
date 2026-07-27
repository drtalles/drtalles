import type { Metadata } from "next";
import { CheckCircle2, Droplets, Moon, Timer, Waves, Gauge, CircleAlert } from "lucide-react";
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

const PATH = "/prostata-aumentada";
const ORIGEM = "lp_hpb";

export const metadata: Metadata = {
  title: "Próstata Aumentada (HPB) e Dificuldade para Urinar em Campina Grande | Dr. Talles Leandro",
  description:
    "Jato urinário fraco, vontade de urinar toda hora ou sensação de bexiga cheia? Entenda a HPB e agende uma avaliação urológica em Campina Grande com o Dr. Talles Leandro.",
  keywords: [
    "HPB",
    "hiperplasia prostática benigna",
    "próstata aumentada",
    "dificuldade para urinar",
    "jato urinário fraco",
    "vontade de urinar toda hora",
    "levantar à noite para urinar",
    "tratamento para próstata aumentada",
    "cirurgia da próstata",
    "RTU de próstata",
    "prostatectomia transvesical",
    "urologista para próstata",
    "urologista em Campina Grande",
  ],
  alternates: { canonical: `${LP_BASE_URL}${PATH}` },
  openGraph: {
    type: "website",
    url: `${LP_BASE_URL}${PATH}`,
    title: "Próstata Aumentada (HPB) e Dificuldade para Urinar em Campina Grande | Dr. Talles Leandro",
    description:
      "Entenda a HPB (próstata aumentada), seus sintomas e as possibilidades de tratamento. Avaliação urológica em Campina Grande com o Dr. Talles Leandro.",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Próstata Aumentada (HPB) — Dr. Talles Leandro",
      },
    ],
  },
};

const SINTOMAS = [
  { icon: Gauge, text: "Jato urinário fraco ou interrompido" },
  { icon: Timer, text: "Dificuldade ou demora para começar a urinar" },
  { icon: Waves, text: "Necessidade de fazer força" },
  { icon: Droplets, text: "Sensação de que a bexiga não esvaziou completamente" },
  { icon: CheckCircle2, text: "Vontade de urinar várias vezes ao longo do dia" },
  { icon: Moon, text: "Necessidade frequente de levantar à noite para urinar" },
];

const FAQ: LpFaqItem[] = [
  {
    question: "Próstata aumentada é câncer?",
    answer:
      "Não. A Hiperplasia Prostática Benigna é uma condição benigna, diferente do câncer de próstata. Ainda assim, sintomas urinários podem estar relacionados a outras condições, por isso a avaliação médica é importante.",
  },
  {
    question: "Jato urinário fraco é sempre causado pela próstata?",
    answer:
      "Não necessariamente. Alterações no fluxo urinário podem ter diferentes causas. A avaliação urológica ajuda a identificar a origem dos sintomas.",
  },
  {
    question: "Sintomas leves também merecem avaliação?",
    answer:
      "Sim. Mesmo sintomas leves podem indicar o início de uma alteração que vale a pena acompanhar. A avaliação ajuda a entender se é necessário apenas observar ou já iniciar algum tratamento.",
  },
  {
    question: "Todo homem com próstata aumentada precisa operar?",
    answer:
      "Não. A cirurgia é considerada apenas em situações específicas — como sintomas importantes, obstrução urinária, complicações ou falta de resposta a outros tratamentos. Na maioria dos casos, o acompanhamento clínico ou o tratamento medicamentoso já é suficiente. A decisão sempre depende da avaliação individual.",
  },
];

const jsonLdCondition = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  name: "Hiperplasia Prostática Benigna (HPB)",
  alternateName: "Próstata aumentada",
  description:
    "Aumento benigno da próstata que pode dificultar a passagem da urina e provocar sintomas como jato urinário fraco, urgência e aumento da frequência urinária.",
  possibleTreatment: [
    { "@type": "MedicalTherapy", name: "Acompanhamento clínico e tratamento medicamentoso" },
    { "@type": "MedicalProcedure", name: "Ressecção Transuretral da Próstata (RTU de próstata)" },
    { "@type": "MedicalProcedure", name: "Prostatectomia Transvesical" },
  ],
};

export default function ProstataAumentadaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(FAQ)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd("Próstata Aumentada (HPB)", PATH)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCondition) }}
      />

      <Header />
      <main className="lp-page">
        <style>{LP_STYLES}</style>

        <LpHero
          kicker="Urologia · Campina Grande"
          title="Dificuldade para Urinar ou Jato Urinário Mais Fraco? Entenda a HPB (Próstata Aumentada)"
          subtitle="O aumento benigno da próstata (HPB) pode interferir no fluxo urinário e afetar a rotina, o sono e o dia a dia. Uma avaliação urológica ajuda a identificar a causa dos sintomas e a definir o tratamento mais adequado para o seu caso."
          complement="Atendimento em Urologia com o Dr. Talles Leandro, em Campina Grande."
          origem={ORIGEM}
        />

        {/* Seção 1 — Reconhecimento dos sintomas (texto + lista) */}
        <section className="section-pad">
          <div className="container-site lp-split">
            <div>
              <p className="eyebrow">Reconheça os sinais</p>
              <h2 className="lp-h2">Sua rotina mudou na hora de urinar?</h2>
              <p className="lp-text">
                Alguns sinais começam aos poucos e acabam sendo confundidos com
                &ldquo;coisa da idade&rdquo;. Mas alterações urinárias frequentes merecem
                atenção.
              </p>
              <p className="lp-text">
                Esses sintomas podem ter diferentes causas. A avaliação urológica é
                o caminho para entender o que está acontecendo e, se necessário,
                começar um tratamento.
              </p>
            </div>
            <div className="lp-split-media">
              <div className="lp-check-list">
                {SINTOMAS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="lp-check-item">
                      <span className="lp-check-icon" aria-hidden>
                        <Icon size={15} />
                      </span>
                      {item.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Seção 2 — O que é a HPB (imagem + texto) */}
        <section className="section-pad lp-alt">
          <div className="container-site lp-split lp-split--media-first">
            <div>
              <p className="eyebrow">Entenda a condição</p>
              <h2 className="lp-h2">O que é a Hiperplasia Prostática Benigna?</h2>
              <p className="lp-text">
                A Hiperplasia Prostática Benigna, ou HPB, é o aumento benigno da
                próstata. Como a próstata fica localizada bem próxima à uretra, esse
                crescimento pode dificultar a passagem da urina e provocar os
                sintomas listados acima.
              </p>
              <div className="lp-soft-highlight" style={{ marginTop: "1.2rem" }}>
                <p className="lp-text" style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start" }}>
                  <CircleAlert size={20} style={{ color: "var(--color-accent-dark)", flexShrink: 0, marginTop: "0.2rem" }} aria-hidden />
                  <span>
                    <strong>HPB não é câncer de próstata</strong> — são condições
                    diferentes. Ainda assim, qualquer alteração ao urinar precisa ser
                    investigada, para que a causa seja corretamente identificada.
                  </span>
                </p>
              </div>
            </div>
            <LpImage
              src="/img/prostata.jpg"
              alt="Ilustração da próstata aumentada comprimindo a uretra, característica da Hiperplasia Prostática Benigna"
              ratio="4 / 3.4"
            />
          </div>
        </section>

        {/* Seções 3 e 4 — Cirurgia: quando e quais possibilidades */}
        <section className="section-pad">
          <div className="container-site">
            <div className="lp-lead">
              <p className="eyebrow">Nem todo caso é cirúrgico</p>
              <h2 className="lp-h2">Todo paciente com HPB precisa de cirurgia?</h2>
              <p className="lp-text">
                Não. A escolha do tratamento depende de fatores como a intensidade
                dos sintomas, as características da próstata, o impacto na qualidade
                de vida, os resultados dos exames e a resposta a tratamentos
                anteriores. Em muitos casos, o acompanhamento clínico ou o
                tratamento com medicamentos já é suficiente.
              </p>
              <p className="lp-text">
                Quando existe obstrução urinária importante, sintomas persistentes
                ou outras situações identificadas na avaliação, o tratamento
                cirúrgico pode ser considerado — sempre como parte de uma decisão
                conversada entre médico e paciente. A técnica é escolhida de acordo
                com as características de cada paciente:
              </p>
            </div>
            <div className="lp-card-grid">
              <article className="lp-card">
                <h3>Ressecção Transuretral da Próstata (RTU de próstata)</h3>
                <p>
                  Procedimento realizado através da uretra, sem necessidade de
                  incisão externa. Remove parte do tecido prostático responsável
                  pela obstrução, facilitando a passagem da urina.
                </p>
              </article>
              <article className="lp-card">
                <h3>Prostatectomia Transvesical</h3>
                <p>
                  Indicada em situações selecionadas para a retirada do tecido
                  prostático responsável pela obstrução. A escolha depende, entre
                  outros fatores, do tamanho e das características da próstata.
                </p>
              </article>
            </div>
            <p className="lp-card-note">
              Nenhuma técnica é &ldquo;melhor&rdquo; de forma isolada — a indicação certa é a
              que se adequa às características do seu caso.
            </p>
          </div>
        </section>

        {/* Seção 5 — Como se chega à decisão (faixa escura) */}
        <LpBand eyebrow="Decisão individualizada" title="Qual é o melhor tratamento para o seu caso?">
          <p>
            Não existe uma única resposta para todos os pacientes. A decisão
            considera os sintomas apresentados, há quanto tempo eles acontecem, o
            impacto na rotina e no sono, o tamanho e as características da
            próstata, os resultados dos exames, tratamentos já realizados e as
            condições gerais de saúde.
          </p>
          <p>
            O objetivo da consulta é entender a causa da dificuldade urinária e, a
            partir disso, montar a estratégia mais adequada para você.
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <LpWaCta origem={`${ORIGEM}_meio`} variant="outline-white" />
          </div>
        </LpBand>

        <LpAboutDoctor
          title="Atendimento em Urologia em Campina Grande"
          text="Dr. Talles Leandro é urologista e realiza avaliação individualizada para investigação e tratamento de alterações da próstata e do sistema urinário. Durante a consulta, o histórico do paciente, os sintomas relatados e os exames disponíveis são avaliados em conjunto, para que os próximos passos sejam definidos de forma clara."
          origem={ORIGEM}
        />

        <LpFaqSection faq={FAQ} />

        <LpFinalCta
          title="Você não precisa se acostumar a viver com dificuldade para urinar"
          text="Se o jato urinário ficou mais fraco, se você precisa fazer força para urinar ou sente que a bexiga não esvazia por completo, vale a pena buscar uma avaliação. Entender a causa é o primeiro passo para definir o tratamento adequado."
          origem={ORIGEM}
        />
      </main>
      <Footer />
      <LpStickyWhatsApp origem={ORIGEM} />
    </>
  );
}
