import { useState } from "react";

import EmptyState from "@/components/layout/EmptyState/EmptyState";
import PageWrapper from "@/components/layout/Page/PageWrapper";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import useUser from "@/hooks/user/useUser";
import type { Bill } from "@/types/globalTypes";

import {
  TotalBalance,
  type FilterConfig,
  type TotalBalanceConfig,
} from "../Accounts/components/TotalBalance/TotalBalance";
import useGetAccounts from "../Accounts/hooks/useGetAccounts";
import { BillCard } from "../Bills/components/BillCard/BillCard";
import { getBillTypeLabel, getUniqueBillTypes } from "../Bills/helper/helper";
import CreateExpenseDialog from "./components/CreateExpenseDialog/CreateExpenseDialog";
import ReorderExpensesDialog from "./components/ReorderExpensesDialog/ReorderExpensesDialog";
import useGetExpenses from "./hooks/useGetExpenses";
import useUpdateExpenseFilters from "./hooks/useUpdateExpenseFilters";

const Expenses = () => {
  const { expenses, fetchingExpenses } = useGetExpenses();
  const { user } = useUser();
  const { accounts, fetchingAccounts } = useGetAccounts();
  const { updateExpenseFilters, isPending } = useUpdateExpenseFilters();

  const [newExpenseDialogOpen, setNewExpenseDialogOpen] = useState(false);
  const [reorderDialogOpen, setReorderDialogOpen] = useState(false);

  const userExpenseTypes = getUniqueBillTypes(expenses);

  const expenseFilterConfigs: FilterConfig[] = userExpenseTypes.map((type) => ({
    type,
    label: getBillTypeLabel(type, expenses),
    enabled:
      user?.expenseFilters?.find((f) => f.type === type)?.enabled ?? true,
  }));

  const totalBalanceConfig: TotalBalanceConfig = {
    title: "Total Amount of Expenses",
    dialogTitle: "Customise Total Amount of Expenses",
    dialogDescription:
      "Select which expenses to include in your total amount of expenses calculation",
    allItemsLabel: "All Expenses",
  };

  const handleFiltersUpdate = (filters: FilterConfig[]) => {
    const expenseFilters = filters.map((filter) => ({
      type: filter.type as Bill["type"],
      enabled: filter.enabled,
    }));

    updateExpenseFilters(expenseFilters);
  };

  if (fetchingExpenses || fetchingAccounts) {
    return (
      <LoadingOverlay
        message="Loading expenses..."
        opacity="light"
        spinnerSize="md"
      />
    );
  }

  return (
    <PageWrapper
      title="Expenses"
      description="Track one-time or short-term expenses"
      openCreateDialog={
        expenses?.length ? () => setNewExpenseDialogOpen(true) : undefined
      }
      openReorderDialog={
        expenses?.length ? () => setReorderDialogOpen(true) : undefined
      }
      totalComponent={
        expenses?.length ? (
          <TotalBalance
            items={expenses}
            filterConfigs={expenseFilterConfigs}
            config={totalBalanceConfig}
            onFiltersUpdate={handleFiltersUpdate}
            isUpdating={isPending}
          />
        ) : null
      }
    >
      {!accounts?.length ? (
        <EmptyState type="accounts" />
      ) : !expenses?.length ? (
        <EmptyState type="expenses" />
      ) : (
        <>
          <div className="lg:hidden">
            <TotalBalance
              items={expenses}
              filterConfigs={expenseFilterConfigs}
              config={totalBalanceConfig}
              onFiltersUpdate={handleFiltersUpdate}
              isUpdating={isPending}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expenses?.map((expense) => (
              <BillCard key={expense._id} bill={expense} />
            ))}
          </div>
        </>
      )}
      <CreateExpenseDialog
        open={newExpenseDialogOpen}
        onOpenChange={setNewExpenseDialogOpen}
      />
      {expenses && (
        <ReorderExpensesDialog
          open={reorderDialogOpen}
          onOpenChange={setReorderDialogOpen}
          expenses={expenses}
        />
      )}
    </PageWrapper>
  );
};

export default Expenses;
