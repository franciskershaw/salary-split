import { ArrowRight, Wallet } from "lucide-react";

import { Card } from "@/components/ui/card";
import useUser from "@/hooks/user/useUser";
import { formatCurrency, getNextPayday } from "@/lib/utils";

import useAllocationSummary from "../../hooks/useAllocationSummary";
import EditSalaryDialog from "./EditSalaryDialog";

const AllocationSummary = () => {
  const { user } = useUser();
  const { allocation } = useAllocationSummary();

  return (
    <Card className="shadow-md">
      <div className="px-6 py-4 md:py-0">
        <div className="space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-">
                <h2 className="text-xl font-semibold">Payday Summary</h2>
                <h3>Where to send your salary this month</h3>
              </div>

              {user?.payDay && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Next payday: {getNextPayday(Number(user.payDay))}
                </p>
              )}
            </div>
            <div className="md:hidden flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Monthly Take-Home Salary
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-semibold">
                    {formatCurrency(user?.takeHomePay ?? 0)}
                  </span>
                  <EditSalaryDialog value={user?.takeHomePay ?? 0} />
                </div>
              </div>
            </div>

            <div className="hidden md:block max-w-56 mb-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Monthly Take-Home Salary
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-semibold">
                    {formatCurrency(user?.takeHomePay ?? 0)}
                  </span>
                  <EditSalaryDialog value={user?.takeHomePay ?? 0} />
                </div>
              </div>
            </div>
          </div>

          {allocation.length > 0 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allocation.map(({ account, totalAllocated }) => (
                  <div
                    key={account._id}
                    className="flex flex-col p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <Wallet className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {account.institution}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {formatCurrency(totalAllocated)}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Send to {account.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AllocationSummary;
