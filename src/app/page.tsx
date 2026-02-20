import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Topbar from "@/components/Topbar";
import Hero from "@/components/Hero";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  return (
    <main className="min-h-screen">
      <Topbar />
      <Hero />
    </main>
  );
}