import { NextResponse, NextRequest } from "next/server";
import { paymentsCollection } from "@/lib/db";

export async function POST(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const { id } = params;
    const payments = await paymentsCollection();
    const payment = await payments.findOneAndUpdate(
      { id },
      { $set: { confirmed: true, updated_at: new Date() } },
      { returnDocument: "after" },
    );

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

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
