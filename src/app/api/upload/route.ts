import { auth } from "@/lib/auth"
import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
const MAX_SIZE_MB = 5
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const folder = (formData.get("folder") as string) || "blog"

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Formato inválido. Use JPG, PNG, WebP ou GIF." },
        { status: 415 }
      )
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: `Arquivo muito grande. Máximo ${MAX_SIZE_MB}MB.` },
        { status: 413 }
      )
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
    const hash = crypto.randomBytes(8).toString("hex")
    const safeName = `${folder}/${Date.now()}-${hash}.${ext}`

    const blob = await put(safeName, file, {
      access: "public",
      contentType: file.type,
    })

    return NextResponse.json({ url: blob.url }, { status: 201 })
  } catch (err) {
    console.error("[upload] erro:", err)
    return NextResponse.json(
      { error: "Erro interno ao processar o upload" },
      { status: 500 }
    )
  }
}
