"use client";
import { useAuthStore } from "@/store/auth.store";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { emailChangeSchema } from "@/schemas/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { useUpdateEmail } from "@/lib/queries/user.queries";

const EmailChangeForm = () => {
  const { user } = useAuthStore();
  const { mutate } = useUpdateEmail();

  const form = useForm<z.infer<typeof emailChangeSchema>>({
    resolver: zodResolver(emailChangeSchema),
    defaultValues: {
      oldEmail: "",
      newEmail: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof emailChangeSchema>) => {
    if (user)
      mutate({
        userId: user.id,
        body: values,
      });
  };

  useEffect(() => {
    if (user) {
      form.reset({
        oldEmail: user.email ?? "",
        newEmail: "",
        password: "",
      });
    }
  }, [user, form]);

  if (user)
    return (
      <div>
        <form id="email-change-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-7">
            <div className="col-span-1">
              <Controller
                name="oldEmail"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Current Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      disabled
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
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
                name="newEmail"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="newEmail">New Email</FieldLabel>
                    <Input
                      {...field}
                      id="newEmail"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your new email"
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
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your current password"
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
              form="email-change-form"
            >
              Update Email
            </Button>
          </div>
        </form>
      </div>
    );
};

export default EmailChangeForm;
