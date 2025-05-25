import { Outlet } from "react-router-dom";

import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "@/contexts/Theme/ThemeContext";
import useUser from "@/hooks/user/useUser";

import MobileHeader from "../Navigation/MobileHeader";
import MobileNav from "../Navigation/MobileNav";

const SharedLayout = () => {
  const { user, fetchingUser } = useUser();
  const { darkMode } = useTheme();

  if (fetchingUser && !user) {
    return <LoadingOverlay fullPage />;
  }

  return (
    <div
      className={`min-h-screen bg-background text-foreground ${
        darkMode ? "dark" : ""
      }`}
    >
      {user && <MobileHeader user={user} />}
      <main>
        <Outlet />
      </main>
      {user && <MobileNav />}
      <Toaster />
    </div>
  );
};

export default SharedLayout;
