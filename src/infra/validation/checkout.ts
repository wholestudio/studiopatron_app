import { z } from "zod";

import { emailSchema, requiredString } from "@/infra/validation/common";

export const checkoutSchema = z.object({
  email: emailSchema,
  name: requiredString,
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
