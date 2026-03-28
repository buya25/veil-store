import { apiClient, unwrap } from './client';
import type { Cart } from '@/types/api';

export async function getCart(): Promise<Cart> {
  const res = await apiClient.get('/cart');
  return unwrap(res);
}

export async function addCartItem(dto: {
  productId: string;
  variantId: string;
  quantity: number;
}): Promise<Cart> {
  const res = await apiClient.post('/cart/items', dto);
  return unwrap(res);
}

export async function updateCartItem(itemId: string, quantity: number): Promise<Cart> {
  const res = await apiClient.patch(`/cart/items/${itemId}`, { quantity });
  return unwrap(res);
}

export async function removeCartItem(itemId: string): Promise<Cart> {
  const res = await apiClient.delete(`/cart/items/${itemId}`);
  return unwrap(res);
}
