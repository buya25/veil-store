'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Measure your window',
    body: 'Width and drop to the millimetre. We ship to exact size — no hemming, no alterations.',
  },
  {
    number: '02',
    title: 'Choose your fabric',
    body: 'From weightless voile that scatters morning light, to dense velvet that absorbs every sound.',
  },
  {
    number: '03',
    title: 'Watch it arrive',
    body: 'Hand-pressed, rolled on a cardboard tube, delivered flat. Hung in minutes.',
  },
  {
    number: '04',
    title: 'Live in the light',
    body: 'Each panel is designed to move — catching drafts, diffusing noon glare, pooling at the floor.',
  },
];

export function HowItDrapes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative overflow-hidden bg-charcoal text-ivory py-24 md:py-36">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-e4H1pL-xdRY?auto=format&fit=crop&w=1200&q=60")', backgroundSize: 'cover' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mb-16 md:mb-24"
        >
          <p className="font-sans text-xs uppercase tracking-widest text-rose mb-4">The process</p>
          <h2 className="font-serif text-4xl md:text-6xl font-light leading-none">
            How it<br />
            <em className="not-italic text-ivory/50">drapes.</em>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 + 0.2 }}
              className="bg-charcoal p-8 md:p-10 flex flex-col gap-6 group hover:bg-white/5 transition-colors duration-500"
            >
              <span className="font-serif text-5xl font-light text-white/10 group-hover:text-rose/20 transition-colors duration-500">
                {step.number}
              </span>
              <div>
                <h3 className="font-serif text-xl font-light text-ivory mb-3">{step.title}</h3>
                <p className="font-sans text-sm text-ivory/50 leading-relaxed">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom pull-quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 font-serif text-xl md:text-2xl font-light italic text-ivory/40 text-center max-w-2xl mx-auto"
        >
          &ldquo;Light is not decoration. It is the room.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
