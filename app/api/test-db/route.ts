// app/api/test-db/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const count = await User.countDocuments();

    return NextResponse.json({
      ok: true,
      message: "Conexão com MongoDB Atlas funcionando!",
      userCount: count,
    });
  } catch (error: any) {
    console.error("ERRO MONGO:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Erro ao conectar ao banco",
        error: String(error?.message || error),
      },
      { status: 500 }
    );
  }
}