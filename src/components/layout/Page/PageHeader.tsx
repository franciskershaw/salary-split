const PageHeader = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold dark:text-white">{title}</h1>
      {description && (
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;
