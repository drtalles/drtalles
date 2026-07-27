import type { Metadata } from "next";
import { Bot, FileSearch, HeartPulse } from "lucide-react";
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

const PATH = "/cancer-de-prostata";
const ORIGEM = "lp_cancer_prostata";

export const metadata: Metadata = {
  title: "Câncer de Próstata e Cirurgia Robótica em Campina Grande | Dr. Talles Leandro",
  description:
    "Diagnóstico de câncer de próstata? Entenda as possibilidades de tratamento, quando a prostatectomia radical robótica pode ser indicada, e agende uma segunda opinião com o Dr. Talles Leandro.",
  keywords: [
    "câncer de próstata",
    "tratamento do câncer de próstata",
    "cirurgia para câncer de próstata",
    "cirurgia robótica próstata",
    "prostatectomia radical",
    "prostatectomia radical robótica",
    "segunda opinião câncer de próstata",
    "urologista câncer de próstata Campina Grande",
    "cirurgia robótica em Campina Grande",
  ],
  alternates: { canonical: `${LP_BASE_URL}${PATH}` },
  openGraph: {
    type: "website",
    url: `${LP_BASE_URL}${PATH}`,
    title: "Câncer de Próstata e Cirurgia Robótica em Campina Grande | Dr. Talles Leandro",
    description:
      "Entenda as possibilidades de tratamento do câncer de próstata e quando a prostatectomia radical robótica pode ser considerada. Avaliação e segunda opinião com o Dr. Talles Leandro.",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Câncer de Próstata e Cirurgia Robótica — Dr. Talles Leandro",
      },
    ],
  },
};

const FAQ: LpFaqItem[] = [
  {
    question: "Todo câncer de próstata precisa ser operado?",
    answer:
      "Não. Existem diferentes possibilidades de tratamento e acompanhamento. A escolha depende das características da doença e do paciente.",
  },
  {
    question: "Preciso decidir e operar logo depois do diagnóstico?",
    answer:
      "Não necessariamente. Muitos casos permitem tempo para uma avaliação cuidadosa, incluindo uma segunda opinião, antes da decisão sobre o tratamento. O urologista pode esclarecer o grau de urgência do seu caso específico durante a consulta.",
  },
  {
    question: "Na cirurgia robótica, o robô opera sozinho?",
    answer:
      "Não. O sistema robótico é totalmente controlado pelo cirurgião durante todo o procedimento.",
  },
  {
    question:
      "A cirurgia robótica elimina o risco de incontinência ou disfunção erétil, ou garante a preservação dos nervos?",
    answer:
      "Não. Esses efeitos podem acontecer após qualquer prostatectomia radical, independentemente da técnica usada. A preservação de nervos relacionados à ereção, quando possível, depende principalmente da localização e extensão do tumor — e nem sempre é indicada. O risco e a recuperação variam de paciente para paciente.",
  },
  {
    question: "Cirurgia robótica é sempre melhor do que a cirurgia convencional?",
    answer:
      "Não existe uma resposta única para todos os pacientes. A escolha da abordagem deve considerar o caso clínico, as características da doença e a experiência da equipe responsável.",
  },
];

const jsonLdProcedure = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "Prostatectomia Radical (incluindo abordagem robótica)",
  procedureType: "https://schema.org/SurgicalProcedure",
  description:
    "Cirurgia realizada para o tratamento do câncer de próstata em pacientes selecionados, com retirada da próstata e de estruturas relacionadas. Pode ser realizada por diferentes abordagens, incluindo a cirurgia assistida por robô.",
  bodyLocation: "Próstata",
  preparation:
    "Avaliação individualizada com biópsia, PSA, exames de imagem e análise das condições gerais de saúde.",
  howPerformed:
    "Na abordagem robótica, todos os movimentos são controlados pelo cirurgião por meio de plataforma com visão ampliada em três dimensões e instrumentos de grande capacidade de movimentação.",
  performer: {
    "@type": "Physician",
    name: "Dr. Talles Leandro",
    identifier: "CRM-PB 5970",
  },
};

