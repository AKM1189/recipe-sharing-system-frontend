import { create } from "zustand";

interface LoadingStoreInterface {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingStoreInterface>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
