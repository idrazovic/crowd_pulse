import { LINEUPS } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export default async function LineupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lineup = LINEUPS.find((l) => l.id === id);

  if (!lineup) notFound();

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center">{lineup.title}</h1>
    </main>
  );
}
