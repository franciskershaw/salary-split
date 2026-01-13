import { z } from "zod";

import { BILL_TYPES, type BillType } from "../constants";

const billTypeValues = Object.values(BILL_TYPES) as [BillType, ...BillType[]];

export const billSchema = z.object({
  _id: z.string().optional(), // Harmless for API to accept
  name: z.string().min(1, "Please provide a bill name."),
  amount: z.coerce
    .number()
    .min(0, "Amount cannot be negative")
    .refine(
      (val) => /^\d*\.?\d{0,2}$/.test(val.toString()),
      "Amount can have at most 2 decimal places"
    ),
  account: z.string().min(1, "Please provide an account ID."),
  type: z.enum(billTypeValues),
  splitBetween: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const num = typeof val === "string" ? Number(val) : val;
      if (isNaN(num) || !Number.isInteger(num)) {
        throw new Error("Split between must be a whole number.");
      }
      return num;
    })
    .pipe(
      z
        .number()
        .int("Split between must be a whole number.")
        .min(1, "Split between must be at least 1.")
        .max(10, "Split between cannot be more than 10.")
    ),
  dueDate: z.coerce.number().int().min(1).max(31),
  dueDateType: z.enum(["1", "31", "custom"]).optional(), // UI helper, ignored by API
});

// Output type (after transformation/coercion)
export type BillInput = z.infer<typeof billSchema>;
// Input type (before transformation - what forms send)
export type BillFormInput = z.input<typeof billSchema>;
