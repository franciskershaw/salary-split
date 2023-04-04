import { FC, ReactElement, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import AccountForm from './AccountForm/AccountForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const AccountsPage: FC = (): ReactElement => {
  const [addAccountModalOpen, setAddAccountModalOpen] =
    useState<boolean>(false);
  return (
    <>
      <div className="training-wheels px-8">
        <div className="flex gap-3">
          <h2>Accounts</h2>
          <button onClick={() => setAddAccountModalOpen(true)}>
            <FontAwesomeIcon className='text-xl' icon={faCirclePlus} />
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
