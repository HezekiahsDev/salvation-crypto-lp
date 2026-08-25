import { MongoClient } from "mongodb";

declare global {
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "salvation_crypto_lp";

function getClientPromise() {
  if (globalThis.mongoClientPromise) {
    return globalThis.mongoClientPromise;
  }

  if (!uri) {
    throw new Error("MONGODB_URI is required.");
  }

  const clientPromise = new MongoClient(uri).connect().then(async (client) => {
    const db = client.db(dbName);
    await Promise.all([
      db.collection("admins").createIndex({ username: 1 }, { unique: true }),
      db
        .collection("payments")
        .createIndex({ transaction_reference: 1 }, { unique: true }),
      db
        .collection("payments")
        .createIndex(
          { paystack_reference: 1 },
          { unique: true, sparse: true },
        ),
      db.collection("payments").createIndex({ created_at: -1 }),
      db.collection("payments").createIndex({ referrer_username: 1 }),
      db.collection("referrals").createIndex({ username: 1 }, { unique: true }),
      db.collection("referrals").createIndex({ email: 1 }, { unique: true }),
      db
        .collection("referrals")
        .createIndex({ phone_number: 1 }, { unique: true, sparse: true }),
    ]);
    return client;
  });

  if (process.env.NODE_ENV !== "production") {
    globalThis.mongoClientPromise = clientPromise;
  }

  return clientPromise;
}

export interface PaymentDocument {
  id: string;
  transaction_reference: string;
  paystack_reference?: string | null;
  user_id?: string | null;
  full_name: string;
  email: string;
  phone_number: string;
  plan_id: string;
  plan_name?: string | null;
  amount: number;
  currency: string;
  referrer_username?: string | null;
  payment_status: string;
  confirmed: boolean;
  payment_method?: string | null;
  paystack_response?: string | null;
  webhook_payload?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface AdminDocument {
  id: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface ReferralDocument {
  id: string;
  username: string;
  full_name: string;
  email: string;
  phone_number?: string | null;
  payout_method: string;
  bank_name?: string | null;
  bank_code?: string | null;
  account_number?: string | null;
  account_name?: string | null;
  usdt_wallet_address?: string | null;
  usdt_network?: string | null;
  created_at: Date;
  updated_at: Date;
}

export async function getDb() {
  const client = await getClientPromise();
  return client.db(dbName);
}

export async function closeDb() {
  const client = await getClientPromise();
  await client.close();
  globalThis.mongoClientPromise = undefined;
}

export async function paymentsCollection() {
  return (await getDb()).collection<PaymentDocument>("payments");
}

export async function adminsCollection() {
  return (await getDb()).collection<AdminDocument>("admins");
}

export async function referralsCollection() {
  return (await getDb()).collection<ReferralDocument>("referrals");
}

export function stripMongoId<T extends { _id?: unknown }>(document: T) {
  const { _id, ...rest } = document;
  void _id;
  return rest;
}
