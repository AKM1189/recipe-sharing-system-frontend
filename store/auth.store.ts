import { User } from "@/types";
import { create } from "zustand";

interface AuthStoreInterface {
  user: User | null;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthStoreInterface>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
