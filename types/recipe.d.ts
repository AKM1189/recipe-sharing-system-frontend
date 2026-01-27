import { RecipeCategory } from "./category";
import { Review } from "./review";
import { User } from "./user";

export interface Recipe {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  cookingTime: number;
  serving: number;
  difficulty: RecipeDifficulty;
  categories: RecipeCategory[];
  createdAt: string;
  updatedAt?: string;
  userId: string; // relation
  rating: string;
  ratingCount: number;
  reviews: Review[];
  status: string;
  ingredients: RecipeIngredients[];
  steps: RecipeSteps[];
  user: User;
}

export interface CreateRecipeBody {
  title: string;
  description: string;
  recipeImage?: File | undefined;
  cookingTime: number;
  serving: number;
  difficulty: RecipeDifficulty;
  categories: string[];
  steps: RecipeSteps[];
  ingredients: RecipeIngredients[];
  status: string;
}

export interface UpdateRecipeBody extends CreateRecipeBody {
  id: number;
  deletedSteps: number[];
}

export interface CategoriesPayload {
  name: string;
  slug: string;
}

export interface RecipeSteps {
  id?: number;
  stepNumber: number;
  title: string;
  instruction: string;
  image?: File | undefined;
  imageUrl?: string | undefined;
}

export interface RecipeIngredients {
  id?: number;
  name: string;
  quantity: string;
  unit: string;
}
