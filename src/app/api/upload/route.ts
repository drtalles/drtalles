import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"
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
    const safeName = `${Date.now()}-${hash}.${ext}`

    const uploadDir = path.join(process.cwd(), "public", "uploads", folder)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(path.join(uploadDir, safeName), buffer)

    const url = `/uploads/${folder}/${safeName}`

    return NextResponse.json({ url }, { status: 201 })
  } catch (err) {
    console.error("[upload] erro:", err)
    return NextResponse.json(
      { error: "Erro interno ao processar o upload" },
      { status: 500 }
    )
  }
}
