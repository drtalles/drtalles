"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  User, Activity, Heart, Dna,
  Microscope, Video, ShieldPlus, Users,
} from "lucide-react";

const AREAS = [
  {
    icon: User,
    label: "Saúde do homem",
    desc: "Prevenção, diagnóstico e acompanhamento integral da saúde masculina em todas as fases.",
    href: "/areas-de-atuacao#saude-do-homem",
    accent: "#1B4D6E",
  },
  {
    icon: Activity,
    label: "Urologia geral",
    desc: "Tratamento de doenças do trato urinário masculino e feminino com abordagem precisa.",
    href: "/areas-de-atuacao#urologia-geral",
    accent: "#1B4D6E",
  },
  {
    icon: Heart,
    label: "Disfunções sexuais",
    desc: "Diagnóstico e tratamento humanizado de disfunção erétil, ejaculação precoce e outros.",
    href: "/areas-de-atuacao#disfuncoes-sexuais",
    accent: "#1B4D6E",
  },
  {
    icon: Dna,
    label: "Andrologia",
    desc: "Saúde reprodutiva masculina, incluindo infertilidade e alterações hormonais.",
    href: "/areas-de-atuacao#andrologia",
    accent: "#1B4D6E",
  },
  {
    icon: Microscope,
    label: "Endourologia",
    desc: "Cirurgias minimamente invasivas para cálculos renais e obstruções do trato urinário.",
    href: "/areas-de-atuacao#endourologia",
    accent: "#1B4D6E",
  },
  {
    icon: Video,
    label: "Videolaparoscopia",
    desc: "Procedimentos laparoscópicos com alta precisão, menor trauma e recuperação acelerada.",
    href: "/areas-de-atuacao#videolaparoscopia",
    accent: "#1B4D6E",
  },
  {
    icon: ShieldPlus,
    label: "Uro-oncologia",
    desc: "Diagnóstico e tratamento de cânceres urológicos — próstata, rim, bexiga e testículo.",
    href: "/areas-de-atuacao#uro-oncologia",
    accent: "#1B4D6E",
  },
  {
    icon: Users,
    label: "Uro-ginecologia",
    desc: "Cuidado especializado em disfunções do assoalho pélvico e incontinência urinária.",
    href: "/areas-de-atuacao#uro-ginecologia",
    accent: "#1B4D6E",
  },
];

export default function AreasAtuacao() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>("[data-fadein]").forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              }, i * 65);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* Estado inicial dos cards — animados pelo IntersectionObserver */
        [data-fadein] {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }

        /* Card de área */
        .area-card {
          display: flex;
          flex-direction: column;
          gap: 0;
          text-decoration: none;
          background: #fff;
          border: 1px solid var(--color-neutral-100);
          border-radius: 1.125rem;
          overflow: hidden;
          position: relative;
          transition: box-shadow 0.24s ease, transform 0.24s ease;
        }
        .area-card:hover {
          box-shadow: 0 12px 40px rgba(27,77,110,0.13);
          transform: translateY(-4px);
        }

        /* Linha accent no topo do card — aparece no hover */
        .area-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #1B4D6E, #2EC4B6);
          opacity: 0;
          transition: opacity 0.24s ease;
        }
        .area-card:hover::before { opacity: 1; }

        /* Topo do card: ícone + número */
        .area-card-top {
          padding: 1.75rem 1.75rem 1.25rem;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        /* Ícone grande */
        .area-card-icon {
          width: 4rem;
          height: 4rem;
          border-radius: 1rem;
          background: linear-gradient(135deg, #1B4D6E 0%, #2A7AB5 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 6px 18px rgba(27,77,110,0.22);
          transition: transform 0.24s ease, box-shadow 0.24s ease;
        }
        .area-card:hover .area-card-icon {
          transform: scale(1.06);
          box-shadow: 0 8px 24px rgba(27,77,110,0.32);
        }

        /* Número ordinal discreto */
        .area-card-num {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          color: var(--color-neutral-100);
          letter-spacing: -0.04em;
          user-select: none;
          transition: color 0.24s ease;
        }
        .area-card:hover .area-card-num {
          color: rgba(46,196,182,0.18);
        }

        /* Corpo do card */
        .area-card-body {
          padding: 0 1.75rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .area-card-label {
          margin: 0;
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 1rem;
          color: var(--color-primary-dark);
          line-height: 1.3;
        }

        .area-card-desc {
          margin: 0;
          font-family: var(--font-body);
          font-size: 0.8125rem;
          color: var(--color-neutral-700);
          line-height: 1.65;
        }

        /* Rodapé do card — seta */
        .area-card-footer {
          padding: 1rem 1.75rem;
          border-top: 1px solid var(--color-neutral-100);
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-accent-dark);
          letter-spacing: 0.03em;
          transition: gap 0.24s ease;
        }
        .area-card:hover .area-card-footer { gap: 0.625rem; }

        .area-card-footer svg {
          transition: transform 0.24s ease;
          flex-shrink: 0;
        }
        .area-card:hover .area-card-footer svg { transform: translateX(3px); }

        /* Header centralizado */
        .areas-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 3.5rem;
        }
      `}</style>

      <section
        id="areas-de-atuacao"
        ref={ref}
        style={{ background: "var(--color-neutral-50)", paddingBlock: "clamp(4.5rem, 8vw, 7rem)" }}
      >
        <div className="container-site">

          {/* Header */}
          <div className="areas-header">
            <p data-fadein className="eyebrow" style={{ justifyContent: "center" }}>
              Especialidades
            </p>
            <h2 data-fadein style={{ marginBottom: "1rem" }}>
              Atuação focada em saúde do homem e urologia
            </h2>
            <p data-fadein style={{ color: "var(--color-neutral-700)", lineHeight: 1.75 }}>
              Atendimento especializado nas principais áreas da urologia, com diagnóstico
              preciso e condução individualizada de cada caso.
            </p>
          </div>

          {/* Grid de cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.25rem",
          }}>
            {AREAS.map(({ icon: Icon, label, desc, href }, i) => (
              <Link
                key={label}
                href={href}
                data-fadein
                className="area-card"
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                {/* Topo */}
                <div className="area-card-top">
                  <div className="area-card-icon">
                    <Icon size={26} color="white" strokeWidth={1.6} />
                  </div>
                  <span className="area-card-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Corpo */}
                <div className="area-card-body">
                  <p className="area-card-label">{label}</p>
                  <p className="area-card-desc">{desc}</p>
                </div>

                {/* Rodapé */}
                <div className="area-card-footer">
                  Saiba mais
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div data-fadein style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/areas-de-atuacao" className="btn btn-outline">
              Ver todas as áreas
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
