import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Stethoscope } from "lucide-react";

export const metadata: Metadata = {
  title: "Dr. Talles Leandro — Urologista",
  description:
    "Conheça a formação, trajetória e filosofia de atendimento do Dr. Talles Leandro, urologista em Campina Grande/PB.",
};

export default function DrTallesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero da página */}
        <section
          style={{
            background: "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)",
            paddingBlock: "calc(76px + 3.5rem) 4rem",
          }}
        >
          <div className="container-site">
            <p className="eyebrow" style={{ color: "var(--color-accent)" }}>Quem é</p>
            <h1 style={{ color: "#fff", maxWidth: "700px", marginBottom: "1rem" }}>
              Dr. Talles Leandro
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.125rem", maxWidth: "55ch" }}>
              Urologista em Campina Grande/PB, com foco em saúde do homem, atendimento humanizado
              e cirurgia robótica urológica.
            </p>
          </div>
        </section>

        {/* Conteúdo placeholder */}
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
              <Stethoscope size={48} style={{ color: "var(--color-neutral-400)" }} />
              <h2 style={{ fontSize: "1.5rem" }}>Página em desenvolvimento</h2>
              <p style={{ color: "var(--color-neutral-700)", maxWidth: "45ch" }}>
                Esta página terá formação completa, trajetória, filosofia de atendimento e foto profissional do Dr. Talles.
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
