import { Outlet } from 'react-router-dom';
import { ReactElement } from 'react';
// import Navbar from './Navbar/Navbar';
// import { useUser } from '../../hooks/auth/useUser';

const SharedLayout = (): ReactElement => {
  // const { user } = useUser();
  return (
    <>
      {/* {user && <Navbar />} */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;
