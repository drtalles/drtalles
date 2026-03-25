# 🏥 Dr. Talles Leandro — Site Institucional Médico

## Visão Geral do Projeto

Site institucional profissional e moderno para **Dr. Talles Leandro**, urologista em Campina Grande/PB, com foco em saúde do homem, atendimento humanizado e nova frente em cirurgia robótica urológica.

**Objetivo:** Transmitir credibilidade médica, modernidade e acolhimento. O site deve posicionar o Dr. Talles como referência em urologia masculina na região, destacando seu diferencial em cirurgia robótica.

**Público-alvo:** Homens adultos (30-70 anos) buscando atendimento urológico de qualidade em Campina Grande e região.

---

## Stack Técnica

- **Framework:** Next.js 14+ (App Router)
- **Estilização:** Tailwind CSS
- **Componentes UI:** shadcn/ui como base
- **Animações:** Framer Motion (entradas suaves, scroll-triggered reveals)
- **Ícones:** Lucide React
- **Fontes:** Google Fonts — sugestão: display font sofisticada (ex: Playfair Display, Cormorant Garamond ou similar) + body font clean (ex: DM Sans, Plus Jakarta Sans, Outfit)
- **Deploy:** Vercel
- **Responsivo:** Mobile-first, totalmente responsivo

---

## Direção Estética

### Tom Visual

**Refined Medical Elegance** — limpo, sofisticado e acolhedor. Nem frio/hospitalar demais, nem informal demais.

### Paleta de Cores

```
--primary:        #1B4D6E    /* Azul profundo — confiança, medicina */
--primary-light:  #2A7AB5    /* Azul médio — CTAs, destaques */
--primary-dark:   #0F2D42    /* Azul escuro — headers, textos fortes */
--accent:         #2EC4B6    /* Verde-água/teal — modernidade, tecnologia, robótica */
--accent-light:   #E8F8F5    /* Verde-água suave — backgrounds de seção */
--neutral-50:     #F8FAFB    /* Fundo claro alternado */
--neutral-100:    #EEF2F5    /* Cards, backgrounds secundários */
--neutral-700:    #3D4F5F    /* Texto corpo */
--neutral-900:    #1A2332    /* Texto títulos */
--white:          #FFFFFF
--success:        #27AE60    /* Indicadores positivos */
```

> **Nota:** A paleta é uma sugestão de ponto de partida. Sinta-se livre para ajustar tons e criar variações que funcionem melhor na composição final, mantendo o tom "azul médico confiável + teal/verde-água moderno".

### Tipografia

- **Títulos (h1, h2):** Font display com personalidade e elegância (serif ou sans-serif sofisticada)
- **Subtítulos (h3, h4):** Mesma família ou variação de peso
- **Corpo:** Sans-serif limpa e legível, boa em tamanhos menores
- **Hierarquia clara:** tamanhos generosos nos títulos, espaçamento confortável no corpo

### Atmosfera Geral

- Espaçamento generoso (seções respiram)
- Backgrounds alternados sutis entre seções (branco / off-white / teal suave)
- Elementos decorativos sutis: linhas finas, formas geométricas suaves, gradientes delicados
- Fotos com tratamento consistente (se houver imagens de placeholder, usar tons da paleta)
- Cantos arredondados suaves nos cards
- Sombras sutis e elevações discretas
- Ícones com estilo consistente (line-style, mesma espessura)
- Micro-animações: fade-in on scroll, hover suaves em botões e cards
- **Zero estética genérica de "template médico"** — deve parecer feito sob medida

---

## Estrutura do Site

### Menu de Navegação (Header)

Header fixo com blur/transparência no scroll. Logo à esquerda, menu à direita.

```
Itens do menu:
1. Início
2. Dr. Talles
3. Cirurgia Robótica
4. Áreas de Atuação
5. Exames e Procedimentos
6. Blog
7. Agendamento / Contato  ← botão destacado (CTA style)
```

