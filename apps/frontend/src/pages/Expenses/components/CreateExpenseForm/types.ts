// Re-export from shared package - single source of truth
import type { ExpenseInput } from "@salary-split/shared";

export {
  expenseSchema as expenseFormSchema,
  type ExpenseInput,
  type ExpenseFormInput,
} from "@salary-split/shared";

// For backwards compatibility
export type ExpenseFormValues = ExpenseInput;
