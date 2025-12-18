import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import Form, { FormInput } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSelect } from "@/components/ui/select";

import { transactionFormSchema, type TransactionFormValues } from "./types";

const transactionTypes = [
  { value: "expense", label: "Expense" },
  { value: "income", label: "Income" },
  { value: "transfer", label: "Transfer" },
];

const NewTransactionForm = () => {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: "expense",
      splits: [
        {
          category: "",
          amount: 0,
          description: "",
        },
      ],
      description: "",
      date: new Date(),
      transferToAccount: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "splits",
  });

  const onSubmit = (data: TransactionFormValues) => {
    console.log("Form submitted:", data);
    // TODO: Implement transaction creation
  };

  const handleAddSplit = () => {
    append({
      category: "",
      amount: 0,
      description: "",
    });
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="space-y-4">
        <FormSelect name="type" label="Type" options={transactionTypes} />
        <FormInput name="description" label="Description">
          <Input placeholder="Enter description" />
        </FormInput>

        {/* Splits Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              {fields.length === 1 ? "Category & Amount" : "Category Splits"}
            </label>
            {fields.length > 1 && (
              <span className="text-xs text-muted-foreground">
                {fields.length} categories
              </span>
            )}
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex gap-2 items-start p-3 rounded-lg border bg-muted/30"
            >
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <FormInput name={`splits.${index}.category`} label="">
                      <Input placeholder="Category" />
                    </FormInput>
                  </div>
                  <div className="w-32">
                    <FormInput name={`splits.${index}.amount`} label="">
                      <Input
                        type="number"
                        inputMode="decimal"
                        placeholder="Amount"
                        step="0.01"
                      />
                    </FormInput>
                  </div>
                </div>

                {fields.length > 1 && (
                  <FormInput name={`splits.${index}.description`} label="">
                    <Input placeholder="Note (optional)" className="text-sm" />
                  </FormInput>
                )}
              </div>

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="mt-1 p-1 hover:bg-destructive/10 rounded text-destructive"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddSplit}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            {fields.length === 1
              ? "Split between categories"
              : "Add another category"}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default NewTransactionForm;
