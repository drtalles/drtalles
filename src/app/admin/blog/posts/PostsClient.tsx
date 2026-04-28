"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import {
  Plus, Search, FileText, Filter, Clock, Eye, EyeOff,
  Pencil, Trash2, Loader2, AlertCircle, Check, Tag,
} from "lucide-react"
import { clsx } from "clsx"
import { useDebounce } from "@/lib/hooks"

type Post = {
  id: string
  title: string
  slug: string
  subtitle: string | null
  excerpt: string | null
  coverImage: string | null
  status: string
  publishedAt: string | null
  readingTime: number | null
  tags: string | null
  createdAt: string
  updatedAt: string
  categoryId: string | null
  categoryName: string | null
  categoryColor: string | null
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        status === "published"
          ? "bg-green-100 text-green-700"
          : "bg-amber-100 text-amber-700"
      )}
    >
      {status === "published" ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
      {status === "published" ? "Publicado" : "Rascunho"}
    </span>
  )
}

function formatDate(d: string | null) {
  if (!d) return "—"
  return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
}

export default function PostsClient() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null)

  const debouncedSearch = useDebounce(search, 300)

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3500)
  }

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (debouncedSearch) params.set("search", debouncedSearch)
      if (statusFilter) params.set("status", statusFilter)
      const res = await fetch(`/api/blog/posts?${params}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      setPosts(data.posts)
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, statusFilter])

  useEffect(() => { load() }, [load])

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Excluir o post "${title}"? Esta ação não pode ser desfeita.`)) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/blog/posts/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Erro ao excluir")
      await load()
      showToast("success", "Post excluído!")
    } catch {
      showToast("error", "Erro ao excluir post")
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {toast && (
        <div
          className={clsx(
            "fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium",
            toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          )}
        >
          {toast.type === "success" ? <Check className="size-4" /> : <AlertCircle className="size-4" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Postagens</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {loading ? "Carregando…" : `${posts.length} post${posts.length !== 1 ? "s" : ""} encontrado${posts.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Link
          href="/admin/blog/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
        >
          <Plus className="size-4" />
          Novo post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título ou conteúdo…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white appearance-none cursor-pointer transition-all"
          >
            <option value="">Todos os status</option>
            <option value="published">Publicados</option>
            <option value="draft">Rascunhos</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="size-6 animate-spin text-gray-400" />
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
          <div className="size-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FileText className="size-6 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">
            {search || statusFilter ? "Nenhum post encontrado" : "Nenhum post ainda"}
          </h3>
          <p className="text-sm text-gray-500 mb-5">
            {search || statusFilter
              ? "Tente ajustar os filtros de busca."
              : "Crie seu primeiro artigo para o blog."}
          </p>
          {!search && !statusFilter && (
            <Link
              href="/admin/blog/posts/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
            >
              <Plus className="size-4" />
              Criar post
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start gap-4">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt=""
                    className="size-14 rounded-xl object-cover shrink-0 bg-gray-100"
                  />
                ) : (
                  <div className="size-14 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <FileText className="size-6 text-gray-300" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug truncate">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{post.excerpt}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/blog/posts/${post.id}/edit`}
                        className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                        title="Editar"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        disabled={deleting === post.id}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Excluir"
                      >
                        {deleting === post.id
                          ? <Loader2 className="size-4 animate-spin" />
                          : <Trash2 className="size-4" />
                        }
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-2.5">
                    <StatusBadge status={post.status} />
                    {post.categoryName && (
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: (post.categoryColor ?? "#1B4D6E") + "20",
                          color: post.categoryColor ?? "#1B4D6E",
                        }}
                      >
                        <Tag className="size-3" />
                        {post.categoryName}
                      </span>
                    )}
                    {post.readingTime && (
                      <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="size-3" />
                        {post.readingTime} min
                      </span>
                    )}
                    <span className="text-xs text-gray-400 ml-auto">
                      {post.status === "published"
                        ? `Publicado em ${formatDate(post.publishedAt)}`
                        : `Atualizado em ${formatDate(post.updatedAt)}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
