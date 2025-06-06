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
import { getDisplayInfo } from "@/lib/display-info";
import type { Bill } from "@/types/globalTypes";

import useReorderBills from "../../hooks/useReorderbills";

interface ReorderBillsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bills: Bill[];
}

const ReorderBillsDialog = ({
  open,
  onOpenChange,
  bills,
}: ReorderBillsDialogProps) => {
  const [items, setItems] = useState(bills);
  const { reorderBills, isPending } = useReorderBills();

  const handleReorder = () => {
    reorderBills(items.map((bill) => bill._id));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader className="pb-2">
          <DialogTitle>Reorder Bills</DialogTitle>
          <DialogDescription>
            Drag and drop bills to change their order
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          <Reorder.Group
            axis="y"
            values={items}
            onReorder={setItems}
            className="space-y-1.5"
          >
            {items.map((bill) => {
              const { icon: Icon, colors } = getDisplayInfo("bill", bill.type);
              return (
                <Reorder.Item
                  key={bill._id}
                  value={bill}
                  className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface p-3 cursor-grab active:cursor-grabbing"
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 text-sm">{bill.name}</span>
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
};

export default ReorderBillsDialog;
