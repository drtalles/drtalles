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
  title: "Dr. Talles Leandro — Urologista em Campina Grande",
  description:
    "Dr. Talles Leandro é urologista em Campina Grande/PB, especialista em saúde do homem, urologia geral e cirurgia robótica urológica. Agende sua consulta online.",
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
