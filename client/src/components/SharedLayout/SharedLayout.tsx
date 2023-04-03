import { Outlet } from 'react-router-dom';
import { ReactElement } from 'react';
import Navbar from '../Navbar/Navbar';
import AccountForm from '../../pages/AccountsPage/AccountForm/AccountForm';
import { useUser } from '../../hooks/auth/useUser';

const SharedLayout = (): ReactElement => {
  const { user } = useUser();
  return (
    <>
      {user?.userInfo.accounts.length !== 0 && <Navbar />}
      <main>
        {user?.userInfo.accounts.length ? (
          <Outlet />
        ) : (
          <AccountForm type="first" />
        )}
      </main>
    </>
  );
};

export default SharedLayout;