- Menu hamburger no mobile com animação suave
- Item "Agendamento / Contato" deve ser um botão com destaque visual (cor accent/primary)
- Scroll suave para âncoras na home (smooth scroll)

### CTA Principal (Global)

```
Texto: "Agendar consulta"
Link:  https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande?utm_id=34199&utm_source=widget-doctor-34199&utm_medium=big&utm_campaign=&utm_content=#highlight-calendar
Abre em: nova aba (_blank)
```

### CTAs Secundários

- "Saiba mais sobre cirurgia robótica" → link para página/seção de Cirurgia Robótica
- "Conheça a atuação do Dr. Talles" → link para página/seção Dr. Talles

---

## Página: HOME

A home segue uma narrativa lógica em 4 blocos:

1. **Quem ele é** (hero + apresentação)
2. **Qual diferencial ele está construindo** (cirurgia robótica)
3. **O que ele atende** (áreas de atuação + exames)
4. **Como o paciente agenda** (depoimentos + agendamento + localização)

---

### Seção 1 — HERO

**Layout:** Full-width, impactante mas elegante. Área generosa de texto à esquerda, espaço para imagem/visual à direita (ou background sutil).

```
Título (h1):
"Saúde urológica do homem com atendimento personalizado"

Subtítulo:
"Dr. Talles Leandro é urologista em Campina Grande, com atuação focada
em saúde do homem, atendimento humanizado, consulta por hora marcada
e nova frente em cirurgia robótica urológica."
```

**Badges / Diferenciais** (ícones + texto curto, layout horizontal ou grid 2x2):

- ✓ Atendimento por hora marcada
- ✓ Agendamento online
- ✓ Urologia com foco em saúde do homem
- ✓ Nova frente em cirurgia robótica urológica

**CTAs do Hero:**

- **Primário:** "Agendar consulta" → link Doctoralia (nova aba)
- **Secundário:** "Conheça a atuação do Dr. Talles" → scroll para seção abaixo

**Observações de design:**
- Animação de entrada staggered (título → subtítulo → badges → CTAs)
- Considerar um elemento visual sutil de fundo (formas orgânicas, gradiente, pattern médico abstrato)
- Placeholder para foto profissional do Dr. Talles (usar área cinza elegante com ícone ou silhouette)

---

### Seção 2 — SOBRE O DR. TALLES

```
Título (h2):
"Experiência, escuta e precisão no cuidado urológico"

Texto:
"O cuidado com a saúde urológica exige atenção individual, clareza no
diagnóstico e segurança na condução de cada caso.

Ao longo da sua trajetória, Dr. Talles Leandro construiu uma atuação
marcada pelo atendimento humano, pela proximidade com o paciente e pelo
compromisso com decisões médicas bem conduzidas.

Hoje, esse trabalho se fortalece ainda mais com a ampliação da sua
atuação em cirurgia robótica urológica, sempre com foco em critério,
responsabilidade e indicação adequada para cada caso."
```

**Layout:** Texto + espaço para imagem (placeholder para foto do médico em contexto profissional). Pode ser split 50/50 ou 60/40.

**Fade-in on scroll.**

---

### Seção 3 — CIRURGIA ROBÓTICA (Diferencial)

**Background diferenciado** (accent-light ou gradiente sutil para destacar a seção).

```
Título (h2):
"Uma nova etapa em cirurgia robótica urológica"

Texto:
"A cirurgia robótica representa um avanço importante na urologia,
especialmente em casos selecionados de maior complexidade.

Com certificação para atuação em cirurgia robótica urológica, Dr. Talles
inicia uma nova etapa da sua trajetória, ampliando sua abordagem cirúrgica
com foco especial em casos urológicos oncológicos, especialmente
próstata e rins."

CTA:
"Entenda como funciona" → link para página dedicada de Cirurgia Robótica
```

**Observações de design:**
- Seção com destaque visual (background diferente, ícone de robótica/tecnologia)
- Pode incluir ilustração abstrata de tecnologia médica ou ícone grande estilizado
- Essa seção deve comunicar modernidade e inovação

