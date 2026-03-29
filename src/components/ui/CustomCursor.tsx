'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e: MouseEvent) => {
      setDotPos({ x: e.clientX, y: e.clientY });
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) setHovered(true);
    };
    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('a, button, [role="button"]')) setHovered(false);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onEnter);
    window.addEventListener('mouseout', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onEnter);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return (
    <>
      {/* Outer ring — lags slightly */}
      <motion.div
        className="fixed top-0 left-0 z-[999] pointer-events-none hidden lg:block"
        animate={{ x: pos.x - 16, y: pos.y - 16, scale: hovered ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.5 }}
      >
        <div className="w-8 h-8 rounded-full border border-rose/60 mix-blend-difference" />
      </motion.div>

      {/* Inner dot — follows instantly */}
      <motion.div
        className="fixed top-0 left-0 z-[999] pointer-events-none hidden lg:block"
        animate={{ x: dotPos.x - 3, y: dotPos.y - 3 }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      >
        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${hovered ? 'bg-rose' : 'bg-charcoal'}`} />
      </motion.div>
    </>
  );
}
