"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const DEPOIMENTOS = [
  {
    nome: "A F",
    cargo: "Paciente",
    foto: "/depoimentos/af.png",
    texto: "Profissional de extrema qualidade, muito atencioso, amigo e compenetrado na avaliação. Nota 10, indico sem questionar!",
    estrelas: 5,
  },
  {
    nome: "A.I",
    cargo: "Paciente",
    foto: null,
    texto: "Ótimo medico atencioso demais vale a pena, continue assim",
    estrelas: 5,
  },
  {
    nome: "Franklin da Silva Morais",
    cargo: "Paciente",
    foto: null,
    texto: "Ótimo atendimento, atencioso e transparente nas explicações",
    estrelas: 5,
  },
  {
    nome: "E.",
    cargo: "Paciente",
    foto: null,
    texto: "Médico ótimo e experiente, passa muita tranquilidade durante a consulta.",
    estrelas: 5,
  },
  {
    nome: "Teresinha Barbosa Lins",
    cargo: "Paciente",
    foto: null,
    texto: "Excelente atendimento, explicações perfeitas, muito pontual",
    estrelas: 5,
  },
  {
    nome: "Maria de Lourdes Brito",
    cargo: "Paciente",
    foto: null,
    texto: "Muito bem atendida, ótimo médico, muito atencioso.",
    estrelas: 5,
  },
  {
    nome: "Franco",
    cargo: "Paciente",
    foto: null,
    texto: "Ótimo profissional, atencioso e muito dedicado a explicar e sanar qualquer dúvida. Adorei, recomendo muito!",
    estrelas: 5,
  },
  {
    nome: "Bruno",
    cargo: "Paciente",
    foto: null,
    texto: "Super prestativo, e ótimo profissional. Faz todo acompanhamento devidamente.",
    estrelas: 5,
  },
  {
    nome: "Junior Leite",
    cargo: "Paciente",
    foto: null,
    texto: "Nos dar bastante atenção, um bom profissional e o melhor de tudo, bem pontual",
    estrelas: 5,
  },
  {
    nome: "IDP",
    cargo: "Paciente",
    foto: null,
    texto: "Excelente profissional. Atende de forma que o paciente sinta confiança",
    estrelas: 5,
  },
  {
    nome: "Eduardo Washington",
    cargo: "Paciente",
    foto: "/depoimentos/eduardo-washington.png",
    texto: "Um excelente médico, profissional e, principalmente, amigo. Trata o trabalho com seriedade e cativa o paciente com sua empatia. Muito satisfeito com seu atendimento, nota 10!",
    estrelas: 5,
  },
  {
    nome: "Jacqueline Vieira",
    cargo: "Paciente",
    foto: "/depoimentos/jacqueline-vieira.png",
    texto: "Excelente médico! Atencioso, explica tudo direitinho e deixa o paciente super à vontade. Recomendo, sem dúvidas, o melhor urologista de Campina Grande.",
    estrelas: 5,
  },
  {
    nome: "Jaqueline Luciano",
    cargo: "Paciente",
    foto: null,
    texto: "Um excelente médico. Atendeu meu pai super bem, um médico que passa tranquilidade para os pacientes, explica o problema sem por medo no paciente.",
    estrelas: 5,
  },
  {
    nome: "Rê CAlves",
    cargo: "Paciente",
    foto: null,
    texto: "Desde a recepção temos um tratamento diferenciado e de excelência. Um médico com atendimento humanizado, super atencioso, pontual e que tira todas as suas dúvidas. Saí do consultório com meu esposo, satisfeitos com o atendimento, o procedimento feito e muito mais pelos esclarecimentos.",
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

function Avatar({ nome, foto }: { nome: string; foto: string | null }) {
  const initials = nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  if (foto) {
    return (
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
          src={foto}
          alt={nome}
          width={44}
          height={44}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: "2.75rem",
        height: "2.75rem",
        borderRadius: "50%",
        flexShrink: 0,
        background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700,
        fontSize: "0.875rem",
        letterSpacing: "0.02em",
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}

const VISIBLE = 4;

export default function Depoimentos() {
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = DEPOIMENTOS.length;
  const maxIndex = total - VISIBLE;

  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);
  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, maxIndex)), [maxIndex]);

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

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, maxIndex]);

  const cardWidthPct = 100 / VISIBLE;

  return (
    <section
      id="depoimentos"
      ref={ref}
      style={{ background: "#fff", padding: "5rem 0 4rem" }}
    >
      {/* Header — contained */}
      <div className="container-site">
        <div className="fade-up" style={{ textAlign: "center", margin: "0 auto 3.5rem" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>Avaliações</p>
          <h2 style={{ marginBottom: "1rem", fontSize: "clamp(2.125rem, 3.5vw, 3.25rem)", whiteSpace: "nowrap" }}>
            Confiança construída no atendimento
          </h2>
          <p style={{ margin: "0 auto", color: "var(--color-neutral-700)", whiteSpace: "nowrap" }}>
            O atendimento próximo, claro e cuidadoso se reflete na experiência dos pacientes.
          </p>
        </div>
      </div>

      {/* Full-width carousel */}
      <div
        className="fade-up"
        style={{ width: "100%", overflow: "hidden", position: "relative" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          style={{
            display: "flex",
            transform: `translateX(-${current * cardWidthPct}%)`,
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {DEPOIMENTOS.map((dep, i) => (
            <div
              key={i}
              style={{
                minWidth: `${cardWidthPct}%`,
                padding: "0.375rem",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  background: "var(--color-neutral-50)",
                  border: "1px solid var(--color-neutral-100)",
                  borderRadius: "1.25rem",
                  padding: "clamp(1.5rem, 3vw, 2.25rem)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                  height: "100%",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                    lineHeight: 1.65,
                    color: "var(--color-neutral-900)",
                    fontStyle: "italic",
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {dep.texto}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <Avatar nome={dep.nome} foto={dep.foto} />
                  <div>
                    <p style={{ margin: "0 0 0.2rem", fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-neutral-900)" }}>
                      {dep.nome}
                    </p>
                    <p style={{ margin: "0 0 0.25rem", fontSize: "0.8125rem", color: "var(--color-neutral-400)" }}>
                      {dep.cargo}
                    </p>
                    <Stars count={dep.estrelas} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation — contained */}
      <div className="container-site">
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
            disabled={current === 0}
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
              cursor: current === 0 ? "default" : "pointer",
              color: current === 0 ? "var(--color-neutral-300)" : "var(--color-primary)",
              transition: "border-color 0.18s, background 0.18s",
              opacity: current === 0 ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (current === 0) return;
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
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Ir para grupo ${i + 1}`}
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
            disabled={current === maxIndex}
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
              cursor: current === maxIndex ? "default" : "pointer",
              color: current === maxIndex ? "var(--color-neutral-300)" : "var(--color-primary)",
              transition: "border-color 0.18s, background 0.18s",
              opacity: current === maxIndex ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (current === maxIndex) return;
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

        {/* Links externos */}
        <div style={{ textAlign: "center", marginTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          <a
            href="https://www.google.com/search?q=dr+talles+leandro+urologista&oq=dr+talles+leandro+&gs_lcrp=EgZjaHJvbWUqBggBECMYJzIKCAAQRRgWGB4YOTIGCAEQIxgnMgYIAhAjGCcyCAgDEAAYFhgeMggIBBAAGBYYHjIGCAUQRRg9MgYIBhBFGDwyBggHEEUYPNIBCDc0MjJqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#"
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
            Ver avaliações no Google
            <ExternalLink size={13} />
          </a>
          <span style={{ width: "1px", height: "1rem", background: "var(--color-neutral-200)", display: "inline-block" }} aria-hidden />
          <a
            href="https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande?utm_id=34199&utm_source=widget-doctor-34199&utm_medium=big&utm_campaign=&utm_content=#profile-reviews"
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
            Ver avaliações no Doctoralia
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
