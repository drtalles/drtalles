import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drtallesleandrourologista.com.br"),
  title: {
    default: "Dr. Talles Leandro — Urologista em Campina Grande, PB",
    template: "%s | Dr. Talles Leandro — Urologista",
  },
  description:
    "Dr. Talles Leandro é urologista em Campina Grande/PB especializado em saúde do homem, urologia geral, andrologia e cirurgia robótica urológica. Atendimento humanizado e individualizado. Agende sua consulta.",
  keywords: [
    "urologista Campina Grande",
    "urologia Campina Grande PB",
    "Dr. Talles Leandro urologista",
    "saúde do homem Campina Grande",
    "cirurgia robótica urológica",
    "urologia masculina Paraíba",
    "andrologia Campina Grande",
    "urooncologia",
    "disfunção erétil",
    "próstata Campina Grande",
    "urologia geral",
    "endourologia",
    "uroginecologia",
    "Clínica Vitta Campina Grande",
    "CRM-PB 5970",
  ],
  authors: [{ name: "Dr. Talles Leandro", url: "https://www.drtallesleandrourologista.com.br/dr-talles" }],
  creator: "Dr. Talles Leandro",
  publisher: "Dr. Talles Leandro",
  category: "health",
  classification: "Medicina — Urologia",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.drtallesleandrourologista.com.br",
    languages: {
      "pt-BR": "https://www.drtallesleandrourologista.com.br",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.drtallesleandrourologista.com.br",
    title: "Dr. Talles Leandro — Urologista em Campina Grande, PB",
    description:
      "Urologista em Campina Grande/PB especializado em saúde do homem, urologia geral e cirurgia robótica urológica. Atendimento individualizado e humanizado.",
    siteName: "Dr. Talles Leandro — Urologista",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Talles Leandro — Urologista em Campina Grande, PB",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@drtallesleandro",
    creator: "@drtallesleandro",
    title: "Dr. Talles Leandro — Urologista em Campina Grande, PB",
    description:
      "Urologista em Campina Grande/PB com foco em saúde do homem e cirurgia robótica urológica.",
    images: ["/img/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/img/favicon.png", type: "image/png" },
      { url: "/img/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/img/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/img/favicon.png",
    apple: [{ url: "/img/favicon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  verification: {
    google: "",
  },
  other: {
    "geo.region": "BR-PB",
    "geo.placename": "Campina Grande",
    "geo.position": "-7.2308;-35.8817",
    "ICBM": "-7.2308, -35.8817",
    "theme-color": "#1B4D6E",
  },
};

const jsonLdPhysician = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": "https://www.drtallesleandrourologista.com.br/#physician",
  name: "Dr. Talles Leandro",
  givenName: "Talles",
  familyName: "Leandro",
  honorificPrefix: "Dr.",
  medicalSpecialty: [
    "https://schema.org/Urology",
    "Andrologia",
    "Cirurgia Robótica Urológica",
  ],
  description:
    "Urologista em Campina Grande/PB com foco em saúde do homem, atendimento humanizado e cirurgia robótica urológica.",
  url: "https://www.drtallesleandrourologista.com.br",
  image: "https://www.drtallesleandrourologista.com.br/img/og-image.jpg",
  telephone: "+55-83-3142-1505",
  identifier: "CRM-PB 5970",
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Universidade Federal de Roraima",
    },
    {
      "@type": "MedicalOrganization",
      name: "Hospital Universitário Lauro Wanderley — UFPB",
    },
    {
      "@type": "MedicalOrganization",
      name: "Hospital São Rafael — Salvador",
    },
  ],
  worksFor: {
    "@type": "MedicalClinic",
    "@id": "https://www.drtallesleandrourologista.com.br/#clinic",
    name: "Clínica Vitta",
    address: {
      "@type": "PostalAddress",
      streetAddress: "R. Dep. Álvaro Gaudêncio, 281",
      addressLocality: "Campina Grande",
      addressRegion: "PB",
      postalCode: "58400-243",
      addressCountry: "BR",
    },
    telephone: "+55-83-3142-1505",
    openingHours: "Mo-Fr 07:30-17:30",
    url: "https://www.drtallesleandrourologista.com.br/contato",
    geo: {
      "@type": "GeoCoordinates",
      latitude: -7.2308,
      longitude: -35.8817,
    },
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Dep. Álvaro Gaudêncio, 281",
    addressLocality: "Campina Grande",
    addressRegion: "PB",
    postalCode: "58400-243",
    addressCountry: "BR",
  },
  areaServed: {
    "@type": "City",
    name: "Campina Grande",
  },
  availableService: [
    { "@type": "MedicalTherapy", name: "Consulta em Urologia" },
    { "@type": "MedicalTherapy", name: "Cirurgia Robótica Urológica" },
    { "@type": "DiagnosticTest", name: "Cistoscopia" },
    { "@type": "DiagnosticTest", name: "Urodinâmica" },
    { "@type": "DiagnosticTest", name: "Urofluxometria" },
  ],
  knowsAbout: [
    "Urologia",
    "Saúde do Homem",
    "Andrologia",
    "Disfunções Sexuais",
    "Cirurgia Robótica",
    "Endourologia",
    "Uroginecologia",
    "Urooncologia",
  ],
  sameAs: [
    "https://www.instagram.com/drtallesleandro/",
    "https://www.facebook.com/drtallesleandro/",
    "https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande",
  ],
};

const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.drtallesleandrourologista.com.br/#localbusiness",
  name: "Dr. Talles Leandro — Urologista",
  description:
    "Consultório de Urologia em Campina Grande/PB. Atendimento especializado em saúde do homem, urologia geral e cirurgia robótica urológica.",
  url: "https://www.drtallesleandrourologista.com.br",
  telephone: "+55-83-3142-1505",
  email: "",
  image: "https://www.drtallesleandrourologista.com.br/img/og-image.jpg",
  priceRange: "$$",
  currenciesAccepted: "BRL",
  paymentAccepted: "Cash, Credit Card, Debit Card, Health Insurance",
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Dep. Álvaro Gaudêncio, 281",
    addressLocality: "Campina Grande",
    addressRegion: "PB",
    postalCode: "58400-243",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -7.2308,
    longitude: -35.8817,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:30",
      closes: "17:30",
    },
  ],
  hasMap: "https://www.google.com/maps/search/?api=1&query=R.+Dep.+%C3%81lvaro+Gaud%C3%AAncio,+281,+Centro,+Campina+Grande,+PB,+58400-243",
  sameAs: [
    "https://www.instagram.com/drtallesleandro/",
    "https://www.facebook.com/drtallesleandro/",
    "https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande",
  ],
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.drtallesleandrourologista.com.br/#website",
  url: "https://www.drtallesleandrourologista.com.br",
  name: "Dr. Talles Leandro — Urologista em Campina Grande",
  description:
    "Site oficial do Dr. Talles Leandro, urologista em Campina Grande/PB.",
  inLanguage: "pt-BR",
  publisher: {
    "@id": "https://www.drtallesleandrourologista.com.br/#physician",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.drtallesleandrourologista.com.br/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        {/* Preconnect para domínios críticos — reduz latência de fontes e imagens */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPhysician) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7VP9P73HNY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7VP9P73HNY');
          `}
        </Script>
      </body>
    </html>
  );
}
