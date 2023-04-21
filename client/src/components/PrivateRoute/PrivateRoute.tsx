import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../hooks/auth/useUser';
import { toast } from 'react-toastify';

const PrivateRoute = (): JSX.Element => {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
