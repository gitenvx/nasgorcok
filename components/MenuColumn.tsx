// components/MenuColumn.tsx
interface MenuColumnProps {
  title:      string;
  items:      string[];
  hasDivider?: boolean;
}

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
            <span className="menu-dot" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}