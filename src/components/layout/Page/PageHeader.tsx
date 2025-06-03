import { useMemo } from "react";

import { ListOrdered, Plus, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PageHeader = ({
  title,
  description,
  totalComponent,
  openCreateDialog,
  openReorderDialog,
}: {
  title: string;
  description?: string;
  totalComponent?: React.ReactNode;
  openCreateDialog?: () => void;
  openReorderDialog?: () => void;
}) => {
  const actionsContent = useMemo(() => {
    if (!openCreateDialog && !openReorderDialog) return null;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Settings className="w-4 h-4" />
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {openCreateDialog && (
            <DropdownMenuItem onSelect={() => openCreateDialog()}>
              <Plus className="w-4 h-4" />
              New
            </DropdownMenuItem>
          )}
          {openReorderDialog && (
            <DropdownMenuItem onSelect={() => openReorderDialog()}>
              <ListOrdered className="w-4 h-4" />
              Reorder
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }, [openCreateDialog, openReorderDialog]);

  return (
    <header className="bg-surface border-b border-surface-border p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between lg:justify-start lg:gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <h2 className="text-2xl font-semibold text-surface-foreground">
                {title}
              </h2>
              {actionsContent && (
                <div className="hidden lg:block">{actionsContent}</div>
              )}
            </div>
            {actionsContent && (
              <div className="lg:hidden">{actionsContent}</div>
            )}
          </div>
          {description && (
            <p className="text-sm text-surface-foreground/70 mt-1">
              {description}
            </p>
          )}
        </div>
        <div className="hidden lg:block lg:flex-shrink-0">
          {totalComponent || <div className="" />}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
