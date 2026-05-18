// components/TickerBar.tsx
import { TICKER_ITEMS } from "@/lib/menu-data";

export default function TickerBar() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <footer className="footer-ticker py-2 overflow-hidden flex items-center w-full" aria-label="Info warung">
      
      {/* Copyright kiri — fixed, tidak ikut scroll */}
      <span
        style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "clamp(0.70rem, 2vw, 0.90rem)",
          color:         "white",
          whiteSpace:    "nowrap",
          padding:       "0 12px",
          flexShrink:    0,
          borderRight:   "1px solid red",
        }}
      >
        © {new Date().getFullYear()} Mohammad Fathuloh
      </span>

      {/* Ticker scroll */}
      <div className="overflow-hidden flex-1">
        <div className="ticker-track select-none" aria-hidden="true">
          {items.map((item, i) => (
            <span key={i} className="px-6">
              {item}
              <span className="ml-6 text-(--c-red)">|</span>
            </span>
          ))}
        </div>
      </div>

    </footer>
  );
}