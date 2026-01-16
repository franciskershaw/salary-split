import { useCallback, useEffect } from "react";

import { useForm } from "react-hook-form";

import { Form, FormInput } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSelect } from "@/components/ui/select";
import { SAVINGS_FORM_ID } from "@/constants/features";
import { resolver } from "@/lib/utils";
import type { Bill } from "@/types/globalTypes";

import useGetAccounts from "../../../Accounts/hooks/useGetAccounts";
import useAddSavings from "../../hooks/useAddSavings";
import useEditSavings from "../../hooks/useEditSavings";
import { savingsFormSchema, type SavingsFormValues } from "./types";

interface CreateSavingsFormProps {
  onSuccess?: () => void;
  savings?: Bill;
}

const CreateSavingsForm = ({ onSuccess, savings }: CreateSavingsFormProps) => {
  const { accountsWhichAcceptFunds } = useGetAccounts();
  const isEditing = !!savings;

  // Due date type options
  const dueDateTypeOptions = [
    { value: "1", label: "1st of next month" },
    { value: "31", label: "Last day of next month" },
    { value: "custom", label: "Custom day..." },
  ];

  const form = useForm<SavingsFormValues>({
    resolver: resolver(savingsFormSchema),
    defaultValues: {
      _id: savings?._id,
      name: savings?.name ?? "",
      amount: savings?.amount ?? 0,
      account: savings?.account?._id ?? "",
      // type: savings?.type ?? BILL_TYPES.OTHER,
      // splitBetween: (savings?.splitBetween?.toString() ?? "1") as
      //   | "1"
      //   | "2"
      //   | "3"
      //   | "4"
      //   | "5"
      //   | "6"
      //   | "7"
      //   | "8"
      //   | "9"
      //   | "10",
      dueDate: typeof savings?.dueDate === "number" ? savings.dueDate : 1,
      dueDateType:
        typeof savings?.dueDate === "number"
          ? savings.dueDate === 1
            ? "1"
            : savings.dueDate === 31
              ? "31"
              : "custom"
          : "1",
    },
  });

  const { addSavings } = useAddSavings();
  const { editSavings } = useEditSavings();

  const onSubmit = useCallback(
    (values: SavingsFormValues) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { dueDateType, ...submitValues } = values;
      if (isEditing) {
        editSavings(submitValues, {
          onSuccess: () => {
            onSuccess?.();
          },
        });
      } else {
        addSavings(submitValues, {
          onSuccess: () => {
            onSuccess?.();
          },
        });
      }
    },
    [isEditing, editSavings, onSuccess, addSavings]
  );

  // Watch dueDateType to show/hide custom input and update dueDate
  const dueDateType = form.watch("dueDateType");

  useEffect(() => {
    if (dueDateType === "1") {
      form.setValue("dueDate", 1);
    } else if (dueDateType === "31") {
      form.setValue("dueDate", 31);
    }
  }, [dueDateType, form]);

  return (
    <Form form={form} onSubmit={onSubmit} id={SAVINGS_FORM_ID}>
      <div className="space-y-6">
        <div className="space-y-4">
          <FormInput name="name" label="Savings Name">
            <Input
              autoComplete="off"
              placeholder="e.g. Netflix, Electricity, Rent"
            />
          </FormInput>

          <FormInput name="amount" label="Amount">
            <Input
              type="number"
              inputMode="decimal"
              placeholder="Enter expense amount"
              min={0.01}
              step="0.01"
            />
          </FormInput>

          <FormSelect
            name="account"
            label="Account"
            placeholder="Select account to pay from"
            options={accountsWhichAcceptFunds ?? []}
          />

          <FormSelect
            name="dueDateType"
            label="Due Date"
            placeholder="When will this savings be due this coming month?"
            options={dueDateTypeOptions}
          />

          {dueDateType === "custom" && (
            <FormInput name="dueDate" label="Day of Month">
              <Input
                type="number"
                min={1}
                max={31}
                placeholder="e.g., 22 for 22nd of each month"
              />
            </FormInput>
          )}

          {dueDateType && dueDateType !== "custom" && (
            <div className="text-sm text-muted-foreground">
              {dueDateType === "31" &&
                "We'll automatically use the last day of next month"}
              {dueDateType === "1" &&
                "Expense will be due on the 1st of next month"}
            </div>
          )}
        </div>
      </div>
    </Form>
  );
};

export default CreateSavingsForm;
