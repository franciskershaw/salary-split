import { useCallback, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormInput } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSelect } from "@/components/ui/select";
import { BILL_TYPES } from "@/constants/api";
import { BILL_FORM_ID } from "@/constants/features";
import type { Bill } from "@/types/globalTypes";

import useGetAccounts from "../../../Accounts/hooks/useGetAccounts";
import useAddBill from "../../hooks/useAddBill";
import useEditBill from "../../hooks/useEditBill";
import { billFormSchema, type BillFormValues } from "./types";

interface CreateBillFormProps {
  onSuccess?: () => void;
  bill?: Bill;
}

// Helper function to convert bill type to readable label
const getBillTypeLabel = (type: string) => {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const CreateBillForm = ({ onSuccess, bill }: CreateBillFormProps) => {
  const { accountsWhichAcceptFunds } = useGetAccounts();
  const isEditing = !!bill;

  // Bill type options
  const billTypeOptions = Object.values(BILL_TYPES).map((type) => ({
    value: type,
    label: getBillTypeLabel(type),
  }));

  // Split between options
  const splitBetweenOptions = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(),
    label: i + 1 === 1 ? "1 person (just me)" : `${i + 1} people`,
  }));

  // Due date type options
  const dueDateTypeOptions = [
    { value: "1", label: "1st of every month" },
    { value: "31", label: "Last day of every month" },
    { value: "custom", label: "Custom day..." },
  ];

  const form = useForm<BillFormValues>({
    resolver: zodResolver(billFormSchema),
    defaultValues: {
      _id: bill?._id,
      name: bill?.name ?? "",
      amount: bill?.amount ?? 0,
      account: bill?.account?._id ?? "",
      type: bill?.type ?? BILL_TYPES.OTHER,
      splitBetween: (bill?.splitBetween?.toString() ?? "1") as
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
      dueDate: typeof bill?.dueDate === "number" ? bill.dueDate : 1,
      dueDateType:
        typeof bill?.dueDate === "number"
          ? bill.dueDate === 1
            ? "1"
            : bill.dueDate === 31
              ? "31"
              : "custom"
          : "1",
    },
  });

  const { addBill } = useAddBill();
  const { editBill } = useEditBill();

  const onSubmit = useCallback(
    (values: BillFormValues) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { dueDateType, ...submitValues } = values;
      if (isEditing) {
        editBill(submitValues, {
          onSuccess: () => {
            onSuccess?.();
          },
        });
      } else {
        addBill(submitValues, {
          onSuccess: () => {
            onSuccess?.();
          },
        });
      }
    },
    [isEditing, editBill, onSuccess, addBill]
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
    <Form form={form} onSubmit={onSubmit} id={BILL_FORM_ID}>
      <div className="space-y-6">
        <div className="space-y-4">
          <FormInput name="name" label="Bill Name">
            <Input
              autoComplete="off"
              placeholder="e.g. Netflix, Electricity, Rent"
            />
          </FormInput>

          <FormSelect
            name="type"
            label="Bill Type"
            placeholder="Select bill category"
            options={billTypeOptions}
          />

          <FormInput name="amount" label="Amount">
            <Input
              type="number"
              inputMode="decimal"
              placeholder="Enter bill amount"
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
            placeholder="When is this bill due each month?"
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
                "We'll automatically use the last day of each month"}
              {dueDateType === "1" &&
                "Bill will be due on the 1st of every month"}
            </div>
          )}
        </div>

        <FormSelect
          name="splitBetween"
          label="Split Between"
          placeholder="Select number of people"
          options={splitBetweenOptions}
        />
      </div>
    </Form>
  );
};

export default CreateBillForm;
