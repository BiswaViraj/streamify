import { useQuery } from "@tanstack/react-query";

export const useUsersCount = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["usersCount"],
    queryFn: async () => {
      const response = await fetch("/api/users/count");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return {
    usersCount: data,
    isLoading,
    error,
  };
};
