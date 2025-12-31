import { Controller, UseFormReturn } from "react-hook-form";
import { FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import z from "zod";
import { recipeSchema } from "@/schemas/recipeSchema";
import { Textarea } from "../ui/textarea";
import ImagePreview from "../common/ImagePreview";
import { handlePreviewImage } from "@/lib/utils";
import { useEffect } from "react";
import { useRecipeStore } from "@/store/recipe.store";

export default function StepForm({
  form,
  index,
}: {
  form: UseFormReturn<z.infer<typeof recipeSchema>>;
  index: number;
}) {
  const { deletedSteps } = useRecipeStore();

  const preview = form.watch(`steps.${index}.previewUrl`);

  const imageUrl = form.getValues(`steps.${index}.imageUrl`);

  const stepInstructionState = form.getFieldState(
    `steps.${index}.instruction`,
    form.formState,
  );

  useEffect(() => {
    const stepId = form.getValues(`steps.${index}.stepId`);
    if (stepId && deletedSteps.includes(stepId)) {
      form.setValue(`steps.${index}.stepId`, undefined);
    }
    return () => {
      const url = form.getValues(`steps.${index}.previewUrl`);
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  return (
    <div>
      <FieldGroup className="mt-3" hidden>
        <FieldLabel htmlFor="name">Step Number</FieldLabel>
        <Input
          {...form.register(`steps.${index}.stepNumber`)}
          id="name"
          autoComplete="off"
        />
      </FieldGroup>

      <Input
        {...form.register(`steps.${index}.stepId`)}
        hidden
        autoComplete="off"
      />

      <FieldGroup className="mt-3 gap-3">
        <FieldLabel htmlFor="instruction">Instruction</FieldLabel>
        <Textarea
          rows={10}
          {...form.register(`steps.${index}.instruction`)}
          id="instruction"
          autoComplete="off"
        />
        {stepInstructionState.error && (
          <FieldError errors={[stepInstructionState.error]} />
        )}
      </FieldGroup>

      <FieldGroup className="mt-3 gap-3 mb-5">
        <FieldLabel htmlFor="image">Image</FieldLabel>
        <Input
          type="file"
          name={`steps.${index}.image`}
          id="image"
          autoComplete="off"
          onChange={(e) => {
            const file = e.target.files?.[0];
            const url = handlePreviewImage(file);
            if (url) {
              form.setValue(`steps.${index}.image`, file, {
                shouldDirty: true,
              });
              form.setValue(`steps.${index}.previewUrl`, url, {
                shouldDirty: true,
              });
            }
          }}
        />
      </FieldGroup>
      {preview && <ImagePreview src={preview} alt="recipe-image" />}
      {!preview && imageUrl && (
        <img
          width={200}
          height={200}
          src={process.env.NEXT_PUBLIC_IMAGE_URL + imageUrl}
          alt="step image"
        />
      )}
    </div>
  );
}
