import { useCallback, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormInput } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSelect } from "@/components/ui/select";
import { BILL_TYPES } from "@/constants/api";
import { EXPENSE_FORM_ID } from "@/constants/features";
import type { Bill } from "@/types/globalTypes";

import useGetAccounts from "../../../Accounts/hooks/useGetAccounts";
import useAddExpense from "../../hooks/useAddExpense";
import useEditExpense from "../../hooks/useEditExpense";
import { expenseFormSchema, type ExpenseFormValues } from "./types";

interface CreateExpenseFormProps {
  onSuccess?: () => void;
  expense?: Bill;
}

// Helper function to convert bill type to readable label
const getBillTypeLabel = (type: string) => {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const CreateExpenseForm = ({ onSuccess, expense }: CreateExpenseFormProps) => {
  const { accountsWhichAcceptFunds } = useGetAccounts();
  const isEditing = !!expense;

  // Bill type options
  const billTypeOptions = Object.values(BILL_TYPES).map((type) => ({
    value: type,
    label: getBillTypeLabel(type),
  }));

  // Due date type options
  const dueDateTypeOptions = [
    { value: "1", label: "1st of next month" },
    { value: "31", label: "Last day of next month" },
    { value: "custom", label: "Custom day..." },
  ];

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      _id: expense?._id,
      name: expense?.name ?? "",
      amount: expense?.amount ?? 0,
      account: expense?.account?._id ?? "",
      type: expense?.type ?? BILL_TYPES.OTHER,
      splitBetween: (expense?.splitBetween?.toString() ?? "1") as
        | "1"
        | "2"
        | "3"
        | "4"
        | "5"
        | "6"
        | "7"
        | "8"
        | "9"
        | "10",
      dueDate: typeof expense?.dueDate === "number" ? expense.dueDate : 1,
      dueDateType:
        typeof expense?.dueDate === "number"
          ? expense.dueDate === 1
            ? "1"
            : expense.dueDate === 31
              ? "31"
              : "custom"
          : "1",
    },
  });

  const { addExpense } = useAddExpense();
  const { editExpense } = useEditExpense();

  const onSubmit = useCallback(
    (values: ExpenseFormValues) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { dueDateType, ...submitValues } = values;
      if (isEditing) {
        editExpense(submitValues, {
          onSuccess: () => {
            onSuccess?.();
          },
        });
      } else {
        addExpense(submitValues, {
          onSuccess: () => {
            onSuccess?.();
          },
        });
      }
    },
    [isEditing, editExpense, onSuccess, addExpense]
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
    <Form form={form} onSubmit={onSubmit} id={EXPENSE_FORM_ID}>
      <div className="space-y-6">
        <div className="space-y-4">
          <FormInput name="name" label="Expense Name">
            <Input
              autoComplete="off"
              placeholder="e.g. Netflix, Electricity, Rent"
            />
          </FormInput>

          <FormSelect
            name="type"
            label="Expense Type"
            placeholder="Select expense category"
            options={billTypeOptions}
          />

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
            placeholder="When will this expense be due this coming month?"
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
            <div className="text-sm text-gray-500">
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

export default CreateExpenseForm;
