import { FC, ReactElement, useState } from 'react';
import { useUser } from '../../hooks/auth/useUser';
import { Link } from 'react-router-dom';

const Navbar: FC = (): ReactElement => {
  const { user } = useUser();
  const [salary, setSalary] = useState(user?.userInfo.monthlySalary);
  return (
    <header className="px-3 py-4 training-wheels">
      <div className="flex justify-between mb-2">
        <h1>Salary Split - {user?.userInfo.name}</h1>
        <p>Logout</p>
      </div>
      <div className="border-t-2 border-b-2 py-3 mx-2">
        <div className="flex flex-col items-center justify-center gap-2 mb-3">
          <label>This month's take-home salary</label>
          <input type="number" name="" id="" value={salary} />
        </div>
        <nav className="flex items-center justify-center gap-4">
          <Link to={'/split'}>Split</Link>
          <Link to={'/'}>Summary</Link>
          <Link to={'/'}>Accounts</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
