"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLogin } from "@/lib/queries/auth.queries";
import { successToast } from "@/lib/handleToast";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { setCookie } from "@/lib/cookieHandler";
import { authConstants } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid Email" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

export function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useLogin();

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate(data, {
      onSuccess: (data) => {
        successToast(data);
        setCookie(authConstants.accessToken, data.accessToken);
        setCookie(authConstants.refreshToken, data.refreshToken);
        setCookie(authConstants.deviceId, data.deviceId);
        setUser(data?.user);
        router.push(routes.public.home);
      },
    });
  }

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                aria-invalid={fieldState.invalid}
                placeholder="Enter you email"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
                placeholder="Enter your password"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" form="form-rhf-demo">
          Login
        </Button>
      </FieldGroup>
    </form>
  );
}
