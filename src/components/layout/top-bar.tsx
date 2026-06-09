import { Bell, Search, Flame } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CURRENT_USER } from "@/lib/mock-data";

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-700 shrink-0">
          <Flame className="h-[18px] w-[18px] text-white" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-bold text-[15px] tracking-tight text-foreground">CrowdPulse</span>
          <span className="text-[9px] font-mono text-muted-foreground tracking-[0.15em] uppercase mt-0.5">
            Trending Now
          </span>
        </div>
      </div>

      <div className="flex items-center gap-0.5 md:gap-1">
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
          <Search className="h-[18px] w-[18px]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-background" />
        </Button>
        <Avatar className="h-8 w-8 cursor-pointer ml-1">
          <AvatarImage src={CURRENT_USER.avatarUrl} alt={CURRENT_USER.name} />
          <AvatarFallback className="text-xs">{CURRENT_USER.name[0]}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
