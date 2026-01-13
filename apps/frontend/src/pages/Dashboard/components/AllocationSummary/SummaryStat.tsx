import useUser from "@/hooks/user/useUser";
import { formatCurrency } from "@/lib/utils";

interface SummaryStatProps {
  label: string;
  value: number;
  className?: string;
}

const SummaryStat = ({ label, value, className }: SummaryStatProps) => {
  const { user } = useUser();
  if (value <= 0) return null;

  return (
    <div className="shrink-0">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className={`text-xl font-bold ${className || ""}`}>
        {formatCurrency(value, user?.defaultCurrency)}
      </p>
    </div>
  );
};

export default SummaryStat;
