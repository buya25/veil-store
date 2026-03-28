import { apiClient, unwrap } from './client';
import type { User, Address } from '@/types/api';

export async function getMe(): Promise<User> {
  const res = await apiClient.get('/users/me');
  return unwrap(res);
}

export async function updateMe(dto: Partial<User> & { windowDna?: string }): Promise<User> {
  const res = await apiClient.patch('/users/me', dto);
  return unwrap(res);
}

export async function getAddresses(): Promise<Address[]> {
  const res = await apiClient.get('/users/me/addresses');
  const data = res.data.data ?? res.data;
  return Array.isArray(data) ? data : [];
}

export async function createAddress(dto: Omit<Address, 'id'>): Promise<Address> {
  const res = await apiClient.post('/users/me/addresses', dto);
  return unwrap(res);
}

export async function deleteAddress(id: string): Promise<void> {
  await apiClient.delete(`/users/me/addresses/${id}`);
}
