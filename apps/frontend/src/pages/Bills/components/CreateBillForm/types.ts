// Re-export from shared package - single source of truth
import type { BillInput } from "@salary-split/shared";

export {
  billSchema as billFormSchema,
  type BillInput,
  type BillFormInput,
} from "@salary-split/shared";

// For backwards compatibility
export type BillFormValues = BillInput;
