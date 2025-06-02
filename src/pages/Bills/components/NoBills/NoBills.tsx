import { ReceiptPoundSterling } from "lucide-react";

import { Button } from "@/components/ui/button";

import CreateBillDialog from "../CreateBillDialog/CreateBillDialog";

const NoBills = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-6 mb-4">
        <ReceiptPoundSterling className="w-12 h-12 text-red-500 dark:text-red-400" />
      </div>
      <h2 className="text-xl font-semibold mb-2">No Bills Yet</h2>
      <p className="text-gray-600 mb-6 max-w-sm">
        You haven't created any bills yet.
      </p>
      <CreateBillDialog
        trigger={
          <Button className="bg-primary hover:bg-primary/90">
            Create Bill
          </Button>
        }
      />
    </div>
  );
};

export default NoBills;
