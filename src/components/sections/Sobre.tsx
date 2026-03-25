"use client";

/**
 * Sobre.tsx — Layout fiel à referência:
 *   - Coluna esquerda fina (~40%) com eyebrow, título, 3 parágrafos e CTA
 *   - Coluna direita larga (~60%) com imagem sem borda/background/card
 *   - Sem marca d'água (o nome já vem na própria imagem)
 *   - Sem grid de stats
 *
 * TIMELINE (ScrollTrigger pinned ~120vh):
 *   0–16%  → Eyebrow + título da esquerda
 *   14–44% → Imagem entra pela direita com blur→nítido
 *   48–68% → Parágrafos em stagger da esquerda
 *   70–88% → Botão CTA
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Sobre() {
  const wrapRef    = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null);
  const p1Ref      = useRef<HTMLParagraphElement>(null);
  const p2Ref      = useRef<HTMLParagraphElement>(null);
  const p3Ref      = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      [eyebrowRef, headingRef, photoRef, p1Ref, p2Ref, p3Ref, ctaRef].forEach(r => {
        if (r.current) {
          r.current.style.opacity = "1";
          (r.current as HTMLElement).style.transform = "none";
          (r.current as HTMLElement).style.filter = "none";
        }
      });
      return;
    }

    const isMobile = window.innerWidth < 860;
    if (isMobile) {
      const els = [
        eyebrowRef.current, headingRef.current, photoRef.current,
        p1Ref.current, p2Ref.current, p3Ref.current, ctaRef.current,
      ].filter(Boolean) as HTMLElement[];
      gsap.set(els, { opacity: 0, y: 24 });
      gsap.to(els, {
        opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease: "power2.out",
        scrollTrigger: { trigger: wrapRef.current, start: "top 80%" },
      });
      return;
    }

    /* ── Estado inicial ── */
    gsap.set(eyebrowRef.current, { opacity: 0, x: -36 });
    gsap.set(headingRef.current, { opacity: 0, x: -48 });
    gsap.set(photoRef.current,   { opacity: 0, x: 100, filter: "blur(10px)" });
    gsap.set(p1Ref.current,      { opacity: 0, x: -40 });
    gsap.set(p2Ref.current,      { opacity: 0, x: -34 });
    gsap.set(p3Ref.current,      { opacity: 0, x: -28 });
    gsap.set(ctaRef.current,     { opacity: 0, x: -24 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 1.6,
        anticipatePin: 1,
      },
    });

    /* 0–16%: Eyebrow + título da esquerda */
    tl.to(eyebrowRef.current, { opacity: 1, x: 0, duration: 0.10, ease: "power2.out" }, 0.02);
    tl.to(headingRef.current, { opacity: 1, x: 0, duration: 0.14, ease: "power3.out" }, 0.06);

    /* 14–46%: Foto entra pela direita */
    tl.to(photoRef.current, {
      opacity: 1, x: 0, filter: "blur(0px)", duration: 0.32, ease: "power2.out",
    }, 0.13);

    /* 48–70%: Parágrafos em stagger */
    tl.to(p1Ref.current, { opacity: 1, x: 0, duration: 0.14, ease: "power2.out" }, 0.48);
    tl.to(p2Ref.current, { opacity: 1, x: 0, duration: 0.13, ease: "power2.out" }, 0.56);
    tl.to(p3Ref.current, { opacity: 1, x: 0, duration: 0.12, ease: "power2.out" }, 0.63);

    /* 72–88%: CTA */
    tl.to(ctaRef.current, { opacity: 1, x: 0, duration: 0.12, ease: "power2.out" }, 0.72);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
      <style>{`
        #sobre-wrap { position: relative; }

        #sobre-stage {
          background: linear-gradient(135deg, #0F2D42 0%, #1B4D6E 55%, #1d6b8a 100%);
          position: relative;
          overflow: hidden;
          height: 100dvh;
          display: flex;
          align-items: stretch; /* grid estica até as bordas */
          box-sizing: border-box;
        }

        /* Textura pontilhada sutil */
        #sobre-stage::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        /*
         * Grid: coluna de texto fina (40%) + coluna de foto larga (60%)
         * A foto ocupa todo o espaço disponível sem container extra
         */
        .sobre-grid {
          display: grid;
          grid-template-columns: 40fr 60fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: stretch; /* ambas as colunas esticam até o topo/base */
          position: relative;
          z-index: 1;
          width: 100%;
        }

        /* Coluna da foto — imagem nivelada ao rodapé, espaço no topo */
        .sobre-photo-col {
          position: relative;
          align-self: stretch;
          display: flex;
          align-items: flex-end; /* ancora na base */
          overflow: hidden;
          padding-top: 3rem;   /* espaço acima da cabeça */
        }

        .sobre-photo-col img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: bottom center;
          display: block;
        }

        @media (max-width: 860px) {
          .sobre-grid {
            grid-template-columns: 1fr;
            padding-block: 3rem;
          }
          .sobre-photo-col {
            align-self: auto;
            max-height: 60vw;
          }
          .sobre-photo-col img { object-fit: cover; }
        }

        /* Eyebrow linha + texto */
        .sobre-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-body);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: 1.25rem;
        }
        .sobre-eyebrow::before {
          content: "";
          display: block;
          width: 2rem;
          height: 1.5px;
          background: var(--color-accent);
          flex-shrink: 0;
        }
      `}</style>

      <section id="sobre-wrap" ref={wrapRef}>
        <div id="sobre-stage">
          <div
            className="container-site"
            style={{ width: "100%", height: "100%", display: "flex", alignItems: "stretch" }}
          >
            <div className="sobre-grid">

              {/* ── Coluna esquerda — texto ── */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingBlock: "4rem" }}>

                <p ref={eyebrowRef} className="sobre-eyebrow">
                  Sobre o médico
                </p>

                <h2
                  ref={headingRef}
                  style={{
                    color: "#fff",
                    marginBottom: "1.75rem",
                    fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)",
                    lineHeight: 1.12,
                    letterSpacing: "-0.015em",
                  }}
                >
                  Experiência, escuta e precisão no cuidado urológico
                </h2>

                <p ref={p1Ref} style={{
                  marginBottom: "1rem", lineHeight: 1.82,
                  color: "rgba(255,255,255,0.74)",
                  fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
                }}>
                  O cuidado com a saúde urológica exige atenção individual, clareza
                  no diagnóstico e segurança na condução de cada caso.
                </p>
                <p ref={p2Ref} style={{
                  marginBottom: "1rem", lineHeight: 1.82,
                  color: "rgba(255,255,255,0.74)",
                  fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
                }}>
                  Ao longo da sua trajetória, Dr. Talles Leandro construiu uma atuação
                  marcada pelo atendimento humano, pela proximidade com o paciente e
                  pelo compromisso com decisões médicas bem conduzidas.
                </p>
                <p ref={p3Ref} style={{
                  marginBottom: "2.25rem", lineHeight: 1.82,
                  color: "rgba(255,255,255,0.74)",
                  fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
                }}>
                  Hoje, esse trabalho se fortalece ainda mais com a ampliação da sua
                  atuação em cirurgia robótica urológica, sempre com foco em critério,
                  responsabilidade e indicação adequada para cada caso.
                </p>

                <div ref={ctaRef}>
                  <a href="/dr-talles" className="btn btn-accent">
                    Conheça a trajetória do Dr. Talles
                  </a>
                </div>
              </div>

              {/* ── Coluna direita — foto sem container, sem borda ── */}
              <div ref={photoRef} className="sobre-photo-col">
                <Image
                  src="/img/dr-talles-2.png"
                  alt="Dr. Talles Leandro"
                  width={700}
                  height={900}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "bottom center",
                    display: "block",
                    // sem borderRadius, sem background, sem sombra
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
