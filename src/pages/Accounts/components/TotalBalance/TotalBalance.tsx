import { useState } from "react";

import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import type { Account } from "@/types/globalTypes";

import { getAccountTypeInfo } from "../../helper/helper";

type TotalBalanceProps = {
  accounts: Account[];
};

type AccountTypeSelection = {
  [key in Account["type"]]: boolean;
};

export function TotalBalance({ accounts }: TotalBalanceProps) {
  const [selectedAccountTypes, setSelectedAccountTypes] =
    useState<AccountTypeSelection>({
      current: true,
      joint: true,
      savings: true,
      investment: true,
    });

  const handleAccountTypeToggle = (type: Account["type"]) => {
    setSelectedAccountTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const filteredAccounts = accounts.filter(
    (account) => selectedAccountTypes[account.type]
  );

  const totalBalance = filteredAccounts.reduce(
    (sum, account) => sum + account.amount,
    0
  );

  const selectedTypes = Object.entries(selectedAccountTypes)
    .filter(([, isSelected]) => isSelected)
    .map(
      ([type]) =>
        getAccountTypeInfo(type as Account["type"]).label.split(" ")[0]
    );

  const totalDescription =
    selectedTypes.length === 4 ? "All Accounts" : selectedTypes.join(", ");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={`md:max-w-1/4 shadow-sm cursor-pointer hover:shadow-md transition-shadow py-0 md:py-4 md:px-2`}
        >
          <CardContent className="p-4 md:p-2">
            <div className="flex items-center justify-between">
              <div>
                <CardDescription className="text-sm">
                  Total Balance ({totalDescription})
                </CardDescription>
                <CardTitle className="text-2xl font-semibold">
                  {formatCurrency(totalBalance)}
                </CardTitle>
              </div>
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customize Total Balance</DialogTitle>
          <DialogDescription>
            Select which account types to include in your total balance
            calculation
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-3">
            {Object.entries(selectedAccountTypes).map(([type, selected]) => {
              const { label } = getAccountTypeInfo(type as Account["type"]);
              return (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={selected}
                    onCheckedChange={() =>
                      handleAccountTypeToggle(type as Account["type"])
                    }
                  />
                  <Label htmlFor={type}>{label}</Label>
                </div>
              );
            })}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Apply</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
