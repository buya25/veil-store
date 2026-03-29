'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useProducts } from '@/lib/hooks/useProducts';
import { useCategories } from '@/lib/hooks/useCategories';
import { cn } from '@/lib/utils/cn';
import { X } from 'lucide-react';

const SORT_OPTIONS = [
  { label: 'Newest', value: 'createdAt:desc' },
  { label: 'Price: Low to High', value: 'basePrice:asc' },
  { label: 'Price: High to Low', value: 'basePrice:desc' },
  { label: 'Best Rated', value: 'avgRating:desc' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [sort, setSort] = useState('createdAt:desc');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceApplied, setPriceApplied] = useState<{ min?: number; max?: number }>({});
  const minRef = useRef<HTMLInputElement>(null);

  // Sync search from URL (e.g. from header search bar)
  useEffect(() => {
    const q = searchParams.get('search') ?? '';
    setSearch(q);
    setPage(1);
  }, [searchParams]);

  function clearSearch() {
    setSearch('');
    setPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    router.replace(`/shop${params.size ? `?${params}` : ''}`);
  }

  function applyPrice() {
    setPriceApplied({
      min: minPrice ? parseFloat(minPrice) : undefined,
      max: maxPrice ? parseFloat(maxPrice) : undefined,
    });
    setPage(1);
  }

  function clearPrice() {
    setMinPrice('');
    setMaxPrice('');
    setPriceApplied({});
    setPage(1);
  }

  const [sortBy, sortOrder] = sort.split(':') as [string, 'asc' | 'desc'];
  const { data, isLoading } = useProducts({
    categoryId,
    sortBy,
    sortOrder,
    page,
    limit: 12,
    search: search || undefined,
    minPrice: priceApplied.min,
    maxPrice: priceApplied.max,
  });

  const products = data?.data ?? [];
  const meta = data?.meta;
  const hasActiveFilters = !!search || !!categoryId || !!(priceApplied.min || priceApplied.max);

  return (
    <div className="py-12">
      <Container>
        <SectionTitle subtitle="All Products" title="The Collection" className="mb-8" />

        {/* Active search banner */}
        {search && (
          <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-linen/60">
            <p className="font-sans text-sm text-charcoal flex-1">
              Results for <strong>&ldquo;{search}&rdquo;</strong>
              {meta && <span className="text-slate font-normal"> — {meta.total} found</span>}
            </p>
            <button
              onClick={clearSearch}
              className="font-sans text-xs uppercase tracking-widest text-slate hover:text-rose transition-colors flex items-center gap-1"
            >
              <X size={12} /> Clear
            </button>
          </div>
        )}

        {/* Filters row */}
        <div className="space-y-4 mb-8 pb-6 border-b border-linen">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            {/* Category pills */}
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
              {(useCategories().data ?? []).map((cat) => (
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

          {/* Price range */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-sans text-xs uppercase tracking-widest text-slate">Price</span>
            <div className="flex items-center gap-2">
              <input
                ref={minRef}
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                min={0}
                className="w-20 border border-linen px-3 py-1.5 font-sans text-xs text-charcoal placeholder:text-slate focus:outline-none focus:border-charcoal bg-transparent"
              />
              <span className="text-slate font-sans text-xs">—</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                min={0}
                className="w-20 border border-linen px-3 py-1.5 font-sans text-xs text-charcoal placeholder:text-slate focus:outline-none focus:border-charcoal bg-transparent"
              />
            </div>
            <button
              onClick={applyPrice}
              className="font-sans text-xs uppercase tracking-widest px-4 py-1.5 border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory transition-all duration-200"
            >
              Apply
            </button>
            {(priceApplied.min || priceApplied.max) && (
              <button
                onClick={clearPrice}
                className="font-sans text-xs text-slate hover:text-rose transition-colors flex items-center gap-1"
              >
                <X size={11} /> Clear price
              </button>
            )}
          </div>
        </div>

        {/* Product count */}
        {meta && !isLoading && (
          <p className="font-sans text-xs text-slate mb-6">
            {meta.total} {meta.total === 1 ? 'product' : 'products'}
            {hasActiveFilters && ' matching filters'}
          </p>
        )}

        <ProductGrid products={products} loading={isLoading} searchQuery={search} />

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

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
