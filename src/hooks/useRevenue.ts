import { getRevenueBySource } from "@/api/revenue";
import type { SubscriptionType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useRevenue = ({
  startDate,
  endDate,
  type,
}: {
  startDate: string;
  endDate?: string;
  type?: SubscriptionType;
}) => {
  const { ...rest } = useQuery({
    queryKey: [
      "revenue",
      `revenue-${startDate}`,
      `revenue-${endDate}`,
      `revenue-${type}`,
    ],
    queryFn: () => getRevenueBySource(startDate, endDate, type),
  });

  return {
    ...rest,
  };
};
