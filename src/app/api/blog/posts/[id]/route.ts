import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { blogPosts, blogCategories } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

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

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  const [post] = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      subtitle: blogPosts.subtitle,
      excerpt: blogPosts.excerpt,
      content: blogPosts.content,
      coverImage: blogPosts.coverImage,
      listingImage: blogPosts.listingImage,
      status: blogPosts.status,
      publishedAt: blogPosts.publishedAt,
      readingTime: blogPosts.readingTime,
      tags: blogPosts.tags,
      source: blogPosts.source,
      metaTitle: blogPosts.metaTitle,
      metaDescription: blogPosts.metaDescription,
      categoryId: blogPosts.categoryId,
      categoryName: blogCategories.name,
      createdAt: blogPosts.createdAt,
      updatedAt: blogPosts.updatedAt,
    })
    .from(blogPosts)
    .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
    .where(eq(blogPosts.id, id))

  if (!post) return NextResponse.json({ error: "Post não encontrado" }, { status: 404 })

  return NextResponse.json(post)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const {
    title, slug: customSlug, subtitle, excerpt, content,
    coverImage, listingImage, categoryId, tags, source,
    metaTitle, metaDescription, status, publishedAt,
  } = body

  if (!title?.trim()) {
    return NextResponse.json({ error: "Título é obrigatório" }, { status: 400 })
  }

  const slug = customSlug?.trim() ? slugify(customSlug) : slugify(title)

  const existing = await db
    .select({ id: blogPosts.id })
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))

  if (existing.length > 0 && existing[0].id !== id) {
    return NextResponse.json({ error: "Já existe outro post com este slug" }, { status: 409 })
  }

  const resolvedStatus = status === "published" ? "published" : "draft"

  const currentPost = await db.select({ publishedAt: blogPosts.publishedAt, status: blogPosts.status })
    .from(blogPosts).where(eq(blogPosts.id, id))

  let resolvedPublishedAt = currentPost[0]?.publishedAt ?? null
  if (resolvedStatus === "published" && !resolvedPublishedAt) {
    resolvedPublishedAt = publishedAt ? new Date(publishedAt) : new Date()
  } else if (publishedAt) {
    resolvedPublishedAt = new Date(publishedAt)
  } else if (resolvedStatus === "draft") {
    resolvedPublishedAt = null
  }

  const readingTime = content ? estimateReadingTime(content) : undefined

  const [updated] = await db
    .update(blogPosts)
    .set({
      title: title.trim(),
      slug,
      subtitle: subtitle?.trim() || null,
      excerpt: excerpt?.trim() || null,
      ...(content !== undefined && { content }),
      coverImage: coverImage || null,
      listingImage: listingImage || null,
      categoryId: categoryId || null,
      tags: tags || null,
      source: source?.trim() || null,
      metaTitle: metaTitle?.trim() || null,
      metaDescription: metaDescription?.trim() || null,
      status: resolvedStatus,
      publishedAt: resolvedPublishedAt,
      ...(readingTime !== undefined && { readingTime }),
      updatedAt: new Date(),
    })
    .where(eq(blogPosts.id, id))
    .returning()

  if (!updated) return NextResponse.json({ error: "Post não encontrado" }, { status: 404 })

  revalidateTag("blog-posts")
  return NextResponse.json(updated)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  await db.delete(blogPosts).where(eq(blogPosts.id, id))

  revalidateTag("blog-posts")
  return NextResponse.json({ success: true })
}
