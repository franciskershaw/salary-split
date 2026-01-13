// Re-export from shared package - single source of truth
import type { SavingsInput } from "@salary-split/shared";

export {
  savingsSchema as savingsFormSchema,
  type SavingsInput,
  type SavingsFormInput,
} from "@salary-split/shared";

// For backwards compatibility
export type SavingsFormValues = SavingsInput;
