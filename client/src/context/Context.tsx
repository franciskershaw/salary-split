import { createContext, ReactNode, useState, useEffect } from 'react';

interface Context {
  salary: number | string;
  setSalary: (value: number | string) => void;
  defaultId: string;
  setDefaultId: (value: string) => void;
}

interface ContextProps {
  children: ReactNode;
}

const Context = createContext<Context>({
  salary: '',
  setSalary: () => {},
  defaultId: '',
  setDefaultId: () => {},
});

export function ContextProvider({ children }: ContextProps) {
  const [salary, setSalary] = useState<number | string>(0);
  const [defaultId, setDefaultId] = useState<string>('');

  return (
    <Context.Provider value={{ salary, setSalary, defaultId, setDefaultId }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
