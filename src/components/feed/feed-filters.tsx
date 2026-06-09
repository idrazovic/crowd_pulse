"use client";

import { ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VIBE_TAGS, COUNTRIES } from "@/lib/mock-data";

export function FeedFilters() {
  return (
    <div className="flex items-center gap-2 mb-8">
      {/* Vibe filter */}
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-border bg-card hover:bg-card/80 text-foreground text-sm font-medium transition-colors cursor-pointer">
          <span>{VIBE_TAGS[0].emoji}</span>
          Vibe
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          {VIBE_TAGS.map((tag) => (
            <DropdownMenuItem key={tag.id} className="cursor-pointer gap-2">
              <span>{tag.emoji}</span>
              {tag.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Country filter */}
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-border bg-card hover:bg-card/80 text-foreground text-sm font-medium transition-colors cursor-pointer">
          <Globe className="h-4 w-4 text-muted-foreground" />
          Country
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          {COUNTRIES.map((country) => (
            <DropdownMenuItem key={country.id} className="cursor-pointer">
              {country.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
