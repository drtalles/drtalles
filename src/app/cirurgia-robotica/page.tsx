import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Cirurgia Robótica Urológica",
  description:
    "Saiba como funciona a cirurgia robótica urológica com o Dr. Talles Leandro — benefícios, indicações e certificação.",
};

export default function CirurgiaRoboticaPage() {
  return (
    <>
      <Header />
      <main>
        <section
          style={{
            background: "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)",
            paddingBlock: "calc(76px + 3.5rem) 4rem",
          }}
        >
          <div className="container-site">
            <p className="eyebrow" style={{ color: "var(--color-accent)" }}>Tecnologia avançada</p>
            <h1 style={{ color: "#fff", maxWidth: "700px", marginBottom: "1rem" }}>
              Cirurgia Robótica Urológica
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.125rem", maxWidth: "55ch" }}>
              Uma nova etapa na abordagem cirúrgica urológica, com foco em casos oncológicos e maior precisão.
            </p>
          </div>
        </section>

        <section className="section-pad" style={{ background: "var(--color-neutral-50)" }}>
          <div className="container-site">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
                textAlign: "center",
                padding: "4rem 2rem",
                background: "white",
                borderRadius: "1.25rem",
                border: "1px dashed var(--color-neutral-200)",
              }}
            >
              <Cpu size={48} style={{ color: "var(--color-neutral-400)" }} />
              <h2 style={{ fontSize: "1.5rem" }}>Página em desenvolvimento</h2>
              <p style={{ color: "var(--color-neutral-700)", maxWidth: "45ch" }}>
                Esta página terá conteúdo completo sobre o que é a cirurgia robótica, como funciona,
                benefícios, indicações e a certificação do Dr. Talles.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
