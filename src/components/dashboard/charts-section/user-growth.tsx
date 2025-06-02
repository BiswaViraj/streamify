import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useUserGrowth } from "@/hooks/useUserGrowth";
import { Skeleton } from "@/components/ui/skeleton";
import type dayjs from "dayjs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  users: {
    label: "Users",
  },
  count: {
    label: "Users",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type TimePeriod = {
  interval: dayjs.ManipulateType;
  periodCount: number;
  label: string;
};
const TIME_PERIODS: TimePeriod[] = [
  { label: "Last 3 Months", interval: "month", periodCount: 3 },
  { label: "Last 6 Months", interval: "month", periodCount: 6 },
  { label: "Last 12 Months", interval: "month", periodCount: 12 },
];

export default function UserGrowth() {
  const [timePeriod, setTimePeriod] = React.useState<TimePeriod>(
    TIME_PERIODS[2]
  );
  const { growth: chartData, isPending } = useUserGrowth({
    interval: timePeriod.interval,
    periodCount: timePeriod.periodCount,
  });

  const totalUsers = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.count, 0),
    [chartData]
  );

  if (isPending) {
    return <Skeleton className="h-[450px] w-full rounded-md" />;
  }

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row h-28">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Total users for the last 12 months</CardDescription>
        </div>
        <div className="flex items-center gap-2 px-4">
          <span className="text-sm font-medium">Total Users:</span>
          <span className="text-lg font-semibold">
            {totalUsers.toLocaleString()}
          </span>
        </div>
        <CardAction className="h-full flex items-center px-4">
          <Select
            value={timePeriod.periodCount.toString()}
            defaultValue={TIME_PERIODS[2].periodCount.toString()}
            onValueChange={(value) =>
              setTimePeriod(
                TIME_PERIODS.find((p) => p.periodCount.toString() === value) ||
                  TIME_PERIODS[0]
              )
            }
            data-testid="select-time-period"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Time Period</SelectLabel>
                {TIME_PERIODS.map((period) => (
                  <SelectItem
                    key={period.periodCount}
                    value={period.periodCount.toString()}
                  >
                    {period.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="users"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="count"
              type="monotone"
              stroke={chartConfig.count.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
