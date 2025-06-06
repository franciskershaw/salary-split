import { LoadingOverlay } from "@/components/ui/loading-overlay";

import {
  TotalBalance,
  type FilterConfig,
  type TotalBalanceConfig,
} from "../TotalBalance/TotalBalance";
import PageHeader from "./PageHeader";

interface PageWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  openCreateDialog?: () => void;
  openReorderDialog?: () => void;
  isLoading?: boolean;
  loadingMessage?: string;
  totalBalanceConfig?: {
    items: Array<{ type: string; amount: number }>;
    filterConfigs?: FilterConfig[];
    config: TotalBalanceConfig;
    onFiltersUpdate?: (filters: FilterConfig[]) => void;
    isUpdating?: boolean;
  };
}

const PageWrapper = ({
  children,
  title,
  description,
  openCreateDialog,
  openReorderDialog,
  totalBalanceConfig,
  isLoading,
  loadingMessage = "Loading...",
}: PageWrapperProps) => {
  return (
    <div className="space-y-6 p-4 mb-16 md:mb-0">
      <PageHeader
        title={title}
        description={description}
        openCreateDialog={openCreateDialog}
        openReorderDialog={openReorderDialog}
        totalComponent={
          !isLoading && totalBalanceConfig ? (
            <TotalBalance
              items={totalBalanceConfig.items}
              filterConfigs={totalBalanceConfig.filterConfigs}
              config={totalBalanceConfig.config}
              onFiltersUpdate={totalBalanceConfig.onFiltersUpdate}
              isUpdating={totalBalanceConfig.isUpdating}
            />
          ) : undefined
        }
      />
      {isLoading ? (
        <LoadingOverlay
          message={loadingMessage}
          opacity="light"
          spinnerSize="md"
        />
      ) : (
        <>
          {totalBalanceConfig && (
            <div className="lg:hidden">
              <TotalBalance
                items={totalBalanceConfig.items}
                filterConfigs={totalBalanceConfig.filterConfigs}
                config={totalBalanceConfig.config}
                onFiltersUpdate={totalBalanceConfig.onFiltersUpdate}
                isUpdating={totalBalanceConfig.isUpdating}
              />
            </div>
          )}
          {children}
        </>
      )}
    </div>
  );
};

export default PageWrapper;
