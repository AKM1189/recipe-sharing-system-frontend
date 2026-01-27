"use client";
import { useAuthStore } from "@/store/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { profileUpdateSchema } from "@/schemas/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { handlePreviewImage } from "@/lib/utils";
import { Pen } from "lucide-react";
import { Button } from "../ui/button";
import { useUpdateProfile } from "@/lib/queries/user.queries";

const ProfileUpdateForm = () => {
  const { user } = useAuthStore();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useUpdateProfile();

  const form = useForm<z.infer<typeof profileUpdateSchema>>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: "",
      phoneNo: "",
      profileImage: undefined,
      profileUrl: "",
    },
  });
  const onSubmit = (values: z.infer<typeof profileUpdateSchema>) => {
    if (user)
      mutate({
        userId: user?.id,
        body: values,
      });
  };

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name ?? "",
        phoneNo: user.phoneNo ?? "",
        profileImage: undefined,
        profileUrl: user.profileUrl ?? "",
      });
    }
  }, [user, form]);

  if (user)
    return (
      <div>
        <div className="relative mb-8">
          <Avatar className="size-28">
            <AvatarImage src={imageUrl ?? "https://github.com/shadcn.png"} />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
          <div className="bg-background border rounded-md flex max-w-7 p-1 absolute left-20 bottom-0 shadow-md cursor-pointer">
            <Pen
              size={18}
              color="var(--color-primary)"
              onClick={() => fileInputRef.current?.click()}
            />
          </div>
        </div>
        <form id="profile-update-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex max-md:flex-col w-full gap-x-10 gap-y-7">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phoneNo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phoneNo">Phone No (Optional)</FieldLabel>
                  <Input
                    {...field}
                    id="phoneNo"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your phone number"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            name="profileImage"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  id="image"
                  type="file"
                  aria-invalid={fieldState.invalid}
                  className="hidden"
                  autoComplete="off"
                  ref={fileInputRef}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                    setImageUrl(handlePreviewImage(file));
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              className="bg-gray-900 hover:bg-gray-700 cursor-pointer"
              form="profile-update-form"
            >
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    );
};

export default ProfileUpdateForm;
