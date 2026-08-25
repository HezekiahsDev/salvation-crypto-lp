import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import {
  getAllowedUsdtNetworks,
  normalizeReferralUsername,
  REFERRAL_USERNAME_REGEX,
} from "@/lib/referrals";

const prisma = new PrismaClient();

const baseSchema = z.object({
  username: z
    .string()
    .transform(normalizeReferralUsername)
    .pipe(
      z
        .string()
        .regex(
          REFERRAL_USERNAME_REGEX,
          "Username must be 1-8 characters using lowercase letters, numbers, or underscore.",
        ),
    ),
  fullName: z.string().trim().min(2),
  email: z.string().trim().toLowerCase().email(),
  phoneNumber: z.string().trim().optional(),
  payoutMethod: z.enum(["NGN", "USDT"]),
  bankName: z.string().trim().optional(),
  bankCode: z.string().trim().optional(),
  accountNumber: z.string().trim().optional(),
  accountName: z.string().trim().optional(),
  usdtWalletAddress: z.string().trim().optional(),
  usdtNetwork: z.string().trim().optional(),
});

const referralSchema = baseSchema.superRefine((data, ctx) => {
  if (data.phoneNumber && data.phoneNumber.length < 6) {
    ctx.addIssue({
      code: "custom",
      path: ["phoneNumber"],
      message: "Phone number is too short.",
    });
  }

  if (data.payoutMethod === "NGN") {
    for (const field of [
      "bankName",
      "bankCode",
      "accountNumber",
      "accountName",
    ] as const) {
      if (!data[field]) {
        ctx.addIssue({
          code: "custom",
          path: [field],
          message: "This field is required for NGN payout.",
        });
      }
    }
  }

  if (data.payoutMethod === "USDT") {
    if (!data.usdtWalletAddress) {
      ctx.addIssue({
        code: "custom",
        path: ["usdtWalletAddress"],
        message: "Wallet address is required for USDT payout.",
      });
    }

    const allowedNetworks = getAllowedUsdtNetworks();
    if (!data.usdtNetwork || !allowedNetworks.includes(data.usdtNetwork)) {
      ctx.addIssue({
        code: "custom",
        path: ["usdtNetwork"],
        message: "Select an allowed USDT network.",
      });
    }
  }
});

function getReferralLink(req: Request, username: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin;
  const url = new URL(baseUrl);
  url.searchParams.set("ref", username);
  return url.toString();
}

export async function GET() {
  return NextResponse.json({
    usdtNetworks: getAllowedUsdtNetworks(),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = referralSchema.parse(body);
    const phoneNumber = data.phoneNumber || null;

    const identityMatch = await prisma.referral.findFirst({
      where: {
        OR: [
          { email: data.email },
          ...(phoneNumber ? [{ phone_number: phoneNumber }] : []),
        ],
      },
    });

    if (identityMatch) {
      return NextResponse.json({
        referral: identityMatch,
        referralLink: getReferralLink(req, identityMatch.username),
        existing: true,
      });
    }

    const usernameMatch = await prisma.referral.findUnique({
      where: { username: data.username },
    });

    if (usernameMatch) {
      return NextResponse.json(
        { error: "Username has already been taken." },
        { status: 409 },
      );
    }

    const referral = await prisma.referral.create({
      data: {
        username: data.username,
        full_name: data.fullName,
        email: data.email,
        phone_number: phoneNumber,
        payout_method: data.payoutMethod,
        bank_name: data.payoutMethod === "NGN" ? data.bankName : null,
        bank_code: data.payoutMethod === "NGN" ? data.bankCode : null,
        account_number: data.payoutMethod === "NGN" ? data.accountNumber : null,
        account_name: data.payoutMethod === "NGN" ? data.accountName : null,
        usdt_wallet_address:
          data.payoutMethod === "USDT" ? data.usdtWalletAddress : null,
        usdt_network: data.payoutMethod === "USDT" ? data.usdtNetwork : null,
      },
    });

    return NextResponse.json(
      {
        referral,
        referralLink: getReferralLink(req, referral.username),
        existing: false,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid referral data", details: error.issues },
        { status: 400 },
      );
    }

    console.error("Referral Error:", error);
    return NextResponse.json(
      { error: "Could not create referral profile" },
      { status: 500 },
    );
  }
}
