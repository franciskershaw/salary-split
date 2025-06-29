import { z } from "zod";

import { ACCOUNT_TYPES } from "@/constants/api";

export const accountFormSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Account name is required"),
  institution: z.string().optional(),
  amount: z.coerce
    .number()
    .min(0, "Amount must be positive")
    .refine(
      (val) => /^\d*\.?\d{0,2}$/.test(val.toString()),
      "Amount can have at most 2 decimal places"
    ),
  type: z.enum([
    ACCOUNT_TYPES.CURRENT,
    ACCOUNT_TYPES.SAVINGS,
    ACCOUNT_TYPES.INVESTMENT,
    ACCOUNT_TYPES.JOINT,
  ]),
  acceptsFunds: z.boolean(),
  receivesSalary: z.boolean(),
  isDefault: z.boolean(),
  targetMonthlyAmount: z
    .object({
      amount: z.coerce
        .number()
        .min(0, "Target amount must be positive")
        .refine(
          (val) => /^\d*\.?\d{0,2}$/.test(val.toString()),
          "Target amount can have at most 2 decimal places"
        ),
      splitBetween: z.coerce
        .number()
        .min(1, "Split between must be at least 1 person")
        .max(10, "Split between cannot exceed 10 people"),
    })
    .optional()
    .nullable(),
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;
