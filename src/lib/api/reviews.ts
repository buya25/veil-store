import { apiClient, unwrap } from './client';
import type { Review } from '@/types/api';

export async function getProductReviews(productId: string): Promise<Review[]> {
  const res = await apiClient.get(`/reviews/product/${productId}`);
  const data = res.data.data ?? res.data;
  return Array.isArray(data) ? data : data.data ?? [];
}

export async function submitReview(dto: {
  productId: string;
  rating: number;
  title: string;
  body: string;
}): Promise<Review> {
  const res = await apiClient.post('/reviews', dto);
  return unwrap(res);
}
