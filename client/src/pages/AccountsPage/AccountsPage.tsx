import { FC, ReactElement, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import AccountForm from './AccountForm/AccountForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useAccounts } from '../../hooks/accounts/useAccounts';
import { Account } from '../../types/types';

const AccountsPage: FC = (): ReactElement => {
  const [addAccountModalOpen, setAddAccountModalOpen] =
    useState<boolean>(false);

  const accounts = useAccounts();

  return (
    <>
      <div className="training-wheels px-8">
        <div className="flex gap-2">
          <h2 className="text-xl font-bold">Accounts</h2>
          <button onClick={() => setAddAccountModalOpen(true)}>
            <FontAwesomeIcon className="text-2xl" icon={faCirclePlus} />
          </button>
        </div>
        <ul>
          {accounts.map((account: Account, i: number) => (
            <li key={`account_${i}`}>{account.name}</li>
          ))}
        </ul>
      </div>
      <Modal setIsOpen={setAddAccountModalOpen} isOpen={addAccountModalOpen}>
        <AccountForm setModalOpen={setAddAccountModalOpen} type="add" />
      </Modal>
    </>
  );
};

export default AccountsPage;
