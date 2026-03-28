'use client';
import { cn } from '@/lib/utils/cn';

interface StarRatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md';
  className?: string;
}

export function StarRating({ value, max = 5, onChange, size = 'md', className }: StarRatingProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className={cn('flex gap-0.5', className)}>
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          className={cn(
            'transition-colors',
            onChange ? 'cursor-pointer hover:text-rose' : 'cursor-default',
            size === 'sm' ? 'text-sm' : 'text-lg',
            star <= value ? 'text-charcoal' : 'text-linen',
          )}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
