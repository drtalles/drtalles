import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { blogCategories, blogPosts } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { name, description, color } = body

  if (!name?.trim()) {
    return NextResponse.json({ error: "Nome é obrigatório" }, { status: 400 })
  }

  const slug = slugify(name)

  const [updated] = await db
    .update(blogCategories)
    .set({ name: name.trim(), slug, description: description?.trim() || null, color: color || "#1B4D6E", updatedAt: new Date() })
    .where(eq(blogCategories.id, id))
    .returning()

  if (!updated) return NextResponse.json({ error: "Categoria não encontrada" }, { status: 404 })

  return NextResponse.json(updated)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  const postsInCategory = await db
    .select({ id: blogPosts.id })
    .from(blogPosts)
    .where(eq(blogPosts.categoryId, id))

  if (postsInCategory.length > 0) {
    return NextResponse.json(
      { error: `Esta categoria possui ${postsInCategory.length} post(s). Remova ou mova os posts antes de excluir.` },
      { status: 409 }
    )
  }

  await db.delete(blogCategories).where(eq(blogCategories.id, id))

  return NextResponse.json({ success: true })
}
