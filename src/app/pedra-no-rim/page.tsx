import type { Metadata } from "next";
import { AlertTriangle, Droplet, Flame, MapPin, ScanLine, Thermometer } from "lucide-react";
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

const PATH = "/pedra-no-rim";
const ORIGEM = "lp_calculo_renal";

export const metadata: Metadata = {
  title: "Pedra no Rim, Cólica Renal e Cálculo Ureteral em Campina Grande | Dr. Talles",
  description:
    "Pedra no rim ou cólica renal? Entenda quando o cálculo urinário precisa de tratamento e agende uma avaliação urológica com o Dr. Talles Leandro em Campina Grande.",
  keywords: [
    "pedra no rim",
    "cólica renal",
    "cálculo renal",
    "cálculo ureteral",
    "pedra no ureter",
    "dor lombar pedra no rim",
    "tratamento para pedra no rim",
    "cirurgia para cálculo renal",
    "ureterorrenolitotripsia",
    "ureteroscopia",
    "urologista para pedra no rim",
    "urologista em Campina Grande",
  ],
  alternates: { canonical: `${LP_BASE_URL}${PATH}` },
  openGraph: {
    type: "website",
    url: `${LP_BASE_URL}${PATH}`,
    title: "Pedra no Rim, Cólica Renal e Cálculo Ureteral em Campina Grande | Dr. Talles",
    description:
      "Entenda a cólica renal, quando o cálculo urinário precisa de tratamento e as possibilidades de avaliação urológica em Campina Grande com o Dr. Talles Leandro.",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pedra no Rim e Cólica Renal — Dr. Talles Leandro",
      },
    ],
  },
};

const SINAIS = [
  { icon: Flame, text: "Dor intensa nas costas ou na lateral do abdômen" },
  { icon: MapPin, text: "Dor que pode se deslocar em direção à virilha" },
  { icon: Droplet, text: "Sangue na urina" },
  { icon: Thermometer, text: "Náuseas ou vômitos" },
  { icon: ScanLine, text: "Ardor ou alterações ao urinar" },
];

const FAQ: LpFaqItem[] = [
  {
    question: "Todo cálculo renal causa dor?",
    answer:
      "Não. Alguns cálculos podem permanecer sem sintomas. A dor — a cólica renal — costuma surgir principalmente quando a pedra se desloca ou dificulta a passagem da urina.",
  },
  {
    question: "Uma pedra pode sair naturalmente, ou todo cálculo precisa de procedimento?",
    answer:
      "Alguns cálculos, principalmente os menores, podem ser eliminados naturalmente, com acompanhamento do urologista. Quando isso não acontece — ou quando há obstrução, sintomas persistentes ou outras características desfavoráveis — um procedimento pode ser considerado.",
  },
  {
    question: "A ureterorrenolitotripsia precisa de corte?",
    answer:
      "Não. O acesso é feito por via endoscópica através do trato urinário, sem incisão externa para chegar ao cálculo.",
  },
  {
    question: "É preciso internar para fazer o procedimento?",
    answer:
      "Pode envolver um período curto de internação, dependendo da técnica e das características do caso. O urologista explica os detalhes antes da cirurgia.",
  },
  {
    question: "Pedra no rim pode voltar?",
    answer:
      "Sim. Algumas pessoas apresentam novos episódios ao longo da vida. Depois do tratamento, avaliar o histórico e as características do cálculo pode ajudar a orientar medidas de prevenção individualizadas.",
  },
  {
    question: "Beber mais água é suficiente para prevenir novos cálculos?",
    answer:
      "A hidratação é importante na prevenção de muitos casos, mas as orientações variam conforme o tipo de cálculo e as características de cada paciente. Quem tem cálculos recorrentes pode precisar de uma investigação mais específica.",
  },
];

const jsonLdCondition = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  name: "Cálculo renal e ureteral (litíase urinária)",
  alternateName: "Pedra no rim",
  description:
    "Formação de cálculos no rim ou no ureter, que podem causar cólica renal e dificultar a passagem da urina.",
  signOrSymptom: [
    { "@type": "MedicalSymptom", name: "Cólica renal" },
    { "@type": "MedicalSymptom", name: "Dor lombar intensa" },
    { "@type": "MedicalSymptom", name: "Sangue na urina" },
  ],
  possibleTreatment: [
    { "@type": "MedicalTherapy", name: "Acompanhamento clínico para eliminação espontânea" },
    { "@type": "MedicalProcedure", name: "Ureterorrenolitotripsia transureteroscópica" },
  ],
};

