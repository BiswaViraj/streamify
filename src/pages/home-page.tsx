import { lazy } from "react";

const CardsSection = lazy(
  () => import("@/components/dashboard/cards-section/cards-section")
);
const RevenueDistribution = lazy(
  () => import("@/components/dashboard/charts-section/revenue-distribution")
);
const TopStreams = lazy(
  () => import("@/components/dashboard/charts-section/top-streams")
);
const UserGrowth = lazy(
  () => import("@/components/dashboard/charts-section/user-growth")
);
const StreamsList = lazy(() => import("@/components/dashboard/streams-list"));

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
