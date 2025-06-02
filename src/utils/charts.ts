import type { User } from "@/types";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

/**
 * Get the time series data for user growth.
 * @param users - The list of users to analyze.
 * @param interval - The time interval to group by (e.g., day, week, month).
 * @param periodCount - The number of periods to include in the analysis.
 * @returns An array of objects representing the user growth over time.
 *
 * This function groups users by their creation date into specified time intervals
 * and counts how many users were created in each interval. It returns an array
 * of objects, each containing a label (formatted date) and the count of users
 * created in that interval.
 */
export function getTimeSeries(
  users: User[],
  interval: dayjs.ManipulateType,
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

function getFormat(interval: dayjs.ManipulateType) {
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
