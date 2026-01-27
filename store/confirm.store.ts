import { create } from "zustand";

interface ConfirmInterface {
  show: boolean;
  title?: string;
  body?: string;
  onConfirm: () => void;
}

interface AuthStoreInterface {
  confirm: ConfirmInterface;
  showConfirm: (confirm: ConfirmInterface) => void;
  removeConfirm: () => void;
}

const defaultConfirm = {
  show: false,
  title: "",
  body: "",
  onConfirm: () => {
    null;
  },
};

export const useConfirmStore = create<AuthStoreInterface>((set) => ({
  confirm: defaultConfirm,
  showConfirm: (confirm) => set({ confirm }),
  removeConfirm: () => set({ confirm: defaultConfirm }),
}));
