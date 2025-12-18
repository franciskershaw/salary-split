import { z } from "zod";

const transactionSplitSchema = z.object({
  category: z.string().min(1, "Please provide a category ID for the split."),
  amount: z
    .number({
      required_error: "Split amount is required.",
      invalid_type_error: "Split amount must be a number.",
    })
    .refine((val) => val !== 0, {
      message: "Split amount cannot be zero.",
    }),
  description: z.string().optional(),
});

export const transactionFormSchema = z
  .object({
    type: z.enum(["income", "expense", "transfer"], {
      errorMap: () => ({
        message:
          "Transaction type must be one of: income, expense, or transfer.",
      }),
    }),
    splits: z
      .array(transactionSplitSchema)
      .min(1, "Transaction must have at least one split."),
    description: z.string().min(1, "Please provide a description."),
    date: z.date({
      required_error: "Date is required.",
      invalid_type_error: "Date must be a valid date.",
    }),
    transferToAccount: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === "transfer") {
        return data.transferToAccount && data.transferToAccount.length > 0;
      }
      return true;
    },
    {
      message:
        "Transfer destination account is required for transfer transactions.",
      path: ["transferToAccount"],
    }
  );

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
export type TransactionSplitValues = z.infer<typeof transactionSplitSchema>;
