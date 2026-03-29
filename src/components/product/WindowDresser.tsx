'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { cn } from '@/lib/utils/cn';

type FabricId = 'sheer' | 'voile' | 'linen' | 'blackout' | 'velvet';
type TimeId = 'dawn' | 'noon' | 'golden' | 'night';

const FABRICS: { id: FabricId; label: string; opacity: number; blur: number; desc: string }[] = [
  { id: 'sheer',    label: 'Sheer',    opacity: 0.14, blur: 4, desc: 'Gossamer-light. Daylight pours through freely.' },
  { id: 'voile',    label: 'Voile',    opacity: 0.28, blur: 2, desc: 'Soft diffusion. Privacy without darkness.' },
  { id: 'linen',    label: 'Linen',    opacity: 0.70, blur: 0, desc: 'Warm and textured. Filters the afternoon gently.' },
  { id: 'velvet',   label: 'Velvet',   opacity: 0.92, blur: 0, desc: 'Sumptuous weight. Absorbs light and sound.' },
  { id: 'blackout', label: 'Blackout', opacity: 0.98, blur: 0, desc: 'Total darkness. Light surrenders completely.' },
];

const COLORS = [
  { id: 'ivory',    label: 'Ivory',    hex: '#F5F0E8' },
  { id: 'natural',  label: 'Natural',  hex: '#D4C5A9' },
  { id: 'chalk',    label: 'Chalk',    hex: '#F0EBE3' },
  { id: 'charcoal', label: 'Charcoal', hex: '#2A2A2A' },
  { id: 'slate',    label: 'Slate',    hex: '#7A8A9A' },
  { id: 'navy',     label: 'Navy',     hex: '#1B2A4A' },
  { id: 'blush',    label: 'Blush',    hex: '#E8C4B8' },
  { id: 'sage',     label: 'Sage',     hex: '#9CAF88' },
  { id: 'bordeaux', label: 'Bordeaux', hex: '#722F37' },
];

const TIMES: { id: TimeId; label: string; sky: string; beam: string; ambient: string }[] = [
  {
    id: 'dawn',
    label: 'Dawn',
    sky: 'linear-gradient(180deg, #FF9A8B 0%, #FFCBA4 45%, #FFF5CC 100%)',
    beam: 'rgba(255, 185, 100, 0.55)',
    ambient: 'rgba(255, 155, 80, 0.11)',
  },
  {
    id: 'noon',
    label: 'Noon',
    sky: 'linear-gradient(180deg, #4A90D9 0%, #87CEEB 45%, #D4EEFF 100%)',
    beam: 'rgba(210, 235, 255, 0.80)',
    ambient: 'rgba(170, 215, 255, 0.07)',
  },
  {
    id: 'golden',
    label: 'Golden',
    sky: 'linear-gradient(180deg, #B03010 0%, #E06020 25%, #F09020 55%, #F8D060 85%, #FFF0A0 100%)',
    beam: 'rgba(255, 145, 45, 0.72)',
    ambient: 'rgba(255, 125, 35, 0.17)',
  },
  {
    id: 'night',
    label: 'Night',
    sky: 'linear-gradient(180deg, #060610 0%, #0C0E28 50%, #161838 100%)',
    beam: 'rgba(25, 25, 70, 0.25)',
    ambient: 'rgba(0, 0, 15, 0.55)',
  },
];

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface WindowDresserProps {
  compact?: boolean;
}

