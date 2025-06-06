import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FormDialogProps<T> {
  trigger?: React.ReactNode;
  item?: T;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: string;
  editTitle?: string;
  editDescription?: string;
  children: (props: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    isEditing: boolean;
  }) => React.ReactNode;
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
  children,
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
          {children({ isOpen, setIsOpen, isEditing })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
