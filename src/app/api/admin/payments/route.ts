import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json({ payments });
  } catch (error) {
    console.error("Fetch Payments Error:", error);
    return NextResponse.json(
      { error: "Could not fetch payments" },
      { status: 500 },
    );
  }
}
