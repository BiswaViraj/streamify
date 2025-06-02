import { getTopArtists } from "@/api/streams";
import { useQuery } from "@tanstack/react-query";
import type { Artist } from "@/types";

export const useFetchTopArtists = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate?: string;
}) => {
  const { data, ...rest } = useQuery<Artist[]>({
    queryKey: [
      "top-artists",
      `top-artists-${startDate}`,
      `top-artists-${endDate}`,
    ],
    queryFn: () => getTopArtists(startDate, endDate),
  });

  return {
    topArtists: data ?? [],
    ...rest,
  };
};
