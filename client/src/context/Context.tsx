import { createContext, ReactNode, useState } from 'react';

interface Context {
  salary: number | string;
  setSalary: (value: number | string) => void;
  defaultId: string;
  setDefaultId: (value: string) => void;
  noAccounts: boolean;
  setNoAccounts: (value: boolean) => void;
}

interface ContextProps {
  children: ReactNode;
}

const Context = createContext<Context>({
  salary: '',
  setSalary: () => {},
  defaultId: '',
  setDefaultId: () => {},
  noAccounts: false,
  setNoAccounts: () => {},
});

export function ContextProvider({ children }: ContextProps) {
  const [salary, setSalary] = useState<number | string>(0);
  const [defaultId, setDefaultId] = useState<string>('');
  const [noAccounts, setNoAccounts] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{
        salary,
        setSalary,
        defaultId,
        setDefaultId,
        noAccounts,
        setNoAccounts,
      }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
