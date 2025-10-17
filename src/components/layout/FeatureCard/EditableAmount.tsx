import { useEffect, useRef, useState } from "react";

import { Check, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUser from "@/hooks/user/useUser";
import { formatCurrency } from "@/lib/utils";
import type { Feature } from "@/types/globalTypes";

import useUpdateAmount from "./useUpdateAmount";

type EditableAmountProps = {
  amount: number;
  itemId: string;
  feature: Feature;
};

const EditableAmount = ({ amount, itemId, feature }: EditableAmountProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(amount.toString());
  const { user } = useUser();
  const { updateAmount, isPending } = useUpdateAmount(feature);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset edit value when amount changes (after successful update)
  useEffect(() => {
    setEditValue(amount.toString());
  }, [amount]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    if (!isPending) {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditValue(amount.toString());
    setIsEditing(false);
  };

  const handleSave = () => {
    const newAmount = parseFloat(editValue);

    // Validate the input
    if (isNaN(newAmount) || newAmount < 0) {
      return; // Don't save invalid values
    }

    // Only save if the value actually changed
    if (newAmount !== amount) {
      updateAmount(
        { itemId, amount: newAmount },
        {
          onSuccess: () => {
            setIsEditing(false);
          },
          onError: () => {
            // Revert to original value on error
            setEditValue(amount.toString());
          },
        }
      );
    } else {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative">
          <Input
            ref={inputRef}
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            // blur event also works for manual clicks on the save button
            onBlur={handleSave}
            className="font-semibold w-32 h-10 pr-8 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [-moz-appearance:textfield]"
            step="0.01"
            min="0"
            disabled={isPending}
          />
          {user?.defaultCurrency && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {user.defaultCurrency}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            // triggers handleSave through blur event
            onClick={() => setIsEditing(false)}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4 text-green-600" />
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={handleCancel}
            disabled={isPending}
          >
            <X className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <span
      className="text-2xl font-semibold cursor-pointer hover:bg-muted/50 rounded px-2 py-1 transition-colors"
      onClick={handleStartEdit}
      title="Click to edit amount"
    >
      {formatCurrency(amount, user?.defaultCurrency)}
    </span>
  );
};

export default EditableAmount;
