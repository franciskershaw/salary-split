import { FC, ReactElement, useState } from 'react';
import { FormType, AddAccountState } from '../../../types/types';
import { useAddAccount } from '../../../hooks/accounts/useAddAccount';

interface AccountFormProps {
  setModalOpen?: (isOpen: boolean) => void;
  type: FormType;
}

const AccountForm: FC<AccountFormProps> = ({
  setModalOpen,
  type,
}): ReactElement => {
  const [formData, setFormData] = useState<AddAccountState>({
    name: '',
    amount: 0,
    defaultAccount: type === 'first' ? true : false,
    acceptsFunds: true,
    excludeFromTotal: false,
  });
  const { name, amount, defaultAccount } = formData;

  const addAccount = useAddAccount();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState: AddAccountState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addAccount(formData);
    if (setModalOpen) {
      setModalOpen(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="h-full py-8 px-8 border-2">
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
          onChange={onChange}
        />
      </div>
      {type !== 'first' && (
        <div className="flex gap-4 mb-6">
          <label>Make default account?</label>
          <input
            className="py-2 px-3 border-2 rounded-sm text-sm bg-transparent"
            type="checkbox"
            checked={defaultAccount}
            name="defaultAccount"
            onChange={onChange}
          />
        </div>
      )}

      <div className="flex flex-col mb-6">
        <label>Amount in account</label>
        <input
          className="py-2 px-3 border-2 rounded-sm text-sm bg-transparent"
          type="number"
          value={amount}
          name="amount"
          onChange={onChange}
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
