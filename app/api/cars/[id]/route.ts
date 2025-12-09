// app/api/cars/[id]/route.ts
// @ts-nocheck

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Car } from "@/models/Car";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Atualizar carro
export async function PUT(req: Request, context: any) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: "Não autorizado" },
        { status: 401 }
      );
    }

    const { params } = context;
    const body = await req.json();

    await connectDB();

    const car = await Car.findByIdAndUpdate(params.id, body, { new: true });

    if (!car) {
      return NextResponse.json(
        { message: "Carro não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error("ERRO PUT /api/cars/[id]:", error);
    return NextResponse.json(
      { message: "Erro ao atualizar carro" },
      { status: 500 }
    );
  }
}

// Deletar carro
export async function DELETE(_req: Request, context: any) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: "Não autorizado" },
        { status: 401 }
      );
    }

    const { params } = context;

    await connectDB();

    const car = await Car.findByIdAndDelete(params.id);

    if (!car) {
      return NextResponse.json(
        { message: "Carro não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Carro removido com sucesso" });
  } catch (error) {
    console.error("ERRO DELETE /api/cars/[id]:", error);
    return NextResponse.json(
      { message: "Erro ao excluir carro" },
      { status: 500 }
    );
  }
}