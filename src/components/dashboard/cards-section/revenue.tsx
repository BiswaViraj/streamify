import { useTotalRevenue } from "@/hooks/useTotalRevenue";
import dayjs from "dayjs";
import { CircleDollarSign } from "lucide-react";
import InfoCard from "./info-card";
const startDate = dayjs().subtract(30, "day").toISOString();

export default function Revenue() {
  const { totalRevenue } = useTotalRevenue({
    startDate,
  });

  return (
    <InfoCard
      title="Revenue"
      content={"$" + (totalRevenue ?? 0)}
      action={<CircleDollarSign size={20} />}
    />
  );
}
