import { getTopStreamedSongs } from "@/api/streams";
import { useQuery } from "@tanstack/react-query";

export const useTopStreamedSongs = ({
  startDate,
  endDate,
  limit,
}: {
  startDate: string;
  endDate?: string;
  limit?: number;
}) => {
  const { data, ...rest } = useQuery({
    queryKey: [
      "top-streamed-songs",
      `top-streamed-songs-${startDate}`,
      `top-streamed-songs-${endDate}`,
    ],
    queryFn: () => getTopStreamedSongs(startDate, endDate, limit),
  });

  return {
    topStreamedSongs: data ?? [],
    ...rest,
  };
};
