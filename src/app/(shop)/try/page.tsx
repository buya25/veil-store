import { WindowDresser } from '@/components/product/WindowDresser';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dress Your Window',
  description: 'Visualise how VEIL curtains look in your space. Try every fabric, colour, and light across dawn, noon, golden hour, and night.',
};

export default function TryPage() {
  return (
    <div className="py-12 md:py-20">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mb-10 md:mb-14">
          <p className="font-sans text-xs uppercase tracking-widest text-slate mb-3">Studio</p>
          <h1 className="font-serif text-4xl md:text-6xl font-light text-charcoal leading-none mb-4">
            Dress your window.
          </h1>
          <p className="font-sans text-sm text-slate leading-relaxed max-w-lg">
            Pick a fabric, choose a colour, open or close the panels — then watch what morning, noon, golden hour, and night do to the room. Every combination is a different feeling.
          </p>
        </div>

        {/* The visualizer */}
        <WindowDresser />

        {/* Shop CTA */}
        <div className="mt-14 pt-10 border-t border-linen flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-serif text-2xl font-light text-charcoal">Found your fabric?</p>
            <p className="font-sans text-sm text-slate mt-1">Every VEIL curtain is made to your exact window dimensions.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={ROUTES.shop}
              className="inline-flex items-center justify-center bg-charcoal text-ivory font-sans text-xs uppercase tracking-widest px-8 py-4 hover:bg-charcoal/90 transition-colors"
            >
              Shop All Fabrics
            </Link>
            <Link
              href={ROUTES.windowDna}
              className="inline-flex items-center justify-center border border-charcoal text-charcoal font-sans text-xs uppercase tracking-widest px-8 py-4 hover:bg-charcoal hover:text-ivory transition-colors"
            >
              Measure My Window
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
