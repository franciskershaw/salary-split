import { FC, useState } from 'react';
import { Transaction, Account } from '../../../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAccounts } from '../../../hooks/accounts/useAccounts';
// import { useEditAccount } from '../../../hooks/accounts/useEditAccount';
// import { useDeleteAccount } from '../../../hooks/accounts/useDeleteAccount';
import Modal from '../../../components/Modal/Modal';

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

  // const editTransaction = useEditTransaction(transaction._id);
  // const deleteTransaction = useDeleteTransaction(transaction._id);

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    setAmount(newAmount);
    // editTransaction({ amount: newAmount });
  };

	const onChangeAccount = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSendToAccount(e.target.value)
		// editTransaction({ sendToAccount: e.target.value })
	}

  const onClickDeleteButton = () => {
    // deleteTransaction();
    setDeleteRowModalOpen(false);
  };

  return (
    <>
      <div className="flex training-wheels justify-between items-center">
        <h3 className="text-xs w-20 font-bold">{transaction.name}</h3>

        {/* Amount */}
        <div className="flex flex-col">
          <label className="text-xs" htmlFor="">
            Amount
          </label>
          <input onChange={onChangeAmount} value={amount} className="w-28" type="number" />
        </div>

        {/* Send to */}
        <div className="flex flex-col">
          <label className="text-xs" htmlFor="">
            Send to
          </label>
          <select
            onChange={onChangeAccount}
            className="border"
            name="sendToAccount"
            value={sendToAccount}
            id="">
            {accounts.map((account: Account, i: number) => {
              if (account.acceptsFunds) {
                return (
                  <option value={account._id} key={`account_${i}`}>
                    {account.name}
                  </option>
                );
              }
            })}
          </select>
        </div>

        {/* Delete button */}
        <button onClick={() => setDeleteRowModalOpen(true)}>
          <FontAwesomeIcon className="text-2xl" icon={faTrash} />
        </button>
      </div>
      <Modal isOpen={deleteRowModalOpen} setIsOpen={setDeleteRowModalOpen}>
        <div className="text-center mb-3">
          <h2 className="mb-3 text-white">
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
