"use client";

import { useEffect, useRef } from "react";
import { ExternalLink, MessageCircle, CalendarCheck } from "lucide-react";

const DOCTORALIA_URL =
  "https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande?utm_id=34199&utm_source=widget-doctor-34199&utm_medium=big&utm_campaign=&utm_content=#highlight-calendar";
const WA_URL = "https://wa.me/5583999999999";

export default function Agendamento() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="agendamento"
      ref={ref}
      className="section-pad"
      style={{
        background: "linear-gradient(135deg, var(--color-primary-dark) 0%, #163e5a 50%, var(--color-primary) 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-30%",
          left: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(46,196,182,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(42,122,181,0.12) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container-site"
        style={{ position: "relative", zIndex: 1, textAlign: "center" }}
      >
        {/* Icon */}
        <div
          className="fade-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "4.5rem",
            height: "4.5rem",
            borderRadius: "50%",
            background: "rgba(46,196,182,0.15)",
            border: "1.5px solid rgba(46,196,182,0.3)",
            marginBottom: "1.5rem",
          }}
        >
          <CalendarCheck size={28} style={{ color: "var(--color-accent)" }} />
        </div>

        <p className="eyebrow fade-up" style={{ justifyContent: "center", color: "var(--color-accent)" }}>
          Agendamento de consulta
        </p>

        <h2
          className="fade-up"
          style={{ color: "#fff", marginBottom: "1.25rem", maxWidth: "600px", marginInline: "auto" }}
        >
          Agende sua consulta com praticidade
        </h2>

        <p
          className="fade-up"
          style={{
            color: "rgba(255,255,255,0.72)",
            fontSize: "1.0625rem",
            lineHeight: 1.75,
            maxWidth: "520px",
            margin: "0 auto 3rem",
          }}
        >
          O agendamento pode ser feito online, com mais praticidade para o
          paciente e mais agilidade no contato inicial.
        </p>

        {/* CTAs */}
        <div
          className="fade-up"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.125rem",
            justifyContent: "center",
          }}
        >
          <a
            href={DOCTORALIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
            style={{ fontSize: "1.0625rem", padding: "1.0625rem 2.25rem" }}
          >
            <CalendarCheck size={20} />
            Agendar online
            <ExternalLink size={15} />
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-white"
            style={{ fontSize: "1.0625rem", padding: "1.0625rem 2.25rem" }}
          >
            <MessageCircle size={20} />
            Falar pelo WhatsApp
          </a>
        </div>

        {/* Trust note */}
        <p
          className="fade-up"
          style={{
            marginTop: "2rem",
            fontSize: "0.8125rem",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Atendimento por hora marcada · Agendamento rápido e seguro
        </p>
      </div>
    </section>
  );
}
