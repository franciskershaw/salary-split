import { z } from "zod";

import { BILL_TYPES, type BillType } from "@/constants/api";

export const billFormSchema = z
  .object({
    _id: z.string().optional(),
    name: z.string().min(1, "Please provide a bill name."),
    amount: z.coerce
      .number()
      .min(0, "Amount cannot be negative")
      .refine(
        (val) => /^\d*\.?\d{0,2}$/.test(val.toString()),
        "Amount can have at most 2 decimal places"
      ),
    account: z.string().min(1, "Please provide an account ID."),
    type: z.enum(Object.values(BILL_TYPES) as [BillType, ...BillType[]]),
    splitBetween: z.union([z.string(), z.number()]).transform((val) => {
      const num = typeof val === "string" ? Number(val) : val;
      if (isNaN(num) || !Number.isInteger(num)) {
        throw new Error("Split between must be a whole number.");
      }
      return num;
    }).pipe(
      z
        .number()
        .int("Split between must be a whole number.")
        .min(1, "Split between must be at least 1.")
        .max(10, "Split between cannot be more than 10.")
    ),
    dueDate: z.coerce.number().min(1).max(31),
    dueDateType: z.enum(["1", "31", "custom"]).optional(), // Helper field to track UI state
  })
  .strict();

export type BillFormValues = z.infer<typeof billFormSchema>;
export type BillFormInput = z.input<typeof billFormSchema>;
