// src/lib/analytics.ts

// Declaração de tipo para window.gtag.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Dispara um evento GA4 de forma segura (SSR-safe e à prova de gtag ausente).
 */
export function trackEvent(eventName: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[analytics] gtag indisponível ao tentar disparar "${eventName}"`);
    }
    return;
  }
  window.gtag("event", eventName, params);
  if (process.env.NODE_ENV !== "production") {
    console.log(`[analytics] evento disparado: ${eventName}`, params);
  }
}

export {}; // garante escopo de módulo para o `declare global`
