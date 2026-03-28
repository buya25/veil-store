'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MOODS } from '@/lib/constants/moods';
import { ROUTES } from '@/lib/constants/routes';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Container } from '@/components/ui/Container';

export function MoodCollections() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <ScrollReveal className="mb-12 md:mb-16">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-slate">Collections</span>
            <h2 className="font-serif font-light text-charcoal" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              How does your room feel?
            </h2>
          </div>
        </ScrollReveal>

        {/* Grid — 1 large + 4 small */}
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-3 h-[80vh] md:h-[600px]">
          {/* Large card — first mood */}
          <MoodCard mood={MOODS[0]} className="md:row-span-2" large index={0} />
          {/* 4 small cards */}
          {MOODS.slice(1).map((mood, i) => (
            <MoodCard key={mood.slug} mood={mood} index={i + 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function MoodCard({
  mood,
  className = '',
  large = false,
  index,
}: {
  mood: (typeof MOODS)[0];
  className?: string;
  large?: boolean;
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 0.1} className={`relative overflow-hidden group cursor-pointer ${className}`}>
      <Link href={ROUTES.mood(mood.slug)} className="block h-full">
        {/* Background */}
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-full w-full bg-linen relative overflow-hidden">
            <Image
              src={mood.image}
              alt={mood.label}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              onError={() => {}}
            />
          </div>
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent group-hover:from-charcoal/80 transition-all duration-500" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <p className="font-sans text-[10px] uppercase tracking-widest text-ivory/50 mb-1">
            {mood.descriptor}
          </p>
          <h3
            className="font-serif font-light text-ivory"
            style={{ fontSize: large ? 'clamp(1.8rem, 3vw, 2.8rem)' : 'clamp(1.2rem, 2vw, 1.8rem)' }}
          >
            {mood.label}
          </h3>
        </div>
      </Link>
    </ScrollReveal>
  );
}
