import { z } from "zod";

import {
  CURRENT_ACCOUNT,
  INVESTMENT_ACCOUNT,
  JOINT_ACCOUNT,
  SAVINGS_ACCOUNT,
} from "@/constants/api";

export const accountFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  institution: z.string().optional(),
  amount: z.coerce.number().min(0, "Amount must be a positive number"),
  type: z.enum([
    CURRENT_ACCOUNT,
    SAVINGS_ACCOUNT,
    INVESTMENT_ACCOUNT,
    JOINT_ACCOUNT,
  ]),
  acceptsFunds: z.boolean(),
  receivesSalary: z.boolean(),
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;
