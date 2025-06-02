import CardsSection from "@/components/dashboard/cards-section/cards-section";
import RevenueDistribution from "@/components/dashboard/charts-section/revenue-distribution";
import TopStreams from "@/components/dashboard/charts-section/top-streams";
import UserGrowth from "@/components/dashboard/charts-section/user-growth";
import StreamsList from "@/components/dashboard/streams-list";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 overflow-x-hidden">
      <CardsSection />
      <UserGrowth />
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-4 md:gap-y-0">
        <RevenueDistribution />
        <TopStreams />
      </div>
      <StreamsList />
    </div>
  );
}
