import { useCallback, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { FormDialog } from "@/components/layout/Dialogs/FormDialog/FormDialog";
import ReorderDialog from "@/components/layout/Dialogs/ReorderDialog/ReorderDialog";
import EmptyState from "@/components/layout/EmptyState/EmptyState";
import { FeatureCard } from "@/components/layout/FeatureCard/FeatureCard";
import FeatureCardsGrid from "@/components/layout/FeatureCard/FeatureCardsGrid";
import PageWrapper from "@/components/layout/Page/PageWrapper";
import type { FilterConfig } from "@/components/layout/TotalBalance/TotalBalance";
import { ACCOUNT_TYPES } from "@/constants/api";
import { ACCOUNT_FORM_ID, FEATURE_ACCOUNTS } from "@/constants/features";
import useUser from "@/hooks/user/useUser";
import { getDisplayInfo } from "@/lib/display-info";
import type { Account } from "@/types/globalTypes";

import CreateAccountForm from "./components/CreateAccountForm/CreateAccountForm";
import useDeleteAccount from "./hooks/useDeleteAccount";
import useGetAccounts from "./hooks/useGetAccounts";
import useUpdateAccountFilters from "./hooks/useUpdateAccountFilters";

const Accounts = () => {
  const { accounts, fetchingAccounts } = useGetAccounts();
  const { user } = useUser();
  const navigate = useNavigate();
  const { updateAccountFilters, isPending } = useUpdateAccountFilters();
  const { deleteAccount, isPending: isDeleting } = useDeleteAccount();

  const [newAccountDialogOpen, setNewAccountDialogOpen] = useState(false);
  const [reorderDialogOpen, setReorderDialogOpen] = useState(false);

  const accountFilterConfigs = useMemo(
    (): FilterConfig[] => [
      {
        type: ACCOUNT_TYPES.CURRENT,
        label: getDisplayInfo("accounts", ACCOUNT_TYPES.CURRENT).label,
        enabled:
          user?.accountFilters?.find((f) => f.type === ACCOUNT_TYPES.CURRENT)
            ?.enabled ?? true,
      },
      {
        type: ACCOUNT_TYPES.JOINT,
        label: getDisplayInfo("accounts", ACCOUNT_TYPES.JOINT).label,
        enabled:
          user?.accountFilters?.find((f) => f.type === ACCOUNT_TYPES.JOINT)
            ?.enabled ?? true,
      },
      {
        type: ACCOUNT_TYPES.SAVINGS,
        label: getDisplayInfo("accounts", ACCOUNT_TYPES.SAVINGS).label,
        enabled:
          user?.accountFilters?.find((f) => f.type === ACCOUNT_TYPES.SAVINGS)
            ?.enabled ?? true,
      },
      {
        type: ACCOUNT_TYPES.INVESTMENT,
        label: getDisplayInfo("accounts", ACCOUNT_TYPES.INVESTMENT).label,
        enabled:
          user?.accountFilters?.find((f) => f.type === ACCOUNT_TYPES.INVESTMENT)
            ?.enabled ?? true,
      },
    ],
    [user?.accountFilters]
  );

  const handleFiltersUpdate = useCallback(
    (filters: FilterConfig[]) => {
      const accountFilters = filters.map((filter) => ({
        type: filter.type as Account["type"],
        enabled: filter.enabled,
      }));
      updateAccountFilters(accountFilters);
    },
    [updateAccountFilters]
  );

  const totalBalanceConfig = useMemo(
    () => ({
      items: accounts ?? [],
      filterConfigs: accountFilterConfigs,
      config: {
        title: "Total Balance",
        dialogTitle: "Customise Total Balance",
        dialogDescription:
          "Select which account types to include in your total balance calculation",
        allItemsLabel: "All Accounts",
        showFilters: accounts?.length > 1,
      },
      onFiltersUpdate: handleFiltersUpdate,
      isUpdating: isPending,
    }),
    [accounts, accountFilterConfigs, handleFiltersUpdate, isPending]
  );

  return (
    <PageWrapper
      title="Accounts"
      description="Manage bank accounts and track balances"
      openCreateDialog={
        accounts?.length ? () => setNewAccountDialogOpen(true) : undefined
      }
      openReorderDialog={
        accounts?.length ? () => setReorderDialogOpen(true) : undefined
      }
      totalBalanceConfig={totalBalanceConfig}
      isLoading={fetchingAccounts && !accounts?.length}
      loadingMessage="Loading accounts..."
      itemsCount={accounts?.length ?? 0}
    >
      {!accounts?.length ? (
        <EmptyState type="accounts" />
      ) : (
        <FeatureCardsGrid>
          {accounts?.map((account) => {
            const isDefaultAccount = user?.defaultAccount === account._id;
            const hasTransactionTracking = !!account.trackTransactions;

            return (
              <FeatureCard
                key={account._id}
                feature={FEATURE_ACCOUNTS}
                item={account}
                secondaryInfo={account.institution}
                isDefault={isDefaultAccount}
                preventDelete={isDefaultAccount}
                hasTransactionTracking={hasTransactionTracking}
                onViewTransactions={
                  hasTransactionTracking
                    ? () => {
                        navigate(`/accounts/${account._id}`);
                      }
                    : undefined
                }
                renderEditDialog={({ open, onOpenChange }) => (
                  <FormDialog
                    item={{ account }}
                    open={open}
                    onOpenChange={onOpenChange}
                    title="Create New Account"
                    description="Add a new account to track your finances. Fill in the details below."
                    editTitle="Edit Account"
                    editDescription="Edit your account details below."
                    form={CreateAccountForm}
                    formId={ACCOUNT_FORM_ID}
                  />
                )}
                deleteAction={deleteAccount}
                isDeleting={isDeleting}
              />
            );
          })}
        </FeatureCardsGrid>
      )}
      <FormDialog
        open={newAccountDialogOpen}
        onOpenChange={setNewAccountDialogOpen}
        title="Create New Account"
        description="Add a new account to track your finances. Fill in the details below."
        form={CreateAccountForm}
        formId={ACCOUNT_FORM_ID}
      />
      {accounts && (
        <ReorderDialog
          feature={FEATURE_ACCOUNTS}
          open={reorderDialogOpen}
          onOpenChange={setReorderDialogOpen}
          items={accounts}
        />
      )}
    </PageWrapper>
  );
};

export default Accounts;
