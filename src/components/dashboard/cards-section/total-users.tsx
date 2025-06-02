import { useUsersCount } from "@/hooks/useUsersCount";
import InfoCard from "./info-card";
import { Users } from "lucide-react";

export default function TotalUsers() {
  const { count, isPending } = useUsersCount();
  return (
    <InfoCard
      isPending={isPending}
      title="Total Users"
      content={<span className="text-lg font-semibold">{count}</span>}
      action={<Users size={20} />}
      footer={
        <span className="text-sm text-muted-foreground">
          Total number of users registered in the system.
        </span>
      }
    />
  );
}
