import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Filter } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Form, FormInput } from "@/components/ui/form";
import useUser from "@/hooks/user/useUser";
import { formatCurrency } from "@/lib/utils";
import type { Account } from "@/types/globalTypes";

import { getAccountTypeInfo } from "../../helper/helper";
import useUpdateAccountFilters from "../../hooks/useUpdateAccountFilters";

const accountFiltersSchema = z.object({
  current: z.boolean(),
  joint: z.boolean(),
  savings: z.boolean(),
  investment: z.boolean(),
});

type AccountFiltersForm = z.infer<typeof accountFiltersSchema>;

type TotalBalanceProps = {
  accounts: Account[];
};

export function TotalBalance({ accounts }: TotalBalanceProps) {
  const { user } = useUser();
  const { updateAccountFilters, isPending } = useUpdateAccountFilters();
  const [open, setOpen] = useState(false);

  const defaultValues = {
    current:
      user?.accountFilters?.find((f) => f.type === "current")?.enabled ?? true,
    joint:
      user?.accountFilters?.find((f) => f.type === "joint")?.enabled ?? true,
    savings:
      user?.accountFilters?.find((f) => f.type === "savings")?.enabled ?? true,
    investment:
      user?.accountFilters?.find((f) => f.type === "investment")?.enabled ??
      true,
  };

  const form = useForm<AccountFiltersForm>({
    resolver: zodResolver(accountFiltersSchema),
    defaultValues,
  });

  const onSubmit = (values: AccountFiltersForm) => {
    const filters = Object.entries(values).map(([type, enabled]) => ({
      type: type as Account["type"],
      enabled,
    }));
    updateAccountFilters(filters, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  const filteredAccounts = accounts.filter((account) =>
    form.watch(account.type)
  );

  const totalBalance = filteredAccounts.reduce(
    (sum, account) => sum + account.amount,
    0
  );

  const selectedTypes = Object.entries(form.watch())
    .filter(([, isSelected]) => isSelected)
    .map(
      ([type]) =>
        getAccountTypeInfo(type as Account["type"]).label.split(" ")[0]
    );

  const totalDescription =
    selectedTypes.length === 4 ? "All Accounts" : selectedTypes.join(", ");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card
          className={`shadow-sm cursor-pointer hover:shadow-md transition-shadow py-0 md:py-4 md:px-2 ${
            accounts.length > 0 ? "md:min-w-[200px]" : ""
          }`}
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
          <DialogTitle>Customise Total Balance</DialogTitle>
          <DialogDescription>
            Select which account types to include in your total balance
            calculation
          </DialogDescription>
        </DialogHeader>
        <Form form={form} onSubmit={onSubmit}>
          <div className="py-4">
            <div className="space-y-5">
              {Object.keys(defaultValues).map((type) => {
                const { label } = getAccountTypeInfo(type as Account["type"]);
                return (
                  <FormInput
                    key={type}
                    name={type}
                    label={label}
                    labelPosition="right"
                  >
                    <Checkbox
                      checked={form.watch(type as keyof AccountFiltersForm)}
                      onCheckedChange={(checked) =>
                        form.setValue(
                          type as keyof AccountFiltersForm,
                          checked as boolean
                        )
                      }
                    />
                  </FormInput>
                );
              })}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => form.reset()}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              Apply
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
