import { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import { useUser } from '../../hooks/auth/useUser';
import { useAuth } from '../../hooks/auth/useAuth';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useEditUser } from '../../hooks/user/useEditUser';

const Navbar = (): JSX.Element => {
  const { user } = useUser();
  const editUser = useEditUser();
  const auth = useAuth();
  const { salary, setSalary } = useContext(Context);

  useEffect(() => {
    if (user) {
      setSalary(user.userInfo.monthlySalary);
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    newAmount && newAmount >= 0
      ? (setSalary(newAmount), editUser({ monthlySalary: newAmount }))
      : (setSalary(0), editUser({ monthlySalary: 0 }));
  };

  return (
    <header className="px-3 py-4 training-wheels">
      <div className="flex justify-between mb-2">
        <h1>Salary Split - {user?.userInfo.name}</h1>
        <button onClick={() => auth.signout()}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
      </div>
      <div className="border-t-2 border-b-2 py-3 mx-2">
        <div className="flex flex-col items-center justify-center gap-2 mb-3">
          <label>This month's take-home salary</label>
          <input
            onChange={onChange}
            type="number"
            name=""
            id=""
            value={salary}
          />
        </div>
        <nav className="flex items-center justify-center gap-4">
          <Link to={'/split'}>Split</Link>
          <Link to={'/summary'}>Summary</Link>
          <Link to={'/accounts'}>Accounts</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
