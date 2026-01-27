"use client";
import { useAuthStore } from "@/store/auth.store";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { passwordChangeSchema } from "@/schemas/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUpdatePassword } from "@/lib/queries/user.queries";

const PasswordChangeForm = () => {
  const { user } = useAuthStore();
  const { mutate } = useUpdatePassword();

  const form = useForm<z.infer<typeof passwordChangeSchema>>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (values: z.infer<typeof passwordChangeSchema>) => {
    if (user)
      mutate({
        userId: user?.id,
        body: values,
      });
  };

  if (user)
    return (
      <div>
        <form id="password-change-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-7">
            <div className="col-span-1">
              <Controller
                name="oldPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="current">Current Passsword</FieldLabel>
                    <Input
                      {...field}
                      id="current"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter current password"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="col-span-1">
              <Controller
                name="newPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="new">New Email</FieldLabel>
                    <Input
                      {...field}
                      id="new"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter new password"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="col-span-1">
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirm">Confirm Password</FieldLabel>
                    <Input
                      {...field}
                      id="confirm"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter new password again"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              className="bg-gray-900 hover:bg-gray-700 cursor-pointer"
              form="password-change-form"
            >
              Update Password
            </Button>
          </div>
        </form>
      </div>
    );
};

export default PasswordChangeForm;
