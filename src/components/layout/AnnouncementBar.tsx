'use client';
import { useState } from 'react';
import { X } from 'lucide-react';

const MESSAGES = [
  'Free shipping on orders over $200',
  'Handcrafted in Europe · Ships in 5–7 days',
  'New: Midnight Velvet collection is here',
];

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  if (!visible) return null;

  return (
    <div className="bg-charcoal text-ivory py-2.5 px-4 flex items-center justify-center gap-4 relative">
      <button
        onClick={() => setIndex((i) => (i - 1 + MESSAGES.length) % MESSAGES.length)}
        className="text-ivory/40 hover:text-ivory transition-colors text-xs hidden sm:block"
        aria-label="Previous"
      >
        ←
      </button>
      <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-center">
        {MESSAGES[index]}
      </p>
      <button
        onClick={() => setIndex((i) => (i + 1) % MESSAGES.length)}
        className="text-ivory/40 hover:text-ivory transition-colors text-xs hidden sm:block"
        aria-label="Next"
      >
        →
      </button>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 text-ivory/40 hover:text-ivory transition-colors"
        aria-label="Dismiss"
      >
        <X size={12} />
      </button>
    </div>
  );
}
