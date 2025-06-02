import type { User } from "@/types";
import api from "../utils/api";
import { getTimeSeries } from "@/utils/charts";
import type dayjs from "dayjs";

const BASE_URL = "/users";

export const getUsers = async (
  page: number,
  limit: number
): Promise<User[]> => {
  const queryParams = new URLSearchParams();
  queryParams.append("_page", page.toString());
  queryParams.append("_limit", limit.toString());
  const response = await api.get<User[]>(
    `${BASE_URL}?${queryParams.toString()}`
  );
  return response;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<User>(`${BASE_URL}/${id}`);
  return response;
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await api.post<User>(`${BASE_URL}`, user);
  return response;
};

export const updateUser = async (
  id: string,
  user: Partial<User>
): Promise<User> => {
  const response = await api.put<User>(`${BASE_URL}/${id}`, user);
  return response;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};

export const getUsersCount = async () => {
  const response = await api.get<User[]>(BASE_URL);

  return response.length;
};

export const getUserGrowth = async ({
  interval = "month",
  periodCount = 12,
}: {
  interval?: dayjs.ManipulateType;
  periodCount?: number;
}) => {
  const response = await api.get<User[]>(`${BASE_URL}`);

  const groups = getTimeSeries(response, interval, periodCount);

  return groups;
};
