import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dr. Talles Leandro — Urologista em Campina Grande",
    short_name: "Dr. Talles Leandro",
    description:
      "Urologista em Campina Grande/PB especializado em saúde do homem, urologia geral e cirurgia robótica urológica.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1B4D6E",
    orientation: "portrait",
    lang: "pt-BR",
    categories: ["medical", "health"],
    icons: [
      {
        src: "/img/favicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/img/favicon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
