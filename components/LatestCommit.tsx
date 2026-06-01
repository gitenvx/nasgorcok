"use client";

import React, { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";

export default function LatestCommit() {
  const [commit, setCommit] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data lewat jalur belakang (Server API Route) supaya token aman
    fetch("/api/github")
      .then(res => res.json())
      .then(data => {
        if (data && !data.error && data.commit) {
          setCommit(data);
          setErrorMsg(null);
        } else {
          console.error("Github API Error:", data.error);
          setErrorMsg(data.error || "UNKNOWN ERROR");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch commit", err);
        setErrorMsg("NETWORK ERROR");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="mt-8 border border-[var(--c-border)] p-4 text-center bg-[rgba(10,10,10,0.4)]">
        <span className="text-[var(--c-ash)] opacity-50 font-mono text-xs animate-pulse tracking-widest">[ INITIALIZING GITHUB LINK... ]</span>
      </div>
    );
  }

  if (errorMsg || !commit) {
    return (
      <div className="mt-8 border border-[var(--c-red)] bg-[rgba(204,26,26,0.1)] p-4 text-center">
        <span className="text-[var(--c-red)] opacity-90 font-mono text-xs tracking-widest">[ SYSTEM ERROR: {errorMsg || "NO COMMITS FOUND"} ]</span>
      </div>
    );
  }

  const date = new Date(commit.commit.author.date).toLocaleDateString("id-ID", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  });

  return (
    <div className="mt-8 border border-[var(--c-border)] bg-[rgba(10,10,10,0.6)] p-4 relative overflow-hidden group">
      {/* Decorative scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(232,224,208,0.05)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none opacity-30" />
      
      <div className="text-[var(--c-ash)] opacity-100 text-[11px] uppercase tracking-widest mb-3 font-mono flex items-center gap-2 border-b border-[rgba(232,224,208,0.2)] pb-2 relative z-10">
        <SiGithub className="text-lg" />
        <span>SYSTEM LOG: LATEST COMMIT</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse ml-auto shadow-[0_0_5px_#00ff66]" />
      </div>
      
      <p className="text-[var(--c-ash)] font-mono text-sm mb-4 line-clamp-2 leading-relaxed relative z-10">
        <span className="text-[var(--c-red)] mr-2 font-bold">&gt;</span> 
        {commit.commit.message}
      </p>
      
      <div className="flex justify-between items-end relative z-10">
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] text-[var(--c-ash)] opacity-60 font-mono tracking-widest">signed-off-by: {commit.commit.author.name}</span>
          <span className="text-[9px] text-[var(--c-ash)] opacity-60 font-mono tracking-widest">date: {date}</span>
        </div>
        <a 
          href={commit.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] text-[var(--c-ash)] hover:text-[#0a0a0a] transition-all duration-300 font-mono tracking-wider border border-[var(--c-border)] px-3 py-1.5 hover:bg-[var(--c-border)] hover:shadow-[0_0_10px_rgba(204,162,102,0.5)]"
        >
          [ VIEW DETAIL ]
        </a>
      </div>
    </div>
  );
}
