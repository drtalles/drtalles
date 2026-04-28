import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { blogPosts, blogCategories } from "@/db/schema"
import { eq, count } from "drizzle-orm"
import AdminShell from "@/components/admin/AdminShell"
import Link from "next/link"
import { FileText, Tag, BookOpen, PlusCircle, ArrowRight } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/admin/login")

  const [[{ total: totalPosts }], [{ published }], [{ drafts }], [{ totalCats }]] =
    await Promise.all([
      db.select({ total: count() }).from(blogPosts),
      db.select({ published: count() }).from(blogPosts).where(eq(blogPosts.status, "published")),
      db.select({ drafts: count() }).from(blogPosts).where(eq(blogPosts.status, "draft")),
      db.select({ totalCats: count() }).from(blogCategories),
    ])

  return (
    <AdminShell>
      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Olá, {session.user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">Bem-vindo ao painel administrativo</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total de Posts" value={totalPosts} color="blue" />
          <StatCard label="Publicados" value={published} color="green" />
          <StatCard label="Rascunhos" value={drafts} color="yellow" />
          <StatCard label="Categorias" value={totalCats} color="purple" />
        </div>

        {/* Modules */}
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Módulos</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <ModuleCard
            icon={BookOpen}
            title="Blog — Postagens"
            description="Crie, edite e gerencie todos os artigos do blog. Controle publicação, categorias e SEO."
            href="/admin/blog/posts"
            action="Gerenciar posts"
            stat={`${totalPosts} post${totalPosts !== 1 ? "s" : ""}`}
            color="blue"
          />
          <ModuleCard
            icon={Tag}
            title="Blog — Categorias"
            description="Organize os posts em categorias para facilitar a navegação e descoberta de conteúdo."
            href="/admin/blog/categories"
            action="Gerenciar categorias"
            stat={`${totalCats} categoria${totalCats !== 1 ? "s" : ""}`}
            color="teal"
          />
        </div>

        {/* Quick actions */}
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 mt-10">Ações rápidas</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/blog/posts/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
          >
            <PlusCircle className="size-4" />
            Novo post
          </Link>
          <Link
            href="/admin/blog/categories"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Tag className="size-4" />
            Nova categoria
          </Link>
        </div>
      </div>
    </AdminShell>
  )
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: "blue" | "green" | "yellow" | "purple"
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    yellow: "bg-amber-50 text-amber-700",
    purple: "bg-purple-50 text-purple-700",
  }
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold rounded-lg inline-block ${colors[color]}`}>
        <span className="px-1">{value}</span>
      </p>
    </div>
  )
}

function ModuleCard({
  icon: Icon,
  title,
  description,
  href,
  action,
  stat,
  color,
}: {
  icon: React.ElementType
  title: string
  description: string
  href: string
  action: string
  stat: string
  color: "blue" | "teal"
}) {
  const iconColors = {
    blue: "bg-blue-50 text-blue-600",
    teal: "bg-teal-50 text-teal-600",
  }
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4 hover:border-gray-300 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl ${iconColors[color]}`}>
          <Icon className="size-5" />
        </div>
        <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
          {stat}
        </span>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 text-base mb-1">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
      >
        {action}
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  )
}
