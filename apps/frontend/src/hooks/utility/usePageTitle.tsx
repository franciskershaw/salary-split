import { useEffect } from "react";

const usePageTitle = (title: string, includeAppName = true) => {
  useEffect(() => {
    const appName = "Salary Split";
    document.title = includeAppName ? `${title} | ${appName}` : title;
  }, [title, includeAppName]);
};

export default usePageTitle;
