import { MOODS } from '@/lib/constants/moods';

export function getMoodQueryParams(moodSlug: string): { search: string } {
  const mood = MOODS.find((m) => m.slug === moodSlug);
  return { search: mood?.categoryQuery ?? moodSlug };
}
