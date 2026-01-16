// Re-export from shared package - single source of truth
import type { AccountInput } from "@/shared";

export {
  accountSchema as accountFormSchema,
  type AccountInput,
  type AccountFormInput,
} from "@/shared";

// For backwards compatibility
export type AccountFormValues = AccountInput;
