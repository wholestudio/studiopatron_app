import { z } from "zod";

import { emailSchema, optionalString, requiredString } from "@/lib/validation/common";

export const quoteSchema = z.object({
  name: requiredString,
  email: emailSchema,
  phone: optionalString,
  projectType: optionalString,
  message: requiredString,
});

export type QuoteInput = z.infer<typeof quoteSchema>;
