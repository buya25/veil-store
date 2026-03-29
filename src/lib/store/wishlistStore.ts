'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistProduct {
  id: string;
  slug: string;
  name: string;
  basePrice: string;
  imageUrl?: string;
  categoryName?: string;
}

interface WishlistState {
  items: WishlistProduct[];
  toggle: (product: WishlistProduct) => void;
  has: (id: string) => boolean;
  remove: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) =>
        set((s) => ({
          items: s.items.some((i) => i.id === product.id)
            ? s.items.filter((i) => i.id !== product.id)
            : [...s.items, product],
        })),
      has: (id) => get().items.some((i) => i.id === id),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
    }),
    { name: 'veil-wishlist' },
  ),
);
