'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { LIGHT_MODES, type LightMode } from '@/lib/constants/lightModes';
import { cn } from '@/lib/utils/cn';

interface LightSimulatorProps {
  imageUrl: string;
  productName: string;
}

export function LightSimulator({ imageUrl, productName }: LightSimulatorProps) {
  const [mode, setMode] = useState<LightMode>('noon');
  const config = LIGHT_MODES[mode];

  return (
    <div className="space-y-4">
      {/* Label */}
      <div>
        <h3 className="font-sans text-xs uppercase tracking-widest text-slate">Light Simulator</h3>
        <p className="font-sans text-xs text-slate-light mt-1">{config.description}</p>
      </div>

      {/* Image stack */}
      <div className="relative overflow-hidden bg-linen" style={{ aspectRatio: '4/3' }}>
        {/* Base image */}
        <Image
          src={imageUrl}
          alt={`${productName} — ${config.label}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Light overlay — animated on mode change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundColor: config.overlayColor,
              filter: `brightness(${config.brightness}) saturate(${config.saturate})`,
            }}
          />
        </AnimatePresence>

        {/* Directional light beam */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`beam-${mode}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 80% at ${
                mode === 'dawn' ? '20% 30%' :
                mode === 'noon' ? '50% 0%' :
                mode === 'golden' ? '85% 40%' :
                '50% 120%'
              }, ${config.shadowColor} 0%, transparent 70%)`,
              mixBlendMode: mode === 'night' ? 'multiply' : 'overlay',
            }}
          />
        </AnimatePresence>

        {/* Time badge */}
        <div className="absolute top-3 right-3 bg-charcoal/60 backdrop-blur-sm px-3 py-1">
          <span className="font-sans text-[10px] uppercase tracking-widest text-ivory">{config.label}</span>
        </div>
      </div>

      {/* Mode selector */}
      <div className="flex gap-2">
        {(Object.keys(LIGHT_MODES) as LightMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              'flex-1 py-2 px-1 font-sans text-[10px] uppercase tracking-wider border transition-all duration-300',
              mode === m
                ? 'bg-charcoal text-ivory border-charcoal'
                : 'bg-transparent text-slate border-linen hover:border-charcoal hover:text-charcoal',
            )}
          >
            {LIGHT_MODES[m].label}
          </button>
        ))}
      </div>
    </div>
  );
}
