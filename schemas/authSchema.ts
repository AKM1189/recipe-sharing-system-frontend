import z from "zod";

export const passwordSchema = z
  .string()
  .nonempty({ message: "Password is required" })
  .min(8, "Password must be at least 8 characters long.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const signupSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Name is required" })
      .min(3, { message: "At lease 3 characters required" }),
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .email({ message: "Invalid Email" }),
    password: passwordSchema,
    confirmPassword: z.string().min(8, "Confirm password must match password."),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"], // Point error to confirmPassword field
      });
    }
  });

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid Email" }),
  password: z.string().nonempty({ message: "Password is required" }),
});
