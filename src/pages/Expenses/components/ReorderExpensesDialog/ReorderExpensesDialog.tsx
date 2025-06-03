import { useState } from "react";

import { Reorder } from "framer-motion";
import { GripVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getBillTypeInfo } from "@/pages/Bills/helper/helper";
import type { Bill } from "@/types/globalTypes";

import useReorderExpenses from "../../hooks/useReorderExpenses";

interface ReorderExpensesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expenses: Bill[];
}

export default function ReorderExpensesDialog({
  open,
  onOpenChange,
  expenses,
}: ReorderExpensesDialogProps) {
  const [items, setItems] = useState(expenses);
  const { reorderExpenses, isPending } = useReorderExpenses();

  const handleReorder = () => {
    reorderExpenses(items.map((expense) => expense._id));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader className="pb-2">
          <DialogTitle>Reorder Expenses</DialogTitle>
          <DialogDescription>
            Drag and drop expenses to change their order
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          <Reorder.Group
            axis="y"
            values={items}
            onReorder={setItems}
            className="space-y-1.5"
          >
            {items.map((expense) => {
              const { icon: Icon, colors } = getBillTypeInfo(expense.type);
              return (
                <Reorder.Item
                  key={expense._id}
                  value={expense}
                  className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface p-3 cursor-grab active:cursor-grabbing"
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 text-sm">{expense.name}</span>
                  <Icon className={`h-4 w-4 ${colors.text}`} />
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </div>

        <DialogFooter className="flex-shrink-0 border-t pt-3 mt-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleReorder} disabled={isPending}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
