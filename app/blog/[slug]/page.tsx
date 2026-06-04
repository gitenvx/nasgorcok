import { getPostBySlug, getBlogSlugs, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import ShareButtons from "@/components/ShareButtons";

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) {
    return { title: "Not Found" };
  }
  return {
    title: `${post.title} - Mamas Ucok Blog`,
    description: post.description,
    openGraph: {
      title: `${post.title} - Mamas Ucok Blog`,
      description: post.description,
      url: `https://nasgorcok.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Mamas Ucok"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - Mamas Ucok Blog`,
      description: post.description,
    }
  };
}

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
    return `${formatted} | by Mamas Ucok`;
  } catch (e) {
    return dateStr;
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null; // Newer post
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null; // Older post

  return (
    <article className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-5xl mx-auto w-full overflow-hidden">
      <div className="bg-[var(--c-box)] backdrop-blur-md border border-[var(--c-border)] blog-card-shadow rounded-2xl p-4 md:p-12 w-full min-w-0 break-words">
        <div className="mb-10 border-b-2 border-[var(--c-border)] pb-8 relative">
          <div className="absolute -bottom-[2px] left-0 w-24 h-[2px] bg-(--c-red)" />
          <Link 
            href="/blog"
            className="btn-bg hover-text inline-block px-4 py-2 font-bold text-sm mb-8 font-mono"
          >
            [ &lt; RETURN TO BLOG ]
          </Link>
          <div className="text-sm text-(--c-dim) mb-3 font-bold tracking-wider font-[family:var(--font-submenu)]">
            {formatDate(post.date)}
          </div>
          <h1 className="font-[family:var(--font-submenu)] text-3xl md:text-5xl text-[var(--c-heading)] leading-tight drop-shadow-md font-bold">
            {post.title}
          </h1>
        </div>

        <div className="prose prose-invert max-w-none text-base md:text-lg text-(--c-ash) font-[family:var(--font-submenu)] prose-headings:font-mono prose-headings:text-white prose-a:text-(--c-red) prose-a:no-underline hover:prose-a:underline prose-strong:text-(--c-void) prose-strong:bg-(--c-ash) prose-strong:px-1 prose-blockquote:text-(--c-ash) prose-blockquote:border-l-4 prose-blockquote:border-(--c-red) prose-blockquote:bg-[var(--c-box)] prose-blockquote:py-1 prose-blockquote:pr-4 prose-blockquote:pl-4 prose-blockquote:not-italic prose-pre:bg-transparent prose-pre:p-0 prose-pre:border-none prose-img:border-[3px] prose-img:border-(--c-border)">
          <MarkdownRenderer content={post.content} />
        </div>

        <ShareButtons title={post.title} />

        <div className="mt-12 pt-8 border-t border-[var(--c-border)] flex flex-col md:flex-row justify-between gap-6 font-[family:var(--font-submenu)]">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="group flex-1 border border-[var(--c-border)] p-4 rounded-xl hover:border-(--c-red) transition-colors">
              <div className="text-xs text-(--c-dim) mb-1 uppercase tracking-wider">&lt; PREVIOUS POST</div>
              <div className="text-sm md:text-base text-(--c-ash) group-hover:text-(--c-red) transition-colors truncate">{prevPost.title}</div>
            </Link>
          ) : <div className="flex-1"></div>}
          
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="group flex-1 border border-[var(--c-border)] p-4 rounded-xl hover:border-(--c-red) transition-colors text-right">
              <div className="text-xs text-(--c-dim) mb-1 uppercase tracking-wider">NEXT POST &gt;</div>
              <div className="text-sm md:text-base text-(--c-ash) group-hover:text-(--c-red) transition-colors truncate">{nextPost.title}</div>
            </Link>
          ) : <div className="flex-1"></div>}
        </div>
      </div>
    </article>
  );
}
