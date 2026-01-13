import { useEffect } from "react";

import useUser from "@/hooks/user/useUser";

import { useTheme } from "./ThemeContext";

const ThemeInitializer = () => {
  const { user } = useUser();
  const { setDarkMode } = useTheme();

  useEffect(() => {
    if (user?.defaultTheme) {
      setDarkMode(user.defaultTheme === "dark");
    }
  }, [user?.defaultTheme, setDarkMode]);

  return null;
};

export default ThemeInitializer;
