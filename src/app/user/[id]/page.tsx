import { USERS } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = USERS.find((u) => u.id === id);

  if (!user) notFound();

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center">{user.name}</h1>
    </main>
  );
}
