import { TrendingUp } from "lucide-react";
import { TopBar } from "@/components/layout/top-bar";
import { LineupCard } from "@/components/feed/lineup-card";
import { FeedFilters } from "@/components/feed/feed-filters";
import { LINEUPS } from "@/lib/mock-data";

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />

      <main className="flex-1 px-4 md:px-8 pt-6 pb-16 max-w-5xl mx-auto w-full">
        {/* Hero heading */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 mb-3">
            <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-mono text-amber-400 tracking-widest uppercase font-semibold">
              Live Crowd Signal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-2">
            Trending Lineups
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            What the crowd actually wants to hear, ranked by votes in real time.
          </p>
        </div>

        {/* Filter chips */}
        <FeedFilters />

        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-foreground uppercase tracking-wider">All Lineups</span>
          <span className="text-xs font-mono text-muted-foreground">Sorted by votes</span>
        </div>

        {/* Lineup grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LINEUPS.map((lineup, index) => (
            <LineupCard key={lineup.id} lineup={lineup} rank={index + 1} />
          ))}
        </div>
      </main>
    </div>
  );
}
