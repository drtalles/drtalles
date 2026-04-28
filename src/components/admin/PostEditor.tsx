"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import Placeholder from "@tiptap/extension-placeholder"
import CharacterCount from "@tiptap/extension-character-count"
import {
  Bold, Italic, UnderlineIcon, Strikethrough, Code, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Minus, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link2, Highlighter, Undo, Redo, Eye, EyeOff, Save, ArrowLeft,
  ChevronDown, ChevronUp, Loader2, AlertCircle, Check, ImageIcon,
} from "lucide-react"
import { clsx } from "clsx"
import ImageUploader from "./ImageUploader"
import Image from "@tiptap/extension-image"

type Category = { id: string; name: string; color: string | null }

type PostForm = {
  title: string
  slug: string
  subtitle: string
  excerpt: string
  coverImage: string
  listingImage: string
  categoryId: string
  tags: string
  source: string
  metaTitle: string
  metaDescription: string
  status: "draft" | "published"
  publishedAt: string
}

const EMPTY_FORM: PostForm = {
  title: "", slug: "", subtitle: "", excerpt: "",
  coverImage: "", listingImage: "", categoryId: "", tags: "",
  source: "", metaTitle: "", metaDescription: "",
  status: "draft", publishedAt: "",
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function ToolbarButton({
  onClick, active, disabled, title, children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={clsx(
        "p-1.5 rounded-lg transition-colors text-sm",
        active ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        disabled && "opacity-30 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  )
}

function RichEditor({ content, onChange }: { content: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-primary underline" } }),
      Image.configure({ HTMLAttributes: { class: "rounded-xl max-w-full my-4" } }),
      Placeholder.configure({ placeholder: "Escreva o conteúdo do artigo aqui…" }),
      CharacterCount,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[320px] px-5 py-4 focus:outline-none text-gray-800",
      },
    },
  })

  const imgInputRef = useRef<HTMLInputElement>(null)
  const [imgUploading, setImgUploading] = useState(false)

  const setLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes("link").href
    const url = window.prompt("URL do link:", prev)
    if (url === null) return
    if (url === "") {
      editor.chain().focus().unsetLink().run()
    } else {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }, [editor])

  async function insertImageUpload(file: File) {
    setImgUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("folder", "blog")
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || `Erro ao enviar (${res.status})`)
      if (!json.url) throw new Error("Resposta inválida do servidor")
      editor?.chain().focus().setImage({ src: json.url }).run()
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Erro ao enviar imagem")
    } finally {
      setImgUploading(false)
    }
  }

  if (!editor) return null

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-100 bg-gray-50">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Negrito">
          <Bold className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Itálico">
          <Italic className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Sublinhado">
          <UnderlineIcon className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Tachado">
          <Strikethrough className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")} title="Destaque">
          <Highlighter className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Código inline">
          <Code className="size-3.5" />
        </ToolbarButton>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Título 1">
          <Heading1 className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Título 2">
          <Heading2 className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Título 3">
          <Heading3 className="size-3.5" />
        </ToolbarButton>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Lista">
          <List className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Lista numerada">
          <ListOrdered className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Citação">
          <Quote className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Separador">
          <Minus className="size-3.5" />
        </ToolbarButton>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Alinhar à esquerda">
          <AlignLeft className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Centralizar">
          <AlignCenter className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Alinhar à direita">
          <AlignRight className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justificar">
          <AlignJustify className="size-3.5" />
        </ToolbarButton>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        <ToolbarButton onClick={setLink} active={editor.isActive("link")} title="Inserir link">
          <Link2 className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => imgInputRef.current?.click()}
          disabled={imgUploading}
          title="Inserir imagem"
        >
          {imgUploading
            ? <Loader2 className="size-3.5 animate-spin" />
            : <ImageIcon className="size-3.5" />
          }
        </ToolbarButton>
        <input
          ref={imgInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) insertImageUpload(f); e.target.value = "" }}
        />

        <div className="w-px h-4 bg-gray-200 mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Desfazer">
          <Undo className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Refazer">
          <Redo className="size-3.5" />
        </ToolbarButton>

        <div className="ml-auto text-xs text-gray-400">
          {editor.storage.characterCount.words()} palavras
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}

