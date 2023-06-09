import { useState, useEffect } from 'react';
import Modal from '../../components/Modal/Modal';
import AccountForm from './AccountForm/AccountForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useAccounts } from '../../hooks/accounts/useAccounts';
import { Account } from '../../types/types';
import AccountRow from './AccountRow/AccountRow';
import { useTransactions } from '../../hooks/transactions/useTransactions';

const AccountsPage = (): JSX.Element => {
  const [addAccountModalOpen, setAddAccountModalOpen] =
    useState<boolean>(false);

  const { accounts, total } = useAccounts();
  const { prefetchTransactions } = useTransactions();

  useEffect(() => {
    prefetchTransactions();
  }, []);

  return (
    <>
      {/* Header and add button */}
      <section className="flex gap-2 mb-2 lg:px-12">
        <h2 className="text-xl font-bold">Accounts</h2>
        <button onClick={() => setAddAccountModalOpen(true)}>
          <FontAwesomeIcon className="text-2xl" icon={faCirclePlus} />
        </button>
      </section>
      {/* Accounts list */}
      <section className="mb-4">
        <div className="flex">
          <div className="w-1/3"></div>
          <div className="w-1/2 flex items-end justify-between text-xs gap-2 ml-3 lg:justify-center lg:gap-10">
            <label className="">Default Account</label>
            <label className="text-center">Accepts Funds</label>
            <label className="text-end">Exclude - total</label>
          </div>
          <div className="w-1/4"></div>
        </div>
        <ul className="lg:px-40">
          {accounts.map((account: Account) => (
            <li className="mb-2" key={`account_${account._id}`}>
              <AccountRow account={account} />
            </li>
          ))}
        </ul>
      </section>
      {/* Totals */}
      <section className="text-center">
        <h3 className="text-2xl">
          Total:{' '}
          <span className="font-bold">
            £
            {new Intl.NumberFormat('en-GB', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(total)}
          </span>
        </h3>
      </section>

      <Modal
        canClose
        setIsOpen={setAddAccountModalOpen}
        isOpen={addAccountModalOpen}>
        <AccountForm setModalOpen={setAddAccountModalOpen} type="add" />
      </Modal>
    </>
  );
};

export default AccountsPage;
