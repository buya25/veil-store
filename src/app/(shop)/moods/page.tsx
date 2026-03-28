import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { MOODS } from '@/lib/constants/moods';
import { ROUTES } from '@/lib/constants/routes';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Mood Collections' };

export default function MoodsPage() {
  return (
    <div className="py-12">
      <Container>
        <SectionTitle subtitle="Collections" title="How does your room feel?" align="center" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOODS.map((mood) => (
            <Link key={mood.slug} href={ROUTES.mood(mood.slug)} className="group relative overflow-hidden block" style={{ aspectRatio: '4/3' }}>
              <div className="absolute inset-0 bg-linen">
                <Image src={mood.image} alt={mood.label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="33vw" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-sans text-[10px] uppercase tracking-widest text-ivory/50">{mood.descriptor}</p>
                <h3 className="font-serif text-2xl font-light text-ivory mt-1">{mood.label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
