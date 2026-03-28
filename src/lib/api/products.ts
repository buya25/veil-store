import { apiClient, unwrap } from './client';
import type { Product } from '@/types/api';

export interface ProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function getProducts(params: ProductQuery = {}): Promise<{
  data: Product[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}> {
  const res = await apiClient.get('/products', { params });
  return res.data.data ?? res.data;
}

export async function getProduct(slug: string): Promise<Product> {
  const res = await apiClient.get(`/products/${slug}`);
  return unwrap(res);
}

export async function getOnSale(): Promise<Product[]> {
  const res = await apiClient.get('/products/on-sale');
  const data = res.data.data ?? res.data;
  return Array.isArray(data) ? data : data.data ?? [];
}

export async function getRelatedProducts(id: string): Promise<Product[]> {
  const res = await apiClient.get(`/products/${id}/related`);
  const data = res.data.data ?? res.data;
  return Array.isArray(data) ? data : [];
}
