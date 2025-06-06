import { formatCurrency } from "@/lib/utils";

interface SummaryStatProps {
  label: string;
  value: number;
  className?: string;
}

const SummaryStat = ({ label, value, className }: SummaryStatProps) => {
  if (value <= 0) return null;

  return (
    <div className="shrink-0">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className={`text-xl font-bold ${className || ""}`}>
        {formatCurrency(value)}
      </p>
    </div>
  );
};

export default SummaryStat;
