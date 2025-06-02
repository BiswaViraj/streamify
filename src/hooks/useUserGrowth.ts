import { getUserGrowth } from "@/api/users";
import { useQuery } from "@tanstack/react-query";
import type dayjs from "dayjs";

export const useUserGrowth = ({
  interval,
  periodCount,
}: {
  interval?: dayjs.ManipulateType;
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
