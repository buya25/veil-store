'use client';
import { create } from 'zustand';

type Modal = 'auth' | 'windowDna' | null;

interface UIState {
  isMobileMenuOpen: boolean;
  activeModal: Modal;
  setMobileMenuOpen: (open: boolean) => void;
  openModal: (modal: Modal) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  activeModal: null,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
}));
