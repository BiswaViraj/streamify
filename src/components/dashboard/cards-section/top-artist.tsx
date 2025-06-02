import { useFetchTopArtists } from "@/hooks/useFetchTopArtists";
import dayjs from "dayjs";
import { MicVocal } from "lucide-react";
import InfoCard from "./info-card";

const startDate = dayjs().subtract(30, "day").toISOString();

export default function TopArtists() {
  const { topArtists } = useFetchTopArtists({ startDate });

  console.log("Top Artists:", topArtists);
  return (
    <InfoCard
      title="Top Artists"
      content={topArtists.length}
      action={<MicVocal size={20} />}
    />
  );
}
