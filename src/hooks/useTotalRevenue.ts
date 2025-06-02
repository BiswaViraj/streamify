import { getTotalRevenue } from "@/api/revenue";
import { useQuery } from "@tanstack/react-query";
import type { SubscriptionType } from "@/types";

export const useTotalRevenue = ({
  startDate,
  endDate,
  type,
}: {
  startDate: string;
  endDate?: string;
  type?: SubscriptionType;
}) => {
  const { data, ...rest } = useQuery({
    queryKey: [
      "total-revenue",
      `total-revenue-${startDate}`,
      `total-revenue-${endDate}`,
      `total-revenue-${type}`,
    ],
    queryFn: () => getTotalRevenue(startDate, endDate, type),
  });

  return {
    totalRevenue: data,
    ...rest,
  };
};
