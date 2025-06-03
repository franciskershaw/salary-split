// src/pages/Bills/components/CreateBillDialog/CreateBillDialog.tsx
import { FormDialog } from "@/components/layout/Dialogs/FormDialog";
import FormDialogFooter from "@/components/layout/Dialogs/FormDialogFooter";
import type { Expense } from "@/types/globalTypes";

import CreateExpenseForm from "../CreateExpenseForm/CreateExpenseForm";

interface CreateExpenseDialogProps {
  trigger?: React.ReactNode;
  expense?: Expense;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CreateExpenseDialog = ({
  trigger,
  expense,
  open,
  onOpenChange,
}: CreateExpenseDialogProps) => {
  return (
    <FormDialog
      trigger={trigger}
      item={expense}
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Expense"
      description="Add a new expense to track your finances. Fill in the details below."
      editTitle="Edit Expense"
      editDescription="Edit your expense details below."
    >
      {({ setIsOpen, isEditing }) => (
        <CreateExpenseForm onSuccess={() => setIsOpen(false)} expense={expense}>
          {({ isPending }) => (
            <FormDialogFooter
              isPending={isPending}
              isEditing={isEditing}
              itemName="Bill"
            />
          )}
        </CreateExpenseForm>
      )}
    </FormDialog>
  );
};

export default CreateExpenseDialog;
