import { getTotalStreamsCount } from "@/api/streams";
import { useQuery } from "@tanstack/react-query";

export const useStreamsCount = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["streamsCount"],
    queryFn: getTotalStreamsCount,
  });

  return {
    count: data,
    ...rest,
  };
};
