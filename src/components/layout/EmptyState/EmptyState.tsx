import {
  CreditCard,
  PiggyBank,
  ReceiptPoundSterling,
  WalletCards,
} from "lucide-react";

import { FormDialog } from "@/components/layout/Dialogs/FormDialog/FormDialog";
import { Button } from "@/components/ui/button";
import CreateAccountForm from "@/pages/Accounts/components/CreateAccountForm/CreateAccountForm";
import CreateBillForm from "@/pages/Bills/components/CreateBillForm/CreateBillForm";
import CreateExpenseForm from "@/pages/Expenses/components/CreateExpenseForm/CreateExpenseForm";
import CreateSavingsForm from "@/pages/Savings/components/CreateSavingsForm/CreateSavingsForm";
import type { Feature } from "@/types/globalTypes";

const EmptyState = ({ type }: { type: Feature }) => {
  const config = {
    accounts: {
      icon: WalletCards,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-500 dark:text-blue-400",
      title: "No Accounts Yet",
      description:
        "You haven't created any accounts yet. Create your first account to start managing your finances.",
      buttonText: "Create Account",
      form: CreateAccountForm,
      formProps: {},
      dialogTitle: "Create New Account",
      dialogDescription:
        "Add a new account to track your finances. Fill in the details below.",
    },
    bills: {
      icon: ReceiptPoundSterling,
      iconBg: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-500 dark:text-red-400",
      title: "No Bills Yet",
      description: "You haven't created any bills yet.",
      buttonText: "Create Bill",
      form: CreateBillForm,
      formProps: {},
      dialogTitle: "Create New Bill",
      dialogDescription: "Add a new bill to track your payments.",
    },
    expenses: {
      icon: CreditCard,
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-500 dark:text-purple-400",
      title: "No Expenses Yet",
      description: "You haven't created any expenses yet.",
      buttonText: "Create Expense",
      form: CreateExpenseForm,
      formProps: {},
      dialogTitle: "Create New Expense",
      dialogDescription: "Add a new expense to track your spending.",
    },
    savings: {
      icon: PiggyBank,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-500 dark:text-green-400",
      title: "No Savings Yet",
      description: "You haven't created any savings goals yet.",
      buttonText: "Create Savings Goal",
      form: CreateSavingsForm,
      formProps: {},
      dialogTitle: "Create New Savings Goal",
      dialogDescription: "Add a new savings goal to track your progress.",
    },
  } as const;

  const {
    icon: Icon,
    iconBg,
    iconColor,
    title,
    description,
    buttonText,
    form,
    formProps,
    dialogTitle,
    dialogDescription,
  } = config[type];

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className={`rounded-full ${iconBg} p-6 mb-4`}>
        <Icon className={`w-12 h-12 ${iconColor}`} />
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-sm">{description}</p>
      <FormDialog
        trigger={
          <Button className="bg-primary hover:bg-primary/90">
            {buttonText}
          </Button>
        }
        title={dialogTitle}
        description={dialogDescription}
        onSubmit={() => {
          const formEl = document.querySelector("form");
          if (formEl) {
            formEl.requestSubmit();
          }
        }}
        form={form}
        formProps={formProps}
      />
    </div>
  );
};

export default EmptyState;
