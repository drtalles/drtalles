"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook, ExternalLink } from "lucide-react";

const DOCTORALIA_URL =
  "https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande?utm_id=34199&utm_source=widget-doctor-34199&utm_medium=big&utm_campaign=&utm_content=#highlight-calendar";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Dr. Talles", href: "/dr-talles" },
  { label: "Cirurgia Robótica", href: "/cirurgia-robotica" },
  { label: "Áreas de Atuação", href: "/areas-de-atuacao" },
  { label: "Exames e Procedimentos", href: "/exames-e-procedimentos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-primary-dark)",
        color: "rgba(255,255,255,0.75)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Main footer grid */}
      <div
        className="container-site"
        style={{
          paddingTop: "4rem",
          paddingBottom: "3rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2.5rem",
        }}
      >
        {/* Brand */}
        <div style={{ gridColumn: "span 1" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.375rem",
                fontWeight: 700,
                color: "#fff",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Dr. Talles Leandro
            </p>
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                margin: "0.375rem 0 0",
              }}
            >
              Urologista · CRM-PB 5970
            </p>
          </div>
          <p style={{ fontSize: "0.875rem", lineHeight: 1.7, margin: "0 0 1.5rem", color: "rgba(255,255,255,0.6)" }}>
            Atendimento urológico humanizado em Campina Grande, com foco em saúde do homem e cirurgia robótica.
          </p>
          {/* Social */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <a
              href="https://www.instagram.com/drtallesleandro/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do Dr. Talles Leandro"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                transition: "background 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)")}
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.facebook.com/drtallesleandro/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook do Dr. Talles Leandro"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                transition: "background 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-accent)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)")}
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              margin: "0 0 1.25rem",
            }}
          >
            Navegação
          </h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "color 0.18s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              margin: "0 0 1.25rem",
            }}
          >
            Contato
          </h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <MapPin size={15} style={{ color: "var(--color-accent)", marginTop: "3px", flexShrink: 0 }} />
              <span style={{ fontSize: "0.875rem", lineHeight: 1.55 }}>
                R. Dep. Álvaro Gaudêncio, 281<br />
                Centro – CEP: 58400-243<br />
                Campina Grande, PB
              </span>
            </li>
            <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <Phone size={15} style={{ color: "var(--color-accent)", marginTop: "3px", flexShrink: 0 }} />
              <span style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
                (83) 3142-1505<br />
                (83) 3142-1507<br />
                (83) 9 8828-7705
              </span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Mail size={15} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
              <span style={{ fontSize: "0.875rem" }}>contato@drtallesleandro.com.br</span>
            </li>
          </ul>
        </div>

        {/* Agendamento */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              margin: "0 0 1.25rem",
            }}
          >
            Agendamento
          </h3>
          <p style={{ fontSize: "0.875rem", lineHeight: 1.65, marginBottom: "1.25rem", color: "rgba(255,255,255,0.65)" }}>
            Agende sua consulta de forma prática e online.
          </p>
          <a
            href={DOCTORALIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
            style={{ fontSize: "0.875rem", padding: "0.625rem 1.25rem", gap: "0.375rem" }}
          >
            Agendar online
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="container-site"
          style={{
            paddingBlock: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          <p style={{ fontSize: "0.8125rem", margin: 0, color: "rgba(255,255,255,0.45)" }}>
            © 2026 Dr. Talles Leandro — Todos os direitos reservados
          </p>
          <p style={{ fontSize: "0.8125rem", margin: 0, color: "rgba(255,255,255,0.45)" }}>
            Desenvolvido por{" "}
            <a
              href="https://www.agenciacriativaimagem.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.65)", textDecoration: "underline" }}
            >
              Agência Criativa Imagem
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
