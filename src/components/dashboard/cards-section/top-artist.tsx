import { useFetchTopArtists } from "@/hooks/useFetchTopArtists";
import dayjs from "dayjs";
import { MicVocal, Music } from "lucide-react";
import InfoCard from "./info-card";
import type { Artist } from "@/types";

const startDate = dayjs().subtract(30, "day").toISOString();

export default function TopArtists() {
  const { topArtists } = useFetchTopArtists({ startDate });

  return (
    <InfoCard
      title="Top Artists"
      content={<Content artists={topArtists} />}
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
}: {
  artists: (Artist & { streamCount: number })[];
}) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Music size={20} />
            <span className="text-lg font-semibold">{artists[0]?.name}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {artists[0]?.streamCount.toLocaleString()} streams this month
          </span>
        </div>
      </div>
    </div>
  );
};
