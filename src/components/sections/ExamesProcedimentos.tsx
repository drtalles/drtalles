"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Stethoscope, Eye, Activity, BarChart2, Snowflake, FlaskConical, ArrowRight } from "lucide-react";

const PROCEDIMENTOS = [
  { icon: Stethoscope, name: "Consulta em urologia",  desc: "Avaliação clínica completa e individualizada." },
  { icon: Eye,         name: "Cistoscopia",            desc: "Exame endoscópico da bexiga e uretra." },
  { icon: Activity,    name: "Urodinâmica",            desc: "Estudo do funcionamento do trato urinário inferior." },
  { icon: BarChart2,   name: "Urofluxometria",         desc: "Medição do fluxo urinário para diagnóstico." },
  { icon: Snowflake,   name: "Crioterapia",            desc: "Tratamento por congelamento para lesões localizadas." },
  { icon: FlaskConical,name: "Biópsia de pênis",       desc: "Coleta de fragmento para análise histológica." },
];

export default function ExamesProcedimentos() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="exames-e-procedimentos"
      ref={ref}
      className="section-pad"
      style={{ background: "var(--color-neutral-50)" }}
    >
      <div className="container-site">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "start",
          }}
        >
          {/* Left: text */}
          <div style={{ position: "sticky", top: "6rem" }}>
            <p className="eyebrow fade-up">Diagnóstico e tratamento</p>
            <h2 className="fade-up" style={{ marginBottom: "1.25rem", fontSize: "clamp(2.125rem, 3.5vw, 3.25rem)" }}>
              Exames, procedimentos e acompanhamento com foco em clareza diagnóstica
            </h2>
            <p className="fade-up" style={{ lineHeight: 1.8, marginBottom: "2rem" }}>
              Além da consulta em urologia, o atendimento também contempla exames e procedimentos
              que ajudam na investigação, no diagnóstico e na condução adequada de cada caso.
            </p>
            <div className="fade-up">
              <Link href="/exames-e-procedimentos" className="btn btn-primary" style={{ gap: "0.5rem" }}>
                Ver exames e procedimentos
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right: list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {PROCEDIMENTOS.map(({ icon: Icon, name, desc }, i) => (
              <div
                key={name}
                className="fade-up"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.125rem",
                  padding: "1.25rem 1.375rem",
                  background: "white",
                  borderRadius: "0.75rem",
                  border: "1px solid var(--color-neutral-100)",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  transitionDelay: `${i * 60}ms`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--color-accent)";
                  el.style.boxShadow = "var(--shadow-card)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--color-neutral-100)";
                  el.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    borderRadius: "0.625rem",
                    background: "var(--color-accent-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} style={{ color: "var(--color-accent-dark)" }} strokeWidth={1.75} />
                </div>
                <div>
                  <p style={{ margin: "0 0 0.25rem", fontWeight: 600, fontSize: "0.9375rem", color: "var(--color-neutral-900)" }}>{name}</p>
                  <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--color-neutral-700)", lineHeight: 1.55 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
