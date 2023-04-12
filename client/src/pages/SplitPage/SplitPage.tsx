import { FC, ReactElement, useEffect } from 'react';
import { useAccounts } from '../../hooks/accounts/useAccounts';

const SplitPage: FC = (): ReactElement => {
  const { prefetchAccounts } = useAccounts();

  useEffect(() => {
    prefetchAccounts();
  }, []);

  return <p>I am the split page</p>;
};

export default SplitPage;
