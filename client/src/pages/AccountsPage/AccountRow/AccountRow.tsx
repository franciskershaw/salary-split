import { FC, useState, useContext } from 'react';
import Context from '../../../context/Context';
import { Account } from '../../../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEditAccount } from '../../../hooks/accounts/useEditAccount';
import { useEditUser } from '../../../hooks/user/useEditUser';
import { useDeleteAccount } from '../../../hooks/accounts/useDeleteAccount';
import Modal from '../../../components/Modal/Modal';
import NumberInput from '../../../components/NumberInput/NumberInput';

interface Props {
  account: Account;
}

const AccountRow: FC<Props> = ({ account }): JSX.Element => {
  const [amount, setAmount] = useState<number>(account.amount);
  const { defaultId, setDefaultId } = useContext(Context);
  const [acceptsFunds, setAcceptsFunds] = useState<boolean>(
    account.acceptsFunds
  );
  const [excludeFromTotal, setExcludeFromTotal] = useState<boolean>(
    account.excludeFromTotal
  );
  const [deleteRowModalOpen, setDeleteRowModalOpen] = useState<boolean>(false);

  const editAccount = useEditAccount(account._id);
  const deleteAccount = useDeleteAccount(account._id);
  const editUser = useEditUser();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    newAmount
      ? (setAmount(newAmount), editAccount({ amount: newAmount }))
      : (setAmount(0), editAccount({ amount: 0 }));
  };

  const onChangeDefault = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setDefaultId(account._id);
    }
    editUser({ defaultAccount: account._id });
  };

  const onChangeAcceptsFunds = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptsFunds(e.target.checked);
    editAccount({ acceptsFunds: e.target.checked });
  };

  const onChangeExcludeFromTotal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExcludeFromTotal(e.target.checked);
    editAccount({ excludeFromTotal: e.target.checked });
  };

  const onClickDeleteButton = () => {
    deleteAccount();
    setDeleteRowModalOpen(false);
  };

  return (
    <>
      <div className="flex items-end mb-4">
        <div className="flex flex-col w-1/3">
          <label className="text-xs w-26" htmlFor={`accounts-${account.name}`}>
            {account.name}
          </label>
          <NumberInput
            id={`accounts-${account.name}`}
            name={account.name}
            setState={setAmount}
            updateServer={editAccount}
            serverFieldToUpdate="amount"
            size="w-28"
            value={amount}
          />
        </div>

        <div className="flex items-end justify-between gap-4 w-1/2 mx-2">
          <input
            onChange={onChangeDefault}
            defaultChecked={account._id === defaultId}
            name="defaultAccount"
            className="w-6 h-6"
            type="radio"
            id={`defaultAccount_${account._id}`}
            disabled={!acceptsFunds}
          />

          <input
            onChange={onChangeAcceptsFunds}
            checked={acceptsFunds}
            className="w-6 h-6"
            type="checkbox"
            disabled={account._id === defaultId}
          />
          <input
            onChange={onChangeExcludeFromTotal}
            checked={excludeFromTotal}
            className="w-6 h-6"
            type="checkbox"
          />
        </div>

        <div className="flex items-end justify-end gap-4 w-1/4">
          <button
            disabled={account._id === defaultId}
            onClick={() => setDeleteRowModalOpen(true)}>
            <FontAwesomeIcon className="text-2xl" icon={faTrash} />
          </button>
        </div>
      </div>
      <Modal
        canClose
        isOpen={deleteRowModalOpen}
        setIsOpen={setDeleteRowModalOpen}>
        <div className="text-center mb-3">
          <h2 className="mb-3 text-white">
            Are you sure you'd like to delete this account?
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

export default AccountRow;
