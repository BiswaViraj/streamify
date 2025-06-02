import { useStreams } from "@/hooks/useStreams";
import { columns } from "./table-section/columns";
import { StreamsTable } from "./table-section/streams-table";
import { Skeleton } from "../ui/skeleton";

export default function StreamsList() {
  const { data, isPending } = useStreams();

  if (isPending) {
    return (
      <div className="h-[400px] w-full rounded flex flex-col gap-2 p-4 bg-card">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-8" />
        ))}
      </div>
    );
  }
  return <StreamsTable data={data} columns={columns} />;
}
