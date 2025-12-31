import IngredientForm from "./IngredientForm";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Controller,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";
import { recipeSchema } from "@/schemas/recipeSchema";
import z from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StepForm from "./StepForm";
import { Field, FieldError } from "../ui/field";
import { useRecipeStore } from "@/store/recipe.store";

type FieldArrayType = UseFieldArrayReturn<z.infer<typeof recipeSchema>>;

type IngredientStepTabsType = {
  ingredientFieldArray: FieldArrayType;
  stepFieldArray: FieldArrayType;
  form: UseFormReturn<z.infer<typeof recipeSchema>>;
};

type TabType = {
  form: UseFormReturn<z.infer<typeof recipeSchema>>;
  fields: FieldArrayWithId<z.infer<typeof recipeSchema>>[];
  append: UseFieldArrayAppend<z.infer<typeof recipeSchema>>;
  remove: UseFieldArrayRemove;
};

const TabConstants = {
  ingredients: "Ingredients",
  directions: "Directions",
};

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

const IngredientsTab = ({ fields, append, remove, form }: TabType) => {
  const { addDeletedIngredient } = useRecipeStore();
  return (
    <div className="flex flex-col gap-5">
      <Accordion type="multiple" className="flex flex-col gap-3">
        {fields.map((item, index) => {
          return (
            <AccordionItem value={item.id} key={index} className="border-b-0">
              <div className="border border-gray-300 rounded-md">
                <AccordionTrigger>
                  <span className="font-semibold">Item {index + 1}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-5 border-t border-input">
                    <IngredientForm form={form} index={index} key={item.id} />
                    <div className="text-end mt-5">
                      <span
                        className="text-primary font-medium"
                        onClick={(e) => {
                          e.preventDefault();

                          const id = form.getValues(`ingredients.${index}.id`);
                          if (id) {
                            addDeletedIngredient(id);
                          }
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
          );
        })}
      </Accordion>

      <Button
        variant={"outline"}
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

const DirectionsTab = ({ fields, append, remove, form }: TabType) => {
  const { addDeletedStep } = useRecipeStore();

  return (
    <div className="flex flex-col gap-5">
      <Accordion type="multiple" className="flex flex-col gap-3">
        {fields.map((item, index) => {
          return (
            <AccordionItem value={item.id} key={index} className="border-b-0">
              <div className="border border-gray-300 rounded-md">
                <AccordionTrigger>
                  <span className="font-semibold">Step Number {index + 1}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-5 border-t border-input">
                    <StepForm form={form} index={index} />
                    <div className="text-end mt-5">
                      <span
                        className="text-primary font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          const stepId = form.getValues(
                            `steps.${index}.stepId`,
                          );
                          if (stepId) {
                            addDeletedStep(stepId);
                          }
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
          );
        })}
      </Accordion>

      <Button
        variant={"outline"}
        className="bg-transparent border-dashed w-full"
        onClick={(e) => {
          e.preventDefault();
          append({
            stepId: 0,
            stepNumber: fields.length + 1,
            instruction: "",
          });
        }}
      >
        + Add Step
      </Button>
    </div>
  );
};
