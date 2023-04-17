import { useEffect, useState, useContext } from 'react';
import Context from '../../context/Context';
import { useAccounts } from '../../hooks/accounts/useAccounts';
import { useTransactions } from '../../hooks/transactions/useTransactions';
import { useEditUser } from '../../hooks/user/useEditUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal/Modal';
import BillForm from './TransactionForm/TransactionForm';
import TransactionRow from './TransactionRow/TransactionRow';
import { Transaction, Account } from '../../types/types';
import SelectInput from '../../components/SelectInput/SelectInput';

const SplitPage = (): JSX.Element => {
  const [addBillModalOpen, setAddBillModalOpen] = useState<boolean>(false);
  const [addSavingsModalOpen, setAddSavingsModalOpen] =
    useState<boolean>(false);
  const { defaultId, setDefaultId } = useContext(Context);

  const { prefetchAccounts, accounts } = useAccounts();
  const { transactions, totalBills, totalSavings, balance } = useTransactions();
  const editUser = useEditUser();

  useEffect(() => {
    prefetchAccounts();
  }, []);

  const onChangeDefault = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDefaultId(e.target.value);
    editUser({ defaultAccount: e.target.value });
  };

  const hasBillTransactions = transactions.some(
    (transaction: Transaction) => transaction.type === 'bill'
  );
  const hasSavingsTransactions = transactions.some(
    (transaction: Transaction) => transaction.type === 'savings'
  );

  return (
    <>
      <div className="px-8 mb-8">
        <section className="flex flex-col">
          <div className="flex gap-2 mb-2">
            <h2 className="text-xl font-bold">Bills</h2>
            <button onClick={() => setAddBillModalOpen(true)}>
              <FontAwesomeIcon className="text-2xl" icon={faCirclePlus} />
            </button>
          </div>
          <ul>
            {transactions.map((transaction: Transaction, i: number) => {
              if (transaction.type === 'bill') {
                return (
                  <li className="mb-2" key={`bill_${i}`}>
                    <TransactionRow transaction={transaction} />
                  </li>
                );
              }
            })}
          </ul>
          {hasBillTransactions && (
            <div className="text-end font-bold">
              <h3>Total: {totalBills}</h3>
            </div>
          )}
        </section>
        <section className="flex flex-col mb-4">
          <div className="flex gap-2 mb-2">
            <h2 className="text-xl font-bold">Savings</h2>
            <button onClick={() => setAddSavingsModalOpen(true)}>
              <FontAwesomeIcon className="text-2xl" icon={faCirclePlus} />
            </button>
          </div>
          <ul>
            {transactions.map((transaction: Transaction, i: number) => {
              if (transaction.type === 'savings') {
                return (
                  <li className="mb-2" key={`savings_${i}`}>
                    <TransactionRow transaction={transaction} />
                  </li>
                );
              }
            })}
          </ul>
          {hasSavingsTransactions && (
            <div className="text-end font-bold">
              <h3>Total: {totalSavings}</h3>
            </div>
          )}
        </section>
        <section className="flex justify-between items-end">
          <h2 className="font-bold">Balance</h2>
          <h3>£{balance}</h3>
          <div className="flex flex-col">
            <label className="text-xs" htmlFor="">
              Send to (default account)
            </label>
            <SelectInput
              onChange={onChangeDefault}
              name="sendToAccount"
              value={defaultId}
              id={`splitPage-defaultId`}>
              {accounts.map((account: Account, i: number) => {
                if (account.acceptsFunds) {
                  return (
                    <option value={account._id} key={`balance_accounts_${i}`}>
                      {account.name}
                    </option>
                  );
                }
              })}
            </SelectInput>
          </div>
        </section>
      </div>
      <Modal canClose setIsOpen={setAddBillModalOpen} isOpen={addBillModalOpen}>
        <BillForm type="bill" setModalOpen={setAddBillModalOpen} />
      </Modal>
      <Modal
        canClose
        setIsOpen={setAddSavingsModalOpen}
        isOpen={addSavingsModalOpen}>
        <BillForm type="savings" setModalOpen={setAddSavingsModalOpen} />
      </Modal>
    </>
  );
};

export default SplitPage;
