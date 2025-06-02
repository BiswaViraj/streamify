import { useStreamsCount } from "@/hooks/useStreamsCount";
import { ListVideo } from "lucide-react";
import InfoCard from "./info-card";

export default function TotalStreams() {
  const { count, isPending } = useStreamsCount();

  return (
    <InfoCard
      isPending={isPending}
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
