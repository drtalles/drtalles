"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const DEPOIMENTOS = [
  {
    nome: "Eduardo Washington",
    cargo: "Paciente",
    foto: "/depoimentos/eduardo-washington.png",
    texto: "Um excelente médico, profissional e principalmente amigo. Trata com seriedade o trabalho e cativa o paciente com sua empatia. Muito satisfeito em seu atendimento, nota 10!",
    estrelas: 5,
  },
  {
    nome: "Jacqueline Vieira",
    cargo: "Paciente",
    foto: "/depoimentos/jacqueline-vieira.png",
    texto: "Exceelente médico! Atencioso, explica tudo direitinho e deixa super a vontade. Recomendo sem dúvidas o melhor urologista de Campina Grande.",
    estrelas: 5,
  },
  {
    nome: "A F",
    cargo: "Paciente",
    foto: "/depoimentos/af.png",
    texto: "Profissional de extrema qualidade muito atencioso, amigo, compenetrado na avaliação. Nota 10 eu indico sem questionar !",
    estrelas: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }} aria-label={`${count} estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < count ? "#F59E0B" : "none"}
          style={{ color: "#F59E0B" }}
        />
      ))}
    </div>
  );
}

export default function Depoimentos() {
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const total = DEPOIMENTOS.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 110);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % total), 5000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section
      id="depoimentos"
      ref={ref}
      className="section-pad"
      style={{ background: "#fff" }}
    >
      <div className="container-site">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 3.5rem" }}>
          <p className="eyebrow fade-up" style={{ justifyContent: "center" }}>Avaliações</p>
          <h2 className="fade-up" style={{ marginBottom: "1rem", fontSize: "clamp(2.125rem, 3.5vw, 3.25rem)" }}>
            Confiança construída no atendimento
          </h2>
          <p className="fade-up" style={{ margin: "0 auto", color: "var(--color-neutral-700)" }}>
            O atendimento próximo, claro e cuidadoso se reflete na experiência dos pacientes.
          </p>
        </div>

        {/* Carousel */}
        <div className="fade-up" style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
          {/* Slides */}
          <div style={{ overflow: "hidden", borderRadius: "1.25rem" }}>
            <div
              style={{
                display: "flex",
                transform: `translateX(-${current * 100}%)`,
                transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {DEPOIMENTOS.map((dep, i) => (
                <div
                  key={i}
                  style={{
                    minWidth: "100%",
                    padding: "clamp(2rem, 5vw, 3.5rem)",
                    background: "var(--color-neutral-50)",
                    border: "1px solid var(--color-neutral-100)",
                    borderRadius: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  {/* Quote mark */}
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "5rem",
                      lineHeight: 0.6,
                      color: "var(--color-accent)",
                      opacity: 0.35,
                      userSelect: "none",
                    }}
                    aria-hidden
                  >
                    &ldquo;
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                      lineHeight: 1.65,
                      color: "var(--color-neutral-900)",
                      fontStyle: "italic",
                      margin: 0,
                    }}
                  >
                    {dep.texto}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div
                      style={{
                        width: "2.75rem",
                        height: "2.75rem",
                        borderRadius: "50%",
                        overflow: "hidden",
                        flexShrink: 0,
                        background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
                      }}
                    >
                      <Image
                        src={dep.foto}
                        alt={dep.nome}
                        width={44}
                        height={44}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <p style={{ margin: "0 0 0.25rem", fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-neutral-900)" }}>{dep.nome}</p>
                      <p style={{ margin: "0 0 0.25rem", fontSize: "0.8125rem", color: "var(--color-neutral-400)" }}>{dep.cargo}</p>
                      <Stars count={dep.estrelas} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <button
              onClick={prev}
              aria-label="Depoimento anterior"
              style={{
                width: "2.75rem",
                height: "2.75rem",
                borderRadius: "50%",
                border: "2px solid var(--color-neutral-200)",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--color-primary)",
                transition: "border-color 0.18s, background 0.18s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                (e.currentTarget as HTMLElement).style.background = "var(--color-neutral-50)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-neutral-200)";
                (e.currentTarget as HTMLElement).style.background = "white";
              }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {DEPOIMENTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Ir para depoimento ${i + 1}`}
                  aria-current={i === current}
                  style={{
                    width: i === current ? "1.75rem" : "0.5rem",
                    height: "0.5rem",
                    borderRadius: "99px",
                    background: i === current ? "var(--color-accent)" : "var(--color-neutral-200)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "width 0.3s ease, background 0.3s ease",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Próximo depoimento"
              style={{
                width: "2.75rem",
                height: "2.75rem",
                borderRadius: "50%",
                border: "2px solid var(--color-neutral-200)",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--color-primary)",
                transition: "border-color 0.18s, background 0.18s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                (e.currentTarget as HTMLElement).style.background = "var(--color-neutral-50)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-neutral-200)";
                (e.currentTarget as HTMLElement).style.background = "white";
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Link to Google */}
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.875rem",
                color: "var(--color-primary-light)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Ver todas as avaliações no Google
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
