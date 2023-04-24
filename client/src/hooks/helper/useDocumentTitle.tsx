import { useEffect } from 'react';

export const useDocumentTitle = (currentPath: string) => {
  useEffect(() => {
    let title = 'Salary Split';

    switch (currentPath) {
      case '/split':
        title += ' | Split';
        break;
      case '/summary':
        title += ' | Summary';
        break;
      case '/accounts':
        title += ' | Accounts';
        break;
      case '/register':
        title += ' | Create Account';
        break;
      case '/':
        title += ' | Login';
        break;
      default:
        break;
    }

    document.title = title;
  }, [currentPath]);
};
