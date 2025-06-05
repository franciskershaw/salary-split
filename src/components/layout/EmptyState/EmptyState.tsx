import {
  CreditCard,
  PiggyBank,
  ReceiptPoundSterling,
  WalletCards,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import CreateAccountDialog from "@/pages/Accounts/components/CreateAccountDialog/CreateAccountDialog";
import CreateBillDialog from "@/pages/Bills/components/CreateBillDialog/CreateBillDialog";
import CreateExpenseDialog from "@/pages/Expenses/components/CreateExpenseDialog/CreateExpenseDialog";
import CreateSavingsDialog from "@/pages/Savings/components/CreateSavingsDialog/CreateSavingsDialog";

type EmptyStateType = "accounts" | "bills" | "expenses" | "savings";

interface EmptyStateProps {
  type: EmptyStateType;
}

const EmptyState = ({ type }: EmptyStateProps) => {
  const config = {
    accounts: {
      icon: WalletCards,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-500 dark:text-blue-400",
      title: "No Accounts Yet",
      description:
        "You haven't created any accounts yet. Create your first account to start managing your finances.",
      buttonText: "Create Account",
      dialog: CreateAccountDialog,
    },
    bills: {
      icon: ReceiptPoundSterling,
      iconBg: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-500 dark:text-red-400",
      title: "No Bills Yet",
      description: "You haven't created any bills yet.",
      buttonText: "Create Bill",
      dialog: CreateBillDialog,
    },
    expenses: {
      icon: CreditCard,
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-500 dark:text-purple-400",
      title: "No Expenses Yet",
      description: "You haven't created any expenses yet.",
      buttonText: "Create Expense",
      dialog: CreateExpenseDialog,
    },
    savings: {
      icon: PiggyBank,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-500 dark:text-green-400",
      title: "No Savings Yet",
      description: "You haven't created any savings goals yet.",
      buttonText: "Create Savings Goal",
      dialog: CreateSavingsDialog,
    },
  } as const;

  const {
    icon: Icon,
    iconBg,
    iconColor,
    title,
    description,
    buttonText,
    dialog: Dialog,
  } = config[type];

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className={`rounded-full ${iconBg} p-6 mb-4`}>
        <Icon className={`w-12 h-12 ${iconColor}`} />
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-sm">{description}</p>
      <Dialog
        trigger={
          <Button className="bg-primary hover:bg-primary/90">
            {buttonText}
          </Button>
        }
      />
    </div>
  );
};

export default EmptyState;
