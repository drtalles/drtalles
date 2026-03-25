import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos e informações sobre urologia, saúde do homem e bem-estar com Dr. Talles Leandro.",
};

// Placeholder posts para layout
const PLACEHOLDER_POSTS = [
  { title: "Saúde do homem: por que é importante consultar um urologista?", date: "2025-01-10", categoria: "Saúde do Homem" },
  { title: "Cirurgia robótica na urologia: entenda os benefícios", date: "2025-01-05", categoria: "Cirurgia Robótica" },
  { title: "PSA: o que é e quando fazer o exame", date: "2024-12-20", categoria: "Diagnóstico" },
];

export default function BlogPage() {
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
            <p className="eyebrow" style={{ color: "var(--color-accent)" }}>Conteúdo</p>
            <h1 style={{ color: "#fff", maxWidth: "700px", marginBottom: "1rem" }}>
              Blog
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.125rem", maxWidth: "55ch" }}>
              Informações sobre urologia, saúde do homem e bem-estar.
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
              <BookOpen size={48} style={{ color: "var(--color-neutral-400)" }} />
              <h2 style={{ fontSize: "1.5rem" }}>Blog em desenvolvimento</h2>
              <p style={{ color: "var(--color-neutral-700)", maxWidth: "45ch" }}>
                Em breve, artigos sobre saúde do homem, urologia e bem-estar. O grid abaixo mostra o layout planejado.
              </p>
            </div>

            {/* Preview do layout de cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.5rem",
                marginTop: "3rem",
                opacity: 0.4,
                pointerEvents: "none",
              }}
              aria-hidden
            >
              {PLACEHOLDER_POSTS.map((post) => (
                <div
                  key={post.title}
                  style={{
                    background: "white",
                    borderRadius: "0.875rem",
                    overflow: "hidden",
                    border: "1px solid var(--color-neutral-100)",
                  }}
                >
                  <div
                    style={{
                      height: "160px",
                      background: "var(--color-neutral-100)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BookOpen size={32} style={{ color: "var(--color-neutral-400)" }} />
                  </div>
                  <div style={{ padding: "1.25rem" }}>
                    <span
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--color-accent-dark)",
                        marginBottom: "0.5rem",
                        display: "block",
                      }}
                    >
                      {post.categoria}
                    </span>
                    <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem", lineHeight: 1.4 }}>{post.title}</h3>
                    <p style={{ fontSize: "0.8125rem", color: "var(--color-neutral-400)", margin: 0 }}>
                      {new Date(post.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
