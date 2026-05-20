import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const { id } = params;
    const payment = await prisma.payment.update({
      where: { id },
      data: { confirmed: true },
    });

    return NextResponse.json({ ok: true, payment });
  } catch (error) {
    console.error("Confirm Payment Error:", error);
    return NextResponse.json(
      { error: "Could not confirm payment" },
      { status: 500 },
    );
  }
}

export const runtime = "nodejs";
