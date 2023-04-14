import { createContext, ReactNode, useState } from 'react';

interface Context {
  salary: number | string;
  setSalary: (value: number | string) => void;
}

interface ContextProps {
  children: ReactNode;
}

const Context = createContext<Context>({
  salary: '',
  setSalary: () => {},
});

export function ContextProvider({ children }: ContextProps) {
  const [salary, setSalary] = useState<number | string>(0);
  return (
    <Context.Provider value={{ salary, setSalary }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
