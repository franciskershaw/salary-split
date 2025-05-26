import { Edit2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import useUser from "@/hooks/user/useUser";
import { formatCurrency } from "@/lib/utils";

const AllocationSummary = () => {
  const { user } = useUser();
  return (
    <Card className="shadow-md">
      <div className="px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold dark:text-white">
              Payday Summary
            </h2>
            {/* <p className="text-primary-100 dark:text-primary-200">
              Next payday: May 28th 2023
            </p> */}
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div>
              <div className="text-3xl font-semibold ">
                {formatCurrency(user?.takeHomePay ?? 0)}
              </div>
              <p className="text-primary ">Monthly Take-Home Salary</p>
            </div>
            <Edit2 className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AllocationSummary;
