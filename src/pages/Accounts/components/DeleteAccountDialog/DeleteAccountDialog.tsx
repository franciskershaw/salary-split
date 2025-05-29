import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Account } from "@/types/globalTypes";

import useDeleteAccount from "../../hooks/useDeleteAccount";

interface DeleteAccountDialogProps {
  account: Account;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DeleteAccountDialog = ({
  account,
  open,
  onOpenChange,
}: DeleteAccountDialogProps) => {
  const { deleteAccount, isPending } = useDeleteAccount();

  const handleDelete = () => {
    deleteAccount(account._id, {
      onSuccess: () => {
        onOpenChange?.(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Account
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {account.name}? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange?.(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountDialog;
