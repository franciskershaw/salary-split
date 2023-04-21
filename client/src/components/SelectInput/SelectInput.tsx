import { ReactNode } from 'react';

interface SelectInputProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  id: string;
  value: string;
  children: ReactNode;
  size?: 'w-28';
}

const SelectInput = (props: SelectInputProps): JSX.Element => {
  return (
    <select
      onChange={props.onChange}
      className={`py-2 px-3 border-2 rounded-sm text-xs h-9 ${props.size}`}
      name={props.name}
      value={props.value}
      id={props.value}>
      {props.children}
    </select>
  );
};

export default SelectInput;
