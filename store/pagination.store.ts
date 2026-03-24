import { create } from "zustand";

type Pagination = {
  current: number;
  total: number;
  limit: number;
};

interface PaginationStore {
  pagination: {
    current: number;
    total: number;
    limit: number;
  };
  setPagination: (pagination: Pagination) => void;
  onPageChange: (page: number) => void;
}
export const usePaginationStore = create<PaginationStore>((set) => ({
  pagination: {
    current: 1,
    total: 1,
    limit: 10,
  },
  setPagination: (pagination) => set({ pagination }),
  onPageChange: (page) =>
    set((state) => ({ pagination: { ...state.pagination, current: page } })),
}));
