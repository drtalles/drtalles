import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Crawlers gerais: acesso total, exceto rotas internas/admin
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/static/", "/admin/"],
      },
      // Googlebot: acesso total
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/"],
      },
      // Imagens Google: acesso à pasta de imagens
      {
        userAgent: "Googlebot-Image",
        allow: "/img/",
      },
      // Crawlers de IA — explicitamente permitidos para GEO (Generative Engine Optimization)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/admin/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/admin/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/admin/"],
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/admin/"],
      },
      {
        userAgent: "Meta-ExternalAgent",
        allow: "/",
        disallow: ["/admin/"],
      },
    ],
    sitemap: "https://www.drtallesleandrourologista.com.br/sitemap.xml",
    host: "https://www.drtallesleandrourologista.com.br",
  };
}
