import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/static/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/img/",
      },
    ],
    sitemap: "https://drtallesleandro.com.br/sitemap.xml",
    host: "https://drtallesleandro.com.br",
  };
}
