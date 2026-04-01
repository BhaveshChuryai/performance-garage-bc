export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img shimmer" />
      <div className="skeleton-body">
        <div className="skeleton-line short shimmer" />
        <div className="skeleton-line shimmer" />
        <div className="skeleton-line medium shimmer" />
        <div className="skeleton-specs shimmer" />
        <div className="skeleton-actions shimmer" />
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="cars-grid">
      {Array.from({length:8}).map((_,i) => <SkeletonCard key={i} />)}
    </div>
  );
}
