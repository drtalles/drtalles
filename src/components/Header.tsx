"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, CalendarCheck } from "lucide-react";

const NAV_LINKS = [
  { label: "Início",                  href: "/" },
  { label: "Dr. Talles",              href: "/dr-talles" },
  { label: "Cirurgia Robótica",       href: "/cirurgia-robotica" },
  { label: "Áreas de Atuação",        href: "/areas-de-atuacao" },
  { label: "Exames e Procedimentos",  href: "/exames-e-procedimentos" },
  { label: "Blog",                    href: "/blog" },
];

const DOCTORALIA_URL =
  "https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande?utm_id=34199&utm_source=widget-doctor-34199&utm_medium=big&utm_campaign=&utm_content=#highlight-calendar";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @media (max-width: 960px) {
          .hdr-nav  { display: none !important; }
          .hdr-ham  { display: flex !important; }
        }
        @media (min-width: 961px) {
          .hdr-ham  { display: none !important; }
        }

        /* Animated dot grid */
        @keyframes hdr-drift {
          0%   { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }

        /* Top accent stripe shimmer */
        @keyframes hdr-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* Nav link underline slide */
        .hdr-link {
          position: relative;
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 500;
          color: #3D4F5F;
          text-decoration: none;
          padding: 0.5rem 0.625rem;
          border-radius: 6px;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .hdr-link::after {
          content: "";
          position: absolute;
          bottom: 2px;
          left: 0.625rem;
          right: 0.625rem;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #1B4D6E, #2EC4B6);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .hdr-link:hover { color: #1B4D6E; }
        .hdr-link:hover::after { transform: scaleX(1); }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          overflow: "hidden",
          transition: "height 0.3s ease, box-shadow 0.3s ease, background 0.4s ease, backdrop-filter 0.4s ease",
          height: scrolled ? "64px" : "76px",
          background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled
            ? "0 4px 24px rgba(27,77,110,0.10), 0 1px 0 rgba(27,77,110,0.06)"
            : "none",
        }}
      >
        {/* ── Decorative background layers ── */}

        {/* Animated micro dot grid — só visível após scroll */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(27,77,110,0.07) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          animation: "hdr-drift 8s linear infinite",
          opacity: scrolled ? 0.5 : 0,
          transition: "opacity 0.4s",
        }} />

        {/* Top-left teal glow orb */}
        <div aria-hidden style={{
          position: "absolute", top: "-60px", left: "-40px",
          width: "180px", height: "180px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(46,196,182,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Right accent gradient */}
        <div aria-hidden style={{
          position: "absolute", top: 0, right: 0, bottom: 0,
          width: "320px",
          background: "linear-gradient(to left, rgba(27,77,110,0.045) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* Top accent stripe — ultra thin, colorful */}
        <div aria-hidden style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #1B4D6E 0%, #2A7AB5 30%, #2EC4B6 55%, #2A7AB5 75%, #1B4D6E 100%)",
          backgroundSize: "300% 100%",
          animation: "hdr-shimmer 6s ease-in-out infinite",
          pointerEvents: "none",
          opacity: 0.85,
        }} />

        {/* Bottom hairline with gradient — só visível após scroll */}
        <div aria-hidden style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(46,196,182,0.35) 30%, rgba(27,77,110,0.3) 70%, transparent 100%)",
          pointerEvents: "none",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 0.4s ease",
        }} />

        {/* ── Nav content ── */}
        <div
          className="container-site"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Dr. Talles Leandro — Página inicial"
            style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
          >
            <Image
              src="/img/logo.png"
              alt="Dr. Talles Leandro — Urologista"
              width={160}
              height={48}
              priority
              style={{
                height: scrolled ? "34px" : "40px",
                width: "auto",
                objectFit: "contain",
                transition: "height 0.3s ease",
              }}
            />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Navegação principal"
            className="hdr-nav"
            style={{ display: "flex", alignItems: "center", gap: "0.125rem" }}
          >
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hdr-link">
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            <div style={{
              width: "1px", height: "28px",
              background: "linear-gradient(to bottom, transparent, rgba(27,77,110,0.15), transparent)",
              margin: "0 0.75rem",
              flexShrink: 0,
            }} />

            <a
              href={DOCTORALIA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5625rem 1.25rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                color: "#fff",
                textDecoration: "none",
                background: "linear-gradient(135deg, #1B4D6E 0%, #2A7AB5 60%, #2EC4B6 100%)",
                backgroundSize: "200% 200%",
                backgroundPosition: "left",
                boxShadow: "0 2px 12px rgba(27,77,110,0.25)",
                transition: "background-position 0.4s ease, box-shadow 0.2s ease, transform 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundPosition = "right";
                el.style.boxShadow = "0 4px 20px rgba(27,77,110,0.35)";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundPosition = "left";
                el.style.boxShadow = "0 2px 12px rgba(27,77,110,0.25)";
                el.style.transform = "translateY(0)";
              }}
            >
              <CalendarCheck size={15} />
              Agendar consulta
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="hdr-ham"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.5rem",
              background: menuOpen ? "var(--color-neutral-100)" : "transparent",
              border: "1px solid var(--color-neutral-200)",
              cursor: "pointer",
              color: "var(--color-primary)",
              transition: "background 0.18s",
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 49,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Backdrop */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
        }} />
        {/* Decoration */}
        <div aria-hidden style={{
          position: "absolute", top: "-80px", right: "-60px",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(46,196,182,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div aria-hidden style={{
          position: "absolute", bottom: "-60px", left: "-40px",
          width: "240px", height: "240px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(27,77,110,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, padding: "6rem 2rem 3rem", overflowY: "auto", height: "100%" }}>
          <nav aria-label="Menu mobile">
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {NAV_LINKS.map((link, i) => (
                <li
                  key={link.href}
                  style={{
                    borderBottom: "1px solid rgba(27,77,110,0.08)",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateX(0)" : "translateX(24px)",
                    transition: `opacity 0.35s ease ${i * 0.06}s, transform 0.35s ease ${i * 0.06}s`,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      padding: "1.125rem 0",
                      fontFamily: "var(--font-display)",
                      fontSize: "1.625rem",
                      fontWeight: 600,
                      color: "var(--color-primary-dark)",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div style={{ marginTop: "2.5rem" }}>
            <a
              href={DOCTORALIA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.625rem",
                width: "100%",
                padding: "1rem",
                borderRadius: "0.625rem",
                fontSize: "1rem",
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                color: "#fff",
                textDecoration: "none",
                background: "linear-gradient(135deg, #1B4D6E 0%, #2A7AB5 60%, #2EC4B6 100%)",
                boxShadow: "0 4px 20px rgba(27,77,110,0.25)",
              }}
            >
              <CalendarCheck size={18} />
              Agendar consulta
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
