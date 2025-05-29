import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  open: controlledOpen,
  onOpenChange,
}: CreateAccountDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setIsOpen = (open: boolean) => {
    if (isControlled && onOpenChange) {
      onOpenChange(open);
    } else {
      setUncontrolledOpen(open);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {account ? "Edit Account" : "Create New Account"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {account
              ? "Edit your account details below."
              : "Add a new account to track your finances. Fill in the details below."}
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <CreateAccountForm
            onSuccess={() => setIsOpen(false)}
            account={account}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountDialog;
