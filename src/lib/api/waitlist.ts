import { apiClient } from './client';

export async function joinWaitlist(productId: string): Promise<{ message: string }> {
  const res = await apiClient.post(`/products/${productId}/notify-restock`);
  return res.data.data ?? res.data;
}
