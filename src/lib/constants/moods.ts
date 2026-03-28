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
    image: '/images/mood-morning.jpg',
    categoryQuery: 'sheer',
    accent: '#E8D5C0',
  },
  {
    slug: 'golden-hour',
    label: 'Golden Hour',
    descriptor: 'Warmth you can touch.',
    image: '/images/mood-golden.jpg',
    categoryQuery: 'linen',
    accent: '#C4957A',
  },
  {
    slug: 'the-cave',
    label: 'The Cave',
    descriptor: 'Total dark. Total peace.',
    image: '/images/mood-cave.jpg',
    categoryQuery: 'blackout',
    accent: '#2A2A2A',
  },
  {
    slug: 'sunday-slow',
    label: 'Sunday Slow',
    descriptor: 'Gauze curtains. Nowhere to be.',
    image: '/images/mood-sunday.jpg',
    categoryQuery: 'voile',
    accent: '#B8C4BB',
  },
  {
    slug: 'after-dark',
    label: 'After Dark',
    descriptor: 'Velvet. Always.',
    image: '/images/mood-afterdark.jpg',
    categoryQuery: 'velvet',
    accent: '#1A1033',
  },
];
