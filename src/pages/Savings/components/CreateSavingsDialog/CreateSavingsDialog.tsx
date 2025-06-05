// src/pages/Bills/components/CreateBillDialog/CreateBillDialog.tsx
import { FormDialog } from "@/components/layout/Dialogs/FormDialog";
import FormDialogFooter from "@/components/layout/Dialogs/FormDialogFooter";
import type { Bill } from "@/types/globalTypes";

import CreateSavingsForm from "../CreateSavingsForm/CreateSavingsForm";

interface CreateSavingsDialogProps {
  trigger?: React.ReactNode;
  savings?: Bill;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CreateSavingsDialog = ({
  trigger,
  savings,
  open,
  onOpenChange,
}: CreateSavingsDialogProps) => {
  return (
    <FormDialog
      trigger={trigger}
      item={savings}
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Savings"
      description="Add a new savings to track your finances. Fill in the details below."
      editTitle="Edit Savings"
      editDescription="Edit your savings details below."
    >
      {({ setIsOpen, isEditing }) => (
        <CreateSavingsForm onSuccess={() => setIsOpen(false)} savings={savings}>
          {({ isPending }) => (
            <FormDialogFooter
              isPending={isPending}
              isEditing={isEditing}
              itemName="Savings"
            />
          )}
        </CreateSavingsForm>
      )}
    </FormDialog>
  );
};

export default CreateSavingsDialog;
