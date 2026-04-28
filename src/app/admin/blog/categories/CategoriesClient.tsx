"use client"

import { useEffect, useRef, useState } from "react"
import { Plus, Pencil, Trash2, Tag, X, Check, Loader2, AlertCircle } from "lucide-react"
import { clsx } from "clsx"

type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  color: string | null
  createdAt: string
}

const PRESET_COLORS = [
  "#1B4D6E", "#2EC4B6", "#2A7AB5", "#27AE60",
  "#E74C3C", "#9B59B6", "#E67E22", "#34495E",
  "#16A085", "#8E44AD", "#C0392B", "#1ABC9C",
]

function ColorPicker({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PRESET_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className={clsx(
            "size-7 rounded-full border-2 transition-transform hover:scale-110",
            value === color ? "border-gray-900 scale-110" : "border-transparent"
          )}
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="size-7 rounded-full cursor-pointer border-2 border-transparent bg-transparent p-0"
        title="Cor personalizada"
      />
    </div>
  )
}

type FormData = { name: string; description: string; color: string }

function CategoryModal({
  initial,
  onClose,
  onSave,
}: {
  initial?: Category | null
  onClose: () => void
  onSave: (data: FormData) => Promise<void>
}) {
  const [form, setForm] = useState<FormData>({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    color: initial?.color ?? "#1B4D6E",
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!form.name.trim()) { setError("Nome é obrigatório"); return }
    setSaving(true)
    try {
      await onSave(form)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao salvar")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">
            {initial ? "Editar categoria" : "Nova categoria"}
          </h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nome <span className="text-red-500">*</span>
            </label>
            <input
              ref={inputRef}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Ex: Inteligência Artificial"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Descrição</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Uma breve descrição desta categoria..."
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cor</label>
            <ColorPicker value={form.color} onChange={(c) => setForm((f) => ({ ...f, color: c }))} />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2.5 rounded-xl">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
              {saving ? "Salvando…" : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CategoriesClient() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<"new" | Category | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null)

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3500)
  }

  async function load() {
    setLoading(true)
    try {
      const res = await fetch("/api/blog/categories")
      if (!res.ok) throw new Error()
      setCategories(await res.json())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function handleSave(data: FormData) {
    const isEdit = modal !== "new" && modal !== null
    const url = isEdit ? `/api/blog/categories/${(modal as Category).id}` : "/api/blog/categories"
    const method = isEdit ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const json = await res.json().catch(() => ({}))
      throw new Error(json.error || "Erro ao salvar")
    }

    setModal(null)
    await load()
    showToast("success", isEdit ? "Categoria atualizada!" : "Categoria criada!")
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/blog/categories/${id}`, { method: "DELETE" })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || "Erro ao excluir")
      await load()
      showToast("success", "Categoria excluída!")
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "Erro ao excluir")
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Toast */}
      {toast && (
        <div
          className={clsx(
            "fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all",
            toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          )}
        >
          {toast.type === "success" ? <Check className="size-4" /> : <AlertCircle className="size-4" />}
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Categorias</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {categories.length} categoria{categories.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setModal("new")}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
        >
          <Plus className="size-4" />
          Nova categoria
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="size-6 animate-spin text-gray-400" />
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
          <div className="size-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Tag className="size-6 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Nenhuma categoria ainda</h3>
          <p className="text-sm text-gray-500 mb-5">Crie a primeira categoria para organizar seus posts.</p>
          <button
            onClick={() => setModal("new")}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
          >
            <Plus className="size-4" />
            Criar categoria
          </button>
        </div>
      ) : (
        <div className="grid gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-gray-200 px-5 py-4 flex items-center gap-4 hover:border-gray-300 hover:shadow-sm transition-all group"
            >
              <div
                className="size-10 rounded-xl shrink-0 flex items-center justify-center"
                style={{ backgroundColor: cat.color + "22", color: cat.color ?? "#1B4D6E" }}
              >
                <Tag className="size-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 text-sm">{cat.name}</span>
                  <span className="text-xs text-gray-400 font-mono bg-gray-50 px-1.5 py-0.5 rounded">
                    /{cat.slug}
                  </span>
                </div>
                {cat.description && (
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{cat.description}</p>
                )}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setModal(cat)}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  title="Editar"
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  disabled={deleting === cat.id}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                  title="Excluir"
                >
                  {deleting === cat.id
                    ? <Loader2 className="size-4 animate-spin" />
                    : <Trash2 className="size-4" />
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <CategoryModal
          initial={modal === "new" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
