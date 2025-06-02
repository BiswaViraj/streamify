import { getUsersCount } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export const useUsersCount = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["usersCount"],
    queryFn: getUsersCount,
  });

  return {
    count: data,
    ...rest,
  };
};
