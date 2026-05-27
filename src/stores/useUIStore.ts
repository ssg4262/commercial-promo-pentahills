"use client";

import { create } from "zustand";

interface UIState {
  menuOpen: boolean;
  activeSection: string;
  splashVisible: boolean;
  setMenuOpen: (open: boolean) => void;
  setActiveSection: (section: string) => void;
  setSplashVisible: (visible: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  menuOpen: false,
  activeSection: "hero",
  splashVisible: true,
  setMenuOpen: (open) => set({ menuOpen: open }),
  setActiveSection: (section) => set({ activeSection: section }),
  setSplashVisible: (visible) => set({ splashVisible: visible }),
}));
