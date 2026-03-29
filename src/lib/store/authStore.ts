'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/api';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setTokens: (access: string, refresh: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      setTokens: (access, refresh) => {
        if (typeof document !== 'undefined') {
          document.cookie = `veil-auth-token=${access}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
        }
        set({ accessToken: access, refreshToken: refresh, isAuthenticated: true });
      },
      setUser: (user) => set({ user }),
      clearAuth: () => {
        if (typeof document !== 'undefined') {
          document.cookie = 'veil-auth-token=; path=/; max-age=0';
        }
        set({ accessToken: null, refreshToken: null, user: null, isAuthenticated: false });
      },
    }),
    { name: 'veil-auth' },
  ),
);
