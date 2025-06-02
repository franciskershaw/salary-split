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
  open: controlledOpen,
  onOpenChange,
}: CreateBillDialogProps) => {
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
          <DialogTitle>{bill ? "Edit Bill" : "Create New Bill"}</DialogTitle>
          <DialogDescription className="sr-only">
            {bill
              ? "Edit your bill details below."
              : "Add a new bill to track your finances. Fill in the details below."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto min-h-0 pr-2 -mr-2">
          <CreateBillForm 
            onSuccess={() => setIsOpen(false)} 
            bill={bill}
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
                      : "Create Bill"}
                </Button>
              </DialogFooter>
            )}
          </CreateBillForm>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBillDialog;
