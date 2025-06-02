import { useStreamsCount } from "@/hooks/useStreamsCount";
import { ListVideo } from "lucide-react";
import InfoCard from "./info-card";
import { useUserGrowth } from "@/hooks/useUserGrowth";

export default function TotalStreams() {
  const { count } = useStreamsCount();
  useUserGrowth({
    interval: "week",
    periodCount: 52,
  });
  return (
    <InfoCard
      title="Total Streams"
      content={<span className="text-lg font-semibold">{count}</span>}
      action={<ListVideo size={20} />}
      footer={
        <span className="text-sm text-muted-foreground">
          Total number of streams in the system.
        </span>
      }
    />
  );
}
