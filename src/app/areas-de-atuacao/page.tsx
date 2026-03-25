import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Áreas de Atuação",
  description:
    "Conheça as áreas de atuação do Dr. Talles Leandro: saúde do homem, urologia geral, disfunções sexuais, andrologia, endourologia, videolaparoscopia, uro-oncologia e uro-ginecologia.",
};

export default function AreasAtuacaoPage() {
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
            <p className="eyebrow" style={{ color: "var(--color-accent)" }}>Especialidades</p>
            <h1 style={{ color: "#fff", maxWidth: "700px", marginBottom: "1rem" }}>
              Áreas de Atuação
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.125rem", maxWidth: "55ch" }}>
              Atendimento especializado nas principais áreas da urologia, com foco em saúde do homem.
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
              <Activity size={48} style={{ color: "var(--color-neutral-400)" }} />
              <h2 style={{ fontSize: "1.5rem" }}>Página em desenvolvimento</h2>
              <p style={{ color: "var(--color-neutral-700)", maxWidth: "45ch" }}>
                Esta página terá descrição completa das 8 áreas de atuação com explicações detalhadas de cada especialidade.
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
