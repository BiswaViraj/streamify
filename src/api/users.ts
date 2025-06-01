import type { User } from "@/types";
import api from "../utils/api";

export const fetchUsers = async (
  page: number,
  limit: number
): Promise<User[]> => {
  const response = await api.get<User[]>(`/users?page=${page}&limit=${limit}`);
  return response;
};

export const fetchUserById = async (id: string): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response;
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await api.post<User>("/users", user);
  return response;
};

export const updateUser = async (
  id: string,
  user: Partial<User>
): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, user);
  return response;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const searchUsers = async (
  query: string,
  page: number,
  limit: number
): Promise<User[]> => {
  const response = await api.get<User[]>(`/users/search`, {
    params: { query, page, limit },
  });
  return response;
};
