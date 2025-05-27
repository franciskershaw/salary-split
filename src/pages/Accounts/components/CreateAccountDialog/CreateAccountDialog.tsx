import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CreateAccountForm from "../CreateAccountForm/CreateAccountForm";

interface CreateAccountDialogProps {
  trigger: React.ReactNode;
}

const CreateAccountDialog = ({ trigger }: CreateAccountDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Account</DialogTitle>
          <DialogDescription className="sr-only">
            Add a new account to track your finances. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <CreateAccountForm closeModal={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountDialog;
