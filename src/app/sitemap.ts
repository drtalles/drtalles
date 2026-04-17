import type { MetadataRoute } from "next";

const BASE_URL = "https://drtallesleandro.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: { "pt-BR": BASE_URL },
      },
    },
    {
      url: `${BASE_URL}/dr-talles`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: { "pt-BR": `${BASE_URL}/dr-talles` },
      },
    },
    {
      url: `${BASE_URL}/areas-de-atuacao`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: { "pt-BR": `${BASE_URL}/areas-de-atuacao` },
      },
    },
    {
      url: `${BASE_URL}/cirurgia-robotica`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: {
        languages: { "pt-BR": `${BASE_URL}/cirurgia-robotica` },
      },
    },
    {
      url: `${BASE_URL}/exames-e-procedimentos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: { "pt-BR": `${BASE_URL}/exames-e-procedimentos` },
      },
    },
    {
      url: `${BASE_URL}/contato`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: {
        languages: { "pt-BR": `${BASE_URL}/contato` },
      },
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: { "pt-BR": `${BASE_URL}/blog` },
      },
    },
  ];

  return staticPages;
}
