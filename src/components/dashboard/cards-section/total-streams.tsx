import { useStreamsCount } from "@/hooks/useStreamsCount";
import { ListVideo } from "lucide-react";
import InfoCard from "./info-card";

export default function TotalStreams() {
  const { count } = useStreamsCount();
  return (
    <InfoCard
      title="Total Streams"
      content={count}
      action={<ListVideo size={20} />}
    />
  );
}
