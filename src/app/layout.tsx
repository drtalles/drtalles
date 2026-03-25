import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dr. Talles Leandro — Urologista em Campina Grande",
    template: "%s | Dr. Talles Leandro — Urologista",
  },
  description:
    "Dr. Talles Leandro é urologista em Campina Grande/PB, com foco em saúde do homem, atendimento humanizado e cirurgia robótica urológica. Agende sua consulta.",
  keywords: [
    "urologista",
    "urologia",
    "Campina Grande",
    "saúde do homem",
    "cirurgia robótica",
    "urologia masculina",
    "Dr. Talles Leandro",
    "urooncologia",
    "andrologia",
  ],
  authors: [{ name: "Dr. Talles Leandro" }],
  metadataBase: new URL("https://drtallesleandro.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Dr. Talles Leandro — Urologista em Campina Grande",
    description:
      "Urologista em Campina Grande/PB com foco em saúde do homem e cirurgia robótica urológica.",
    siteName: "Dr. Talles Leandro",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Talles Leandro — Urologista em Campina Grande",
    description:
      "Urologista em Campina Grande/PB com foco em saúde do homem e cirurgia robótica urológica.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr. Talles Leandro",
  medicalSpecialty: "Urology",
  description:
    "Urologista em Campina Grande/PB com foco em saúde do homem, atendimento humanizado e cirurgia robótica urológica.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Campina Grande",
    addressRegion: "PB",
    addressCountry: "BR",
  },
  url: "https://drtallesleandro.com.br",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
