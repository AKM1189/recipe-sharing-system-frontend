import { create } from "zustand";

interface RecipeStoreInterface {
  deletedSteps: number[];
  deletedIngredients: number[];
  setDeletedSteps: (steps: []) => void;
  addDeletedStep: (step: number) => void;
  addDeletedIngredient: (iingredient: number) => void;
}

export const useRecipeStore = create<RecipeStoreInterface>((set) => ({
  deletedSteps: [],
  deletedIngredients: [],
  setDeletedSteps: (deletedSteps) => set({ deletedSteps }),
  addDeletedStep: (step) =>
    set((state) => ({ deletedSteps: [...state.deletedSteps, step] })),
  addDeletedIngredient: (ingredient) =>
    set((state) => ({
      deletedIngredients: [...state.deletedIngredients, ingredient],
    })),
}));
