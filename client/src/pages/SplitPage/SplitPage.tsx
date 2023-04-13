import { useEffect, useState } from 'react';
import { useAccounts } from '../../hooks/accounts/useAccounts';
import { useTransactions } from '../../hooks/transactions/useTransactions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal/Modal';
import BillForm from './TransactionForm/TransactionForm';

const SplitPage = (): JSX.Element => {
  const [addBillModalOpen, setAddBillModalOpen] = useState<boolean>(false);
  const [addSavingsModalOpen, setAddSavingsModalOpen] =
    useState<boolean>(false);

  const { prefetchAccounts } = useAccounts();
  const { transactions, totalBills, totalSavings } = useTransactions();

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
          <div></div>
        </section>
        <section className="flex gap-2 mb-2">
          <h2 className="text-xl font-bold">Savings</h2>
          <button onClick={() => setAddSavingsModalOpen(true)}>
            <FontAwesomeIcon className="text-2xl" icon={faCirclePlus} />
          </button>
        </section>
      </div>
      <Modal setIsOpen={setAddBillModalOpen} isOpen={addBillModalOpen}>
        <BillForm type="bill" setModalOpen={setAddBillModalOpen} />
      </Modal>
      <Modal setIsOpen={setAddSavingsModalOpen} isOpen={addSavingsModalOpen}>
        <BillForm type="savings" setModalOpen={setAddBillModalOpen} />
      </Modal>
    </>
  );
};

export default SplitPage;
