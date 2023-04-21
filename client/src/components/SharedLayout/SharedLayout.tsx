import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer closeButton={false} autoClose={1500} />
    </>
  );
};

export default SharedLayout;
