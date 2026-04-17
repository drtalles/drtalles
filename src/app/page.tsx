import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Hero from "@/components/sections/Hero";
import Sobre from "@/components/sections/Sobre";
import CirurgiaRobotica from "@/components/sections/CirurgiaRobotica";
import AreasAtuacao from "@/components/sections/AreasAtuacao";
import ExamesProcedimentos from "@/components/sections/ExamesProcedimentos";
import Depoimentos from "@/components/sections/Depoimentos";
import Agendamento from "@/components/sections/Agendamento";
import Localizacao from "@/components/sections/Localizacao";

export const metadata: Metadata = {
  title: "Dr. Talles Leandro — Urologista em Campina Grande, PB",
  description:
    "Dr. Talles Leandro é urologista em Campina Grande/PB especializado em saúde do homem, urologia geral, andrologia e cirurgia robótica urológica. Atendimento humanizado e individualizado. Agende sua consulta.",
  keywords: [
    "urologista Campina Grande",
    "urologista em Campina Grande PB",
    "Dr. Talles Leandro",
    "urologia Campina Grande",
    "saúde do homem",
    "cirurgia robótica urológica",
    "consulta urologia",
    "Clínica Vitta",
  ],
  alternates: {
    canonical: "https://drtallesleandro.com.br",
  },
  openGraph: {
    type: "website",
    url: "https://drtallesleandro.com.br",
    title: "Dr. Talles Leandro — Urologista em Campina Grande, PB",
    description:
      "Urologista em Campina Grande/PB especializado em saúde do homem, urologia geral e cirurgia robótica urológica. Atendimento humanizado e individualizado.",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Talles Leandro — Urologista em Campina Grande, PB",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <CirurgiaRobotica />
        <AreasAtuacao />
        <ExamesProcedimentos />
        <Depoimentos />
        <Agendamento />
        <Localizacao />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
