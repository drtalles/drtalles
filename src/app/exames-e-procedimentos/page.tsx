import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "Exames e Procedimentos",
  description:
    "Exames e procedimentos disponíveis com Dr. Talles Leandro: consulta em urologia, cistoscopia, urodinâmica, urofluxometria, crioterapia e biópsia de pênis.",
};

export default function ExamesProcedimentosPage() {
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
            <p className="eyebrow" style={{ color: "var(--color-accent)" }}>Diagnóstico e tratamento</p>
            <h1 style={{ color: "#fff", maxWidth: "700px", marginBottom: "1rem" }}>
              Exames e Procedimentos
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.125rem", maxWidth: "55ch" }}>
              Exames e procedimentos que complementam o atendimento clínico para diagnóstico preciso.
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
              <FlaskConical size={48} style={{ color: "var(--color-neutral-400)" }} />
              <h2 style={{ fontSize: "1.5rem" }}>Página em desenvolvimento</h2>
              <p style={{ color: "var(--color-neutral-700)", maxWidth: "45ch" }}>
                Esta página terá explicação detalhada de cada exame e procedimento disponível.
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
