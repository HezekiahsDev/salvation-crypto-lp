import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const payment = await prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${payment.transaction_reference}`,
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
        { error: "Paystack verification failed" },
        { status: 400 },
      );
    }

    const data = paystackData.data;
    const EXCHANGE_RATE = 1500;
    const expectedAmountInKobo = Math.round(
      payment.amount * EXCHANGE_RATE * 100,
    );

    let updatedPayment;
    if (data.status === "success" && data.amount >= expectedAmountInKobo) {
      updatedPayment = await prisma.payment.update({
        where: { id },
        data: {
          payment_status: "successful",
          paystack_reference: data.reference,
          payment_method: data.channel,
          paystack_response: JSON.stringify(data),
        },
      });
    } else {
      updatedPayment = await prisma.payment.update({
        where: { id },
        data: {
          payment_status: data.status,
          paystack_reference: data.reference,
          paystack_response: JSON.stringify(data),
        },
      });
    }

    return NextResponse.json({ payment: updatedPayment });
  } catch (error) {
    console.error("Manual Verify Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
