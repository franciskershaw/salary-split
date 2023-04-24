import { FC, useState, useContext } from 'react';
import Context from '../../../context/Context';
import { Account } from '../../../types/types';
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

  // Form data
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [sendToAccount, setSendToAccount] = useState<string>(defaultId);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name,
      amount,
      sendToAccount,
      type,
    };
    addTransaction(formData);
    if (setModalOpen) {
      setModalOpen(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="h-full py-8 px-8">
      <h2 className="text-center text-xl mb-3">
        Add new {type === 'bill' ? 'bill' : 'savings'} transaction
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
        <label>Amount</label>
        <NumberInput
          id="transaction-amount"
          name="amount"
          setState={setAmount}
          value={amount}
        />
      </div>

      <div className="flex flex-col mb-6">
        <label>Account to send funds to</label>
        <SelectInput
          onChange={(e) => setSendToAccount(e.target.value)}
          name="sendToAccount"
          value={sendToAccount}
          id={`transactionForm-sendTo`}
          size="medium">
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
