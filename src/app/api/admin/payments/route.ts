import { NextResponse } from "next/server";
import { paymentsCollection, stripMongoId } from "@/lib/db";

export async function GET() {
  try {
    const payments = await (await paymentsCollection())
      .find({})
      .sort({ created_at: -1 })
      .toArray();
    return NextResponse.json({ payments: payments.map(stripMongoId) });
  } catch (error) {
    console.error("Fetch Payments Error:", error);
    return NextResponse.json(
      { error: "Could not fetch payments" },
      { status: 500 },
    );
  }
}
