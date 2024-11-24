import { create } from "zustand";

export const useAuthStore = create((set) => ({
  account: null,
  setAccount: (acc) => set({ account: acc })
}))