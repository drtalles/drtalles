"use client"

import { useRef, useState, DragEvent } from "react"
import { Upload, X, Loader2, ImageIcon, AlertCircle } from "lucide-react"
import { clsx } from "clsx"

type Props = {
  value: string
  onChange: (url: string) => void
  label?: string
  hint?: string
  folder?: string
  aspectRatio?: "wide" | "square" | "free"
}

export default function ImageUploader({
  value,
  onChange,
  label,
  hint,
  folder = "blog",
  aspectRatio = "wide",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [dragging, setDragging] = useState(false)

  async function upload(file: File) {
    setError("")
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("folder", folder)

      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const json = await res.json().catch(() => ({}))

      if (!res.ok) throw new Error(json.error || `Erro ao enviar (${res.status})`)
      if (!json.url) throw new Error("Resposta inválida do servidor")
      onChange(json.url)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao enviar")
    } finally {
      setUploading(false)
    }
  }

  function handleFile(file: File | undefined) {
    if (!file) return
    upload(file)
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  const previewHeightCls = {
    wide: "h-40",
    square: "h-48",
    free: "h-36",
  }[aspectRatio]

  return (
    <div className="space-y-1.5">
      {label && (
        <p className="text-sm font-medium text-gray-700">{label}</p>
      )}

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <img
            src={value}
            alt="Imagem"
            className={clsx("w-full object-cover", previewHeightCls)}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 bg-white rounded-lg text-xs font-medium text-gray-800 hover:bg-gray-100 transition-colors shadow"
            >
              Trocar
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 bg-white rounded-lg text-red-500 hover:bg-red-50 transition-colors shadow"
              title="Remover imagem"
            >
              <X className="size-3.5" />
            </button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <Loader2 className="size-5 animate-spin text-primary" />
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={clsx(
            "relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-all cursor-pointer",
            previewHeightCls,
            dragging
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-gray-200 bg-gray-50 hover:border-primary/50 hover:bg-primary/5",
            uploading && "pointer-events-none"
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="size-6 animate-spin text-primary" />
              <span className="text-xs text-gray-500">Enviando…</span>
            </>
          ) : (
            <>
              <div className="size-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                {dragging ? (
                  <Upload className="size-5 text-primary" />
                ) : (
                  <ImageIcon className="size-5 text-gray-400" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium">
                  {dragging ? "Solte aqui" : "Clique ou arraste"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WebP, GIF • máx. 5MB</p>
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-red-600 text-xs">
          <AlertCircle className="size-3.5 shrink-0" />
          {error}
        </div>
      )}

      {hint && !error && (
        <p className="text-xs text-gray-400">{hint}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  )
}
