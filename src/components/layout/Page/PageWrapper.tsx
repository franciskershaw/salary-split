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
  customHeaderComponent?: React.ReactNode;
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
  customHeaderComponent,
}: PageWrapperProps) => {
  return (
    <div className="mb-16 md:mb-0">
      <PageHeader
        title={title}
        description={description}
        openCreateDialog={openCreateDialog}
        openReorderDialog={openReorderDialog}
        totalComponent={
          customHeaderComponent ??
          (!isLoading && totalBalanceConfig ? (
            <TotalBalance
              items={totalBalanceConfig.items}
              filterConfigs={totalBalanceConfig.filterConfigs}
              config={totalBalanceConfig.config}
              onFiltersUpdate={totalBalanceConfig.onFiltersUpdate}
              isUpdating={totalBalanceConfig.isUpdating}
            />
          ) : undefined)
        }
      />
      <div className="p-4">
        {isLoading ? (
          <LoadingOverlay
            message={loadingMessage}
            opacity="light"
            spinnerSize="md"
          />
        ) : (
          <div className="space-y-6">
            {customHeaderComponent ? (
              <div className="lg:hidden">{customHeaderComponent}</div>
            ) : (
              totalBalanceConfig && (
                <div className="lg:hidden">
                  <TotalBalance
                    items={totalBalanceConfig.items}
                    filterConfigs={totalBalanceConfig.filterConfigs}
                    config={totalBalanceConfig.config}
                    onFiltersUpdate={totalBalanceConfig.onFiltersUpdate}
                    isUpdating={totalBalanceConfig.isUpdating}
                  />
                </div>
              )
            )}
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageWrapper;
