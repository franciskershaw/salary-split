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
import type { Account } from "@/types/globalTypes";

import { getAccountTypeInfo } from "../../helper/helper";
import useReorderAccounts from "../../hooks/useReorderAccounts";

interface ReorderAccountsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accounts: Account[];
}

export default function ReorderAccountsDialog({
  open,
  onOpenChange,
  accounts,
}: ReorderAccountsDialogProps) {
  const [items, setItems] = useState(accounts);
  const { reorderAccounts, isPending } = useReorderAccounts();

  const handleReorder = () => {
    reorderAccounts(items.map((account) => account._id));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reorder Accounts</DialogTitle>
          <DialogDescription>
            Drag and drop accounts to change their order
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Reorder.Group
            axis="y"
            values={items}
            onReorder={setItems}
            className="space-y-2"
          >
            {items.map((account) => {
              const { icon: Icon, colors } = getAccountTypeInfo(account.type);
              return (
                <Reorder.Item
                  key={account._id}
                  value={account}
                  className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface p-3 cursor-grab active:cursor-grabbing"
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 text-sm">{account.name}</span>
                  <Icon className={`h-4 w-4 ${colors.text}`} />
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </div>
        <DialogFooter>
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
