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
    image: 'https://picsum.photos/seed/morning-sheer/800/600',
    categoryQuery: 'sheer',
    accent: '#E8D5C0',
  },
  {
    slug: 'golden-hour',
    label: 'Golden Hour',
    descriptor: 'Warmth you can touch.',
    image: 'https://picsum.photos/seed/golden-linen/800/600',
    categoryQuery: 'linen',
    accent: '#C4957A',
  },
  {
    slug: 'the-cave',
    label: 'The Cave',
    descriptor: 'Total dark. Total peace.',
    image: 'https://picsum.photos/seed/cave-blackout/800/600',
    categoryQuery: 'blackout',
    accent: '#2A2A2A',
  },
  {
    slug: 'sunday-slow',
    label: 'Sunday Slow',
    descriptor: 'Gauze curtains. Nowhere to be.',
    image: 'https://picsum.photos/seed/sunday-voile/800/600',
    categoryQuery: 'voile',
    accent: '#B8C4BB',
  },
  {
    slug: 'after-dark',
    label: 'After Dark',
    descriptor: 'Velvet. Always.',
    image: 'https://picsum.photos/seed/afterdark-velvet/800/600',
    categoryQuery: 'velvet',
    accent: '#1A1033',
  },
];
