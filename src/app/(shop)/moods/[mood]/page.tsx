'use client';
import { use } from 'react';
import { Container } from '@/components/ui/Container';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useProducts } from '@/lib/hooks/useProducts';
import { MOODS } from '@/lib/constants/moods';
import { getMoodQueryParams } from '@/lib/utils/getMoodProducts';

export default function MoodPage({ params }: { params: Promise<{ mood: string }> }) {
  const { mood: moodSlug } = use(params);
  const mood = MOODS.find((m) => m.slug === moodSlug);
  const queryParams = getMoodQueryParams(moodSlug);
  const { data, isLoading } = useProducts({ search: queryParams.search, limit: 12 });

  return (
    <div className="py-12">
      <Container>
        <SectionTitle
          subtitle={mood?.descriptor ?? 'Collection'}
          title={mood?.label ?? moodSlug}
          className="mb-8"
        />
        <ProductGrid products={data?.data ?? []} loading={isLoading} />
      </Container>
    </div>
  );
}
