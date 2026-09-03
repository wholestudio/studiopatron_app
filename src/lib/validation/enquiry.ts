import { z } from "zod";

import { emailSchema, optionalString, requiredString } from "@/lib/validation/common";

export const enquirySchema = z.object({
  name: requiredString,
  email: emailSchema,
  phone: optionalString,
  subject: optionalString,
  message: requiredString,
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
