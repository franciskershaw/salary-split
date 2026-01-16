// Re-export from shared package - single source of truth
import type { ExpenseInput } from "@/shared";

export {
  expenseSchema as expenseFormSchema,
  type ExpenseInput,
  type ExpenseFormInput,
} from "@/shared";

// For backwards compatibility
export type ExpenseFormValues = ExpenseInput;
