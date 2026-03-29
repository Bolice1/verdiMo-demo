export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`shimmer rounded-md ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="card p-5 space-y-3">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}
