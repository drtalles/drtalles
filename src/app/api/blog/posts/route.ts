import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { blogPosts, blogCategories } from "@/db/schema"
import { desc, eq, ilike, or, and } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function estimateReadingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""
  const categoryId = searchParams.get("categoryId") || ""
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "20")
  const offset = (page - 1) * limit

  const conditions = []
  if (search) {
    conditions.push(or(ilike(blogPosts.title, `%${search}%`), ilike(blogPosts.excerpt, `%${search}%`)))
  }
  if (status) conditions.push(eq(blogPosts.status, status))
  if (categoryId) conditions.push(eq(blogPosts.categoryId, categoryId))

  const query = db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      subtitle: blogPosts.subtitle,
      excerpt: blogPosts.excerpt,
      coverImage: blogPosts.coverImage,
      listingImage: blogPosts.listingImage,
      status: blogPosts.status,
      publishedAt: blogPosts.publishedAt,
      readingTime: blogPosts.readingTime,
      tags: blogPosts.tags,
      createdAt: blogPosts.createdAt,
      updatedAt: blogPosts.updatedAt,
      categoryId: blogPosts.categoryId,
      categoryName: blogCategories.name,
      categoryColor: blogCategories.color,
    })
    .from(blogPosts)
    .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .orderBy(desc(blogPosts.updatedAt))
    .limit(limit)
    .offset(offset)

  if (conditions.length > 0) {
    query.where(and(...conditions))
  }

  const posts = await query

  return NextResponse.json({ posts, page, limit })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const {
    title, slug: customSlug, subtitle, excerpt, content,
    coverImage, listingImage, categoryId, tags, source,
    metaTitle, metaDescription, status, publishedAt,
  } = body

  if (!title?.trim()) {
    return NextResponse.json({ error: "Título é obrigatório" }, { status: 400 })
  }
  if (!content?.trim()) {
    return NextResponse.json({ error: "Conteúdo é obrigatório" }, { status: 400 })
  }

  const slug = customSlug?.trim() ? slugify(customSlug) : slugify(title)
  const readingTime = estimateReadingTime(content)

  const existing = await db
    .select({ id: blogPosts.id })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))

  if (existing.length > 0) {
    return NextResponse.json({ error: "Já existe um post com este slug" }, { status: 409 })
  }

  const resolvedStatus = status === "published" ? "published" : "draft"
  const resolvedPublishedAt = resolvedStatus === "published"
    ? (publishedAt ? new Date(publishedAt) : new Date())
    : null

  const [post] = await db
    .insert(blogPosts)
    .values({
      title: title.trim(),
      slug,
      subtitle: subtitle?.trim() || null,
      excerpt: excerpt?.trim() || null,
      content,
      coverImage: coverImage || null,
      listingImage: listingImage || null,
      categoryId: categoryId || null,
      tags: tags || null,
      source: source?.trim() || null,
      metaTitle: metaTitle?.trim() || null,
      metaDescription: metaDescription?.trim() || null,
      status: resolvedStatus,
      publishedAt: resolvedPublishedAt,
      readingTime,
      authorId: session.user?.id as string || null,
    })
    .returning()

  return NextResponse.json(post, { status: 201 })
}
