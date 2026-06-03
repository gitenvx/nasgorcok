// components/ThemeToggle.tsx
"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  // Hindari hydration mismatch
  if (!mounted) return null;

  const currentTheme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
      title={`Mode: ${currentTheme === "dark" ? "DARK" : "LIGHT"}`}
      style={{
        position:        "fixed",
        bottom:          "56px", // di atas ticker footer
        left:            "12px",
        zIndex:          50,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        width:           "32px",
        height:          "32px",
        background:      "var(--c-box)",
        border:          "1px solid var(--c-border)",
        backdropFilter:  "blur(6px)",
        cursor:          "pointer",
        color:           "var(--c-ash)",
        transition:      "all 0.2s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-ash)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow  = "0 0 8px rgba(232,224,208,0.25)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-border)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow  = "none";
      }}
    >
      {currentTheme === "dark" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
      )}
    </button>
  );
}
