import { getUserGrowth } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export const useUserGrowth = ({
  interval,
  periodCount,
}: {
  interval?: "day" | "week" | "month" | "year";
  periodCount?: number;
} = {}) => {
  const { data, ...rest } = useQuery({
    queryKey: [
      "user-growth",
      `user-growth-${interval}`,
      `user-growth-${periodCount}`,
    ],
    queryFn: () => getUserGrowth({ interval, periodCount }),
    initialData: [],
  });

  return {
    growth: data,
    ...rest,
  };
};
