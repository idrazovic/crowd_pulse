import Link from "next/link";
import { ArrowUp, MessageCircle, Share2, MapPin, BadgeCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { VIBE_TAGS } from "@/lib/mock-data";

type DJ = {
  id: string;
  name: string;
  imageUrl: string;
  position: number;
};

type Lineup = {
  id: string;
  title: string;
  venue: { name: string; city: string };
  vibeTag: string;
  voteCount: number;
  commentCount: number;
  creator: { name: string; username: string; avatarUrl: string };
  hasVoted: boolean;
  djs: DJ[];
};

const VIBE_COLORS: Record<string, string> = {
  sunset: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  sunrise: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  midnight: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  beach: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  rooftop: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  warehouse: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  underground: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  "open-air": "bg-green-500/15 text-green-300 border-green-500/30",
  festival: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  intimate: "bg-orange-500/15 text-orange-300 border-orange-500/30",
};

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export function LineupCard({ lineup, rank }: { lineup: Lineup; rank: number }) {
  const vibeTag = VIBE_TAGS.find((t) => t.id === lineup.vibeTag);
  const vibeColor = VIBE_COLORS[lineup.vibeTag] ?? "bg-zinc-500/15 text-zinc-400 border-zinc-500/30";

  return (
    <Link href={`/lineup/${lineup.id}`} className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3 hover:border-white/15 transition-colors duration-200 block">
      {/* Venue + Vibe */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 text-sm min-w-0 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="font-semibold text-foreground truncate">{lineup.venue.name}</span>
          <span className="shrink-0 text-xs">· {lineup.venue.city}</span>
        </div>
        <Badge className={`shrink-0 text-[11px] font-medium border px-2 py-0.5 ${vibeColor}`}>
          {vibeTag?.emoji} {vibeTag?.label}
        </Badge>
      </div>

      {/* Title */}
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-sm text-muted-foreground shrink-0">#{rank}</span>
        <h3 className="font-bold text-lg text-foreground leading-snug">{lineup.title}</h3>
      </div>

      {/* DJ Avatars */}
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
        {lineup.djs.map((dj) => (
          <div key={dj.id} className="flex flex-col items-center gap-1 shrink-0">
            <Avatar className="h-12 w-12 ring-2 ring-white/10">
              <AvatarImage src={dj.imageUrl} alt={dj.name} />
              <AvatarFallback className="text-xs">{dj.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-[10px] text-muted-foreground w-[50px] truncate text-center leading-tight">
              {dj.name}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
        <div className="flex items-center gap-3 text-sm">
          <button
            className={`flex items-center gap-1 font-mono font-semibold transition-colors ${
              lineup.hasVoted ? "text-amber-400" : "text-muted-foreground hover:text-amber-400"
            }`}
          >
            <ArrowUp className="h-4 w-4" />
            {formatCount(lineup.voteCount)}
          </button>
          <span className="flex items-center gap-1 text-muted-foreground text-sm">
            <MessageCircle className="h-4 w-4" />
            {lineup.commentCount}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            by{" "}
            <span className="text-foreground font-medium">@{lineup.creator.username}</span>
            <BadgeCheck className="h-3.5 w-3.5 text-blue-400" />
          </span>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
