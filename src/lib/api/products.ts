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
  const raw = res.data.data ?? res.data;
  const items: any[] = Array.isArray(raw) ? raw : raw.data ?? [];

  // The on-sale endpoint returns ProductVariant[] with a nested `product`.
  // Extract unique products and attach the sale variant as the first variant.
  const seen = new Set<string>();
  const products: Product[] = [];
  for (const item of items) {
    const p = item.product ?? item;
    if (!p?.slug || seen.has(p.id)) continue;
    seen.add(p.id);
    products.push({
      ...p,
      variants: [{ ...item, product: undefined }],
    });
  }
  return products;
}

export async function getRelatedProducts(id: string): Promise<Product[]> {
  const res = await apiClient.get(`/products/${id}/related`);
  const data = res.data.data ?? res.data;
  return Array.isArray(data) ? data : [];
}
