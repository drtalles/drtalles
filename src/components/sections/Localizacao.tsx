"use client";

import { useEffect, useRef } from "react";
import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";

const INFO = [
  {
    icon: MapPin,
    label: "Endereço",
    value: "R. Dep. Álvaro Gaudêncio, 281\nCentro – CEP: 58400-243\nCampina Grande, PB",
  },
  {
    icon: Clock,
    label: "Horários",
    value: "Segunda a sexta-feira\n07h30 às 17h30",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "(83) 3142-1505\n(83) 3142-1507\n(83) 9 8828-7705",
  },
];

export default function Localizacao() {
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
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="localizacao"
      ref={ref}
      className="section-pad"
      style={{ background: "var(--color-neutral-50)" }}
    >
      <div className="container-site">
        <div style={{ textAlign: "center", maxWidth: "500px", margin: "0 auto 3.5rem" }}>
          <p className="eyebrow fade-up" style={{ justifyContent: "center" }}>Como chegar</p>
          <h2 className="fade-up">Localização e horários</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Info column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {INFO.map(({ icon: Icon, label, value }, i) => (
              <div
                key={label}
                className="fade-up"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.125rem",
                  padding: "1.375rem 1.5rem",
                  background: "white",
                  borderRadius: "0.875rem",
                  border: "1px solid var(--color-neutral-100)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "0.75rem",
                    background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color="white" strokeWidth={1.75} />
                </div>
                <div>
                  <p
                    style={{
                      margin: "0 0 0.25rem",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-neutral-400)",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "var(--color-neutral-900)",
                      lineHeight: 1.55,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}

            <div className="fade-up">
              <a
                href="https://maps.google.com/?q=R.+Dep.+Álvaro+Gaudêncio,+281,+Centro,+Campina+Grande,+PB"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ gap: "0.5rem", fontSize: "0.875rem" }}
              >
                <MapPin size={15} />
                Abrir no Google Maps
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Map */}
          <div
            className="fade-up"
            style={{
              borderRadius: "1rem",
              overflow: "hidden",
              border: "1px solid var(--color-neutral-200)",
              aspectRatio: "4/3",
              position: "relative",
            }}
          >
            <iframe
              src="https://maps.google.com/maps?q=R.+Dep.+%C3%81lvaro+Gaud%C3%AAncio,+281,+Centro,+Campina+Grande,+PB,+58400-243&output=embed&hl=pt-BR&z=16"
              width="100%"
              height="100%"
              style={{ border: 0, position: "absolute", inset: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da clínica Dr. Talles Leandro"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
