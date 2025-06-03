// src/pages/Bills/components/CreateBillDialog/CreateBillDialog.tsx
import { FormDialog } from "@/components/layout/Dialogs/FormDialog";
import FormDialogFooter from "@/components/layout/Dialogs/FormDialogFooter";
import type { Bill } from "@/types/globalTypes";

import CreateBillForm from "../CreateBillForm/CreateBillForm";

interface CreateBillDialogProps {
  trigger?: React.ReactNode;
  bill?: Bill;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CreateBillDialog = ({
  trigger,
  bill,
  open,
  onOpenChange,
}: CreateBillDialogProps) => {
  return (
    <FormDialog
      trigger={trigger}
      item={bill}
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Bill"
      description="Add a new bill to track your finances. Fill in the details below."
      editTitle="Edit Bill"
      editDescription="Edit your bill details below."
    >
      {({ setIsOpen, isEditing }) => (
        <CreateBillForm onSuccess={() => setIsOpen(false)} bill={bill}>
          {({ isPending }) => (
            <FormDialogFooter
              isPending={isPending}
              isEditing={isEditing}
              itemName="Bill"
            />
          )}
        </CreateBillForm>
      )}
    </FormDialog>
  );
};

export default CreateBillDialog;
