import { Outlet } from 'react-router-dom';
import { ReactElement } from 'react';
import Navbar from '../Navbar/Navbar';
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
          <form>
            <h2>Add your first account</h2>
          </form>
        )}
      </main>
    </>
  );
};

export default SharedLayout;
