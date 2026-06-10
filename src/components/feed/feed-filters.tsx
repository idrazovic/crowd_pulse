"use client";

import { useState } from "react";
import { ChevronDown, Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VIBE_TAGS, COUNTRIES } from "@/lib/mock-data";

export function FeedFilters() {
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const activeVibe = VIBE_TAGS.find((t) => t.id === selectedVibe);

  return (
    <div className="flex items-center gap-2 mb-8">
      {/* Vibe filter */}
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-border bg-card hover:bg-card/80 text-foreground text-sm font-medium transition-colors cursor-pointer">
          <span className="text-base leading-none">{activeVibe?.emoji ?? VIBE_TAGS[0].emoji}</span>
          Vibe
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52 !max-h-64">
          <DropdownMenuLabel>Filter by vibe</DropdownMenuLabel>
          <DropdownMenuItem
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setSelectedVibe(null)}
          >
            <span>All vibes</span>
            {selectedVibe === null && <Check className="h-4 w-4 text-rose-400 shrink-0" />}
          </DropdownMenuItem>
          {VIBE_TAGS.map((tag) => (
            <DropdownMenuItem
              key={tag.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setSelectedVibe(tag.id)}
            >
              <span className="flex items-center gap-2.5">
                <span>{tag.emoji}</span>
                {tag.label}
              </span>
              {selectedVibe === tag.id && <Check className="h-4 w-4 text-rose-400 shrink-0" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Country filter */}
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-border bg-card hover:bg-card/80 text-foreground text-sm font-medium transition-colors cursor-pointer">
          <Globe className="h-4 w-4 text-amber-400" />
          Country
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52 !max-h-64">
          <DropdownMenuLabel>Filter by country</DropdownMenuLabel>
          <DropdownMenuItem
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setSelectedCountry(null)}
          >
            <span>All countries</span>
            {selectedCountry === null && <Check className="h-4 w-4 text-rose-400 shrink-0" />}
          </DropdownMenuItem>
          {COUNTRIES.map((country) => (
            <DropdownMenuItem
              key={country.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setSelectedCountry(country.id)}
            >
              <span className="flex items-center gap-2.5">
                <span className="text-muted-foreground text-xs font-mono uppercase w-5 shrink-0">
                  {country.id.toUpperCase()}
                </span>
                {country.label}
              </span>
              {selectedCountry === country.id && <Check className="h-4 w-4 text-rose-400 shrink-0" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
