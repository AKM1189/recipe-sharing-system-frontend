import { Controller, UseFormReturn } from "react-hook-form";
import { FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import z from "zod";
import { recipeSchema } from "@/schemas/recipeSchema";
import { Textarea } from "../ui/textarea";
import ImagePreview from "../common/ImagePreview";
import { handlePreviewImage } from "@/lib/utils";
import { useEffect } from "react";

export default function StepForm({
  form,
  index,
}: {
  form: UseFormReturn<z.infer<typeof recipeSchema>>;
  index: number;
}) {
  useEffect(() => {
    return () => {
      const url = form.getValues(`steps.${index}.previewUrl`);
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  const preview = form.watch(`steps.${index}.previewUrl`);

  const stepInstructionState = form.getFieldState(
    `steps.${index}.instruction`,
    form.formState,
  );

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
    </div>
  );
}
