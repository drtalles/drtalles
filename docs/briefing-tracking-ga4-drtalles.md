# Briefing — Instrumentação de Conversões (GA4) no site do Dr. Talles Leandro

## Contexto
Este projeto é o site institucional do **Dr. Talles Leandro** (urologista, Campina Grande/PB), feito em **Next.js (App Router) + TypeScript**. O site **já possui o GA4 instalado** (propriedade "drtalles", ID `535268670`). Vamos rodar uma campanha de Google Ads e precisamos **medir conversões**. Sua tarefa é instrumentar os eventos de conversão e garantir que o GA4 funcione corretamente no App Router (navegação client-side).

**NÃO reinstale o GA4 do zero. NÃO duplique tags.** Primeiro audite o que já existe, depois complemente.

## Objetivo
Disparar 3 eventos GA4 nos pontos de contato do site e garantir que sejam confiáveis no App Router:

| Evento | Onde | Prioridade |
|---|---|---|
| `agendar_doctoralia` | Botão(ões) "Agendar consulta" que levam ao Doctoralia | Primária |
| `clique_whatsapp` | Botão/ação de contato via WhatsApp | Primária |
| `clique_telefone` | Links `tel:` (se existirem) | Secundária |

Esses eventos depois serão marcados como "principais eventos" no GA4 e importados como conversões no Google Ads (isso eu faço manualmente no painel — **você só precisa fazer os eventos dispararem**).

## Convenções do projeto (respeite)
- TypeScript estrito; nada de `any` solto sem necessidade (o helper abaixo usa um cast controlado só no acesso a `window.gtag`).
- Reaproveite a estrutura de pastas existente (`lib/`, `components/` etc.). Não crie estruturas novas sem necessidade.
- YAGNI: não instale bibliotecas de analytics adicionais, não adicione gerenciador de consentimento/cookies novo (se já houver, respeite), não mexa em código não relacionado.
- Não altere números de telefone, URLs de destino ou textos dos botões — apenas **anexe** o disparo de evento ao clique.

---

## FASE 0 — Auditoria (faça isto ANTES de qualquer alteração e me reporte)

Investigue e me responda em texto, sem alterar nada ainda:

1. **Como o GA4 está instalado hoje?** Procure no código por:
   - O ID de medição no formato `G-XXXXXXXXXX` (esse é o que importa; o `535268670` é o ID da propriedade). Onde ele está? Está hardcoded ou em variável de ambiente (`NEXT_PUBLIC_GA_ID` ou similar)?
   - Uso de `@next/third-parties/google` (componente `<GoogleAnalytics>`), OU
   - Snippet manual via `next/script` (`<Script>` com `gtag.js`), OU
   - Google Tag Manager (`GTM-XXXX`).
   - Em qual arquivo está (`app/layout.tsx`? um componente `Analytics`?).
2. **O `page_view` está sendo disparado nas navegações internas (SPA)?** Ou seja: já existe algum tratamento de rota (`usePathname`/`useSearchParams`) que dispara pageview a cada troca de página, ou só há o pageview do carregamento inicial?
3. **Liste os componentes dos botões de contato:** onde estão os botões "Agendar consulta" (link Doctoralia), o botão/widget de WhatsApp (o site tem um botão flutuante no canto inferior direito), e eventuais links `tel:`. Diga se cada um é Client Component (`'use client'`) ou Server Component.

**CHECKPOINT:** me mostre esse relatório e aguarde meu OK antes de seguir para a Fase 1. (Se eu não estiver acompanhando em tempo real, use seu melhor julgamento seguindo as regras abaixo.)

---

## FASE 1 — Helper de tracking (universal e SSR-safe)

Crie um helper que funcione independentemente do método de instalação (tanto `@next/third-parties` quanto snippet manual expõem `window.gtag`). Coloque em `lib/analytics.ts` (ou o caminho equivalente da estrutura existente):

```typescript
// lib/analytics.ts

// Declaração de tipo para window.gtag (adicione a um .d.ts se preferir centralizar)
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
```

---

## FASE 2 — Garantir o GA4 correto no App Router

Com base na auditoria (Fase 0):

- **Se o site usa `@next/third-parties/google` (`<GoogleAnalytics gaId=... />`):** ótimo, ele já cuida do `page_view` em navegação SPA. **Não faça nada aqui**, siga para a Fase 3.
- **Se o site usa snippet manual (`<Script>` com gtag) E NÃO há tratamento de rota para SPA:** o `page_view` só dispara no load inicial — precisamos corrigir. Adote **uma** das opções:
  - **(Preferido)** Migrar para `@next/third-parties/google`: instale o pacote (já faz parte do ecossistema Next, sem dependência externa nova relevante), coloque `<GoogleAnalytics gaId={GA_ID} />` no `app/layout.tsx` e **remova o snippet manual antigo** para não duplicar pageviews. Use a env var existente para o ID; se não houver, crie `NEXT_PUBLIC_GA_ID`.
  - **(Alternativa, se preferir não migrar)** Manter o snippet manual e criar um componente cliente que dispara `page_view` a cada mudança de rota:

    ```tsx
    // components/analytics/PageViewTracker.tsx
    "use client";
    import { useEffect } from "react";
    import { usePathname, useSearchParams } from "next/navigation";

    export function PageViewTracker() {
      const pathname = usePathname();
      const searchParams = useSearchParams();
      useEffect(() => {
        if (typeof window.gtag !== "function") return;
        const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
        window.gtag("event", "page_view", { page_path: url, page_location: window.location.href });
      }, [pathname, searchParams]);
      return null;
    }
    ```

    Importante: como usa `useSearchParams`, envolva o componente em `<Suspense>` no layout (exigência do Next), assim:

    ```tsx
    import { Suspense } from "react";
    // ...
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
    ```

