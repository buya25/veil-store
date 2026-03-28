'use client';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ProductCard } from '@/components/shop/ProductCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants/routes';
import type { Product } from '@/types/api';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products.length) return null;

  return (
    <section className="py-20 md:py-28 bg-ivory-dark">
      <Container>
        <ScrollReveal>
          <SectionTitle
            subtitle="Featured"
            title="Curated for your home"
            align="center"
            className="mb-12"
          />
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 4).map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.1}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={ROUTES.shop}>
            <Button variant="outline" size="lg">View All Products</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
