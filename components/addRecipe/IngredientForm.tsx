import { UseFormReturn } from "react-hook-form";
import { FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import z from "zod";
import { recipeSchema } from "@/schemas/recipeSchema";
import { useEffect } from "react";
import { useRecipeStore } from "@/store/recipe.store";

export default function IngredientForm({
  form,
  index,
}: {
  form: UseFormReturn<z.infer<typeof recipeSchema>>;
  index: number;
}) {
  const { deletedIngredients } = useRecipeStore();

  const ingredientNameState = form.getFieldState(
    `ingredients.${index}.name`,
    form.formState,
  );

  const ingredientQuantityState = form.getFieldState(
    `ingredients.${index}.quantity`,
    form.formState,
  );

  const ingredientUnitState = form.getFieldState(
    `ingredients.${index}.unit`,
    form.formState,
  );

  useEffect(() => {
    const id = form.getValues(`ingredients.${index}.id`);
    if (id && deletedIngredients.includes(id)) {
      form.setValue(`ingredients.${index}.id`, undefined);
    }
  }, []);

  return (
    <div>
      <FieldGroup className="mt-3 gap-3">
        <Input
          {...form.register(`ingredients.${index}.id`)}
          hidden
          autoComplete="off"
        />
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input
          {...form.register(`ingredients.${index}.name`)}
          id="name"
          autoComplete="off"
        />
        {ingredientNameState.error && (
          <FieldError errors={[ingredientNameState.error]} />
        )}
      </FieldGroup>
      <div className="flex gap-5 mt-3">
        <FieldGroup className="gap-3">
          <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
          <Input
            // type="text"
            // min={0}
            {...form.register(`ingredients.${index}.quantity`)}
            id="quantity"
            autoComplete="off"
          />
          {ingredientQuantityState.error && (
            <FieldError errors={[ingredientQuantityState.error]} />
          )}
        </FieldGroup>

        <FieldGroup className="gap-3">
          <FieldLabel htmlFor="unit">Unit</FieldLabel>
          <Input
            {...form.register(`ingredients.${index}.unit`)}
            id="unit"
            autoComplete="off"
          />
          {ingredientUnitState.error && (
            <FieldError errors={[ingredientUnitState.error]} />
          )}
        </FieldGroup>
      </div>
    </div>
  );
}