- **Se o site usa GTM:** não mexa na configuração do GTM aqui; apenas garanta que `window.gtag`/dataLayer esteja disponível (ele estará) e siga para a Fase 3, pois os eventos via `trackEvent` (que empurra pelo gtag) chegarão ao GA4 configurado no GTM. Me avise que é GTM para eu ajustar a importação no lado do Ads.

**Regra de ouro: no fim desta fase, deve existir UMA e apenas UMA forma de carregar o GA4.** Se detectar duplicidade, consolide.

---

## FASE 3 — Instrumentar os botões

Para cada ponto de contato identificado na Fase 0, anexe o disparo do evento **no `onClick`**. NÃO use um script global que varre o DOM (`querySelectorAll` + addEventListener numa única passada) — isso quebra no App Router porque os listeners não se religam após navegação client-side. Faça no componente.

Se algum botão estiver dentro de um **Server Component**, transforme apenas o botão em um pequeno Client Component (`'use client'`) ou adicione a diretiva no componente que contém o clique. Mantenha o mínimo de superfície `'use client'` possível.

### Exemplos

**Botão "Agendar consulta" (Doctoralia):**
```tsx
"use client";
import { trackEvent } from "@/lib/analytics";

<a
  href={DOCTORALIA_URL}          // mantenha a URL existente, não altere
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => trackEvent("agendar_doctoralia", { origem: "hero" })}
>
  Agendar consulta
</a>
```
> Use um `origem` diferente por local onde o botão aparece (ex.: `"hero"`, `"header"`, `"secao_cirurgia"`), pra sabermos qual CTA converte mais. Se o mesmo componente de botão é reutilizado, exponha `origem` como prop.

**Botão/ação de WhatsApp (o flutuante do canto inferior direito):**
```tsx
"use client";
import { trackEvent } from "@/lib/analytics";

<a
  href={WHATSAPP_URL}            // ex.: https://wa.me/5583991350081 — mantenha o existente
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => trackEvent("clique_whatsapp", { origem: "botao_flutuante" })}
>
  {/* conteúdo/ícone existente */}
</a>
```
> Se o botão flutuante for um widget de chat (não um `wa.me` direto), instrumente o clique de abertura do widget mesmo assim, com o mesmo evento `clique_whatsapp`, e me avise que é widget.

**Links de telefone (se existirem):**
```tsx
<a href="tel:+5583..." onClick={() => trackEvent("clique_telefone")}>
  {/* ... */}
</a>
```

---

## FASE 4 — Validação

1. Rode o projeto em dev (`npm run dev` / `pnpm dev`).
2. Confirme no console do navegador que, ao clicar em cada botão, aparece o log `[analytics] evento disparado: ...` (o helper loga em dev).
3. Confirme que o `page_view` dispara ao navegar entre páginas internas (troque de rota e observe o gtag/Network chamada para `google-analytics.com`/`g/collect`).
4. Garanta que **não há erro de build** e que os componentes que viraram client não quebraram render (checar hidratação).
5. NÃO precisa configurar nada no painel do GA4 nem do Google Ads — isso é feito manualmente depois. Sua entrega termina nos eventos disparando corretamente.

---

## Restrições finais (YAGNI)
- Não adicione bibliotecas de analytics de terceiros (Mixpanel, Segment etc.).
- Não implemente banner de consentimento novo. Se já existir consentimento, respeite o fluxo (o `trackEvent` já é seguro).
- Não altere URLs de destino, números de telefone ou textos.
- Não faça commit de IDs sensíveis hardcoded se houver padrão de env var — use `NEXT_PUBLIC_GA_ID`.
- Mantenha o diff enxuto e focado apenas no tracking.

## Entregável esperado
- `lib/analytics.ts` com o helper `trackEvent`.
- GA4 consolidado e com `page_view` funcionando em navegação SPA.
- Os 3 eventos (`agendar_doctoralia`, `clique_whatsapp`, `clique_telefone`) disparando via `onClick` nos componentes corretos.
- Relatório final: quais arquivos foram alterados, quais botões foram instrumentados (com seus `origem`), e qual método de GA4 ficou ativo.
