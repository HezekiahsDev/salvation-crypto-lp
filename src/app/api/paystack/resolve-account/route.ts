import { NextResponse } from "next/server";
import { z } from "zod";

const resolveSchema = z.object({
  accountNumber: z.string().regex(/^\d{10}$/, "Enter a 10-digit account number."),
  bankCode: z.string().min(2),
});

export async function POST(req: Request) {
  try {
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const data = resolveSchema.parse(body);
    const url = new URL("https://api.paystack.co/bank/resolve");
    url.searchParams.set("account_number", data.accountNumber);
    url.searchParams.set("bank_code", data.bankCode);

    const paystackRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    });
    const paystackData = await paystackRes.json();

    if (!paystackRes.ok || !paystackData.status) {
      return NextResponse.json(
        { error: paystackData.message || "Could not resolve account" },
        { status: 422 },
      );
    }

    return NextResponse.json({
      accountNumber: paystackData.data.account_number,
      accountName: paystackData.data.account_name,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid account details", details: error.issues },
        { status: 400 },
      );
    }

    console.error("Paystack Resolve Account Error:", error);
    return NextResponse.json(
      { error: "Could not resolve account" },
      { status: 500 },
    );
  }
}
