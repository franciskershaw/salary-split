import { useTransactions } from '../../hooks/transactions/useTransactions';

const SummaryPage = (): JSX.Element => {
  const { summary } = useTransactions();
  return (
    <div>
      {summary.map((account, i) => (
        <p key={`accountSummary_${i}`}>
          Send {account.amount} to {account.account}
        </p>
      ))}
    </div>
  );
};

export default SummaryPage;
