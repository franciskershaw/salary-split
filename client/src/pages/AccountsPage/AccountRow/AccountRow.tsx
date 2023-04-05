import { FC, ReactElement, useState, useEffect } from 'react';
import { Account } from '../../../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEditAccount } from '../../../hooks/accounts/useEditAccount';

interface Props {
  account: Account;
  isDefault: boolean;
  onDefaultAccountChange: () => void;
}

const AccountRow: FC<Props> = ({
  account,
  isDefault,
  onDefaultAccountChange,
}): ReactElement => {
  const [amount, setAmount] = useState<number>(account.amount);
  const [acceptsFunds, setAcceptsFunds] = useState<boolean>(
    account.acceptsFunds
  );
  const [excludeFromTotal, setExcludeFromTotal] = useState<boolean>(
    account.excludeFromTotal
  );

  const editAccount = useEditAccount(account._id);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    setAmount(newAmount);
    editAccount({ amount: newAmount });
  };

  const onChangeDefault = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      onDefaultAccountChange();
      editAccount({ defaultAccount: isChecked });
    }
  };

  const onChangeAcceptsFunds = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptsFunds(e.target.checked);
    editAccount({ acceptsFunds: e.target.checked });
  };

  const onChangeExcludeFromTotal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExcludeFromTotal(e.target.checked);
    editAccount({ excludeFromTotal: e.target.checked });
  };

  return (
    <div className="flex items-between">
      <div className="flex flex-col w-1/3 training-wheels">
        <label className="text-xs" htmlFor="">
          {account.name}
        </label>
        <input
          className="h-8 border border-black"
          type="number"
          value={amount}
          min={0}
          onChange={onChange}
        />
      </div>

      <div className="flex items-end justify-center training-wheels gap-4 w-1/2">
        <input
          onChange={onChangeDefault}
          checked={isDefault}
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
          disabled={isDefault}
        />
        <input
          onChange={onChangeExcludeFromTotal}
          checked={excludeFromTotal}
          className="w-6 h-6"
          type="checkbox"
        />
      </div>

      <div className="flex training-wheels items-end justify-end gap-4 w-1/4">
        <button>
          <FontAwesomeIcon className="text-2xl" icon={faEdit} />
        </button>
        <button>
          <FontAwesomeIcon className="text-2xl" icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default AccountRow;
