// Re-export from shared package - single source of truth
import type { SavingsInput } from "@/shared";

export {
  savingsSchema as savingsFormSchema,
  type SavingsInput,
  type SavingsFormInput,
} from "@/shared";

// For backwards compatibility
export type SavingsFormValues = SavingsInput;