---

### Seção 4 — ÁREAS DE ATUAÇÃO

```
Título (h2):
"Atuação focada em saúde do homem e urologia"
```

**Grid de cards** (2x4 ou responsivo) com ícone + nome:

1. Saúde do homem
2. Urologia geral
3. Disfunções sexuais
4. Andrologia
5. Endourologia
6. Videolaparoscopia urológica
7. Uro-oncologia
8. Uro-ginecologia

**Design dos cards:**
- Ícone representativo (Lucide ou custom SVG)
- Nome da especialidade
- Hover com elevação suave e/ou mudança de cor
- Pode ter borda sutil ou fundo neutro
- Cards clicáveis levando para página de Áreas de Atuação (futuramente com âncora específica)

---

### Seção 5 — EXAMES E PROCEDIMENTOS

```
Título (h2):
"Exames, procedimentos e acompanhamento com foco em clareza diagnóstica"

Texto:
"Além da consulta em urologia, o atendimento também contempla exames
e procedimentos que ajudam na investigação, no diagnóstico e na condução
adequada de cada caso."
```

**Lista de procedimentos** (cards menores ou lista estilizada):

1. Consulta em urologia
2. Cistoscopia
3. Urodinâmica
4. Urofluxometria
5. Crioterapia
6. Biópsia de pênis

```
CTA: "Ver exames e procedimentos" → link para página de Exames e Procedimentos
```

---

### Seção 6 — DEPOIMENTOS / CONFIANÇA

```
Título (h2):
"Confiança construída no atendimento"

Texto:
"O atendimento próximo, claro e cuidadoso se reflete na experiência
dos pacientes."
```

**Implementação — Modelo próprio de depoimentos selecionados:**

> ⚠️ **IMPORTANTE:** NÃO integrar widget do Google Reviews direto (pode exibir reclamações indesejadas). Em vez disso:
>
> - Criar um carrossel/grid com **depoimentos selecionados manualmente**
> - Cada depoimento: texto do paciente + nome (pode ser só primeiro nome) + quantidade de estrelas
> - Incluir um **link externo** para o Google Reviews completo como complemento (ex: "Ver todas as avaliações no Google" com ícone do Google)
> - Usar dados estáticos (hardcoded) que o cliente pode atualizar facilmente
> - Design: cards com aspas estilizadas, fundo suave, carrossel automático com navegação manual

**Placeholder para depoimentos:**

```json
[
  {
    "nome": "Carlos M.",
    "texto": "Atendimento excelente, muito atencioso e profissional.",
    "estrelas": 5
  },
  {
    "nome": "Roberto S.",
    "texto": "Consulta pontual, explicou tudo com clareza. Recomendo.",
    "estrelas": 5
  },
  {
    "nome": "José A.",
    "texto": "Profissional competente e humano. Me senti acolhido.",
    "estrelas": 5
  }
]
```

---

### Seção 7 — AGENDAMENTO

```
Título (h2):
"Agende sua consulta com praticidade"

Texto:
"O agendamento pode ser feito de forma online, com mais praticidade
para o paciente e mais agilidade no contato inicial."
```

**CTAs lado a lado:**

- **"Agendar online"** → link Doctoralia (botão primário, destaque forte)
- **"Falar pelo WhatsApp"** → link `https://wa.me/55XXXXXXXXXXX` (botão secundário com ícone WhatsApp)

> ⚠️ **Nota:** O número de WhatsApp precisa ser fornecido pelo cliente. Usar placeholder `https://wa.me/5583999999999`.

**Design:** Seção com background em primary-dark ou gradiente escuro, textos em branco, CTAs grandes e chamativos. Deve ser o ponto de conversão mais forte da página.

---

### Seção 8 — LOCALIZAÇÃO

**Semelhante ao site atual.** Bloco informativo com:

