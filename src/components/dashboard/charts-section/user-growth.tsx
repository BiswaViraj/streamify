import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
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

const chartConfig = {
  users: {
    label: "Users",
  },
  count: {
    label: "Users",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function UserGrowth() {
  const { growth: chartData } = useUserGrowth({
    interval: "month",
    periodCount: 12,
  });

  const total = React.useMemo(
    () => ({
      users: chartData.reduce((acc, curr) => acc + curr.count, 0),
    }),
    [chartData]
  );

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
            {total.users.toLocaleString()}
          </span>
        </div>
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
              stroke={`var(--color-count)`}
              strokeWidth={2}
              dot={false}
              data={chartData}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
