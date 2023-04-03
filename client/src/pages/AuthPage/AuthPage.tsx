import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '../../hooks/auth/useUser';
import { ReactElement } from 'react';
import AuthForm from './AuthForm/AuthForm';
import { PageType } from '../../types/types';

const AuthPage = ({ page }: { page: PageType }): ReactElement => {
  document.title = `Budget App | ${
    page === 'register' ? 'Create Account' : 'Login'
  }`;

  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      return navigate('/split');
    }
  }, [user]);

  return (
    <div className="h-screen flex justify-center items-center training-wheels">
      <AuthForm page={page} />
    </div>
  );
};

export default AuthPage;
