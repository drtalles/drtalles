"use client";

/**
 * CirurgiaRobotica.tsx — Layout fiel à referência:
 *   - Imagem colada às bordas esquerda/topo/baixo do viewport (sem container)
 *   - Conteúdo de texto à direita
 *   - Fundo claro (off-white)
 *   - Sem grid de cards/tópicos
 *
 * TIMELINE (ScrollTrigger pinned ~120vh):
 *   0–22%  → Imagem entra pela esquerda com blur
 *   18–36% → Eyebrow + título da direita
 *   34–56% → Parágrafos em stagger
 *   56–72% → Botão CTA
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CirurgiaRobotica() {
  const wrapRef    = useRef<HTMLElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const p1Ref      = useRef<HTMLParagraphElement>(null);
  const p2Ref      = useRef<HTMLParagraphElement>(null);
  const p3Ref      = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      [photoRef, eyebrowRef, headingRef, p1Ref, p2Ref, p3Ref, ctaRef].forEach(r => {
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
        photoRef.current, eyebrowRef.current, headingRef.current,
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
    gsap.set(photoRef.current,   { opacity: 0, x: -80, filter: "blur(10px)" });
    gsap.set(eyebrowRef.current, { opacity: 0, x: 44 });
    gsap.set(headingRef.current, { opacity: 0, x: 52 });
    gsap.set(p1Ref.current,      { opacity: 0, x: 40 });
    gsap.set(p2Ref.current,      { opacity: 0, x: 34 });
    gsap.set(p3Ref.current,      { opacity: 0, x: 28 });
    gsap.set(ctaRef.current,     { opacity: 0, x: 24 });

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

    /* 0–22%: Imagem entra pela esquerda */
    tl.to(photoRef.current, {
      opacity: 1, x: 0, filter: "blur(0px)", duration: 0.22, ease: "power2.out",
    }, 0.00);

    /* 18–36%: Eyebrow + título */
    tl.to(eyebrowRef.current, { opacity: 1, x: 0, duration: 0.10, ease: "power2.out" }, 0.18);
    tl.to(headingRef.current, { opacity: 1, x: 0, duration: 0.14, ease: "power3.out" }, 0.22);

    /* 34–58%: Parágrafos em stagger */
    tl.to(p1Ref.current, { opacity: 1, x: 0, duration: 0.14, ease: "power2.out" }, 0.34);
    tl.to(p2Ref.current, { opacity: 1, x: 0, duration: 0.13, ease: "power2.out" }, 0.43);
    tl.to(p3Ref.current, { opacity: 1, x: 0, duration: 0.12, ease: "power2.out" }, 0.51);

    /* 58–72%: CTA */
    tl.to(ctaRef.current, { opacity: 1, x: 0, duration: 0.12, ease: "power2.out" }, 0.58);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
      <style>{`
        #robotica-wrap { position: relative; }

        #robotica-stage {
          background: #F4F6F8;
          position: relative;
          overflow: hidden;
          height: 100dvh;
          display: flex;
          align-items: stretch;
          box-sizing: border-box;
        }

        /*
         * Duas colunas: imagem ocupa 48% colada às 3 bordas (esq/topo/baixo),
         * texto ocupa 52% com padding interno
         */
        .robotica-layout {
          display: grid;
          grid-template-columns: 48fr 52fr;
          width: 100%;
          height: 100%;
        }

        /* Foto: zero espaçamento, cola ao browser */
        .robotica-photo-col {
          position: relative;
          overflow: hidden;
          height: 100%;
        }

        /* Texto: padding interno confortável */
        .robotica-text-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-block: 5rem;
          padding-inline: clamp(2.5rem, 5vw, 5rem);
        }

        .robotica-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-body);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent-dark);
          margin-bottom: 1.25rem;
        }
        .robotica-eyebrow::before {
          content: "";
          display: block;
          width: 2rem;
          height: 1.5px;
          background: var(--color-accent-dark);
          flex-shrink: 0;
        }

        @media (max-width: 860px) {
          .robotica-layout {
            grid-template-columns: 1fr;
            grid-template-rows: 55vw 1fr;
          }
          .robotica-photo-col { height: 100%; }
          .robotica-text-col {
            padding-block: 2.5rem;
            padding-inline: 1.5rem;
          }
        }
      `}</style>

      <section id="robotica-wrap" ref={wrapRef}>
        <div id="robotica-stage">
          <div className="robotica-layout">

            {/* ── Coluna esquerda — foto colada às bordas ── */}
            <div ref={photoRef} className="robotica-photo-col">
              <Image
                src="/img/dr-talles-3.png"
                alt="Dr. Talles Leandro com sistema de cirurgia robótica"
                fill
                priority
                sizes="48vw"
                style={{ objectFit: "cover", objectPosition: "center center" }}
              />
            </div>

            {/* ── Coluna direita — texto ── */}
            <div className="robotica-text-col">

              <p ref={eyebrowRef} className="robotica-eyebrow">
                Diferencial tecnológico
              </p>

              <h2
                ref={headingRef}
                style={{
                  color: "var(--color-primary-dark)",
                  marginBottom: "1.75rem",
                  fontSize: "clamp(2.125rem, 3.5vw, 3.25rem)",
                  lineHeight: 1.10,
                  letterSpacing: "-0.015em",
                }}
              >
                Uma nova etapa em cirurgia robótica urológica
              </h2>

              <p ref={p1Ref} style={{
                marginBottom: "1rem", lineHeight: 1.82,
                color: "var(--color-neutral-700)",
                fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
              }}>
                A cirurgia robótica representa um avanço importante na urologia,
                especialmente em casos selecionados de maior complexidade.
              </p>

              <p ref={p2Ref} style={{
                marginBottom: "1rem", lineHeight: 1.82,
                color: "var(--color-neutral-700)",
                fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
              }}>
                Com certificação para atuação em cirurgia robótica urológica, Dr. Talles
                inicia uma nova etapa da sua trajetória, ampliando sua abordagem cirúrgica
                com foco especial em casos urológicos oncológicos, especialmente próstata e rins.
              </p>

              <p ref={p3Ref} style={{
                marginBottom: "2.25rem", lineHeight: 1.82,
                color: "var(--color-neutral-700)",
                fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
              }}>
                Precisão milimétrica, menor trauma cirúrgico, recuperação mais rápida e
                visão 3D ampliada — tecnologia a serviço de um cuidado mais seguro.
              </p>

              <div ref={ctaRef}>
                <a
                  href="/cirurgia-robotica"
                  className="btn btn-primary"
                  style={{ gap: "0.5rem" }}
                >
                  Entenda como funciona
                  <ArrowRight size={16} />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
