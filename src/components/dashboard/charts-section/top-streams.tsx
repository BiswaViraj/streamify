import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useTopStreamedSongs } from "@/hooks/useTopStreamedSongs";
import { TIME_PERIODS } from "@/utils/formatDate";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const CHART_CONFIG = {
  streamCount: {
    label: "Streams",
  },
};

export default function TopStreams() {
  const [timePeriod, setTimePeriod] = React.useState(TIME_PERIODS[0]);
  const { topStreamedSongs, isPending } = useTopStreamedSongs({
    startDate: timePeriod.value,
    limit: 5,
  });

  const chartData = React.useMemo(() => {
    return topStreamedSongs.map((song, index) => ({
      title: song.title,
      streamCount: song.streamCount,
      fill: `var(--chart-${(index % 5) + 1})`,
    }));
  }, [topStreamedSongs]);

  return (
    <Card className="py-4 sm:py-0 col-span-2">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row h-28">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Top 5 songs</CardTitle>
          <CardDescription>
            in the <span className="lowercase">{timePeriod.label}</span>
          </CardDescription>
        </div>
        <CardAction className="h-full flex items-center px-4">
          <Select
            value={timePeriod.value}
            onValueChange={(value) =>
              setTimePeriod(
                TIME_PERIODS.find((p) => p.value === value) || TIME_PERIODS[0]
              )
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Time Period</SelectLabel>
                {TIME_PERIODS.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 sm:p-4">
        {isPending ? (
          <div className="flex gap-16 h-[250px]">
            <Skeleton className="h-full flex-1" />
            <Skeleton className="h-full flex-1" />
            <Skeleton className="h-full flex-1" />
            <Skeleton className="h-full flex-1" />
            <Skeleton className="h-full flex-1" />
          </div>
        ) : (
          <ChartContainer
            config={CHART_CONFIG}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart data={chartData}>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="streamCount" />}
              />
              <CartesianGrid vertical={false} />
              <XAxis dataKey="title" hide />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                dataKey="streamCount"
              />
              <Bar dataKey="streamCount" />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
