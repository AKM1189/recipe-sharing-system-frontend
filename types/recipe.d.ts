export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  cookingTime: number;
  serving: number;
  difficulty: RecipeDifficulty;
  category: string;
  createdAt: string;
  updatedAt?: string;
  user: User; // relation
  comments?: Comment[];
  status: string;
}

export interface RecipeBody {
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

export interface CategoriesPayload {
  name: string;
  slug: string;
}

export interface RecipeSteps {
  stepNumber: number;
  instruction: string;
  image?: string | File;
}

export interface RecipeIngredients {
  name: string;
  quantity: number;
  unit: string;
}
