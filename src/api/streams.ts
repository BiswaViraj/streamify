import type { Artist, PopulatedWith, Stream } from "@/types";
import api from "@/utils/api";

export const getActiveUsersCount = async (
  startDate: string,
  endDate: string = new Date().toISOString()
) => {
  const querySearchParams = new URLSearchParams();
  if (startDate) {
    querySearchParams.append("dateStreamed_gte", startDate);
  }
  if (endDate) {
    querySearchParams.append("dateStreamed_lte", endDate);
  }
  const recentStreams = await api.get<Stream[]>(
    `/streams?${querySearchParams.toString()}`
  );

  const activeUserIds = new Set(recentStreams.map((s) => s.userId));

  return activeUserIds.size;
};

export const getTotalStreamsCount = async () => {
  const streams = await api.get<Stream[]>("/streams");
  return streams.length;
};

export const getTopArtists = async (
  startDate: string,
  endDate: string = new Date().toISOString()
): Promise<(Artist & { streamCount: number })[]> => {
  const querySearchParams = new URLSearchParams();
  if (startDate) {
    querySearchParams.append("dateStreamed_gte", startDate);
  }
  if (endDate) {
    querySearchParams.append("dateStreamed_lte", endDate);
  }

  const streams = await api.get<
    PopulatedWith<
      Stream,
      {
        artist: Artist;
      }
    >[]
  >(`/streams?_expand=artist&${querySearchParams.toString()}`);

  const artistCountMap = new Map<string, { artist: Artist; count: number }>();

  for (const stream of streams) {
    const artist = stream.artist;
    if (!artist) continue;

    if (artistCountMap.has(artist.id)) {
      artistCountMap.get(artist.id)!.count += 1;
    } else {
      artistCountMap.set(artist.id, { artist, count: 1 });
    }
  }

  console.log({
    streams,
  });
  const sortedArtists = [...artistCountMap.values()]
    .sort((a, b) => b.count - a.count)
    .map(({ artist, count }) => ({
      ...artist,
      streamCount: count,
    }));

  return sortedArtists;
};
