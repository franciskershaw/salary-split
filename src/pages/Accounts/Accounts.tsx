import { useState } from "react";

import EmptyState from "@/components/layout/EmptyState/EmptyState";
import { FeatureCard } from "@/components/layout/FeatureCard/FeatureCard";
import PageWrapper from "@/components/layout/Page/PageWrapper";
import useUser from "@/hooks/user/useUser";
import { getDisplayInfo } from "@/lib/display-info";
import type { Account } from "@/types/globalTypes";

import CreateAccountDialog from "./components/CreateAccountDialog/CreateAccountDialog";
import ReorderAccountsDialog from "./components/ReorderAccountsDialog/ReorderAccountsDialog";
import {
  TotalBalance,
  type FilterConfig,
  type TotalBalanceConfig,
} from "./components/TotalBalance/TotalBalance";
import useDeleteAccount from "./hooks/useDeleteAccount";
import useGetAccounts from "./hooks/useGetAccounts";
import useUpdateAccountFilters from "./hooks/useUpdateAccountFilters";

const Accounts = () => {
  const { accounts, fetchingAccounts } = useGetAccounts();
  const { user } = useUser();
  const { updateAccountFilters, isPending } = useUpdateAccountFilters();
  const { deleteAccount, isPending: isDeleting } = useDeleteAccount();

  const [newAccountDialogOpen, setNewAccountDialogOpen] = useState(false);
  const [reorderDialogOpen, setReorderDialogOpen] = useState(false);

  const accountFilterConfigs: FilterConfig[] = [
    {
      type: "current",
      label: getDisplayInfo("account", "current").label,
      enabled:
        user?.accountFilters?.find((f) => f.type === "current")?.enabled ??
        true,
    },
    {
      type: "joint",
      label: getDisplayInfo("account", "joint").label,
      enabled:
        user?.accountFilters?.find((f) => f.type === "joint")?.enabled ?? true,
    },
    {
      type: "savings",
      label: getDisplayInfo("account", "savings").label,
      enabled:
        user?.accountFilters?.find((f) => f.type === "savings")?.enabled ??
        true,
    },
    {
      type: "investment",
      label: getDisplayInfo("account", "investment").label,
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
      isLoading={fetchingAccounts && !accounts?.length}
      loadingMessage="Loading accounts..."
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
              <FeatureCard
                key={account._id}
                feature="account"
                item={account}
                secondaryInfo={account.institution}
                renderEditDialog={({ open, onOpenChange }) => (
                  <CreateAccountDialog
                    account={account}
                    open={open}
                    onOpenChange={onOpenChange}
                  />
                )}
                deleteAction={deleteAccount}
                isDeleting={isDeleting}
              />
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
