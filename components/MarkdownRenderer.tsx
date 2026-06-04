"use client";

import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState, useEffect } from "react";

export default function MarkdownRenderer({ content }: { content: string }) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark mode during SSR to match server HTML and avoid hydration errors
  const isLight = mounted && (theme === 'light' || (theme === 'system' && systemTheme === 'light'));

  return (
    <ReactMarkdown
      components={{
        pre({ children }) {
          // Remove default <pre> wrapper to prevent double background from Tailwind Typography
          return <>{children}</>;
        },
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          const isInline = inline || !match;
          
          if (isInline) {
            return (
              <code className={`${className} bg-[var(--c-box)] px-1.5 py-0.5 rounded text-(--c-red) font-[family:var(--font-mono)]`} {...props}>
                {children}
              </code>
            );
          }

          const language = match ? match[1] : 'text';
          const codeString = String(children).replace(/\n$/, '');
          
          return (
            <CodeBlock 
              codeString={codeString} 
              language={language} 
              props={props} 
              isLight={isLight}
            />
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

function CodeBlock({ codeString, language, props, isLight }: any) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full rounded-xl overflow-hidden my-6 border ${isLight ? 'border-[var(--c-border)] bg-[#f6f8fa] shadow-md' : 'border-[#222] bg-black shadow-2xl'} font-[family:var(--font-mono)]`}>
      {/* Carbon-style Window Header */}
      <div className={`flex items-center justify-between px-4 py-2.5 border-b ${isLight ? 'bg-[#eaecef] border-[var(--c-border)]' : 'bg-[#111] border-[#222]'}`}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className={`ml-2 text-xs font-[family:var(--font-submenu)] font-bold tracking-widest uppercase opacity-80 ${isLight ? 'text-[#666]' : 'text-[#888]'}`}>{language}</span>
        </div>
        
        <button 
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-xs transition-colors focus:outline-none ${isLight ? 'text-[#666] hover:text-black' : 'text-[#888] hover:text-white'}`}
          title="Copy code"
        >
          {copied ? (
            <>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="14" width="14" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="14" width="14" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      {/* Code Content */}
      <div className="relative">
        <SyntaxHighlighter
          {...props}
          style={isLight ? ghcolors : vscDarkPlus}
          language={language}
          PreTag="div"
          showLineNumbers={true}
          wrapLines={true}
          lineNumberStyle={{
            display: "inline-block",
            minWidth: "3ch",
            paddingRight: "1ch",
            color: isLight ? "#999" : "#777",
            textAlign: "right",
            userSelect: "none",
            borderRight: isLight ? "1px solid var(--c-border)" : "1px solid #222",
            marginRight: "1ch"
          }}
          customStyle={{
            margin: 0,
            backgroundColor: isLight ? "#f6f8fa" : "#000000",
            padding: "1rem",
            fontSize: "0.95rem",
            lineHeight: "1.5",
            fontFamily: "var(--font-mono)",
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
