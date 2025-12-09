// app/api/cars/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Car } from "@/models/Car";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Listar carros (pode ser público)
export async function GET() {
  try {
    await connectDB();
    const cars = await Car.find().sort({ createdAt: -1 });
    return NextResponse.json(cars);
  } catch (error) {
    console.error("ERRO GET /api/cars:", error);
    return NextResponse.json(
      { message: "Erro ao buscar carros" },
      { status: 500 }
    );
  }
}

// Criar carro (apenas logado)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: "Não autorizado" },
        { status: 401 }
      );
    }

    const { name, brand, year, dailyRate, status, imageUrl, description } =
      await req.json();

    await connectDB();

    const car = await Car.create({
      name,
      brand,
      year,
      dailyRate,
      status: status || "disponivel",
      imageUrl,
      description,
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error("ERRO POST /api/cars:", error);
    return NextResponse.json(
      { message: "Erro ao criar carro" },
      { status: 500 }
    );
  }
}