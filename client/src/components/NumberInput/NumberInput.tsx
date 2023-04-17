interface NumberInputProps {
  autoComplete?: 'off';
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  size?: 'w-28' | 'w-32' | 'w-full';
  value: number;
}

const NumberInput = (props: NumberInputProps): JSX.Element => {
  return (
    <input
      autoComplete={props.autoComplete}
      className={`${props.size} py-2 px-3 border-2 rounded-sm text-sm`}
      id={props.id}
      name={props.name}
      onChange={props.onChange}
      required={props.required}
      value={props.value.toFixed(2)}
      type="number"
    />
  );
};

export default NumberInput;
