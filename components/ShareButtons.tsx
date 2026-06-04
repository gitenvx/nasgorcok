"use client";

import { useEffect, useState } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.error("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link artikel disalin ke clipboard!");
    }
  };

  const shareWA = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " | " + url)}`;
  const shareX = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const shareFB = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const shareTelegram = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const shareThreads = `https://threads.net/intent/post?text=${encodeURIComponent(title + " " + url)}`;

  if (!url) return null; // Prevent hydration mismatch

  return (
    <div className="flex flex-wrap items-center gap-3 mt-12 mb-8 pt-6 border-t border-[var(--c-border)] text-[var(--c-ash)]">
      <span className="text-sm font-bold tracking-wider text-(--c-dim) font-mono mr-2">BAGIKAN:</span>
      
      <a href={shareWA} target="_blank" rel="noopener noreferrer" className="p-3 border border-[var(--c-border)] rounded-lg hover:bg-[#25D366] hover:text-white transition-all duration-300 hover:border-[#25D366] hover:scale-110" aria-label="Share on WhatsApp">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>

      <a href={shareTelegram} target="_blank" rel="noopener noreferrer" className="p-3 border border-[var(--c-border)] rounded-lg hover:bg-[#0088cc] hover:text-white transition-all duration-300 hover:border-[#0088cc] hover:scale-110" aria-label="Share on Telegram">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </a>
      
      <a href={shareX} target="_blank" rel="noopener noreferrer" className="p-3 border border-[var(--c-border)] rounded-lg hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all duration-300 hover:border-black dark:hover:border-white hover:scale-110" aria-label="Share on X">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
      </a>

      <a href={shareThreads} target="_blank" rel="noopener noreferrer" className="p-3 border border-[var(--c-border)] rounded-lg hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all duration-300 hover:border-black dark:hover:border-white hover:scale-110" aria-label="Share on Threads">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"></path></svg>
      </a>
      
      <a href={shareFB} target="_blank" rel="noopener noreferrer" className="p-3 border border-[var(--c-border)] rounded-lg hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:border-[#1877F2] hover:scale-110" aria-label="Share on Facebook">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
      </a>

      <button onClick={handleShare} className="p-3 border border-[var(--c-border)] rounded-lg hover:bg-[var(--c-ash)] hover:text-[var(--c-void)] transition-all duration-300 hover:border-[var(--c-ash)] hover:scale-110" aria-label="Share options">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
      </button>
    </div>
  );
}
