interface NumberInputProps {
  autoComplete?: 'off';
  id: string;
  name: string;
  setState: (newAmount: number) => void;
  updateServer?: (newData: {}) => void;
  serverFieldToUpdate?: string;
  required?: boolean;
  size?: 'w-28';
  value: number;
}

const NumberInput = (props: NumberInputProps): JSX.Element => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
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

  return (
    <input
      autoComplete={props.autoComplete}
      className={`${props.size} py-2 px-3 border-2 rounded-sm text-sm`}
      id={props.id}
      name={props.name}
      onChange={onChange}
      required={props.required}
      value={props.value}
      type="number"
    />
  );
};

export default NumberInput;
