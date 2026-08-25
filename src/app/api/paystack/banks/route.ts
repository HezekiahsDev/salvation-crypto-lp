import { NextResponse } from "next/server";

export async function GET() {
  try {
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const banks: { name: string; code: string; slug?: string }[] = [];
    let cursor: string | undefined;

    for (let page = 0; page < 10; page += 1) {
      const url = new URL("https://api.paystack.co/bank");
      url.searchParams.set("country", "nigeria");
      url.searchParams.set("perPage", "100");
      url.searchParams.set("use_cursor", "true");
      if (cursor) url.searchParams.set("next", cursor);

      const paystackRes = await fetch(url, {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
        next: { revalidate: 60 * 60 * 24 },
      });
      const paystackData = await paystackRes.json();

      if (!paystackRes.ok || !paystackData.status) {
        return NextResponse.json(
          { error: paystackData.message || "Could not fetch banks" },
          { status: 502 },
        );
      }

      banks.push(...paystackData.data);
      cursor = paystackData.meta?.next;
      if (!cursor) break;
    }

    return NextResponse.json({
      banks: banks.map((bank) => ({
        name: bank.name,
        code: bank.code,
        slug: bank.slug,
      })),
    });
  } catch (error) {
    console.error("Paystack Banks Error:", error);
    return NextResponse.json(
      { error: "Could not fetch banks" },
      { status: 500 },
    );
  }
}
