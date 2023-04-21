import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../hooks/auth/useUser';
import { useIsFetching } from '@tanstack/react-query';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const SharedLayout = (): JSX.Element => {
  const { user, fetchingUser } = useUser();
  // const isFetching = useIsFetching()

  return fetchingUser ? (
    <LoadingSpinner />
  ) : (
    <>
      {user ? <Navbar /> : null}
      <main className="px-4 sm:px-5 md:max-w-2xl md:mx-auto md:px-0 lg:max-w-5xl lg:px-8">
        <Outlet />
      </main>
      <ToastContainer closeButton={false} autoClose={1500} />
    </>
  );
};

export default SharedLayout;
