import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>
            {account ? "Edit Account" : "Create New Account"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {account
              ? "Edit your account details below."
              : "Add a new account to track your finances. Fill in the details below."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-0 pr-2 -mr-2">
          <CreateAccountForm
            onSuccess={() => setIsOpen(false)}
            account={account}
          >
            {({ isPending, isEditing }) => (
              <DialogFooter className="sticky bottom-0 bg-background pt-4 mt-6 border-t">
                <DialogClose asChild>
                  <Button variant="outline" disabled={isPending}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isPending}>
                  {isPending
                    ? isEditing
                      ? "Saving..."
                      : "Creating..."
                    : isEditing
                      ? "Save Changes"
                      : "Create Account"}
                </Button>
              </DialogFooter>
            )}
          </CreateAccountForm>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountDialog;
