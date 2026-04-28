"use client";

import { MessageCircle } from "lucide-react";

const WA_URL = "https://wa.me/558391350081";

export default function WhatsAppButton() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      style={{
        position: "fixed",
        bottom: "1.75rem",
        right: "1.75rem",
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "3.5rem",
        height: "3.5rem",
        borderRadius: "50%",
        background: "#25D366",
        color: "#fff",
        boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
        textDecoration: "none",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
      }}
      className="wa-pulse"
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "scale(1.1)";
        el.style.boxShadow = "0 6px 28px rgba(37,211,102,0.55)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "scale(1)";
        el.style.boxShadow = "0 4px 20px rgba(37,211,102,0.45)";
      }}
    >
      <MessageCircle size={24} fill="white" stroke="none" />
    </a>
  );
}
