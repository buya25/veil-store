import { apiClient, unwrap } from './client';
import type { User } from '@/types/api';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export async function loginFn(email: string, password: string): Promise<AuthTokens> {
  const res = await apiClient.post('/auth/login', { email, password });
  return unwrap(res);
}

export async function registerFn(dto: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<AuthTokens> {
  const res = await apiClient.post('/auth/register', dto);
  return unwrap(res);
}

export async function logoutFn(): Promise<void> {
  await apiClient.post('/auth/logout').catch(() => null);
}
