import { FC, ReactElement, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import AccountForm from './AccountForm/AccountForm';

const AccountsPage: FC = (): ReactElement => {
  const [addAccountModalOpen, setAddAccountModalOpen] =
    useState<boolean>(false);
  return (
    <>
      <div className="training-wheels px-8">
        <div className="flex gap-3">
          <h2>Accounts</h2>
          <button
            onClick={() => setAddAccountModalOpen(true)}
            className="border-2 px-2">
            Add
          </button>
        </div>
      </div>
      <Modal setIsOpen={setAddAccountModalOpen} isOpen={addAccountModalOpen}>
        <AccountForm setModalOpen={setAddAccountModalOpen} type="add" />
      </Modal>
    </>
  );
};

export default AccountsPage;
