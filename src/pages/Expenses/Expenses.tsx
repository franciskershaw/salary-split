import { useState } from "react";

import ReorderDialog from "@/components/layout/Dialogs/ReorderDialog/ReorderDialog";
import EmptyState from "@/components/layout/EmptyState/EmptyState";
import { FeatureCard } from "@/components/layout/FeatureCard/FeatureCard";
import PageWrapper from "@/components/layout/Page/PageWrapper";
import type { FilterConfig } from "@/components/layout/TotalBalance/TotalBalance";
import useUser from "@/hooks/user/useUser";
import { getDisplayInfo } from "@/lib/display-info";
import type { Bill } from "@/types/globalTypes";

import useGetAccounts from "../Accounts/hooks/useGetAccounts";
import CreateExpenseDialog from "./components/CreateExpenseDialog/CreateExpenseDialog";
import useDeleteExpense from "./hooks/useDeleteExpense";
import useGetExpenses from "./hooks/useGetExpenses";
import useUpdateExpenseFilters from "./hooks/useUpdateExpenseFilters";

const Expenses = () => {
  const { expenses, fetchingExpenses } = useGetExpenses();
  const { user } = useUser();
  const { accounts, fetchingAccounts } = useGetAccounts();
  const { updateExpenseFilters, isPending } = useUpdateExpenseFilters();
  const { deleteExpense, isPending: isDeleting } = useDeleteExpense();

  const [newExpenseDialogOpen, setNewExpenseDialogOpen] = useState(false);
  const [reorderDialogOpen, setReorderDialogOpen] = useState(false);

  const userExpenseTypes = [...new Set(expenses?.map((exp) => exp.type) ?? [])];

  const expenseFilterConfigs: FilterConfig[] = userExpenseTypes.map((type) => ({
    type,
    label: getDisplayInfo("expenses", type).label,
    enabled:
      user?.expenseFilters?.find((f) => f.type === type)?.enabled ?? true,
  }));

  const handleFiltersUpdate = (filters: FilterConfig[]) => {
    const expenseFilters = filters.map((filter) => ({
      type: filter.type as Bill["type"],
      enabled: filter.enabled,
    }));

    updateExpenseFilters(expenseFilters);
  };

  const totalBalanceConfig = {
    items: expenses ?? [],
    filterConfigs: expenseFilterConfigs,
    config: {
      title: "Total Amount of Expenses",
      dialogTitle: "Customise Total Amount of Expenses",
      dialogDescription:
        "Select which expenses to include in your total amount of expenses calculation",
      allItemsLabel: "All Expenses",
      showFilters: true,
    },
    onFiltersUpdate: handleFiltersUpdate,
    isUpdating: isPending,
  };

  const isLoading =
    (fetchingExpenses || fetchingAccounts) &&
    (!expenses?.length || !accounts?.length);

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
      totalBalanceConfig={totalBalanceConfig}
      isLoading={isLoading}
      loadingMessage="Loading expenses..."
    >
      {!accounts?.length ? (
        <EmptyState type="accounts" />
      ) : !expenses?.length ? (
        <EmptyState type="expenses" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expenses?.map((expense) => (
            <FeatureCard
              key={expense._id}
              feature="expenses"
              item={expense}
              secondaryInfo={expense.account?.name}
              renderEditDialog={({ open, onOpenChange }) => (
                <CreateExpenseDialog
                  expense={expense}
                  open={open}
                  onOpenChange={onOpenChange}
                />
              )}
              deleteAction={deleteExpense}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}
      <CreateExpenseDialog
        open={newExpenseDialogOpen}
        onOpenChange={setNewExpenseDialogOpen}
      />
      {expenses && (
        <ReorderDialog
          feature="expenses"
          open={reorderDialogOpen}
          onOpenChange={setReorderDialogOpen}
          items={expenses}
        />
      )}
    </PageWrapper>
  );
};

export default Expenses;
