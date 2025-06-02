import type { User } from "@/types";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

export function getTimeSeries(
  users: User[],
  interval: "day" | "week" | "month" | "year",
  periodCount: number
) {
  const now = dayjs();
  const grouped: Record<string, number> = {};

  for (let i = periodCount - 1; i >= 0; i--) {
    const key = now.subtract(i, interval).format(getFormat(interval));
    grouped[key] = 0;
  }

  users.forEach((user) => {
    const created = dayjs(user.createdAt);
    for (let i = 0; i < periodCount; i++) {
      const bucketStart = now.subtract(i + 1, interval);
      const bucketEnd = now.subtract(i, interval);

      if (created.isAfter(bucketStart) && created.isSameOrBefore(bucketEnd)) {
        const key = bucketEnd.format(getFormat(interval));
        if (grouped[key] !== undefined) {
          grouped[key]++;
        }
        break;
      }
    }
  });

  return Object.entries(grouped).map(([label, count]) => ({
    label,
    count,
  }));
}

function getFormat(interval: "day" | "week" | "month" | "year") {
  switch (interval) {
    case "day":
    case "week":
      return "YYYY-MM-DD";
    case "month":
      return "YYYY-MM";
    case "year":
      return "YYYY";
    default:
      return "YYYY-MM-DD";
  }
}
