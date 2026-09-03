import { z } from "zod";

import { optionalString } from "@/lib/validation/common";

export const calculatorSchema = z.object({
  spaceType: optionalString,
  area: z.coerce.number().positive().optional(),
  finishLevel: optionalString,
});

export type CalculatorInput = z.infer<typeof calculatorSchema>;
