import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormInput } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSelect } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  CURRENT_ACCOUNT,
  INVESTMENT_ACCOUNT,
  JOINT_ACCOUNT,
  SAVINGS_ACCOUNT,
} from "@/constants/api";
import useUser from "@/hooks/user/useUser";
import type { Account } from "@/types/globalTypes";

import useAddAccount from "../../hooks/useAddAccount";
import useEditAccount from "../../hooks/useEditAccount";
import useGetAccounts from "../../hooks/useGetAccounts";
import { accountFormSchema, type AccountFormValues } from "./types";

const accountTypes = [
  { value: CURRENT_ACCOUNT, label: "Current Account" },
  { value: SAVINGS_ACCOUNT, label: "Savings Account" },
  { value: INVESTMENT_ACCOUNT, label: "Investment Account" },
  { value: JOINT_ACCOUNT, label: "Joint Account" },
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

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      _id: account?._id,
      name: account?.name ?? "",
      institution: account?.institution ?? "",
      amount: account?.amount ?? 0,
      type: account?.type ?? CURRENT_ACCOUNT,
      acceptsFunds: account?.acceptsFunds ?? (isFirstAccount ? true : false),
      receivesSalary: account?.receivesSalary ?? false,
      isDefault: isFirstAccount || user?.defaultAccount === account?._id,
    },
  });

  const { addAccount, isPending: isAddingPending } = useAddAccount();
  const { editAccount, isPending: isEditingPending } = useEditAccount();

  const isPending = isAddingPending || isEditingPending;

  const onSubmit = (values: AccountFormValues) => {
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
  };

  const isDefault = form.watch("isDefault") as boolean;

  // Handle default account toggle
  const handleDefaultToggle = (checked: boolean) => {
    form.setValue("isDefault", checked);
    if (checked) {
      form.setValue("acceptsFunds", true);
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
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

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending
            ? isEditing
              ? "Saving..."
              : "Creating..."
            : isEditing
              ? "Save Changes"
              : "Create Account"}
        </Button>
      </div>
    </Form>
  );
};

export default CreateAccountForm;
