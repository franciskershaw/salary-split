import { useState } from 'react';
import britishPound from './britishPound.svg';
import './_NumberInput.scss';

interface NumberInputProps {
  autoComplete?: 'off';
  id: string;
  name: string;
  setState: (newAmount: number) => void;
  updateServer?: (newData: {}) => void;
  serverFieldToUpdate?: string;
  required?: boolean;
  size?: 'small' | 'medium' | 'large';
  value: number;
}

const NumberInput = (props: NumberInputProps): JSX.Element => {
  const size =
    props.size === 'small'
      ? 'w-24 md:w-28'
      : props.size === 'medium'
      ? 'w-28 md:w-full'
      : props.size === 'large'
      ? 'w-full'
      : '';
  const [editing, setEditing] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    let newAmount = parseFloat(inputValue);
    // Check if the input value is a valid number and has leading zeros
    if (
      !isNaN(newAmount) &&
      newAmount.toString() !== inputValue &&
      !inputValue.includes('.')
    ) {
      e.target.value = newAmount.toString();
    }

    const validAmount = newAmount !== null && newAmount >= 0;

    if (validAmount) {
      props.setState(newAmount);
      if (props.updateServer && props.serverFieldToUpdate) {
        props.updateServer({ [props.serverFieldToUpdate]: newAmount });
      }
    } else {
      props.setState(0);
      if (props.updateServer && props.serverFieldToUpdate) {
        props.updateServer({ [props.serverFieldToUpdate]: 0 });
      }
    }
  };

  const onFocus = () => {
    setEditing(true);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    const fixedAmount = parseFloat(newAmount.toFixed(2));
    e.target.value = fixedAmount.toFixed(2);
    props.setState(fixedAmount);
    setEditing(false);
  };

  return (
    <div className="relative">
      <img
        src={britishPound}
        alt="British Pound Symbol"
        className="absolute top-1/2 left-2 transform -translate-y-1/2 w-3 h-3 text-gray-400 opacity-30"
      />
      <input
        autoComplete={props.autoComplete}
        className={`${size} py-2 border-2 text-center rounded-sm text-xs sm:text-sm md:text-base h-9 sm:h-10`}
        id={props.id}
        name={props.name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={props.required}
        value={editing ? props.value : props.value.toFixed(2)}
        type="number"
      />
    </div>
  );
};

export default NumberInput;
