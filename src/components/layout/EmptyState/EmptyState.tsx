import {
  CreditCard,
  PiggyBank,
  ReceiptPoundSterling,
  WalletCards,
} from "lucide-react";

import { FormDialog } from "@/components/layout/Dialogs/FormDialog/FormDialog";
import { Button } from "@/components/ui/button";
import {
  ACCOUNT_FORM_ID,
  BILL_FORM_ID,
  EXPENSE_FORM_ID,
  SAVINGS_FORM_ID,
} from "@/constants/features";
import CreateAccountForm from "@/pages/Accounts/components/CreateAccountForm/CreateAccountForm";
import CreateBillForm from "@/pages/Bills/components/CreateBillForm/CreateBillForm";
import CreateExpenseForm from "@/pages/Expenses/components/CreateExpenseForm/CreateExpenseForm";
import CreateSavingsForm from "@/pages/Savings/components/CreateSavingsForm/CreateSavingsForm";
import type { Feature } from "@/types/globalTypes";

const EmptyState = ({ type }: { type: Feature }) => {
  const config = {
    accounts: {
      icon: WalletCards,
      iconBg: "feature-bg-blue",
      iconColor: "feature-text-blue",
      title: "No Accounts Yet",
      description:
        "You haven't created any accounts yet. Create your first account to start managing your finances.",
      buttonText: "Create Account",
      form: CreateAccountForm,
      formId: ACCOUNT_FORM_ID,
      dialogTitle: "Create New Account",
      dialogDescription:
        "Add a new account to track your finances. Fill in the details below.",
    },
    bills: {
      icon: ReceiptPoundSterling,
      iconBg: "feature-bg-red",
      iconColor: "feature-text-red",
      title: "No Bills Yet",
      description: "You haven't created any bills yet.",
      buttonText: "Create Bill",
      form: CreateBillForm,
      formId: BILL_FORM_ID,
      dialogTitle: "Create New Bill",
      dialogDescription: "Add a new bill to track your payments.",
    },
    expenses: {
      icon: CreditCard,
      iconBg: "feature-bg-purple",
      iconColor: "feature-text-purple",
      title: "No Expenses Yet",
      description: "You haven't created any expenses yet.",
      buttonText: "Create Expense",
      form: CreateExpenseForm,
      formId: EXPENSE_FORM_ID,
      dialogTitle: "Create New Expense",
      dialogDescription: "Add a new expense to track your spending.",
    },
    savings: {
      icon: PiggyBank,
      iconBg: "feature-bg-green",
      iconColor: "feature-text-green",
      title: "No Savings Yet",
      description: "You haven't created any savings goals yet.",
      buttonText: "Create Savings Goal",
      form: CreateSavingsForm,
      formId: SAVINGS_FORM_ID,
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
    formId,
    dialogTitle,
    dialogDescription,
  } = config[type];

  return (
    <div className="flex flex-col items-center justify-center text-center lg:min-h-[50vh] lg:pr-28 lg:pt-28">
      <div className={`rounded-full ${iconBg} p-6 mb-4`}>
        <Icon className={`w-12 h-12 ${iconColor}`} />
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
      <FormDialog
        trigger={
          <Button className="bg-primary hover:bg-primary/90">
            {buttonText}
          </Button>
        }
        title={dialogTitle}
        description={dialogDescription}
        form={form}
        formId={formId}
      />
    </div>
  );
};

export default EmptyState;
