import { Button } from "@/components/ui/button";

import CreateBillDialog from "../CreateBillDialog/CreateBillDialog";

const NoBills = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="rounded-full bg-gray-100 p-6 mb-4">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
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
