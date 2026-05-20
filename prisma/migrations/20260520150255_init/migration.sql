-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "transaction_reference" TEXT NOT NULL,
    "paystack_reference" TEXT,
    "user_id" TEXT,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "plan_name" TEXT,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL,
    "payment_status" TEXT NOT NULL DEFAULT 'pending',
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "payment_method" TEXT,
    "paystack_response" TEXT,
    "webhook_payload" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transaction_reference_key" ON "Payment"("transaction_reference");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_paystack_reference_key" ON "Payment"("paystack_reference");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
