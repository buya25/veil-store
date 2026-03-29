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
    image: 'https://images.unsplash.com/photo-r3Kpb5X7Ep8?auto=format&fit=crop&w=800&q=80',
    categoryQuery: 'sheer',
    accent: '#E8D5C0',
  },
  {
    slug: 'golden-hour',
    label: 'Golden Hour',
    descriptor: 'Warmth you can touch.',
    image: 'https://images.unsplash.com/photo-e4H1pL-xdRY?auto=format&fit=crop&w=800&q=80',
    categoryQuery: 'linen',
    accent: '#C4957A',
  },
  {
    slug: 'the-cave',
    label: 'The Cave',
    descriptor: 'Total dark. Total peace.',
    image: 'https://images.unsplash.com/photo-aSscHG6lvko?auto=format&fit=crop&w=800&q=80',
    categoryQuery: 'blackout',
    accent: '#2A2A2A',
  },
  {
    slug: 'sunday-slow',
    label: 'Sunday Slow',
    descriptor: 'Gauze curtains. Nowhere to be.',
    image: 'https://images.unsplash.com/photo-vPKNB_gc23Q?auto=format&fit=crop&w=800&q=80',
    categoryQuery: 'voile',
    accent: '#B8C4BB',
  },
  {
    slug: 'after-dark',
    label: 'After Dark',
    descriptor: 'Velvet. Always.',
    image: 'https://images.unsplash.com/photo-nxZ3CK5KTME?auto=format&fit=crop&w=800&q=80',
    categoryQuery: 'velvet',
    accent: '#1A1033',
  },
];
