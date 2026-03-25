import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { MapPin, Phone, Mail, CalendarCheck, MessageCircle, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Contato e Agendamento",
  description:
    "Entre em contato com Dr. Talles Leandro para agendar sua consulta de urologia em Campina Grande/PB.",
};

const DOCTORALIA_URL =
  "https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande?utm_id=34199&utm_source=widget-doctor-34199&utm_medium=big&utm_campaign=&utm_content=#highlight-calendar";
const WA_URL = "https://wa.me/5583999999999";

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          style={{
            background: "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)",
            paddingBlock: "calc(76px + 3.5rem) 4rem",
          }}
        >
          <div className="container-site">
            <p className="eyebrow" style={{ color: "var(--color-accent)" }}>Fale conosco</p>
            <h1 style={{ color: "#fff", maxWidth: "600px", marginBottom: "1rem" }}>
              Contato e Agendamento
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.125rem", maxWidth: "50ch" }}>
              Agende sua consulta online ou entre em contato diretamente.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="section-pad" style={{ background: "var(--color-neutral-50)" }}>
          <div className="container-site">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
              }}
            >
              {/* Agendamento online */}
              <div
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  padding: "2rem",
                  border: "1px solid var(--color-neutral-100)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <div
                  style={{
                    width: "3.25rem",
                    height: "3.25rem",
                    borderRadius: "0.875rem",
                    background: "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CalendarCheck size={22} color="white" />
                </div>
                <div>
                  <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Agendar online</h2>
                  <p style={{ fontSize: "0.9375rem", lineHeight: 1.65, marginBottom: "1.25rem", color: "var(--color-neutral-700)" }}>
                    Agende sua consulta de forma prática pelo Doctoralia.
                  </p>
                  <a
                    href={DOCTORALIA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-accent"
                    style={{ fontSize: "0.9375rem" }}
                  >
                    Agendar no Doctoralia
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  padding: "2rem",
                  border: "1px solid var(--color-neutral-100)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <div
                  style={{
                    width: "3.25rem",
                    height: "3.25rem",
                    borderRadius: "0.875rem",
                    background: "#25D366",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MessageCircle size={22} color="white" fill="white" stroke="none" />
                </div>
                <div>
                  <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>WhatsApp</h2>
                  <p style={{ fontSize: "0.9375rem", lineHeight: 1.65, marginBottom: "1.25rem", color: "var(--color-neutral-700)" }}>
                    Fale diretamente pelo WhatsApp para dúvidas e informações.
                  </p>
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ fontSize: "0.9375rem", background: "#25D366", border: "none", boxShadow: "0 4px 16px rgba(37,211,102,0.32)" }}
                  >
                    Falar pelo WhatsApp
                  </a>
                </div>
              </div>

              {/* Info */}
              <div
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  padding: "2rem",
                  border: "1px solid var(--color-neutral-100)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <div
                  style={{
                    width: "3.25rem",
                    height: "3.25rem",
                    borderRadius: "0.875rem",
                    background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MapPin size={22} color="white" />
                </div>
                <div>
                  <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Informações</h2>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.9375rem" }}>
                      <MapPin size={16} style={{ color: "var(--color-accent-dark)", flexShrink: 0, marginTop: "3px" }} />
                      <span>[Endereço da clínica], Campina Grande, PB</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9375rem" }}>
                      <Phone size={16} style={{ color: "var(--color-accent-dark)", flexShrink: 0 }} />
                      <span>(83) 9999-9999</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9375rem" }}>
                      <Mail size={16} style={{ color: "var(--color-accent-dark)", flexShrink: 0 }} />
                      <span>contato@drtallesleandro.com.br</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
