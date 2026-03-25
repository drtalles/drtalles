"use client";

/**
 * Hero.tsx — Animação scroll cinematográfica
 *
 * ESTRATÉGIA DE DUAS CAMADAS (evita animar layout CSS):
 *
 *   Camada A — Estado inicial (absolute, centralizado):
 *     - Subtítulo "Urologista"
 *     - Nome "Dr. Talles Leandro" em tipografia grande
 *     - Especialidade
 *     - Chips centralizados
 *     - Botões centralizados
 *
 *   Camada B — Estado final (grid duas colunas, opacity 0 inicialmente):
 *     - Texto completo à esquerda
 *     - Foto do médico à direita
 *
 * TIMELINE DO SCROLL (pin ~130vh):
 *   0–20%   → Camada A visível em destaque
 *   20–45%  → Camada A sai (fade + translateY up), Camada B entra (fade in)
 *   35–60%  → Foto do médico entra pela direita
 *   55–70%  → Descrição surge
 *   68–80%  → Chips do estado final
 *   78–92%  → Botões
 *   88–100% → Trust row + card badge + orbs
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  CalendarCheck, Clock, Monitor, Stethoscope,
  ChevronDown, ExternalLink, Shield,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DOCTORALIA_URL =
  "https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande?utm_id=34199&utm_source=widget-doctor-34199&utm_medium=big&utm_campaign=&utm_content=#highlight-calendar";

const BADGES = [
  { icon: Clock,         label: "Hora marcada" },
  { icon: CalendarCheck, label: "Agendamento online" },
  { icon: Stethoscope,   label: "Saúde do homem" },
  { icon: Monitor,       label: "Cirurgia robótica" },
];

export default function Hero() {
  const wrapRef        = useRef<HTMLDivElement>(null);   // pin trigger

  // Camada A — estado inicial centralizado
  const layerARef      = useRef<HTMLDivElement>(null);
  const aEyebrowRef    = useRef<HTMLDivElement>(null);
  const aNameRef       = useRef<HTMLDivElement>(null);
  const aEspRef        = useRef<HTMLDivElement>(null);
  const aBadgesRef     = useRef<HTMLDivElement>(null);
  const aCtasRef       = useRef<HTMLDivElement>(null);

  // Camada B — estado final (grid)
  const layerBRef      = useRef<HTMLDivElement>(null);
  const bHeadingRef    = useRef<HTMLHeadingElement>(null);
  const bDescRef       = useRef<HTMLParagraphElement>(null);
  const bBadgesRef     = useRef<HTMLDivElement>(null);
  const bCtasRef       = useRef<HTMLDivElement>(null);
  const bTrustRef      = useRef<HTMLDivElement>(null);
  const photoColRef    = useRef<HTMLDivElement>(null);
  const badgeCardRef   = useRef<HTMLDivElement>(null);
  const imgRef         = useRef<HTMLDivElement>(null);   // float loop

  // Background deco
  const orbTealRef     = useRef<HTMLDivElement>(null);
  const orbBlueRef     = useRef<HTMLDivElement>(null);
  const scrollCueRef   = useRef<HTMLAnchorElement>(null);

  /* ── Float loop suave da foto ── */
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    let frame: number;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const t = (ts - start) / 1000;
      el.style.transform = `translateY(${Math.sin(t * (Math.PI / 3.5)) * 9}px)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  /* ── ScrollTrigger timeline ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // prefers-reduced-motion → pula para o estado final sem animação
    if (prefersReduced) {
      if (layerARef.current) layerARef.current.style.display = "none";
      if (layerBRef.current) {
        layerBRef.current.style.opacity = "1";
        layerBRef.current.style.pointerEvents = "auto";
      }
      [bHeadingRef, bDescRef, bBadgesRef, bCtasRef, bTrustRef, photoColRef, badgeCardRef,
        orbTealRef, orbBlueRef].forEach(r => {
        if (r.current) {
          r.current.style.opacity = "1";
          (r.current as HTMLElement).style.transform = "none";
          (r.current as HTMLElement).style.filter = "none";
        }
      });
      return;
    }

    // Mobile: sem pin, exibe estado final direto com fade-up
    const isMobile = window.innerWidth < 860;
    if (isMobile) {
      if (layerARef.current) layerARef.current.style.display = "none";
      if (layerBRef.current) {
        layerBRef.current.style.opacity = "1";
        layerBRef.current.style.pointerEvents = "auto";
      }
      const els = [
        aEyebrowRef.current, // não usado no mobile — exibimos camada B
        bHeadingRef.current, bDescRef.current, bBadgesRef.current,
        bCtasRef.current, bTrustRef.current,
      ].filter(Boolean) as HTMLElement[];
      gsap.set(els, { opacity: 0, y: 24 });
      gsap.to(els, {
        opacity: 1, y: 0, duration: 0.65, stagger: 0.10, ease: "power2.out",
        scrollTrigger: { trigger: wrapRef.current, start: "top 85%" },
      });
      return;
    }

    /* ─────────────────────────────────────
     * DESKTOP — timeline com pin
     * ───────────────────────────────────── */

    // Camada A — os elementos já estão visíveis via CSS (opacity:1 no JSX).
    // O GSAP só precisa configurar a Camada B e os orbs.
    // Não tocamos na Camada A aqui para evitar flash branco no carregamento.

    // Camada B — escondida no início, elementos deslocados para a direita
    gsap.set(layerBRef.current,   { opacity: 0, pointerEvents: "none" });
    gsap.set(bHeadingRef.current, { opacity: 0, x: 60,  y: 0 });
    gsap.set(bDescRef.current,    { opacity: 0, x: 50,  filter: "blur(3px)" });
    gsap.set(bBadgesRef.current,  { opacity: 0, x: 44 });
    gsap.set(bCtasRef.current,    { opacity: 0, x: 38 });
    gsap.set(bTrustRef.current,   { opacity: 0, x: 30 });
    gsap.set(photoColRef.current, { opacity: 0, x: 110, filter: "blur(10px)" });
    gsap.set(badgeCardRef.current,{ opacity: 0, scale: 0.85, x: 20, y: 10 });
    gsap.set(orbTealRef.current,  { scale: 0.7, opacity: 0 });
    gsap.set(orbBlueRef.current,  { scale: 0.7, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapRef.current,
        start: "top top",
        end: "+=160%",   // mais espaço para o efeito de deslizamento ser percebido
        pin: true,
        scrub: 1.6,      // scrub um pouco mais suave para valorizar o movimento
        anticipatePin: 1,
      },
    });

    /* Scroll cue some logo ao começar */
    tl.to(scrollCueRef.current, { opacity: 0, y: 8, duration: 0.08, ease: "power2.in" }, 0.04);

    /* Etapa 2 (22–40%): Camada A sai, Camada B aparece */
    tl.to(layerARef.current, {
      opacity: 0,
      y: -44,
      duration: 0.18,
      ease: "power2.in",
    }, 0.22);
    tl.set(layerARef.current, { pointerEvents: "none" }, 0.34);

    // Camada B — container fica visível
    tl.to(layerBRef.current, { opacity: 1, duration: 0.04, ease: "none" }, 0.34);
    tl.set(layerBRef.current, { pointerEvents: "auto" }, 0.34);

    // H1 desliza da direita para o lugar (começa junto com a transição)
    tl.to(bHeadingRef.current, {
      opacity: 1, x: 0,
      duration: 0.18,
      ease: "power3.out",
    }, 0.35);

    /* Etapa 3 (38–62%): Foto entra pela direita com blur→nítido */
    tl.to(photoColRef.current, {
      opacity: 1, x: 0, filter: "blur(0px)",
      duration: 0.26,
      ease: "power2.out",
    }, 0.37);

    /* Etapa 4 (55–68%): Descrição desliza da direita */
    tl.to(bDescRef.current, {
      opacity: 1, x: 0, filter: "blur(0px)",
      duration: 0.16,
      ease: "power2.out",
    }, 0.55);

    /* Etapa 5 (66–78%): Chips deslizam da direita */
    tl.to(bBadgesRef.current, {
      opacity: 1, x: 0,
      duration: 0.14,
      ease: "power2.out",
    }, 0.66);

    /* Etapa 6 (76–88%): Botões deslizam */
    tl.to(bCtasRef.current, {
      opacity: 1, x: 0,
      duration: 0.13,
      ease: "power2.out",
    }, 0.76);

    /* Etapa 7 (86–100%): Trust + card + orbs */
    tl.to(bTrustRef.current, {
      opacity: 1, x: 0,
      duration: 0.11,
      ease: "power2.out",
    }, 0.86);
    tl.to(badgeCardRef.current, {
      opacity: 1, scale: 1, x: 0, y: 0,
      duration: 0.12,
      ease: "back.out(1.5)",
    }, 0.88);
    tl.to([orbTealRef.current, orbBlueRef.current], {
      scale: 1, opacity: 1,
      duration: 0.12,
      stagger: 0.04,
      ease: "power1.out",
    }, 0.88);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  /* ── Estilos compartilhados ── */
  const eyebrowStyle: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    background: "linear-gradient(90deg, rgba(46,196,182,0.10) 0%, rgba(27,77,110,0.06) 100%)",
    border: "1px solid rgba(46,196,182,0.25)",
    borderRadius: "99px",
    padding: "0.375rem 1rem",
    marginBottom: "1rem",
  };

  const eyebrowTextStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)", fontSize: "0.75rem",
    fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
    color: "var(--color-primary)",
  };

  const dotStyle: React.CSSProperties = {
    width: "6px", height: "6px", borderRadius: "50%",
    background: "var(--color-accent)", flexShrink: 0,
    boxShadow: "0 0 6px rgba(46,196,182,0.6)",
  };

  return (
    <>
      <style>{`
        @keyframes hero-drift {
          from { background-position: 0 0; }
          to   { background-position: 56px 56px; }
        }
        @keyframes hero-bounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes ring-spin {
          from { transform: translate(50%, -50%) rotate(0deg); }
          to   { transform: translate(50%, -50%) rotate(360deg); }
        }
        @keyframes ring-spin-rev {
          from { transform: translate(50%, -50%) rotate(0deg); }
          to   { transform: translate(50%, -50%) rotate(-360deg); }
        }
        @keyframes cross-drift {
          0%, 100% { opacity: 0.16; transform: translate(0,0) rotate(45deg); }
          50%       { opacity: 0.28; transform: translate(4px,-6px) rotate(45deg); }
        }
        @keyframes plus-float {
          0%, 100% { opacity: 0.13; transform: translate(0,0); }
          50%       { opacity: 0.24; transform: translate(-5px,4px); }
        }
        @keyframes wave-slide {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes molecule-pulse {
          0%, 100% { opacity: 0.11; transform: scale(1); }
          50%       { opacity: 0.20; transform: scale(1.08); }
        }

        /* Hero wrap — alvo do pin */
        #hero-wrap {
          position: relative;
        }

        /* Stage — visual, 100dvh */
        #hero-stage {
          background: #fff;
          position: relative;
          overflow: hidden;
          height: 100dvh;
          padding-top: 76px;
          box-sizing: border-box;
        }

        /* ── Camada A: estado inicial ── */
        .hero-layer-a {
          position: absolute;
          inset: 0;
          top: 76px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding-inline: clamp(1.5rem, 8vw, 6rem);
          z-index: 2;
          pointer-events: auto;
        }

        .hero-name-big {
          font-family: var(--font-display);
          font-size: clamp(3.25rem, 8vw, 6.75rem);
          font-weight: 700;
          line-height: 1.0;
          letter-spacing: -0.03em;
          margin: 0 0 0.5rem;
        }

        .hero-esp-initial {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.8vw, 1.3125rem);
          font-weight: 400;
          color: var(--color-neutral-700);
          margin: 0 0 2rem;
        }

        .hero-badges-initial {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1.875rem;
        }

        .hero-ctas-initial {
          display: flex;
          gap: 0.875rem;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* ── Camada B: estado final (grid) ── */
        .hero-layer-b {
          position: absolute;
          inset: 0;
          top: 76px;
          z-index: 1;
          pointer-events: none;
          opacity: 0; /* escondida por padrão — GSAP controla via JS */
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          padding-inline: clamp(1.25rem, 5vw, 2.5rem);
          max-width: 1200px;
          margin: 0 auto;
          /* inset 0 já centraliza — precisamos ajustar left/right */
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          padding-block: 2rem;
          box-sizing: border-box;
        }

        .hero-text-final {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-h1-final {
          color: var(--color-primary-dark);
          margin-bottom: 1.25rem;
          line-height: 1.08;
          font-size: clamp(1.875rem, 3.6vw, 2.875rem);
          letter-spacing: -0.015em;
        }

        .hero-photo-col {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          align-self: stretch;
        }

        @media (max-width: 860px) {
          .hero-layer-a { padding-inline: 1.5rem; }
          .hero-layer-b {
            grid-template-columns: 1fr;
            left: 0; transform: none;
          }
          .hero-photo-col { display: none !important; }
          .hero-name-big  { font-size: clamp(2.5rem, 10vw, 4rem); }
        }

        /* Scroll cue */
        .hero-scroll-cue {
          position: absolute;
          bottom: 1.75rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.2rem;
          text-decoration: none;
          color: var(--color-neutral-400);
          z-index: 10;
          animation: hero-bounce 2.4s ease-in-out infinite;
        }
        .hero-scroll-cue span {
          font-size: 0.6875rem; font-family: var(--font-body);
          letter-spacing: 0.08em; text-transform: uppercase; font-weight: 500;
        }
      `}</style>

      <div id="hero-wrap" ref={wrapRef}>
        <div id="hero-stage">

          {/* ── Background ── */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage:
              "radial-gradient(circle, rgba(27,77,110,0.22) 1.2px, transparent 1.2px)",
            backgroundSize: "32px 32px",
            animation: "hero-drift 18s linear infinite",
          }} />

          <div aria-hidden ref={orbTealRef} style={{
            position: "absolute", top: "-160px", right: "-120px",
            width: "680px", height: "680px", borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(46,196,182,0.52) 0%, rgba(46,196,182,0.18) 50%, transparent 70%)",
            pointerEvents: "none",
            opacity: 0, // entra na etapa 7
          }} />

          <div aria-hidden ref={orbBlueRef} style={{
            position: "absolute", bottom: "-120px", left: "-80px",
            width: "480px", height: "480px", borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(27,77,110,0.30) 0%, transparent 65%)",
            pointerEvents: "none",
            opacity: 0, // entra na etapa 7
          }} />

          <div aria-hidden style={{
            position: "absolute", top: 0, left: 0, width: "500px", height: "500px",
            pointerEvents: "none",
            background:
              "linear-gradient(135deg, rgba(46,196,182,0.26) 0%, transparent 55%)",
          }} />

          {/* Rings */}
          {[440, 290].map((size, i) => (
            <div key={size} aria-hidden style={{
              position: "absolute", top: "50%", right: "24%",
              width: `${size}px`, height: `${size}px`, pointerEvents: "none",
              border: `1.5px ${i === 1 ? "dashed" : "solid"} rgba(${i === 1 ? "27,77,110,0.32" : "46,196,182,0.40"})`,
              borderRadius: "50%",
              animation: `ring-spin${i === 1 ? "-rev" : ""} ${i === 1 ? "28" : "40"}s linear infinite`,
              transform: "translate(50%, -50%)",
            }} />
          ))}

          {/* Cross/plus marks */}
          {[
            { top: "20%", left: "8%", size: 16, color: "rgba(46,196,182,0.82)", anim: "cross-drift 4.5s ease-in-out infinite" },
            { bottom: "30%", left: "5%", size: 12, color: "rgba(27,77,110,0.65)", anim: "plus-float 5.5s ease-in-out infinite 1.2s" },
            { top: "62%", right: "6%", size: 14, color: "rgba(46,196,182,0.72)", anim: "cross-drift 6s ease-in-out infinite 2s" },
          ].map((m, i) => (
            <div key={i} aria-hidden style={{
              position: "absolute", ...m as object,
              width: `${m.size}px`, height: `${m.size}px`, pointerEvents: "none",
              animation: m.anim,
            }}>
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "2px", background: m.color, transform: "translateY(-50%)" }} />
              <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "2px", background: m.color, transform: "translateX(-50%)" }} />
            </div>
          ))}

          {/* Molecule */}
          <div aria-hidden style={{
            position: "absolute", top: "10%", right: "3%", pointerEvents: "none",
            animation: "molecule-pulse 5s ease-in-out infinite",
          }}>
            <svg width="90" height="90" viewBox="0 0 80 80" fill="none">
              <circle cx="12" cy="12" r="5" stroke="rgba(46,196,182,0.58)" strokeWidth="1.5"/>
              <circle cx="68" cy="20" r="4" stroke="rgba(27,77,110,0.48)" strokeWidth="1.5"/>
              <circle cx="40" cy="50" r="6" stroke="rgba(46,196,182,0.52)" strokeWidth="1.5"/>
              <circle cx="20" cy="65" r="3.5" stroke="rgba(27,77,110,0.40)" strokeWidth="1.5"/>
              <circle cx="65" cy="62" r="4.5" stroke="rgba(46,196,182,0.48)" strokeWidth="1.5"/>
              <line x1="12" y1="12" x2="40" y2="50" stroke="rgba(46,196,182,0.28)" strokeWidth="1.2" strokeDasharray="3 3"/>
              <line x1="68" y1="20" x2="40" y2="50" stroke="rgba(27,77,110,0.24)" strokeWidth="1.2" strokeDasharray="3 3"/>
              <line x1="40" y1="50" x2="20" y2="65" stroke="rgba(46,196,182,0.26)" strokeWidth="1.2" strokeDasharray="3 3"/>
              <line x1="40" y1="50" x2="65" y2="62" stroke="rgba(27,77,110,0.24)" strokeWidth="1.2" strokeDasharray="3 3"/>
            </svg>
          </div>

          {/* Wave bottom */}
          <div aria-hidden style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "80px", pointerEvents: "none", overflow: "hidden",
          }}>
            <div style={{ display: "flex", animation: "wave-slide 12s linear infinite", width: "200%" }}>
              {[0, 1].map(i => (
                <svg key={i} viewBox="0 0 1440 80" preserveAspectRatio="none"
                  style={{ width: "50%", height: "80px", flexShrink: 0 }}>
                  <path d="M0,40 C180,10 360,70 540,40 C720,10 900,70 1080,40 C1260,10 1380,55 1440,40 L1440,80 L0,80 Z"
                    fill="rgba(46,196,182,0.20)" />
                  <path d="M0,55 C200,25 400,75 600,50 C800,25 1000,70 1200,50 C1320,35 1400,60 1440,55 L1440,80 L0,80 Z"
                    fill="rgba(27,77,110,0.18)" />
                </svg>
              ))}
            </div>
          </div>

          <div aria-hidden style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(27,77,110,0.10) 30%, rgba(46,196,182,0.22) 50%, rgba(27,77,110,0.10) 70%, transparent 100%)",
            pointerEvents: "none",
          }} />

          {/* ════════════════════════════════════
           * CAMADA A — Estado inicial centralizado
           * ════════════════════════════════════ */}
          <div ref={layerARef} className="hero-layer-a">

            {/* Eyebrow */}
            <div ref={aEyebrowRef} style={eyebrowStyle}>
              <span style={dotStyle} />
              <span style={eyebrowTextStyle}>Urologista · Campina Grande, PB</span>
            </div>

            {/* Nome grande com degradê */}
            <div ref={aNameRef} className="hero-name-big" style={{
              background: "linear-gradient(90deg, #1B4D6E 0%, #0F2D42 40%, #2EC4B6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Dr. Talles Leandro
            </div>

            {/* Especialidade */}
            <p ref={aEspRef} className="hero-esp-initial">
              Especialidade Urologia e Cirurgia Robótica
            </p>

            {/* Chips */}
            <div ref={aBadgesRef} className="hero-badges-initial">
              {BADGES.map(({ icon: Icon, label }) => (
                <div key={label} style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.4375rem 0.8125rem",
                  borderRadius: "0.5rem",
                  background: "var(--color-neutral-50)",
                  border: "1px solid var(--color-neutral-200)",
                }}>
                  <Icon size={12} style={{ color: "var(--color-accent-dark)" }} strokeWidth={2} />
                  <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--color-neutral-700)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs iniciais */}
            <div ref={aCtasRef} className="hero-ctas-initial">
              <a
                href={DOCTORALIA_URL}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.9375rem 1.875rem", borderRadius: "0.5rem",
                  fontSize: "1rem", fontWeight: 600, fontFamily: "var(--font-body)",
                  color: "#fff", textDecoration: "none",
                  background: "linear-gradient(135deg, #1B4D6E 0%, #2A7AB5 55%, #2EC4B6 100%)",
                  backgroundSize: "200%", backgroundPosition: "left",
                  boxShadow: "0 4px 18px rgba(27,77,110,0.28)",
                  transition: "background-position 0.4s ease, box-shadow 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => {
                  const t = e.currentTarget as HTMLElement;
                  t.style.backgroundPosition = "right";
                  t.style.boxShadow = "0 6px 24px rgba(27,77,110,0.38)";
                  t.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  const t = e.currentTarget as HTMLElement;
                  t.style.backgroundPosition = "left";
                  t.style.boxShadow = "0 4px 18px rgba(27,77,110,0.28)";
                  t.style.transform = "translateY(0)";
                }}
              >
                <CalendarCheck size={16} />
                Agendar consulta
                <ExternalLink size={13} />
              </a>
              <a
                href="#sobre"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.9375rem 1.625rem", borderRadius: "0.5rem",
                  fontSize: "1rem", fontWeight: 600, fontFamily: "var(--font-body)",
                  color: "var(--color-primary)", textDecoration: "none",
                  border: "2px solid var(--color-neutral-200)", background: "transparent",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => {
                  const t = e.currentTarget as HTMLElement;
                  t.style.borderColor = "var(--color-primary)";
                  t.style.background = "var(--color-neutral-50)";
                }}
                onMouseLeave={e => {
                  const t = e.currentTarget as HTMLElement;
                  t.style.borderColor = "var(--color-neutral-200)";
                  t.style.background = "transparent";
                }}
              >
                Conheça Dr. Talles
              </a>
            </div>
          </div>

          {/* ════════════════════════════════════
           * CAMADA B — Estado final (grid 2 colunas)
           * ════════════════════════════════════ */}
          <div ref={layerBRef} className="hero-layer-b">

            {/* Coluna esquerda — texto */}
            <div className="hero-text-final">

              {/* Eyebrow */}
              <div style={{ ...eyebrowStyle, marginBottom: "1.25rem" }}>
                <span style={dotStyle} />
                <span style={eyebrowTextStyle}>Urologista · Campina Grande, PB</span>
              </div>

              {/* H1 final */}
              <h1 ref={bHeadingRef} className="hero-h1-final">
                Saúde urológica do homem{" "}
                com atendimento{" "}
                <em style={{
                  fontStyle: "italic",
                  background: "linear-gradient(90deg, #1B4D6E 0%, #2EC4B6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  personalizado
                </em>
              </h1>

              {/* Descrição */}
              <p ref={bDescRef} style={{
                fontSize: "clamp(0.9375rem, 1.3vw, 1.0625rem)",
                color: "var(--color-neutral-700)",
                lineHeight: 1.78,
                marginBottom: "2rem",
                maxWidth: "50ch",
              }}>
                Dr. Talles Leandro é urologista em Campina Grande, com foco em saúde
                do homem, atendimento humanizado, consulta por hora marcada e cirurgia
                robótica urológica.
              </p>

              {/* Chips */}
              <div ref={bBadgesRef} style={{
                display: "flex", flexWrap: "wrap", gap: "0.5rem",
                marginBottom: "2rem",
              }}>
                {BADGES.map(({ icon: Icon, label }) => (
                  <div key={label} style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                    padding: "0.4375rem 0.8125rem", borderRadius: "0.5rem",
                    background: "var(--color-neutral-50)",
                    border: "1px solid var(--color-neutral-200)",
                  }}>
                    <Icon size={12} style={{ color: "var(--color-accent-dark)" }} strokeWidth={2} />
                    <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--color-neutral-700)" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div ref={bCtasRef} style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", alignItems: "center" }}>
                <a
                  href={DOCTORALIA_URL}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.9375rem 1.875rem", borderRadius: "0.5rem",
                    fontSize: "1rem", fontWeight: 600, fontFamily: "var(--font-body)",
                    color: "#fff", textDecoration: "none",
                    background: "linear-gradient(135deg, #1B4D6E 0%, #2A7AB5 55%, #2EC4B6 100%)",
                    backgroundSize: "200%", backgroundPosition: "left",
                    boxShadow: "0 4px 18px rgba(27,77,110,0.28)",
                    transition: "background-position 0.4s ease, box-shadow 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={e => {
                    const t = e.currentTarget as HTMLElement;
                    t.style.backgroundPosition = "right";
                    t.style.boxShadow = "0 6px 24px rgba(27,77,110,0.38)";
                    t.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    const t = e.currentTarget as HTMLElement;
                    t.style.backgroundPosition = "left";
                    t.style.boxShadow = "0 4px 18px rgba(27,77,110,0.28)";
                    t.style.transform = "translateY(0)";
                  }}
                >
                  <CalendarCheck size={16} />
                  Agendar consulta
                  <ExternalLink size={13} />
                </a>
                <a
                  href="#sobre"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.9375rem 1.625rem", borderRadius: "0.5rem",
                    fontSize: "1rem", fontWeight: 600, fontFamily: "var(--font-body)",
                    color: "var(--color-primary)", textDecoration: "none",
                    border: "2px solid var(--color-neutral-200)", background: "transparent",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={e => {
                    const t = e.currentTarget as HTMLElement;
                    t.style.borderColor = "var(--color-primary)";
                    t.style.background = "var(--color-neutral-50)";
                  }}
                  onMouseLeave={e => {
                    const t = e.currentTarget as HTMLElement;
                    t.style.borderColor = "var(--color-neutral-200)";
                    t.style.background = "transparent";
                  }}
                >
                  Conheça Dr. Talles
                </a>
              </div>

              {/* Trust row */}
              <div ref={bTrustRef} style={{
                marginTop: "1.875rem",
                display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <Shield size={14} style={{ color: "var(--color-accent-dark)" }} />
                  <span style={{ fontSize: "0.8rem", color: "var(--color-neutral-700)", fontWeight: 500 }}>
                    CRM-PB 5970
                  </span>
                </div>
                <div style={{ width: "1px", height: "14px", background: "var(--color-neutral-200)" }} />
                <span style={{ fontSize: "0.8rem", color: "var(--color-neutral-700)" }}>
                  Especialista em Urologia
                </span>
                <div style={{ width: "1px", height: "14px", background: "var(--color-neutral-200)" }} />
                <span style={{ fontSize: "0.8rem", color: "var(--color-neutral-700)" }}>
                  Campina Grande, PB
                </span>
              </div>
            </div>

            {/* Coluna direita — foto (começa invisível, entra via GSAP) */}
            <div ref={photoColRef} className="hero-photo-col" style={{ opacity: 0 }}>
              <div ref={imgRef} style={{
                position: "relative", zIndex: 1,
                width: "100%", maxWidth: "420px",
                willChange: "transform",
              }}>
                <Image
                  src="/img/dr-talles-1.png"
                  alt="Dr. Talles Leandro — Urologista em Campina Grande"
                  width={440}
                  height={560}
                  priority
                  style={{
                    width: "100%", height: "auto", display: "block",
                    filter:
                      "drop-shadow(0 32px 56px rgba(27,77,110,0.20)) drop-shadow(0 8px 16px rgba(27,77,110,0.10))",
                  }}
                />

                {/* Card flutuante (começa invisível) */}
                <div ref={badgeCardRef} style={{
                  position: "absolute", bottom: "3.5rem", left: "-2rem",
                  opacity: 0,
                  background: "rgba(255,255,255,0.96)",
                  backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(46,196,182,0.20)",
                  borderRadius: "1rem",
                  padding: "0.875rem 1.25rem",
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  boxShadow: "0 8px 32px rgba(27,77,110,0.14), 0 2px 8px rgba(46,196,182,0.08)",
                  transformOrigin: "center bottom",
                }}>
                  <div style={{
                    width: "2.5rem", height: "2.5rem", borderRadius: "50%",
                    background: "linear-gradient(135deg, #1B4D6E, #2EC4B6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, boxShadow: "0 4px 12px rgba(46,196,182,0.35)",
                  }}>
                    <Stethoscope size={14} color="white" />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: "0.6875rem", color: "var(--color-neutral-400)", lineHeight: 1, letterSpacing: "0.03em" }}>
                      Especialidade
                    </p>
                    <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 700, color: "var(--color-primary-dark)", lineHeight: 1.4 }}>
                      Urologia
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* /hero-layer-b */}

          {/* Scroll cue */}
          <a ref={scrollCueRef} href="#sobre" aria-label="Rolar para próxima seção"
            className="hero-scroll-cue">
            <span>Saiba mais</span>
            <ChevronDown size={20} />
          </a>

        </div>{/* /hero-stage */}
      </div>{/* /hero-wrap */}
    </>
  );
}