```
Dados da clínica:
- Nome da clínica: [placeholder — aguardando dados do cliente]
- Endereço: [placeholder — aguardando dados do cliente]
- Horários de atendimento: [placeholder — ex: Seg a Sex, 8h às 18h]
- Telefone: [placeholder — (83) 9999-9999]
```

**Layout:** Grid 2 colunas — info à esquerda, mapa à direita.

- Mapa: embed do Google Maps (iframe) ou placeholder visual com link para Google Maps
- Ícones para cada informação (localização, relógio, telefone)
- Design limpo e funcional

---

### Footer

- Logo + breve descrição (1 linha)
- Links do menu repetidos
- Dados de contato (telefone, email, endereço resumido)
- Redes sociais (ícones — Instagram no mínimo, placeholder para outras)
- Texto legal: "CRM XXXXX — Urologista" (dados a fornecer)
- Copyright © 2025 Dr. Talles Leandro — Todos os direitos reservados
- Créditos: "Desenvolvido por Agência Criativa Imagem" (com link)

---

## Páginas Internas (Estrutura para criação futura)

As páginas abaixo fazem parte do menu e devem ser criadas como rotas, mesmo que inicialmente com conteúdo placeholder:

### `/dr-talles`
Página "Sobre" mais completa — formação, trajetória, filosofia de atendimento, foto.

### `/cirurgia-robotica`
Página dedicada à cirurgia robótica — o que é, como funciona, benefícios, indicações, certificação do Dr. Talles. CTA forte para agendamento.

### `/areas-de-atuacao`
Lista completa das 8 áreas com descrição expandida de cada uma.

### `/exames-e-procedimentos`
Lista dos 6 exames/procedimentos com explicação de cada um.

### `/blog`
Listagem de posts (pode ser placeholder com layout definido). Grid de cards com imagem, título, resumo e data.

### `/contato`
Formulário de contato + informações de localização + agendamento Doctoralia + WhatsApp.

---

## Observações Importantes

### Sobre Valores/Preços
**NÃO incluir valores no site.** Quando o paciente clica no agendamento (Doctoralia), os valores já aparecem lá. Manter o site focado em conteúdo institucional e conversão.

### SEO Básico
- Meta tags otimizadas por página (title, description)
- Tags semânticas (h1 único por página, heading hierarchy correta)
- Alt text em todas as imagens
- Schema markup de médico/organização (JSON-LD) — ao menos na home
- Sitemap.xml
- robots.txt

### Performance
- Imagens otimizadas (Next.js Image component)
- Lazy loading nas seções abaixo do fold
- Core Web Vitals em mente (LCP, CLS, FID)

### Acessibilidade
- Contraste adequado (WCAG AA mínimo)
- Navegação por teclado
- Labels em formulários
- Aria labels em ícones/botões

### Botão Flutuante WhatsApp
Adicionar botão flutuante de WhatsApp no canto inferior direito, fixo, com animação de pulso sutil. Presente em todas as páginas.

---

## Resumo dos Links Importantes

| Elemento | URL |
|---|---|
| CTA Agendar Consulta | `https://www.doctoralia.com.br/talles-leandro-oliveira/urologista/campina-grande?utm_id=34199&utm_source=widget-doctor-34199&utm_medium=big&utm_campaign=&utm_content=#highlight-calendar` |
| WhatsApp | `https://wa.me/5583999999999` (placeholder) |
| Google Reviews | (link a fornecer pelo cliente) |
| Créditos Agência | (link do site da Agência Criativa Imagem) |

---

## Checklist de Entrega

- [ ] Home completa com todas as 8 seções
- [ ] Header fixo com menu responsivo
- [ ] Footer completo
- [ ] Botão flutuante WhatsApp
- [ ] Rotas das páginas internas criadas (mesmo com placeholder)
- [ ] CTAs funcionando (links corretos, target _blank onde necessário)
- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Animações de scroll (fade-in, stagger)
- [ ] SEO meta tags na home
- [ ] Paleta de cores e tipografia consistentes
- [ ] Código limpo, componentizado e bem organizado
