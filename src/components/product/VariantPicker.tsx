'use client';
import { cn } from '@/lib/utils/cn';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import type { ProductVariant } from '@/types/api';

interface VariantPickerProps {
  variants: ProductVariant[];
  selected: ProductVariant | null;
  onSelect: (variant: ProductVariant) => void;
}

export function VariantPicker({ variants, selected, onSelect }: VariantPickerProps) {
  if (!variants.length) return null;

  return (
    <div className="space-y-3">
      <span className="font-sans text-xs uppercase tracking-widest text-slate">
        Size / Fabric — {selected?.name ?? 'Select an option'}
      </span>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const stock = variant.inventory?.quantity ?? 0;
          const reserved = variant.inventory?.reservedQuantity ?? 0;
          const available = stock - reserved > 0;

          return (
            <button
              key={variant.id}
              onClick={() => available && onSelect(variant)}
              disabled={!available}
              className={cn(
                'px-4 py-2 font-sans text-xs border transition-all duration-200',
                selected?.id === variant.id
                  ? 'bg-charcoal text-ivory border-charcoal'
                  : available
                  ? 'bg-transparent text-charcoal border-linen hover:border-charcoal'
                  : 'bg-transparent text-slate-light border-linen opacity-40 cursor-not-allowed line-through',
              )}
            >
              {variant.name}
              {!available && ' — Sold out'}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="pt-1">
          <PriceDisplay
            price={selected.price}
            salePrice={selected.salePrice}
            size="lg"
          />
        </div>
      )}
    </div>
  );
}
