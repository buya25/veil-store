'use client';
import { useQuery } from '@tanstack/react-query';
import { Container } from '@/components/ui/Container';
import { ProductCard } from '@/components/shop/ProductCard';
import { getRelatedProducts } from '@/lib/api/products';

interface RelatedProductsProps {
  productId: string;
  currentSlug: string;
}

export function RelatedProducts({ productId, currentSlug }: RelatedProductsProps) {
  const { data: related } = useQuery({
    queryKey: ['related', productId],
    queryFn: () => getRelatedProducts(productId),
    enabled: !!productId,
    staleTime: 120_000,
  });

  const products = (related ?? []).filter((p) => p.slug !== currentSlug).slice(0, 4);
  if (!products.length) return null;

  return (
    <section className="py-16 border-t border-linen mt-8">
      <Container>
        <div className="mb-8">
          <p className="font-sans text-xs uppercase tracking-widest text-slate mb-1">You may also like</p>
          <h2 className="font-serif text-2xl font-light text-charcoal">From the same collection</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
