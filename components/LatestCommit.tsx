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
      <div className="mt-8 border border-(--c-border) p-4 text-center bg-(--c-box)">
        <span className="text-(--c-ash) opacity-50 font-mono text-xs animate-pulse tracking-widest">[ INITIALIZING GITHUB LINK... ]</span>
      </div>
    );
  }

  if (errorMsg || !commit) {
    return (
      <div className="mt-8 border border-(--c-red) bg-[rgba(204,26,26,0.1)] p-4 text-center">
        <span className="text-(--c-red) opacity-90 font-mono text-xs tracking-widest">[ SYSTEM ERROR: {errorMsg || "NO COMMITS FOUND"} ]</span>
      </div>
    );
  }

  const formatCommitDate = (dateString: string) => {
    const d = new Date(dateString);
    const utcMs = d.getTime();
    // Offset +8 hours for WITA
    const nd = new Date(utcMs + (8 * 60 * 60 * 1000));
    
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const dayName = days[nd.getUTCDay()];
    const date = nd.getUTCDate();
    const monthName = months[nd.getUTCMonth()];
    const year = nd.getUTCFullYear();
    const hours = String(nd.getUTCHours()).padStart(2, '0');
    const minutes = String(nd.getUTCMinutes()).padStart(2, '0');
    
    return `${dayName}, ${date} ${monthName} ${year} ${hours}:${minutes} WITA GMT+8`;
  };

  const dateStr = formatCommitDate(commit.commit.author.date);

  return (
    <div className="mt-6 rounded-xl overflow-hidden border border-(--c-border) bg-(--c-box) text-(--c-ash) relative group w-full max-w-4xl mx-auto shadow-[0_10px_30px_var(--c-border)]" style={{ fontFamily: 'var(--font-submenu)' }}>
      {/* Title bar */}
      <div className="flex items-center px-3 py-1.5 border-b border-(--c-border) relative z-10" style={{ backgroundColor: 'rgba(128,128,128,0.05)' }}>
        {/* Window controls (red, yellow, green) */}
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#ff5f56]"></div>
          <div className="w-2 h-2 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-2 h-2 rounded-full bg-[#27c93f]"></div>
        </div>
        {/* Title */}
        <div className="flex-1 text-center text-[10px] md:text-xs font-semibold flex items-center justify-center gap-2 opacity-60 tracking-widest">
          <SiGithub className="text-xs md:text-sm" /> What's New
        </div>
        <div className="w-8"></div> {/* Spacer to center title */}
      </div>
      
      {/* Terminal content */}
      <div className="px-3 py-2 md:px-4 md:py-3 overflow-x-auto hide-scrollbar relative z-10">
        <div className="mb-1.5 text-xs md:text-sm tracking-wide">
          <span className="font-bold">gitenvx</span>
          <span className="opacity-70">:</span>
          <span className="text-(--c-red) font-bold">~/nasgorcok</span>
          <span className="opacity-70 ml-1">$ git log -1</span>
        </div>
        
        <div className="text-xs md:text-sm">
          <div className="flex flex-col opacity-90 leading-tight">
            <span className="font-bold opacity-100 text-(--c-red)">commit {commit.sha}</span>
            <span>Authored: {commit.commit.author.name}</span>
            <span>Date:   {dateStr}</span>
          </div>
          <div className="pt-1.5 pl-3 whitespace-pre-wrap leading-snug border-l-2 border-(--c-border) mt-1.5 opacity-100" style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)' }}>
            {commit.commit.message}
          </div>
        </div>
        
        <div className="mt-3 flex justify-end relative z-10">
          <a 
            href={commit.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] md:text-xs text-(--c-ash) hover:text-(--c-box) transition-all duration-300 tracking-wider border border-(--c-border) px-3 py-1 hover:bg-(--c-ash) hover:shadow-[0_0_10px_rgba(204,162,102,0.5)] font-bold"
          >
            [ VIEW ON GITHUB ]
          </a>
        </div>
      </div>
    </div>
  );
}
