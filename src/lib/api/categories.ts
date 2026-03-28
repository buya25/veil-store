import { apiClient } from './client';
import type { Category } from '@/types/api';

export async function getCategories(): Promise<Category[]> {
  const res = await apiClient.get('/categories');
  const data = res.data.data ?? res.data;
  return Array.isArray(data) ? data : [];
}
