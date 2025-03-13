import { create } from "zustand";

export const useBookStore = create((set) => ({
  book: null,
  setBook: (b) => set({ book: b }),
}))