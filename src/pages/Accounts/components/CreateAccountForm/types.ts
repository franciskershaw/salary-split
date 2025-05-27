import { z } from "zod";

import {
  CURRENT_ACCOUNT,
  INVESTMENT_ACCOUNT,
  JOINT_ACCOUNT,
  SAVINGS_ACCOUNT,
} from "@/constants/api";

export const accountFormSchema = z.object({
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
    CURRENT_ACCOUNT,
    SAVINGS_ACCOUNT,
    INVESTMENT_ACCOUNT,
    JOINT_ACCOUNT,
  ]),
  acceptsFunds: z.boolean(),
  receivesSalary: z.boolean(),
  isDefault: z.boolean(),
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;
