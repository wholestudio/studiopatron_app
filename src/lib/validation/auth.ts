import { z } from "zod";

import { emailSchema, requiredString } from "@/lib/validation/common";

export const loginSchema = z.object({
  email: emailSchema,
  password: requiredString.min(8),
});

export const registerSchema = z
  .object({
    name: requiredString,
    email: emailSchema,
    password: requiredString.min(8),
    confirmPassword: requiredString.min(8),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
