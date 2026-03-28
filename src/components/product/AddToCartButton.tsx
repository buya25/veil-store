'use client';
import { useAddToCart } from '@/lib/hooks/useCart';
import { useAuthStore } from '@/lib/store/authStore';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants/routes';
import type { ProductVariant } from '@/types/api';

interface AddToCartButtonProps {
  productId: string;
  variant: ProductVariant | null;
}

export function AddToCartButton({ productId, variant }: AddToCartButtonProps) {
  const { isAuthenticated } = useAuthStore();
  const addToCart = useAddToCart();
  const router = useRouter();

  const inStock = variant
    ? (variant.inventory?.quantity ?? 0) - (variant.inventory?.reservedQuantity ?? 0) > 0
    : false;

  function handleAdd() {
    if (!isAuthenticated) {
      router.push(`${ROUTES.login}?redirect=${window.location.pathname}`);
      return;
    }
    if (!variant) return;
    addToCart.mutate({ productId, variantId: variant.id, quantity: 1 });
  }

  return (
    <Button
      onClick={handleAdd}
      loading={addToCart.isPending}
      disabled={!variant || !inStock}
      size="lg"
      className="w-full"
    >
      {!variant
        ? 'Select a size'
        : !inStock
        ? 'Out of Stock'
        : addToCart.isSuccess
        ? 'Added to Bag'
        : 'Add to Bag'}
    </Button>
  );
}
