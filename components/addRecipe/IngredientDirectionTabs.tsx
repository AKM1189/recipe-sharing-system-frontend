import {
  Controller,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";
import z from "zod";
import { recipeSchema } from "@/schemas/recipeSchema";
import { useRecipeStore } from "@/store/recipe.store";

// UI Components
import IngredientForm from "./IngredientForm";
import StepForm from "./StepForm";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Field, FieldError } from "../ui/field";

// --- Types ---

type RecipeSchema = z.infer<typeof recipeSchema>;

// Restrict keys to only the array fields in your schema
type ArrayFieldKeys = "ingredients" | "steps";

// Use a generic K to ensure 'fields' and 'append' match the same array branch
type TabType<K extends ArrayFieldKeys> = {
  form: UseFormReturn<RecipeSchema>;
  fields: FieldArrayWithId<RecipeSchema, K>[];
  append: UseFieldArrayAppend<RecipeSchema, K>;
  remove: UseFieldArrayRemove;
};

type IngredientStepTabsType = {
  ingredientFieldArray: UseFieldArrayReturn<RecipeSchema, "ingredients">;
  stepFieldArray: UseFieldArrayReturn<RecipeSchema, "steps">;
  form: UseFormReturn<RecipeSchema>;
};

const TabConstants = {
  ingredients: "Ingredients",
  directions: "Directions",
};

// --- Main Component ---

const IngredientStepTabs = ({
  ingredientFieldArray,
  stepFieldArray,
  form,
}: IngredientStepTabsType) => {
  return (
    <div>
      <Tabs defaultValue={TabConstants.ingredients} className="rounded-md mt-5">
        <TabsList>
          <TabsTrigger value={TabConstants.ingredients}>
            Ingredients
          </TabsTrigger>
          <TabsTrigger value={TabConstants.directions}>Directions</TabsTrigger>
        </TabsList>

        <TabsContent value={TabConstants.ingredients}>
          <Controller
            name="ingredients"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <IngredientsTab
                  fields={ingredientFieldArray.fields}
                  remove={ingredientFieldArray.remove}
                  append={ingredientFieldArray.append}
                  form={form}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </TabsContent>

        <TabsContent value={TabConstants.directions}>
          <DirectionsTab
            fields={stepFieldArray.fields}
            remove={stepFieldArray.remove}
            append={stepFieldArray.append}
            form={form}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IngredientStepTabs;

// --- Sub-Components ---

const IngredientsTab = ({
  fields,
  append,
  remove,
  form,
}: TabType<"ingredients">) => {
  const { addDeletedIngredient } = useRecipeStore();

  return (
    <div className="flex flex-col gap-5">
      <Accordion type="multiple" className="flex flex-col gap-3">
        {fields.map((item, index) => (
          <AccordionItem value={item.id} key={item.id} className="border-b-0">
            <div className="border border-gray-300 rounded-md">
              <AccordionTrigger>
                <span className="font-semibold">Item {index + 1}</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-5 border-t border-input">
                  <IngredientForm form={form} index={index} />
                  <div className="text-end mt-5">
                    <span
                      className="text-primary font-medium cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        const id = form.getValues(`ingredients.${index}.id`);
                        if (id) addDeletedIngredient(id);
                        remove(index);
                      }}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>

      <Button
        variant={"outline"}
        type="button" // Prevent accidental form submission
        className="bg-transparent border-dashed w-full"
        onClick={(e) => {
          e.preventDefault();
          append({ id: 0, name: "", quantity: "0", unit: "" });
        }}
      >
        + Add Ingredient
      </Button>
    </div>
  );
};

const DirectionsTab = ({ fields, append, remove, form }: TabType<"steps">) => {
  const { addDeletedStep } = useRecipeStore();

  return (
    <div className="flex flex-col gap-5">
      <Accordion type="multiple" className="flex flex-col gap-3">
        {fields.map((item, index) => (
          <AccordionItem value={item.id} key={item.id} className="border-b-0">
            <div className="border border-gray-300 rounded-md">
              <AccordionTrigger>
                <span className="font-semibold">Step Number {index + 1}</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-5 border-t border-input">
                  <StepForm form={form} index={index} />
                  <div className="text-end mt-5">
                    <span
                      className="text-primary font-medium cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        const stepId = form.getValues(`steps.${index}.stepId`);
                        if (stepId) addDeletedStep(stepId);
                        remove(index);
                      }}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>

      <Button
        variant={"outline"}
        type="button"
        className="bg-transparent border-dashed w-full"
        onClick={(e) => {
          e.preventDefault();
          append({
            stepId: 0,
            stepNumber: fields.length + 1,
            instruction: "",
            title: "", // Included because your error log indicated this is required
          });
        }}
      >
        + Add Step
      </Button>
    </div>
  );
};
