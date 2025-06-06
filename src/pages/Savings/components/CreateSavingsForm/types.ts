import { z } from "zod";

import { BILL_TYPES, type BillType } from "@/constants/api";

export const savingsFormSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Please provide a savings name."),
  amount: z.coerce
    .number()
    .min(0, "Amount must be positive")
    .refine(
      (val) => /^\d*\.?\d{0,2}$/.test(val.toString()),
      "Amount can have at most 2 decimal places"
    ),
  account: z.string().min(1, "Please provide an account ID."),
  type: z.enum(Object.values(BILL_TYPES) as [BillType, ...BillType[]]),
  dueDate: z.coerce.number().min(1).max(31),
  dueDateType: z.enum(["1", "31", "custom"]).optional(), // Helper field to track UI state
  splitBetween: z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]),
});

export type SavingsFormValues = z.infer<typeof savingsFormSchema>;
