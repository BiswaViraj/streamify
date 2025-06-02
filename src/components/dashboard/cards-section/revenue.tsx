import { useRevenue } from "@/hooks/useRevenue";
import dayjs from "dayjs";
import { CircleDollarSign } from "lucide-react";
import InfoCard from "./info-card";
const startDate = dayjs().subtract(30, "day").toISOString();

export default function Revenue() {
  const { data, isPending } = useRevenue({
    startDate,
  });

  return (
    <InfoCard
      isPending={isPending}
      title="Revenue"
      content={
        <span className="text-lg font-semibold">
          ${data?.totalRevenue ?? 0}
        </span>
      }
      action={<CircleDollarSign size={20} />}
      footer={
        <span className="text-sm text-muted-foreground">
          Total revenue generated in the last 30 days.
        </span>
      }
    />
  );
}
