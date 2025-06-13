import { useState, type ReactNode } from "react";

import { MoreHorizontal, Star, type LucideIcon } from "lucide-react";

import DeleteDialog from "@/components/layout/Dialogs/DeleteDialog/DeleteDialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getBillSplitInfo, getDisplayInfo } from "@/lib/display-info";
import { cn, formatCurrency } from "@/lib/utils";
import type { Account, Bill, Feature } from "@/types/globalTypes";

type FeatureCardProps = {
  feature: Feature;
  item: Account | Bill;
  secondaryInfo?: ReactNode;
  bottomRightContent?: ReactNode;
  hideDropdown?: boolean;
  renderEditDialog: (props: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }) => ReactNode;
  deleteAction: (id: string, options: { onSuccess: () => void }) => void;
  isDeleting: boolean;
  title?: string;
  icon?: LucideIcon;
  topRightContent?: ReactNode;
  iconContainerClassName?: string;
  isDefault?: boolean;
  preventDelete?: boolean;
};

export function FeatureCard({
  feature,
  item,
  secondaryInfo,
  bottomRightContent,
  hideDropdown,
  renderEditDialog,
  deleteAction,
  isDeleting,
  title: titleOverride,
  icon: iconOverride,
  topRightContent: topRightContentOverride,
  iconContainerClassName: iconContainerClassNameOverride,
  isDefault = false,
  preventDelete = false,
}: FeatureCardProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const displayInfo = getDisplayInfo(
    feature,
    "type" in item ? item.type : undefined
  );

  const title = titleOverride ?? item.name;
  const Icon = iconOverride ?? displayInfo.icon;
  const iconContainerClassName =
    iconContainerClassNameOverride ??
    cn(displayInfo.colors.bg, displayInfo.colors.text);

  // Default account styling
  const cardClassName = isDefault
    ? "p-5 border-2 border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20 hover:shadow-md transition-all h-full flex flex-col"
    : "p-5 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all h-full flex flex-col";

  // Override top right content for default accounts
  const finalTopRightContent =
    topRightContentOverride ??
    (isDefault ? (
      <div className="flex items-center gap-2">
        <span className="text-xs px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 flex items-center gap-1">
          <Star className="h-3 w-3 fill-current" />
          Default
        </span>
        {displayInfo.label && (
          <span
            className={cn(
              "text-xs px-2 py-1 rounded-full",
              displayInfo.colors.badge
            )}
          >
            {displayInfo.label}
          </span>
        )}
      </div>
    ) : (
      displayInfo.label && (
        <span
          className={cn(
            "text-xs px-2 py-1 rounded-full",
            displayInfo.colors.badge
          )}
        >
          {displayInfo.label}
        </span>
      )
    ));

  const deleteDialogDescription = `Are you sure you want to delete ${item.name}? This action cannot be undone.`;

  // Check if this is a bill with split between multiple people
  const isSplitBill =
    "splitBetween" in item && item.splitBetween && item.splitBetween > 1;

  const splitInfo = isSplitBill ? getBillSplitInfo(item.splitBetween) : null;

  return (
    <>
      <Card className={cardClassName}>
        <CardContent className="p-0 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                iconContainerClassName
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            {finalTopRightContent}
          </div>
          <div className="flex-grow">
            <h3 className="font-medium dark:text-white">{title}</h3>
            {secondaryInfo && (
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                {secondaryInfo}
              </p>
            )}
          </div>
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold dark:text-white">
                {formatCurrency(item.amount)}
              </span>
              {splitInfo && (
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <splitInfo.icon className="h-4 w-4" />
                  <span className="text-xs">{splitInfo.label}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              {!hideDropdown && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="cursor-pointer text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                      <MoreHorizontal className="h-6 w-6" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => setEditDialogOpen(true)}>
                      Edit {feature}
                    </DropdownMenuItem>
                    {!preventDelete && !isDefault && (
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onSelect={() => setDeleteDialogOpen(true)}
                      >
                        Delete {feature}
                      </DropdownMenuItem>
                    )}
                    {(preventDelete || isDefault) && (
                      <DropdownMenuItem
                        disabled
                        className="text-muted-foreground opacity-50"
                      >
                        Cannot delete{" "}
                        {isDefault ? "default account" : "this item"}
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {bottomRightContent}
            </div>
          </div>
        </CardContent>
      </Card>
      {renderEditDialog({
        open: editDialogOpen,
        onOpenChange: setEditDialogOpen,
      })}
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title={`Delete ${feature}`}
        description={deleteDialogDescription}
        onDelete={() => {
          deleteAction(item._id, {
            onSuccess: () => {
              setDeleteDialogOpen(false);
            },
          });
        }}
        isPending={isDeleting}
      />
    </>
  );
}
