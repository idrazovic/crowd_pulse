"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Search, Flame, X, User, LogOut, MessageCircle, ArrowUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CURRENT_USER, NOTIFICATIONS } from "@/lib/mock-data";

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Link href="/feed" className="flex items-center gap-3 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-700 shrink-0">
            <Flame className="h-[18px] w-[18px] text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-[15px] tracking-tight text-foreground">CrowdPulse</span>
            <span className="text-[9px] font-mono text-muted-foreground tracking-[0.15em] uppercase mt-0.5">
              Trending Now
            </span>
          </div>
        </Link>

        {/* Inline search (expands over center) */}
        {searchOpen && (
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center gap-2 px-4 py-3 md:px-8 bg-background/95 backdrop-blur-md border-b border-border">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              autoFocus
              type="text"
              placeholder="Search lineups, DJs, venues…"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Right icons */}
        <div className="flex items-center gap-0.5 md:gap-1">
          {/* Search toggle */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search className="h-[18px] w-[18px]" />
          </button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer">
              <Bell className="h-[18px] w-[18px]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-background" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border mb-1">
                Notifications
              </div>
              {NOTIFICATIONS.map((n) => (
                <DropdownMenuItem key={n.id} className="flex items-start gap-3 py-3 cursor-default">
                  <Avatar className="h-8 w-8 shrink-0 mt-0.5">
                    <AvatarImage src={n.actorAvatarUrl} alt={n.actorName} />
                    <AvatarFallback className="text-xs">{n.actorName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug">{n.message}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{n.lineupTitle}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-0.5">{formatRelativeTime(n.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 shrink-0">
                    {!n.read && <span className="h-2 w-2 rounded-full bg-orange-500" />}
                    {n.type === "vote" ? (
                      <ArrowUp className="h-4 w-4 text-amber-400" />
                    ) : (
                      <MessageCircle className="h-4 w-4 text-blue-400" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger className="ml-1 rounded-full cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarImage src={CURRENT_USER.avatarUrl} alt={CURRENT_USER.name} />
                <AvatarFallback className="text-xs">{CURRENT_USER.name[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                className="cursor-pointer gap-2"
                onClick={() => router.push(`/user/${CURRENT_USER.id}`)}
              >
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer gap-2 text-muted-foreground">
                <LogOut className="h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