export default function PedraNoRimPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(FAQ)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd("Pedra no Rim e Cólica Renal", PATH)),
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
          title="Pedra no Rim ou no Ureter? Entenda a Cólica Renal e as Possibilidades de Tratamento"
          subtitle="Entenda quando o cálculo urinário pode precisar de tratamento e conheça as possibilidades de avaliação urológica em Campina Grande."
          complement="Urologista em Campina Grande."
          origem={ORIGEM}
        />

        {/* Seção 1 — Bloco de urgência, logo após o hero */}
        <section className="section-pad" style={{ paddingBlock: "clamp(2.4rem, 5vw, 3.6rem)" }}>
          <div className="container-site">
            <div className="lp-urgency" role="note">
              <p className="lp-urgency-head">
                <AlertTriangle size={20} aria-hidden />
                Está com dor forte agora?
              </p>
              <p>
                Se a dor vier acompanhada de febre, calafrios, dificuldade para
                urinar ou vômitos persistentes, procure atendimento de urgência
                (pronto-socorro) — esses sinais pedem avaliação imediata.
              </p>
              <p>
                Sem esses sinais, você pode agendar uma avaliação com o Dr. Talles
                Leandro para investigar a causa da dor e planejar o tratamento.
              </p>
              <div>
                <LpWaCta origem={`${ORIGEM}_urgencia`} label="Falar pelo WhatsApp" variant="ghost" />
              </div>
            </div>
          </div>
        </section>

        {/* Seção 2 — Como o cálculo se manifesta (texto + lista) */}
        <section className="section-pad lp-alt">
          <div className="container-site lp-split">
            <div>
              <p className="eyebrow">Sinais e sintomas</p>
              <h2 className="lp-h2">O cálculo urinário nem sempre se apresenta da mesma forma</h2>
              <p className="lp-text">
                Algumas pedras permanecem sem causar sintomas. Outras provocam dor
                intensa — a chamada cólica renal —, especialmente quando se
                deslocam ou dificultam a passagem da urina.
              </p>
              <p className="lp-text">
                A localização, o tamanho do cálculo e os sintomas apresentados
                ajudam a definir a melhor forma de conduzir cada caso.
              </p>
            </div>
            <div className="lp-split-media">
              <div className="lp-check-list">
                {SINAIS.map((item) => {
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

        {/* Seção 3 — Rim x ureter (imagem + texto) */}
        <section className="section-pad">
          <div className="container-site lp-split lp-split--media-first">
            <div>
              <p className="eyebrow">Entenda a diferença</p>
              <h2 className="lp-h2">Pedra no rim e pedra no ureter são a mesma coisa?</h2>
              <p className="lp-text">
                O cálculo pode se formar no rim e permanecer nessa região, ou se
                deslocar para o ureter — o canal que leva a urina do rim até a
                bexiga. Quando uma pedra entra no ureter, ela pode dificultar a
                passagem da urina e provocar a cólica renal. A localização do
                cálculo é um dos fatores considerados na escolha do tratamento.
              </p>
            </div>
            <LpImage
              src="/img/rin.jpg"
              alt="Ilustração do trajeto do cálculo renal do rim até a bexiga, passando pelo ureter"
              ratio="4 / 3.4"
            />
          </div>
        </section>

        {/* Seções 4 e 5 — Quando o tratamento é necessário */}
        <section className="section-pad lp-alt">
          <div className="container-site">
            <div className="lp-lead">
              <p className="eyebrow">Nem todo caso é cirúrgico</p>
              <h2 className="lp-h2">Todo cálculo precisa de cirurgia?</h2>
              <p className="lp-text">
                Não. Alguns cálculos pequenos podem ser eliminados naturalmente,
                com acompanhamento do urologista. Em outros casos, um procedimento
                pode ser considerado de acordo com o tamanho e localização da
                pedra, a intensidade e persistência dos sintomas, a presença de
                obstrução urinária e a possibilidade de eliminação espontânea.
              </p>
              <p className="lp-text">
                Quando o cálculo não é eliminado naturalmente, causa obstrução,
                provoca sintomas persistentes ou tem características que tornam
                pouco provável a eliminação espontânea, o urologista pode
                considerar diferentes formas de tratamento — entre elas, a
                ureterorrenolitotripsia transureteroscópica.
              </p>
            </div>
            <div className="lp-card-grid" style={{ gridTemplateColumns: "1fr", maxWidth: "820px" }}>
              <article className="lp-card">
                <h3>Como funciona a ureterorrenolitotripsia transureteroscópica?</h3>
                <p>
                  Apesar do nome longo, o princípio é relativamente simples: por
                  meio de um aparelho endoscópico chamado ureteroscópio, o
                  urologista acessa as vias urinárias pela uretra, sem necessidade
                  de incisão externa para chegar ao cálculo. O procedimento permite
                  localizar e tratar pedras no ureter e, em situações selecionadas,
                  no rim.
                </p>
                <p style={{ marginTop: "0.75rem" }}>
                  O procedimento costuma ser realizado com anestesia e pode
                  envolver um período curto de internação — os detalhes variam
                  conforme a técnica e devem ser explicados pelo urologista antes
                  da cirurgia.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Seção 6 — Como se chega à decisão (faixa escura) */}
        <LpBand eyebrow="Decisão individualizada" title="Qual é o melhor tratamento para o seu caso?">
          <p>
            Não existe uma abordagem única para todos os cálculos urinários. A
            decisão considera onde a pedra está localizada, seu tamanho e
            características, presença de obstrução, intensidade dos sintomas,
            resultados dos exames, histórico de cálculos anteriores e condições
            gerais de saúde. A avaliação urológica reúne essas informações para
            definir a estratégia mais adequada ao seu caso.
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <LpWaCta origem={`${ORIGEM}_meio`} variant="outline-white" />
          </div>
        </LpBand>

        <LpAboutDoctor
          title="Atendimento em Urologia em Campina Grande"
          text="Dr. Talles Leandro realiza avaliação e tratamento de alterações do sistema urinário, incluindo cálculos localizados nos rins e ureteres. Cada caso é analisado individualmente, considerando sintomas, exames e características do cálculo, para definir os próximos passos."
          origem={ORIGEM}
        />

        <LpFaqSection faq={FAQ} />

        <LpFinalCta
          title="Pedra no rim ou no ureter tem tratamento"
          text="O primeiro passo é entender as características do cálculo e como ele está afetando o seu sistema urinário. Converse com o Dr. Talles Leandro e saiba qual pode ser a melhor condução para o seu caso."
          origem={ORIGEM}
        />
      </main>
      <Footer />
      <LpStickyWhatsApp origem={ORIGEM} />
    </>
  );
}
