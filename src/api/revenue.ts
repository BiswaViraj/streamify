import type { Revenue, SubscriptionType } from "@/types";
import api from "@/utils/api";

const BASE_URL = "/revenues";
export const getTotalRevenue = async (
  startDate: string,
  endDate: string = new Date().toISOString(),
  type?: SubscriptionType
) => {
  const searchParams = new URLSearchParams();
  if (startDate) {
    searchParams.append("date_gte", startDate);
  }
  if (endDate) {
    searchParams.append("date_lte", endDate);
  }
  if (type) {
    searchParams.append("type", type);
  }

  const response = await api.get<Revenue[]>(
    `${BASE_URL}?${searchParams.toString()}`
  );

  const totalRevenue = response.reduce(
    (acc, revenue) => acc + revenue.amount,
    0
  );
  return parseFloat(totalRevenue.toFixed(2));
};
