// Re-export from shared package - single source of truth
import type { BillInput } from "@/shared";

export {
  billSchema as billFormSchema,
  type BillInput,
  type BillFormInput,
} from "@/shared";

// For backwards compatibility
export type BillFormValues = BillInput;
