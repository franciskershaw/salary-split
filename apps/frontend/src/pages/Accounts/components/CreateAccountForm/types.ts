// Re-export from shared package - single source of truth
import type { AccountInput } from "@salary-split/shared";

export {
  accountSchema as accountFormSchema,
  type AccountInput,
  type AccountFormInput,
} from "@salary-split/shared";

// For backwards compatibility
export type AccountFormValues = AccountInput;
