# Área Restrita (Admin) — Documentação Técnica

## Visão Geral

Sistema de autenticação e painel administrativo implementado sobre o site institucional do Dr. Talles Leandro (Next.js 15). Utiliza **NextAuth v5**, **Drizzle ORM** e banco de dados **PostgreSQL hospedado no Neon**.

---

## Stack Utilizada

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 15 | Framework principal |
| NextAuth | v5 (beta) | Autenticação via JWT |
| Drizzle ORM | latest | ORM e migrations |
| @neondatabase/serverless | latest | Driver do Neon (serverless) |
| bcryptjs | latest | Hash de senhas |
| Neon Console | — | Banco PostgreSQL na nuvem |

---

## Estrutura de Arquivos

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx              # Envolve admin com SessionProvider
│   │   ├── login/
│   │   │   └── page.tsx            # Página de login (client component)
│   │   └── dashboard/
│   │       └── page.tsx            # Dashboard protegido (server component)
│   └── api/
│       └── auth/
│           └── [...nextauth]/
│               └── route.ts        # Handler GET/POST do NextAuth
├── db/
│   └── schema.ts                   # Schema Drizzle — tabela users
└── lib/
    ├── auth.ts                     # Configuração central do NextAuth
    └── db.ts                       # Instância do Drizzle + Neon

middleware.ts                       # Proteção automática das rotas /admin/*
drizzle.config.ts                   # Config do Drizzle Kit (migrations)
scripts/
└── seed.ts                         # Script para criar usuário admin
```

---

## Banco de Dados

### Tabela `users`

```sql
CREATE TABLE users (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  password   TEXT NOT NULL,          -- bcrypt hash, custo 12
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Comandos úteis

```bash
# Aplicar alterações no schema ao banco
npx drizzle-kit push

# Criar/recriar usuário admin
npx tsx scripts/seed.ts

# Visualizar banco via Drizzle Studio
npx drizzle-kit studio
```

---

## Autenticação

- Estratégia: **JWT** (sem tabela de sessões no banco)
- Provider: **Credentials** (email + senha)
- Fluxo:
  1. Usuário acessa `/admin/login`
  2. NextAuth valida email e compara o hash bcrypt da senha
  3. Token JWT é gerado e armazenado em cookie seguro
  4. Middleware intercepta todas as rotas `/admin/*` e valida o token

### Variáveis de ambiente necessárias

```env
DATABASE_URL=          # Connection string do Neon (com pooling)
AUTH_SECRET=           # Secret do NextAuth (mínimo 32 chars)
NEXTAUTH_SECRET=       # Idem — manter igual ao AUTH_SECRET
NEXTAUTH_URL=          # URL base da aplicação
```

> No Vercel, `NEXTAUTH_URL` é detectado automaticamente. As demais variáveis devem ser configuradas no painel do projeto.

---

## Proteção de Rotas

O arquivo `middleware.ts` na raiz do projeto intercepta todas as requisições para `/admin/*`. A lógica de redirecionamento está no callback `authorized` dentro de `src/lib/auth.ts`:

- Não autenticado tentando acessar `/admin/*` → redireciona para `/admin/login`
- Autenticado tentando acessar `/admin/login` → redireciona para `/admin/dashboard`

---

## Como Adicionar um Novo Módulo

1. Criar a página em `src/app/admin/<modulo>/page.tsx`
2. A rota já estará protegida automaticamente pelo middleware
3. Criar as API routes necessárias em `src/app/api/<modulo>/route.ts`
4. Se precisar de novas tabelas, adicionar em `src/db/schema.ts` e rodar `npx drizzle-kit push`

### Exemplo mínimo de página de módulo

```tsx
// src/app/admin/blog/page.tsx
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function BlogAdminPage() {
  const session = await auth()
  if (!session) redirect("/admin/login")

  return <div>Gerenciar Blog</div>
}
```

---

## Módulos Planejados

> A definir pelo cliente. Adicionar aqui conforme forem especificados.

- [ ] Gerenciamento de posts do blog
- [ ] Upload de imagens
- [ ] Mensagens de contato

---

## Credenciais Iniciais

> Criadas via `scripts/seed.ts`. **Trocar a senha após o primeiro acesso em produção.**

| Campo | Valor |
|---|---|
| Email | `admin@drtalles.com.br` |
| Senha | `Admin@2025` |

---

## Observações para Produção

- Configurar todas as variáveis de ambiente no painel do Vercel
- O filesystem da Vercel é **read-only** — uploads de arquivos devem usar storage externo (ex: Cloudflare R2, Vercel Blob, AWS S3)
- O Neon utiliza connection pooling — a `DATABASE_URL` já está configurada com o endpoint pooler (`-pooler` na URL)
- O banco está na região **sa-east-1 (São Paulo)** — manter o projeto Vercel na mesma região para menor latência
