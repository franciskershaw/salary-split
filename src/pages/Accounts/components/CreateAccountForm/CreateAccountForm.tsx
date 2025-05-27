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
import { accountFormSchema, type AccountFormValues } from "./types";

const accountTypes = [
  { value: CURRENT_ACCOUNT, label: "Current Account" },
  { value: SAVINGS_ACCOUNT, label: "Savings Account" },
  { value: INVESTMENT_ACCOUNT, label: "Investment Account" },
  { value: JOINT_ACCOUNT, label: "Joint Account" },
];

const CreateAccountForm = ({ closeModal }: { closeModal: () => void }) => {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: "",
      institution: "",
      amount: 0,
      type: CURRENT_ACCOUNT,
      acceptsFunds: true,
      receivesSalary: false,
    },
  });

  const { addAccount, isPending } = useAddAccount();

  const onSubmit = (values: AccountFormValues) => {
    addAccount(values);
    closeModal();
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormInput name="name" label="Account Name">
        <Input autoComplete="off" placeholder="Enter account name" />
      </FormInput>

      <FormInput name="institution" label="Institution (Optional)">
        <Input placeholder="Enter bank or institution name" />
      </FormInput>

      <FormInput name="amount" label="Current Balance">
        <Input type="number" placeholder="Enter current balance" />
      </FormInput>

      <FormSelect name="type" label="Account Type" options={accountTypes} />

      <div className="flex items-center justify-between">
        <FormInput
          name="acceptsFunds"
          label="Can Receive Funds"
          labelPosition="left"
        >
          <Switch
            checked={form.watch("acceptsFunds")}
            onCheckedChange={(checked: boolean) =>
              form.setValue("acceptsFunds", checked)
            }
          />
        </FormInput>

        <FormInput
          name="receivesSalary"
          label="Receives Salary"
          labelPosition="left"
        >
          <Switch
            checked={form.watch("receivesSalary")}
            onCheckedChange={(checked: boolean) =>
              form.setValue("receivesSalary", checked)
            }
          />
        </FormInput>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating..." : "Create Account"}
      </Button>
    </Form>
  );
};

export default CreateAccountForm;
