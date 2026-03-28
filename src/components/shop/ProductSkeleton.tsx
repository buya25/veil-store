export function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-linen" style={{ aspectRatio: '3/4' }} />
      <div className="mt-3 space-y-2">
        <div className="h-3 bg-linen rounded w-3/4" />
        <div className="h-2 bg-linen rounded w-1/2" />
        <div className="h-3 bg-linen rounded w-1/3" />
      </div>
    </div>
  );
}
