# Documentação do Projeto — Dr. Talles Leandro

> Site institucional médico para **Dr. Talles Leandro**, urologista em Campina Grande/PB.
> Foco em saúde do homem, atendimento humanizado e cirurgia robótica urológica.

---

## Índice

1. [Stack técnica](#1-stack-técnica)
2. [Como rodar o projeto](#2-como-rodar-o-projeto)
3. [Estrutura de arquivos](#3-estrutura-de-arquivos)
4. [Design System](#4-design-system)
5. [Componentes globais](#5-componentes-globais)
6. [Seções da Home](#6-seções-da-home)
7. [Páginas internas](#7-páginas-internas)
8. [Links e integrações externas](#8-links-e-integrações-externas)
9. [SEO e Schema.org](#9-seo-e-schemaorg)
10. [Animações](#10-animações)
11. [Responsividade](#11-responsividade)
12. [Pendências e placeholders](#12-pendências-e-placeholders)

---

## 1. Stack técnica

| Item | Versão / Detalhe |
|---|---|
| Framework | Next.js 15 — App Router |
| Linguagem | TypeScript 5 |
| Estilização | Tailwind CSS v4 (sem arquivo de config) |
| UI base | shadcn/ui (estrutura pronta, sem componentes instalados ainda) |
| Ícones | Lucide React |
| Fontes | Google Fonts: **Cormorant Garamond** (display) + **DM Sans** (corpo) |
| Animações | CSS nativo + `requestAnimationFrame` + `IntersectionObserver` |
| Deploy alvo | Vercel |
| Node | ≥ 18 |

> **Nota:** Não há Framer Motion instalado. Todas as animações são feitas com CSS e JS nativo para manter o bundle enxuto.

---

## 2. Como rodar o projeto

```bash
# Instalar dependências
npm install

# Desenvolvimento (Turbopack)
npm run dev

# Build de produção
npm run build

# Rodar produção local
npm start

# Lint
npm run lint
```

O projeto roda em `http://localhost:3000`.

---

## 3. Estrutura de arquivos

```
drtalles/
├── public/
│   └── img/
│       ├── logo.png          ← Logo da clínica Vitta (header)
│       ├── dr-talles-1.png   ← Foto do Dr. Talles (Hero — fundo branco, jaleco)
│       └── dr-talles-2.png   ← Foto do Dr. Talles (Seção Sobre)
│
├── src/
│   ├── app/
│   │   ├── globals.css                      ← Design system completo (ver seção 4)
│   │   ├── layout.tsx                       ← Root layout, metadata SEO, JSON-LD
│   │   ├── page.tsx                         ← Home — monta todas as seções
│   │   ├── dr-talles/page.tsx               ← Página "Sobre o Dr. Talles"
│   │   ├── cirurgia-robotica/page.tsx       ← Página "Cirurgia Robótica"
│   │   ├── areas-de-atuacao/page.tsx        ← Página "Áreas de Atuação"
│   │   ├── exames-e-procedimentos/page.tsx  ← Página "Exames e Procedimentos"
│   │   ├── blog/page.tsx                    ← Página "Blog"
│   │   └── contato/page.tsx                 ← Página "Contato"
│   │
│   ├── components/
│   │   ├── Header.tsx          ← Navbar fixa, logo, nav desktop/mobile
│   │   ├── Footer.tsx          ← Rodapé completo 4 colunas
│   │   ├── WhatsAppButton.tsx  ← Botão flutuante fixo (canto inferior direito)
│   │   ├── ui/                 ← Pasta reservada para componentes shadcn/ui
│   │   └── sections/
│   │       ├── Hero.tsx               ← Seção 1 — Hero branco integrado
│   │       ├── Sobre.tsx              ← Seção 2 — Sobre o Dr. Talles
│   │       ├── CirurgiaRobotica.tsx   ← Seção 3 — Diferencial robótica
│   │       ├── AreasAtuacao.tsx       ← Seção 4 — Grid de 8 áreas
│   │       ├── ExamesProcedimentos.tsx← Seção 5 — Lista de 6 procedimentos
│   │       ├── Depoimentos.tsx        ← Seção 6 — Carrossel de depoimentos
│   │       ├── Agendamento.tsx        ← Seção 7 — CTA de conversão
│   │       └── Localizacao.tsx        ← Seção 8 — Endereço + mapa
│   │
│   └── lib/
│       └── utils.ts   ← Função cn() (clsx + tailwind-merge)
│
├── components.json     ← Config do shadcn/ui
├── next.config.ts
├── postcss.config.mjs  ← @tailwindcss/postcss (necessário para Tailwind v4)
├── tsconfig.json       ← Path alias: @/* → ./src/*
└── package.json
```

---

## 4. Design System

Todo o design system está centralizado em **`src/app/globals.css`**.
Tailwind v4 usa a diretiva `@theme {}` no lugar do arquivo `tailwind.config.js`.

### 4.1 Paleta de cores

| Variável CSS | Hex | Uso |
|---|---|---|
| `--color-primary` | `#1B4D6E` | Azul principal — confiança médica |
| `--color-primary-light` | `#2A7AB5` | CTAs, destaques |
| `--color-primary-dark` | `#0F2D42` | Headers, textos fortes, fundos escuros |
| `--color-accent` | `#2EC4B6` | Verde-água — modernidade, robótica |
| `--color-accent-light` | `#E8F8F5` | Backgrounds de seção, ícones |
| `--color-accent-dark` | `#1fa99d` | Hover do accent |
| `--color-neutral-50` | `#F8FAFB` | Fundo alternado claro |
| `--color-neutral-100` | `#EEF2F5` | Borders, backgrounds de card |
| `--color-neutral-200` | `#DDE4EA` | Separadores, borders |
| `--color-neutral-400` | `#8FA3B4` | Textos secundários, ícones inativos |
| `--color-neutral-700` | `#3D4F5F` | Texto corpo principal |
| `--color-neutral-900` | `#1A2332` | Títulos |
| `--color-success` | `#27AE60` | Indicadores positivos |

### 4.2 Tipografia

| Variável | Fonte | Uso |
|---|---|---|
| `--font-display` | Cormorant Garamond (serif) | `h1`, `h2`, `h3`, citações |
| `--font-body` | DM Sans (sans-serif) | Parágrafos, UI, botões, labels |

Tamanhos responsivos via `clamp()`:
- `h1` → `clamp(2.25rem, 5vw, 3.75rem)`
- `h2` → `clamp(1.875rem, 3.5vw, 2.75rem)`
- `h3` → `clamp(1.25rem, 2vw, 1.5rem)`

### 4.3 Classes utilitárias globais

```css
.container-site   /* max-width 1200px, padding horizontal responsivo */
.section-pad      /* padding-block responsivo para seções */
.eyebrow          /* label pequena acima dos títulos (linha + texto teal uppercase) */
```

### 4.4 Botões

| Classe | Aparência |
|---|---|
| `.btn .btn-primary` | Azul sólido + sombra |
| `.btn .btn-outline` | Borda azul, fundo transparente |
| `.btn .btn-accent` | Verde-água sólido |
| `.btn .btn-white` | Branco com sombra |
| `.btn .btn-outline-white` | Borda branca transparente (para fundos escuros) |

### 4.5 Cards

```css
.card-base   /* background branco, border-radius 0.75rem, sombra + hover lift */
```

### 4.6 Animações CSS

```css
.fade-up            /* opacidade 0 + translateY(28px) → visível via JS */
.fade-up.visible    /* estado final da animação (classe adicionada pelo IntersectionObserver) */
.wa-pulse::before   /* anel de pulso animado para o botão WhatsApp */
```

---

## 5. Componentes globais

### Header (`src/components/Header.tsx`)

- **Client Component** (`"use client"`)
- Header fixo (`position: fixed`, `z-index: 50`), altura **76px**
- Fundo: vidro branco `rgba(255,255,255,0.92)` + `backdrop-filter: blur(16px)`
- **Elementos decorativos de background:**
  - Grid de pontos animados (drift lento 14s)
  - Orb teal no canto superior esquerdo
  - Gradiente azul entrando pela direita
  - Hairline inferior com gradiente colorido
- Altura shrink ao scrollar: 76px → 64px (transition suave)
- **Nav desktop:** links com underline deslizante no hover (gradiente azul→teal via `::after`)
- **Botão CTA:** gradiente diagonal animado no hover via `background-position`
- **Mobile (≤ 960px):** hamburger escuro, overlay branco com blur, itens deslizando da direita
- Breakpoint mobile: `960px`

> **⚠️ Logo:** `public/img/logo.png` — é o logo da clínica **Vitta Medicina Especializada**. Caso o cliente forneça logo próprio, substituir o arquivo e ajustar `width/height` no componente.

### Footer (`src/components/Footer.tsx`)

- **Client Component** (`"use client"`) — necessário por ter `onMouseEnter` nos links sociais
- Fundo: `var(--color-primary-dark)` (#0F2D42)
- Grid de 4 colunas responsivo (`auto-fit, minmax(220px, 1fr)`):
  1. **Brand** — logo textual + descrição + ícone Instagram
  2. **Navegação** — todos os links do menu
  3. **Contato** — endereço, telefone, e-mail (com ícones)
  4. **Agendamento** — texto + botão Doctoralia
- Rodapé: copyright + créditos à Agência Criativa Imagem

### WhatsAppButton (`src/components/WhatsAppButton.tsx`)

- **Client Component**
- Posição: `fixed`, `bottom: 1.75rem`, `right: 1.75rem`, `z-index: 60`
- Cor: `#25D366` (verde WhatsApp oficial)
- Animação de pulso via `.wa-pulse::before` (CSS keyframes)
- Link: `https://wa.me/5583999999999` (**placeholder** — atualizar com número real)
- Presente em **todas as páginas**

---

## 6. Seções da Home

A Home (`src/app/page.tsx`) monta as 8 seções em sequência:

```tsx
<Header />
<main>
  <Hero />
  <Sobre />
  <CirurgiaRobotica />
  <AreasAtuacao />
  <ExamesProcedimentos />
  <Depoimentos />
  <Agendamento />
  <Localizacao />
</main>
<Footer />
<WhatsAppButton />
```

---

### Seção 1 — Hero (`sections/Hero.tsx`)

**Design:** Branco, integrado visualmente com o header (mesmo fundo).
**`padding-top: 76px`** — compensa o header fixo sem `margin-top` no `<main>`.

**Background decorativo (sobre branco):**
- Grid de pontos azuis animado (`hero-drift`, 14s loop)
- Orb teal no canto superior direito
- Orb azul no canto inferior esquerdo
- Diagonal accent no canto superior esquerdo
- Hairline com gradiente na base

**Layout:** Grid 2 colunas (texto esquerda | foto direita).

**Coluna esquerda:**
- Pill eyebrow com bolinha teal pulsante
- `h1` com gradiente de texto em `personalizado` (`background-clip: text`)
- Subtítulo
- 4 badges horizontais (ícone + label) com `neutral-50` background
- 2 CTAs: primário (gradiente animado) + outline
- Trust row: CRM / Especialidade / Cidade

**Coluna direita:**
- Foto `dr-talles-1.png` sem card escuro — flutua sobre círculo gradiente suave
- Animação floating: `requestAnimationFrame`, `Math.sin`, ±9px vertical
- Badge flutuante inferior esquerdo: ícone teal + "Urologia"
- `drop-shadow` no lugar de `box-shadow` (respeita transparência da imagem PNG)

**Mobile:** coluna da foto oculta em `≤ 860px`.

---

### Seção 2 — Sobre (`sections/Sobre.tsx`)

**Fundo:** Gradiente azul `linear-gradient(135deg, #0F2D42 → #1B4D6E → #1d6b8a)`
**Animação:** `IntersectionObserver` → adiciona `.visible` nos `.fade-up`

**Coluna esquerda:** Foto `dr-talles-2.png`
- Barra accent no topo (gradiente azul→teal, 4px)
- Overlay gradiente escuro na base da foto
- Badge flutuante direito: "Certificação — Cirurgia Robótica"

**Coluna direita:** Textos sobre a trajetória
- Todos os textos em branco/rgba para o fundo escuro
- Grid 2×2 de stats com cards glass (`rgba(255,255,255,0.08)`)
- Ícones em teal sobre fundo `rgba(46,196,182,0.2)`
- CTA: `btn-accent`

---

### Seção 3 — Cirurgia Robótica (`sections/CirurgiaRobotica.tsx`)

**Fundo:** `var(--color-accent-light)` (#E8F8F5) — diferencia da seção anterior
**Animação:** `IntersectionObserver`

- Orb decorativo teal no canto superior direito
- Grid 2 colunas: texto + 4 cards de benefício
- Cards com ícone gradiente teal, título e descrição
- CTA: `btn-primary` com ícone ArrowRight

**4 benefícios destacados:**
1. Precisão milimétrica
2. Menor trauma
3. Recuperação rápida
4. Visão 3D ampliada

---

### Seção 4 — Áreas de Atuação (`sections/AreasAtuacao.tsx`)

**Fundo:** Branco
**Animação:** `IntersectionObserver` com `staggerDelay` por índice

Grid `auto-fill, minmax(220px, 1fr)` — 8 cards clicáveis:

| # | Área | Ícone |
|---|---|---|
| 1 | Saúde do homem | User |
| 2 | Urologia geral | Activity |
| 3 | Disfunções sexuais | Heart |
| 4 | Andrologia | Dna |
| 5 | Endourologia | Microscope |
| 6 | Videolaparoscopia urológica | Video |
| 7 | Uro-oncologia | ShieldPlus |
| 8 | Uro-ginecologia | Users |

Cada card: ícone azul + label + `border-bottom` teal no hover.
Links apontam para `/areas-de-atuacao#ancora` (âncoras futuras).

---

### Seção 5 — Exames e Procedimentos (`sections/ExamesProcedimentos.tsx`)

**Fundo:** `neutral-50`
**Layout:** 2 colunas — texto sticky à esquerda, lista à direita

6 procedimentos como itens de lista estilizados:
1. Consulta em urologia
2. Cistoscopia
3. Urodinâmica
4. Urofluxometria
5. Crioterapia
6. Biópsia de pênis

Cada item: ícone teal + nome + descrição curta. Hover muda borda para `--color-accent`.

---

### Seção 6 — Depoimentos (`sections/Depoimentos.tsx`)

**Fundo:** Branco
**Tipo:** Carrossel com 5 depoimentos hardcoded

- **Auto-advance:** `setInterval` de 5 segundos
- **Navegação manual:** botões prev/next + dots clicáveis (pill animado no ativo)
- Aspas decorativas via `Cormorant Garamond` italic
- Avatar: inicial do nome com gradiente azul→teal
- Stars: `lucide-react/Star` com `fill` condicional
- Link externo para Google Reviews (placeholder — cliente deve fornecer URL)

> **Para atualizar depoimentos:** editar o array `DEPOIMENTOS` no topo do componente.

---

### Seção 7 — Agendamento (`sections/Agendamento.tsx`)

**Fundo:** Gradiente escuro `linear-gradient(135deg, primary-dark → primary)`
**Propósito:** Ponto de conversão principal da página

- Ícone CalendarCheck em orb teal
- Eyebrow + título + subtítulo em branco
- 2 CTAs lado a lado:
  - **"Agendar online"** → Doctoralia (nova aba) — `btn-accent`
  - **"Falar pelo WhatsApp"** → `wa.me/...` — `btn-outline-white`
- Trust note: "Atendimento por hora marcada · Agendamento rápido e seguro"

---

### Seção 8 — Localização (`sections/Localizacao.tsx`)

**Fundo:** `neutral-50`
**Layout:** 2 colunas — info + mapa

3 cards de info: Endereço | Horários | Telefone (todos placeholder).

**Mapa:** Placeholder visual aguardando endereço real do cliente.
Para ativar o Google Maps, substituir o `<div>` placeholder pelo `<iframe>`:
```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=SEU_EMBED_ID"
  width="100%"
  height="100%"
  style={{ border: 0, position: "absolute", inset: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
```

---

## 7. Páginas internas

Todas as páginas internas seguem a mesma estrutura:

```tsx
<Header />
<main>
  {/* Hero da página — fundo azul, padding-top: calc(76px + 3.5rem) */}
  <section style={{ paddingBlock: "calc(76px + 3.5rem) 4rem", background: "gradient azul" }}>
    <eyebrow /> <h1 /> <p />
  </section>

  {/* Conteúdo placeholder */}
  <section className="section-pad">
    <div>Ícone + "Página em desenvolvimento"</div>
  </section>
</main>
<Footer />
<WhatsAppButton />
```

> **Nota sobre o padding-top:** Como o header é `position: fixed` e tem 76px de altura, as páginas internas usam `paddingBlock: "calc(76px + 3.5rem)"` para o conteúdo não ficar escondido atrás do header.

| Rota | Arquivo | Status |
|---|---|---|
| `/dr-talles` | `app/dr-talles/page.tsx` | Placeholder |
| `/cirurgia-robotica` | `app/cirurgia-robotica/page.tsx` | Placeholder |
| `/areas-de-atuacao` | `app/areas-de-atuacao/page.tsx` | Placeholder |
| `/exames-e-procedimentos` | `app/exames-e-procedimentos/page.tsx` | Placeholder |
| `/blog` | `app/blog/page.tsx` | Placeholder (layout de grid pronto) |
| `/contato` | `app/contato/page.tsx` | Funcional (3 cards: Doctoralia + WhatsApp + Info) |

---

## 8. Links e integrações externas

| Elemento | URL / Valor |
|---|---|
| CTA "Agendar consulta" | `https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande?utm_id=34199&utm_source=widget-doctor-34199&utm_medium=big&utm_campaign=&utm_content=#highlight-calendar` |
| WhatsApp | `https://wa.me/5583999999999` ⚠️ **Placeholder — atualizar** |
| Google Reviews | Não configurado ⚠️ **Cliente deve fornecer** |
| Instagram | `href="#"` ⚠️ **Placeholder — atualizar** |
| Créditos agência | `href="#"` ⚠️ **Placeholder — atualizar** |

> Todos os links externos abrem em `target="_blank" rel="noopener noreferrer"`.

---

## 9. SEO e Schema.org

### `src/app/layout.tsx`

- `Metadata` do Next.js com `title.template` para todas as páginas
- `metadataBase` apontando para `https://drtallesleandro.com.br`
- OpenGraph e Twitter Card configurados
- `robots: { index: true, follow: true }`

### Schema.org (JSON-LD)

Injetado via `<script type="application/ld+json">` no `<head>`:

```json
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Talles Leandro",
  "medicalSpecialty": "Urology",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Campina Grande",
    "addressRegion": "PB",
    "addressCountry": "BR"
  }
}
```

### Meta por página

Cada `page.tsx` exporta seu próprio `metadata`:
```tsx
export const metadata: Metadata = {
  title: "Título da Página",
  description: "Descrição específica...",
};
```

---

## 10. Animações

### Stagger de entrada (Hero)

```ts
// Busca todos os filhos com [data-stagger] e anima com delay crescente
children.forEach((child, i) => {
  child.style.opacity = "0";
  child.style.transform = "translateY(28px)";
  setTimeout(() => {
    child.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    child.style.opacity = "1";
    child.style.transform = "translateY(0)";
  }, 150 + i * 120);
});
```

### Fade-up on scroll (demais seções)

```ts
// Padrão usado em todas as seções
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 110);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
```

O CSS `.fade-up` / `.fade-up.visible` fica em `globals.css`.

### Floating (foto do Hero)

```ts
// Loop com requestAnimationFrame usando Math.sin para movimento orgânico
const animate = (ts: number) => {
  const t = (ts - start) / 1000;
  el.style.transform = `translateY(${Math.sin(t * (Math.PI / 3.5)) * 9}px)`;
  frame = requestAnimationFrame(animate);
};
```

---

## 11. Responsividade

| Breakpoint | Comportamento |
|---|---|
| `> 960px` | Layout desktop completo |
| `≤ 960px` | Header: hamburger menu |
| `≤ 860px` | Hero: coluna da foto oculta |
| Geral | `auto-fit / auto-fill` em todos os grids — adaptam naturalmente |

Sem uso de classes Tailwind no JSX — toda a responsividade é feita via CSS inline com `clamp()`, `auto-fit` e media queries nas `<style>` tags dos componentes.

---

## 12. Pendências e placeholders

Os itens abaixo precisam ser fornecidos/definidos pelo cliente antes da entrega final:

- [ ] **Número de WhatsApp real** — substituir `5583999999999` em `WhatsAppButton.tsx` e `Agendamento.tsx`
- [ ] **Endereço completo da clínica** — atualizar em `Localizacao.tsx` e `Footer.tsx`
- [ ] **Nome da clínica** — atualizar em `Localizacao.tsx`
- [ ] **Horários de atendimento** — atualizar em `Localizacao.tsx`
- [ ] **Telefone fixo/comercial** — atualizar em `Footer.tsx` e `Localizacao.tsx`
- [ ] **E-mail de contato** — atualizar em `Footer.tsx` e `contato/page.tsx`
- [ ] **CRM completo** — substituir `XXXXX` em `Header.tsx` e `Footer.tsx`
- [ ] **Google Maps embed** — substituir placeholder em `Localizacao.tsx`
- [ ] **URL do Google Reviews** — atualizar em `Depoimentos.tsx`
- [ ] **Instagram do Dr. Talles** — atualizar link em `Footer.tsx`
- [ ] **URL do site da Agência Criativa Imagem** — atualizar em `Footer.tsx`
- [ ] **Logo definitivo** — confirmar se `public/img/logo.png` (Vitta) é o logo correto
- [ ] **Depoimentos reais** — atualizar array `DEPOIMENTOS` em `Depoimentos.tsx`
- [ ] **Conteúdo das páginas internas** — todas estão com layout placeholder
- [ ] **`metadataBase`** — confirmar domínio final em `layout.tsx`

---

## Convenções de código

- Todos os componentes que usam hooks ou event handlers têm `"use client"` na primeira linha
- Componentes de seção ficam em `src/components/sections/`
- Estilos são aplicados via `style={{}}` inline (não via classes Tailwind no JSX) para dar controle total e evitar conflitos com Tailwind v4
- O utilitário `cn()` em `src/lib/utils.ts` está disponível para combinar classes quando necessário
- Imagens usam o componente `<Image>` do Next.js com `width` e `height` definidos
- Todas as imagens em `public/img/`

---

*Documentação gerada em 18/03/2025 — Projeto Dr. Talles Leandro*
