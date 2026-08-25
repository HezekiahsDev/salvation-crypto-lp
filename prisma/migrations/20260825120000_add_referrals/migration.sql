-- AlterTable
ALTER TABLE "Payment" ADD COLUMN "referrer_username" TEXT;

-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT,
    "payout_method" TEXT NOT NULL,
    "bank_name" TEXT,
    "bank_code" TEXT,
    "account_number" TEXT,
    "account_name" TEXT,
    "usdt_wallet_address" TEXT,
    "usdt_network" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Referral_username_key" ON "Referral"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_email_key" ON "Referral"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_phone_number_key" ON "Referral"("phone_number");
