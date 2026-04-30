# Redirects 301 Implementados

Todos os redirects abaixo estão configurados em `next.config.ts` com `permanent: true` (HTTP 301).

## URLs antigas do site WordPress → Novo site Next.js

| URL de origem (antiga) | Destino (novo site) | Motivo |
|------------------------|---------------------|--------|
| `/author/tallesleandro` | `/blog` | Página de autor do WordPress sem equivalente |
| `/author/:slug` (qualquer autor) | `/blog` | Padrão genérico para páginas de autor |
| `/:year/:month` (ex: `/2023/03/`) | `/blog` | Arquivos por data do WordPress |
| `/:year/:month/:day` | `/blog` | Arquivos por data do WordPress |
| `/:year/:month/:slug` | `/blog/:slug` | Posts antigos — tenta preservar slug |
| `/o-que-e-urodinamica` | `/blog` | Post antigo sobre urodinâmica (sem equivalente exato no blog novo) |
| `/tratamento-para-hpv-crioterapia-cirurgia-ou-medicacao` | `/exames-e-procedimentos` | Conteúdo sobre crioterapia HPV — mesma temática |
| `/voce-sabe-no-que-consiste-a-litotripsia-extracorporea-leco` | `/exames-e-procedimentos` | Conteúdo sobre litotripsia — mesma temática |

## Variações comuns de URLs antigas (padrões WordPress/.html)

| URL de origem | Destino | Motivo |
|---------------|---------|--------|
| `/contato.html` | `/contato` | Formato antigo com extensão .html |
| `/sobre` | `/dr-talles` | Nomenclatura antiga para página do médico |
| `/sobre.html` | `/dr-talles` | Formato antigo com extensão .html |
| `/servicos` | `/areas-de-atuacao` | Nomenclatura antiga para especialidades |
| `/servicos/:slug` | `/areas-de-atuacao` | Subpáginas de serviços sem equivalente direto |
| `/especialidades` | `/areas-de-atuacao` | Nomenclatura alternativa antiga |
| `/especialidades/:slug` | `/areas-de-atuacao` | Subpáginas de especialidades |
| `/cirurgia-robotica.html` | `/cirurgia-robotica` | Formato antigo com extensão .html |
| `/exames` | `/exames-e-procedimentos` | Nomenclatura antiga encurtada |
| `/procedimentos` | `/exames-e-procedimentos` | Nomenclatura antiga encurtada |

## Notas

- Nenhum redirect aponta para a home (`/`) — isso evitaria soft 404s penalizados pelo Google.
- Posts antigos com slug único (`/o-que-e-urodinamica`) foram redirecionados para a página temática mais próxima.
- O padrão `/:year/:month/:slug` tentará preservar o slug do post para o novo blog. Se o slug não existir no novo blog, o Next.js retornará 404 nessa URL antes de tentar o redirect — **atenção:** esse padrão só funciona se o slug não conflitar com rotas existentes.
- Se o Dr. Talles publicar no novo blog os mesmos conteúdos dos posts antigos com os mesmos slugs, os visitantes serão redirecionados corretamente.

## Como adicionar novos redirects

Edite o array `redirects()` em `next.config.ts`. Exemplo:

```ts
{ source: '/url-antiga', destination: '/url-nova', permanent: true },
```

## Validação pós-deploy

Execute no terminal (substituindo o domínio):

```bash
curl -I https://www.drtallesleandrourologista.com.br/o-que-e-urodinamica
# Esperado: HTTP/2 301 + Location: .../exames-e-procedimentos

curl -I https://www.drtallesleandrourologista.com.br/author/tallesleandro
# Esperado: HTTP/2 301 + Location: .../blog
```