function Section({
  title, defaultOpen = true, children,
}: {
  title: string; defaultOpen?: boolean; children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        {open ? <ChevronUp className="size-4 text-gray-400" /> : <ChevronDown className="size-4 text-gray-400" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  )
}

function Field({
  label, hint, required, children,
}: {
  label: string; hint?: string; required?: boolean; children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"

export default function PostEditor({ postId }: { postId?: string }) {
  const router = useRouter()
  const [form, setForm] = useState<PostForm>(EMPTY_FORM)
  const [content, setContent] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(!!postId)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [toast, setToast] = useState<string | null>(null)
  const [slugManual, setSlugManual] = useState(false)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  function set(key: keyof PostForm, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  useEffect(() => {
    fetch("/api/blog/categories").then((r) => r.json()).then(setCategories).catch(() => {})
  }, [])

  useEffect(() => {
    if (!postId) return
    fetch(`/api/blog/posts/${postId}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          title: data.title ?? "",
          slug: data.slug ?? "",
          subtitle: data.subtitle ?? "",
          excerpt: data.excerpt ?? "",
          coverImage: data.coverImage ?? "",
          listingImage: data.listingImage ?? "",
          categoryId: data.categoryId ?? "",
          tags: data.tags ?? "",
          source: data.source ?? "",
          metaTitle: data.metaTitle ?? "",
          metaDescription: data.metaDescription ?? "",
          status: data.status ?? "draft",
          publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString().slice(0, 16) : "",
        })
        setContent(data.content ?? "")
        setSlugManual(true)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [postId])

  useEffect(() => {
    if (!slugManual && form.title) {
      set("slug", slugify(form.title))
    }
  }, [form.title, slugManual])

  async function save(targetStatus?: "draft" | "published") {
    setError("")
    const finalStatus = targetStatus ?? form.status

    if (!form.title.trim()) { setError("Título é obrigatório"); return }
    if (!content || content === "<p></p>") { setError("Conteúdo é obrigatório"); return }

    setSaving(true)
    try {
      const url = postId ? `/api/blog/posts/${postId}` : "/api/blog/posts"
      const method = postId ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, content, status: finalStatus }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Erro ao salvar")

      if (!postId) {
        showToast("Post criado com sucesso!")
        router.push(`/admin/blog/posts/${json.id}/edit`)
      } else {
        set("status", finalStatus)
        showToast(finalStatus === "published" ? "Publicado!" : "Salvo como rascunho!")
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao salvar")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="size-6 animate-spin text-gray-400" />
      </div>
    )
  }

  const isPublished = form.status === "published"

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium bg-green-600 text-white">
          <Check className="size-4" />
          {toast}
        </div>
      )}

      {/* Top bar */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => router.push("/admin/blog/posts")}
          className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-900">
            {postId ? "Editar post" : "Novo post"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
              isPublished ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
            )}
          >
            {isPublished ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
            {isPublished ? "Publicado" : "Rascunho"}
          </span>
          <button
            type="button"
            onClick={() => save("draft")}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            Salvar rascunho
          </button>
          <button
            type="button"
            onClick={() => save("published")}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Eye className="size-4" />}
            Publicar
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 text-red-600 text-sm bg-red-50 border border-red-100 px-4 py-3 rounded-xl mb-4">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_300px] gap-4">
        {/* Main */}
        <div className="space-y-4">
          <Section title="Conteúdo principal">
            <Field label="Título" required>
              <input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Título do artigo"
                className={clsx(inputCls, "text-base font-medium")}
              />
            </Field>

            <Field label="Subtítulo">
              <input
                value={form.subtitle}
                onChange={(e) => set("subtitle", e.target.value)}
                placeholder="Um subtítulo complementar (opcional)"
                className={inputCls}
              />
            </Field>

            <Field label="Slug (URL)" hint={`/blog/${form.slug || "slug-gerado-automaticamente"}`}>
              <div className="flex gap-2">
                <input
                  value={form.slug}
                  onChange={(e) => { setSlugManual(true); set("slug", slugify(e.target.value)) }}
                  placeholder="meu-artigo-incrivel"
                  className={clsx(inputCls, "font-mono text-xs")}
                />
                <button
                  type="button"
                  onClick={() => { setSlugManual(false); set("slug", slugify(form.title)) }}
                  className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 transition-colors whitespace-nowrap"
                  title="Gerar automaticamente pelo título"
                >
                  Auto
                </button>
              </div>
            </Field>

            <Field label="Resumo" hint="Aparece na listagem do blog e no meta description quando não preenchido abaixo.">
              <textarea
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                placeholder="Um parágrafo curto de resumo…"
                rows={3}
                className={clsx(inputCls, "resize-none")}
              />
            </Field>
          </Section>

          <Section title="Conteúdo *">
            <RichEditor content={content} onChange={setContent} />
          </Section>

          <Section title="SEO" defaultOpen={false}>
            <Field label="Meta título" hint="Máx. 60 caracteres. Se vazio, usará o título principal.">
              <input
                value={form.metaTitle}
                onChange={(e) => set("metaTitle", e.target.value)}
                maxLength={60}
                placeholder={form.title || "Título para SEO"}
                className={inputCls}
              />
              <div className="text-xs text-gray-400 mt-1 text-right">{form.metaTitle.length}/60</div>
            </Field>
            <Field label="Meta descrição" hint="Máx. 160 caracteres. Se vazia, usará o resumo.">
              <textarea
                value={form.metaDescription}
                onChange={(e) => set("metaDescription", e.target.value)}
                maxLength={160}
                placeholder={form.excerpt || "Descrição para os mecanismos de busca"}
                rows={3}
                className={clsx(inputCls, "resize-none")}
              />
              <div className="text-xs text-gray-400 mt-1 text-right">{form.metaDescription.length}/160</div>
            </Field>
          </Section>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Section title="Publicação">
            <Field label="Status">
              <div className="grid grid-cols-2 gap-2">
                {(["draft", "published"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set("status", s)}
                    className={clsx(
                      "py-2 px-3 rounded-xl border text-sm font-medium transition-all",
                      form.status === s
                        ? s === "published"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-amber-400 bg-amber-50 text-amber-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    )}
                  >
                    {s === "published" ? "Publicado" : "Rascunho"}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Data de publicação" hint="Deixe em branco para usar a data/hora atual.">
              <input
                type="datetime-local"
                value={form.publishedAt}
                onChange={(e) => set("publishedAt", e.target.value)}
                className={inputCls}
              />
            </Field>
          </Section>

          <Section title="Organização">
            <Field label="Categoria">
              <select
                value={form.categoryId}
                onChange={(e) => set("categoryId", e.target.value)}
                className={clsx(inputCls, "cursor-pointer")}
              >
                <option value="">Sem categoria</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </Field>

            <Field label="Tags" hint="Separadas por vírgula.">
              <input
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="saúde, nutrição, bem-estar"
                className={inputCls}
              />
            </Field>

            <Field label="Fonte">
              <input
                value={form.source}
                onChange={(e) => set("source", e.target.value)}
                placeholder="URL de referência ou autor"
                className={inputCls}
              />
            </Field>
          </Section>

          <Section title="Imagens">
            <ImageUploader
              label="Imagem principal"
              hint="Exibida no topo do artigo."
              value={form.coverImage}
              onChange={(url) => set("coverImage", url)}
              aspectRatio="wide"
            />
            <ImageUploader
              label="Imagem para listagem"
              hint="Usada nos cards do blog. Se vazia, usa a principal."
              value={form.listingImage}
              onChange={(url) => set("listingImage", url)}
              aspectRatio="wide"
            />
          </Section>
        </div>
      </div>

      {/* Bottom save bar */}
      <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => router.push("/admin/blog/posts")}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={() => save("draft")}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Salvar rascunho
        </button>
        <button
          type="button"
          onClick={() => save("published")}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Eye className="size-4" />}
          Publicar
        </button>
      </div>
    </div>
  )
}
