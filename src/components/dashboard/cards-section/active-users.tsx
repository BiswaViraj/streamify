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
      content={count}
      action={<Activity size={20} />}
    />
  );
}
