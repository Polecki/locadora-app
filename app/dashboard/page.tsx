import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Car } from "@/models/Car";
import CarList from "@/components/ui/CarList";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  await connectDB();
  const cars = await Car.find().sort({ createdAt: -1 }).lean();

  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-black px-4 py-8">
      <section className="max-w-5xl mx-auto space-y-6">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">
              Painel da Locadora
            </h1>
            <p className="text-sm text-zinc-500">
              Cadastre, edite e remova carros da sua frota.
            </p>
          </div>
        </header>

        <CarList initialCars={JSON.parse(JSON.stringify(cars))} />
      </section>
    </main>
  );
}
