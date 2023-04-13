import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../hooks/auth/useUser';

const PrivateRoute = (): JSX.Element => {
  const { user } = useUser();
  if (!user) console.log('You must be logged in');
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
