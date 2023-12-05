import { create } from 'zustand';

export type UserStore = {
  token: string | null;
  setToken: (token: string) => void;
};

export type ButtonStore = {
  selectedButton: string;
  setSelectedButton: (button: 'ANNUAL' | 'DUTY') => void;
};

export const useAuthStore = create<UserStore>((set) => ({
  token: null,
  setToken: (token: string) => set({ token }),
}));

export const useButtonStore = create<ButtonStore>((set) => ({
  selectedButton: 'DUTY',
  setSelectedButton: (button) => set({ selectedButton: button }),
}));
