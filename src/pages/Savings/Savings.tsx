import { useState } from "react";

import EmptyState from "@/components/layout/EmptyState/EmptyState";
import PageWrapper from "@/components/layout/Page/PageWrapper";

import useGetAccounts from "../Accounts/hooks/useGetAccounts";
import CreateSavingsDialog from "./components/CreateSavingsDialog/CreateSavingsDialog";
import ReorderSavingsDialog from "./components/ReorderSavingsDialog/ReorderExpensesDialog";
import { SavingsCard } from "./components/SavingsCard/SavingsCard";
import useGetSavings from "./hooks/useGetSavings";

const Savings = () => {
  const { savings, fetchingSavings } = useGetSavings();
  const { accounts, fetchingAccounts } = useGetAccounts();

  const [newSavingsDialogOpen, setNewSavingsDialogOpen] = useState(false);
  const [reorderDialogOpen, setReorderDialogOpen] = useState(false);

  const isLoading =
    (fetchingSavings || fetchingAccounts) &&
    (!savings.length || !accounts.length);

  return (
    <PageWrapper
      title="Savings"
      description="Track how much you're aiming to save this month"
      openCreateDialog={
        savings?.length ? () => setNewSavingsDialogOpen(true) : undefined
      }
      openReorderDialog={
        savings?.length ? () => setReorderDialogOpen(true) : undefined
      }
      isLoading={isLoading}
      loadingMessage="Loading savings..."
    >
      {!accounts?.length ? (
        <EmptyState type="accounts" />
      ) : !savings?.length ? (
        <EmptyState type="savings" />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savings?.map((savings) => (
              <SavingsCard key={savings._id} savings={savings} />
            ))}
          </div>
        </>
      )}
      <CreateSavingsDialog
        open={newSavingsDialogOpen}
        onOpenChange={setNewSavingsDialogOpen}
      />
      {savings && (
        <ReorderSavingsDialog
          open={reorderDialogOpen}
          onOpenChange={setReorderDialogOpen}
          savings={savings}
        />
      )}
    </PageWrapper>
  );
};

export default Savings;
