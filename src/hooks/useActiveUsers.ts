import { getActiveUsersCount } from "@/api/streams";
import { useQuery } from "@tanstack/react-query";

export const useActiveUsersCount = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate?: string;
}) => {
  const { data, ...rest } = useQuery({
    queryKey: ["activeUsersCount", startDate, endDate],
    queryFn: () => getActiveUsersCount(startDate, endDate),
  });

  return {
    count: data,
    ...rest,
  };
};
