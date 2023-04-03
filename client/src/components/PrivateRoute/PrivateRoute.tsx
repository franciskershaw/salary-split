import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../hooks/auth/useUser';
import { FC } from 'react';

const PrivateRoute: FC = () => {
  const { user } = useUser();
  if (!user) console.log('You must be logged in');
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
