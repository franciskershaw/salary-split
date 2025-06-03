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
import type { Bill } from "@/types/globalTypes";

import useDeleteBill from "../../hooks/useDeleteBill";

interface DeleteBillDialogProps {
  bill: Bill;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DeleteBillDialog = ({
  bill,
  open,
  onOpenChange,
}: DeleteBillDialogProps) => {
  const { deleteBill, isPending } = useDeleteBill();

  const handleDelete = () => {
    deleteBill(bill._id, {
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
            Delete Bill
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {bill.name}? This action cannot be
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
            {isPending ? "Deleting..." : "Delete Bill"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBillDialog;
