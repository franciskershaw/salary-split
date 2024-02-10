import { ReactNode } from 'react';
import selectArrow from './selectArrow.svg';

interface SelectInputProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  id: string;
  value: string;
  children: ReactNode;
  size?: 'small' | 'medium';
}

const SelectInput = (props: SelectInputProps): JSX.Element => {
  const width =
    props.size === 'small'
      ? 'w-28 sm:w-36'
      : props.size === 'medium'
      ? 'w-32 sm:w-48'
      : '';

  return (
    <div className={`relative ${width}`}>
      {' '}
      {/* Add this wrapper div */}
      <select
        onChange={props.onChange}
        className={`py-2 pl-3 pr-10 border-2 rounded-sm text-xs sm:text-sm md:text-xs h-9 sm:h-10 appearance-none ${width} cursor-pointer`}
        name={props.name}
        value={props.value}
        id={props.value}>
        {props.children}
      </select>
      {/* Add the custom arrow */}
      <img
        src={selectArrow}
        alt="Select arrow"
        className="absolute top-1/2 right-3 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
      />
    </div>
  );
};

export default SelectInput;
