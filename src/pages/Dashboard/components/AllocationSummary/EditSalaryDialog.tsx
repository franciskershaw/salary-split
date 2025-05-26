import React from "react";

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

const formSchema = z.object({
  salary: z.coerce.number().min(0, "Salary must be a positive number"),
});

type FormValues = z.infer<typeof formSchema>;

const EditSalaryDialog = ({ value }: { value: number }) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salary: value,
    },
  });

  const onSubmit = (values: FormValues) => {
    try {
      console.log(values);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6  hover:bg-primary-500/30"
        >
          <Edit2 className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Monthly Salary</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This will update your monthly take-home salary used for calculations.
        </DialogDescription>
        <Form form={form} onSubmit={onSubmit}>
          <FormInput name="salary" label="Monthly Take-Home Salary">
            <Input
              type="number"
              placeholder="Enter your monthly take-home salary"
            />
          </FormInput>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSalaryDialog;
