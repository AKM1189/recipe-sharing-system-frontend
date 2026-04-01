import { User } from "./user";

export interface Review {
  id: number;
  user: User;
  rating: number | null;
  parentId?: number | null;
  description: string;
  createdAt: string;
  updatedAt?: string;
  recipeId: number;
  userId: string;
  replies: Review[];
  deleted: boolean;
}

export interface ReviewBody {
  rating?: number;
  review: string;
  parentId?: number;
}
