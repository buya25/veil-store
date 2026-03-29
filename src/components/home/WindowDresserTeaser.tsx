'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { WindowDresser } from '@/components/product/WindowDresser';

export function WindowDresserTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-ivory">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14"
        >
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-slate mb-3">The Studio</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal leading-none">
              See it before<br />you hang it.
            </h2>
          </div>
          <p className="font-sans text-sm text-slate max-w-xs leading-relaxed md:text-right">
            Switch fabrics, colours, and light conditions live. Your window, dressed in seconds.
          </p>
        </motion.div>

        {/* Compact visualizer preview */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <WindowDresser compact />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href={ROUTES.try}
            className="inline-flex items-center gap-3 border border-charcoal text-charcoal font-sans text-xs uppercase tracking-widest px-8 py-4 hover:bg-charcoal hover:text-ivory transition-all duration-300"
          >
            Open Full Studio
            <span className="text-base leading-none">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
