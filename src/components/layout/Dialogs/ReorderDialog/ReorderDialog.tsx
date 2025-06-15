import { useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
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
import type { AccountType, BillType } from "@/constants/api";
import { getDisplayInfo } from "@/lib/display-info";
import { capitaliseFirstLetter } from "@/lib/utils";
import type { Feature } from "@/types/globalTypes";

import useReorderItems from "./useReorderItems";

interface ReorderableItem {
  _id: string;
  name: string;
  type: AccountType | BillType;
}

interface ReorderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: ReorderableItem[];
  feature: Feature;
}

// Extract ReorderItem as a separate component
const ReorderItem = ({ item, feature }: { item: ReorderableItem; feature: Feature }) => {
  const { icon: Icon, colors } = getDisplayInfo(feature, item.type);
  const dragControls = useDragControls();
  
  return (
    <Reorder.Item
      key={item._id}
      value={item}
      dragListener={false}
      dragControls={dragControls}
      className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface p-3"
      whileDrag={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }}
    >
      <div
        className="flex items-center justify-center w-8 h-8 -ml-1 rounded cursor-grab active:cursor-grabbing hover:bg-surface-border/50 transition-colors touch-manipulation"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <span className="flex-1 text-sm select-none">{item.name}</span>
      <Icon className={`h-4 w-4 ${colors.text}`} />
    </Reorder.Item>
  );
};

const ReorderDialog = ({
  open,
  onOpenChange,
  items: initialItems,
  feature,
}: ReorderDialogProps) => {
  const [items, setItems] = useState(initialItems);
  const { reorderItems, isPending } = useReorderItems(feature);

  const handleReorder = () => {
    reorderItems(items.map((item) => item._id));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader className="pb-2">
          <DialogTitle>Reorder {capitaliseFirstLetter(feature)}</DialogTitle>
          <DialogDescription>
            Drag the grip handle to reorder {feature}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          <Reorder.Group
            axis="y"
            values={items}
            onReorder={setItems}
            className="space-y-1.5"
          >
            {items.map((item) => (
              <ReorderItem key={item._id} item={item} feature={feature} />
            ))}
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

export default ReorderDialog;
