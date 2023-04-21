import { FC, useState } from 'react';
import { Transaction, Account } from '../../../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAccounts } from '../../../hooks/accounts/useAccounts';
import { useEditTransaction } from '../../../hooks/transactions/useEditTransaction';
import { useDeleteTransaction } from '../../../hooks/transactions/useDeleteTransaction';
import Modal from '../../../components/Modal/Modal';
import NumberInput from '../../../components/NumberInput/NumberInput';
import SelectInput from '../../../components/SelectInput/SelectInput';

interface Props {
  transaction: Transaction;
}

const TransactionRow: FC<Props> = ({ transaction }): JSX.Element => {
  const [amount, setAmount] = useState<number>(transaction.amount);
  const [sendToAccount, setSendToAccount] = useState<string>(
    transaction.sendToAccount
  );
  const [deleteRowModalOpen, setDeleteRowModalOpen] = useState<boolean>(false);

  const { accounts } = useAccounts();
  const editTransaction = useEditTransaction(transaction._id);
  const deleteTransaction = useDeleteTransaction(transaction._id);

  const onChangeAccount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSendToAccount(e.target.value);
    editTransaction({ sendToAccount: e.target.value });
  };

  const onClickDeleteButton = () => {
    deleteTransaction();
    setDeleteRowModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-end border-b pb-2">
        <h3 className="text-xs w-20 font-bold">{transaction.name}</h3>

        {/* Amount */}
        <div className="flex flex-col">
          <label
            className="text-xs"
            htmlFor={`transactions-${transaction.name}`}>
            Amount
          </label>
          <NumberInput
            id={`transactions-${transaction.name}`}
            name={transaction.name}
            setState={setAmount}
            updateServer={editTransaction}
            serverFieldToUpdate="amount"
            size="w-24"
            value={amount}
          />
        </div>

        {/* Send to */}
        <div className="flex flex-col">
          <label
            className="text-xs"
            htmlFor={`transactionRow-${sendToAccount}`}>
            Send to
          </label>
          <SelectInput
            onChange={onChangeAccount}
            name="sendToAccount"
            value={sendToAccount}
            id={`transactionRow-${sendToAccount}`}
            size='w-28'>
            {accounts.map((account: Account, i: number) => {
              if (account.acceptsFunds) {
                return (
                  <option value={account._id} key={`account_${i}`}>
                    {account.name}
                  </option>
                );
              }
              return null;
            })}
          </SelectInput>
        </div>

        {/* Delete button */}
        <button onClick={() => setDeleteRowModalOpen(true)}>
          <FontAwesomeIcon className="text-2xl" icon={faTrash} />
        </button>
      </div>
      <Modal
        canClose
        isOpen={deleteRowModalOpen}
        setIsOpen={setDeleteRowModalOpen}>
        <div className="text-center mb-3">
          <h2 className="mb-3">
            Are you sure you'd like to delete this transaction?
          </h2>
          <button
            onClick={onClickDeleteButton}
            className="border px-2 bg-red-800 text-white">
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default TransactionRow;
