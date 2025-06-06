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
import type { Account, Bill } from "@/types/globalTypes";

interface FormComponentProps {
  onSuccess?: () => void;
  children?: React.ReactNode;
  [key: string]: Account | Bill | React.ReactNode | (() => void) | undefined;
}

type FormComponent = React.ComponentType<FormComponentProps>;

interface FormDialogProps<T> {
  trigger?: React.ReactNode;
  item?: T;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: string;
  editTitle?: string;
  editDescription?: string;
  formId: string;
  isPending?: boolean;
  form: FormComponent;
}

export function FormDialog<T>({
  trigger,
  item,
  open: controlledOpen,
  onOpenChange,
  title,
  description,
  editTitle,
  editDescription,
  formId,
  isPending = false,
  form: FormComponent,
}: FormDialogProps<T>) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const isEditing = !!item;

  const setIsOpen = (open: boolean) => {
    if (isControlled && onOpenChange) {
      onOpenChange(open);
    } else {
      setUncontrolledOpen(open);
    }
  };

  const handleSuccess = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>{isEditing ? editTitle || title : title}</DialogTitle>
          <DialogDescription className="sr-only">
            {isEditing ? editDescription || description : description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-0 pr-2 -mr-2">
          <FormComponent {...item} onSuccess={handleSuccess} />
        </div>

        <DialogFooter className="flex-shrink-0 border-t pt-3 mt-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form={formId} disabled={isPending}>
            {isEditing ? "Save Changes" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
