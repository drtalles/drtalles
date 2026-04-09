"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Search, ArrowRight, BookOpen } from "lucide-react";
import type { BlogPost } from "@/lib/blog-posts";

type BlogListingClientProps = {
  posts: BlogPost[];
  categories: string[];
};

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogListingClient({
  posts,
  categories,
}: BlogListingClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return posts.filter((post) => {
      const categoryMatch =
        selectedCategory === "Todos" || post.category === selectedCategory;
      const termMatch =
        term.length === 0 ||
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term));

      return categoryMatch && termMatch;
    });
  }, [posts, search, selectedCategory]);

  return (
    <section className="section-pad blog-catalog">
      <div className="container-site">
        <div className="blog-toolbar">
          <div className="blog-search-wrap">
            <Search size={18} aria-hidden />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por título, tema ou palavra-chave..."
              aria-label="Buscar artigos"
            />
          </div>

          <p className="blog-count">
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "artigo encontrado" : "artigos encontrados"}
          </p>
        </div>

        <div className="blog-filter-row" role="toolbar" aria-label="Filtrar por categoria">
          {["Todos", ...categories].map((category) => (
            <button
              key={category}
              type="button"
              className={`blog-filter-chip ${
                selectedCategory === category ? "is-active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="blog-empty-state">
            <h2>Nenhum artigo para esse filtro</h2>
            <p>
              Tente ajustar a busca ou selecionar outra categoria para visualizar os
              conteúdos disponíveis.
            </p>
          </div>
        ) : (
          <div className="blog-post-grid">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className={`blog-post-card ${post.featured ? "is-featured" : ""}`}
              >
                <div className="blog-post-media">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.coverAlt ?? post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1050px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className="blog-post-media-placeholder">
                      <BookOpen size={22} />
                      <span>Imagem do artigo</span>
                    </div>
                  )}
                </div>

                <div className="blog-post-head">
                  <span className="blog-post-category">{post.category}</span>
                  <p className="blog-post-meta">
                    {formatDate(post.publishedAt)} · {post.readingTime} min
                  </p>
                </div>

                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>

                <div className="blog-post-tags" aria-label="Tags do artigo">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <Link href={`/blog/${post.slug}`} className="blog-post-link">
                  Ler artigo
                  <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
