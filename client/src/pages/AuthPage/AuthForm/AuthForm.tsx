import { useState, useEffect } from 'react';
import { RegisterFormState, PageType } from '../../../types/types';
import { useAuth } from '../../../hooks/auth/useAuth';
import { Link } from 'react-router-dom';
import './_authForm.scss';
import NumberInput from '../../../components/NumberInput/NumberInput';

const AuthForm = ({ page }: { page: PageType }): JSX.Element => {
  const [formData, setFormData] = useState<RegisterFormState>({
    username: '',
    name: '',
    monthlySalary: 0,
    password: '',
    confirmPassword: '',
  });
  const { username, name, monthlySalary, password, confirmPassword } = formData;

  const auth = useAuth();

  useEffect(() => {
    resetFormData();
  }, [page]);

  function resetFormData() {
    setFormData({
      username: '',
      name: '',
      monthlySalary: 0,
      password: '',
      confirmPassword: '',
    });
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: RegisterFormState) => ({
      ...prevState,
      [name]:
        name === 'monthlySalary'
          ? value && parseFloat(value) >= 0
            ? parseFloat(value)
            : 0
          : value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData = { username, password };
    const registerData = {
      username,
      name,
      monthlySalary,
      password,
    };
    if (page === 'register') {
      if (password !== confirmPassword) {
        console.log('Passwords do not match');
      } else {
        auth.signup(registerData);
      }
    } else if (page === 'login') {
      auth.signin(loginData);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="h-28 flex items-end justify-center w-full ">
        <h1 className="text-center text-2xl">
          {page === 'login' ? 'Log in' : 'Create your Account'}
        </h1>
      </div>

      <div className="form__inputs">
        <div className="form__group">
          <label htmlFor="email">Username</label>
          <input
            name="username"
            value={username}
            onChange={onChange}
            className="border"
            type="text"
            id="username"
            autoComplete="off"
            required
          />
        </div>
        {page === 'register' && (
          <>
            <div className="form__group">
              <label htmlFor="username">Your name</label>
              <input
                name="name"
                value={name}
                onChange={onChange}
                className="border"
                type="text"
                id="name"
                autoComplete="off"
                required
              />
            </div>
            <div className="form__group">
              <label htmlFor="monthlySalary">
                What is your montly salary (after deductions)
              </label>
              <NumberInput
                id="monthlySalary"
                name="monthlySalary"
                onChange={onChange}
                value={monthlySalary}
                autoComplete="off"
                required
              />
            </div>
          </>
        )}
        <div className="form__group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={password}
            onChange={onChange}
            className="border"
            type="password"
            id="password"
            autoComplete="off"
            required
          />
        </div>
        {page === 'register' && (
          <div className="form__group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              className="border"
              type="password"
              id="confirmPassword"
              autoComplete="off"
              required
            />
          </div>
        )}
      </div>

      <div className="text-center w-full h-1/3 flex flex-col justify-around items-center">
        <button className="px-8 py-2 border text-2xl w-4/5">
          {page === 'login' ? 'Login' : 'Sign Up'}
        </button>
        {page === 'login' ? (
          <div>
            <p>Don't have an account?</p>
            <Link to={'/register'}>Register</Link>
          </div>
        ) : (
          <div>
            <p>Already have an account?</p>
            <Link to={'/'}>Log In</Link>
          </div>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
