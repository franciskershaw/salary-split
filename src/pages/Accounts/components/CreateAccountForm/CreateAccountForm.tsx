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

import useAddAccount from "../../hooks/useAddAccount";
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
}

const CreateAccountForm = ({ onSuccess }: CreateAccountFormProps) => {
  const { accounts } = useGetAccounts();
  const isFirstAccount = accounts?.length === 0;

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: "",
      institution: "",
      amount: 0,
      type: CURRENT_ACCOUNT,
      acceptsFunds: isFirstAccount ? true : false,
      receivesSalary: false,
      isDefault: isFirstAccount,
    },
  });

  const { addAccount, isPending } = useAddAccount();

  const onSubmit = (values: AccountFormValues) => {
    addAccount(values, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
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
              onKeyDown={(e) => {
                if (e.key === "-") {
                  e.preventDefault();
                }
              }}
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
              disabled={isFirstAccount}
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
          {isPending ? "Creating..." : "Create Account"}
        </Button>
      </div>
    </Form>
  );
};

export default CreateAccountForm;
