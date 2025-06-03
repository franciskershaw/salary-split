import { useState } from "react";

import EmptyState from "@/components/layout/EmptyState/EmptyState";
import PageWrapper from "@/components/layout/Page/PageWrapper";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import useUser from "@/hooks/user/useUser";
import type { Account } from "@/types/globalTypes";

import { AccountCard } from "./components/AccountCard/AccountCard";
import CreateAccountDialog from "./components/CreateAccountDialog/CreateAccountDialog";
import ReorderAccountsDialog from "./components/ReorderAccountsDialog/ReorderAccountsDialog";
import {
  TotalBalance,
  type FilterConfig,
  type TotalBalanceConfig,
} from "./components/TotalBalance/TotalBalance";
import { getAccountTypeInfo } from "./helper/helper";
import useGetAccounts from "./hooks/useGetAccounts";
import useUpdateAccountFilters from "./hooks/useUpdateAccountFilters";

const Accounts = () => {
  const { accounts, fetchingAccounts } = useGetAccounts();
  const { user } = useUser();
  const { updateAccountFilters, isPending } = useUpdateAccountFilters();

  const [newAccountDialogOpen, setNewAccountDialogOpen] = useState(false);
  const [reorderDialogOpen, setReorderDialogOpen] = useState(false);

  // Configure filters for accounts
  const accountFilterConfigs: FilterConfig[] = [
    {
      type: "current",
      label: getAccountTypeInfo("current").label,
      enabled:
        user?.accountFilters?.find((f) => f.type === "current")?.enabled ??
        true,
    },
    {
      type: "joint",
      label: getAccountTypeInfo("joint").label,
      enabled:
        user?.accountFilters?.find((f) => f.type === "joint")?.enabled ?? true,
    },
    {
      type: "savings",
      label: getAccountTypeInfo("savings").label,
      enabled:
        user?.accountFilters?.find((f) => f.type === "savings")?.enabled ??
        true,
    },
    {
      type: "investment",
      label: getAccountTypeInfo("investment").label,
      enabled:
        user?.accountFilters?.find((f) => f.type === "investment")?.enabled ??
        true,
    },
  ];

  const totalBalanceConfig: TotalBalanceConfig = {
    title: "Total Balance",
    dialogTitle: "Customise Total Balance",
    dialogDescription:
      "Select which account types to include in your total balance calculation",
    allItemsLabel: "All Accounts",
  };

  const handleFiltersUpdate = (filters: FilterConfig[]) => {
    const accountFilters = filters.map((filter) => ({
      type: filter.type as Account["type"],
      enabled: filter.enabled,
    }));

    updateAccountFilters(accountFilters);
  };

  if (fetchingAccounts) {
    return (
      <LoadingOverlay
        message="Loading accounts..."
        opacity="light"
        spinnerSize="md"
      />
    );
  }

  return (
    <PageWrapper
      title="Accounts"
      description="Manage your bank accounts and track balances"
      openCreateDialog={
        accounts?.length ? () => setNewAccountDialogOpen(true) : undefined
      }
      openReorderDialog={
        accounts?.length ? () => setReorderDialogOpen(true) : undefined
      }
      totalComponent={
        accounts?.length ? (
          <TotalBalance
            items={accounts}
            filterConfigs={accountFilterConfigs}
            config={totalBalanceConfig}
            onFiltersUpdate={handleFiltersUpdate}
            isUpdating={isPending}
          />
        ) : null
      }
    >
      {!accounts?.length ? (
        <EmptyState type="accounts" />
      ) : (
        <>
          <div className="lg:hidden">
            <TotalBalance
              items={accounts}
              filterConfigs={accountFilterConfigs}
              config={totalBalanceConfig}
              onFiltersUpdate={handleFiltersUpdate}
              isUpdating={isPending}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts?.map((account) => (
              <AccountCard key={account._id} account={account} />
            ))}
          </div>
        </>
      )}
      <CreateAccountDialog
        open={newAccountDialogOpen}
        onOpenChange={setNewAccountDialogOpen}
      />
      {accounts && (
        <ReorderAccountsDialog
          open={reorderDialogOpen}
          onOpenChange={setReorderDialogOpen}
          accounts={accounts}
        />
      )}
    </PageWrapper>
  );
};

export default Accounts;
