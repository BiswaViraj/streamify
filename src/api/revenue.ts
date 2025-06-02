import type { Revenue, RevenueSource, SubscriptionType } from "@/types";
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

export const getRevenueBySource = async (
  startDate: string,
  endDate: string = new Date().toISOString(),
  type?: SubscriptionType
): Promise<Record<RevenueSource | "totalRevenue", number>> => {
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

  const revenues = response.reduce((acc, revenue) => {
    acc[revenue.source] = (acc[revenue.source] || 0) + revenue.amount;
    return acc;
  }, {} as Record<string, number>);

  return {
    ads: parseFloat((revenues.ads || 0).toFixed(2)),
    subscriptions: parseFloat((revenues.subscriptions || 0).toFixed(2)),
    merchandise: parseFloat((revenues.merchandise || 0).toFixed(2)),
    totalRevenue: parseFloat(
      Object.values(revenues)
        .reduce((sum, value) => sum + value, 0)
        .toFixed(2)
    ),
  };
};
