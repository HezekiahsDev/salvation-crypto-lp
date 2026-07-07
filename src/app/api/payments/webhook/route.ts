import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("x-paystack-signature");
    if (!signature) {
      return NextResponse.json(
        { error: "No signature provided" },
        { status: 400 },
      );
    }

    const payload = await req.text();
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

    if (!PAYSTACK_SECRET_KEY) {
      console.error("PAYSTACK_SECRET_KEY is not defined");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const hash = crypto
      .createHmac("sha512", PAYSTACK_SECRET_KEY)
      .update(payload)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(payload);

    // Handle charge events (success/failure) and update DB accordingly
    if (event.event && event.data) {
      const data = event.data;
      const reference = data.reference;

      const payment = await prisma.payment.findUnique({
        where: { transaction_reference: reference },
      });

      if (!payment) {
        console.error(`Webhook received for unknown reference: ${reference}`);
        return NextResponse.json(
          { error: "Payment not found" },
          { status: 404 },
        );
      }

      const EXCHANGE_RATE = 1500;
      const amountMatches =
        data.amount >= Math.round(payment.amount * EXCHANGE_RATE * 100);

      // Map provider statuses to internal statuses
      let newStatus = payment.payment_status;
      if (data.status === "success" && amountMatches) newStatus = "successful";
      else if (data.status === "failed") newStatus = "failed";

      if (newStatus !== payment.payment_status) {
        await prisma.payment.update({
          where: { transaction_reference: reference },
          data: {
            payment_status: newStatus,
            paystack_reference: data.reference,
            payment_method: data.channel,
            webhook_payload: payload,
            paystack_response: JSON.stringify(data),
          },
        });
      }
    }

    // Acknowledge receipt
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: unknown) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
