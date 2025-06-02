import PageHeader from "./PageHeader";

const PageWrapper = ({
  children,
  title,
  description,
  openCreateDialog,
  openReorderDialog,
  totalComponent,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  openCreateDialog?: () => void;
  openReorderDialog?: () => void;
  totalComponent?: React.ReactNode;
}) => {
  return (
    <div className="space-y-6 p-4 mb-16 md:mb-0">
      <PageHeader
        title={title}
        description={description}
        openCreateDialog={openCreateDialog}
        openReorderDialog={openReorderDialog}
        totalComponent={totalComponent}
      />
      {children}
    </div>
  );
};

export default PageWrapper;
