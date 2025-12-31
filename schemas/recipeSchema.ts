import z from "zod";

export const ingredientSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Ingredient name is required"),
  quantity: z.string().min(1, "Quantity is required"),
  unit: z.string().min(1, "Unit is required"),
});

export const stepSchema = z.object({
  stepId: z.number().optional(),
  stepNumber: z.number().min(1, "Step number is required"),
  instruction: z.string().min(1, "Instruction is required"),
  image: z.instanceof(File).optional(),
  previewUrl: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const recipeSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  recipeImage: z.instanceof(File).optional(),
  imageUrl: z.string().optional(),
  cookingTime: z
    .number()
    .nonnegative({ message: "Cooking time is not valid" })
    .min(1, { message: "Cooking time is required" }),
  serving: z.number().min(1, { message: "Serving is required" }),
  difficulty: z.string().nonempty({ message: "Difficulty is required" }),
  categories: z
    .array(z.string())
    .nonempty({ message: "At least one category is required" }),
  ingredients: z
    .array(ingredientSchema)
    .min(1, "At least one ingredient is required"),
  steps: z.array(stepSchema).min(1, "At least one step is required"),
});
