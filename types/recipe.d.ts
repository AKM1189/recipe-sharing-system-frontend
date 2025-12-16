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
}

export interface RecipeBody {
  title: string;
  description: string;
  imageUrl: string;
  cookingTime: number;
  serving: number;
  difficulty: RecipeDifficulty;
  categories: number[];
  steps: RecipeSteps[];
  ingredients: RecipeIngredients[];
}

export interface CategoriesPayload {
  name: string;
  slug: string;
}

export interface RecipeSteps {
  stepNumber: number;
  instruction: string;
  image?: string;
}

export interface RecipeIngredients {
  name: string;
  quantity: string;
  unit: string;
}
