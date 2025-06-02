import { getStreams } from "@/api/streams";
import { useQuery } from "@tanstack/react-query";

type GetStreamsParams = {
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export const useStreams = ({
  startDate,
  endDate,
  page = 1,
  limit = 10,
  sortBy = "dateStreamed",
  sortOrder = "desc",
}: GetStreamsParams = {}) => {
  return useQuery({
    queryKey: [
      "streams",
      { startDate, endDate, page, limit, sortBy, sortOrder },
    ],
    queryFn: () =>
      getStreams({
        startDate:
          startDate ??
          new Date(
            new Date().setFullYear(new Date().getFullYear() - 1)
          ).toISOString(),
        endDate: endDate ?? new Date().toISOString(),
        page,
        limit,
        sortBy,
        sortOrder,
      }),
    initialData: [],
  });
};
