import { WalletCards } from "lucide-react";

import { Button } from "@/components/ui/button";
import CreateAccountDialog from "@/pages/Accounts/components/CreateAccountDialog/CreateAccountDialog";

const NoAccounts = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-6 mb-4">
        <WalletCards className="w-12 h-12 text-blue-500 dark:text-blue-400" />
      </div>
      <h2 className="text-xl font-semibold mb-2">No Accounts Yet</h2>
      <p className="text-gray-600 mb-6 max-w-sm">
        You haven't created any accounts yet. Create your first account to start
        managing your finances.
      </p>
      <CreateAccountDialog
        trigger={
          <Button className="bg-primary hover:bg-primary/90">
            Create Account
          </Button>
        }
      />
    </div>
  );
};

export default NoAccounts;
