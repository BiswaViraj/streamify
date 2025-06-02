import { useUsersCount } from "@/hooks/useUsersCount";
import InfoCard from "./info-card";
import { Users } from "lucide-react";

export default function TotalUsers() {
  const { count } = useUsersCount();
  return (
    <InfoCard
      title="Total Users"
      content={count}
      action={<Users size={20} />}
    />
  );
}
