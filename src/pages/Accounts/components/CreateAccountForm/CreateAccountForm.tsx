import { useCallback, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormInput } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSelect } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ACCOUNT_TYPES } from "@/constants/api";
import { ACCOUNT_FORM_ID } from "@/constants/features";
import useUser from "@/hooks/user/useUser";
import type { Account } from "@/types/globalTypes";

import useAddAccount from "../../hooks/useAddAccount";
import useEditAccount from "../../hooks/useEditAccount";
import useGetAccounts from "../../hooks/useGetAccounts";
import { accountFormSchema, type AccountFormValues } from "./types";

const accountTypes = [
  { value: ACCOUNT_TYPES.CURRENT, label: "Current Account" },
  { value: ACCOUNT_TYPES.SAVINGS, label: "Savings Account" },
  { value: ACCOUNT_TYPES.INVESTMENT, label: "Investment Account" },
  { value: ACCOUNT_TYPES.JOINT, label: "Joint Account" },
];

interface CreateAccountFormProps {
  onSuccess?: () => void;
  account?: Account;
}

const CreateAccountForm = ({ onSuccess, account }: CreateAccountFormProps) => {
  const { accounts } = useGetAccounts();
  const { user } = useUser();
  const isFirstAccount = accounts?.length === 0;
  const isEditing = !!account;
  const [showTargetAmount, setShowTargetAmount] = useState(
    !!account?.targetMonthlyAmount
  );

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      _id: account?._id,
      name: account?.name ?? "",
      institution: account?.institution ?? "",
      amount: account?.amount ?? 0,
      type: account?.type ?? ACCOUNT_TYPES.CURRENT,
      acceptsFunds: account?.acceptsFunds ?? (isFirstAccount ? true : false),
      receivesSalary: account?.receivesSalary ?? false,
      isDefault: isFirstAccount || user?.defaultAccount === account?._id,
      targetMonthlyAmount: account?.targetMonthlyAmount || undefined,
    },
  });

  const { addAccount } = useAddAccount();
  const { editAccount } = useEditAccount();

  const onSubmit = useCallback(
    (values: AccountFormValues) => {
      if (isEditing) {
        editAccount(values, {
          onSuccess: () => {
            onSuccess?.();
          },
        });
      } else {
        addAccount(values, {
          onSuccess: () => {
            onSuccess?.();
          },
        });
      }
    },
    [isEditing, editAccount, onSuccess, addAccount]
  );

  const isDefault = form.watch("isDefault") as boolean;

  // Handle default account toggle
  const handleDefaultToggle = (checked: boolean) => {
    form.setValue("isDefault", checked);
    if (checked) {
      form.setValue("acceptsFunds", true);
    }
  };

  // Handle target amount toggle
  const handleTargetAmountToggle = (show: boolean) => {
    setShowTargetAmount(show);
    if (!show) {
      form.setValue("targetMonthlyAmount", undefined);
    } else {
      form.setValue("targetMonthlyAmount", {
        amount: 0,
        splitBetween: 1,
      });
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit} id={ACCOUNT_FORM_ID}>
      <div className="space-y-6">
        <div className="space-y-4">
          <FormInput name="name" label="Account Name">
            <Input autoComplete="off" placeholder="Enter account name" />
          </FormInput>

          <FormInput name="institution" label="Institution (Optional)">
            <Input placeholder="Enter bank or institution name" />
          </FormInput>

          <FormInput name="amount" label="Current Balance">
            <Input
              type="number"
              inputMode="decimal"
              placeholder="Enter current balance"
              min={0}
              step="0.01"
            />
          </FormInput>

          <FormSelect name="type" label="Account Type" options={accountTypes} />
        </div>

        <div className="rounded-lg border p-4 space-y-4">
          <h3 className="font-medium">Account Settings</h3>

          <FormInput
            name="isDefault"
            label="Default Account"
            labelPosition="left"
          >
            <Switch
              checked={isDefault || isFirstAccount}
              onCheckedChange={handleDefaultToggle}
              disabled={isFirstAccount || (isEditing && isDefault)}
            />
          </FormInput>

          <FormInput
            name="acceptsFunds"
            label="Can Receive Funds"
            labelPosition="left"
          >
            <Switch
              checked={form.watch("acceptsFunds") as boolean}
              onCheckedChange={(checked: boolean) =>
                form.setValue("acceptsFunds", checked)
              }
              disabled={isDefault}
            />
          </FormInput>

          <FormInput
            name="receivesSalary"
            label="Receives Salary"
            labelPosition="left"
          >
            <Switch
              checked={form.watch("receivesSalary") as boolean}
              onCheckedChange={(checked: boolean) =>
                form.setValue("receivesSalary", checked)
              }
            />
          </FormInput>
        </div>

        <div className="rounded-lg border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Target Monthly Amount</h3>
            <Switch
              checked={showTargetAmount}
              onCheckedChange={handleTargetAmountToggle}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Set a target amount you want to allocate to this account each month,
            beyond your actual bills and expenses.
          </p>

          {showTargetAmount && (
            <div className="space-y-4 pt-2">
              <FormInput
                name="targetMonthlyAmount.amount"
                label="Target Amount"
              >
                <Input
                  type="number"
                  inputMode="decimal"
                  placeholder="Enter target monthly amount"
                  min={0}
                  step="0.01"
                />
              </FormInput>

              <FormInput
                name="targetMonthlyAmount.splitBetween"
                label="Split Between"
              >
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="Number of people"
                  min={1}
                  max={10}
                />
              </FormInput>
            </div>
          )}
        </div>
      </div>
    </Form>
  );
};

export default CreateAccountForm;
