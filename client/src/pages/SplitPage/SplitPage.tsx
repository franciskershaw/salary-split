import { useEffect, useState } from 'react';
import { useAccounts } from '../../hooks/accounts/useAccounts';
import { useTransactions } from '../../hooks/transactions/useTransactions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal/Modal';
import BillForm from './TransactionForm/TransactionForm';
import TransactionRow from './TransactionRow/TransactionRow';
import { Transaction } from '../../types/types';

const SplitPage = (): JSX.Element => {
  const [addBillModalOpen, setAddBillModalOpen] = useState<boolean>(false);
  const [addSavingsModalOpen, setAddSavingsModalOpen] =
    useState<boolean>(false);

  const { prefetchAccounts } = useAccounts();
  const { transactions, totalBills, totalSavings, balance } = useTransactions();

  useEffect(() => {
    prefetchAccounts();
  }, []);

  return (
    <>
      <div className="px-8">
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
          <div className='text-end font-bold'>
            <h3>Total: {totalBills}</h3>
          </div>
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
          <div className='text-end font-bold'>
            <h3>Total: {totalSavings}</h3>
          </div>
        </section>
        <section className='flex justify-between items-end'>
            <h2 className='font-bold'>Balance</h2>
            <h3>£{balance}</h3>
            <div className='flex flex-col'>
              <label className='text-xs' htmlFor="">Send to (default account)</label>
              <select className='border'>
                <option value="">Monzo (Personal)</option>
              </select>
            </div>
        </section>
      </div>
      <Modal setIsOpen={setAddBillModalOpen} isOpen={addBillModalOpen}>
        <BillForm type="bill" setModalOpen={setAddBillModalOpen} />
      </Modal>
      <Modal setIsOpen={setAddSavingsModalOpen} isOpen={addSavingsModalOpen}>
        <BillForm type="savings" setModalOpen={setAddSavingsModalOpen} />
      </Modal>
    </>
  );
};

export default SplitPage;
