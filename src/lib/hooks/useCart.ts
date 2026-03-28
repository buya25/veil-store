import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, addCartItem, updateCartItem, removeCartItem } from '@/lib/api/cart';
import { useCartStore } from '@/lib/store/cartStore';
import { useAuthStore } from '@/lib/store/authStore';

export function useCart() {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: isAuthenticated,
    staleTime: 30_000,
  });
}

export function useAddToCart() {
  const qc = useQueryClient();
  const { openCart } = useCartStore();
  return useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cart'] });
      openCart();
    },
  });
}

export function useUpdateCartItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      updateCartItem(id, quantity),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }),
  });
}

export function useRemoveCartItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }),
  });
}
