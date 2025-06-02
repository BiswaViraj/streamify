import ActiveUsers from "./active-users";
import Revenue from "./revenue";
import TopArtists from "./top-artist";
import TotalStreams from "./total-streams";
import TotalUsers from "./total-users";

export default function CardsSection() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
      <TotalUsers />
      <ActiveUsers />
      <TotalStreams />
      <Revenue />
      <TopArtists />
    </section>
  );
}
