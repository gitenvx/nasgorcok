import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import JitterTitle from "@/components/JitterTitle";

export const metadata = {
  title: "Blog - Nasi Goreng Mamas Ucok",
  description: "Artikel dan cerita pilihan dari dapur Nasi Goreng Mamas Ucok di Denpasar Bali.",
  openGraph: {
    title: "Blog - Nasi Goreng Mamas Ucok",
    description: "Artikel dan cerita pilihan dari dapur Nasi Goreng Mamas Ucok di Denpasar Bali.",
    url: "https://nasgorcok.com/blog",
    type: "website",
  },
  twitter: {
    title: "Blog - Nasi Goreng Mamas Ucok",
    description: "Artikel dan cerita pilihan dari dapur Nasi Goreng Mamas Ucok di Denpasar Bali.",
  }
};

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

export default async function BlogList({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedParams = await searchParams;
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page, 10) : 1;
  const POSTS_PER_PAGE = 3;

  const allPosts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.max(1, Math.min(page, totalPages));
  
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="min-h-screen pt-8 md:pt-10 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="mb-12">
        <JitterTitle text="BLOG" />
        <div className="mt-4 mb-8">
          <span className="text-sm md:text-base font-(--font-submenu) inline box-decoration-clone px-3 py-1 bg-[var(--c-ash)] text-[var(--c-void)] font-semibold leading-[2.5]">
            Kumpulan cerita, informasi, dan update terbaru dari Mamas Ucok.
          </span>
        </div>
        <div>
          <Link 
            href="/"
            className="btn-bg hover-text inline-block px-4 py-2 font-bold text-sm font-mono"
          >
            [ &lt; RETURN TO BASE ]
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className="group block rounded-xl overflow-hidden blog-card-shadow transition-all duration-300 hover:-translate-y-2 border border-(--c-border) bg-(--c-void)"
          >
            {/* Carbon-like Window Top Bar */}
            <div className="flex items-center px-4 py-3 bg-(--c-box) border-b border-(--c-border)">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="mx-auto text-xs font-(--font-submenu) font-bold tracking-wider text-[#8a8a8a] opacity-0 group-hover:opacity-100 transition-opacity">
                /blog/{post.slug}.md
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 relative bg-(--c-box) backdrop-blur-sm">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-(--c-red) to-transparent opacity-0 group-hover:opacity-5 -translate-y-full group-hover:animate-scanline pointer-events-none" />
              
              <div className="text-xs text-(--c-red) mb-3 font-bold tracking-widest uppercase">
                {formatDate(post.date)}
              </div>
              <h2 className="font-title text-2xl md:text-3xl text-(--c-ash) mb-3 group-hover:text-(--c-red) transition-colors drop-shadow-md">
                {post.title}
              </h2>
              <p className="text-(--c-dim) text-sm md:text-base leading-relaxed line-clamp-3 font-(--font-submenu)">
                {post.description}
              </p>
              <div className="mt-6 text-sm text-(--c-red) font-bold tracking-wider flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                <span>[ BACA ]</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 font-(--font-submenu) font-bold tracking-widest text-sm border-t border-(--c-border) pt-8">
          {currentPage > 1 ? (
            <Link 
              href={`/blog?page=${currentPage - 1}`}
              className="btn-bg hover-text px-4 py-2 border border-(--c-border) rounded-md transition-colors"
            >
              [ &lt; PREV ]
            </Link>
          ) : (
            <div className="px-4 py-2 opacity-30 cursor-not-allowed border border-transparent">[ &lt; PREV ]</div>
          )}
          
          <div className="text-(--c-dim)">
            PAGE {currentPage} OF {totalPages}
          </div>

          {currentPage < totalPages ? (
            <Link 
              href={`/blog?page=${currentPage + 1}`}
              className="btn-bg hover-text px-4 py-2 border border-(--c-border) rounded-md transition-colors"
            >
              [ NEXT &gt; ]
            </Link>
          ) : (
            <div className="px-4 py-2 opacity-30 cursor-not-allowed border border-transparent">[ NEXT &gt; ]</div>
          )}
        </div>
      )}

      <div className="mt-12 text-center">
        <Link 
          href="/"
          className="btn-bg hover-text inline-block px-4 py-2 font-bold text-sm mt-8 font-(--font-submenu) tracking-widest"
        >
          [ &lt; RETURN TO BASE ]
        </Link>
      </div>
    </div>
  );
}
