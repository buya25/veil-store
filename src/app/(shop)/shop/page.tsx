'use client';
import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useProducts } from '@/lib/hooks/useProducts';
import { useCategories } from '@/lib/hooks/useCategories';
import { cn } from '@/lib/utils/cn';

const SORT_OPTIONS = [
  { label: 'Newest', value: 'createdAt:desc' },
  { label: 'Price: Low to High', value: 'basePrice:asc' },
  { label: 'Price: High to Low', value: 'basePrice:desc' },
  { label: 'Best Rated', value: 'avgRating:desc' },
];

export default function ShopPage() {
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [sort, setSort] = useState('createdAt:desc');
  const [page, setPage] = useState(1);

  const [sortBy, sortOrder] = sort.split(':') as [string, 'asc' | 'desc'];
  const { data, isLoading } = useProducts({ categoryId, sortBy, sortOrder, page, limit: 12 });
  const { data: categories } = useCategories();

  const products = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="py-12">
      <Container>
        <SectionTitle subtitle="All Products" title="The Collection" className="mb-8" />

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center justify-between mb-8 pb-6 border-b border-linen">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setCategoryId(undefined); setPage(1); }}
              className={cn(
                'font-sans text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-200',
                !categoryId ? 'bg-charcoal text-ivory border-charcoal' : 'border-linen text-charcoal hover:border-charcoal',
              )}
            >
              All
            </button>
            {categories?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setCategoryId(cat.id); setPage(1); }}
                className={cn(
                  'font-sans text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-200',
                  categoryId === cat.id ? 'bg-charcoal text-ivory border-charcoal' : 'border-linen text-charcoal hover:border-charcoal',
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="font-sans text-xs uppercase tracking-widest bg-transparent border border-linen px-4 py-2 text-charcoal focus:outline-none focus:border-charcoal cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Product count */}
        {meta && (
          <p className="font-sans text-xs text-slate mb-6">{meta.total} products</p>
        )}

        <ProductGrid products={products} loading={isLoading} />

        {/* Pagination */}
        {meta && meta.totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  'w-9 h-9 font-sans text-xs border transition-all',
                  page === p ? 'bg-charcoal text-ivory border-charcoal' : 'border-linen text-charcoal hover:border-charcoal',
                )}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
