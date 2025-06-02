import * as React from "react";
import { Pie, PieChart } from "recharts";

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
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useRevenue } from "@/hooks/useRevenue";
import dayjs from "dayjs";

const startDate = dayjs().subtract(30, "day").toISOString();

export default function RevenueDistribution() {
  const { data } = useRevenue({
    startDate,
  });

  const chartData = React.useMemo(() => {
    if (!data) {
      return [];
    }

    const { totalRevenue: _, ...rest } = data;

    return (
      Object.entries(rest).map(([source, amount], index) => ({
        source,
        amount: amount ?? 0,
        fill: `var(--chart-${index + 1})`,
      })) ?? []
    );
  }, [data]);

  const chartConfig = React.useMemo(() => {
    const config = {
      amount: {
        label: "Revenue",
      },
    };
    return {
      ...config,
      ...chartData.reduce((acc, item, index) => {
        acc[item.source] = {
          label: item.source,
          color: `var(--chart-${index + 1})`,
        };
        return acc;
      }, {} as ChartConfig),
    };
  }, [chartData]);

  const total = React.useMemo(
    () => ({
      revenue: data?.totalRevenue ?? 0,
    }),
    [data?.totalRevenue]
  );

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row h-28">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Revenue Distribution</CardTitle>
          <CardDescription>Total revenue for the last 3 months</CardDescription>
        </div>
        <div className="flex items-center gap-2 px-4">
          <span className="text-sm font-medium">Total Revenue:</span>
          <span className="text-lg font-semibold">
            {total.revenue?.toLocaleString()}
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie dataKey="amount" data={chartData} nameKey="source" />
            <ChartLegend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
