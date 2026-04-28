import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { blogCategories } from "@/db/schema"
import { asc, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const categories = await db
    .select()
    .from(blogCategories)
    .orderBy(asc(blogCategories.name))

  return NextResponse.json(categories)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { name, description, color } = body

  if (!name?.trim()) {
    return NextResponse.json({ error: "Nome é obrigatório" }, { status: 400 })
  }

  const slug = slugify(name)

  const existing = await db
    .select({ id: blogCategories.id })
    .from(blogCategories)
    .where(eq(blogCategories.slug, slug))

  if (existing.length > 0) {
    return NextResponse.json({ error: "Já existe uma categoria com este nome" }, { status: 409 })
  }

  const [category] = await db
    .insert(blogCategories)
    .values({ name: name.trim(), slug, description: description?.trim() || null, color: color || "#1B4D6E" })
    .returning()

  return NextResponse.json(category, { status: 201 })
}
