const PageHeader = ({
  title,
  description,
  action,
  secondaryAction,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}) => {
  return (
    <header className="bg-surface border-b border-surface-border p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between lg:justify-start lg:gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold text-surface-foreground">
                {title}
              </h2>
              {action && <div className="hidden lg:block">{action}</div>}
            </div>
            {action && <div className="lg:hidden">{action}</div>}
          </div>
          {description && (
            <p className="text-sm text-surface-foreground/70 mt-1">
              {description}
            </p>
          )}
        </div>
        {secondaryAction && (
          <div className="hidden lg:block">{secondaryAction}</div>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
