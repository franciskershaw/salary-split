import { FC, useState, useContext } from 'react';
import Context from '../../../context/Context';
import { Account, AddTransactionState } from '../../../types/types';
import { useAddTransaction } from '../../../hooks/transactions/useAddTransaction';
import { useAccounts } from '../../../hooks/accounts/useAccounts';
import NumberInput from '../../../components/NumberInput/NumberInput';
import SelectInput from '../../../components/SelectInput/SelectInput';

interface TransactionFormProps {
  setModalOpen?: (isOpen: boolean) => void;
  type: 'bill' | 'savings';
}

const TransactionForm: FC<TransactionFormProps> = ({
  setModalOpen,
  type,
}): JSX.Element => {
  const { accounts } = useAccounts();
  const addTransaction = useAddTransaction();

  const { defaultId } = useContext(Context);
  const [formData, setFormData] = useState<AddTransactionState>({
    name: '',
    amount: 0,
    sendToAccount: defaultId,
    type: type,
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: AddTransactionState) => ({
      ...prevState,
      [name]:
        name === 'amount'
          ? value && parseFloat(value) >= 0
            ? parseFloat(value)
            : 0
          : value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTransaction(formData);
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
        <NumberInput
          id="transaction-amount"
          name="amount"
          onChange={onChange}
          value={formData.amount}
        />
      </div>

      <div className="flex flex-col mb-6">
        <label>Account to send funds to</label>
        <SelectInput
          onChange={onChange}
          name="sendToAccount"
          value={formData.sendToAccount}
          id={`transactionForm-sendTo`}>
          {accounts.map((account: Account, i: number) => {
            if (account.acceptsFunds) {
              return (
                <option value={account._id} key={`account_${i}`}>
                  {account.name}
                </option>
              );
            }
          })}
        </SelectInput>
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
