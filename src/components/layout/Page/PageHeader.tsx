const PageHeader = ({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) => {
  return (
    <header className="bg-surface border-b border-surface-border p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-surface-foreground">
          {title}
        </h2>
        {action && <div>{action}</div>}
      </div>
      {description && (
        <p className="text-sm text-surface-foreground/70 mt-1">{description}</p>
      )}
    </header>
  );
};

export default PageHeader;