export default function CancerDeProstataPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(FAQ)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd("Câncer de Próstata e Cirurgia Robótica", PATH)
          ),
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
          kicker="Urologia · Cirurgia robótica"
          title="Recebeu o Diagnóstico de Câncer de Próstata? Entenda as Possibilidades de Tratamento"
          subtitle="Entenda as possibilidades de tratamento e quando a prostatectomia radical com cirurgia robótica pode ser considerada para o seu caso."
          complement="Urologista com atuação em cirurgia robótica urológica, em Campina Grande."
          origem={ORIGEM}
        />

        {/* Seção 1 — Cada caso é único (texto + imagem) */}
        <section className="section-pad">
          <div className="container-site lp-split">
            <div>
              <p className="eyebrow">Avaliação individualizada</p>
              <h2 className="lp-h2">
                Cada diagnóstico de câncer de próstata precisa ser avaliado individualmente
              </h2>
              <p className="lp-text">
                Receber um diagnóstico de câncer de próstata naturalmente traz
                dúvidas sobre os próximos passos. Mas nem todos os tumores se
                comportam da mesma forma, e nem todos os pacientes precisam do
                mesmo tratamento.
              </p>
              <p className="lp-text">
                A definição da melhor estratégia reúne diferentes informações:
                resultado da biópsia, PSA e sua evolução, exames de imagem, estágio
                e características do tumor, idade e condições gerais de saúde,
                função urinária e sexual antes do tratamento, além das expectativas
                e prioridades do paciente. A partir dessa análise, médico e
                paciente discutem juntos as possibilidades e os próximos passos.
              </p>
            </div>
            <LpImage
              src="/img/can.jpg"
              alt="Consulta de avaliação individualizada do diagnóstico de câncer de próstata com o urologista Dr. Talles Leandro"
              ratio="4 / 4.2"
            />
          </div>
        </section>

        {/* Seção 2 — Nem sempre é cirurgia (faixa escura) */}
        <LpBand eyebrow="Possibilidades de tratamento" title="Todo câncer de próstata precisa de cirurgia?">
          <p>
            Não. Dependendo das características da doença, as possibilidades podem
            incluir acompanhamento por vigilância ativa, cirurgia, radioterapia e
            outros tratamentos. A escolha deve ser individualizada. Quando o
            tratamento cirúrgico é indicado, uma das possibilidades é a
            prostatectomia radical.
          </p>
        </LpBand>

        {/* Seções 3 e 4 — Prostatectomia radical e cirurgia robótica */}
        <section className="section-pad">
          <div className="container-site">
            <div className="lp-lead">
              <p className="eyebrow">Entenda o procedimento</p>
              <h2 className="lp-h2">O que é a prostatectomia radical?</h2>
              <p className="lp-text">
                É uma cirurgia realizada para o tratamento do câncer de próstata em
                pacientes selecionados. O procedimento envolve a retirada da
                próstata e de estruturas relacionadas, com o objetivo de tratar a
                doença localizada ou situações específicas definidas após avaliação
                médica. Pode ser realizada por diferentes abordagens, incluindo a
                cirurgia assistida por robô.
              </p>
            </div>
            <div className="lp-card-grid">
              <article className="lp-card">
                <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Bot size={18} style={{ color: "var(--color-accent-dark)" }} aria-hidden />
                  Como funciona a cirurgia robótica?
                </h3>
                <p>
                  Na cirurgia robótica, o robô não realiza o procedimento sozinho.
                  Todos os movimentos são controlados pelo cirurgião por meio de
                  uma plataforma que oferece visão ampliada em três dimensões e
                  instrumentos com grande capacidade de movimentação — recursos que
                  auxiliam o cirurgião em regiões anatômicas delicadas, como a
                  próstata.
                </p>
                <p style={{ marginTop: "0.75rem" }}>
                  A tecnologia é uma ferramenta. A indicação da cirurgia e o
                  planejamento do procedimento continuam dependendo da avaliação
                  médica e das características de cada paciente.
                </p>
              </article>
              <article className="lp-card">
                <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <HeartPulse size={18} style={{ color: "var(--color-accent-dark)" }} aria-hidden />
                  A cirurgia robótica é a melhor opção para todos os pacientes?
                </h3>
                <p>
                  Não necessariamente. A escolha da abordagem cirúrgica considera o
                  estágio e as características da doença, as condições do paciente
                  e outros fatores avaliados pelo urologista. Mais importante do
                  que escolher uma tecnologia isoladamente é definir a estratégia
                  de tratamento adequada para cada situação.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Seção 6 — Continência e função sexual */}
        <section className="section-pad lp-alt">
          <div className="container-site">
            <div className="lp-lead">
              <p className="eyebrow">Conversa franca</p>
              <h2 className="lp-h2">E a continência urinária e a função sexual?</h2>
              <p className="lp-text">
                Essas são duas preocupações importantes para muitos homens que
                recebem a indicação de uma prostatectomia radical. A cirurgia pode
                afetar, temporária ou permanentemente, a continência urinária e a
                função erétil. Os resultados variam de acordo com idade, condições
                anteriores à cirurgia, características e extensão do tumor, e a
                possibilidade de preservação das estruturas envolvidas.
              </p>
              <p className="lp-text">
                Por isso, esses aspectos devem ser conversados com clareza antes do
                procedimento, com expectativas realistas sobre o tratamento e a
                recuperação.
              </p>
            </div>
          </div>
        </section>

        {/* Seção 7 — Segunda opinião */}
        <section className="section-pad">
          <div className="container-site">
            <div className="lp-soft-highlight" style={{ maxWidth: "860px", marginInline: "auto" }}>
              <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>
                <FileSearch size={14} aria-hidden style={{ marginRight: "0.35rem" }} />
                Segunda opinião
              </p>
              <h2 className="lp-h2" style={{ fontSize: "clamp(1.35rem, 2.6vw, 1.7rem)" }}>
                Já tem um diagnóstico, mas ainda tem dúvidas sobre o tratamento indicado?
              </h2>
              <p className="lp-text">
                Buscar uma segunda avaliação é uma decisão comum e legítima diante
                de um diagnóstico de câncer de próstata — especialmente quando a
                indicação envolve uma cirurgia. Uma segunda opinião pode ajudar a
                compreender melhor as características da doença, as opções de
                tratamento disponíveis, se existe indicação de cirurgia e os
                possíveis impactos de cada escolha. Trazer seus exames para a
                consulta ajuda a tornar essa segunda avaliação mais completa.
              </p>
              <div style={{ marginTop: "1.4rem" }}>
                <LpWaCta origem={`${ORIGEM}_segunda_opiniao`} label="Falar pelo WhatsApp" variant="ghost" />
              </div>
            </div>
          </div>
        </section>

        <LpAboutDoctor
          title="Atendimento em Urologia e Cirurgia Robótica"
          text="Dr. Talles Leandro atua em Urologia, com certificação em cirurgia robótica urológica, e realiza avaliação individualizada de pacientes diagnosticados com câncer de próstata. Cada caso é analisado considerando o diagnóstico, os exames disponíveis e as características do paciente, para discutir as possibilidades de tratamento de forma clara e responsável."
          origem={ORIGEM}
        />

        <LpFaqSection faq={FAQ} />

        <LpFinalCta
          title="Entender o seu caso é o primeiro passo para decidir o tratamento"
          text="O diagnóstico de câncer de próstata não significa que todos os pacientes seguirão o mesmo caminho. Converse com o Dr. Talles Leandro para avaliar as características do seu caso e compreender as possibilidades de tratamento."
          origem={ORIGEM}
        />
      </main>
      <Footer />
      <LpStickyWhatsApp origem={ORIGEM} />
    </>
  );
}
