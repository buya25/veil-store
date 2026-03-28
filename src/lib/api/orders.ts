import { apiClient, unwrap } from './client';
import type { Order } from '@/types/api';

export interface CreateOrderDto {
  addressId: string;
  couponCode?: string;
}

export async function createOrder(dto: CreateOrderDto): Promise<Order> {
  const res = await apiClient.post('/orders', dto);
  return unwrap(res);
}

export async function getMyOrders(): Promise<Order[]> {
  const res = await apiClient.get('/orders/my');
  const data = res.data.data ?? res.data;
  return Array.isArray(data) ? data : data.data ?? [];
}

export async function getOrder(id: string): Promise<Order> {
  const res = await apiClient.get(`/orders/${id}`);
  return unwrap(res);
}
