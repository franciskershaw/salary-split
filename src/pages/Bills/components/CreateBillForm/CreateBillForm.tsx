import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormInput } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSelect } from "@/components/ui/select";
import type { Bill } from "@/types/globalTypes";

import useGetAccounts from "../../../Accounts/hooks/useGetAccounts";
// import useAddBill from "../../hooks/useAddBill";
// import useEditBill from "../../hooks/useEditBill";
import { billFormSchema, type BillFormValues } from "./types";

interface CreateBillFormProps {
  onSuccess?: () => void;
  bill?: Bill;
  children?:
    | React.ReactNode
    | ((props: { isPending: boolean; isEditing: boolean }) => React.ReactNode); // For render prop pattern to pass submit button
}

const CreateBillForm = ({ onSuccess, bill, children }: CreateBillFormProps) => {
  const { accounts } = useGetAccounts();
  const isEditing = !!bill;

  // Convert accounts to select options
  const accountOptions =
    accounts
      ?.filter((account) => account.acceptsFunds)
      .map((account) => ({
        value: account._id,
        label: `${account.name}${account.institution ? ` (${account.institution})` : ""}`,
      })) || [];

  // Split between options
  const splitBetweenOptions = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(),
    label: i + 1 === 1 ? "1 person (just me)" : `${i + 1} people`,
  }));

  // Due date options
  const dueDateOptions = [
    { value: "1", label: "1st of every month" },
    { value: "last", label: "Last day of every month" },
    { value: "custom", label: "Custom day..." },
  ];

  const form = useForm<BillFormValues>({
    resolver: zodResolver(billFormSchema),
    defaultValues: {
      _id: bill?._id,
      name: bill?.name ?? "",
      amount: bill?.amount ?? 0,
      account: bill?.account ?? "",
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
      dueDate: "1" as const,
      customDay: 1,
    },
  });

  // Commented out for now - uncomment when backend hooks are ready
  // const { addBill, isPending: isAddingPending } = useAddBill();
  // const { editBill, isPending: isEditingPending } = useEditBill();
  // const isPending = isAddingPending || isEditingPending;
  const isPending = false; // Temporary

  const onSubmit = (values: BillFormValues) => {
    console.log("Bill form values:", values); // Temporary for testing

    // Uncomment when backend hooks are ready
    // if (isEditing) {
    //   editBill(values, {
    //     onSuccess: () => {
    //       onSuccess?.();
    //     },
    //   });
    // } else {
    //   addBill(values, {
    //     onSuccess: () => {
    //       onSuccess?.();
    //     },
    //   });
    // }

    // Temporary success callback for testing
    onSuccess?.();
  };

  // Watch due date to show/hide custom day input
  const dueDate = form.watch("dueDate");

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="space-y-6">
        <div className="space-y-4">
          <FormInput name="name" label="Bill Name">
            <Input
              autoComplete="off"
              placeholder="e.g. Netflix, Electricity, Rent"
            />
          </FormInput>

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
            options={accountOptions}
          />

          <FormSelect
            name="dueDate"
            label="Due Date"
            placeholder="When is this bill due each month?"
            options={dueDateOptions}
          />

          {dueDate === "custom" && (
            <FormInput name="customDay" label="Day of Month">
              <Input
                type="number"
                min={1}
                max={31}
                placeholder="e.g., 22 for 22nd of each month"
              />
            </FormInput>
          )}

          {dueDate && dueDate !== "custom" && (
            <div className="text-sm text-gray-500">
              {dueDate === "last" &&
                "We'll automatically use the last day of each month"}
              {dueDate === "1" && "Bill will be due on the 1st of every month"}
            </div>
          )}
        </div>

        <div className="rounded-lg border p-4 space-y-4">
          <h3 className="font-medium">Split Options</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Split this bill between multiple people
          </p>

          <FormSelect
            name="splitBetween"
            label="Split Between"
            placeholder="Select number of people"
            options={splitBetweenOptions}
          />
        </div>

        {children && typeof children === "function"
          ? children({ isPending, isEditing })
          : children}
      </div>
    </Form>
  );
};

export default CreateBillForm;
