import type { Artist, PopulatedWith, Song, Stream, User } from "@/types";
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

  const sortedArtists = [...artistCountMap.values()]
    .sort((a, b) => b.count - a.count)
    .map(({ artist, count }) => ({
      ...artist,
      streamCount: count,
    }));

  return sortedArtists;
};

export const getTopStreamedSongs = async (
  startDate: string,
  endDate: string = new Date().toISOString(),
  limit: number = 5
) => {
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
        song: Song;
      }
    >[]
  >(`/streams?_expand=song&${querySearchParams.toString()}`);

  const songsCountMap = new Map<string, { song: Song; count: number }>();
  for (const stream of streams) {
    const song = stream.song;
    if (!song) continue;

    if (songsCountMap.has(song.id)) {
      songsCountMap.get(song.id)!.count += stream.streamCount;
    } else {
      songsCountMap.set(song.id, { song, count: stream.streamCount });
    }
  }
  const sortedSongs = [...songsCountMap.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map(({ song, count }) => ({
      ...song,
      streamCount: count,
    }));
  return sortedSongs;
};

// getStreams that will have pagination and filtering
export const getStreams = async ({
  startDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  ).toISOString(),
  endDate = new Date().toISOString(),
  // page = 1,
  // limit = 10,
  sortBy = "dateStreamed",
  sortOrder = "desc",
}: {
  startDate: string;
  endDate: string;
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) => {
  const querySearchParams = new URLSearchParams();
  // querySearchParams.append("_page", page.toString());
  // querySearchParams.append("_limit", limit.toString());
  if (startDate) {
    querySearchParams.append("dateStreamed_gte", startDate);
  }
  if (endDate) {
    querySearchParams.append("dateStreamed_lte", endDate);
  }

  if (sortBy) {
    querySearchParams.append("_sort", sortBy);
  }
  if (sortOrder) {
    querySearchParams.append("_order", sortOrder);
  }

  const streams = await api.get<
    PopulatedWith<
      Stream,
      {
        song: Song;
        artist: Artist;
        user: User;
      }
    >[]
  >(
    `/streams?_expand=song&_expand=artist&_expand=user&${querySearchParams.toString()}`
  );

  return streams;
};
