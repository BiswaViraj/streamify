import { useFetchTopArtists } from "@/hooks/useFetchTopArtists";
import dayjs from "dayjs";
import { MicVocal, Music } from "lucide-react";
import InfoCard from "./info-card";
import type { Artist } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const startDate = dayjs().subtract(30, "day").toISOString();

export default function TopArtists() {
  const { topArtists, isPending } = useFetchTopArtists({ startDate });

  return (
    <InfoCard
      title="Top Artists"
      content={<Content artists={topArtists} isPending={isPending} />}
      action={<MicVocal size={20} />}
      footer={
        <span className="text-sm text-muted-foreground">
          Artist with the most streams in the last 30 days.
        </span>
      }
    />
  );
}

const Content = ({
  artists,
  isPending,
}: {
  artists: (Artist & { streamCount: number })[];
  isPending?: boolean;
}) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Music size={20} />
            {isPending ? (
              <Skeleton className="h-[22px] w-[100px] rounded" />
            ) : (
              <span className="text-lg font-semibold">{artists[0]?.name}</span>
            )}
          </div>
          {isPending ? (
            <Skeleton className="h-[16px] w-[150px] mt-1 rounded" />
          ) : (
            <span className="text-sm text-muted-foreground">
              {artists[0]?.streamCount.toLocaleString()} streams this month
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
