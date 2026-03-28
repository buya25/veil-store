import { Container } from '@/components/ui/Container';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getOnSale } from '@/lib/api/products';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'On Sale' };

export default async function SalePage() {
  const products = await getOnSale().catch(() => []);

  return (
    <div className="py-12">
      <Container>
        <SectionTitle subtitle="Limited Time" title="On Sale" className="mb-8" />
        <ProductGrid products={products} />
      </Container>
    </div>
  );
}
