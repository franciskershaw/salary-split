import { useState } from "react";

import EmptyState from "@/components/layout/EmptyState/EmptyState";
import PageWrapper from "@/components/layout/Page/PageWrapper";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

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

  if (fetchingSavings || fetchingAccounts) {
    return (
      <LoadingOverlay
        message="Loading savings..."
        opacity="light"
        spinnerSize="md"
      />
    );
  }

  return (
    <PageWrapper
      title="Savings"
      description="Track one-time or short-term savings"
      openCreateDialog={
        savings?.length ? () => setNewSavingsDialogOpen(true) : undefined
      }
      openReorderDialog={
        savings?.length ? () => setReorderDialogOpen(true) : undefined
      }
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
