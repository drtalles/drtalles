"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Nome do evento GA4 a disparar no clique (ex.: "agendar_doctoralia"). */
  event: string;
  /** Rótulo de origem do CTA (ex.: "hero", "footer") para segmentar conversões. */
  origem?: string;
  children: ReactNode;
};

/**
 * Âncora (<a>) que dispara um evento GA4 no clique via `trackEvent`.
 * Client Component para poder ser usado dentro de páginas Server sem
 * transformar a página inteira em client. Repassa todos os atributos de <a>.
 */
export function TrackedLink({
  event,
  origem,
  onClick,
  children,
  ...rest
}: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackEvent(event, origem ? { origem } : {});
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
