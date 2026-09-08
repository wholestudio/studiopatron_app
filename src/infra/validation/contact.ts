import { z } from "zod";

import { emailSchema, optionalString, requiredString } from "@/infra/validation/common";

export const contactSchema = z.object({
  name: requiredString,
  email: emailSchema,
  phone: optionalString,
  message: requiredString,
});

export type ContactInput = z.infer<typeof contactSchema>;
