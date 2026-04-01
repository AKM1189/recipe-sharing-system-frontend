import z from "zod";

export const profileUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phoneNo: z.string().optional(),
  profileImage: z.instanceof(File).optional(),
  profileUrl: z.string().optional(),
});

export const emailChangeSchema = z
  .object({
    oldEmail: z.string(),
    newEmail: z
      .string()
      .nonempty({ message: "Email is required" })
      .email({ message: "Invalid Email" }),
    password: z.string().nonempty({ message: "Password is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.newEmail === data.oldEmail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New email cannot be same with the old one.",
        path: ["newEmail"], // Point error to confirmPassword field
      });
    }
  });

export const passwordChangeSchema = z
  .object({
    oldPassword: z.string().nonempty({ message: "Old Password is required" }),
    newPassword: z.string().nonempty({ message: "New Password is required" }),
    confirmPassword: z.string().min(8, "Confirm password must match password."),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"], // Point error to confirmPassword field
      });
    }
  });
