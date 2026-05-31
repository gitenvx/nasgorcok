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
      
      
      {/* Ticker scroll */}
      <div className="overflow-hidden flex-1">
        <div className="ticker-track select-none" aria-hidden="true">
          {items.map((item, i) => (
            <span key={i} className="px-6">
              {item}
              <span className="ml-6 text-[var(--c-red)]">|</span>
            </span>
          ))}
        </div>
      </div>

    </footer>
  );
}