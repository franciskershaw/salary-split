import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

interface FormDialogFooterProps {
  isPending: boolean;
  isEditing: boolean;
  onCancel?: () => void;
  itemName: string;
}

const FormDialogFooter = ({
  isPending,
  isEditing,
  onCancel,
  itemName,
}: FormDialogFooterProps) => {
  return (
    <div className="sticky bottom-0 bg-background pt-4 mt-6 border-t">
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <DialogClose asChild>
          <Button
            variant="outline"
            disabled={isPending}
            onClick={onCancel}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          {isPending
            ? isEditing
              ? "Saving..."
              : `Creating ${itemName}...`
            : isEditing
              ? "Save Changes"
              : `Create ${itemName}`}
        </Button>
      </div>
    </div>
  );
};

export default FormDialogFooter;
