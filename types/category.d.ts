export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface RecipeCategory {
  recipeId: number;
  categoryId: number;
  category: Category;
}
