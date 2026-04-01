const NoDataFound = ({
  data,
  message = "No Data Found!",
}: {
  data: any[] | null;
  message?: string;
}) => {
  if (!data || data?.length === 0)
    return <p className="text-muted-foreground text-center">{message}</p>;
};

export default NoDataFound;
