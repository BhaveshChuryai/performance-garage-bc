export default function Breadcrumbs({ items }) {
  return (
    <div className="pg-breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className={`pg-breadcrumb-item ${item.active ? "active" : ""}`}>
          {item.label}
          {index < items.length - 1 && <span className="pg-breadcrumb-sep">›</span>}
        </span>
      ))}
    </div>
  );
}
