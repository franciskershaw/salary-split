import { useTransactions } from '../../hooks/transactions/useTransactions';
import { useDocumentTitle } from '../../hooks/helper/useDocumentTitle';

const SummaryPage = (): JSX.Element => {
  useDocumentTitle()
  const { summary } = useTransactions();
  return (
    <ul className="text-center mx-auto md:text-xl py-2">
      {summary.map((account, i) => (
        <li className="mb-8 font-bold border-b pb-2" key={`accountSummary_${i}`}>
          Send £
          {new Intl.NumberFormat('en-GB', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(account.amount)}{' '}
          to {account.account}
        </li>
      ))}
    </ul>
  );
};

export default SummaryPage;
