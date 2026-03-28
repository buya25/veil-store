import { cn } from '@/lib/utils/cn';
import { formatPrice } from '@/lib/utils/formatPrice';

interface PriceDisplayProps {
  price: string | number;
  salePrice?: string | number | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PriceDisplay({ price, salePrice, className, size = 'md' }: PriceDisplayProps) {
  const sizes = { sm: 'text-sm', md: 'text-base', lg: 'text-xl' };

  if (salePrice && parseFloat(String(salePrice)) > 0) {
    return (
      <div className={cn('flex items-baseline gap-2', className)}>
        <span className={cn('font-serif font-semibold text-rose', sizes[size])}>
          {formatPrice(salePrice)}
        </span>
        <span className={cn('font-sans text-slate-light line-through', size === 'lg' ? 'text-base' : 'text-sm')}>
          {formatPrice(price)}
        </span>
      </div>
    );
  }

  return (
    <span className={cn('font-serif font-semibold text-charcoal', sizes[size], className)}>
      {formatPrice(price)}
    </span>
  );
}
