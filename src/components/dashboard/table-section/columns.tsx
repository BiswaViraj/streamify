import { Button } from "@/components/ui/button";
import type { Artist, PopulatedWith, Song, Stream, User } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

export type Column = PopulatedWith<
  Stream,
  {
    song: Song;
    artist: Artist;
    user: User;
  }
>;

export const columns: ColumnDef<Column>[] = [
  {
    header: "Serial No.",
    id: "serialNo",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
  },
  {
    id: "song.title",
    accessorFn: (row) => row.song.title,
    header: "Song name",
  },
  {
    id: "artist.name",
    accessorFn: (row) => row.artist.name,
    header: "Artist",
  },
  {
    accessorKey: "streamCount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Stream count
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
  },
  {
    accessorKey: "dateStreamed",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date streamed
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
  },
  {
    id: "user.id",
    header: "User ID",
    accessorFn: (row) => row.user.id,
  },
];
