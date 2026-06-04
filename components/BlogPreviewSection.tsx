"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import JitterTitle from "./JitterTitle";
import { BlogPost } from "@/lib/blog";

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const formatted = new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d);
    return formatted;
  } catch (e) {
    return dateStr;
  }
}

export default function BlogPreviewSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => {
        setPosts(data.slice(0, 3));
      })
      .catch(err => console.error("Failed to load blog posts", err));
  }, []);

  if (!posts || posts.length === 0) return null;

  return (
    <section className="w-full py-12 border-t border-(--c-border) relative z-10" style={{ backgroundColor: "var(--c-void)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="mb-10 border-b-2 border-(--c-border) pb-4 relative">
          <div className="absolute -bottom-0.5 left-0 w-24 h-0.5 bg-(--c-red)" />
          <JitterTitle text="BLOG" />
          <div className="mt-3">
            <span className="text-sm md:text-base font-(--font-submenu) inline box-decoration-clone px-3 py-1 bg-(--c-ash) text-(--c-void) leading-[2.5]">
              Kumpulan cerita, informasi, dan update terbaru dari Mamas Ucok.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl overflow-hidden blog-card-shadow transition-all duration-300 hover:-translate-y-2 border border-(--c-border) bg-(--c-void) h-full"
            >
              {/* Carbon-like Window Top Bar */}
              <div className="flex items-center px-4 py-3 bg-(--c-box) border-b border-(--c-border)">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="mx-auto text-[10px] font-(--font-submenu) text-[#8a8a8a] opacity-0 group-hover:opacity-100 transition-opacity truncate px-2 tracking-wider">
                  /blog/{post.slug}.md
                </div>
              </div>

              {/* Card Content */}
              <div className="flex-1 p-6 relative bg-(--c-box) backdrop-blur-sm flex flex-col">
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-(--c-red) to-transparent opacity-0 group-hover:opacity-5 -translate-y-full group-hover:animate-scanline pointer-events-none" />
                
                <div className="text-[10px] md:text-xs text-(--c-red) mb-3 font-bold tracking-widest uppercase">
                  {formatDate(post.date)}
                </div>
                <h3 className="font-title text-xl md:text-2xl text-(--c-ash) mb-3 group-hover:text-(--c-red) transition-colors drop-shadow-md">
                  {post.title}
                </h3>
                <p className="text-(--c-dim) text-sm leading-relaxed line-clamp-3 font-(--font-submenu) mb-4 flex-1">
                  {post.description}
                </p>
                <div className="mt-auto text-xs text-(--c-red) font-bold tracking-wider opacity-80 group-hover:opacity-100 transition-opacity font-mono">
                  [ BACA ]
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link 
            href="/blog"
            className="btn-bg hover-text inline-block px-6 py-3 font-bold text-sm font-mono"
          >
            [ VIEW ALL POSTS ]
          </Link>
        </div>
        
      </div>
    </section>
  );
}
