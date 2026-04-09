export type BlogPostSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  author: string;
  coverImage?: string;
  coverAlt?: string;
  tags: string[];
  featured?: boolean;
  sections: BlogPostSection[];
};

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "check-up-urologico-apos-40",
    title: "Check-up urológico após os 40: o que avaliar?",
    excerpt:
      "Entenda quais avaliações costumam ser consideradas no acompanhamento da saúde do homem a partir dos 40 anos.",
    category: "Saúde do Homem",
    publishedAt: "2026-02-18",
    readingTime: 7,
    author: "Equipe Dr. Talles Leandro",
    coverImage: "/img/img-null.jpg",
    coverAlt: "Ilustração para check-up urológico",
    tags: ["check-up", "prevenção", "saúde do homem"],
    featured: true,
    sections: [
      {
        heading: "Por que o acompanhamento regular é importante",
        paragraphs: [
          "Com o passar dos anos, alguns riscos urológicos tendem a aumentar e podem evoluir de forma silenciosa. Por isso, o acompanhamento periódico ajuda a organizar uma leitura clínica mais precisa.",
          "A consulta não se resume a exames: ela considera histórico familiar, sintomas, rotina, hábitos e fatores de risco para definir a melhor conduta de forma individualizada.",
        ],
      },
      {
        heading: "O que costuma ser discutido na consulta",
        paragraphs: [
          "Durante a avaliação, o médico analisa queixas urinárias, alterações sexuais, antecedentes e outros pontos relevantes para direcionar o plano diagnóstico.",
        ],
        bullets: [
          "Sintomas urinários e qualidade do jato",
          "Histórico familiar de doenças urológicas",
          "Mudanças na função sexual e hormonal",
          "Estilo de vida, sono, alimentação e atividade física",
        ],
      },
      {
        heading: "Periodicidade e individualização",
        paragraphs: [
          "Não existe um único calendário para todos. A frequência das consultas e dos exames depende do perfil de risco e dos achados clínicos de cada paciente.",
          "A melhor estratégia é manter acompanhamento contínuo com orientação médica, ajustando condutas conforme a evolução do quadro.",
        ],
      },
    ],
  },
  {
    slug: "psa-como-entender-resultados",
    title: "PSA: como entender os resultados sem ansiedade",
    excerpt:
      "O PSA é uma ferramenta importante, mas deve ser interpretado dentro do contexto clínico. Veja os principais pontos.",
    category: "Diagnóstico",
    publishedAt: "2026-01-29",
    readingTime: 6,
    author: "Equipe Dr. Talles Leandro",
    coverImage: "/img/img-null.jpg",
    coverAlt: "Ilustração para diagnóstico em urologia",
    tags: ["PSA", "próstata", "diagnóstico"],
    sections: [
      {
        heading: "O PSA é um marcador, não um diagnóstico isolado",
        paragraphs: [
          "Um resultado alterado não significa, por si só, um diagnóstico definitivo. O valor precisa ser interpretado com exame físico, histórico e outros dados da consulta.",
          "Também é importante observar tendência ao longo do tempo, em vez de analisar apenas um valor isolado.",
        ],
      },
      {
        heading: "Fatores que podem influenciar o exame",
        paragraphs: [
          "Algumas condições benignas podem interferir no PSA. A leitura correta evita decisões precipitadas e reduz ansiedade desnecessária.",
        ],
        bullets: [
          "Inflamações prostáticas",
          "Hiperplasia prostática benigna",
          "Momento da coleta e preparo prévio",
          "Intercorrências clínicas recentes",
        ],
      },
      {
        heading: "Conduta baseada em contexto",
        paragraphs: [
          "Após a avaliação completa, o urologista define se há necessidade de repetir exames, ampliar investigação ou apenas manter acompanhamento regular.",
        ],
      },
    ],
  },
  {
    slug: "quando-cirurgia-robotica-e-indicada",
    title: "Quando a cirurgia robótica pode ser indicada na Urologia",
    excerpt:
      "Conheça cenários em que a cirurgia robótica pode ser considerada e por que a indicação deve ser sempre individualizada.",
    category: "Cirurgia Robótica",
    publishedAt: "2025-12-15",
    readingTime: 8,
    author: "Equipe Dr. Talles Leandro",
    coverImage: "/img/img-null.jpg",
    coverAlt: "Ilustração para cirurgia robótica urológica",
    tags: ["cirurgia robótica", "tecnologia", "urologia"],
    featured: true,
    sections: [
      {
        heading: "A tecnologia a favor da precisão",
        paragraphs: [
          "A cirurgia robótica é uma via minimamente invasiva que pode oferecer vantagens técnicas em casos selecionados, especialmente em procedimentos que exigem refinamento de movimentos.",
        ],
      },
      {
        heading: "Indicação não é automática",
        paragraphs: [
          "Nem todo quadro clínico tem benefício direto com essa abordagem. A escolha da técnica depende de critérios clínicos, tipo de procedimento e objetivos terapêuticos.",
        ],
        bullets: [
          "Perfil clínico do paciente",
          "Complexidade do caso",
          "Objetivo cirúrgico",
          "Avaliação de risco-benefício",
        ],
      },
      {
        heading: "Planejamento e segurança",
        paragraphs: [
          "A decisão cirúrgica deve ser construída em consulta, com explicação clara de possibilidades, limites e expectativas realistas de recuperação.",
        ],
      },
    ],
  },
  {
    slug: "sintomas-urinarios-que-nao-devem-ser-ignorados",
    title: "Sintomas urinários que não devem ser ignorados",
    excerpt:
      "Alguns sinais merecem avaliação urológica para investigação adequada e definição de conduta segura.",
    category: "Saúde do Homem",
    publishedAt: "2025-11-06",
    readingTime: 5,
    author: "Equipe Dr. Talles Leandro",
    coverImage: "/img/img-null.jpg",
    coverAlt: "Ilustração sobre sintomas urinários",
    tags: ["sintomas urinários", "consulta", "urologia geral"],
    sections: [
      {
        heading: "Sinais de alerta no dia a dia",
        paragraphs: [
          "Alterações urinárias persistentes podem indicar diferentes condições urológicas e não devem ser normalizadas sem avaliação clínica.",
        ],
        bullets: [
          "Jato fraco ou interrompido",
          "Aumento da frequência urinária noturna",
          "Dor ao urinar",
          "Sensação de esvaziamento incompleto",
        ],
      },
      {
        heading: "Diagnóstico organizado evita atrasos",
        paragraphs: [
          "Quanto mais cedo o sintoma é investigado, maior a chance de conduzir o quadro com menos impacto e mais previsibilidade no tratamento.",
        ],
      },
    ],
  },
  {
    slug: "vasectomia-principais-duvidas",
    title: "Vasectomia: principais dúvidas antes da decisão",
    excerpt:
      "Procedimento seguro em casos bem indicados, mas que exige orientação clara e decisão consciente do paciente.",
    category: "Planejamento Familiar",
    publishedAt: "2025-09-24",
    readingTime: 6,
    author: "Equipe Dr. Talles Leandro",
    coverImage: "/img/img-null.jpg",
    coverAlt: "Ilustração para planejamento familiar",
    tags: ["vasectomia", "planejamento familiar", "procedimentos"],
    sections: [
      {
        heading: "Decisão deve ser informada e responsável",
        paragraphs: [
          "A vasectomia faz parte do planejamento reprodutivo e precisa ser discutida com clareza sobre objetivos, expectativas e caráter do procedimento.",
        ],
      },
      {
        heading: "Pontos importantes na consulta",
        paragraphs: [
          "A avaliação prévia considera contexto familiar, histórico de saúde e compreensão do paciente sobre a proposta terapêutica.",
        ],
        bullets: [
          "Indicação individualizada",
          "Cuidados antes e após o procedimento",
          "Tempo de recuperação",
          "Acompanhamento pós-operatório",
        ],
      },
    ],
  },
  {
    slug: "habitos-que-protegem-a-saude-urologica",
    title: "Hábitos que ajudam a proteger a saúde urológica",
    excerpt:
      "Pequenas mudanças de rotina podem contribuir para prevenção e melhor qualidade de vida ao longo do tempo.",
    category: "Prevenção",
    publishedAt: "2025-08-11",
    readingTime: 5,
    author: "Equipe Dr. Talles Leandro",
    coverImage: "/img/img-null.jpg",
    coverAlt: "Ilustração para prevenção e hábitos saudáveis",
    tags: ["prevenção", "hábitos", "qualidade de vida"],
    sections: [
      {
        heading: "Prevenção também é rotina",
        paragraphs: [
          "A saúde urológica não depende apenas de tratamento. Hábitos consistentes de autocuidado reduzem risco e melhoram o acompanhamento clínico.",
        ],
      },
      {
        heading: "Condutas simples com impacto real",
        paragraphs: [
          "Mudanças graduais podem ser mais sustentáveis no longo prazo e devem respeitar o contexto de cada paciente.",
        ],
        bullets: [
          "Hidratação adequada durante o dia",
          "Controle de peso e atividade física regular",
          "Sono de qualidade",
          "Acompanhamento médico periódico",
        ],
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getAllCategories(): string[] {
  return Array.from(new Set(getAllPosts().map((post) => post.category)));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(
  slug: string,
  category: string,
  limit = 3
): BlogPost[] {
  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .sort((a, b) => {
      const aScore = a.category === category ? 1 : 0;
      const bScore = b.category === category ? 1 : 0;
      if (aScore !== bScore) return bScore - aScore;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .slice(0, limit);
}
