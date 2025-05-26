import { Card } from "@/components/ui/card";
import useUser from "@/hooks/user/useUser";
import { formatCurrency, getNextPayday } from "@/lib/utils";

import EditSalaryDialog from "./EditSalaryDialog";

const AllocationSummary = () => {
  const { user } = useUser();
  return (
    <Card className="shadow-md">
      <div className="px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold">Payday Summary</h2>
          {user?.payDay && (
            <p>Next payday: {getNextPayday(Number(user.payDay))}</p>
          )}
          <div className="mt-4 md:mt-0 flex flex-col gap-2">
            <div className="text-3xl font-semibold flex items-center gap-2">
              {formatCurrency(user?.takeHomePay ?? 0)}
              <EditSalaryDialog value={user?.takeHomePay ?? 0} />
            </div>
            <p>Monthly Take-Home Salary</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AllocationSummary;
