import { FormDialog } from "@/components/layout/Dialogs/FormDialog";
import FormDialogFooter from "@/components/layout/Dialogs/FormDialogFooter";
import type { Account } from "@/types/globalTypes";

import CreateAccountForm from "../CreateAccountForm/CreateAccountForm";

interface CreateAccountDialogProps {
  trigger?: React.ReactNode;
  account?: Account;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CreateAccountDialog = ({
  trigger,
  account,
  open,
  onOpenChange,
}: CreateAccountDialogProps) => {
  return (
    <FormDialog
      trigger={trigger}
      item={account}
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Account"
      description="Add a new account to track your finances. Fill in the details below."
      editTitle="Edit Account"
      editDescription="Edit your account details below."
    >
      {({ setIsOpen, isEditing }) => (
        <CreateAccountForm onSuccess={() => setIsOpen(false)} account={account}>
          {({ isPending }) => (
            <FormDialogFooter
              isPending={isPending}
              isEditing={isEditing}
              itemName="Account"
            />
          )}
        </CreateAccountForm>
      )}
    </FormDialog>
  );
};

export default CreateAccountDialog;
