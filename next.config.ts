import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },

  async redirects() {
    return [
      // URLs antigas do blog WordPress (autor e arquivos por data)
      {
        source: "/author/:slug",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})/:month(\\d{2})",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },

      // Posts antigos com URLs diretas — redireciona para o blog
      // (se esses slugs existirem no novo blog, o Next servirá a página;
      //  se não existirem, o blog é o destino temático mais próximo)
      {
        source: "/o-que-e-urodinamica",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/tratamento-para-hpv-crioterapia-cirurgia-ou-medicacao",
        destination: "/exames-e-procedimentos",
        permanent: true,
      },
      {
        source: "/voce-sabe-no-que-consiste-a-litotripsia-extracorporea-leco",
        destination: "/exames-e-procedimentos",
        permanent: true,
      },

      // Variações comuns de URLs antigas (WordPress .html, /index.php, /contato.html)
      {
        source: "/contato.html",
        destination: "/contato",
        permanent: true,
      },
      {
        source: "/sobre",
        destination: "/dr-talles",
        permanent: true,
      },
      {
        source: "/sobre.html",
        destination: "/dr-talles",
        permanent: true,
      },
      {
        source: "/servicos",
        destination: "/areas-de-atuacao",
        permanent: true,
      },
      {
        source: "/servicos/:slug",
        destination: "/areas-de-atuacao",
        permanent: true,
      },
      {
        source: "/especialidades",
        destination: "/areas-de-atuacao",
        permanent: true,
      },
      {
        source: "/especialidades/:slug",
        destination: "/areas-de-atuacao",
        permanent: true,
      },
      {
        source: "/cirurgia-robotica.html",
        destination: "/cirurgia-robotica",
        permanent: true,
      },
      {
        source: "/exames",
        destination: "/exames-e-procedimentos",
        permanent: true,
      },
      {
        source: "/procedimentos",
        destination: "/exames-e-procedimentos",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
