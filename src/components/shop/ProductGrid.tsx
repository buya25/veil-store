'use client';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';
import type { Product } from '@/types/api';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  count?: number;
  searchQuery?: string;
}

export function ProductGrid({ products, loading, count = 8, searchQuery }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="font-serif text-2xl font-light text-charcoal">
          {searchQuery ? `No results for "${searchQuery}"` : 'No products found'}
        </p>
        <p className="font-sans text-sm text-slate mt-2">
          {searchQuery ? 'Try a different search term or browse all products' : 'Try adjusting your filters'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
