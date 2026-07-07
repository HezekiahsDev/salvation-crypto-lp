import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ reference: string }> },
) {
  try {
    const { reference } = await params;

    if (!reference) {
      return NextResponse.json(
        { error: "Reference is required" },
        { status: 400 },
      );
    }

    const payment = await prisma.payment.findUnique({
      where: { transaction_reference: reference },
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    if (payment.payment_status === "successful") {
      return NextResponse.json({ status: "successful", payment });
    }

    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Verify with Paystack
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const paystackData = await paystackRes.json();

    if (!paystackRes.ok || !paystackData.status) {
      return NextResponse.json(
        { error: "Could not verify payment with provider" },
        { status: 500 },
      );
    }

    const data = paystackData.data;
    const EXCHANGE_RATE = 1500;

    const isAmountSufficient =
      data.amount >= Math.round(payment.amount * EXCHANGE_RATE * 100);

    // IMPORTANT: Do NOT update local payment records from this callback/verify
    // endpoint. Treat the Paystack webhook as the source-of-truth for status
    // changes. The frontend may call this endpoint to show a user-facing
    // verification result, but it must not mutate persistent state.

    // Map Paystack status to a simpler status for the frontend display
    const mappedStatus = data.status === "failed" ? "failed" : data.status;

    return NextResponse.json({
      status: mappedStatus,
      payment, // current DB record (unchanged)
      provider: data, // raw Paystack response data
      amount_ok: isAmountSufficient,
      note: "Do NOT trust this endpoint to change payment status. Webhook only.",
    });
  } catch (error: unknown) {
    console.error("Verification Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