export function WindowDresser({ compact = false }: WindowDresserProps) {
  const [fabricId, setFabricId] = useState<FabricId>('linen');
  const [colorId, setColorId]   = useState('ivory');
  const [timeId, setTimeId]     = useState<TimeId>('noon');
  const [isOpen, setIsOpen]     = useState(false);

  const fabric = FABRICS.find((f) => f.id === fabricId)!;
  const color  = COLORS.find((c) => c.id === colorId)!;
  const time   = TIMES.find((t) => t.id === timeId)!;

  const lightLeak    = 1 - fabric.opacity;
  const roomDarkness = isOpen ? 0 : fabric.opacity * 0.65;
  const curtainColor = hexToRgba(color.hex, fabric.opacity);

  // Fold texture — tighter when gathered (open), relaxed when hanging (closed)
  const foldGradient = isOpen
    ? 'repeating-linear-gradient(to right, rgba(0,0,0,0.14) 0px, rgba(255,255,255,0.06) 5px, rgba(0,0,0,0.10) 10px, rgba(255,255,255,0.04) 15px, rgba(0,0,0,0.12) 20px, transparent 25px)'
    : 'repeating-linear-gradient(to right, rgba(0,0,0,0.08) 0%, rgba(255,255,255,0.04) 14%, rgba(0,0,0,0.06) 28%, rgba(255,255,255,0.02) 42%, rgba(0,0,0,0.07) 56%, transparent 70%)';

  return (
    <div className={cn('space-y-8', compact && 'space-y-6')}>

      {/* ═══════════════════ SCENE ═══════════════════ */}
      <div
        className="relative overflow-hidden w-full select-none"
        style={{ aspectRatio: compact ? '4/3' : '16/9', backgroundColor: '#1C1916' }}
      >
        {/* ── Floor ── */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: '18%', background: 'linear-gradient(180deg, #2A2218 0%, #1A1610 100%)' }}
        />
        {/* Baseboard */}
        <div
          className="absolute left-0 right-0"
          style={{ bottom: '18%', height: 2, backgroundColor: '#3A2E26' }}
        />

        {/* ── Room ambient from window ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: isOpen ? 1 : lightLeak * 0.65 + 0.08 }}
          transition={{ duration: 0.85 }}
          style={{
            background: `radial-gradient(ellipse 52% 58% at 50% 18%, ${time.beam} 0%, transparent 68%)`,
          }}
        />

        {/* ── Time-of-day colour wash ── */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-[800ms]"
          style={{ background: `radial-gradient(ellipse 80% 70% at 50% 25%, ${time.ambient} 0%, transparent 70%)` }}
        />

        {/* ── Darkness veil (blackout/velvet closed) ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: '#000' }}
          animate={{ opacity: roomDarkness }}
          transition={{ duration: 0.85 }}
        />

        {/* ── Curtain rod ── */}
        <div
          className="absolute left-0 right-0"
          style={{ top: '8%', height: 4, background: 'linear-gradient(180deg, #5A4A3A 0%, #3A2E26 60%, #4A3B30 100%)', zIndex: 20 }}
        />
        {/* Finials */}
        {['left', 'right'].map((side) => (
          <div
            key={side}
            className="absolute"
            style={{
              top: 'calc(8% - 5px)',
              left: side === 'left' ? '1.5%' : undefined,
              right: side === 'right' ? '1.5%' : undefined,
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #7A6050, #3A2E26)',
              zIndex: 21,
            }}
          />
        ))}

        {/* ── Window frame ── */}
        <div
          className="absolute"
          style={{ left: '30%', right: '30%', top: '8%', bottom: '18%', zIndex: 5 }}
        >
          {/* Outer frame */}
          <div className="absolute inset-0" style={{ backgroundColor: '#3A2E26' }} />
          {/* Sky glass */}
          <div
            className="absolute transition-all duration-[800ms]"
            style={{ inset: 4, background: time.sky }}
          />
          {/* Light beam through glass */}
          <div
            className="absolute pointer-events-none transition-all duration-[800ms]"
            style={{ inset: 4, background: `radial-gradient(ellipse 85% 65% at 50% 0%, ${time.beam} 0%, transparent 75%)` }}
          />
          {/* Pane dividers */}
          <div
            className="absolute"
            style={{ top: '50%', left: 4, right: 4, height: 3, backgroundColor: '#3A2E26', transform: 'translateY(-50%)' }}
          />
          <div
            className="absolute"
            style={{ left: '50%', top: 4, bottom: 4, width: 3, backgroundColor: '#3A2E26', transform: 'translateX(-50%)' }}
          />
          {/* Window sill */}
          <div
            className="absolute"
            style={{ bottom: -8, left: -6, right: -6, height: 8, backgroundColor: '#4A3B30' }}
          />
        </div>

        {/* ── Floor light pool ── */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            bottom: 0, left: '30%', right: '30%', height: '18%',
            background: `linear-gradient(180deg, ${time.beam.replace(/[\d.]+\)$/, '0.38)')} 0%, transparent 100%)`,
            zIndex: 4,
          }}
          animate={{ opacity: isOpen ? lightLeak : 0 }}
          transition={{ duration: 0.85 }}
        />

        {/* ── Left curtain panel ── */}
        <motion.div
          className="absolute"
          style={{ top: '8%', left: 0, bottom: 0, zIndex: 10, overflow: 'hidden' }}
          animate={{ width: isOpen ? '28%' : '50%' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 transition-all duration-[800ms]"
            style={{
              backgroundColor: curtainColor,
              backdropFilter: fabric.blur > 0 ? `blur(${fabric.blur}px)` : undefined,
            }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: foldGradient }} />
          <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
            style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.25) 0%, transparent 100%)' }} />
        </motion.div>

        {/* ── Right curtain panel ── */}
        <motion.div
          className="absolute"
          style={{ top: '8%', right: 0, bottom: 0, zIndex: 10, overflow: 'hidden' }}
          animate={{ width: isOpen ? '28%' : '50%' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 transition-all duration-[800ms]"
            style={{
              backgroundColor: curtainColor,
              backdropFilter: fabric.blur > 0 ? `blur(${fabric.blur}px)` : undefined,
            }}
          />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: foldGradient, transform: 'scaleX(-1)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
            style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.25) 0%, transparent 100%)' }} />
        </motion.div>

        {/* ── Badges ── */}
        <div className="absolute top-3 right-3 pointer-events-none" style={{ zIndex: 30 }}>
          <span className="font-sans text-[9px] uppercase tracking-widest px-2.5 py-1.5 block"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#F5F0E8', backdropFilter: 'blur(4px)' }}>
            {time.label}
          </span>
        </div>
        <div className="absolute bottom-[20%] left-3 pointer-events-none" style={{ zIndex: 30 }}>
          <span className="font-sans text-[9px] uppercase tracking-widest px-2.5 py-1.5 block"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#F5F0E8', backdropFilter: 'blur(4px)' }}>
            {fabric.label} · {color.label} · {isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>

      {/* ═══════════════════ CONTROLS ═══════════════════ */}
      <div className={cn('grid gap-8', compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2')}>

        {/* ── Left column: Open/Close + Fabric ── */}
        <div className="space-y-6">

          {/* Open / Closed */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-slate mb-3">Position</p>
            <div className="flex gap-2">
              {[false, true].map((open) => (
                <button
                  key={String(open)}
                  onClick={() => setIsOpen(open)}
                  className={cn(
                    'flex-1 py-3 font-sans text-xs uppercase tracking-widest border transition-all duration-300',
                    isOpen === open
                      ? 'bg-charcoal text-ivory border-charcoal'
                      : 'text-slate border-linen hover:border-charcoal hover:text-charcoal',
                  )}
                >
                  {open ? 'Open' : 'Closed'}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric type */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-slate mb-3">Fabric</p>
            <div className="flex flex-col gap-1.5">
              {FABRICS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFabricId(f.id)}
                  className={cn(
                    'flex items-start justify-between gap-4 px-4 py-3 border text-left transition-all duration-300',
                    fabricId === f.id
                      ? 'bg-charcoal border-charcoal'
                      : 'border-linen hover:border-charcoal/50',
                  )}
                >
                  <span className={cn(
                    'font-sans text-xs uppercase tracking-widest flex-shrink-0',
                    fabricId === f.id ? 'text-ivory' : 'text-charcoal',
                  )}>
                    {f.label}
                  </span>
                  <span className={cn(
                    'font-sans text-xs text-right',
                    fabricId === f.id ? 'text-ivory/55' : 'text-slate',
                  )}>
                    {f.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right column: Time + Color ── */}
        <div className="space-y-6">

          {/* Time of day */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-slate mb-3">Light</p>
            <div className="grid grid-cols-4 gap-2">
              {TIMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTimeId(t.id)}
                  className={cn(
                    'py-3 font-sans text-xs uppercase tracking-wider border transition-all duration-300',
                    timeId === t.id
                      ? 'bg-charcoal text-ivory border-charcoal'
                      : 'text-slate border-linen hover:border-charcoal hover:text-charcoal',
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color swatches */}
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-slate mb-3">
              Colour —{' '}
              <span className="normal-case text-charcoal">{color.label}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColorId(c.id)}
                  title={c.label}
                  className="w-8 h-8 rounded-full transition-all duration-200"
                  style={{
                    backgroundColor: c.hex,
                    outline: colorId === c.id ? `2px solid #1A1A1A` : '2px solid transparent',
                    outlineOffset: 2,
                    boxShadow: colorId === c.id ? '0 0 0 4px rgba(26,26,26,0.12)' : undefined,
                    transform: colorId === c.id ? 'scale(1.15)' : undefined,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Fabric description callout */}
          <div className="border-l-2 border-rose pl-4 py-1">
            <p className="font-serif text-base font-light text-charcoal italic leading-snug">
              {fabric.desc}
            </p>
          </div>

          {/* Shop CTA */}
          <Link
            href={`${ROUTES.shop}?search=${fabricId}`}
            className="inline-flex items-center gap-2 bg-charcoal text-ivory font-sans text-xs uppercase tracking-widest px-6 py-3 hover:bg-charcoal/85 transition-colors duration-300 self-start"
          >
            Shop {fabric.label} Curtains
            <span className="text-sm leading-none">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
