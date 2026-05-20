// components/TickerBar.tsx
/**
 * Komponen Ticker Bar yang menampilkan footer dengan copyright dan teks bergulir
 * Mencakup copyright di kiri yang tetap, dan ticker teks yang bergulir di sebelahnya
 */
import { TICKER_ITEMS } from "@/lib/menu-data";

/**
 * Komponen TickerBar - Footer sticky dengan ticker teks bergulir
 * Menampilkan copyright kiri fixed dan info warung yang bergulir terus-menerus
 * @returns JSX element footer dengan ticker animation\n */
export default function TickerBar() {
  // Duplikasi 4x untuk membuat loop ticker yang smooth
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