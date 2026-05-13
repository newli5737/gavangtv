import { HeroSection } from "../components/HeroSection";
import { LiveMatchesGrid } from "../components/LiveMatchesGrid";
import { Sidebar } from "../components/Sidebar";
import { useMatches } from "@/app/hooks/useMatches";

export function HomePage() {
  const { matches, loading } = useMatches();
  const liveMatches = matches.filter((m) => m.status === "LIVE");
  const featuredMatch = liveMatches[0] || matches[0];

  return (
    <div className="min-h-screen">
      <HeroSection match={featuredMatch} loading={loading} />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <LiveMatchesGrid matches={liveMatches} loading={loading} />
          </div>
          <div className="lg:col-span-1">
            <Sidebar matches={matches} />
          </div>
        </div>
      </div>
    </div>
  );
}
