import { Outlet } from "react-router-dom";

import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Toaster } from "@/components/ui/sonner";
import useUser from "@/hooks/user/useUser";

const SharedLayout = () => {
  const { user, fetchingUser } = useUser();

  if (fetchingUser && !user) {
    return <LoadingOverlay fullPage />;
  }

  return (
    <>
      <main className="min-h-screen">
        <Outlet />
      </main>

      <Toaster />
    </>
  );
};

export default SharedLayout;
