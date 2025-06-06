import { useState, type ReactNode } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Form, FormInput } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

import useUpdateSalary from "../../hooks/useUpdateSalary";

const formSchema = z.object({
  salary: z.coerce.number().min(0, "Salary must be a positive number"),
});

type FormValues = z.infer<typeof formSchema>;

const EditSalaryDialog = ({
  value,
  children,
}: {
  value: number;
  children?: ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salary: value,
    },
  });

  const { mutate: updateSalary, isPending } = useUpdateSalary();

  const onSubmit = (values: FormValues) => {
    updateSalary(values.salary, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6  hover:bg-primary-500/30"
          >
            <Edit2 className="h-3 w-3" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Monthly Salary</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This will update your monthly take-home salary used for calculations.
        </DialogDescription>
        <Form form={form} onSubmit={onSubmit}>
          <div className="relative">
            <FormInput name="salary" label="Monthly Take-Home Salary">
              <Input
                type="number"
                placeholder="Enter your monthly take-home salary"
              />
            </FormInput>
            {isPending && (
              <LoadingOverlay
                message="Updating salary..."
                opacity="light"
                spinnerSize="md"
                fixedInDialog
              />
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSalaryDialog;
