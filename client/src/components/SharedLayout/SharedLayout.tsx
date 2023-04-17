import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { useUser } from '../../hooks/auth/useUser';

const SharedLayout = (): JSX.Element => {
  const { user, fetchingUser } = useUser();
  return fetchingUser ? (
    <div>Loading...</div>
  ) : (
    <>
      {user ? <Navbar /> : null}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;
