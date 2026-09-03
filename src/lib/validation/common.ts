import { z } from "zod";

export const emailSchema = z.string().trim().email();
export const requiredString = z.string().trim().min(1);
export const optionalString = z.string().trim().optional();
