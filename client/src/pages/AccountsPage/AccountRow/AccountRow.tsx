import { FC, ReactElement } from 'react';
import { Account } from '../../../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Props {
  account: Account;
  index: number;
}

const AccountRow: FC<Props> = ({ account, index }): ReactElement => {
  return (
    <div className="flex items-between">
      <div className="flex flex-col w-1/3 training-wheels">
        <label className="text-xs" htmlFor="">
          {account.name}
        </label>
        <input
          className="h-8 border border-black"
          type="number"
          value={account.amount}
        />
      </div>

      <div className="flex items-end justify-center training-wheels gap-4 w-1/2">
        <input name='defaultAccount' className="w-6 h-6" type="radio" />
        <input className="w-6 h-6" type="checkbox" />
        <input className="w-6 h-6" type="checkbox" />
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
