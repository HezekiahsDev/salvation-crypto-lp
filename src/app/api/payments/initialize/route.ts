import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { getPlanPaymentPrice, plans } from "@/data/plans";
import crypto from "crypto";
import {
  normalizeReferralUsername,
  REFERRAL_USERNAME_REGEX,
} from "@/lib/referrals";

const prisma = new PrismaClient();

const initializeSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(6),
  planId: z.string(),
  referrerUsername: z
    .string()
    .transform(normalizeReferralUsername)
    .pipe(z.string().regex(REFERRAL_USERNAME_REGEX))
    .optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = initializeSchema.parse(body);

    const plan = plans.find((p) => p.id === data.planId);
    if (!plan) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 },
      );
    }

    const price = getPlanPaymentPrice(plan);
    if (price === null) {
      return NextResponse.json(
        { error: "Invalid plan price" },
        { status: 400 },
      );
    }

    // Generate secure unique transaction reference in the form:
    // PLAN-FULL-NAME-Timestamp-Random
    const timestamp = Math.floor(Date.now() / 1000);
    const randomString = crypto.randomBytes(3).toString("hex").toUpperCase();
    let referrerUsername: string | undefined;

    if (data.referrerUsername) {
      const referral = await prisma.referral.findUnique({
        where: { username: data.referrerUsername },
      });
      if (referral) {
        referrerUsername = referral.username;
      }
    }

    const sanitizeToToken = (s: string) =>
      s
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const planToken = sanitizeToToken(plan.name || "PLAN");
    const nameToken = sanitizeToToken(data.fullName || "CUSTOMER");
    const baseTxRef = `${planToken}-${nameToken}-${timestamp}-${randomString}`;
    const txRef = referrerUsername
      ? `${baseTxRef}-by_${referrerUsername}`
      : baseTxRef;

    // Record pending transaction in DB
    await prisma.payment.create({
      data: {
        transaction_reference: txRef,
        full_name: data.fullName,
        email: data.email,
        phone_number: data.phoneNumber,
        plan_name: plan.name,
        plan_id: data.planId,
        amount: price,
        currency: "NGN",
        referrer_username: referrerUsername,
        payment_status: "pending",
      },
    });

    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
    if (!PAYSTACK_SECRET_KEY) {
      console.error("PAYSTACK_SECRET_KEY is not defined");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Convert USD to NGN with 1500 exchange rate, then to kobo
    const EXCHANGE_RATE = 1500;
    const amountInKobo = Math.round(price * EXCHANGE_RATE * 100);

    // Call Paystack API
    const paystackRes = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          amount: amountInKobo,
          currency: "NGN",
          reference: txRef,
          callback_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:9004"}/plans/${data.planId}?reference=${txRef}`,
          metadata: {
            planId: data.planId,
            planName: plan.name,
            originalAmount: plan.price,
            discountedAmount: price,
            phone: data.phoneNumber,
            fullName: data.fullName,
            referrerUsername,
          },
        }),
      },
    );

    const paystackData = await paystackRes.json();

    if (!paystackRes.ok || !paystackData.status) {
      console.error("Paystack Initialization Failed:", paystackData);
      return NextResponse.json(
        { error: "Could not initialize payment with provider" },
        { status: 500 },
      );
    }

    // Update payment record with Paystack's access code or reference if needed
    // (Optional, as our custom reference is already stored)

    return NextResponse.json({
      authorizationUrl: paystackData.data.authorization_url,
      reference: txRef,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.issues },
        { status: 400 },
      );
    }
    console.error("Initialization Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
