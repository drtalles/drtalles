"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CalendarCheck, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Dr. Talles", href: "/dr-talles" },
  { label: "Cirurgia Robótica", href: "/cirurgia-robotica" },
  { label: "Áreas de Atuação", href: "/areas-de-atuacao" },
  { label: "Exames e Procedimentos", href: "/exames-e-procedimentos" },
  { label: "Blog", href: "/blog" },
];

const DOCTORALIA_URL =
  "https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande?utm_id=34199&utm_source=widget-doctor-34199&utm_medium=big&utm_campaign=&utm_content=#highlight-calendar";
const DARK_HEADER_SELECTOR = '[data-header-theme="dark"]';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [onDarkSection, setOnDarkSection] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => {
      const nextScrolled = window.scrollY > 10;
      const headerHeight = nextScrolled ? 64 : 76;
      const darkSections = Array.from(
        document.querySelectorAll<HTMLElement>(DARK_HEADER_SELECTOR)
      );

      const nextOnDarkSection = darkSections.some((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= headerHeight && rect.bottom > 0;
      });

      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
      setOnDarkSection((prev) =>
        prev === nextOnDarkSection ? prev : nextOnDarkSection
      );
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isDarkHeader = onDarkSection && !menuOpen;

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

        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          height: 76px;
          overflow: hidden;
          transition:
            height 0.28s ease,
            background 0.35s ease,
            box-shadow 0.35s ease,
            backdrop-filter 0.35s ease;
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        .site-header::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          background:
            radial-gradient(circle at 20% -40%, rgba(46,196,182,0.28) 0%, transparent 64%),
            linear-gradient(180deg, rgba(8,31,48,0.5) 0%, rgba(8,31,48,0.34) 100%);
        }

        .site-header::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.25s ease;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(27,77,110,0.18) 30%,
            rgba(46,196,182,0.28) 50%,
            rgba(27,77,110,0.18) 70%,
            transparent 100%
          );
        }

        .site-header.is-scrolled {
          height: 64px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(14px) saturate(150%);
          -webkit-backdrop-filter: blur(14px) saturate(150%);
          box-shadow:
            0 6px 24px rgba(27,77,110,0.09),
            0 1px 0 rgba(27,77,110,0.07);
        }

        .site-header.is-scrolled::after {
          opacity: 1;
        }

        .site-header.is-on-dark {
          background: rgba(8,31,48,0.42);
          backdrop-filter: blur(14px) saturate(145%);
          -webkit-backdrop-filter: blur(14px) saturate(145%);
          box-shadow: inset 0 -1px 0 rgba(255,255,255,0.16);
        }

        .site-header.is-on-dark::before {
          opacity: 1;
        }

        .site-header.is-on-dark::after {
          opacity: 1;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.2) 32%,
            rgba(125,223,215,0.35) 50%,
            rgba(255,255,255,0.2) 68%,
            transparent 100%
          );
        }

        .site-header.is-menu-open {
          height: 64px;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 4px 20px rgba(27,77,110,0.14);
        }

        .hdr-inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }

        .hdr-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }

        .hdr-logo-img {
          width: auto;
          height: 40px;
          object-fit: contain;
          transition: height 0.28s ease;
        }

        .site-header.is-scrolled .hdr-logo-img,
        .site-header.is-menu-open .hdr-logo-img {
          height: 34px;
        }

        .hdr-link {
          position: relative;
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 500;
          color: #3D4F5F;
          text-decoration: none;
          padding: 0.5rem 0.625rem;
          border-radius: 6px;
          transition: color 0.2s, background 0.2s;
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

        .hdr-link:hover {
          color: #1B4D6E;
          background: rgba(27,77,110,0.06);
        }

        .hdr-link:hover::after {
          transform: scaleX(1);
        }

        .site-header.is-on-dark .hdr-link {
          color: rgba(241,248,255,0.92);
        }

        .site-header.is-on-dark .hdr-link::after {
          background: linear-gradient(90deg, rgba(255,255,255,0.92), #7DDFD7);
        }

        .site-header.is-on-dark .hdr-link:hover {
          color: #ffffff;
          background: rgba(255,255,255,0.1);
        }

        .hdr-divider {
          width: 1px;
          height: 28px;
          margin: 0 0.75rem;
          flex-shrink: 0;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(27,77,110,0.18),
            transparent
          );
        }

        .site-header.is-on-dark .hdr-divider {
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255,255,255,0.42),
            transparent
          );
        }

        .hdr-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5625rem 1.25rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: var(--font-body);
          text-decoration: none;
          white-space: nowrap;
          color: #fff;
          border: 1px solid transparent;
          background: linear-gradient(135deg, #1B4D6E 0%, #2A7AB5 60%, #2EC4B6 100%);
          box-shadow: 0 2px 12px rgba(27,77,110,0.24);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease,
            border-color 0.2s ease;
        }

        .hdr-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(27,77,110,0.32);
        }

        .site-header.is-on-dark .hdr-cta {
          color: #fff;
          border-color: rgba(255,255,255,0.42);
          background: rgba(255,255,255,0.12);
          box-shadow: 0 10px 22px rgba(2,16,28,0.25);
        }

        .site-header.is-on-dark .hdr-cta:hover {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.58);
          box-shadow: 0 14px 26px rgba(2,16,28,0.3);
        }

        .hdr-ham {
          display: none;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.5rem;
          border: 1px solid var(--color-neutral-200);
          color: var(--color-primary);
          background: rgba(255,255,255,0.82);
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }

        .hdr-ham:hover {
          background: var(--color-neutral-50);
        }

        .site-header.is-on-dark .hdr-ham {
          color: #fff;
          border-color: rgba(255,255,255,0.34);
          background: rgba(255,255,255,0.12);
        }

        .site-header.is-on-dark .hdr-ham:hover {
          background: rgba(255,255,255,0.2);
        }

        .hdr-mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 49;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform: translateX(100%);
          transition: transform 0.38s cubic-bezier(0.4,0,0.2,1);
        }

        .hdr-mobile-menu.is-open {
          transform: translateX(0);
        }

        .hdr-mobile-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .hdr-mobile-content {
          position: relative;
          z-index: 1;
          padding: 6rem 2rem 3rem;
          overflow-y: auto;
          height: 100%;
        }

        .hdr-mobile-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .hdr-mobile-item {
          border-bottom: 1px solid rgba(27,77,110,0.08);
        }

        .hdr-mobile-link {
          display: block;
          padding: 1.125rem 0;
          font-family: var(--font-display);
          font-size: 1.625rem;
          font-weight: 600;
          color: var(--color-primary-dark);
          text-decoration: none;
        }
      `}</style>

      <header
        className={[
          "site-header",
          scrolled ? "is-scrolled" : "",
          isDarkHeader ? "is-on-dark" : "",
          menuOpen ? "is-menu-open" : "",
        ].join(" ")}
      >
        <div className="container-site hdr-inner">
          <Link
            href="/"
            aria-label="Dr. Talles Leandro - Página inicial"
            className="hdr-logo"
          >
            <Image
              src={isDarkHeader ? "/img/logo-branco.png" : "/img/logo.png"}
              alt="Dr. Talles Leandro - Urologista"
              width={160}
              height={48}
              priority
              className="hdr-logo-img"
            />
          </Link>

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

            <div className="hdr-divider" />

            <a
              href={DOCTORALIA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hdr-cta"
            >
              <CalendarCheck size={15} />
              Agendar consulta
            </a>
          </nav>

          <button
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu mobile"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="hdr-ham"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div
        className={`hdr-mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="hdr-mobile-backdrop" />

        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-80px",
            right: "-60px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(46,196,182,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-40px",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(27,77,110,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="hdr-mobile-content">
          <nav aria-label="Menu mobile">
            <ul className="hdr-mobile-list">
              {NAV_LINKS.map((link, i) => (
                <li
                  key={link.href}
                  className="hdr-mobile-item"
                  style={{
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateX(0)" : "translateX(24px)",
                    transition: `opacity 0.35s ease ${i * 0.06}s, transform 0.35s ease ${i * 0.06}s`,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="hdr-mobile-link"
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
                background:
                  "linear-gradient(135deg, #1B4D6E 0%, #2A7AB5 60%, #2EC4B6 100%)",
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
