'use client';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useUpdateCartItem, useRemoveCartItem } from '@/lib/hooks/useCart';
import { formatPrice } from '@/lib/utils/formatPrice';
import type { CartItem as CartItemType } from '@/types/api';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  const imageUrl = item.product.images?.find((i) => i.isPrimary)?.url ?? item.product.images?.[0]?.url;
  const price = parseFloat(item.variant.salePrice ?? item.variant.price);

  return (
    <li className="flex gap-4 py-4">
      {/* Image */}
      <div className="relative h-20 w-16 flex-shrink-0 bg-linen overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={item.product.name} fill className="object-cover" sizes="64px" />
        ) : (
          <div className="h-full w-full bg-linen" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-serif text-sm font-light text-charcoal truncate">{item.product.name}</p>
        <p className="font-sans text-xs text-slate mt-0.5">{item.variant.name}</p>
        <p className="font-serif text-sm mt-1">{formatPrice(price)}</p>

        {/* Qty + Remove */}
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => updateItem.mutate({ id: item.id, quantity: Math.max(1, item.quantity - 1) })}
            disabled={item.quantity <= 1 || updateItem.isPending}
            className="text-slate hover:text-charcoal transition-colors disabled:opacity-40"
            aria-label="Decrease quantity"
          >
            <Minus size={12} />
          </button>
          <span className="font-sans text-xs w-4 text-center">{item.quantity}</span>
          <button
            onClick={() => updateItem.mutate({ id: item.id, quantity: item.quantity + 1 })}
            disabled={updateItem.isPending}
            className="text-slate hover:text-charcoal transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={12} />
          </button>
          <button
            onClick={() => removeItem.mutate(item.id)}
            disabled={removeItem.isPending}
            className="ml-2 text-slate hover:text-rose transition-colors"
            aria-label="Remove item"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </li>
  );
}
