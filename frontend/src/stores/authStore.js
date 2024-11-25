import { create } from "zustand";

export const useAuthStore = create((set) => ({
  account: null,
  emailForgot: null,
  setAccount: (acc) => set({ account: acc }),
  setEmailForgot: (email) => set({ emailForgot: email })
}))