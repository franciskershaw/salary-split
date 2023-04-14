import { createContext, ReactNode, useState } from 'react';

interface Context {
  salary: number | string;
  setSalary: (value: number | string) => void;
}

interface ContextProps {
  children: ReactNode;
}

export const MyContext = createContext<Context>({
  salary: '',
  setSalary: () => {},
});

export function ContextProvider({ children }: ContextProps) {
  const [salary, setSalary] = useState<number | string>(0);
  return (
    <MyContext.Provider value={{ salary, setSalary }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyContext;
