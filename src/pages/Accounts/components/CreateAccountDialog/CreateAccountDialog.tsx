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
  trigger: React.ReactNode;
  account?: Account;
}

const CreateAccountDialog = ({
  trigger,
  account,
}: CreateAccountDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Account</DialogTitle>
          <DialogDescription className="sr-only">
            Add a new account to track your finances. Fill in the details below.
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
