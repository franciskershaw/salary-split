import { ReactNode } from 'react';

interface SelectInputProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  id: string;
  value: string;
  children: ReactNode;
  size?: 'small';
}

const SelectInput = (props: SelectInputProps): JSX.Element => {
  const width = props.size === 'small' ? 'w-28 sm:w-36' : '';

  return (
    <select
      onChange={props.onChange}
      className={`py-2 px-3 border-2 rounded-sm text-xs sm:text-sm md:text-xs h-9 sm:h-10 ${width}`}
      name={props.name}
      value={props.value}
      id={props.value}>
      {props.children}
    </select>
  );
};

export default SelectInput;
