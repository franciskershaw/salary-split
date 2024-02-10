import { FC, useState } from 'react';
import { FormType } from '../../../types/types';
import { useAddAccount } from '../../../hooks/accounts/useAddAccount';
import NumberInput from '../../../components/NumberInput/NumberInput';

interface AccountFormProps {
  setModalOpen?: (isOpen: boolean) => void;
  type: FormType;
}

const AccountForm: FC<AccountFormProps> = ({ setModalOpen, type }): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const addAccount = useAddAccount();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { name, amount, acceptsFunds: true };
    addAccount(formData);
    if (setModalOpen) {
      setModalOpen(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="h-full py-8 px-8">
      <h2 className="text-center text-xl mb-3">
        {type === 'add' || 'first' ? 'Add' : 'Edit'}{' '}
        {type === 'first' ? 'your first' : type === 'add' ? 'new' : null}{' '}
        account
      </h2>
      <div className="flex flex-col mb-6">
        <label>Name</label>
        <input
          className="py-2 px-3 border-2 rounded-sm text-sm bg-transparent"
          type="text"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-6">
        <label>Amount in account</label>
        <NumberInput
          id="account-amount"
          name="amount"
          setState={setAmount}
          value={amount}
        />
      </div>
      <div className="flex items-center justify-center">
        <button className="px-6 py-2 border">
          {type === 'add' || type === 'first' ? 'Add new' : 'Edit'} account
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
