// components/MenuColumn.tsx
/**
 * Antarmuka untuk props komponen MenuColumn
 * @param title - Judul menu (misal: "[ Nasi Goreng ]")
 * @param items - Array string berisi item-item menu
 * @param hasDivider - Opsional, menambahkan garis pemisah kanan jika true
 */
interface MenuColumnProps {
  title:      string;
  items:      string[];
  hasDivider?: boolean;
}

/**
 * Komponen kolom menu yang menampilkan judul dan daftar item
 * Digunakan untuk menampilkan daftar nasi goreng dan mie di halaman utama
 * @param props - Props MenuColumnProps
 * @returns JSX element berisi menu dengan styling
 */
export default function MenuColumn({ title, items, hasDivider }: MenuColumnProps) {
  return (
    <div className={`flex flex-col py-4 px-4 md:px-5 ${hasDivider ? "col-divider" : ""}`}>

      <div
        className="menu-header btn-bg mb-3 hover-text"
        style={{ display: "block", width: "100%", textAlign: "center" }}
      >
        {title}
      </div>

      <ul className="space-y-0.5 hover-text">
        {items.map(item => (
          <li key={item} className="menu-item">
            <span className="text-(--c-red) font-bold animate-pulse" aria-hidden="true">&lt;/&gt;</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}