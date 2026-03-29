export interface MoodConfig {
  slug: string;
  label: string;
  descriptor: string;
  image: string;
  categoryQuery: string;
  accent: string;
}

export const MOODS: MoodConfig[] = [
  {
    slug: 'morning-person',
    label: 'Morning Person',
    descriptor: 'Soft light. Slow coffee.',
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80',
    categoryQuery: 'sheer',
    accent: '#E8D5C0',
  },
  {
    slug: 'golden-hour',
    label: 'Golden Hour',
    descriptor: 'Warmth you can touch.',
    image: 'https://images.unsplash.com/photo-1586023492125-27272f769098?auto=format&fit=crop&w=800&q=80',
    categoryQuery: 'linen',
    accent: '#C4957A',
  },
  {
    slug: 'the-cave',
    label: 'The Cave',
    descriptor: 'Total dark. Total peace.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    categoryQuery: 'blackout',
    accent: '#2A2A2A',
  },
  {
    slug: 'sunday-slow',
    label: 'Sunday Slow',
    descriptor: 'Gauze curtains. Nowhere to be.',
    image: 'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&w=800&q=80',
    categoryQuery: 'voile',
    accent: '#B8C4BB',
  },
  {
    slug: 'after-dark',
    label: 'After Dark',
    descriptor: 'Velvet. Always.',
    image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=800&q=80',
    categoryQuery: 'velvet',
    accent: '#1A1033',
  },
];
