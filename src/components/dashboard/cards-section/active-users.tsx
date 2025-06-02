import { useActiveUsersCount } from "@/hooks/useActiveUsers";
import dayjs from "dayjs";
import { Activity } from "lucide-react";
import InfoCard from "./info-card";

const startDate = dayjs().subtract(30, "day").toISOString();

export default function ActiveUsers() {
  const { count } = useActiveUsersCount({
    startDate,
  });

  return (
    <InfoCard
      title="Active Users"
      content={<span className="text-lg font-semibold">{count}</span>}
      action={<Activity size={20} />}
      footer={
        <span className="text-sm text-muted-foreground">
          Number of users who have streamed a song in the last 30 days.
        </span>
      }
    />
  );
}
