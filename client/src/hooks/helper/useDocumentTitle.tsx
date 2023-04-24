import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useDocumentTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = 'Salary Split';

    switch (path) {
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
  }, [location]);
};
