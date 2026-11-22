import "dotenv/config";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { adminsCollection, closeDb } from "../src/lib/db";

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const plainPassword = process.env.ADMIN_PASSWORD;

  if (!username || !plainPassword) {
    throw new Error(
      "ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env before seeding an admin user.",
    );
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 12);
  const now = new Date();
  const admins = await adminsCollection();

  await admins.updateOne(
    { username },
    {
      $setOnInsert: {
        id: crypto.randomUUID(),
        username,
        password: hashedPassword,
        created_at: now,
      },
      $set: {
        updated_at: now,
      },
    },
    { upsert: true },
  );

  console.log(`Admin user created/verified: ${username}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await closeDb();
  });
