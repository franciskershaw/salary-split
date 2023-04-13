import { FC, useState } from 'react';
import { AddTransactionState } from '../../../types/types';
// import { useAddAccount } from '../../../hooks/accounts/useAddAccount';

interface TransactionFormProps {
  setModalOpen?: (isOpen: boolean) => void;
  type: 'bill' | 'savings';
}

const TransactionForm: FC<TransactionFormProps> = ({
  setModalOpen,
  type,
}): JSX.Element => {
  const [formData, setFormData] = useState<AddTransactionState>({
    name: '',
    amount: 0,
    sendToAccount: '',
    type: type,
  });

  // const addAccount = useAddAccount();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value, type, checked } = e.target;
    // setFormData((prevState: AddAccountState) => ({
    //   ...prevState,
    //   [name]: type === 'checkbox' ? checked : value,
    // }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // addAccount(formData);
    if (setModalOpen) {
      setModalOpen(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="h-full py-8 px-8 border-2">
      <h2 className="text-center text-xl mb-3">
        Add new {type === 'bill' ? 'bill' : 'savings'} transaction
      </h2>
      <div className="flex flex-col mb-6">
        <label>Name</label>
        <input
          className="py-2 px-3 border-2 rounded-sm text-sm bg-transparent"
          type="text"
          value={formData.name}
          name="name"
          onChange={onChange}
        />
      </div>
      <div className="flex flex-col mb-6">
        <label>Amount</label>
        <input
          className="py-2 px-3 border-2 rounded-sm text-sm bg-transparent"
          type="number"
          value={formData.amount}
          name="amount"
          onChange={onChange}
        />
      </div>

      <div className="flex flex-col mb-6">
        <label>Account to send funds to</label>
        <select name="" id="">
          <option value="hi">Hi</option>
        </select>
      </div>
      <div className="flex items-center justify-center">
        <button className="px-6 py-2 border">
          Add new {type === 'bill' ? 'bill' : 'savings'} transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
