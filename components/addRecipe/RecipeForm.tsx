"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { getImageUrl, handlePreviewImage } from "@/lib/utils";
import { SelectInput } from "../common/SelectInput";
import { RecipeDifficulty } from "@/lib/constants";
import { MultiSelectCreatable } from "../common/ComobBoxCreatable";
import { recipeSchema } from "@/schemas/recipeSchema";
import IngredientStepTabs from "./IngredientDirectionTabs";
import ImagePreview from "../common/ImagePreview";
import CookingTimeSelector from "./CookingTimeSelector";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { useAuthStore } from "@/store/auth.store";
import { useAddRecipe, useUpdateRecipe } from "@/lib/queries/recipe.queries";
import { Category, Recipe } from "@/types";
import { useRecipeStore } from "@/store/recipe.store";
import { useGetCategories } from "@/lib/queries/category.queries";

const createDefaultValues = {
  title: "",
  description: "",
  recipeImage: undefined,
  cookingTime: 0,
  serving: 0,
  difficulty: "",
  categories: [],
  imageUrl: undefined,
  ingredients: [{ id: 0, name: "", quantity: "0", unit: "" }],
  steps: [{ stepId: 0, stepNumber: 1, instruction: "", image: undefined }],
};

const data = Object.values(RecipeDifficulty).map((value) => ({
  label: value[0] + value.slice(1).toLowerCase(),
  value,
}));

export function RecipeForm({ recipe }: { recipe?: Recipe }) {
  const router = useRouter();
  const isUpdate = recipe?.id ? true : false;

  const [recipeImageUrl, setRecipeImageUrl] = useState<string | undefined>();
  const { deletedSteps, deletedIngredients } = useRecipeStore();

  const { data: categoryData } = useGetCategories();

  const [categories, setCategories] = useState<string[]>([]);

  const { mutate } = useAddRecipe();
  const { mutate: updateRecipe } = useUpdateRecipe();

  const defaultValues =
    recipe && isUpdate
      ? {
          title: recipe.title,
          description: recipe.description,
          recipeImage: undefined,
          cookingTime: recipe.cookingTime,
          serving: recipe.serving,
          difficulty: recipe.difficulty,
          categories: recipe.categories.map(
            (category) => category.category.name,
          ),
          ingredients: recipe.ingredients,
          steps: recipe.steps.map((step) => ({
            stepId: step.id,
            stepNumber: step.stepNumber,
            title: step.title,
            instruction: step.instruction,
            imageUrl: step.imageUrl || undefined,
          })),
        }
      : createDefaultValues;

  const form = useForm<z.infer<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema),
    defaultValues,
  });

  const ingredientFieldArray = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const stepFieldArray = useFieldArray({
    control: form.control,
    name: "steps",
  });

  useEffect(() => {
    if (categoryData?.success && categoryData?.data.length > 0) {
      setCategories(
        categoryData?.data?.map((category: Category) => category?.name),
      );
    }
  }, [categoryData]);

  function onSubmit(data: z.infer<typeof recipeSchema>) {
    // Do something with the form values.
    if (!isUpdate) {
      mutate(
        { ...data, status: "PUBLISHED" },
        {
          onSuccess: () => {
            router.push(routes.public.home);
          },
        },
      );
    } else {
      if (!recipe?.id) return;
      console.log("update", deletedSteps);

      const body = {
        ...data,
        id: recipe.id,
        imageUrl: recipe?.imageUrl,
        deletedIngredients: deletedIngredients ?? [],
        deletedSteps: deletedSteps ?? [],
        status: "PUBLISHED",
      };
      updateRecipe(
        { ...body },
        {
          onSuccess: () => {
            router.push(routes.public.home);
          },
        },
      );
    }
  }

  const handleAddCategory = (newCategory: string) => {
    setCategories((prev) => [...prev, newCategory]);
  };
  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category));
  };
  return (
    <div>
      <form
        id="recipe-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  {...field}
                  id="title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter recipe title"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  {...field}
                  id="description"
                  rows={10}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter recipe description"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="recipeImage"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="image">Image</FieldLabel>
                <Input
                  id="image"
                  type="file"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  ref={field.ref}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                    setRecipeImageUrl(handlePreviewImage(file));
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <ImagePreview src={recipeImageUrl} alt="recipe-image" />

        {!recipeImageUrl && recipe?.imageUrl && (
          <img
            width={200}
            height={200}
            src={getImageUrl(recipe.imageUrl)}
            alt={recipe.title}
          />
        )}
        <CookingTimeSelector form={form} value={recipe?.cookingTime} />

        <FieldGroup className="mt-3">
          <Controller
            name="serving"
            control={form.control}
            render={({ fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="">
                <FieldLabel htmlFor="serving">Serving</FieldLabel>
                <Input
                  className="w-20 border-input h-10"
                  {...form.register("serving", { valueAsNumber: true })}
                  type="number"
                  min={0}
                  id="serving"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="difficulty"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="difficulty">Difficulty</FieldLabel>
                <SelectInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select Difficulty"
                  data={data}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Controller
          name="categories"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="categories">Categories</FieldLabel>
              <MultiSelectCreatable
                data={categories}
                value={field.value}
                onValueChange={field.onChange}
                onAddCategory={handleAddCategory}
                onRemoveCategory={handleRemoveCategory}
                placeholder="Select or add categories"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <IngredientStepTabs
          ingredientFieldArray={ingredientFieldArray}
          stepFieldArray={stepFieldArray}
          form={form}
        />

        <div className="flex justify-center gap-10 mt-10">
          <button
            type="submit"
            className="w-[150px] mt-4 px-4 py-2 bg-muted text-secondary-foreground rounded"
            onClick={() => router.push(routes.public.home)}
          >
            Discard
          </button>
          <button
            type="submit"
            className="w-[150px] mt-4 px-4 py-2 bg-primary text-white rounded"
            form="recipe-form"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
