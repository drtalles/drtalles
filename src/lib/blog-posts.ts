import { db } from "@/lib/db"
import { blogPosts, blogCategories } from "@/db/schema"
import { eq, desc, and, ne } from "drizzle-orm"
import { unstable_cache } from "next/cache"

export type BlogPostSummary = {
  id: string
  slug: string
  title: string
  subtitle: string | null
  excerpt: string | null
  coverImage: string | null
  listingImage: string | null
  tags: string | null
  readingTime: number | null
  publishedAt: Date | null
  categoryId: string | null
  categoryName: string | null
  categoryColor: string | null
}

export type BlogPostFull = BlogPostSummary & {
  content: string
  source: string | null
  metaTitle: string | null
  metaDescription: string | null
}

export type BlogCategory = {
  id: string
  name: string
  slug: string
  color: string | null
}

const publishedFilter = eq(blogPosts.status, "published")

const summaryFields = {
  id: blogPosts.id,
  slug: blogPosts.slug,
  title: blogPosts.title,
  subtitle: blogPosts.subtitle,
  excerpt: blogPosts.excerpt,
  coverImage: blogPosts.coverImage,
  listingImage: blogPosts.listingImage,
  tags: blogPosts.tags,
  readingTime: blogPosts.readingTime,
  publishedAt: blogPosts.publishedAt,
  categoryId: blogPosts.categoryId,
  categoryName: blogCategories.name,
  categoryColor: blogCategories.color,
}

export const getAllPublishedPosts = unstable_cache(
  async (): Promise<BlogPostSummary[]> => {
    return db
      .select(summaryFields)
      .from(blogPosts)
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(publishedFilter)
      .orderBy(desc(blogPosts.publishedAt))
  },
  ["all-published-posts"],
  { tags: ["blog-posts"] }
)

export const getPublishedPostBySlug = unstable_cache(
  async (slug: string): Promise<BlogPostFull | null> => {
    const rows = await db
      .select({
        ...summaryFields,
        content: blogPosts.content,
        source: blogPosts.source,
        metaTitle: blogPosts.metaTitle,
        metaDescription: blogPosts.metaDescription,
      })
      .from(blogPosts)
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(and(publishedFilter, eq(blogPosts.slug, slug)))
      .limit(1)

    return rows[0] ?? null
  },
  ["post-by-slug"],
  { tags: ["blog-posts"] }
)

export const getRelatedPosts = unstable_cache(
  async (currentSlug: string, categoryId: string | null, limit = 3): Promise<BlogPostSummary[]> => {
    const conditions = [publishedFilter, ne(blogPosts.slug, currentSlug)]
    if (categoryId) conditions.push(eq(blogPosts.categoryId, categoryId))

    return db
      .select(summaryFields)
      .from(blogPosts)
      .leftJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(and(...conditions))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit)
  },
  ["related-posts"],
  { tags: ["blog-posts"] }
)

export const getPublishedCategories = unstable_cache(
  async (): Promise<BlogCategory[]> => {
    const rows = await db
      .selectDistinct({
        id: blogCategories.id,
        name: blogCategories.name,
        slug: blogCategories.slug,
        color: blogCategories.color,
      })
      .from(blogPosts)
      .innerJoin(blogCategories, eq(blogPosts.categoryId, blogCategories.id))
      .where(publishedFilter)
      .orderBy(blogCategories.name)

    return rows
  },
  ["published-categories"],
  { tags: ["blog-posts"] }
)

export const getAllPublishedSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const rows = await db
      .select({ slug: blogPosts.slug })
      .from(blogPosts)
      .where(publishedFilter)
    return rows.map((r) => r.slug)
  },
  ["all-published-slugs"],
  { tags: ["blog-posts"] }
)
